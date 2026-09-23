"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  bare?: boolean;
  label?: string;
  error?: string;
  containerClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      bare = false,
      label,
      error,
      className,
      containerClassName,
      id,
      rows = 4,
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
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full font-serif text-[17px] leading-[1.7] text-ink transition placeholder:text-ink3",
            bare
              ? "resize-none rounded-none border-0 border-transparent bg-transparent p-0 focus:border-transparent focus:shadow-none focus:outline-none"
              : "rounded-md border border-line bg-surface px-3.5 py-2.5 focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_var(--accent-soft)]",
            className,
          )}
          {...rest}
        />
        {error ? <p className="mt-1 text-xs text-live">{error}</p> : null}
      </div>
    );
  },
);

export default TextArea;