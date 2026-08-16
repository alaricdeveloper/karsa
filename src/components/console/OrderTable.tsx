"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { calculateSLA, formatTimestamp } from "@/lib/utils";
import { Search } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export function OrderTable({ orders, onSelectOrder }: OrderTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");

  const filtered = orders.filter((o) => {
    const matchSearch =
      search === "" ||
      o.brand.toLowerCase().includes(search.toLowerCase()) ||
      o.order_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <section className="space-y-4">
      <div className="bg-white border border-[#E5E5E0] rounded-2xl overflow-hidden shadow-sm">
        {/* Header with search/filter */}
        <div className="p-4 sm:p-5 border-b border-sand-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-sand-50/50">
          <div>
            <h2 className="text-base font-bold font-serif text-sand-900">Database Master Pesanan</h2>
            <p className="text-[11px] sm:text-xs text-stone-500 font-mono">Riwayat {orders.length} batch transaksi terverifikasi.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari brand / ID..."
                className="w-full bg-white border border-sand-300 rounded-xl sm:rounded-lg pl-9 pr-3 py-2.5 sm:py-1.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 font-mono transition min-h-[44px] sm:min-h-0"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "ALL")}
              className="w-full sm:w-auto bg-white border border-sand-300 rounded-xl sm:rounded-lg px-3 py-2.5 sm:py-1.5 text-base sm:text-xs font-mono text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px] sm:min-h-0"
            >
              <option value="ALL">Semua Status</option>
              <option value="IN_PROGRESS">Penyusunan Konten</option>
              <option value="QC_REVIEW">Kurasi QC</option>
              <option value="COMPLETED">Selesai Terkirim</option>
              <option value="PENDING_PAYMENT">Pending Invoice</option>
            </select>
          </div>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-sand-100/75 text-stone-600 border-b border-sand-200">
              <tr>
                <th className="py-3 px-4 font-semibold">ID / Tanggal</th>
                <th className="py-3 px-4 font-semibold">Brand / Sektor</th>
                <th className="py-3 px-4 font-semibold">Sisa SLA (24 Jam)</th>
                <th className="py-3 px-4 font-semibold">Kontak</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 bg-white">
              {filtered.map((order) => {
                const sla = calculateSLA(order.created_at, order.status);
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-sand-50 transition cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <span className="font-bold text-sand-900">{order.order_id}</span>
                      <span className="text-[10px] text-stone-500 block mt-0.5">
                        {formatTimestamp(order.created_at)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-sand-900 font-sans text-xs">{order.brand}</span>
                      <span className="text-[10px] text-stone-500 block">{order.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${sla.className}`}>
                        {sla.text}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sand-900 block">{order.phone}</span>
                      <span className="text-[10px] text-stone-500 block">{order.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="px-3 py-1.5 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded text-[11px] font-medium transition"
                      >
                        Kelola &rarr;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE TACTILE CARDS VIEW */}
        <div className="md:hidden divide-y divide-sand-200 bg-white">
          {filtered.map((order) => {
            const sla = calculateSLA(order.created_at, order.status);
            return (
              <div
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="p-3.5 hover:bg-sand-50 transition cursor-pointer flex flex-col gap-2 font-mono text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-sand-900">{order.order_id}</span>
                    <h4 className="font-bold font-serif text-sm text-sand-900 mt-0.5">{order.brand}</h4>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1 border-t border-sand-100">
                  <span>{order.category} &bull; {order.phone}</span>
                  <span className="font-bold text-sand-900">Detail &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="p-12 text-center text-stone-500 font-mono text-xs">
            <p>Tidak ada rekaman pesanan yang cocok.</p>
          </div>
        )}
      </div>
    </section>
  );
}
