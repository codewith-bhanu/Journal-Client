"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";
import { useHotkeys } from "@/lib/utils/useHotkeys";
import { useUIStore } from "@/store/useUIStore";

interface AppShellProps {
  children: React.ReactNode;
  /** Page-specific content rendered on the right of the topbar */
  topbarSlot?: React.ReactNode;
  /** Left side of the topbar (title, breadcrumb, etc.) */
  topbarContent?: React.ReactNode;
}

export default function AppShell({
  children,
  topbarSlot,
  topbarContent,
}: AppShellProps) {
  const router = useRouter();
  const toggleCommandPalette = useUIStore((s) => s.toggleCommandPalette);
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  useHotkeys("mod+k", toggleCommandPalette);
  useHotkeys("mod+b", toggleSidebar);
  useHotkeys("r", () => router.push("/record"));
  useHotkeys("w", () => router.push("/write"));

  return (
    <div className="flex h-screen w-full overflow-hidden bg-appBg">
      {/* Sidebar container (Desktop/Tablet) */}
      <div className="hidden md:flex flex-shrink-0 h-full">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Main column: Topbar + page content */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <Topbar slot={topbarSlot}>{topbarContent}</Topbar>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Bottom nav — visible only below 760px (md breakpoint) */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
