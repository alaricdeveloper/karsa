"use client";

import { useState, useEffect, useRef } from "react";
import type { ContentItem } from "@/lib/types";

interface TeleprompterProps {
  contentItems: ContentItem[];
  selectedDay: number;
}

const SPEEDS = [1, 2, 3, 4, 5, 6, 7, 8];

export function Teleprompter({ contentItems, selectedDay }: TeleprompterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const item = contentItems.find((c) => c.day_number === selectedDay);
  const fullScript = item
    ? `${item.hook}\n\n${item.body}\n\n${item.cta}`
    : "";

  useEffect(() => {
    if (isPlaying && isOpen && containerRef.current) {
      intervalRef.current = setInterval(() => {
        setScrollPos((prev) => {
          const maxScroll = containerRef.current
            ? containerRef.current.scrollHeight - containerRef.current.clientHeight
            : 0;
          const next = prev + speed;
          return next >= maxScroll ? 0 : next;
        });
      }, 30);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isOpen, speed]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPos;
    }
  }, [scrollPos]);

  if (!item) return null;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setScrollPos(0);
          setIsPlaying(true);
        }}
        className="w-full py-3 bg-sand-900 text-white rounded-xl font-semibold text-sm hover:bg-sand-800 transition min-h-[44px]"
      >
        🎬 Buka Teleprompter (Hari {selectedDay})
      </button>

      {/* Fullscreen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-sand-900 text-white flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-sand-700">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-sand-400">
                Hari ke-{selectedDay} • {speed}x
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Speed Controls */}
              <div className="flex items-center gap-1">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-mono font-bold transition ${
                      speed === s
                        ? "bg-white text-sand-900"
                        : "bg-sand-700 text-sand-300 hover:bg-sand-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 bg-sand-700 rounded-lg text-xs font-semibold hover:bg-sand-600 transition"
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPlaying(false);
                }}
                className="px-4 py-2 bg-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-700 transition"
              >
                ✕ Tutup
              </button>
            </div>
          </div>

          {/* Script Content */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-8 sm:p-16"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <div className="max-w-3xl mx-auto space-y-12 text-2xl sm:text-3xl md:text-4xl font-serif leading-relaxed">
              {/* Hook */}
              <div className="border-l-4 border-amber-400 pl-6">
                <p className="text-xs font-mono text-amber-400 mb-2 uppercase">
                  🪝 Hook (0–3 detik)
                </p>
                <p>{item.hook}</p>
              </div>

              {/* Body */}
              <div className="border-l-4 border-indigo-400 pl-6">
                <p className="text-xs font-mono text-indigo-400 mb-2 uppercase">
                  📝 Body / Isi
                </p>
                <p>{item.body}</p>
              </div>

              {/* CTA */}
              <div className="border-l-4 border-emerald-400 pl-6">
                <p className="text-xs font-mono text-emerald-400 mb-2 uppercase">
                  📢 Call-to-Action
                </p>
                <p>{item.cta}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
