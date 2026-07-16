import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { PROMPTS, PROMPT_CATEGORIES } from "@/data/prompts";
import { PromptLibrary } from "@/components/prompt-library";

export const metadata = {
  title: "Prompt library — copy-paste prompts for work",
  description:
    "A library of professional, copy-paste AI prompts for email, research, blog writing, LinkedIn posts, image generation, daily tasks and meta-prompting. Tagged by tool — ChatGPT, Claude, Gemini, Midjourney. Free, no signup.",
  keywords: [
    "prompt library",
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "prompt templates",
    "best prompts for work",
    "email prompts",
    "LinkedIn post prompts",
    "blog writing prompts",
    "Midjourney prompts",
    "humanize AI text prompt",
    "meta prompting",
  ],
  alternates: { canonical: "/learn/prompts" },
  openGraph: {
    title: "Prompt library — copy-paste prompts for work · KeyMap",
    description:
      "Professional prompts for email, research, writing, LinkedIn, images and more. Tagged by tool. Copy and use.",
    url: "/learn/prompts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt library — copy-paste prompts for work",
    description:
      "Professional prompts for email, research, writing, LinkedIn, images and more. Tagged by tool.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Prompt library",
  description:
    "A curated library of copy-paste AI prompts for professional and daily work, tagged by tool and category.",
  url: "https://keymap.1619.in/learn/prompts",
  isPartOf: { "@type": "WebSite", name: "KeyMap", url: "https://keymap.1619.in" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: PROMPTS.length,
    itemListElement: PROMPTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.useCase,
    })),
  },
};

export default function PromptsPage() {
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

      <header className="mb-6 max-w-2xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          {PROMPTS.length} prompts · {PROMPT_CATEGORIES.length} categories
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Prompt library
        </h1>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-secondary">
          Copy, swap the [brackets], use. Every prompt here is a working template
          for something people actually do — replying to email, researching a
          decision, writing a post that isn&rsquo;t slop, generating an image that
          matches the one in your head.
        </p>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-tertiary">
          Tool tags mark where a prompt is known to work well.{" "}
          <span className="font-medium text-ink-secondary">Any</span> means it is
          tool-agnostic — the technique does not depend on the vendor. If you want
          to understand why these are shaped the way they are, read the{" "}
          <Link href="/learn" className="text-ink underline underline-offset-4">
            course
          </Link>
          .
        </p>
      </header>

      <PromptLibrary />
    </div>
  );
}
