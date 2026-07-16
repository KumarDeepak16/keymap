"use client";

import { useEffect } from "react";
import { X } from "@phosphor-icons/react";

/**
 * Bottom sheet on mobile, centered dialog on wider screens.
 * Controlled via `open`; closes on backdrop click or Esc.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    // lock background scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full max-w-md animate-[sheet-up_240ms_cubic-bezier(0.16,1,0.3,1)] rounded-t-[var(--radius-lg)] border border-border-strong bg-bg-elevated p-5 shadow-[var(--shadow-float)] sm:rounded-[var(--radius-lg)] sm:animate-[sheet-fade_180ms_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* grab handle (mobile) */}
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-strong sm:hidden" aria-hidden />

        <div className="mb-4 flex items-start justify-between gap-3">
          {title && <h2 className="font-serif text-lg leading-snug text-ink">{title}</h2>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-ink-tertiary transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
