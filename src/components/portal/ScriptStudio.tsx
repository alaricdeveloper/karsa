"use client";

import type { ContentItem } from "@/lib/types";
import { Play, Copy } from "lucide-react";

interface ScriptStudioProps {
  contentItems: ContentItem[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onOpenTeleprompter: () => void;
  brand: string;
}

const PILLARS = ["Edukasi Solusi", "Storytelling Nyata", "Penawaran Spesial", "Mitos vs Fakta"];

export function ScriptStudio({ contentItems, selectedDay, onSelectDay, onOpenTeleprompter }: ScriptStudioProps) {
  const item = contentItems.find((c) => c.day_number === selectedDay);
  const pIdx = (selectedDay - 1) % 4;
  const dayStr = selectedDay < 10 ? `0${selectedDay}` : selectedDay;

  const handleCopyScript = () => {
    if (!item) return;
    const text = `NASKAH DAY ${selectedDay}\n\n${item.hook}\n\n${item.body}\n\n${item.cta}`;
    navigator.clipboard.writeText(text);
  };

  const handleCopyCaption = () => {
    if (!item?.caption) return;
    navigator.clipboard.writeText(item.caption);
  };

  return (
    <section className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-stone-500 shrink-0">Pilih Hari:</span>
          <select
            value={selectedDay}
            onChange={(e) => onSelectDay(Number(e.target.value))}
            className="w-full sm:w-auto bg-white border border-sand-300 rounded-lg px-3 py-2 text-base sm:text-xs text-sand-900 font-mono focus:outline-none min-h-[44px] sm:min-h-0"
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Day {d < 10 ? `0${d}` : d} — Naskah Harian
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onOpenTeleprompter}
            className="px-3.5 py-2 bg-sand-900 text-sand-50 rounded-lg font-medium transition flex items-center gap-1.5 min-h-[44px] sm:min-h-0"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Buka Teleprompter</span>
          </button>
          <button
            onClick={handleCopyScript}
            className="px-3 py-2 border border-sand-300 rounded-lg bg-white hover:bg-sand-200 text-stone-800 transition flex items-center gap-1 min-h-[44px] sm:min-h-0"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salin Naskah</span>
          </button>
        </div>
      </div>

      {/* Script Studio Card */}
      {item ? (
        <div className="bg-white border border-[#E5E5E0] p-5 sm:p-8 rounded-2xl font-mono text-xs space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-sand-200">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                Pilar: {PILLARS[pIdx]}
              </span>
              <h3 className="font-serif font-bold text-lg text-sand-900 mt-1">
                Day {dayStr} — {PILLARS[pIdx]}
              </h3>
            </div>
            <span className="text-[10px] text-stone-500 font-mono">Durasi: 20-30 Detik</span>
          </div>

          {/* Script Segments */}
          <div className="space-y-3.5 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl">
              <strong className="text-amber-950 font-mono text-[11px] block mb-1">[00:00 - 00:03] VISUAL &amp; AUDIO HOOK</strong>
              <p className="text-stone-800">{item.hook}</p>
            </div>
            <div className="p-3.5 bg-white border border-sand-200 rounded-xl">
              <strong className="text-stone-500 font-mono text-[11px] block mb-1">[00:03 - 00:18] VALUE DELIVERY &amp; SOCIAL PROOF</strong>
              <p className="text-stone-800">{item.body}</p>
            </div>
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <strong className="text-emerald-950 font-mono text-[11px] block mb-1">[00:18 - 00:25] DIRECT CALL TO ACTION (CTA)</strong>
              <p className="text-stone-800">{item.cta}</p>
            </div>
          </div>

          {/* Instagram Caption */}
          <div className="pt-4 border-t border-sand-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sand-900 font-serif text-sm">Takarir Instagram &amp; Threads</span>
              <button onClick={handleCopyCaption} className="text-stone-600 hover:text-sand-900 underline text-[11px]">
                Salin Takarir
              </button>
            </div>
            <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-xl font-sans text-xs text-stone-700 whitespace-pre-line leading-relaxed">
              {item.caption}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 text-center">
          <p className="text-sm text-sand-700 font-mono">Memuat naskah...</p>
        </div>
      )}
    </section>
  );
}
