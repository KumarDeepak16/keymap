import type { LibraryPrompt, PromptCategoryId } from "@/lib/types";

import { emailPrompts } from "./email";
import { researchPrompts } from "./research";
import { writingPrompts } from "./writing";
import { linkedinPrompts } from "./linkedin";
import { dailyPrompts } from "./daily";
import { imagePrompts } from "./images";
import { webPrompts } from "./web";
import { metaPrompts } from "./meta";
import { humanizePrompts } from "./humanize";

export { PROMPT_CATEGORIES, PROMPT_TOOLS } from "./categories";

// Order follows PROMPT_CATEGORIES — it drives the library listing.
export const PROMPTS: LibraryPrompt[] = [
  ...emailPrompts,
  ...researchPrompts,
  ...writingPrompts,
  ...linkedinPrompts,
  ...dailyPrompts,
  ...imagePrompts,
  ...webPrompts,
  ...metaPrompts,
  ...humanizePrompts,
];

export const PROMPT_BY_ID = new Map(PROMPTS.map((p) => [p.id, p]));

/** Count of prompts per category — used for filter chips. */
export const PROMPT_COUNTS: Record<string, number> = PROMPTS.reduce(
  (acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<PromptCategoryId, number>,
);
