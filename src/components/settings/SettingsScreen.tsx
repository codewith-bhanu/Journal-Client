"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import JournallingSection from "./JournallingSection";

export const SETTINGS_CATEGORIES = [
  { slug: "account", label: "Account" },
  { slug: "journaling", label: "Journalling" },
  { slug: "language", label: "Language help" },
  { slug: "privacy", label: "Privacy & data" },
  { slug: "appearance", label: "Appearance" },
  { slug: "notifications", label: "Notifications" },
  { slug: "help", label: "Help" },
] as const;

function PlaceholderSection({ label }: { label: string }) {
  return (
    <div className="space-y-1.5">
      <h2 className="font-serif text-[30px] leading-tight text-ink">{label}</h2>
      <p className="text-sm text-ink3">Nothing to configure here yet.</p>
    </div>
  );
}

export default function SettingsScreen({
  activeSection,
}: {
  activeSection?: string;
}) {
  const active =
    SETTINGS_CATEGORIES.find((category) => category.slug === activeSection) ??
    SETTINGS_CATEGORIES.find((category) => category.slug === "journaling")!;

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <header className="border-b border-line px-6 pb-7 pt-10 md:px-10">
        <h1 className="font-serif text-[40px] leading-none tracking-tight text-ink">
          Settings
        </h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Categories */}
        <nav aria-label="Settings categories">
          <ul className="flex gap-2 overflow-x-auto px-5 py-4 md:w-[248px] md:flex-shrink-0 md:flex-col md:gap-1 md:overflow-visible md:px-4 md:py-6">
            {SETTINGS_CATEGORIES.map((category) => {
              const selected = category.slug === active.slug;
              return (
                <li key={category.slug}>
                  <Link
                    href={`/settings/${category.slug}`}
                    aria-current={selected ? "page" : undefined}
                    className={cn(
                      "block whitespace-nowrap rounded-lg px-3.5 py-2 text-sm transition-colors",
                      selected
                        ? "bg-accentSoft font-medium text-accent"
                        : "text-ink3 hover:bg-surface2 hover:text-ink",
                    )}
                  >
                    {category.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1 border-t border-line md:border-l md:border-t-0">
          <div className="mx-auto w-full max-w-[640px] px-6 py-6 md:px-10 md:py-9">
            {active.slug === "journaling" ? (
              <JournallingSection />
            ) : (
              <PlaceholderSection label={active.label} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}