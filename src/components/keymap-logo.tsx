"use client";

import { useEffect, useState } from "react";

// 2x2 keycap cluster. Index order is the order they type.
const KEYS = [
  { x: 3, y: 3, label: "K" },
  { x: 15, y: 3, label: "E" },
  { x: 3, y: 15, label: "Y" },
  { x: 15, y: 15, label: "M" },
];

// A looping score: which key is down at each step, and for how long.
// null = a rest. Reads as typing, then a pause, then a chord.
const SCORE: Array<{ key: number | "all" | null; ms: number }> = [
  { key: 0, ms: 130 },
  { key: 1, ms: 130 },
  { key: 2, ms: 130 },
  { key: 3, ms: 130 },
  { key: null, ms: 900 },
  { key: "all", ms: 200 },
  { key: null, ms: 1400 },
];

/**
 * The mark: a keycap cluster that types itself on a loop.
 * Always running — it is the site's pulse, not a hover reward.
 * Pauses when the tab is hidden and stops entirely for reduced-motion.
 */
export function KeymapLogo() {
  const [down, setDown] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    let timer: number;

    function tick() {
      const { key, ms } = SCORE[step % SCORE.length];
      setDown(
        key === null
          ? new Set()
          : key === "all"
            ? new Set(KEYS.map((_, i) => i))
            : new Set([key]),
      );
      step++;
      timer = window.setTimeout(tick, ms);
    }

    // Don't animate in a background tab — it is wasted work.
    function onVisibility() {
      window.clearTimeout(timer);
      if (document.hidden) setDown(new Set());
      else tick();
    }

    tick();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-ink"
      aria-hidden
    >
      <svg viewBox="0 0 26 26" className="h-[22px] w-[22px]" fill="none">
        {KEYS.map((k, i) => {
          const isDown = down.has(i);
          return (
            <g
              key={k.label}
              style={{
                transform: isDown ? "translateY(1.3px)" : "none",
                transition: "transform 90ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* travel well — compresses as the cap sinks into it */}
              <rect
                x={k.x}
                y={k.y + 1.4}
                width={8}
                height={8}
                rx={1.8}
                className="fill-bg"
                style={{ opacity: isDown ? 0.16 : 0.4, transition: "opacity 90ms ease" }}
              />
              {/* the cap */}
              <rect
                x={k.x}
                y={k.y}
                width={8}
                height={8}
                rx={1.8}
                className="fill-bg"
                style={{ opacity: isDown ? 1 : 0.88, transition: "opacity 90ms ease" }}
              />
              <text
                x={k.x + 4}
                y={k.y + 5.9}
                textAnchor="middle"
                className="fill-ink font-sans"
                style={{ fontSize: "5.2px", fontWeight: 700 }}
              >
                {k.label}
              </text>
            </g>
          );
        })}
      </svg>
    </span>
  );
}
