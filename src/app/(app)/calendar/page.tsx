"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const DAYS = [
  { date: 31, isCurrentMonth: false },
  { date: 1, isCurrentMonth: true, tag: "Office" },
  { date: 2, isCurrentMonth: true, tag: "Gym" },
  { date: 3, isCurrentMonth: true, tag: "Office" },
  { date: 4, isCurrentMonth: true, tag: "Call with amma" },
  { date: 5, isCurrentMonth: true },
  { date: 6, isCurrentMonth: true, tag: "Long walk" },
  { date: 7, isCurrentMonth: true, tag: "Office" },
  { date: 8, isCurrentMonth: true, tag: "Deploy day" },
  { date: 9, isCurrentMonth: true, tag: "English" },
  { date: 10, isCurrentMonth: true, tag: "Cooked at home" },
  { date: 11, isCurrentMonth: true },
  { date: 12, isCurrentMonth: true, tag: "Hyderabad" },
  { date: 13, isCurrentMonth: true, tag: "Hyderabad" },
  { date: 14, isCurrentMonth: true, tag: "English" },
  { date: 15, isCurrentMonth: true, tag: "Checklist" },
  { date: 16, isCurrentMonth: true, tag: "Coffee with Rahul", active: true },
  { date: 17, isCurrentMonth: true },
  { date: 18, isCurrentMonth: true },
  { date: 19, isCurrentMonth: true },
  { date: 20, isCurrentMonth: true },
  { date: 21, isCurrentMonth: true },
  { date: 22, isCurrentMonth: true },
  { date: 23, isCurrentMonth: true },
  { date: 24, isCurrentMonth: true },
  { date: 25, isCurrentMonth: true },
  { date: 26, isCurrentMonth: true },
  { date: 27, isCurrentMonth: true },
  { date: 28, isCurrentMonth: true },
  { date: 29, isCurrentMonth: true },
  { date: 30, isCurrentMonth: true },
  { date: 1, isCurrentMonth: false },
  { date: 2, isCurrentMonth: false },
  { date: 3, isCurrentMonth: false },
  { date: 4, isCurrentMonth: false },
];

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-full bg-appBg overflow-y-auto">
      <div className="w-full p-10 flex flex-col">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-[42px] h-[42px] rounded-full border border-line text-ink2 hover:bg-surface2 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-[22px] font-medium text-ink">September 2026</h1>
            <button className="flex items-center justify-center w-[42px] h-[42px] rounded-full border border-line text-ink2 hover:bg-surface2 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex items-center p-1 rounded-full border border-line/50 bg-[#161a18]">
            <button className="px-5 py-1.5 rounded-full bg-accent/20 text-accent text-[13.5px] font-medium transition-colors">
              Month
            </button>
            <button className="px-5 py-1.5 rounded-full text-ink3 hover:text-ink2 text-[13.5px] font-medium transition-colors">
              Year
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-3 mb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center text-[12px] font-medium text-ink3/70">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-3 mb-10">
          {DAYS.map((day, i) => {
            if (!day.isCurrentMonth) {
              return (
                <div key={i} className="min-h-[110px] p-3 flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-ink3/30">{day.date}</span>
                </div>
              );
            }
            
            if (day.active) {
              return (
                <div key={i} className="min-h-[110px] p-3 rounded-2xl bg-accent flex flex-col justify-between transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <span className="text-[14px] font-medium text-accentInk">{day.date}</span>
                  {day.tag && (
                    <div className="w-full rounded-lg bg-black/10 px-2 py-1.5">
                      <p className="text-[11px] font-medium text-accentInk truncate">{day.tag}</p>
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <div key={i} className="min-h-[110px] p-3 rounded-2xl bg-surface2 flex flex-col justify-between transition-transform hover:-translate-y-0.5 cursor-pointer border border-transparent hover:border-line">
                <span className="text-[14px] font-medium text-ink2">{day.date}</span>
                {day.tag && (
                  <div className="w-full rounded-lg bg-accent/10 px-2 py-1.5">
                    <p className="text-[11px] font-medium text-accent truncate">{day.tag}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Area */}
        <div className="flex gap-4">
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between border border-line/30">
            <div className="flex items-start justify-between mb-6">
              <p className="text-[13px] font-medium text-ink3">Wednesday, 16 September</p>
              <button className="px-4 py-1.5 rounded-full bg-accent/15 text-accent text-[13px] font-medium hover:bg-accent/25 transition-colors">
                Open entry
              </button>
            </div>
            <p className="font-serif text-[17px] text-[#c4ccc7] leading-relaxed">
              Office, release checklist, coffee with Rahul near Indiranagar.
            </p>
          </div>

          <div className="w-[280px] rounded-[24px] bg-surface2 p-6 flex flex-col justify-between border border-line/30">
            <p className="text-[13px] font-medium text-ink3 mb-6">This month</p>
            <p className="font-serif text-[16px] text-[#c4ccc7] leading-relaxed pr-6">
              21 of 30 days &middot; 4h 12m
              <br />
              spoken
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
