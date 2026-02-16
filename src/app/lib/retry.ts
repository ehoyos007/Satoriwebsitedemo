/**
 * Retry utilities for transient network/API failures.
 *
 * retryQuery  — wraps Supabase SDK calls that return { data, error }
 * retryFetch  — wraps fetch() calls, retries on network errors and 5xx
 */

interface SupabaseResult<T> {
  data: T | null;
  error: any;
}

/**
 * Retry a Supabase query on transient errors (network, timeout, 5xx).
 * Non-transient errors (4xx, RLS violations, etc.) are returned immediately.
 */
export async function retryQuery<T>(
  fn: () => PromiseLike<SupabaseResult<T>>,
  maxRetries = 2
): Promise<SupabaseResult<T>> {
  let result = await fn();

  for (let attempt = 1; attempt <= maxRetries && result.error; attempt++) {
    const msg = (result.error?.message || '').toLowerCase();
    const isTransient =
      msg.includes('fetch') ||
      msg.includes('network') ||
      msg.includes('timeout') ||
      msg.includes('socket') ||
      msg.includes('connection') ||
      (result.error?.status && result.error.status >= 500);

    if (!isTransient) break;

    await new Promise((r) => setTimeout(r, 1000 * attempt));
    result = await fn();
  }

  return result;
}

/**
 * Retry a fetch() call on network errors and 5xx responses.
 * 4xx responses are returned immediately without retry.
 */
export async function retryFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  maxRetries = 2
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(input, init);
      // Don't retry client errors (4xx) — only server errors (5xx)
      if (res.ok || res.status < 500) return res;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}
