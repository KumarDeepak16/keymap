"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { CopyButton } from "@/components/shortcut-actions";
import { Chip } from "@/components/badges";
import { cn } from "@/lib/utils";
import tipsData from "@/data/google-search-tips.json";

interface Tip {
  operator: string;
  example: string;
  description: string;
  category: string;
  official: boolean;
}

const TIPS = tipsData.tips as Tip[];
const CATEGORIES = ["All", ...Array.from(new Set(TIPS.map((t) => t.category)))];

export function SearchTips() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TIPS.filter((t) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (
        q &&
        !t.operator.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q) &&
        !t.example.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [query, cat]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="relative">
          <MagnifyingGlass size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary" weight="bold" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search operators…"
            type="search"
            spellCheck={false}
            aria-label="Search Google operators"
            className="h-12 w-full rounded-[var(--radius)] border border-border bg-surface pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-border-strong"
          />
        </div>
        <div className="scroll-thin -mb-1 flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                cat === c ? "border-ink bg-ink text-bg" : "border-border bg-surface text-ink-secondary hover:border-border-strong hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((t, i) => (
          <div
            key={i}
            className="group flex flex-col rounded-[var(--radius)] border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <div className="flex items-center justify-between gap-2">
              <code className="rounded-[var(--radius-sm)] bg-surface-sunken px-2 py-1 font-mono text-sm font-semibold text-ink">
                {t.operator}
              </code>
              <div className="flex items-center gap-2">
                {t.official && <Chip accent="green">Official</Chip>}
                <CopyButton text={t.example} label={`Copy example for ${t.operator}`} />
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{t.description}</p>
            <code className="mt-3 block truncate rounded-[var(--radius-sm)] border border-border bg-bg px-2.5 py-1.5 font-mono text-xs text-ink-tertiary">
              {t.example}
            </code>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-tertiary">No operators match “{query}”.</p>
      )}
    </div>
  );
}
