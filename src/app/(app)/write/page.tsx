"use client";

import React, { useState } from "react";
import ColumnRailLayout from "@/components/layout/ColumnRailLayout";
import { Mic, Check, List } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useUIStore } from "@/store/useUIStore";

const QUESTIONS = [
  { id: 1, text: "What happened today?", status: "completed" },
  { id: 2, text: "What did you do today?", status: "active" },
  { id: 3, text: "Where did you go?", status: "pending" },
  { id: 4, text: "Who did you meet?", status: "pending" },
  { id: 5, text: "What did you learn?", status: "pending" },
  { id: 6, text: "What was good today?", status: "pending" },
  { id: 7, text: "What was difficult?", status: "pending" },
  { id: 8, text: "What were you thinking about?", status: "pending" },
];

export default function WritePage() {
  const writeMode = useUIStore((s) => s.writeMode);

  const guidedColumn = (
    <div className="flex flex-col h-full mt-2">
      <h1 className="font-serif text-[34px] text-ink mb-5">
        What did you do today?
      </h1>
      
      <div className="flex-1 rounded-[16px] border border-[#5d8d71] bg-transparent p-7 flex flex-col min-h-[460px]">
        <p className="text-[19px] leading-[1.8] text-[#c4ccc7] font-serif">
          I went to the office by metro, which took about forty
          minutes. Most of the morning went into the release
          checklist, and after lunch there was a long call about the
          new screens.<span className="inline-block w-[1.5px] h-[22px] bg-[#c4ccc7] ml-[2px] align-middle animate-pulse"></span>
        </p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-full border border-line bg-surface2/30 hover:bg-surface2 px-4 py-2 text-[13px] text-ink3 hover:text-ink2 transition-colors">
            <Mic size={15} />
            Speak this answer
          </button>
          <span className="text-[12px] text-ink3">42 words</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-line/60 bg-transparent hover:bg-surface2 px-6 py-2 text-[13px] text-ink3 hover:text-ink2 transition-colors">
            Skip
          </button>
          <button className="flex items-center gap-2 bg-[#83d0a1] hover:bg-[#83d0a1]/90 text-[#0a1a10] px-5 py-2 rounded-full text-[13px] font-medium transition-colors">
            Next
            <kbd className="font-sans text-[10.5px] text-[#0a1a10]/50 ml-0.5 font-bold tracking-wide uppercase">
              Tab
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );

  const guidedRail = (
    <div className="flex flex-col gap-4 mt-2">
      <div className="rounded-[24px] bg-surface2 p-6 pb-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[12px] font-medium text-ink3">Tonight's questions</h3>
          <span className="text-[12px] text-ink3">2 of 10</span>
        </div>
        
        <div className="flex flex-col gap-1">
          {QUESTIONS.map((q) => (
            <div 
              key={q.id}
              className={`flex items-center gap-4 p-3 rounded-[12px] transition-colors ${
                q.status === 'active' ? 'bg-[#1e2f26]' : ''
              }`}
            >
              <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-full flex-shrink-0 text-[11px] font-medium ${
                q.status === 'completed' 
                  ? 'bg-[#83d0a1] text-[#0a1a10]' 
                  : q.status === 'active'
                  ? 'bg-transparent border border-[#83d0a1] text-[#83d0a1]'
                  : 'bg-transparent border border-line text-ink3'
              }`}>
                {q.status === 'completed' ? <Check size={12} strokeWidth={3} /> : q.id}
              </div>
              <span className={`text-[13.5px] ${
                q.status === 'completed' ? 'text-ink2' :
                q.status === 'active' ? 'text-[#c4ccc7] font-medium' : 
                'text-ink3'
              }`}>
                {q.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="px-2 text-[12px] text-ink3">
        Answer as many as you want. Two is a fine night.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-appBg overflow-y-auto">
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col">
        {writeMode === "guided" ? (
           <ColumnRailLayout column={guidedColumn} rail={guidedRail} />
        ) : (
           <div className="flex-1 w-full px-8 pt-6 pb-10 flex flex-col">
              <h1 className="font-serif text-[38px] text-ink mb-1">Write freely.</h1>
              <p className="text-[15px] text-ink3 mb-8">No prompts. No structure. Just write what's on your mind.</p>
              
              <div className="flex-1 rounded-[16px] border border-[#2a3f32] bg-surface2/20 flex flex-col shadow-sm">
                
                {/* Toolbar */}
                <div className="flex items-center gap-6 px-6 py-4 border-b border-[#2a3f32]">
                  <button className="text-ink2 hover:text-ink font-serif font-bold text-[16px]">B</button>
                  <button className="text-ink2 hover:text-ink font-serif italic text-[16px]">I</button>
                  <button className="text-ink2 hover:text-ink"><List size={18} /></button>
                  <button className="text-ink2 hover:text-ink font-serif text-[22px] leading-none mt-1">”</button>
                </div>
                
                <textarea 
                  className="flex-1 w-full bg-transparent resize-none outline-none p-6 text-[18px] leading-[1.8] text-ink font-serif placeholder:text-[#3d5947]"
                  placeholder="Start writing..."
                />
                
                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a3f32]">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 rounded-full border border-[#2a3f32] bg-surface2 hover:bg-surface2/80 px-4 py-2 text-[13px] text-ink3 hover:text-ink2 transition-colors">
                      <Mic size={14} />
                      Speak
                    </button>
                    <span className="text-[12px] text-ink3">0 words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-[2px] border-[#3d5947] border-t-accent animate-spin" />
                    <span className="text-[12px] text-ink3">Auto-saving...</span>
                  </div>
                </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
