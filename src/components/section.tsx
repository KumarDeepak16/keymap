import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Section({
  title,
  eyebrow,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-[1.7rem]">
            {title}
          </h2>
        </div>
        {action && (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
          >
            {action.label}
            <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
