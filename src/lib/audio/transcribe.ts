export async function transcribeAudio(blob: Blob): Promise<string> {
  // TODO: Replace this stub with a real speech-to-text provider call.
  //  1. Upload `blob` to the provider (Whisper, Deepgram, AssemblyAI, etc.).
  //  2. Return the transcribed text.
  // The entry's `audioBlobKey` references the same blob persisted via `lib/db/audio`.
  void blob;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return "Today I went for a long walk in the park and watched the leaves fall. It felt good to take a break and just breathe.";
}