import React from "react";
import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}

const roundedClasses: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export default function Skeleton({
  width,
  height = 16,
  rounded = "md",
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn("ui-shimmer", roundedClasses[rounded], className)}
      style={{ width: width ?? "100%", height }}
      aria-hidden="true"
    />
  );
}