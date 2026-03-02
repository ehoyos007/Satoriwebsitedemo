/**
 * Email template functions for transactional emails.
 * Dark theme matching existing onboarding emails.
 */

function baseLayout(content: string): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e4e4e7; padding: 40px 24px; border-radius: 16px;">
  ${content}
  <hr style="border: none; border-top: 1px solid #27272a; margin: 32px 0;" />
  <p style="color: #52525b; font-size: 12px; text-align: center;">
    Satori Studios &bull; Digital Marketing &amp; Web Development
  </p>
</div>`
}

// -- Order Confirmation (customer) --

interface OrderConfirmationData {
  serviceName: string
  amountCents: number
  sessionId: string
}

export function orderConfirmationEmail(data: OrderConfirmationData) {
  const amount = (data.amountCents / 100).toFixed(2)
  const portalUrl = 'https://www.satori-labs.cloud/portal'

  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Order Confirmed
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Thank you for your purchase!</p>
  </div>

  <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 6px 0; color: #a1a1aa;">Service</td>
        <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #e4e4e7;">${data.serviceName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #a1a1aa;">Amount Paid</td>
        <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #22d3ee;">$${amount}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #a1a1aa;">Order ID</td>
        <td style="padding: 6px 0; text-align: right; font-family: monospace; font-size: 12px; color: #71717a;">${data.sessionId.slice(-12)}</td>
      </tr>
    </table>
  </div>

  <div style="margin: 24px 0;">
    <h3 style="color: #22d3ee; margin-bottom: 12px;">What Happens Next</h3>
    <ol style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
      <li><strong style="color: #e4e4e7;">Complete Onboarding</strong> — Tell us about your business so we can get started</li>
      <li><strong style="color: #e4e4e7;">Kickoff Call</strong> — We'll review your goals and timeline</li>
      <li><strong style="color: #e4e4e7;">Build & Launch</strong> — We get to work while you track progress in your portal</li>
    </ol>
  </div>

  <div style="text-align: center; margin-top: 32px;">
    <a href="${portalUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Go to Your Portal
    </a>
    <p style="color: #71717a; font-size: 13px; margin-top: 12px;">Complete your onboarding to get started</p>
  </div>`)

  return {
    subject: `Order Confirmed — ${data.serviceName}`,
    html,
  }
}

// -- Admin Purchase Notification --

interface AdminPurchaseData {
  serviceName: string
  amountCents: number
  customerEmail: string
  clientId: string
  sessionId: string
}

export function adminPurchaseEmail(data: AdminPurchaseData) {
  const amount = (data.amountCents / 100).toFixed(2)

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; padding: 24px;">
  <h2>New Purchase: ${data.serviceName}</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; color: #666;">Service</td><td style="padding: 8px;"><strong>${data.serviceName}</strong></td></tr>
    <tr><td style="padding: 8px; color: #666;">Amount</td><td style="padding: 8px;"><strong>$${amount}</strong></td></tr>
    <tr><td style="padding: 8px; color: #666;">Customer</td><td style="padding: 8px;">${data.customerEmail}</td></tr>
    <tr><td style="padding: 8px; color: #666;">Client ID</td><td style="padding: 8px; font-family: monospace; font-size: 12px;">${data.clientId}</td></tr>
    <tr><td style="padding: 8px; color: #666;">Stripe Session</td><td style="padding: 8px; font-family: monospace; font-size: 12px;">${data.sessionId}</td></tr>
  </table>
  <p style="margin-top: 16px;"><a href="https://dashboard.stripe.com/payments/${data.sessionId}">View in Stripe</a> &bull; <a href="https://www.satori-labs.cloud/admin">View in Admin</a></p>
</div>`

  return {
    subject: `New Purchase: ${data.serviceName} — $${amount}`,
    html,
  }
}

// -- Payment Failure (customer) --

interface PaymentFailureData {
  serviceName: string
  customerEmail: string
}

// -- Booking Confirmation (guest) --

interface BookingConfirmationData {
  guestName: string
  slotStart: string
  slotEnd: string
  timezone: string
}

export function bookingConfirmationEmail(data: BookingConfirmationData) {
  const start = new Date(data.slotStart)
  const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: data.timezone })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: data.timezone })
  const endTime = new Date(data.slotEnd).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: data.timezone })
  const tzAbbr = data.timezone.replace(/_/g, ' ')

  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #34d399, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Call Confirmed
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Hi ${data.guestName}, your strategy call is booked!</p>
  </div>

  <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 8px; color: #e4e4e7; font-size: 18px; font-weight: 600;">${dateStr}</p>
    <p style="margin: 0; color: #22d3ee; font-size: 16px;">${startTime} – ${endTime} (${tzAbbr})</p>
  </div>

  <div style="margin: 24px 0;">
    <h3 style="color: #22d3ee; margin-bottom: 12px;">What to Prepare</h3>
    <ul style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
      <li>List of services you offer and primary goals</li>
      <li>Examples of websites you like (if any)</li>
      <li>Logo, brand colors, or existing marketing materials</li>
      <li>Any questions about our process or services</li>
    </ul>
  </div>

  <div style="text-align: center; margin-top: 32px;">
    <p style="color: #71717a; font-size: 13px;">Need to reschedule? Reply to this email and we'll find a new time.</p>
  </div>`)

  return {
    subject: `Your Strategy Call is Confirmed — ${dateStr}`,
    html,
  }
}

