"use client";

import { useState, useEffect } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { StatsOverview } from "@/components/console/StatsOverview";
import { KanbanBoard } from "@/components/console/KanbanBoard";
import { OrderTable } from "@/components/console/OrderTable";
import { AIStudio } from "@/components/console/AIStudio";
import { AnalyticsView } from "@/components/console/AnalyticsView";
import { DetailModal } from "@/components/console/DetailModal";
import { NewOrderModal } from "@/components/console/NewOrderModal";
import {
  RotateCcw,
  PlusCircle,
  Download,
  ExternalLink,
  LayoutGrid,
  Table,
  Sparkles,
  BarChart3,
  Plus,
} from "lucide-react";

type View = "kanban" | "table" | "analytics" | "ai";

const VIEW_TABS: { key: View; label: string; icon: React.ReactNode }[] = [
  { key: "kanban", label: "Kanban Pipeline", icon: <LayoutGrid className="w-4 h-4" /> },
  { key: "table", label: `Database Pesanan`, icon: <Table className="w-4 h-4" /> },
  { key: "ai", label: "AI Brief Engine Studio", icon: <Sparkles className="w-4 h-4" /> },
  { key: "analytics", label: "Laporan & Finansial", icon: <BarChart3 className="w-4 h-4" /> },
];

const MOB_TABS: { key: View; label: string; icon: React.ReactNode }[] = [
  { key: "kanban", label: "Kanban", icon: <LayoutGrid className="w-5 h-5" /> },
  { key: "table", label: "Database", icon: <Table className="w-5 h-5" /> },
  { key: "ai", label: "AI Studio", icon: <Sparkles className="w-5 h-5" /> },
  { key: "analytics", label: "Laporan", icon: <BarChart3 className="w-5 h-5" /> },
];

export default function ConsolePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentView, setCurrentView] = useState<View>("kanban");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    setAuthChecked(true);
    fetchOrders();

    channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  async function fetchOrders() {
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
  }

  function handleSelectOrder(order: Order) {
    setSelectedOrder(order);
    setShowDetailModal(true);
  }

  async function handleSaveOrder(
    orderId: string,
    updates: { status?: string; notion_url?: string; notes?: string }
  ) {
    await supabase
      .from("orders")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", orderId);
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
  }) {
    await supabase.from("orders").insert({
      ...newOrder,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    fetchOrders();
  }

  function handleExportCSV() {
    let csv = "Order ID,Brand,Kategori,Deskripsi,Email,WhatsApp,Status,Tanggal,Notion URL,Notes\n";
    orders.forEach((o) => {
      const row = [
        `"${o.order_id}"`,
        `"${(o.brand || "").replace(/"/g, '""')}"`,
        `"${o.category}"`,
        `"${(o.description || "").replace(/"/g, '""')}"`,
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
    a.download = `karsa_master_${orders.length}orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-sand-50 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 pb-28 md:pb-16">
      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-sand-900">Karsa</span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 bg-sand-900 text-sand-50 rounded font-semibold">Console</span>
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">{orders.length} Orders</span> Live
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-3 text-xs font-mono">
            <button
              onClick={fetchOrders}
              className="p-2 sm:px-3 sm:py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg transition flex items-center gap-1.5"
              title="Muat ulang data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reload Data</span>
            </button>
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-sand-900 text-sand-50 rounded-lg hover:bg-stone-800 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Input Manual</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="p-2 sm:px-3 sm:py-1.5 border border-sand-300 rounded-lg hover:bg-sand-200 transition bg-white"
              title="Ekspor CSV"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden md:inline ml-1">Ekspor CSV</span>
            </button>
            <a
              href="/"
              target="_blank"
              className="p-2 border border-sand-300 rounded-lg hover:bg-sand-200 transition bg-white"
              title="Buka Landing Page"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
            </a>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS (DESKTOP & TABLET) */}
      <div className="hidden md:block border-b border-sand-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 text-xs font-mono overflow-x-auto no-scrollbar">
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCurrentView(tab.key)}
              className={`py-3.5 border-b-2 flex items-center gap-2 shrink-0 transition ${
                currentView === tab.key
                  ? "border-sand-900 font-bold text-sand-900"
                  : "border-transparent text-stone-500 hover:text-sand-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* STATS OVERVIEW */}
        <StatsOverview orders={orders} />

        {/* CONTENT VIEWS */}
        {!authChecked || loading ? (
          <div className="text-center py-12">
            <p className="text-sm text-sand-700 font-mono">Memuat data...</p>
          </div>
        ) : (
          <>
            {currentView === "kanban" && (
              <KanbanBoard orders={orders} onSelectOrder={handleSelectOrder} />
            )}
            {currentView === "table" && (
              <OrderTable orders={orders} onSelectOrder={handleSelectOrder} />
            )}
            {currentView === "ai" && <AIStudio orders={orders} />}
            {currentView === "analytics" && <AnalyticsView orders={orders} />}
          </>
        )}
      </main>

      {/* SMART STICKY BOTTOM APP BAR (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sand-300 p-2 md:hidden z-40 flex items-center justify-around font-mono text-[10px]">
        {MOB_TABS.slice(0, 2).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentView(tab.key)}
            className={`flex flex-col items-center py-1 transition ${
              currentView === tab.key
                ? "text-sand-900 font-bold"
                : "text-stone-500"
            }`}
          >
            {tab.icon}
            <span className="mb-0.5">{tab.label}</span>
          </button>
        ))}
        <button
          onClick={() => setShowNewOrderModal(true)}
          className="flex flex-col items-center justify-center -mt-4 w-11 h-11 bg-sand-900 text-sand-50 rounded-full shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
        {MOB_TABS.slice(2).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentView(tab.key)}
            className={`flex flex-col items-center py-1 transition ${
              currentView === tab.key
                ? "text-sand-900 font-bold"
                : "text-stone-500"
            }`}
          >
            {tab.icon}
            <span className="mb-0.5">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* MODALS */}
      <DetailModal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />
      <NewOrderModal
        open={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        onSave={handleNewOrder}
      />
    </div>
  );
}
