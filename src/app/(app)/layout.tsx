"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AppShell from "@/components/layout/AppShell";
import TopbarActions from "@/components/layout/TopbarActions";
import TopbarDate from "@/components/layout/TopbarDate";
import TranscriptTopbarContent from "@/components/layout/TranscriptTopbarContent";
import TranscriptTopbarActions from "@/components/layout/TranscriptTopbarActions";
import ReflectionTopbarContent from "@/components/layout/ReflectionTopbarContent";
import ReflectionTopbarActions from "@/components/layout/ReflectionTopbarActions";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const isTranscript = pathname?.includes("/transcript");
  const isReflection = pathname?.includes("/reflection");
  const isWrite = pathname?.includes("/write");

  const useWriteTopbar = isReflection || isWrite;

  const topbarContent = isTranscript ? <TranscriptTopbarContent /> : useWriteTopbar ? <ReflectionTopbarContent /> : <TopbarDate />;
  const topbarSlot = isTranscript ? <TranscriptTopbarActions /> : useWriteTopbar ? <ReflectionTopbarActions /> : <TopbarActions />;

  return (
    <AppShell 
      topbarContent={topbarContent}
      topbarSlot={topbarSlot}
    >
      {children}
    </AppShell>
  );
}