// -- Admin Booking Notification --

interface AdminBookingNotificationData {
  guestName: string
  guestEmail: string
  guestPhone: string
  serviceInterest: string
  message: string
  slotStart: string
  slotEnd: string
  bookingId: string
}

export function adminBookingNotificationEmail(data: AdminBookingNotificationData) {
  const start = new Date(data.slotStart)
  const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })
  const endTime = new Date(data.slotEnd).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; padding: 24px;">
  <h2>New Strategy Call Booked</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; color: #666;">Name</td><td style="padding: 8px;"><strong>${data.guestName}</strong></td></tr>
    <tr><td style="padding: 8px; color: #666;">Email</td><td style="padding: 8px;">${data.guestEmail}</td></tr>
    <tr><td style="padding: 8px; color: #666;">Phone</td><td style="padding: 8px;">${data.guestPhone}</td></tr>
    <tr><td style="padding: 8px; color: #666;">Interest</td><td style="padding: 8px;">${data.serviceInterest}</td></tr>
    <tr><td style="padding: 8px; color: #666;">Date</td><td style="padding: 8px;"><strong>${dateStr}</strong></td></tr>
    <tr><td style="padding: 8px; color: #666;">Time</td><td style="padding: 8px;">${startTime} – ${endTime} ET</td></tr>
    ${data.message ? `<tr><td style="padding: 8px; color: #666;">Notes</td><td style="padding: 8px;">${data.message}</td></tr>` : ''}
    <tr><td style="padding: 8px; color: #666;">Booking ID</td><td style="padding: 8px; font-family: monospace; font-size: 12px;">${data.bookingId}</td></tr>
  </table>
  <p style="margin-top: 16px;"><a href="https://www.satori-labs.cloud/admin/bookings">View in Admin</a></p>
