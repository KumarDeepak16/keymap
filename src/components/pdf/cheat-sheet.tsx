"use client";

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { AppShortcuts, App, OS, Shortcut } from "@/lib/types";

/*
  Print palette. Deliberately not the app's dark-capable tokens — paper is
  always light, and ink costs money, so backgrounds stay near-white and
  weight comes from type rather than fills.
*/
const C = {
  ink: "#1a1a17",
  inkSoft: "#57564f",
  inkFaint: "#8f8d84",
  rule: "#e2dfd6",
  ruleSoft: "#efece4",
  cap: "#f6f4ee",
  capEdge: "#d5d1c4",
  accent: "#8a6400",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 54,
    paddingHorizontal: 44,
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: C.ink,
    backgroundColor: "#ffffff",
  },

  /* ── masthead ── */
  masthead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1.5,
    borderBottomColor: C.ink,
    paddingBottom: 10,
    marginBottom: 4,
  },
  appName: { fontSize: 22, fontFamily: "Times-Roman", letterSpacing: -0.3 },
  appBlurb: { fontSize: 8, color: C.inkSoft, marginTop: 3, maxWidth: 300 },
  mastRight: { alignItems: "flex-end" },
  platform: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.4,
    color: C.ink,
    borderWidth: 0.8,
    borderColor: C.ink,
    paddingVertical: 2.5,
    paddingHorizontal: 6,
  },
  verified: { fontSize: 6.5, color: C.inkFaint, marginTop: 5, letterSpacing: 0.4 },

  /* meta strip under the rule */
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metaText: { fontSize: 6.5, color: C.inkFaint, letterSpacing: 0.5 },

  /* ── columns ── */
  columns: { flexDirection: "row", gap: 22 },
  column: { flex: 1 },

  /* ── category ── */
  catHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 5,
    marginTop: 12,
  },
  catName: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.3,
    color: C.ink,
  },
  catRule: { flex: 1, height: 0.6, backgroundColor: C.rule },
  catCount: { fontSize: 6.5, color: C.inkFaint },

  /* ── row ── */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 3.2,
    borderBottomWidth: 0.5,
    borderBottomColor: C.ruleSoft,
  },
  action: { flex: 1, fontSize: 8.2, color: C.ink },

  /* keycaps */
  combo: { flexDirection: "row", alignItems: "center", gap: 2 },
  cap: {
    fontSize: 6.8,
    fontFamily: "Courier-Bold",
    color: C.ink,
    backgroundColor: C.cap,
    borderWidth: 0.5,
    borderColor: C.capEdge,
    borderRadius: 2,
    paddingVertical: 1.6,
    paddingHorizontal: 3.4,
  },
  plus: { fontSize: 6, color: C.inkFaint },

  /* ── footer ── */
  footer: {
    position: "absolute",
    bottom: 26,
    left: 44,
    right: 44,
    borderTopWidth: 0.6,
    borderTopColor: C.rule,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footLeft: { flexDirection: "row", alignItems: "center", gap: 5 },
  mark: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    backgroundColor: C.ink,
    paddingVertical: 2,
    paddingHorizontal: 3.5,
    borderRadius: 1.5,
  },
  footText: { fontSize: 6.5, color: C.inkFaint },
  footLink: { fontSize: 6.5, color: C.inkSoft, textDecoration: "none" },

  /* ── about page ── */
  aboutTitle: { fontSize: 15, fontFamily: "Times-Roman", marginBottom: 8 },
  aboutBody: { fontSize: 8.4, color: C.inkSoft, lineHeight: 1.65, marginBottom: 8 },
  aboutHead: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    marginTop: 16,
    marginBottom: 6,
  },
  bullet: { flexDirection: "row", gap: 6, marginBottom: 4 },
  bulletDot: { fontSize: 8, color: C.inkFaint },
  bulletText: { flex: 1, fontSize: 8.2, color: C.inkSoft, lineHeight: 1.55 },
});

