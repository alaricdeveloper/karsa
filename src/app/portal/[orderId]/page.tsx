"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Order, ContentItem, SeoArticle } from "@/lib/types";
import { ReadoutPlate } from "@/components/portal/ReadoutPlate";
import { NotionCallout } from "@/components/portal/NotionCallout";
import { CalendarGrid } from "@/components/portal/CalendarGrid";
import { ScriptStudio } from "@/components/portal/ScriptStudio";
import { SeoArticles } from "@/components/portal/SeoArticles";
import { AuditView } from "@/components/portal/AuditView";
import { RevisionForm } from "@/components/portal/RevisionForm";
import { ChecklistView } from "@/components/portal/ChecklistView";
import { Teleprompter } from "@/components/portal/Teleprompter";
import { Download, MessageSquare, Calendar, FileText, Search, Compass, Edit3, ClipboardCheck, Lock } from "lucide-react";
import { readRevisions, readChecklist, buildMasterExport, downloadText, type RevisionEntry } from "@/components/portal/hub-lib";

type Tab = "kalender" | "studio" | "seo" | "audit" | "revisi" | "checklist";

const TABS: { key: Tab; label: string; short: string; num: string; icon: React.ElementType }[] = [
  { key: "kalender", label: "Kalender 30 Hari", short: "Kalender", num: "01", icon: Calendar },
  { key: "studio", label: "Studio Naskah", short: "Studio", num: "02", icon: FileText },
  { key: "seo", label: "Artikel SEO", short: "SEO", num: "03", icon: Search },
  { key: "audit", label: "Audit Kompetitor", short: "Audit", num: "04", icon: Compass },
  { key: "revisi", label: "Portal Revisi", short: "Revisi", num: "05", icon: Edit3 },
  { key: "checklist", label: "Checklist", short: "Checklist", num: "06", icon: ClipboardCheck },
];

const RAIL_COLORS: Record<string, string> = {
  "01": "bg-sunflower text-ink",
  "02": "bg-terracotta text-ink",
  "03": "bg-wasabi text-ink",
  "04": "bg-terracottaLight text-terracotta",
  "05": "bg-ink text-canvas",
  "06": "bg-sunflower text-ink",
};

