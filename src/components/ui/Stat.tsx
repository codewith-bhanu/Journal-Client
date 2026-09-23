import React from "react";
import { cn } from "@/lib/utils/cn";

interface StatProps {
  value: React.ReactNode;
  label: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export default function Stat({
  value,
  label,
  accent = false,
  className,
}: StatProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "font-serif text-4xl font-semibold leading-none tracking-tight tabular-nums",
          accent ? "text-accent" : "text-ink",
        )}
      >
        {value}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-wider text-ink3">
        {label}
      </div>
    </div>
  );
}