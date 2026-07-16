"use client";

import { useEffect } from "react";
import { useKeymap } from "@/lib/store";
import { CommandPalette } from "@/components/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  const setHydrated = useKeymap((s) => s.setHydrated);
  const theme = useKeymap((s) => s.theme);

  useEffect(() => {
    // Keep <html data-theme> in sync with the store after hydration.
    document.documentElement.setAttribute("data-theme", theme);
    setHydrated();
  }, [theme, setHydrated]);

  return (
    <>
      {children}
      <CommandPalette />
    </>
  );
}
