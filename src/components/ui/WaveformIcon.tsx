"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface WaveformIconProps {
  live?: boolean;
  bars?: number;
  size?: number;
  /** Per-bar amplitude (0..1) to render instead of the idle pattern */
  levels?: number[];
  /** Fill the parent width with a track behind each bar */
  stretch?: boolean;
  className?: string;
}

const BASE_PATTERN = [
  15, 22, 18, 30, 25, 45, 35, 28, 55, 40, 
  35, 65, 50, 45, 30, 75, 60, 40, 55, 85, 
  50, 70, 65, 45, 90, 60, 80, 55, 75, 40, 
  95, 70, 85, 60, 100, 80
];
const LEVELS = [...BASE_PATTERN, ...[...BASE_PATTERN].reverse()];

export default function WaveformIcon({
  live = false,
  bars = 72,
  size = 80,
  levels,
  stretch = false,
  className,
}: WaveformIconProps) {
  const barWidth = 3.5;
  const gap = 3.5;
  const hasLevels = levels && levels.length > 0;
  const animated = live && !hasLevels;

  return (
    <span
      className={cn(
        "inline-flex items-center",
        stretch && "w-full gap-[3px]",
        className,
      )}
      style={{ height: size }}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, index) => {
        const level = LEVELS[index % LEVELS.length];
        const base = hasLevels ? levels![index] ?? level / 100 : level / 100;

        if (stretch) {
          return (
            <span
              key={index}
              className="relative h-full flex-1 overflow-hidden rounded-full bg-accentSoft"
            >
              <motion.span
                className="absolute inset-x-0 bottom-0 rounded-full bg-accent"
                style={{ height: "100%", originY: 1 }}
                animate={{
                  scaleY: animated ? [base, base * 0.28, base] : base,
                }}
                transition={
                  animated
                    ? {
                        duration: 0.85,
                        delay: index * 0.08,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.12, ease: "easeOut" }
                }
              />
            </span>
          );
        }

        return (
          <motion.span
            key={index}
            className="block h-full rounded-full bg-accent"
            style={{
              width: barWidth,
              marginRight: index < bars - 1 ? gap : 0,
            }}
            animate={
              animated ? { scaleY: [base, base * 0.28, base] } : { scaleY: base }
            }
            transition={
              animated
                ? {
                    duration: 0.85,
                    delay: index * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.12, ease: "easeOut" }
            }
          />
        );
      })}
    </span>
  );
}