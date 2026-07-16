import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "meta-prompting",
  title: "Meta-prompting: let it write the prompt",
  summary:
    "The technique that makes every other technique optional — asking the model to build, diagnose and improve your prompts instead of engineering them yourself.",
  level: "intermediate",
  minutes: 7,
  topics: ["Meta", "Technique", "Leverage"],
  accent: "purple",
  takeaway:
    "You do not need to know what a good prompt looks like. The model already does. You need to know what you want.",
  sections: [
    {
      heading: "The move",
      body: [
        "Everything in this course is a description of what good prompts contain. Here is the shortcut: the model has read more prompt-engineering material than you ever will, and it can apply it to your situation faster than you can recall it.",
        "So stop writing prompts. Describe the outcome you want and ask for the prompt that would produce it. This is meta-prompting, and it is the single highest-leverage habit in the whole discipline — not because it is clever, but because it moves the work to the part only you can do: knowing what you actually want.",
        "The trap is asking for a prompt with as little context as you would have put in the prompt itself. Then you get a generic template, which is worse than nothing. The fix is to make it interview you first.",
      ],
      examples: [
        {
          label: "Write the prompt for me",
          prompt:
            "I want to use an AI assistant to [describe the outcome you want, in plain words].\n\nDo not do the task. Write me the prompt that would do it well.\n\nFirst, ask me any questions whose answers would change the prompt — audience, format, constraints, context you would need. Ask them all at once.\n\nThen give me:\n1. The prompt itself, in a code block, ready to copy.\n2. Bracketed [holes] for anything I should swap per use.\n3. One line on which part is doing the heavy lifting, so I know what not to delete.",
          why: "'Do not do the task' is essential — without it you get the task done once, badly, instead of a reusable prompt. Point 3 is what teaches you: it tells you which constraint is load-bearing.",
        },
      ],
    },
    {
      heading: "Diagnose instead of retry",
      body: [
        "When a prompt produces something wrong, the instinct is to rerun it with slightly different words. That is guessing. The model can tell you what was missing, and it is right often enough to be worth the one extra turn.",
        "The critical input is the bad output. A prompt reviewed without its output is reviewed in the abstract; a prompt reviewed alongside what it produced is reviewed against evidence. The gap between the two is the entire diagnosis.",
      ],
      examples: [
        {
          label: "Diagnose a failing prompt",
          prompt:
            "Here is a prompt I wrote and the output it gave me. The output is wrong.\n\nMy prompt:\n---\n[paste]\n---\n\nWhat it gave me:\n---\n[paste the bad output]\n---\n\nWhat I actually wanted: [describe]\n\nDiagnose it:\n1. Which is missing — role, task, context, or format?\n2. What did I leave implicit that I assumed was obvious?\n3. Where is my wording ambiguous enough to be read two ways?\n4. Rewrite the prompt with the fix, and tell me what you changed and why.",
          why: "Question 2 is the one that pays. Almost every failed prompt fails because something obvious to you was never written down.",
        },
      ],
    },
    {
      heading: "Decomposition is a meta-prompt too",
      body: [
        "When a task is too big for one prompt, you do not have to work out the seams yourself. Ask where they are.",
        "The output is a sequence you run one at a time, checking each. That checking is the entire value — it is how you catch the wrong turn at step one instead of finding it baked into a finished deliverable at step four.",
      ],
      examples: [
        {
          label: "Break it into steps",
          prompt:
            "I need to [big task].\n\nDo not do it. Break it into the sequence of separate prompts I should run, where I read and correct the output at each step before moving on.\n\nFor each step:\n- What it produces\n- Why it must come before the next one\n- What I should check in its output before continuing\n- The prompt itself, ready to copy\n\nWhere two steps could be done in either order, say so.",
          why: "'What I should check' turns a plan into a workflow. Without it you get a list of steps and no idea whether step two is safe to start.",
        },
      ],
    },
    {
      heading: "Where meta-prompting doesn't help",
      body: [
        "It cannot supply the thing you have not decided. Ask for a prompt to &ldquo;write a good post about our product&rdquo; and you will get a well-structured prompt with a hole in it labelled [your angle] — because the angle was always yours to bring.",
        "That is not a failure. That is the technique doing its job: it isolates the part that is genuinely yours and hands the rest back done. When a generated prompt comes back with three brackets you cannot fill, you have learned that you do not yet know what you want. Better to learn it in the prompt than in the draft.",
      ],
    },
  ],
};
