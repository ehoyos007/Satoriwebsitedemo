import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Bypass Navigator Locks to prevent cross-tab AbortError from crashing REST
    // queries. supabase-js v2.95 calls getSession() on every REST query via
    // fetchWithAuth; when navigator.locks.request() aborts under multi-tab
    // contention, the AbortError propagates and kills all data fetches.
    // A no-op lock just runs the function directly. Worst case: duplicate token
    // refreshes across tabs, which is harmless for our scale (10-50 users).
    lock: async (_name, _acquireTimeout, fn) => await fn(),
  },
})
