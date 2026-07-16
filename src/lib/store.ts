"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OS } from "@/lib/types";

export type Theme = "light" | "dark";

/** Unique id for a favorited shortcut: `${appSlug}::${action}` */
export type FavId = string;
export const favId = (appSlug: string, action: string): FavId =>
  `${appSlug}::${action}`;

interface KeymapState {
  os: OS;
  setOS: (os: OS) => void;
  toggleOS: () => void;

  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  favorites: FavId[];
  toggleFavorite: (id: FavId) => void;
  isFavorite: (id: FavId) => boolean;

  recentApps: string[]; // app slugs, most-recent first
  visitApp: (slug: string) => void;

  hydrated: boolean;
  setHydrated: () => void;
}

export const useKeymap = create<KeymapState>()(
  persist(
    (set, get) => ({
      os: "windows",
      setOS: (os) => set({ os }),
      toggleOS: () => set({ os: get().os === "windows" ? "mac" : "windows" }),

      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined")
          document.documentElement.setAttribute("data-theme", theme);
      },
      toggleTheme: () => get().setTheme(get().theme === "light" ? "dark" : "light"),

      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [id, ...s.favorites],
        })),
      isFavorite: (id) => get().favorites.includes(id),

      recentApps: [],
      visitApp: (slug) =>
        set((s) => ({
          recentApps: [slug, ...s.recentApps.filter((x) => x !== slug)].slice(0, 8),
        })),

      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "keymap-store",
      partialize: (s) => ({
        os: s.os,
        theme: s.theme,
        favorites: s.favorites,
        recentApps: s.recentApps,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
        // Default OS from platform on first ever load (favorites empty & no persisted os change won't help;
        // this only nudges when nothing stored yet — handled in Providers instead).
      },
    },
  ),
);
