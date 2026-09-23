import React from "react";
import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-accentSoft border-t-accent",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}