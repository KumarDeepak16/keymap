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

/** A shortcut the user added themselves. Lives only in their browser. */
export interface MyKey {
  id: string;
  action: string;
  combo: string;
  /** free-text grouping, e.g. "Figma" or "my terminal" */
  group: string;
  note?: string;
  /** ISO date the entry was created */
  added: string;
}

/** A copy-paste prompt example inside a lesson section */
export interface PromptExample {
  label: string;
  /** the prompt text itself — copied verbatim by the copy button */
  prompt: string;
  /** why this prompt works / what to swap out */
  why: string;
}

export interface LessonSection {
  heading: string;
  /** paragraphs of plain prose — no markdown, rendered one <p> each */
  body: string[];
  examples?: PromptExample[];
  /** optional do/don't contrast pair */
  compare?: { weak: string; strong: string; why: string };
}

/** AI tools a library prompt is known to work well with. "Any" = tool-agnostic. */
export type PromptTool =
  | "Any"
  | "ChatGPT"
  | "Claude"
  | "Gemini"
  | "Midjourney"
  | "DALL·E";

export type PromptCategoryId =
  | "email"
  | "research"
  | "writing"
  | "linkedin"
  | "daily"
  | "images"
  | "web"
  | "meta"
  | "humanize";

export interface PromptCategory {
  id: PromptCategoryId;
  name: string;
  description: string;
  accent: AccentKey;
}

/** A copy-paste prompt in the library. Bracketed [holes] are filled in by the user. */
export interface LibraryPrompt {
  id: string;
  title: string;
  /** what this is for, one line */
  useCase: string;
  category: PromptCategoryId;
  tools: PromptTool[];
  prompt: string;
  /** how to get the most out of it / what to swap */
  tip: string;
}

export interface Lesson {
  slug: string;
  title: string;
  /** one-line description used on cards and metadata */
  summary: string;
  level: Difficulty;
  /** rough reading time in minutes */
  minutes: number;
  /** short topic labels shown as chips */
  topics: string[];
  accent: AccentKey;
  /** the one thing to remember, shown pull-quote style */
  takeaway: string;
  sections: LessonSection[];
}
