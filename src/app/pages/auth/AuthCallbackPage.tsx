import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/app/lib/supabase';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Check for PKCE code in URL (OAuth redirect)
      const code = new URL(window.location.href).searchParams.get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          navigate('/portal', { replace: true });
          return;
        }
      }

      // Fallback: check for existing session (hash fragment flow)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/portal', { replace: true });
        return;
      }

      // No code and no session — redirect to login
      navigate('/login', { replace: true });
    };

    handleCallback();
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
