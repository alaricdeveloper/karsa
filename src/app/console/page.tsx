"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  PlusCircle,
  Download,
  Settings,
  ExternalLink,
  LogOut,
  LayoutGrid,
  Table,
  Sparkles,
  BarChart3,
  Plus,
  Kanban,
  CheckCircle2,
} from "lucide-react";
import type { Order } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { StatsOverview } from "@/components/console/StatsOverview";
import { KanbanBoard } from "@/components/console/KanbanBoard";
import { OrderTable } from "@/components/console/OrderTable";
import { AIStudio } from "@/components/console/AIStudio";
import { AnalyticsView } from "@/components/console/AnalyticsView";
import { SettingsView } from "@/components/console/SettingsView";
import { DetailModal } from "@/components/console/DetailModal";
import { NewOrderModal } from "@/components/console/NewOrderModal";
import {
  appendAudit,
  applyWaTemplate,
  DB_VERSION_KEY,
  DEFAULT_TONE_KEY,
  DEFAULT_WA_TEMPLATE,
  getFilteredOrders,
  LAST_SYNC_KEY,
  PROMPT_HISTORY_KEY,
  WA_TEMPLATE_KEY,
  type DateFilter,
} from "@/components/console/console-lib";

type View = "pipeline" | "database" | "studio" | "laporan" | "pengaturan";

