"use client";

import { useEffect, useMemo, useState } from "react";
import { Bookmark, Copy, Check } from "lucide-react";
import type { Order } from "@/lib/types";
import {
  PROMPT_HISTORY_KEY,
  STATUS_LABELS,
} from "./console-lib";

const TEMPLATES = [
  { key: "calendar", label: "Kalender 30 Hari (Full)" },
  { key: "competitor", label: "Analisis Celah Kompetitor" },
  { key: "seo", label: "Kerangka Artikel SEO" },
];

const TONES = [
  "Casual Authentic (Storytelling)",
  "Educational & Authoritative",
  "High Conversion Direct-Response",
];

type HistoryItem = { ts: string; brand: string; template: string; text: string };

function compilePrompt(order: Order, template: string, tone: string): string {
  const competitor = order.competitor || "General Market Benchmark";
  if (template === "competitor") {
    return `### SYSTEM ROLE:
Anda adalah Competitive Intelligence Analyst untuk Karsa Studio. Tugas Anda adalah memetakan celah konten dari kompetitor utama klien.

### PARAMETER KLIEN:
- Nama Brand: ${order.brand}
- Kategori Niche: ${order.category}
- Kompetitor Referensi: ${competitor}
- Value Proposition & Target Konsumen: ${order.description}

### ANALISIS YANG WAJIB DIHASILKAN:
1. 5 format konten yang paling sering dipakai kompetitor beserta frekuensinya.
2. 3 celah konten yang belum dieksploitasi kompetitor (topik, format, atau sudut pesan).
3. 1 sudut diferensiasi utama yang bisa langsung dipakai sebagai tema 30 hari.
4. Rekomendasi 10 kata kunci konten yang relevan dengan niche.

Outputkan dalam format Markdown terstruktur siap salin ke Notion.`.trim();
  }
  if (template === "seo") {
    return `### SYSTEM ROLE:
Anda adalah SEO Content Strategist untuk Karsa Studio. Tugas Anda adalah menyusun kerangka artikel blog yang menargetkan kata kunci utama klien.

### PARAMETER KLIEN:
- Nama Brand: ${order.brand}
- Kategori Niche: ${order.category}
- Kompetitor Referensi: ${competitor}
- Value Proposition & Target Konsumen: ${order.description}

### KERANGKA ARTIKEL YANG WAJIB DIHASILKAN (untuk 4 artikel, 1.000 kata per artikel):
1. Judul utama + 2 varian (format: manfaat + kata kunci).
2. Struktur H1, H2, H3 lengkap dengan outline tiap bagian.
3. Meta description 155 karakter + slug yang direkomendasikan.
4. 5 internal anchor text yang relevan.
5. Skema FAQ (3 pertanyaan + jawaban singkat) untuk rich snippet.

Outputkan dalam format Markdown terstruktur siap salin ke Notion.`.trim();
  }
  return `### SYSTEM ROLE:
Anda adalah Senior Brand Strategist & Lead Copywriter untuk Karsa Studio. Tugas Anda adalah menyusun kalender konten terstruktur 30 hari penuh berdasarkan data brief di bawah.

### PARAMETER KLIEN:
- Nama Brand: ${order.brand}
- Kategori Niche: ${order.category}
- Kompetitor Referensi: ${competitor}
- Value Proposition & Target Konsumen: ${order.description}
- Tone of Voice: ${tone}

### STRUKTUR DELIVERABLES YANG WAJIB DIHASILKAN:
1. 30 Script Video Pendek (Format: Hook 0-3s, Problem Framing, Core Solution, Clear CTA).
2. 30 Instagram Captions + Riset 10 Hashtags spesifik niche.
3. 4 Kerangka Artikel Blog SEO (1.000 kata, struktur H1, H2, H3, Meta Description).
4. Analisis Sudut Celah Diferensiasi dari ${competitor}.

Outputkan seluruh konten dalam format Markdown terstruktur yang siap disalin langsung ke template database Notion.`.trim();
}

