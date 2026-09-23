export type ThemePreference = "system" | "light" | "dark";

export type EntryStyle = "guided" | "free";

export interface Settings {
  displayName: string;
  reminderTime: string;
  defaultEntryStyle: EntryStyle;
  thinkingQuestionsOn: boolean;
  languageSuggestionsOn: boolean;
  biometricLockOn: boolean;
  theme: ThemePreference;
}

export const DEFAULT_SETTINGS: Settings = {
  displayName: "",
  reminderTime: "21:30",
  defaultEntryStyle: "guided",
  thinkingQuestionsOn: true,
  languageSuggestionsOn: true,
  biometricLockOn: false,
  theme: "system",
};