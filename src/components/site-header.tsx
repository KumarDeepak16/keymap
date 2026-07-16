"use client";

import Link from "next/link";
import { MagnifyingGlass, Command } from "@phosphor-icons/react";
import { OSToggle } from "@/components/os-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { KeymapLogo } from "@/components/keymap-logo";
import { MobileNav } from "@/components/mobile-nav";
import { usePalette } from "@/lib/palette-store";
import { useHeroSearchVisible } from "@/components/hero-search-sentinel";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const open = usePalette((s) => s.open);
  // A hero search box on screen makes this one redundant — fade it out.
  const heroVisible = useHeroSearchVisible((s) => s.visible);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <KeymapLogo />
          <span className="font-serif text-xl tracking-tight">KeyMap</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 text-sm lg:flex">
          <Link href="/apps" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            All apps
          </Link>
          <Link href="/categories" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Categories
          </Link>
          <Link href="/favorites" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Favorites
          </Link>
          <Link href="/my-keys" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            My Keys
          </Link>
          <Link href="/learn" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Learn
          </Link>
          <Link href="/learn/prompts" className="rounded-md px-3 py-1.5 text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink">
            Prompts
          </Link>
        </nav>

        <div className="flex-1" />

        {/*
          The hero-search fade only applies from sm up. On mobile the hero sits
          far below the fold, so hiding this would leave no way to search at all.
        */}
        <button
          onClick={() => open()}
          tabIndex={heroVisible ? -1 : undefined}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface py-1.5 pl-2.5 pr-2 text-sm text-ink-tertiary transition-all duration-200 hover:border-border-strong hover:text-ink-secondary sm:pl-3",
            heroVisible && "sm:pointer-events-none sm:-translate-y-1 sm:opacity-0",
          )}
          aria-label="Search shortcuts"
        >
          <MagnifyingGlass size={16} weight="bold" />
          <span className="hidden lg:inline">Search shortcuts…</span>
          <span className="hidden items-center gap-0.5 rounded border border-border bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.65rem] lg:inline-flex">
            <Command size={10} weight="bold" />K
          </span>
        </button>

        <div className="hidden sm:block">
          <OSToggle />
        </div>
        <ThemeToggle />

        {/* Last in the row — the conventional position for a menu toggle. */}
        <MobileNav />
      </div>
    </header>
  );
}