/*
  The built-in PDF fonts (Helvetica/Courier) have no ⌘ ⇧ ⌥ ↩ glyphs — react-pdf
  drops them silently rather than erroring, leaving a blank keycap. Spell them.
*/
const GLYPH_TO_TEXT: Record<string, string> = {
  "⌘": "Cmd",
  "⇧": "Shift",
  "⌥": "Option",
  "⌃": "Ctrl",
  "↩": "Enter",
  "⏎": "Enter",
  "⌫": "Delete",
  "⇥": "Tab",
  "␣": "Space",
  "↑": "Up",
  "↓": "Down",
  "←": "Left",
  "→": "Right",
};

const toText = (k: string) => GLYPH_TO_TEXT[k] ?? k;

/** Split a combo the way the app does: "Ctrl+Shift+P" or a typed sequence "g i". */
function parts(combo: string): { keys: string[]; sep: string } {
  if (combo.includes(" ") && !combo.includes("+"))
    return { keys: combo.split(" ").filter(Boolean).map(toText), sep: "then" };
  return {
    keys: combo.split("+").map((k) => toText(k.trim())).filter(Boolean),
    sep: "+",
  };
}

function Combo({ combo }: { combo: string }) {
  const { keys, sep } = parts(combo);
  return (
    <View style={s.combo}>
      {keys.map((k, i) => (
        <View key={i} style={s.combo}>
          {i > 0 && <Text style={s.plus}>{sep}</Text>}
          <Text style={s.cap}>{k}</Text>
        </View>
      ))}
    </View>
  );
}

function Category({ name, items, os }: { name: string; items: Shortcut[]; os: OS }) {
  return (
    // wrap={false} keeps a category from splitting mid-list across a column break
    <View style={{ marginBottom: 2 }} wrap={false}>
      <View style={s.catHead}>
        <Text style={s.catName}>{name.toUpperCase()}</Text>
        <View style={s.catRule} />
        <Text style={s.catCount}>{items.length}</Text>
      </View>
      {items.map((sc, i) => {
        const combo = os === "mac" ? sc.mac : sc.windows;
        if (!combo) return null;
        return (
          <View key={i} style={s.row}>
            <Text style={s.action}>{sc.action}</Text>
            <Combo combo={combo} />
          </View>
        );
      })}
    </View>
  );
}

