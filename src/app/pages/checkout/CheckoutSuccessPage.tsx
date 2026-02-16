import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, User, LayoutDashboard, Loader2, Rocket } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';

export function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);

  // Check onboarding status for logged-in users
  useEffect(() => {
    if (!user) return;

    async function checkOnboarding() {
      setCheckingOnboarding(true);
      const { data: client } = await supabase
        .from('clients')
        .select('onboarding_completed')
        .eq('user_id', user!.id)
        .single();

      setOnboardingCompleted(client?.onboarding_completed ?? false);
      setCheckingOnboarding(false);
    }

    checkOnboarding();
  }, [user]);

  // Determine CTA destination for logged-in users
  const ctaDestination = onboardingCompleted ? '/portal' : '/onboarding';
  const ctaLabel = onboardingCompleted ? 'Go to Portal' : 'Start Onboarding';
  const CtaIcon = onboardingCompleted ? LayoutDashboard : Rocket;

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl mb-4"
        >
          Payment{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Successful
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-zinc-400 mb-8"
        >
          Thank you for your purchase! Your order has been confirmed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl border border-white/10 mb-8 text-left"
        >
          <h3 className="text-lg mb-3">What happens next?</h3>
          <ol className="space-y-3 text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-sm">1</span>
              <span>You'll receive a confirmation email with your order details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-sm">2</span>
              <span>
                {user
                  ? onboardingCompleted
                    ? 'Head to your portal to track your new service'
                    : 'Complete your onboarding to get started'
                  : 'Create your account to access your client portal'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-sm">3</span>
              <span>We'll begin working on your project within 24 hours</span>
            </li>
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {user ? (
            checkingOnboarding ? (
              <div className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500/50 to-violet-500/50 text-white text-lg">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </div>
            ) : (
              <Link
                to={ctaDestination}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg"
              >
                <CtaIcon className="w-5 h-5" />
                {ctaLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )
          ) : (
            <Link
              to="/checkout/create-account"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg"
            >
              <User className="w-5 h-5" />
              Create Your Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}

          <Link
            to="/"
            className="block text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Return to homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
