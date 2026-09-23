"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X } from "@/components/ui/icons";

interface FocusShellProps {
  children: React.ReactNode;
  /** Optional slot on the left of the top strip — e.g. a live-recording indicator */
  indicatorSlot?: React.ReactNode;
  /** Optional slot on the right, next to the close button */
  topRightSlot?: React.ReactNode;
  /** Called when the close button is clicked. Falls back to router.back(). */
  onClose?: () => void;
  /** Hide the close button. Use for first-run screens with no back history. */
  showClose?: boolean;
}

export default function FocusShell({
  children,
  indicatorSlot,
  topRightSlot,
  onClose,
  showClose = true,
}: FocusShellProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-appBg">
      {/* Minimal top strip */}
      <div className="flex items-center justify-between px-4 h-[72px] flex-shrink-0">
        {/* Left: live recording indicator or empty */}
        <div className="flex items-center gap-2">
          {indicatorSlot}
        </div>

        {/* Right: custom slot and close button */}
        <div className="flex items-center gap-4">
          {topRightSlot}
          {showClose ? (
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink2 hover:bg-surface2 hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          ) : (
            <span className="w-9" />
          )}
        </div>
      </div>

      {/* Full-width page content */}
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
