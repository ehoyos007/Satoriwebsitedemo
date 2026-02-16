import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/app/lib/supabase';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase client automatically handles the hash fragment token exchange.
    // We just need to wait for the session to be established, then redirect.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/portal', { replace: true });
      } else {
        // If no session yet, listen for auth state change
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
          if (newSession) {
            subscription.unsubscribe();
            navigate('/portal', { replace: true });
          }
        });

        // Timeout fallback — if no session after 5s, redirect to login
        const timeout = setTimeout(() => {
          subscription.unsubscribe();
          navigate('/login', { replace: true });
        }, 5000);

        return () => {
          clearTimeout(timeout);
          subscription.unsubscribe();
        };
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm">Completing sign in...</p>
      </div>
    </div>
  );
}