function Footer({ appName }: { appName: string }) {
  return (
    <View style={s.footer} fixed>
      <View style={s.footLeft}>
        <Text style={s.mark}>K</Text>
        <Text style={s.footText}>{appName} shortcuts · keymap.1619.in</Text>
      </View>
      <Text
        style={s.footText}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

export function CheatSheet({
  app,
  data,
  os,
}: {
  app: App;
  data: AppShortcuts;
  os: OS;
}) {
  // Group by category, preserving the data file's order.
  const groups = new Map<string, Shortcut[]>();
  for (const sc of data.shortcuts) {
    const combo = os === "mac" ? sc.mac : sc.windows;
    if (!combo) continue; // a platform with no equivalent earns no row
    groups.set(sc.category, [...(groups.get(sc.category) ?? []), sc]);
  }
  const entries = [...groups.entries()];

  // Balance the columns by rendered height, not by category count. Each category
  // costs its rows plus a heading, and greedily filling the shorter column keeps
  // the page from ending with one side half empty.
  const HEAD_COST = 2.2; // a heading is worth roughly two rows of vertical space
  const cost = (items: Shortcut[]) => items.length + HEAD_COST;

  const left: typeof entries = [];
  const right: typeof entries = [];
  let leftH = 0;
  let rightH = 0;

  for (const e of entries) {
    if (leftH <= rightH) {
      left.push(e);
      leftH += cost(e[1]);
    } else {
      right.push(e);
      rightH += cost(e[1]);
    }
  }

  const total = entries.reduce((n, [, v]) => n + v.length, 0);

  const platform = os === "mac" ? "MACOS" : "WINDOWS";
  const count = total;

  return (
    <Document
      title={`${app.name} keyboard shortcuts (${platform})`}
      author="KeyMap — keymap.1619.in"
      subject={`${app.name} keyboard shortcuts cheat sheet for ${platform}`}
      keywords={`${app.name}, keyboard shortcuts, cheat sheet, ${platform}`}
    >
      <Page size="A4" style={s.page}>
        <View style={s.masthead} fixed>
          <View>
            <Text style={s.appName}>{app.name}</Text>
            <Text style={s.appBlurb}>{app.blurb}</Text>
          </View>
          <View style={s.mastRight}>
            <Text style={s.platform}>{platform}</Text>
            <Text style={s.verified}>VERIFIED {data.lastVerified}</Text>
          </View>
        </View>

        <View style={s.metaRow}>
          <Text style={s.metaText}>{count} SHORTCUTS · {entries.length} GROUPS</Text>
          <Text style={s.metaText}>KEYBOARD SHORTCUT REFERENCE</Text>
        </View>

        <View style={s.columns}>
          <View style={s.column}>
            {left.map(([name, items]) => (
              <Category key={name} name={name} items={items} os={os} />
            ))}
          </View>
          <View style={s.column}>
            {right.map(([name, items]) => (
              <Category key={name} name={name} items={items} os={os} />
            ))}
          </View>
        </View>

        <Footer appName={app.name} />
      </Page>

      {/* ── About ── */}
      <Page size="A4" style={s.page}>
        <View style={s.masthead}>
          <View>
            <Text style={s.appName}>About</Text>
            <Text style={s.appBlurb}>KeyMap — the keyboard shortcut reference</Text>
          </View>
          <View style={s.mastRight}>
            <Text style={s.platform}>KEYMAP</Text>
          </View>
        </View>

        <View style={{ marginTop: 18, maxWidth: 380 }}>
          <Text style={s.aboutTitle}>Every shortcut, one keystroke away.</Text>
          <Text style={s.aboutBody}>
            KeyMap is a fast, free reference for keyboard shortcuts across 60+ apps
            people use every day — editors, browsers, design tools, terminals,
            spreadsheets. Windows and macOS, beginner to advanced.
          </Text>
          <Text style={s.aboutBody}>
            Every shortcut in this sheet was checked against the vendor&apos;s own
            documentation rather than collected from blog posts. The source and the
            date it was last verified are printed on the first page, so you can
            check the claim yourself.
          </Text>

          <Text style={s.aboutHead}>THIS SHEET</Text>
          {[
            [`${app.name} — ${count} shortcuts for ${platform.toLowerCase()}`],
            [`Verified ${data.lastVerified} against the official documentation`],
            [`Source: ${data.officialDocsUrl}`],
          ].map(([t], i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>·</Text>
              <Text style={s.bulletText}>{t}</Text>
            </View>
          ))}

          <Text style={s.aboutHead}>ON THE SITE</Text>
          {[
            // No ⌘/⇧ glyphs here: the built-in PDF fonts have no such codepoint
            // and it silently drops from the output.
            "Command palette — search every shortcut across every app with Ctrl+K",
            "Favourites — star the ones you are learning and keep them together",
            "My Keys — save your own custom bindings, stored in your browser",
            "Prompt engineering course — a practical guide with copy-paste prompts",
          ].map((t, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>·</Text>
              <Text style={s.bulletText}>{t}</Text>
            </View>
          ))}

          <Text style={s.aboutHead}>DEVELOPER</Text>
          <Text style={s.aboutBody}>
            Built by Kumar Deepak.{"\n"}
            <Link src="https://keymap.1619.in" style={s.footLink}>
              keymap.1619.in
            </Link>
            {"   ·   "}
            <Link src="https://github.com/kumardeepak16" style={s.footLink}>
              github.com/kumardeepak16
            </Link>
            {"   ·   "}
            <Link src="https://1619.in" style={s.footLink}>
              1619.in
            </Link>
          </Text>

          <Text style={[s.aboutBody, { marginTop: 14, fontSize: 7, color: C.inkFaint }]}>
            App names and trademarks belong to their respective owners. This sheet
            is an independent reference and is not affiliated with or endorsed by
            {" "}{app.name}.
          </Text>
        </View>

        <Footer appName={app.name} />
      </Page>
    </Document>
  );
}
