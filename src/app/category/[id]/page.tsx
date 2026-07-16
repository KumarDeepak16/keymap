import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { CATEGORIES } from "@/data/categories";
import { APPS } from "@/data/apps";
import type { CategoryId } from "@/lib/types";
import { AppCard } from "@/components/app-card";
import { CategoryIcon } from "@/components/category-icon";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const cat = CATEGORIES.find((c) => c.id === params.id);
  if (!cat) return {};
  return {
    title: `${cat.name} shortcuts — KeyMap`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = CATEGORIES.find((c) => c.id === (id as CategoryId));
  if (!cat) notFound();

  const apps = APPS.filter((a) => a.category === cat.id).sort((a, b) => {
    if (a.status !== b.status) return a.status === "verified" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center gap-1 text-sm text-ink-secondary transition-colors hover:text-ink"
      >
        <CaretLeft size={14} weight="bold" /> Categories
      </Link>

      <header className="mb-8 flex items-center gap-4" data-accent={cat.accent}>
        <span className="flex h-14 w-14 items-center justify-center rounded-[var(--radius)] bg-[var(--a-bg)] text-[var(--a-ink)]">
          <CategoryIcon id={cat.id} size={26} />
        </span>
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-ink">{cat.name}</h1>
          <p className="mt-1 text-ink-secondary">{cat.description}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((a) => (
          <AppCard key={a.slug} app={a} />
        ))}
      </div>
    </div>
  );
}
