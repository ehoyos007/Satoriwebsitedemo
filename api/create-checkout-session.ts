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
  if (!stripeSecret) {
    return res.status(500).json({ error: 'Stripe not configured on server' })
  }

  try {
    const { priceId, serviceSlug, serviceName, customerEmail, successUrl, cancelUrl } = req.body

    if (!priceId || !serviceSlug) {
      return res.status(400).json({ error: 'priceId and serviceSlug are required' })
    }

    // Look up the price to determine if it's one-time or recurring
    const priceRes = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
      headers: { 'Authorization': `Bearer ${stripeSecret}` },
    })
    if (!priceRes.ok) {
      const err = await priceRes.json()
      return res.status(400).json({ error: err.error?.message || 'Invalid price ID' })
    }
    const price = await priceRes.json()
    const mode = price.recurring ? 'subscription' : 'payment'

    // Build form-encoded body for Stripe Checkout Session
    const rawOrigin = req.headers.origin || req.headers.referer?.replace(/\/[^/]*$/, '') || ''
    const origin = ALLOWED_ORIGINS.includes(rawOrigin) ? rawOrigin : 'https://www.satori-labs.cloud'
    const params = new URLSearchParams()
    params.append('mode', mode)
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('success_url', successUrl || `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.append('cancel_url', cancelUrl || `${origin}/checkout?service=${serviceSlug}&canceled=true`)
    params.append('metadata[service_slug]', serviceSlug)
    params.append('metadata[service_name]', serviceName || '')
    if (customerEmail) {
      params.append('customer_email', customerEmail)
    }

    const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const session = await sessionRes.json()

    if (!sessionRes.ok) {
      return res.status(sessionRes.status).json({
        error: session.error?.message || 'Failed to create checkout session',
      })
    }

    return res.status(200).json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('Checkout session error:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    })
  }
}
