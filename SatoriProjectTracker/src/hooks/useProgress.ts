import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'satori-project-tracker-progress';
const USER_ID = 'admin'; // Single user for now

interface UseProgressReturn {
  completedTasks: Record<string, boolean>;
  toggleTask: (taskKey: string) => void;
  resetProgress: (defaults: Record<string, boolean>) => void;
  isLoading: boolean;
  isSynced: boolean;
  lastSaved: string | null;
  syncStatus: 'local' | 'cloud' | 'syncing' | 'error';
}

export function useProgress(defaultCompletedTasks: Record<string, boolean>): UseProgressReturn {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(defaultCompletedTasks);
  const [isLoading, setIsLoading] = useState(true);
  const [isSynced, setIsSynced] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'local' | 'cloud' | 'syncing' | 'error'>(
    isSupabaseConfigured ? 'syncing' : 'local'
  );

  // Load initial data
  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);

      // First, try to load from localStorage as a quick start
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) {
        const parsed = JSON.parse(localData);
        setCompletedTasks({ ...defaultCompletedTasks, ...parsed });
      }

      // If Supabase is configured, fetch from cloud
      if (isSupabaseConfigured && supabase) {
        try {
          setSyncStatus('syncing');
          const { data, error } = await supabase
            .from('project_progress')
            .select('task_key, completed')
            .eq('user_id', USER_ID);

          if (error) throw error;

          if (data && data.length > 0) {
            const cloudProgress: Record<string, boolean> = {};
            data.forEach((row) => {
              cloudProgress[row.task_key] = row.completed;
            });
            // Cloud data takes precedence
            setCompletedTasks({ ...defaultCompletedTasks, ...cloudProgress });
            // Sync local storage with cloud
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudProgress));
          } else {
            // No cloud data, sync local to cloud
            await syncLocalToCloud(completedTasks);
          }
          setSyncStatus('cloud');
          setIsSynced(true);
        } catch (error) {
          console.error('Failed to load from Supabase:', error);
          setSyncStatus('error');
        }
      } else {
        setSyncStatus('local');
      }

      setIsLoading(false);
    };

    loadProgress();
  }, []);

  // Sync local data to cloud
  const syncLocalToCloud = async (tasks: Record<string, boolean>) => {
    if (!isSupabaseConfigured || !supabase) return;

    const entries = Object.entries(tasks).filter(([_, completed]) => completed);
    if (entries.length === 0) return;

    const rows = entries.map(([task_key, completed]) => ({
      user_id: USER_ID,
      task_key,
      completed,
    }));

    try {
      const { error } = await supabase
        .from('project_progress')
        .upsert(rows, { onConflict: 'user_id,task_key' });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to sync to cloud:', error);
    }
  };

  // Toggle task completion
  const toggleTask = useCallback(async (taskKey: string) => {
    const newValue = !completedTasks[taskKey];

    // Optimistic update
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskKey]: newValue };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setLastSaved(new Date().toLocaleTimeString());

    // Sync to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      setSyncStatus('syncing');
      try {
        const { error } = await supabase
          .from('project_progress')
          .upsert(
            { user_id: USER_ID, task_key: taskKey, completed: newValue },
            { onConflict: 'user_id,task_key' }
          );

        if (error) throw error;
        setSyncStatus('cloud');
      } catch (error) {
        console.error('Failed to sync task:', error);
        setSyncStatus('error');
      }
    }
  }, [completedTasks]);

  // Reset progress
  const resetProgress = useCallback(async (defaults: Record<string, boolean>) => {
    setCompletedTasks(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    setLastSaved(new Date().toLocaleTimeString());

    if (isSupabaseConfigured && supabase) {
      setSyncStatus('syncing');
      try {
        // Delete all existing progress
        await supabase
          .from('project_progress')
          .delete()
          .eq('user_id', USER_ID);

        // Insert defaults
        await syncLocalToCloud(defaults);
        setSyncStatus('cloud');
      } catch (error) {
        console.error('Failed to reset in cloud:', error);
        setSyncStatus('error');
      }
    }
  }, []);

  return {
    completedTasks,
    toggleTask,
    resetProgress,
    isLoading,
    isSynced,
    lastSaved,
    syncStatus,
  };
}
