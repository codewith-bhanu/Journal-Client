"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import Spinner from "./Spinner";

export type ButtonVariant = "primary" | "soft" | "ghost" | "surface" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accentInk hover:bg-accent/90 focus-visible:ring-accent/40",
  soft: "bg-accentSoft text-accent hover:bg-accent/15 focus-visible:ring-accent/40",
  ghost:
    "bg-transparent text-ink2 hover:bg-surface2 hover:text-ink focus-visible:ring-accent/40",
  surface:
    "bg-surface text-ink border border-line hover:bg-surface2 focus-visible:ring-accent/40",
  danger: "bg-live text-onAccent hover:bg-live/90 focus-visible:ring-live/40",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-base gap-2",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  shortcut?: string;
  block?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = "surface",
  size = "sm",
  icon,
  shortcut,
  block = false,
  loading = false,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const kbd = shortcut ? (
    <kbd className="hidden items-center rounded border border-line bg-surface2/70 px-1.5 py-0.5 font-sans text-[11px] font-normal leading-none text-ink3 sm:inline-flex">
      {shortcut}
    </kbd>
  ) : null;

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "relative inline-flex items-center justify-center rounded-sm font-medium transition focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <>
          <span className="invisible inline-flex items-center gap-[inherit]">
            {icon}
            {children}
            {kbd}
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
          </span>
        </>
      ) : (
        <>
          {icon}
          {children}
          {kbd}
        </>
      )}
    </button>
  );
}