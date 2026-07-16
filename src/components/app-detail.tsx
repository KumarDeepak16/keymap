"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, Printer } from "@phosphor-icons/react";
import type { AppShortcuts, Difficulty, Shortcut } from "@/lib/types";
import { ShortcutRow } from "@/components/shortcut-row";
import { KeyboardVisual } from "@/components/keyboard-visual";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

export function AppDetail({ data }: { data: AppShortcuts }) {
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

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-[var(--radius)] sm:border sm:px-4">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <MagnifyingGlass size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary" weight="bold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${data.shortcuts.length} shortcuts…`}
              className="h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface pl-10 pr-4 text-sm text-ink outline-none transition-colors focus:border-border-strong"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* difficulty */}
            <div className="inline-flex rounded-[var(--radius-sm)] border border-border bg-surface-sunken p-0.5">
              {(["all", ...DIFFICULTIES] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "rounded-[calc(var(--radius-sm)-2px)] px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                    difficulty === d ? "bg-surface text-ink shadow-[var(--shadow-card)]" : "text-ink-secondary hover:text-ink",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            <button
              onClick={() => window.print()}
              className="ml-auto inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-secondary transition-colors hover:text-ink print:hidden"
            >
              <Printer size={14} weight="bold" />
              Print / PDF
            </button>
          </div>

          {/* category chips */}
          <div className="scroll-thin -mb-1 flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                  category === c
                    ? "border-ink bg-ink text-bg"
                    : "border-border bg-surface text-ink-secondary hover:border-border-strong hover:text-ink",
                )}
              >
                {c === "all" ? "All categories" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard heatmap */}
      <div className="mt-6 overflow-x-auto print:hidden">
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
