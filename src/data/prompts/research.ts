import type { LibraryPrompt } from "@/lib/types";

export const researchPrompts: LibraryPrompt[] = [
  {
    id: "research-brief",
    title: "Research brief with sources",
    useCase: "You need to understand a topic properly and be able to check the answer.",
    category: "research",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "Turn web search on. Without it, a model asked for sources will produce plausible-looking URLs that go nowhere — the single most common way people get burned.",
    prompt: `Research [topic] and give me a brief.

Structure:
1. The 5-sentence version — what someone needs to know if they read nothing else.
2. The current state of play, with dates. Flag anything that changed in the last 12 months.
3. Where credible people disagree, and what the disagreement actually turns on.
4. What is genuinely unknown or unsettled.
5. Sources — real URLs only, with the date each was published.

Rules:
- Use web search. Do not answer from memory.
- If you cannot find a source for a claim, mark it [UNVERIFIED] and keep it separate.
- Distinguish "I found evidence for this" from "this is widely assumed".
- Where a number appears, name the source and the year in the same sentence.`,
  },
  {
    id: "research-verify",
    title: "Fact-check a claim",
    useCase: "Someone asserted something confidently. You want to know if it holds.",
    category: "research",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "Ask for the strongest counter-evidence explicitly. A model asked to check a claim tends to find support for it.",
    prompt: `Fact-check this claim: [claim]

Do this in four steps:
1. Restate what would have to be true for the claim to hold.
2. Search for the strongest evidence FOR it. Cite sources with dates.
3. Search for the strongest evidence AGAINST it. Cite sources with dates.
4. Verdict: true / mostly true / misleading / false / unverifiable. Say which, and say what evidence would change your mind.

Use web search. If the claim rests on a statistic, trace it to the primary source, not to an article quoting it.`,
  },
  {
    id: "research-compare",
    title: "Compare options for a decision",
    useCase: "Tools, vendors, approaches — anything where you need to pick one.",
    category: "research",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "Stating your constraints turns a generic comparison table into an actual recommendation. Skip them and you get a Wikipedia summary.",
    prompt: `I am choosing between: [option A], [option B], [option C].

My situation:
- What I am actually trying to do: [goal]
- Constraints: [budget, team size, timeline, existing stack, must-haves]
- What I will regret most if I get it wrong: [the real risk]

Give me:
1. A comparison on the dimensions that matter TO ME — not a generic feature table.
2. The strongest case for each, in one paragraph each.
3. What each one's users complain about after 6 months. Search for this; do not guess.
4. Your recommendation and your confidence in it.
5. The one question I should answer before deciding.

Use web search for anything about current pricing, features or reputation.`,
  },
  {
    id: "research-summarize-doc",
    title: "Summarize a document for a decision",
    useCase: "A long report, contract, or spec that someone needs to act on.",
    category: "research",
    tools: ["Claude", "ChatGPT"],
    tip: "Naming the decision changes the artifact completely. Same document, different summary depending on what happens next.",
    prompt: `Summarize the document below for [who], who needs to [the decision they must make].

Rules:
- Lead with what they need to decide and the number or fact that drives it.
- Everything that does not help that decision gets cut.
- Quote the document directly for anything load-bearing — give me the page or section.
- If the document does not actually answer the question, say so in the first line.
- Under [200] words, then a "details if you want them" section.

Document:
---
[paste]
---`,
  },
  {
    id: "research-literature",
    title: "Find what's actually known",
    useCase: "Deeper research where you need the state of the evidence, not a blog summary.",
    category: "research",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "The 'who funded it' question catches a surprising amount. Run it on anything health, nutrition, or industry-adjacent.",
    prompt: `I want to understand what is actually known about [question].

For each significant finding:
- What was studied, on whom, how many, over what period
- Who funded or published it
- How strong the evidence is (single study / replicated / meta-analysis / consensus)
- What the finding does NOT say — the common overreach

Then:
- Where does the evidence genuinely conflict?
- What is treated as settled that is not?
- What is the honest current answer to my question, including "we do not know" if that is the answer?

Use web search. Prefer primary sources and reviews over news coverage of them.`,
  },
  {
    id: "research-interview-me",
    title: "Interview me before you research",
    useCase: "Big research task where you are not sure what you are actually asking.",
    category: "research",
    tools: ["Claude", "ChatGPT"],
    tip: "One extra round-trip, saves three rounds of 'no, not that'. Batching the questions keeps it to a single exchange.",
    prompt: `I need to research [rough topic]. Before you search anything, ask me the five questions whose answers would most change what you look for and what you report back.

Ask them all at once, numbered. Do not start researching until I answer.`,
  },
];
