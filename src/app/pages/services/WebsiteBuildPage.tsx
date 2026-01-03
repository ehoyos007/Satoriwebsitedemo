import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  CheckCircle,
  TrendingUp,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';

export function WebsiteBuildPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const featuredCase = {
    clientName: 'Summit Realty Group',
    industry: 'Real Estate',
    location: 'Denver, CO',
    websitePreview: 'https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Conversion Rate', value: '8.2%', delta: '+4.1%' },
      { label: 'Form Leads', value: '156/mo', delta: '+189%' },
      { label: 'Page Load Time', value: '1.4s', delta: '-63%' },
      { label: 'Mobile Traffic', value: '68%', delta: '+24%' },
    ],
    summary: 'Conversion-first redesign that turned a slow brochure site into a lead-generating machine with 8.2% conversion rate.',
  };

  const trustChips = ['7-14 day launch', 'Mobile-first design', 'Analytics included', 'One revision round'];

  const whatYouGet = [
    'Conversion-optimized single-page site (or up to 3 pages)',
    'Mobile-first responsive design with speed optimization',
    'Lead capture forms + click-to-call/text buttons',
    'Google Analytics 4 + conversion tracking setup',
    'One round of revisions included',
  ];

  const deliverables = [
    'Custom conversion-first page architecture',
    'Mobile-responsive design (all devices)',
    'Speed optimization (target: under 2 seconds)',
    'Lead capture forms with validation',
    'Click-to-call and click-to-text buttons',
    'Sticky CTAs and strategic placement',
    'Trust signals: reviews, credentials, guarantees',
    'Schema markup for search visibility',
    'SSL certificate + security setup',
    'Google Analytics 4 configuration',
    'Conversion event tracking',
    'Cross-browser compatibility',
    'On-page SEO basics (titles, meta, headings)',
    'Image optimization and compression',
    'One round of revisions',
  ];

  const process = [
    { step: 'Discovery Call', time: 'Day 1', desc: 'We gather requirements: services, target audience, CTA goals, brand assets' },
    { step: 'Structure & Copy', time: 'Days 2-4', desc: 'We draft conversion-focused structure and write outcome-driven copy' },
    { step: 'Design & Build', time: 'Days 5-10', desc: 'We design and build the site with mobile-first, speed-optimized approach' },
    { step: 'Tracking Setup', time: 'Days 9-11', desc: 'We configure Google Analytics 4, conversion events, and dashboards' },
    { step: 'Review & Revise', time: 'Days 12-13', desc: 'You review, we revise based on feedback (one round included)' },
    { step: 'Launch & Handoff', time: 'Day 14', desc: 'We launch the site, provide training, and deliver analytics access' },
  ];

  const outcomes = [
    { metric: 'Average Conversion Rate', value: '7.8%', baseline: 'Industry avg: 2.1%' },
    { metric: 'Avg. Page Load Time', value: '1.6s', baseline: 'Industry avg: 4.2s' },
    { metric: 'Mobile Traffic %', value: '64%', baseline: 'Optimized for mobile-first' },
    { metric: 'Form Completion Rate', value: '42%', baseline: 'Industry avg: 18%' },
  ];

  const faqs = [
    {
      question: 'What exactly is included in the $999.95 website package?',
      answer: 'The package includes a conversion-optimized single-page website (or up to 3 pages for certain layouts) with mobile-first design, lead capture forms, click-to-call/text buttons, basic on-page SEO, Google Analytics 4 setup, and one round of revisions. Launch timeline is 7-14 days from kickoff.',
    },
    {
      question: 'How long does it take to launch?',
      answer: 'Standard builds launch in 7-14 days from kickoff. This includes discovery, design, development, tracking setup, one revision round, and launch. Rush delivery (3-5 days) is available for an additional $500 fee.',
    },
    {
      question: 'What do you need from me to get started?',
      answer: 'We need: business name, services offered, service area, primary call-to-action goal (call/text/form/booking), any existing logo or brand assets, and 3-6 high-quality photos. We handle copywriting, design, technical setup, and tracking.',
    },
    {
      question: 'How many pages are included?',
      answer: 'The base package is a single-page conversion-focused site. For businesses that need 2-3 pages (e.g., separate services page or about page), we can structure it within the same package depending on complexity. Multi-page sites (5+ pages) fall under our Growth System tier.',
    },
    {
      question: 'Do you provide hosting?',
      answer: 'Hosting is not included but we can recommend providers and handle setup for you. We work with Webflow, Vercel, Netlify, and traditional hosting. Hosting typically costs $15-30/month depending on provider.',
    },
    {
      question: 'How do revisions work?',
      answer: 'The package includes one round of revisions covering layout, copy, imagery, and functionality feedback. You provide consolidated feedback, we implement changes. Additional revision rounds are $150 each.',
    },
    {
      question: 'What kind of conversion rate can I expect?',
      answer: 'Our sites average 7-8% conversion rate (industry average is 2.1%). Actual performance depends on traffic quality, offer clarity, and follow-up speed. We track everything in Google Analytics so you can see real numbers from day one.',
    },
    {
      question: 'Can I upgrade later?',
      answer: 'Yes. Most clients start with the $999.95 site and add modules later: Google Business Profile optimization, review screener, AI chatbot, or analytics dashboards. Growth system packages range from $2,500-$10,000 depending on modules.',
    },
    {
      question: 'What happens after launch?',
      answer: 'You own the site. We provide training on how to update content (if applicable), access to analytics dashboards, and documentation. Ongoing support and optimization packages are available starting at $500/month.',
    },
    {
      question: 'How is this different from a template?',
      answer: 'Templates are generic. We build conversion-first architecture tailored to your business: strategic CTA placement, trust signal positioning, copy written for your audience, and tracking configured for your goals. Every element is there to drive calls and form fills.',
    },
  ];

  const resources = [
    {
      title: 'The Conversion-First Website Blueprint',
      description: 'Our exact structure for high-converting service business websites: hero → proof → offer → CTA.',
      category: 'Guide',
    },
    {
      title: 'Website Speed Optimization Checklist',
      description: 'How we get sites under 2 seconds: image compression, lazy loading, CDN setup, and more.',
      category: 'Checklist',
    },
    {
      title: 'Mobile-First Design Principles for Local Businesses',
      description: 'Why 68% of your traffic is mobile and how to design for thumb-friendly navigation.',
      category: 'Article',
    },
  ];

  const relatedServices = [
    { name: 'Google Business Profile', path: '/services/google-business-profile', icon: Target },
    { name: 'Review Screener', path: '/services/review-screener', icon: Award },
    { name: 'Analytics & Reporting', path: '/services/analytics-reporting', icon: BarChart3 },
  ];

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">Website Build</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-400/20 mb-6">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Productized Website Build</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Conversion-first websites that{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                drive calls and capture leads
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-6 max-w-3xl">
              Productized, conversion-optimized website builds for local service businesses. Mobile-first design, speed-optimized, analytics-ready. Launched in 7-14 days for $999.95.
            </p>

            <p className="text-lg text-zinc-300 mb-10 max-w-3xl">
              No endless revisions. No vague timelines. Just a proven structure that turns visitors into customers—backed by conversion rate tracking from day one.
            </p>

            {/* Trust Chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {trustChips.map((chip, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass-panel border border-white/10 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-emerald-400" />
                  {chip}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
              <Link
                to="/case-studies"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-center"
              >
                View Case Studies
              </Link>
            </div>

            {/* What You Get */}
            <div className="glass-panel p-6 rounded-xl border border-white/10">
              <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-4">What You Get</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
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
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-transparent" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-sm mb-3">
                  Featured Result
                </span>
                <h3 className="text-2xl sm:text-3xl mb-2">{featuredCase.clientName}</h3>
                <div className="flex items-center gap-3 text-sm text-zinc-400 mb-4">
                  <span>{featuredCase.industry}</span>
                  <span>•</span>
                  <span>{featuredCase.location}</span>
                </div>
                
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50 mb-6">
                  <img src={featuredCase.websitePreview} alt={featuredCase.clientName} className="w-full h-auto" />
                </div>

                <p className="text-zinc-300 mb-6">{featuredCase.summary}</p>

                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wider text-cyan-400 mb-6">Key Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  {featuredCase.kpis.map((kpi, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 bg-zinc-950/50">
                      <div className="text-2xl sm:text-3xl mb-1 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                        {kpi.value}
                      </div>
                      <div className="text-xs text-zinc-500 mb-1">{kpi.label}</div>
                      <div className="text-sm text-emerald-400">{kpi.delta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-zinc-500 mb-8">Trusted by growing businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Summit Realty', 'Apex Plumbing', 'Verde Landscaping', 'Precision Auto', 'Elite Fitness'].map((logo, i) => (
              <div key={i} className="px-6 py-3 glass-panel rounded-lg border border-white/5 text-zinc-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works - Conversion Architecture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/20 mb-4">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">Conversion Architecture</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl mb-6">
                Built for{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  outcomes, not aesthetics
                </span>
              </h2>
              
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Most websites are built to look good. Ours are built to convert. Every element—from headline hierarchy to CTA placement—is informed by conversion rate data from hundreds of local service businesses.
              </p>

              <ul className="space-y-3">
                {[
                  'Hero CTA above the fold (no scrolling required)',
                  'Proof elements strategically placed (reviews, credentials)',
                  'Clear value proposition in the first 3 seconds',
                  'Mobile-first design (68% of traffic is mobile)',
                  'Persistent contact options (sticky CTAs)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <h4 className="text-sm uppercase tracking-wider text-cyan-400 mb-6">Conversion Framework</h4>
                <div className="space-y-4">
                  {[
                    { step: '1. Hero', desc: 'Clear headline + subheadline + CTA', color: 'from-cyan-500/20' },
                    { step: '2. Proof', desc: 'Reviews, credentials, trust signals', color: 'from-violet-500/20' },
                    { step: '3. Offer', desc: 'Services, process, outcomes', color: 'from-emerald-500/20' },
                    { step: '4. CTA', desc: 'Multiple conversion paths', color: 'from-cyan-500/20' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} to-transparent flex items-center justify-center border border-white/10 flex-shrink-0`}>
                        <span className="text-cyan-400">{item.step[0]}</span>
                      </div>
                      <div>
                        <div className="font-medium mb-1">{item.step}</div>
                        <div className="text-sm text-zinc-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Measurement Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Every metric{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                tracked from day one
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              We configure Google Analytics 4 with conversion tracking for every project. You will know what is working from launch day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-xl border border-white/10 text-center"
              >
                <div className="text-3xl sm:text-4xl mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  {outcome.value}
                </div>
                <div className="text-sm mb-2">{outcome.metric}</div>
                <div className="text-xs text-zinc-500">{outcome.baseline}</div>
              </motion.div>
            ))}
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 text-center">
            <p className="text-sm text-zinc-400">
              * Example metrics based on average performance across 50+ websites. Individual results vary based on traffic quality, offer, and follow-up speed.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              What is{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                included
              </span>
            </h2>
            <p className="text-xl text-zinc-400">Complete deliverables list for the $999.95 package</p>
          </motion.div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <ul className="grid md:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                process
              </span>
            </h2>
            <p className="text-xl text-zinc-400">From kickoff to launch in 7-14 days</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
                    <span className="text-cyan-400">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.step}</h4>
                    <p className="text-xs text-zinc-500">{item.time}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Simple,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                transparent pricing
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Website Build */}
            <div className="glass-panel p-8 rounded-2xl border-2 border-cyan-400/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs">
                Most Popular
              </div>
              <h3 className="text-2xl mb-2">Website Build</h3>
              <div className="text-4xl mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                $999.95
              </div>
              <p className="text-sm text-zinc-400 mb-6">One-time payment</p>
              <Link
                to="/pricing"
                className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-center hover:scale-105 transition-all mb-6"
              >
                Buy Now
              </Link>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Single-page conversion site
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Mobile-first design
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Analytics setup
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  7-14 day launch
                </li>
              </ul>
            </div>

            {/* Growth System */}
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl mb-2">Growth System</h3>
              <div className="text-4xl mb-4 text-white">$2.5k-$10k</div>
              <p className="text-sm text-zinc-400 mb-6">Website + add-on modules</p>
              <a
                href="#contact"
                className="block w-full px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white text-center transition-all mb-6"
              >
                Book a Call
              </a>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Everything in Website Build
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  + GBP optimization
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  + Review screener
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  + AI chatbot
                </li>
              </ul>
            </div>

            {/* Scale */}
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl mb-2">Scale</h3>
              <div className="text-4xl mb-4 text-white">$10k+</div>
              <p className="text-sm text-zinc-400 mb-6">Custom systems</p>
              <a
                href="#contact"
                className="block w-full px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white text-center transition-all mb-6"
              >
                Book a Call
              </a>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Multi-page sites (8-20+ pages)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Custom integrations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Full branding
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  Ongoing optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Frequently asked{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-lg">{faq.question}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-1" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Related{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                resources
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs mb-4">
                  {resource.category}
                </span>
                <h3 className="text-xl mb-3">{resource.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">{resource.description}</p>
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Maximize results with{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                add-on services
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all"
              >
                <service.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl mb-2 group-hover:text-cyan-400 transition-colors">{service.name}</h3>
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-12 rounded-2xl border border-white/10"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Ready to launch a{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                high-converting website
              </span>
              ?
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              Get a conversion-optimized website with analytics tracking in 7-14 days for $999.95.
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
              <Link
                to="/case-studies"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all"
              >
                View Case Studies
              </Link>
            </div>

            <p className="text-sm text-zinc-500">
              <CheckCircle className="w-4 h-4 inline mr-2 text-emerald-400" />
              7-14 day launch • Analytics included • One revision round
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
