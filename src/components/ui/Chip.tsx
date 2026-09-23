"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface ChipProps {
  selected?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Chip({
  selected = false,
  icon,
  onClick,
  className,
  children,
}: ChipProps) {
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-sm border px-3.5 py-1.5 text-sm font-medium transition",
    selected
      ? "border-transparent bg-accentSoft text-accent"
      : "border-line bg-surface text-ink2 hover:border-accent/40 hover:text-ink",
    onClick && "cursor-pointer select-none",
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          classes,
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30",
        )}
      >
        {icon}
        {children}
      </button>
    );
  }

  return (
    <span className={classes}>
      {icon}
      {children}
    </span>
  );
}