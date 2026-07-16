import type { LibraryPrompt } from "@/lib/types";

export const webPrompts: LibraryPrompt[] = [
  {
    id: "web-landing-copy",
    title: "Landing page copy",
    useCase: "Hero, subhead, sections — for a product that does something specific.",
    category: "web",
    tools: ["Claude", "ChatGPT"],
    tip: "The 'what they use instead today' line is the most valuable input. Copy that does not beat the status quo does not convert.",
    prompt: `Write landing page copy for [product].

What it actually does, in plain words: [no buzzwords]
Who it is for: [specific — "freelance designers who invoice monthly", not "creatives"]
What they use instead today: [the real alternative, including "a spreadsheet" or "nothing"]
Why ours is better for them specifically: [the honest answer]
Proof: [numbers, names, results]

Sections: hero headline, subhead, three benefit blocks, one objection-handler, CTA.

Rules:
- Headline says what it does. Not a metaphor, not a mission.
- No "Supercharge", "Unleash", "Effortlessly", "Seamlessly", "Revolutionize".
- Every benefit tied to something the reader does on a Tuesday.
- The objection-handler names the real objection, not a soft one.`,
  },
  {
    id: "web-spec",
    title: "Turn a vague idea into a spec",
    useCase: "You know what you want. It needs to be written down before anyone builds it.",
    category: "web",
    tools: ["Claude", "ChatGPT"],
    tip: "Making it ask questions first is what catches the requirement you did not know you had. Cheaper here than in code review.",
    prompt: `I want to build [rough description].

Before writing a spec, ask me the [5] questions whose answers would most change the design. Ask them all at once. Do not write anything until I answer.

Then produce:
1. What it does — user-facing, one paragraph.
2. Explicit non-goals — what it deliberately does not do.
3. User flows, step by step, including the unhappy paths.
4. Edge cases I have not thought about.
5. Open questions that need a decision before build.

No implementation detail unless I asked for it.`,
  },
  {
    id: "web-code-review",
    title: "Review my code honestly",
    useCase: "A second pair of eyes that isn't agreeable.",
    category: "web",
    tools: ["Claude", "ChatGPT"],
    tip: "The 'if it's fine, say so' line prevents invented nitpicks. Without it you get five suggestions on clean code and cannot tell which are real.",
    prompt: `Review the code below.

What it is supposed to do: [intent]
Context: [stack, constraints, what calls this]

Look for, in priority order:
1. Correctness bugs — anything that produces a wrong result or crashes. Give me the input that triggers it.
2. Security issues.
3. Things that will break at [expected scale].
4. Genuine simplifications — not style preferences.

Rules:
- Do not comment on formatting or naming unless it causes a real problem.
- If the code is fine, say so in one line rather than manufacturing feedback.
- For each issue, show the failing case. An issue you cannot demonstrate is a guess.

Code:
---
[paste]
---`,
  },
  {
    id: "web-debug",
    title: "Debug with the actual error",
    useCase: "Something broke. Give the model evidence, not your theory.",
    category: "web",
    tools: ["Claude", "ChatGPT"],
    tip: "Paste the full stack trace, not your summary of it. Your summary drops the line that matters — that is why you are stuck.",
    prompt: `Something is broken.

What I expected: [expected behaviour]
What happens instead: [actual behaviour]
Full error output:
---
[paste the ENTIRE stack trace, not a summary]
---
Relevant code:
---
[paste]
---
What I have already tried: [so we do not go in circles]
What changed recently: [deploy, dependency bump, config — or "nothing"]

Before suggesting a fix: list the three most likely causes, ranked, and tell me the cheapest way to distinguish between them.`,
  },
  {
    id: "web-seo-brief",
    title: "SEO content brief",
    useCase: "A brief that produces a page worth ranking, not keyword mush.",
    category: "web",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "Search-enable this. A brief written from memory recommends competitors and angles that stopped being true a year ago.",
    prompt: `Build a content brief for the query [target query].

Search first. Then give me:
1. What the top 5 results actually cover, and what they all miss.
2. Search intent — what is the person actually trying to do?
3. The angle that would beat the current results, and why.
4. Structure: H2s in order, with one line on what each must answer.
5. Questions the page must answer to be complete. Use People Also Ask.
6. What NOT to include — the padding everyone else adds.

No keyword density targets. No word count minimums. Real coverage of the intent.`,
  },
];
