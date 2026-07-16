import type { LibraryPrompt } from "@/lib/types";

export const writingPrompts: LibraryPrompt[] = [
  {
    id: "writing-blog-post",
    title: "Blog post from your angle and evidence",
    useCase: "A real post — one with a point, built from things you actually know.",
    category: "writing",
    tools: ["Claude", "ChatGPT"],
    tip: "If you cannot fill in the angle with something arguable, stop. A post with no arguable claim is the thing everyone scrolls past, and no prompt fixes that.",
    prompt: `Write a blog post.

My angle — a claim someone could reasonably disagree with: [the claim]
My evidence — specifics only I have: [numbers, incidents, quotes, what went wrong]
Audience: [who, and what they already believe about this]
Length: [800] words
Voice: [describe, or paste a sample below]

Rules:
- Open with the specific, not the abstract. No "In today's landscape".
- Every section earns its place by advancing the argument.
- Include the strongest objection to my claim and answer it honestly.
- End on the caveat or the limit, not a call to action.
- No rhetorical questions. No em-dashes.`,
  },
  {
    id: "writing-research-post",
    title: "Data-backed post with real sources",
    useCase: "A post that cites real figures — and doesn't invent them.",
    category: "writing",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "Two passes matter. A single-pass 'write a post with stats' is how fabricated statistics end up under your name.",
    prompt: `Two passes. Do not skip to the writing.

PASS 1 — research. Search for current data on [topic]. For each figure: the number, the source, the year, and the sample or method. Show me this as a list. Anything you cannot source, say so and drop it. Stop after this pass and wait.

PASS 2 — after I confirm the figures, write a [700]-word post using ONLY the verified figures from pass 1.
Angle: [my claim]
Audience: [who]
Rules: every number appears with its source in the same sentence. No figure that did not survive pass 1. No rounding that changes the meaning.`,
  },
  {
    id: "writing-hard-edit",
    title: "Hard edit — no rewrite",
    useCase: "Your draft exists. You need to know what's wrong with it, not have it replaced.",
    category: "writing",
    tools: ["Claude", "ChatGPT"],
    tip: "Question 1 coming back empty is a gift. It means the draft has no point and polishing will not give it one.",
    prompt: `Below is my draft. Do not rewrite it. Give me:

1. The single sentence that carries the actual point — quote it. If you cannot find one, say so, and that is the most important thing you can tell me.
2. Every paragraph that could be deleted without losing anything. Quote the first four words of each.
3. Where I am asserting something I have not earned.
4. The most boring sentence, and why it is boring.
5. What a skeptical reader stops reading at, and why.

Draft:
---
[paste]
---`,
  },
  {
    id: "writing-cut-in-half",
    title: "Cut it in half",
    useCase: "Too long, and every sentence feels necessary. They aren't.",
    category: "writing",
    tools: ["Any"],
    tip: "Naming what to protect stops the default failure, where a length cut deletes your specifics and keeps your throat-clearing.",
    prompt: `Cut this to half its length.

Rules:
- Keep every specific: numbers, names, concrete examples, anything only I could have written.
- Cut abstractions, throat-clearing, and any sentence that restates the previous one.
- Do not add anything. Do not smooth it into blandness.
- Show me the cut version only.

[paste]`,
  },
  {
    id: "writing-three-structures",
    title: "Three structures, then stop",
    useCase: "You have the material. The ordering is the hard part.",
    category: "writing",
    tools: ["Claude", "ChatGPT"],
    tip: "'Then stop' prevents it drafting all three, which wastes the turn and anchors you before you have chosen.",
    prompt: `My angle: [one arguable sentence]
My material: [the specifics, evidence, anecdotes — bullets are fine]
Audience: [who]
Length: [number] words

Give me three different structures for this piece. Not three drafts — three outlines, each with a different opening move and a different order. For each, tell me in one line what it sacrifices.

Then stop.`,
  },
  {
    id: "writing-voice-block",
    title: "Reusable voice reference",
    useCase: "Set this once per project. Everything after it sounds like you.",
    category: "writing",
    tools: ["Claude", "ChatGPT"],
    tip: "Put this in Claude Projects or ChatGPT custom instructions and stop pasting it. That is the whole point of a persistent instruction.",
    prompt: `VOICE REFERENCE — match this in everything you write for me.

Samples of my writing:
1. [paste ~100 words]
2. [paste ~100 words]
3. [paste ~100 words]

Mechanics:
- Short sentences. Vary length, but never two long sentences in a row.
- No rhetorical questions.
- No em-dashes. Use a full stop.
- Never open with "In today's..." or any variation.
- Concrete nouns over abstractions. If a sentence has no thing in it, cut it.

Acknowledge with one word, then wait for the task.`,
  },
  {
    id: "writing-newsletter",
    title: "Newsletter issue",
    useCase: "Recurring format, needs to not feel like a template every week.",
    category: "writing",
    tools: ["Claude", "ChatGPT"],
    tip: "The 'what I got wrong' slot is the one that makes newsletters worth reading. Leave it in even when it stings.",
    prompt: `Write this week's newsletter issue.

The one idea: [single thing worth their time]
Why now: [what prompted it]
My material: [specifics, links, what happened]
What I got wrong recently, if anything: [honesty slot]
Audience: [who, and what they subscribed for]
Length: [400] words

Rules:
- Subject line under 8 words. Curiosity, not clickbait.
- Open with the thing itself, not with a greeting or a recap.
- One idea. If a second good idea appears, note it for next week and cut it.
- No "hope you're having a great week".`,
  },
];
