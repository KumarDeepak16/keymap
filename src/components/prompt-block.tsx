"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import type { PromptExample } from "@/lib/types";
import { copyToClipboard, cn } from "@/lib/utils";

/**
 * A copy-paste prompt example: the prompt verbatim in a mono block,
 * with a note underneath on why it works.
 */
export function PromptBlock({ example }: { example: PromptExample }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyToClipboard(example.prompt);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <figure className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-sunken/60 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-tertiary">
          {example.label}
        </span>
        <button
          onClick={onCopy}
          aria-label={`Copy prompt: ${example.label}`}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] border border-transparent px-2 py-1 text-xs font-medium transition-colors",
            "hover:border-border hover:bg-surface hover:text-ink",
            copied ? "text-[var(--green-ink)]" : "text-ink-tertiary",
          )}
        >
          {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="scroll-thin overflow-x-auto px-4 py-3.5 font-mono text-[0.8rem] leading-[1.65] text-ink">
        {example.prompt}
      </pre>

      <figcaption className="border-t border-border px-4 py-3 text-[0.85rem] leading-relaxed text-ink-secondary">
        {example.why}
      </figcaption>
    </figure>
  );
}
