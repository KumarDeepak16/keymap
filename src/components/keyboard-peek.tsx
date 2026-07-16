"use client";

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { parseCombo, cn } from "@/lib/utils";

// A near-full board. Deliberately wider than the heatmap's: shortcut data leans
// hard on arrows, punctuation and F-keys, and a combo we cannot draw shows nothing.
const ROWS: string[][] = [
  ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "↑"],
  ["Ctrl", "Alt", "Cmd", "Space", "Home", "End", "←", "↓", "→"],
];

const WIDE = new Set(["Space"]);
const MODS = new Set([
  "Ctrl", "Alt", "Cmd", "Shift", "Tab", "Enter", "Esc", "⌫", "Home", "End",
]);

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHover(cb: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

const ALIAS: Record<string, string> = {
  Command: "Cmd",
  Control: "Ctrl",
  Option: "Alt",
  Opt: "Alt",
  Return: "Enter",
  Escape: "Esc",
  Win: "Cmd",
  Delete: "⌫",
  Backspace: "⌫",
  Del: "⌫",
  Up: "↑",
  Down: "↓",
  Left: "←",
  Right: "→",
  Grave: "`",
  Plus: "=",
  Minus: "-",
};

/** Map a parsed token onto a cap in ROWS. Returns null for keys we don't draw. */
function capFor(token: string): string | null {
  const t = token.trim();
  if (!t) return null;
  const norm = ALIAS[t] ?? t;
  // Single letters normalize to the uppercase cap; "?" lives on "/", "+" on "=".
  const shifted: Record<string, string> = { "?": "/", "+": "=", "_": "-", "~": "`" };
  const resolved = shifted[norm] ?? (norm.length === 1 ? norm.toUpperCase() : norm);
  return ROWS.some((r) => r.includes(resolved)) ? resolved : null;
}

/**
 * Floating mini-keyboard that shows a combo being played on real keys.
 * Desktop only — it is driven by hover, which touch does not have.
 */
export function KeyboardPeek({
  combo,
  action,
  children,
}: {
  combo: string;
  /** What the shortcut does — shown as the panel's title. */
  action?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [lit, setLit] = useState<Set<string>>(new Set());
  const wrapRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Gate on pointer capability, not viewport width: a zoomed-in desktop window
  // reports a narrow CSS viewport but still has a real mouse.
  const canHover = useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false, // server: assume no hover, so nothing renders until hydration
  );

  // Memoised on `combo`: these feed effect dependencies, and rebuilding the
  // array every render would restart the animation loop on every render.
  const { caps, sequence, playable } = useMemo(() => {
    const { keys, sequence: seq, raw } = parseCombo(combo);
    const c = keys.map(capFor).filter((k): k is string => k !== null);
    return { caps: c, sequence: seq, playable: !raw && c.length > 0 };
  }, [combo]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  // Play the combo on a loop while hovered: modifiers hold, final key taps.
  useEffect(() => {
    if (!open || !playable) return;

    function run() {
      clearTimers();
      setLit(new Set());
      // Chords press cumulatively (Ctrl, then Ctrl+Shift, then Ctrl+Shift+P).
      // Sequences press one at a time (g, then i).
      caps.forEach((cap, i) => {
        timers.current.push(
          window.setTimeout(() => {
            setLit((prev) => {
              const next = sequence ? new Set<string>() : new Set(prev);
              next.add(cap);
              return next;
            });
          }, 260 + i * 220),
        );
      });
      timers.current.push(
        window.setTimeout(() => setLit(new Set()), 260 + caps.length * 220 + 500),
      );
    }

    run();
    const loop = window.setInterval(run, 260 + caps.length * 220 + 900);
    return () => {
      clearInterval(loop);
      clearTimers();
    };
  }, [open, playable, sequence, caps]);

  // Hovering anywhere on the row opens the peek — aiming at the small key badge
  // is fiddly. The badge still anchors the panel's position.
  useEffect(() => {
    if (!playable || !canHover) return;
    const badge = wrapRef.current;
    if (!badge) return;
    const row = badge.closest<HTMLElement>("[data-peek-row]") ?? badge.parentElement;
    if (!row) return;

    const onEnter = () => setOpen(true);
    const onLeave = () => setOpen(false);

    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);
    return () => {
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
    };
  }, [playable, canHover]);

  // Place once the panel is in the DOM so we can measure it — guessing its
  // height put the "above" placement on top of the row it describes.
  // useLayoutEffect: the portal must be measured and positioned before paint,
  // or the panel stays hidden at 0,0 and never appears.
  useLayoutEffect(() => {
    // No reset on close: the panel unmounts, so a stale pos cannot be shown —
    // and the next open measures again before paint.
    if (!open) return;
    const badge = wrapRef.current;
    const panel = panelRef.current;
    if (!badge || !panel) return;

    const r = badge.getBoundingClientRect();
    const row = badge.closest<HTMLElement>("[data-peek-row]") ?? badge;
    const rowRect = row.getBoundingClientRect();
    const GAP = 12;

    // Measure at natural size: the wrapper may already carry a scale from a
    // previous placement, and getBoundingClientRect reports the scaled box.
    const NATURAL_W = 500;
    const H0 = panel.offsetHeight;

    // documentElement.clientWidth, not window.innerWidth: innerWidth includes
    // the scrollbar, so clamping against it lets the panel run off the edge.
    const VW = document.documentElement.clientWidth;
    const VH = document.documentElement.clientHeight;

    // Never cover the row: the keys and copy/favourite buttons must stay
    // readable while the panel is up. Prefer above, then below, then beside.
    const bandAbove = rowRect.top - GAP * 2;
    const bandBelow = VH - rowRect.bottom - GAP * 2;
    const gutterLeft = rowRect.left - GAP * 2;
    const gutterRight = VW - rowRect.right - GAP * 2;

    // Pick the placement with the most room, then scale to whatever it allows.
    // Scaling beats overlapping: a smaller board is still readable, a covered
    // row is not.
    const options = [
      { side: "above" as const, room: bandAbove, limit: bandAbove / H0 },
      { side: "below" as const, room: bandBelow, limit: bandBelow / H0 },
      { side: "left" as const, room: gutterLeft, limit: gutterLeft / NATURAL_W },
      { side: "right" as const, room: gutterRight, limit: gutterRight / NATURAL_W },
    ];
    const best = options.reduce((a, b) => (b.limit > a.limit ? b : a));
    const scale = Math.max(0.55, Math.min(1, best.limit));

    const w = NATURAL_W * scale;
    const h = H0 * scale;

    let x: number;
    let y: number;

    if (best.side === "above" || best.side === "below") {
      y = best.side === "above" ? rowRect.top - h - GAP : rowRect.bottom + GAP;
      x = r.left + r.width / 2 - w / 2; // clear of the row, so centre on the badge
    } else {
      y = Math.max(GAP, Math.min(rowRect.top, VH - h - GAP));
      x = best.side === "left" ? rowRect.left - w - GAP : rowRect.right + GAP;
    }

    setWidth(scale < 1 ? w : undefined);
    setPos({
      x: Math.min(Math.max(x, GAP), Math.max(GAP, VW - w - GAP)),
      y: Math.min(Math.max(y, GAP), Math.max(GAP, VH - h - GAP)),
    });
  }, [open]);

  if (!playable || !canHover) return <>{children}</>;

  return (
    <span ref={wrapRef} className="inline-flex align-middle">
      {children}
      {open && (
        <Floating
          ref={panelRef}
          pos={pos}
          width={width}
          lit={lit}
          sequence={sequence}
          caps={caps}
          action={action}
        />
      )}
    </span>
  );
}

const Floating = forwardRef<
  HTMLDivElement,
  {
    pos: { x: number; y: number };
    lit: Set<string>;
    sequence: boolean;
    caps: string[];
    action?: string;
    /** Narrowed when the viewport cannot hold the full-width panel. */
    width?: number;
  }
>(function Floating({ pos, lit, sequence, caps, action, width }, ref) {
  // No `mounted` gate here: it would delay the ref by a paint, and the parent's
  // layout effect needs to measure this node before the browser paints it.
  // Rendering only happens client-side already (the parent gates on hover).

  // Invisible until placed — pos starts at 0,0 and would flash top-left.
  const placed = pos.x !== 0 || pos.y !== 0;

  return createPortal(
    <div
      className="pointer-events-none fixed z-50 animate-[sheet-fade_140ms_ease]"
      style={{
        left: pos.x,
        top: pos.y,
        visibility: placed ? "visible" : "hidden",
        // The board is built from fixed-size keycaps, so it cannot reflow.
        // On cramped viewports scale the whole panel down instead of clipping it.
        transform: width && width < 500 ? `scale(${width / 500})` : undefined,
        transformOrigin: "top left",
      }}
    >
      <div
        ref={ref}
        className="w-[500px] overflow-hidden rounded-[var(--radius)] border border-border-strong bg-bg-elevated p-3.5 shadow-[var(--shadow-float)]"
      >
        <div className="mb-3 border-b border-border pb-2.5">
          {action && (
            <p className="mb-1.5 truncate font-serif text-[0.95rem] leading-snug text-ink">
              {action}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            {/* Spell the combo out key by key — the board shows where, this says what. */}
            <span className="flex min-w-0 flex-wrap items-center gap-1">
              {caps.map((cap, i) => (
                <span key={`${cap}-${i}`} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-[0.6rem] text-ink-tertiary">
                      {sequence ? "then" : "+"}
                    </span>
                  )}
                  {/* Static reference — only the board below animates. */}
                  <span className="rounded-[3px] border border-border bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.62rem] font-medium text-ink-secondary">
                    {cap}
                  </span>
                </span>
              ))}
            </span>
            <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">
              {sequence ? "In sequence" : "Hold together"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((key) => {
                const on = lit.has(key);
                return (
                  <span
                    key={key}
                    className={cn(
                      "flex h-[26px] shrink-0 items-center justify-center rounded-[5px] border font-mono text-[0.6rem] transition-all duration-100",
                      WIDE.has(key)
                        ? "w-[100px]"
                        : MODS.has(key)
                          ? "w-[40px]"
                          : "w-[26px]",
                      on
                        ? "translate-y-[2px] border-transparent font-semibold text-white"
                        : "border-border-strong text-ink-tertiary",
                    )}
                    style={
                      on
                        ? {
                            background: "var(--purple-ink)",
                            boxShadow:
                              "inset 0 1px 2px 0 color-mix(in srgb, black 30%, transparent)",
                          }
                        : {
                            background:
                              "linear-gradient(180deg, color-mix(in srgb, var(--surface) 90%, white 5%) 0%, var(--surface-sunken) 100%)",
                            boxShadow:
                              "inset 0 1px 0 0 color-mix(in srgb, white 18%, transparent), 0 2px 0 0 color-mix(in srgb, var(--border-strong) 70%, var(--ink) 30%)",
                          }
                    }
                  >
                    {key}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
});
