"use client";

import { useState } from "react";
import { FilePdf, CircleNotch } from "@phosphor-icons/react";
import type { App, AppShortcuts } from "@/lib/types";
import { useKeymap } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Generates the cheat sheet PDF in the browser on click.
 *
 * @react-pdf/renderer is ~450KB, so it is imported inside the handler rather
 * than at module scope: nobody pays for it until they actually ask for a PDF.
 */
export function DownloadPdf({ app, data }: { app: App; data: AppShortcuts }) {
  const os = useKeymap((s) => s.os);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onDownload() {
    setBusy(true);
    setFailed(false);
    try {
      const [{ pdf }, { CheatSheet }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/pdf/cheat-sheet"),
      ]);

      const blob = await pdf(
        <CheatSheet app={app} data={data} os={os} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `keymap-${app.slug}-shortcuts-${os}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Surface the failure rather than leaving a spinner spinning forever.
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onDownload}
      disabled={busy}
      className={cn(
        "inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-xs font-medium transition-colors",
        failed
          ? "border-[var(--red-ink)] text-[var(--red-ink)]"
          : "text-ink-secondary hover:border-border-strong hover:text-ink",
        busy && "cursor-wait opacity-70",
      )}
    >
      {busy ? (
        <>
          <CircleNotch size={14} weight="bold" className="animate-spin" />
          Building…
        </>
      ) : failed ? (
        "Failed — try again"
      ) : (
        <>
          <FilePdf size={14} weight="bold" />
          Download PDF
        </>
      )}
    </button>
  );
}
