"use client";

import React from "react";
import { CornerDownLeft } from "lucide-react";

export default function ReflectionTopbarActions() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[12px] text-ink3">Draft saved</span>
      <button className="flex items-center gap-2 bg-[#83d0a1] hover:bg-[#83d0a1]/90 text-[#0a1a10] px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors">
        Save entry
      </button>
    </div>
  );
}
