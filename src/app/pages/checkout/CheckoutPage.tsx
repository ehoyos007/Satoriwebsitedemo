import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Lock, Clock, Shield, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to account creation
    navigate('/checkout/create-account');
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4">
            Complete Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Website Purchase
            </span>
          </h1>
          <p className="text-xl text-zinc-400">Launch your conversion-optimized website in 7-14 days</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method */}
              <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-cyan-400" />
                  Secure Payment
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Name on Card</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Info */}
              <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <h2 className="text-2xl mb-6">Billing Information</h2>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Address</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">State</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">ZIP</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setPromoApplied(true)}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Promo code applied: LAUNCH10 (-$100)
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  <Lock className="w-5 h-5" />
                  Complete Payment — ${promoApplied ? '899.95' : '999.95'}
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <p className="text-center text-sm text-zinc-500">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 sticky top-24">
              <h2 className="text-2xl mb-6">Order Summary</h2>

              <div className="space-y-6 mb-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    Website Build Package
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-400 ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      Conversion-optimized single-page site
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      Mobile-first responsive design
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      Lead capture forms + CTAs
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      Google Analytics 4 setup
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      One round of revisions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      7-14 day delivery
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between text-zinc-400 mb-2">
                    <span>Subtotal</span>
                    <span>$999.95</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-400 mb-2">
                      <span>Promo Code (LAUNCH10)</span>
                      <span>-$100.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl mt-4 pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                      ${promoApplied ? '899.95' : '999.95'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Clock className="w-5 h-5 text-violet-400" />
                  <span>7-14 day delivery timeline</span>
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
