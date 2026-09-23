export type EntryMode = "voice" | "written";

export interface Reflection {
  didToday?: string;
  learned?: string;
  challenges?: string;
  goodMoments?: string;
  thoughts?: string;
  tomorrow?: string;
}

export interface ThinkingAnswer {
  question: string;
  answer: string;
}

export interface LanguageFraming {
  original: string;
  improved: string;
  phrases: string[];
}

export interface Entry {
  id: string;
  date: string;
  createdAt: string;
  mode: EntryMode;
  rawText: string;
  audioBlobKey?: string;
  durationSeconds?: number;
  wordCount: number;
  tags?: string[];
  guidedAnswers?: Record<string, string>;
  reflection?: Reflection;
  thinkingAnswers?: ThinkingAnswer[];
  languageFraming?: LanguageFraming[];
}

export type DraftEntry = Partial<Entry>;