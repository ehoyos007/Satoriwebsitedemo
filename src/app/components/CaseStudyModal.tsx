import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown, Calendar, Wrench, CircleCheck, Quote } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { CaseStudy } from '../data/caseStudies';
import { useEffect } from 'react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl glass-panel border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-4 right-4 float-right z-10 p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 space-y-12">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-4xl">{caseStudy.clientName}</h2>
                    {caseStudy.featured && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-zinc-400">
                    <span>{caseStudy.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span>{caseStudy.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <p className="text-xl text-zinc-300 leading-relaxed">{caseStudy.summaryHeadline}</p>
                </div>

                {/* Website Preview Gallery */}
                <div className="space-y-4">
                  <h3 className="text-2xl">Website Preview</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={caseStudy.websitePreviewImages.desktop}
                        alt={`${caseStudy.clientName} desktop`}
                        className="w-full h-auto"
                      />
                      <div className="p-3 bg-zinc-900/80 text-sm text-zinc-400">Desktop View</div>
                    </div>
                    {caseStudy.websitePreviewImages.mobile && (
                      <div className="rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center bg-zinc-900/30">
                        <img
                          src={caseStudy.websitePreviewImages.mobile}
                          alt={`${caseStudy.clientName} mobile`}
                          className="w-64 h-auto rounded-lg"
                        />
                        <div className="p-3 text-sm text-zinc-400">Mobile View</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* KPIs */}
                <div className="space-y-4">
                  <h3 className="text-2xl flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                    Key Results
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {caseStudy.kpis.map((kpi) => (
                      <div
                        key={kpi.label}
                        className="p-5 rounded-xl glass-panel border border-white/5 hover:border-cyan-400/30 transition-colors"
                      >
                        <div className="text-sm text-zinc-500 mb-2">{kpi.label}</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl text-white">{kpi.value}</span>
                          {kpi.delta && (
                            <div className="flex items-center gap-1">
                              {kpi.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                              ) : kpi.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-red-400" />
                              ) : null}
                              <span
                                className={
                                  kpi.trend === 'up'
                                    ? 'text-emerald-400'
                                    : kpi.trend === 'down'
                                    ? 'text-red-400'
                                    : 'text-zinc-400'
                                }
                              >
                                {kpi.delta}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The Challenge */}
                <div className="space-y-4">
                  <h3 className="text-2xl">The Challenge</h3>
                  <p className="text-zinc-300 leading-relaxed">{caseStudy.challenge}</p>
                </div>

                {/* The Strategy */}
                <div className="space-y-4">
                  <h3 className="text-2xl">The Strategy</h3>
                  <p className="text-zinc-300 leading-relaxed">{caseStudy.strategy}</p>
                </div>

                {/* What We Built */}
                <div className="space-y-4">
                  <h3 className="text-2xl flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-cyan-400" />
                    What We Built
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {caseStudy.buildDeliverables.map((deliverable, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg glass-panel border border-white/5"
                      >
                        <CircleCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results & Charts */}
                <div className="space-y-6">
                  <h3 className="text-2xl">Results Over Time</h3>
                  <p className="text-zinc-300 leading-relaxed">{caseStudy.resultsNarrative}</p>

                  {/* Conversions Chart */}
                  {caseStudy.chartsData.conversions && (
                    <div className="p-6 rounded-xl glass-panel border border-white/5">
                      <h4 className="text-lg mb-4">Conversions Growth</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={caseStudy.chartsData.conversions}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey="name" stroke="#71717a" />
                          <YAxis stroke="#71717a" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#18181b',
                              border: '1px solid #3f3f46',
                              borderRadius: '8px',
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22d3ee"
                            strokeWidth={3}
                            name="Current Period"
                            dot={{ fill: '#22d3ee', r: 4 }}
                          />
                          {caseStudy.chartsData.conversions[0]?.previous !== undefined && (
                            <Line
                              type="monotone"
                              dataKey="previous"
                              stroke="#71717a"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Previous Period"
                              dot={{ fill: '#71717a', r: 3 }}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Traffic Chart */}
                  {caseStudy.chartsData.traffic && (
                    <div className="p-6 rounded-xl glass-panel border border-white/5">
                      <h4 className="text-lg mb-4">Traffic Growth</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={caseStudy.chartsData.traffic}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey="name" stroke="#71717a" />
                          <YAxis stroke="#71717a" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#18181b',
                              border: '1px solid #3f3f46',
                              borderRadius: '8px',
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#a78bfa"
                            strokeWidth={3}
                            name="Current Period"
                            dot={{ fill: '#a78bfa', r: 4 }}
                          />
                          {caseStudy.chartsData.traffic[0]?.previous !== undefined && (
                            <Line
                              type="monotone"
                              dataKey="previous"
                              stroke="#71717a"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Previous Period"
                              dot={{ fill: '#71717a', r: 3 }}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Revenue Chart */}
                  {caseStudy.chartsData.revenue && (
                    <div className="p-6 rounded-xl glass-panel border border-white/5">
                      <h4 className="text-lg mb-4">Revenue Growth (in $k)</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={caseStudy.chartsData.revenue}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey="name" stroke="#71717a" />
                          <YAxis stroke="#71717a" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#18181b',
                              border: '1px solid #3f3f46',
                              borderRadius: '8px',
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#34d399"
                            strokeWidth={3}
                            name="Current Period"
                            dot={{ fill: '#34d399', r: 4 }}
                          />
                          {caseStudy.chartsData.revenue[0]?.previous !== undefined && (
                            <Line
                              type="monotone"
                              dataKey="previous"
                              stroke="#71717a"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Previous Period"
                              dot={{ fill: '#71717a', r: 3 }}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h3 className="text-2xl flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-violet-400" />
                    Project Timeline
                  </h3>
                  <div className="space-y-4">
                    {caseStudy.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-cyan-400 glow-cyan" />
                          {idx < caseStudy.timeline.length - 1 && (
                            <div className="w-px h-full bg-gradient-to-b from-cyan-400/50 to-transparent mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="text-lg text-cyan-400 mb-2">{item.week}</div>
                          <ul className="space-y-2">
                            {item.actions.map((action, actionIdx) => (
                              <li key={actionIdx} className="text-zinc-300 flex items-start gap-2">
                                <span className="text-zinc-600 mt-1">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Stack */}
                <div className="space-y-4">
                  <h3 className="text-2xl">Tools & Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.tools.map((tool) => (
                      <div
                        key={tool}
                        className="px-4 py-2 rounded-lg glass-panel border border-white/5 text-zinc-300"
                      >
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="relative p-8 rounded-xl glass-panel border border-white/5">
                  <Quote className="absolute top-6 left-6 w-12 h-12 text-cyan-400/20" />
                  <div className="relative z-10 space-y-4">
                    <p className="text-xl text-zinc-200 italic leading-relaxed">
                      "{caseStudy.testimonial.text}"
                    </p>
                    <div>
                      <div className="text-white">{caseStudy.testimonial.name}</div>
                      <div className="text-sm text-zinc-400">{caseStudy.testimonial.title}</div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="/#pricing"
                    onClick={onClose}
                    className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
                  >
                    <span className="relative z-10">Buy Website — $999.95</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="/#contact"
                    onClick={onClose}
                    className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}