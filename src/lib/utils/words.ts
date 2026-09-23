import type { Entry } from "@/types/entry";

export function countWords(text: string): number {
  const words = text.trim().match(/\S+/g);
  return words ? words.length : 0;
}

export function computeStreak(entries: Entry[]): number {
  const dates = new Set(entries.map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if (!dates.has(toDayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (dates.has(toDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function totalMinutesSpoken(entries: Entry[]): number {
  const totalSeconds = entries.reduce(
    (sum, entry) => sum + (entry.durationSeconds ?? 0),
    0,
  );
  return Math.round((totalSeconds / 60) * 10) / 10;
}

function toDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}