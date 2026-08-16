"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { Order, ContentItem, SeoArticle } from "@/lib/types";
import { StatusHero } from "@/components/portal/StatusHero";
import { NotionCallout } from "@/components/portal/NotionCallout";
import { CalendarGrid } from "@/components/portal/CalendarGrid";
import { ScriptStudio } from "@/components/portal/ScriptStudio";
import { SeoArticles } from "@/components/portal/SeoArticles";
import { CompetitorRadar } from "@/components/portal/CompetitorRadar";
import { RevisionForm } from "@/components/portal/RevisionForm";
import { Calendar, FileText, Search, Compass, Edit3, Download, MessageSquare, Play, Pause, ArrowUpRight } from "lucide-react";

type Tab = "calendar" | "dayview" | "seo" | "radar" | "revision";

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "calendar", label: "Kalender Konten 30 Hari", icon: Calendar },
  { key: "dayview", label: "Studio Detail Naskah", icon: FileText },
  { key: "seo", label: "4 Artikel SEO Website", icon: Search },
  { key: "radar", label: "Audit Kompetitor", icon: Compass },
  { key: "revision", label: "Portal Kalibrasi / Revisi", icon: Edit3 },
];

const MOB_TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "calendar", label: "Kalender", icon: Calendar },
  { key: "dayview", label: "Naskah", icon: FileText },
  { key: "seo", label: "SEO", icon: Search },
  { key: "revision", label: "Revisi", icon: Edit3 },
];

