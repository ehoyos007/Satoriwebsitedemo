import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use a resilient lock that falls back when Navigator Locks abort under
    // cross-tab contention (AbortError: signal is aborted without reason).
    // Without this, every REST query fails when multiple tabs are open because
    // getSession() → navigator.locks.request() abort propagates to fetchWithAuth.
    lock: async (_name, _acquireTimeout, fn) => {
      if (typeof navigator === 'undefined' || !navigator?.locks?.request) {
        return await fn()
      }
      try {
        return await navigator.locks.request(_name, { mode: 'exclusive' }, async () => {
          return await fn()
        })
      } catch {
        // Lock acquisition failed (AbortError, timeout, etc.) — run without lock.
        // Worst case: duplicate token refreshes across tabs, which is harmless.
        return await fn()
      }
    },
  },
})
