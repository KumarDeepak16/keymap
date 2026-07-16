"use client";

import Link from "next/link";
import { Star } from "@phosphor-icons/react";
import { useKeymap } from "@/lib/store";
import { SHORTCUT_INDEX } from "@/data/shortcuts";
import { getApp } from "@/data/apps";
import { AppGlyph } from "@/components/app-glyph";
import { Kbd } from "@/components/kbd";
import { CopyButton, FavoriteButton } from "@/components/shortcut-actions";

export function FavoritesView() {
  const hydrated = useKeymap((s) => s.hydrated);
  const favorites = useKeymap((s) => s.favorites);
  const os = useKeymap((s) => s.os);

  if (!hydrated) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-14 w-full" />
        ))}
      </div>
    );
  }

  // Resolve fav ids -> shortcut records, group by app.
  const favSet = new Set(favorites);
  const items = SHORTCUT_INDEX.filter((s) => favSet.has(`${s.appSlug}::${s.action}`));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-sunken/40 px-6 py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
          <Star size={26} className="text-ink-tertiary" weight="bold" />
        </div>
        <h2 className="font-serif text-2xl text-ink">No favorites yet</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-secondary">
          Star any shortcut with the <Star size={14} weight="fill" className="inline align-text-bottom text-[var(--yellow-ink)]" /> icon
          and it lands here — saved on this device, ready when you need it.
        </p>
        <Link
          href="/apps"
          className="mt-6 inline-flex items-center rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90"
        >
          Find shortcuts to save
        </Link>
      </div>
    );
  }

  const byApp = new Map<string, typeof items>();
  for (const it of items) {
    const arr = byApp.get(it.appSlug) ?? [];
    arr.push(it);
    byApp.set(it.appSlug, arr);
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink-tertiary">{items.length} saved shortcuts</p>
      {Array.from(byApp.entries()).map(([slug, list]) => {
        const app = getApp(slug);
        if (!app) return null;
        return (
          <section key={slug}>
            <Link href={`/app/${slug}`} className="mb-3 inline-flex items-center gap-2.5 group">
              <AppGlyph app={app} size={30} />
              <span className="font-medium text-ink group-hover:underline underline-offset-4">{app.name}</span>
            </Link>
            <div className="divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
              {list.map((s, i) => {
                const combo = os === "mac" ? s.mac : s.windows;
                return (
                  <div key={i} className="group flex items-center gap-3 px-4 py-3">
                    <p className="min-w-0 flex-1 truncate text-sm text-ink">{s.action}</p>
                    {combo && <Kbd combo={combo} />}
                    <div className="flex items-center">
                      {combo && <CopyButton text={combo} />}
                      <FavoriteButton appSlug={s.appSlug} action={s.action} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
