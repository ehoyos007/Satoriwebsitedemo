import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Calendar,
  Video,
  Upload,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export function BookingConfirmation() {
  const navigate = useNavigate();
  const [showAccountOption, setShowAccountOption] = useState(true);
  const [createAccount, setCreateAccount] = useState(false);

  const handleContinue = () => {
    if (createAccount) {
      navigate('/booking/upload-assets');
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
                <span>Tuesday, January 7, 2025</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Video className="w-5 h-5 text-violet-400" />
                <span>2:00 PM - 2:15 PM EST</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
            <div className="flex items-start gap-3 text-left">
              <Mail className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="mb-1">Calendar Invite Sent</h3>
                <p className="text-sm text-zinc-400">
                  Check your email for the calendar invite with call link and prep materials.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optional Account Creation */}
        {showAccountOption && (
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
                {createAccount ? (
                  <>
                    <Upload className="w-5 h-5" />
                    Create Account & Upload Assets
                  </>
                ) : (
                  <>
                    Done
                  </>
                )}
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )}

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
