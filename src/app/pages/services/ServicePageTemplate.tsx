import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { ServiceConfig } from '@/app/data/serviceConfigs/types';
import { SEO } from '@/app/components/SEO';

interface ServicePageTemplateProps {
  config: ServiceConfig;
}

export function ServicePageTemplate({ config }: ServicePageTemplateProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const { colors, icon: Icon, hero, featuredCase, logoStrip, whyThisWorks, deliverables, process, outcomes, pricing, faqs, resources, relatedServices, finalCTA } = config;

  return (
    <div className="pt-16">
      <SEO
        title={hero.serviceName}
        path={`/services/${config.slug}`}
        description={hero.description}
      />
      {/* Breadcrumb */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{hero.serviceName}</span>
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
            {hero.badge && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-${colors.primary}-400/20 mb-6`}>
                <Icon className={`w-4 h-4 text-${colors.primary}-400`} />
                <span className={`text-sm text-${colors.primary}-400`}>{hero.badge}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              {hero.headline.split('<gradient>').map((part, i) => {
                if (i === 0) return part;
                const [gradientText, rest] = part.split('</gradient>');
                return (
                  <span key={i}>
                    <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                      {gradientText}
                    </span>
                    {rest}
                  </span>
                );
              })}
            </h1>

            <p className="text-xl text-zinc-400 mb-6 max-w-3xl">
              {hero.description}
            </p>

            {hero.subDescription && (
              <p className="text-lg text-zinc-300 mb-10 max-w-3xl">
                {hero.subDescription}
              </p>
            )}

            {/* Trust Chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {hero.trustChips.map((chip, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass-panel border border-white/10 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-emerald-400" />
                  {chip}
                </span>
              ))}
            </div>

            {/* What You Get */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 mb-10">
              <h3 className={`text-sm uppercase tracking-wider text-${colors.primary}-400 mb-4`}>What You Get</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {hero.whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle className={`w-4 h-4 text-${colors.primary}-400 mt-0.5 flex-shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={hero.ctas.primary.link || '/book-call'}
                className={`group relative px-8 py-4 rounded-lg bg-gradient-to-r from-${colors.primary}-500 to-${colors.secondary}-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-${colors.primary}-500/50`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {hero.ctas.primary.text}
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </Link>
              {hero.ctas.secondary && (
                <Link
                  to={hero.ctas.secondary.link || '/case-studies'}
                  className={`px-8 py-4 rounded-lg border border-zinc-700 hover:border-${colors.primary}-400/50 hover:bg-${colors.primary}-500/5 transition-all text-center`}
                >
                  {hero.ctas.secondary.text}
                </Link>
              )}
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
            <div className={`absolute inset-0 bg-gradient-to-br from-${colors.primary}-500/5 via-${colors.secondary}-500/5 to-transparent`} />

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
                  className={`inline-flex items-center gap-2 text-${colors.primary}-400 hover:text-${colors.primary}-300 transition-colors`}
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <h4 className={`text-sm uppercase tracking-wider text-${colors.primary}-400 mb-6`}>Key Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  {featuredCase.kpis.map((kpi, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 bg-zinc-950/50">
                      <div className={`text-2xl sm:text-3xl mb-1 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
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

      {/* Logo Strip */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-zinc-500 mb-8">{logoStrip.title}</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {logoStrip.logos.map((logo, i) => (
              <div key={i} className="px-6 py-3 glass-panel rounded-lg border border-white/5 text-zinc-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works Sections */}
      {whyThisWorks.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className={`py-20 px-4 sm:px-6 lg:px-8 ${section.background ? 'bg-gradient-to-b from-zinc-950/50 to-transparent' : ''}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${section.reverse ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: section.reverse ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={section.reverse ? 'order-2 lg:order-1' : ''}
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-${colors.primary}-400/20 mb-4`}>
                  {section.badge.icon && <section.badge.icon className={`w-4 h-4 text-${colors.primary}-400`} />}
                  <span className={`text-sm text-${colors.primary}-400`}>{section.badge.text}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl mb-6">
                  {section.headline.split('<gradient>').map((part, i) => {
                    if (i === 0) return part;
                    const [gradientText, rest] = part.split('</gradient>');
                    return (
                      <span key={i}>
                        <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                          {gradientText}
                        </span>
                        {rest}
                      </span>
                    );
                  })}
                </h2>

                <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                  {section.description}
                </p>

                {section.bullets && (
                  <ul className="space-y-3">
                    {section.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <CheckCircle className={`w-5 h-5 text-${colors.primary}-400 mt-0.5 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: section.reverse ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={section.reverse ? 'order-1 lg:order-2' : ''}
              >
                {section.panel && (
                  <div className="glass-panel p-8 rounded-2xl border border-white/10">
                    <h4 className={`text-sm uppercase tracking-wider text-${colors.primary}-400 mb-6`}>{section.panel.title}</h4>
                    <div className="space-y-4">
                      {section.panel.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${colors.primary}-500/20 to-transparent flex items-center justify-center border border-${colors.primary}-400/30 flex-shrink-0`}>
                            {item.icon ? <item.icon className={`w-5 h-5 text-${colors.primary}-400`} /> : <span className={`text-${colors.primary}-400`}>{i + 1}</span>}
                          </div>
                          <div>
                            <div className="font-medium mb-1">{item.label}</div>
                            <div className="text-sm text-zinc-400">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

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
              <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                included
              </span>
            </h2>
            <p className="text-xl text-zinc-400">{deliverables.subtitle}</p>
          </motion.div>

          <div className={`grid ${deliverables.optionalUpgrades ? 'md:grid-cols-2' : ''} gap-6`}>
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              {deliverables.optionalUpgrades && (
                <h3 className="text-xl mb-6 flex items-center gap-3">
                  <Icon className={`w-6 h-6 text-${colors.primary}-400`} />
                  Core Deliverables
                </h3>
              )}
              <ul className={`${deliverables.optionalUpgrades ? 'space-y-2.5' : 'grid md:grid-cols-2 gap-3'}`}>
                {deliverables.core.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-zinc-300">
                    {deliverables.optionalUpgrades ? (
                      <span className={`w-1.5 h-1.5 rounded-full bg-${colors.primary}-400 mt-1.5 flex-shrink-0`} />
                    ) : (
                      <CheckCircle className={`w-5 h-5 text-${colors.primary}-400 mt-0.5 flex-shrink-0`} />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {deliverables.optionalUpgrades && (
              <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <h3 className="text-xl mb-6 flex items-center gap-3">
                  <ArrowRight className="w-6 h-6 text-emerald-400" />
                  Optional Upgrades
                </h3>
                <ul className="space-y-2.5">
                  {deliverables.optionalUpgrades.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                process
              </span>
            </h2>
            <p className="text-xl text-zinc-400">{process.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${colors.primary}-500/20 to-${colors.secondary}-500/20 flex items-center justify-center border border-${colors.primary}-400/30`}>
                    <span className={`text-${colors.primary}-400`}>{i + 1}</span>
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

      {/* Outcomes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              {outcomes.title.split('<gradient>').map((part, i) => {
                if (i === 0) return part;
                const [gradientText, rest] = part.split('</gradient>');
                return (
                  <span key={i}>
                    <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                      {gradientText}
                    </span>
                    {rest}
                  </span>
                );
              })}
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">{outcomes.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {outcomes.metrics.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-xl border border-white/10 text-center"
              >
                <div className={`text-3xl sm:text-4xl mb-2 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                  {outcome.value}
                </div>
                <div className="text-sm mb-2">{outcome.metric}</div>
                <div className="text-xs text-zinc-500">{outcome.baseline}</div>
              </motion.div>
            ))}
          </div>

          {outcomes.disclaimer && (
            <div className="glass-panel p-6 rounded-xl border border-white/10 text-center">
              <p className="text-sm text-zinc-400">{outcomes.disclaimer}</p>
            </div>
          )}
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
            <h2 className="text-3xl sm:text-4xl mb-4">
              Simple,{' '}
              <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                transparent pricing
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.tiers.map((tier, index) => (
              <div
                key={index}
                className={`glass-panel p-8 rounded-2xl ${
                  tier.highlighted
                    ? `border-2 border-${colors.primary}-400/30 relative`
                    : 'border border-white/10'
                } hover:scale-105 transition-all`}
              >
                {tier.highlighted && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-${colors.primary}-500 to-${colors.secondary}-500 text-white text-xs`}>
                    {tier.badge || 'Most Popular'}
                  </div>
                )}
                <h3 className="text-2xl mb-2">{tier.name}</h3>
                <div className={`text-4xl mb-4 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                  {tier.price}
                </div>
                <p className="text-sm text-zinc-400 mb-6">{tier.description}</p>
                <Link
                  to={tier.ctaLink || '/book-call'}
                  className={`block w-full px-6 py-3 rounded-lg ${
                    tier.highlighted
                      ? `bg-gradient-to-r from-${colors.primary}-500 to-${colors.secondary}-500 text-white`
                      : `border border-white/10 hover:border-${colors.primary}-400/30 hover:bg-${colors.primary}-500/5 text-white`
                  } text-center hover:scale-105 transition-all mb-6`}
                >
                  {tier.ctaText || 'Get Started'}
                </Link>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 text-${colors.primary}-400 mt-0.5 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            <h2 className="text-3xl sm:text-4xl mb-4">
              Frequently asked{' '}
              <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className={`w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-${colors.primary}-500/5 transition-colors`}
                >
                  <span className="text-lg">{faq.question}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className={`w-5 h-5 text-${colors.primary}-400 flex-shrink-0 mt-1`} />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Related{' '}
              <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                resources
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <div key={i} className={`glass-panel p-6 rounded-xl border border-white/10 hover:border-${colors.primary}-400/30 transition-all cursor-pointer`}>
                <span className={`inline-block px-3 py-1 rounded-full bg-${colors.primary}-500/10 border border-${colors.primary}-400/20 text-${colors.primary}-400 text-xs mb-4`}>
                  {resource.category}
                </span>
                <h3 className="text-xl mb-3">{resource.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">{resource.description}</p>
                <div className={`flex items-center gap-2 text-${colors.primary}-400 text-sm`}>
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">
              Maximize results with{' '}
              <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                add-on services
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className={`group glass-panel p-6 rounded-xl border border-white/10 hover:border-${colors.primary}-400/30 transition-all`}
              >
                <service.icon className={`w-12 h-12 text-${colors.primary}-400 mb-4`} />
                <h3 className={`text-xl mb-2 group-hover:text-${colors.primary}-400 transition-colors`}>{service.name}</h3>
                <div className={`flex items-center gap-2 text-${colors.primary}-400 text-sm`}>
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
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-${colors.primary}-500/20 rounded-full`}
            style={{
              animation: 'pulse-glow 8s ease-in-out infinite',
            }}
          />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-${colors.secondary}-500/20 rounded-full`}
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
              {finalCTA.headline.split('<gradient>').map((part, i) => {
                if (i === 0) return part;
                const [gradientText, rest] = part.split('</gradient>');
                return (
                  <span key={i}>
                    <span className={`bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 text-transparent bg-clip-text`}>
                      {gradientText}
                    </span>
                    {rest}
                  </span>
                );
              })}
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              {finalCTA.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={finalCTA.primaryCTA.link || '/book-call'}
                className={`group relative px-8 py-4 rounded-lg bg-gradient-to-r from-${colors.primary}-500 to-${colors.secondary}-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-${colors.primary}-500/50`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {finalCTA.primaryCTA.text}
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </Link>
              {finalCTA.secondaryCTA && (
                <Link
                  to={finalCTA.secondaryCTA.link || '/case-studies'}
                  className={`px-8 py-4 rounded-lg border border-zinc-700 hover:border-${colors.primary}-400/50 hover:bg-${colors.primary}-500/5 transition-all`}
                >
                  {finalCTA.secondaryCTA.text}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
