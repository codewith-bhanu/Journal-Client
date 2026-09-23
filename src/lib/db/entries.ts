import { getDB } from "./schema";
import type { Entry } from "@/types/entry";

export interface EntryListRange {
  from?: string;
  to?: string;
}

export async function getEntry(date: string): Promise<Entry | undefined> {
  const db = await getDB();
  return db.get("entries", date);
}

export async function listEntries(range?: EntryListRange): Promise<Entry[]> {
  const db = await getDB();
  const entries = range
    ? await db.getAll("entries", toKeyRange(range))
    : await db.getAll("entries");
  return entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function upsertEntry(entry: Entry): Promise<string> {
  const db = await getDB();
  const key = await db.put("entries", entry);
  return String(key);
}

export async function deleteEntry(date: string): Promise<void> {
  const db = await getDB();
  return db.delete("entries", date);
}

export async function deleteAllEntries(): Promise<void> {
  const db = await getDB();
  await db.clear("entries");
  await db.clear("audio");
}

export async function searchEntries(query: string): Promise<Entry[]> {
  const q = query.trim().toLowerCase();
  const all = await listEntries();
  if (!q) return all;

  return all.filter((entry) => {
    const haystack = [
      entry.rawText,
      entry.reflection?.didToday ?? "",
      entry.reflection?.learned ?? "",
      entry.reflection?.challenges ?? "",
      entry.reflection?.goodMoments ?? "",
      entry.reflection?.thoughts ?? "",
      entry.reflection?.tomorrow ?? "",
      ...(entry.tags ?? []),
    ]
      .join("\n")
      .toLowerCase();
    return haystack.includes(q);
  });
}

function toKeyRange(range: EntryListRange): IDBKeyRange | undefined {
  if (range.from && range.to) return IDBKeyRange.bound(range.from, range.to);
  if (range.from) return IDBKeyRange.lowerBound(range.from);
  if (range.to) return IDBKeyRange.upperBound(range.to);
  return undefined;
}