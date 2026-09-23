"use client";

import React from "react";

interface TopbarProps {
  /** Page-specific content: title, action buttons, etc. */
  slot?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Topbar({ slot, children }: TopbarProps) {
  return (
    <header className="h-[62px] flex items-center justify-between px-6 border-b border-line bg-surface flex-shrink-0">
      {/* Left: children (breadcrumb, title, back button, etc.) */}
      <div className="flex items-center gap-3 min-w-0">
        {children}
      </div>

      {/* Right: page-specific slot */}
      {slot && (
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          {slot}
        </div>
      )}
    </header>
  );
}
