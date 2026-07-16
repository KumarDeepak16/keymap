"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A hairline progress bar under the header while a route resolves.
 * Deliberately dumb: it starts on click of any internal link, eases toward 90%,
 * and completes when the pathname actually changes.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  // Start on any same-origin navigation click.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)
        return;
      const link = (e.target as HTMLElement).closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("/") || link.target === "_blank") return;
      if (href === window.location.pathname) return;
      setActive(true);
      setProgress(8);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Creep toward 90% — never finish on a timer, only on arrival.
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.max(0.6, (90 - p) * 0.06)));
    }, 60);
    return () => clearInterval(t);
  }, [active]);

  // Arrived: snap to full, then fade out. Tracking the pathname we started from
  // keeps the completion a render-time transition instead of a setState cascade.
  const [startedAt, setStartedAt] = useState(pathname);
  if (startedAt !== pathname) {
    setStartedAt(pathname);
    if (active) setProgress(100);
  }

  useEffect(() => {
    if (progress !== 100) return;
    const t = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 220);
    return () => clearTimeout(t);
  }, [progress]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-16 z-50 h-[2px]"
      role="status"
      aria-label="Loading page"
    >
      <div
        className="h-full bg-ink transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      />
    </div>
  );
}
