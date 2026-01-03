import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import type { CaseStudy } from '../data/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  index: number;
}

export function CaseStudyCard({ caseStudy, onClick, index }: CaseStudyCardProps) {
  // Show top 4 KPIs on card
  const visibleKPIs = caseStudy.kpis.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl glass-panel border border-white/5 overflow-hidden hover:border-cyan-400/30 transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Featured badge */}
      {caseStudy.featured && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs backdrop-blur-sm">
          Featured
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Website Preview Image */}
      <div className="relative h-56 overflow-hidden bg-zinc-900/50">
        <img
          src={caseStudy.websitePreviewImages.thumbnail}
          alt={`${caseStudy.clientName} website`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Client Info */}
        <div>
          <h3 className="text-2xl mb-2 group-hover:text-cyan-400 transition-colors">
            {caseStudy.clientName}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
            <span>{caseStudy.industry}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{caseStudy.location}</span>
          </div>
        </div>

        {/* Services Tags */}
        <div className="flex flex-wrap gap-2">
          {caseStudy.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="px-3 py-1 rounded-full bg-zinc-900/80 border border-white/5 text-xs text-zinc-300"
            >
              {service}
            </span>
          ))}
          {caseStudy.services.length > 3 && (
            <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-white/5 text-xs text-zinc-400">
              +{caseStudy.services.length - 3} more
            </span>
          )}
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {visibleKPIs.map((kpi) => (
            <div
              key={kpi.label}
              className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 group-hover:border-white/10 transition-colors"
            >
              <div className="text-xs text-zinc-500 mb-1">{kpi.label}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">{kpi.value}</span>
                {kpi.delta && (
                  <div className="flex items-center gap-1 text-xs">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : kpi.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3 text-red-400" />
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

        {/* Summary Headline */}
        <p className="text-sm text-zinc-400 line-clamp-2 pt-2">{caseStudy.summaryHeadline}</p>

        {/* View CTA */}
        <div className="flex items-center gap-2 text-cyan-400 pt-2">
          <span className="text-sm">View Case Study</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
