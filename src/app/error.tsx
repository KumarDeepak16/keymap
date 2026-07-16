"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for debugging; no external logging wired.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-[var(--maxw)] flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-sm text-ink-tertiary">Something broke</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">A key slipped</h1>
      <p className="mt-3 max-w-sm text-ink-secondary">
        An unexpected error interrupted this page. You can retry, or head back to
        the library.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-ink-tertiary">ref: {error.digest}</p>
      )}
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90 active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-[var(--radius-sm)] border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
