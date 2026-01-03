import { motion } from 'motion/react';
import { X, CreditCard, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ServiceCheckoutProps {
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  notes: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ServiceCheckout({
  serviceId,
  serviceName,
  servicePrice,
  notes,
  onClose,
  onConfirm,
}: ServiceCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'saved' | 'new'>('saved');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      onConfirm();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl">Add Service to Project</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-zinc-950/50">
            <h3 className="mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Service</span>
                <span className="text-white">{serviceName}</span>
              </div>
              {notes && (
                <div className="pt-3 border-t border-white/10">
                  <div className="text-sm text-zinc-500 mb-2">Your Notes:</div>
                  <div className="text-sm text-zinc-300 bg-zinc-900/50 p-3 rounded-lg">
                    {notes}
                  </div>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-zinc-400">Timeline</span>
                <span className="text-white">Starts within 48 hours</span>
              </div>
              <div className="flex justify-between text-xl pt-3 border-t border-white/10">
                <span>Total</span>
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                  {servicePrice}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              Payment Method
            </h3>

            <div className="space-y-3">
              {/* Saved Card */}
              <label className="flex items-start gap-4 p-5 rounded-lg border border-white/10 cursor-pointer hover:border-cyan-400/30 transition-all">
                <input
                  type="radio"
                  name="payment"
                  value="saved"
                  checked={paymentMethod === 'saved'}
                  onChange={() => setPaymentMethod('saved')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">Visa ending in 4242</span>
                  </div>
                  <p className="text-sm text-zinc-400">Use saved payment method</p>
                </div>
              </label>

              {/* New Card */}
              <label className="flex items-start gap-4 p-5 rounded-lg border border-white/10 cursor-pointer hover:border-cyan-400/30 transition-all">
                <input
                  type="radio"
                  name="payment"
                  value="new"
                  checked={paymentMethod === 'new'}
                  onChange={() => setPaymentMethod('new')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium mb-2">Use a different card</div>
                  <p className="text-sm text-zinc-400">Enter new payment details</p>
                </div>
              </label>
            </div>

            {paymentMethod === 'new' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Trust Signals */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-white mb-1">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-zinc-400 space-y-1">
                  <li>• Service added to your project within 48 hours</li>
                  <li>• You'll receive a kickoff email with next steps</li>
                  <li>• Timeline and deliverables tracked in your portal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={processing}
              className="flex-1 px-6 py-3 rounded-lg border border-white/10 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex-1 group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Purchase — {servicePrice}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <p className="text-xs text-center text-zinc-500">
            Secure payment processed with 256-bit SSL encryption
          </p>
        </form>
      </motion.div>
    </div>
  );
}
