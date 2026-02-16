# TASKS.md - Satori Studios Website

> Active task tracking. Organized by phase and priority.
> Last updated: 2026-02-16 (end of session 14)

---

## Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete
- `[!]` Blocked
- **P0** = Must have for launch | **P1** = Should have | **P2** = Nice to have | **P3** = Deferred

---

## Phase 1: Infrastructure & Backend Setup

### 1.1 Supabase Setup (P0) -- COMPLETE
- [x] Create Supabase project (ref: `cbeurhcgvqptclggkbhb`)
- [x] Design full database schema (12 tables, 7 enum types)
- [x] Implement RLS policies for client data isolation (admin/client + helper functions)
- [ ] Set up Supabase Auth (email/password + Google OAuth) -- moved to Phase 2
- [x] Create database seed data (10 services with pricing)
- [x] Install `@supabase/supabase-js` and configure client in app
- [x] Generate TypeScript types from schema

### 1.2 Stripe Setup (P0) -- COMPLETE
- [x] Configure Stripe products and prices matching the pricing table (10 products, 17 prices)
- [x] Set up one-time charges for setup fees (7 products)
- [x] Set up recurring subscriptions for monthly services (7 products)
- [x] Install `stripe` and `@stripe/stripe-js`
- [x] Create checkout session API endpoint (`api/create-checkout-session.ts`)
- [x] Create Stripe webhook handler (`api/stripe-webhook.ts`) — handles checkout.session.completed, subscription events, invoice failures
- [x] Rewire CheckoutPage to use Stripe Checkout (hosted) — fetches service from Supabase, redirects to Stripe
- [x] Create CheckoutSuccessPage with next-step CTAs
- [x] Register webhook endpoint in Stripe (signature verification enabled)
- [x] Store Stripe price IDs in Supabase services table (migration applied)
- [x] Set Vercel env vars: STRIPE_SECRET_KEY, VITE_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
- [x] Handle payment success: webhook creates pending client + order for new customers (user_id=null), links to profile for existing users
- [x] Wire all "Buy Website" CTAs to `/checkout?service=website-build` (HomePage, Navigation, PricingPage, WebsiteBuildPage)
- [x] Fix Vercel env var `\n` corruption on all 7 production env vars
- [x] End-to-end payment test verified: checkout → Stripe → webhook → Supabase records
- [ ] Link pending client to profile on account signup (post-checkout create-account flow)

