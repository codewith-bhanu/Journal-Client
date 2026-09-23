"use client";

import { useEffect, useRef } from "react";

type HotkeyHandler = (event: KeyboardEvent) => void;

interface UseHotkeysOptions {
  /** preventDefault on the matched key event (default true) */
  preventDefault?: boolean;
  /** Ignore events while typing in an input, textarea, or contenteditable (default true) */
  ignoreFormFields?: boolean;
}

function isFormField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function serializeKey(event: KeyboardEvent): string {
  const parts: string[] = [];
  if (event.ctrlKey || event.metaKey) parts.push("mod");
  if (event.altKey) parts.push("alt");
  if (event.shiftKey) parts.push("shift");
  parts.push(event.key.toLowerCase());
  return parts.join("+");
}

function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replace("cmd", "mod")
    .replace("ctrl", "mod")
    .replace("⌘", "mod");
}

export function useHotkeys(
  keys: string | string[],
  handler: HotkeyHandler,
  options: UseHotkeysOptions = {},
): void {
  const { preventDefault = true, ignoreFormFields = true } = options;
  const handlerRef = useRef<HotkeyHandler>(() => {});

  const keyListKey = (Array.isArray(keys) ? keys : [keys])
    .map(normalizeKey)
    .join(",");

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const currentKeys = keyListKey.split(",").filter(Boolean);
    const onKeyDown = (event: KeyboardEvent) => {
      if (ignoreFormFields && isFormField(event.target)) return;
      if (!currentKeys.includes(serializeKey(event))) return;
      if (preventDefault) event.preventDefault();
      handlerRef.current(event);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keyListKey, ignoreFormFields, preventDefault]);
}