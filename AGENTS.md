<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AGENTS.md

Guidance for AI coding agents working in this repo. `CLAUDE.md` points here.

## What this project is

KeyMap — a static, data-driven keyboard-shortcut reference web app. 60+ apps,
each with shortcuts verified against official docs. Windows/macOS toggle, command
palette, favorites, dark/light, fully responsive. Deployed to `keymap.1619.in`.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (config-less; tokens live in `src/app/globals.css`)
- **Zustand** for client state (persisted to `localStorage`)
- **cmdk** command palette · **Phosphor** + **Simple Icons** (bundled) for icons
- Node 20+. Package manager: **npm**.

## Commands

```bash
npm run dev      # dev server (Turbopack) on :3000
npm run build    # production build — type-checks AND statically generates every page
npm run start    # serve the production build
npm run lint     # eslint
```

**Always run `npm run build` after non-trivial changes** — it is the real gate.
On Windows/Git Bash, if `npm run build` resolves to the wrong workspace, run
`npx next build`.

## Architecture — everything is data

The site is essentially a renderer over `src/data`. To add or change an app you
edit data, not components.

```
src/
├── app/            App Router routes + SEO files (sitemap.ts, robots.ts, manifest.ts,
│                   opengraph-image.tsx, icon.tsx, error.tsx, not-found.tsx …)
├── components/     all UI (client where interactive)
├── data/
│   ├── apps.ts             APP REGISTRY — source of truth for what exists
│   ├── categories.ts       categories + tag list
│   ├── brand-icons.ts      GENERATED brand SVG paths (do not hand-edit)
│   └── shortcuts/          one <slug>.json per app + index.ts that maps them
└── lib/            types.ts, store.ts (zustand), utils.ts
```

### Adding / verifying an app (the common task)

1. In `src/data/apps.ts`, add or set the entry to `status: "verified"`.
2. Create `src/data/shortcuts/<slug>.json`:
   `{ app, officialDocsUrl, lastVerified, shortcuts: [{ action, windows, mac, category, difficulty }] }`.
3. In `src/data/shortcuts/index.ts`, add the import and a `SHORTCUTS` map entry.

Pages, search, palette, heatmap, sitemap all update automatically.

### Hard rules for shortcut data

- Every shortcut must be **verifiable against official documentation**. Record
  the source in `officialDocsUrl` and the check date in `lastVerified`.
- `difficulty` ∈ `beginner | intermediate | advanced`.
- Fill both `windows` and `mac`; use `""` when a platform has no equivalent.
- Combos join with `+` (`Ctrl+Shift+P`); typed sequences with a space (`g i`).
- **No HTML entities in JSON** (`&lt;`, `&gt;`) — use literal `<`, `>`.

### Brand icons

`src/data/brand-icons.ts` is generated from `simple-icons` (current + v11 for
trademarked brands removed upstream), bundled locally — **no network at runtime**.
Don't scrape brand logos from third-party sites (trademark/legal risk). Missing
brands fall back to a monogram tile in `AppGlyph`.

## Conventions & gotchas

- **Design system**: warm editorial minimalism. Tokens are CSS vars in
  `globals.css`, exposed to Tailwind via `@theme inline`. Theme is `[data-theme]`
  on `<html>`, set pre-paint by an inline script in `layout.tsx`. The
  `rounded-[var(--radius)]` bracket form is intentional — ignore the Tailwind
  "canonical class" lint warnings.
- **Interactive components must be Client Components** (`"use client"`).
- **Actions always visible** (copy/favorite) — no hover-only affordances; mobile
  has no hover. Tapping a shortcut row opens a detail **bottom sheet** on mobile
  (`components/sheet.tsx` + `shortcut-sheet.tsx`).
- **No horizontal overflow**: a global guard in `globals.css` sets
  `overflow-x: hidden` and `min-width: 0` on grid children. Wide content goes in
  `overflow-x-auto` containers.
- **Phosphor icons**: import from `@phosphor-icons/react/dist/ssr` in Server
  Components. No exported `Icon`/`IconProps` type in this version — type icon maps
  as `typeof SomeIcon`. Verify a name exists (e.g. `WindowsLogo` exists,
  `MicrosoftWindowsLogo` does not).
- **OG/icon routes** use `next/og` `ImageResponse`. Avoid non-ASCII glyphs there
  (dynamic-font 400); use `Cmd`, `Shift`, etc.
- Static site — nothing depends on request time. `apps.ts` order drives homepage
  sections (trending/essential/recentlyAdded flags).

## SEO & deploy

`metadataBase` is `https://keymap.1619.in`. Per-route `generateMetadata`, OG
image, sitemap, robots, manifest all wired. Deploy: Netlify via `netlify.toml` +
`@netlify/plugin-nextjs`.