### 1.3 Vercel Deployment (P0) -- MOSTLY COMPLETE
- [x] Set up Vercel project and link (project: `satoriwebsitedemo`)
- [x] Configure environment variables (Supabase URL/anon, Claude API key, service role key)
- [x] Create Vercel edge function to proxy Claude API calls (fix API key exposure)
- [x] Deploy and verify production build (live at https://www.satori-labs.cloud)
- [x] Create `vercel.json` with SPA rewrites
- [x] Create Stripe webhook edge function placeholder (`api/stripe-webhook.ts`)
- [ ] Purchase production domain (currently using satori-labs.cloud)
- [ ] Set up preview deployments on PRs
- [ ] Create staging environment with separate Supabase/Stripe configs

### 1.4 Email System (P1) -- MOSTLY COMPLETE
- [x] Set up Resend account and verify domain (DNS records in Vercel)
- [x] Set Vercel env vars: RESEND_API_KEY, RESEND_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL
- [x] Create onboarding welcome email (styled HTML via Resend REST API)
- [x] Create admin notification email on new client onboarding
- [x] Create shared email helper (`api/_lib/email.ts`) — reusable sendEmail() wrapping Resend REST API
- [x] Create email templates file (`api/_lib/email-templates.ts`) — dark theme base layout + 3 templates
- [x] Create order confirmation email (customer) — service, amount, next steps, portal CTA
- [x] Create admin purchase notification email — service, amount, customer, Stripe session link
- [x] Create payment failure email (customer) — alert, retry instructions, billing portal CTA
- [x] Wire order confirmation + admin notification to `checkout.session.completed` webhook (fire-and-forget)
- [x] Wire payment failure email to `invoice.payment_failed` webhook (fire-and-forget)
- [ ] Create email templates: signup confirmation, password reset, email verification
- [ ] Create email templates: onboarding reminders, getting-started guide
- [ ] Create email templates: project updates, milestone notifications
- [ ] Create email template: monthly report
- [ ] Wire up Supabase Auth to send emails via Resend (custom SMTP — manual Dashboard config)

---

## Phase 2: Authentication & Account System

### 2.1 Auth Integration (P0) -- COMPLETE
- [x] Replace demo login with Supabase Auth login
- [x] Add signup flow (email+password and magic link)
- [x] Implement session persistence (stay logged in via onAuthStateChange)
- [x] Add password reset flow (ForgotPasswordPage + ResetPasswordPage)
- [x] Add Google OAuth login option (button wired, needs Supabase Dashboard config)
- [x] Implement auth guards on protected routes (`/portal`, `/onboarding`, `/admin`)
- [x] Add loading/redirect states for auth checks
- [x] Auth-aware navigation (user dropdown when logged in)
- [x] Portal shows real user data from profile

### 2.2 User Roles (P0) -- COMPLETE (via RLS + ProtectedRoute)
- [x] Implement admin vs client role distinction in Supabase (profile.role enum)
- [x] Admin role: sees all clients, all data (RLS policies from session 2)
- [x] Client role: sees only own data (enforced by RLS from session 2)
- [x] Route guards: redirect non-admin from admin routes (ProtectedRoute requiredRole)

### 2.3 Auth Config (P0) -- COMPLETE
- [x] Enable Google OAuth provider in Supabase Dashboard (add Google client ID/secret)
- [x] Add redirect URLs in Supabase Auth config: `http://localhost:5173/auth/callback`, `https://www.satori-labs.cloud/auth/callback`
- [x] Add redirect URLs for password reset: `http://localhost:5173/reset-password`, `https://www.satori-labs.cloud/reset-password`
- [x] Fix handle_new_user trigger for OAuth (migration `20260216000001_fix_handle_new_user.sql`)
- [x] Fix AuthCallbackPage PKCE code exchange
- [ ] Optionally disable email confirmation for dev testing

---

## Phase 3: Payment & Checkout Flow

### 3.1 Checkout Integration (P0) -- COMPLETE
- [x] Wire checkout page to Stripe (Checkout Session via `api/create-checkout-session.ts`)
- [x] Handle payment success callback (CheckoutSuccessPage at `/checkout/success`)
- [x] Auto-create pending client + order on payment (webhook handles both new and existing users)
- [x] Link pending client to profile on account signup (migration 20260216000004 — handle_new_user trigger)
- [x] Redirect to onboarding wizard after account creation (CheckoutSuccessPage smart routing)
- [x] Store order record in Supabase (webhook creates order with service, amount, status, session ID)
- [x] Activity log entry on purchase
- [x] Send order confirmation email via Resend (wired in stripe-webhook.ts)

### 3.2 Portal Upsell Checkout (P0) -- WIRED
- [x] Wire "Add Services" flow in portal to Stripe (navigates to /checkout?service=<slug>)
- [x] Create Stripe Checkout Session for add-on services (reuses existing create-checkout-session API)
- [x] Handle subscription creation for monthly services (webhook already handles subscription events)
- [x] Update client's active services in Supabase on payment success (webhook creates project, portal fetches real orders/subs)
- [x] Send purchase confirmation email (shared with checkout.session.completed handler)

### 3.3 Error Handling (P0) -- COMPLETE
- [x] Add error boundaries around app (global ErrorBoundary with recovery UI)
- [x] Add loading states for all async operations (all portal pages)
- [x] Surface data fetch errors to users (OverviewPage, ServicesPage, BillingPage, ProjectPage)
- [x] Handle payment failures with clear user messaging (canceled banner, success page edge cases, retryFetch on checkout)
- [x] Add retry logic for transient API failures (retryQuery + retryFetch utility, applied to all portal pages + useClientData)
- [x] Validate all form inputs with clear error messages (LoginPage, CreateAccountPage, SettingsPage — inline per-field errors on blur + submit)

---

## Phase 3B: Onboarding Wizard Integration (P0) -- COMPLETE

### 3B.1 Onboarding Backend Wiring
- [x] Add form state & input bindings to OnboardingWizard (all 6 steps)
- [x] Add step-level validation (required fields per step, inline errors)
- [x] Create Supabase Storage bucket `onboarding-assets` with RLS policies (migration)
- [x] Wire file upload zones (logo + brand assets) with real Supabase Storage uploads
- [x] Wire availability calendar to Supabase `availability_slots` table
- [x] Client record lookup with 3-retry for trigger race condition + fallback creation
- [x] Auto-save form data on step change (debounced to `clients.onboarding_data`)
- [x] Partial data restoration on page refresh (`_partial` flag + `_lastStep`)
- [x] Completion handler: upload files → build JSONB → update client → log activity → send emails → navigate
- [x] Create `api/onboarding-complete.ts` serverless function (welcome email + admin notification via Resend)
- [x] Dynamic OnboardingSuccess page (business name, kickoff call details, skipped scheduling)
- [x] Smart routing on CheckoutSuccessPage (onboarding vs portal based on `onboarding_completed`)
- [x] Fix auth loading state stuck at `true` (added `.catch()` + non-blocking `fetchProfile`)
- [x] Verified E2E: wizard → complete → data in Supabase → success page → CheckoutSuccess routing

---

## Phase 4: Portal Rework -- COMPLETE

### 4.1 Navigation Overhaul (P0) -- COMPLETE
- [x] Replace tab-based state navigation with sidebar + nested routes
- [x] Create portal layout with persistent sidebar (`PortalLayout.tsx`)
- [x] Add 12 nested routes: overview, analytics, analytics/page/:pageUrl, analytics/keyword/:keyword, services, services/:serviceId, project, assets, notes, messages, billing, settings
- [x] Sidebar active state via `useLocation()` pathname matching
- [x] Deep-linking and browser back/forward navigation works
- [x] Fix mobile portal navigation for sidebar (collapsible toggle with current page indicator)
- [ ] Add breadcrumbs for deep views (e.g., service detail)
- [ ] Fix page transition animations (currently jarring)

### 4.2 Real Data Integration (P0) -- COMPLETE
- [x] Project page: real data from `projects` + `project_milestones` tables
- [x] Assets page: Supabase Storage integration (upload, download, preview, delete)
- [x] Notes page: CRUD on `activity_log` where type='note'
- [x] Messages page: chronological feed of all activity types with compose
- [x] Billing page: real `orders` + `subscriptions` data, Stripe portal redirect
- [x] Settings page: editable profile (name/phone), password change, read-only business info
- [x] Services page: real purchased service detection from orders/subscriptions
- [x] Empty states for all views (new client with no data)
- [x] Loading states for all data fetches
- [x] Created `api/create-portal-session.ts` for Stripe billing portal

### 4.3 Analytics Tab (P2 - Deferred)
- [ ] Keep mock data for launch
- [ ] Design GA4 OAuth flow for future implementation
- [ ] Build GA4 + Search Console API integration (post-launch)

---

## Phase 5: Admin Portal (Separate App)

### 5.1 Admin App Scaffold (P1)
- [ ] Create new Vite app for `admin.satoristudios.com`
- [ ] Set up shared Supabase client configuration
- [ ] Build admin auth (admin-only login)
- [ ] Create admin layout with sidebar navigation
- [ ] Deploy to Vercel as separate project on admin subdomain

### 5.2 Client Management (P1)
- [ ] Client list view (all clients with status, service, last activity)
- [ ] Client detail view (project timeline, services, billing, notes)
- [ ] Update project status/timeline (reflects in client portal)
- [ ] Activity log per client

### 5.3 Merge Existing Sub-Apps (P1)
- [ ] Port SatoriProjectTracker features into admin portal
- [ ] Port SatoriProducts features into admin portal
- [ ] Migrate data from localStorage to Supabase
- [ ] Remove standalone sub-app directories after merge

### 5.4 Case Study Wizard Migration (P1)
- [ ] Move Case Study Wizard into admin portal
- [ ] Proxy Claude API calls through edge function (fix security)
- [ ] Save generated case studies to Supabase
- [ ] Add case study management (list, edit, publish/unpublish)

### 5.5 Availability Management (P1)
- [ ] Build calendar availability management UI
- [ ] Create Supabase `availability_slots` table
- [ ] CRUD for time slots (admin sets available times)
- [ ] Wire to booking page calendar in main app

---

## Phase 6: Booking & Scheduling

### 6.1 Booking Calendar (P1)
- [ ] Connect existing calendar UI to Supabase availability table
- [ ] Show real available slots based on admin-configured times
- [ ] Create booking record in Supabase when client books
- [ ] Send confirmation email to client
- [ ] Send notification email to admin
- [ ] Block slot after booking (prevent double-booking)
- [ ] Add booking cancellation/reschedule flow

---

## Phase 7: UX Polish

### 7.1 Navigation Fixes (P1) -- MOSTLY COMPLETE
- [x] Fix mobile hamburger menu interactions (backdrop close, scroll lock, escape key)
- [x] Improve active states in navigation (underline animation on active route)
- [ ] Smooth page transition animations
- [x] Add scroll-to-top on route changes

### 7.2 Content Updates (P1)
- [ ] Replace fictional case studies with realistic or real content
- [ ] Review and update marketing copy accuracy
- [x] Verify pricing displayed matches actual Stripe products (all 10 services match)

### 7.3 Production Polish (P0) -- MOSTLY COMPLETE
- [x] Add loading states everywhere (buttons, pages, data fetches)
- [x] Add empty states for all data-dependent views
- [x] Add 404 page (styled NotFoundPage with catch-all route)
- [x] Add error boundary at app root (ErrorBoundary with Refresh/Go Home)
- [ ] Verify responsive design on all breakpoints
- [x] Add meta tags / Open Graph tags for SEO and social sharing
- [x] Add favicon and app manifest

---

## Phase 8: Testing & Launch Prep

### 8.1 Testing (P0)
- [ ] End-to-end test: visitor -> checkout -> account creation -> onboarding -> portal
- [ ] Test Stripe webhooks (payment success, failure, subscription events)
- [ ] Test auth flows (login, signup, password reset, OAuth)
- [ ] Test portal data displays correctly per client
- [ ] Test admin portal client management
- [ ] Test booking flow (availability -> book -> confirmation -> email)
- [ ] Test email delivery (all templates)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS Safari, Android Chrome)

### 8.2 Security Audit (P0)
- [ ] Verify no API keys exposed in frontend bundle
- [ ] Verify RLS policies prevent cross-client data access
- [ ] Verify admin routes are properly guarded
- [ ] Review Stripe webhook signature verification
- [ ] Check for XSS, CSRF, injection vulnerabilities
- [ ] Verify HTTPS everywhere

### 8.3 Launch (P0)
- [ ] Final staging environment review
- [ ] DNS configuration for production domain
- [ ] Production environment variables set
- [ ] Stripe in live mode (not test mode)
- [ ] Monitoring/error tracking set up (Sentry or similar)
- [ ] Launch checklist completed

---

## Backlog (Post-Launch)

- [ ] GA4 + Search Console API integration for real portal analytics
- [ ] Client file upload capability (brand assets, content)
- [ ] Client feedback/approval system for deliverables
- [ ] Monthly automated report generation and email
- [ ] CRM features (leads, contacts, pipeline)
- [ ] SMS notifications
- [ ] Slack integration for internal alerts
- [ ] Multi-tenant isolation improvements
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] A/B testing on landing pages
- [ ] Referral program system
