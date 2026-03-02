import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendEmail } from './_lib/email.js'
import { bookingConfirmationEmail, adminBookingNotificationEmail } from './_lib/email-templates.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { slotId, guestName, guestEmail, guestPhone, serviceInterest, message, timezone } = req.body || {}

  if (!slotId || !guestName || !guestEmail) {
    return res.status(400).json({ error: 'Missing required fields: slotId, guestName, guestEmail' })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const headers = {
    'apikey': serviceRoleKey,
    'Authorization': `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  }

  try {
    // 1. Atomically claim the slot (UPDATE WHERE is_booked=false prevents race condition)
    const claimResp = await fetch(
      `${supabaseUrl}/rest/v1/availability_slots?id=eq.${slotId}&is_booked=eq.false`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ is_booked: true }),
      }
    )

    if (!claimResp.ok) {
      const text = await claimResp.text()
      console.error('Failed to claim slot:', text)
      return res.status(500).json({ error: 'Failed to reserve time slot' })
    }

    const claimedSlots = await claimResp.json()
    if (!claimedSlots || claimedSlots.length === 0) {
      // Either slot doesn't exist or was already booked
      const checkResp = await fetch(
        `${supabaseUrl}/rest/v1/availability_slots?id=eq.${slotId}&select=id,is_booked`,
        { headers }
      )
      const checkSlots = await checkResp.json()
      if (!checkSlots || checkSlots.length === 0) {
        return res.status(404).json({ error: 'Slot not found' })
      }
      return res.status(409).json({ error: 'This time slot is no longer available. Please choose another time.' })
    }

    const slot = claimedSlots[0]

    // 2. Create booking record
    const bookingResp = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        slot_id: slotId,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone || null,
        service_interest: serviceInterest || null,
        message: message || null,
        status: 'confirmed',
      }),
    })

    if (!bookingResp.ok) {
      // Rollback: un-book the slot since booking creation failed
      await fetch(
        `${supabaseUrl}/rest/v1/availability_slots?id=eq.${slotId}`,
        { method: 'PATCH', headers, body: JSON.stringify({ is_booked: false }) }
      )
      const text = await bookingResp.text()
      console.error('Failed to create booking:', text)
      return res.status(500).json({ error: 'Failed to create booking' })
    }

    const bookings = await bookingResp.json()
    const booking = bookings[0]

    // 4. Send emails (await both before responding — Vercel kills process after response)
    const emailResults = await Promise.allSettled([
      sendEmail({
        to: guestEmail,
        ...bookingConfirmationEmail({
          guestName,
          slotStart: slot.start_time,
          slotEnd: slot.end_time,
          timezone: timezone || 'America/New_York',
        }),
      }),
      sendEmail({
        to: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@satori-labs.cloud',
        ...adminBookingNotificationEmail({
          guestName,
          guestEmail,
          guestPhone: guestPhone || 'N/A',
          serviceInterest: serviceInterest || 'N/A',
          message: message || '',
          slotStart: slot.start_time,
          slotEnd: slot.end_time,
          bookingId: booking.id,
        }),
      }),
    ])

    for (const result of emailResults) {
      if (result.status === 'rejected') {
        console.error('Email send failed:', result.reason)
      }
    }

    return res.status(200).json({
      bookingId: booking.id,
      slotStart: slot.start_time,
      slotEnd: slot.end_time,
    })
  } catch (err) {
    console.error('create-booking error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
