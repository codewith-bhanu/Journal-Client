import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Entry } from "@/types/entry";
import type { Settings } from "@/types/settings";

export interface AudioRecord {
  id: string;
  blob: Blob;
  createdAt: string;
}

export interface AppDBSchema extends DBSchema {
  entries: {
    key: string;
    value: Entry;
  };
  audio: {
    key: string;
    value: AudioRecord;
  };
  settings: {
    key: string;
    value: Settings;
  };
}

export const DB_NAME = "my-daily-life";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<AppDBSchema>> | null = null;

export function getDB(): Promise<IDBPDatabase<AppDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<AppDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("entries")) {
          db.createObjectStore("entries", { keyPath: "date" });
        }
        if (!db.objectStoreNames.contains("audio")) {
          db.createObjectStore("audio", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings");
        }
      },
    });
  }
  return dbPromise;
}