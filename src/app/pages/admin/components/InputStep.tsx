import { FileText, Plus, X, Globe, Building2, MapPin, Briefcase, Clock, MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';
import type { WizardState, ClientInput } from '../CaseStudyWizard';

// Available services from Satori
const SATORI_SERVICES = [
  'Website Build',
  'GBP Optimization',
  'Review Screener',
  'AI Chat Bot',
  'Local SEO',
  'Google Ads',
  'Analytics Dashboards',
  'Branding',
  'Graphic Design',
  'Custom CRM',
  'Email Automation',
  'Booking System',
  'Online Ordering',
  'Conversion Optimization',
  'Paid Social',
  'LinkedIn Ads',
  'Lead Nurture',
];

// Industries from existing case studies + common ones
const INDUSTRIES = [
  'Real Estate',
  'Health & Fitness',
  'Restaurant',
  'E-commerce',
  'B2B Services',
  'Home Services',
  'Healthcare',
  'Professional Services',
  'Retail',
  'Automotive',
  'Construction',
  'Legal',
  'Finance',
  'Education',
  'Other',
];

interface InputStepProps {
  state: WizardState;
  dispatch: React.Dispatch<any>;
}

export function InputStep({ state, dispatch }: InputStepProps) {
  const { inputData } = state;

  const handleInputChange = (field: keyof ClientInput, value: unknown) => {
    dispatch({ type: 'SET_INPUT', field, value });
  };

  const toggleService = (service: string) => {
    const current = inputData.services;
    if (current.includes(service)) {
      handleInputChange('services', current.filter((s) => s !== service));
    } else {
      handleInputChange('services', [...current, service]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2 flex items-center gap-3">
          <FileText className="w-7 h-7 text-cyan-400" />
          Client Information
        </h2>
        <p className="text-zinc-400">
          Provide basic details about the client and project. AI will generate the case study content.
        </p>
      </div>

      <div className="space-y-6">
        {/* Client URL */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Client Website URL *
          </label>
          <input
            type="url"
            required
            value={inputData.clientUrl}
            onChange={(e) => handleInputChange('clientUrl', e.target.value)}
            className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            placeholder="https://example.com"
          />
          <p className="text-xs text-zinc-500 mt-1">
            AI will analyze this website to generate case study content
          </p>
        </div>

        {/* Client Name & Location */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Client Name *
            </label>
            <input
              type="text"
              required
              value={inputData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Acme Plumbing"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <input
              type="text"
              required
              value={inputData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Austin, TX"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Industry *
            </label>
            <select
              required
              value={inputData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            >
              <option value="">Select industry...</option>
              {INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          {inputData.industry === 'Other' && (
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Custom Industry *</label>
              <input
                type="text"
                required
                value={inputData.customIndustry}
                onChange={(e) => handleInputChange('customIndustry', e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Enter industry"
              />
            </div>
          )}
          <div className={inputData.industry === 'Other' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Project Duration
            </label>
            <input
              type="text"
              value={inputData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              placeholder="e.g., 12 weeks, 3 months"
            />
          </div>
        </div>

        {/* Services Provided */}
        <div>
          <label className="block text-sm text-zinc-400 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Services Provided *
          </label>
          <div className="flex flex-wrap gap-2">
            {SATORI_SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  inputData.services.includes(service)
                    ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-400'
                    : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:border-cyan-400/30'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
          {inputData.services.length > 0 && (
            <p className="text-xs text-cyan-400 mt-2">
              Selected: {inputData.services.join(', ')}
            </p>
          )}
        </div>

        {/* Additional Context */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Additional Context
          </label>
          <textarea
            value={inputData.context}
            onChange={(e) => handleInputChange('context', e.target.value)}
            className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            rows={3}
            placeholder="Any special circumstances, notable achievements, or specific details AI should know about..."
          />
        </div>

        {/* Before/After Metrics */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before Metrics */}
          <div>
            <label className="block text-sm text-zinc-400 mb-3 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Before Metrics (optional)
            </label>
            <div className="space-y-2">
              {inputData.beforeMetrics.map((metric, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_BEFORE_METRIC',
                        index,
                        field: 'label',
                        value: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm"
                    placeholder="Metric (e.g., Leads/mo)"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_BEFORE_METRIC',
                        index,
                        field: 'value',
                        value: e.target.value,
                      })
                    }
                    className="w-24 px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm"
                    placeholder="Value"
                  />
                  {inputData.beforeMetrics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'REMOVE_BEFORE_METRIC', index })}
                      className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_BEFORE_METRIC' })}
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add metric
              </button>
            </div>
          </div>

          {/* After Metrics */}
          <div>
            <label className="block text-sm text-zinc-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              After Metrics (optional)
            </label>
            <div className="space-y-2">
              {inputData.afterMetrics.map((metric, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_AFTER_METRIC',
                        index,
                        field: 'label',
                        value: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm"
                    placeholder="Metric (e.g., Leads/mo)"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_AFTER_METRIC',
                        index,
                        field: 'value',
                        value: e.target.value,
                      })
                    }
                    className="w-24 px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm"
                    placeholder="Value"
                  />
                  {inputData.afterMetrics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'REMOVE_AFTER_METRIC', index })}
                      className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_AFTER_METRIC' })}
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add metric
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="glass-panel p-4 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
          <p className="text-sm text-zinc-400">
            <span className="text-cyan-400 font-medium">Tip:</span> Providing before/after metrics helps AI generate more accurate KPIs and results narrative. If you don't have exact numbers, AI will generate realistic estimates based on industry benchmarks.
          </p>
        </div>
      </div>
    </div>
  );
}
