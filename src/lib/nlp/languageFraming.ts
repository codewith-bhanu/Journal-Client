import type { LanguageFraming } from "@/types/entry";

export async function getLanguageFraming(entryText: string): Promise<LanguageFraming[]> {
  // TODO: Replace this stub with a real LLM call that rewrites the entry in
  // clearer language and extracts phrasing suggestions from `entryText`.
  const sentences = entryText
    .trim()
    .split(/(?<=[.!?])\s+/u)
    .filter((s) => s.length > 0);

  const firstSentence = sentences[0] ?? "I had a day worth writing about.";

  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      original: firstSentence,
      improved: firstSentence,
      phrases: [
        "Instead of just listing what happened, say how it made you feel.",
        "Try swapping vague words like 'good' for something more specific.",
      ],
    },
  ];
}