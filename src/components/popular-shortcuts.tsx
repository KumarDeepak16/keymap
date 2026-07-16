"use client";

import Link from "next/link";
import { SHORTCUT_INDEX } from "@/data/shortcuts";
import { useKeymap } from "@/lib/store";
import { Kbd } from "@/components/kbd";
import { CopyButton } from "@/components/shortcut-actions";

// A curated "everyone should know these" set, referenced by app + action.
const PICKS: [string, string][] = [
  ["vscode", "Show command palette"],
  ["chrome", "Reopen last closed tab"],
  ["windows", "Region screenshot to clipboard"],
  ["macos", "Open Spotlight search"],
  ["excel", "Insert current date"],
  ["figma", "Zoom to fit"],
  ["slack", "Jump to a conversation"],
  ["notion", "Open block action menu"],
];

export function PopularShortcuts() {
  const os = useKeymap((s) => s.os);

  const items = PICKS.map(([slug, action]) =>
    SHORTCUT_INDEX.find((s) => s.appSlug === slug && s.action === action),
  ).filter(Boolean);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((s, i) => {
        if (!s) return null;
        const combo = os === "mac" ? s.mac : s.windows;
        return (
          <div
            key={i}
            className="group flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: s.appColor }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-ink">{s.action}</p>
              <Link
                href={`/app/${s.appSlug}`}
                className="text-xs text-ink-tertiary hover:text-ink-secondary"
              >
                {s.appName}
              </Link>
            </div>
            {combo && <Kbd combo={combo} />}
            {combo && <CopyButton text={combo} />}
          </div>
        );
      })}
    </div>
  );
}
