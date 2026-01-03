import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function CreateAccountPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'password' | 'magic'>('password');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'magic') {
      setEmailSent(true);
      // In real app, would send magic link email
      setTimeout(() => navigate('/onboarding'), 2000);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-500">Step 2 of 5</span>
            <span className="text-sm text-cyan-400">Create Account</span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 w-2/5" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-2xl border border-white/10"
        >
          {!emailSent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                </div>
                <h1 className="text-3xl mb-2">Create Your Account</h1>
                <p className="text-zinc-400">
                  Get access to your project portal and start your website build
                </p>
              </div>

              {/* Method Toggle */}
              <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-lg mb-6">
                <button
                  onClick={() => setMethod('password')}
                  className={`flex-1 py-2 rounded-md transition-all ${
                    method === 'password'
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Email + Password
                </button>
                <button
                  onClick={() => setMethod('magic')}
                  className={`flex-1 py-2 rounded-md transition-all ${
                    method === 'magic'
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Magic Link
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {method === 'password' && (
                  <>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="password"
                          required
                          className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="password"
                          required
                          className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {method === 'magic' ? 'Send Magic Link' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <p className="text-center text-sm text-zinc-500">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-cyan-400 hover:underline">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-cyan-400 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl mb-2">Check Your Email</h2>
              <p className="text-zinc-400 mb-6">
                We sent a magic link to your email. Click the link to verify your account and continue.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Waiting for confirmation...
              </div>
            </div>
          )}
        </motion.div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{' '}
          <a href="#" className="text-cyan-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
