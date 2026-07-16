"use client";

import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import type { Shortcut } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { Kbd } from "@/components/kbd";
import { DifficultyBadge } from "@/components/badges";
import { CopyButton, FavoriteButton } from "@/components/shortcut-actions";
import { ShortcutSheet } from "@/components/shortcut-sheet";

export function ShortcutRow({
  shortcut,
  appSlug,
  showDifficulty = true,
}: {
  shortcut: Shortcut;
  appSlug: string;
  showDifficulty?: boolean;
}) {
  const os = useKeymap((s) => s.os);
  const combo = os === "mac" ? shortcut.mac : shortcut.windows;
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 py-3 pl-4 pr-2 transition-colors hover:bg-surface-sunken/60">
        {/* Tapping the label area opens the detail sheet on mobile; inert on desktop */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left sm:cursor-default"
          aria-label={`Details for ${shortcut.action}`}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.94rem] text-ink">{shortcut.action}</span>
            <span className="mt-0.5 flex items-center gap-2">
              <span className="text-xs text-ink-tertiary">{shortcut.category}</span>
              {showDifficulty && (
                <>
                  <span className="text-ink-tertiary">·</span>
                  <DifficultyBadge level={shortcut.difficulty} />
                </>
              )}
            </span>
          </span>
          <CaretRight
            size={14}
            weight="bold"
            className="shrink-0 text-ink-tertiary sm:hidden"
            aria-hidden
          />
        </button>

        <div className="shrink-0">
          {combo ? (
            <Kbd combo={combo} />
          ) : (
            <span className="text-sm text-ink-tertiary italic">n/a</span>
          )}
        </div>

        {/* Actions — always visible on every device */}
        <div className="flex shrink-0 items-center">
          {combo && <CopyButton text={combo} label={`Copy ${shortcut.action} shortcut`} />}
          <FavoriteButton appSlug={appSlug} action={shortcut.action} />
        </div>
      </div>

      <ShortcutSheet
        shortcut={sheetOpen ? shortcut : null}
        appSlug={appSlug}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
