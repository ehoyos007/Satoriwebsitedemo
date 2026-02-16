import { motion } from 'motion/react';
import {
  Search,
  Filter,
  MapPin,
  Star,
  MessageSquare,
  Target,
  TrendingUp,
  BarChart3,
  Palette,
  FileText,
  Zap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  startingPrice: string;
  category: 'core' | 'growth';
  popular?: boolean;
  recommended?: boolean;
  icon: any;
}

interface AddServicesViewProps {
  onSelectService: (serviceId: string) => void;
  purchasedServiceIds?: string[];
}

export function AddServicesView({ onSelectService, purchasedServiceIds = [] }: AddServicesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGoal, setFilterGoal] = useState<'all' | 'calls' | 'reviews' | 'visibility' | 'automation'>('all');

  const services: Service[] = [
    {
      id: 'gbp',
      name: 'Google Business Profile Optimization',
      tagline: 'Drive 200-300% more map views and direction requests',
      bestFor: 'Local visibility & foot traffic',
      startingPrice: '$1,495',
      category: 'core',
      popular: true,
      icon: MapPin,
    },
    {
      id: 'reviews',
      name: 'Review Screener',
      tagline: 'Generate 400-600% more 5-star reviews with smart routing',
      bestFor: 'Reputation & trust building',
      startingPrice: '$1,200',
      category: 'core',
      recommended: true,
      icon: Star,
    },
    {
      id: 'chatbot',
      name: 'AI Chat Bot',
      tagline: 'Capture leads 24/7 and answer common questions instantly',
      bestFor: 'Lead capture & customer service',
      startingPrice: '$1,800',
      category: 'core',
      icon: MessageSquare,
    },
    {
      id: 'local-seo',
      name: 'Local SEO + On-Page SEO',
      tagline: 'Rank higher in local search and drive organic traffic',
      bestFor: 'Search visibility & traffic',
      startingPrice: '$2,500',
      category: 'growth',
      popular: true,
      icon: Target,
    },
    {
      id: 'google-ads',
      name: 'Google Ads / Search Marketing',
      tagline: 'Immediate visibility and qualified lead flow',
      bestFor: 'Paid traffic & quick results',
      startingPrice: '$3,000',
      category: 'growth',
      icon: TrendingUp,
    },
    {
      id: 'analytics',
      name: 'Analytics + Reporting Dashboards',
      tagline: 'Track every metric and optimize based on real data',
      bestFor: 'Performance tracking & optimization',
      startingPrice: '$1,500',
      category: 'growth',
      recommended: true,
      icon: BarChart3,
    },
    {
      id: 'branding',
      name: 'Branding / Identity Design',
      tagline: 'Professional brand identity that builds trust and recognition',
      bestFor: 'Brand consistency & credibility',
      startingPrice: '$2,500',
      category: 'growth',
      icon: Palette,
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design + Print Assets',
      tagline: 'Marketing materials that convert: flyers, cards, signage',
      bestFor: 'Offline marketing & brand presence',
      startingPrice: '$800',
      category: 'growth',
      icon: FileText,
    },
    {
      id: 'crm',
      name: 'Custom CRM + Automations',
      tagline: 'Automate follow-ups, track leads, and close more deals',
      bestFor: 'Sales efficiency & automation',
      startingPrice: '$5,000',
      category: 'growth',
      icon: Zap,
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterGoal === 'all') return true;
    
    // Simple goal-based filtering
    if (filterGoal === 'calls') return ['gbp', 'google-ads', 'local-seo'].includes(service.id);
    if (filterGoal === 'reviews') return ['reviews', 'gbp'].includes(service.id);
    if (filterGoal === 'visibility') return ['gbp', 'local-seo', 'google-ads'].includes(service.id);
    if (filterGoal === 'automation') return ['chatbot', 'crm'].includes(service.id);
    
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Add Services
          </span>
        </h1>
        <p className="text-zinc-400">
          Optional add-ons to accelerate your results. Most clients add 2-3 services within 90 days.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        {/* Goal Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <select
            value={filterGoal}
            onChange={(e) => setFilterGoal(e.target.value as any)}
            className="pl-11 pr-8 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 appearance-none cursor-pointer"
          >
            <option value="all">All Services</option>
            <option value="calls">More Calls</option>
            <option value="reviews">More Reviews</option>
            <option value="visibility">More Visibility</option>
            <option value="automation">Automation</option>
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterGoal('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filterGoal === 'all'
              ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
              : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          All Services
        </button>
        <button
          onClick={() => setFilterGoal('calls')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filterGoal === 'calls'
              ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
              : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          Generate Calls
        </button>
        <button
          onClick={() => setFilterGoal('reviews')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filterGoal === 'reviews'
              ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
              : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          Build Reviews
        </button>
        <button
          onClick={() => setFilterGoal('visibility')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filterGoal === 'visibility'
              ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
              : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          Increase Visibility
        </button>
        <button
          onClick={() => setFilterGoal('automation')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filterGoal === 'automation'
              ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
              : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          Save Time
        </button>
      </div>

      {/* Category: Core Add-ons */}
      <div>
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          Core Add-ons
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices
            .filter((s) => s.category === 'core')
            .map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectService(service.id)}
                className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 cursor-pointer transition-all relative"
              >
                {/* Badge */}
                {purchasedServiceIds.includes(service.id) ? (
                  <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs">
                    Active
                  </div>
                ) : (service.popular || service.recommended) && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs">
                    {service.popular ? 'Popular' : 'Recommended'}
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30 mb-4">
                  <service.icon className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Content */}
                <h3 className="text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-3">{service.tagline}</p>

                {/* Best For */}
                <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-400 text-xs mb-4">
                  {service.bestFor}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-zinc-500">Starting at</span>
                  <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                    {service.startingPrice}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Category: Growth Services */}
      <div>
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-violet-400" />
          Growth Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices
            .filter((s) => s.category === 'growth')
            .map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectService(service.id)}
                className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-violet-400/30 cursor-pointer transition-all relative"
              >
                {/* Badge */}
                {purchasedServiceIds.includes(service.id) ? (
                  <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs">
                    Active
                  </div>
                ) : (service.popular || service.recommended) && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs">
                    {service.popular ? 'Popular' : 'Recommended'}
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center border border-violet-400/30 mb-4">
                  <service.icon className="w-6 h-6 text-violet-400" />
                </div>

                {/* Content */}
                <h3 className="text-lg mb-2 group-hover:text-violet-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-3">{service.tagline}</p>

                {/* Best For */}
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs mb-4">
                  {service.bestFor}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-zinc-500">Starting at</span>
                  <span className="bg-gradient-to-r from-violet-400 to-emerald-400 text-transparent bg-clip-text">
                    {service.startingPrice}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-violet-400" />
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-2xl border border-white/10">
          <p className="text-zinc-400 mb-2">No services found</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterGoal('all');
            }}
            className="text-cyan-400 hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
        <h3 className="mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          Not sure what you need?
        </h3>
        <p className="text-sm text-zinc-400 mb-4">
          Book a quick 15-minute call and we'll help you choose the right services for your goals.
        </p>
        <button className="px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm">
          Schedule Strategy Call
        </button>
      </div>
    </div>
  );
}
