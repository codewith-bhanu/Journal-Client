"use client";

import React from "react";
import { Bell, Search } from "lucide-react";
import Field from "@/components/ui/Field";
import { useUIStore } from "@/store/useUIStore";

export default function TopbarActions() {
  const toggleCommandPalette = useUIStore((s) => s.toggleCommandPalette);

  return (
    <div className="flex items-center gap-3">
      <SearchTrigger onOpen={toggleCommandPalette} />

      <button
        type="button"
        aria-label="Notifications"
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line text-ink3 transition-colors hover:bg-surface2 hover:text-ink"
      >
        <Bell size={18} />
      </button>
    </div>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative w-[280px]">
      <Field
        readOnly
        value=""
        placeholder="Search your life"
        containerClassName="w-full"
        className="cursor-pointer rounded-full h-[42px] border-line bg-transparent"
        icon={<Search size={16} />}
        aria-label="Open command palette"
        onFocus={(event) => {
          event.currentTarget.blur();
          onOpen();
        }}
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center rounded border border-line bg-surface2/70 px-1.5 py-0.5 font-sans text-[11px] font-normal leading-none text-ink3">
        ⌘K
      </kbd>
    </div>
  );
}