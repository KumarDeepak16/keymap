"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useKeymap, detectOS } from "@/lib/store";
import { usePalette } from "@/lib/palette-store";
import { RouteProgress } from "@/components/route-progress";

/**
 * The palette carries the full shortcut index (~230KB) so that ⌘K can search
 * everything. Loading it eagerly put that weight on every route's first paint.
 * It now arrives only once the palette is actually opened.
 */
const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((m) => m.CommandPalette),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const setHydrated = useKeymap((s) => s.setHydrated);
  const theme = useKeymap((s) => s.theme);
  const hydrated = useKeymap((s) => s.hydrated);
  const paletteOpen = usePalette((s) => s.isOpen);

  useEffect(() => {
    // Keep <html data-theme> in sync with the store after hydration.
    document.documentElement.setAttribute("data-theme", theme);
    setHydrated();
  }, [theme, setHydrated]);

  useEffect(() => {
    // Default the OS toggle to the visitor's actual platform. The static HTML
    // ships "windows" for everyone, so a Mac visitor would otherwise read the
    // wrong column until they noticed the toggle.
    // Gated on `hydrated` so a stored choice is loaded before we look at it —
    // otherwise this races rehydration and overwrites the user's own pick.
    if (!hydrated) return;
    const { osPinned, os } = useKeymap.getState();
    if (osPinned) return;
    const detected = detectOS();
    if (detected !== os) useKeymap.setState({ os: detected });
  }, [hydrated]);

  // Keep the ⌘K binding here so the shortcut works before the palette has loaded.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        usePalette.getState().toggle();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <RouteProgress />
      {children}
      {paletteOpen && <CommandPalette />}
    </>
  );
}
