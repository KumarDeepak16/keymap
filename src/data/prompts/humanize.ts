import type { LibraryPrompt } from "@/lib/types";

export const humanizePrompts: LibraryPrompt[] = [
  {
    id: "humanize-strip-patterns",
    title: "Strip the AI tells",
    useCase: "The text is fine but reads as generated. This names the specific tells.",
    category: "humanize",
    tools: ["Claude", "ChatGPT"],
    tip: "This works because it bans named patterns. “Make it sound human” does not work — human is not a style the model can aim at, but “no em-dashes” is.",
    prompt: `Rewrite the text below to remove the patterns that make writing read as AI-generated.

Remove specifically:
- "It's not just X, it's Y" and every variant of that construction
- "In today's fast-paced world" and any variation
- Em-dashes used for dramatic pause. Use a full stop.
- Tricolons: every list of exactly three adjectives
- "Delve", "leverage", "robust", "seamless", "landscape", "realm", "tapestry", "testament", "underscore", "crucial", "vital", "pivotal"
- Rhetorical questions used as transitions
- Paragraphs that all run to the same length
- Sentences that begin "Moreover", "Furthermore", "Additionally"
- A summary paragraph that restates what was just said
- Hedging pairs: "can help to", "may potentially", "often tends to"

Replace with:
- Varied sentence length. Some very short.
- Plain verbs.
- The specific noun instead of the category noun.

Do not change the meaning or cut the substance.

Text:
---
[paste]
---`,
  },
  {
    id: "humanize-find-tells",
    title: "Find the tells without fixing them",
    useCase: "Learn what your generated text keeps doing wrong, so you stop shipping it.",
    category: "humanize",
    tools: ["Claude", "ChatGPT"],
    tip: "Do this once on a few pieces and you will start spotting the tells yourself. Then you need this prompt less, which is the goal.",
    prompt: `Below is a piece of text. Do not rewrite it.

Point out every sentence, phrase, or structural habit that reads as machine-generated. For each: quote it, name the pattern, and say why it reads that way.

Then tell me: if you had to guess, which three habits does this writer (or model) repeat most?

Text:
---
[paste]
---`,
  },
  {
    id: "humanize-match-voice",
    title: "Rewrite in my actual voice",
    useCase: "Generated draft, your voice. Samples do what adjectives cannot.",
    category: "humanize",
    tools: ["Claude", "ChatGPT"],
    tip: "Three real samples beat any description of your style. If you only have one, use one — still better than adjectives.",
    prompt: `Here are three samples of my writing:

1. [paste ~100 words]
2. [paste ~100 words]
3. [paste ~100 words]

First: describe my voice back to me in terms of mechanics — sentence length and variation, punctuation habits, how I open, how I hedge or don't, vocabulary level, what I never do.

Then: rewrite the draft below to match those mechanics. Not the topic — the mechanics.

Draft:
---
[paste]
---`,
  },
  {
    id: "humanize-add-specificity",
    title: "Replace abstraction with specifics",
    useCase: "The text is vague. Vagueness is the deepest AI tell, and the hardest to fix.",
    category: "humanize",
    tools: ["Claude", "ChatGPT"],
    tip: "This one interrogates you rather than fixing the text — because only you have the specifics. That is exactly why generated text is vague.",
    prompt: `Below is my text. Do not rewrite it.

Find every sentence that makes a general claim without a specific behind it. For each, quote it and ask me the question whose answer would make it concrete — the number, the name, the incident, the date.

List the questions. I will answer them and then you rewrite.

Text:
---
[paste]
---`,
  },
  {
    id: "humanize-read-aloud",
    title: "The read-aloud test",
    useCase: "Text that's technically fine but nobody would ever say out loud.",
    category: "humanize",
    tools: ["Claude", "ChatGPT"],
    tip: "Anything that fails the read-aloud test fails the reader too. They hear it in their head even when they read silently.",
    prompt: `Read the text below as if speaking it aloud to one person across a table.

Flag every sentence that no human would say out loud in that situation. For each, quote it and give me what a person would actually say instead.

Do not rewrite the whole thing. Just the sentences that fail the test.

Text:
---
[paste]
---`,
  },
  {
    id: "humanize-anti-sycophancy",
    title: "Kill the agreement reflex",
    useCase: "Twenty turns in, everything you say is 'a great point'. Time to reset.",
    category: "humanize",
    tools: ["Claude", "ChatGPT"],
    tip: "Better used in a fresh conversation. Sycophancy compounds over a long thread and instructions late in that thread fight everything before them.",
    prompt: `For the rest of this conversation:

- Do not open a response by telling me my question or idea is good, interesting, or insightful. Start with the substance.
- If I am wrong, say so in the first sentence. Do not sandwich it between compliments.
- If I push back on something and I am still wrong, hold your position and say why. Changing your answer because I sounded unhappy is worse than useless to me.
- If you do not know, say "I don't know" rather than producing something plausible.
- If my premise is broken, address the premise instead of answering the question.

Acknowledge in one word.`,
  },
];
