import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Target,
  Palette,
  FileText,
  Users,
  Calendar,
  Upload,
  CheckCircle,
  StickyNote,
} from 'lucide-react';
import { useState } from 'react';

export function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const totalSteps = 6;

  const steps = [
    { number: 1, title: 'Business Information', icon: Building2 },
    { number: 2, title: 'Website Goals', icon: Target },
    { number: 3, title: 'Brand & Style', icon: Palette },
    { number: 4, title: 'Copy & Content', icon: FileText },
    { number: 5, title: 'Competitors', icon: Users },
    { number: 6, title: 'Schedule Kickoff Call', icon: Calendar },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/onboarding/success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">
            Let's Build Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Website
            </span>
          </h1>
          <p className="text-zinc-400">This information helps us create your perfect website</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    step.number === currentStep
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white scale-110'
                      : step.number < currentStep
                      ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-400'
                      : 'bg-zinc-900 border border-white/10 text-zinc-500'
                  }`}
                >
                  {step.number < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs text-center text-zinc-500 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-8 rounded-2xl border border-white/10"
              >
                {/* Step 1: Business Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl mb-2 flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-cyan-400" />
                        Business Information
                      </h2>
                      <p className="text-zinc-400">Tell us about your business</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Business Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="Acme Plumbing & Heating"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Business Address or Service Area *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="123 Main St, Austin, TX or Greater Austin Area"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Business Phone *</label>
                          <input
                            type="tel"
                            required
                            className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Business Email *</label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                            placeholder="info@acmeplumbing.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Business Hours</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="Mon-Fri 8am-6pm, Sat 9am-3pm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Industry / Category *</label>
                        <select
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        >
                          <option value="">Select industry...</option>
                          <option value="home-services">Home Services</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="professional">Professional Services</option>
                          <option value="retail">Retail</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="fitness">Fitness & Wellness</option>
                          <option value="automotive">Automotive</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Website Goals */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl mb-2 flex items-center gap-3">
                        <Target className="w-7 h-7 text-violet-400" />
                        Website Goals
                      </h2>
                      <p className="text-zinc-400">What should your website accomplish?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-3">Primary Goal *</label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {['Phone Calls', 'Booking Appointments', 'Quote Requests', 'Form Leads'].map((goal) => (
                            <label key={goal} className="relative flex items-center gap-3 p-4 bg-zinc-900/50 border border-white/10 rounded-lg cursor-pointer hover:border-cyan-400/30 transition-colors">
                              <input type="radio" name="goal" className="text-cyan-500" />
                              <span>{goal}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-3">Primary Call-to-Action *</label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {['Call Now', 'Book Appointment', 'Get a Quote', 'Contact Us'].map((cta) => (
                            <label key={cta} className="relative flex items-center gap-3 p-4 bg-zinc-900/50 border border-white/10 rounded-lg cursor-pointer hover:border-violet-400/30 transition-colors">
                              <input type="radio" name="cta" className="text-violet-500" />
                              <span>{cta}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Top 3 Services You Offer *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 mb-2"
                          placeholder="Service 1"
                        />
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 mb-2"
                          placeholder="Service 2"
                        />
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="Service 3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Service Locations (cities/areas)
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          rows={3}
                          placeholder="Austin, Round Rock, Cedar Park, Georgetown"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Brand & Style */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl mb-2 flex items-center gap-3">
                        <Palette className="w-7 h-7 text-emerald-400" />
                        Brand & Style
                      </h2>
                      <p className="text-zinc-400">Help us match your brand identity</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Upload Logo (optional)</label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan-400/30 transition-colors cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto mb-3 text-zinc-500" />
                          <p className="text-zinc-400 mb-1">Click to upload or drag and drop</p>
                          <p className="text-sm text-zinc-500">PNG, JPG, SVG up to 10MB</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Brand Assets (photos, style guide, etc.)
                        </label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan-400/30 transition-colors cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto mb-3 text-zinc-500" />
                          <p className="text-zinc-400 mb-1">Upload multiple files</p>
                          <p className="text-sm text-zinc-500">Any file type up to 50MB total</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Brand Colors (optional)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="e.g., #FF6B6B, #4ECDC4, or 'Blue and Orange'"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Websites You Like (URLs)
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          rows={3}
                          placeholder="Share 2-3 websites whose design you like (we'll use them as inspiration)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Copy & Content */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl mb-2 flex items-center gap-3">
                        <FileText className="w-7 h-7 text-amber-400" />
                        Copy & Content
                      </h2>
                      <p className="text-zinc-400">Tell us about your business in your own words</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Business Description *
                        </label>
                        <textarea
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          rows={4}
                          placeholder="Describe what your business does, who you serve, and what makes you different (2-3 sentences)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Unique Selling Points (3 bullets) *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 mb-2"
                          placeholder="1. e.g., 24/7 emergency service"
                        />
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 mb-2"
                          placeholder="2. e.g., Licensed & insured with 10+ years experience"
                        />
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="3. e.g., 100% satisfaction guarantee"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Current Offers or Promotions (optional)
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          rows={3}
                          placeholder="Any current discounts, promotions, or special offers we should highlight"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Competitors */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl mb-2 flex items-center gap-3">
                        <Users className="w-7 h-7 text-rose-400" />
                        Competitors
                      </h2>
                      <p className="text-zinc-400">
                        Help us understand your competitive landscape (optional but helpful)
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Competitor 1 (URL or Business Name)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="https://competitor1.com or Business Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Competitor 2 (URL or Business Name)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="https://competitor2.com or Business Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Competitor 3 (URL or Business Name)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="https://competitor3.com or Business Name"
                        />
                      </div>

                      <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
                        <p className="text-sm text-zinc-400">
                          💡 <strong className="text-white">Why we ask:</strong> Understanding your competitors
                          helps us position your website strategically and ensure you stand out in your market.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Schedule Kickoff Call */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl mb-2 flex items-center gap-3">
                        <Calendar className="w-7 h-7 text-cyan-400" />
                        Schedule Your Kickoff Call
                      </h2>
                      <p className="text-zinc-400">
                        Book a quick 15-minute call to clarify details and speed up your launch
                      </p>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5 mb-6">
                      <h3 className="mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                        What we'll cover:
                      </h3>
                      <ul className="space-y-1 text-sm text-zinc-400 ml-7">
                        <li>• Review your intake responses and clarify any questions</li>
                        <li>• Confirm your goals, CTA strategy, and design preferences</li>
                        <li>• Set expectations for timeline and next steps</li>
                        <li>• Answer any questions you have about the process</li>
                      </ul>
                    </div>

                    {/* Simple Calendar Mockup */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Select Date</label>
                        <div className="grid grid-cols-7 gap-2">
                          {[...Array(14)].map((_, i) => {
                            const day = i + 1;
                            return (
                              <button
                                key={i}
                                type="button"
                                className="aspect-square p-2 rounded-lg bg-zinc-900/50 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all text-sm"
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Select Time (EST)</label>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(
                            (time) => (
                              <button
                                key={time}
                                type="button"
                                className="p-3 rounded-lg bg-zinc-900/50 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all text-sm"
                              >
                                {time}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Timezone</label>
                        <select className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20">
                          <option>Eastern (EST)</option>
                          <option>Central (CST)</option>
                          <option>Mountain (MST)</option>
                          <option>Pacific (PST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
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
                  {currentStep === totalSteps ? 'Complete Onboarding' : 'Next Step'}
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Sidebar: Project Notes */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
              <h3 className="mb-4 flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-amber-400" />
                Project Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 min-h-[300px]"
                placeholder="Add any notes, questions, or special requests here. These notes are saved automatically and accessible throughout your project."
              />
              <p className="text-xs text-zinc-500 mt-2">Auto-saved • Always accessible in your portal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
