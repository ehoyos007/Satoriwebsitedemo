import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChartBar, TrendingUp, Star, MapPin, Phone, Bot, Globe, Zap, Search, Megaphone } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import logoMark from '@/assets/1d25c7bfec767bdda7142f41d5290ab7d412db37.png';

const chartData = [
  { day: 'Day 1', Calls: 12, Forms: 8, Bookings: 5 },
  { day: 'Day 7', Calls: 15, Forms: 11, Bookings: 7 },
  { day: 'Day 14', Calls: 20, Forms: 15, Bookings: 10 },
  { day: 'Day 21', Calls: 24, Forms: 18, Bookings: 14 },
  { day: 'Day 30', Calls: 28, Forms: 22, Bookings: 17 },
];

export function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section with Aurora Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
              Data-driven websites & growth systems that turn{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 text-transparent bg-clip-text">
                traffic into calls
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto">
              Satori Studios builds modern, conversion-focused websites and the systems around them—reviews, Google Business, automation, and tracking—so you can measure what's working and scale it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/checkout?service=website-build"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Buy Website — $999.95
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/book-call"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
              >
                Book a Call
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 justify-center text-sm">
              {['Mobile-first', 'SEO-ready', 'Tracking included', 'Fast turnaround', 'Built for leads'].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full glass-panel text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-8 text-sm text-zinc-500">
              Prefer a full growth build? Packages range from $2,500–$10,000 and $10,000+ for scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proof / Metrics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Performance you can{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                track
              </span>
              —not guess
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Every build ships with measurement baked in: events, forms, click-to-call, and conversion pathways. We don't just launch—we instrument.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: '+38% Calls', icon: Phone, color: 'cyan' },
              { label: '2.1× Form Leads', icon: TrendingUp, color: 'violet' },
              { label: '+27 Reviews / 30 Days', icon: Star, color: 'emerald' },
              { label: '+44% Direction Requests', icon: MapPin, color: 'cyan' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl glass-panel hover:scale-105 transition-all"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-400`} />
                <div className="text-2xl relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-xl p-6 border border-white/5"
          >
            <h3 className="text-xl mb-4">Leads — last 30 days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorForms" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(24, 24, 27, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Calls"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#colorCalls)"
                  dot={{ fill: '#22d3ee', r: 4 }}
                  activeDot={{ r: 6, fill: '#22d3ee' }}
                />
                <Line
                  type="monotone"
                  dataKey="Forms"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  fill="url(#colorForms)"
                  dot={{ fill: '#a78bfa', r: 4 }}
                  activeDot={{ r: 6, fill: '#a78bfa' }}
                />
                <Line
                  type="monotone"
                  dataKey="Bookings"
                  stroke="#34d399"
                  strokeWidth={2}
                  fill="url(#colorBookings)"
                  dot={{ fill: '#34d399', r: 4 }}
                  activeDot={{ r: 6, fill: '#34d399' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-zinc-500 mt-4">
              Example reporting view. Results vary by market, offer, and baseline.
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              <span className="text-zinc-500">Tracking Stack:</span> GA4 • Search Console • GBP • Call Tracking • CRM (optional)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Studies with Data Flow Background */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Data Flow Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
                animation: `data-flow ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Case studies: real outcomes,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                real numbers
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Browse how we've helped businesses increase calls, bookings, and reviews—with clear before/after data and what we actually shipped.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {['All', 'Websites', 'Google Business', 'Reviews', 'Automation'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full glass-panel text-zinc-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all border border-transparent"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: 'Ridgeway Barbers — Miami, FL',
                tag: 'Website + Reviews',
                headline: 'From 9 → 19 calls/week in 30 days',
                kpis: ['+111% Calls', '+18 Reviews', '+32% Map Views'],
              },
              {
                name: 'Solé Med Spa — Fort Lauderdale, FL',
                tag: 'Website + GBP + Bot',
                headline: '2.3× more booking requests',
                kpis: ['2.3× Leads', '-21% CPL', '+40% Conversion Rate'],
              },
              {
                name: 'Apex Auto Detail — Doral, FL',
                tag: 'Website + GBP',
                headline: '+44% direction requests and +29% calls',
                kpis: ['+29% Calls', '+44% Directions', '+35% Profile Actions'],
              },
            ].map((study, index) => (
              <motion.div
                key={study.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl glass-panel hover:scale-105 transition-all border border-white/5 hover:border-cyan-400/50"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 text-sm mb-3 border border-cyan-400/30">
                  {study.tag}
                </span>
                <h3 className="text-xl mb-2 relative z-10">{study.name}</h3>
                <p className="text-lg text-zinc-300 mb-4 relative z-10">{study.headline}</p>
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {study.kpis.map((kpi) => (
                    <span key={kpi} className="px-3 py-1 rounded-full bg-zinc-800/80 text-sm border border-zinc-700">
                      {kpi}
                    </span>
                  ))}
                </div>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all relative z-10"
                >
                  View Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 hover:gap-3 transition-all"
            >
              View all case studies
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* System Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Your growth stack,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                productized
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Globe,
                title: 'Conversion-focused website',
                description: 'Clean UI, fast load, clear CTAs, built to capture leads.',
                outcome: 'Designed to convert traffic into calls & forms.',
                gradient: 'from-cyan-500/10 to-transparent',
              },
              {
                icon: MapPin,
                title: 'GBP optimization',
                description: 'Fixes, enhancements, and structure that improves local visibility.',
                outcome: 'More discovery, more profile actions.',
                gradient: 'from-violet-500/10 to-transparent',
              },
              {
                icon: Star,
                title: 'Reputation funnel',
                description: 'Simple flow to capture feedback and drive more 5-star reviews.',
                outcome: 'More reviews without awkward asks.',
                gradient: 'from-emerald-500/10 to-transparent',
              },
              {
                icon: Bot,
                title: 'Lead capture automation',
                description: 'Answers FAQs, qualifies leads, and routes to call/text/email.',
                outcome: 'Faster response = more conversions.',
                gradient: 'from-cyan-500/10 to-transparent',
              },
              {
                icon: Search,
                title: 'Local SEO + On-Page SEO',
                description: 'Rank higher in local search results and drive sustainable organic traffic growth.',
                outcome: 'More visibility, more organic leads.',
                gradient: 'from-cyan-500/10 to-transparent',
              },
              {
                icon: Megaphone,
                title: 'Google Ads Management',
                description: 'Immediate visibility and qualified leads through targeted paid campaigns.',
                outcome: 'Fast results with measurable ROI.',
                gradient: 'from-violet-500/10 to-transparent',
              },
            ].map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl glass-panel hover:scale-105 transition-all border border-white/5"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <module.icon className="w-12 h-12 mb-4 text-cyan-400 relative z-10" />
                <h3 className="text-xl mb-2 relative z-10">{module.title}</h3>
                <p className="text-zinc-400 mb-4 relative z-10">{module.description}</p>
                <p className="text-sm text-cyan-400 relative z-10">{module.outcome}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Explore services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Launch fast. Measure everything.{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                Improve continuously
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                step: '01',
                title: 'Audit & goals',
                description: 'We map your offer, audience, and conversion paths.',
              },
              {
                step: '02',
                title: 'Build & structure',
                description: 'Pages, copy, CTAs, and trust elements built for clarity.',
              },
              {
                step: '03',
                title: 'Instrument & launch',
                description: 'Analytics events + lead tracking so results are measurable.',
              },
              {
                step: '04',
                title: 'Optimize & scale',
                description: 'Improve conversion rates with iteration, reviews, and automation.',
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative glass-panel p-6 rounded-xl border border-white/5"
              >
                <div className="text-6xl mb-4 opacity-10 bg-gradient-to-br from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  {process.step}
                </div>
                <h3 className="text-2xl mb-2">{process.title}</h3>
                <p className="text-zinc-400">{process.description}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-zinc-500">
            Typical launch windows: 7–14 days depending on scope.
          </p>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Simple pricing.{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                Clear outcomes
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                tier: 'Website Build',
                price: '$999.95',
                description: 'A high-converting 1-page website that is mobile-first, SEO-ready, and tracked.',
                highlighted: false,
              },
              {
                tier: 'Growth System',
                price: '$2,500 to $10,000',
                description: 'Website + GBP + reviews + automation + reporting.',
                highlighted: true,
              },
              {
                tier: 'Scale / Custom',
                price: '$10,000+',
                description: 'Multi-location, integrations, custom development, advanced reporting.',
                highlighted: false,
              },
            ].map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-xl ${
                  tier.highlighted
                    ? 'glass-panel border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    : 'glass-panel border border-white/5'
                } hover:scale-105 transition-all`}
              >
                {tier.highlighted && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent" />
                )}
                <h3 className="text-2xl mb-2 relative z-10">{tier.tier}</h3>
                <div className="text-3xl mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text relative z-10">
                  {tier.price}
                </div>
                <p className="text-zinc-400 relative z-10">{tier.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">Buy Website — $999.95</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/book-call"
              className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              What clients say when{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                results show up
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  'Satori rebuilt our site and tightened our CTA flow. We started getting consistent calls within the first month.',
                author: 'Owner, Local Service Business',
              },
              {
                quote: 'The reporting made it obvious what was working. We finally stopped guessing.',
                author: 'Founder, SMB Brand',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-xl glass-panel border border-white/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
                <p className="text-zinc-400">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Glow */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Glow Background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full"
            style={{
              animation: 'pulse-glow 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/20 rounded-full"
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
                lead engine
              </span>
              ?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Buy the $999.95 website today—or book a call for a growth system designed around measurable outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Buy Website — $999.95</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/book-call"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}