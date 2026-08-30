"use client";

import { useState } from "react";
import type { Order } from "@/lib/types";
import { Layout, ArrowUpRight } from "lucide-react";

export function NotionCallout({ order }: { order: Order }) {
  const [guideOpen, setGuideOpen] = useState(false);
  const hasUrl = Boolean(order.notion_url && order.notion_url.trim() !== "");

  return (
    <section
      className="bento-pop p-5 sm:p-6 rounded-3xl bg-wasabi/20 flex flex-col items-start gap-4"
      aria-label="Akses workspace Notion"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-ink text-canvas flex items-center justify-center shrink-0 border-2 border-ink shadow-brutal-sm">
            <Layout className="w-5 h-5 text-wasabi" />
          </div>
          <div className="min-w-0">
            <h2 className="font-serif font-normal text-lg text-ink">Ruang Kerja Notion 30 Hari Anda</h2>
            <p className="text-xs text-inkMuted font-mono mt-0.5 font-bold" id="notionStatusText">
              {hasUrl
                ? "Workspace Notion 30 Hari Anda aktif & siap diduplikasi."
                : "Workspace sedang disusun tim operasional kami (SLA < 24 jam)."}
            </p>
          </div>
        </div>

        <a
          href={hasUrl ? order.notion_url! : "#"}
          target="_blank"
          rel="noopener"
          aria-disabled={!hasUrl}
          className={`w-full sm:w-auto px-6 py-3.5 bg-ink hover:bg-terracotta text-ink rounded-2xl text-xs font-mono font-bold transition flex items-center justify-center gap-2 min-h-[48px] shadow-brutal ${
            hasUrl ? "" : "pointer-events-none opacity-50"
          }`}
        >
          <span>Buka Notion Workspace</span>
          <ArrowUpRight className="w-4 h-4 text-wasabi" />
        </a>
      </div>

      <div className="w-full">
        <button
          onClick={() => setGuideOpen(!guideOpen)}
          className="text-terracotta hover:underline font-bold text-xs font-mono min-h-[44px]"
        >
          Panduan: isi workspace & cara duplikasi <span>{guideOpen ? "−" : "+"}</span>
        </button>
        {guideOpen && (
          <div className="mt-3 p-4 bg-white border-2 border-ink rounded-2xl space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
            <div>
              <span className="font-bold text-ink font-mono text-xs block mb-1">ISI WORKSPACE</span>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>Kalender Master 30 Hari (tandai tiap hari selesai rekam)</li>
                <li>30 Naskah lengkap (salinan studio, bisa diedit sendiri)</li>
                <li>Caption Bank (semua caption siap tempel)</li>
                <li>4 Artikel SEO (kerangka + panduan penulisan)</li>
                <li>Audit Kompetitor &amp; Log Revisi</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-ink font-mono text-xs block mb-1">CARA DUPLIKASI</span>
              <ol className="list-decimal pl-5 space-y-0.5">
                <li>Buka link workspace di atas.</li>
                <li>Klik <strong>Duplicate</strong> (kanan atas) ke akun Notion Anda.</li>
                <li>Rename workspace sesuai brand, lalu mulai tandai hari rekaman.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}