import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { supabase } from '@/app/lib/supabase';

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s().+-]{7,}$/;

export function CreateAccountPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [method, setMethod] = useState<'password' | 'magic'>('password');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const clearField = (field: keyof FieldErrors) =>
    setFieldErrors((p) => ({ ...p, [field]: undefined }));

  const validateAll = (): boolean => {
    const errors: FieldErrors = {};

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address';
    if (!phone.trim()) errors.phone = 'Phone number is required';
    else if (!PHONE_RE.test(phone)) errors.phone = 'Please enter a valid phone number';

    if (method === 'password') {
      if (!password) errors.password = 'Password is required';
      else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
      else if (password && password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateAll()) return;

    if (method === 'magic') {
      setIsLoading(true);
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: { full_name: `${firstName} ${lastName}`.trim(), phone },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (otpError) {
        setError(otpError.message);
        setIsLoading(false);
        return;
      }

      setEmailSent(true);
      setIsLoading(false);
      return;
    }

    // Password method
    setIsLoading(true);

    const { error: signUpError } = await signUp(email, password, {
      full_name: `${firstName} ${lastName}`.trim(),
      phone,
    });

    if (signUpError) {
      setError(signUpError);
      setIsLoading(false);
      return;
    }

    navigate('/onboarding');
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

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-400/20 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

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
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); clearField('firstName'); }}
                      onBlur={() => { if (!firstName.trim()) setFieldErrors((p) => ({ ...p, firstName: 'First name is required' })); }}
                      className={`w-full px-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 ${
                        fieldErrors.firstName ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                      }`}
                    />
                    {fieldErrors.firstName && <p className="text-xs text-red-400 mt-1">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); clearField('lastName'); }}
                      onBlur={() => { if (!lastName.trim()) setFieldErrors((p) => ({ ...p, lastName: 'Last name is required' })); }}
                      className={`w-full px-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 ${
                        fieldErrors.lastName ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                      }`}
                    />
                    {fieldErrors.lastName && <p className="text-xs text-red-400 mt-1">{fieldErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearField('email'); }}
                      onBlur={() => {
                        if (!email.trim()) setFieldErrors((p) => ({ ...p, email: 'Email is required' }));
                        else if (!EMAIL_RE.test(email)) setFieldErrors((p) => ({ ...p, email: 'Please enter a valid email address' }));
                      }}
                      className={`w-full pl-11 pr-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 ${
                        fieldErrors.email ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                      }`}
                      placeholder="you@company.com"
                    />
                  </div>
                  {fieldErrors.email && <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>}
                </div>

                {method === 'password' && (
                  <>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); clearField('password'); if (confirmPassword && e.target.value !== confirmPassword) setFieldErrors((p) => ({ ...p, confirmPassword: 'Passwords do not match' })); else clearField('confirmPassword'); }}
                          onBlur={() => {
                            if (!password) setFieldErrors((p) => ({ ...p, password: 'Password is required' }));
                            else if (password.length < 6) setFieldErrors((p) => ({ ...p, password: 'Password must be at least 6 characters' }));
                          }}
                          className={`w-full pl-11 pr-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 ${
                            fieldErrors.password ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                          }`}
                          placeholder="Min. 6 characters"
                        />
                      </div>
                      {fieldErrors.password && <p className="text-xs text-red-400 mt-1">{fieldErrors.password}</p>}
                      {password && !fieldErrors.password && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                password.length >= 12 ? 'w-full bg-emerald-400' : password.length >= 8 ? 'w-2/3 bg-cyan-400' : 'w-1/3 bg-amber-400'
                              }`}
                            />
                          </div>
                          <span className="text-xs text-zinc-500">
                            {password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Good' : 'Weak'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => { setConfirmPassword(e.target.value); if (password && e.target.value && password !== e.target.value) setFieldErrors((p) => ({ ...p, confirmPassword: 'Passwords do not match' })); else clearField('confirmPassword'); }}
                          className={`w-full pl-11 pr-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 ${
                            fieldErrors.confirmPassword ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                          }`}
                          placeholder="Confirm password"
                        />
                      </div>
                      {fieldErrors.confirmPassword && <p className="text-xs text-red-400 mt-1">{fieldErrors.confirmPassword}</p>}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearField('phone'); }}
                    onBlur={() => {
                      if (!phone.trim()) setFieldErrors((p) => ({ ...p, phone: 'Phone number is required' }));
                      else if (!PHONE_RE.test(phone)) setFieldErrors((p) => ({ ...p, phone: 'Please enter a valid phone number' }));
                    }}
                    className={`w-full px-4 py-3 bg-zinc-900/50 border rounded-lg focus:outline-none focus:ring-2 ${
                      fieldErrors.phone ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {fieldErrors.phone && <p className="text-xs text-red-400 mt-1">{fieldErrors.phone}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {method === 'magic' ? 'Sending...' : 'Creating Account...'}
                      </>
                    ) : (
                      <>
                        {method === 'magic' ? 'Send Magic Link' : 'Create Account'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
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
                We sent a magic link to <span className="text-white">{email}</span>. Click the link to verify your account and continue.
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
          <Link to="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
