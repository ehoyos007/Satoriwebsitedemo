# TEST_LOG.md - Satori Studios Website

> QA activities, bug tracking, and test results.
> Last updated: 2026-02-15

---

## Test Infrastructure

**Current state:** No test framework configured. No unit tests, integration tests, or E2E tests exist.

**Planned setup:**
- Unit/Component tests: Vitest + React Testing Library
- E2E tests: Playwright (for critical user flows)
- API tests: Vitest (for edge functions and Supabase queries)

---

## Known Issues

### Security

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| SEC-001 | **Critical** | Claude API key exposed in frontend via `VITE_CLAUDE_API_KEY` in `.env.local`. Anyone can extract it from the browser bundle. | Open - Fix in Phase 1 (edge function proxy) |
| SEC-002 | **High** | `VITE_ADMIN_PASSWORD` in `.env.local` - plaintext admin password exposed in frontend. | Open - Replace with Supabase Auth |
| SEC-003 | **High** | Login page accepts any email/password combination (demo mode). | Open - Replace with real auth in Phase 2 |

### UX / UI

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| UX-001 | Medium | Mobile hamburger menu interactions feel clunky. | Open |
| UX-002 | Medium | Portal tab-based navigation should be sidebar + nested routes. | Open - Phase 4 |
| UX-003 | Medium | Page transition animations are jarring / unclear active states. | Open |
| UX-004 | Low | Case studies use fictional businesses (Summit Realty, etc.). | Open - Phase 8 |

### Data

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| DATA-001 | High | All portal data is hardcoded mock data (activity, analytics, services). | Open - Phase 4 |
| DATA-002 | Medium | Admin sub-apps (ProjectTracker, ServicesGuide) use localStorage only. Data lost on browser clear. | Open - Phase 7 |
| DATA-003 | Low | Supabase schema file exists but only covers 3 tables for sub-apps. Needs full schema. | Open - Phase 1 |

---

## Test Plan (To Be Executed)

### Critical Path Tests (Must pass before launch)

1. **Checkout Flow E2E**
   - Visit → select service → checkout → Stripe payment → account created → onboarding → portal
   - Test with: valid card, declined card, subscription + one-time combo

2. **Auth Flow E2E**
   - Login with email/password
   - Login with Google OAuth
   - Password reset flow
   - Session persistence (close tab, reopen)
   - Logout and verify protected routes redirect

3. **Portal Data Isolation**
   - Client A cannot see Client B's data
   - Admin can see all clients
   - Direct URL manipulation doesn't bypass RLS

4. **Stripe Webhooks**
   - Payment success → order created, email sent
   - Payment failure → proper error handling
   - Subscription cancellation → services deactivated
   - Webhook signature validation (reject unsigned)

5. **Booking Flow**
   - View available slots (only future, non-booked)
   - Book a slot → confirmation email
   - Slot no longer available after booking
   - Cancellation flow

6. **Email Delivery**
   - All template types render correctly
   - Links in emails work
   - Unsubscribe handling

### Regression Tests (Run after each major change)

- All 26 routes load without errors
- Navigation works on mobile and desktop
- Animations don't break or cause layout shifts
- Forms validate and submit correctly
- Charts render with data

---

## Test Results

_No tests have been run yet. This section will be updated as testing begins._
