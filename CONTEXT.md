# CONTEXT.md - Satori Studios Website

> Domain knowledge, architectural decisions, and project background.
> Last updated: 2026-02-15

---

## Business Overview

**Satori Studios** is a digital marketing agency targeting local service businesses (plumbers, HVAC, electricians, contractors). The platform has two main surfaces:

1. **Marketing Website** - Converts visitors into paying clients
2. **Client Portal** - Dashboard for project tracking, analytics, and service upsells
3. **Admin Portal** - Internal tools for managing clients, projects, services, and case studies (planned as a separate subdomain app: `admin.satoristudios.com`)

**Target Market:** Local service businesses. Communication should lead with ROI, use plain English, quantify results, and answer "Was hiring us worth it?"

---

## Pricing Structure

### Core Tiers

| Tier | Price |
|------|-------|
| Website Build | $999.95 |
| Growth System | $2,500 - $10,000 |
| Scale / Custom | $10,000+ |

### Add-On Services (Setup + Monthly)

| Service | Setup | Monthly |
|---------|-------|---------|
| GBP Optimization | $1,495 | $197/mo |
| Review Screener | $997 | $297/mo |
| AI Chat Bot | $1,497 | $147/mo |
| Local SEO | -- | $497/mo |
| Google Ads | $997 | $597/mo |
| Analytics Dashboards | $997 | $97/mo |
| Branding | $2,997 | -- |
| Graphic Design | $1,297 | -- |
| Custom CRM | $4,997 | $297/mo |

**Payment Model:** One-time setup fees + recurring monthly subscriptions via Stripe.

---

## Technology Stack (Decided)

| Layer | Technology | Status |
|-------|-----------|--------|
| **Frontend** | React 18 + Vite 6 + TypeScript | Built |
| **Styling** | Tailwind CSS 4 + Radix UI + custom theme | Built |
| **Animation** | Motion (Framer Motion) 12.x | Built |
| **Charts** | Recharts 2.15 | Built |
| **Forms** | React Hook Form 7.55 | Built |
| **Routing** | React Router DOM v7 | Built |
| **Auth** | Supabase Auth | Not started |
| **Database** | Supabase (PostgreSQL) | Schema drafted, not connected |
| **Payments** | Stripe (one-time + subscriptions) | Account exists, no products |
| **Email** | Resend | Not started |
| **AI** | Claude API (Sonnet 4) | Working (case study wizard) |
| **Screenshots** | ScreenshotOne API | Working |
| **Hosting** | Vercel Pro ($20/mo) | Not configured |
| **Scheduling** | Custom calendar with Supabase availability | Not started |
| **SEO** | Vite SPA with meta tags + prerendering | Not started |

---

## Architectural Decisions

### Authentication: Supabase Auth
- Email/password, OAuth (Google), magic links
- Integrates natively with Supabase RLS policies
- Two roles: **Admin** and **Client**
- Admin sees all data; clients see only their own

### Database: Supabase (PostgreSQL)
- Current schema (`supabase-schema.sql`) has 3 tables for admin sub-apps only
- Needs expansion to: users, clients, orders, subscriptions, services, projects, analytics_snapshots, reports, ga4_connections
- RLS policies for client data isolation
- Expected scale: 10-50 clients in first 6 months

### Payments: Stripe (One-time + Subscriptions)
- Stripe account exists, no products configured yet
- Setup fees as one-time charges
- Monthly services as recurring subscriptions
- Post-purchase flow: auto-create Supabase account + redirect to onboarding wizard
- Portal upsells: full Stripe checkout for add-on services

### Portal: Sidebar + Nested Routes
- **Rework from current tab-based state management**
- Each portal view gets its own URL (`/portal/analytics`, `/portal/services`, etc.)
- Persistent sidebar navigation
- Client portal is mostly **read-only at launch** with purchase capability
- Timeline view is **display-only** (admin updates from admin side)

### Admin Portal: Separate Subdomain App
- Deployed to `admin.satoristudios.com`
- Consolidates features from SatoriProjectTracker and SatoriProducts into this app
- Client management, project tracking, case study wizard, service configuration
- Shares Supabase backend with the main app

### Email: Resend
- Full suite at launch: auth emails, purchase receipts, onboarding sequence, project updates, milestone notifications, monthly reports
- Email-only notifications (no Slack/SMS at launch)

### Scheduling: Custom Calendar
- Build real functionality into the existing booking page calendar UI
- Supabase availability table for managing time slots (no Google Calendar dependency)
- Admin sets available slots, clients pick from them
- Confirmation and reminder emails via Resend

### Deployment: Vercel Pro
- Preview deployments on PRs
- Separate staging and production environments (different Supabase/Stripe configs)
- Edge functions for API proxying (Claude API, webhooks)
- Domain still needs to be purchased

### Error Handling: Production-Grade
- Error boundaries throughout the app
- Retry logic for API calls
- Proper validation messages on all forms
- Loading states and empty states everywhere
- Stripe handles PCI compliance for payment forms

### API Security
- Claude API key currently exposed in frontend (VITE_ prefix) -- **must move to edge function**
- All sensitive API calls should go through Vercel serverless/edge functions

### Refactoring Policy
- **Don't refactor unless broken** -- if Figma-generated code works, leave it
- Clean up only when a component blocks backend integration
- No speculative rewrites

### GA4 / Search Console Integration
- **Deferred** -- not in initial launch scope
- Portal analytics will use mock data until this is built
- When implemented: OAuth consent flow for connecting client GA4 accounts

---

## User Flows

### Visitor -> Client

```
Homepage -> Services/Pricing -> Book a Call -> Schedule -> Confirmation
                              -> Checkout -> Payment -> Auto-create account -> Onboarding Wizard -> Portal
```

### Client Portal (post-purchase)

```
Login -> Portal Dashboard (sidebar nav)
  -> Overview (project timeline, activity feed)
  -> Analytics (KPIs, charts -- mock data at launch)
  -> Add Services -> Stripe checkout -> Confirmation
  -> Settings (account management)
```

### Admin (separate app)

```
Login -> Admin Dashboard
  -> Client Management (list, detail, project status)
  -> Project Tracking (merged from SatoriProjectTracker)
  -> Service Configuration (merged from SatoriProducts)
  -> Case Study Wizard (AI-powered generation)
  -> Availability Management (calendar slots)
```

---

## Known UX Issues to Address

1. **Mobile menu UX** - Hamburger menu and mobile interactions need improvement
2. **Portal navigation** - Current tab-based state management is clunky; needs sidebar + nested routes
3. **Page transitions/animations** - Jarring transitions, unclear active states
4. **Case studies are fictional** - 4 existing case studies use made-up businesses; need realistic or real content

---

## Owner Concerns

1. **"Will clients actually use the portal?"** - Risk of over-engineering. Mitigated by launching with minimal self-service (read-only + purchase) and adding features based on actual client requests.
2. **"Technical debt from Figma-generated code"** - Mitigated by not refactoring unless something blocks integration. The code works; focus on wiring up the backend.

---

## Glossary

| Term | Meaning |
|------|---------|
| **GBP** | Google Business Profile |
| **RLS** | Row-Level Security (Supabase/PostgreSQL) |
| **Portal** | Client-facing dashboard at `/portal` |
| **Admin Portal** | Internal management app at `admin.satoristudios.com` |
| **SPA** | Single Page Application (current Vite architecture) |
| **Edge Function** | Serverless function running at Vercel's edge (for API proxying) |
| **Motion** | Animation library (formerly Framer Motion) |
