import { getDB, type AudioRecord } from "./schema";

export async function saveAudioBlob(id: string, blob: Blob): Promise<string> {
  const db = await getDB();
  const record: AudioRecord = { id, blob, createdAt: new Date().toISOString() };
  const key = await db.put("audio", record);
  return String(key);
}

export async function getAudioBlob(id: string): Promise<Blob | undefined> {
  const db = await getDB();
  const record = await db.get("audio", id);
  return record?.blob;
}

export async function deleteAudioBlob(id: string): Promise<void> {
  const db = await getDB();
  return db.delete("audio", id);
}