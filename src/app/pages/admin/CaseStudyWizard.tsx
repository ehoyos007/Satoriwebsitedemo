import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Sparkles,
  Edit3,
  Download,
  CheckCircle,
  Lock,
} from 'lucide-react';
import { useReducer, useState } from 'react';
import { InputStep } from './components/InputStep';
import { GenerationStep } from './components/GenerationStep';
import { ReviewStep } from './components/ReviewStep';
import { ExportStep } from './components/ExportStep';
import type { CaseStudy, KPI, TimelineItem, ChartDataPoint } from '@/app/data/caseStudies';

// Types for wizard state
export interface ClientInput {
  clientUrl: string;
  clientName: string;
  industry: string;
  customIndustry: string;
  location: string;
  services: string[];
  duration: string;
  context: string;
  beforeMetrics: { label: string; value: string }[];
  afterMetrics: { label: string; value: string }[];
}

export interface WizardState {
  currentStep: number;
  inputData: ClientInput;
  isGenerating: boolean;
  generationPhase: string | null;
  generationError: string | null;
  caseStudy: Partial<CaseStudy>;
  isAuthenticated: boolean;
}

type WizardAction =
  | { type: 'SET_INPUT'; field: keyof ClientInput; value: unknown }
  | { type: 'SET_BEFORE_METRIC'; index: number; field: 'label' | 'value'; value: string }
  | { type: 'ADD_BEFORE_METRIC' }
  | { type: 'REMOVE_BEFORE_METRIC'; index: number }
  | { type: 'SET_AFTER_METRIC'; index: number; field: 'label' | 'value'; value: string }
  | { type: 'ADD_AFTER_METRIC' }
  | { type: 'REMOVE_AFTER_METRIC'; index: number }
  | { type: 'START_GENERATION' }
  | { type: 'SET_GENERATION_PHASE'; phase: string }
  | { type: 'GENERATION_SUCCESS'; caseStudy: Partial<CaseStudy> }
  | { type: 'GENERATION_ERROR'; error: string }
  | { type: 'UPDATE_CASE_STUDY'; updates: Partial<CaseStudy> }
  | { type: 'UPDATE_KPI'; index: number; kpi: KPI }
  | { type: 'ADD_KPI' }
  | { type: 'REMOVE_KPI'; index: number }
  | { type: 'UPDATE_TIMELINE'; index: number; timeline: TimelineItem }
  | { type: 'ADD_TIMELINE' }
  | { type: 'REMOVE_TIMELINE'; index: number }
  | { type: 'UPDATE_DELIVERABLE'; index: number; value: string }
  | { type: 'ADD_DELIVERABLE' }
  | { type: 'REMOVE_DELIVERABLE'; index: number }
  | { type: 'UPDATE_TOOL'; index: number; value: string }
  | { type: 'ADD_TOOL' }
  | { type: 'REMOVE_TOOL'; index: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'AUTHENTICATE' }
  | { type: 'RESET' };

