import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  CheckCircle,
  TrendingUp,
  Target,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  Search,
  BarChart3,
  Phone,
  Navigation,
} from 'lucide-react';
import { useState } from 'react';

export function GoogleBusinessProfilePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const featuredCase = {
    clientName: 'Apex Plumbing & Heating',
    industry: 'Home Services',
    location: 'Portland, OR',
    websitePreview: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHNlcnZpY2V8ZW58MHx8fHwxNzY2NzIwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Map Views', value: '2,847/mo', delta: '+312%' },
      { label: 'Direction Requests', value: '486/mo', delta: '+267%' },
      { label: 'Phone Calls', value: '127/mo', delta: '+198%' },
      { label: 'Search Ranking', value: 'Top 3', delta: '12 keywords' },
      { label: 'Profile Actions', value: '634/mo', delta: '+289%' },
      { label: 'Review Count', value: '94', delta: '+67' },
    ],
    summary: 'Strategic GBP optimization that turned a dormant profile into a lead-generating asset driving 127 calls per month from local search.',
  };

  const trustChips = ['10-14 day setup', 'Category optimization', 'Tracking included', 'Review strategy'];

  const whatYouGet = [
    'Complete profile audit and category optimization',
    'Strategic service descriptions aligned with search intent',
    'Photo optimization strategy and upload guidance',
    'Review generation workflow and response templates',
    'Performance tracking dashboard',
  ];

  const deliverables = [
    'Profile audit with competitive analysis',
    'Primary and secondary category research',
    'Service area optimization',
    'Business hours and attributes setup',
    'Business description optimization (search-intent focused)',
    'Service list refinement and pricing guidance',
    'Photo strategy: covers, logos, service shots',
    'Post scheduling strategy for visibility',
    'Review response templates',
    'Q&A seeding and monitoring setup',
    'Booking button and website link optimization',
    'Product/service catalog setup (if applicable)',
    'Performance tracking dashboard (views, actions, calls)',
    'Monthly optimization checklist',
    'Competitor monitoring setup',
  ];

  const optionalUpgrades = [
    'Professional photo shoot coordination',
    'Monthly post creation and scheduling',
    'Review generation automation via SMS/email',
    'Multi-location GBP management',
    'Local Service Ads integration',
  ];

  const process = [
    { step: 'Profile Audit', time: 'Days 1-2', desc: 'We analyze your current GBP, review competitors, and identify quick-win opportunities' },
    { step: 'Category Strategy', time: 'Days 3-4', desc: 'We research and select primary/secondary categories based on search volume and competition' },
    { step: 'Content Optimization', time: 'Days 5-8', desc: 'We rewrite business description, services, and attributes to align with searcher intent' },
    { step: 'Photo Strategy', time: 'Days 7-10', desc: 'We provide photo guidelines, upload optimized images, and set strategic covers' },
    { step: 'Tracking Setup', time: 'Days 9-11', desc: 'We configure performance tracking and set up your monitoring dashboard' },
    { step: 'Launch & Training', time: 'Days 12-14', desc: 'We launch optimizations, train you on posting/reviews, and provide ongoing checklist' },
  ];

  const outcomes = [
    { metric: 'Avg. Map View Increase', value: '+287%', baseline: 'Within 90 days' },
    { metric: 'Direction Requests', value: '+234%', baseline: 'vs. pre-optimization' },
    { metric: 'Phone Call Volume', value: '+198%', baseline: 'From GBP clicks' },
    { metric: 'Top 3 Ranking %', value: '78%', baseline: 'Primary keyword set' },
  ];

  const faqs = [
    {
      question: 'What exactly is Google Business Profile optimization?',
      answer: 'GBP optimization is the process of strategically configuring your Google Business Profile to maximize visibility in local search and Google Maps. We optimize categories, descriptions, photos, posts, reviews, and tracking to drive more calls, directions, and website clicks without spending on ads.',
    },
    {
      question: 'How long does optimization take?',
      answer: 'Initial setup and optimization takes 10-14 days. This includes profile audit, category research, content optimization, photo strategy, and tracking setup. Results typically start showing within 2-4 weeks as Google indexes the changes.',
    },
    {
      question: 'What do you need from me?',
      answer: 'We need: business verification access, current branding/logo, 10-15 high-quality photos (service work, team, location), your service list with pricing (optional), and any existing review links or workflows.',
    },
    {
      question: 'Will this work if I already have a GBP?',
      answer: 'Yes. Most businesses have a GBP but it is poorly optimized. We audit your existing profile, fix category misalignment, rewrite descriptions for search intent, optimize photos, and set up tracking. Even well-established profiles see 150-300% increases in actions.',
    },
    {
      question: 'How do you track results?',
      answer: 'We set up a custom dashboard tracking: profile views, search vs. map views, direction requests, phone calls, website clicks, and booking button taps. You get a shareable link to monitor performance in real time. Google provides native insights we compile into a single view.',
    },
    {
      question: 'Do you help with reviews?',
      answer: 'Yes. We provide a review generation strategy including SMS/email templates, QR codes for in-person asks, and response templates. For automated review requests, we offer our Review Screener service as an add-on ($1,200 setup).',
    },
    {
      question: 'What results can I expect?',
      answer: 'Typical results within 90 days: 200-300% increase in map views, 150-250% increase in direction requests, 100-200% increase in calls. Actual performance depends on competition, service area, and existing review count. We track everything so you see real numbers.',
    },
    {
      question: 'How is this different from Local Service Ads?',
      answer: 'GBP optimization is organic (no ad spend). Local Service Ads are paid and appear above organic results. We recommend GBP optimization first to build a strong foundation, then layer in LSAs if budget allows. We offer LSA management as a separate service.',
    },
    {
      question: 'Do you handle multi-location businesses?',
      answer: 'Yes. Multi-location GBP optimization is priced per location with volume discounts. Each location gets the full optimization treatment: categories, descriptions, photos, tracking. We also set up centralized reporting across all locations.',
    },
    {
      question: 'What happens after the initial optimization?',
      answer: 'GBP requires ongoing maintenance: weekly posts, review responses, Q&A monitoring, and photo updates. We provide a monthly checklist and optional ongoing management starting at $300/month per location.',
    },
  ];

  const resources = [
    {
      title: 'GBP Category Strategy Guide',
      description: 'How to choose primary and secondary categories that maximize visibility without diluting relevance.',
      category: 'Guide',
    },
    {
      title: 'Local Search Ranking Factors 2025',
      description: 'The 15 factors Google uses to rank businesses in local pack and map results.',
      category: 'Report',
    },
    {
      title: 'GBP Photo Optimization Checklist',
      description: 'What types of photos to upload, optimal dimensions, and how cover photo selection impacts clicks.',
      category: 'Checklist',
    },
    {
      title: 'Review Generation Strategy Template',
      description: 'Scripts, timing, and automation workflows for generating 5-star reviews without being pushy.',
      category: 'Template',
    },
  ];

  const relatedServices = [
    { name: 'Website Build', path: '/services/website-build', icon: Target },
    { name: 'Review Screener', path: '/services/review-screener', icon: Star },
    { name: 'Local SEO', path: '/services/local-seo', icon: Search },
  ];

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-zinc-300">Google Business Profile</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-violet-400/20 mb-6">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-400">Google Business Profile Optimization</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Dominate local search and drive{' '}
              <span className="bg-gradient-to-r from-violet-400 via-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                200-300% more calls
              </span>
              {' '}without ad spend
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-3xl">
              Strategic Google Business Profile optimization that increases map visibility, drives direction requests, and generates calls from local search. Data-driven category selection, content optimization, and performance tracking included.
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

            {/* What You Get */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 mb-10">
              <h3 className="text-lg mb-4 text-cyan-400">What You Get</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-violet-500 to-emerald-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book a Call
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <Link
                to="/case-studies"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-violet-400/50 hover:bg-violet-500/5 transition-all backdrop-blur-sm text-center"
              >
                View Case Studies
              </Link>
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
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-emerald-500/5 to-transparent" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
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

              <div>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  {featuredCase.summary}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {featuredCase.kpis.map((kpi, index) => (
                    <div
                      key={index}
                      className="glass-panel p-4 rounded-xl border border-white/5 bg-zinc-950/50"
                    >
                      <div className="text-2xl sm:text-3xl mb-1 bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                        {kpi.value}
                      </div>
                      <div className="text-xs text-zinc-500 mb-1">{kpi.label}</div>
                      <div className="text-sm text-emerald-400">{kpi.delta}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/case-studies"
                  className="block px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border border-violet-400/20 text-violet-400 text-center hover:bg-violet-500/20 transition-all"
                >
                  View Full Case Study
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-zinc-500 mb-8">Trusted by local businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Apex Plumbing', 'Verde Landscaping', 'Precision Auto', 'Elite Fitness', 'Coastal Dental'].map((logo, i) => (
              <div key={i} className="px-6 py-3 glass-panel rounded-lg border border-white/5 text-zinc-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works - Section 1 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-violet-400/20 mb-4">
                <Target className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-violet-400">Strategic Approach</span>
              </div>

              <h2 className="text-3xl sm:text-4xl mb-6">
                Category selection and{' '}
                <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                  search intent alignment
                </span>
              </h2>

              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Most businesses choose the wrong GBP categories or write descriptions that do not match what searchers are looking for. We use search volume data, competitor analysis, and conversion intent research to select categories and write content that ranks.
              </p>

              <ul className="space-y-3">
                {[
                  'Data-driven category selection (primary + secondary)',
                  'Service descriptions optimized for searcher intent',
                  'Competitor gap analysis and positioning',
                  'Photo strategy based on click-through data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <h4 className="text-sm uppercase tracking-wider text-violet-400 mb-6">What We Optimize</h4>
              <div className="space-y-4">
                {[
                  { label: 'Primary Category', value: 'Research-backed selection' },
                  { label: 'Secondary Categories', value: 'Strategic additions for visibility' },
                  { label: 'Business Description', value: 'Search-intent aligned copy' },
                  { label: 'Service List', value: 'Keyword-optimized offerings' },
                  { label: 'Photo Strategy', value: 'Click-optimized covers & galleries' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between pb-3 border-b border-white/5 last:border-0">
                    <span className="text-zinc-400 text-sm">{item.label}</span>
                    <span className="text-zinc-300 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Works - Section 2: Measurement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 glass-panel p-8 rounded-2xl border border-white/10"
            >
              <h4 className="text-sm uppercase tracking-wider text-emerald-400 mb-6">Performance Tracking</h4>
              <div className="space-y-4">
                {[
                  { icon: Search, label: 'Map & Search Views', desc: 'How often your profile appears in results' },
                  { icon: Phone, label: 'Phone Call Volume', desc: 'Calls directly from GBP listing' },
                  { icon: Navigation, label: 'Direction Requests', desc: 'Customers navigating to your location' },
                  { icon: Target, label: 'Website Clicks', desc: 'Traffic driven to your website' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h5 className="mb-1">{item.label}</h5>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-emerald-400/20 mb-4">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Data-Driven Results</span>
              </div>

              <h2 className="text-3xl sm:text-4xl mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                  Track every action
                </span>
                {' '}from your GBP
              </h2>

              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                We set up comprehensive tracking for all GBP actions: profile views (search vs. map), direction requests, phone calls, website clicks, and booking button taps. You get a real-time dashboard showing exactly how your profile drives business.
              </p>

              <p className="text-lg text-zinc-400 leading-relaxed">
                No more guessing. You will see which actions convert, when traffic spikes, and how your profile performs vs. competitors.
              </p>
            </motion.div>
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
            <h2 className="text-4xl sm:text-5xl mb-4">
              Complete GBP{' '}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                optimization deliverables
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Everything included in your GBP optimization package.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-violet-400" />
                Core Deliverables
              </h3>
              <ul className="space-y-2.5">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Optional Upgrades
              </h3>
              <ul className="space-y-2.5">
                {optionalUpgrades.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                optimization process
              </span>
            </h2>
            <p className="text-xl text-zinc-400">
              From audit to launch in 10-14 days.
            </p>
          </motion.div>

          <div className="space-y-6">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start glass-panel p-6 rounded-xl border border-white/10"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center border border-violet-400/30">
                  <span className="text-xl">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl">{item.step}</h3>
                    <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-400 text-xs">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Typical{' '}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                performance improvements
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-4">
              Average results from our GBP optimization clients.
            </p>
            <p className="text-sm text-zinc-500">
              *Results vary based on competition, location, and existing review count
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 rounded-xl border border-white/10 text-center"
              >
                <div className="text-4xl mb-2 bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                  {item.value}
                </div>
                <div className="text-sm text-zinc-300 mb-2">{item.metric}</div>
                <div className="text-xs text-zinc-500">{item.baseline}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Transparent{' '}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                pricing
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl mb-2">Single Location</h3>
              <div className="text-4xl mb-4 bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                $1,495
              </div>
              <p className="text-sm text-zinc-400 mb-6">One-time setup + optimization</p>
              <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Complete optimization
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Tracking dashboard
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  10-14 day delivery
                </li>
              </ul>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-violet-400/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white text-xs">
                Most Popular
              </div>
              <h3 className="text-xl mb-2">Multi-Location</h3>
              <div className="text-4xl mb-4 bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                $1,195<span className="text-lg">/ea</span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">2-5 locations (volume discount)</p>
              <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  All single-location features
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Centralized reporting
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Volume discount pricing
                </li>
              </ul>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl mb-2">Ongoing</h3>
              <div className="text-4xl mb-4 bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                $300<span className="text-lg">/mo</span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">Monthly management (optional)</p>
              <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Weekly posts
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Review responses
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Q&A monitoring
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-violet-500 to-emerald-500 text-white hover:scale-105 transition-all"
            >
              Book a Call
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                questions
              </span>
            </h2>
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
                  className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-violet-500/5 transition-colors"
                >
                  <span className="text-lg">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
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

      {/* Resources */}
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
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                GBP optimization
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-violet-400/30 transition-all cursor-pointer"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-400 text-xs mb-4">
                  {resource.category}
                </span>
                <h3 className="text-lg mb-3 group-hover:text-violet-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {resource.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl mb-6 text-center">Related Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-violet-400/30 transition-all"
              >
                <service.icon className="w-8 h-8 text-violet-400 mb-3" />
                <h4 className="text-lg group-hover:text-violet-400 transition-colors">{service.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
            style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
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
              Ready to dominate{' '}
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                local search
              </span>
              ?
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              Book a call to discuss your GBP optimization strategy and see how we can 3x your local visibility.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-violet-500 to-emerald-500 text-white overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book a Call
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <Link
                to="/case-studies"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-violet-400/50 hover:bg-violet-500/5 transition-all text-center"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
