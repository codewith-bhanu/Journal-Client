"use client";

import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import type { Entry } from "@/types/entry";
import * as dbAudio from "@/lib/db/audio";
import * as dbSettings from "@/lib/db/settings";
import { countWords, computeStreak, totalMinutesSpoken } from "@/lib/utils/words";
import { useEntryStore } from "@/store/useEntryStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const dayKey = (date: Date) => format(date, "yyyy-MM-dd");

export default function DataSourceSmokePage() {
  const [lines, setLines] = useState<string[]>([]);
  const [status, setStatus] = useState<"running" | "done" | "error">("running");

  useEffect(() => {
    let mounted = true;
    const log = (line: string) => {
      console.log(line);
      if (mounted) setLines((prev) => [...prev, line]);
    };

    void (async () => {
      try {
        log("=== data layer smoke test ===");
        const entries = useEntryStore.getState();
        const settings = useSettingsStore.getState();

        await settings.hydrate();
        log(
          `settings hydrated: ${JSON.stringify(
            useSettingsStore.getState().settings,
          )}`,
        );

        const text =
          "Went for a long walk in the park today. The weather was perfect and I felt calm the whole time.";
        const audioKey = "audio-" + Date.now();
        const entry: Entry = {
          id: "smoke-" + Date.now(),
          date: dayKey(new Date()),
          createdAt: new Date().toISOString(),
          mode: "voice",
          rawText: text,
          audioBlobKey: audioKey,
          durationSeconds: 42,
          wordCount: countWords(text),
          tags: ["walk", "park"],
          reflection: {
            didToday: "Walked in the park.",
            learned: "Rest is productive.",
            challenges: "None.",
            goodMoments: "Crisp autumn air.",
            thoughts: "Slowing down helps.",
            tomorrow: "Repeat the walk.",
          },
          thinkingAnswers: [
            { question: "Why did this happen?", answer: "I set aside time." },
          ],
        };

        const blob = new Blob(["fake-audio-bytes"], { type: "audio/webm" });
        await dbAudio.saveAudioBlob(audioKey, blob);
        const blobReadBack = await dbAudio.getAudioBlob(audioKey);
        log(`audio blob round-trip bytes: ${blobReadBack?.size ?? -1}`);

        await entries.upsertEntry(entry);
        const readBack = await entries.getEntry(entry.date);
        log(
          `entry written & read back: ${readBack?.date} (${readBack?.wordCount} words, mode=${readBack?.mode})`,
        );

        const yesterdayEntry: Entry = {
          id: "smoke-y-" + Date.now(),
          date: dayKey(subDays(new Date(), 1)),
          createdAt: new Date().toISOString(),
          mode: "written",
          rawText: "Wrote a short note before bed.",
          wordCount: countWords("Wrote a short note before bed."),
          durationSeconds: 90,
        };
        await entries.upsertEntry(yesterdayEntry);

        const all = await entries.listEntries();
        log(`listEntries count: ${all.length} (newest first: ${all.map((e) => e.date).join(", ")})`);
        log(`countWords(text): ${countWords(text)}`);
        log(`computeStreak(all): ${computeStreak(all)}`);
        log(`totalMinutesSpoken(all): ${totalMinutesSpoken(all)}`);

        const results = await entries.searchEntries("park");
        log(
          `searchEntries("park") -> ${results.length} hit(s): ${results.map((e) => e.date).join(", ")}`,
        );

        await settings.update({ displayName: "Smoke Tester" });
        const saved = await dbSettings.getSettings();
        log(`settings persisted: displayName=${saved?.displayName}`);

        await entries.deleteEntry(entry.date);
        await entries.deleteEntry(yesterdayEntry.date);
        await dbAudio.deleteAudioBlob(audioKey);
        const afterCleanup = await entries.listEntries();
        log(`after cleanup: ${afterCleanup.length} entries remain`);

        log("=== smoke test complete ===");
        if (mounted) setStatus("done");
      } catch (error) {
        console.error(error);
        if (mounted) {
          setLines((prev) => [
            ...prev,
            `ERROR: ${error instanceof Error ? error.message : String(error)}`,
          ]);
          setStatus("error");
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 font-mono text-sm">
      <h1 className="mb-6 font-serif text-3xl text-ink">Data layer smoke test</h1>
      {status === "running" ? (
        <p className="mb-4 text-ink2">Running…</p>
      ) : status === "error" ? (
        <p className="mb-4 text-live">Failed — see console for the full error.</p>
      ) : (
        <p className="mb-4 text-accent">Passed — all steps completed.</p>
      )}
      <pre className="whitespace-pre-wrap rounded-lg border border-line bg-surface p-4 text-ink2">
        {lines.join("\n")}
      </pre>
    </main>
  );
}