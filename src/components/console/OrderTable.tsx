"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import type { Order } from "@/lib/types";
import {
  calculateSLA,
  formatIdShort,
  formatRp,
  getFilteredOrders,
  ORDER_VALUE,
  STATUS_LABELS,
  type DateFilter,
} from "./console-lib";

type SortKey = "timestamp" | "brand" | "status";

const DATE_CHIPS: { key: DateFilter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "today", label: "Hari Ini" },
  { key: "7d", label: "7 Hari" },
  { key: "30d", label: "30 Hari" },
];

export function OrderTable({
  orders,
  onSelectOrder,
  now,
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
  dateFilter,
  onDateFilter,
}: {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  now: number;
  search: string;
  onSearch: (v: string) => void;
  statusFilter: string;
  onStatusFilter: (v: string) => void;
  dateFilter: DateFilter;
  onDateFilter: (v: DateFilter) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const list = getFilteredOrders(orders, search, statusFilter, dateFilter, now);
    if (sortKey === "brand") {
      list.sort((a, b) => {
        const va = a.brand.toLowerCase();
        const vb = b.brand.toLowerCase();
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    } else if (sortKey === "status") {
      list.sort((a, b) =>
        sortDir === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      );
    } else {
      list.sort((a, b) =>
        sortDir === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return list;
  }, [orders, search, statusFilter, dateFilter, now, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "timestamp" ? "desc" : "asc");
    }
  }

  function sortIcon(key: SortKey) {
    if (sortKey !== key) return <span className="text-stone-400 text-[10px]">↕</span>;
    return <span className="text-terracotta text-[10px]">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  const revenue = filtered.reduce((sum, o) => (o.status !== "PENDING_PAYMENT" ? sum + ORDER_VALUE : sum), 0);

  return (
    <section className="space-y-4">
      <div className="plate-pop rounded-3xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b-2 border-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-canvas">
          <div>
            <h2 className="text-base sm:text-xl font-serif text-ink">Database Master Pesanan</h2>
            <p className="text-xs text-stone-600 font-mono">Riwayat batch transaksi terverifikasi di sistem (data demo).</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Cari brand / ID..."
                aria-label="Cari pesanan"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white border-2 border-ink rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-mono transition min-h-[44px]"
              />
            </div>

            <select
              aria-label="Filter status"
              value={statusFilter}
              onChange={(e) => onStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-white border-2 border-ink rounded-xl px-3 py-2 text-base sm:text-xs font-mono font-bold text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
            >
              <option value="ALL">Semua Status</option>
              <option value="PENDING_PAYMENT">Pending Invoice</option>
              <option value="IN_PROGRESS">Penyusunan Konten</option>
              <option value="QC_REVIEW">Kurasi QC</option>
              <option value="COMPLETED">Selesai Terkirim</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-3 bg-canvas border-b-2 border-ink font-mono text-[10px] font-bold">
          <span className="text-stone-600 mr-1">Rentang:</span>
          {DATE_CHIPS.map((chip) => {
            const active = dateFilter === chip.key;
            return (
              <button
                key={chip.key}
                onClick={() => onDateFilter(chip.key)}
                className={`px-3 py-1.5 rounded-xl border-2 border-ink transition min-h-[44px] ${
                  active ? "bg-ink text-canvas" : "bg-white text-ink hover:bg-canvas"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-stone-600 font-mono text-xs">
            <Inbox className="w-8 h-8 mx-auto mb-2 text-stone-400" />
            <p>Tidak ada rekaman pesanan yang cocok.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-canvas text-ink border-b-2 border-ink font-bold">
                  <tr>
                    <th className="py-3.5 px-4">
                      <button onClick={() => toggleSort("timestamp")} className="flex items-center gap-1 hover:text-terracotta transition min-h-[44px]">
                        ID / Tanggal {sortIcon("timestamp")}
                      </button>
                    </th>
                    <th className="py-3.5 px-4">
                      <button onClick={() => toggleSort("brand")} className="flex items-center gap-1 hover:text-terracotta transition min-h-[44px]">
                        Brand / Sektor {sortIcon("brand")}
                      </button>
                    </th>
                    <th className="py-3.5 px-4">
                      <button onClick={() => toggleSort("status")} className="flex items-center gap-1 hover:text-terracotta transition min-h-[44px]">
                        Sisa SLA (24 Jam) {sortIcon("status")}
                      </button>
                    </th>
                    <th className="py-3.5 px-4">Kontak</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-ink bg-white">
                  {filtered.map((order) => {
                    const sla = calculateSLA(order.created_at, order.status, now);
                    return (
                      <tr key={order.id} className="hover:bg-canvas transition cursor-pointer" onClick={() => onSelectOrder(order)}>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-ink">{order.order_id}</span>
                          <span className="text-[10px] text-stone-600 block mt-0.5">{formatIdShort(order.created_at)}</span>
                          <span className={`text-[10px] font-mono font-bold block mt-0.5 ${order.notion_url ? "text-wasabiDark" : "text-stone-500"}`}>
                            {order.notion_url ? "Notion: terpasang" : "Notion: belum"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-ink font-sans text-xs">{order.brand}</span>
                          <span className="text-[10px] text-stone-600 block font-bold">{order.category}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${sla.className}`}>{sla.text}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-ink font-bold block">{order.phone}</span>
                          <span className="text-[10px] text-stone-600 block">{order.email}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`status-badge ${order.status} border-2 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono inline-block shadow-brutal-sm`}>
                            {STATUS_LABELS[order.status] || order.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectOrder(order);
                            }}
                            className="px-3.5 py-1.5 bg-canvas hover:bg-wasabi border-2 border-ink rounded-xl text-xs font-bold transition shadow-brutal-sm"
                          >
                            Kelola →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y-2 divide-ink bg-white">
              {filtered.map((order) => (
                <div
                  key={order.id}
                  className="p-4 hover:bg-canvas transition cursor-pointer flex flex-col gap-2 font-mono text-xs"
                  onClick={() => onSelectOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-terracotta">{order.order_id}</span>
                      <h4 className="font-serif text-base text-ink mt-0.5 font-normal">{order.brand}</h4>
                      <span className={`text-[10px] font-mono font-bold block mt-0.5 ${order.notion_url ? "text-wasabiDark" : "text-stone-500"}`}>
                        {order.notion_url ? "Notion: terpasang" : "Notion: belum"}
                      </span>
                    </div>
                    <span className={`status-badge ${order.status} border-2 px-2 py-0.5 rounded-md text-[10px] font-bold`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-stone-600 pt-2 border-t border-stone-300">
                    <span>
                      {order.category} • {order.phone}
                    </span>
                    <span className="font-bold text-ink">Detail →</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3.5 border-t-2 border-ink bg-canvas text-[10px] font-mono font-bold text-stone-600">
          <span>
            {filtered.length} dari {orders.length} pesanan · Pendapatan filter {formatRp(revenue)}
          </span>
          <span>Ekspor CSV mengikuti filter &amp; pencarian aktif</span>
        </div>
      </div>
    </section>
  );
}