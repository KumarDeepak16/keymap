import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react/dist/ssr";
import { LESSONS, getLesson } from "@/data/lessons";
import { Chip, DifficultyBadge } from "@/components/badges";
import { SectionBody } from "@/components/lesson-parts";
import { LessonToc } from "@/components/lesson-toc";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug);
  if (!lesson) return {};
  const title = `${lesson.title} — prompt engineering`;
  return {
    title,
    description: lesson.summary,
    keywords: [
      "prompt engineering",
      ...lesson.topics.map((t) => `${t.toLowerCase()} prompts`),
      "AI prompts",
      "ChatGPT prompts",
      "Claude prompts",
    ],
    alternates: { canonical: `/learn/${lesson.slug}` },
    openGraph: {
      title: `${title} · KeyMap`,
      description: lesson.summary,
      url: `/learn/${lesson.slug}`,
    },
    twitter: { card: "summary_large_image", title, description: lesson.summary },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const index = LESSONS.findIndex((l) => l.slug === slug);
  const prev = index > 0 ? LESSONS[index - 1] : undefined;
  const next = index < LESSONS.length - 1 ? LESSONS[index + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.summary,
    url: `https://keymap.1619.in/learn/${lesson.slug}`,
    educationalLevel: lesson.level,
    learningResourceType: "Lesson",
    timeRequired: `PT${lesson.minutes}M`,
    isPartOf: {
      "@type": "Course",
      name: "Prompt engineering for daily work",
      url: "https://keymap.1619.in/learn",
    },
  };

  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-1 text-sm text-ink-secondary transition-colors hover:text-ink"
      >
        <CaretLeft size={14} weight="bold" /> Prompt engineering course
      </Link>

      <div className="gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
      <article className="max-w-2xl">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-ink-tertiary">
              Lesson {String(index + 1).padStart(2, "0")}
            </span>
            <DifficultyBadge level={lesson.level} />
            <span className="text-xs text-ink-tertiary">{lesson.minutes} min read</span>
          </div>

          <h1 className="mt-3 text-balance font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-secondary">
            {lesson.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.topics.map((t) => (
              <Chip key={t} accent={lesson.accent}>
                {t}
              </Chip>
            ))}
          </div>
        </header>

        <figure
          data-accent={lesson.accent}
          className="my-8 rounded-[var(--radius)] border-l-2 border-[var(--a-ink)] bg-[var(--a-bg)] px-5 py-4"
        >
          <Quotes size={16} weight="fill" className="mb-2 text-[var(--a-ink)]" />
          <blockquote className="font-serif text-lg italic leading-snug text-ink">
            {lesson.takeaway}
          </blockquote>
        </figure>

        <div className="space-y-12">
          {lesson.sections.map((section) => (
            <SectionBody key={section.heading} section={section} />
          ))}
        </div>
      </article>

        <aside className="sticky top-24 hidden lg:block print:hidden">
          <LessonToc headings={lesson.sections.map((s) => s.heading)} />

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
              Lessons
            </p>
            <ul className="space-y-1 text-sm">
              {LESSONS.map((l, i) => (
                <li key={l.slug}>
                  <Link
                    href={`/learn/${l.slug}`}
                    aria-current={l.slug === slug ? "page" : undefined}
                    className={
                      l.slug === slug
                        ? "flex gap-2 py-1 font-medium text-ink"
                        : "flex gap-2 py-1 text-ink-tertiary transition-colors hover:text-ink-secondary"
                    }
                  >
                    <span className="font-mono text-xs leading-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-5">{l.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/learn/prompts"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              Prompt library
              <CaretRight size={12} weight="bold" />
            </Link>
          </div>
        </aside>
      </div>

      <nav className="mt-16 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="group rounded-[var(--radius)] border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <span className="inline-flex items-center gap-1 text-xs text-ink-tertiary">
              <CaretLeft size={12} weight="bold" /> Previous
            </span>
            <p className="mt-1 font-serif text-base text-ink">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/learn/${next.slug}`}
            className="group rounded-[var(--radius)] border border-border bg-surface p-4 text-right transition-colors hover:border-border-strong sm:col-start-2"
          >
            <span className="inline-flex items-center gap-1 text-xs text-ink-tertiary">
              Next <CaretRight size={12} weight="bold" />
            </span>
            <p className="mt-1 font-serif text-base text-ink">{next.title}</p>
          </Link>
        )}
      </nav>
    </div>
  );
}
