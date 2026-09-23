"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/Modal";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useEntryStore } from "@/store/useEntryStore";

const ENTRY_STYLE_OPTIONS = [
  { value: "guided", label: "Guided" },
  { value: "free", label: "Free" },
] as const;

function formatTime(value: string): string {
  if (!value) return "Never";
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function audioSummary(minutes: number): string {
  if (minutes < 1) return "no audio";
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
  return `${hours} hour${hours === 1 ? "" : "s"} ${rest} minute${rest === 1 ? "" : "s"}`;
}

function SettingText({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[15px] font-medium text-ink">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-ink3">{description}</p>
    </div>
  );
}

export default function JournallingSection() {
  const settings = useSettingsStore((s) => s.settings);
  const update = useSettingsStore((s) => s.update);
  const clearAll = useEntryStore((s) => s.clearAll);

  const [stats, setStats] = useState({ count: 0, minutes: 0 });
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    let alive = true;
    void useEntryStore.getState().listEntries().then((entries) => {
      if (!alive) return;
      const minutes = Math.round(
        entries.reduce((sum, entry) => sum + (entry.durationSeconds ?? 0), 0) / 60,
      );
      setStats({ count: entries.length, minutes });
    });
    return () => {
      alive = false;
    };
  }, []);

  const handleDelete = () => {
    void clearAll().then(() => {
      setStats({ count: 0, minutes: 0 });
      setConfirmDelete(false);
    });
  };

  const entryCountLabel = `${stats.count} ${stats.count === 1 ? "entry" : "entries"}`;
  const deleteSummary = `${entryCountLabel} and ${audioSummary(stats.minutes)}. This cannot be undone.`;

  return (
    <div>
      {/* Heading */}
      <div className="mb-9 space-y-1.5">
        <h2 className="font-serif text-[32px] leading-tight text-ink">
          Journalling
        </h2>
        <p className="text-sm text-ink2">
          How and when the app asks about your day.
        </p>
      </div>

      {/* Journalling settings card */}
      <Card padding={false}>
        <ul className="divide-y divide-line">
          <li className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <SettingText
              title="Daily reminder"
              description="A single notification. Never more than one a day."
            />
            <div className="flex-shrink-0">
              <label className="relative inline-flex cursor-pointer items-center rounded-full border border-line bg-surface px-4 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-ink3 focus-within:border-accent">
                {formatTime(settings.reminderTime)}
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(event) =>
                    void update({ reminderTime: event.target.value })
                  }
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Set daily reminder time"
                />
              </label>
            </div>
          </li>

          <li className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <SettingText
              title="Default entry style"
              description="What opens when you press W."
            />
            <div className="flex flex-shrink-0 gap-1.5">
              {ENTRY_STYLE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => void update({ defaultEntryStyle: option.value })}
                  aria-pressed={settings.defaultEntryStyle === option.value}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors",
                    settings.defaultEntryStyle === option.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line bg-surface2 text-ink3 hover:text-ink",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </li>

          <li className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <SettingText
              title="Thinking questions"
              description="Follow-up questions after you save an entry."
            />
            <div className="flex-shrink-0">
              <Toggle
                checked={settings.thinkingQuestionsOn}
                onChange={(checked) =>
                  void update({ thinkingQuestionsOn: checked })
                }
                label="Thinking questions"
              />
            </div>
          </li>

          <li className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <SettingText
              title="English suggestions"
              description="A clearer version offered alongside your own words."
            />
            <div className="flex-shrink-0">
              <Toggle
                checked={settings.languageSuggestionsOn}
                onChange={(checked) =>
                  void update({ languageSuggestionsOn: checked })
                }
                label="English suggestions"
              />
            </div>
          </li>
        </ul>
      </Card>

      {/* Export */}
      <Card className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <SettingText
          title="Export everything"
          description="Plain text and original audio, in a single zip."
        />
        <Button
          variant="surface"
          size="md"
          className="flex-shrink-0 rounded-full"
        >
          Export
        </Button>
      </Card>

      {/* Delete */}
      <div className="mt-8 border-t border-line pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <SettingText
            title="Delete all entries"
            description={`${deleteSummary}`}
          />
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="flex-shrink-0 self-start rounded-full border border-live/50 bg-live/10 px-5 py-2 text-[13px] font-medium text-live transition-colors hover:bg-live/20 sm:self-auto"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete all entries?"
        description="This permanently deletes every entry and all recorded audio on this device. This cannot be undone."
        confirmLabel="Delete everything"
        destructive
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}