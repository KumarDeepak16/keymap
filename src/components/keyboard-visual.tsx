"use client";

import { useMemo } from "react";
import type { Shortcut } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { parseCombo } from "@/lib/utils";
import { cn } from "@/lib/utils";

// A compact QWERTY layout for the heatmap.
const ROWS: string[][] = [
  ["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["Ctrl", "Alt", "Cmd", "Space", "Shift", "Tab", "Enter"],
];

const MODS = new Set(["Ctrl", "Alt", "Cmd", "Shift", "Tab", "Enter", "Esc", "Space", "Option"]);

/** Heatmap of how often each key appears across an app's shortcuts. */
export function KeyboardVisual({ shortcuts }: { shortcuts: Shortcut[] }) {
  const os = useKeymap((s) => s.os);

  const heat = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of shortcuts) {
      const combo = os === "mac" ? s.mac : s.windows;
      const { keys } = parseCombo(combo);
      for (const k of keys) {
        const key = k.length === 1 ? k.toUpperCase() : k;
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    }
    return map;
  }, [shortcuts, os]);

  const max = Math.max(1, ...heat.values());

  function intensity(key: string): number {
    const v = heat.get(key) ?? 0;
    return v === 0 ? 0 : Math.min(1, 0.25 + (v / max) * 0.75);
  }

  return (
    <div className="rounded-[var(--radius)] border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
          Key heatmap
        </p>
        <p className="text-xs text-ink-tertiary">Most-used keys for {os === "mac" ? "macOS" : "Windows"}</p>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1.5">
            {row.map((key) => {
              const a = intensity(key);
              const wide = key === "Space";
              const isMod = MODS.has(key);
              return (
                <div
                  key={key}
                  title={heat.get(key) ? `${key}: used ${heat.get(key)}×` : key}
                  className={cn(
                    "flex h-8 items-center justify-center rounded-[5px] border font-mono text-[0.62rem] transition-colors",
                    wide ? "w-24" : isMod ? "w-12" : "w-8",
                    a === 0
                      ? "border-border bg-surface-sunken text-ink-tertiary"
                      : "border-transparent text-ink",
                  )}
                  style={
                    a === 0
                      ? undefined
                      : {
                          background: `color-mix(in srgb, var(--purple-ink) ${Math.round(
                            a * 100,
                          )}%, var(--surface-sunken))`,
                          color: a > 0.55 ? "#fff" : "var(--ink)",
                        }
                  }
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
