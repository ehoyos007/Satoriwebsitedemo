/**
 * Supabase Auth Send Email Hook.
 *
 * Supabase calls this endpoint instead of sending auth emails via SMTP.
 * We check the user's `source` metadata and send the right branded email
 * (Satori Studios vs Operators Academy) via Resend API.
 *
 * Payload format (from Supabase GoTrue):
 * {
 *   user: { id, email, user_metadata: { source, full_name, ... }, ... },
 *   email_data: {
 *     token, token_hash, redirect_to, email_action_type,
 *     site_url, token_new, token_hash_new
 *   }
 * }
 *
 * Must return 200 with empty JSON body on success.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'
import {
  oaSignupConfirmation,
  oaPasswordReset,
  oaMagicLink,
  oaEmailChange,
} from './_lib/oa-auth-templates'
import {
  satoriSignupConfirmation,
  satoriPasswordReset,
  satoriMagicLink,
  satoriEmailChange,
} from './_lib/satori-auth-templates'

const SUPABASE_URL = 'https://cbeurhcgvqptclggkbhb.supabase.co'
const SIGNATURE_TOLERANCE_SECS = 300 // 5 minutes

interface HookPayload {
  user: {
    id: string
    email: string
    user_metadata?: {
      source?: string
      full_name?: string
      name?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  email_data: {
    token: string
    token_hash: string
    redirect_to: string
    email_action_type: string
    site_url: string
    token_new?: string
    token_hash_new?: string
  }
}

function buildConfirmationUrl(emailData: HookPayload['email_data']): string {
  const params = new URLSearchParams({
    token: emailData.token_hash,
    type: emailData.email_action_type,
    redirect_to: emailData.redirect_to || emailData.site_url,
  })
  return `${SUPABASE_URL}/auth/v1/verify?${params.toString()}`
}

function getTemplates(source: string) {
  if (source === 'operators-academy') {
    return {
      signup: oaSignupConfirmation,
      recovery: oaPasswordReset,
      magiclink: oaMagicLink,
      email_change: oaEmailChange,
      senderName: 'Operators Academy',
    }
  }
  return {
    signup: satoriSignupConfirmation,
    recovery: satoriPasswordReset,
    magiclink: satoriMagicLink,
    email_change: satoriEmailChange,
    senderName: 'Satori Studios',
  }
}

function getSubject(actionType: string, source: string): string {
  const brand = source === 'operators-academy' ? 'Operators Academy' : 'Satori Studios'
  switch (actionType) {
    case 'signup': return `Confirm your ${brand} account`
    case 'recovery': return 'Reset your password'
    case 'magiclink': return `Sign in to ${brand}`
    case 'email_change': return 'Confirm your new email address'
    case 'invite': return `You've been invited to ${brand}`
    default: return `${brand} — Action Required`
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify Standard Webhooks signature (HMAC-SHA256)
  const hookSecret = process.env.SUPABASE_AUTH_HOOK_SECRET
  if (hookSecret) {
    const msgId = req.headers['webhook-id'] as string
    const timestamp = req.headers['webhook-timestamp'] as string
    const signatures = req.headers['webhook-signature'] as string

    if (!msgId || !timestamp || !signatures) {
      console.error('auth-email-hook: missing webhook signature headers')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Check timestamp is within tolerance
    const ts = parseInt(timestamp, 10)
    const now = Math.floor(Date.now() / 1000)
    if (Math.abs(now - ts) > SIGNATURE_TOLERANCE_SECS) {
      console.error('auth-email-hook: webhook timestamp too old')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Compute expected signature
    const secretBytes = Buffer.from(hookSecret.replace('whsec_', ''), 'base64')
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    const signedContent = `${msgId}.${timestamp}.${body}`
    const expectedSig = crypto.createHmac('sha256', secretBytes).update(signedContent).digest('base64')

    // Verify against any of the provided signatures
    const valid = signatures.split(' ').some(sig => {
      const sigValue = sig.replace(/^v1,/, '')
      return crypto.timingSafeEqual(
        Buffer.from(expectedSig),
        Buffer.from(sigValue),
      )
    })

    if (!valid) {
      console.error('auth-email-hook: invalid webhook signature')
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  const payload = req.body as HookPayload

  if (!payload?.user?.email || !payload?.email_data) {
    console.error('auth-email-hook: invalid payload', JSON.stringify(payload).slice(0, 200))
    return res.status(400).json({ error: 'Invalid payload' })
  }

  const { user, email_data } = payload
  const source = user.user_metadata?.source || 'satori'
  const actionType = email_data.email_action_type
  const confirmationUrl = buildConfirmationUrl(email_data)

  const templates = getTemplates(source)
  const templateFn = templates[actionType as keyof typeof templates]

  if (typeof templateFn !== 'function') {
    // Unknown action type — log and fall through
    console.error(`auth-email-hook: unknown action type "${actionType}" for ${user.email}`)
    return res.status(200).json({})
  }

  const html = templateFn(confirmationUrl)
  const subject = getSubject(actionType, source)
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@satori-labs.cloud'

  // Send via Resend API
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.error('auth-email-hook: missing RESEND_API_KEY')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${templates.senderName} <${fromEmail}>`,
        to: [user.email],
        subject,
        html,
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error(`auth-email-hook: Resend API ${resp.status}: ${text}`)
      // Return 200 anyway so Supabase doesn't retry and block the user
      return res.status(200).json({})
    }

    console.log(`auth-email-hook: sent ${actionType} email to ${user.email} (source: ${source})`)
    return res.status(200).json({})
  } catch (err) {
    console.error('auth-email-hook: send failed', err)
    return res.status(200).json({})
  }
}
