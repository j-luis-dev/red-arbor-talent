import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const FAVORITES_KEY = '@favorites';

interface FavoritesState {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  removeFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id: number) => {
        set((state) => {
          const has = state.favoriteIds.includes(id);
          const next = has
            ? state.favoriteIds.filter((x) => x !== id)
            : [...state.favoriteIds, id];
          return { favoriteIds: next };
        });
      },
      isFavorite: (id: number) => get().favoriteIds.includes(id),
      removeFavorite: (id: number) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((x) => x !== id),
        }));
      },
    }),
    {
      name: FAVORITES_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
