"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { App, AppShortcuts, Difficulty, Shortcut } from "@/lib/types";
import { ShortcutRow } from "@/components/shortcut-row";
import { KeyboardVisual } from "@/components/keyboard-visual";
import { DownloadPdf } from "@/components/download-pdf";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

export function AppDetail({ app, data }: { app: App; data: AppShortcuts }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  const categories = useMemo(() => {
    const set = new Set(data.shortcuts.map((s) => s.category));
    return ["all", ...Array.from(set)];
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.shortcuts.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (difficulty !== "all" && s.difficulty !== difficulty) return false;
      if (q && !s.action.toLowerCase().includes(q) && !s.category.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [data, query, category, difficulty]);

  // grouped by difficulty for the beginner -> advanced sections
  const grouped = useMemo(() => {
    const g: Record<Difficulty, Shortcut[]> = { beginner: [], intermediate: [], advanced: [] };
    for (const s of filtered) g[s.difficulty].push(s);
    return g;
  }, [filtered]);

  const activeFilters =
    (category !== "all" ? 1 : 0) + (difficulty !== "all" ? 1 : 0) + (query ? 1 : 0);

  return (
    <div className="gap-8 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:items-start">
      {/* Filters — a sidebar on desktop, a collapsible panel on mobile */}
      <aside className="lg:sticky lg:top-24 print:hidden">
        <div className="rounded-[var(--radius)] border border-border bg-surface p-4 lg:border-0 lg:bg-transparent lg:p-0">
          <div className="mb-4 flex items-center justify-between lg:mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
              Filter
            </p>
            {activeFilters > 0 && (
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setDifficulty("all");
                }}
                className="text-xs text-ink-secondary underline underline-offset-4 transition-colors hover:text-ink"
              >
                Clear ({activeFilters})
              </button>
            )}
          </div>

          <div className="relative mb-5">
            <MagnifyingGlass
              size={15}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-tertiary"
              weight="bold"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              aria-label={`Search ${data.shortcuts.length} shortcuts`}
              className="h-9 w-full rounded-[var(--radius-sm)] border border-border bg-surface pl-8 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-tertiary focus:border-border-strong"
            />
          </div>

          <FilterGroup label="Level">
            {(["all", ...DIFFICULTIES] as const).map((d) => (
              <FilterItem
                key={d}
                active={difficulty === d}
                onClick={() => setDifficulty(d)}
              >
                {d === "all" ? "All levels" : d}
              </FilterItem>
            ))}
          </FilterGroup>

          <FilterGroup label="Category">
            {categories.map((c) => (
              <FilterItem key={c} active={category === c} onClick={() => setCategory(c)}>
                {c === "all" ? "All categories" : c}
              </FilterItem>
            ))}
          </FilterGroup>

          <div className="mt-5">
            <DownloadPdf app={app} data={data} />
          </div>
        </div>
      </aside>

      <div className="mt-6 min-w-0 lg:mt-0">
        {/* Keyboard heatmap */}
        <div className="overflow-x-auto print:hidden">
          <div className="min-w-[560px]">
            <KeyboardVisual shortcuts={data.shortcuts} />
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="mt-8 space-y-10">
            {DIFFICULTIES.map((level) => {
              const items = grouped[level];
              if (items.length === 0) return null;
              return (
                <section key={level}>
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="font-serif text-lg capitalize text-ink">{level}</h2>
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-xs text-ink-tertiary">{items.length}</span>
                  </div>
                  <div className="divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
                    {items.map((s, i) => (
                      <ShortcutRow key={i} shortcut={s} appSlug={data.app} showDifficulty={false} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="mb-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-ink-tertiary">
        {label}
      </p>
      <div className="flex flex-wrap gap-1 lg:block lg:space-y-0.5">{children}</div>
    </div>
  );
}

function FilterItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors lg:w-full lg:rounded-[var(--radius-sm)] lg:border-0 lg:px-2 lg:py-1.5 lg:text-left lg:text-[0.82rem] lg:normal-case",
        active
          ? "border-ink bg-ink text-bg lg:bg-surface-sunken lg:font-medium lg:text-ink"
          : "border-border bg-surface text-ink-secondary hover:border-border-strong hover:text-ink lg:bg-transparent lg:hover:bg-surface-sunken/60",
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-sunken/40 px-6 py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface">
        <MagnifyingGlass size={22} className="text-ink-tertiary" weight="bold" />
      </div>
      <p className="text-sm font-medium text-ink">No shortcuts match{query ? ` “${query}”` : ""}.</p>
      <p className="mt-1 text-sm text-ink-secondary">Try clearing a filter or searching a different action.</p>
    </div>
  );
}
