"use client";

import { Sun, Moon } from "@phosphor-icons/react";
import { useKeymap } from "@/lib/store";

export function ThemeToggle() {
  const theme = useKeymap((s) => s.theme);
  const toggleTheme = useKeymap((s) => s.toggleTheme);
  const hydrated = useKeymap((s) => s.hydrated);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-ink-secondary transition-colors hover:text-ink hover:bg-surface-sunken"
    >
      {/* render deterministically before hydration to avoid mismatch */}
      {hydrated && theme === "dark" ? (
        <Sun size={18} weight="bold" />
      ) : (
        <Moon size={18} weight="bold" />
      )}
    </button>
  );
}
