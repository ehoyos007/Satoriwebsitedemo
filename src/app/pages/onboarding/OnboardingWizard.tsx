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
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

// ─── Types ─────────────────────────────────────────────

interface OnboardingFormData {
  // Step 1
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessHours: string;
  industry: string;
  // Step 2
  primaryGoal: string;
  primaryCTA: string;
  services: [string, string, string];
  serviceLocations: string;
  // Step 3
  logoFile: File | null;
  brandAssets: File[];
  brandColors: string;
  websiteInspiration: string;
  // Step 4
  businessDescription: string;
  uniqueSellingPoints: [string, string, string];
  currentOffers: string;
  // Step 5
  competitor1: string;
  competitor2: string;
  competitor3: string;
  // Step 6
  selectedSlotId: string | null;
  selectedSlotStart: string | null;
  selectedDate: string | null;
  timezone: string;
  // Sidebar
  notes: string;
}

interface AvailabilitySlot {
  id: string;
  start_time: string;
  end_time: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const INITIAL_FORM_DATA: OnboardingFormData = {
  businessName: '',
  businessAddress: '',
  businessPhone: '',
  businessEmail: '',
  businessHours: '',
  industry: '',
  primaryGoal: '',
  primaryCTA: '',
  services: ['', '', ''],
  serviceLocations: '',
  logoFile: null,
  brandAssets: [],
  brandColors: '',
  websiteInspiration: '',
  businessDescription: '',
  uniqueSellingPoints: ['', '', ''],
  currentOffers: '',
  competitor1: '',
  competitor2: '',
  competitor3: '',
  selectedSlotId: null,
  selectedSlotStart: null,
  selectedDate: null,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
  notes: '',
};

// ─── Helpers ───────────────────────────────────────────

/** Convert formData to JSON-safe object (strips File objects) */
function formDataToJSON(fd: OnboardingFormData) {
  const { logoFile, brandAssets, ...rest } = fd;
  return {
    ...rest,
    hasLogo: !!logoFile,
    brandAssetCount: brandAssets.length,
  };
}

/** Group slots by date string (YYYY-MM-DD in local timezone display) */
function groupSlotsByDate(slots: AvailabilitySlot[]): Map<string, AvailabilitySlot[]> {
  const map = new Map<string, AvailabilitySlot[]>();
  for (const slot of slots) {
    const date = new Date(slot.start_time);
    const key = date.toISOString().split('T')[0];
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(slot);
  }
  return map;
}

function formatTime(isoString: string, tz: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: tz,
    });
  } catch {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

function formatDateLabel(dateKey: string): string {
  const d = new Date(dateKey + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Common timezones for dropdown
const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern (ET)' },
  { value: 'America/Chicago', label: 'Central (CT)' },
  { value: 'America/Denver', label: 'Mountain (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific (PT)' },
  { value: 'America/Anchorage', label: 'Alaska (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii (HT)' },
];

// ─── Component ─────────────────────────────────────────

export function OnboardingWizard() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [clientId, setClientId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // File input refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const assetsInputRef = useRef<HTMLInputElement>(null);

  // Availability slots
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);

  const totalSteps = 6;

  const steps = [
    { number: 1, title: 'Business Information', icon: Building2 },
    { number: 2, title: 'Website Goals', icon: Target },
    { number: 3, title: 'Brand & Style', icon: Palette },
    { number: 4, title: 'Copy & Content', icon: FileText },
    { number: 5, title: 'Competitors', icon: Users },
    { number: 6, title: 'Schedule Kickoff Call', icon: Calendar },
  ];

  // ─── Field updater ────────────────────────────────────

  const updateField = useCallback(<K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on that field when user starts typing
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const updateService = useCallback((index: number, value: string) => {
    setFormData((prev) => {
      const services = [...prev.services] as [string, string, string];
      services[index] = value;
      return { ...prev, services };
    });
    if (index === 0) {
      setErrors((prev) => {
        if (prev['services[0]']) {
          const next = { ...prev };
          delete next['services[0]'];
          return next;
        }
        return prev;
      });
    }
  }, []);

  const updateUSP = useCallback((index: number, value: string) => {
    setFormData((prev) => {
      const usps = [...prev.uniqueSellingPoints] as [string, string, string];
      usps[index] = value;
      return { ...prev, uniqueSellingPoints: usps };
    });
    if (index === 0) {
      setErrors((prev) => {
        if (prev['uniqueSellingPoints[0]']) {
          const next = { ...prev };
          delete next['uniqueSellingPoints[0]'];
          return next;
        }
        return prev;
      });
    }
  }, []);

  // ─── Validation ───────────────────────────────────────

  function validateStep(step: number): boolean {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Address or service area is required';
      if (!formData.businessPhone.trim()) newErrors.businessPhone = 'Phone number is required';
      if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Email is required';
      if (!formData.industry) newErrors.industry = 'Please select an industry';
    }

    if (step === 2) {
      if (!formData.primaryGoal) newErrors.primaryGoal = 'Please select a primary goal';
      if (!formData.primaryCTA) newErrors.primaryCTA = 'Please select a primary CTA';
      if (!formData.services[0].trim()) newErrors['services[0]'] = 'At least one service is required';
    }

    if (step === 4) {
      if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';
      if (!formData.uniqueSellingPoints[0].trim()) newErrors['uniqueSellingPoints[0]'] = 'At least one selling point is required';
    }

    // Steps 3, 5, 6 have no required fields
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ─── Load client record & restore partial data ────────

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function loadClient() {
      // Retry up to 3 times with delay for trigger race condition
      for (let attempt = 0; attempt < 3; attempt++) {
        const { data: client } = await supabase
          .from('clients')
          .select('id, onboarding_completed, onboarding_data')
          .eq('user_id', user!.id)
          .single();

        if (cancelled) return;

        if (client) {
          // Already completed? Go to portal
          if (client.onboarding_completed) {
            navigate('/portal', { replace: true });
            return;
          }

          setClientId(client.id);

          // Restore partial data
          const saved = client.onboarding_data as Record<string, any> | null;
          if (saved && saved._partial) {
            setFormData((prev) => ({
              ...prev,
              businessName: saved.businessName || '',
              businessAddress: saved.businessAddress || '',
              businessPhone: saved.businessPhone || '',
              businessEmail: saved.businessEmail || '',
              businessHours: saved.businessHours || '',
              industry: saved.industry || '',
              primaryGoal: saved.primaryGoal || '',
              primaryCTA: saved.primaryCTA || '',
              services: saved.services || ['', '', ''],
              serviceLocations: saved.serviceLocations || '',
              brandColors: saved.brandColors || '',
              websiteInspiration: saved.websiteInspiration || '',
              businessDescription: saved.businessDescription || '',
              uniqueSellingPoints: saved.uniqueSellingPoints || ['', '', ''],
              currentOffers: saved.currentOffers || '',
              competitor1: saved.competitor1 || '',
              competitor2: saved.competitor2 || '',
              competitor3: saved.competitor3 || '',
              selectedSlotId: saved.selectedSlotId || null,
              selectedSlotStart: saved.selectedSlotStart || null,
              selectedDate: saved.selectedDate || null,
              timezone: saved.timezone || INITIAL_FORM_DATA.timezone,
              notes: saved.notes || '',
            }));
            if (saved._lastStep && typeof saved._lastStep === 'number') {
              setCurrentStep(saved._lastStep);
            }
          }
          return;
        }

        // Wait before retry
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 1500));
        }
      }

      if (cancelled) return;

      // Fallback: create a minimal client record
      const { data: newClient } = await supabase
        .from('clients')
        .insert({
          user_id: user!.id,
          business_email: user!.email,
        })
        .select('id')
        .single();

      if (newClient) {
        setClientId(newClient.id);
      }
    }

    loadClient();
    return () => { cancelled = true; };
  }, [user, navigate]);

  // ─── Load availability slots ──────────────────────────

  useEffect(() => {
    async function loadSlots() {
      setSlotsLoading(true);
      const { data } = await supabase
        .from('availability_slots')
        .select('id, start_time, end_time')
        .eq('is_booked', false)
        .gt('start_time', new Date().toISOString())
        .order('start_time');

      setAvailableSlots(data || []);
      setSlotsLoading(false);
    }

    loadSlots();
  }, []);

  // ─── Auto-save on step change ─────────────────────────

  useEffect(() => {
    if (!clientId) return;

    const timeout = setTimeout(() => {
      supabase
        .from('clients')
        .update({
          onboarding_data: {
            ...formDataToJSON(formData),
            _partial: true,
            _lastStep: currentStep,
          } as any,
        })
        .eq('id', clientId)
        .then(() => {
          // silent save
        });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [currentStep, clientId]);

  // ─── Navigation ───────────────────────────────────────

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ─── File handlers ────────────────────────────────────

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateField('logoFile', file);
  };

  const handleAssetsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    updateField('brandAssets', [...formData.brandAssets, ...files]);
  };

  const removeAsset = (index: number) => {
    updateField(
      'brandAssets',
      formData.brandAssets.filter((_, i) => i !== index)
    );
  };

  // ─── Completion Handler ───────────────────────────────

  async function handleComplete() {
    if (!user || !clientId) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const fileUrls: { logoUrl?: string; assetUrls?: string[] } = {};

      // Upload logo
      if (formData.logoFile) {
        const ext = formData.logoFile.name.split('.').pop();
        const path = `${user.id}/logo/logo.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('onboarding-assets')
          .upload(path, formData.logoFile, { upsert: true });
        if (!uploadErr) {
          const { data: urlData } = supabase.storage
            .from('onboarding-assets')
            .getPublicUrl(path);
          fileUrls.logoUrl = urlData.publicUrl;
        } else {
          console.error('Logo upload failed:', uploadErr);
        }
      }

      // Upload brand assets
      if (formData.brandAssets.length > 0) {
        const urls: string[] = [];
        for (const file of formData.brandAssets) {
          const path = `${user.id}/assets/${file.name}`;
          const { error: uploadErr } = await supabase.storage
            .from('onboarding-assets')
            .upload(path, file, { upsert: true });
          if (!uploadErr) {
            const { data: urlData } = supabase.storage
              .from('onboarding-assets')
              .getPublicUrl(path);
            urls.push(urlData.publicUrl);
          } else {
            console.error(`Asset upload failed (${file.name}):`, uploadErr);
          }
        }
        fileUrls.assetUrls = urls;
      }

      // Build onboarding payload
      const onboardingPayload = {
        businessInfo: {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
          businessPhone: formData.businessPhone,
          businessEmail: formData.businessEmail,
          businessHours: formData.businessHours,
          industry: formData.industry,
        },
        websiteGoals: {
          primaryGoal: formData.primaryGoal,
          primaryCTA: formData.primaryCTA,
          services: formData.services.filter(Boolean),
          serviceLocations: formData.serviceLocations,
        },
        brandStyle: {
          brandColors: formData.brandColors,
          websiteInspiration: formData.websiteInspiration,
          ...fileUrls,
        },
        copyContent: {
          businessDescription: formData.businessDescription,
          uniqueSellingPoints: formData.uniqueSellingPoints.filter(Boolean),
          currentOffers: formData.currentOffers,
        },
        competitors: {
          competitor1: formData.competitor1,
          competitor2: formData.competitor2,
          competitor3: formData.competitor3,
        },
        scheduling: {
          selectedSlotId: formData.selectedSlotId,
          selectedSlotStart: formData.selectedSlotStart,
          timezone: formData.timezone,
          skippedScheduling: !formData.selectedSlotId,
        },
        notes: formData.notes,
        completedAt: new Date().toISOString(),
      };

      // Create booking if slot selected
      if (formData.selectedSlotId) {
        // Re-check slot availability
        const { data: slotCheck } = await supabase
          .from('availability_slots')
          .select('is_booked')
          .eq('id', formData.selectedSlotId)
          .single();

        if (slotCheck?.is_booked) {
          // Slot was taken — refresh and show error
          const { data: freshSlots } = await supabase
            .from('availability_slots')
            .select('id, start_time, end_time')
            .eq('is_booked', false)
            .gt('start_time', new Date().toISOString())
            .order('start_time');
          setAvailableSlots(freshSlots || []);
          updateField('selectedSlotId', null);
          updateField('selectedSlotStart', null);
          updateField('selectedDate', null);
          setSubmitting(false);
          setSubmitError('The time slot you selected is no longer available. Please choose another time or skip scheduling.');
          return;
        }

        // Book it
        await supabase.from('bookings').insert({
          client_id: clientId,
          slot_id: formData.selectedSlotId,
          status: 'confirmed',
        });

        await supabase
          .from('availability_slots')
          .update({ is_booked: true })
          .eq('id', formData.selectedSlotId);
      }

      // Save to clients table
      await supabase
        .from('clients')
        .update({
          onboarding_data: onboardingPayload as any,
          onboarding_completed: true,
          business_name: formData.businessName || null,
          business_email: formData.businessEmail || null,
          business_phone: formData.businessPhone || null,
          industry: formData.industry || null,
          location: formData.businessAddress || null,
        })
        .eq('id', clientId);

      // Log activity
      await supabase.from('activity_log').insert({
        client_id: clientId,
        type: 'system' as const,
        message: 'Completed onboarding wizard',
      });

      // Send emails (non-blocking)
      const scheduledTimeFormatted = formData.selectedSlotStart
        ? new Date(formData.selectedSlotStart).toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: formData.timezone,
          })
        : null;

      fetch('/api/onboarding-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail: formData.businessEmail || user.email,
          businessName: formData.businessName,
          clientName: profile?.full_name,
          clientId,
          scheduledTime: scheduledTimeFormatted,
          timezone: formData.timezone,
          skippedScheduling: !formData.selectedSlotId,
        }),
      }).catch((err) => console.error('Email send failed (non-blocking):', err));

      // Navigate to success
      navigate('/onboarding/success', {
        state: {
          businessName: formData.businessName,
          scheduledTime: scheduledTimeFormatted,
          timezone: formData.timezone,
          skippedScheduling: !formData.selectedSlotId,
        },
      });
    } catch (err) {
      console.error('Onboarding completion error:', err);
      setSubmitError('Something went wrong saving your information. Please try again.');
      setSubmitting(false);
    }
  }

  // ─── Computed values for step 6 calendar ──────────────

  const slotsByDate = groupSlotsByDate(availableSlots);
  const dateKeys = Array.from(slotsByDate.keys()).sort();
  const slotsForSelectedDate = formData.selectedDate
    ? slotsByDate.get(formData.selectedDate) || []
    : [];

  // ─── Input class helper ───────────────────────────────

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20'
        : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
    }`;

  const radioClass = (field: string, value: string) =>
    `relative flex items-center gap-3 p-4 bg-zinc-900/50 border rounded-lg cursor-pointer transition-colors ${
      formData[field as keyof OnboardingFormData] === value
        ? 'border-cyan-400/50 bg-cyan-500/10'
        : 'border-white/10 hover:border-cyan-400/30'
    }`;

  // ─── Render ───────────────────────────────────────────

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

        {/* Submit error banner */}
        {submitError && (
          <div className="mb-6 p-4 rounded-lg border border-red-400/30 bg-red-500/10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300">{submitError}</p>
              <button
                onClick={() => setSubmitError(null)}
                className="text-sm text-red-400 hover:text-red-300 mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

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
                {/* ─── Step 1: Business Information ─── */}
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
                          value={formData.businessName}
                          onChange={(e) => updateField('businessName', e.target.value)}
                          className={inputClass('businessName')}
                          placeholder="Acme Plumbing & Heating"
                        />
                        {errors.businessName && <p className="text-sm text-red-400 mt-1">{errors.businessName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Business Address or Service Area *
                        </label>
                        <input
                          type="text"
                          value={formData.businessAddress}
                          onChange={(e) => updateField('businessAddress', e.target.value)}
                          className={inputClass('businessAddress')}
                          placeholder="123 Main St, Austin, TX or Greater Austin Area"
                        />
                        {errors.businessAddress && <p className="text-sm text-red-400 mt-1">{errors.businessAddress}</p>}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Business Phone *</label>
                          <input
                            type="tel"
                            value={formData.businessPhone}
                            onChange={(e) => updateField('businessPhone', e.target.value)}
                            className={inputClass('businessPhone')}
                            placeholder="(555) 123-4567"
                          />
                          {errors.businessPhone && <p className="text-sm text-red-400 mt-1">{errors.businessPhone}</p>}
                        </div>
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Business Email *</label>
                          <input
                            type="email"
                            value={formData.businessEmail}
                            onChange={(e) => updateField('businessEmail', e.target.value)}
                            className={inputClass('businessEmail')}
                            placeholder="info@acmeplumbing.com"
                          />
                          {errors.businessEmail && <p className="text-sm text-red-400 mt-1">{errors.businessEmail}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Business Hours</label>
                        <input
                          type="text"
                          value={formData.businessHours}
                          onChange={(e) => updateField('businessHours', e.target.value)}
                          className={inputClass('businessHours')}
                          placeholder="Mon-Fri 8am-6pm, Sat 9am-3pm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Industry / Category *</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => updateField('industry', e.target.value)}
                          className={inputClass('industry')}
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
                        {errors.industry && <p className="text-sm text-red-400 mt-1">{errors.industry}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Step 2: Website Goals ─── */}
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
                            <label key={goal} className={radioClass('primaryGoal', goal)}>
                              <input
                                type="radio"
                                name="goal"
                                className="text-cyan-500"
                                checked={formData.primaryGoal === goal}
                                onChange={() => updateField('primaryGoal', goal)}
                              />
                              <span>{goal}</span>
                            </label>
                          ))}
                        </div>
                        {errors.primaryGoal && <p className="text-sm text-red-400 mt-1">{errors.primaryGoal}</p>}
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-3">Primary Call-to-Action *</label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {['Call Now', 'Book Appointment', 'Get a Quote', 'Contact Us'].map((cta) => (
                            <label key={cta} className={radioClass('primaryCTA', cta)}>
                              <input
                                type="radio"
                                name="cta"
                                className="text-violet-500"
                                checked={formData.primaryCTA === cta}
                                onChange={() => updateField('primaryCTA', cta)}
                              />
                              <span>{cta}</span>
                            </label>
                          ))}
                        </div>
                        {errors.primaryCTA && <p className="text-sm text-red-400 mt-1">{errors.primaryCTA}</p>}
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Top 3 Services You Offer *
                        </label>
                        <input
                          type="text"
                          value={formData.services[0]}
                          onChange={(e) => updateService(0, e.target.value)}
                          className={`${inputClass('services[0]')} mb-2`}
                          placeholder="Service 1"
                        />
                        {errors['services[0]'] && <p className="text-sm text-red-400 mb-1">{errors['services[0]']}</p>}
                        <input
                          type="text"
                          value={formData.services[1]}
                          onChange={(e) => updateService(1, e.target.value)}
                          className={`${inputClass('')} mb-2`}
                          placeholder="Service 2"
                        />
                        <input
                          type="text"
                          value={formData.services[2]}
                          onChange={(e) => updateService(2, e.target.value)}
                          className={inputClass('')}
                          placeholder="Service 3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Service Locations (cities/areas)
                        </label>
                        <textarea
                          value={formData.serviceLocations}
                          onChange={(e) => updateField('serviceLocations', e.target.value)}
                          className={inputClass('serviceLocations')}
                          rows={3}
                          placeholder="Austin, Round Rock, Cedar Park, Georgetown"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Step 3: Brand & Style ─── */}
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
                      {/* Logo upload */}
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Upload Logo (optional)</label>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*,.svg"
                          onChange={handleLogoSelect}
                          className="hidden"
                        />
                        {formData.logoFile ? (
                          <div className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-emerald-400/30 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-sm text-zinc-300 truncate flex-1">{formData.logoFile.name}</span>
                            <button
                              type="button"
                              onClick={() => updateField('logoFile', null)}
                              className="text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => logoInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan-400/30 transition-colors cursor-pointer"
                          >
                            <Upload className="w-12 h-12 mx-auto mb-3 text-zinc-500" />
                            <p className="text-zinc-400 mb-1">Click to upload or drag and drop</p>
                            <p className="text-sm text-zinc-500">PNG, JPG, SVG up to 10MB</p>
                          </div>
                        )}
                      </div>

                      {/* Brand assets upload */}
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Brand Assets (photos, style guide, etc.)
                        </label>
                        <input
                          ref={assetsInputRef}
                          type="file"
                          multiple
                          onChange={handleAssetsSelect}
                          className="hidden"
                        />
                        {formData.brandAssets.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {formData.brandAssets.map((file, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-white/10 rounded-lg">
                                <FileText className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                                <span className="text-sm text-zinc-300 truncate flex-1">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeAsset(i)}
                                  className="text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <div
                          onClick={() => assetsInputRef.current?.click()}
                          className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan-400/30 transition-colors cursor-pointer"
                        >
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
                          value={formData.brandColors}
                          onChange={(e) => updateField('brandColors', e.target.value)}
                          className={inputClass('brandColors')}
                          placeholder="e.g., #FF6B6B, #4ECDC4, or 'Blue and Orange'"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Websites You Like (URLs)
                        </label>
                        <textarea
                          value={formData.websiteInspiration}
                          onChange={(e) => updateField('websiteInspiration', e.target.value)}
                          className={inputClass('websiteInspiration')}
                          rows={3}
                          placeholder="Share 2-3 websites whose design you like (we'll use them as inspiration)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Step 4: Copy & Content ─── */}
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
                          value={formData.businessDescription}
                          onChange={(e) => updateField('businessDescription', e.target.value)}
                          className={inputClass('businessDescription')}
                          rows={4}
                          placeholder="Describe what your business does, who you serve, and what makes you different (2-3 sentences)"
                        />
                        {errors.businessDescription && <p className="text-sm text-red-400 mt-1">{errors.businessDescription}</p>}
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Unique Selling Points (3 bullets) *
                        </label>
                        <input
                          type="text"
                          value={formData.uniqueSellingPoints[0]}
                          onChange={(e) => updateUSP(0, e.target.value)}
                          className={`${inputClass('uniqueSellingPoints[0]')} mb-2`}
                          placeholder="1. e.g., 24/7 emergency service"
                        />
                        {errors['uniqueSellingPoints[0]'] && <p className="text-sm text-red-400 mb-1">{errors['uniqueSellingPoints[0]']}</p>}
                        <input
                          type="text"
                          value={formData.uniqueSellingPoints[1]}
                          onChange={(e) => updateUSP(1, e.target.value)}
                          className={`${inputClass('')} mb-2`}
                          placeholder="2. e.g., Licensed & insured with 10+ years experience"
                        />
                        <input
                          type="text"
                          value={formData.uniqueSellingPoints[2]}
                          onChange={(e) => updateUSP(2, e.target.value)}
                          className={inputClass('')}
                          placeholder="3. e.g., 100% satisfaction guarantee"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Current Offers or Promotions (optional)
                        </label>
                        <textarea
                          value={formData.currentOffers}
                          onChange={(e) => updateField('currentOffers', e.target.value)}
                          className={inputClass('currentOffers')}
                          rows={3}
                          placeholder="Any current discounts, promotions, or special offers we should highlight"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Step 5: Competitors ─── */}
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
                          value={formData.competitor1}
                          onChange={(e) => updateField('competitor1', e.target.value)}
                          className={inputClass('competitor1')}
                          placeholder="https://competitor1.com or Business Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Competitor 2 (URL or Business Name)
                        </label>
                        <input
                          type="text"
                          value={formData.competitor2}
                          onChange={(e) => updateField('competitor2', e.target.value)}
                          className={inputClass('competitor2')}
                          placeholder="https://competitor2.com or Business Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Competitor 3 (URL or Business Name)
                        </label>
                        <input
                          type="text"
                          value={formData.competitor3}
                          onChange={(e) => updateField('competitor3', e.target.value)}
                          className={inputClass('competitor3')}
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

                {/* ─── Step 6: Schedule Kickoff Call ─── */}
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
                        <li>Review your intake responses and clarify any questions</li>
                        <li>Confirm your goals, CTA strategy, and design preferences</li>
                        <li>Set expectations for timeline and next steps</li>
                        <li>Answer any questions you have about the process</li>
                      </ul>
                    </div>

                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                        <span className="ml-3 text-zinc-400">Loading available times...</span>
                      </div>
                    ) : dateKeys.length === 0 ? (
                      <div className="glass-panel p-8 rounded-xl border border-amber-400/20 bg-amber-500/5 text-center">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                        <h3 className="text-lg mb-2">No Available Times Right Now</h3>
                        <p className="text-zinc-400 mb-4">
                          We'll reach out to schedule your kickoff call once you complete onboarding.
                        </p>
                        <p className="text-sm text-zinc-500">
                          You can still complete onboarding — just click "Complete Onboarding" below.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Timezone selector */}
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Your Timezone</label>
                          <select
                            value={formData.timezone}
                            onChange={(e) => updateField('timezone', e.target.value)}
                            className={inputClass('timezone')}
                          >
                            {TIMEZONE_OPTIONS.map((tz) => (
                              <option key={tz.value} value={tz.value}>{tz.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Date grid */}
                        <div>
                          <label className="block text-sm text-zinc-400 mb-2">Select Date</label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {dateKeys.map((dateKey) => (
                              <button
                                key={dateKey}
                                type="button"
                                onClick={() => {
                                  updateField('selectedDate', dateKey);
                                  // Clear slot selection when date changes
                                  updateField('selectedSlotId', null);
                                  updateField('selectedSlotStart', null);
                                }}
                                className={`p-3 rounded-lg border text-sm transition-all ${
                                  formData.selectedDate === dateKey
                                    ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300'
                                    : 'bg-zinc-900/50 border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5'
                                }`}
                              >
                                {formatDateLabel(dateKey)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Time slots for selected date */}
                        {formData.selectedDate && (
                          <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                              Select Time
                            </label>
                            <div className="grid sm:grid-cols-3 gap-2">
                              {slotsForSelectedDate.map((slot) => (
                                <button
                                  key={slot.id}
                                  type="button"
                                  onClick={() => {
                                    updateField('selectedSlotId', slot.id);
                                    updateField('selectedSlotStart', slot.start_time);
                                  }}
                                  className={`p-3 rounded-lg border text-sm transition-all ${
                                    formData.selectedSlotId === slot.id
                                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                                      : 'bg-zinc-900/50 border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                                  }`}
                                >
                                  {formatTime(slot.start_time, formData.timezone)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Selected slot summary */}
                        {formData.selectedSlotId && formData.selectedSlotStart && (
                          <div className="p-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                              <span className="text-emerald-300">
                                Selected: {new Date(formData.selectedSlotStart).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  timeZone: formData.timezone,
                                })}{' '}
                                at {formatTime(formData.selectedSlotStart, formData.timezone)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
                disabled={submitting}
                className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : currentStep === totalSteps ? (
                    <>
                      Complete Onboarding
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
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
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
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
