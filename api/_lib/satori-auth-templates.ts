/**
 * Satori Studios auth email templates (function versions).
 * Used by the send-email hook when user.source != 'operators-academy'.
 * Mirrors the Go-template versions in supabase-auth-templates.ts but
 * takes the confirmation URL as a parameter instead of {{ .ConfirmationURL }}.
 */

function satoriBaseLayout(content: string): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e4e4e7; padding: 40px 24px; border-radius: 16px;">
  ${content}
  <hr style="border: none; border-top: 1px solid #27272a; margin: 32px 0;" />
  <p style="color: #52525b; font-size: 12px; text-align: center;">
    Satori Studios &bull; Digital Marketing &amp; Web Development
  </p>
</div>`
}

export function satoriSignupConfirmation(confirmationUrl: string): string {
  return satoriBaseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Confirm Your Email
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Welcome to Satori Studios! Please verify your email to get started.</p>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${confirmationUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Verify Email Address
    </a>
  </div>

  <p style="color: #71717a; font-size: 13px; text-align: center;">
    If you didn't create an account with Satori Studios, you can safely ignore this email.
  </p>`)
}

export function satoriPasswordReset(confirmationUrl: string): string {
  return satoriBaseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #f87171, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Reset Your Password
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">We received a request to reset your password.</p>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${confirmationUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #f87171, #f59e0b); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Reset Password
    </a>
  </div>

  <p style="color: #a1a1aa; font-size: 13px; text-align: center;">
    This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
  </p>`)
}

export function satoriMagicLink(confirmationUrl: string): string {
  return satoriBaseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #34d399, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Sign In to Satori Studios
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Click below to sign in — no password needed.</p>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${confirmationUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #10b981, #06b6d4); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Sign In
    </a>
  </div>

  <p style="color: #a1a1aa; font-size: 13px; text-align: center;">
    This link expires in 1 hour and can only be used once. If you didn't request this, ignore this email.
  </p>`)
}

export function satoriEmailChange(confirmationUrl: string): string {
  return satoriBaseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Confirm Email Change
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Please confirm your new email address.</p>
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${confirmationUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Confirm New Email
    </a>
  </div>

  <p style="color: #71717a; font-size: 13px; text-align: center;">
    If you didn't request this change, please contact us immediately.
  </p>`)
}
