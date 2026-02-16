import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Calendar,
  Video,
  ArrowRight,
  Mail,
  Sparkles,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'satori_booking_form';

const TIMEZONES: Record<string, string> = {
  'America/New_York': 'ET',
  'America/Chicago': 'CT',
  'America/Denver': 'MT',
  'America/Los_Angeles': 'PT',
  'America/Anchorage': 'AKT',
  'Pacific/Honolulu': 'HT',
};

interface BookingState {
  slotId: string;
  slotStart: string;
  slotEnd: string;
  timezone: string;
}

interface BookingResult {
  bookingId: string;
  slotStart: string;
  slotEnd: string;
}

function loadFormData() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [creating, setCreating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [createAccount, setCreateAccount] = useState(false);
  const bookingCreated = useRef(false);
  const formDataRef = useRef(loadFormData());

  const state = location.state as BookingState | undefined;
  const timezone = state?.timezone || 'America/New_York';
  const tzLabel = TIMEZONES[timezone] || timezone.replace(/_/g, ' ');

  const formData = formDataRef.current;

  // Redirect if no state or form data
  useEffect(() => {
    if (!state || !formData) {
      navigate('/book-call', { replace: true });
    }
  }, [state, formData, navigate]);

  // Create booking via API
  useEffect(() => {
    if (!state || !formData || bookingCreated.current) return;
    bookingCreated.current = true;

    async function createBooking() {
      setCreating(true);
      setError(null);
      try {
        const budgetLabels: Record<string, string> = {
          '999': 'Website Build ($999.95)',
          '2500-10k': 'Growth System ($2.5K-$10K)',
          '10k+': 'Custom Build ($10K+)',
          'unsure': 'Not sure yet',
        };
        const serviceInterest = [
          formData.industry,
          budgetLabels[formData.budget] || formData.budget,
        ].filter(Boolean).join(' — ');

        const goalLabels: Record<string, string> = {
          calls: 'Generate more phone calls',
          bookings: 'Drive appointment bookings',
          leads: 'Capture form leads/quotes',
          reviews: 'Increase Google reviews',
          traffic: 'Improve local search visibility',
          other: 'Other',
        };
        const messageParts = [
          `Business: ${formData.businessName}`,
          `Goal: ${goalLabels[formData.goal] || formData.goal}`,
          `Timeline: ${formData.timeline}`,
          formData.notes ? `Notes: ${formData.notes}` : '',
        ].filter(Boolean);

        const resp = await fetch('/api/create-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slotId: state!.slotId,
            guestName: `${formData.firstName} ${formData.lastName}`.trim(),
            guestEmail: formData.email,
            guestPhone: formData.phone,
            serviceInterest,
            message: messageParts.join('\n'),
            timezone,
          }),
        });

        if (!resp.ok) {
          const data = await resp.json().catch(() => ({ error: 'Unknown error' }));
          if (resp.status === 409) {
            setError(data.error || 'This time slot was just taken. Please go back and pick another time.');
          } else {
            setError(data.error || 'Failed to create booking. Please try again.');
          }
          setCreating(false);
          return;
        }

        const result: BookingResult = await resp.json();
        setBooking(result);
        // Clean up sessionStorage
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Booking creation error:', err);
        setError('Something went wrong. Please try again.');
      }
      setCreating(false);
    }

    createBooking();
  }, [state, formData, timezone]);

  // Loading state
  if (creating) {
    return (
      <div className="min-h-screen pt-16 px-4 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <p className="text-zinc-400 text-lg">Booking your call...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-16 px-4">
        <div className="max-w-xl mx-auto py-20">
          <div className="glass-panel p-8 rounded-2xl border border-red-400/20 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl mb-4">Booking Failed</h2>
            <p className="text-zinc-400 mb-6">{error}</p>
            <button
              onClick={() => navigate('/booking/schedule', { state })}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-transform"
            >
              Pick Another Time
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format the confirmed time
  const startDate = new Date(booking!.slotStart);
  const dateStr = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone,
  });
  const startTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });
  const endTime = new Date(booking!.slotEnd).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });

  const handleContinue = () => {
    if (createAccount) {
      navigate('/checkout/create-account');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-3xl mx-auto py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 rounded-2xl border border-white/10 text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>

          <h1 className="text-4xl mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              You're All Set!
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-8">
            Your 15-minute strategy call has been scheduled
          </p>

          {/* Call Details */}
          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-zinc-950/50 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>{dateStr}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Video className="w-5 h-5 text-violet-400" />
                <span>{startTime} – {endTime} {tzLabel}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
            <div className="flex items-start gap-3 text-left">
              <Mail className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="mb-1">Confirmation Email Sent</h3>
                <p className="text-sm text-zinc-400">
                  Check your email at <strong className="text-zinc-300">{formData?.email}</strong> for
                  the confirmation with prep materials.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optional Account Creation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-8 rounded-2xl border border-white/10"
        >
          <h2 className="text-2xl mb-4 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-violet-400" />
            Speed Up Your Project
          </h2>

          <p className="text-zinc-400 mb-6">
            Create an account now to upload your logo, photos, and brand materials before the call. This
            helps us prepare and speeds up your launch timeline.
          </p>

          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-4 p-5 rounded-lg border border-white/10 cursor-pointer hover:border-cyan-400/30 transition-all">
              <input
                type="radio"
                name="account"
                checked={createAccount}
                onChange={() => setCreateAccount(true)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">Yes, create my account</span>
                </div>
                <p className="text-sm text-zinc-400">
                  Upload materials now and track your project status (recommended)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-4 p-5 rounded-lg border border-white/10 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="radio"
                name="account"
                checked={!createAccount}
                onChange={() => setCreateAccount(false)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium mb-2">Not right now</div>
                <p className="text-sm text-zinc-400">
                  I'll bring materials to the call
                </p>
              </div>
            </label>
          </div>

          <button
            onClick={handleContinue}
            className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              {createAccount ? 'Create Account' : 'Done'}
              <ArrowRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>

        {/* What to Prepare */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-panel p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-lg mb-4">What to Prepare for the Call</h3>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
              <span>List of services you offer and primary call-to-action goal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
              <span>Examples of websites you like (if any)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              <span>Logo, brand colors, or existing marketing materials (optional)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span>Any questions about our process, timeline, or services</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
