import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@satori-labs.cloud'

  if (!resendApiKey) {
    console.error('Missing RESEND_API_KEY')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  const {
    clientEmail,
    businessName,
    clientName,
    clientId,
    scheduledTime,
    timezone,
    skippedScheduling,
  } = req.body || {}

  if (!clientEmail) {
    return res.status(400).json({ error: 'clientEmail is required' })
  }

  const portalUrl = 'https://www.satori-labs.cloud/portal'
  const errors: string[] = []

  // 1. Send welcome email to client
  try {
    const kickoffSection = skippedScheduling
      ? `<p style="color: #a1a1aa;">We'll reach out shortly to schedule your kickoff call.</p>`
      : `<div style="background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 12px; padding: 16px; margin: 16px 0;">
           <p style="margin: 0; color: #22d3ee; font-weight: 600;">Your Kickoff Call</p>
           <p style="margin: 4px 0 0; color: #e4e4e7;">${scheduledTime || 'Scheduled'} ${timezone ? `(${timezone})` : ''}</p>
         </div>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Satori Studios <${fromEmail}>`,
        to: [clientEmail],
        subject: `Welcome to Satori Studios${businessName ? `, ${businessName}` : ''}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e4e4e7; padding: 40px 24px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="background: linear-gradient(to right, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
                Welcome to Satori Studios
              </h1>
              ${businessName ? `<p style="color: #a1a1aa; margin-top: 8px;">Your build for <strong style="color: #e4e4e7;">${businessName}</strong> has officially started.</p>` : ''}
            </div>

            ${kickoffSection}

            <div style="margin: 24px 0;">
              <h3 style="color: #22d3ee; margin-bottom: 12px;">What Happens Next</h3>
              <ol style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
                <li><strong style="color: #e4e4e7;">Kickoff Call</strong> — We review your intake and clarify questions</li>
                <li><strong style="color: #e4e4e7;">Draft Build (Days 2-7)</strong> — First version of your website</li>
                <li><strong style="color: #e4e4e7;">Review & Revisions (Days 8-12)</strong> — Your feedback, our changes</li>
                <li><strong style="color: #e4e4e7;">Launch (Day 14)</strong> — Site goes live + training</li>
              </ol>
            </div>

            <div style="text-align: center; margin-top: 32px;">
              <a href="${portalUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Go to Your Portal
              </a>
              <p style="color: #71717a; font-size: 13px; margin-top: 12px;">Track progress, upload assets, and manage your project</p>
            </div>

            <hr style="border: none; border-top: 1px solid #27272a; margin: 32px 0;" />
            <p style="color: #52525b; font-size: 12px; text-align: center;">
              Satori Studios &bull; Digital Marketing &amp; Web Development
            </p>
          </div>
        `,
      }),
    })
    console.log(`Welcome email sent to ${clientEmail}`)
  } catch (err) {
    console.error('Failed to send welcome email:', err)
    errors.push('welcome_email_failed')
  }

  // 2. Send admin notification
  if (adminEmail) {
    try {
      const scheduleInfo = skippedScheduling
        ? 'Skipped scheduling — needs manual outreach'
        : `Kickoff: ${scheduledTime || 'Scheduled'} ${timezone ? `(${timezone})` : ''}`

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Satori Studios <${fromEmail}>`,
          to: [adminEmail],
          subject: `New Client Onboarded: ${businessName || clientEmail}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; padding: 24px;">
              <h2>New Client Onboarding Completed</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; color: #666;">Client</td><td style="padding: 8px;"><strong>${clientName || 'N/A'}</strong></td></tr>
                <tr><td style="padding: 8px; color: #666;">Business</td><td style="padding: 8px;"><strong>${businessName || 'N/A'}</strong></td></tr>
                <tr><td style="padding: 8px; color: #666;">Email</td><td style="padding: 8px;">${clientEmail}</td></tr>
                <tr><td style="padding: 8px; color: #666;">Client ID</td><td style="padding: 8px; font-family: monospace; font-size: 12px;">${clientId || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; color: #666;">Schedule</td><td style="padding: 8px;">${scheduleInfo}</td></tr>
              </table>
              <p style="margin-top: 16px;"><a href="https://www.satori-labs.cloud/admin">View in Admin</a></p>
            </div>
          `,
        }),
      })
      console.log(`Admin notification sent to ${adminEmail}`)
    } catch (err) {
      console.error('Failed to send admin notification:', err)
      errors.push('admin_notification_failed')
    }
  }

  return res.status(200).json({
    success: true,
    errors: errors.length > 0 ? errors : undefined,
  })
}
