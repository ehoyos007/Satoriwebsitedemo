// Screenshot API integration using ScreenshotOne
// Documentation: https://screenshotone.com/docs/

export interface ScreenshotOptions {
  url: string;
  viewportWidth: number;
  viewportHeight: number;
  fullPage?: boolean;
  format?: 'png' | 'jpeg' | 'webp';
  delay?: number; // Wait time in seconds before capture
}

export interface ScreenshotResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface CaptureProgress {
  desktop: 'pending' | 'capturing' | 'success' | 'error';
  mobile: 'pending' | 'capturing' | 'success' | 'error';
}

// All calls go through /api/screenshot serverless proxy (API key stays server-side)
const SCREENSHOT_PROXY_URL = '/api/screenshot';

/**
 * Capture a screenshot of a website via server-side proxy
 */
export async function captureScreenshot(options: ScreenshotOptions): Promise<ScreenshotResult> {
  try {
    const response = await fetch(SCREENSHOT_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: options.url,
        viewportWidth: options.viewportWidth,
        viewportHeight: options.viewportHeight,
        format: options.format || 'png',
        fullPage: options.fullPage ?? false,
        delay: options.delay ?? 2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `Screenshot failed: ${response.status}` }));
      return {
        success: false,
        error: errorData.error || `Screenshot failed: ${response.status}`,
      };
    }

    // Convert blob to base64 data URL
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    return {
      success: true,
      imageUrl: base64,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error capturing screenshot',
    };
  }
}

/**
 * Convert a Blob to a base64 data URL
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Capture both desktop and mobile screenshots
 */
export async function captureAllScreenshots(
  url: string,
  onProgress?: (progress: CaptureProgress) => void
): Promise<{
  desktop: ScreenshotResult;
  mobile: ScreenshotResult;
}> {
  const progress: CaptureProgress = {
    desktop: 'pending',
    mobile: 'pending',
  };

  // Capture desktop
  progress.desktop = 'capturing';
  onProgress?.(progress);

  const desktop = await captureScreenshot({
    url,
    viewportWidth: 1280,
    viewportHeight: 800,
    fullPage: false,
    format: 'png',
  });

  progress.desktop = desktop.success ? 'success' : 'error';
  onProgress?.(progress);

  // Capture mobile
  progress.mobile = 'capturing';
  onProgress?.(progress);

  const mobile = await captureScreenshot({
    url,
    viewportWidth: 375,
    viewportHeight: 667,
    fullPage: false,
    format: 'png',
  });

  progress.mobile = mobile.success ? 'success' : 'error';
  onProgress?.(progress);

  return { desktop, mobile };
}

/**
 * Generate a thumbnail from a base64 image using canvas
 * Resizes to a smaller width while maintaining aspect ratio
 */
export async function generateThumbnail(
  base64Image: string,
  maxWidth: number = 600
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate new dimensions
      const ratio = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * ratio;

      // Draw resized image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to base64
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = base64Image;
  });
}
