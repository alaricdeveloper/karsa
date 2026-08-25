"use client";

import { useEffect, useRef, useState } from "react";
import type { ContentItem } from "@/lib/types";
import { Play, Pause, X } from "lucide-react";
import { dayStr } from "./hub-lib";

export function Teleprompter({
  open,
  item,
  day,
  onClose,
}: {
  open: boolean;
  item: ContentItem | null;
  day: number;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const canvasRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (open) {
      setPlaying(true);
      setSpeed(2);
      if (canvasRef.current) canvasRef.current.scrollTop = 0;
    }
  }, [open, day]);

  useEffect(() => {
    if (!open) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      return;
    }
    if (playing && canvasRef.current) {
      intervalRef.current = setInterval(() => {
        if (canvasRef.current) canvasRef.current.scrollTop += speed;
      }, 30);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, open, speed]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-ink text-canvas z-50 flex flex-col font-sans select-none"
      role="dialog"
      aria-label="Teleprompter naskah"
    >
      <div className="p-4 border-b-2 border-ink flex items-center justify-between font-mono text-xs flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setPlaying(!playing)}
            className="px-4 py-2 bg-wasabi text-ink rounded-xl font-bold flex items-center gap-1.5 min-h-[44px] border-2 border-ink shadow-brutal-sm"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {playing ? "Pause" : "Play"}
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-inkMuted font-bold">Speed:</span>
            <button
              onClick={() => setSpeed(Math.max(1, speed - 1))}
              aria-label="Kurangi kecepatan"
              className="w-9 h-9 bg-canvas/10 rounded-lg font-bold hover:bg-canvas/20 min-h-[44px] min-w-[44px]"
            >
              -
            </button>
            <span className="px-2 font-bold text-wasabi">{speed}x</span>
            <button
              onClick={() => setSpeed(Math.min(8, speed + 1))}
              aria-label="Tambah kecepatan"
              className="w-9 h-9 bg-canvas/10 rounded-lg font-bold hover:bg-canvas/20 min-h-[44px] min-w-[44px]"
            >
              +
            </button>
          </div>
          <span className="text-inkMuted font-bold hidden sm:inline">Day {dayStr(day)} — {item?.pillar || "Konten"}</span>
        </div>
        <button onClick={onClose} className="px-4 py-2 bg-canvas/10 rounded-xl text-canvas hover:bg-canvas/20 font-bold min-h-[44px]">
          Tutup <X className="w-3.5 h-3.5 inline" />
        </button>
      </div>

      <div ref={canvasRef} className="flex-1 overflow-y-auto p-6 sm:p-12 text-center text-xl sm:text-3xl font-bold leading-relaxed space-y-8 max-w-3xl mx-auto sheet-scroll">
        {item ? (
          <div className="py-16 text-canvas/90">
            <div className="text-sunflower text-sm mb-4 font-mono font-bold">[HOOK 00:00 - 00:03]</div>
            <p className="mb-10 text-canvas">{item.hook}</p>
            <div className="text-wasabi text-sm mb-4 font-mono font-bold">[BODY 00:03 - 00:18]</div>
            <p className="mb-10 text-canvas/80">{item.body}</p>
            <div className="text-terracotta text-sm mb-4 font-mono font-bold">[CTA 00:18 - 00:25]</div>
            <p className="text-canvas">{item.cta}</p>
          </div>
        ) : (
          <p className="py-16 text-canvas/60">Naskah hari ini belum tersedia.</p>
        )}
      </div>
    </div>
  );
}