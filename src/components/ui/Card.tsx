import React from "react";
import { cn } from "@/lib/utils/cn";

export type CardVariant = "elevated" | "flat" | "quiet" | "soft";

const variantClasses: Record<CardVariant, string> = {
  elevated: "bg-surface shadow-md",
  flat: "border border-line bg-surface",
  quiet: "bg-surface2",
  soft: "bg-accentSoft text-accentInk",
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: boolean;
}

export default function Card({
  variant = "elevated",
  padding = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg",
        variantClasses[variant],
        padding && "p-5",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}