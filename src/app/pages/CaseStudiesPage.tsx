import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, ListFilter, X } from 'lucide-react';
import { caseStudies, getAllIndustries, getAllServices, type CaseStudy } from '../data/caseStudies';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { CaseStudyModal } from '../components/CaseStudyModal';

export function CaseStudiesPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const industries = getAllIndustries();
  const services = getAllServices();

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        cs.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.summaryHeadline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Industry filter
      const matchesIndustry = selectedIndustry === 'all' || cs.industry === selectedIndustry;

      // Service filter
      const matchesService =
        selectedService === 'all' ||
        cs.services.some((s) => s.toLowerCase().includes(selectedService.toLowerCase()));

      return matchesSearch && matchesIndustry && matchesService;
    });
  }, [searchQuery, selectedIndustry, selectedService]);

  const activeFilterCount =
    (selectedIndustry !== 'all' ? 1 : 0) + (selectedService !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setSelectedIndustry('all');
    setSelectedService('all');
    setSearchQuery('');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl mb-6">
              Case Studies{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 text-transparent bg-clip-text">
                That Prove ROI
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Real businesses. Real results. See how we turn SMB websites into lead-generating assets
              with measurable, data-driven outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search case studies by client, industry, or outcome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl glass-panel border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all bg-zinc-950/50 text-white placeholder-zinc-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-800 rounded transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            )}
          </div>

          {/* Filter Toggle & Active Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters
                  ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-400'
                  : 'border-white/10 glass-panel hover:border-white/20'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Active Filter Tags */}
            {selectedIndustry !== 'all' && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-sm">
                <span>Industry: {selectedIndustry}</span>
                <button onClick={() => setSelectedIndustry('all')} className="hover:text-cyan-300">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {selectedService !== 'all' && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-400/20 text-violet-400 text-sm">
                <span>Service: {selectedService}</span>
                <button onClick={() => setSelectedService('all')} className="hover:text-violet-300">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 rounded-xl glass-panel border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Industry Filter */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Filter by Industry</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedIndustry('all')}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedIndustry === 'all'
                          ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-400'
                          : 'glass-panel border border-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      All Industries
                    </button>
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => setSelectedIndustry(industry)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedIndustry === industry
                            ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-400'
                            : 'glass-panel border border-white/5 text-zinc-400 hover:border-white/10'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Filter */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Filter by Service</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedService('all')}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedService === 'all'
                          ? 'bg-violet-500/20 border border-violet-400/40 text-violet-400'
                          : 'glass-panel border border-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      All Services
                    </button>
                    {services.map((service) => (
                      <button
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedService === service
                            ? 'bg-violet-500/20 border border-violet-400/40 text-violet-400'
                            : 'glass-panel border border-white/5 text-zinc-400 hover:border-white/10'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <p className="text-zinc-400">
          Showing {filteredCaseStudies.length} case{' '}
          {filteredCaseStudies.length === 1 ? 'study' : 'studies'}
        </p>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-zinc-400 mb-4">No case studies match your filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-lg border border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((cs, idx) => (
              <CaseStudyCard
                key={cs.slug}
                caseStudy={cs}
                onClick={() => setSelectedCaseStudy(cs)}
                index={idx}
              />
            ))}
          </div>
        )}
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl mb-6">
              Ready to See{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                Results Like These?
              </span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              We build conversion-focused websites and growth systems for SMBs. Start with a $999.95
              website or scale with a custom growth system.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#pricing"
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Buy Website — $999.95</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="/#contact"
                className="px-8 py-4 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all backdrop-blur-sm"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}