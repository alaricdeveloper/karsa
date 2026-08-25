import type { ContentItem } from "@/lib/types";
import { dayStr, PILLAR_DOTS, pillarIndex } from "./hub-lib";

export function CalendarGrid({
  contentItems,
  selectedDay,
  checklist,
  onOpenDay,
}: {
  contentItems: ContentItem[];
  selectedDay: number;
  checklist: Record<string, boolean>;
  onOpenDay: (day: number) => void;
}) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-sunflower text-ink border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono font-bold text-sm shrink-0">
          01
        </span>
        <div>
          <h2 className="font-serif font-normal text-xl sm:text-2xl text-ink leading-tight">Matriks Jadwal 30 Hari</h2>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Pilih tanggal untuk membuka naskahnya di studio.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-xs text-inkMuted font-bold">
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sunflower border border-ink"></span> Edukasi</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-terracotta border border-ink"></span> Cerita</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-wasabi border border-ink"></span> Hard Sell</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ink border border-ink"></span> Mitos</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 gap-3">
        {days.map((day) => {
          const item = contentItems.find((c) => c.day_number === day);
          const active = day === selectedDay;
          const done = checklist[`s${day}`];
          return (
            <button
              key={day}
              onClick={() => onOpenDay(day)}
              className={`bento-pop p-3.5 rounded-2xl cursor-pointer transition flex flex-col justify-between min-h-[95px] font-mono text-xs text-left ${
                active ? "bg-sunflower shadow-brutal-sm" : done ? "bg-wasabi/70" : "bg-white"
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Buka naskah Day ${dayStr(day)}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-ink text-xs">Day {dayStr(day)}</span>
                <span className={`w-2.5 h-2.5 rounded-full border border-ink ${PILLAR_DOTS[pillarIndex(day)]}`}></span>
              </div>
              <div className="font-sans text-[11px] text-stone-700 line-clamp-2 mt-1 leading-snug font-medium">
                {item?.pillar || "Konten"}
              </div>
              <span className="text-[10px] text-terracotta font-bold block text-right mt-1">Buka &rarr;</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}