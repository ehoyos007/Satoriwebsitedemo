import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'satori-services-notes';
const USER_ID = 'admin';

interface UseNotesReturn {
  notes: Record<string, string>;
  setNote: (serviceId: string, content: string) => void;
  isLoading: boolean;
  syncStatus: 'local' | 'cloud' | 'syncing' | 'error';
}

export function useSupabaseNotes(): UseNotesReturn {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'local' | 'cloud' | 'syncing' | 'error'>(
    isSupabaseConfigured ? 'syncing' : 'local'
  );

  // Load initial data
  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);

      // Load from localStorage first
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) {
        setNotes(JSON.parse(localData));
      }

      // If Supabase is configured, fetch from cloud
      if (isSupabaseConfigured && supabase) {
        try {
          setSyncStatus('syncing');
          const { data, error } = await supabase
            .from('service_notes')
            .select('service_id, content')
            .eq('user_id', USER_ID);

          if (error) throw error;

          if (data && data.length > 0) {
            const cloudNotes: Record<string, string> = {};
            data.forEach((row) => {
              cloudNotes[row.service_id] = row.content;
            });
            setNotes(cloudNotes);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudNotes));
          }
          setSyncStatus('cloud');
        } catch (error) {
          console.error('Failed to load notes from Supabase:', error);
          setSyncStatus('error');
        }
      } else {
        setSyncStatus('local');
      }

      setIsLoading(false);
    };

    loadNotes();
  }, []);

  // Set a note for a service
  const setNote = useCallback(async (serviceId: string, content: string) => {
    // Optimistic update
    setNotes((prev) => {
      const updated = { ...prev, [serviceId]: content };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    // Sync to Supabase
    if (isSupabaseConfigured && supabase) {
      setSyncStatus('syncing');
      try {
        if (content.trim()) {
          const { error } = await supabase
            .from('service_notes')
            .upsert(
              { user_id: USER_ID, service_id: serviceId, content },
              { onConflict: 'user_id,service_id' }
            );
          if (error) throw error;
        } else {
          // Delete empty notes
          await supabase
            .from('service_notes')
            .delete()
            .eq('user_id', USER_ID)
            .eq('service_id', serviceId);
        }
        setSyncStatus('cloud');
      } catch (error) {
        console.error('Failed to sync note:', error);
        setSyncStatus('error');
      }
    }
  }, []);

  return {
    notes,
    setNote,
    isLoading,
    syncStatus,
  };
}
