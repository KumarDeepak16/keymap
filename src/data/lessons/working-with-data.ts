import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "working-with-data",
  title: "Working with data, spreadsheets & documents",
  summary:
    "Extraction, cleanup, formulas and analysis — plus the arithmetic trap that quietly produces confident wrong numbers.",
  level: "intermediate",
  minutes: 8,
  topics: ["Data", "Spreadsheets", "Analysis"],
  accent: "yellow",
  takeaway:
    "Models are excellent at turning messy text into structure and unreliable at doing arithmetic in their heads. Use the first, verify the second.",
  sections: [
    {
      heading: "The arithmetic trap",
      body: [
        "A language model predicts text. When it &ldquo;adds up&rdquo; a column, it is producing a plausible-looking number, not computing one — and plausible-looking numbers are the dangerous kind, because they pass a glance.",
        "Two rules keep you safe. First, ask for the formula or the code, not the answer: a SUMIFS you paste into Excel is checkable, a total in chat is not. Second, when a tool can actually run code, let it — the arithmetic then happens in a real interpreter rather than in prose.",
        "Extraction and restructuring are the opposite story. Turning 200 messy addresses into clean columns is exactly what these models are good at, and it is checkable at a glance.",
      ],
      compare: {
        weak: "What's the total revenue for Q3 in this data?",
        strong:
          "Write the Excel formula that gives Q3 revenue from this sheet. Columns: A=date, B=region, C=amount. Explain what the formula matches on so I can check it. Do not give me a number — I will run the formula myself.",
        why: "The first invites a fabricated total. The second produces an artifact you can verify and reuse next quarter.",
      },
    },
    {
      heading: "Messy text to clean structure",
      body: [
        "This is the highest-value daily use of prompting that most people never try. Anything with a shape — receipts, notes, job listings, survey answers, imported CSVs where someone typed the state name eleven different ways — can be normalized in one pass.",
        "The prompt needs three things: the exact output schema, a rule for unknowns, and a rule for ambiguity. Skip the last two and the model will silently invent values to fill your columns.",
      ],
      examples: [
        {
          label: "Extract to a table",
          prompt:
            "Extract the following fields from each entry below into a CSV.\n\nColumns, in this exact order: date (YYYY-MM-DD), vendor, amount (number only, no currency symbol), category (one of: travel, software, meals, other).\n\nRules:\n- If a field is missing, write UNKNOWN. Never guess.\n- If an entry is ambiguous, still output the row, and list the ambiguity below the table with the row number.\n- Output the CSV first, nothing before it.\n\nEntries:\n[paste]",
          why: "'Never guess' plus a required UNKNOWN token is what converts a hallucination into a visible gap you can fix.",
        },
        {
          label: "Normalize inconsistent values",
          prompt:
            "The column below has the same values entered inconsistently (case, abbreviations, typos, extra whitespace). Produce a two-column mapping: original value → normalized value. Do not merge two values unless you are confident they mean the same thing; list anything uncertain separately under 'NEEDS REVIEW'.\n\nValues:\n[paste]",
          why: "Getting a mapping rather than cleaned data means you can review the decisions before applying them — and reuse the mapping on the next export.",
        },
      ],
    },
    {
      heading: "Formulas and spreadsheet work",
      body: [
        "Describe your sheet's actual shape — column letters, headers, what a row means — and ask for the formula plus an explanation. The explanation is not a nicety; it is how you catch a formula that matches on the wrong column.",
        "For anything gnarlier than a lookup, ask for two approaches. The second one is often simpler, and seeing both tells you whether the first was overbuilt.",
      ],
      examples: [
        {
          label: "Formula with a check",
          prompt:
            "My sheet: row 1 is headers. A=order date, B=customer, C=region, D=amount, E=status. About 4,000 rows.\n\nI need: total amount for customers in 'West' with status 'shipped', in the last 90 days from today.\n\nGive me the formula, then explain in one line each what every argument matches on. Then tell me the most likely way this formula silently returns a wrong number.",
          why: "That last question is the one that catches text-formatted dates and trailing spaces — the two things that break this class of formula in practice.",
        },
      ],
    },
    {
      heading: "Analysis you can trust",
      body: [
        "When you want interpretation rather than calculation, force the reasoning into the open and ask for the counter-case. A model asked to find a trend will find one; a model asked whether the trend survives scrutiny sometimes says no.",
      ],
      examples: [
        {
          label: "Find the story, then attack it",
          prompt:
            "Data below. Do this in two passes.\n\nPass 1: What are the three most decision-relevant patterns here? For each, quote the specific rows or figures that support it.\n\nPass 2: For each pattern, argue against it. Is it explained by sample size, seasonality, a definition change, or an outlier? Say which of the three you would still bet on and why.\n\nData:\n[paste]",
          why: "Requiring quoted evidence in pass 1 makes fabrication visible. Pass 2 is the difference between analysis and confident narration.",
        },
      ],
    },
  ],
};