const VIEW_TABS: { key: View; label: string; icon: React.ReactNode; num: string; numClass: string }[] = [
  { key: "pipeline", label: "Pipeline Operasional", icon: <LayoutGrid className="w-4 h-4" />, num: "01", numClass: "bg-terracotta text-white" },
  { key: "database", label: "Database Pesanan", icon: <Table className="w-4 h-4" />, num: "02", numClass: "bg-sunflower text-ink" },
  { key: "studio", label: "Prompt Studio", icon: <Sparkles className="w-4 h-4" />, num: "03", numClass: "bg-wasabi text-ink" },
  { key: "laporan", label: "Laporan 30 Hari", icon: <BarChart3 className="w-4 h-4" />, num: "04", numClass: "bg-terracottaLight text-terracotta" },
  { key: "pengaturan", label: "Pengaturan", icon: <Settings className="w-4 h-4" />, num: "05", numClass: "bg-ink text-canvas" },
];

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export default function ConsolePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<View>("pipeline");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [waTemplate, setWaTemplate] = useState(DEFAULT_WA_TEMPLATE);
  const [defaultTone, setDefaultTone] = useState("Casual Authentic (Storytelling)");
  const [lastSync, setLastSync] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const supabase = createClient();
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setWaTemplate(localStorage.getItem(WA_TEMPLATE_KEY) || DEFAULT_WA_TEMPLATE);
    setDefaultTone(localStorage.getItem(DEFAULT_TONE_KEY) || "Casual Authentic (Storytelling)");
    setLastSync(localStorage.getItem(LAST_SYNC_KEY) || "");
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data as Order[]);
      }
    } catch (err) {
      console.error("fetchOrders failed:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function handleSelectOrder(order: Order) {
    setSelectedOrder(order);
    setDetailOpen(true);
  }

  async function handleSaveOrder(
    orderId: string,
    updates: { status?: string; notion_url?: string; notes?: string }
  ) {
    if (!selectedOrder) return;
    const oldStatus = selectedOrder.status;
    const changes: string[] = [];
    if (updates.status && oldStatus !== updates.status) {
      changes.push(`Status: ${oldStatus} → ${updates.status}`);
    }
    if (updates.notion_url) changes.push("Notion link diperbarui");
    if (updates.notes) changes.push("Catatan internal diperbarui");
    appendAudit(orderId, changes.join(" · ") || "Perubahan disimpan");

    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedOrder.id, ...updates }),
    });
    setDetailOpen(false);
    setSelectedOrder(null);
    fetchOrders();
    showToast("Perubahan pesanan disimpan");
  }

  async function handleQuickAdvance(order: Order, target: string) {
    appendAudit(order.order_id, `Status diubah → ${target} (aksi cepat)`);
    await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id, status: target }),
    });
    fetchOrders();
  }

  async function handleNewOrder(newOrder: {
    order_id: string;
    brand: string;
    category: string;
    competitor: string | null;
    description: string;
    email: string;
    phone: string;
    status: string;
    notion_url: string | null;
    notes: string | null;
  }) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });
    if (res.ok) {
      appendAudit(newOrder.order_id, "Order dibuat via input manual");
      setNewOrderOpen(false);
      fetchOrders();
      showToast(`Order ${newOrder.order_id} berhasil dibuat`);
    } else {
      showToast("Gagal membuat order");
    }
  }

  function handleQuickComplete(order: Order) {
    appendAudit(order.order_id, "Status diubah → COMPLETED (tandai selesai)");
    fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order.id, status: "COMPLETED" }),
    }).then(() => {
      setDetailOpen(false);
      setSelectedOrder(null);
      fetchOrders();
    });
  }

  function handleSendWA(order: Order, notionUrl: string) {
    const phone = order.phone.replace(/[^0-9]/g, "");
    let formattedPhone = phone;
    if (formattedPhone.startsWith("0")) formattedPhone = "62" + formattedPhone.slice(1);

    const message = applyWaTemplate(waTemplate, {
      brand: order.brand,
      orderId: order.order_id,
      notionUrl,
    });

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
    appendAudit(order.order_id, "Notifikasi WA delivery dikirim");
  }

  function handleExportCSV() {
    const filtered = getFilteredOrders(orders, search, statusFilter, dateFilter, now);
    let csv = "Order ID,Brand,Kategori,Deskripsi,Email,WhatsApp,Status,Tanggal,Notion URL,Notes\n";
    filtered.forEach((o) => {
      const row = [
        `"${o.order_id}"`,
        `"${o.brand.replace(/"/g, '""')}"`,
        `"${o.category}"`,
        `"${o.description.replace(/"/g, '""')}"`,
        `"${o.email}"`,
        `"${o.phone}"`,
        `"${o.status}"`,
        `"${o.created_at}"`,
        `"${o.notion_url || ""}"`,
        `"${(o.notes || "").replace(/"/g, '""')}"`,
      ];
      csv += row.join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `karsa_master_${filtered.length}orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`CSV diekspor (${filtered.length} pesanan)`);
  }

  async function handleSyncDemo() {
    try {
      const res = await fetch("/api/admin/seed?token=karsa-setup-2024");
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(DB_VERSION_KEY, "v8_konso_orkestrasi");
        const nowIso = new Date().toISOString();
        localStorage.setItem(LAST_SYNC_KEY, nowIso);
        setLastSync(nowIso);
        fetchOrders();
        showToast("34 data demo berhasil disinkronkan");
      } else {
        showToast("Sinkronisasi gagal: " + (data.error || "unknown"));
      }
    } catch {
      showToast("Sinkronisasi gagal — cek koneksi");
    }
  }

  function handleResetDemo() {
    if (!window.confirm("Hapus semua data dan kembalikan ke 34 seed demo? Tindakan ini tidak bisa dibatalkan.")) return;
    handleSyncDemo();
  }

  function handleExportBackup() {
    const auditPayload: Record<string, unknown> = {};
    orders.forEach((o) => {
      const a = localStorage.getItem(`omni_audit_${o.order_id}`);
      if (a) auditPayload[o.order_id] = JSON.parse(a);
    });
    const payload = {
      app: "karsa-admin-console",
      version: "v8_konso_orkestrasi",
      exportedAt: new Date().toISOString(),
      orders: orders.map((o) => ({
        order_id: o.order_id,
        brand: o.brand,
        category: o.category,
        competitor: o.competitor,
        description: o.description,
        email: o.email,
        phone: o.phone,
        status: o.status,
        notion_url: o.notion_url,
        notes: o.notes,
        created_at: o.created_at,
      })),
      waTemplate: waTemplate,
      defaultTone: defaultTone,
      promptHistory: readLS(PROMPT_HISTORY_KEY, []),
      audit: auditPayload,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `karsa_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup berhasil diunduh");
  }

  async function handleImportBackup(file: File) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.orders)) throw new Error("format");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: data.orders }),
      });
      if (!res.ok) throw new Error("api");

      if (typeof data.waTemplate === "string" && data.waTemplate) {
        localStorage.setItem(WA_TEMPLATE_KEY, data.waTemplate);
        setWaTemplate(data.waTemplate);
      }
      if (typeof data.defaultTone === "string" && data.defaultTone) {
        localStorage.setItem(DEFAULT_TONE_KEY, data.defaultTone);
        setDefaultTone(data.defaultTone);
      }
      if (Array.isArray(data.promptHistory)) {
        localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(data.promptHistory));
      }
      if (data.audit && typeof data.audit === "object") {
        Object.entries(data.audit as Record<string, unknown>).forEach(([id, arr]) => {
          localStorage.setItem(`omni_audit_${id}`, JSON.stringify(arr));
        });
      }
      localStorage.setItem(DB_VERSION_KEY, data.version || "v8_konso_orkestrasi");
      localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
      fetchOrders();
      showToast(`Backup direstore: ${data.orders.length} pesanan`);
    } catch {
      showToast("File backup tidak valid");
    }
  }

  function handleLogout() {
    supabase.auth.signOut().then(() => {
      window.location.href = "/login";
    });
  }

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink pb-28 md:pb-10 overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-wasabi focus:text-ink focus:px-4 focus:py-2 focus:rounded-xl focus:border-2 focus:border-ink font-mono text-xs font-bold"
      >
        Lompat ke konten utama
      </a>

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <a href="/" className="flex items-center space-x-2 shrink-0 group">
              <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">
                Karsa
              </span>
              <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-ink text-canvas rounded font-bold">
                Konsol Admin
              </span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-ink bg-wasabi px-2.5 py-1 rounded-xl border-2 border-ink font-bold shadow-brutal-sm">
              <span className="w-2 h-2 rounded-full bg-ink pulse-dot"></span>
              <span>{orders.length} Batch Live</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono">
            <button
              onClick={handleSyncDemo}
              className="p-2 sm:px-3.5 sm:py-2 bg-sunflower hover:bg-wasabi text-ink border-2 border-ink rounded-xl transition flex items-center gap-1.5 font-bold shadow-brutal-sm min-h-[44px]"
              title="Sinkronkan ulang 34 data demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sinkron Data</span>
            </button>
            <button
              onClick={() => setNewOrderOpen(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-terracotta text-white rounded-xl hover:bg-ink transition font-bold shadow-brutal-sm min-h-[44px]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-wasabi" />
              <span className="hidden sm:inline">Input Manual</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="p-2 sm:px-3.5 sm:py-2 border-2 border-ink rounded-xl hover:bg-white transition bg-canvas font-bold shadow-brutal-sm min-h-[44px]"
              title="Ekspor CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline ml-1">Ekspor CSV</span>
            </button>
            <button
              onClick={() => setView("pengaturan")}
              className="p-2 sm:px-3.5 sm:py-2 border-2 border-ink rounded-xl hover:bg-white transition bg-canvas font-bold shadow-brutal-sm min-h-[44px]"
              title="Pengaturan konsol"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden md:inline ml-1">Pengaturan</span>
            </button>
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex p-2 sm:p-2.5 border-2 border-ink rounded-xl hover:bg-white transition bg-canvas shadow-brutal-sm min-h-[44px] items-center justify-center"
              title="Buka Landing Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3.5 sm:py-2 border-2 border-ink rounded-xl hover:bg-red-50 transition bg-canvas font-bold shadow-brutal-sm min-h-[44px] text-red-600"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline ml-1">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* PLATE LEVERS (DESKTOP) */}
      <nav
        className="hidden md:block border-b-2 border-ink bg-surface sticky top-20 z-30"
        aria-label="Plat konsol"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch space-x-4 text-xs font-mono font-bold overflow-x-auto no-scrollbar">
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`plate-lever py-3.5 flex items-center gap-2 shrink-0 ${view === tab.key ? "active" : "text-stone-500"}`}
            >
              <span className={`${tab.numClass} px-1.5 py-0.5 rounded-md text-[10px]`}>{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN VIEWPORT */}
      <main id="main-content" className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
        <StatsOverview orders={orders} />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm text-stone-600 font-mono font-bold">Memuat data...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="plate-pop rounded-3xl p-12 text-center font-mono text-xs text-stone-600 space-y-4">
            <CheckCircle2 className="w-8 h-8 mx-auto text-stone-400" />
            <p>Belum ada data pesanan. Sinkronkan 34 data demo untuk mengisi konsol.</p>
            <button
              onClick={handleSyncDemo}
              className="inline-flex items-center gap-2 px-5 py-3 bg-sunflower hover:bg-wasabi text-ink border-2 border-ink rounded-xl font-bold transition shadow-brutal-sm min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" /> Sinkronkan 34 Data Demo
            </button>
          </div>
        ) : (
          <>
            {view === "pipeline" && (
              <KanbanBoard orders={orders} onSelectOrder={handleSelectOrder} onQuickAdvance={handleQuickAdvance} now={now} />
            )}
            {view === "database" && (
              <OrderTable
                orders={orders}
                onSelectOrder={handleSelectOrder}
                now={now}
                search={search}
                onSearch={setSearch}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
                dateFilter={dateFilter}
                onDateFilter={setDateFilter}
              />
            )}
            {view === "studio" && <AIStudio orders={orders} defaultTone={defaultTone} onToneChange={setDefaultTone} />}
            {view === "laporan" && <AnalyticsView orders={orders} now={now} />}
            {view === "pengaturan" && (
              <SettingsView
                orders={orders}
                waTemplate={waTemplate}
                onWaTemplate={setWaTemplate}
                onResetWaTemplate={() => {
                  localStorage.removeItem(WA_TEMPLATE_KEY);
                  setWaTemplate(DEFAULT_WA_TEMPLATE);
                  showToast("Template kembali ke default");
                }}
                defaultTone={defaultTone}
                onDefaultTone={(v) => {
                  localStorage.setItem(DEFAULT_TONE_KEY, v);
                  setDefaultTone(v);
                }}
                lastSync={lastSync}
                onSyncDemo={handleSyncDemo}
                onResetDemo={handleResetDemo}
                onExportBackup={handleExportBackup}
                onImportBackup={handleImportBackup}
              />
            )}
          </>
        )}
      </main>

      {/* SMART STICKY BOTTOM CONSOLE (MOBILE) */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-canvas/95 backdrop-blur-md border-t-2 border-ink p-2 md:hidden z-40 flex items-center justify-around font-mono text-[10px] font-bold"
        aria-label="Plat konsol mobile"
      >
        {[
          { key: "pipeline" as View, label: "Pipeline", icon: <Kanban className="w-5 h-5 mb-0.5" /> },
          { key: "database" as View, label: "Database", icon: <Table className="w-5 h-5 mb-0.5" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`flex flex-col items-center py-1 ${view === tab.key ? "text-terracotta" : "text-stone-500"}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          onClick={() => setNewOrderOpen(true)}
          className="flex flex-col items-center justify-center -mt-4 w-12 h-12 bg-terracotta text-white rounded-full shadow-brutal border-2 border-ink"
          aria-label="Input manual brief"
        >
          <Plus className="w-6 h-6 text-wasabi" />
        </button>
        {[
          { key: "studio" as View, label: "Studio", icon: <Sparkles className="w-5 h-5 mb-0.5" /> },
          { key: "laporan" as View, label: "Laporan", icon: <BarChart3 className="w-5 h-5 mb-0.5" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`flex flex-col items-center py-1 ${view === tab.key ? "text-terracotta" : "text-stone-500"}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 plate-pop rounded-xl px-4 py-2.5 font-mono text-xs font-bold text-ink">
          {toast}
        </div>
      )}

      <DetailModal
        open={detailOpen}
        order={selectedOrder}
        onClose={() => setDetailOpen(false)}
        onSave={handleSaveOrder}
        onQuickComplete={handleQuickComplete}
        onSendWA={handleSendWA}
        now={now}
      />
      <NewOrderModal open={newOrderOpen} onClose={() => setNewOrderOpen(false)} onSave={handleNewOrder} />
    </div>
  );
}