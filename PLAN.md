# PLAN.md - Satori Studios Backend Integration

> Strategic implementation plan for taking the project from UI-complete to production.
> Last updated: 2026-02-15

---

## Guiding Principles

1. **Don't refactor unless broken** - Figma-generated code works. Only touch it when it blocks integration.
2. **Production-grade error handling** - Every user-facing flow needs proper error states, loading states, validation.
3. **Solo developer reality** - Keep complexity low. Use managed services. Avoid building what you can buy.
4. **Minimal self-service at launch** - Portal is read-only + purchase. Add features based on real client feedback.
5. **Ship quality over speed** - No fixed deadline. Get it right.

---

## Implementation Order

The phases below are ordered by dependency. Each phase builds on the previous one.

### Phase 1: Foundation (Supabase + Vercel + Edge Functions)

**Why first:** Everything depends on having a database, auth provider, and deployment pipeline.

**Steps:**
1. Create Supabase project
2. Design and apply the full database schema:
   - `profiles` (extends Supabase auth.users with role, business info)
   - `clients` (client business details, onboarding status)
   - `services` (service catalog with pricing)
   - `orders` (purchase records)
   - `subscriptions` (active monthly subscriptions)
   - `projects` (project tracking per client)
   - `project_milestones` (timeline phases within a project)
   - `activity_log` (audit trail of all events)
   - `availability_slots` (booking calendar slots)
   - `bookings` (scheduled calls)
   - `case_studies` (generated case study content)
   - `analytics_snapshots` (placeholder for future GA4 data)
3. Set up RLS policies:
   - Admin role: full read/write on all tables
   - Client role: read-only on own records (filtered by `client_id = auth.uid()`)
   - Service catalog: public read
4. Set up Vercel project, link GitHub repo
5. Create edge functions:
   - `/api/claude` - Proxy for Claude API calls (remove VITE_ key exposure)
   - `/api/stripe-webhook` - Handle Stripe webhook events
6. Configure environment variables per environment (staging + production)
7. Set up preview deployments on PRs

**Deliverable:** Database running, auth working, deployment pipeline live.

---

### Phase 2: Authentication

**Why second:** Payments and portal both require auth. Can't build either without it.

**Steps:**
1. Install `@supabase/supabase-js`, create client singleton
2. Replace demo login (`LoginPage.tsx`) with Supabase Auth:
   - Email/password login
   - Google OAuth button
   - Password reset flow
3. Create auth context/provider wrapping the app
4. Add route guards:
   - `/portal/*` requires authenticated client
   - `/admin/*` requires authenticated admin
5. Handle session persistence (Supabase handles this via cookies/localStorage)
6. Add loading states during auth checks (prevent flash of wrong content)
7. Update `Navigation.tsx` to show login/logout based on auth state

**Deliverable:** Real login/logout, protected routes, session persistence.

---

### Phase 3: Stripe Integration

**Why third:** With auth in place, we can associate payments with real users.

**Steps:**
1. Configure Stripe products and prices (matching pricing table in CONTEXT.md)
2. Install `@stripe/stripe-js` and `@stripe/react-stripe-js`
3. Wire `CheckoutPage.tsx`:
   - Create Stripe Checkout Session (server-side via edge function)
   - Redirect to Stripe-hosted checkout or embed Stripe Elements
   - Handle success URL callback
4. On payment success (via webhook):
   - Auto-create Supabase user if doesn't exist
   - Create `order` record in database
   - Create `subscription` record for monthly services
   - Create `project` record with initial milestones
   - Send welcome email via Resend
   - Send order confirmation email
5. Wire portal "Add Services" to Stripe:
   - Create Checkout Session for add-on purchases
   - Handle webhook: update client's active services
6. Implement Stripe Customer Portal for subscription management (billing, cancellation)

**Deliverable:** Working payments end-to-end, purchase triggers account creation and onboarding.

---

### Phase 4: Portal Rework

**Why fourth:** With auth + database + payments, we can now show real data in the portal.

**Steps:**
1. Restructure portal routing:
   - Replace tab-state management with React Router nested routes
   - `/portal` layout with sidebar
   - `/portal/overview`, `/portal/analytics`, `/portal/services`, `/portal/settings`
2. Build portal layout:
   - Persistent sidebar with nav links
   - Mobile-responsive sidebar (drawer or bottom nav)
   - Breadcrumbs for nested views
3. Connect to real data:
   - Overview: fetch client's project + milestones from Supabase
   - Overview: fetch activity_log entries
   - Services: fetch client's active subscriptions/services
   - Settings: display auth user profile, allow email/password change
4. Add proper states:
   - Loading skeletons while fetching data
   - Empty states for new clients (no project yet, no activity)
   - Error states with retry buttons
5. Analytics tab: keep mock data with a "Coming Soon" badge (deferred)

**Deliverable:** Portal shows real client data, proper navigation, all states handled.

---

### Phase 5: Onboarding & Booking

**Why fifth:** With the core flow working, polish the intake and scheduling experience.

