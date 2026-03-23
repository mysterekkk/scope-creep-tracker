import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Currency } from '@/types/project';

interface SettingsStore {
  defaultCurrency: Currency;
  defaultHourlyRate: number;
  includeBranding: boolean;
  setDefaultCurrency: (c: Currency) => void;
  setDefaultHourlyRate: (r: number) => void;
  setIncludeBranding: (b: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      defaultCurrency: 'USD',
      defaultHourlyRate: 50,
      includeBranding: true,

      setDefaultCurrency: (c) => set({ defaultCurrency: c }),
      setDefaultHourlyRate: (r) => set({ defaultHourlyRate: r }),
      setIncludeBranding: (b) => set({ includeBranding: b }),
    }),
    { name: 'scope-creep-settings' },
  ),
);
