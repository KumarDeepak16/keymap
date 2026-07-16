"use client";

import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import type { Shortcut } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { Kbd } from "@/components/kbd";
import { KeyboardPeek } from "@/components/keyboard-peek";
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
      {/*
        Mobile stacks: the title gets the full width on its own line and the keys
        sit below it. Sharing one line costs the title ~120px on a 375px screen,
        which truncates most actions to nothing. Desktop keeps the single row.
      */}
      <div
        data-peek-row
        className="flex flex-col gap-2 py-3 pl-4 pr-2 transition-colors hover:bg-surface-sunken/60 sm:flex-row sm:items-center sm:gap-3"
      >
        {/* Tapping the label area opens the detail sheet on mobile; inert on desktop */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex min-w-0 flex-1 items-start gap-2 text-left sm:cursor-default sm:items-center"
          aria-label={`Details for ${shortcut.action}`}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[0.94rem] leading-snug text-ink sm:truncate">
              {shortcut.action}
            </span>
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
            className="mt-1 shrink-0 text-ink-tertiary sm:hidden"
            aria-hidden
          />
        </button>

        {/* Keys + actions share a line on mobile, keeping the row compact */}
        <div className="flex shrink-0 items-center gap-1">
          {combo ? (
            <KeyboardPeek combo={combo} action={shortcut.action}>
              <Kbd combo={combo} />
            </KeyboardPeek>
          ) : (
            <span className="text-sm italic text-ink-tertiary">n/a</span>
          )}

          {/* Actions — always visible on every device */}
          <div className="flex shrink-0 items-center">
            {combo && <CopyButton text={combo} label={`Copy ${shortcut.action} shortcut`} />}
            <FavoriteButton appSlug={appSlug} action={shortcut.action} />
          </div>
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
