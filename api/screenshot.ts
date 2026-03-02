import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const SCREENSHOT_API_BASE = 'https://api.screenshotone.com/take'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Require authenticated admin user
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }

  const apiKey = process.env.SCREENSHOT_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Screenshot API key not configured on server' })
  }

  try {
    const { url, viewportWidth, viewportHeight, fullPage, format, delay } = req.body

    if (!url || !viewportWidth || !viewportHeight) {
      return res.status(400).json({ error: 'url, viewportWidth, and viewportHeight are required' })
    }

    const params = new URLSearchParams({
      access_key: apiKey,
      url,
      viewport_width: String(viewportWidth),
      viewport_height: String(viewportHeight),
      format: format || 'png',
      full_page: String(fullPage ?? false),
      delay: String(delay ?? 2),
      block_ads: 'true',
      block_cookie_banners: 'true',
      block_trackers: 'true',
    })

    const response = await fetch(`${SCREENSHOT_API_BASE}?${params.toString()}`)

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({
        error: `Screenshot failed: ${response.status} - ${errorText}`,
      })
    }

    // Stream the image back with proper content type
    const contentType = response.headers.get('content-type') || 'image/png'
    const buffer = await response.arrayBuffer()

    res.setHeader('Content-Type', contentType)
    return res.status(200).send(Buffer.from(buffer))
  } catch (error) {
    console.error('Screenshot proxy error:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    })
  }
}
