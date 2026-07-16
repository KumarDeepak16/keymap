import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "writing-and-posts",
  title: "Writing posts, docs & content that isn't slop",
  summary:
    "Why AI writing reads as AI writing, and the prompting habits that fix it — angle, evidence, voice, and using the model as an editor instead of a ghostwriter.",
  level: "intermediate",
  minutes: 8,
  topics: ["Writing", "Content", "Editing"],
  accent: "red",
  takeaway:
    "Generated prose is average by construction. Supply the angle and the evidence yourself; use the model on the parts where average is fine.",
  sections: [
    {
      heading: "Why it reads as AI",
      body: [
        "A model asked for &ldquo;a post about X&rdquo; produces the most typical possible post about X, because typical is what prediction optimizes for. That is the tell. Not the vocabulary — the absence of a point of view, of specifics only you could know, of anything a reader would disagree with.",
        "No prompt fixes this by asking for it. &ldquo;Be original&rdquo; averages the way everything else averages. What fixes it is you supplying the two things the model cannot: the angle and the evidence.",
        "The angle is the claim someone could argue with. The evidence is the specific thing that happened — the number, the incident, the quote, the mistake you made. Bring those, and the model handles structure, transitions and cuts, which is genuinely useful work.",
      ],
      compare: {
        weak: "Write a LinkedIn post about remote work.",
        strong:
          "Write a LinkedIn post arguing that async-by-default fails for teams under 8 people, because coordination cost is lower than the cost of everyone reading a doc. My evidence: we moved from 4 standups a week to fully async in March, our cycle time got 30% worse, and we reverted in six weeks. Voice: first person, no rhetorical questions, no one-sentence-per-line formatting, no emoji. Under 200 words. End on the caveat that this reverses above ~15 people.",
        why: "The angle is arguable, the evidence is unrepeatable, and the voice constraints ban the specific things that make LinkedIn posts unreadable. Nothing here could have been generated from the topic alone.",
      },
    },
    {
      heading: "Use it as an editor, not a ghostwriter",
      body: [
        "The strongest workflow is inverted from what most people do: you write the bad first draft, the model tears it up, you rewrite. Your bad draft has your voice and your ideas in it already — badly expressed, but present. That is far more recoverable than a polished draft with nothing in it.",
        "Editing prompts also fail in a specific way worth guarding against: ask for feedback and you will get a rewrite. Say explicitly that you do not want one.",
      ],
      examples: [
        {
          label: "Hard edit, no rewrite",
          prompt:
            "Below is my draft. Do not rewrite it. Give me:\n\n1. The single sentence that carries the actual point — quote it. If you cannot find one, say so, and that is the most important thing you can tell me.\n2. Every paragraph that could be deleted without losing anything. Quote first four words of each.\n3. Where I am asserting something I have not earned.\n4. The most boring sentence, and why it is boring.\n\nDraft:\n[paste]",
          why: "Every item forces a quote or a specific location, so the feedback is actionable rather than a vibe. Question 1 failing is a gift — it means the draft has no point and no amount of polishing will give it one.",
        },
        {
          label: "Cut it in half",
          prompt:
            "Cut this to half its length. Rules: keep every specific — numbers, names, concrete examples. Cut abstractions, throat-clearing, and any sentence that only restates the previous one. Do not add anything. Show me the cut version only.\n\n[paste]",
          why: "Naming what to protect ('every specific') is what stops a length cut from deleting the substance and keeping the filler, which is the default failure.",
        },
      ],
    },
    {
      heading: "Getting the voice right",
      body: [
        "Adjectives do not transmit voice. &ldquo;Conversational but authoritative&rdquo; means nothing operational. Samples do transmit voice, and constraints on mechanics transmit it too: sentence length, whether you use questions, whether you use dashes, whether you hedge.",
        "Build a voice block once — three samples plus five mechanical rules — and reuse it forever. In tools with persistent instructions or projects, this belongs there, not in every prompt.",
      ],
      examples: [
        {
          label: "Reusable voice block",
          prompt:
            "VOICE REFERENCE — match this in everything you write for me.\n\nSamples of my writing:\n1. [paste ~100 words]\n2. [paste ~100 words]\n3. [paste ~100 words]\n\nMechanics:\n- Short sentences. Vary length, but never more than one long sentence in a row.\n- No rhetorical questions.\n- No em-dashes; use a full stop.\n- Never open with 'In today's...' or any variation.\n- Concrete nouns over abstractions. If a sentence has no thing in it, cut it.\n\nAcknowledge with one word, then wait for the task.",
          why: "Samples carry what rules cannot; rules catch the specific tics samples do not surface. 'Acknowledge with one word' stops it burning the turn on a summary of your own writing back at you.",
        },
      ],
    },
    {
      heading: "Structure is where it genuinely helps",
      body: [
        "Once you have the angle and the material, ordering it is real work and the model is good at it. Ask for three different structures rather than one — the ordering choice is usually more consequential than the sentences.",
      ],
      examples: [
        {
          label: "Three structures, then pick",
          prompt:
            "My angle: [one sentence someone could disagree with]\nMy material: [the specifics, evidence, anecdotes — bullet list is fine]\nAudience: [who]\nLength: [number] words\n\nGive me three different structures for this piece. Not three drafts — three outlines, each with a different opening move and a different order. For each, tell me in one line what it sacrifices. Then stop.",
          why: "'Then stop' prevents it from drafting all three, which wastes the turn and anchors you before you have chosen.",
        },
      ],
    },
  ],
};
