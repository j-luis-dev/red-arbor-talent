import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const PREFERENCES_KEY = '@app/preferences';

export type ColorScheme = 'light' | 'dark';
export type Locale = 'es' | 'en';

type PreferencesState = {
  colorScheme: ColorScheme;
  locale: Locale;
  setColorScheme: (scheme: ColorScheme) => void;
  setLocale: (locale: Locale) => void;
};

const asyncStorageAdapter = {
  getItem: (name: string) => AsyncStorage.getItem(name),
  setItem: (name: string, value: string) => AsyncStorage.setItem(name, value),
  removeItem: (name: string) => AsyncStorage.removeItem(name),
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      colorScheme: 'light',
      locale: 'en',
      setColorScheme: (colorScheme) => set({ colorScheme }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: PREFERENCES_KEY,
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({ colorScheme: state.colorScheme, locale: state.locale }),
    }
  )
);
