import { ArrowSquareOut, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { SearchTips } from "@/components/search-tips";
import { formatVerified } from "@/lib/utils";
import tipsData from "@/data/google-search-tips.json";

export const metadata = {
  title: "Google Search operators & tips — KeyMap",
  description:
    "A quick reference for Google Search operators: site:, filetype:, exact match, exclude, date ranges and more. Copy any example in one click.",
};

export default function GoogleSearchTipsPage() {
  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-2xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          Search smarter
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Google Search operators &amp; tips
        </h1>
        <p className="mt-2 text-ink-secondary">
          Operators narrow a search the way a shortcut speeds up an app. Combine
          them freely — <code className="rounded bg-surface-sunken px-1 font-mono text-sm">site:</code> with{" "}
          <code className="rounded bg-surface-sunken px-1 font-mono text-sm">filetype:</code>, a phrase in quotes minus a word.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-[var(--green-ink)]">
            <SealCheck size={16} weight="fill" />
            Verified {formatVerified(tipsData.lastVerified)}
          </span>
          <a
            href={tipsData.officialDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-secondary underline-offset-4 hover:text-ink hover:underline"
          >
            Official documentation
            <ArrowSquareOut size={14} weight="bold" />
          </a>
        </div>
      </header>

      <SearchTips />

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-tertiary">
        Operators marked <span className="font-medium text-[var(--green-ink)]">Official</span> appear on
        Google&rsquo;s &ldquo;Refine web searches&rdquo; help page. The rest are widely-supported
        Google operators documented across Google&rsquo;s products; a few (like{" "}
        <code className="font-mono">cache:</code>) have been partly retired.
      </p>
    </div>
  );
}
