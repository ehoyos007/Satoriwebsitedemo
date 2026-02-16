import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { sendEmail } from './_lib/email.js'
import { orderConfirmationEmail, adminPurchaseEmail, paymentFailureEmail } from './_lib/email-templates.js'

export const config = {
  api: { bodyParser: false },
}

async function buffer(readable: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!stripeSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required env vars for webhook')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const buf = await buffer(req)
  let event: any

  // Verify webhook signature if secret is configured
  if (webhookSecret) {
    const stripe = new Stripe(stripeSecret)
    const sig = req.headers['stripe-signature'] as string
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return res.status(400).json({ error: 'Invalid signature' })
    }
  } else {
    event = JSON.parse(buf.toString())
    console.warn('Webhook signature verification disabled (no STRIPE_WEBHOOK_SECRET)')
  }

  // Helper to call Supabase REST API with service role key
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

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log(`Checkout session completed: ${session.id}`)

        const serviceSlug = session.metadata?.service_slug
        const customerEmail = session.customer_details?.email

        if (!serviceSlug) {
          console.warn('No service_slug in session metadata, skipping')
          break
        }

        // 1. Look up the service
        const services = await supabaseAdmin(`services?slug=eq.${serviceSlug}&select=id,name,setup_price_cents,monthly_price_cents`)
        const service = services?.[0]
        if (!service) {
          console.error(`Service not found: ${serviceSlug}`)
          break
        }

        // 2. Find or create client record
        // First check by profile email, then by business_email (for pre-signup purchases)
        let clientId: string | null = null

        // Try to find existing profile by email
        const profiles = await supabaseAdmin(`profiles?email=eq.${encodeURIComponent(customerEmail || '')}&select=id`)
        const profileId = profiles?.[0]?.id

        if (profileId) {
          // User has an account — find or create client linked to profile
          const clients = await supabaseAdmin(`clients?user_id=eq.${profileId}&select=id,stripe_customer_id`)
          if (clients?.[0]) {
            clientId = clients[0].id
            if (!clients[0].stripe_customer_id && session.customer) {
              await supabaseAdmin(`clients?id=eq.${clientId}`, {
                method: 'PATCH',
                body: JSON.stringify({ stripe_customer_id: session.customer }),
              })
            }
          } else {
            const newClients = await supabaseAdmin('clients', {
              method: 'POST',
              body: JSON.stringify({
                user_id: profileId,
                stripe_customer_id: session.customer || null,
                business_email: customerEmail,
              }),
            })
            clientId = newClients?.[0]?.id
          }
        } else if (customerEmail) {
          // No account yet — check for existing pending client by email
          const pendingClients = await supabaseAdmin(`clients?business_email=eq.${encodeURIComponent(customerEmail)}&user_id=is.null&select=id`)
          if (pendingClients?.[0]) {
            clientId = pendingClients[0].id
            if (session.customer) {
              await supabaseAdmin(`clients?id=eq.${clientId}`, {
                method: 'PATCH',
                body: JSON.stringify({ stripe_customer_id: session.customer }),
              })
            }
          } else {
            // Create pending client (no user_id — will be linked on signup)
            const newClients = await supabaseAdmin('clients', {
              method: 'POST',
              body: JSON.stringify({
                user_id: null,
                stripe_customer_id: session.customer || null,
                business_email: customerEmail,
              }),
            })
            clientId = newClients?.[0]?.id
            console.log(`Created pending client for ${customerEmail} (no account yet)`)
          }
        }

        // 3. Create order record
        if (clientId) {
          const amountCents = session.amount_total || service.setup_price_cents || 0
          await supabaseAdmin('orders', {
            method: 'POST',
            body: JSON.stringify({
              client_id: clientId,
              service_id: service.id,
              status: 'paid',
              amount_cents: amountCents,
              stripe_checkout_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent || null,
              metadata: {
                customer_email: customerEmail,
                service_slug: serviceSlug,
              },
            }),
          })
          console.log(`Order created for client ${clientId}, service ${serviceSlug}`)

          // 4. Log activity
          await supabaseAdmin('activity_log', {
            method: 'POST',
            body: JSON.stringify({
              client_id: clientId,
              type: 'purchase',
              message: `Purchased ${service.name} — $${(amountCents / 100).toFixed(2)}`,
            }),
          })

          // 5. Create project for tracking
          await supabaseAdmin('projects', {
            method: 'POST',
            body: JSON.stringify({
              client_id: clientId,
              name: service.name,
              status: 'onboarding',
              description: `Setup and delivery of ${service.name}`,
            }),
          })
          console.log(`Project created for client ${clientId}, service ${serviceSlug}`)

          // 6. Send order confirmation + admin notification (fire-and-forget)
          if (customerEmail) {
            const confirmation = orderConfirmationEmail({
              serviceName: service.name,
              amountCents: amountCents,
              sessionId: session.id,
            })
            sendEmail({ to: customerEmail, ...confirmation })
              .then(r => r.success
                ? console.log(`Order confirmation sent to ${customerEmail}`)
                : console.error(`Order confirmation failed: ${r.error}`))
          }

          const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
          if (adminEmail) {
            const adminNotif = adminPurchaseEmail({
              serviceName: service.name,
              amountCents: amountCents,
              customerEmail: customerEmail || 'unknown',
              clientId: clientId!,
              sessionId: session.id,
            })
            sendEmail({ to: adminEmail, ...adminNotif })
              .then(r => r.success
                ? console.log(`Admin purchase notification sent`)
                : console.error(`Admin notification failed: ${r.error}`))
          }
        } else {
          console.error(`Could not create client or order for ${customerEmail}`)
        }

        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        console.log(`Subscription ${event.type}: ${subscription.id}`)

        // Find client by Stripe customer ID
        const customerId = typeof subscription.customer === 'string'
          ? subscription.customer
          : subscription.customer
        const clients = await supabaseAdmin(`clients?stripe_customer_id=eq.${customerId}&select=id`)
        const client = clients?.[0]
        if (!client) {
          console.warn(`No client found for Stripe customer ${customerId}`)
          break
        }

        // Get the price to find the service
        const priceId = subscription.items?.data?.[0]?.price?.id
        if (priceId) {
          const services = await supabaseAdmin(`services?stripe_monthly_price_id=eq.${priceId}&select=id,name`)
          const service = services?.[0]
          if (service) {
            // Get period from subscription items
            const item = subscription.items?.data?.[0]
            const subData: Record<string, any> = {
              client_id: client.id,
              service_id: service.id,
              status: subscription.status === 'active' ? 'active' :
                      subscription.status === 'past_due' ? 'past_due' :
                      subscription.cancel_at_period_end ? 'cancelled' : 'active',
              stripe_subscription_id: subscription.id,
            }
            if (item?.current_period_start) {
              subData.current_period_start = new Date(item.current_period_start * 1000).toISOString()
            }
            if (item?.current_period_end) {
              subData.current_period_end = new Date(item.current_period_end * 1000).toISOString()
            }

            // Check if subscription already exists
            const existing = await supabaseAdmin(`subscriptions?stripe_subscription_id=eq.${subscription.id}&select=id`)
            if (existing?.[0]) {
              await supabaseAdmin(`subscriptions?id=eq.${existing[0].id}`, {
                method: 'PATCH',
                body: JSON.stringify(subData),
              })
            } else {
              await supabaseAdmin('subscriptions', {
                method: 'POST',
                body: JSON.stringify(subData),
              })
            }
            console.log(`Subscription ${subscription.id} synced for service ${service.name}`)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        console.log(`Subscription cancelled: ${subscription.id}`)

        await supabaseAdmin(`subscriptions?stripe_subscription_id=eq.${subscription.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
          }),
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        console.log(`Payment failed for invoice ${invoice.id}`)

        // In Stripe API, subscription info is under parent.subscription_details
        const subDetails = invoice.parent?.subscription_details
        if (subDetails?.subscription) {
          const subId = typeof subDetails.subscription === 'string'
            ? subDetails.subscription
            : subDetails.subscription.id
          await supabaseAdmin(`subscriptions?stripe_subscription_id=eq.${subId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'past_due' }),
          })

          // Send payment failure email to customer (fire-and-forget)
          const customerId = typeof invoice.customer === 'string'
            ? invoice.customer
            : invoice.customer?.id
          if (customerId) {
            // Look up client email and service name
            const subs = await supabaseAdmin(
              `subscriptions?stripe_subscription_id=eq.${subId}&select=client_id,service:services(name)`
            )
            const sub = subs?.[0]
            if (sub?.client_id) {
              const clients = await supabaseAdmin(
                `clients?id=eq.${sub.client_id}&select=business_email`
              )
              const clientEmail = clients?.[0]?.business_email
              const serviceName = sub.service?.name || 'your service'
              if (clientEmail) {
                const failureEmail = paymentFailureEmail({
                  serviceName,
                  customerEmail: clientEmail,
                })
                sendEmail({ to: clientEmail, ...failureEmail })
                  .then(r => r.success
                    ? console.log(`Payment failure email sent to ${clientEmail}`)
                    : console.error(`Payment failure email failed: ${r.error}`))
              }
            }
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return res.status(500).json({ error: 'Webhook handler failed' })
  }
}
