import { FavoritesView } from "@/components/favorites-view";

export const metadata = {
  title: "Favorites — KeyMap",
  description: "Your starred keyboard shortcuts, saved on this device.",
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          Saved on this device
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">Favorites</h1>
      </header>
      <FavoritesView />
    </div>
  );
}