</div>`

  return {
    subject: `New Call Booked: ${data.guestName} — ${dateStr}`,
    html,
  }
}

// -- Payment Failure (customer) --

// -- Getting-Started Guide (sent day after onboarding) --

interface GettingStartedData {
  clientName: string
  businessName: string
  services: string[]
}

export function gettingStartedEmail(data: GettingStartedData) {
  const serviceList = data.services.map(s => `<li style="padding: 4px 0;">${s}</li>`).join('')

  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Let's Get Started
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Hi ${data.clientName}, here's what to expect as we build ${data.businessName}'s online presence.</p>
  </div>

  <div style="margin: 24px 0;">
    <h3 style="color: #22d3ee; margin-bottom: 12px;">Your Services</h3>
    <ul style="padding-left: 20px; color: #e4e4e7; line-height: 1.8;">
      ${serviceList}
    </ul>
  </div>

  <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
    <h3 style="color: #22d3ee; margin: 0 0 16px;">Your Timeline</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #a1a1aa; width: 100px;">Week 1</td>
        <td style="padding: 8px 0; color: #e4e4e7;">Discovery &amp; strategy — we review your onboarding data and finalize the plan</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #a1a1aa;">Week 2–3</td>
        <td style="padding: 8px 0; color: #e4e4e7;">Design &amp; build phase — first drafts shared for your review</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #a1a1aa;">Week 4</td>
        <td style="padding: 8px 0; color: #e4e4e7;">Revisions &amp; launch prep — final tweaks and go-live</td>
      </tr>
    </table>
  </div>

  <div style="margin: 24px 0;">
    <h3 style="color: #e4e4e7; margin-bottom: 12px;">How to Track Progress</h3>
    <ul style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
      <li>Log into your <a href="https://www.satori-labs.cloud/portal" style="color: #22d3ee; text-decoration: underline;">client portal</a> anytime</li>
      <li>Check the <strong style="color: #e4e4e7;">Project Details</strong> tab for milestones</li>
      <li>Upload assets (logo, photos) in the <strong style="color: #e4e4e7;">Assets</strong> tab</li>
      <li>Leave notes or feedback in <strong style="color: #e4e4e7;">Project Notes</strong></li>
    </ul>
  </div>

  <div style="text-align: center; margin-top: 32px;">
    <a href="https://www.satori-labs.cloud/portal" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Open Your Portal
    </a>
    <p style="color: #71717a; font-size: 13px; margin-top: 12px;">Questions? Just reply to this email.</p>
  </div>`)

  return {
    subject: `Getting Started — ${data.businessName}`,
    html,
  }
}

// -- Onboarding Reminder (if onboarding not completed within 3 days) --

interface OnboardingReminderData {
  clientName: string
  serviceName: string
}

export function onboardingReminderEmail(data: OnboardingReminderData) {
  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #fbbf24, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Don't Forget to Complete Setup
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Hi ${data.clientName}, you're almost there!</p>
  </div>

  <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="margin: 0; color: #e4e4e7;">
      You purchased <strong style="color: #fbbf24;">${data.serviceName}</strong> but haven't finished onboarding yet.
      Complete it now so we can start working on your project.
    </p>
  </div>

  <div style="margin: 24px 0;">
    <h3 style="color: #e4e4e7; margin-bottom: 12px;">Onboarding takes about 5 minutes:</h3>
    <ol style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
      <li>Tell us about your business</li>
      <li>Share your goals and preferences</li>
      <li>Upload your logo and brand materials (optional)</li>
      <li>Pick a time for your kickoff call</li>
    </ol>
  </div>

  <div style="text-align: center; margin-top: 32px;">
    <a href="https://www.satori-labs.cloud/onboarding" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #f59e0b, #f97316); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Complete Onboarding
    </a>
    <p style="color: #71717a; font-size: 13px; margin-top: 12px;">Need help? Reply to this email.</p>
  </div>`)

  return {
    subject: `Action Needed — Complete your onboarding for ${data.serviceName}`,
    html,
  }
}

// -- Project Update / Milestone Notification --

interface ProjectUpdateData {
  clientName: string
  projectName: string
  milestoneName: string
  milestoneStatus: 'completed' | 'in_progress' | 'upcoming'
  message?: string
}

export function projectUpdateEmail(data: ProjectUpdateData) {
  const statusColors = {
    completed: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#4ade80', label: 'Completed' },
    in_progress: { bg: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.3)', text: '#22d3ee', label: 'In Progress' },
    upcoming: { bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.3)', text: '#a78bfa', label: 'Coming Up' },
  }
  const status = statusColors[data.milestoneStatus]

  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #22d3ee, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      Project Update
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Hi ${data.clientName}, here's the latest on ${data.projectName}.</p>
  </div>

  <div style="background: ${status.bg}; border: 1px solid ${status.border}; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 6px 0; color: #a1a1aa;">Milestone</td>
        <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #e4e4e7;">${data.milestoneName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #a1a1aa;">Status</td>
        <td style="padding: 6px 0; text-align: right;">
          <span style="display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 13px; font-weight: 600; background: ${status.bg}; color: ${status.text}; border: 1px solid ${status.border};">
            ${status.label}
          </span>
        </td>
      </tr>
    </table>
    ${data.message ? `<p style="margin: 16px 0 0; color: #a1a1aa; border-top: 1px solid #27272a; padding-top: 16px;">${data.message}</p>` : ''}
  </div>

  <div style="text-align: center; margin-top: 32px;">
    <a href="https://www.satori-labs.cloud/portal/project" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      View Project Details
    </a>
    <p style="color: #71717a; font-size: 13px; margin-top: 12px;">Track all milestones in your portal</p>
  </div>`)

  return {
    subject: `${data.projectName} — ${data.milestoneName} ${status.label}`,
    html,
  }
}

