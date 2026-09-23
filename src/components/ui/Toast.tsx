"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";

export type ToastVariant = "default" | "warn";

interface ToastItem {
  id: number;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant: ToastVariant;
}

export interface ToastOptions {
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

export type ToastFn = (title: React.ReactNode, options?: ToastOptions) => void;

const ToastContext = createContext<ToastFn | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback<ToastFn>(
    (title, options) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [
        ...prev,
        {
          id,
          title,
          description: options?.description,
          variant: options?.variant ?? "default",
        },
      ]);
      window.setTimeout(() => dismiss(id), options?.duration ?? 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-4 sm:items-end"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-md border bg-surface px-3.5 py-3 text-sm shadow-sm",
              item.variant === "warn" ? "border-live/40" : "border-line",
            )}
          >
            {item.variant === "warn" ? (
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-live" />
            ) : (
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-accent" />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug text-ink">{item.title}</p>
              {item.description ? (
                <p className="mt-0.5 leading-snug text-ink2">
                  {item.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Dismiss notification"
              className="flex-shrink-0 rounded p-0.5 text-ink3 transition hover:bg-surface2 hover:text-ink"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastFn {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}