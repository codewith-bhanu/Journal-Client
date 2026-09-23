"use client";

import React from "react";
import ColumnRailLayout from "@/components/layout/ColumnRailLayout";
import { RotateCcw, Mic, Play } from "lucide-react";
import WaveformIcon from "@/components/ui/WaveformIcon";

export default function TranscriptPage() {
  const column = (
    <div className="flex flex-col h-full justify-between min-h-[calc(100vh-130px)]">
      <div className="text-[19px] leading-[1.8] text-[#c4ccc7] font-serif space-y-6 pt-6 px-2">
        <p>
          Today I woke up at 7 and had breakfast with amma before
          leaving. At work my manager asked me about the project, and I
          explained that we are waiting on the <span className="border-b border-ink3/60 pb-0.5">design files.</span> She was okay
          about it, but I still felt bad.
        </p>
        <p>
          In the evening I met Rahul near Indiranagar and we had coffee
          for about an hour. He is thinking of changing jobs and wanted
          my opinion. I came home late, tired but in a good mood.<span className="inline-block w-px h-5 bg-ink2 ml-1 align-middle animate-pulse"></span>
        </p>
      </div>

      <div className="flex items-center gap-6 mt-16 pb-6 px-2">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-line bg-surface2/30 hover:bg-surface2 px-4 py-2.5 text-[13px] text-ink3 hover:text-ink2 transition-colors">
            <RotateCcw size={15} className="text-ink3" />
            Re-record
          </button>
          <button className="flex items-center gap-2 rounded-full border border-line bg-surface2/30 hover:bg-surface2 px-4 py-2.5 text-[13px] text-ink3 hover:text-ink2 transition-colors">
            <Mic size={15} className="text-ink3" />
            Add to this recording
          </button>
        </div>
        <p className="text-[12px] text-ink3/80 max-w-[180px] leading-relaxed">
          Underlined words are ones I wasn't sure about
        </p>
      </div>
    </div>
  );

  const rail = (
    <div className="flex flex-col gap-5 pt-6">
      {/* Your recording */}
      <div className="rounded-[24px] bg-surface2 p-6 flex flex-col gap-6 border border-line/30">
        <h3 className="text-[13px] font-medium text-ink3">Your recording</h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#1b2b23] text-[#83d0a1] hover:bg-[#1a2f24] transition-colors">
              <Play size={16} className="ml-1" fill="currentColor" />
            </button>
            <div className="flex-1 relative flex items-center h-1 bg-line/40 rounded-full">
              <div className="absolute left-0 h-1 bg-accent rounded-full" style={{ width: '30%' }} />
              <div className="absolute left-[30%] w-2.5 h-2.5 -ml-[5px] rounded-full bg-[#83d0a1] shadow-sm" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-[11px] font-medium text-ink3/70 px-1">
            <span>4:58</span>
            <span>13:08</span>
          </div>

          <div className="w-full flex justify-center mt-3 h-[52px]">
            {/* Minimal static waveform representation */}
            <WaveformIcon bars={34} size={52} className="opacity-60" />
          </div>
        </div>
      </div>

      {/* Detected tags */}
      <div className="rounded-[24px] bg-surface2 p-6 flex flex-col gap-5 border border-line/30">
        <h3 className="text-[13px] font-medium text-ink3">Detected in this entry</h3>
        
        <div className="flex flex-wrap gap-2.5">
          <span className="px-4 py-1.5 rounded-full border border-[#2d4a3a] bg-[#1a2b22] text-[13px] text-[#a9c8b8]">
            Work
          </span>
          <span className="px-4 py-1.5 rounded-full border border-[#2d4a3a] bg-[#1a2b22] text-[13px] text-[#a9c8b8]">
            Friends
          </span>
          <span className="px-4 py-1.5 rounded-full border border-line/50 text-[13px] text-ink3">
            Rahul
          </span>
          <span className="px-4 py-1.5 rounded-full border border-line/50 text-[13px] text-ink3">
            Indiranagar
          </span>
        </div>
        
        <div className="mt-1">
          <button className="flex items-center gap-2 text-[13px] text-ink3 hover:text-ink2 transition-colors py-1 rounded-md">
            <span className="text-ink3 text-lg leading-none font-light">+</span> Add
          </button>
        </div>
      </div>

      <p className="px-2 mt-2 text-[12.5px] text-ink3/80">
        214 words &middot; 13 minutes spoken
      </p>
    </div>
  );

  return <ColumnRailLayout column={column} rail={rail} />;
}
