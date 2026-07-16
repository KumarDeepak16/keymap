import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-sunken/40">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-ink font-mono text-xs font-bold text-bg">
                K
              </span>
              <span className="font-serif text-lg">KeyMap</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-secondary">
              A fast, verified reference for keyboard shortcuts across the tools you
              use every day. Windows and macOS, beginner to advanced.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
              Browse
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/apps" className="text-ink-secondary hover:text-ink">All apps</Link></li>
              <li><Link href="/categories" className="text-ink-secondary hover:text-ink">Categories</Link></li>
              <li><Link href="/favorites" className="text-ink-secondary hover:text-ink">Favorites</Link></li>
              <li><Link href="/google-search-tips" className="text-ink-secondary hover:text-ink">Google search tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
              Categories
            </h4>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.id}`} className="text-ink-secondary hover:text-ink">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-ink-tertiary sm:flex-row sm:items-center">
          <p>Shortcuts verified against official documentation. Last review Jul 2026.</p>
          <p>
            Developed by{" "}
            <a
              href="https://github.com/kumardeepak16"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-secondary underline-offset-4 hover:text-ink hover:underline"
            >
              kumardeepak16
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
