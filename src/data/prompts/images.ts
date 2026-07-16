import type { LibraryPrompt } from "@/lib/types";

export const imagePrompts: LibraryPrompt[] = [
  {
    id: "image-anatomy",
    title: "The image prompt skeleton",
    useCase: "The order that works: subject, action, setting, style, light, framing, quality.",
    category: "images",
    tools: ["Midjourney", "DALL·E", "ChatGPT", "Gemini"],
    tip: "Front-load what matters. Most image models weight early words more heavily, so the subject goes first and the polish goes last.",
    prompt: `[subject — be specific: "a weathered brass compass", not "an object"], [what it is doing or how it sits], [setting and background], [art style or medium], [lighting], [camera framing and lens], [mood], [quality and detail cues]`,
  },
  {
    id: "image-photoreal",
    title: "Photorealistic image",
    useCase: "When it needs to look like a photograph, not an illustration.",
    category: "images",
    tools: ["Midjourney", "DALL·E"],
    tip: "Naming a real lens and aperture does more for realism than the word 'photorealistic', which most models treat as a style hint rather than a constraint.",
    prompt: `[subject, specific and concrete], [action or pose], [environment with real detail], shot on [35mm / 85mm] lens at [f/1.8], [natural window light / golden hour / overcast], [shallow depth of field], [eye-level / low angle], photorealistic, sharp focus on [the thing that must be sharp], subtle film grain

--ar [3:2] --style raw`,
  },
  {
    id: "image-negative",
    title: "Fix a generation that's close",
    useCase: "Almost right. One thing keeps going wrong.",
    category: "images",
    tools: ["Midjourney", "DALL·E", "ChatGPT"],
    tip: "Add what you want instead, not just what you don't want. 'No blur' works worse than 'sharp focus throughout'.",
    prompt: `Same as before, but: [the specific fix — state it as what you WANT, not what you don't]

Keep: [the parts that worked — name them explicitly]
Change only: [the one thing]

--no [artifact to exclude, e.g. text, watermark, extra fingers]`,
  },
  {
    id: "image-describe-to-prompt",
    title: "Reverse-engineer a reference image",
    useCase: "You have an image you like. You want the prompt that makes more like it.",
    category: "images",
    tools: ["ChatGPT", "Claude", "Gemini"],
    tip: "Do this in a vision-capable chat first, then paste the output into your image tool. Two tools, one workflow.",
    prompt: `Look at this image. Write the image-generation prompt that would produce something in the same visual family.

Break it down first:
- Subject and composition
- Style, medium, and any obvious influence
- Lighting: direction, quality, colour temperature
- Colour palette
- Camera: framing, angle, apparent focal length
- Mood

Then give me a single-line prompt combining them, ordered subject-first.
Then give me one line on what makes this image work that a prompt cannot capture.`,
  },
  {
    id: "image-brand-asset",
    title: "On-brand illustration or asset",
    useCase: "Blog headers, social cards, product illustrations that match a look.",
    category: "images",
    tools: ["Midjourney", "DALL·E"],
    tip: "Keep the style block in a note and reuse it verbatim. Consistency across a set comes from an identical style string, not from asking for consistency.",
    prompt: `[subject relevant to the article/product], [simple composition with clear negative space for text overlay], [flat vector illustration / editorial line art / isometric 3D], colour palette limited to [hex, hex, hex], [even soft lighting / no harsh shadows], [minimal, uncluttered], white background

--ar [16:9] --no text, letters, logos, watermarks`,
  },
  {
    id: "image-consistent-character",
    title: "Keep a character consistent",
    useCase: "Same person or mascot across multiple images.",
    category: "images",
    tools: ["Midjourney", "DALL·E"],
    tip: "Write the character block once, paste it identically every time, and change only the scene line. Any drift in the block means drift in the face.",
    prompt: `CHARACTER BLOCK — paste this identically in every generation:
[age] year old [description], [hair: colour, length, style], [eyes: colour], [distinguishing feature], wearing [specific outfit], [build]

SCENE — change only this line:
[what they are doing], [where], [lighting], [framing]

Style: [consistent style string — identical every time]
--ar [3:2] --seed [same number every time]`,
  },
];
