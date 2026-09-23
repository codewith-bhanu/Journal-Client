import React from "react";
import { cn } from "@/lib/utils/cn";

interface BarChartProps {
  values: number[];
  height?: number;
  max?: number;
  className?: string;
}

export default function BarChart({
  values,
  height = 128,
  max = 100,
  className,
}: BarChartProps) {
  return (
    <div
      className={cn("flex items-end gap-1", className)}
      style={{ height }}
      aria-hidden="true"
    >
      {values.map((value, index) => {
        const pct = Math.max(0, Math.min(1, value / max));
        return (
          <div
            key={index}
            className="relative h-full flex-1 overflow-hidden rounded-full bg-surface2"
          >
            <div
              className="absolute inset-x-0 bottom-0 rounded-full bg-accent"
              style={{ height: `${pct * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}