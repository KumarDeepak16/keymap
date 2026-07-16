"use client";

import { useKeymap } from "@/lib/store";
import { cn } from "@/lib/utils";

export function OSToggle({ className }: { className?: string }) {
  const os = useKeymap((s) => s.os);
  const setOS = useKeymap((s) => s.setOS);

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border border-border bg-surface-sunken p-0.5 text-sm",
        className,
      )}
      role="tablist"
      aria-label="Operating system"
    >
      {(["windows", "mac"] as const).map((value) => {
        const active = os === value;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={active}
            onClick={() => setOS(value)}
            className={cn(
              "relative rounded-[calc(var(--radius-sm)-2px)] px-3 py-1 font-medium transition-colors",
              active
                ? "bg-surface text-ink shadow-[var(--shadow-card)]"
                : "text-ink-secondary hover:text-ink",
            )}
          >
            {value === "windows" ? "Windows" : "macOS"}
          </button>
        );
      })}
    </div>
  );
}
