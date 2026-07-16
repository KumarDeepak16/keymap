import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowSquareOut, SealCheck, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { APPS, getApp } from "@/data/apps";
import { getShortcuts } from "@/data/shortcuts";
import { CATEGORIES } from "@/data/categories";
import { formatVerified } from "@/lib/utils";
import { AppGlyph } from "@/components/app-glyph";
import { Chip } from "@/components/badges";
import { OSToggle } from "@/components/os-toggle";
import { AppDetail } from "@/components/app-detail";
import { MostUsed } from "@/components/most-used";
import { AppCard } from "@/components/app-card";
import { VisitTracker } from "@/components/visit-tracker";

export function generateStaticParams() {
  return APPS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const app = getApp(params.slug);
  if (!app) return {};
  const title = `${app.name} keyboard shortcuts (Windows & Mac)`;
  const description = `The complete ${app.name} keyboard shortcuts cheat sheet — verified from official docs, for Windows and macOS. Search, copy, and favorite ${app.name} hotkeys. ${app.blurb}`;
  return {
    title,
    description,
    keywords: [
      `${app.name} keyboard shortcuts`,
      `${app.name} shortcuts`,
      `${app.name} hotkeys`,
      `${app.name} cheat sheet`,
      `${app.name} shortcuts Windows`,
      `${app.name} shortcuts Mac`,
    ],
    alternates: { canonical: `/app/${app.slug}` },
    openGraph: { title: `${title} · KeyMap`, description, url: `/app/${app.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const data = getShortcuts(slug);
  const category = CATEGORIES.find((c) => c.id === app.category);

  const related = APPS.filter(
    (a) => a.category === app.category && a.slug !== app.slug,
  ).slice(0, 4);

  // "Most used" = first 6 beginner-weighted shortcuts
  const mostUsed = data
    ? [...data.shortcuts]
        .sort((a, b) => rank(a.difficulty) - rank(b.difficulty))
        .slice(0, 6)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${app.name} keyboard shortcuts`,
    description: `Verified ${app.name} keyboard shortcuts for Windows and macOS.`,
    about: { "@type": "SoftwareApplication", name: app.name },
    url: `https://keymap.1619.in/app/${app.slug}`,
    ...(data ? { dateModified: data.lastVerified } : {}),
    isPartOf: { "@type": "WebSite", name: "KeyMap", url: "https://keymap.1619.in" },
  };

  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VisitTracker slug={slug} />

      <Link
        href="/apps"
        className="mb-6 inline-flex items-center gap-1 text-sm text-ink-secondary transition-colors hover:text-ink"
      >
        <CaretLeft size={14} weight="bold" /> All apps
      </Link>

      {/* Overview header */}
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <AppGlyph app={app} size={64} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-3xl tracking-tight text-ink">{app.name}</h1>
              {category && <Chip accent={category.accent}>{category.name}</Chip>}
            </div>
            <p className="mt-2 max-w-lg text-[0.98rem] leading-relaxed text-ink-secondary">
              {app.blurb}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {data && (
                <span className="inline-flex items-center gap-1.5 text-[var(--green-ink)]">
                  <SealCheck size={16} weight="fill" />
                  Verified {formatVerified(data.lastVerified)}
                </span>
              )}
              {data && (
                <a
                  href={data.officialDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ink-secondary underline-offset-4 hover:text-ink hover:underline"
                >
                  Official documentation
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 print:hidden">
          <OSToggle />
        </div>
      </header>

      {data ? (
        <>
          {/* Most used */}
          <section className="py-8">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-serif text-xl text-ink">Most used</h2>
              <span className="h-px flex-1 bg-border" />
            </div>
            <MostUsed shortcuts={mostUsed} appSlug={slug} />
          </section>

          {/* Full browser */}
          <AppDetail app={app} data={data} />
        </>
      ) : (
        <ComingSoon appName={app.name} />
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10 print:hidden">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="font-serif text-xl text-ink">Related apps</h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <AppCard key={a.slug} app={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function rank(d: string) {
  return d === "beginner" ? 0 : d === "intermediate" ? 1 : 2;
}

function ComingSoon({ appName }: { appName: string }) {
  return (
    <div className="my-12 flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-sunken/40 px-6 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
        <SealCheck size={26} className="text-ink-tertiary" weight="bold" />
      </div>
      <h2 className="font-serif text-2xl text-ink">{appName} shortcuts are being verified</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-secondary">
        We only publish shortcuts once they’ve been checked against official
        documentation. This app is next in the queue. Meanwhile, explore the
        verified apps in the same category below.
      </p>
      <Link
        href="/apps"
        className="mt-6 inline-flex items-center rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90"
      >
        Browse verified apps
      </Link>
    </div>
  );
}
