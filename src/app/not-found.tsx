import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[var(--maxw)] flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-sm text-ink-tertiary">404</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">Nothing mapped here</h1>
      <p className="mt-3 max-w-sm text-ink-secondary">
        That page doesn’t exist. Try searching with the command palette, or head
        back to the library.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink/90"
      >
        Back home
      </Link>
    </div>
  );
}