export function AIStudio({
  orders,
  defaultTone,
  onToneChange,
}: {
  orders: Order[];
  defaultTone: string;
  onToneChange: (tone: string) => void;
}) {
  const [orderId, setOrderId] = useState("");
  const [template, setTemplate] = useState("calendar");
  const [tone, setTone] = useState(defaultTone);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [overrideText, setOverrideText] = useState<string | null>(null);

  const order = useMemo(
    () => orders.find((o) => o.order_id === orderId) || null,
    [orders, orderId]
  );

  useEffect(() => {
    if (orders.length > 0 && !orderId) {
      setOrderId(orders[0].order_id);
    }
  }, [orders, orderId]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(PROMPT_HISTORY_KEY) || "[]"));
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    setTone(defaultTone);
  }, [defaultTone]);

  const promptText = order ? compilePrompt(order, template, tone) : "";
  const displayedText = overrideText ?? promptText;

  function saveToHistory() {
    if (!promptText || !order) return;
    const item: HistoryItem = {
      ts: new Date().toISOString(),
      brand: order.brand,
      template,
      text: promptText,
    };
    const next = [item, ...history].slice(0, 10);
    setHistory(next);
    localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function loadFromHistory(index: number) {
    const item = history[index];
    if (!item) return;
    setOverrideText(item.text);
    setTemplate(item.template);
    setCopied(false);
  }

  async function copyPrompt() {
    const text = displayedText;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="plate-pop p-5 sm:p-8 rounded-3xl space-y-5">
        <div>
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Autonomous Prompt Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-ink mt-2">Eksekusi Prompt Batch Otomatis</h2>
          <p className="text-xs text-stone-600 font-mono mt-1">Pilih antrean klien, pilih template prompt, lalu compile master system prompt siap salin.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          {[
            ["Brand", order ? order.brand : "-"],
            ["Kategori Niche", order ? order.category : "-"],
            ["Kompetitor", order ? order.competitor || "-" : "-"],
            ["Status", order ? STATUS_LABELS[order.status] || order.status : "-"],
          ].map(([label, value]) => (
            <div key={label} className="border-2 border-ink rounded-2xl p-3 bg-canvas shadow-brutal-sm">
              <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">{label}</span>
              <span className="font-bold text-ink text-xs block mt-1 break-words">{value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div>
            <label className="block text-ink font-bold mb-1" htmlFor="generatorOrderSelect">
              Pilih Antrean Klien:
            </label>
            <select
              id="generatorOrderSelect"
              value={orderId}
              onChange={(e) => { setOrderId(e.target.value); setOverrideText(null); }}
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink font-bold focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.order_id}>
                  {o.order_id} — {o.brand} ({o.category})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-ink font-bold mb-1" htmlFor="promptTemplateSelect">
              Template Prompt:
            </label>
            <select
              id="promptTemplateSelect"
              value={template}
              onChange={(e) => { setTemplate(e.target.value); setOverrideText(null); }}
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink font-bold focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
            >
              {TEMPLATES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-ink font-bold mb-1" htmlFor="generatorToneSelect">
              Target Persona Tone:
            </label>
            <select
              id="generatorToneSelect"
              value={tone}
              onChange={(e) => { setTone(e.target.value); setOverrideText(null); }}
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink font-bold focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <span className="text-stone-600 font-bold">3 template siap pakai — compile lalu salin, atau simpan ke riwayat.</span>
          <button
            onClick={saveToHistory}
            className="px-3.5 py-2 border-2 border-ink rounded-xl bg-white hover:bg-canvas text-ink font-bold transition flex items-center gap-1.5 shadow-brutal-sm self-start sm:self-auto min-h-[44px]"
          >
            <Bookmark className="w-3.5 h-3.5" /> {saved ? "Tersimpan!" : "Simpan ke Riwayat"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="relative mt-2">
              <div className="flex justify-between items-center pb-2 font-mono text-xs text-stone-600 font-bold">
                <span>Generated Master System Prompt:</span>
                <button
                  onClick={copyPrompt}
                  className="px-3.5 py-1.5 border-2 border-ink rounded-xl bg-white hover:bg-canvas text-ink font-bold transition flex items-center gap-1.5 shadow-brutal-sm min-h-[44px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-wasabiDark" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Tersalin!" : "Salin Prompt"}
                </button>
              </div>
              <textarea
                id="generatedPromptArea"
                rows={10}
                readOnly
                value={displayedText}
                placeholder="Pilih klien & template untuk meng-compile prompt…"
                className="w-full bg-ink text-wasabi font-mono text-xs p-4 rounded-2xl focus:outline-none leading-relaxed border-2 border-ink"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center pb-2 font-mono text-xs text-stone-600 font-bold">
              <span>Riwayat Prompt</span>
              <span className="text-[10px]">{history.length} item</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto kanban-scroll pr-1">
              {history.length === 0 ? (
                <div className="border-2 border-ink rounded-xl p-3 bg-canvas font-mono text-[10px] text-stone-600 font-bold">
                  Belum ada prompt tersimpan.
                </div>
              ) : (
                history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => loadFromHistory(i)}
                    className="w-full text-left border-2 border-ink rounded-xl p-3 bg-white shadow-brutal-sm cursor-pointer hover:bg-canvas transition"
                    title="Klik untuk muat"
                  >
                    <div className="flex justify-between items-center gap-2 font-mono text-[10px] font-bold">
                      <span className="text-ink truncate">{h.brand}</span>
                      <span className="text-stone-600 shrink-0">
                        {new Date(h.ts).toLocaleDateString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-terracotta font-bold">
                      {TEMPLATES.find((t) => t.key === h.template)?.label || h.template}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}