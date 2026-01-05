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

const SCREENSHOT_API_BASE = 'https://api.screenshotone.com/take';

/**
 * Capture a screenshot of a website using ScreenshotOne API
 */
export async function captureScreenshot(options: ScreenshotOptions): Promise<ScreenshotResult> {
  const apiKey = import.meta.env.VITE_SCREENSHOT_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'Screenshot API key not configured. Please set VITE_SCREENSHOT_API_KEY in .env.local',
    };
  }

  try {
    // Build URL with query parameters
    const params = new URLSearchParams({
      access_key: apiKey,
      url: options.url,
      viewport_width: options.viewportWidth.toString(),
      viewport_height: options.viewportHeight.toString(),
      format: options.format || 'png',
      full_page: (options.fullPage ?? false).toString(),
      delay: (options.delay ?? 2).toString(), // Wait 2 seconds for page load
      block_ads: 'true',
      block_cookie_banners: 'true',
      block_trackers: 'true',
    });

    const response = await fetch(`${SCREENSHOT_API_BASE}?${params.toString()}`);

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Screenshot failed: ${response.status} - ${errorText}`,
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
