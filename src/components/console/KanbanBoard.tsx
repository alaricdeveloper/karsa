"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { KANBAN_COLUMNS } from "@/lib/constants";
import { calculateSLA } from "@/lib/utils";

interface KanbanBoardProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

const COLUMNS: OrderStatus[] = [
  "PENDING_PAYMENT",
  "IN_PROGRESS",
  "QC_REVIEW",
  "COMPLETED",
];

const COLUMN_COLORS: Record<OrderStatus, { header: string; badge: string; badgeBorder: string; badgeBg: string }> = {
  PENDING_PAYMENT: {
    header: "text-amber-900",
    badge: "text-amber-900",
    badgeBorder: "border-amber-300",
    badgeBg: "bg-amber-100",
  },
  IN_PROGRESS: {
    header: "text-indigo-900",
    badge: "text-indigo-900",
    badgeBorder: "border-indigo-300",
    badgeBg: "bg-indigo-100",
  },
  QC_REVIEW: {
    header: "text-pink-900",
    badge: "text-pink-900",
    badgeBorder: "border-pink-300",
    badgeBg: "bg-pink-100",
  },
  COMPLETED: {
    header: "text-emerald-900",
    badge: "text-emerald-900",
    badgeBorder: "border-emerald-300",
    badgeBg: "bg-emerald-100",
  },
};

export function KanbanBoard({ orders, onSelectOrder }: KanbanBoardProps) {
  const [mobileFilter, setMobileFilter] = useState<OrderStatus | "ALL">("ALL");

  const counts: Record<string, number> = { ALL: orders.length };
  COLUMNS.forEach((s) => {
    counts[s] = orders.filter((o) => o.status === s).length;
  });

  const visibleColumns =
    mobileFilter === "ALL"
      ? COLUMNS
      : COLUMNS.filter((s) => s === mobileFilter);

  return (
    <section className="space-y-3.5 sm:space-y-4">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-stone-500">Pipeline Pengerjaan (SLA Live)</span>
        <span className="text-stone-700 font-bold bg-sand-200 px-2 py-0.5 rounded text-[10px] sm:text-[11px]">
          {orders.length} Pesanan
        </span>
      </div>

      {/* MOBILE KANBAN COLUMN SWITCHER */}
      <div className="flex md:hidden gap-1.5 p-1 bg-sand-200 rounded-xl font-mono text-[11px] overflow-x-auto no-scrollbar">
        <button
          onClick={() => setMobileFilter("ALL")}
          className={`px-3 py-1.5 rounded-lg shrink-0 transition ${
            mobileFilter === "ALL"
              ? "bg-sand-900 text-white"
              : "bg-transparent text-stone-700"
          }`}
        >
          Semua ({counts.ALL})
        </button>
        {COLUMNS.map((s) => (
          <button
            key={s}
            onClick={() => setMobileFilter(s)}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition ${
              mobileFilter === s
                ? "bg-sand-900 text-white"
                : "bg-transparent text-stone-700"
            }`}
          >
            {s === "PENDING_PAYMENT" && `Pending (${counts[s]})`}
            {s === "IN_PROGRESS" && `Proses (${counts[s]})`}
            {s === "QC_REVIEW" && `QC (${counts[s]})`}
            {s === "COMPLETED" && `Selesai (${counts[s]})`}
          </button>
        ))}
      </div>

      {/* KANBAN COLUMNS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
        {visibleColumns.map((status) => {
          const col = KANBAN_COLUMNS[status];
          const colors = COLUMN_COLORS[status];
          const colOrders = orders.filter((o) => o.status === status);

          return (
            <div
              key={status}
              className="bg-sand-100/70 border border-sand-200 rounded-2xl p-3 sm:p-3.5 flex flex-col min-h-[350px] md:min-h-[480px]"
            >
              <div className={`flex items-center justify-between pb-2.5 border-b border-sand-300 font-mono text-xs font-bold ${colors.header}`}>
                <span>{col.label}</span>
                <span className={`px-2 py-0.5 ${colors.badgeBg} rounded-full text-[10px] border ${colors.badgeBorder}`}>
                  {colOrders.length}
                </span>
              </div>
              <div className="space-y-2.5 sm:space-y-3 mt-3 overflow-y-auto max-h-[600px] pr-1">
                {colOrders.map((order) => (
                  <KanbanCard
                    key={order.id}
                    order={order}
                    onClick={() => onSelectOrder(order)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function KanbanCard({
  order,
  onClick,
}: {
  order: Order;
  onClick: () => void;
}) {
  const sla = calculateSLA(order.created_at, order.status);
  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#E5E5E0] p-3.5 sm:p-4 rounded-xl cursor-pointer hover:border-sand-900 transition shadow-sm active:scale-[0.99]"
    >
      <div className="flex justify-between items-start text-[10px] font-mono mb-1.5">
        <span className="font-bold text-stone-500">{order.order_id}</span>
        <span className={`px-1.5 py-0.5 rounded text-[9px] ${sla.className}`}>
          {sla.text}
        </span>
      </div>
      <h4 className="font-bold font-serif text-sm text-sand-900 leading-tight">{order.brand}</h4>
      <p className="text-[10px] sm:text-[11px] text-stone-500 font-mono mt-0.5">{order.category}</p>
      <p className="text-[11px] text-stone-600 mt-2 line-clamp-2 leading-relaxed font-sans">{order.description}</p>
      <div className="mt-2.5 pt-2 border-t border-sand-200 flex justify-between items-center text-[10px] font-mono text-stone-500">
        <span>{order.phone}</span>
        <span className="font-bold text-sand-900">Kelola &rarr;</span>
      </div>
    </div>
  );
}
