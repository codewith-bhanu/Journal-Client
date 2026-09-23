"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function TranscriptTopbarContent() {
  const router = useRouter();
  
  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={() => router.back()}
        className="flex items-center justify-center w-[38px] h-[38px] rounded-full border border-line text-ink2 hover:bg-surface2 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-[17px] font-medium text-ink">
        Your words, typed out
      </span>
    </div>
  );
}
