import type { App } from "@/lib/types";

// Full app registry. `status: "verified"` apps have shortcut data in /data/shortcuts.
// Everything else renders as an elegant "coming soon" page but is fully searchable.
export const APPS: App[] = [
  // ── AI ─────────────────────────────────────────────
  { slug: "chatgpt", name: "ChatGPT", category: "ai", tags: ["AI", "Daily Use"], blurb: "OpenAI's conversational assistant.", monogram: "GP", color: "#10a37f", status: "verified", trending: true, essential: true },
  { slug: "claude", name: "Claude", category: "ai", tags: ["AI", "Daily Use"], blurb: "Anthropic's AI assistant.", monogram: "CL", color: "#d97757", status: "verified", trending: true },
  { slug: "gemini", name: "Gemini", category: "ai", tags: ["AI"], blurb: "Google's multimodal AI.", monogram: "GE", color: "#4285f4", status: "verified", trending: true },
  { slug: "perplexity", name: "Perplexity", category: "ai", tags: ["AI"], blurb: "AI answer engine.", monogram: "PX", color: "#20808d", status: "verified" },
  { slug: "github-copilot", name: "GitHub Copilot", category: "ai", tags: ["AI", "Developer"], blurb: "AI pair programmer.", monogram: "CO", color: "#6e40c9", status: "verified" },
  { slug: "cursor", name: "Cursor", category: "ai", tags: ["AI", "Developer"], blurb: "The AI code editor.", monogram: "CU", color: "#000000", status: "verified", trending: true },
  { slug: "windsurf", name: "Windsurf", category: "ai", tags: ["AI", "Developer"], blurb: "Agentic AI IDE.", monogram: "WS", color: "#0b9b8a", status: "verified" },
  { slug: "canva-ai", name: "Canva AI", category: "ai", tags: ["AI", "Design"], blurb: "AI design features in Canva.", monogram: "CA", color: "#00c4cc", status: "verified" },

  // ── Google Workspace ───────────────────────────────
  { slug: "gmail", name: "Gmail", category: "google-workspace", tags: ["Google Workspace", "Daily Use", "Communication"], blurb: "Google's email client.", monogram: "GM", color: "#ea4335", status: "verified", essential: true },
  { slug: "google-chrome", name: "Google Chrome", category: "google-workspace", tags: ["Browser", "Google Workspace", "Daily Use"], blurb: "Google's web browser.", monogram: "CH", color: "#4285f4", status: "verified", essential: true, trending: true },
  { slug: "google-docs", name: "Google Docs", category: "google-workspace", tags: ["Google Workspace", "Office", "Daily Use"], blurb: "Collaborative documents.", monogram: "DO", color: "#4285f4", status: "verified", essential: true },
  { slug: "google-sheets", name: "Google Sheets", category: "google-workspace", tags: ["Google Workspace", "Office", "Data Analytics"], blurb: "Collaborative spreadsheets.", monogram: "SH", color: "#0f9d58", status: "verified", essential: true },
  { slug: "google-slides", name: "Google Slides", category: "google-workspace", tags: ["Google Workspace", "Office"], blurb: "Collaborative presentations.", monogram: "SL", color: "#f4b400", status: "verified" },
  { slug: "google-drive", name: "Google Drive", category: "google-workspace", tags: ["Google Workspace", "File Manager"], blurb: "Cloud file storage.", monogram: "DR", color: "#1fa463", status: "verified" },
  { slug: "google-meet", name: "Google Meet", category: "google-workspace", tags: ["Google Workspace", "Communication"], blurb: "Video meetings.", monogram: "ME", color: "#00897b", status: "verified" },
  { slug: "google-calendar", name: "Google Calendar", category: "google-workspace", tags: ["Google Workspace", "Productivity"], blurb: "Scheduling & calendars.", monogram: "CA", color: "#4285f4", status: "verified" },

  // ── Microsoft ──────────────────────────────────────
  { slug: "excel", name: "Excel", category: "microsoft", tags: ["Microsoft", "Office", "Data Analytics", "Daily Use"], blurb: "Microsoft's spreadsheet app.", monogram: "XL", color: "#217346", status: "verified", essential: true, trending: true },
  { slug: "word", name: "Word", category: "microsoft", tags: ["Microsoft", "Office", "Daily Use"], blurb: "Microsoft's word processor.", monogram: "WD", color: "#2b579a", status: "verified", essential: true },
  { slug: "powerpoint", name: "PowerPoint", category: "microsoft", tags: ["Microsoft", "Office"], blurb: "Microsoft's presentations.", monogram: "PP", color: "#d24726", status: "verified", essential: true },
  { slug: "outlook", name: "Outlook", category: "microsoft", tags: ["Microsoft", "Office", "Communication"], blurb: "Microsoft's email & calendar.", monogram: "OL", color: "#0072c6", status: "verified" },
  { slug: "microsoft-teams", name: "Microsoft Teams", category: "microsoft", tags: ["Microsoft", "Communication"], blurb: "Team chat & meetings.", monogram: "TE", color: "#6264a7", status: "verified", trending: true },
  { slug: "onenote", name: "OneNote", category: "microsoft", tags: ["Microsoft", "Productivity"], blurb: "Microsoft's note-taking app.", monogram: "ON", color: "#7719aa", status: "verified" },

  // ── Browsers ───────────────────────────────────────
  { slug: "chrome", name: "Chrome", category: "browsers", tags: ["Browser", "Daily Use"], blurb: "Google Chrome browser.", monogram: "CH", color: "#4285f4", status: "verified", essential: true },
  { slug: "edge", name: "Edge", category: "browsers", tags: ["Browser", "Microsoft"], blurb: "Microsoft's Chromium browser.", monogram: "ED", color: "#0078d7", status: "verified" },
  { slug: "firefox", name: "Firefox", category: "browsers", tags: ["Browser", "Open Source"], blurb: "Mozilla's browser.", monogram: "FF", color: "#ff7139", status: "verified" },
  { slug: "safari", name: "Safari", category: "browsers", tags: ["Browser", "macOS"], blurb: "Apple's browser.", monogram: "SA", color: "#1b88ca", status: "verified" },
  { slug: "brave", name: "Brave", category: "browsers", tags: ["Browser", "Open Source"], blurb: "Privacy-focused browser.", monogram: "BR", color: "#fb542b", status: "verified" },
  { slug: "arc", name: "Arc", category: "browsers", tags: ["Browser"], blurb: "The browser from The Browser Company.", monogram: "AR", color: "#fc5c7d", status: "verified" },

  // ── Development ─────────────────────────────────────
  { slug: "vscode", name: "VS Code", category: "development", tags: ["Developer", "Daily Use", "Open Source"], blurb: "Microsoft's code editor.", monogram: "VS", color: "#007acc", status: "verified", trending: true, essential: true },
  { slug: "jetbrains", name: "JetBrains IDEs", category: "development", tags: ["Developer"], blurb: "IntelliJ, WebStorm, PyCharm & co.", monogram: "JB", color: "#f97a12", status: "verified" },
  { slug: "android-studio", name: "Android Studio", category: "development", tags: ["Developer"], blurb: "Android's official IDE.", monogram: "AS", color: "#3ddc84", status: "verified" },
  { slug: "visual-studio", name: "Visual Studio", category: "development", tags: ["Developer", "Microsoft"], blurb: "Microsoft's full IDE.", monogram: "VS", color: "#5c2d91", status: "verified" },
  { slug: "git", name: "Git", category: "development", tags: ["Developer", "Git", "Terminal"], blurb: "Distributed version control.", monogram: "GT", color: "#f05033", status: "verified" },
  { slug: "github-desktop", name: "GitHub Desktop", category: "development", tags: ["Developer", "Git"], blurb: "Git GUI by GitHub.", monogram: "GD", color: "#6e40c9", status: "verified" },
  { slug: "docker", name: "Docker", category: "development", tags: ["Developer", "Terminal"], blurb: "Container platform.", monogram: "DK", color: "#2496ed", status: "verified" },
  { slug: "postman", name: "Postman", category: "development", tags: ["Developer"], blurb: "API development platform.", monogram: "PM", color: "#ff6c37", status: "verified" },
  { slug: "terminal", name: "Terminal", category: "development", tags: ["Developer", "Terminal", "macOS"], blurb: "macOS Terminal.", monogram: "TM", color: "#333333", status: "verified" },
  { slug: "powershell", name: "PowerShell", category: "development", tags: ["Developer", "Terminal", "Windows"], blurb: "Windows shell & scripting.", monogram: "PS", color: "#012456", status: "verified" },
  { slug: "iterm2", name: "iTerm2", category: "development", tags: ["Developer", "Terminal", "macOS"], blurb: "macOS terminal replacement.", monogram: "iT", color: "#000000", status: "verified" },
  { slug: "warp", name: "Warp Terminal", category: "development", tags: ["Developer", "Terminal"], blurb: "The modern, Rust-based terminal.", monogram: "WP", color: "#01a4ff", status: "verified" },

  // ── Design ──────────────────────────────────────────
  { slug: "canva", name: "Canva", category: "design", tags: ["Design", "Creative", "Daily Use"], blurb: "Online design platform.", monogram: "CA", color: "#00c4cc", status: "verified" },
  { slug: "figma", name: "Figma", category: "design", tags: ["Design", "Creative", "Daily Use"], blurb: "Collaborative interface design.", monogram: "FI", color: "#a259ff", status: "verified", trending: true },
  { slug: "photoshop", name: "Photoshop", category: "design", tags: ["Design", "Creative"], blurb: "Adobe's raster editor.", monogram: "PS", color: "#31a8ff", status: "verified" },
  { slug: "illustrator", name: "Illustrator", category: "design", tags: ["Design", "Creative"], blurb: "Adobe's vector editor.", monogram: "AI", color: "#ff9a00", status: "verified" },
  { slug: "lightroom", name: "Lightroom", category: "design", tags: ["Design", "Creative"], blurb: "Adobe's photo workflow.", monogram: "LR", color: "#31a8ff", status: "verified" },

  // ── Communication ──────────────────────────────────
  { slug: "slack", name: "Slack", category: "communication", tags: ["Communication", "Daily Use", "Productivity"], blurb: "Team messaging.", monogram: "SL", color: "#4a154b", status: "verified", trending: true },
  { slug: "discord", name: "Discord", category: "communication", tags: ["Communication", "Daily Use"], blurb: "Voice, video & text chat.", monogram: "DC", color: "#5865f2", status: "verified" },
  { slug: "zoom", name: "Zoom", category: "communication", tags: ["Communication"], blurb: "Video conferencing.", monogram: "ZM", color: "#2d8cff", status: "verified" },

  // ── Productivity ───────────────────────────────────
  { slug: "notion", name: "Notion", category: "productivity", tags: ["Productivity", "Daily Use"], blurb: "Docs, wikis & databases.", monogram: "NO", color: "#000000", status: "verified", trending: true },
  { slug: "obsidian", name: "Obsidian", category: "productivity", tags: ["Productivity"], blurb: "Local-first knowledge base.", monogram: "OB", color: "#7c3aed", status: "verified" },
  { slug: "trello", name: "Trello", category: "productivity", tags: ["Productivity"], blurb: "Kanban boards.", monogram: "TR", color: "#0079bf", status: "verified" },
  { slug: "clickup", name: "ClickUp", category: "productivity", tags: ["Productivity"], blurb: "All-in-one work app.", monogram: "CU", color: "#7b68ee", status: "verified" },
  { slug: "todoist", name: "Todoist", category: "productivity", tags: ["Productivity"], blurb: "Task manager.", monogram: "TD", color: "#e44332", status: "verified" },
  { slug: "linear", name: "Linear", category: "productivity", tags: ["Productivity", "Developer"], blurb: "Issue tracking for teams.", monogram: "LI", color: "#5e6ad2", status: "verified", recentlyAdded: true },
  { slug: "jira", name: "Jira", category: "productivity", tags: ["Productivity", "Developer"], blurb: "Agile project tracking.", monogram: "JI", color: "#0052cc", status: "verified" },

  // ── File Management ────────────────────────────────
  { slug: "windows-explorer", name: "Windows File Explorer", category: "file-management", tags: ["File Manager", "Windows"], blurb: "Windows file browser.", monogram: "EX", color: "#ffb900", status: "verified" },
  { slug: "finder", name: "macOS Finder", category: "file-management", tags: ["File Manager", "macOS"], blurb: "macOS file browser.", monogram: "FN", color: "#1b88ca", status: "verified" },
  { slug: "files-by-google", name: "Files by Google", category: "file-management", tags: ["File Manager"], blurb: "Android file manager.", monogram: "FG", color: "#4285f4", status: "coming-soon" },

  // ── Operating Systems ──────────────────────────────
  { slug: "windows", name: "Windows", category: "operating-systems", tags: ["Windows", "Daily Use"], blurb: "Microsoft Windows 11.", monogram: "WN", color: "#0078d7", status: "verified", trending: true, essential: true },
  { slug: "macos", name: "macOS", category: "operating-systems", tags: ["macOS", "Daily Use"], blurb: "Apple macOS.", monogram: "MA", color: "#333333", status: "verified", essential: true },
  { slug: "linux", name: "Ubuntu/Linux", category: "operating-systems", tags: ["Linux", "Open Source", "Terminal"], blurb: "Ubuntu & GNOME desktop.", monogram: "LX", color: "#e95420", status: "verified" },
];

export const APP_BY_SLUG = new Map(APPS.map((a) => [a.slug, a]));

export function getApp(slug: string): App | undefined {
  return APP_BY_SLUG.get(slug);
}
