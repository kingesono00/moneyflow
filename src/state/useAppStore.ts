import { create } from 'zustand';

interface AppState {
  isOnboardingComplete: boolean;
  setOnboardingComplete: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboardingComplete: false,
  setOnboardingComplete: (value) => set({ isOnboardingComplete: value }),
}));