**Steps:**
1. Connect onboarding wizard to Supabase:
   - Save wizard data to `clients` table (business info, goals, brand, competitors)
   - Mark onboarding as complete in client profile
   - Trigger welcome email sequence
2. Build booking calendar:
   - Create `availability_slots` management in admin
   - Fetch available slots in booking page calendar
   - Create `bookings` record on selection
   - Send confirmation emails (client + admin)
   - Block booked slots from future selection
3. Add booking management in admin portal

**Deliverable:** Onboarding saves real data, booking calendar shows real availability.

---

### Phase 6: Email System

**Why sixth:** By now all the triggers for emails exist. Wire them up.

**Steps:**
1. Set up Resend account, verify sending domain
2. Create React Email templates (Resend supports React components):
   - Auth: signup confirmation, password reset, email verification
   - Commerce: order confirmation, payment receipt, subscription update/cancellation
   - Onboarding: welcome email, getting-started guide, onboarding reminder
   - Project: milestone completed, project update, status change
   - Reports: monthly summary (could be manual trigger initially)
3. Configure Supabase to use Resend for auth emails (custom SMTP)
4. Wire transactional emails into Stripe webhooks and Supabase triggers
5. Admin notification emails for new signups, purchases, bookings

**Deliverable:** All automated emails working, admin gets notified of key events.

---

### Phase 7: Admin Portal

**Why seventh:** By now the client-facing app is complete. Build the management layer.

**Steps:**
1. Scaffold new Vite app for admin subdomain
2. Shared Supabase config (same project, admin role)
3. Build admin features:
   - Dashboard: client count, revenue, recent activity
   - Client list: filterable/searchable, status indicators
   - Client detail: project timeline (editable), services, billing, notes
   - Project management: update milestones, add activity log entries
   - Availability calendar: manage bookable time slots
   - Case study wizard: migrate from main app, proxy Claude API via edge function
   - Service configuration: pricing, descriptions (migrated from SatoriProducts)
4. Deploy to Vercel as separate project on admin subdomain
5. Delete SatoriProjectTracker and SatoriProducts directories

**Deliverable:** Full admin portal replacing all standalone tools, deployed at admin subdomain.

---

### Phase 8: UX Polish & Content

**Steps:**
1. Fix mobile navigation (hamburger menu, portal sidebar on mobile)
2. Smooth page transition animations
3. Replace fictional case studies with realistic content
4. Add meta tags, Open Graph tags, favicon, app manifest
5. Add 404 page
6. Add root error boundary
7. Verify all responsive breakpoints
8. Cross-browser testing

**Deliverable:** Polished, production-quality user experience.

---

### Phase 9: Security Audit & Launch

**Steps:**
1. Verify no API keys in frontend bundle (`VITE_` audit)
2. Penetration test RLS policies (try accessing other clients' data)
3. Verify Stripe webhook signature validation
4. Check for OWASP top 10 vulnerabilities
5. Set up error tracking (Sentry)
6. Purchase production domain, configure DNS
7. Flip Stripe to live mode
8. Final staging review
9. Deploy to production
10. Smoke test all critical flows

**Deliverable:** Live, secure, production application.

---

## Architecture Diagram

```
                    +-----------------+
                    |   Vercel CDN    |
                    |  (Main App)     |
                    +--------+--------+
                             |
              +--------------+--------------+
              |                             |
     +--------v--------+         +---------v--------+
     | Marketing Pages |         |  Client Portal   |
     | (public)        |         |  (authenticated) |
     +--------+--------+         +---------+--------+
              |                             |
              +-------------+---------------+
                            |
                   +--------v--------+
                   | Vercel Edge Fns |
                   | /api/claude     |
                   | /api/stripe-wh  |
                   +--------+--------+
                            |
              +-------------+-------------+
              |                           |
     +--------v--------+       +---------v--------+
     |   Supabase      |       |     Stripe       |
     | - Auth           |       | - Payments       |
     | - PostgreSQL DB  |       | - Subscriptions  |
     | - RLS Policies   |       | - Webhooks       |
     +------------------+       +------------------+
              |
     +--------v--------+       +---------+--------+
     |    Resend        |       | Admin Portal     |
     | - Transactional  |       | (admin.subdomain)|
     |   emails         |       | - Separate Vite  |
     +------------------+       | - Same Supabase  |
                                +------------------+
```

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Figma code doesn't integrate well with Supabase | Medium | Don't refactor proactively. Adapt integration layer to fit existing code patterns. |
| Stripe webhook reliability | High | Implement idempotency keys, log all webhook events, add retry handling. |
| Solo developer bottleneck | High | Use managed services (Supabase, Stripe, Resend, Vercel). Avoid building custom infrastructure. |
| Client portal over-engineered | Medium | Launch read-only. Add self-service features only when clients request them. |
| API key exposure before edge function migration | High | Prioritize edge function setup in Phase 1. Don't launch without it. |
| Schema changes after launch | Medium | Use Supabase migrations. Design schema with flexibility (JSONB for extensible fields). |
