import { MyKeys } from "@/components/my-keys";

export const metadata = {
  title: "My Keys — save your own keyboard shortcuts",
  description:
    "Save your own keyboard shortcuts — custom bindings, in-house tools, the ones you always forget. Stored in your browser, no account needed.",
  keywords: [
    "save keyboard shortcuts",
    "custom keyboard shortcuts",
    "my shortcuts list",
    "personal shortcut cheat sheet",
    "keyboard shortcut manager",
  ],
  alternates: { canonical: "/my-keys" },
  openGraph: {
    title: "My Keys — save your own keyboard shortcuts · KeyMap",
    description:
      "Custom bindings, in-house tools, the shortcuts you always forget. Saved in your browser.",
    url: "/my-keys",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Keys — save your own keyboard shortcuts",
    description: "Custom bindings and the shortcuts you always forget, saved in your browser.",
  },
};

export default function MyKeysPage() {
  return (
    <div className="mx-auto max-w-[var(--maxw)] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-2xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
          Yours only
        </p>
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          My Keys
        </h1>
        <p className="mt-2 text-ink-secondary">
          Every shortcut on KeyMap is verified from official docs — but yours
          aren&rsquo;t in any doc. Custom bindings, in-house tools, the combo you
          rebound six months ago and keep forgetting. Put them here.
        </p>
        <p className="mt-2 text-sm text-ink-tertiary">
          Saved in this browser only. No account, no sync, nothing sent anywhere —
          which also means clearing your browser data clears these.
        </p>
      </header>

      <MyKeys />
    </div>
  );
}
