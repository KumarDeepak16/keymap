import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CATEGORIES } from "@/data/categories";
import { APPS } from "@/data/apps";
import { CategoryIcon } from "@/components/category-icon";

export const metadata = {
  title: "Categories — KeyMap",
  description: "Browse keyboard shortcuts by category: AI, development, design, browsers and more.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          Browse by kind
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">Categories</h1>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const count = APPS.filter((a) => a.category === c.id).length;
          const verified = APPS.filter((a) => a.category === c.id && a.status === "verified").length;
          return (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              data-accent={c.accent}
              className="group flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-hover)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--a-bg)] text-[var(--a-ink)]">
                  <CategoryIcon id={c.id} size={22} />
                </span>
                <div>
                  <h2 className="font-medium text-ink">{c.name}</h2>
                  <p className="text-sm text-ink-secondary">{c.description}</p>
                  <p className="mt-1 text-xs text-ink-tertiary">
                    {count} apps · {verified} verified
                  </p>
                </div>
              </div>
              <ArrowRight size={18} weight="bold" className="text-ink-tertiary transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
