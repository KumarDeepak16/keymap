"use client";

import type { Shortcut } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { Kbd } from "@/components/kbd";
import { KeyboardPeek } from "@/components/keyboard-peek";
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
            data-peek-row
            className="group flex flex-col gap-2 rounded-[var(--radius)] border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong sm:flex-row sm:items-center sm:gap-3"
          >
            <div className="flex min-w-0 items-center gap-3 sm:flex-1">
              <span className="font-mono text-xs text-ink-tertiary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="min-w-0 flex-1 text-sm leading-snug text-ink sm:truncate">
                {s.action}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1 pl-7 sm:pl-0">
              {combo && (
                <KeyboardPeek combo={combo} action={s.action}>
                  <Kbd combo={combo} />
                </KeyboardPeek>
              )}
              <div className="flex shrink-0 items-center">
                {combo && <CopyButton text={combo} />}
                <FavoriteButton appSlug={appSlug} action={s.action} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
