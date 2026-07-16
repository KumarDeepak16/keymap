# Contributing to KeyMap

Thanks for your interest in improving KeyMap. Contributions of all sizes are
welcome — a one-line shortcut fix is just as valuable as a new feature.

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Fix or update shortcut data** — the most common and most useful contribution.
- **Add a new app** — see below.
- **Improve the UI/UX, accessibility, or performance.**
- **Report bugs** or suggest features via [issues](../../issues).

## Development setup

```bash
git clone https://github.com/KumarDeepak16/keymap.git
cd keymap
npm install
npm run dev        # http://localhost:3000
```

Before opening a PR:

```bash
npm run build      # must pass (type-check + static generation)
npm run lint
```

## The golden rule for shortcut data

**Every shortcut must be verifiable against the application's official
documentation.** No guessing, no third-party blog scraping.

Each data file records:

- `officialDocsUrl` — the exact page you verified against.
- `lastVerified` — the date (`YYYY-MM-DD`) you checked it.
- an optional `note` — for caveats (e.g. "shortcuts must be enabled in settings",
  or "no official page; values from the in-app panel").

## Adding a new app

1. Add an entry to [`src/data/apps.ts`](src/data/apps.ts) with `status: "verified"`.
2. Create `src/data/shortcuts/<slug>.json`:

   ```json
   {
     "app": "<slug>",
     "officialDocsUrl": "https://…",
     "lastVerified": "2026-07-16",
     "shortcuts": [
       {
         "action": "Open command palette",
         "windows": "Ctrl+Shift+P",
         "mac": "Cmd+Shift+P",
         "category": "General",
         "difficulty": "beginner"
       }
     ]
   }
   ```

3. Register it in [`src/data/shortcuts/index.ts`](src/data/shortcuts/index.ts)
   (add the import and the `SHORTCUTS` map entry).

### Data conventions

- **Keys:** `Ctrl`, `Shift`, `Alt`, `Cmd`, `Option`, `Win`, `Enter`, `Tab`,
  `Esc`, arrows (`Up`/`Down`/`Left`/`Right`). Join combos with `+`
  (`Ctrl+Shift+P`); join *sequences* with a space (`g i`).
- **`difficulty`:** one of `beginner`, `intermediate`, `advanced`.
- **`category`:** a short, human label (e.g. `Navigation`, `Editing`, `Tabs`).
- Fill **both** `windows` and `mac`. If a shortcut genuinely has no equivalent on
  one platform, use an empty string `""`.
- For a brand logo, KeyMap uses [Simple Icons](https://simpleicons.org). If the
  slug matches, it appears automatically; otherwise a clean monogram is used.

## Pull request checklist

- [ ] `npm run build` passes.
- [ ] New/changed shortcuts cite an official source and a `lastVerified` date.
- [ ] Commit messages are clear (conventional commits appreciated, not required).
- [ ] One logical change per PR where possible.

## Reporting a shortcut that's wrong or outdated

Open an issue with the app name, the incorrect combo, the correct combo, and a
link to the official documentation. Even better — send a PR.

Thank you for helping keep KeyMap fast and accurate.
