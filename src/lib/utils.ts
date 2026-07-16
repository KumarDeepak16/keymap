import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Prettify a raw key token into a display glyph.
const KEY_GLYPHS: Record<string, string> = {
  Cmd: "⌘",
  Command: "⌘",
  Option: "⌥",
  Alt: "Alt",
  Shift: "⇧",
  Ctrl: "Ctrl",
  Control: "Ctrl",
  Enter: "↩",
  Return: "↩",
  Tab: "⇥",
  Esc: "Esc",
  Escape: "Esc",
  Up: "↑",
  Down: "↓",
  Left: "←",
  Right: "→",
  Delete: "⌫",
  Backspace: "⌫",
  Space: "Space",
  Win: "⊞",
  PrtScn: "PrtScn",
  Grave: "`",
};

export function glyphForKey(key: string): string {
  return KEY_GLYPHS[key] ?? key;
}

/**
 * Parse a combo string into rows of key tokens.
 * "Ctrl+Shift+P"  -> [["Ctrl","Shift","P"]]
 * "g i"           -> [["g"],["i"]]  (a sequence: press one then the next)
 * "Ctrl+1 ... Ctrl+8" -> a single passthrough row rendered verbatim
 */
export function parseCombo(combo: string): { keys: string[]; sequence: boolean; raw?: string } {
  if (!combo) return { keys: [], sequence: false };
  // ranges / verbose forms rendered as-is
  if (combo.includes("...")) return { keys: [], sequence: false, raw: combo };

  if (combo.includes(" ") && !combo.includes("+")) {
    // typed sequence like "g i" or "# Space"
    return { keys: combo.split(" ").filter(Boolean), sequence: true };
  }
  return { keys: combo.split("+").map((k) => k.trim()).filter(Boolean), sequence: false };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function formatVerified(iso: string): string {
  // "2026-07-16" -> "Jul 16, 2026" without Date() nondeterminism concerns (pure parse)
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}
