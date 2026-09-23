"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, subDays } from "date-fns";
import { ChevronRight, Mic, Pen, Save } from "lucide-react";
import ColumnRailLayout from "@/components/layout/ColumnRailLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import Skeleton from "@/components/ui/Skeleton";
import BarChart from "@/components/ui/BarChart";
import { useEntryStore } from "@/store/useEntryStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { computeStreak } from "@/lib/utils/words";
import type { Entry, Reflection } from "@/types/entry";

const REFLECTION_PROMPTS: { key: keyof Reflection; label: string }[] = [
  { key: "goodMoments", label: "What was good today?" },
  { key: "challenges", label: "What was difficult?" },
  { key: "learned", label: "What did I learn?" },
  { key: "tomorrow", label: "What do I want to do tomorrow?" },
  { key: "didToday", label: "What did I do today?" },
  { key: "thoughts", label: "What's on my mind?" },
];

function dayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function greetingForTime(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function greetingSubtitleForTime(hour: number): string {
  if (hour < 12)
    return "Take a moment to set your intention. A few lines is all it takes.";
  if (hour < 17)
    return "Say it out loud or type it — whichever is easier right now. Nobody else reads this.";
  return "Say it out loud or type it — whichever is easier tonight. Nobody else reads this.";
}

function excerptOf(text: string, maxWords = 15): string {
  const words = text.trim().split(/\s+/);
  const cut = words.slice(0, maxWords).join(" ");
  return words.length > maxWords ? `${cut}…` : cut;
}

interface TodayData {
  dateLabel: string;
  days: string[];
  greeting: string;
  greetingSubtitle: string;
  yesterday: Entry | undefined;
  all: Entry[];
}

export default function TodayPage() {
  const router = useRouter();
  const displayName = useSettingsStore((s) => s.settings.displayName);
  const getEntry = useEntryStore((s) => s.getEntry);
  const listEntries = useEntryStore((s) => s.listEntries);
  const setDraftField = useEntryStore((s) => s.setDraftField);

  const [data, setData] = useState<TodayData | null>(null);
  const [draftText, setDraftText] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, i) =>
      dayKey(subDays(now, 6 - i)),
    );

    void (async () => {
      const [yesterday, all] = await Promise.all([
        getEntry(dayKey(subDays(now, 1))),
        listEntries(),
      ]);
      if (!alive) return;
      setData({
        dateLabel: format(now, "EEEE, d MMMM"),
        days,
        greeting: greetingForTime(now.getHours()),
        greetingSubtitle: greetingSubtitleForTime(now.getHours()),
        yesterday,
        all,
      });
    })();

    return () => {
      alive = false;
    };
  }, [getEntry, listEntries]);

  const headline = data
    ? displayName.trim()
      ? `${data.greeting}, ${displayName.trim()}. How was your day?`
      : `${data.greeting}. How was your day?`
    : "";

  const todayKey = data?.days[6] ?? "";
  const todayEntry = data?.all.find((entry) => entry.date === todayKey);

  const filledCount = todayEntry?.reflection
    ? REFLECTION_PROMPTS.filter(
        (prompt) => (todayEntry.reflection?.[prompt.key] ?? "").trim(),
      ).length
    : 0;

  const weekMinutes = data
    ? data.days.map((day) => {
        const totalSeconds = data.all
          .filter((entry) => entry.date === day)
          .reduce((sum, entry) => sum + (entry.durationSeconds ?? 0), 0);
        return Math.round(totalSeconds / 60);
      })
    : [];
  const weekMax = weekMinutes.length ? Math.max(...weekMinutes, 1) : 1;
  const weekDaysJournalled = weekMinutes.filter((m) => m > 0).length;
  const streak = data ? computeStreak(data.all) : 0;

  const handleDraftSubmit = () => {
    if (!data) return;
    const value = draftText.trim();
    if (!value) return;
    setDraftField("date", data.days[6]);
    setDraftField("rawText", value);
    setDraftText("");
    setDraftSaved(true);
  };

  const column = (
    <div className="flex flex-col h-full space-y-5">
      {/* Ask headline */}
      <div className="space-y-3">
        {data ? (
          <>
            <h1 className="font-serif text-[36px] leading-[1.15] text-ink">
              {data.greeting}{displayName.trim() ? `, ${displayName.trim()}.` : "."}
              <br />
              How was your day?
            </h1>
            <p className="font-serif text-[17px] leading-relaxed text-ink2 mt-4 max-w-[500px]">
              {data.greetingSubtitle}
            </p>
          </>
        ) : (
          <>
            <Skeleton height={40} rounded="md" className="w-3/4" />
            <Skeleton height={40} rounded="md" className="w-1/2" />
            <Skeleton width={320} height={12} rounded="sm" className="mt-3" />
          </>
        )}
      </div>

      {/* Primary actions */}
      <div className="grid grid-cols-2 gap-3 flex-shrink-0">
        <Button
          variant="primary"
          size="lg"
          block
          icon={<Mic size={18} />}
          shortcut="R"
          onClick={() => router.push("/record")}
        >
          Start recording
        </Button>
        <Button
          variant="ghost"
          size="lg"
          block
          icon={<Pen size={18} />}
          shortcut="W"
          onClick={() => router.push("/write")}
        >
          Write instead
        </Button>
      </div>

      {/* Picking up from yesterday */}
      <Card padding={false} className="flex-1 flex flex-col min-h-[250px]">
        <div className="p-5 pb-0 flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink3">
            Picking up from yesterday
          </p>

          {data ? (
            data.yesterday ? (
              <p className="font-serif text-[17px] leading-snug text-ink flex-shrink-0">
                You wrote that {excerptOf(data.yesterday.rawText)}.
                <br />
                Did it get finished?
              </p>
            ) : (
              <p className="font-serif text-[17px] leading-snug text-ink flex-shrink-0">
                Nothing from yesterday — what&apos;s on your mind today?
              </p>
            )
          ) : (
            <Skeleton height={20} rounded="sm" className="flex-shrink-0" />
          )}
        </div>

        <TextArea
          bare
          value={draftText}
          onChange={(event) => {
            setDraftText(event.target.value);
            if (draftSaved) setDraftSaved(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleDraftSubmit();
            }
          }}
          placeholder="A few lines is plenty…"
          className="flex-1 mt-5 px-5 pb-5 border-t border-line"
          containerClassName="flex-1 flex flex-col"
        />
      </Card>
    </div>
  );

  const rail = !data ? (
    <div className="space-y-5">
      <Skeleton height={240} rounded="lg" />
      <Skeleton height={160} rounded="lg" />
    </div>
  ) : (
    <div className="space-y-5">
      {/* Today's reflection preview */}
      <Card>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-lg leading-snug text-ink">
Today&apos;s reflection
          </h2>
          <span className="text-xs font-semibold tabular-nums text-ink3">
            {filledCount} of 6
          </span>
        </div>

        <ul>
          {REFLECTION_PROMPTS.slice(0, 4).map((prompt, index) => (
            <li
              key={prompt.key}
              className={index > 0 ? "border-t border-line" : ""}
            >
              <Link
                href={`/entry/${todayKey}/reflection`}
                className="group flex items-center justify-between gap-3 py-3 font-serif text-[15px] text-ink transition-colors hover:text-accent"
              >
                {prompt.label}
                <ChevronRight
                  size={15}
                  className="flex-shrink-0 text-ink3 transition-colors group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {/* This week */}
      <Card>
        <h2 className="mb-4 font-serif text-lg leading-snug text-ink">
          This week
        </h2>
        <BarChart values={weekMinutes} max={weekMax} height={104} />
        <p className="mt-3 text-xs text-ink3">
          Minutes journalled · {weekDaysJournalled} of 7 days
        </p>
      </Card>

      {streak > 0 ? (
        <p className="px-2 text-left text-xs leading-relaxed text-ink3">
          Missing a day is fine. The streak is just a note to yourself.
        </p>
      ) : null}
    </div>
  );

  return <ColumnRailLayout column={column} rail={rail} />;
}