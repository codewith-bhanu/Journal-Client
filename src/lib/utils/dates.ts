// Date formatting and manipulation helpers
import { format, parseISO } from "date-fns";

export function formatDate(date: Date | string, formatString = "PPP"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatString);
}
