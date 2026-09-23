import { getDB } from "./schema";
import type { Settings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/types/settings";

const SETTINGS_KEY = "app";

export async function getSettings(): Promise<Settings | undefined> {
  const db = await getDB();
  return db.get("settings", SETTINGS_KEY);
}

export async function updateSettings(partial: Partial<Settings>): Promise<Settings> {
  const db = await getDB();
  const current = (await db.get("settings", SETTINGS_KEY)) ?? DEFAULT_SETTINGS;
  const next = { ...current, ...partial };
  await db.put("settings", next, SETTINGS_KEY);
  return next;
}