import { create } from "zustand";
import type { ThemePreference } from "@/types/settings";

export type ToastVariant = "default" | "warn";

export interface ActiveToast {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface UIStoreState {
  theme: ThemePreference;
  commandPaletteOpen: boolean;
  activeToast: ActiveToast | null;
  activeModal: string | null;
  setTheme: (theme: ThemePreference) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  writeMode: "guided" | "free";
  setWriteMode: (mode: "guided" | "free") => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  showToast: (toast: Omit<ActiveToast, "id">) => void;
  hideToast: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

let toastCounter = 0;

export const useUIStore = create<UIStoreState>((set) => ({
  theme: "system",
  commandPaletteOpen: false,
  activeToast: null,
  activeModal: null,
  writeMode: "free",
  setWriteMode: (mode) => set({ writeMode: mode }),
  sidebarCollapsed: false,

  setTheme: (theme) => set({ theme }),

  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  showToast: (toast) => set({ activeToast: { ...toast, id: ++toastCounter } }),

  hideToast: () => set({ activeToast: null }),

  openModal: (modalId) => set({ activeModal: modalId }),

  closeModal: () => set({ activeModal: null }),
}));