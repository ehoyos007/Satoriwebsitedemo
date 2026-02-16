import type { VercelRequest, VercelResponse } from '@vercel/node'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function supabaseAdmin(path: string, options: RequestInit = {}) {
  const url = `${supabaseUrl}/rest/v1/${path}`
  const resp = await fetch(url, {
    ...options,
    headers: {
      'apikey': supabaseServiceKey!,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers,
    },
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Supabase ${path}: ${resp.status} ${text}`)
  }
  const contentType = resp.headers.get('content-type')
  if (contentType?.includes('json')) {
    return resp.json()
  }
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  // Validate auth: extract Bearer token
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }
  const token = authHeader.slice(7)

  // Verify user with Supabase Auth
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

  // Check admin role in profiles table
  try {
    const profiles = await supabaseAdmin(
      `profiles?id=eq.${userId}&select=role`
    )
    if (!profiles?.[0] || profiles[0].role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' })
    }
  } catch (err) {
    console.error('Profile check failed:', err)
    return res.status(403).json({ error: 'Unable to verify admin role' })
  }

  // Parse and validate body
  const { serviceId, updates } = req.body || {}
  if (!serviceId || typeof serviceId !== 'string') {
    return res.status(400).json({ error: 'serviceId is required' })
  }
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'updates object is required' })
  }

  // Allowlist of updatable fields
  const allowedFields = [
    'name',
    'description',
    'category',
    'setup_price_cents',
    'monthly_price_cents',
    'stripe_setup_price_id',
    'stripe_monthly_price_id',
    'features',
    'is_active',
    'display_order',
  ]

  const sanitized: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  for (const field of allowedFields) {
    if (field in updates) {
      sanitized[field] = updates[field]
    }
  }

  try {
    const result = await supabaseAdmin(`services?id=eq.${serviceId}`, {
      method: 'PATCH',
      body: JSON.stringify(sanitized),
    })

    const updated = result?.[0]
    if (!updated) {
      return res.status(404).json({ error: 'Service not found' })
    }

    return res.status(200).json({ service: updated })
  } catch (err: any) {
    console.error('Service update failed:', err)
    return res.status(500).json({ error: err.message || 'Update failed' })
  }
}