export default function PortalPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [seoArticles, setSeoArticles] = useState<SeoArticle[]>([]);
  const [clientOrders, setClientOrders] = useState<Order[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("kalender");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [revisions, setRevisions] = useState<RevisionEntry[]>([]);
  const [tpOpen, setTpOpen] = useState(false);

  const persistChecklist = useCallback(
    (next: Record<string, boolean>) => {
      setChecklist(next);
      try {
        localStorage.setItem(`omni_deliv_${orderId}`, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [orderId]
  );

  const persistRevisions = useCallback(
    (next: RevisionEntry[]) => {
      setRevisions(next);
      try {
        localStorage.setItem(`omni_revision_${orderId}`, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [orderId]
  );

  async function loadOrder(targetId: string): Promise<boolean> {
    const supabase = createClient();
    if (!supabase) {
      setError("Konfigurasi autentikasi tidak tersedia.");
      return false;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?redirect=/portal/" + targetId);
      return false;
    }

    try {
      const res = await fetch(`/api/portal/${targetId}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "Order tidak ditemukan.");
        return false;
      }

      const orderEmail = (json.order as Order).email;
      if (orderEmail !== user.email) {
        setError("Anda tidak memiliki akses ke portal ini.");
        return false;
      }

      setOrder(json.order as Order);
      setContentItems((json.contentItems || []) as ContentItem[]);
      setSeoArticles((json.seoArticles || []) as SeoArticle[]);
      setChecklist(readChecklist(targetId));
      setRevisions(readRevisions(targetId));
      setSelectedDay(1);
      setActiveTab("kalender");
      return true;
    } catch {
      setError("Gagal memuat data portal.");
      return false;
    }
  }

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setOrder(null);

      const supabase = createClient();
      if (!supabase) {
        setError("Konfigurasi autentikasi tidak tersedia.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/portal/" + orderId);
        return;
      }

      try {
        const [ordersRes] = await Promise.all([
          fetch(`/api/orders?email=${encodeURIComponent(user.email || "")}`),
        ]);
        const ordersJson = await ordersRes.json();
        if (!cancelled && Array.isArray(ordersJson)) setClientOrders(ordersJson);
      } catch {
        /* selector is optional */
      }

      const ok = await loadOrder(orderId);
      if (!cancelled) setLoading(false);
      if (!ok) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [orderId, router]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const switchOrder = async (nextId: string) => {
    if (!nextId || nextId === orderId) return;
    setLoading(true);
    setError(null);
    const ok = await loadOrder(nextId);
    setLoading(false);
    if (ok) router.replace(`/portal/${nextId}`, { scroll: false });
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCheck = (key: string) => {
    persistChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const resetChecklist = () => {
    if (!window.confirm("Reset semua centang checklist deliverable?")) return;
    persistChecklist({});
  };

  const addRevision = (entry: RevisionEntry) => {
    persistRevisions([entry, ...revisions]);
  };

  const openDay = (day: number) => {
    setSelectedDay(day);
    switchTab("studio");
  };

  const handleExportMaster = () => {
    if (!order) return;
    downloadText(`karsa_${order.order_id}_30days.txt`, buildMasterExport(order, contentItems, seoArticles));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="text-sm text-ink font-mono font-bold">Memuat portal...</p>
      </div>
    );
  }

  if (error || !order) {
    const isAccessDenied = error === "Anda tidak memiliki akses ke portal ini.";
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          {isAccessDenied && (
            <div className="w-14 h-14 rounded-2xl bg-terracottaLight border-2 border-ink flex items-center justify-center mx-auto shadow-brutal-sm">
              <Lock className="w-7 h-7 text-terracotta" />
            </div>
          )}
          <div className="space-y-1">
            <p className="text-sm text-terracotta font-semibold">{error || "Order tidak ditemukan"}</p>
            {isAccessDenied && <p className="text-xs text-inkMuted font-mono">Portal ini hanya bisa diakses oleh pemilik pesanan.</p>}
          </div>
          <div className="flex items-center justify-center gap-3">
            <a href="/dashboard" className="px-4 py-2 bg-ink text-canvas text-xs font-mono rounded-xl hover:bg-terracotta transition shadow-brutal-sm min-h-[44px] flex items-center">
              ke Dashboard
            </a>
            <a href="/" className="text-xs text-inkMuted hover:text-ink transition font-mono font-bold min-h-[44px] flex items-center">
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = contentItems.find((c) => c.day_number === selectedDay);

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink pb-32 md:pb-16 overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 whitespace-nowrap">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
              <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-sunflower text-ink rounded font-bold">Client Hub</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono min-w-0">
            <select
              value={order.order_id}
              onChange={(e) => switchOrder(e.target.value)}
              aria-label="Pilih pesanan batch"
              className="bg-white border-2 border-ink rounded-xl px-3 py-2 text-xs text-ink font-bold focus:outline-none focus:ring-2 focus:ring-terracotta shadow-brutal-sm min-h-[44px] max-w-[38vw] xs:max-w-[42vw] sm:max-w-[220px] lg:max-w-[280px] xl:max-w-none truncate"
            >
              {clientOrders.length > 0 ? (
                clientOrders.map((o) => (
                  <option key={o.order_id} value={o.order_id}>
                    {o.brand} ({o.order_id})
                  </option>
                ))
              ) : (
                <option value={order.order_id}>
                  {order.brand} ({order.order_id})
                </option>
              )}
            </select>
            <button
              onClick={handleExportMaster}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 border-2 border-ink rounded-xl hover:bg-canvas transition bg-white text-ink font-bold shadow-brutal-sm min-h-[44px]"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Unduh .TXT</span>
            </button>
            <a
              href="https://wa.me/6281288009920"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-terracotta text-white rounded-xl hover:bg-ink transition font-bold shadow-brutal-sm min-h-[44px]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-wasabi" />
              <span className="hidden sm:inline">Support 48 Jam</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
        <ReadoutPlate order={order} now={now} />
        <NotionCallout order={order} />

        <nav
          className="sticky top-16 sm:top-20 z-30 bg-canvas/95 backdrop-blur-md border-b-2 border-ink hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap"
          aria-label="Navigasi section deliverable"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                className={`flex items-center gap-2 py-3.5 border-b-2 shrink-0 font-mono text-xs font-bold transition ${
                  isActive ? "border-terracotta text-ink" : "border-transparent text-inkMuted hover:text-ink"
                }`}
              >
                <span className={`w-6 h-6 rounded-lg border-2 border-ink flex items-center justify-center text-[10px] font-bold shadow-brutal-sm ${RAIL_COLORS[tab.num]}`}>
                  {tab.num}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {activeTab === "kalender" && (
          <CalendarGrid
            contentItems={contentItems}
            selectedDay={selectedDay}
            checklist={checklist}
            onOpenDay={openDay}
          />
        )}

        {activeTab === "studio" && (
          <ScriptStudio
            order={order}
            contentItems={contentItems}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            onOpenTeleprompter={() => setTpOpen(true)}
          />
        )}

        {activeTab === "seo" && <SeoArticles articles={seoArticles} />}

        {activeTab === "audit" && <AuditView order={order} />}

        {activeTab === "revisi" && (
          <RevisionForm orderId={order.order_id} brand={order.brand} revisions={revisions} onAddRevision={addRevision} />
        )}

        {activeTab === "checklist" && (
          <ChecklistView
            order={order}
            contentItems={contentItems}
            seoArticles={seoArticles}
            checklist={checklist}
            onToggle={toggleCheck}
            onReset={resetChecklist}
            onOpenDay={openDay}
            onOpenView={(view) => {
              if (view === "seo") switchTab("seo");
              else if (view === "audit") switchTab("audit");
              else if (view === "teleprompter") setTpOpen(true);
            }}
          />
        )}

        <footer className="pt-2 pb-4 text-center font-mono text-[10px] sm:text-xs text-inkMuted font-bold">
          <p>Karsa Studio &bull; konten siap rekam dalam 24 jam &bull; garansi kalibrasi 48 jam</p>
          <a href="https://wa.me/6281288009920" target="_blank" rel="noopener" className="text-terracotta hover:underline underline-offset-4 inline-block mt-1">
            Butuh bantuan? Chat tim Karsa &rarr;
          </a>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-canvas/95 backdrop-blur-md border-t-2 border-ink p-2 md:hidden z-40 flex items-center justify-around font-mono text-[10px] font-bold">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key)}
              className={`flex flex-col items-center py-1 min-h-[44px] justify-center ${isActive ? "text-terracotta" : "text-inkMuted"}`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.short}</span>
            </button>
          );
        })}
      </div>

      <Teleprompter open={tpOpen} item={currentItem ?? null} day={selectedDay} onClose={() => setTpOpen(false)} />
    </div>
  );
}