"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { usePathname } from "next/navigation";

export default function TopbarDate() {
  const pathname = usePathname();
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(format(new Date(), "EEEE, d MMMM"));
  }, []);

  // Only show on the Today page, or everywhere? Let's show it everywhere or just /today.
  if (pathname !== "/today") return null;

  return (
    <span className="text-sm font-medium text-ink2">
      {dateStr}
    </span>
  );
}