const initialState: WizardState = {
  currentStep: 1,
  inputData: {
    clientUrl: '',
    clientName: '',
    industry: '',
    customIndustry: '',
    location: '',
    services: [],
    duration: '',
    context: '',
    beforeMetrics: [{ label: '', value: '' }],
    afterMetrics: [{ label: '', value: '' }],
  },
  isGenerating: false,
  generationPhase: null,
  generationError: null,
  caseStudy: {},
  isAuthenticated: false,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        inputData: { ...state.inputData, [action.field]: action.value },
      };
    case 'SET_BEFORE_METRIC': {
      const newMetrics = [...state.inputData.beforeMetrics];
      newMetrics[action.index] = { ...newMetrics[action.index], [action.field]: action.value };
      return {
        ...state,
        inputData: { ...state.inputData, beforeMetrics: newMetrics },
      };
    }
    case 'ADD_BEFORE_METRIC':
      return {
        ...state,
        inputData: {
          ...state.inputData,
          beforeMetrics: [...state.inputData.beforeMetrics, { label: '', value: '' }],
        },
      };
    case 'REMOVE_BEFORE_METRIC': {
      const newMetrics = state.inputData.beforeMetrics.filter((_, i) => i !== action.index);
      return {
        ...state,
        inputData: { ...state.inputData, beforeMetrics: newMetrics.length ? newMetrics : [{ label: '', value: '' }] },
      };
    }
    case 'SET_AFTER_METRIC': {
      const newMetrics = [...state.inputData.afterMetrics];
      newMetrics[action.index] = { ...newMetrics[action.index], [action.field]: action.value };
      return {
        ...state,
        inputData: { ...state.inputData, afterMetrics: newMetrics },
      };
    }
    case 'ADD_AFTER_METRIC':
      return {
        ...state,
        inputData: {
          ...state.inputData,
          afterMetrics: [...state.inputData.afterMetrics, { label: '', value: '' }],
        },
      };
    case 'REMOVE_AFTER_METRIC': {
      const newMetrics = state.inputData.afterMetrics.filter((_, i) => i !== action.index);
      return {
        ...state,
        inputData: { ...state.inputData, afterMetrics: newMetrics.length ? newMetrics : [{ label: '', value: '' }] },
      };
    }
    case 'START_GENERATION':
      return {
        ...state,
        isGenerating: true,
        generationPhase: 'Initializing...',
        generationError: null,
      };
    case 'SET_GENERATION_PHASE':
      return { ...state, generationPhase: action.phase };
    case 'GENERATION_SUCCESS':
      return {
        ...state,
        isGenerating: false,
        generationPhase: null,
        caseStudy: action.caseStudy,
        currentStep: 3,
      };
    case 'GENERATION_ERROR':
      return {
        ...state,
        isGenerating: false,
        generationPhase: null,
        generationError: action.error,
      };
    case 'UPDATE_CASE_STUDY':
      return {
        ...state,
        caseStudy: { ...state.caseStudy, ...action.updates },
      };
    case 'UPDATE_KPI': {
      const newKpis = [...(state.caseStudy.kpis || [])];
      newKpis[action.index] = action.kpi;
      return {
        ...state,
        caseStudy: { ...state.caseStudy, kpis: newKpis },
      };
    }
    case 'ADD_KPI':
      return {
        ...state,
        caseStudy: {
          ...state.caseStudy,
          kpis: [...(state.caseStudy.kpis || []), { label: '', value: '', delta: '', trend: 'up' as const }],
        },
      };
    case 'REMOVE_KPI': {
      const newKpis = (state.caseStudy.kpis || []).filter((_, i) => i !== action.index);
      return {
        ...state,
        caseStudy: { ...state.caseStudy, kpis: newKpis },
      };
    }
    case 'UPDATE_TIMELINE': {
      const newTimeline = [...(state.caseStudy.timeline || [])];
      newTimeline[action.index] = action.timeline;
      return {
        ...state,
        caseStudy: { ...state.caseStudy, timeline: newTimeline },
      };
    }
    case 'ADD_TIMELINE':
      return {
        ...state,
        caseStudy: {
          ...state.caseStudy,
          timeline: [...(state.caseStudy.timeline || []), { week: '', actions: [''] }],
        },
      };
    case 'REMOVE_TIMELINE': {
      const newTimeline = (state.caseStudy.timeline || []).filter((_, i) => i !== action.index);
      return {
        ...state,
        caseStudy: { ...state.caseStudy, timeline: newTimeline },
      };
    }
    case 'UPDATE_DELIVERABLE': {
      const newDeliverables = [...(state.caseStudy.buildDeliverables || [])];
      newDeliverables[action.index] = action.value;
      return {
        ...state,
        caseStudy: { ...state.caseStudy, buildDeliverables: newDeliverables },
      };
    }
    case 'ADD_DELIVERABLE':
      return {
        ...state,
        caseStudy: {
          ...state.caseStudy,
          buildDeliverables: [...(state.caseStudy.buildDeliverables || []), ''],
        },
      };
    case 'REMOVE_DELIVERABLE': {
      const newDeliverables = (state.caseStudy.buildDeliverables || []).filter((_, i) => i !== action.index);
      return {
        ...state,
        caseStudy: { ...state.caseStudy, buildDeliverables: newDeliverables },
      };
    }
    case 'UPDATE_TOOL': {
      const newTools = [...(state.caseStudy.tools || [])];
      newTools[action.index] = action.value;
      return {
        ...state,
        caseStudy: { ...state.caseStudy, tools: newTools },
      };
    }
    case 'ADD_TOOL':
      return {
        ...state,
        caseStudy: {
          ...state.caseStudy,
          tools: [...(state.caseStudy.tools || []), ''],
        },
      };
    case 'REMOVE_TOOL': {
      const newTools = (state.caseStudy.tools || []).filter((_, i) => i !== action.index);
      return {
        ...state,
        caseStudy: { ...state.caseStudy, tools: newTools },
      };
    }
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 4) };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case 'AUTHENTICATE':
      return { ...state, isAuthenticated: true };
    case 'RESET':
      return { ...initialState, isAuthenticated: true };
    default:
      return state;
  }
}

