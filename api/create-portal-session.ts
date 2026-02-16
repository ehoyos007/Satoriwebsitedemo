import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if (!stripeSecret) {
    return res.status(500).json({ error: 'Stripe not configured on server' })
  }

  try {
    const { stripeCustomerId } = req.body

    if (!stripeCustomerId) {
      return res.status(400).json({ error: 'stripeCustomerId is required' })
    }

    const origin = req.headers.origin || req.headers.referer?.replace(/\/[^/]*$/, '') || 'https://www.satori-labs.cloud'

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
