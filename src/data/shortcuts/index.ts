import type { AppShortcuts, IndexedShortcut } from "@/lib/types";
import { APPS } from "@/data/apps";

import vscode from "./vscode.json";
import cursor from "./cursor.json";
import chrome from "./chrome.json";
import windows from "./windows.json";
import macos from "./macos.json";
import excel from "./excel.json";
import word from "./word.json";
import gmail from "./gmail.json";
import googleDocs from "./google-docs.json";
import googleSheets from "./google-sheets.json";
import googleDrive from "./google-drive.json";
import figma from "./figma.json";
import slack from "./slack.json";
import notion from "./notion.json";
import chatgpt from "./chatgpt.json";
import claude from "./claude.json";
import discord from "./discord.json";
import photoshop from "./photoshop.json";
import powerpoint from "./powerpoint.json";
import outlook from "./outlook.json";
import microsoftTeams from "./microsoft-teams.json";
import onenote from "./onenote.json";
import gemini from "./gemini.json";
import googleSlides from "./google-slides.json";
import googleMeet from "./google-meet.json";
import googleCalendar from "./google-calendar.json";
import zoom from "./zoom.json";
import terminal from "./terminal.json";
import powershell from "./powershell.json";
import iterm2 from "./iterm2.json";
import warp from "./warp.json";
import jetbrains from "./jetbrains.json";
import androidStudio from "./android-studio.json";
import visualStudio from "./visual-studio.json";
import git from "./git.json";
import githubDesktop from "./github-desktop.json";
import docker from "./docker.json";
import postman from "./postman.json";
import edge from "./edge.json";
import firefox from "./firefox.json";
import safari from "./safari.json";
import brave from "./brave.json";
import arc from "./arc.json";
import obsidian from "./obsidian.json";
import trello from "./trello.json";
import clickup from "./clickup.json";
import todoist from "./todoist.json";
import linear from "./linear.json";
import jira from "./jira.json";
import windowsExplorer from "./windows-explorer.json";
import finder from "./finder.json";
import linux from "./linux.json";
import perplexity from "./perplexity.json";
import githubCopilot from "./github-copilot.json";
import windsurf from "./windsurf.json";
import canva from "./canva.json";
import illustrator from "./illustrator.json";
import lightroom from "./lightroom.json";

// Map app slug -> verified shortcut set.
// `google-chrome` (Workspace category) reuses the same verified Chrome data.
export const SHORTCUTS: Record<string, AppShortcuts> = {
  vscode: vscode as AppShortcuts,
  cursor: cursor as AppShortcuts,
  chrome: chrome as AppShortcuts,
  "google-chrome": { ...(chrome as AppShortcuts), app: "google-chrome" },
  windows: windows as AppShortcuts,
  macos: macos as AppShortcuts,
  excel: excel as AppShortcuts,
  word: word as AppShortcuts,
  gmail: gmail as AppShortcuts,
  "google-docs": googleDocs as AppShortcuts,
  "google-sheets": googleSheets as AppShortcuts,
  "google-drive": googleDrive as AppShortcuts,
  figma: figma as AppShortcuts,
  slack: slack as AppShortcuts,
  notion: notion as AppShortcuts,
  chatgpt: chatgpt as AppShortcuts,
  claude: claude as AppShortcuts,
  discord: discord as AppShortcuts,
  photoshop: photoshop as AppShortcuts,
  powerpoint: powerpoint as AppShortcuts,
  outlook: outlook as AppShortcuts,
  "microsoft-teams": microsoftTeams as AppShortcuts,
  onenote: onenote as AppShortcuts,
  gemini: gemini as AppShortcuts,
  "google-slides": googleSlides as AppShortcuts,
  "google-meet": googleMeet as AppShortcuts,
  "google-calendar": googleCalendar as AppShortcuts,
  zoom: zoom as AppShortcuts,
  terminal: terminal as AppShortcuts,
  powershell: powershell as AppShortcuts,
  iterm2: iterm2 as AppShortcuts,
  warp: warp as AppShortcuts,
  jetbrains: jetbrains as AppShortcuts,
  "android-studio": androidStudio as AppShortcuts,
  "visual-studio": visualStudio as AppShortcuts,
  git: git as AppShortcuts,
  "github-desktop": githubDesktop as AppShortcuts,
  docker: docker as AppShortcuts,
  postman: postman as AppShortcuts,
  edge: edge as AppShortcuts,
  firefox: firefox as AppShortcuts,
  safari: safari as AppShortcuts,
  brave: brave as AppShortcuts,
  arc: arc as AppShortcuts,
  obsidian: obsidian as AppShortcuts,
  trello: trello as AppShortcuts,
  clickup: clickup as AppShortcuts,
  todoist: todoist as AppShortcuts,
  linear: linear as AppShortcuts,
  jira: jira as AppShortcuts,
  "windows-explorer": windowsExplorer as AppShortcuts,
  finder: finder as AppShortcuts,
  linux: linux as AppShortcuts,
  perplexity: perplexity as AppShortcuts,
  "github-copilot": githubCopilot as AppShortcuts,
  windsurf: windsurf as AppShortcuts,
  canva: canva as AppShortcuts,
  "canva-ai": { ...(canva as AppShortcuts), app: "canva-ai" },
  illustrator: illustrator as AppShortcuts,
  lightroom: lightroom as AppShortcuts,
};

export function getShortcuts(slug: string): AppShortcuts | undefined {
  return SHORTCUTS[slug];
}

/** Flatten every verified shortcut into one searchable index (for palette + global search). */
export function buildShortcutIndex(): IndexedShortcut[] {
  const out: IndexedShortcut[] = [];
  for (const app of APPS) {
    const data = SHORTCUTS[app.slug];
    if (!data) continue;
    for (const s of data.shortcuts) {
      out.push({
        ...s,
        appSlug: app.slug,
        appName: app.name,
        appColor: app.color,
      });
    }
  }
  return out;
}

export const SHORTCUT_INDEX = buildShortcutIndex();

/** Count of verified shortcuts per app slug — used for card metadata. */
export const SHORTCUT_COUNTS: Record<string, number> = Object.fromEntries(
  Object.entries(SHORTCUTS).map(([slug, data]) => [slug, data.shortcuts.length]),
);
