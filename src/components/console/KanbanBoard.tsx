"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCheck, X } from "lucide-react";
import type { Order } from "@/lib/types";
import {
  calculateSLA,
  formatRp,
  isSlaCritical,
  isSlaOverdue,
  ORDER_VALUE,
} from "./console-lib";

type ColumnKey = "PENDING_PAYMENT" | "IN_PROGRESS" | "QC_REVIEW" | "COMPLETED";
type MobileFilter = "ALL" | ColumnKey;

const COLUMNS: {
  key: ColumnKey;
  label: string;
  dot: string;
  headerText: string;
  badge: string;
}[] = [
  { key: "PENDING_PAYMENT", label: "Pending Invoice", dot: "bg-sunflower", headerText: "text-ink", badge: "bg-sunflower" },
  { key: "IN_PROGRESS", label: "Penyusunan Konten", dot: "bg-terracotta", headerText: "text-terracotta", badge: "bg-terracottaLight text-terracotta" },
  { key: "QC_REVIEW", label: "Kurasi & QC Final", dot: "bg-ink", headerText: "text-ink", badge: "bg-ink text-canvas" },
  { key: "COMPLETED", label: "Terkirim (Done)", dot: "bg-wasabiDark", headerText: "text-wasabiDark", badge: "bg-wasabi" },
];

const MOBILE_PILLS: { key: MobileFilter; label: string }[] = [
  { key: "ALL", label: "Semua" },
  { key: "PENDING_PAYMENT", label: "Pending" },
  { key: "IN_PROGRESS", label: "Proses" },
  { key: "QC_REVIEW", label: "QC" },
  { key: "COMPLETED", label: "Selesai" },
];

