# Launch Checklist — Satori Studios

> Pre-launch verification for https://www.satori-labs.cloud
> Last updated: 2026-03-01

---

## 1. Security (All Complete)

- [x] No API keys in frontend bundle (VITE_CLAUDE_API_KEY, VITE_SCREENSHOT_API_KEY, VITE_ADMIN_PASSWORD all removed)
- [x] All API endpoints authenticated:
  - `/api/create-checkout-session` — public (visitors need to checkout)
  - `/api/stripe-webhook` — Stripe signature verification (mandatory)
  - `/api/create-portal-session` — Bearer token + client ownership
  - `/api/onboarding-complete` — Bearer token + client ownership
  - `/api/admin-update-service` — Bearer token + admin role
  - `/api/claude` — Bearer token + admin role
  - `/api/screenshot` — Bearer token + admin role
  - `/api/create-booking` — public (visitors can book calls)
- [x] RLS policies on all 12 tables (audited, overly permissive orders policy dropped)
- [x] Stripe webhook signature verification mandatory (no fallback)
- [x] Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS, Permissions-Policy
- [x] Admin routes guarded by ProtectedRoute + role check
- [x] Input validation on all forms (LoginPage, CreateAccountPage, SettingsPage, OnboardingWizard)
- [x] Origin allowlisting on redirect URLs, encodeURIComponent on query params

---

## 2. Monitoring & Error Tracking

- [x] Sentry SDK integrated (`@sentry/react` in main.tsx)
- [x] ErrorBoundary reports to Sentry
- [x] Sentry only enabled in production (`enabled: import.meta.env.PROD`)
- [ ] **ACTION: Create Sentry project at sentry.io and get DSN**
- [ ] **ACTION: Set `VITE_SENTRY_DSN` env var in Vercel**

---

## 3. Stripe (Switch to Live Mode)

- [ ] **ACTION: Switch Stripe to live mode in Stripe Dashboard**
- [ ] **ACTION: Create live mode products/prices matching test mode (10 products, 17 prices)**
- [ ] **ACTION: Update `STRIPE_SECRET_KEY` in Vercel to live key**
- [ ] **ACTION: Update `VITE_STRIPE_PUBLISHABLE_KEY` in Vercel to live key**
- [ ] **ACTION: Create live mode webhook endpoint in Stripe Dashboard** pointing to `https://www.satori-labs.cloud/api/stripe-webhook`
- [ ] **ACTION: Update `STRIPE_WEBHOOK_SECRET` in Vercel to live webhook secret**
- [ ] **ACTION: Update Stripe price IDs in Supabase `services` table to match live mode prices**
- [ ] Verify test payment end-to-end in live mode

---

## 4. Domain & DNS

- [x] Production URL: https://www.satori-labs.cloud (Vercel)
- [x] HTTPS enforced (Vercel default + HSTS header)
- [ ] **ACTION: Purchase final production domain (if changing from satori-labs.cloud)**
- [ ] **ACTION: Configure DNS for production domain in Vercel**
- [ ] **ACTION: Update Supabase Auth redirect URLs if domain changes**
- [ ] **ACTION: Update Stripe webhook URL if domain changes**
- [ ] **ACTION: Update Google OAuth redirect URI if domain changes**

---

## 5. Environment Variables (Vercel)

Verify all are set for production:

- [x] `SUPABASE_URL`
- [x] `SUPABASE_SERVICE_ROLE_KEY`
- [x] `VITE_SUPABASE_URL`
- [x] `VITE_SUPABASE_ANON_KEY`
- [x] `STRIPE_SECRET_KEY` (needs live key)
- [x] `VITE_STRIPE_PUBLISHABLE_KEY` (needs live key)
- [x] `STRIPE_WEBHOOK_SECRET` (needs live secret)
- [x] `RESEND_API_KEY`
- [x] `RESEND_FROM_EMAIL`
- [x] `ADMIN_NOTIFICATION_EMAIL`
- [x] `CLAUDE_API_KEY`
- [x] `SCREENSHOT_API_KEY`
- [ ] `VITE_SENTRY_DSN` (pending Sentry project creation)

---

## 6. Testing Status

### Automated (Session 19 E2E)
- [x] Homepage & navigation
- [x] All marketing pages (services, pricing, case studies, 10 service detail pages)
- [x] Auth flows (login, logout, forgot password, protected routes)
- [x] Checkout flow (Stripe redirect, cancel, success page)
- [x] Booking flow (3-step form, schedule page)
- [x] Portal (all 9 routes with real data + empty states)
- [x] Admin portal (after race condition fix)
- [x] 404 page

### Manual Testing Needed
- [ ] **ACTION: Complete Stripe test payment (card → webhook → Supabase record → email)**
- [ ] **ACTION: Verify all email templates render correctly (order confirmation, payment failure, welcome, admin notification)**
- [ ] **ACTION: Cross-browser test (Chrome, Safari, Firefox)**
- [ ] **ACTION: Mobile test (iOS Safari, Android Chrome)**

---

## 7. Content & SEO

- [x] Meta tags & Open Graph tags
- [x] Favicon & app manifest
- [x] Case studies with realistic content (5 local service businesses)
- [x] Pricing matches Stripe products (all 10 services verified)
- [x] /design-system removed from public footer
- [ ] Review marketing copy for accuracy (optional pre-launch)

---

## 8. Performance

- [x] Admin portal lazy-loaded (code-split from marketing bundle)
- [x] Build produces optimized chunks
- [ ] Consider splitting main index.js chunk (1.6MB, could benefit from manual chunks) — post-launch

---

## 9. Go-Live Sequence

When ready to launch:

1. Create Sentry project → set `VITE_SENTRY_DSN` in Vercel
2. Create Stripe live products/prices → update Vercel env vars + Supabase price IDs
3. Create Stripe live webhook → update `STRIPE_WEBHOOK_SECRET`
4. Deploy to verify everything works
5. Do one live test payment
6. Confirm email delivery works
7. Update domain DNS if changing
8. Update all OAuth/webhook redirect URLs if domain changed
9. Final deploy & verify