const steps = [
  { number: 1, title: 'Client Input', icon: FileText },
  { number: 2, title: 'AI Generation', icon: Sparkles },
  { number: 3, title: 'Review & Edit', icon: Edit3 },
  { number: 4, title: 'Export', icon: Download },
];

export function CaseStudyWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const totalSteps = 4;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'satori-admin';
    if (passwordInput === adminPassword) {
      dispatch({ type: 'AUTHENTICATE' });
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleNext = () => {
    if (state.currentStep === 1) {
      dispatch({ type: 'NEXT_STEP' });
    } else if (state.currentStep < totalSteps) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handleBack = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'PREV_STEP' });
    }
  };

  const canProceed = () => {
    if (state.currentStep === 1) {
      const { clientUrl, clientName, industry, location, services } = state.inputData;
      return clientUrl && clientName && (industry || state.inputData.customIndustry) && location && services.length > 0;
    }
    if (state.currentStep === 2) {
      return !state.isGenerating && Object.keys(state.caseStudy).length > 0;
    }
    return true;
  };

  // Admin gate
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-2xl border border-white/10 max-w-md w-full mx-4"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl mb-2">Admin Access Required</h1>
            <p className="text-zinc-400 text-sm">
              Enter the admin password to access the Case Study Wizard
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Enter password"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-transform"
            >
              Access Wizard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">
            Case Study{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Wizard
            </span>
          </h1>
          <p className="text-zinc-400">Generate professional case studies with AI assistance</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    step.number === state.currentStep
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white scale-110'
                      : step.number < state.currentStep
                      ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-400'
                      : 'bg-zinc-900 border border-white/10 text-zinc-500'
                  }`}
                >
                  {step.number < state.currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs text-center text-zinc-500 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300"
              style={{ width: `${(state.currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 rounded-2xl border border-white/10"
          >
            {state.currentStep === 1 && (
              <InputStep state={state} dispatch={dispatch} />
            )}
            {state.currentStep === 2 && (
              <GenerationStep state={state} dispatch={dispatch} />
            )}
            {state.currentStep === 3 && (
              <ReviewStep state={state} dispatch={dispatch} />
            )}
            {state.currentStep === 4 && (
              <ExportStep state={state} dispatch={dispatch} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={state.currentStep === 1 || state.isGenerating}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {state.currentStep < 4 && (
            <button
              onClick={handleNext}
              disabled={!canProceed() || state.isGenerating}
              className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center gap-2">
                {state.currentStep === 1 ? 'Generate Case Study' : 'Next Step'}
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {state.currentStep === 4 && (
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              Create Another
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
