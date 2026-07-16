import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "prompting-basics",
  title: "How prompting actually works",
  summary:
    "The mental model behind every good prompt — and the four parts that turn a vague question into a useful answer.",
  level: "beginner",
  minutes: 6,
  topics: ["Fundamentals", "Structure", "Context"],
  accent: "purple",
  takeaway:
    "A model can only work with what is on the page. Everything you leave out, it guesses.",
  sections: [
    {
      heading: "The one-sentence mental model",
      body: [
        "A language model does not know what you want. It reads your words and continues them in the most plausible way. That is the whole machine. Everything that makes a prompt good follows from it.",
        "So the question is never &ldquo;what should I ask?&rdquo; It is &ldquo;what would a competent stranger need to know to do this well?&rdquo; A stranger cannot see your screen, your team, your deadline or your taste. If it matters to the answer, it has to be in the prompt.",
        "This is why the same request can produce a throwaway answer one day and a genuinely useful one the next. The model did not change. The context did.",
      ],
      compare: {
        weak: "Write a blog post about productivity.",
        strong:
          "Write a 700-word blog post about why time-blocking fails for people with reactive jobs (support, sales, ops). Audience: knowledge workers who have already tried and abandoned time-blocking. Tone: direct, no hustle-culture clichés. Include one concrete alternative and one honest caveat.",
        why: "The second prompt names the length, the angle, the reader, the tone, and what to include. None of that is extra politeness — each line removes a decision the model would otherwise make badly.",
      },
    },
    {
      heading: "The four parts of a working prompt",
      body: [
        "Almost every strong prompt has the same skeleton: role, task, context, format. You do not need labels or headers — you just need all four present somewhere.",
        "Role sets the frame: who is answering. Task is the verb: what to actually do. Context is everything the model cannot infer: the audience, constraints, background, source material. Format is the shape of the output: length, structure, medium.",
        "When an answer disappoints, one of the four is usually missing. Answer too generic? Missing context. Answer the wrong shape? Missing format. Answer hedging and shallow? Missing role. Answer off-target entirely? The task verb was ambiguous.",
      ],
      examples: [
        {
          label: "The skeleton, filled in",
          prompt:
            "You are an experienced technical writer.\n\nRewrite the release note below so a non-technical customer understands what changed and why they should care.\n\nContext: our users are small-business owners, not engineers. They do not know what a webhook is. The change is a real improvement but sounds boring in engineering terms.\n\nFormat: two short paragraphs, no jargon, no bullet points, under 120 words.\n\nRelease note:\n[paste here]",
          why: "Role, task, context, format — in that order, separated by blank lines. Swap the role and the source material and this template covers most rewriting work you will ever do.",
        },
        {
          label: "Minimal version for quick tasks",
          prompt:
            "Summarize the text below for someone who has 30 seconds and needs to decide whether to read the whole thing. Three bullets max, plain language, lead with the decision-relevant fact.\n\n[paste here]",
          why: "Not every task needs a role line. The test is whether the four parts are answerable from the prompt — here the task, context and format are all present in one sentence.",
        },
      ],
    },
    {
      heading: "Say what you want, not what you don't",
      body: [
        "&ldquo;Don&rsquo;t be verbose&rdquo; is weaker than &ldquo;under 100 words.&rdquo; &ldquo;Don&rsquo;t sound like AI&rdquo; is weaker than &ldquo;short sentences, no em-dashes, no phrases like &lsquo;in today&rsquo;s fast-paced world&rsquo;.&rdquo; Negative instructions describe an enormous space of things to avoid; positive instructions describe the one thing to hit.",
        "Use negatives only for specific, nameable failures you have actually seen. A ban on one clichéd phrase works. A ban on &ldquo;being generic&rdquo; does not.",
      ],
    },
    {
      heading: "Show, don't only tell",
      body: [
        "The fastest way to communicate taste is an example. One sample of the output you want teaches more than three paragraphs describing it — tone, structure, level of detail and vocabulary all travel with the example at once.",
        "This is worth the copy-paste. If you have a previous piece of work you were happy with, paste it and say &ldquo;match this voice.&rdquo; If you do not, write two lines by hand in the style you want and say &ldquo;continue in exactly this register.&rdquo;",
      ],
      examples: [
        {
          label: "Teaching voice with one sample",
          prompt:
            "Here is a paragraph I wrote that I am happy with:\n\n[paste your paragraph]\n\nMatch this voice — same sentence rhythm, same level of formality, same willingness to be blunt — and write the next section, which should cover [topic].",
          why: "You are not asking the model to guess your style from adjectives. You are handing it the target.",
        },
      ],
    },
  ],
};
