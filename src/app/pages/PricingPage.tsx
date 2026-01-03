import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Star, Bot, Search, Megaphone, BarChart3, Palette, Sparkles, Database } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export function PricingPage() {
  const faqs = [
    {
      question: 'What do I get for $999.95?',
      answer: 'A conversion-focused 1-page site, mobile-first, SEO-ready structure, lead capture, and tracking setup so you can measure results.',
    },
    {
      question: 'Can I upgrade later?',
      answer: 'Yes. Many clients start with the $999.95 build and expand into GBP, reviews, automation, or full system builds.',
    },
    {
      question: 'Do you provide hosting and domains?',
      answer: 'We can guide setup or manage it as part of your project scope. Hosting is not included unless specified.',
    },
    {
      question: 'How fast is turnaround?',
      answer: 'Basic builds typically launch in 7–10 days once we have your core info. Larger scopes vary.',
    },
    {
      question: 'Will this help me rank on Google?',
      answer: 'The site is built with SEO fundamentals. Ranking depends on competition, content, and ongoing signals (reviews, GBP, authority).',
    },
    {
      question: 'Do you write the copy?',
      answer: 'Yes—conversion-focused copy is included for the website build. If you need deep SEO copy or service pages, that is scoped.',
    },
    {
      question: 'What do you need from me to start?',
      answer: 'Business name, services, service area, preferred CTA, and any logo/photos you have. We can work with minimal assets.',
    },
    {
      question: 'Do you run ads?',
      answer: 'Yes—Google Ads is available as an add-on or part of Growth/Scale scopes.',
    },
    {
      question: 'How do you measure results?',
      answer: 'We track the actions that matter: calls, form submissions, booking clicks, GBP actions, and review growth.',
    },
    {
      question: 'Are results guaranteed?',
      answer: 'We build systems that should drive more calls and leads. Results vary by market, competitive landscape, and the offer itself.',
    },
  ];

  const pricingTiers = [
    {
      name: 'Website Build',
      price: '$999.95',
      tagline: 'A high-converting 1-page website',
      description: 'Everything you need to turn visitors into calls—built fast, built to measure.',
      features: [
        'Single-page conversion site',
        'Mobile-first, fast-loading',
        'Click-to-call, forms, CTA blocks',
        'Basic SEO (titles, metadata)',
        'GA4 + event tracking setup',
        'Launch-ready in 7–10 days',
      ],
      cta: 'Buy Website — $999.95',
      ctaLink: '/pricing',
      highlighted: false,
    },
    {
      name: 'Growth System',
      price: '$2,500 to $10,000',
      tagline: 'Website + GBP + Reviews + Automation',
      description: 'A full growth stack designed to generate more calls, reviews, and bookings—with tracking across every layer.',
      features: [
        'Everything in Website Build',
        'Google Business Profile optimization',
        'Review screener funnel',
        'Lead capture bot (optional)',
        'Monthly reporting + iteration',
        'CRM integration (optional)',
        'Priority support',
      ],
      cta: 'Book a Call',
      ctaLink: '/book-call',
      highlighted: true,
    },
    {
      name: 'Scale / Custom',
      price: '$10,000+',
      tagline: 'Multi-location, custom dev, advanced tracking',
      description: 'For teams ready to scale with custom integrations, multi-page builds, and advanced measurement.',
      features: [
        'Everything in Growth System',
        'Multi-location / multi-page sites',
        'Custom design & branding',
        'Advanced analytics dashboards',
        'API integrations & automations',
        'Ongoing optimization & A/B testing',
        'Dedicated growth partner',
      ],
      cta: 'Book a Call',
      ctaLink: '/book-call',
      highlighted: false,
    },
  ];

  const additionalServices = [
    {
      name: 'GBP Optimization',
      icon: MapPin,
      setup: '$1,495',
      monthly: '$197/mo',
      badge: 'Popular',
      description: 'Optimize your Google Business Profile for maximum visibility',
      path: '/services/google-business-profile',
    },
    {
      name: 'Review Screener',
      icon: Star,
      setup: '$997',
      monthly: '$297/mo',
      badge: 'Recommended',
      description: 'Automated review funnel to boost your ratings',
      path: '/services/review-screener',
    },
    {
      name: 'AI Chat Bot',
      icon: Bot,
      setup: '$1,497',
      monthly: '$147/mo',
      badge: 'AI-Powered',
      description: 'Capture leads 24/7 with intelligent automation',
      path: '/services/ai-chat-bot',
    },
    {
      name: 'Local SEO',
      icon: Search,
      setup: null,
      monthly: '$497/mo (6-mo min)',
      badge: 'Popular',
      description: 'Rank higher in local search and drive organic traffic',
      path: '/services/local-seo',
    },
    {
      name: 'Google Ads',
      icon: Megaphone,
      setup: '$997',
      monthly: '$597/mo + ad spend',
      badge: null,
      description: 'Immediate visibility through targeted paid campaigns',
      path: '/services/google-ads',
    },
    {
      name: 'Analytics Dashboards',
      icon: BarChart3,
      setup: '$997',
      monthly: '$97/mo',
      badge: 'Recommended',
      description: 'Real-time reporting and data-driven insights',
      path: '/services/analytics-dashboards',
    },
    {
      name: 'Branding',
      icon: Palette,
      setup: '$2,997',
      monthly: null,
      badge: null,
      description: 'Professional brand identity that builds trust',
      path: '/services/branding',
    },
    {
      name: 'Graphic Design',
      icon: Sparkles,
      setup: '$1,297',
      monthly: null,
      badge: null,
      description: 'Marketing materials that convert',
      path: '/services/graphic-design',
    },
    {
      name: 'Custom CRM',
      icon: Database,
      setup: '$4,997',
      monthly: '$297/mo',
      badge: 'Enterprise',
      description: 'Automate follow-ups and close more deals',
      path: '/services/custom-crm',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
              Simple pricing.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 text-transparent bg-clip-text">
                Clear outcomes
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Whether you need a simple website to get more calls, or a full growth system with automation and tracking—we have a path forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Offering Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-panel rounded-2xl p-8 md:p-12 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-cyan-300 text-sm">
                  Most Popular
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl mb-4">
                Website Build —{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  $999.95
                </span>
              </h2>

              <p className="text-xl text-zinc-300 mb-6">
                A high-converting 1-page website built to turn visitors into calls, forms, and bookings.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-zinc-200 font-medium">1-page conversion site</div>
                    <div className="text-sm text-zinc-400">Focused on driving action</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-zinc-200 font-medium">Mobile-first design</div>
                    <div className="text-sm text-zinc-400">Fast-loading, responsive</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-zinc-200 font-medium">SEO-ready structure</div>
                    <div className="text-sm text-zinc-400">Built for visibility</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-zinc-200 font-medium">7-10 day delivery</div>
                    <div className="text-sm text-zinc-400">Launch-ready quickly</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/checkout"
                  className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Buy Website — $999.95
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <a
                  href="#pricing-tiers"
                  className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm text-center"
                >
                  See What's Included
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing-tiers" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl ${
                  tier.highlighted
                    ? 'glass-panel border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 scale-105'
                    : 'glass-panel border border-white/5'
                } hover:scale-110 transition-all`}
              >
                {tier.highlighted && (
                  <>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm">
                        Most Popular
                      </span>
                    </div>
                  </>
                )}

                <div className="relative z-10">
                  <h3 className="text-2xl mb-2">{tier.name}</h3>
                  <div className="text-4xl mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                    {tier.price}
                  </div>
                  <p className="text-lg text-zinc-300 mb-4">{tier.tagline}</p>
                  <p className="text-zinc-400 mb-6 pb-6 border-b border-zinc-800">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.highlighted ? (
                    <Link
                      to={tier.ctaLink}
                      className="block w-full py-4 text-center rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                      {tier.cta}
                    </Link>
                  ) : (
                    <Link
                      to={tier.ctaLink}
                      className="block w-full py-4 text-center rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all"
                    >
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-zinc-500 mt-8"
          >
            All projects include measurement, tracking, and outcomes-focused delivery.
          </motion.p>
        </div>
      </section>

      {/* What's Included Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              What's{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                included
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-xl p-8 border border-white/5"
          >
            <div className="space-y-4">
              {[
                { feature: 'Conversion-focused website', base: true, growth: true, scale: true },
                { feature: 'Mobile-first design', base: true, growth: true, scale: true },
                { feature: 'Analytics + tracking setup', base: true, growth: true, scale: true },
                { feature: 'Google Business Profile optimization', base: false, growth: true, scale: true },
                { feature: 'Review screener funnel', base: false, growth: true, scale: true },
                { feature: 'Lead capture bot', base: false, growth: 'Optional', scale: true },
                { feature: 'Multi-page site', base: false, growth: false, scale: true },
                { feature: 'Custom design & branding', base: false, growth: false, scale: true },
                { feature: 'Advanced analytics dashboards', base: false, growth: false, scale: true },
                { feature: 'Ongoing optimization', base: false, growth: 'Monthly', scale: 'Ongoing' },
              ].map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 py-3 border-b border-zinc-800 last:border-0"
                >
                  <div className="col-span-1 text-zinc-300">{row.feature}</div>
                  <div className="text-center">
                    {row.base === true ? (
                      <Check className="w-5 h-5 text-cyan-400 mx-auto" />
                    ) : typeof row.base === 'string' ? (
                      <span className="text-sm text-zinc-500">{row.base}</span>
                    ) : (
                      <span className="text-zinc-700">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    {row.growth === true ? (
                      <Check className="w-5 h-5 text-cyan-400 mx-auto" />
                    ) : typeof row.growth === 'string' ? (
                      <span className="text-sm text-zinc-500">{row.growth}</span>
                    ) : (
                      <span className="text-zinc-700">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    {row.scale === true ? (
                      <Check className="w-5 h-5 text-cyan-400 mx-auto" />
                    ) : typeof row.scale === 'string' ? (
                      <span className="text-sm text-zinc-500">{row.scale}</span>
                    ) : (
                      <span className="text-zinc-700">—</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-4 pt-4 text-sm text-zinc-500">
                <div></div>
                <div className="text-center">$999.95</div>
                <div className="text-center">$2.5k–$10k</div>
                <div className="text-center">$10k+</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-zinc-950/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Expand Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                Growth Stack
              </span>
            </h2>
            <p className="text-xl text-zinc-400">
              Add any service to accelerate your results—mix and match to build the perfect system for your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={service.path}
                    className="group block h-full glass-panel rounded-xl p-6 border border-white/5 hover:border-cyan-400/30 transition-all hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-400/20">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      {service.badge && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          service.badge === 'Popular'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                            : service.badge === 'Recommended'
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-400/30'
                            : service.badge === 'AI-Powered'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                        }`}>
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="space-y-1 text-sm">
                      {service.setup && (
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Setup</span>
                          <span className="text-zinc-300 font-medium">{service.setup}</span>
                        </div>
                      )}
                      {service.monthly && (
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Monthly</span>
                          <span className="text-zinc-300 font-medium">{service.monthly}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2 text-sm text-cyan-400 group-hover:gap-3 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-zinc-500 mt-12"
          >
            All services include setup, training, and ongoing support. Bundle multiple services for custom pricing.
          </motion.p>
        </div>
      </section>

      {/* FAQs */}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-panel border border-white/5 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to get{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                started
              </span>
              ?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Buy the $999.95 website build today, or book a call to discuss a full growth system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/checkout"
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