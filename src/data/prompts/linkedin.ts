import type { LibraryPrompt } from "@/lib/types";

export const linkedinPrompts: LibraryPrompt[] = [
  {
    id: "linkedin-post",
    title: "LinkedIn post that isn't cringe",
    useCase: "The default LinkedIn voice is a parody. This bans it explicitly.",
    category: "linkedin",
    tools: ["Claude", "ChatGPT"],
    tip: "The banned-patterns list is the whole prompt. Every item on it is a real thing the models do unprompted on this platform.",
    prompt: `Write a LinkedIn post.

My claim — something someone could disagree with: [the claim]
My evidence — what actually happened, with specifics: [the story, the numbers, the mistake]
Audience: [who, and why they should care]
Length: under [200] words

Banned, without exception:
- One-sentence-per-line formatting
- "Here's the thing." / "Let that sink in." / "Agree?"
- Rhetorical questions as paragraph breaks
- Emoji bullets
- A humble-brag disguised as a lesson
- "I'm humbled to announce"
- Ending with an engagement-bait question

Required:
- Open with the specific fact or moment. No setup.
- The claim appears in the first three lines, before the "see more" cut.
- End on the caveat or the limit of what I learned.`,
  },
  {
    id: "linkedin-story",
    title: "Turn a real event into a post",
    useCase: "Something happened at work. There's a post in it, but not the obvious one.",
    category: "linkedin",
    tools: ["Claude", "ChatGPT"],
    tip: "Asking for three angles first is what stops you writing the same 'lesson learned' post as everyone else.",
    prompt: `Here is something that happened: [what happened, in plain words, including the parts that make you look bad]

Before writing anything, give me three different angles this could be a post about. One of them should be the non-obvious reading — the thing most people would miss.

For each, one line on who it would land with.

Then stop. I will pick one.`,
  },
  {
    id: "linkedin-comment",
    title: "Comment worth leaving",
    useCase: "Add something to someone's post instead of 'Great insight!'",
    category: "linkedin",
    tools: ["Any"],
    tip: "Under-40-words is the constraint that makes this work. Longer and it reads as hijacking the thread.",
    prompt: `Below is someone's post. Write a comment that adds something they did not say — a counter-example, a nuance, a related specific from my own experience.

My relevant experience: [what you actually know about this]

Rules:
- Under 40 words.
- No compliment opener. No "Great post".
- Do not restate their point back to them.
- If I have nothing genuinely additive to say, tell me that instead of writing something.

Post:
[paste]`,
  },
  {
    id: "linkedin-profile",
    title: "Profile headline & about section",
    useCase: "Your profile currently says “Passionate about driving innovation”.",
    category: "linkedin",
    tools: ["Claude", "ChatGPT"],
    tip: "Feed it your actual work history and results. Adjective-only inputs produce adjective-only outputs.",
    prompt: `Rewrite my LinkedIn headline and About section.

What I actually do: [plain description, no buzzwords]
Concrete results: [numbers, shipped things, scale — specifics only]
Who I want to find me: [recruiters for X / clients for Y / peers in Z]
What makes me different from others with the same title: [the honest answer]

Rules:
- Headline: under 12 words, says what I do and for whom. No "|" chains of buzzwords.
- About: [150] words, first person, opens with a specific not a mission statement.
- Banned: passionate, driven, results-oriented, thought leader, synergy, innovative, dynamic.
- Every claim backed by one of my concrete results or cut.`,
  },
  {
    id: "linkedin-announcement",
    title: "Announcement without the cringe",
    useCase: "New job, launch, milestone. Needs to be said without “I'm thrilled to share”.",
    category: "linkedin",
    tools: ["Any"],
    tip: "The 'why it matters to them' line is what turns an announcement into something worth reading rather than a status update.",
    prompt: `I need to announce: [the thing]

Context: [what led here, honestly — including the hard parts]
Why it matters to the reader, not just to me: [the actual value to them]
Who I genuinely want to thank, and specifically for what: [names and reasons, or "nobody"]

Rules:
- Under 120 words.
- Do not open with "I'm thrilled/excited/humbled to announce".
- Do not thank a list of people for nothing specific.
- One honest sentence about what was hard.
- No hashtag pile at the end. Two maximum, or none.`,
  },
];
