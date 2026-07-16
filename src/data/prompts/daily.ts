import type { LibraryPrompt } from "@/lib/types";

export const dailyPrompts: LibraryPrompt[] = [
  {
    id: "daily-meeting-notes",
    title: "Meeting notes to decisions",
    useCase: "Raw notes or a transcript, turned into what actually got decided.",
    category: "daily",
    tools: ["Claude", "ChatGPT", "Gemini"],
    tip: "The 'discussed but not decided' section is the valuable one. It is where next week's confusion comes from.",
    prompt: `Turn the notes below into a decision record.

Structure:
1. Decisions made — what, and who owns it. If ownership was not assigned, write UNASSIGNED.
2. Action items — one line each, with owner and date. If no date was given, write NO DATE.
3. Discussed but not decided — the open loops.
4. Disagreements that were not resolved.

Rules:
- Do not invent an owner or a date. Missing is information.
- Quote the notes for anything contested.
- If something was decided implicitly and never said out loud, flag it separately as "assumed".

Notes:
---
[paste]
---`,
  },
  {
    id: "daily-decision",
    title: "Think through a decision",
    useCase: "You're stuck between options and going in circles.",
    category: "daily",
    tools: ["Claude", "ChatGPT"],
    tip: "The 'what would you need to believe' framing is what surfaces the assumption you have not examined.",
    prompt: `I am deciding: [the decision]

Options: [A], [B], [maybe C]
What I am optimizing for: [the real goal]
Constraints: [money, time, people, reversibility]
What I am afraid of: [the honest fear]

Do not recommend anything yet. First:
1. For each option — what would I need to believe for this to be the right call?
2. Which of those beliefs am I least sure about?
3. What is the cheapest way to test that belief before committing?
4. Which option is most reversible if I am wrong?

Then give your recommendation and your confidence.`,
  },
  {
    id: "daily-plan-week",
    title: "Plan a week that survives contact",
    useCase: "Planning that accounts for the fact that your week will not go to plan.",
    category: "daily",
    tools: ["Claude", "ChatGPT"],
    tip: "Asking what to cut is the part people skip. A plan with nothing cut is a wishlist.",
    prompt: `Help me plan this week.

Everything on my list: [dump it all, unsorted]
Fixed commitments: [meetings, deadlines that cannot move]
Realistic focus hours available: [be honest — not 40]
What actually matters most this week: [the one thing]

Give me:
1. What to cut or defer. Be specific and be ruthless — my list is longer than my week.
2. What to do first, and why that order.
3. Where the plan breaks if [likely interruption] happens, and what I drop first.

Do not give me a timetable. Give me an order and a cut list.`,
  },
  {
    id: "daily-explain",
    title: "Explain something properly",
    useCase: "Learning a new concept, tool, or domain from zero.",
    category: "daily",
    tools: ["Claude", "ChatGPT", "Gemini"],
    tip: "Naming what you already know is what stops it explaining from scratch or over your head. Both waste your time.",
    prompt: `Explain [concept] to me.

What I already know: [adjacent things you understand]
What I do not know: [be honest]
Why I am learning it: [the actual reason — it changes what matters]

Structure:
1. The one-paragraph version, using an analogy from something I already know.
2. How it actually works, in the detail my background supports.
3. The thing people get wrong about it.
4. When it does NOT apply — the limits.
5. One question I should be able to answer if I understood it.

Do not oversimplify to the point of being wrong. If a simplification is lossy, say what it loses.`,
  },
  {
    id: "daily-devils-advocate",
    title: "Red-team my plan",
    useCase: "Before you commit to something you're excited about.",
    category: "daily",
    tools: ["Claude", "ChatGPT"],
    tip: "The escape hatch at the end matters. Without it, a model told to attack will manufacture objections and you cannot tell them from the real ones.",
    prompt: `Below is a plan. You are not helping me improve it. You are trying to kill it.

Find:
- The assumption that, if wrong, breaks the whole thing
- The failure mode I have not named
- The cheaper option I should have considered
- Who this annoys that I have not thought about

Be specific and be harsh. If the plan is genuinely fine, say that in one line and stop rather than inventing objections.

Plan:
[paste]`,
  },
  {
    id: "daily-extract-table",
    title: "Messy text to clean table",
    useCase: "Receipts, listings, notes, form responses — anything with a shape.",
    category: "daily",
    tools: ["Claude", "ChatGPT", "Gemini"],
    tip: "'Never guess' plus a required UNKNOWN token is what turns a silent hallucination into a visible gap you can fix.",
    prompt: `Extract the following fields from each entry below into a CSV.

Columns, in this exact order: [date (YYYY-MM-DD), vendor, amount (number only), category (one of: x, y, z)]

Rules:
- If a field is missing, write UNKNOWN. Never guess.
- If an entry is ambiguous, still output the row, and list the ambiguity below the table with the row number.
- Output the CSV first, nothing before it.

Entries:
---
[paste]
---`,
  },
  {
    id: "daily-formula",
    title: "Spreadsheet formula with a check",
    useCase: "Excel or Sheets formula you can actually verify.",
    category: "daily",
    tools: ["Any"],
    tip: "Never ask a model for the total. Ask for the formula. A number in chat is unverifiable; a formula you paste is checkable and reusable.",
    prompt: `My sheet: row 1 is headers. [A=order date, B=customer, C=region, D=amount, E=status]. About [4,000] rows.

I need: [what you want calculated]

Give me:
1. The formula.
2. One line per argument explaining what it matches on.
3. The most likely way this formula silently returns a wrong number.

Do not give me the answer as a number — I will run the formula myself.`,
  },
];
