"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  function Field(
    {
      icon,
      label,
      hint,
      error,
      className,
      containerClassName,
      id,
      type = "text",
      ...rest
    },
    ref,
  ) {
    return (
      <div className={cn("w-full", containerClassName)}>
        {label ? (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink2">
            {label}
          </label>
        ) : null}
        <div className="relative">
          {icon ? (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink3">
              {icon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={id}
            type={type}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-11 w-full rounded-md border border-line bg-surface px-3.5 text-sm text-ink transition placeholder:text-ink3 focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_var(--accent-soft)]",
              icon && "pl-10",
              error && "border-live",
              className,
            )}
            {...rest}
          />
        </div>
        {error ? (
          <p className="mt-1 text-xs text-live">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-ink3">{hint}</p>
        ) : null}
      </div>
    );
  },
);

export default Field;