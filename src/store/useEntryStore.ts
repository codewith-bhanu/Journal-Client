import { create } from "zustand";
import type { Entry, DraftEntry } from "@/types/entry";
import * as db from "@/lib/db/entries";

interface EntryStoreState {
  draft: DraftEntry;
  recentEntries: Entry[];
  setDraft: (draft: DraftEntry) => void;
  setDraftField: <K extends keyof Entry>(field: K, value: Entry[K]) => void;
  resetDraft: () => void;
  getEntry: (date: string) => Promise<Entry | undefined>;
  listEntries: (range?: db.EntryListRange) => Promise<Entry[]>;
  upsertEntry: (entry: Entry) => Promise<void>;
  deleteEntry: (date: string) => Promise<void>;
  clearAll: () => Promise<void>;
  searchEntries: (query: string) => Promise<Entry[]>;
}

const MAX_RECENT = 12;

function byNewest(a: Entry, b: Entry): number {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

export const useEntryStore = create<EntryStoreState>((set) => ({
  draft: {},
  recentEntries: [],

  setDraft: (draft) => set({ draft }),

  setDraftField: (field, value) =>
    set((state) => ({ draft: { ...state.draft, [field]: value } })),

  resetDraft: () => set({ draft: {} }),

  getEntry: async (date) => {
    const entry = await db.getEntry(date);
    if (entry) {
      set((state) => ({
        recentEntries: [entry, ...state.recentEntries.filter((e) => e.date !== date)]
          .sort(byNewest)
          .slice(0, MAX_RECENT),
      }));
    }
    return entry;
  },

  listEntries: async (range) => {
    const entries = await db.listEntries(range);
    set((state) => {
      const merged = new Map(state.recentEntries.map((e) => [e.date, e]));
      for (const entry of entries) merged.set(entry.date, entry);
      return {
        recentEntries: [...merged.values()].sort(byNewest).slice(0, MAX_RECENT),
      };
    });
    return entries;
  },

  upsertEntry: async (entry) => {
    set((state) => ({
      recentEntries: [
        entry,
        ...state.recentEntries.filter((e) => e.date !== entry.date),
      ]
        .sort(byNewest)
        .slice(0, MAX_RECENT),
    }));
    await db.upsertEntry(entry);
  },

  deleteEntry: async (date) => {
    set((state) => ({
      recentEntries: state.recentEntries.filter((e) => e.date !== date),
    }));
    await db.deleteEntry(date);
  },

  clearAll: async () => {
    await db.deleteAllEntries();
    set({ recentEntries: [], draft: {} });
  },

  searchEntries: async (query) => db.searchEntries(query),
}));