<div align="center">

# ⌨️ KeyMap

### The fast, verified keyboard shortcut reference for the tools you use every day

**[Live site → keymap.1619.in](https://keymap.1619.in)**

Every keyboard shortcut, one keystroke away — for Windows and macOS, from beginner to advanced.
Search instantly, switch OS in one click, copy any shortcut, keep your favorites.

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

</div>

---

## Overview

**KeyMap** is a premium, open-source keyboard-shortcut reference and cheat-sheet
web app. It collects **verified keyboard shortcuts** for 60+ popular apps —
VS Code, Excel, Chrome, Figma, Gmail, Slack, Notion, Photoshop, macOS, Windows
and many more — each checked against the app's **official documentation** and
stamped with a "last verified" date.

Built for speed and clarity: an instant global search, a `⌘K` command palette,
a live Windows ↔ macOS toggle, one-click copy, per-shortcut favorites, a keyboard
heatmap, and a clean editorial design that works in light and dark themes.

> **Keywords:** keyboard shortcuts, hotkeys, cheat sheet, keyboard shortcut
> reference, Windows shortcuts, macOS shortcuts, VS Code shortcuts, Excel
> shortcuts, productivity, developer tools, command palette, shortcut finder.

## Features

- **Instant global search** — find any app or shortcut as you type.
- **⌘K / Ctrl K command palette** — jump anywhere; select a shortcut to copy it.
- **Windows ↔ macOS toggle** — every combo updates at once, app-wide.
- **60+ verified apps** — real shortcuts from official docs, with a *last verified* badge and a link to the source.
- **Beginner → Advanced sections** — shortcuts grouped by difficulty.
- **Copy in one click** and **favorite** any shortcut (saved on your device).
- **Keyboard heatmap** — see which keys an app leans on.
- **Categories & filters** — AI, Development, Browsers, Office, Design, Communication, Productivity, File Management, Operating Systems.
- **Google Search operators** reference page (`site:`, `filetype:`, ranges, and more).
- **Dark / light mode**, fully responsive, accessible (skip links, focus states, ARIA).
- **Print / PDF cheat-sheet mode**, recently-viewed, related apps, elegant empty states.
- **SEO-ready** — per-page metadata, Open Graph images, sitemap, robots, web manifest.

## Tech stack

| Layer | Choice |
|------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| State | Zustand (OS, theme, favorites, recents — persisted to `localStorage`) |
| Command palette | [cmdk](https://cmdk.paco.me) |
| Icons | [Phosphor Icons](https://phosphoricons.com) + [Simple Icons](https://simpleicons.org) (bundled locally) |
| Deploy | [Netlify](https://netlify.com) |

## Quick start

```bash
# clone
git clone https://github.com/KumarDeepak16/keymap.git
cd keymap

# install
npm install

# dev server → http://localhost:3000
npm run dev

# production build + serve
npm run build
npm run start
```

Requires Node.js 20+.

## Project structure

```
src/
├── app/                    # routes (App Router)
│   ├── page.tsx            # homepage
│   ├── app/[slug]/         # per-app shortcut page
│   ├── apps/               # all-apps browser
│   ├── categories/         # category index + /category/[id]
│   ├── favorites/          # saved shortcuts
│   ├── google-search-tips/ # search operators reference
│   ├── sitemap.ts · robots.ts · manifest.ts · opengraph-image.tsx
│   └── error.tsx · global-error.tsx · not-found.tsx
├── components/             # UI (palette, kbd, cards, toggles, heatmap …)
├── data/
│   ├── apps.ts             # app registry
│   ├── categories.ts       # categories + tags
│   ├── brand-icons.ts      # bundled brand SVGs (generated)
│   ├── google-search-tips.json
│   └── shortcuts/          # one JSON per app + index.ts
└── lib/                    # types, store, utils
```

## Adding or verifying an app

Every app is just data — no component changes needed.

1. Add or flip the entry in [`src/data/apps.ts`](src/data/apps.ts) to `status: "verified"`.
2. Create `src/data/shortcuts/<slug>.json` following the existing shape:
   ```json
   {
     "app": "<slug>",
     "officialDocsUrl": "https://…official-docs",
     "lastVerified": "YYYY-MM-DD",
     "shortcuts": [
       { "action": "…", "windows": "Ctrl+…", "mac": "Cmd+…", "category": "…", "difficulty": "beginner" }
     ]
   }
   ```
3. Import it in [`src/data/shortcuts/index.ts`](src/data/shortcuts/index.ts) and add it to the `SHORTCUTS` map.

Pages, search, palette, and the heatmap pick it up automatically.

**Data rule:** every shortcut must be verifiable against the app's official
documentation, and each file records that source URL and the date it was checked.
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Data & accuracy

Shortcut data is compiled from official documentation (each file cites its
`officialDocsUrl`). A few notes on edge cases:

- **ChatGPT, Claude, Gemini, Perplexity** — no public shortcuts page; values come
  from each app's in-app panel (`Ctrl/Cmd + /`), flagged with a `note`.
- **Adobe apps (Photoshop, Illustrator, Lightroom)** — Adobe's default shortcut set.
- **Git & Docker** — CLIs, so the "shortcuts" are the most-used commands.
- **Gmail / Google Calendar** — single-key shortcuts must be enabled in settings.

Found something out of date? [Open an issue](../../issues) or a PR.

## Contributing

Contributions are welcome — new apps, corrections, features, design polish.
Read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md)
first. Security issues: see [SECURITY.md](SECURITY.md).

## License

Code is released under the [MIT License](LICENSE). Shortcut data is factual
reference material compiled from official sources; product names and logos are
trademarks of their respective owners. KeyMap is an independent project and is
not affiliated with any of the applications it references.

## Author

Built by **[KumarDeepak16](https://github.com/KumarDeepak16)** — [1619.in](https://1619.in)

If KeyMap saves you a few keystrokes, consider leaving a ⭐ — it helps others find it.
