"use client";

import { useState } from "react";
import type { Order, ContentItem } from "@/lib/types";
import { ChevronLeft, ChevronRight, Play, Copy, Download, Check } from "lucide-react";
import { dayStr, PILLAR_BADGES, pillarIndex, buildDayExport, downloadText } from "./hub-lib";

export function ScriptStudio({
  order,
  contentItems,
  selectedDay,
  onSelectDay,
  onOpenTeleprompter,
}: {
  order: Order;
  contentItems: ContentItem[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onOpenTeleprompter: () => void;
}) {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const item = contentItems.find((c) => c.day_number === selectedDay);
  const topicTitle = item?.pillar || "Konten";

  const step = (dir: number) => {
    const next = Math.max(1, Math.min(30, selectedDay + dir));
    if (next !== selectedDay) onSelectDay(next);
  };

  const copyScript = async () => {
    if (!item) return;
    const text = `NASKAH DAY ${dayStr(selectedDay)} - ${order.brand}\n\n${item.hook}\n\n${item.body}\n\n${item.cta}`;
    await navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 1600);
  };

  const copyCaption = async () => {
    if (!item?.caption) return;
    await navigator.clipboard.writeText(item.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 1600);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-terracotta text-ink border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono font-bold text-sm shrink-0">
          02
        </span>
        <div>
          <h2 className="font-serif font-normal text-xl sm:text-2xl text-ink leading-tight">Studio Hari Ini</h2>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Baca, salin, atau langsung rekam naskah hari ini.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between items-start sm:items-center gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => step(-1)}
            aria-label="Hari sebelumnya"
            className="w-11 h-11 bg-white hover:bg-canvas border-2 border-ink rounded-xl font-bold transition shadow-brutal-sm flex items-center justify-center shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <select
            value={selectedDay}
            onChange={(e) => onSelectDay(Number(e.target.value))}
            aria-label="Pilih hari naskah"
            className="w-full sm:w-auto bg-white border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-ink font-mono font-bold focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px] shadow-brutal-sm"
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Day {dayStr(d)} — {contentItems.find((c) => c.day_number === d)?.pillar || "Konten"}
              </option>
            ))}
          </select>
          <button
            onClick={() => step(1)}
            aria-label="Hari berikutnya"
            className="w-11 h-11 bg-white hover:bg-canvas border-2 border-ink rounded-xl font-bold transition shadow-brutal-sm flex items-center justify-center shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:flex sm:items-center gap-2.5 w-full sm:w-auto sm:justify-end">
          <button
            onClick={onOpenTeleprompter}
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-terracotta hover:bg-ink text-white rounded-2xl font-bold transition flex items-center gap-2 min-h-[48px] shadow-brutal"
          >
            <Play className="w-4 h-4 text-wasabi" />
            <span>Buka Teleprompter</span>
          </button>
          <button
            onClick={copyScript}
            className="w-full sm:w-auto justify-center px-4 py-2.5 border-2 border-ink rounded-2xl bg-white hover:bg-canvas text-ink font-bold transition flex items-center gap-1.5 min-h-[48px] shadow-brutal-sm"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5 text-wasabiDark" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? "Tersalin" : "Salin Naskah"}</span>
          </button>
          <button
            onClick={() => downloadText(`karsa_${order.order_id}_day${dayStr(selectedDay)}.txt`, buildDayExport(order, item, selectedDay))}
            className="w-full sm:w-auto justify-center px-4 py-2.5 border-2 border-ink rounded-2xl bg-white hover:bg-canvas text-ink font-bold transition flex items-center gap-1.5 min-h-[48px] shadow-brutal-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Hari Ini</span>
          </button>
        </div>
      </div>

      <div className="bento-pop p-5 sm:p-8 rounded-3xl font-mono text-xs space-y-5 bg-white">
        <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b-2 border-ink">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className={`badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold ${PILLAR_BADGES[pillarIndex(selectedDay)]}`}>
              Pilar: {topicTitle}
            </span>
            <h3 className="font-serif font-normal text-lg sm:text-xl text-ink">Day {dayStr(selectedDay)} — {topicTitle}</h3>
          </div>
          <span className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Durasi: 20-30 Detik</span>
        </div>

        <div className="space-y-4 font-sans text-xs sm:text-sm text-stone-900 leading-relaxed">
          <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
            <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL &amp; AUDIO HOOK</strong>
            <p className="text-stone-900">{item?.hook || "Belum tersedia."}</p>
          </div>

          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
            <strong className="text-inkMuted font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY &amp; SOCIAL PROOF</strong>
            <p className="text-stone-900">{item?.body || "Belum tersedia."}</p>
          </div>

          <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
            <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] DIRECT CALL TO ACTION (CTA)</strong>
            <p className="text-stone-900">{item?.cta || "Belum tersedia."}</p>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-ink space-y-2.5">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="font-serif font-normal text-base text-ink">Caption Instagram &amp; Threads</span>
            <button onClick={copyCaption} className="text-terracotta hover:underline font-bold text-xs min-h-[44px]">
              {copiedCaption ? "Tersalin ✓" : "Salin Caption →"}
            </button>
          </div>
          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-sans text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed">
            {item?.caption || "Belum tersedia."}
          </div>
        </div>
      </div>
    </section>
  );
}