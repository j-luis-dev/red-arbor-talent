import { create } from 'zustand';

type SplashState = {
  appReady: boolean;
  finishSplash: () => void;
};

export const useSplashStore = create<SplashState>((set) => ({
  appReady: false,
  finishSplash: () => set({ appReady: true }),
}));
