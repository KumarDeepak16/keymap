"use client";

import type { Shortcut } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { Kbd } from "@/components/kbd";
import { CopyButton, FavoriteButton } from "@/components/shortcut-actions";

export function MostUsed({ shortcuts, appSlug }: { shortcuts: Shortcut[]; appSlug: string }) {
  const os = useKeymap((s) => s.os);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {shortcuts.map((s, i) => {
        const combo = os === "mac" ? s.mac : s.windows;
        return (
          <div
            key={i}
            className="group flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong"
          >
            <span className="font-mono text-xs text-ink-tertiary">{String(i + 1).padStart(2, "0")}</span>
            <p className="min-w-0 flex-1 truncate text-sm text-ink">{s.action}</p>
            {combo && <Kbd combo={combo} />}
            <div className="flex items-center">
              {combo && <CopyButton text={combo} />}
              <FavoriteButton appSlug={appSlug} action={s.action} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
