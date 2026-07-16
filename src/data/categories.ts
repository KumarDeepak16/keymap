import type { Category, Tag } from "@/lib/types";

export const CATEGORIES: Category[] = [
  { id: "ai", name: "AI", description: "Assistants, copilots & AI editors", accent: "purple" },
  { id: "google-workspace", name: "Google Workspace", description: "Docs, Sheets, Gmail & more", accent: "blue" },
  { id: "microsoft", name: "Microsoft", description: "Office & Microsoft 365", accent: "red" },
  { id: "browsers", name: "Browsers", description: "Everyday web browsers", accent: "yellow" },
  { id: "development", name: "Development", description: "Editors, IDEs, terminals & Git", accent: "green" },
  { id: "design", name: "Design", description: "Design & creative tools", accent: "purple" },
  { id: "communication", name: "Communication", description: "Chat, meetings & calls", accent: "blue" },
  { id: "productivity", name: "Productivity", description: "Notes, tasks & project tools", accent: "green" },
  { id: "file-management", name: "File Management", description: "File explorers & managers", accent: "neutral" },
  { id: "operating-systems", name: "Operating Systems", description: "Windows, macOS & Linux", accent: "red" },
];

export const TAGS: Tag[] = [
  "AI", "Developer", "Productivity", "Browser", "Office", "Design",
  "Terminal", "Git", "Open Source", "Daily Use", "macOS", "Windows",
  "Linux", "Google Workspace", "Microsoft", "Communication", "Creative",
  "File Manager", "Data Analytics",
];
