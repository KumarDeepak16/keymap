import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { APPS } from "@/data/apps";
import { CategoryIcon } from "@/components/category-icon";

const COUNTS = CATEGORIES.reduce<Record<string, number>>((acc, c) => {
  acc[c.id] = APPS.filter((a) => a.category === c.id).length;
  return acc;
}, {});

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {CATEGORIES.map((c) => (
        <Link
          key={c.id}
          href={`/category/${c.id}`}
          data-accent={c.accent}
          className="group relative flex flex-col justify-between rounded-[var(--radius)] border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-hover)]"
        >
          <span
            className="mb-6 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--a-bg)] text-[var(--a-ink)]"
            aria-hidden
          >
            <CategoryIcon id={c.id} size={18} />
          </span>
          <div>
            <h3 className="text-sm font-medium text-ink">{c.name}</h3>
            <p className="mt-0.5 text-xs text-ink-tertiary">{COUNTS[c.id]} apps</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
