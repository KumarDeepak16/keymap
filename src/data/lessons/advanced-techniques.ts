import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "advanced-techniques",
  title: "Advanced techniques & building your own system",
  summary:
    "Decomposition, forcing reasoning into the open, adversarial checks, reusable instructions — and the failure modes worth knowing before they bite.",
  level: "advanced",
  minutes: 9,
  topics: ["Technique", "Systems", "Verification"],
  accent: "purple",
  takeaway:
    "One prompt for one job. Most bad outputs are a chain of three tasks crammed into a sentence, hoping the model unpacks them in the right order.",
  sections: [
    {
      heading: "Decompose before you prompt",
      body: [
        "&ldquo;Analyze our churn data and write a plan&rdquo; is three tasks: find patterns, decide what they mean, propose actions. Asked at once, the model commits to an interpretation in its first sentence and then reasons in service of it. The plan is downstream of a conclusion it reached before it had looked properly.",
        "Split them. Extract first, interpret second, decide third — reading and correcting the output at each step. The correction is the whole point: you catch the wrong turn at step one instead of finding it baked into a finished plan.",
        "The rule of thumb: if you would not hand this to one person and walk away, do not hand it to one prompt.",
      ],
    },
    {
      heading: "Make the reasoning visible, then attack it",
      body: [
        "Asking for the reasoning before the answer does two things: it gives the model room to work, and it gives you something to audit. An answer you cannot check is a rumor.",
        "The stronger move is adversarial. Models are agreeable by default — they will find support for whatever you imply you believe. Explicitly asking for the counter-case, or asking a fresh conversation to attack a conclusion without knowing you produced it, catches things no amount of polite double-checking will.",
      ],
      examples: [
        {
          label: "Reason first, answer last",
          prompt:
            "Work through this before answering. Structure your response as:\n\n1. What the question is actually asking, restated.\n2. What information you have, and what is missing.\n3. Your reasoning, step by step. Where you are uncertain, say 'uncertain:' and continue.\n4. Answer.\n5. What would have to be true for your answer to be wrong.\n\nQuestion: [your question]",
          why: "Step 2 surfaces missing information before it gets papered over. Step 5 is where genuinely shaky answers admit it.",
        },
        {
          label: "Red-team a decision",
          prompt:
            "Below is a plan. You are not helping me improve it. You are trying to kill it.\n\nFind the assumption that, if wrong, breaks the whole thing. Find the failure mode I have not named. Find the cheaper option I should have considered. Be specific and be harsh — if the plan is fine, say that in one line and stop rather than inventing objections.\n\nPlan:\n[paste]",
          why: "The escape hatch at the end matters. Without it, a model told to attack will manufacture objections to a sound plan, and you cannot tell the manufactured ones from the real ones.",
        },
        {
          label: "Blind second opinion",
          prompt:
            "In a fresh conversation, paste only the source material and the conclusion — not the reasoning that produced it:\n\nHere is some material and a conclusion someone drew from it. Do you agree? Work independently — do not assume the conclusion is right. If you would draw a different conclusion, say what and why.\n\nMaterial:\n[paste]\n\nTheir conclusion:\n[paste]",
          why: "A model that has seen its own reasoning will defend it. A clean conversation with no ownership of the conclusion disagrees far more readily.",
        },
      ],
    },
    {
      heading: "Build a system, not a pile of prompts",
      body: [
        "The compounding move is to stop rewriting prompts and start keeping them. Every tool now has somewhere to put persistent instructions — Claude&rsquo;s Projects and custom instructions, ChatGPT&rsquo;s custom instructions and Projects, a note file you paste from. It does not matter which. What matters is that your voice block, your constraints, and the three prompts you use weekly live somewhere you are not retyping them.",
        "Then treat them as code. When a prompt produces a bad output, do not just rerun it — figure out which of the four parts was missing and fix the saved copy. A prompt you have fixed six times is worth more than a clever one you wrote once.",
        "The parameterized template is the unit worth building. Same skeleton, bracketed holes, one copy-paste from a note. The examples throughout this course are written that way on purpose.",
      ],
      examples: [
        {
          label: "Persistent instruction block",
          prompt:
            "Standing instructions for this project:\n\nWhat we are doing: [one paragraph — enough that a competent stranger could follow a conversation]\nWho reads the output: [audience]\nDefault format: [length, structure]\nVocabulary: [terms of art, plus anything to never call something]\nHouse rules:\n- If a request is ambiguous, ask rather than guessing.\n- If I am wrong about something, say so directly. Do not lead with agreement.\n- Say 'I don't know' rather than producing a plausible answer.\n- No preamble. Start with the substance.",
          why: "The 'do not lead with agreement' and 'say I don't know' lines fight the two default behaviors that cost the most in practice.",
        },
      ],
    },
    {
      heading: "Failure modes worth naming",
      body: [
        "Fabrication under pressure: a model asked for five examples will produce five, inventing the ones it lacks. If four real ones exist, you will not be told. Fix: give an explicit out — &ldquo;list as many as you can support, and say how many you found.&rdquo;",
        "Sycophantic drift: over a long conversation, pushback erodes. Agreement compounds. If a thread has gone twenty turns and everything you say is a good point, start a fresh one.",
        "Anchoring on the first draft: whatever appears first shapes everything after. This is why &ldquo;ask before drafting&rdquo; and &ldquo;outline, then stop&rdquo; keep appearing above — they keep the anchor from landing before you have chosen where.",
        "Silent scope drop: given six requirements, output covering four often reads as complete. Fix: number your requirements and ask for a checklist of how each was addressed. Confidence is a style, not a signal — it tracks how confidently the training data discussed the topic, not whether this particular answer is right.",
      ],
    },
  ],
};
