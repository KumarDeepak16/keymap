"use client";

import { useEffect } from "react";
import { create } from "zustand";

/** True while a hero search box is on screen — the header hides its own search then. */
export const useHeroSearchVisible = create<{
  visible: boolean;
  set: (v: boolean) => void;
}>((set) => ({
  visible: false,
  set: (visible) => set({ visible }),
}));

/**
 * Renders nothing. Wrap it around nothing — just place it next to a hero search
 * box and the header will suppress its duplicate search button while it is in view.
 */
export function HeroSearchSentinel() {
  const set = useHeroSearchVisible((s) => s.set);

  useEffect(() => {
    const el = document.getElementById("hero-search-sentinel");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => set(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);

    // The header must not stay hidden if this unmounts on navigation.
    return () => {
      observer.disconnect();
      set(false);
    };
  }, [set]);

  return <div id="hero-search-sentinel" aria-hidden />;
}