export default function PortalPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [seoArticles, setSeoArticles] = useState<SeoArticle[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("calendar");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Teleprompter state
  const [tpOpen, setTpOpen] = useState(false);
  const [tpPlaying, setTpPlaying] = useState(false);
  const [tpSpeed, setTpSpeed] = useState(2);
  const tpCanvasRef = useRef<HTMLDivElement>(null);
  const tpIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (orderId) fetchData();
  }, [orderId]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portal/${orderId}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "Order tidak ditemukan.");
        setLoading(false);
        return;
      }
      setOrder(json.order as Order);
      setContentItems((json.contentItems || []) as ContentItem[]);
      setSeoArticles((json.seoArticles || []) as SeoArticle[]);
    } catch {
      setError("Gagal memuat data portal.");
    }
    setLoading(false);
  }

  // Teleprompter controls
  useEffect(() => {
    if (tpPlaying && tpOpen && tpCanvasRef.current) {
      tpIntervalRef.current = setInterval(() => {
        const canvas = tpCanvasRef.current;
        if (canvas) {
          canvas.scrollTop += tpSpeed;
        }
      }, 30);
    }
    return () => {
      if (tpIntervalRef.current) clearInterval(tpIntervalRef.current);
    };
  }, [tpPlaying, tpOpen, tpSpeed]);

  const openTeleprompter = () => {
    setTpOpen(true);
    setTpPlaying(true);
  };

  const closeTeleprompter = () => {
    setTpPlaying(false);
    if (tpIntervalRef.current) clearInterval(tpIntervalRef.current);
    setTpOpen(false);
  };

  const handleExportTxt = () => {
    if (!order) return;
    const lines: string[] = [
      `MASTER KALENDER KONTEN 30 HARI — ${order.brand}`,
      `Order ID: ${order.order_id} | Kategori: ${order.category}`,
      "=".repeat(50),
      "",
    ];
    for (const item of contentItems) {
      lines.push(`--- HARI ke-${item.day_number} (${item.pillar}) ---`);
      lines.push(`Hook: ${item.hook}`);
      lines.push(`Body: ${item.body}`);
      lines.push(`CTA: ${item.cta}`);
      lines.push(`Caption: ${item.caption}`);
      lines.push("");
    }
    lines.push("=".repeat(50));
    lines.push("Dibuat oleh Karsa Studio — karsa.my.id");
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `karsa_${order.order_id}_30days.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="text-sm text-sand-700 font-mono">Memuat portal...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm text-rose-600 font-semibold">{error || "Order tidak ditemukan"}</p>
          <a href="/" className="text-xs text-indigo-700 hover:underline">← Kembali ke Beranda</a>
        </div>
      </div>
    );
  }

  const currentItem = contentItems.find((c) => c.day_number === selectedDay);

  return (
    <div className="min-h-screen bg-sand-50 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 pb-28 md:pb-16">
      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <a href="/" className="font-serif text-xl sm:text-2xl tracking-tight text-sand-900">Karsa</a>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">Client Hub</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="bg-white border border-sand-300 rounded-lg px-2.5 py-1.5 text-xs text-sand-900 font-mono hidden sm:inline-block">
              {order.brand} ({order.order_id})
            </span>
            <button
              onClick={handleExportTxt}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-sand-300 rounded-lg hover:bg-sand-200 transition bg-white text-stone-700"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Unduh .TXT</span>
            </button>
            <a
              href="https://wa.me/6281288009920"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-sand-900 text-sand-50 rounded-lg hover:bg-stone-800 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Support 48 Jam</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">
        {/* STATUS HERO */}
        <StatusHero order={order} />

        {/* NOTION CALLOUT */}
        <NotionCallout order={order} />

        {/* DESKTOP TAB NAVIGATION */}
        <div className="hidden md:flex border-b border-sand-200 space-x-6 text-xs font-mono overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                className={`py-3.5 border-b-2 font-bold flex items-center gap-1.5 shrink-0 transition ${
                  isActive
                    ? "border-sand-900 text-sand-900"
                    : "border-transparent text-stone-500 hover:text-sand-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB: CALENDAR */}
        {activeTab === "calendar" && (
          <CalendarGrid
            contentItems={contentItems}
            selectedDay={selectedDay}
            onSelectDay={(day) => {
              setSelectedDay(day);
              switchTab("dayview");
            }}
            brand={order.brand}
          />
        )}

        {/* TAB: SCRIPT STUDIO */}
        {activeTab === "dayview" && (
          <ScriptStudio
            contentItems={contentItems}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            onOpenTeleprompter={openTeleprompter}
            brand={order.brand}
          />
        )}

        {/* TAB: SEO */}
        {activeTab === "seo" && <SeoArticles articles={seoArticles} />}

        {/* TAB: RADAR */}
        {activeTab === "radar" && <CompetitorRadar order={order} />}

        {/* TAB: REVISION */}
        {activeTab === "revision" && (
          <RevisionForm orderId={order.order_id} brand={order.brand} />
        )}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sand-300 p-2 md:hidden z-40 flex items-center justify-around font-mono text-[10px]">
        {MOB_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key)}
              className={`flex flex-col items-center py-1 transition ${
                isActive ? "text-sand-900 font-bold" : "text-stone-500"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
        {/* Center FAB - Teleprompter */}
        <button
          onClick={openTeleprompter}
          className="flex flex-col items-center justify-center -mt-4 w-11 h-11 bg-sand-900 text-sand-50 rounded-full shadow-lg"
        >
          <Play className="w-5 h-5 ml-0.5 text-emerald-400" />
        </button>
      </div>

      {/* FULLSCREEN TELEPROMPTER */}
      {tpOpen && (
        <div className="fixed inset-0 bg-black text-white z-50 flex flex-col font-sans select-none">
          {/* Top Bar */}
          <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTpPlaying(!tpPlaying)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1.5"
              >
                {tpPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {tpPlaying ? "Pause" : "Play"}
              </button>
              <div className="flex items-center gap-1">
                <span>Speed:</span>
                <button
                  onClick={() => setTpSpeed(Math.max(1, tpSpeed - 1))}
                  className="w-7 h-7 bg-stone-800 rounded font-bold"
                >
                  -
                </button>
                <span className="px-2 font-bold">{tpSpeed}x</span>
                <button
                  onClick={() => setTpSpeed(Math.min(8, tpSpeed + 1))}
                  className="w-7 h-7 bg-stone-800 rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={closeTeleprompter}
              className="px-3 py-2 bg-stone-800 rounded-lg text-stone-400 hover:text-white"
            >
              Tutup &times;
            </button>
          </div>
          {/* Scrolling Canvas */}
          <div
            ref={tpCanvasRef}
            className="flex-1 overflow-y-auto p-6 sm:p-12 text-center text-2xl sm:text-4xl font-bold leading-relaxed space-y-8 max-w-3xl mx-auto"
          >
            {currentItem && (
              <div className="py-20 text-stone-200">
                <div className="text-amber-400 text-sm mb-4 font-mono">[HOOK 00:00 - 00:03]</div>
                <p className="mb-10">{currentItem.hook}</p>
                <div className="text-stone-400 text-sm mb-4 font-mono">[BODY 00:03 - 00:18]</div>
                <p className="mb-10">{currentItem.body}</p>
                <div className="text-emerald-400 text-sm mb-4 font-mono">[CTA 00:18 - 00:25]</div>
                <p>{currentItem.cta}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
