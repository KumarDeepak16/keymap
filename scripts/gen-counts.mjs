// Regenerates src/data/shortcut-counts.ts from the shortcut JSON files.
//
// Why this exists: AppCard renders on nearly every route and only needs a count
// per slug. Importing SHORTCUT_COUNTS from the data/shortcuts barrel pulled all
// 60 JSON files (~490KB) into the client bundle of every one of those routes.
// This module is plain numbers with no imports, so it costs ~1KB instead.
//
// Run after adding or editing an app's shortcuts:  node scripts/gen-counts.mjs

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/data/shortcuts";
const OUT = "src/data/shortcut-counts.ts";

const counts = {};
for (const file of readdirSync(DIR)) {
  if (!file.endsWith(".json")) continue;
  const data = JSON.parse(readFileSync(join(DIR, file), "utf8"));
  counts[file.replace(/\.json$/, "")] = (data.shortcuts ?? []).length;
}

// Aliases mirrored from data/shortcuts/index.ts — keep in sync.
counts["google-chrome"] = counts["chrome"];
counts["canva-ai"] = counts["canva"];

const lines = Object.entries(counts)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, n]) => `  ${/^[a-z][a-z0-9]*$/.test(slug) ? slug : JSON.stringify(slug)}: ${n},`);

writeFileSync(
  OUT,
  `// GENERATED — shortcut count per app slug. Do not hand-edit.
// Regenerate with: node scripts/gen-counts.mjs
// Exists so AppCard can show a count without importing every shortcut JSON
// (that barrel import put ~490KB of data into every route that renders a card).

export const SHORTCUT_COUNTS: Record<string, number> = {
${lines.join("\n")}
};
`,
);

const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(`${OUT}: ${Object.keys(counts).length} apps, ${total} shortcuts`);
