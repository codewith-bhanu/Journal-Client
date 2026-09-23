"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Home,
  Book,
  Calendar,
  BarChart2,
  Settings,
} from "@/components/ui/icons";
import { useEntryStore } from "@/store/useEntryStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useUIStore } from "@/store/useUIStore";
import { computeStreak } from "@/lib/utils/words";
import Avatar from "@/components/ui/Avatar";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  tooltip: string;
}

const navItems: NavItem[] = [
  { href: "/today",    label: "Today",    icon: <Home size={20} />,      tooltip: "Today" },
  { href: "/journal",  label: "Journal",  icon: <Book size={20} />,      tooltip: "Journal" },
  { href: "/calendar", label: "Calendar", icon: <Calendar size={20} />,  tooltip: "Calendar" },
  { href: "/insights", label: "Insights", icon: <BarChart2 size={20} />, tooltip: "Insights" },
  { href: "/settings", label: "Settings", icon: <Settings size={20} />,  tooltip: "Settings" },
];

interface SidebarProps {
  /** When true the sidebar collapses to a 72px icon-only rail */
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const recentEntries = useEntryStore((s) => s.recentEntries);
  const settings = useSettingsStore((s) => s.settings);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const streak = computeStreak(recentEntries);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={clsx(
        "flex flex-col h-full bg-surface border-r border-line transition-all duration-200",
        collapsed ? "w-[72px]" : "w-[250px]"
      )}
    >
      {/* Brand */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          "flex items-center gap-2 px-4 h-[62px] flex-shrink-0 hover:bg-surface2 transition-colors focus-visible:outline-none focus-visible:bg-surface2",
          collapsed && "justify-center px-0"
        )}
        aria-label="Toggle sidebar"
      >
        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
        {!collapsed && (
          <span className="font-semibold text-ink text-[15px] whitespace-nowrap">
            My Daily Life
          </span>
        )}
      </button>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-accentSoft text-accent"
                      : "text-ink2 hover:bg-surface2 hover:text-ink",
                    collapsed && "justify-center"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>

                {/* Tooltip (collapsed rail only) */}
                {collapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-ink text-paper text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                      {item.tooltip}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Recent entries (full sidebar only) */}
        {!collapsed && (
          <div className="mt-8 px-4">
            <p className="text-[11px] font-semibold tracking-wider text-ink3 uppercase mb-4">
              Recent
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#" className="flex items-baseline gap-3 text-[13px] text-ink2 hover:text-ink transition-colors group">
                  <span className="text-ink3 text-xs tabular-nums flex-shrink-0">15</span>
                  <span className="truncate group-hover:text-ink">Release checklist, gym</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-baseline gap-3 text-[13px] text-ink2 hover:text-ink transition-colors group">
                  <span className="text-ink3 text-xs tabular-nums flex-shrink-0">14</span>
                  <span className="truncate group-hover:text-ink">Studied English</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-baseline gap-3 text-[13px] text-ink2 hover:text-ink transition-colors group">
                  <span className="text-ink3 text-xs tabular-nums flex-shrink-0">12</span>
                  <span className="truncate group-hover:text-ink">Hyderabad, day one</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* User box */}
      <div className={clsx("border-t border-line p-3 flex-shrink-0", collapsed && "flex justify-center")}>
        {collapsed ? (
          <Avatar name={settings.displayName || "U"} size={36} />
        ) : (
          <div className="flex items-center gap-3 px-1">
            <Avatar name={settings.displayName || "U"} size={36} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink truncate">
                {settings.displayName || "Your Name"}
              </p>
              <p className="text-xs text-ink3">
                14 days in a row
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