// -- Monthly Report --

interface MonthlyReportData {
  clientName: string
  businessName: string
  month: string
  kpis: { label: string; value: string; change?: string }[]
  highlights: string[]
}

export function monthlyReportEmail(data: MonthlyReportData) {
  const kpiRows = data.kpis.map(kpi => `
    <tr>
      <td style="padding: 8px 0; color: #a1a1aa;">${kpi.label}</td>
      <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #e4e4e7;">${kpi.value}</td>
      ${kpi.change ? `<td style="padding: 8px 0; text-align: right; color: ${kpi.change.startsWith('+') ? '#4ade80' : '#f87171'}; font-size: 13px;">${kpi.change}</td>` : '<td></td>'}
    </tr>`).join('')

  const highlightItems = data.highlights.map(h => `<li style="padding: 4px 0;">${h}</li>`).join('')

  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="background: linear-gradient(to right, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; margin: 0;">
      ${data.month} Report
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">Hi ${data.clientName}, here's how ${data.businessName} performed this month.</p>
  </div>

  <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
    <h3 style="color: #22d3ee; margin: 0 0 12px;">Key Metrics</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${kpiRows}
    </table>
  </div>

  ${data.highlights.length > 0 ? `
  <div style="margin: 24px 0;">
    <h3 style="color: #e4e4e7; margin-bottom: 12px;">Highlights</h3>
    <ul style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
      ${highlightItems}
    </ul>
  </div>` : ''}

  <div style="text-align: center; margin-top: 32px;">
    <a href="https://www.satori-labs.cloud/portal/analytics" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #8b5cf6, #06b6d4); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      View Full Analytics
    </a>
    <p style="color: #71717a; font-size: 13px; margin-top: 12px;">Detailed breakdown available in your portal</p>
  </div>`)

  return {
    subject: `${data.month} Performance Report — ${data.businessName}`,
    html,
  }
}

export function paymentFailureEmail(data: PaymentFailureData) {
  const portalUrl = 'https://www.satori-labs.cloud/portal/billing'

  const html = baseLayout(`
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #f87171; font-size: 28px; margin: 0;">
      Payment Failed
    </h1>
    <p style="color: #a1a1aa; margin-top: 8px;">We were unable to process your payment for <strong style="color: #e4e4e7;">${data.serviceName}</strong>.</p>
  </div>

  <div style="background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="margin: 0; color: #fca5a5;">
      Your subscription is at risk of being paused. Please update your payment method to avoid any interruption in service.
    </p>
  </div>

  <div style="margin: 24px 0;">
    <h3 style="color: #e4e4e7; margin-bottom: 12px;">What To Do</h3>
    <ol style="padding-left: 20px; color: #a1a1aa; line-height: 1.8;">
      <li>Visit your <a href="${portalUrl}" style="color: #22d3ee; text-decoration: underline;">billing portal</a></li>
      <li>Update your payment method</li>
      <li>The charge will be retried automatically</li>
    </ol>
  </div>

  <div style="text-align: center; margin-top: 32px;">
    <a href="${portalUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #f87171, #ef4444); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Update Payment Method
    </a>
    <p style="color: #71717a; font-size: 13px; margin-top: 12px;">If you believe this is an error, please contact us at support@satori-labs.cloud</p>
  </div>`)

  return {
    subject: `Action Required — Payment failed for ${data.serviceName}`,
    html,
  }
}
