import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'satori-services-favorites';
const USER_ID = 'admin';

interface UseFavoritesReturn {
  favorites: string[];
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  isLoading: boolean;
  syncStatus: 'local' | 'cloud' | 'syncing' | 'error';
}

export function useSupabaseFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'local' | 'cloud' | 'syncing' | 'error'>(
    isSupabaseConfigured ? 'syncing' : 'local'
  );

  // Load initial data
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);

      // Load from localStorage first
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) {
        setFavorites(JSON.parse(localData));
      }

      // If Supabase is configured, fetch from cloud
      if (isSupabaseConfigured && supabase) {
        try {
          setSyncStatus('syncing');
          const { data, error } = await supabase
            .from('service_favorites')
            .select('service_id')
            .eq('user_id', USER_ID);

          if (error) throw error;

          if (data) {
            const cloudFavorites = data.map((row) => row.service_id);
            setFavorites(cloudFavorites);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudFavorites));
          }
          setSyncStatus('cloud');
        } catch (error) {
          console.error('Failed to load favorites from Supabase:', error);
          setSyncStatus('error');
        }
      } else {
        setSyncStatus('local');
      }

      setIsLoading(false);
    };

    loadFavorites();
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (serviceId: string) => {
    const isCurrentlyFavorite = favorites.includes(serviceId);
    const newFavorites = isCurrentlyFavorite
      ? favorites.filter((id) => id !== serviceId)
      : [...favorites, serviceId];

    // Optimistic update
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));

    // Sync to Supabase
    if (isSupabaseConfigured && supabase) {
      setSyncStatus('syncing');
      try {
        if (isCurrentlyFavorite) {
          // Remove favorite
          const { error } = await supabase
            .from('service_favorites')
            .delete()
            .eq('user_id', USER_ID)
            .eq('service_id', serviceId);
          if (error) throw error;
        } else {
          // Add favorite
          const { error } = await supabase
            .from('service_favorites')
            .insert({ user_id: USER_ID, service_id: serviceId });
          if (error) throw error;
        }
        setSyncStatus('cloud');
      } catch (error) {
        console.error('Failed to sync favorite:', error);
        setSyncStatus('error');
      }
    }
  }, [favorites]);

  // Check if service is favorite
  const isFavorite = useCallback((serviceId: string) => {
    return favorites.includes(serviceId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoading,
    syncStatus,
  };
}
