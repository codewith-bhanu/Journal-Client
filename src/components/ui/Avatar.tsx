import React from "react";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Avatar({ name, size = 36, className }: AvatarProps) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <span
      className={cn(
        "flex flex-shrink-0 items-center justify-center rounded-full bg-accentSoft font-semibold text-accent",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}