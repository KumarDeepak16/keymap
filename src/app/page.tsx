import Link from "next/link";
import { Sparkle, Lightning, Clock, Star } from "@phosphor-icons/react/dist/ssr";
import { APPS } from "@/data/apps";
import { SHORTCUT_INDEX } from "@/data/shortcuts";
import { LESSONS } from "@/data/lessons";
import { HeroSearch } from "@/components/hero-search";
import { Section } from "@/components/section";
import { AppCard } from "@/components/app-card";
import { CategoryGrid } from "@/components/category-grid";
import { PopularShortcuts } from "@/components/popular-shortcuts";
import { RecentlyViewed } from "@/components/recently-viewed";
import { LessonCard } from "@/components/lesson-parts";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "KeyMap — Keyboard shortcuts cheat sheet for 60+ apps (Windows & Mac)",
  description:
    "The fastest keyboard shortcut reference on the web. Search verified hotkeys and cheat sheets for VS Code, Excel, Chrome, Figma, Gmail, Slack, Notion and 60+ apps — Windows and macOS, beginner to advanced. Copy any shortcut in one click.",
  alternates: { canonical: "/" },
};

const trending = APPS.filter((a) => a.trending).slice(0, 6);
const essentials = APPS.filter((a) => a.essential).slice(0, 8);
const recentlyAdded = [...APPS]
  .filter((a) => a.status === "verified")
  .slice(-4)
  .reverse();

const verifiedCount = APPS.filter((a) => a.status === "verified").length;
const featuredLessons = LESSONS.slice(0, 3);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--yellow-bg) 55%, transparent), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[var(--maxw)] px-4 pb-6 pt-16 text-center sm:px-6 sm:pt-24">
          <Reveal>
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-ink)]" />
              {SHORTCUT_INDEX.length} shortcuts across {verifiedCount} apps · verified from official docs
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-ink sm:text-6xl">
              Every keyboard shortcut,
              <br />
              <span className="italic text-ink-secondary">one keystroke away.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-ink-secondary">
              A fast, verified reference for the tools you use every day. Switch
              between Windows and macOS, copy any shortcut, and keep your favorites.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8">
              <HeroSearch />
            </div>
          </Reveal>
        </div>
      </section>

      <RecentlyViewed />

      <Section
        eyebrow="What people are looking up"
        title="Trending apps"
        action={{ href: "/apps", label: "All apps" }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((a) => (
            <AppCard key={a.slug} app={a} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Worth memorizing" title="Popular shortcuts">
        <PopularShortcuts />
      </Section>

      <Section eyebrow="Open these every day" title="Daily essentials">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {essentials.map((a) => (
            <AppCard key={a.slug} app={a} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Browse by kind"
        title="Categories"
        action={{ href: "/categories", label: "See all" }}
      >
        <CategoryGrid />
      </Section>

      <Section
        eyebrow="Beyond the keyboard"
        title="Prompt engineering course"
        action={{ href: "/learn", label: "All lessons" }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map((l, i) => (
            <LessonCard key={l.slug} lesson={l} index={i} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Fresh in the library" title="Recently added">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {recentlyAdded.map((a) => (
            <AppCard key={a.slug} app={a} />
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkle, title: "Command palette", body: "Press ⌘K anywhere to jump to any app or copy any shortcut." },
            { icon: Lightning, title: "Instant switch", body: "Toggle Windows and macOS — every combo updates at once." },
            { icon: Star, title: "Favorites", body: "Star the shortcuts you keep forgetting. They stay on this device." },
            { icon: Clock, title: "Last verified", body: "Each app shows when its shortcuts were checked against official docs." },
          ].map((f) => (
            <div key={f.title} className="rounded-[var(--radius)] border border-border bg-surface p-5">
              <f.icon size={22} weight="bold" className="text-ink" />
              <h3 className="mt-3 text-sm font-medium text-ink">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[var(--maxw)] px-4 pb-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-border bg-surface-sunken/60 px-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-serif text-xl text-ink">Can’t find an app?</h3>
            <p className="mt-1 text-sm text-ink-secondary">
              Browse the full library — more apps are being verified continuously.
            </p>
          </div>
          <Link
            href="/apps"
            className="inline-flex items-center rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90 active:scale-[0.98]"
          >
            Browse all apps
          </Link>
        </div>
      </section>
    </>
  );
}
