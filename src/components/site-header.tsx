"use client";

import Link from "next/link";
import { MagnifyingGlass, Command } from "@phosphor-icons/react";
import { OSToggle } from "@/components/os-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePalette } from "@/components/command-palette";

export function SiteHeader() {
  const open = usePalette((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-ink font-mono text-sm font-bold text-bg"
            aria-hidden
          >
            K
          </span>
          <span className="font-serif text-xl tracking-tight">KeyMap</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 text-sm md:flex">
          <Link href="/apps" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            All apps
          </Link>
          <Link href="/categories" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Categories
          </Link>
          <Link href="/favorites" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Favorites
          </Link>
          <Link href="/google-search-tips" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Search tips
          </Link>
        </nav>

        <div className="flex-1" />

        <button
          onClick={() => open()}
          className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface py-1.5 pl-3 pr-2 text-sm text-ink-tertiary transition-colors hover:border-border-strong hover:text-ink-secondary"
          aria-label="Open command palette"
        >
          <MagnifyingGlass size={16} weight="bold" />
          <span className="hidden sm:inline">Search shortcuts…</span>
          <span className="hidden items-center gap-0.5 rounded border border-border bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.65rem] sm:inline-flex">
            <Command size={10} weight="bold" />K
          </span>
        </button>

        <div className="hidden sm:block">
          <OSToggle />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
