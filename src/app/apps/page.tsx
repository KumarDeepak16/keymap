import { APPS } from "@/data/apps";
import { AppsBrowser } from "@/components/apps-browser";

export const metadata = {
  title: "All apps — KeyMap",
  description: "Browse every app in the KeyMap library. Filter by category, tag, and more.",
};

// Verified apps first, then coming-soon.
const sorted = [...APPS].sort((a, b) => {
  if (a.status !== b.status) return a.status === "verified" ? -1 : 1;
  return a.name.localeCompare(b.name);
});

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          The library
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">All apps</h1>
        <p className="mt-2 max-w-xl text-ink-secondary">
          {APPS.length} apps across ten categories. Filter to find yours, then copy
          any shortcut in one click.
        </p>
      </header>
      <AppsBrowser apps={sorted} />
    </div>
  );
}
