"use client";

import { OutfitRecommendation, StyleProfile } from "@/types/style";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StyleState {
  profile: StyleProfile | null;
  latestLook: OutfitRecommendation | null;
  savedLooks: OutfitRecommendation[];
  moodboardSaves: string[];
  setProfile: (profile: StyleProfile) => void;
  setLatestLook: (look: OutfitRecommendation) => void;
  saveLook: (look: OutfitRecommendation) => void;
  removeLook: (id: string) => void;
  toggleMoodboardSave: (id: string) => void;
}

export const useStyleStore = create<StyleState>()(
  persist(
    (set, get) => ({
      profile: null,
      latestLook: null,
      savedLooks: [],
      moodboardSaves: [],
      setProfile: (profile) => set({ profile }),
      setLatestLook: (look) => set({ latestLook: look }),
      saveLook: (look) => {
        const existing = get().savedLooks.find((item) => item.id === look.id);
        if (existing) {
          return;
        }
        set({ savedLooks: [look, ...get().savedLooks] });
      },
      removeLook: (id) =>
        set({
          savedLooks: get().savedLooks.filter((look) => look.id !== id)
        }),
      toggleMoodboardSave: (id) => {
        const current = get().moodboardSaves;
        if (current.includes(id)) {
          set({ moodboardSaves: current.filter((item) => item !== id) });
          return;
        }
        set({ moodboardSaves: [...current, id] });
      }
    }),
    {
      name: "ai-style-oracle-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
