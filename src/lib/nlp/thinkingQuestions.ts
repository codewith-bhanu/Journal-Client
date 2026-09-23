const THINKING_QUESTIONS = [
  "Why did this happen?",
  "How did you feel about it?",
  "What did you learn from this?",
  "What would you do differently?",
];

export async function generateThinkingQuestions(entryText: string): Promise<string[]> {
  // TODO: Replace this stub with a real LLM call that generates questions
  // grounded in `entryText` (see the Thinking Practice list in the spec).
  void entryText;

  await new Promise((resolve) => setTimeout(resolve, 600));

  return THINKING_QUESTIONS;
}