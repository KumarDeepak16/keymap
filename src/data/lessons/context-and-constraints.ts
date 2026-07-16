import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "context-and-constraints",
  title: "Context, constraints & giving good source material",
  summary:
    "Why pasting the real document beats describing it, how much context is too much, and the constraints worth naming every time.",
  level: "beginner",
  minutes: 7,
  topics: ["Context", "Constraints", "Source material"],
  accent: "blue",
  takeaway:
    "Paste the thing. A summary of your source material is a lossy copy you made for a reader who never asked for one.",
  sections: [
    {
      heading: "Paste the source, don't describe it",
      body: [
        "The most common self-inflicted wound in daily prompting is describing a document instead of including it. &ldquo;I have an email from a client who seems annoyed about the timeline&rdquo; forces the model to work from your interpretation. Paste the email and it works from the evidence.",
        "This matters most exactly when you are least sure. If you already knew precisely what the client meant, you would not need help drafting the reply. Your summary bakes in the reading you are unsure about.",
        "Long context is cheap now. A model reading 4,000 words of real material will outperform one reading your 40-word gloss of it, nearly every time.",
      ],
      examples: [
        {
          label: "The paste-first pattern",
          prompt:
            "Below is the full email thread. Read it, then answer three questions:\n\n1. What is the client actually asking for, in one sentence?\n2. What are they worried about that they have not said outright?\n3. What is the smallest reply that addresses both?\n\nThread:\n---\n[paste the entire thread, including your own earlier replies]\n---",
          why: "Asking for the unstated worry is where this earns its keep. That only works if the model can see tone and phrasing, which your summary would have flattened.",
        },
      ],
    },
    {
      heading: "The constraints worth naming every time",
      body: [
        "Most disappointing outputs come from unstated constraints — things so obvious to you that you forgot they were not on the page. Five are worth checking before you send anything that matters.",
        "Audience: who reads this and what do they already know? Length: a number, not an adjective. Tone: name a register, or better, point at an example. Scope: what is explicitly out of bounds. Purpose: what should happen after someone reads it — a decision, an approval, a laugh.",
        "Purpose is the one people skip and the one that changes the answer most. &ldquo;Summarize this meeting&rdquo; and &ldquo;summarize this meeting so my manager can approve the budget without reading it&rdquo; produce different documents from identical source material.",
      ],
      compare: {
        weak: "Summarize these meeting notes.",
        strong:
          "Summarize these meeting notes for my manager, who was not there and has two minutes. She needs to approve a $12k spend. Lead with what we are asking for and the number. Then three bullets of justification. Cut everything that does not help her decide. Notes below:",
        why: "Same input, different artifact. The second summary is built around a decision; the first is built around the notes.",
      },
    },
    {
      heading: "Too much context is a real failure mode",
      body: [
        "Padding is not free. If you dump six documents and only one is relevant, the model has to guess which one you meant, and it will sometimes guess by recency or length rather than relevance.",
        "The fix is labels, not deletion. Say what each block is and how to treat it: &ldquo;the spec is authoritative, the Slack thread is background, ignore anything in the old draft that contradicts the spec.&rdquo; Ranking your sources is a constraint like any other.",
      ],
      examples: [
        {
          label: "Ranking multiple sources",
          prompt:
            "You have three inputs. Treat them with different weight:\n\nSOURCE OF TRUTH — the current spec:\n[paste]\n\nBACKGROUND — a Slack discussion, may contain outdated ideas:\n[paste]\n\nSTYLE REFERENCE — a doc I like the tone of, ignore its content:\n[paste]\n\nTask: write the implementation summary. Where the Slack thread contradicts the spec, the spec wins and you should flag the contradiction at the end.",
          why: "Naming each block's authority prevents the classic failure where a stale Slack message silently overrides the real requirement.",
        },
      ],
    },
    {
      heading: "Let it ask you first",
      body: [
        "For anything long or high-stakes, the cheapest improvement is to invert the order: make the model interview you before it writes. You will discover constraints you did not know you had.",
        "This costs one extra exchange and routinely saves three rounds of &ldquo;no, not like that.&rdquo;",
      ],
      examples: [
        {
          label: "Interview me first",
          prompt:
            "I need to write [thing]. Before you draft anything, ask me the five questions whose answers would most change what you write. Ask them all at once, numbered. Do not draft until I answer.",
          why: "Forcing all questions in one batch keeps it to a single round-trip. The instruction not to draft matters — otherwise you get questions plus an unwanted first draft that anchors everything after it.",
        },
      ],
    },
  ],
};
