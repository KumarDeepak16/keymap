import { X, Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Lesson, LessonSection } from "@/lib/types";
import { slugifyHeading } from "@/lib/utils";
import { Chip, DifficultyBadge } from "@/components/badges";
import { PromptBlock } from "@/components/prompt-block";

/** A weak/strong contrast pair — the "don't do this, do this" of a lesson. */
export function ComparePair({
  compare,
}: {
  compare: NonNullable<LessonSection["compare"]>;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-border bg-surface">
      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-4">
          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--red-ink)]">
            <X size={13} weight="bold" />
            Weak
          </div>
          <p className="whitespace-pre-line font-mono text-[0.8rem] leading-[1.6] text-ink-secondary">
            {compare.weak}
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--green-ink)]">
            <Check size={13} weight="bold" />
            Strong
          </div>
          <p className="whitespace-pre-line font-mono text-[0.8rem] leading-[1.6] text-ink">
            {compare.strong}
          </p>
        </div>
      </div>
      <p className="border-t border-border px-4 py-3 text-[0.85rem] leading-relaxed text-ink-secondary">
        {compare.why}
      </p>
    </div>
  );
}

/** One lesson section: heading, prose, optional compare pair and prompt examples. */
export function SectionBody({ section }: { section: LessonSection }) {
  return (
    <section id={slugifyHeading(section.heading)} className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-serif text-xl text-ink">{section.heading}</h2>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-4">
        {section.body.map((p, i) => (
          <p
            key={i}
            className="text-[1.02rem] leading-[1.75] text-ink-secondary"
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}
      </div>

      {section.compare && (
        <div className="mt-6">
          <ComparePair compare={section.compare} />
        </div>
      )}

      {section.examples && section.examples.length > 0 && (
        <div className="mt-6 space-y-5">
          {section.examples.map((ex) => (
            <PromptBlock key={ex.label} example={ex} />
          ))}
        </div>
      )}
    </section>
  );
}

/** Course-list tile linking to /learn/[slug]. */
export function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  return (
    <Link
      href={`/learn/${lesson.slug}`}
      className="group flex flex-col rounded-[var(--radius)] border border-border bg-surface p-5 transition-all hover:border-border-strong hover:shadow-[var(--shadow-hover)]"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-ink-tertiary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <DifficultyBadge level={lesson.level} />
      </div>

      <h3 className="font-serif text-lg leading-snug tracking-tight text-ink">
        {lesson.title}
      </h3>
      <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-secondary">
        {lesson.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {lesson.topics.map((t) => (
          <Chip key={t} accent={lesson.accent}>
            {t}
          </Chip>
        ))}
        <span className="ml-auto text-xs text-ink-tertiary">{lesson.minutes} min</span>
      </div>
    </Link>
  );
}
