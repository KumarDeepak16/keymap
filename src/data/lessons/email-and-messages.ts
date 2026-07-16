import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "email-and-messages",
  title: "Email, Slack & hard conversations",
  summary:
    "Prompts for the writing you do every day — replies, follow-ups, saying no, chasing people, and the message you are dreading.",
  level: "beginner",
  minutes: 7,
  topics: ["Email", "Slack", "Daily use"],
  accent: "green",
  takeaway:
    "Give the model the thread and your rough intent in blunt words. Polishing your blunt intent is the job; inventing your intent is not.",
  sections: [
    {
      heading: "The pattern that covers most email",
      body: [
        "Nearly every useful email prompt is the same shape: here is the thread, here is what I actually want to say in unvarnished words, make it land well.",
        "The unvarnished part is the trick. Write your real feeling — &ldquo;this deadline is not happening and I am annoyed they moved it twice&rdquo; — and let the model handle diplomacy. If you pre-soften your intent, you get a reply that is vague about a thing you needed to be clear about.",
      ],
      examples: [
        {
          label: "Reply to a thread",
          prompt:
            "Draft my reply to the thread below.\n\nWhat I actually want to say, bluntly: [your real, unfiltered intent]\n\nRelationship: [e.g. external client, six months in, generally good]\nConstraints: keep it under 120 words, no bullet points, warm but not apologetic. Do not thank them for their patience.\n\nThread:\n---\n[paste]\n---",
          why: "The blunt-intent line carries the meaning; everything else controls delivery. The specific ban on one cliché works better than a general 'sound human'.",
        },
        {
          label: "Follow-up that isn't annoying",
          prompt:
            "I sent the email below 8 days ago and got no reply. Write a follow-up that gives them an easy way to respond without embarrassment, restates the one thing I need, and includes a specific date. Under 60 words. No 'just bumping this' and no 'circling back'.\n\nOriginal email:\n[paste]",
          why: "Naming the failure modes you have seen ('just bumping this') is the one time negative instructions earn their place.",
        },
      ],
    },
    {
      heading: "Saying no, pushing back, delivering bad news",
      body: [
        "This is where prompting pays for itself, because the hard part is not the words — it is being clear and kind at the same time while you are stressed.",
        "The key input is the thing you are protecting. A no that explains what you are protecting reads as a priority; a no that explains nothing reads as a brush-off. Tell the model what it is.",
      ],
      examples: [
        {
          label: "Decline without burning the bridge",
          prompt:
            "Help me say no to the request below.\n\nWhy I am saying no, honestly: [real reason]\nWhat I am protecting: [the commitment this would displace]\nWhat I can offer instead, if anything: [alternative, or 'nothing']\nRelationship I want to keep: [context]\n\nWrite it short, decisive, and without three paragraphs of apology. One clear no, one honest reason, one alternative if I have offered one.\n\nRequest:\n[paste]",
          why: "'One clear no, one honest reason, one alternative' is a structural constraint. It stops the model padding a decline into a hedge.",
        },
        {
          label: "Pressure-test before you send",
          prompt:
            "Below is a message I am about to send. Do not rewrite it. Tell me:\n\n1. How the recipient will most likely read the tone.\n2. The single sentence most likely to be misread, and how.\n3. What I have left ambiguous that they will have to guess at.\n4. If I am wrong or unfair anywhere, say so plainly.\n\nMessage:\n[paste]",
          why: "'Do not rewrite it' is load-bearing — otherwise you get a rewrite instead of a review. This one is worth running on anything sent while angry.",
        },
      ],
    },
    {
      heading: "Inbox triage",
      body: [
        "Reading is most of email. A model that reads a thread you were CC'd into halfway through will tell you what you missed faster than scrolling will.",
      ],
      examples: [
        {
          label: "Catch me up on a thread",
          prompt:
            "I was added to this thread late. In under 100 words: what is being decided, who disagrees with whom, and what — if anything — is being asked of me. If nothing is being asked of me, say so in the first line.\n\nThread:\n[paste]",
          why: "The 'say so in the first line' escape hatch is the whole point. Most threads you get CC'd into need nothing from you, and you want that answer immediately.",
        },
      ],
    },
    {
      heading: "A note on voice",
      body: [
        "Drafts that sound nothing like you are worse than no draft, because you spend longer un-writing them than you would have spent writing. The fix is a saved voice sample: two or three of your own emails you liked, pasted in with &ldquo;match this register.&rdquo;",
        "Keep them in a note. Paste them into the tools that support persistent instructions once, and you stop needing to paste them at all.",
      ],
    },
  ],
};
