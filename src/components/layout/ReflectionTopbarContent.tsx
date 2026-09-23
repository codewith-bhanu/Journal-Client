"use client";

import React from "react";
import { format } from "date-fns";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils/cn";

export default function ReflectionTopbarContent() {
  const writeMode = useUIStore((s) => s.writeMode);
  const setWriteMode = useUIStore((s) => s.setWriteMode);

  return (
    <div className="flex items-center gap-6">
      <span className="text-[17px] font-medium text-ink">
        {format(new Date(), "d MMMM")}
      </span>
      
      <div className="flex items-center bg-[#151c17] border border-line/30 rounded-full p-1">
        <button 
          onClick={() => setWriteMode("guided")}
          className={cn(
            "px-5 py-1.5 rounded-full text-[13px] font-medium transition-colors",
            writeMode === "guided" ? "bg-[#2a3f32] text-ink" : "text-ink3 hover:text-ink2"
          )}
        >
          Guided
        </button>
        <button 
          onClick={() => setWriteMode("free")}
          className={cn(
            "px-5 py-1.5 rounded-full text-[13px] font-medium transition-colors",
            writeMode === "free" ? "bg-[#2a3f32] text-ink" : "text-ink3 hover:text-ink2"
          )}
        >
          Free writing
        </button>
      </div>
    </div>
  );
}
