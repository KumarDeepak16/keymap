import type { Lesson } from "@/lib/types";

import { lesson as promptingBasics } from "./prompting-basics";
import { lesson as contextAndConstraints } from "./context-and-constraints";
import { lesson as emailAndMessages } from "./email-and-messages";
import { lesson as workingWithData } from "./working-with-data";
import { lesson as writingAndPosts } from "./writing-and-posts";
import { lesson as metaPrompting } from "./meta-prompting";
import { lesson as humanizeOutput } from "./humanize-output";
import { lesson as advancedTechniques } from "./advanced-techniques";

// Ordered as a course — read top to bottom. Order drives the /learn list and prev/next.
export const LESSONS: Lesson[] = [
  promptingBasics,
  contextAndConstraints,
  emailAndMessages,
  workingWithData,
  writingAndPosts,
  metaPrompting,
  humanizeOutput,
  advancedTechniques,
];

export const LESSON_BY_SLUG = new Map(LESSONS.map((l) => [l.slug, l]));

export function getLesson(slug: string): Lesson | undefined {
  return LESSON_BY_SLUG.get(slug);
}

/** Total copy-paste prompt examples across the course — used for course metadata. */
export const PROMPT_COUNT = LESSONS.reduce(
  (n, l) => n + l.sections.reduce((m, s) => m + (s.examples?.length ?? 0), 0),
  0,
);
