"use client";

import React from "react";
import ColumnRailLayout from "@/components/layout/ColumnRailLayout";
import { Mic, Check } from "lucide-react";

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

export default function ReflectionPage() {
  const column = (
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

  const rail = (
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

  return <ColumnRailLayout column={column} rail={rail} />;
}
