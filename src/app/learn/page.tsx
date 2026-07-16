import { Sparkle, Lightning, Copy, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { LESSONS, PROMPT_COUNT } from "@/data/lessons";
import { PROMPTS } from "@/data/prompts";
import { LessonCard } from "@/components/lesson-parts";

export const metadata = {
  title: "Learn prompt engineering — a practical course for daily work",
  description:
    "A free, practical prompt engineering course: how to write prompts for email, data, writing and everyday tasks with Claude and ChatGPT. Copy-paste prompt templates, weak-vs-strong examples, and the failure modes worth knowing.",
  keywords: [
    "prompt engineering",
    "prompt engineering course",
    "how to write prompts",
    "ChatGPT prompts for work",
    "Claude prompts",
    "AI prompts for daily tasks",
    "prompt templates",
  ],
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn prompt engineering — a practical course for daily work · KeyMap",
    description:
      "Write prompts that work. Six lessons on prompting for email, data, writing and everyday tasks — with copy-paste templates.",
    url: "/learn",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Prompt engineering for daily work",
  description:
    "A practical course on writing prompts for everyday tasks — email, data, writing and analysis — with Claude, ChatGPT and other AI assistants.",
  url: "https://keymap.1619.in/learn",
  provider: { "@type": "WebSite", name: "KeyMap", url: "https://keymap.1619.in" },
  isAccessibleForFree: true,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: `PT${LESSONS.reduce((n, l) => n + l.minutes, 0)}M`,
  },
  syllabusSections: LESSONS.map((l, i) => ({
    "@type": "Syllabus",
    name: l.title,
    description: l.summary,
    position: i + 1,
    url: `https://keymap.1619.in/learn/${l.slug}`,
  })),
};

const PILLARS = [
  {
    icon: Sparkle,
    title: "Written for real work",
    body: "Every example comes from something you actually do — a reply you are dreading, a messy export, a post with no angle.",
  },
  {
    icon: Copy,
    title: "Copy-paste templates",
    body: `${PROMPT_COUNT} worked examples in the lessons, plus a library of ${PROMPTS.length} ready-to-use prompts. Swap the brackets and go.`,
  },
  {
    icon: Lightning,
    title: "Tool-agnostic",
    body: "Claude, ChatGPT, Gemini — none of this depends on a menu that will move next month. It is about what you put on the page.",
  },
];

export default function LearnPage() {
  const totalMinutes = LESSONS.reduce((n, l) => n + l.minutes, 0);

  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          Course · {LESSONS.length} lessons · {totalMinutes} min
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Prompt engineering for daily work
        </h1>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-secondary">
          A shortcut saves you seconds. A good prompt saves you a draft. This is
          the practical half of prompting — how to ask for the email, the
          spreadsheet formula, the post, the analysis — backed by a library of{" "}
          {PROMPTS.length} prompts you can copy and keep.
        </p>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-secondary">
          Read it in order if you are starting out. Jump to whichever lesson
          matches the thing on your screen if you are not.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/learn/${LESSONS[0].slug}`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90 active:scale-[0.98]"
          >
            Start with lesson 01
            <ArrowRight size={15} weight="bold" />
          </Link>
          <Link
            href="/learn/prompts"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-border-strong"
          >
            Skip to the prompt library
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map((lesson, i) => (
          <LessonCard key={lesson.slug} lesson={lesson} index={i} />
        ))}
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-[var(--radius)] border border-border bg-surface p-5"
            >
              <p.icon size={20} weight="bold" className="text-ink-tertiary" />
              <h2 className="mt-3 font-serif text-base text-ink">{p.title}</h2>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-secondary">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-tertiary">
        Unlike the shortcut pages on KeyMap, this course is not verified against a
        vendor&rsquo;s documentation — there isn&rsquo;t one to verify against. It is
        practice, not specification: what reliably works across current AI
        assistants, written to stay true as the tools change.
      </p>
    </div>
  );
}
