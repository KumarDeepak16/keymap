"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { create } from "zustand";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { APPS } from "@/data/apps";
import { SHORTCUT_INDEX } from "@/data/shortcuts";
import { useKeymap } from "@/lib/store";
import { AppGlyph } from "@/components/app-glyph";
import { Kbd } from "@/components/kbd";
import { copyToClipboard } from "@/lib/utils";

interface PaletteState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export const usePalette = create<PaletteState>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));

export function CommandPalette() {
  const { isOpen, close, toggle } = usePalette();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const os = useKeymap((s) => s.os);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, close]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  // limit shortcut results for perf; cmdk filters client-side
  const shortcutResults = useMemo(() => {
    if (!query.trim()) return SHORTCUT_INDEX.slice(0, 6);
    return SHORTCUT_INDEX;
  }, [query]);

  if (!isOpen) return null;

  function go(href: string) {
    close();
    router.push(href);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
      onClick={close}
    >
      <div className="absolute inset-0 bg-ink/20 backdrop-blur-[2px]" />
      <Command
        label="Command palette"
        shouldFilter
        className="relative w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-bg-elevated shadow-[var(--shadow-float)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <MagnifyingGlass size={18} className="text-ink-tertiary" weight="bold" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search apps and shortcuts…"
            className="h-14 flex-1 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink-tertiary"
          />
          <kbd className="kbd text-[0.65rem]">Esc</kbd>
        </div>

        <Command.List className="scroll-thin max-h-[52vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-10 text-center text-sm text-ink-tertiary">
            No matches. Try a different app or action.
          </Command.Empty>

          <Command.Group
            heading="Apps"
            className="px-1 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-tertiary"
          >
            {APPS.map((app) => (
              <Command.Item
                key={app.slug}
                value={`app ${app.name} ${app.tags.join(" ")}`}
                onSelect={() => go(`/app/${app.slug}`)}
                className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-sm data-[selected=true]:bg-surface-sunken"
              >
                <AppGlyph app={app} size={28} />
                <span className="text-ink">{app.name}</span>
                {app.status === "coming-soon" && (
                  <span className="text-xs text-ink-tertiary">soon</span>
                )}
                <ArrowRight size={14} className="ml-auto text-ink-tertiary" />
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Shortcuts"
            className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-tertiary"
          >
            {shortcutResults.map((s, i) => {
              const combo = os === "mac" ? s.mac : s.windows;
              return (
                <Command.Item
                  key={`${s.appSlug}-${s.action}-${i}`}
                  value={`${s.action} ${s.appName} ${s.category}`}
                  onSelect={async () => {
                    if (combo) await copyToClipboard(combo);
                    go(`/app/${s.appSlug}`);
                  }}
                  className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-sm data-[selected=true]:bg-surface-sunken"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: s.appColor }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate text-ink">{s.action}</span>
                  <span className="shrink-0 text-xs text-ink-tertiary">{s.appName}</span>
                  {combo && <Kbd combo={combo} />}
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-ink-tertiary">
          <span className="flex items-center gap-1">
            <kbd className="kbd text-[0.6rem]">↩</kbd> to open · select a shortcut to copy
          </span>
          <span>{os === "mac" ? "macOS" : "Windows"}</span>
        </div>
      </Command>
    </div>
  );
}
