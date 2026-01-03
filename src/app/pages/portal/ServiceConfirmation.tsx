import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Calendar, FileText, X } from 'lucide-react';

interface ServiceConfirmationProps {
  serviceName: string;
  onClose: () => void;
  onBookCall?: () => void;
}

export function ServiceConfirmation({ serviceName, onClose, onBookCall }: ServiceConfirmationProps) {
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>

          <h2 className="text-3xl mb-3">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Service Added!
            </span>
          </h2>

          <p className="text-xl text-zinc-400 mb-8">
            {serviceName} has been added to your project
          </p>

          {/* What Happens Next */}
          <div className="glass-panel p-6 rounded-xl border border-white/10 text-left mb-8">
            <h3 className="mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              What Happens Next
            </h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-sm">
                  1
                </span>
                <div>
                  <p className="text-white mb-1">
                    <strong>Kickoff Email (within 24 hours)</strong>
                  </p>
                  <p className="text-sm text-zinc-400">
                    You'll receive an email with next steps and any prep work needed
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <p className="text-white mb-1">
                    <strong>Service Starts (within 48 hours)</strong>
                  </p>
                  <p className="text-sm text-zinc-400">
                    Our team begins work on your service
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <p className="text-white mb-1">
                    <strong>Track Progress in Portal</strong>
                  </p>
                  <p className="text-sm text-zinc-400">
                    Monitor status and deliverables in your project dashboard
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Optional Call Booking */}
          {onBookCall && (
            <div className="glass-panel p-6 rounded-xl border border-cyan-400/20 bg-cyan-500/5 mb-6">
              <div className="flex items-start gap-3 text-left mb-4">
                <Calendar className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="mb-1">Want to discuss this service?</h4>
                  <p className="text-sm text-zinc-400">
                    Book a quick 15-minute call to clarify goals and speed up delivery
                  </p>
                </div>
              </div>
              <button
                onClick={onBookCall}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 transition-all"
              >
                Schedule Optional Kickoff Call
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Back to Portal
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <p className="text-xs text-zinc-500 mt-6">
            A confirmation email has been sent to your inbox
          </p>
        </div>
      </motion.div>
    </div>
  );
}
