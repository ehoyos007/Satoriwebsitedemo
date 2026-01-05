import { useState } from 'react';
import { services, getTotalSetup, getTotalMonthly, getYear1LTV, getYear2LTV } from './data/services';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Service, TabId, ServiceNote } from './types';

const NOTES_KEY = 'satori-services-notes';
const FAVORITES_KEY = 'satori-services-favorites';

export default function App() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBadge, setFilterBadge] = useState<string | null>(null);
  const [notes, setNotes] = useLocalStorage<Record<string, string>>(NOTES_KEY, {});
  const [favorites, setFavorites] = useLocalStorage<string[]>(FAVORITES_KEY, []);
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const currentService = services[activeServiceIndex];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBadge = !filterBadge || service.badge === filterBadge;
    return matchesSearch && matchesBadge;
  });

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'tools', label: 'Tools & Platforms', icon: '🛠️' },
    { id: 'stripe', label: 'Stripe Config', icon: '💳' },
    { id: 'website', label: 'Website Updates', icon: '🌐' },
    { id: 'notes', label: 'Notes', icon: '📝' }
  ];

  const badges = ['Popular', 'Recommended', 'AI-Powered', 'Enterprise'];

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const updateNote = (serviceId: string, content: string) => {
    setNotes(prev => ({ ...prev, [serviceId]: content }));
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateBundle = () => {
    const selected = services.filter(s => selectedServices.includes(s.id));
    const setup = selected.reduce((sum, s) => sum + s.pricing.setup, 0);
    const monthly = selected.reduce((sum, s) => sum + s.pricing.monthly, 0);
    return { setup, monthly, year1: setup + monthly * 12, year2: setup + monthly * 24 };
  };

  const getBadgeClasses = (color: string | null) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'violet': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'cyan': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'amber': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getToolStatusClasses = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400';
      case 'selected': return 'bg-cyan-500/20 text-cyan-400';
      case 'evaluating': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Satori Studios <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Services Guide</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">Comprehensive documentation for all add-on services</p>
            </div>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                showCalculator
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🧮</span> Pricing Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Panel */}
      {showCalculator && (
        <div className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h3 className="text-lg font-semibold mb-4">Bundle Calculator</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-6">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => toggleServiceSelection(service.id)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedServices.includes(service.id)
                      ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 border border-cyan-400/50'
                      : 'bg-slate-900/50 border border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{service.icon}</div>
                  <div className="text-xs text-slate-300 truncate">{service.shortName}</div>
                </button>
              ))}
            </div>
            {selectedServices.length > 0 && (
              <div className="grid grid-cols-4 gap-4 p-4 bg-slate-900/50 rounded-xl">
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">Setup Total</div>
                  <div className="text-xl font-bold text-white">${calculateBundle().setup.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">Monthly Total</div>
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">${calculateBundle().monthly.toLocaleString()}/mo</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">Year 1 LTV</div>
                  <div className="text-xl font-bold text-emerald-400">${calculateBundle().year1.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">Year 2 LTV</div>
                  <div className="text-xl font-bold text-emerald-400">${calculateBundle().year2.toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sticky top-24">
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                />
              </div>

              {/* Badge Filter */}
              <div className="flex flex-wrap gap-1 mb-4">
                <button
                  onClick={() => setFilterBadge(null)}
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    !filterBadge ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  All
                </button>
                {badges.map(badge => (
                  <button
                    key={badge}
                    onClick={() => setFilterBadge(filterBadge === badge ? null : badge)}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      filterBadge === badge ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>

              {/* Services List */}
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Services ({filteredServices.length})</h2>
              <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                {filteredServices.map((service, idx) => {
                  const actualIndex = services.findIndex(s => s.id === service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => {
                        setActiveServiceIndex(actualIndex);
                        setActiveTab('overview');
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                        activeServiceIndex === actualIndex
                          ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                          : 'hover:bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      <span className="text-lg">{service.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate flex items-center gap-2">
                          {service.shortName}
                          {favorites.includes(service.id) && <span className="text-amber-400">★</span>}
                        </div>
                        <div className="text-xs text-slate-500">{service.proposedPrice}</div>
                      </div>
                      {service.badge && (
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${getBadgeClasses(service.badgeColor)}`}>
                          {service.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Service Header */}
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{currentService.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      {currentService.name}
                      <button
                        onClick={() => toggleFavorite(currentService.id)}
                        className={`text-xl transition-colors ${favorites.includes(currentService.id) ? 'text-amber-400' : 'text-slate-600 hover:text-amber-400'}`}
                      >
                        {favorites.includes(currentService.id) ? '★' : '☆'}
                      </button>
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-slate-400 line-through">{currentService.currentPrice}</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                        {currentService.proposedPrice}
                      </span>
                    </div>
                  </div>
                </div>
                {currentService.badge && (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentService.badgeColor === 'emerald' ? 'bg-emerald-500 text-white' :
                    currentService.badgeColor === 'violet' ? 'bg-violet-500 text-white' :
                    currentService.badgeColor === 'cyan' ? 'bg-cyan-500 text-white' :
                    'bg-amber-500 text-white'
                  }`}>
                    {currentService.badge}
                  </span>
                )}
              </div>

              {/* Pricing Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/50">
                <div>
                  <div className="text-slate-400 text-xs uppercase">Model</div>
                  <div className="text-white font-semibold">{currentService.pricing.model}</div>
                </div>
                {currentService.pricing.setup > 0 && (
                  <div>
                    <div className="text-slate-400 text-xs uppercase">Setup Fee</div>
                    <div className="text-white font-semibold">${currentService.pricing.setup.toLocaleString()}</div>
                  </div>
                )}
                {currentService.pricing.monthly > 0 && (
                  <div>
                    <div className="text-slate-400 text-xs uppercase">Monthly</div>
                    <div className="text-white font-semibold">${currentService.pricing.monthly}/mo</div>
                  </div>
                )}
                <div>
                  <div className="text-slate-400 text-xs uppercase">Est. Margin</div>
                  <div className="text-emerald-400 font-semibold">
                    {currentService.margins.setup || currentService.margins.monthly || currentService.margins.project}
                  </div>
                </div>
              </div>
              {currentService.pricing.minimumCommitment && (
                <div className="mt-3 text-sm text-amber-400">
                  ⚠️ Minimum commitment: {currentService.pricing.minimumCommitment}
                </div>
              )}
            </div>

            {/* Content Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                      : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  {tab.id === 'notes' && notes[currentService.id] && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">What Is It?</h3>
                    <p className="text-slate-300 leading-relaxed">{currentService.overview.what}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-violet-400 mb-3">Why It Matters</h3>
                    <p className="text-slate-300 leading-relaxed">{currentService.overview.whyItMatters}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-400 mb-3">What the Client Can Expect</h3>
                    <ul className="space-y-2">
                      {currentService.overview.clientExpects.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tools Tab */}
              {activeTab === 'tools' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-slate-400">Tools used to deliver this service. Costs factor into margin calculations.</p>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Active</span>
                      <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">Selected</span>
                      <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400">Evaluating</span>
                    </div>
                  </div>
                  {currentService.tools.map((tool, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            {tool.name}
                            <span className={`text-xs px-2 py-0.5 rounded ${getToolStatusClasses(tool.status)}`}>
                              {tool.status || 'Unknown'}
                            </span>
                          </h4>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs font-medium">
                            {tool.role}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-xs uppercase">Cost</div>
                          <div className="text-amber-400 font-semibold">{tool.cost}</div>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">{tool.description}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-violet-400 font-medium">Why it matters:</span>
                        <span className="text-slate-400">{tool.importance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stripe Tab */}
              {activeTab === 'stripe' && (
                <div className="space-y-6">
                  <p className="text-slate-400 mb-6">Configuration details for setting up this service in Stripe.</p>
                  {currentService.stripe.products.map((product, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-5 py-3 border-b border-slate-700/50">
                        <h4 className="font-semibold text-white">{product.name}</h4>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-slate-400 text-xs uppercase mb-1">Product ID</div>
                            <code className="text-cyan-400 bg-slate-900 px-2 py-1 rounded text-sm">{product.productId}</code>
                          </div>
                          <div>
                            <div className="text-slate-400 text-xs uppercase mb-1">Pricing Model</div>
                            <div className="text-white font-medium">{product.priceModel}</div>
                          </div>
                        </div>
                        {product.billingInterval && (
                          <div>
                            <div className="text-slate-400 text-xs uppercase mb-1">Billing Interval</div>
                            <div className="text-white">{product.billingInterval}</div>
                          </div>
                        )}
                        {product.paymentOptions && (
                          <div>
                            <div className="text-slate-400 text-xs uppercase mb-1">Payment Options</div>
                            <div className="text-white">{product.paymentOptions}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-slate-400 text-xs uppercase mb-1">Metadata</div>
                          <code className="text-violet-400 bg-slate-900 px-2 py-1 rounded text-sm block">{product.metadata}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Website Tab */}
              {activeTab === 'website' && (
                <div className="space-y-6">
                  <p className="text-slate-400 mb-6">Updates needed for the Satori website.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                      <div className="text-slate-400 text-xs uppercase mb-2">Display Price</div>
                      <div className="text-xl font-bold text-white">{currentService.website.displayPrice}</div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                      <div className="text-slate-400 text-xs uppercase mb-2">Badge</div>
                      <div className="text-xl font-bold text-white">{currentService.website.badge || 'None'}</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                    <div className="text-slate-400 text-xs uppercase mb-2">Tagline</div>
                    <div className="text-lg text-cyan-400 font-medium">"{currentService.website.tagline}"</div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                    <div className="text-slate-400 text-xs uppercase mb-2">Description Copy</div>
                    <div className="text-slate-300 leading-relaxed">{currentService.website.description}</div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/20 rounded-xl p-5">
                    <h4 className="font-semibold text-white mb-3">Files to Update</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <code className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded">AddServicesView.tsx</code>
                        <span>— Update price and description</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <code className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded">ServiceDetailView.tsx</code>
                        <span>— Add setup + monthly breakdown</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <code className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded">PricingPage.tsx</code>
                        <span>— Update tier comparison</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <p className="text-slate-400">Personal notes for this service. Saved automatically to your browser.</p>
                  <textarea
                    value={notes[currentService.id] || ''}
                    onChange={(e) => updateNote(currentService.id, e.target.value)}
                    placeholder="Add your notes here... (e.g., client-specific considerations, implementation details, questions to follow up on)"
                    className="w-full h-64 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Auto-saved to localStorage
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="border-t border-slate-700/50 bg-slate-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-slate-400 text-sm">Total One-Time (All Services)</div>
              <div className="text-2xl font-bold text-white">${getTotalSetup().toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Monthly Recurring (All Services)</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">${getTotalMonthly().toLocaleString()}/mo</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Year 1 LTV (Full Stack)</div>
              <div className="text-2xl font-bold text-emerald-400">${getYear1LTV().toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Year 2 LTV (Full Stack)</div>
              <div className="text-2xl font-bold text-emerald-400">${getYear2LTV().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
