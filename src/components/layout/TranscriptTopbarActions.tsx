"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { CornerDownLeft } from "lucide-react";

export default function TranscriptTopbarActions() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[12px] text-ink3">Saved a moment ago</span>
      <button className="flex items-center gap-2 bg-[#83d0a1] hover:bg-[#83d0a1]/90 text-[#0a1a10] px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors">
        Save entry
        <kbd className="font-sans text-[10px] bg-black/10 px-1 py-0.5 rounded opacity-80 flex items-center gap-0.5">
          ⌘<CornerDownLeft size={10} />
        </kbd>
      </button>
    </div>
  );
}
