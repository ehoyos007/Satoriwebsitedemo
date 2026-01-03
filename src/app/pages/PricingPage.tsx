import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
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
      ctaLink: '#contact',
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
      ctaLink: '#contact',
      highlighted: false,
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

      {/* Pricing Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
                    <a
                      href={tier.ctaLink}
                      className="block w-full py-4 text-center rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                      {tier.cta}
                    </a>
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
                to="/pricing"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Buy Website — $999.95</span>
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
    </div>
  );
}