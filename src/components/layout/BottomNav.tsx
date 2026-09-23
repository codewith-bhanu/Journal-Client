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

const navItems = [
  { href: "/today",    label: "Today",    icon: <Home size={22} /> },
  { href: "/journal",  label: "Journal",  icon: <Book size={22} /> },
  { href: "/calendar", label: "Calendar", icon: <Calendar size={22} /> },
  { href: "/insights", label: "Insights", icon: <BarChart2 size={22} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={22} /> },
];

export default function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-line h-[60px] flex items-stretch safe-area-pb">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-colors",
              active ? "text-accent" : "text-ink3"
            )}
          >
            <span className={clsx(active && "text-accent")}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
