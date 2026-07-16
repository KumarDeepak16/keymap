import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "humanize-output",
  title: "Removing AI patterns from text",
  summary:
    "The specific tells that mark writing as generated, why “make it sound human” never works, and what to say instead.",
  level: "intermediate",
  minutes: 8,
  topics: ["Humanize", "Editing", "Voice"],
  accent: "red",
  takeaway:
    "You cannot ask for “human”. You can ban an em-dash. Name the pattern or nothing changes.",
  sections: [
    {
      heading: "Why the obvious instruction fails",
      body: [
        "&ldquo;Make it sound more human&rdquo; produces text that sounds exactly as generated as before, occasionally with a contraction added. This is not the model being stubborn. It is that &ldquo;human&rdquo; is not a target — it is the absence of a hundred specific habits, and the model cannot aim at an absence.",
        "&ldquo;No em-dashes&rdquo; works. &ldquo;Never open a sentence with Moreover&rdquo; works. &ldquo;Vary your sentence length; some should be four words&rdquo; works. Every one of them is checkable, which is exactly why they work.",
        "So the job is not to ask for humanity. It is to know the tells by name.",
      ],
      compare: {
        weak: "Rewrite this so it sounds more natural and human, less like AI wrote it.",
        strong:
          "Rewrite this. Remove: every 'It's not just X, it's Y' construction; all em-dashes (use full stops); every list of exactly three adjectives; the words delve, leverage, robust, seamless, landscape, realm, tapestry; rhetorical questions used as transitions; the summary paragraph at the end. Vary sentence length — at least two sentences under six words. Do not change the meaning.",
        why: "The second is a checklist. Every item can be verified in the output, which is why it changes the output. The first is a wish.",
      },
    },
    {
      heading: "The tells, by name",
      body: [
        "Structural: paragraphs of near-identical length; a section that summarizes the section you just read; tricolons everywhere — lists of exactly three, forever; the &ldquo;It&rsquo;s not just X, it&rsquo;s Y&rdquo; construction; a conclusion that restates rather than lands.",
        "Lexical: delve, leverage, robust, seamless, landscape, realm, tapestry, testament, underscore, crucial, vital, pivotal, navigate (metaphorically), unlock, elevate. None of these are bad words. They are just words that appear at ten times the human rate in generated text.",
        "Rhythmic: the em-dash used for dramatic pause, over and over. Rhetorical questions as transitions. &ldquo;Moreover&rdquo;, &ldquo;Furthermore&rdquo;, &ldquo;Additionally&rdquo; opening sentences. Hedging pairs — &ldquo;can help to&rdquo;, &ldquo;may potentially&rdquo;, &ldquo;often tends to&rdquo; — where one word would do.",
        "And the deepest one, which is not a phrase at all: vagueness. Generated text describes categories where a person would name a thing. &ldquo;Various stakeholders raised concerns&rdquo; instead of &ldquo;Priya said the migration would break billing.&rdquo; No wordlist catches this, because the problem is that the specific was never there.",
      ],
      examples: [
        {
          label: "The de-slop pass",
          prompt:
            "Rewrite the text below to remove the patterns that make writing read as AI-generated.\n\nRemove specifically:\n- \"It's not just X, it's Y\" and every variant of that construction\n- \"In today's fast-paced world\" and any variation\n- Em-dashes used for dramatic pause. Use a full stop.\n- Tricolons: every list of exactly three adjectives\n- \"Delve\", \"leverage\", \"robust\", \"seamless\", \"landscape\", \"realm\", \"tapestry\", \"testament\", \"underscore\", \"crucial\", \"vital\", \"pivotal\"\n- Rhetorical questions used as transitions\n- Paragraphs that all run to the same length\n- Sentences that begin \"Moreover\", \"Furthermore\", \"Additionally\"\n- A summary paragraph that restates what was just said\n- Hedging pairs: \"can help to\", \"may potentially\", \"often tends to\"\n\nReplace with:\n- Varied sentence length. Some very short.\n- Plain verbs.\n- The specific noun instead of the category noun.\n\nDo not change the meaning or cut the substance.\n\nText:\n---\n[paste]\n---",
          why: "Long, ugly, and it works. Keep it in a note and paste it. This is not a prompt you compose each time — it is a tool you own.",
        },
        {
          label: "Learn your own tells",
          prompt:
            "Below is a piece of text. Do not rewrite it.\n\nPoint out every sentence, phrase, or structural habit that reads as machine-generated. For each: quote it, name the pattern, and say why it reads that way.\n\nThen tell me: if you had to guess, which three habits does this writer repeat most?\n\nText:\n---\n[paste]\n---",
          why: "Run this a few times and you stop needing it. That is the point — the goal is to spot the tells yourself, not to own a laundering machine.",
        },
      ],
    },
    {
      heading: "The specificity problem",
      body: [
        "Every tell above is cosmetic. You can strip all of them and still have text that reads as generated, because the real signal is that nothing in it could only have been written by you.",
        "A model cannot fix this, because the missing thing is information it does not have. What it can do is find the holes and ask you to fill them — which is a genuinely different and much more useful request than &ldquo;improve this&rdquo;.",
      ],
      examples: [
        {
          label: "Interrogate the vagueness",
          prompt:
            "Below is my text. Do not rewrite it.\n\nFind every sentence that makes a general claim without a specific behind it. For each, quote it and ask me the question whose answer would make it concrete — the number, the name, the incident, the date.\n\nList the questions. I will answer them and then you rewrite.\n\nText:\n---\n[paste]\n---",
          why: "This inverts the relationship. The model is not writing for you; it is extracting what only you know. That is the one workflow that reliably produces text a machine could not have written.",
        },
      ],
    },
    {
      heading: "The read-aloud test",
      body: [
        "The cheapest check needs no prompt at all: read it aloud as if to one person across a table. Every sentence you would never actually say is a sentence to cut. Readers hear text in their heads even when reading silently, which is why this test catches what the eye skips.",
        "You can hand the test to the model, but do it after your own pass — you will catch things it does not, because you know how you sound.",
      ],
      examples: [
        {
          label: "Read-aloud test",
          prompt:
            "Read the text below as if speaking it aloud to one person across a table.\n\nFlag every sentence that no human would say out loud in that situation. For each, quote it and give me what a person would actually say instead.\n\nDo not rewrite the whole thing. Just the sentences that fail the test.\n\nText:\n---\n[paste]\n---",
          why: "Restricting it to failing sentences keeps your structure intact. A full rewrite would fix the rhythm and quietly flatten everything else.",
        },
      ],
    },
    {
      heading: "A word on detectors",
      body: [
        "AI-detection tools are unreliable in both directions: they flag human writing, especially from non-native speakers, and they miss generated text that has been edited at all. Writing to beat a detector optimizes for a broken referee.",
        "Write to be worth reading instead. The habits that make text pass as human — specificity, a real point of view, rhythm that varies, a willingness to say something someone could disagree with — are the same habits that make it good. That is not a coincidence. Generated text reads as generated because it is average, and average is what you were trying to escape.",
      ],
    },
  ],
};
