"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { App, CategoryId, Tag } from "@/lib/types";
import { CATEGORIES, TAGS } from "@/data/categories";
import { AppCard } from "@/components/app-card";
import { cn } from "@/lib/utils";

type QuickFilter = "all" | "trending" | "essential" | "recentlyAdded" | "verified";

const QUICK: { id: QuickFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "trending", label: "Trending" },
  { id: "essential", label: "Daily use" },
  { id: "recentlyAdded", label: "Recently added" },
  { id: "verified", label: "Verified only" },
];

export function AppsBrowser({ apps }: { apps: App[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [tag, setTag] = useState<Tag | "all">("all");
  const [quick, setQuick] = useState<QuickFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (tag !== "all" && !a.tags.includes(tag)) return false;
      if (quick === "trending" && !a.trending) return false;
      if (quick === "essential" && !a.essential) return false;
      if (quick === "recentlyAdded" && !a.recentlyAdded) return false;
      if (quick === "verified" && a.status !== "verified") return false;
      if (q && !a.name.toLowerCase().includes(q) && !a.tags.some((t) => t.toLowerCase().includes(q)))
        return false;
      return true;
    });
  }, [apps, query, category, tag, quick]);

  return (
    <div>
      {/* Search + quick filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <MagnifyingGlass size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary" weight="bold" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps by name or tag…"
            className="h-12 w-full rounded-[var(--radius)] border border-border bg-surface pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-border-strong"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {QUICK.map((f) => (
            <button
              key={f.id}
              onClick={() => setQuick(f.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                quick === f.id
                  ? "border-ink bg-ink text-bg"
                  : "border-border bg-surface text-ink-secondary hover:border-border-strong hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <FilterGroup label="Category">
            <FilterButton active={category === "all"} onClick={() => setCategory("all")}>
              All categories
            </FilterButton>
            {CATEGORIES.map((c) => (
              <FilterButton key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                {c.name}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="Tag">
            <div className="flex flex-wrap gap-1.5">
              <TagChip active={tag === "all"} onClick={() => setTag("all")}>All</TagChip>
              {TAGS.map((t) => (
                <TagChip key={t} active={tag === t} onClick={() => setTag(t)}>
                  {t}
                </TagChip>
              ))}
            </div>
          </FilterGroup>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-4 text-sm text-ink-tertiary">
            {filtered.length} {filtered.length === 1 ? "app" : "apps"}
          </p>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-sunken/40 px-6 py-16 text-center">
              <p className="text-sm font-medium text-ink">No apps match your filters.</p>
              <button
                onClick={() => {
                  setQuery(""); setCategory("all"); setTag("all"); setQuick("all");
                }}
                className="mt-3 text-sm text-ink-secondary underline underline-offset-4 hover:text-ink"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((a) => (
                <AppCard key={a.slug} app={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-tertiary">{label}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function FilterButton({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-sm transition-colors",
        active ? "bg-surface-sunken font-medium text-ink" : "text-ink-secondary hover:bg-surface-sunken/60 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function TagChip({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-2 py-0.5 text-[0.7rem] font-medium transition-colors",
        active ? "border-ink bg-ink text-bg" : "border-border text-ink-secondary hover:border-border-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
