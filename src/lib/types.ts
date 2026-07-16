// Core domain types for KeyMap

export type OS = "windows" | "mac";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Tag =
  | "AI"
  | "Developer"
  | "Productivity"
  | "Browser"
  | "Office"
  | "Design"
  | "Terminal"
  | "Git"
  | "Open Source"
  | "Daily Use"
  | "macOS"
  | "Windows"
  | "Linux"
  | "Google Workspace"
  | "Microsoft"
  | "Communication"
  | "Creative"
  | "File Manager"
  | "Data Analytics";

export type CategoryId =
  | "ai"
  | "google-workspace"
  | "microsoft"
  | "browsers"
  | "development"
  | "design"
  | "communication"
  | "productivity"
  | "file-management"
  | "operating-systems";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  /** Accent token key from the palette (pale-red / pale-blue etc.) */
  accent: AccentKey;
}

export type AccentKey = "red" | "blue" | "green" | "yellow" | "purple" | "neutral";

export interface Shortcut {
  action: string;
  windows: string;
  mac: string;
  category: string;
  difficulty: Difficulty;
}

export interface AppShortcuts {
  app: string; // slug, matches App.slug
  officialDocsUrl: string;
  lastVerified: string; // ISO date
  shortcuts: Shortcut[];
}

export interface App {
  slug: string;
  name: string;
  category: CategoryId;
  tags: Tag[];
  /** short one-line description used on cards / overview */
  blurb: string;
  /** Optional: mark as trending / daily-essential / recently-added on the homepage */
  trending?: boolean;
  essential?: boolean;
  recentlyAdded?: boolean;
  /** two-letter monogram fallback for the app glyph */
  monogram: string;
  /** brand color hex for the glyph tile */
  color: string;
  /** whether this app has verified shortcut data (vs coming-soon) */
  status: "verified" | "coming-soon";
}

/** A shortcut joined with its owning app — used by global search & palette */
export interface IndexedShortcut extends Shortcut {
  appSlug: string;
  appName: string;
  appColor: string;
}
