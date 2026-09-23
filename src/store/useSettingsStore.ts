import { create } from "zustand";
import type { Settings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/types/settings";
import * as db from "@/lib/db/settings";

interface SettingsStoreState {
  settings: Settings;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  update: (partial: Partial<Settings>) => Promise<Settings>;
}

export const useSettingsStore = create<SettingsStoreState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  hydrated: false,

  hydrate: async () => {
    const stored = await db.getSettings();
    if (stored) {
      set({ settings: { ...DEFAULT_SETTINGS, ...stored }, hydrated: true });
    } else {
      await db.updateSettings(DEFAULT_SETTINGS);
      set({ hydrated: true });
    }
  },

  update: async (partial) => {
    const current = get().settings;
    const optimistic = { ...current, ...partial };
    set({ settings: optimistic });
    try {
      return await db.updateSettings(partial);
    } catch (error) {
      set({ settings: current });
      throw error;
    }
  },
}));

if (typeof window !== "undefined") {
  void useSettingsStore.getState().hydrate();
}