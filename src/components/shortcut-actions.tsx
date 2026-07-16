"use client";

import { useState } from "react";
import { Copy, Check, Star } from "@phosphor-icons/react";
import { useKeymap, favId } from "@/lib/store";
import { copyToClipboard, cn } from "@/lib/utils";

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <button
      onClick={onCopy}
      aria-label={label ?? `Copy ${text}`}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-transparent text-ink-tertiary transition-colors",
        "hover:border-border hover:bg-surface-sunken hover:text-ink",
        copied && "text-[var(--green-ink)]",
      )}
    >
      {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
    </button>
  );
}

export function FavoriteButton({
  appSlug,
  action,
}: {
  appSlug: string;
  action: string;
}) {
  const id = favId(appSlug, action);
  const favorites = useKeymap((s) => s.favorites);
  const toggle = useKeymap((s) => s.toggleFavorite);
  const active = favorites.includes(id);

  return (
    <button
      onClick={() => toggle(id)}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-transparent transition-colors",
        "hover:border-border hover:bg-surface-sunken",
        active ? "text-[var(--yellow-ink)]" : "text-ink-tertiary hover:text-ink",
      )}
    >
      <Star size={16} weight={active ? "fill" : "bold"} />
    </button>
  );
}
