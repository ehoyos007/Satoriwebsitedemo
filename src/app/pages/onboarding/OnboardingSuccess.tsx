import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Sparkles, Rocket } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessState {
  businessName?: string;
  scheduledTime?: string | null;
  timezone?: string;
  skippedScheduling?: boolean;
}

export function OnboardingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as SuccessState) || {};

  // If no state (direct navigation), redirect to portal
  useEffect(() => {
    if (!location.state) {
      navigate('/portal', { replace: true });
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  const { businessName, scheduledTime, timezone, skippedScheduling } = state;

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-12 rounded-2xl border border-white/10 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30"
          >
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 text-transparent bg-clip-text">
                {businessName ? `You're In, ${businessName}!` : "You're In!"}
              </span>{' '}
              Build Started.
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              Your website build has officially kicked off. Here's what happens next:
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 rounded-xl border border-white/10 mb-8 text-left"
          >
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              What Happens Next
            </h3>
            <ol className="space-y-3 text-zinc-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-sm">
                  1
                </span>
                <span>
                  <strong className="text-white">Kickoff Call{!skippedScheduling ? ' (scheduled)' : ''}:</strong> We'll review your intake
                  and clarify any questions
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-sm">
                  2
                </span>
                <span>
                  <strong className="text-white">Draft Build (Days 2-7):</strong> We create the first version
                  of your website
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-sm">
                  3
                </span>
                <span>
                  <strong className="text-white">Review & Revisions (Days 8-12):</strong> You provide
                  feedback, we implement changes
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-sm">
                  4
                </span>
                <span>
                  <strong className="text-white">Launch (Day 14):</strong> Your site goes live and we provide
                  training
                </span>
              </li>
            </ol>
          </motion.div>

          {/* Kickoff Call Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`glass-panel p-6 rounded-xl border mb-8 ${
              skippedScheduling
                ? 'border-amber-400/30 bg-amber-500/5'
                : 'border-cyan-400/30 bg-cyan-500/5'
            }`}
          >
            <div className="flex items-start gap-4">
              <Calendar className={`w-6 h-6 flex-shrink-0 mt-1 ${skippedScheduling ? 'text-amber-400' : 'text-cyan-400'}`} />
              <div className="text-left">
                {skippedScheduling ? (
                  <>
                    <h4 className="mb-1">We'll Schedule Your Kickoff Call</h4>
                    <p className="text-sm text-zinc-400">
                      We'll reach out within 24 hours to find a time that works for you.
                      In the meantime, feel free to explore your portal.
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="mb-1">Your Kickoff Call is Scheduled</h4>
                    <p className="text-sm text-zinc-400 mb-3">
                      {scheduledTime || 'Confirmed'}{timezone ? ` (${timezone})` : ''} (15 minutes)
                    </p>
                    <p className="text-sm text-zinc-400">
                      A calendar invite has been sent to your email. We'll use this time to review your intake
                      and answer any questions.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* CTA to Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/portal"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Go to Your Portal
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <p className="text-sm text-zinc-500 mt-4">
              Track progress, upload assets, and manage your project
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
