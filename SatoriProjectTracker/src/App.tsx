import { useState, useEffect } from 'react';

const STORAGE_KEY = 'satori-project-tracker-progress';

// Default completed tasks based on current project state (as of project review)
// Format: "phaseIndex-taskIndex-subtaskIndex": true
const DEFAULT_COMPLETED_TASKS: Record<string, boolean> = {
  // Phase 0: Pre-Launch Setup
  // Task 0.2: Development Environment Setup - ALL COMPLETE
  "0-1-0": true, // Clone/initialize Satori project repository
  "0-1-1": true, // Configure local development environment
  "0-1-2": true, // Verify all dependencies install correctly
  "0-1-3": true, // Run local dev server and confirm all pages render
  "0-1-4": true, // Set up GitHub repository with main/staging branches

  // Phase 1: Marketing Website Build
  // Task 1.1: Homepage Development - ALL COMPLETE
  "1-0-0": true, // Hero section with gradient headline and dual CTAs
  "1-0-1": true, // Animated proof metrics section
  "1-0-2": true, // Interactive lead chart with Recharts
  "1-0-3": true, // Service cards grid with icons
  "1-0-4": true, // Pricing preview section (3 tiers)
  "1-0-5": true, // Testimonials carousel/grid
  "1-0-6": true, // Final CTA section with animated glow background
  "1-0-7": true, // All animations work smoothly (Motion/Framer)

  // Task 1.2: Services Pages - ALL COMPLETE
  "1-1-0": true, // Services overview page (/services)
  "1-1-1": true, // Website-build service detail page
  "1-1-2": true, // GBP optimization service detail page
  "1-1-3": true, // Review screener service detail page
  "1-1-4": true, // Consistent template across all service pages
  "1-1-5": true, // Pricing breakdowns with setup + monthly format

  // Task 1.3: Pricing Page - MOSTLY COMPLETE
  "1-2-0": true, // Tier comparison table
  "1-2-1": true, // Additional services pricing grid
  "1-2-2": true, // FAQ accordion section
  // 1-2-3: Pricing calculator (optional) - NOT DONE
  "1-2-4": true, // Mobile-friendly pricing tables

  // Task 1.4: Case Studies Page - ALL COMPLETE
  "1-3-0": true, // Case studies listing page
  "1-3-1": true, // Individual case study detail template
  "1-3-2": true, // Integrate prepared case study content
  "1-3-3": true, // Before/after visuals and metrics
  "1-3-4": true, // Client testimonial quotes

  // Task 1.5: Checkout Flow - UI COMPLETE (no Stripe integration)
  "1-4-0": true, // Checkout page with package selection
  "1-4-1": true, // Optional add-on services checkboxes
  "1-4-2": true, // Order summary sidebar with line items
  // 1-4-3: Stripe Elements - NOT DONE (needs real Stripe)
  "1-4-4": true, // Terms acceptance checkbox
  "1-4-5": true, // Account creation page
  // 1-4-6: Success/confirmation page - NOT DONE
  // 1-4-7: Webhook handler - NOT DONE (needs backend)

  // Task 1.6: Book a Call Flow - UI COMPLETE
  "1-5-0": true, // Call booking landing page (/book-call)
  "1-5-1": true, // Calendly/Cal.com embed (schedule page exists)
  "1-5-2": true, // Booking confirmation page
  // 1-5-3: Calendar notifications - NOT DONE (needs backend)

  // Task 1.7: Authentication Setup - PARTIAL (UI only)
  // 1-6-0: Set up auth provider - NOT DONE
  "1-6-1": true, // Login page (/login) - EXISTS with demo mode
  // 1-6-2: Password reset flow - NOT DONE
  // 1-6-3: Connect account creation - NOT DONE
  // 1-6-4: OAuth options - NOT DONE

  // Task 1.8: Analytics & Tracking - NOT DONE
  // Task 1.9: Production Deployment - NOT DONE

  // Phase 2: Sales Enablement
  // Task 2.4: Build Demo Client Portal - PARTIAL
  "2-3-0": true, // Demo account with realistic placeholder data
  "2-3-1": true, // Project timeline with sample stages
  "2-3-2": true, // Sample activity feed entries
  "2-3-3": true, // Demo analytics view with impressive data
  "2-3-4": true, // Sample services in 'Add Services' tab
  // 2-3-5: Demo login credentials - NOT FORMALLY SET UP
  // 2-3-6: Demo Mode banner - NOT DONE

  // Phase 3: Client Portal Build
  // Task 3.2: Onboarding Wizard - UI COMPLETE
  "3-1-0": true, // Step 1: Business Information form
  "3-1-1": true, // Step 2: Website Goals form
  "3-1-2": true, // Step 3: Brand & Style preferences
  "3-1-3": true, // Step 4: Copy & Content input
  "3-1-4": true, // Step 5: Competitors input
  "3-1-5": true, // Step 6: Schedule Kickoff
  "3-1-6": true, // Progress indicator
  // 3-1-7: Auto-save - NOT DONE (needs backend)
  "3-1-8": true, // Success/completion page
  // 3-1-9: Connect to database - NOT DONE
  // 3-1-10: File upload - NOT DONE (needs backend)

  // Task 3.3: Portal Dashboard - Overview Tab - UI COMPLETE
  "3-2-0": true, // Project timeline component (6 stages)
  "3-2-1": true, // Action required panel with task cards
  "3-2-2": true, // Upcoming call card with join/reschedule
  "3-2-3": true, // Recent activity feed
  "3-2-4": true, // Quick action buttons
  // 3-2-5: Connect to real data - NOT DONE (uses demo data)
  "3-2-6": true, // Handle empty states gracefully

  // Task 3.4: Portal Dashboard - Analytics Tab - UI COMPLETE
  "3-3-0": true, // Global filters (date range, source, device)
  "3-3-1": true, // KPI cards grid
  "3-3-2": true, // Traffic chart with Recharts
  "3-3-3": true, // Channel breakdown component
  "3-3-4": true, // Top pages table with drill-down
  "3-3-5": true, // Conversions table
  "3-3-6": true, // Placeholder/demo data mode
  "3-3-7": true, // Document integration points

  // Task 3.5: Portal Dashboard - Add Services Tab - PARTIAL
  "3-4-0": true, // Service cards grid with categories
  "3-4-1": true, // Service detail modal with pricing
  // 3-4-2: Purchase flow (Stripe) - NOT DONE
  "3-4-3": true, // 'Active' badge for purchased services
  "3-4-4": true, // Service status/metrics when active
  // 3-4-5: Subscription management - NOT DONE (needs Stripe)
};

