"use client";

import type { ContentItem } from "@/lib/types";

interface CalendarGridProps {
  contentItems: ContentItem[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  brand: string;
}

const PILLARS = ["Edukasi Nilai", "Storytelling", "Hard Sell & Promo", "Relatable Mitos"];
const PILLAR_DOT_COLORS = ["bg-amber-500", "bg-indigo-500", "bg-emerald-500", "bg-pink-500"];

export function CalendarGrid({ contentItems, selectedDay, onSelectDay, brand }: CalendarGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono">
        <div>
          <h2 className="font-bold font-serif text-lg text-sand-900">Matriks Jadwal 30 Hari</h2>
          <p className="text-stone-500 text-[11px]">Klik salah satu tanggal untuk membuka studio naskah lengkap.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-stone-600">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Edukasi
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-stone-600">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> Cerita
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Hard Sell
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const pillarIdx = (day - 1) % 4;
          const isSelected = selectedDay === day;
          const item = contentItems.find((c) => c.day_number === day);

          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`p-3 rounded-xl border transition flex flex-col justify-between min-h-[90px] font-mono text-xs text-left ${
                isSelected
                  ? "border-sand-900 bg-sand-100"
                  : "bg-white border-[#E5E5E0] hover:border-sand-900"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sand-900 text-[11px]">
                  Day {day < 10 ? `0${day}` : day}
                </span>
                <span className={`w-2 h-2 rounded-full ${PILLAR_DOT_COLORS[pillarIdx]}`} />
              </div>
              <div className="font-sans text-[10px] text-stone-600 line-clamp-2 mt-1">
                {PILLARS[pillarIdx]} untuk {brand}
              </div>
              <span className="text-[9px] text-stone-400 block text-right mt-1">Lihat &rarr;</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
