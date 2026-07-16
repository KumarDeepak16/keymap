import type { LibraryPrompt } from "@/lib/types";

export const emailPrompts: LibraryPrompt[] = [
  {
    id: "email-reply",
    title: "Reply to any email",
    useCase: "The everyday workhorse — you know what you want to say, you want it to land well.",
    category: "email",
    tools: ["Any"],
    tip: "The blunt-intent line does the work. Write your real feeling, not a pre-softened version — softening is the model's job, deciding is yours.",
    prompt: `Draft my reply to the thread below.

What I actually want to say, bluntly: [your real, unfiltered intent]

Relationship: [e.g. external client, six months in, generally good]
Constraints: under [120] words, no bullet points, warm but not apologetic. Do not thank them for their patience.

Thread:
---
[paste]
---`,
  },
  {
    id: "email-followup",
    title: "Follow-up that isn't annoying",
    useCase: "They went quiet. You need an answer without sounding like a debt collector.",
    category: "email",
    tools: ["Any"],
    tip: "Banning the specific clichés you hate ('just bumping this') works far better than asking it to 'sound natural'.",
    prompt: `I sent the email below [8] days ago and got no reply. Write a follow-up that:
- gives them an easy way to respond without embarrassment
- restates the one thing I need
- includes a specific date

Under 60 words. No "just bumping this", no "circling back", no "I wanted to follow up".

Original email:
[paste]`,
  },
  {
    id: "email-decline",
    title: "Say no without burning the bridge",
    useCase: "Declining a request, invitation, or piece of work you cannot take on.",
    category: "email",
    tools: ["Any"],
    tip: "Naming what you are protecting is what makes a no read as a priority instead of a brush-off.",
    prompt: `Help me say no to the request below.

Why I am saying no, honestly: [real reason]
What I am protecting: [the commitment this would displace]
What I can offer instead, if anything: [alternative, or "nothing"]
Relationship I want to keep: [context]

Write it short and decisive, without three paragraphs of apology. Structure: one clear no, one honest reason, one alternative if I offered one.

Request:
[paste]`,
  },
  {
    id: "email-bad-news",
    title: "Deliver bad news",
    useCase: "A slip, a mistake, a price rise, a cancellation. The email you are dreading.",
    category: "email",
    tools: ["Claude", "ChatGPT"],
    tip: "Lead-with-the-news is non-negotiable and models drift away from it. If the draft buries the bad part in paragraph two, say so and regenerate.",
    prompt: `I need to tell [recipient] that [the bad news].

Context they need: [background]
What caused it, honestly: [cause — including my own fault if any]
What I am doing about it: [remedy]
What I need from them: [action, or "nothing"]

Rules:
- Lead with the news in the first sentence. Do not warm up to it.
- Own the part that is mine. No passive voice hiding the actor.
- No over-apologizing. One apology maximum.
- End with the concrete next step, not a feeling.

Under [150] words.`,
  },
  {
    id: "email-catch-up",
    title: "Catch me up on a thread",
    useCase: "You got CC'd into 40 messages and need to know if you matter.",
    category: "email",
    tools: ["Any"],
    tip: "The 'say so in the first line' escape hatch is the point — most threads need nothing from you and you want that answer instantly.",
    prompt: `I was added to this thread late. In under 100 words: what is being decided, who disagrees with whom, and what — if anything — is being asked of me.

If nothing is being asked of me, say so in the first line.

Thread:
[paste]`,
  },
  {
    id: "email-pressure-test",
    title: "Pressure-test before you send",
    useCase: "Run this on anything written while angry, or anything going to someone senior.",
    category: "email",
    tools: ["Claude", "ChatGPT"],
    tip: "'Do not rewrite it' is load-bearing. Without it you get a rewrite instead of a review, and you learn nothing about your own draft.",
    prompt: `Below is a message I am about to send. Do not rewrite it. Tell me:

1. How the recipient will most likely read the tone.
2. The single sentence most likely to be misread, and how.
3. What I have left ambiguous that they will have to guess at.
4. If I am wrong or unfair anywhere, say so plainly.

Message:
[paste]`,
  },
  {
    id: "email-cold-outreach",
    title: "Cold outreach that gets opened",
    useCase: "First contact with someone who has no reason to care.",
    category: "email",
    tools: ["Any"],
    tip: "The specific-observation line is the entire email. If you cannot fill it in with something real, you have not done enough homework to send this.",
    prompt: `Write a cold email to [person, role, company].

Why them specifically — a real, specific observation about their work or company: [the homework you did]
What I want: [the single ask]
Why it is worth their time: [value to them, not to me]
Proof I am not wasting their time: [credential, mutual connection, relevant result]

Rules:
- Under 90 words.
- Subject line under 6 words, no hype, no clickbait.
- The specific observation goes in the first sentence.
- One ask. Make it small and easy to say yes to.
- No "I hope this finds you well". No "I'll keep this brief".`,
  },
  {
    id: "email-chase-invoice",
    title: "Chase an overdue payment",
    useCase: "Firm, professional, doesn't torch the client relationship.",
    category: "email",
    tools: ["Any"],
    tip: "Escalate in stages. Run this at 'gentle' first; save 'firm' for round three. The tone parameter is the whole point.",
    prompt: `Write a payment reminder.

Invoice: [number], [amount], due [date], now [X] days overdue.
History: [have they paid late before? is this the first reminder?]
Relationship: [ongoing client / one-off / already ended]
Tone: [gentle / firm / final notice before escalation]

Rules:
- State the facts and the number in the first two lines.
- No apology for asking to be paid.
- Give one clear action and a date.
- Keep the door open unless I said "final notice".`,
  },
];
