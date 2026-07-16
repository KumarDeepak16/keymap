import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { App } from "@/lib/types";
import { AppGlyph } from "@/components/app-glyph";
import { Chip } from "@/components/badges";
import { SHORTCUT_COUNTS } from "@/data/shortcuts";

export function AppCard({ app }: { app: App }) {
  const count = SHORTCUT_COUNTS[app.slug];
  const comingSoon = app.status === "coming-soon";

  return (
    <Link
      href={`/app/${app.slug}`}
      className="group relative flex flex-col rounded-[var(--radius)] border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-hover)]"
    >
      <div className="flex items-start justify-between">
        <AppGlyph app={app} size={44} />
        <ArrowUpRight
          size={16}
          weight="bold"
          className="text-ink-tertiary opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      <h3 className="mt-4 font-medium text-ink">{app.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-ink-secondary">{app.blurb}</p>

      <div className="mt-4 flex items-center gap-2">
        {comingSoon ? (
          <Chip accent="neutral">Coming soon</Chip>
        ) : (
          <span className="text-xs font-medium text-ink-tertiary">
            {count} shortcuts
          </span>
        )}
      </div>
    </Link>
  );
}
