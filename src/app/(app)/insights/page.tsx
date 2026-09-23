"use client";

import React from "react";

export default function InsightsPage() {
  return (
    <div className="flex flex-col h-full bg-appBg overflow-y-auto">
      <div className="w-full p-10 flex flex-col gap-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 border-b border-line/50 pb-6">
          <h1 className="text-[22px] font-medium text-ink">Your progress</h1>
          <div className="flex items-center gap-2 p-1 rounded-full bg-surface2/50 border border-line/30">
            <button className="px-5 py-1.5 rounded-full border border-accent/40 text-[#a3bfae] text-[13px] font-medium bg-accent/5">
              30 days
            </button>
            <button className="px-5 py-1.5 rounded-full text-ink3 hover:text-ink text-[13px] font-medium transition-colors">
              All time
            </button>
          </div>
        </div>

        {/* Highlight Card */}
        <div className="rounded-[24px] bg-[#1a2b22] px-10 py-10 mb-2">
          <p className="font-serif text-[18px] text-[#a9c8b8] leading-relaxed max-w-[800px]">
            You've kept 47 days of your life so far, and your entries are running about twice as long as when you started in August.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="flex gap-4">
          {/* Card 1 */}
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between min-h-[150px]">
            <div className="text-[34px] leading-tight font-medium text-ink flex flex-col">
              <span>47</span>
            </div>
            <div className="text-[13px] text-ink3 leading-tight mt-4">
              Entries
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between min-h-[150px]">
            <div className="text-[34px] leading-tight font-medium text-ink flex flex-col">
              <span>14</span>
            </div>
            <div className="text-[13px] text-ink3 leading-tight mt-4">
              Day streak
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between min-h-[150px]">
            <div className="text-[34px] leading-tight font-medium text-ink flex flex-col">
              <span>21,480</span>
            </div>
            <div className="text-[13px] text-ink3 leading-tight mt-4">
              Words written
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between min-h-[150px]">
            <div className="text-[34px] leading-[1.1] font-medium text-ink flex flex-col">
              <span>6h</span>
              <span>20m</span>
            </div>
            <div className="text-[13px] text-ink3 leading-tight mt-4">
              Spoken
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between min-h-[150px]">
            <div className="text-[34px] leading-tight font-medium text-ink flex flex-col">
              <span>38</span>
            </div>
            <div className="text-[13px] text-ink3 leading-tight mt-4">
              Days<br />completed
            </div>
          </div>

          {/* Card 6 */}
          <div className="flex-1 rounded-[24px] bg-surface2 p-6 flex flex-col justify-between min-h-[150px]">
            <div className="text-[34px] leading-tight font-medium text-ink flex flex-col">
              <span>5 / 7</span>
            </div>
            <div className="text-[13px] text-ink3 leading-tight mt-4">
              Reflections
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="flex gap-4 mt-2">
          {/* Minutes journalled chart placeholder */}
          <div className="flex-[1.2] rounded-[24px] bg-surface2 p-6 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-ink3">Minutes journalled</span>
              <span className="text-[13px] font-medium text-ink3">Last four weeks</span>
            </div>
          </div>

          {/* What you write about */}
          <div className="flex-[0.8] rounded-[24px] bg-surface2 p-6 flex flex-col min-h-[300px]">
            <span className="text-[13px] font-medium text-ink3 mb-8">What you write about</span>
            
            <div className="flex flex-col gap-6">
              {/* Work */}
              <div className="flex items-center gap-4">
                <span className="w-16 text-[14px] text-ink">Work</span>
                <div className="flex-1 relative h-1.5 bg-line/40 rounded-full flex items-center">
                  <div className="absolute left-0 h-1.5 bg-accent rounded-full z-10" style={{ width: '85%' }} />
                  <div className="absolute left-[55%] w-2.5 h-2.5 -ml-[5px] rounded-full bg-accent z-20" />
                </div>
                <span className="text-[12px] text-ink3 w-4 text-right">31</span>
              </div>
              
              {/* Friends */}
              <div className="flex items-center gap-4">
                <span className="w-16 text-[14px] text-ink">Friends</span>
                <div className="flex-1 relative h-1.5 bg-line/40 rounded-full flex items-center">
                  <div className="absolute left-0 h-1.5 bg-accent rounded-full z-10" style={{ width: '45%' }} />
                  <div className="absolute left-[55%] w-2.5 h-2.5 -ml-[5px] rounded-full bg-accent z-20" />
                </div>
                <span className="text-[12px] text-ink3 w-4 text-right">12</span>
              </div>

              {/* Learning */}
              <div className="flex items-center gap-4">
                <span className="w-16 text-[14px] text-ink">Learning</span>
                <div className="flex-1 relative h-1.5 bg-line/40 rounded-full flex items-center">
                  <div className="absolute left-0 h-1.5 bg-accent rounded-full z-10" style={{ width: '35%' }} />
                  <div className="absolute left-[55%] w-2.5 h-2.5 -ml-[5px] rounded-full bg-accent z-20" />
                </div>
                <span className="text-[12px] text-ink3 w-4 text-right">9</span>
              </div>

              {/* Health */}
              <div className="flex items-center gap-4">
                <span className="w-16 text-[14px] text-ink">Health</span>
                <div className="flex-1 relative h-1.5 bg-line/40 rounded-full flex items-center">
                  <div className="absolute left-0 h-1.5 bg-accent rounded-full z-10" style={{ width: '25%' }} />
                  <div className="absolute left-[55%] w-2.5 h-2.5 -ml-[5px] rounded-full bg-accent z-20" />
                </div>
                <span className="text-[12px] text-ink3 w-4 text-right">7</span>
              </div>

              {/* Travel */}
              <div className="flex items-center gap-4">
                <span className="w-16 text-[14px] text-ink">Travel</span>
                <div className="flex-1 relative h-1.5 bg-line/40 rounded-full flex items-center">
                  <div className="absolute left-0 h-1.5 bg-accent rounded-full z-10" style={{ width: '15%' }} />
                  <div className="absolute left-[55%] w-2.5 h-2.5 -ml-[5px] rounded-full bg-accent z-20" />
                </div>
                <span className="text-[12px] text-ink3 w-4 text-right">4</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
