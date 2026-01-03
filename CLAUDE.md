# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Figma-generated React website** for Satori Studios, a service provider offering web development, SEO, and review management services. The project was generated from Figma Make and maintains design-driven development patterns.

**Origin:** Generated from Figma design file at https://www.figma.com/design/jnB0peHi261citNA6scOXG/Global-Copy-for-Website--Copy-

## Development Commands

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

**Note:** There are no test, lint, or type-check commands configured in this project.

## Architecture & Key Patterns

### Application Structure

The app follows a **client-side routing architecture** with React Router DOM v7:

- **Entry Point:** `src/main.tsx` → `src/app/App.tsx`
- **Root Component:** App.tsx sets up BrowserRouter and wraps all content with:
  - `AnimatedGalaxyBackground` - Persistent animated background across entire site
  - `Navigation` - Global navigation bar
  - Routes configuration
  - `Footer` - Global footer

### Routing Organization

Routes are organized by user journey flow:

1. **Marketing Pages:** `/`, `/services`, `/pricing`, `/case-studies`
2. **Service Detail Pages:** `/services/website-build`, `/services/google-business-profile`, `/services/review-screener`
3. **Authentication:** `/login`
4. **Booking Flow:** `/book-call` → `/booking/schedule` → `/booking/confirmation`
5. **Checkout Flow:** `/checkout` → `/checkout/create-account`
6. **Onboarding Flow:** `/onboarding` → `/onboarding/success`
7. **Portal:** `/portal` (single route with internal tab-based navigation)

### Portal Architecture Pattern

The portal (`/portal`) uses **internal state-based navigation** instead of nested routes:

- Single route `/portal` renders `PortalDashboard.tsx`
- Tab-based navigation managed by `activeTab` state
- Views are conditionally rendered components (AddServicesView, ServiceDetailView, etc.)
- Service selection flows use local state (`selectedServiceId`, `checkoutService`)
- This pattern keeps all portal state centralized without URL changes

### UI Component System

The project uses **Radix UI primitives** wrapped in custom styled components:

- **Location:** `src/app/components/ui/`
- **Pattern:** Each component uses `cn()` utility (from `utils.ts`) for className merging
- **Styling:** Tailwind CSS 4.x with custom theme variables
- **Utility:** `cn()` combines `clsx` and `tailwind-merge` for conditional classes

```tsx
// Standard component pattern
import { cn } from './utils'

<Component className={cn("base-classes", conditionalClass && "conditional-classes")} />
```

### Styling System

**Theme Architecture:**
- `src/styles/index.css` - Main entry, imports fonts, tailwind, and theme
- `src/styles/theme.css` - CSS custom properties for colors and themes
- `src/styles/tailwind.css` - Tailwind directives
- `src/styles/fonts.css` - Font face definitions

**Visual Effects:**
- Noise texture overlay on body (via CSS ::before pseudo-element)
- Custom animations: aurora, float, pulse-glow, data-flow
- Utility classes: `.glow-cyan`, `.glass-panel`, `.gradient-border`

