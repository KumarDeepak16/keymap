import type { LibraryPrompt } from "@/lib/types";

export const metaPrompts: LibraryPrompt[] = [
  {
    id: "meta-write-my-prompt",
    title: "Write the prompt for me",
    useCase: "You know the outcome you want. You don't want to engineer the prompt.",
    category: "meta",
    tools: ["Claude", "ChatGPT"],
    tip: "This is the highest-leverage prompt in the library. The model knows what a good prompt contains — it just needs to know your situation, so let it ask.",
    prompt: `I want to use an AI assistant to [describe the outcome you want, in plain words].

Do not do the task. Write me the prompt that would do it well.

First, ask me any questions whose answers would change the prompt — audience, format, constraints, context you would need. Ask them all at once.

Then give me:
1. The prompt itself, in a code block, ready to copy.
2. Bracketed [holes] for anything I should swap per use.
3. One line on which part is doing the heavy lifting, so I know what not to delete.`,
  },
  {
    id: "meta-fix-my-prompt",
    title: "Diagnose a prompt that isn't working",
    useCase: "You wrote a prompt. The output is wrong and you don't know why.",
    category: "meta",
    tools: ["Claude", "ChatGPT"],
    tip: "Include the bad output. Diagnosing a prompt without seeing what it produced is guesswork — the gap between the two is the entire diagnosis.",
    prompt: `Here is a prompt I wrote and the output it gave me. The output is wrong.

My prompt:
---
[paste]
---

What it gave me:
---
[paste the bad output]
---

What I actually wanted: [describe]

Diagnose it:
1. Which is missing — role, task, context, or format?
2. What did I leave implicit that I assumed was obvious?
3. Where is my wording ambiguous enough to be read two ways?
4. Rewrite the prompt with the fix, and tell me what you changed and why.`,
  },
  {
    id: "meta-reason-first",
    title: "Force the reasoning into the open",
    useCase: "Anything where you need to check the answer, not just receive it.",
    category: "meta",
    tools: ["Claude", "ChatGPT", "Gemini"],
    tip: "Step 5 is where genuinely shaky answers admit it. An answer you cannot check is a rumor.",
    prompt: `Work through this before answering. Structure your response as:

1. What the question is actually asking, restated.
2. What information you have, and what is missing.
3. Your reasoning, step by step. Where you are uncertain, say "uncertain:" and continue.
4. Answer.
5. What would have to be true for your answer to be wrong.

Question: [your question]`,
  },
  {
    id: "meta-blind-second-opinion",
    title: "Blind second opinion",
    useCase: "You have a conclusion. You want to know if it survives someone who doesn't own it.",
    category: "meta",
    tools: ["Claude", "ChatGPT"],
    tip: "Use a fresh conversation and paste only the material and the conclusion — never the reasoning. A model that has seen its own reasoning will defend it.",
    prompt: `Here is some material and a conclusion someone drew from it. Do you agree?

Work independently. Do not assume the conclusion is right. If you would draw a different conclusion, say what and why.

Material:
---
[paste]
---

Their conclusion:
---
[paste — do not include the reasoning that produced it]
---`,
  },
  {
    id: "meta-standing-instructions",
    title: "Standing instructions for a project",
    useCase: "Set once in Claude Projects or ChatGPT custom instructions. Applies to everything.",
    category: "meta",
    tools: ["Claude", "ChatGPT"],
    tip: "The 'do not lead with agreement' and 'say I don't know' lines fight the two default behaviours that cost the most in practice.",
    prompt: `Standing instructions for this project:

What we are doing: [one paragraph — enough that a competent stranger could follow a conversation]
Who reads the output: [audience]
Default format: [length, structure]
Vocabulary: [terms of art, plus anything to never call something]

House rules:
- If a request is ambiguous, ask rather than guessing.
- If I am wrong about something, say so directly. Do not lead with agreement.
- Say "I don't know" rather than producing a plausible answer.
- No preamble. Start with the substance.
- If you are uncertain, mark the uncertain part rather than hedging the whole answer.`,
  },
  {
    id: "meta-decompose",
    title: "Break a big task into prompts",
    useCase: "The task is too big for one prompt and you're getting mush.",
    category: "meta",
    tools: ["Claude", "ChatGPT"],
    tip: "If you would not hand this to one person and walk away, do not hand it to one prompt. This finds the seams.",
    prompt: `I need to [big task].

Do not do it. Break it into the sequence of separate prompts I should run, where I read and correct the output at each step before moving on.

For each step:
- What it produces
- Why it must come before the next one
- What I should check in its output before continuing
- The prompt itself, ready to copy

Where two steps could be done in either order, say so.`,
  },
  {
    id: "meta-checklist",
    title: "Catch silent scope drops",
    useCase: "You gave six requirements and got output covering four.",
    category: "meta",
    tools: ["Any"],
    tip: "Numbering your requirements and demanding a per-item accounting is the only reliable way to catch what quietly got dropped.",
    prompt: `Below are my numbered requirements and your output.

Go through requirement by requirement. For each: quote the part of your output that addresses it, or say NOT ADDRESSED.

Do not fix anything yet. I want the accounting first.

Requirements:
1. [req]
2. [req]
3. [req]

Your output:
---
[paste]
---`,
  },
];
