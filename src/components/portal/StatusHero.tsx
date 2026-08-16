import type { Order, OrderStatus } from "@/lib/types";
import { calculateSLA } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";

interface StatusHeroProps {
  order: Order;
}

const STATUS_ORDER: OrderStatus[] = ["PENDING_PAYMENT", "IN_PROGRESS", "QC_REVIEW", "COMPLETED"];

const STEP_LABELS = ["Brief Masuk", "AI Engine", "Kurasi QC", "Notion Siap"];

export function StatusHero({ order }: StatusHeroProps) {
  const sla = calculateSLA(order.created_at, order.status);
  const currentIdx = STATUS_ORDER.indexOf(order.status);

  const dateStr = new Date(order.created_at).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="bg-white border border-[#E5E5E0] p-5 sm:p-8 rounded-3xl relative overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-stone-500">
            <span>Order ID: <strong className="text-sand-900">{order.order_id}</strong></span>
            <span>&bull;</span>
            <span>{dateStr}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-sand-900">{order.brand}</h1>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">
            {order.category} &bull; Target: {order.competitor || "General"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="p-2.5 sm:p-3 bg-sand-50 border border-sand-200 rounded-xl font-mono text-xs">
            <span className="text-stone-500 block text-[9px] sm:text-[10px] uppercase">Status Produksi</span>
            <span className={`status-badge px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold inline-block mt-1 ${getStatusBadgeClass(order.status)}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>
          <div className="p-2.5 sm:p-3 bg-sand-50 border border-sand-200 rounded-xl font-mono text-xs">
            <span className="text-stone-500 block text-[9px] sm:text-[10px] uppercase">SLA Kurasi</span>
            <span className={`font-bold inline-block mt-1 text-[10px] sm:text-[11px] ${order.status === "COMPLETED" ? "text-emerald-700" : "text-indigo-800"}`}>
              {order.status === "COMPLETED" ? "Terkirim Sesuai SLA" : "Estimasi < 24 Jam"}
            </span>
          </div>
        </div>
      </div>

      {/* PROGRESS STEPPER */}
      <div className="mt-6 pt-5 border-t border-sand-200">
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-[9px] sm:text-xs">
          {STEP_LABELS.map((label, i) => {
            let barClass = "bg-sand-200";
            let textClass = "text-stone-500";

            if (i === 0) {
              barClass = "bg-emerald-600";
              textClass = "font-bold text-sand-900";
            } else if (i === 1 && order.status === "IN_PROGRESS") {
              barClass = "bg-sand-900 animate-pulse";
              textClass = "font-bold text-sand-900";
            } else if (i === 1 && (order.status === "QC_REVIEW" || order.status === "COMPLETED")) {
              barClass = "bg-emerald-600";
              textClass = "font-bold text-sand-900";
            } else if (i === 2 && order.status === "QC_REVIEW") {
              barClass = "bg-sand-900 animate-pulse";
              textClass = "font-bold text-sand-900";
            } else if (i === 2 && order.status === "COMPLETED") {
              barClass = "bg-emerald-600";
              textClass = "font-bold text-sand-900";
            } else if (i === 3 && order.status === "COMPLETED") {
              barClass = "bg-emerald-600";
              textClass = "font-bold text-sand-900";
            }

            return (
              <div key={i} className="space-y-1">
                <div className={`h-1.5 rounded-full ${barClass}`} />
                <span className={`${textClass} block`}>{i + 1}. {label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getStatusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case "PENDING_PAYMENT":
      return "bg-amber-100 text-amber-900 border border-amber-200";
    case "IN_PROGRESS":
      return "bg-indigo-100 text-indigo-900 border border-indigo-200";
    case "QC_REVIEW":
      return "bg-pink-100 text-pink-900 border border-pink-200";
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-900 border border-emerald-200";
    default:
      return "";
  }
}
