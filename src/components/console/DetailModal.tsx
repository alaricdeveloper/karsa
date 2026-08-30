"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ExternalLink, FileText, MessageSquare, RefreshCw, X } from "lucide-react";
import type { Order } from "@/lib/types";

type ContentItemRow = {
  day_number: number;
  pillar: string;
  hook: string | null;
  body: string | null;
  cta: string | null;
  caption: string | null;
};

type SeoArticleRow = {
  article_number: number;
  article_type: string;
  title: string;
  description: string | null;
  outline: string | null;
};
import {
  applyWaTemplate,
  calculateSLA,
  formatIdShort,
  readAudit,
  STATUS_FULL_LABELS,
} from "./console-lib";

export function DetailModal({
  open,
  order,
  onClose,
  onSave,
  onQuickComplete,
  onSendWA,
  now,
}: {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSave: (orderId: string, updates: { status?: string; notion_url?: string; notes?: string }) => void;
  onQuickComplete: (order: Order) => void;
  onSendWA: (order: Order, notionUrl: string) => void;
  now: number;
}) {
  const [notionUrl, setNotionUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItemRow[]>([]);
  const [contentArticles, setContentArticles] = useState<SeoArticleRow[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);
  const [contentNotice, setContentNotice] = useState<string | null>(null);
  const [jsonDraft, setJsonDraft] = useState("");

  useEffect(() => {
    if (order) {
      setNotionUrl(order.notion_url || "");
      setNotes(order.notes || "");
      setStatus(order.status);
      setCopied(false);
      setContentError(null);
      setContentNotice(null);
    }
  }, [order, open]);

  useEffect(() => {
    if (!open || !order) return;
    let cancelled = false;
    setContentLoading(true);
    fetch(`/api/admin/order-content?orderId=${encodeURIComponent(order.id)}`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.error) {
          setContentError(json.error);
        } else {
          setContentItems(json.items || []);
          setContentArticles(json.articles || []);
        }
      })
      .catch(() => {
        if (!cancelled) setContentError("Gagal memuat konten order.");
      })
      .finally(() => {
        if (!cancelled) setContentLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, order]);

  if (!open || !order) return null;
  const o = order;

  const sla = calculateSLA(o.created_at, status, now);
  const deadline = new Date(new Date(o.created_at).getTime() + 24 * 60 * 60 * 1000);
  const deadlineStr = deadline.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const audit = readAudit(o.order_id);

  async function copyBrief() {
    const text = `Brand: ${o.brand}\nKategori: ${o.category}\nKompetitor: ${o.competitor || "-"}\nBrief: ${o.description}\nEmail: ${o.email}\nWhatsApp: ${o.phone}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function loadContent() {
    if (!order) return;
    setContentLoading(true);
    setContentError(null);
    setContentNotice(null);
    try {
      const res = await fetch(`/api/admin/order-content?orderId=${encodeURIComponent(order.id)}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setContentError(json.error || "Gagal memuat konten order.");
        return;
      }
      setContentItems(json.items || []);
      setContentArticles(json.articles || []);
    } catch {
      setContentError("Gagal memuat konten order.");
    } finally {
      setContentLoading(false);
    }
  }

  async function saveContent() {
    if (!order) return;
    setContentError(null);
    setContentNotice(null);
    let parsed: { items?: ContentItemRow[]; articles?: SeoArticleRow[] };
    try {
      parsed = JSON.parse(jsonDraft);
    } catch {
      setContentError("JSON tidak valid — cek kurung & koma.");
      return;
    }
    if (!Array.isArray(parsed.items) || !Array.isArray(parsed.articles)) {
      setContentError("Format harus { \"items\": [...], \"articles\": [...] }.");
      return;
    }
    try {
      const res = await fetch("/api/admin/order-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, items: parsed.items, articles: parsed.articles }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setContentError(json.error || "Gagal menyimpan konten.");
        return;
      }
      setContentNotice(
        `Tersimpan: ${json.insertedItems} script + ${json.insertedArticles} artikel. Customer langsung bisa lihat di portal.`
      );
      setJsonDraft("");
      await loadContent();
    } catch {
      setContentError("Gagal menyimpan konten.");
    }
  }

  return (
    <div
      className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Detail pesanan"
    >
      <div className="bg-white border-t-2 sm:border-2 border-ink rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-brutal-lg font-sans">
        <div className="p-5 border-b-2 border-ink flex justify-between items-center bg-canvas">
          <div>
            <span className="text-xs font-mono font-bold text-terracotta block">{o.order_id}</span>
            <h3 className="text-lg sm:text-xl font-serif text-ink mt-0.5">{o.brand}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-ink text-2xl font-bold px-2 py-1 min-h-[44px]"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 sm:px-6 pt-4 -mb-2">
          <div
            className={`flex items-center gap-2 p-3 border-2 border-ink rounded-xl bg-canvas font-mono text-xs font-bold ${
              sla.level === "warning" ? "bg-sunflower/25" : ""
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-terracotta pulse-dot"></span>
            <span>{sla.text}</span>
            <span className="text-stone-600 font-bold">· Deadline: {deadlineStr}</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl space-y-2 shadow-brutal-sm">
            <div className="flex justify-between font-mono text-stone-600">
              <span>Kategori Niche:</span>
              <span className="font-bold text-ink">{o.category}</span>
            </div>
            <div className="flex justify-between font-mono text-stone-600">
              <span>Kompetitor:</span>
              <span className="font-bold text-ink">{o.competitor || "-"}</span>
            </div>
            <div className="pt-2 border-t-2 border-ink">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-stone-600 font-bold">Deskripsi Brief:</span>
                <button
                  onClick={copyBrief}
                  className="px-2.5 py-1.5 border-2 border-ink rounded-xl bg-white hover:bg-wasabi text-ink font-bold transition flex items-center gap-1.5 shadow-brutal-sm min-h-[44px]"
                >
                  {copied ? <Check className="w-3 h-3 text-wasabiDark" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Tersalin!" : "Salin Brief"}
                </button>
              </div>
              <p className="text-ink font-sans leading-relaxed text-xs sm:text-sm">{o.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 border-2 border-ink rounded-2xl bg-white shadow-brutal-sm">
              <span className="text-stone-600 text-[10px] font-bold block uppercase">Email</span>
              <span className="font-bold text-ink break-all text-xs">{o.email}</span>
            </div>
            <div className="p-3 border-2 border-ink rounded-2xl bg-white shadow-brutal-sm">
              <span className="text-stone-600 text-[10px] font-bold block uppercase">WhatsApp</span>
              <span className="font-bold text-ink text-xs">{o.phone}</span>
            </div>
          </div>

          <div>
            <label className="block font-mono text-ink text-xs font-bold mb-1" htmlFor="notionUrlInput">
              Tautan Notion Workspace:
            </label>
            <div className="flex gap-2.5">
              <input
                type="url"
                id="notionUrlInput"
                placeholder="https://notion.so/..."
                value={notionUrl}
                onChange={(e) => setNotionUrl(e.target.value)}
                className="flex-1 bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-base sm:text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-terracotta transition min-h-[44px]"
              />
              <button
                onClick={() => {
                  if (notionUrl.trim()) window.open(notionUrl.trim(), "_blank");
                }}
                className="px-4 py-2.5 bg-wasabi hover:bg-wasabiDark hover:text-canvas text-ink rounded-xl text-xs font-mono font-bold transition shadow-brutal-sm min-h-[44px] whitespace-nowrap"
                title="Buka link Notion di tab baru"
              >
                <ExternalLink className="w-4 h-4 inline-block" />
              </button>
            </div>
          </div>

          <div className="p-4 border-2 border-ink rounded-2xl bg-white shadow-brutal-sm">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-ink text-xs font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-terracotta" />
                Konten 30 Hari (Portal Delivery)
              </span>
              <button
                onClick={loadContent}
                disabled={contentLoading}
                className="px-2.5 py-1.5 border-2 border-ink rounded-xl bg-canvas hover:bg-wasabi text-ink font-bold transition flex items-center gap-1.5 shadow-brutal-sm min-h-[44px] text-[10px] font-mono disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${contentLoading ? "animate-spin" : ""}`} />
                Muat Ulang
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-mono text-center mb-3">
              <div className="p-2.5 border-2 border-ink rounded-xl bg-canvas">
                <span className="block text-lg font-bold text-ink">{contentItems.length}/30</span>
                <span className="text-[10px] text-stone-600 font-bold uppercase">Script Hari</span>
              </div>
              <div className="p-2.5 border-2 border-ink rounded-xl bg-canvas">
                <span className="block text-lg font-bold text-ink">{contentArticles.length}/4</span>
                <span className="text-[10px] text-stone-600 font-bold uppercase">Artikel SEO</span>
              </div>
            </div>

            {contentItems.length > 0 && (
              <div className="mb-3 max-h-24 overflow-y-auto border-2 border-ink rounded-xl p-2.5 bg-canvas space-y-1">
                {contentItems.slice(0, 30).map((item) => (
                  <div key={item.day_number} className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="w-6 text-terracotta font-bold">D{item.day_number}</span>
                    <span className="text-ink font-bold truncate">{item.pillar}</span>
                    <span className="ml-auto text-stone-500 font-bold shrink-0">
                      {item.hook ? "hook" : ""}{item.caption ? " +caption" : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <label className="block font-mono text-ink text-xs font-bold mb-1" htmlFor="contentJsonInput">
              Import Batch JSON <span className="text-stone-500 font-normal">(replace seluruh konten)</span>
            </label>
            <textarea
              id="contentJsonInput"
              rows={4}
              placeholder={'{\n  "items": [ { "day_number": 1, "pillar": "Hook", "hook": "...", "body": "...", "cta": "...", "caption": "..." } ],\n  "articles": [ { "article_number": 1, "article_type": "Pilar", "title": "...", "description": "...", "outline": "..." } ]\n}'}
              value={jsonDraft}
              onChange={(e) => setJsonDraft(e.target.value)}
              className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-[10px] font-mono text-ink focus:outline-none focus:ring-2 focus:ring-terracotta transition"
              spellCheck={false}
            />

            {contentError && (
              <p className="mt-2 text-[10px] font-mono font-bold text-red-700 bg-red-50 border-2 border-red-300 rounded-lg px-2.5 py-1.5">
                {contentError}
              </p>
            )}
            {contentNotice && (
              <p className="mt-2 text-[10px] font-mono font-bold text-wasabiDark bg-wasabi/30 border-2 border-wasabiDark rounded-lg px-2.5 py-1.5">
                {contentNotice}
              </p>
            )}

            <button
              onClick={saveContent}
              disabled={contentLoading || !jsonDraft.trim()}
              className="mt-2.5 w-full px-4 py-2.5 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-xl text-xs font-mono font-bold transition shadow-brutal-sm min-h-[44px] disabled:opacity-40"
            >
              Simpan Konten ke Portal
            </button>
          </div>

          <div>
            <label className="block font-mono text-ink text-xs font-bold mb-1" htmlFor="internalNotesInput">
              Catatan Internal Tim:
            </label>
            <textarea
              id="internalNotesInput"
              rows={2}
              placeholder="Catatan internal..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-base sm:text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-terracotta transition"
            />
          </div>

          <div>
            <label className="block font-mono text-ink text-xs font-bold mb-1" htmlFor="modalStatusSelect">
              Perbarui Status:
            </label>
            <div className="flex gap-2.5">
              <select
                id="modalStatusSelect"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-base sm:text-xs font-mono font-bold text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
              >
                {(Object.keys(STATUS_FULL_LABELS) as (keyof typeof STATUS_FULL_LABELS)[]).map((key) => (
                  <option key={key} value={key}>
                    {STATUS_FULL_LABELS[key]}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onQuickComplete(o)}
                className="px-4 py-2.5 bg-wasabi hover:bg-wasabiDark hover:text-canvas text-ink rounded-xl text-xs font-mono font-bold transition shadow-brutal-sm min-h-[44px] whitespace-nowrap"
              >
                Tandai Selesai
              </button>
            </div>
          </div>

          <div>
            <span className="block font-mono text-ink text-xs font-bold mb-2">Riwayat Order</span>
            <div className="space-y-2">
              {audit.length === 0 ? (
                <div className="border-2 border-ink rounded-xl p-3 bg-canvas font-mono text-[10px] text-stone-600 font-bold">
                  Belum ada aktivitas tercatat.
                </div>
              ) : (
                [...audit].reverse().map((e, i) => (
                  <div key={i} className="flex items-start gap-2.5 border-2 border-ink rounded-xl p-3 bg-white shadow-brutal-sm">
                    <span className="w-2 h-2 rounded-full bg-terracotta border border-ink mt-1 shrink-0"></span>
                    <div className="min-w-0">
                      <p className="text-xs font-sans text-ink leading-snug">{e.action}</p>
                      <span className="text-[10px] font-mono font-bold text-stone-600 block mt-0.5">
                        {formatIdShort(e.ts)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t-2 border-ink bg-canvas flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={() => onSendWA(order, notionUrl)}
            className="w-full sm:w-auto px-5 py-3 bg-ink hover:bg-terracotta text-ink rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition min-h-[44px] shadow-brutal-sm"
          >
            <MessageSquare className="w-4 h-4 text-wasabi" />
            <span>Kirim Notifikasi WA</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 border-2 border-ink bg-white rounded-xl text-xs font-mono font-bold hover:bg-canvas transition min-h-[44px] shadow-brutal-sm"
            >
              Tutup
            </button>
            <button
              onClick={() => onSave(o.order_id, { status, notion_url: notionUrl.trim(), notes: notes.trim() })}
              className="w-1/2 sm:w-auto px-6 py-3 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-xl text-xs font-mono font-bold transition min-h-[44px] shadow-brutal"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}