**Color Scheme:**
- Base background: `#0a0a0f` (very dark blue-black)
- Glass morphism patterns with backdrop blur
- Gradient accents: cyan (#22d3ee), violet (#a78bfa), emerald (#34d399)

### Path Aliases

The project uses `@` alias for imports:

```tsx
import { Component } from '@/app/components/Component'
import '@/styles/index.css'
```

**Configuration:** Defined in `vite.config.ts` - resolves `@` to `./src`

### Data Management

Static data is stored in `src/app/data/`:
- `caseStudies.ts` - Case study content and metadata

**Pattern:** No global state management (Redux, Zustand, etc.). Component-level state with useState/props.

### Form Handling

Forms use **React Hook Form** library:
- Installed: `react-hook-form@7.55.0`
- UI integration via `src/app/components/ui/form.tsx` (Radix + RHF)
- Look for existing form patterns before creating new ones

### Animation Library

**Motion (formerly Framer Motion)** for animations:
- Package: `motion@12.23.24`
- Import: `import { motion } from 'motion/react'`
- Used extensively in page transitions and interactive elements

### Charts & Data Visualization

**Recharts** for analytics dashboards:
- Package: `recharts@2.15.2`
- Used in portal analytics views
- Custom chart components in `src/app/components/ui/chart.tsx`

## Important Development Notes

### Vite Configuration Requirements

**DO NOT remove** the React and Tailwind plugins from `vite.config.ts`:

```ts
plugins: [
  react(),
  tailwindcss(), // Required by Figma Make even if not actively used
]
```

These plugins are required by Figma Make's code generation system.

### Component Development

When adding new components:

1. **Use existing UI primitives** from `src/app/components/ui/` whenever possible
2. **Follow the established patterns:** Material UI and Radix UI are both available
3. **Use the `cn()` utility** for className composition
4. **Match the visual style:** Dark theme, glass morphism, gradient accents

### Adding New Routes

1. Import page component in `src/app/App.tsx`
2. Add `<Route>` element in the appropriate flow section
3. Ensure the page includes proper layout elements or wraps content appropriately
4. Portal sub-views should be added as conditionally rendered components, not routes

### Portal Development

When modifying the portal:
- The portal uses internal tab navigation (`activeTab` state)
- Service flows use local state transitions (not routes)
- Purchased services tracked in component state
- Analytics views are separate components conditionally rendered

## Figma-Generated Code

This project was generated from Figma Make. Key implications:

- Component structure reflects Figma design layers
- Asset naming uses hash-based filenames (see `src/assets/`)
- Some components may have Figma-specific naming conventions
- The design system is derived from Figma design tokens

## Business Context & Project Goals

### What We're Building

Satori Studios is a digital marketing agency platform with two parts:
1. **Marketing Website** (Current Focus) — Convert visitors into paying clients
2. **Client Portal** (Future) — Dashboard for project tracking, analytics, upsells
**Target Market:** Local service businesses (plumbers, HVAC, electricians, contractors)

### Pricing Structure

**Core Offering:**
| Tier | Price |
|------|-------|
| Website Build | $999.95 |
| Growth System | $2,500–$10,000 |
| Scale / Custom | $10,000+ |

**Additional Services (Setup + Monthly):**
| Service | Setup | Monthly |
|---------|-------|---------|
| GBP Optimization | $1,495 | $197/mo |
| Review Screener | $997 | $297/mo |
| AI Chat Bot | $1,497 | $147/mo |
| Local SEO | — | $497/mo |
| Google Ads | $997 | $597/mo |
| Analytics Dashboards | $997 | $97/mo |
| Branding | $2,997 | — |
| Graphic Design | $1,297 | — |
| Custom CRM | $4,997 | $297/mo |

### Design System
```
Background:        #0a0a0f
Primary:           cyan-400 (#22d3ee)
Secondary:         violet-400 (#a78bfa)
Success:           emerald-400 (#34d399)
Warning:           amber-400 (#fbbf24)
Error:             red-400 (#f87171)
```

**Effects:** Glass panels with backdrop-blur, gradient borders (cyan-to-violet), gradient theadlines

### Current Development Phase

- **Phase 0:** Project Setup ✅ COMPLETE
- **Phase 1:** Foundation & Navigation 🔄 IN PROGRESS
  - Global layout wrapper
  - Header component
  - Footer component
  - Background effects
- **Phase 2-7:** Homepage → Services → Pricing → Case Studies → Checkout → Polish

### Integration Strategy

**Build Now:**
- All UI components and pages
- Placeholder data
- Calendly embed (account exists)

**Build Later:**
- Stripe (UI first, integration later)
- Authentication (Clerk or Supabase)
- Analytics APIs (GA4, Search Console)
- Service tool adapters

### Special Features Planned

**Case Study Wizard:** Guided form to easily create new case studies
- Asks structured questions
- Collects project URL
- AI generates formatted case study

### Target Audience Communication

- Lead with ROI and business value
- Use plain English, avoid jargon
- Quantify results (e.g., "342 hours saved = $25,650 value")
- Answer: "Was hiring us worth it?"

### Hosting

Vercel Pro ($20/mo) for commercial compliance
