"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Pause, Play, Square, Trash2 } from "lucide-react";
import FocusShell from "@/components/layout/FocusShell";
import WaveformIcon from "@/components/ui/WaveformIcon";
import Card from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/Modal";
import { AudioRecorder } from "@/lib/audio/recorder";
import { saveAudioBlob } from "@/lib/db/audio";
import { useEntryStore } from "@/store/useEntryStore";
import { useHotkeys } from "@/lib/utils/useHotkeys";

type Phase = "idle" | "recording" | "paused" | "stopped";

const BAR_COUNT = 72;
const SILENCE_SECONDS = 8;
const SILENCE_THRESHOLD = 0.018;
const LEVEL_REFERENCE = 0.3;
const DISCARD_THRESHOLD_SECONDS = 3;

const PROMPTS = [
  "Take your time. What happened at work today?",
  "What are you thinking about right now?",
  "Who did you see today?",
];

function computeRMS(data: Uint8Array, start: number, end: number): number {
  let sum = 0;
  for (let i = start; i < end; i++) {
    const value = (data[i] - 128) / 128;
    sum += value * value;
  }
  return Math.sqrt(sum / (end - start));
}

export default function RecordPage() {
  const router = useRouter();
  const setDraftField = useEntryStore((s) => s.setDraftField);

  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [levels, setLevels] = useState<number[] | null>(null);
  const [promptVisible, setPromptVisible] = useState(true);
  const [promptIndex, setPromptIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const startedAtRef = useRef(0);
  const accumulatedRef = useRef(0);
  const elapsedRef = useRef(0);
  const silenceAccumRef = useRef(0);
  const promptVisibleRef = useRef(false);

  useEffect(() => {
    promptVisibleRef.current = promptVisible;
  }, [promptVisible]);

  useEffect(() => {
    if (phase !== "recording") return;
    let raf = 0;
    let lastTick = performance.now();
    const data = new Uint8Array(analyserRef.current?.fftSize ?? 256);

    const loop = () => {
      const now = performance.now();
      const dt = (now - lastTick) / 1000;
      lastTick = now;

      const elapsed =
        accumulatedRef.current + (Date.now() - startedAtRef.current) / 1000;
      elapsedRef.current = elapsed;
      setSeconds(Math.floor(elapsed));

      const analyser = analyserRef.current;
      if (analyser) {
        analyser.getByteTimeDomainData(data);
        const bucketSize = data.length / BAR_COUNT;
        const barRMS: number[] = [];
        let totalRMS = 0;

        for (let i = 0; i < BAR_COUNT; i++) {
          const start = Math.floor(i * bucketSize);
          const end = Math.floor((i + 1) * bucketSize);
          const rms = computeRMS(data, start, end);
          totalRMS += rms;
          barRMS.push(Math.min(1, rms / LEVEL_REFERENCE));
        }

        setLevels(barRMS.map((value) => Math.max(0.05, value)));

        const avgRMS = totalRMS / BAR_COUNT;
        if (avgRMS < SILENCE_THRESHOLD) {
          silenceAccumRef.current += dt;
          if (
            silenceAccumRef.current >= SILENCE_SECONDS &&
            !promptVisibleRef.current
          ) {
            setPromptVisible(true);
            setPromptIndex((index) => (index + 1) % PROMPTS.length);
          }
        } else {
          silenceAccumRef.current = 0;
          if (promptVisibleRef.current) setPromptVisible(false);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    silenceAccumRef.current = 0;
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    return () => {
      const recorder = recorderRef.current;
      if (recorder && (recorder.state === "recording" || recorder.state === "paused")) {
        void recorder.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    const recorder = new AudioRecorder();
    recorderRef.current = recorder;
    try {
      await recorder.start();
      analyserRef.current = recorder.getAnalyser();
      startedAtRef.current = Date.now();
      accumulatedRef.current = 0;
      elapsedRef.current = 0;
      setSeconds(0);
      setLevels(null);
      setPromptVisible(true);
      setPromptIndex(0);
      setPhase("recording");
    } catch {
      recorderRef.current = null;
      analyserRef.current = null;
      setPhase("idle");
    }
  };

  const pauseRecording = () => {
    if (phase !== "recording") return;
    accumulatedRef.current += (Date.now() - startedAtRef.current) / 1000;
    recorderRef.current?.pause();
    setPhase("paused");
  };

  const resumeRecording = () => {
    if (phase !== "paused") return;
    startedAtRef.current = Date.now();
    recorderRef.current?.resume();
    setPhase("recording");
  };

  const togglePauseResume = () => {
    if (phase === "recording") pauseRecording();
    else if (phase === "paused") resumeRecording();
  };

  const stopRecording = async () => {
    const recorder = recorderRef.current;
    if (!recorder || phase === "idle" || recorder.state === "inactive") {
      setPhase("stopped");
      return;
    }

    const todayKey = format(new Date(), "yyyy-MM-dd");
    const blob = await recorder.stop();
    const blobKey = `${todayKey}-${Date.now()}`;
    await saveAudioBlob(blobKey, blob);
    setDraftField("audioBlobKey", blobKey);
    setDraftField("durationSeconds", Math.round(elapsedRef.current));
    setPhase("stopped");
    router.push(`/entry/${todayKey}/transcript`);
  };

  const stopQuietly = async () => {
    const recorder = recorderRef.current;
    if (recorder && (recorder.state === "recording" || recorder.state === "paused")) {
      await recorder.stop();
    }
    recorderRef.current = null;
    analyserRef.current = null;
    setPhase("stopped");
  };

  const discardAndBack = async () => {
    await stopQuietly();
    router.back();
  };

  const requestDiscard = () => {
    if (confirmOpen) {
      setConfirmOpen(false);
      return;
    }
    if (elapsedRef.current > DISCARD_THRESHOLD_SECONDS) {
      setConfirmOpen(true);
      return;
    }
    void discardAndBack();
  };

  useHotkeys("space", togglePauseResume);
  useHotkeys("escape", requestDiscard);

  const totalSeconds = seconds;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");

  const recording = phase === "recording" || phase === "paused";
  const busy = phase !== "idle";
  const focused = phase === "recording";

  return (
    <FocusShell 
      indicatorSlot={busy ? (
        <span className="flex items-center gap-2 text-sm text-[#e58b6d]">
          <span className="h-2 w-2 rounded-full bg-[#e58b6d]" />
          <span className="font-medium">
            {phase === "paused" ? "Paused" : "Recording · saving as you speak"}
          </span>
        </span>
      ) : (
        <span className="text-sm text-ink3">Ready to record</span>
      )} 
      topRightSlot={busy ? (
        <span className="hidden sm:inline text-sm text-ink3">
          Press <kbd className="font-sans text-[11px] bg-surface2 border border-line px-1.5 py-0.5 rounded mx-0.5">Space</kbd> to {phase === "paused" ? "resume" : "pause"}
        </span>
      ) : null}
      onClose={requestDiscard}
    >
      <div className="flex min-h-full flex-col items-center justify-center gap-10 px-6 py-10">
        {/* Timer */}
        <p className="text-[80px] font-normal leading-none tabular-nums tracking-tight text-ink mt-[-20px]">
          {minutes}:{remainingSeconds}
        </p>

        {/* Live waveform */}
        <div className="flex w-full max-w-[800px] justify-center my-4">
          <WaveformIcon
            live={focused}
            bars={72}
            size={80}
            levels={levels ?? undefined}
          />
        </div>

        {/* Silence prompt */}
        <div className="h-[60px] w-full max-w-[500px] flex justify-center">
          <AnimatePresence mode="wait">
            {promptVisible ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center rounded-3xl bg-[#1a2b22] px-8 py-5"
              >
                <p className="text-center font-serif text-[18px] leading-none text-[#83d0a1]">
                  {PROMPTS[promptIndex]}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <button
            type="button"
            aria-label="Discard recording"
            onClick={requestDiscard}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-surface2 text-ink3 transition-colors hover:text-ink hover:bg-surface"
          >
            <Trash2 size={20} />
          </button>

          {recording ? (
            <button
              type="button"
              aria-label="Stop recording"
              onClick={() => void stopRecording()}
              className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-[12px] border-[#1a2b22] bg-transparent transition-transform hover:scale-105"
            >
              <div className="h-[24px] w-[24px] rounded-lg bg-[#e58b6d]" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Start recording"
              onClick={() => void startRecording()}
              className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-[12px] border-[#1a2b22] bg-transparent text-[#83d0a1] transition-transform hover:scale-105"
            >
              <Mic size={34} />
            </button>
          )}

          <button
            type="button"
            aria-label={phase === "paused" ? "Resume recording" : "Pause recording"}
            onClick={togglePauseResume}
            disabled={phase === "idle"}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-surface2 text-ink3 transition-colors hover:text-ink hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
          >
            {phase === "paused" ? <Play size={20} className="ml-1" /> : <Pause size={20} />}
          </button>
        </div>

        <p className="mt-8 text-[13px] text-ink3 text-center">
          Speak as long as you like — fifteen minutes is completely normal.
        </p>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Discard this recording?"
        description="This audio will not be saved. You can start over any time."
        confirmLabel="Discard"
        destructive
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => void discardAndBack()}
      />
    </FocusShell>
  );
}