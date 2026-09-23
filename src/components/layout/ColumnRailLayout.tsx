"use client";

import React from "react";

interface ColumnRailLayoutProps {
  /** Primary content column — max 680px */
  column: React.ReactNode;
  /** Secondary rail — 300–320px wide */
  rail: React.ReactNode;
}

/**
 * Desktop: two-column grid — flexible column (max 680px) + fixed 320px rail.
 * ≤900px:  single column stack — rail moves below column.
 */
export default function ColumnRailLayout({ column, rail }: ColumnRailLayoutProps) {
  return (
    <div
      className="
        grid
        w-full
        min-h-full
        gap-8
        px-6
        py-6
        grid-cols-1
        900:grid-cols-2
        xl:grid-cols-[2fr_1fr]
        900:items-stretch
      "
    >
      <div className="min-w-0 h-full">{column}</div>
      <div className="min-w-0 h-full">{rail}</div>
    </div>
  );
}
