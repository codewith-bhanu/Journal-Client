"use client";

import React, { useState } from "react";
import ListReaderLayout from "@/components/layout/ListReaderLayout";
import Field from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Search, Edit2, MoreHorizontal, Play, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Chip from "@/components/ui/Chip";

export default function JournalPage() {
  const list = (
    <div className="flex flex-col h-full bg-appBg">
      <div className="p-4 border-b border-line/0 shrink-0">
        <Field 
          placeholder="Filter entries" 
          icon={<Search size={16} className="text-ink3" />}
          containerClassName="w-full"
          className="bg-surface border-line rounded-full h-[40px] pl-10 text-[15px]"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <h3 className="text-[13px] font-medium text-ink2 mb-3 px-3">September 2026</h3>
        
        <div className="flex flex-col gap-1">
          {/* Active Item */}
          <button className="flex items-start text-left p-3 rounded-2xl bg-accent/10 border border-transparent transition-colors w-full">
            <div className="flex flex-col items-center w-[42px] shrink-0 mr-3">
              <span className="font-semibold text-[17px] leading-none text-ink mb-1">16</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink3">WED</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[15px] text-ink truncate leading-tight mb-1">Office, coffee with Rahul</p>
              <p className="text-[13px] text-ink3 truncate">13 min · Work, Friends</p>
            </div>
          </button>

          {/* Inactive Item */}
          <button className="flex items-start text-left p-3 rounded-2xl hover:bg-surface2 border border-transparent transition-colors w-full">
            <div className="flex flex-col items-center w-[42px] shrink-0 mr-3">
              <span className="font-semibold text-[17px] leading-none text-ink mb-1">15</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink3">TUE</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[15px] text-ink truncate leading-tight mb-1">Release checklist, gym</p>
              <p className="text-[13px] text-ink3 truncate">Written · Work, Health</p>
            </div>
          </button>
          
          <button className="flex items-start text-left p-3 rounded-2xl hover:bg-surface2 border border-transparent transition-colors w-full">
            <div className="flex flex-col items-center w-[42px] shrink-0 mr-3">
              <span className="font-semibold text-[17px] leading-none text-ink mb-1">14</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink3">MON</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[15px] text-ink truncate leading-tight mb-1">Studied English for an hour</p>
              <p className="text-[13px] text-ink3 truncate">6 min · Learning</p>
            </div>
          </button>

          <button className="flex items-start text-left p-3 rounded-2xl hover:bg-surface2 border border-transparent transition-colors w-full">
            <div className="flex flex-col items-center w-[42px] shrink-0 mr-3">
              <span className="font-semibold text-[17px] leading-none text-ink mb-1">13</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink3">SUN</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[15px] text-ink truncate leading-tight mb-1">Hyderabad, day two</p>
              <p className="text-[13px] text-ink3 truncate">18 min · Travel</p>
            </div>
          </button>

          <button className="flex items-start text-left p-3 rounded-2xl hover:bg-surface2 border border-transparent transition-colors w-full">
            <div className="flex flex-col items-center w-[42px] shrink-0 mr-3">
              <span className="font-semibold text-[17px] leading-none text-ink mb-1">12</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink3">SAT</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[15px] text-ink truncate leading-tight mb-1">Hyderabad, day one</p>
              <p className="text-[13px] text-ink3 truncate">Written · Travel</p>
            </div>
          </button>

          <button className="flex items-start text-left p-3 rounded-2xl hover:bg-surface2 border border-transparent transition-colors w-full">
            <div className="flex flex-col items-center w-[42px] shrink-0 mr-3">
              <span className="font-semibold text-[17px] leading-none text-ink mb-1">10</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-ink3">THU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[15px] text-ink truncate leading-tight mb-1">Quiet day, cooked at home</p>
              <p className="text-[13px] text-ink3 truncate">4 min</p>
            </div>
          </button>
        </div>
      </div>

      <div className="px-5 py-5 border-t border-line/0 shrink-0">
        <p className="text-[12px] text-ink3">21 of 30 days written this month</p>
      </div>
    </div>
  );

  const reader = (
    <div className="flex flex-col h-full bg-[#141815]">
      {/* Reader Topbar */}
      <div className="flex items-center justify-between px-10 py-8 shrink-0">
        <div className="flex items-center gap-2">
          <Chip className="bg-surface2 text-ink2 border-transparent">Work</Chip>
          <Chip className="bg-surface2 text-ink2 border-transparent">Friends</Chip>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-ink3 hover:text-ink hover:bg-surface2 transition-colors">
            <Plus size={14} /> Add tag
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="surface" size="sm" icon={<Edit2 size={14} />} className="rounded-full px-4 border-line bg-surface2 hover:bg-surface2/80 border-transparent text-ink2">
            Edit
          </Button>
          <button className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-surface2 text-ink2 hover:bg-surface2/80 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-y-auto px-10 pb-12">
        <div className="max-w-[720px]">
          <h1 className="font-serif text-[34px] leading-tight text-ink mb-3">Wednesday, 16 September</h1>
          <p className="text-[14px] text-ink3 mb-10">Spoken at 9:32 pm · 13 minutes · 214 words</p>

          {/* Audio Player Pill */}
          <div className="flex items-center gap-4 bg-[#1b231e] rounded-full p-2 pr-6 mb-12 w-full max-w-[480px]">
            <button className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors shrink-0">
              <Play size={18} className="ml-1 fill-current" />
            </button>
            <div className="flex-1 relative flex items-center h-full">
              <div className="absolute w-full h-[4px] bg-[#2a362f] rounded-full" />
              <div className="absolute w-[35%] h-[4px] bg-accent rounded-full" />
              <div className="absolute left-[35%] w-3.5 h-3.5 -ml-1.5 bg-accent rounded-full shadow-sm" />
            </div>
            <span className="text-[12px] text-ink3 tabular-nums shrink-0 ml-3">13:08</span>
          </div>

          {/* Text Content */}
          <div className="space-y-7 font-serif text-[18px] leading-[1.8] text-[#c4ccc7]">
            <p>
              Today I woke up at 7 and had breakfast with amma before leaving. At work my manager asked me about the project, and I explained that we are waiting on the design files. She was okay about it, but I still felt bad.
            </p>
            <p>
              In the evening I met Rahul near Indiranagar and we had coffee for about an hour. He is thinking of changing jobs and wanted my opinion...
            </p>
          </div>
        </div>
      </div>

      {/* Reflection Footer Pill */}
      <div className="px-10 py-8 shrink-0">
        <button className="flex items-center justify-between w-full max-w-[720px] px-6 py-5 rounded-[20px] bg-surface2 text-left hover:bg-surface2/80 transition-colors">
          <span className="text-[15px] text-ink2">Reflection & thinking notes</span>
          <ChevronDown size={18} className="text-ink3" />
        </button>
      </div>
    </div>
  );

  return <ListReaderLayout list={list} reader={reader} />;
}
