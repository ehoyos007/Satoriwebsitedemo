import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  MapPin, 
  Star, 
  Bot, 
  TrendingUp, 
  ChartBar, 
  Target,
  Search,
  Palette,
  FileText,
  Zap,
  CheckCircle,
  BarChart3,
  Users,
  Clock,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';

export function ServicesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Featured case study data
  const featuredCase = {
    clientName: 'Summit Realty Group',
    industry: 'Real Estate',
    location: 'Denver, CO',
    websitePreview: 'https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'Turned a static brochure site into a lead-generating asset that drives 842 direction requests per month',
    kpis: [
      { label: 'Direction Requests', value: '842/mo', delta: '+247%' },
      { label: 'Form Leads', value: '156/mo', delta: '+189%' },
      { label: 'Phone Calls', value: '93/mo', delta: '+312%' },
      { label: 'Cost Per Lead', value: '$18.40', delta: '-67%' },
      { label: 'Conversion Rate', value: '8.2%', delta: '+4.1%' },
      { label: 'Google Reviews', value: '127', delta: '+89' },
    ],
  };

  // Client logos (placeholder)
  const clientLogos = [
    'Summit Realty',
    'Apex Plumbing',
    'Verde Landscaping',
    'Precision Auto',
    'Elite Fitness',
    'Coastal Dental',
  ];

  const tactics = {
    websiteBuild: [
      'Conversion-first page architecture (hero → proof → offer → CTA)',
      'Mobile-first responsive design (optimized for any device)',
      'Speed optimization (target: under 2 seconds)',
      'Lead capture forms with smart validation',
      'Click-to-call and click-to-text buttons',
      'Sticky CTAs and exit-intent popups',
      'Trust signals: reviews, credentials, guarantees',
      'Schema markup for rich search results',
      'SSL certificate + security hardening',
      'Cross-browser compatibility testing',
    ],
    gbpOptimization: [
      'Category research and strategic selection',
      'Service area and business hours optimization',
      'Photo optimization (covers, logos, service photos)',
      'Post scheduling strategy for consistent visibility',
      'Review response templates and workflow',
      'Q&A seeding and monitoring',
      'Booking button and appointment links',
      'Product/service catalog setup',
      'Performance tracking (views, actions, calls)',
    ],
    reviewScreener: [
      'Custom feedback capture page design',
      'Smart routing logic (happy → Google, unhappy → feedback)',
      'Email and SMS review request sequences',
      'QR codes for in-person review requests',
      'Review response monitoring and alerts',
      'Negative feedback escalation workflow',
      'Review velocity tracking dashboard',
    ],
    aiChatbot: [
      'Custom training on your services, pricing, FAQs',
      'Lead qualification questions and scoring',
      'Calendar integration (Calendly, Acuity, Cal.com)',
      'SMS and email handoff for high-intent leads',
      'After-hours lead capture automation',
      'CRM integration (Zapier, Make, webhooks)',
      'Conversation analytics and improvement insights',
    ],
    growthAddons: [
      'Local SEO: keyword research, content optimization, citation building',
      'On-page SEO: technical audits, schema markup, internal linking',
      'Google Ads: search campaigns, Local Service Ads, performance max',
      'Analytics dashboards: custom reporting, conversion tracking, attribution',
      'Branding: logo design, brand guidelines, visual identity systems',
      'Graphic design: social media templates, print collateral, digital ads',
      'Custom automations: CRM workflows, lead routing, nurture sequences',
      'Booking integration: automated scheduling, reminders, follow-ups',
    ],
  };

  const faqs = [
    {
      question: 'What exactly is included in the $999.95 website?',
      answer: 'The $999.95 package includes a conversion-optimized single-page website (or up to 3 pages for certain layouts) with mobile-first design, lead capture forms, click-to-call/text buttons, basic on-page SEO, Google Analytics 4 setup, and one round of revisions. Launch timeline is 7-14 days from kickoff. This is perfect for local service businesses that need a professional online presence that drives calls and form fills.',
    },
    {
      question: 'How long does it take to launch a website?',
      answer: 'Standard website builds launch in 7-14 days from kickoff. Growth system projects (websites + GBP + review screener + chatbot) typically take 14-21 days. We will give you a specific timeline on the kickoff call based on your scope. Rush delivery (3-5 days) is available for an additional fee.',
    },
    {
      question: 'What do you need from me to get started?',
      answer: 'We need: your business name, services offered, service area, preferred call-to-action (call, text, form, book appointment), any existing logo or brand assets, and 3-6 high-quality photos (we can source stock images if needed). We handle the rest—copywriting, design, technical setup, and tracking configuration.',
    },
    {
      question: 'Do you offer revisions?',
      answer: 'Yes. The $999.95 package includes one round of revisions (addressing layout, copy, imagery, and functionality feedback). Additional revision rounds are $150 each. For growth system projects, we include two revision rounds and treat implementation as iterative (we optimize based on early performance data).',
    },
    {
      question: 'How do I upgrade to a growth system ($2.5k-$10k)?',
      answer: 'Growth systems add modules on top of the website: Google Business Profile optimization, review screener, AI chatbot, local SEO, analytics dashboards, and/or lead automation. Pricing is based on which modules you choose. Book a call and we will scope a custom stack based on your goals. Most clients start with Website + GBP + Reviews ($2,495) and expand from there.',
    },
    {
      question: 'What does the $10k+ custom tier include?',
      answer: 'Custom projects include multi-page websites (8-20+ pages), advanced integrations (CRM, booking, payments), full branding and design systems, Google Ads management, content production, and ongoing optimization. These are fully tailored systems for businesses ready to scale aggressively. Timeline is typically 4-8 weeks depending on scope.',
    },
    {
      question: 'How do you measure and report results?',
      answer: 'Every project includes Google Analytics 4 with conversion tracking (form submissions, calls, clicks). For growth systems, we set up custom dashboards showing traffic sources, conversion rates, cost per lead, and ROI. You will get a shareable link to view performance in real time. Monthly summary reports are included in ongoing packages.',
    },
    {
      question: 'Do you run Google Ads or Facebook Ads?',
      answer: 'Yes, but only as part of growth system packages ($2.5k+). We specialize in Google Search Ads and Local Service Ads for local businesses. Facebook/Instagram Ads are available on request. Ad management includes account setup, campaign structure, ongoing optimization, and performance reporting. Monthly ad management starts at $500/month (separate from ad spend).',
    },
  ];

  const resources = [
    {
      title: 'Why Most Local Business Websites Don\'t Convert (And How to Fix Yours)',
      description: 'The 5 conversion killers we see on 90% of service business websites—and the exact structure that drives calls and form fills.',
      category: 'Conversion',
      readTime: '6 min read',
    },
    {
      title: 'Google Business Profile Optimization: The Complete 2025 Guide',
      description: 'How to dominate local search without spending a dollar on ads. Category selection, photos, posts, reviews, and tracking.',
      category: 'Local SEO',
      readTime: '8 min read',
    },
    {
      title: 'The Review Screener Strategy: How to 3x Your Google Reviews in 90 Days',
      description: 'Our proven framework for generating more 5-star reviews without awkward asks. Includes QR codes, SMS flows, and smart routing.',
      category: 'Reputation',
      readTime: '5 min read',
    },
    {
      title: 'Should You Use an AI Chatbot for Lead Capture? (When It Works, When It Doesn\'t)',
      description: 'Real performance data on AI chatbots for service businesses. Lead qualification, calendar booking, and after-hours conversion.',
      category: 'Automation',
      readTime: '7 min read',
    },
    {
      title: 'Tracking + Analytics Setup for SMBs: What to Measure From Day One',
      description: 'The minimum viable analytics stack for any service business. GA4, call tracking, form capture, and ROI dashboards.',
      category: 'Analytics',
      readTime: '6 min read',
    },
    {
      title: 'Local Service Ads vs. Google Search Ads: Which Drives More Calls?',
      description: 'Performance comparison and strategic recommendations based on 50+ local service business campaigns.',
      category: 'Paid Ads',
      readTime: '9 min read',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-400/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Conversion-focused websites + growth systems</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              We build websites that{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 text-transparent bg-clip-text">
                drive calls, capture leads, and scale growth
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-3xl mx-auto">
              Conversion-first website builds starting at $999.95. Add Google Business Profile optimization, review automation, AI chatbots, and tracking—everything productized, priced transparently, and designed to measure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Buy Website — $999.95
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a
                href="#contact"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-panel rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-transparent" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Left: Preview */}
              <div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-sm mb-3">
                    Featured Case Study
                  </span>
                  <h3 className="text-2xl sm:text-3xl mb-2">{featuredCase.clientName}</h3>
                  <div className="flex items-center gap-3 text-sm text-zinc-400 mb-4">
                    <span>{featuredCase.industry}</span>
                    <span>•</span>
                    <span>{featuredCase.location}</span>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50">
                  <img 
                    src={featuredCase.websitePreview} 
                    alt={featuredCase.clientName}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Right: Results */}
              <div>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  {featuredCase.summary}
                </p>

                {/* KPIs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {featuredCase.kpis.map((kpi, index) => (
                    <div 
                      key={index}
                      className="glass-panel p-4 rounded-xl border border-white/5 bg-zinc-950/50"
                    >
                      <div className="text-2xl sm:text-3xl mb-1 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                        {kpi.value}
                      </div>
                      <div className="text-xs text-zinc-500 mb-1">{kpi.label}</div>
                      <div className="text-sm text-emerald-400">{kpi.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/case-studies"
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/20 text-cyan-400 text-center hover:bg-cyan-500/20 transition-all"
                  >
                    View Full Case Study
                  </Link>
                  <Link
                    to="/case-studies"
                    className="px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all text-center"
                  >
                    See All Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Logo Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-wider text-zinc-500 mb-8">Trusted by growing businesses</p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
              {clientLogos.map((logo, index) => (
                <div 
                  key={index}
                  className="px-6 py-3 glass-panel rounded-lg border border-white/5 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/20 transition-all"
                >
                  {logo}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section 1: Data-First Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-violet-400/20 mb-4">
                <BarChart3 className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-400">Data-Driven Approach</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl mb-6">
                Every decision backed by{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  real performance data
                </span>
              </h2>
              
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                We don't build websites based on what looks good. We build based on what converts. Every element—from headline copy to CTA placement—is informed by conversion rate benchmarks, heatmap analysis, and A/B testing data from hundreds of local service businesses.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Conversion rate tracking from day one',
                  'User behavior analysis and optimization',
                  'Continuous testing and refinement',
                  'Transparent reporting on what drives results',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/5 to-transparent">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-zinc-400">Average Conversion Rate</span>
                    <span className="text-2xl text-cyan-400">8.2%</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-zinc-400">Avg. Cost Per Lead</span>
                    <span className="text-2xl text-emerald-400">$22.50</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-zinc-400">Avg. Page Load Time</span>
                    <span className="text-2xl text-violet-400">1.6s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Client Satisfaction</span>
                    <span className="text-2xl text-cyan-400">98%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Tracking Implementation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-transparent">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
                      <Target className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="mb-1">Google Analytics 4 + Event Tracking</h4>
                      <p className="text-sm text-zinc-400">Track every form, call, and click that matters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center border border-violet-400/30 flex-shrink-0">
                      <ChartBar className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="mb-1">Custom Dashboards</h4>
                      <p className="text-sm text-zinc-400">See performance in real time, shareable with your team</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="mb-1">ROI Attribution</h4>
                      <p className="text-sm text-zinc-400">Know exactly which channels drive revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/20 mb-4">
                <ChartBar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">Measurement Built In</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  Tracking isn't optional
                </span>
                —it's the foundation
              </h2>
              
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                You can't improve what you don't measure. Every project ships with comprehensive tracking: Google Analytics 4, conversion events, call tracking integration, and custom dashboards. From day one, you'll know what's working and what's not.
              </p>
              
              <p className="text-lg text-zinc-400 leading-relaxed">
                No more guessing. No more "we think it's working." Just clear, actionable data that shows ROI and guides your next move.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative Section 3: Integrated Systems */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-emerald-400/20 mb-4">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Integrated Systems</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl mb-6">
                Modules designed to{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 text-transparent bg-clip-text">
                  work together seamlessly
                </span>
              </h2>
              
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                A website alone isn't enough. Growth happens when you layer in Google Business Profile optimization, review automation, AI chatbots, and lead nurture—all working together as one system.
              </p>
              
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Start with a $999.95 website. Add modules as you grow. Every piece is productized, priced transparently, and designed to integrate without friction.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/pricing"
                  className="group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Pricing
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  to="/case-studies"
                  className="px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all text-center"
                >
                  See Examples
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <h4 className="text-sm uppercase tracking-wider text-cyan-400 mb-6">Complete Stack Example</h4>
                <div className="space-y-4">
                  {[
                    { icon: Globe, title: 'Conversion Website', color: 'from-cyan-500/20 to-cyan-500/5' },
                    { icon: MapPin, title: 'GBP Optimization', color: 'from-violet-500/20 to-violet-500/5' },
                    { icon: Star, title: 'Review Automation', color: 'from-amber-500/20 to-amber-500/5' },
                    { icon: Bot, title: 'AI Lead Capture', color: 'from-emerald-500/20 to-emerald-500/5' },
                    { icon: ChartBar, title: 'Analytics Dashboard', color: 'from-blue-500/20 to-blue-500/5' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/50 border border-white/5"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10`}>
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-zinc-300">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tactics / Deliverables Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              What we actually{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                build and deliver
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Every service is productized with clear deliverables—no vague promises or surprise scope.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Website Build */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl">Website Build</h3>
              </div>
              <ul className="space-y-2.5">
                {tactics.websiteBuild.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* GBP Optimization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center border border-violet-400/30">
                  <MapPin className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-2xl">GBP Optimization</h3>
              </div>
              <ul className="space-y-2.5">
                {tactics.gbpOptimization.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Review Screener */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center border border-amber-400/30">
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-2xl">Review Screener</h3>
              </div>
              <ul className="space-y-2.5">
                {tactics.reviewScreener.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* AI Chatbot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30">
                  <Bot className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl">AI Chatbot</h3>
              </div>
              <ul className="space-y-2.5">
                {tactics.aiChatbot.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Growth Add-ons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass-panel p-8 rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-emerald-500/20 flex items-center justify-center border border-cyan-400/30">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl">Growth Add-Ons</h3>
                <p className="text-sm text-zinc-400">Available for growth system packages ($2.5k–$10k+)</p>
              </div>
            </div>
            <ul className="grid md:grid-cols-2 gap-2.5">
              {tactics.growthAddons.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Frequently asked{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                questions
              </span>
            </h2>
            <p className="text-xl text-zinc-400">
              Everything you need to know about our services, pricing, and process.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-lg">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-1" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-zinc-400 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Learn more about{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                growth systems
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              In-depth guides on conversion optimization, local SEO, review automation, and analytics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs">
                    {resource.category}
                  </span>
                  <span className="text-xs text-zinc-500">{resource.readTime}</span>
                </div>
                
                <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <span>Read article</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Glow Background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            style={{
              animation: 'pulse-glow 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"
            style={{
              animation: 'pulse-glow 6s ease-in-out infinite reverse',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-12 rounded-2xl border border-white/10"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Ready to turn your website into a{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                revenue engine
              </span>
              ?
            </h2>
            <p className="text-xl text-zinc-400 mb-2">
              Start with a $999.95 conversion-focused website.
            </p>
            <p className="text-lg text-zinc-500 mb-10">
              Or book a call to scope a custom growth system with GBP, reviews, chatbot, and analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/pricing"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Buy Website — $999.95
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a
                href="#contact"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
              >
                Book a Call
              </a>
            </div>

            <p className="text-sm text-zinc-500">
              <CheckCircle className="w-4 h-4 inline mr-2 text-emerald-400" />
              Launch in 7-14 days • No hidden fees • Satisfaction guaranteed
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}