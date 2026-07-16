"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { MagnifyingGlass, Command as CommandIcon } from "@phosphor-icons/react";
import { APPS } from "@/data/apps";
import { SHORTCUT_INDEX } from "@/data/shortcuts";
import { useKeymap } from "@/lib/store";
import { AppGlyph } from "@/components/app-glyph";
import { Kbd } from "@/components/kbd";
import { usePalette } from "@/components/command-palette";
import { HeroSearchSentinel } from "@/components/hero-search-sentinel";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const os = useKeymap((s) => s.os);
  const openPalette = usePalette((s) => s.open);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return { apps: [], shortcuts: [] };
    const apps = APPS.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query)),
    ).slice(0, 4);
    const shortcuts = SHORTCUT_INDEX.filter(
      (s) =>
        s.action.toLowerCase().includes(query) ||
        s.appName.toLowerCase().includes(query),
    ).slice(0, 6);
    return { apps, shortcuts };
  }, [q]);

  const showResults = focused && q.trim().length > 0;
  const hasResults = results.apps.length > 0 || results.shortcuts.length > 0;

  return (
    <div ref={boxRef} className="relative mx-auto w-full max-w-2xl">
      <HeroSearchSentinel />
      <div className="relative">
        <MagnifyingGlass
          size={20}
          weight="bold"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary sm:left-5"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          placeholder="Search any shortcut…"
          type="search"
          enterKeyHint="search"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Search shortcuts and apps"
          className="h-14 w-full truncate rounded-[var(--radius-lg)] border border-border-strong bg-surface pl-12 pr-16 text-[0.98rem] text-ink shadow-[var(--shadow-card)] outline-none transition-shadow placeholder:text-ink-tertiary focus:border-ink focus:shadow-[var(--shadow-hover)] focus:ring-2 focus:ring-ink/10 sm:pl-14 sm:pr-28 [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button
          onClick={openPalette}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-surface-sunken px-2 py-1.5 font-mono text-[0.7rem] text-ink-tertiary transition-colors hover:text-ink sm:flex"
        >
          <CommandIcon size={12} weight="bold" />K
        </button>
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-bg-elevated shadow-[var(--shadow-float)]">
          {!hasResults && (
            <p className="px-4 py-8 text-center text-sm text-ink-tertiary">
              No matches for “{q}”. Try the command palette for a full search.
            </p>
          )}

          {results.apps.length > 0 && (
            <div className="border-b border-border p-2">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                Apps
              </p>
              {results.apps.map((a) => (
                <Link
                  key={a.slug}
                  href={`/app/${a.slug}`}
                  className="flex items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-sm hover:bg-surface-sunken"
                >
                  <AppGlyph app={a} size={26} />
                  <span className="text-ink">{a.name}</span>
                </Link>
              ))}
            </div>
          )}

          {results.shortcuts.length > 0 && (
            <div className="p-2">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                Shortcuts
              </p>
              {results.shortcuts.map((s, i) => {
                const combo = os === "mac" ? s.mac : s.windows;
                return (
                  <Link
                    key={i}
                    href={`/app/${s.appSlug}`}
                    className="flex items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-sm hover:bg-surface-sunken"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: s.appColor }}
                    />
                    <span className="min-w-0 flex-1 truncate text-ink">{s.action}</span>
                    <span className="shrink-0 text-xs text-ink-tertiary">{s.appName}</span>
                    {combo && <Kbd combo={combo} />}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
