import type { PromptCategory, PromptTool } from "@/lib/types";

export const PROMPT_CATEGORIES: PromptCategory[] = [
  { id: "email", name: "Email & messages", description: "Replies, follow-ups, declines, cold outreach", accent: "green" },
  { id: "research", name: "Research & analysis", description: "Fact-finding, comparison, source-checking", accent: "blue" },
  { id: "writing", name: "Blog & long-form", description: "Posts, docs, drafts, editing", accent: "red" },
  { id: "linkedin", name: "LinkedIn & social", description: "Posts, comments, profile copy", accent: "blue" },
  { id: "daily", name: "Daily tasks", description: "Meetings, planning, decisions, learning", accent: "yellow" },
  { id: "images", name: "Image generation", description: "Midjourney, DALL·E & friends", accent: "purple" },
  { id: "web", name: "Web & product", description: "Landing copy, specs, code, SEO", accent: "green" },
  { id: "meta", name: "Meta-prompting", description: "Prompts that write and fix prompts", accent: "purple" },
  { id: "humanize", name: "Humanize & de-slop", description: "Strip AI patterns, match your voice", accent: "red" },
];

export const PROMPT_TOOLS: PromptTool[] = [
  "Any",
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "DALL·E",
];
