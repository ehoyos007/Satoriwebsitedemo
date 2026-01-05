import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import type { WizardState } from '../CaseStudyWizard';
import { generateCaseStudy } from '@/app/lib/claude-api';

interface GenerationStepProps {
  state: WizardState;
  dispatch: React.Dispatch<any>;
}

const generationPhases = [
  { id: 'init', label: 'Preparing request...', icon: Loader2 },
  { id: 'analyze', label: 'Analyzing client information...', icon: Sparkles },
  { id: 'generate', label: 'Generating case study content...', icon: Sparkles },
  { id: 'process', label: 'Processing response...', icon: Loader2 },
  { id: 'finalize', label: 'Finalizing...', icon: CheckCircle2 },
];

export function GenerationStep({ state, dispatch }: GenerationStepProps) {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Only start generation once and if not already generating or complete
    if (
      !hasStartedRef.current &&
      !state.isGenerating &&
      Object.keys(state.caseStudy).length === 0 &&
      !state.generationError
    ) {
      hasStartedRef.current = true;
      startGeneration();
    }
  }, []);

  const startGeneration = async () => {
    dispatch({ type: 'START_GENERATION' });

    try {
      const caseStudy = await generateCaseStudy(state.inputData, {
        onPhaseChange: (phase) => {
          dispatch({ type: 'SET_GENERATION_PHASE', phase });
        },
      });

      dispatch({ type: 'GENERATION_SUCCESS', caseStudy });
    } catch (error) {
      dispatch({
        type: 'GENERATION_ERROR',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  const handleRetry = () => {
    hasStartedRef.current = false;
    dispatch({ type: 'GENERATION_ERROR', error: null });
    startGeneration();
  };

  // Get current phase index for progress
  const getCurrentPhaseIndex = () => {
    if (!state.generationPhase) return 0;
    const phase = state.generationPhase.toLowerCase();
    if (phase.includes('preparing')) return 0;
    if (phase.includes('analyzing')) return 1;
    if (phase.includes('generating')) return 2;
    if (phase.includes('processing')) return 3;
    if (phase.includes('finalizing')) return 4;
    return 2; // Default to middle
  };

  const currentPhaseIndex = getCurrentPhaseIndex();

  // Error state
  if (state.generationError) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl mb-2">Generation Failed</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-6">{state.generationError}</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-transform"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors"
            >
              Edit Inputs
            </button>
          </div>

          <div className="mt-8 glass-panel p-4 rounded-xl border border-amber-400/20 bg-amber-500/5 max-w-md mx-auto">
            <p className="text-sm text-zinc-400">
              <span className="text-amber-400 font-medium">Troubleshooting:</span>
              <br />
              • Check that VITE_CLAUDE_API_KEY is set in .env.local
              <br />
              • Ensure your API key has sufficient credits
              <br />
              • Try reducing the amount of context provided
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state (brief transition before auto-advancing)
  if (!state.isGenerating && Object.keys(state.caseStudy).length > 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h2 className="text-2xl mb-2">Case Study Generated!</h2>
          <p className="text-zinc-400">
            Click "Next Step" to review and edit the generated content.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-7 h-7 text-violet-400" />
          Generating Case Study
        </h2>
        <p className="text-zinc-400">
          AI is analyzing the client information and generating content...
        </p>
      </div>

      {/* Animated Loading Indicator */}
      <div className="flex justify-center my-12">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border-4 border-transparent border-t-cyan-400 border-r-violet-400"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Progress Phases */}
      <div className="max-w-md mx-auto space-y-3">
        {generationPhases.map((phase, index) => {
          const isComplete = index < currentPhaseIndex;
          const isCurrent = index === currentPhaseIndex;
          const isPending = index > currentPhaseIndex;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-cyan-500/10 border border-cyan-400/30'
                  : isComplete
                  ? 'bg-emerald-500/5 border border-emerald-400/20'
                  : 'bg-zinc-900/30 border border-white/5'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : isComplete
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <phase.icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={
                  isCurrent
                    ? 'text-cyan-400'
                    : isComplete
                    ? 'text-emerald-400'
                    : 'text-zinc-500'
                }
              >
                {phase.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Current Status */}
      {state.generationPhase && (
        <motion.p
          key={state.generationPhase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-cyan-400"
        >
          {state.generationPhase}
        </motion.p>
      )}

      {/* Estimated Time */}
      <p className="text-center text-xs text-zinc-500">
        This typically takes 15-30 seconds depending on the complexity
      </p>
    </div>
  );
}
