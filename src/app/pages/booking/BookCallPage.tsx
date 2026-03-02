import { motion, AnimatePresence } from 'motion/react';
import { track } from '@vercel/analytics';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Target,
  Mail,
  Phone,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';
import { SEO } from '../../components/SEO';

const STORAGE_KEY = 'satori_booking_form';

interface BookingFormData {
  businessName: string;
  industry: string;
  websiteStatus: string;
  goal: string;
  timeline: string;
  budget: string;
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const defaultForm: BookingFormData = {
  businessName: '',
  industry: '',
  websiteStatus: '',
  goal: '',
  timeline: '',
  budget: '',
  notes: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

function loadSavedForm(): BookingFormData {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultForm, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return defaultForm;
}

export function BookCallPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<BookingFormData>(loadSavedForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const totalSteps = 3;

  const update = (field: keyof BookingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const errs: Partial<Record<keyof BookingFormData, string>> = {};
    if (currentStep === 1) {
      if (!form.businessName.trim()) errs.businessName = 'Required';
      if (!form.industry) errs.industry = 'Required';
      if (!form.websiteStatus) errs.websiteStatus = 'Required';
    } else if (currentStep === 2) {
      if (!form.goal) errs.goal = 'Required';
      if (!form.timeline) errs.timeline = 'Required';
      if (!form.budget) errs.budget = 'Required';
    } else if (currentStep === 3) {
      if (!form.firstName.trim()) errs.firstName = 'Required';
      if (!form.lastName.trim()) errs.lastName = 'Required';
      if (!form.email.trim()) errs.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
      if (!form.phone.trim()) errs.phone = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    track('booking_step_completed', { step: currentStep, totalSteps });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      track('booking_form_submitted', { industry: form.industry, goal: form.goal, budget: form.budget });
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      navigate('/booking/schedule');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const inputClass = (field: keyof BookingFormData) =>
    `w-full px-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20'
        : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
    }`;

  const radioClass = (field: keyof BookingFormData, value: string, accent = 'cyan') =>
    `flex items-center gap-3 p-4 bg-zinc-900/50 border rounded-lg cursor-pointer transition-colors ${
      form[field] === value
        ? `border-${accent}-400/50 bg-${accent}-500/10`
        : errors[field]
        ? 'border-red-400/30'
        : 'border-white/10 hover:border-cyan-400/30'
    }`;

  return (
    <div className="min-h-screen pt-16">
      <SEO
        title="Book a Call"
        path="/book-call"
        description="Schedule a free strategy call with Satori Studios. We'll discuss your business goals and how to grow your leads and revenue."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">
            Book Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Strategy Call
            </span>
          </h1>
          <p className="text-zinc-400">
            Answer a few quick questions so we can make the most of your 15-minute call
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-500">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-cyan-400">
              {currentStep === 1
                ? 'Business Info'
                : currentStep === 2
                ? 'Project Details'
                : 'Contact Info'}
            </span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 rounded-2xl border border-white/10"
          >
            {/* Step 1: Business Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2 flex items-center gap-3">
                    <Building2 className="w-7 h-7 text-cyan-400" />
                    Tell Us About Your Business
                  </h2>
                  <p className="text-zinc-400">Basic information to get started</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Business Name *</label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={(e) => update('businessName', e.target.value)}
                      className={inputClass('businessName')}
                      placeholder="Your Business Name"
                    />
                    {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Industry / Category *</label>
                    <select
                      value={form.industry}
                      onChange={(e) => update('industry', e.target.value)}
                      className={inputClass('industry')}
                    >
                      <option value="">Select your industry...</option>
                      <option value="home-services">Home Services (Plumbing, HVAC, Electrical, etc.)</option>
                      <option value="healthcare">Healthcare & Medical</option>
                      <option value="professional">Professional Services (Law, Accounting, etc.)</option>
                      <option value="retail">Retail & E-commerce</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="fitness">Fitness & Wellness</option>
                      <option value="automotive">Automotive</option>
                      <option value="hospitality">Hospitality & Food Service</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Current Website Status *
                    </label>
                    {errors.websiteStatus && <p className="text-red-400 text-xs mb-2">{errors.websiteStatus}</p>}
                    <div className="space-y-2">
                      {[
                        { value: 'none', label: 'No website (starting from scratch)' },
                        { value: 'redesign', label: 'Have a site, need redesign' },
                        { value: 'landing', label: 'Need a landing page' },
                        { value: 'update', label: 'Need updates/improvements' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={radioClass('websiteStatus', option.value)}
                          onClick={() => update('websiteStatus', option.value)}
                        >
                          <input
                            type="radio"
                            name="website-status"
                            value={option.value}
                            checked={form.websiteStatus === option.value}
                            onChange={() => update('websiteStatus', option.value)}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2 flex items-center gap-3">
                    <Target className="w-7 h-7 text-violet-400" />
                    Project Goals & Budget
                  </h2>
                  <p className="text-zinc-400">Help us understand what you need</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Primary Goal *</label>
                    {errors.goal && <p className="text-red-400 text-xs mb-2">{errors.goal}</p>}
                    <div className="space-y-2">
                      {[
                        { value: 'calls', label: 'Generate more phone calls' },
                        { value: 'bookings', label: 'Drive appointment bookings' },
                        { value: 'leads', label: 'Capture form leads/quotes' },
                        { value: 'reviews', label: 'Increase Google reviews' },
                        { value: 'traffic', label: 'Improve local search visibility' },
                        { value: 'other', label: 'Other (tell us on the call)' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={radioClass('goal', option.value, 'violet')}
                          onClick={() => update('goal', option.value)}
                        >
                          <input
                            type="radio"
                            name="goal"
                            value={option.value}
                            checked={form.goal === option.value}
                            onChange={() => update('goal', option.value)}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Desired Timeline *</label>
                    <select
                      value={form.timeline}
                      onChange={(e) => update('timeline', e.target.value)}
                      className={inputClass('timeline')}
                    >
                      <option value="">Select timeline...</option>
                      <option value="asap">ASAP (rush available)</option>
                      <option value="1-2weeks">1-2 weeks</option>
                      <option value="2-4weeks">2-4 weeks</option>
                      <option value="1-2months">1-2 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Budget Range *</label>
                    {errors.budget && <p className="text-red-400 text-xs mb-2">{errors.budget}</p>}
                    <div className="space-y-2">
                      {[
                        {
                          value: '999',
                          label: '$999.95 — Website Build',
                          desc: 'Single conversion-focused page',
                        },
                        {
                          value: '2500-10k',
                          label: '$2,500 - $10,000 — Growth System',
                          desc: 'Website + GBP + Reviews + Analytics',
                        },
                        {
                          value: '10k+',
                          label: '$10,000+ — Custom Build',
                          desc: 'Multi-page site + full growth stack',
                        },
                        { value: 'unsure', label: 'Not sure yet', desc: 'Help me decide on the call' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-start gap-3 p-4 bg-zinc-900/50 border rounded-lg cursor-pointer transition-colors ${
                            form.budget === option.value
                              ? 'border-violet-400/50 bg-violet-500/10'
                              : errors.budget
                              ? 'border-red-400/30'
                              : 'border-white/10 hover:border-violet-400/30'
                          }`}
                          onClick={() => update('budget', option.value)}
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={option.value}
                            checked={form.budget === option.value}
                            onChange={() => update('budget', option.value)}
                            className="mt-1"
                          />
                          <div>
                            <div className="mb-1">{option.label}</div>
                            <div className="text-sm text-zinc-500">{option.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Project Notes (optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      rows={4}
                      placeholder="Any specific questions, requirements, or details we should know before the call?"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-2 flex items-center gap-3">
                    <Mail className="w-7 h-7 text-emerald-400" />
                    Contact Information
                  </h2>
                  <p className="text-zinc-400">How should we reach you?</p>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        className={inputClass('firstName')}
                      />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        className={inputClass('lastName')}
                      />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={`pl-11 pr-4 ${inputClass('email').replace('w-full px-4', 'w-full')}`}
                        placeholder="you@company.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={`pl-11 pr-4 ${inputClass('phone').replace('w-full px-4', 'w-full')}`}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="mb-1">What Happens Next</h4>
                        <p className="text-sm text-zinc-400">
                          You'll pick a time on the next page, then get a confirmation email
                          with everything you need to prepare for the call.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              {currentStep === totalSteps ? 'Pick a Time' : 'Next Step'}
              <ArrowRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
