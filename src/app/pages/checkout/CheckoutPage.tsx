import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Lock, Clock, Shield, ArrowRight, Loader2, AlertCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { retryQuery, retryFetch } from '../../lib/retry';
import { SEO } from '../../components/SEO';

interface ServiceData {
  id: string;
  slug: string;
  name: string;
  description: string;
  setup_price_cents: number | null;
  monthly_price_cents: number | null;
  stripe_setup_price_id: string | null;
  stripe_monthly_price_id: string | null;
  features: string[];
}

export function CheckoutPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceSlug = searchParams.get('service') || 'website-build';
  const wasCanceled = searchParams.get('canceled') === 'true';
  const { user } = useAuth();

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch service from Supabase with retry
  useEffect(() => {
    let cancelled = false;

    async function fetchService() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await retryQuery(() =>
          supabase.from('services').select('*').eq('slug', serviceSlug).single()
        );

        if (cancelled) return;

        if (fetchError || !data) {
          setError('Service not found. Please try again.');
          setLoading(false);
          return;
        }

        setService(data as ServiceData);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        // Ignore AbortErrors (component unmounted / request cancelled)
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Failed to load service. Please try again.');
        setLoading(false);
      }
    }
    fetchService();

    return () => { cancelled = true; };
  }, [serviceSlug]);

  const dismissCanceled = () => {
    searchParams.delete('canceled');
    setSearchParams(searchParams, { replace: true });
  };

  const handleCheckout = async (priceType: 'setup' | 'monthly') => {
    if (!service) return;

    const priceId = priceType === 'setup'
      ? service.stripe_setup_price_id
      : service.stripe_monthly_price_id;

    if (!priceId) {
      setError('This pricing option is not yet available.');
      return;
    }

    setCheckoutLoading(true);
    setError(null);

    try {
      const res = await retryFetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          serviceSlug: service.slug,
          serviceName: service.name,
          customerEmail: user?.email || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Service Not Found</h2>
          <p className="text-zinc-400 mb-6">{error || 'The service you selected could not be found.'}</p>
          <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
            View all services
          </Link>
        </div>
      </div>
    );
  }

  const setupPrice = service.setup_price_cents ? (service.setup_price_cents / 100) : null;
  const monthlyPrice = service.monthly_price_cents ? (service.monthly_price_cents / 100) : null;
  const hasSetup = setupPrice !== null && service.stripe_setup_price_id;
  const hasMonthly = monthlyPrice !== null && service.stripe_monthly_price_id;

  return (
    <div className="min-h-screen pt-16">
      <SEO title="Checkout" path="/checkout" description="Complete your purchase and start growing your business with Satori Studios." noIndex />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Canceled Banner */}
        {wasCanceled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300 mb-8"
          >
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Checkout was not completed</p>
              <p className="text-sm text-amber-400/70 mt-0.5">
                Your payment was not processed. You can try again whenever you're ready.
              </p>
            </div>
            <button
              onClick={dismissCanceled}
              className="text-amber-400/50 hover:text-amber-300 transition-colors text-sm"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4">
            Complete Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Purchase
            </span>
          </h1>
          <p className="text-xl text-zinc-400">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Pricing Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Info */}
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl mb-2">{service.name}</h2>
              <p className="text-zinc-400 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              {hasSetup && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg">
                        {monthlyPrice ? 'Setup Fee' : 'One-Time Payment'}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {monthlyPrice ? 'One-time setup fee to get started' : 'Full payment for this service'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light">
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                          ${setupPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">one-time</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCheckout('setup')}
                    disabled={checkoutLoading}
                    className="w-full group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {checkoutLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Pay ${setupPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              )}

              {hasMonthly && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-violet-400/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg">Monthly Subscription</h3>
                      <p className="text-sm text-zinc-400">Ongoing monthly service</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light">
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 text-transparent bg-clip-text">
                          ${monthlyPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">per month</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCheckout('monthly')}
                    disabled={checkoutLoading}
                    className="w-full group relative px-6 py-3 rounded-lg border border-violet-500/50 text-white overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/20 hover:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {checkoutLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Subscribe — ${monthlyPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 sticky top-24">
              <h2 className="text-2xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-zinc-500">{service.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {setupPrice && (
                    <div className="flex justify-between text-zinc-400">
                      <span>{monthlyPrice ? 'Setup fee' : 'One-time'}</span>
                      <span>${setupPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {monthlyPrice && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Monthly</span>
                      <span>${monthlyPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Powered by Stripe — PCI compliant</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Clock className="w-5 h-5 text-violet-400" />
                  <span>Work begins within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
