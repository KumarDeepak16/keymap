"use client";

import { parseCombo, glyphForKey } from "@/lib/utils";

/**
 * Renders a shortcut combo as physical keys.
 * Handles "A+B+C", typed sequences "g i", and verbose ranges.
 */
export function Kbd({ combo, pressed }: { combo: string; pressed?: boolean }) {
  const { keys, sequence, raw } = parseCombo(combo);

  if (raw) {
    return <kbd className="kbd" style={{ height: "auto", padding: "0.15em 0.5em" }}>{raw}</kbd>;
  }

  if (keys.length === 0) {
    return <span className="text-ink-tertiary text-sm">—</span>;
  }

  return (
    <span className="inline-flex items-center gap-1 align-middle">
      {keys.map((k, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && (
            <span className="text-ink-tertiary text-[0.7em] select-none">
              {sequence ? "then" : "+"}
            </span>
          )}
          <kbd className="kbd" data-pressed={pressed ? "true" : undefined}>
            {glyphForKey(k)}
          </kbd>
        </span>
      ))}
    </span>
  );
}
