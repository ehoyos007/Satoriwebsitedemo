import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Monitor,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  SkipForward,
} from 'lucide-react';
import type { WizardState } from '../CaseStudyWizard';
import { captureAllScreenshots, generateThumbnail, type CaptureProgress } from '@/app/lib/screenshot-api';

interface ScreenshotStepProps {
  state: WizardState;
  dispatch: React.Dispatch<any>;
}

type ScreenshotStatus = 'idle' | 'capturing' | 'success' | 'error';

export function ScreenshotStep({ state, dispatch }: ScreenshotStepProps) {
  const [status, setStatus] = useState<ScreenshotStatus>('idle');
  const [progress, setProgress] = useState<CaptureProgress>({
    desktop: 'pending',
    mobile: 'pending',
  });
  const [error, setError] = useState<string | null>(null);

  const { inputData, screenshots } = state;
  const hasScreenshots = screenshots?.desktop || screenshots?.mobile;

  const handleCapture = async () => {
    setStatus('capturing');
    setError(null);
    setProgress({ desktop: 'pending', mobile: 'pending' });

    try {
      const results = await captureAllScreenshots(inputData.clientUrl, (p) => {
        setProgress({ ...p });
      });

      if (!results.desktop.success && !results.mobile.success) {
        setStatus('error');
        setError(results.desktop.error || results.mobile.error || 'Failed to capture screenshots');
        return;
      }

      // Generate thumbnail from desktop image
      let thumbnail: string | undefined;
      if (results.desktop.success && results.desktop.imageUrl) {
        try {
          thumbnail = await generateThumbnail(results.desktop.imageUrl, 600);
        } catch (e) {
          console.error('Failed to generate thumbnail:', e);
          thumbnail = results.desktop.imageUrl; // Fallback to full image
        }
      }

      dispatch({
        type: 'SET_SCREENSHOTS',
        screenshots: {
          desktop: results.desktop.imageUrl,
          mobile: results.mobile.imageUrl,
          thumbnail,
          desktopError: results.desktop.error,
          mobileError: results.mobile.error,
        },
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleRetake = async (type: 'desktop' | 'mobile') => {
    setProgress((prev) => ({ ...prev, [type]: 'capturing' }));

    const { captureScreenshot } = await import('@/app/lib/screenshot-api');
    const result = await captureScreenshot({
      url: inputData.clientUrl,
      viewportWidth: type === 'desktop' ? 1280 : 375,
      viewportHeight: type === 'desktop' ? 800 : 667,
      format: 'png',
    });

    setProgress((prev) => ({ ...prev, [type]: result.success ? 'success' : 'error' }));

    if (result.success) {
      const updates: any = { [type]: result.imageUrl };

      // Regenerate thumbnail if desktop was retaken
      if (type === 'desktop' && result.imageUrl) {
        try {
          updates.thumbnail = await generateThumbnail(result.imageUrl, 600);
        } catch (e) {
          updates.thumbnail = result.imageUrl;
        }
      }

      dispatch({
        type: 'UPDATE_SCREENSHOTS',
        updates,
      });
    }
  };

  const handleSkip = () => {
    dispatch({
      type: 'SET_SCREENSHOTS',
      screenshots: {
        desktop: undefined,
        mobile: undefined,
        thumbnail: undefined,
        skipped: true,
      },
    });
    dispatch({ type: 'NEXT_STEP' });
  };

  const getStatusIcon = (itemStatus: CaptureProgress['desktop']) => {
    switch (itemStatus) {
      case 'capturing':
        return <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2 flex items-center gap-3">
          <Camera className="w-7 h-7 text-violet-400" />
          Capture Screenshots
        </h2>
        <p className="text-zinc-400">
          Automatically capture desktop and mobile screenshots of{' '}
          <span className="text-cyan-400">{inputData.clientUrl}</span>
        </p>
      </div>

      {/* Capture Button */}
      {status === 'idle' && !hasScreenshots && (
        <div className="text-center py-8">
          <button
            onClick={handleCapture}
            className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              <Camera className="w-6 h-6" />
              Capture Screenshots
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-2 mx-auto mt-4 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            Skip (use manual URLs later)
          </button>
        </div>
      )}

      {/* Capturing Progress */}
      {status === 'capturing' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg border border-white/10">
            {getStatusIcon(progress.desktop)}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-zinc-400" />
                <span>Desktop (1280x800)</span>
              </div>
              <p className="text-sm text-zinc-500">
                {progress.desktop === 'capturing' ? 'Capturing...' :
                 progress.desktop === 'success' ? 'Complete' :
                 progress.desktop === 'error' ? 'Failed' : 'Waiting...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg border border-white/10">
            {getStatusIcon(progress.mobile)}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-zinc-400" />
                <span>Mobile (375x667)</span>
              </div>
              <p className="text-sm text-zinc-500">
                {progress.mobile === 'capturing' ? 'Capturing...' :
                 progress.mobile === 'success' ? 'Complete' :
                 progress.mobile === 'error' ? 'Failed' : 'Waiting...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg mb-2">Screenshot Capture Failed</h3>
          <p className="text-zinc-400 text-sm mb-4">{error}</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleCapture}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Success State - Preview */}
      {(status === 'success' || hasScreenshots) && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Desktop Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">Desktop</span>
                  {screenshots?.desktop && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <button
                  onClick={() => handleRetake('desktop')}
                  disabled={progress.desktop === 'capturing'}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                >
                  {progress.desktop === 'capturing' ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  Retake
                </button>
              </div>
              {screenshots?.desktop ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/10"
                >
                  <img
                    src={screenshots.desktop}
                    alt="Desktop preview"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              ) : (
                <div className="aspect-video bg-zinc-900/50 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
                  <span className="text-zinc-500 text-sm">
                    {screenshots?.desktopError || 'No screenshot'}
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">Mobile</span>
                  {screenshots?.mobile && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <button
                  onClick={() => handleRetake('mobile')}
                  disabled={progress.mobile === 'capturing'}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                >
                  {progress.mobile === 'capturing' ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  Retake
                </button>
              </div>
              {screenshots?.mobile ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="aspect-[9/16] max-h-[300px] bg-zinc-900 rounded-lg overflow-hidden border border-white/10 mx-auto"
                >
                  <img
                    src={screenshots.mobile}
                    alt="Mobile preview"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              ) : (
                <div className="aspect-[9/16] max-h-[300px] bg-zinc-900/50 rounded-lg border border-dashed border-white/10 flex items-center justify-center mx-auto">
                  <span className="text-zinc-500 text-sm">
                    {screenshots?.mobileError || 'No screenshot'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Retake All */}
          <div className="flex justify-center">
            <button
              onClick={handleCapture}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retake All Screenshots
            </button>
          </div>

          {/* Info Box */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-400/20 bg-cyan-500/5">
            <p className="text-sm text-zinc-400">
              <span className="text-cyan-400 font-medium">Note:</span> Screenshots are stored as base64 data. When exporting, you'll need to upload these images to a hosting service (like Cloudinary, Unsplash, or your own server) and update the URLs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
