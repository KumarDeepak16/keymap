"use client";

import Link from "next/link";
import { getApp } from "@/data/apps";
import { useKeymap } from "@/lib/store";
import { AppGlyph } from "@/components/app-glyph";

export function RecentlyViewed() {
  const hydrated = useKeymap((s) => s.hydrated);
  const recentApps = useKeymap((s) => s.recentApps);

  if (!hydrated || recentApps.length === 0) return null;

  const apps = recentApps.map(getApp).filter(Boolean);

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-4 pt-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
          Recently viewed
        </span>
        {apps.map(
          (a) =>
            a && (
              <Link
                key={a.slug}
                href={`/app/${a.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 text-sm transition-colors hover:border-border-strong"
              >
                <AppGlyph app={a} size={22} />
                <span className="text-ink-secondary">{a.name}</span>
              </Link>
            ),
        )}
      </div>
    </section>
  );
}
