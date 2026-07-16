"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OS, MyKey } from "@/lib/types";

export type Theme = "light" | "dark";

/** Unique id for a favorited shortcut: `${appSlug}::${action}` */
export type FavId = string;
export const favId = (appSlug: string, action: string): FavId =>
  `${appSlug}::${action}`;

/** Best-effort platform sniff. Server-safe: returns "windows" when there is no navigator. */
export function detectOS(): OS {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent;
  // iPadOS reports as Mac; both want ⌘ shortcuts, so this is the answer we want anyway.
  return /Mac|iPhone|iPad|iPod/i.test(ua) ? "mac" : "windows";
}

interface KeymapState {
  os: OS;
  setOS: (os: OS) => void;
  toggleOS: () => void;
  /** True once the user has picked an OS themselves — suppresses auto-detect. */
  osPinned: boolean;

  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  favorites: FavId[];
  toggleFavorite: (id: FavId) => void;
  isFavorite: (id: FavId) => boolean;

  recentApps: string[]; // app slugs, most-recent first
  visitApp: (slug: string) => void;

  /** Shortcuts the user typed in themselves — never leaves their browser. */
  myKeys: MyKey[];
  addMyKey: (k: Omit<MyKey, "id" | "added">) => void;
  updateMyKey: (id: string, patch: Partial<Omit<MyKey, "id" | "added">>) => void;
  removeMyKey: (id: string) => void;

  hydrated: boolean;
  setHydrated: () => void;
}

export const useKeymap = create<KeymapState>()(
  persist(
    (set, get) => ({
      // Placeholder only — the real value is detected on the client (see Providers),
      // because the static HTML is shared by every visitor.
      os: "windows",
      osPinned: false,
      setOS: (os) => set({ os, osPinned: true }),
      toggleOS: () =>
        set({ os: get().os === "windows" ? "mac" : "windows", osPinned: true }),

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

      myKeys: [],
      addMyKey: (k) =>
        set((s) => ({
          myKeys: [
            {
              ...k,
              id: `mk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
              added: new Date().toISOString().slice(0, 10),
            },
            ...s.myKeys,
          ],
        })),
      updateMyKey: (id, patch) =>
        set((s) => ({
          myKeys: s.myKeys.map((k) => (k.id === id ? { ...k, ...patch } : k)),
        })),
      removeMyKey: (id) => set((s) => ({ myKeys: s.myKeys.filter((k) => k.id !== id) })),

      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "keymap-store",
      partialize: (s) => ({
        os: s.os,
        osPinned: s.osPinned,
        theme: s.theme,
        favorites: s.favorites,
        recentApps: s.recentApps,
        myKeys: s.myKeys,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