interface Task {
  title: string;
  subtasks?: string[];
  completionCriteria?: string[];
  note?: string;
  notes?: string[];
}

interface Phase {
  name: string;
  timeline: string;
  description: string;
  color: 'slate' | 'cyan' | 'violet' | 'emerald' | 'amber';
  tasks: Task[];
}

export default function App() {
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({0: true, 1: false, 2: false, 3: false, 4: false});
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // Merge saved data with defaults (saved takes precedence)
        return { ...DEFAULT_COMPLETED_TASKS, ...JSON.parse(saved) };
      }
      return { ...DEFAULT_COMPLETED_TASKS };
    }
    return { ...DEFAULT_COMPLETED_TASKS };
  });
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
      setLastSaved(new Date().toLocaleTimeString());
    }
  }, [completedTasks]);

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This will reset to the baseline (already completed tasks will remain checked).')) {
      setCompletedTasks({ ...DEFAULT_COMPLETED_TASKS });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPLETED_TASKS));
    }
  };

  const togglePhase = (index: number) => {
    setExpandedPhases(prev => ({...prev, [index]: !prev[index]}));
  };

  const toggleTask = (phaseIndex: number, taskIndex: number, subtaskIndex: number | null = null) => {
    const key = subtaskIndex !== null
      ? `${phaseIndex}-${taskIndex}-${subtaskIndex}`
      : `${phaseIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({...prev, [key]: !prev[key]}));
  };

  const isTaskComplete = (phaseIndex: number, taskIndex: number, subtaskIndex: number | null = null) => {
    const key = subtaskIndex !== null
      ? `${phaseIndex}-${taskIndex}-${subtaskIndex}`
      : `${phaseIndex}-${taskIndex}`;
    return completedTasks[key] || false;
  };

  const getPhaseProgress = (phaseIndex: number) => {
    const phase = phases[phaseIndex];
    let total = 0;
    let completed = 0;

    phase.tasks.forEach((task, taskIndex) => {
      if (task.subtasks) {
        task.subtasks.forEach((_, subtaskIndex) => {
          total++;
          if (isTaskComplete(phaseIndex, taskIndex, subtaskIndex)) completed++;
        });
      } else {
        total++;
        if (isTaskComplete(phaseIndex, taskIndex)) completed++;
      }
    });

    return { total, completed, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const phases: Phase[] = [
    {
      name: "Phase 0: Pre-Launch Setup",
      timeline: "Before Week 1",
      description: "Foundation work before building the marketing website",
      color: "slate",
      tasks: [
        {
          title: "0.1 Domain & Hosting Setup",
          subtasks: [
            "Research and purchase primary domain (satoristudios.com or similar)",
            "Set up Vercel or Netlify account for deployment",
            "Configure DNS settings and SSL certificate",
            "Set up staging environment URL for development testing"
          ],
          completionCriteria: [
            "Domain is purchased and verified in registrar",
            "Hosting platform account is active with payment configured",
            "DNS is propagating (can take 24-48 hours)",
            "Staging URL is accessible (e.g., staging.satoristudios.com)"
          ]
        },
        {
          title: "0.2 Development Environment Setup",
          subtasks: [
            "Clone/initialize Satori project repository",
            "Configure local development environment (Node.js, npm/pnpm)",
            "Verify all dependencies install correctly",
            "Run local dev server and confirm all pages render",
            "Set up GitHub repository with main/staging branches"
          ],
          completionCriteria: [
            "npm run dev starts without errors",
            "All existing pages from Figma export render correctly",
            "GitHub repo created with proper branch structure",
            "README updated with setup instructions"
          ]
        },
        {
          title: "0.3 Gather Case Study Materials",
          subtasks: [
            "Identify 3-5 past projects that match target persona (plumbers, HVAC, contractors)",
            "Collect before/after screenshots or metrics for each",
            "Draft 2-3 paragraph case study narrative per project",
            "Obtain client permission/testimonial quotes if possible",
            "Gather any relevant logos or brand assets"
          ],
          completionCriteria: [
            "Minimum 3 case studies documented with metrics",
            "At least 2 testimonial quotes secured",
            "All visual assets saved in /assets/case-studies/ folder",
            "Case study content ready for integration into website"
          ]
        }
      ]
    },
    {
      name: "Phase 1: Marketing Website Build",
      timeline: "Weeks 1-4",
      description: "Build and launch the public-facing marketing website with checkout flow",
      color: "cyan",
      tasks: [
        {
          title: "1.1 Homepage Development",
          subtasks: [
            "Implement hero section with gradient headline and dual CTAs",
            "Build animated proof metrics section (+38% Calls, 2.1× Leads, etc.)",
            "Create interactive lead chart with Recharts",
            "Build service cards grid with icons",
            "Implement pricing preview section (3 tiers)",
            "Add testimonials carousel/grid",
            "Create final CTA section with animated glow background",
            "Ensure all animations work smoothly (Motion/Framer)"
          ],
          completionCriteria: [
            "All 7 homepage sections render correctly",
            "CTAs link to correct destinations (/checkout, /book-call)",
            "Animations perform at 60fps on mid-range devices",
            "Mobile responsive down to 375px width",
            "Lighthouse performance score > 80"
          ]
        },
        {
          title: "1.2 Services Pages",
          subtasks: [
            "Build services overview page (/services)",
            "Create website-build service detail page",
            "Create GBP optimization service detail page",
            "Create review screener service detail page",
            "Implement consistent template across all service pages",
            "Add pricing breakdowns with setup + monthly format"
          ],
          completionCriteria: [
            "All service pages follow consistent template",
            "Pricing reflects new setup + recurring model",
            "Each page has working CTA to purchase or book call",
            "SEO meta tags configured for each page"
          ]
        },
        {
          title: "1.3 Pricing Page",
          subtasks: [
            "Build tier comparison table (Website Build vs. Growth vs. Scale)",
            "Create additional services pricing grid",
            "Add FAQ accordion section",
            "Implement pricing calculator or package builder (optional)",
            "Ensure mobile-friendly pricing tables"
          ],
          completionCriteria: [
            "All pricing matches PRD Section 2.3",
            "Tier comparison is scannable and clear",
            "FAQ covers common pricing questions",
            "CTA buttons work correctly"
          ]
        },
        {
          title: "1.4 Case Studies Page",
          subtasks: [
            "Build case studies listing page",
            "Create individual case study detail template",
            "Integrate prepared case study content from Phase 0",
            "Add before/after visuals and metrics",
            "Include client testimonial quotes"
          ],
          completionCriteria: [
            "Minimum 3 case studies published",
            "Each case study shows measurable results",
            "Case studies target primary persona industries",
            "Social proof builds credibility for target audience"
          ]
        },
        {
          title: "1.5 Checkout Flow Implementation",
          subtasks: [
            "Build checkout page (/checkout) with package selection",
            "Add optional add-on services checkboxes",
            "Create order summary sidebar with line items",
            "Integrate Stripe Elements for payment form",
            "Add terms acceptance checkbox",
            "Build account creation page (/checkout/create-account)",
            "Implement success/confirmation page",
            "Set up webhook handler for checkout.session.completed"
          ],
          completionCriteria: [
            "Can complete test purchase in Stripe test mode",
            "Order summary calculates correctly with add-ons",
            "Account creation works and stores user",
            "Webhook fires and logs successful payment",
            "Confirmation email sends (even if basic)"
          ]
        },
        {
          title: "1.6 Book a Call Flow",
          subtasks: [
            "Build call booking landing page (/book-call)",
            "Integrate Calendly or Cal.com embed",
            "Create booking confirmation page",
            "Set up calendar notifications"
          ],
          completionCriteria: [
            "Can book a test call through the flow",
            "Calendar invite is sent to both parties",
            "Booking data is accessible for follow-up"
          ]
        },
        {
          title: "1.7 Authentication Setup",
          subtasks: [
            "Set up Clerk, Auth0, or Supabase Auth",
            "Implement login page (/login)",
            "Create password reset flow",
            "Connect account creation to auth provider",
            "Test OAuth options (Google, Microsoft) if applicable"
          ],
          completionCriteria: [
            "Users can create accounts after purchase",
            "Users can log in and log out",
            "Password reset emails send correctly",
            "Session persists across page refreshes"
          ]
        },
        {
          title: "1.8 Analytics & Tracking",
          subtasks: [
            "Set up Google Analytics 4 property",
            "Configure conversion events (purchase, form submit, call booking)",
            "Add click-to-call tracking",
            "Set up Google Tag Manager (optional but recommended)",
            "Configure Facebook Pixel if running ads"
          ],
          completionCriteria: [
            "GA4 is receiving pageview data",
            "Conversion events fire correctly in test",
            "Can view real-time data in GA4 dashboard"
          ]
        },
        {
          title: "1.9 Production Deployment",
          subtasks: [
            "Run final QA pass on staging",
            "Fix any critical bugs or visual issues",
            "Configure production environment variables",
            "Deploy to production domain",
            "Verify SSL, DNS, and all pages load correctly",
            "Submit sitemap to Google Search Console",
            "Set up uptime monitoring (optional)"
          ],
          completionCriteria: [
            "Production site loads at primary domain",
            "All pages render without errors",
            "Checkout flow works in live mode (test with small amount)",
            "Analytics receiving production data",
            "Site appears in Google Search Console"
          ]
        }
      ]
    },
    {
      name: "Phase 2: Sales Enablement",
      timeline: "Weeks 3-6 (overlaps with Phase 1)",
      description: "Prepare materials and systems to enable sales team to start selling",
      color: "violet",
      tasks: [
        {
          title: "2.1 Stripe Account Configuration",
          subtasks: [
            "Complete Stripe account verification (business info, bank account)",
            "Create product for Website Build ($999.95 one-time)",
            "Create products for initial 3-4 additional services (setup + recurring)",
            "Configure Stripe Billing for subscriptions",
            "Set up Stripe Customer Portal for self-service management",
            "Configure webhook endpoints for production",
            "Test complete purchase flow in live mode with small amount"
          ],
          completionCriteria: [
            "Stripe account is fully verified and can accept payments",
            "All initial products/prices created with correct amounts",
            "Subscription billing cycles correctly",
            "Customer Portal allows subscription management",
            "Webhooks receiving events in production"
          ]
        },
        {
          title: "2.2 Define & Finalize Initial Services (Pick 3-4)",
          note: "Recommended starting services: GBP Optimization, Review Screener, Analytics Dashboards (lowest complexity, clearest value prop)",
          subtasks: [
            "Select 3-4 services to launch first based on demand and margin",
            "Document purpose and client value proposition for each",
            "Finalize tool/platform selection for each service",
            "Calculate exact overhead costs per client per month",
            "Document setup process and timeline (SOP)",
            "Create Stripe products/subscriptions for each",
            "Create client-facing service agreement/terms"
          ],
          completionCriteria: [
            "3-4 services fully documented in Service Guide format",
            "Tool selections finalized (status changed from EVALUATING to SELECTED)",
            "Accurate margin calculations completed",
            "SOPs written for delivery team",
            "Stripe products live and purchasable"
          ]
        },
        {
          title: "2.3 Create Sales Materials (PDFs)",
          subtasks: [
            "Create 1-page service overview PDF for each initial service",
            "Include pricing, deliverables, timeline, and FAQ",
            "Design with Satori branding (cyan/violet gradient, dark theme)",
            "Create master pricing sheet PDF with all services",
            "Create sales deck (10-15 slides) for sales calls",
            "Create email templates for outreach sequences"
          ],
          completionCriteria: [
            "PDF per service ready for email/screen share",
            "Sales deck tells compelling story with social proof",
            "All materials match brand guidelines",
            "Sales rep can confidently present each service"
          ]
        },
        {
          title: "2.4 Build Demo Client Portal",
          subtasks: [
            "Create demo account with realistic placeholder data",
            "Populate project timeline with sample stages",
            "Add sample activity feed entries",
            "Create demo analytics view with impressive but realistic data",
            "Add sample services in 'Add Services' tab",
            "Set up demo login credentials for sales team",
            "Create 'Demo Mode' banner so reps don't confuse with real"
          ],
          completionCriteria: [
            "Sales rep can log into demo portal",
            "All portal tabs display realistic sample data",
            "Demo showcases value of portal access",
            "Clear visual indicator that this is demo mode",
            "Demo data resets or remains stable between demos"
          ]
        },
        {
          title: "2.5 Lead Generation System (Apify)",
          note: "Industries to target: plumbers, HVAC, electricians, landscapers, roofers, auto repair",
          subtasks: [
            "Research Apify actors for business scraping (Google Maps, Yelp, etc.)",
            "Set up Apify account and understand pricing/usage",
            "Configure actor to find businesses by industry + location",
            "Add filters: no website OR poor website indicators",
            "Integrate Firecrawl or similar for website performance analysis",
            "Output fields: business name, phone, email, website, performance score",
            "Set up automated runs (daily/weekly) with notifications",
            "Export leads to spreadsheet or CRM",
            "Add enrichment: GBP presence check, review count, response time"
          ],
          completionCriteria: [
            "Actor successfully scrapes target businesses",
            "Performance analysis returns actionable data",
            "Leads export includes contact info and pain points",
            "Automated runs working on schedule",
            "Lead quality is sufficient for sales outreach"
          ],
          notes: [
            "Consider filtering by: review count < 20, no website, website mobile score < 50",
            "Look for businesses with GBP but poor optimization (incomplete profile)"
          ]
        },
        {
          title: "2.6 Sales Rep Onboarding",
          subtasks: [
            "Create Sales Playbook document (objection handling, talk tracks)",
            "Record Loom walkthrough of demo portal",
            "Document ideal customer profile and qualification criteria",
            "Set up CRM or spreadsheet for lead tracking",
            "Create compensation/commission structure",
            "Schedule training sessions (product knowledge, tools, process)",
            "Provide access to all sales materials and demo accounts",
            "Set initial quota/expectations (realistic for ramp-up)",
            "Establish daily/weekly check-in cadence"
          ],
          completionCriteria: [
            "Sales rep can articulate value prop for each service",
            "Sales rep can navigate demo portal confidently",
            "Sales rep understands pricing and can handle objections",
            "Lead tracking system in place",
            "Compensation structure agreed upon",
            "Sales rep is actively reaching out to leads"
          ]
        }
      ]
    },
    {
      name: "Phase 3: Client Portal Build",
      timeline: "Weeks 5-12",
      description: "Build the authenticated client portal with onboarding, project tracking, and service marketplace",
      color: "emerald",
      tasks: [
        {
          title: "3.1 Database Schema Design",
          subtasks: [
            "Design clients table (profile, business info, user reference)",
            "Design projects table (stages, dates, client reference)",
            "Design onboarding_responses table (step data, completion status)",
            "Design services table (purchased services per client)",
            "Design activity_logs table (events, timestamps)",
            "Design files table (uploads, deliverables)",
            "Set up database (Supabase, PlanetScale, or Railway)",
            "Create seed data for testing"
          ],
          completionCriteria: [
            "All tables created with proper relationships",
            "Can CRUD operations on all tables",
            "Seed data populates demo content",
            "Database accessible from API layer"
          ]
        },
        {
          title: "3.2 Onboarding Wizard",
          subtasks: [
            "Build Step 1: Business Information form",
            "Build Step 2: Website Goals form",
            "Build Step 3: Brand & Style preferences",
            "Build Step 4: Copy & Content input",
            "Build Step 5: Competitors input",
            "Build Step 6: Schedule Kickoff (calendar integration)",
            "Implement progress indicator",
            "Add auto-save on each step",
            "Create success/completion page",
            "Connect all steps to database",
            "Add file upload for brand assets"
          ],
          completionCriteria: [
            "All 6 steps functional and saving to database",
            "Progress persists across sessions (auto-save working)",
            "Kickoff call successfully books via calendar",
            "File uploads stored and retrievable",
            "Completion triggers appropriate next steps (email, project creation)"
          ]
        },
        {
          title: "3.3 Portal Dashboard - Overview Tab",
          subtasks: [
            "Build project timeline component (6 stages)",
            "Create action required panel with task cards",
            "Build upcoming call card with join/reschedule",
            "Create recent activity feed",
            "Add quick action buttons (Upload, Notes, Messages)",
            "Connect all components to real data",
            "Handle empty states gracefully"
          ],
          completionCriteria: [
            "Dashboard displays real project data",
            "Timeline reflects actual project stage",
            "Activity feed updates in real-time or on refresh",
            "Quick actions function correctly"
          ]
        },
        {
          title: "3.4 Portal Dashboard - Analytics Tab",
          subtasks: [
            "Build global filters (date range, source, device)",
            "Create KPI cards grid",
            "Build traffic chart with Recharts",
            "Create channel breakdown component",
            "Build top pages table with drill-down",
            "Create conversions table",
            "Add placeholder/demo data mode initially",
            "Document integration points for future GA4/GSC connection"
          ],
          completionCriteria: [
            "All analytics components render with placeholder data",
            "Filters change displayed data appropriately",
            "Interface matches PRD specifications",
            "Integration adapters defined (even if not connected)"
          ]
        },
        {
          title: "3.5 Portal Dashboard - Add Services Tab",
          subtasks: [
            "Build service cards grid with categories",
            "Create service detail modal with pricing breakdown",
            "Implement purchase flow (connects to Stripe)",
            "Show 'Active' badge for purchased services",
            "Display relevant service status/metrics when active",
            "Handle subscription management (upgrade, cancel)"
          ],
          completionCriteria: [
            "All services display with correct pricing",
            "Can purchase additional service through portal",
            "Purchased services show as active",
            "Subscription management works via Stripe Portal"
          ]
        },
        {
          title: "3.6 Admin Interface",
          subtasks: [
            "Create admin dashboard with client overview",
            "Build client detail view (profile, project, services)",
            "Add ability to update project stages",
            "Create activity logging interface",
            "Build file/deliverable upload for clients",
            "Add notes/internal communication area",
            "Implement search and filtering"
          ],
          completionCriteria: [
            "Admin can view all clients and projects",
            "Admin can update project stages",
            "Admin can upload files for clients",
            "Admin can add activity entries"
          ]
        },
        {
          title: "3.7 Notifications & Communications",
          subtasks: [
            "Set up transactional email provider (Resend, SendGrid)",
            "Create email templates (welcome, stage updates, reminders)",
            "Implement onboarding reminder emails",
            "Add project milestone notifications",
            "Create in-portal notification system (optional)",
            "Set up Slack/Discord webhook for internal alerts (optional)"
          ],
          completionCriteria: [
            "Welcome email sends after account creation",
            "Onboarding reminders send if incomplete",
            "Stage change notifications work",
            "Internal team alerted on key events"
          ]
        },
        {
          title: "3.8 Portal QA & Launch",
          subtasks: [
            "Complete end-to-end testing of all flows",
            "Test with real client data (with permission)",
            "Fix critical bugs and UX issues",
            "Performance optimization",
            "Security review (auth, data access)",
            "Deploy portal to production",
            "Migrate demo clients to real portal (if applicable)"
          ],
          completionCriteria: [
            "All portal features function in production",
            "No critical bugs in core flows",
            "Performance acceptable (page loads < 3s)",
            "Security review passed",
            "Ready to onboard real clients"
          ]
        }
      ]
    },
    {
      name: "Phase 4: Scale & Optimize",
      timeline: "Week 12+",
      description: "Finalize remaining services, build integrations, and scale operations",
      color: "amber",
      tasks: [
        {
          title: "4.1 Finalize Remaining Additional Services",
          subtasks: [
            "Define AI Chat Bot service (if not in initial 3-4)",
            "Define Local SEO service",
            "Define Google Ads service",
            "Define Branding/Identity service",
            "Define Graphic Design service",
            "Define Custom CRM service",
            "Create sales materials for each",
            "Configure Stripe products for each",
            "Train sales rep on new services"
          ],
          completionCriteria: [
            "All 9 services fully defined and documented",
            "All Stripe products configured",
            "Sales materials complete for all services",
            "Sales rep trained and confident on full catalog"
          ]
        },
        {
          title: "4.2 Tool Integrations (When Ready)",
          note: "Only build after tools are finalized in Tool Registry",
          subtasks: [
            "Finalize tool selections (change status to SELECTED)",
            "Build adapter for GBP tool (BrightLocal, LocalViking, etc.)",
            "Build adapter for Reviews tool (GatherUp, etc.)",
            "Build adapter for SEO tool (Ahrefs, SEMrush, etc.)",
            "Connect GA4 API for analytics tab",
            "Connect Google Search Console for SEO data",
            "Test all integrations with real client data"
          ],
          completionCriteria: [
            "Analytics tab shows real GA4 data",
            "SEO performance shows real GSC data",
            "Service modules display real metrics from tools",
            "Data refreshes automatically or on schedule"
          ]
        },
        {
          title: "4.3 Process Optimization",
          subtasks: [
            "Document all operational SOPs",
            "Identify bottlenecks in delivery workflow",
            "Automate repetitive tasks where possible",
            "Create client feedback loop / NPS survey",
            "Refine onboarding based on client feedback",
            "Optimize checkout flow based on conversion data"
          ],
          completionCriteria: [
            "All core processes documented",
            "Key automations implemented",
            "Feedback system in place",
            "Measurable improvement in key metrics"
          ]
        },
        {
          title: "4.4 Growth & Marketing",
          subtasks: [
            "Launch Google Ads campaigns for lead generation",
            "Set up retargeting for website visitors",
            "Create content marketing calendar (blog, social)",
            "Build referral program for existing clients",
            "Explore partnerships with complementary businesses",
            "Track and optimize CAC (Customer Acquisition Cost)"
          ],
          completionCriteria: [
            "Paid campaigns running with positive ROAS",
            "Organic lead sources established",
            "Referral program generating leads",
            "CAC within acceptable range"
          ]
        }
      ]
    }
  ];

  const totalProgress = () => {
    let total = 0;
    let completed = 0;
    phases.forEach((_, phaseIndex) => {
      const progress = getPhaseProgress(phaseIndex);
      total += progress.total;
      completed += progress.completed;
    });
    return { total, completed, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const overall = totalProgress();

  const colorClasses = {
    slate: { bg: 'bg-slate-500', border: 'border-slate-500/30', text: 'text-slate-400' },
    cyan: { bg: 'bg-cyan-500', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    violet: { bg: 'bg-violet-500', border: 'border-violet-500/30', text: 'text-violet-400' },
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    amber: { bg: 'bg-amber-500', border: 'border-amber-500/30', text: 'text-amber-400' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Satori Studios <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Project Tracker</span>
        </h1>
        <p className="text-slate-400 mb-6">Implementation roadmap from PRD to production</p>

        {/* Overall Progress */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300 font-medium">Overall Progress</span>
            <span className="text-white font-bold">{overall.completed} / {overall.total} tasks ({overall.percent}%)</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-cyan-500 to-violet-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${overall.percent}%` }}
            />
          </div>

          {/* Save indicator and reset */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 text-sm">
                {lastSaved ? `Auto-saved at ${lastSaved}` : 'Progress saves automatically'}
              </span>
            </div>
            <button
              onClick={resetProgress}
              className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded hover:bg-red-500/10"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="max-w-5xl mx-auto space-y-4">
        {phases.map((phase, phaseIndex) => {
          const progress = getPhaseProgress(phaseIndex);
          const isExpanded = expandedPhases[phaseIndex];
          const colors = colorClasses[phase.color];

          return (
            <div key={phaseIndex} className={`bg-slate-800/50 border ${colors.border} rounded-xl overflow-hidden`}>
              {/* Phase Header */}
              <div
                className="p-5 cursor-pointer hover:bg-slate-700/30 transition-colors"
                onClick={() => togglePhase(phaseIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                    <div>
                      <h2 className="text-lg font-bold text-white">{phase.name}</h2>
                      <p className="text-slate-500 text-sm">{phase.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${colors.text}`}>{progress.percent}%</div>
                      <div className="text-slate-500 text-xs">{progress.completed}/{progress.total} tasks</div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mt-2 ml-7">{phase.description}</p>

                {/* Progress bar */}
                <div className="mt-3 ml-7 w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`${colors.bg} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              {isExpanded && (
                <div className="border-t border-slate-700/50 p-5 pt-4 space-y-6">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="bg-slate-900/50 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3">{task.title}</h3>

                      {task.note && (
                        <div className="mb-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <p className="text-amber-400 text-sm">💡 {task.note}</p>
                        </div>
                      )}

                      {/* Subtasks */}
                      {task.subtasks && (
                        <div className="space-y-2 mb-4">
                          {task.subtasks.map((subtask, subtaskIndex) => {
                            const isComplete = isTaskComplete(phaseIndex, taskIndex, subtaskIndex);
                            return (
                              <label
                                key={subtaskIndex}
                                className="flex items-start gap-3 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  checked={isComplete}
                                  onChange={() => toggleTask(phaseIndex, taskIndex, subtaskIndex)}
                                  className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                                />
                                <span className={`text-sm ${isComplete ? 'text-slate-500 line-through' : 'text-slate-300'} group-hover:text-white transition-colors`}>
                                  {subtask}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {/* Completion Criteria */}
                      {task.completionCriteria && (
                        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <h4 className="text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">✓ Completion Criteria</h4>
                          <ul className="space-y-1">
                            {task.completionCriteria.map((criteria, i) => (
                              <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">•</span>
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Notes */}
                      {task.notes && (
                        <div className="mt-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                          <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Notes</h4>
                          <ul className="space-y-1">
                            {task.notes.map((note, i) => (
                              <li key={i} className="text-slate-400 text-sm">• {note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Legend */}
      <div className="max-w-5xl mx-auto mt-8 p-4 bg-slate-800/30 rounded-xl">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500" />
            <span className="text-slate-400">Phase 0: Pre-Launch</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-slate-400">Phase 1: Marketing Site</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-slate-400">Phase 2: Sales Enablement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Phase 3: Client Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-400">Phase 4: Scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
