/**
 * Shared email helper wrapping Resend REST API.
 * Never throws — returns { success, error } so callers can log without breaking.
 */

interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
}

interface SendEmailResult {
  success: boolean
  error?: string
}

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@satori-labs.cloud'

  if (!resendApiKey) {
    return { success: false, error: 'Missing RESEND_API_KEY' }
  }

  const recipients = Array.isArray(params.to) ? params.to : [params.to]

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Satori Studios <${fromEmail}>`,
        to: recipients,
        subject: params.subject,
        html: params.html,
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return { success: false, error: `Resend API ${resp.status}: ${text}` }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}
