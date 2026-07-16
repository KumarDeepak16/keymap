"use client";

import type { Shortcut } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { Sheet } from "@/components/sheet";
import { Kbd } from "@/components/kbd";
import { DifficultyBadge, Chip } from "@/components/badges";
import { CopyButton, FavoriteButton } from "@/components/shortcut-actions";

/** Detail sheet for a single shortcut — shows both OS combos + big actions. */
export function ShortcutSheet({
  shortcut,
  appSlug,
  open,
  onClose,
}: {
  shortcut: Shortcut | null;
  appSlug: string;
  open: boolean;
  onClose: () => void;
}) {
  const os = useKeymap((s) => s.os);
  if (!shortcut) return null;

  const primary = os === "mac" ? shortcut.mac : shortcut.windows;

  return (
    <Sheet open={open} onClose={onClose} title={shortcut.action}>
      <div className="flex flex-wrap items-center gap-2">
        <Chip accent="neutral">{shortcut.category}</Chip>
        <DifficultyBadge level={shortcut.difficulty} />
      </div>

      <div className="mt-4 space-y-2">
        <ComboRow label="Windows / Linux" combo={shortcut.windows} active={os === "windows"} />
        <ComboRow label="macOS" combo={shortcut.mac} active={os === "mac"} />
      </div>

      <div className="mt-5 flex items-center gap-2">
        {primary ? (
          <CopyBig text={primary} />
        ) : (
          <span className="text-sm text-ink-tertiary">Not available on {os === "mac" ? "macOS" : "Windows"}.</span>
        )}
        <div className="ml-auto flex items-center">
          <FavoriteButton appSlug={appSlug} action={shortcut.action} />
        </div>
      </div>
    </Sheet>
  );
}

function ComboRow({ label, combo, active }: { label: string; combo: string; active: boolean }) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-[var(--radius)] border px-3 py-2.5"
      style={{ borderColor: active ? "var(--border-strong)" : "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-ink-secondary">{label}</span>
        {active && <Chip accent="green">Current</Chip>}
      </div>
      {combo ? (
        <div className="flex items-center gap-1">
          <Kbd combo={combo} />
          <CopyButton text={combo} label={`Copy ${label} shortcut`} />
        </div>
      ) : (
        <span className="text-sm text-ink-tertiary italic">—</span>
      )}
    </div>
  );
}

function CopyBig({ text }: { text: string }) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <CopyButton text={text} />
      <span className="text-sm text-ink-secondary">Tap to copy the current-OS shortcut</span>
    </div>
  );
}
