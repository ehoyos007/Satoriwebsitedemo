import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type Client = Database['public']['Tables']['clients']['Row'];

interface UseClientDataReturn {
  client: Client | null;
  loading: boolean;
  error: string | null;
}

export function useClientData(): UseClientDataReturn {
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setClient(null);
      setLoading(false);
      return;
    }

    async function fetchClient() {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await retryQuery(() =>
        supabase.from('clients').select('*').eq('user_id', user!.id).single()
      );

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = no rows returned (user has no client record yet)
        setError(fetchError.message);
      }
      setClient(data);
      setLoading(false);
    }

    fetchClient();
  }, [user]);

  return { client, loading, error };
}
