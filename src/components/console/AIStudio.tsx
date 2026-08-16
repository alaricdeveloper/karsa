"use client";

import { useState } from "react";
import type { Order } from "@/lib/types";
import { TONE_OPTIONS } from "@/lib/constants";
import { Zap, Copy } from "lucide-react";

interface AIStudioProps {
  orders: Order[];
}

export function AIStudio({ orders }: AIStudioProps) {
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [tone, setTone] = useState(TONE_OPTIONS[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const compilePrompt = () => {
    if (!selectedOrder) return;

    const prompt = `### SYSTEM ROLE:
Anda adalah Senior Brand Strategist & Lead Copywriter untuk Karsa Studio. Tugas Anda adalah menyusun kalender konten terstruktur 30 hari penuh berdasarkan data brief di bawah.

### PARAMETER KLIEN:
- Nama Brand: ${selectedOrder.brand}
- Kategori Niche: ${selectedOrder.category}
- Kompetitor Referensi: ${selectedOrder.competitor || "General Market Benchmark"}
- Value Proposition & Target Konsumen: ${selectedOrder.description}
- Tone of Voice: ${tone}

### STRUKTUR DELIVERABLES YANG WAJIB DIHASILKAN:
1. 30 Script Video Pendek (Format: Hook 0-3s, Problem Framing, Core Solution, Clear CTA).
2. 30 Instagram Captions + Riset 10 Hashtags spesifik niche.
3. 4 Kerangka Artikel Blog SEO (1.000 kata, struktur H1, H2, H3, Meta Description).
4. Analisis Sudut Celah Diferensiasi dari ${selectedOrder.competitor || "Kompetitor Utama"}.

Outputkan seluruh konten dalam format Markdown terstruktur yang siap disalin langsung ke template database Notion.`;

    setGeneratedPrompt(prompt);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  return (
    <section className="space-y-4">
      <div className="bg-white border border-[#E5E5E0] p-4 sm:p-6 rounded-2xl space-y-4 sm:space-y-5">
        <div>
          <span className="text-[11px] sm:text-xs font-mono uppercase text-stone-500">Autonomous Prompt Engine</span>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-sand-900 mt-0.5">Eksekusi Prompt Batch Otomatis</h2>
          <p className="text-xs text-stone-600 font-mono mt-1">Pilih salah satu dari {orders.length} klien untuk generate prompt terstruktur.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
          <div>
            <label className="block text-stone-600 mb-1">Pilih Antrean Klien:</label>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px] sm:min-h-0"
            >
              <option value="">-- Pilih Klien --</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.order_id} — {o.brand} ({o.category})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-stone-600 mb-1">Target Persona Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px] sm:min-h-0"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={compilePrompt}
              disabled={!selectedOrderId}
              className="w-full py-3 sm:py-2 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl sm:rounded-lg font-medium transition flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4" />
              <span>Compile Master System Prompt</span>
            </button>
          </div>
        </div>

        <div className="relative mt-2 sm:mt-4">
          <div className="flex justify-between items-center pb-2 font-mono text-xs text-stone-500">
            <span>Generated Master System Prompt:</span>
            {generatedPrompt && (
              <button
                onClick={copyPrompt}
                className="px-3 py-1.5 border border-sand-300 rounded-lg bg-white hover:bg-sand-200 text-sand-900 font-semibold transition flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Salin Prompt
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={generatedPrompt}
            rows={10}
            className="w-full bg-sand-900 text-emerald-400 font-mono text-xs p-3.5 sm:p-4 rounded-xl focus:outline-none leading-relaxed border border-stone-800 resize-none"
          />
        </div>
      </div>
    </section>
  );
}
