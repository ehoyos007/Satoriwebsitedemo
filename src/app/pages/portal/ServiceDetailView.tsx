import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MapPin,
  Star,
  MessageSquare,
  Target,
  BarChart3,
  Palette,
  FileText,
  Zap,
  StickyNote,
} from 'lucide-react';
import { useState } from 'react';

interface ServiceDetailViewProps {
  serviceId: string;
  onBack: () => void;
  onPurchase: (serviceId: string, notes: string) => void;
}

export function ServiceDetailView({ serviceId, onBack, onPurchase }: ServiceDetailViewProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  // Service data structure
  const serviceData: Record<string, any> = {
    gbp: {
      name: 'Google Business Profile Optimization',
      icon: MapPin,
      tagline: 'Dominate local search and drive 200-300% more calls without ad spend',
      description:
        'Strategic Google Business Profile optimization increases map visibility, drives direction requests, and generates phone calls from local search. We optimize categories, content, photos, and tracking to maximize your local presence.',
      price: '$1,495',
      timeline: '10-14 days',
      deliverables: [
        'Complete profile audit with competitive analysis',
        'Strategic category selection (primary + secondary)',
        'Business description optimization for search intent',
        'Photo strategy and upload guidance',
        'Review generation workflow and response templates',
        'Performance tracking dashboard',
        'Q&A seeding and monitoring setup',
        'Monthly optimization checklist',
      ],
      improvements: [
        { metric: 'Map Views', impact: '+287%', desc: 'Average increase within 90 days' },
        { metric: 'Direction Requests', impact: '+234%', desc: 'From Google Maps clicks' },
        { metric: 'Phone Calls', impact: '+198%', desc: 'Direct from GBP listing' },
        { metric: 'Top 3 Rankings', impact: '78%', desc: 'For primary keyword set' },
      ],
      howItWorks: [
        { step: 'Profile Audit', desc: 'We analyze your current GBP and identify quick-win opportunities' },
        { step: 'Category Strategy', desc: 'Research and select optimal categories based on search volume' },
        { step: 'Content Optimization', desc: 'Rewrite descriptions and attributes for searcher intent' },
        { step: 'Tracking Setup', desc: 'Configure performance dashboard and monitoring' },
        { step: 'Launch & Training', desc: 'Activate optimizations and provide ongoing checklist' },
      ],
      faqs: [
        {
          q: 'How long does optimization take?',
          a: 'Initial setup takes 10-14 days. Results typically start showing within 2-4 weeks as Google indexes changes.',
        },
        {
          q: 'What results can I expect?',
          a: 'Typical results within 90 days: 200-300% increase in map views, 150-250% increase in direction requests, 100-200% increase in calls from GBP.',
        },
        {
          q: 'How do you track results?',
          a: 'We set up a dashboard tracking profile views, direction requests, phone calls, website clicks, and booking button taps in real time.',
        },
      ],
      socialProof:
        'Clients average 287% increase in map views and 198% more phone calls within 90 days of optimization.',
    },
    reviews: {
      name: 'Review Screener (Reputation Funnel)',
      icon: Star,
      tagline: 'Generate 400-600% more 5-star reviews with smart routing',
      description:
        'Our review screener captures feedback first, routes happy customers to Google reviews, and directs unhappy customers to private feedback—increasing 5-star volume while protecting your rating.',
      price: '$1,200',
      timeline: '3-5 days',
      deliverables: [
        'Custom-branded feedback capture page',
        'Smart routing logic (happy → Google, unhappy → private)',
        'QR code generation for in-person requests',
        'Email and SMS review request templates',
        'Review response templates (positive & negative)',
        'Review velocity tracking dashboard',
        'Negative feedback escalation workflow',
      ],
      improvements: [
        { metric: 'Review Velocity', impact: '+485%', desc: 'Average increase across clients' },
        { metric: 'Completion Rate', impact: '68%', desc: 'vs. 22% industry average' },
        { metric: '5-Star Reviews', impact: '91%', desc: 'With smart routing' },
        { metric: 'Time to Review', impact: '4.2 days', desc: 'vs. 18 days manual' },
      ],
      howItWorks: [
        { step: 'Kickoff & Branding', desc: 'Gather brand assets and define review request strategy' },
        { step: 'Page Build', desc: 'Build feedback page and configure smart routing logic' },
        { step: 'QR & Templates', desc: 'Generate QR codes and write review request templates' },
        { step: 'Testing', desc: 'Test all routing paths and mobile responsiveness' },
        { step: 'Launch & Deploy', desc: 'Launch screener and train team on deployment' },
      ],
      faqs: [
        {
          q: 'How does smart routing work?',
          a: 'Customers select 1-5 stars. Happy customers (4-5) are sent to Google. Less satisfied (1-3) are directed to private feedback so you can resolve issues first.',
        },
        {
          q: 'Is this against Google policy?',
          a: 'No. We ask for feedback first, then route based on response. All customers can leave a Google review; we just make it easier for satisfied customers.',
        },
        {
          q: 'How do I deploy the screener?',
          a: 'Send link via email/SMS after service, print QR codes on receipts, display QR in-store, or add to automated follow-up sequences.',
        },
      ],
      socialProof:
        'Clients typically see 400-600% increases in review velocity with 60-70% completion rates.',
    },
    chatbot: {
      name: 'AI Chat Bot (Lead Capture + FAQs)',
      icon: MessageSquare,
      tagline: 'Capture leads 24/7 and answer common questions instantly',
      description:
        'Intelligent chat bot that captures lead information, answers frequently asked questions, and books appointments - even when you are closed. Reduces missed opportunities and improves response time.',
      price: '$1,800',
      timeline: '7-10 days',
      deliverables: [
        'Custom-trained AI chat bot for your business',
        'Lead capture form integration',
        'FAQ knowledge base setup (20-30 questions)',
        'Appointment booking integration (optional)',
        'CRM integration for lead notifications',
        'Chat transcript storage and search',
        'Performance analytics dashboard',
        'Mobile-optimized chat interface',
      ],
      improvements: [
        { metric: 'Lead Capture Rate', impact: '+156%', desc: 'After-hours leads captured' },
        { metric: 'Response Time', impact: '<30 sec', desc: 'vs. 4-6 hours average' },
        { metric: 'FAQ Deflection', impact: '68%', desc: 'Questions answered without human' },
        { metric: 'Conversion Rate', impact: '+24%', desc: 'Immediate engagement effect' },
      ],
      howItWorks: [
        { step: 'Discovery', desc: 'Identify common questions and lead qualification criteria' },
        { step: 'Training', desc: 'Train AI on your services, pricing, and FAQs' },
        { step: 'Integration', desc: 'Connect to your website and CRM' },
        { step: 'Testing', desc: 'Test conversations and refine responses' },
        { step: 'Launch', desc: 'Deploy bot and monitor performance' },
      ],
      faqs: [
        {
          q: 'What can the bot do?',
          a: 'Answer FAQs, capture lead info (name, email, phone, service needed), book appointments, and escalate to human when needed.',
        },
        {
          q: 'How does lead capture work?',
          a: 'Bot asks qualifying questions, collects contact info, and sends leads to your email/CRM in real time with full conversation transcript.',
        },
        {
          q: 'Can I customize responses?',
          a: 'Yes. We train the bot on your specific services, pricing, and tone. You can update FAQs and responses anytime through the dashboard.',
        },
      ],
      socialProof:
        'Clients capture an average of 156% more leads after hours and answer 68% of questions without human intervention.',
    },
    'local-seo': {
      name: 'Local SEO + On-Page SEO',
      icon: Target,
      tagline: 'Rank higher in local search and drive organic traffic',
      description:
        'Strategic local and on-page SEO optimization that increases visibility in Google search, drives organic traffic, and generates leads without ongoing ad spend.',
      price: '$2,500',
      timeline: '3-4 weeks',
      deliverables: [
        'Local keyword research and strategy',
        'On-page SEO optimization (titles, meta, headings)',
        'Local citation building (30+ directories)',
        'Schema markup implementation',
        'Content optimization for target keywords',
        'Internal linking structure',
        'Page speed optimization',
        'Ranking tracking dashboard (20 keywords)',
      ],
      improvements: [
        { metric: 'Organic Traffic', impact: '+187%', desc: 'Within 90 days' },
        { metric: 'Keyword Rankings', impact: '12 avg', desc: 'First page rankings' },
        { metric: 'Organic Leads', impact: '+145%', desc: 'From search traffic' },
        { metric: 'Search Visibility', impact: '+234%', desc: 'Overall visibility score' },
      ],
      howItWorks: [
        { step: 'Keyword Research', desc: 'Identify high-value local keywords with search volume' },
        { step: 'On-Page Optimization', desc: 'Optimize titles, content, and technical SEO' },
        { step: 'Citation Building', desc: 'List business in 30+ relevant directories' },
        { step: 'Tracking Setup', desc: 'Configure ranking and traffic monitoring' },
        { step: 'Ongoing Optimization', desc: 'Monthly adjustments based on performance data' },
      ],
      faqs: [
        {
          q: 'How long until I see results?',
          a: 'Initial rankings typically improve within 4-6 weeks. Significant traffic increases usually appear within 60-90 days.',
        },
        {
          q: 'What makes local SEO different?',
          a: 'Local SEO targets "near me" and city-specific searches, optimizes for Google Maps, and builds local citations—critical for service businesses.',
        },
        {
          q: 'Is this a one-time service or ongoing?',
          a: 'Initial optimization is one-time. Ongoing maintenance ($500/month) is optional but recommended to maintain and improve rankings.',
        },
      ],
      socialProof:
        'Clients average 187% increase in organic traffic and 12 first-page keyword rankings within 90 days.',
    },
    'google-ads': {
      name: 'Google Ads / Search Marketing',
      icon: TrendingUp,
      tagline: 'Immediate visibility and qualified lead flow from search ads',
      description:
        'Professionally managed Google Ads campaigns that generate qualified leads from day one. We handle strategy, ad creation, targeting, and ongoing optimization.',
      price: '$3,000',
      timeline: '1-2 weeks setup',
      deliverables: [
        'Campaign strategy and keyword research',
        'Ad copywriting and A/B testing',
        'Landing page optimization recommendations',
        'Conversion tracking setup',
        'Bid management and optimization',
        'Monthly performance reports',
        'Call tracking integration',
        'Negative keyword management',
      ],
      improvements: [
        { metric: 'Cost Per Lead', impact: '$42 avg', desc: 'Below industry average' },
        { metric: 'Conversion Rate', impact: '8.7%', desc: 'From ad clicks' },
        { metric: 'ROAS', impact: '4.2x', desc: 'Return on ad spend' },
        { metric: 'Lead Volume', impact: '+347%', desc: 'vs. organic alone' },
      ],
      howItWorks: [
        { step: 'Strategy & Research', desc: 'Identify high-intent keywords and competitors' },
        { step: 'Campaign Build', desc: 'Create ads, set targeting, and configure tracking' },
        { step: 'Launch', desc: 'Start campaigns with conservative budgets' },
        { step: 'Optimize', desc: 'Weekly bid adjustments and ad testing' },
        { step: 'Scale', desc: 'Increase budget on high-performing campaigns' },
      ],
      faqs: [
        {
          q: 'How much should I spend on ads?',
          a: 'Minimum $1,500/month ad budget recommended. Most clients start at $2,000-$3,000/month and scale based on results.',
        },
        {
          q: 'What is included in the $3,000?',
          a: '$3,000 is our monthly management fee. Ad budget is separate and goes directly to Google (client pays Google directly).',
        },
        {
          q: 'How quickly will I see leads?',
          a: 'Leads typically start within 24-48 hours of launch. We optimize over 30-60 days to reduce cost per lead and improve quality.',
        },
      ],
      socialProof:
        'Clients average 4.2x ROAS with $42 cost per lead and 347% increase in lead volume vs. organic alone.',
    },
    analytics: {
      name: 'Analytics + Reporting Dashboards',
      icon: BarChart3,
      tagline: 'Track every metric and optimize based on real data',
      description:
        'Comprehensive analytics setup and custom dashboards that track website performance, lead sources, conversion rates, and ROI across all channels.',
      price: '$1,500',
      timeline: '5-7 days',
      deliverables: [
        'Google Analytics 4 advanced setup',
        'Conversion event tracking configuration',
        'Custom dashboard for key metrics',
        'Call tracking integration',
        'Form submission tracking',
        'Traffic source attribution',
        'Monthly automated reports',
        'Goal and funnel tracking',
      ],
      improvements: [
        { metric: 'Data Visibility', impact: '100%', desc: 'Full funnel tracking' },
        { metric: 'Decision Speed', impact: '3x faster', desc: 'Real-time dashboards' },
        { metric: 'ROI Tracking', impact: 'Per channel', desc: 'Know what works' },
        { metric: 'Optimization', impact: '+34%', desc: 'Data-driven improvements' },
      ],
      howItWorks: [
        { step: 'Requirements', desc: 'Identify key metrics and reporting needs' },
        { step: 'Configuration', desc: 'Set up GA4, conversion events, and integrations' },
        { step: 'Dashboard Build', desc: 'Create custom dashboard for your metrics' },
        { step: 'Testing', desc: 'Verify all tracking is accurate' },
        { step: 'Training', desc: 'Show you how to read and use the data' },
      ],
      faqs: [
        {
          q: 'What metrics are tracked?',
          a: 'Website traffic, traffic sources, conversion rate, form submissions, phone calls, bounce rate, time on site, top pages, and goal completions.',
        },
        {
          q: 'Can I track phone calls?',
          a: 'Yes. We integrate call tracking so you know which marketing channels generate phone calls and can listen to call recordings.',
        },
        {
          q: 'How often are reports updated?',
          a: 'Dashboards update in real time. We send automated monthly summary reports with insights and recommendations.',
        },
      ],
      socialProof:
        'Clients make 3x faster decisions with real-time data and see 34% improvement from data-driven optimization.',
    },
    branding: {
      name: 'Branding / Identity Design',
      icon: Palette,
      tagline: 'Professional brand identity that builds trust and recognition',
      description:
        'Complete brand identity design including logo, color palette, typography, and brand guidelines. Creates consistent, professional presence across all touchpoints.',
      price: '$2,500',
      timeline: '2-3 weeks',
      deliverables: [
        'Logo design (3 concepts, 2 revision rounds)',
        'Color palette selection',
        'Typography system',
        'Brand style guide document',
        'Business card design',
        'Social media templates',
        'Email signature template',
        'All files in web and print formats',
      ],
      improvements: [
        { metric: 'Brand Recognition', impact: '+156%', desc: 'Customer recall' },
        { metric: 'Trust Score', impact: '+43%', desc: 'Perceived credibility' },
        { metric: 'Consistency', impact: '100%', desc: 'Across all materials' },
        { metric: 'Conversion Rate', impact: '+18%', desc: 'Professional appearance' },
      ],
      howItWorks: [
        { step: 'Discovery', desc: 'Understand your business, audience, and competitors' },
        { step: 'Concepts', desc: 'Present 3 initial logo concepts with rationale' },
        { step: 'Refinement', desc: 'Two rounds of revisions based on feedback' },
        { step: 'Brand Guide', desc: 'Create complete style guide with usage rules' },
        { step: 'Delivery', desc: 'Provide all files and templates' },
      ],
      faqs: [
        {
          q: 'What if I already have a logo?',
          a: 'We can refresh your existing logo or work within your current brand. We\'ll create the supporting brand system and style guide.',
        },
        {
          q: 'How many revision rounds?',
          a: 'Two full revision rounds included. Additional revisions available at $250 per round if needed.',
        },
        {
          q: 'What file formats do I receive?',
          a: 'All formats: AI, EPS, PDF, PNG (transparent), JPG, and SVG. Print-ready and web-optimized versions included.',
        },
      ],
      socialProof:
        'Clients see 156% increase in brand recognition and 18% conversion rate improvement with professional branding.',
    },
    'graphic-design': {
      name: 'Graphic Design + Print Assets',
      icon: FileText,
      tagline: 'Marketing materials that convert: flyers, cards, signage',
      description:
        'Professional graphic design for print and digital marketing materials. From business cards to vehicle wraps, we create assets that support your brand and drive results.',
      price: '$800',
      timeline: '1-2 weeks',
      deliverables: [
        'Business card design',
        'Flyer/postcard design',
        'Brochure design (optional)',
        'Door hanger design',
        'Vehicle decal/wrap design (optional)',
        'Yard sign design',
        'Print-ready files with bleed',
        'Digital versions for email',
      ],
      improvements: [
        { metric: 'Response Rate', impact: '+67%', desc: 'vs. generic templates' },
        { metric: 'Brand Consistency', impact: '100%', desc: 'Matches web presence' },
        { metric: 'Print Quality', impact: 'Professional', desc: 'Print-ready specs' },
        { metric: 'Versatility', impact: 'Multi-use', desc: 'Print and digital' },
      ],
      howItWorks: [
        { step: 'Requirements', desc: 'Define what materials you need and usage' },
        { step: 'Design', desc: 'Create initial designs matching your brand' },
        { step: 'Revisions', desc: 'One round of revisions included' },
        { step: 'Finalization', desc: 'Prepare print-ready and digital files' },
        { step: 'Delivery', desc: 'Provide all files and printer recommendations' },
      ],
      faqs: [
        {
          q: 'What print materials are included?',
          a: 'Base package includes business cards and one marketing piece (flyer, postcard, or door hanger). Additional pieces available at $200 each.',
        },
        {
          q: 'Do you handle printing?',
          a: 'We provide print-ready files and can coordinate printing through our partners, or you can use your preferred printer.',
        },
        {
          q: 'Can I get digital versions?',
          a: 'Yes. All designs provided in both print-ready (CMYK, high-res) and digital formats (RGB, web-optimized).',
        },
      ],
      socialProof:
        'Clients see 67% higher response rates with professional design vs. generic templates.',
    },
    crm: {
      name: 'Custom CRM + Automations',
      icon: Zap,
      tagline: 'Automate follow-ups, track leads, and close more deals',
      description:
        'Custom CRM system with automated workflows for lead follow-up, appointment reminders, review requests, and pipeline management. Reduces missed opportunities and improves close rate.',
      price: '$5,000',
      timeline: '3-4 weeks',
      deliverables: [
        'CRM platform selection and setup',
        'Contact database migration',
        'Lead capture form integration',
        'Automated follow-up sequences',
        'Appointment reminder automation',
        'Review request automation',
        'Pipeline and deal tracking',
        'Reporting dashboard',
        'Team training and documentation',
      ],
      improvements: [
        { metric: 'Follow-up Rate', impact: '100%', desc: 'No leads fall through cracks' },
        { metric: 'Close Rate', impact: '+43%', desc: 'With automated nurture' },
        { metric: 'Time Saved', impact: '12 hrs/wk', desc: 'Automation vs. manual' },
        { metric: 'Lead Response', impact: '<5 min', desc: 'Automated immediate response' },
      ],
      howItWorks: [
        { step: 'Discovery', desc: 'Map your current sales process and pain points' },
        { step: 'Platform Setup', desc: 'Configure CRM and import contacts' },
        { step: 'Automation Build', desc: 'Create follow-up sequences and workflows' },
        { step: 'Integration', desc: 'Connect to website, calendar, and tools' },
        { step: 'Training', desc: 'Train team and provide ongoing support' },
      ],
      faqs: [
        {
          q: 'Which CRM platform do you use?',
          a: 'We recommend based on your needs (HubSpot, Pipedrive, GoHighLevel, or custom). Platform cost is separate from setup fee.',
        },
        {
          q: 'What gets automated?',
          a: 'Lead follow-up emails/SMS, appointment reminders, post-service review requests, no-show follow-ups, and pipeline updates.',
        },
        {
          q: 'Can you migrate existing contacts?',
          a: 'Yes. We handle data migration from spreadsheets, old CRMs, or email lists. Clean-up and deduplication included.',
        },
      ],
      socialProof:
        'Clients save 12 hours per week and increase close rates by 43% with automated lead nurture.',
    },
  };

  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Service not found</p>
        <button onClick={onBack} className="mt-4 text-cyan-400 hover:underline">
          Back to Services
        </button>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Services
      </button>

      {/* Header */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
            <Icon className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl mb-3">{service.name}</h1>
            <p className="text-xl text-zinc-400">{service.tagline}</p>
          </div>
        </div>

        <p className="text-lg text-zinc-300 leading-relaxed mb-6">{service.description}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onPurchase(serviceId, notes)}
            className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Add to Project — {service.price}
              <ArrowRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{service.timeline}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* What You Get */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl mb-6">What You Get</h2>
            <ul className="space-y-3">
              {service.deliverables.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What This Improves */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl mb-6">What This Improves</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.improvements.map((item: any, index: number) => (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-xl border border-white/5 bg-zinc-950/50"
                >
                  <div className="text-3xl mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                    {item.impact}
                  </div>
                  <div className="text-sm text-zinc-300 mb-1">{item.metric}</div>
                  <div className="text-xs text-zinc-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl mb-6">How It Works</h2>
            <div className="space-y-4">
              {service.howItWorks.map((item: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="mb-1">{item.step}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="glass-panel p-6 rounded-xl border border-emerald-400/20 bg-emerald-500/5">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-2">Typical Results</h3>
                <p className="text-sm text-zinc-400">{service.socialProof}</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {service.faqs.map((faq: any, index: number) => (
                <div
                  key={index}
                  className="glass-panel rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-violet-500/5 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-5 pb-5 text-zinc-400 text-sm">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Notes */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
            <h3 className="mb-4 flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-amber-400" />
              Notes for This Service
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Any specific requirements, questions, or context we should know?
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 min-h-[200px]"
              placeholder="Example: I want to focus on increasing calls from Google Maps searches in the Austin area."
            />
            <p className="text-xs text-zinc-500 mt-2">These notes will be saved with your purchase</p>

            <button
              onClick={() => onPurchase(serviceId, notes)}
              className="w-full mt-6 group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Add to Project
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}