export function KanbanBoard({
  orders,
  onSelectOrder,
  onQuickAdvance,
  now,
}: {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onQuickAdvance: (order: Order, target: string) => void;
  now: number;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mobileFilter, setMobileFilter] = useState<MobileFilter>("ALL");

  const buckets = useMemo(() => {
    const b: Record<ColumnKey, Order[]> = {
      PENDING_PAYMENT: [],
      IN_PROGRESS: [],
      QC_REVIEW: [],
      COMPLETED: [],
    };
    orders.forEach((o) => {
      const key = (o.status || "IN_PROGRESS") as ColumnKey;
      if (b[key]) b[key].push(o);
    });
    return b;
  }, [orders]);

  const criticalCount = orders.filter((o) => isSlaCritical(o, now)).length;
  const overdueCount = orders.filter((o) => isSlaOverdue(o, now)).length;
  const pendingCount = orders.filter((o) => o.status === "PENDING_PAYMENT").length;

  function toggleSelect(orderId: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(orderId);
      else next.delete(orderId);
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  const selectedStatuses = [...selected]
    .map((id) => orders.find((o) => o.order_id === id)?.status || "")
    .filter(Boolean);

  function bulkAdvance(target: string) {
    [...selected].forEach((id) => {
      const o = orders.find((x) => x.order_id === id);
      if (o && o.status !== "COMPLETED" && o.status !== target) {
        onQuickAdvance(o, target);
      }
    });
    clearSelection();
  }

  function quickBtnFor(order: Order) {
    if (order.status === "PENDING_PAYMENT") {
      return {
        label: "Mulai Produksi →",
        className: "bg-sunflower hover:bg-ink hover:text-canvas text-ink",
      };
    }
    if (order.status === "IN_PROGRESS") {
      return {
        label: "Kirim ke QC →",
        className: "bg-terracottaLight hover:bg-ink hover:text-canvas text-terracotta",
      };
    }
    if (order.status === "QC_REVIEW") {
      return {
        label: "Tandai Terkirim →",
        className: "bg-wasabi hover:bg-ink hover:text-canvas text-ink",
      };
    }
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <div>
          <h2 className="text-base sm:text-xl font-serif text-ink">Rail Produksi — 4 Tahap, SLA Live</h2>
          <p className="text-xs text-stone-600">Scroll ke bawah di tiap kolom untuk memeriksa antrean batch yang sedang berjalan.</p>
        </div>
        <span className="badge-tag px-3 py-1 bg-sunflower text-ink rounded-xl text-xs font-bold self-start sm:self-auto">
          {orders.length} Pesanan
        </span>
      </div>

      {(criticalCount > 0 || overdueCount > 0 || pendingCount > 0) && (
        <div className="plate-pop p-3.5 sm:p-4 rounded-2xl bg-sunflower/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold">
            <AlertTriangle className="w-4 h-4 text-terracotta shrink-0" />
            <span>
              {[
                overdueCount > 0 && `${overdueCount} SLA terlewati`,
                criticalCount > 0 && `${criticalCount} kritis (< 6 jam)`,
                pendingCount > 0 && `${pendingCount} menunggu pembayaran`,
              ]
                .filter(Boolean)
                .join(" · ")}{" "}
              — prioritaskan sekarang
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-stone-600">
            <span className="w-2 h-2 rounded-full bg-terracotta pulse-dot"></span>
            <span>
              Kritis: {criticalCount} · Terlewati: {overdueCount} · Pending: {pendingCount}
            </span>
          </div>
        </div>
      )}

      {selected.size > 0 && (
        <div className="plate-pop p-3 rounded-2xl bg-ink text-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold">
            <CheckCheck className="w-4 h-4 text-wasabi shrink-0" />
            <span>{selected.size} terpilih</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold">
            {selectedStatuses.some((s) => s === "PENDING_PAYMENT") && (
              <button
                onClick={() => bulkAdvance("IN_PROGRESS")}
                className="px-3 py-2 bg-sunflower hover:bg-canvas text-ink border-2 border-ink rounded-xl transition min-h-[44px]"
              >
                Mulai Produksi Terpilih
              </button>
            )}
            {selectedStatuses.some((s) => s === "PENDING_PAYMENT" || s === "IN_PROGRESS") && (
              <button
                onClick={() => bulkAdvance("QC_REVIEW")}
                className="px-3 py-2 bg-terracottaLight hover:bg-canvas text-terracotta border-2 border-ink rounded-xl transition min-h-[44px]"
              >
                Kirim ke QC
              </button>
            )}
            {selectedStatuses.some((s) => s !== "COMPLETED") && (
              <button
                onClick={() => bulkAdvance("COMPLETED")}
                className="px-3 py-2 bg-wasabi hover:bg-canvas text-ink border-2 border-ink rounded-xl transition min-h-[44px]"
              >
                Tandai Selesai
              </button>
            )}
            <button
              onClick={clearSelection}
              className="px-3 py-2 bg-canvas text-ink border-2 border-ink rounded-xl hover:bg-surface transition min-h-[44px]"
            >
              <span className="inline-flex items-center gap-1">
                <X className="w-3 h-3" /> Batal
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="flex md:hidden gap-1.5 p-1.5 bg-white border-2 border-ink rounded-2xl font-mono text-xs overflow-x-auto no-scrollbar shadow-brutal-sm">
        {MOBILE_PILLS.map((pill) => {
          const count =
            pill.key === "ALL"
              ? orders.length
              : orders.filter((o) => o.status === pill.key).length;
          const active = mobileFilter === pill.key;
          return (
            <button
              key={pill.key}
              onClick={() => setMobileFilter(pill.key)}
              className={`px-3 py-1.5 rounded-xl shrink-0 transition font-bold ${
                active ? "kanban-tab-pill active" : "bg-transparent text-stone-700"
              }`}
            >
              {pill.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto pb-2 lg:-mx-12 xl:-mx-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 xl:gap-5 min-w-full md:min-w-[960px] lg:min-w-0">
          {COLUMNS.map((col) => {
            const items = buckets[col.key];
            const sums = items.reduce((sum, o) => {
              if (o.status !== "PENDING_PAYMENT") return sum + ORDER_VALUE;
              return sum;
            }, 0);
            const hidden = mobileFilter !== "ALL" && mobileFilter !== col.key;
            return (
              <div
                key={col.key}
                className={`bg-canvas border-2 border-ink rounded-3xl p-4 flex flex-col shadow-brutal-sm h-[560px] xl:h-[640px] ${
                  hidden ? "hidden md:flex" : "flex"
                }`}
              >
                <div
                  className={`flex items-center justify-between pb-3 border-b-2 border-ink font-mono text-xs font-bold shrink-0 ${col.headerText}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.dot} border border-ink`}></span>
                    <span>{col.label}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`badge-tag px-2 py-0.5 ${col.badge} rounded-full text-[10px]`}>{items.length}</span>
                    <span className="text-[10px] font-mono font-bold text-stone-600 mt-1">
                      {sums > 0 ? formatRp(sums) : ""}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mt-3 overflow-y-auto kanban-scroll pr-1.5 flex-1">
                  {items.map((order) => {
                    const sla = calculateSLA(order.created_at, order.status, now);
                    const quick = quickBtnFor(order);
                    return (
                      <div
                        key={order.id}
                        className="plate-pop p-3.5 sm:p-4 rounded-2xl cursor-pointer"
                        onClick={() => onSelectOrder(order)}
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <label
                              className="flex items-center shrink-0 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                aria-label={`Pilih ${order.brand}`}
                                className="w-4 h-4 accent-terracotta border-2 border-ink cursor-pointer"
                                checked={selected.has(order.order_id)}
                                onChange={(e) => toggleSelect(order.order_id, e.target.checked)}
                              />
                            </label>
                            <span className="font-bold text-stone-600 shrink-0">{order.order_id}</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-wasabiDark">
                              <span
                                className={`w-1.5 h-1.5 rounded-full border border-ink ${
                                  order.notion_url ? "bg-wasabiDark" : "bg-stone-300"
                                }`}
                              ></span>
                              Notion
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] shrink-0 ${sla.className}`}>
                            {sla.text}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base text-ink leading-tight font-normal">{order.brand}</h4>
                        <p className="text-[10px] sm:text-[11px] text-terracotta font-mono font-bold mt-0.5">{order.category}</p>
                        <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed font-sans">{order.description}</p>
                        <div className="mt-3 pt-2 border-t-2 border-ink flex justify-between items-center text-[10px] font-mono text-stone-600">
                          <span>{order.phone}</span>
                          <span className="font-bold text-ink hover:text-terracotta transition">Kelola →</span>
                        </div>
                        {quick && (
                          <div className="mt-2.5 pt-2 border-t-2 border-ink">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuickAdvance(order, order.status === "PENDING_PAYMENT" ? "IN_PROGRESS" : order.status === "IN_PROGRESS" ? "QC_REVIEW" : "COMPLETED");
                              }}
                              className={`w-full px-2.5 py-1.5 ${quick.className} border-2 border-ink rounded-xl text-[10px] font-mono font-bold transition min-h-[44px]`}
                            >
                              {quick.label}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}