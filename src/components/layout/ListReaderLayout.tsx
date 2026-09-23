"use client";

import React, { useState } from "react";
import { ArrowLeft } from "@/components/ui/icons";

interface ListReaderLayoutProps {
  /** List pane — 300px fixed on desktop */
  list: React.ReactNode;
  /**
   * Reader pane — flexible on desktop.
   * On mobile the consumer should call `onSelectItem()` to trigger the reader view.
   */
  reader: React.ReactNode;
  /**
   * Expose the "show reader" setter so parent/list items can trigger mobile navigation.
   * Usage: pass a callback ref — the layout calls it with the setter fn on mount.
   */
  onMountShowReader?: (showReader: (v: boolean) => void) => void;
}

/**
 * Desktop (>760px): fixed 300px list pane with right border + flexible reader pane.
 * Mobile (≤760px):  show list only; when an item is selected the reader fills the
 *                   screen with an ← back button in a minimal strip.
 */
export default function ListReaderLayout({
  list,
  reader,
  onMountShowReader,
}: ListReaderLayoutProps) {
  const [showReader, setShowReader] = useState(false);

  // Expose the setter to the parent so list items can trigger the mobile transition
  React.useEffect(() => {
    if (onMountShowReader) onMountShowReader(setShowReader);
  }, [onMountShowReader]);

  return (
    <>
      {/* ────────────────────── DESKTOP (>760px) ────────────────────── */}
      <div className="hidden md:flex h-full w-full overflow-hidden">
        {/* List pane */}
        <div className="w-[300px] flex-shrink-0 border-r border-line overflow-y-auto">
          {list}
        </div>

        {/* Reader pane */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {reader}
        </div>
      </div>

      {/* ────────────────────── MOBILE (≤760px) ────────────────────── */}
      <div className="flex flex-col h-full w-full md:hidden">
        {showReader ? (
          /* Reader view with back strip */
          <div className="flex flex-col h-full">
            <div className="flex items-center h-[48px] border-b border-line px-4 flex-shrink-0">
              <button
                onClick={() => setShowReader(false)}
                className="flex items-center gap-2 text-sm text-ink2 hover:text-ink transition-colors"
                aria-label="Back to list"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{reader}</div>
          </div>
        ) : (
          /* List view */
          <div className="flex-1 overflow-y-auto">{list}</div>
        )}
      </div>
    </>
  );
}
