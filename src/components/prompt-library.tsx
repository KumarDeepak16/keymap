"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, Copy, Check, CaretDown } from "@phosphor-icons/react";
import type { LibraryPrompt, PromptCategoryId, PromptTool } from "@/lib/types";
import { PROMPTS, PROMPT_CATEGORIES, PROMPT_TOOLS, PROMPT_COUNTS } from "@/data/prompts";
import { Chip } from "@/components/badges";
import { copyToClipboard, cn } from "@/lib/utils";

type CategoryFilter = PromptCategoryId | "all";
type ToolFilter = PromptTool | "all";

export function PromptLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [tool, setTool] = useState<ToolFilter>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      // "Any"-tagged prompts work everywhere, so they survive every tool filter.
      if (tool !== "all" && !p.tools.includes(tool) && !p.tools.includes("Any")) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.useCase.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q)
      );
    });
  }, [query, category, tool]);

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-border bg-bg/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts…"
              aria-label="Search prompts"
              className="w-full rounded-[var(--radius-sm)] border border-border bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-tertiary focus:border-border-strong focus:outline-none"
            />
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <Select
              label="Category"
              value={category}
              onChange={(v) => setCategory(v as CategoryFilter)}
              className="min-w-0 flex-1 sm:flex-none"
              options={[
                { value: "all", label: `All categories (${PROMPTS.length})` },
                ...PROMPT_CATEGORIES.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${PROMPT_COUNTS[c.id] ?? 0})`,
                })),
              ]}
            />
            <Select
              label="Tool"
              value={tool}
              onChange={(v) => setTool(v as ToolFilter)}
              className="min-w-0 flex-1 sm:flex-none"
              options={[
                { value: "all", label: "All tools" },
                ...PROMPT_TOOLS.map((t) => ({ value: t, label: t })),
              ]}
            />
            <span className="hidden shrink-0 whitespace-nowrap text-xs text-ink-tertiary sm:inline">
              {results.length} of {PROMPTS.length}
            </span>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-dashed border-border-strong py-16 text-center">
          <p className="text-ink-secondary">No prompts match that.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
              setTool("all");
            }}
            className="mt-2 text-sm text-ink underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function PromptCard({ prompt }: { prompt: LibraryPrompt }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const category = PROMPT_CATEGORIES.find((c) => c.id === prompt.category);

  async function onCopy() {
    const ok = await copyToClipboard(prompt.prompt);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <article
      id={prompt.id}
      className="scroll-mt-40 overflow-hidden rounded-[var(--radius)] border border-border bg-surface"
    >
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {category && <Chip accent={category.accent}>{category.name}</Chip>}
            {prompt.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] font-medium text-ink-tertiary"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-lg leading-snug text-ink">{prompt.title}</h3>
          <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-secondary">
            {prompt.useCase}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-border px-2.5 py-1.5 text-xs font-medium text-ink-secondary transition-colors hover:border-border-strong hover:text-ink"
          >
            {open ? "Hide" : "View"}
            <CaretDown
              size={12}
              weight="bold"
              className={cn("transition-transform", open && "rotate-180")}
            />
          </button>
          <button
            onClick={onCopy}
            aria-label={`Copy prompt: ${prompt.title}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-xs font-medium transition-colors",
              copied
                ? "border-[var(--green-ink)] text-[var(--green-ink)]"
                : "border-border text-ink-secondary hover:border-border-strong hover:text-ink",
            )}
          >
            {copied ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {open && (
        <>
          <pre className="scroll-thin overflow-x-auto border-t border-border bg-surface-sunken/50 px-5 py-4 font-mono text-[0.78rem] leading-[1.65] text-ink">
            {prompt.prompt}
          </pre>
          <p className="border-t border-border px-5 py-3 text-[0.85rem] leading-relaxed text-ink-secondary">
            <span className="font-medium text-ink">Tip. </span>
            {prompt.tip}
          </p>
        </>
      )}
    </article>
  );
}

/**
 * Native select with a styled trigger. Native is deliberate: it gives us the
 * platform picker on mobile, which beats any custom dropdown on touch.
 */
function Select({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full cursor-pointer appearance-none truncate rounded-[var(--radius-sm)] border border-border bg-surface py-2 pl-3 pr-8 text-sm text-ink-secondary transition-colors",
          "hover:border-border-strong hover:text-ink focus:border-border-strong focus:outline-none",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-bg-elevated text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <CaretDown
        size={12}
        weight="bold"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-tertiary"
      />
    </div>
  );
}
