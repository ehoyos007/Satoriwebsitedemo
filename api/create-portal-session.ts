import type { VercelRequest, VercelResponse } from '@vercel/node'

const ALLOWED_ORIGINS = [
  'https://www.satori-labs.cloud',
  'https://satori-labs.cloud',
  'http://localhost:5173',
  'http://localhost:3000',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!stripeSecret) {
    return res.status(500).json({ error: 'Stripe not configured on server' })
  }
  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  // Verify auth
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }
  const token = authHeader.slice(7)

  let userId: string
  try {
    const userResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${token}`,
      },
    })
    if (!userResp.ok) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
    const user = await userResp.json()
    userId = user.id
  } catch {
    return res.status(401).json({ error: 'Auth verification failed' })
  }

  try {
    const { stripeCustomerId } = req.body

    if (!stripeCustomerId) {
      return res.status(400).json({ error: 'stripeCustomerId is required' })
    }

    // Verify the user owns this stripe customer by checking their client record
    const clientResp = await fetch(
      `${supabaseUrl}/rest/v1/clients?user_id=eq.${userId}&stripe_customer_id=eq.${encodeURIComponent(stripeCustomerId)}&select=id`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
      }
    )
    if (!clientResp.ok) {
      return res.status(500).json({ error: 'Failed to verify client ownership' })
    }
    const clients = await clientResp.json()
    if (!clients?.length) {
      return res.status(403).json({ error: 'You do not have access to this billing portal' })
    }

    // Validate origin against allowlist
    const rawOrigin = req.headers.origin || req.headers.referer?.replace(/\/[^/]*$/, '') || ''
    const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : 'https://www.satori-labs.cloud'

    // Create Stripe billing portal session via REST API
    const params = new URLSearchParams()
    params.append('customer', stripeCustomerId)
    params.append('return_url', `${origin}/portal/billing`)

    const portalRes = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!portalRes.ok) {
      const err = await portalRes.json()
      return res.status(400).json({ error: err.error?.message || 'Failed to create portal session' })
    }

    const session = await portalRes.json()
    return res.status(200).json({ url: session.url })
  } catch (err: any) {
    console.error('Portal session error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
