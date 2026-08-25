import type { Order } from "@/lib/types";
import { STATUS_LABELS, formatDateId, slaChip, doneStepsFor, statusBadgeClass } from "./hub-lib";

export function ReadoutPlate({ order, now }: { order: Order; now: number }) {
  const sla = slaChip(order, now);
  const doneSteps = doneStepsFor(order.status);
  const steps = ["1. Brief Masuk", "2. Script Engine", "3. Kurasi QC", "4. Notion Siap"];

  return (
    <section className="bento-pop p-5 sm:p-8 rounded-3xl bg-white" aria-label="Status produksi batch">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap font-mono text-[10px] sm:text-xs text-inkMuted font-bold">
            <span>
              Order ID: <strong className="text-terracotta">{order.order_id}</strong>
            </span>
            <span>&bull;</span>
            <span className="truncate">{formatDateId(order.created_at)}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif text-ink font-normal">{order.brand}</h1>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold mt-1">
            {order.category} &bull; Target: {order.competitor || "General"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs shadow-brutal-sm">
            <span className="text-inkMuted block text-[10px] uppercase font-bold">Status Produksi</span>
            <span className={`status-chip ${statusBadgeClass(order.status)} px-2.5 py-0.5 rounded-lg text-xs font-bold inline-block mt-1 border-2 border-ink`}>
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <div className="p-3 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs shadow-brutal-sm">
            <span className="text-inkMuted block text-[10px] uppercase font-bold">SLA Live</span>
            <span className={`status-chip ${sla.className} px-2.5 py-0.5 rounded-lg text-xs font-bold inline-block mt-1 border-2 border-ink`}>
              {sla.text}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t-2 border-ink">
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px] sm:text-[11px]">
          {steps.map((label, i) => {
            const isDone = i < doneSteps;
            const isCurrent = i === doneSteps - 1 && order.status !== "COMPLETED" && order.status !== "PENDING_PAYMENT";
            return (
              <div key={label} className="space-y-1.5">
                <span
                  className={`block mx-auto w-3 h-3 rounded-full border-2 border-ink ${isDone ? (isCurrent ? "bg-sunflower" : "bg-ink") : "bg-white"}`}
                />
                <span className={`${isDone ? "text-ink" : "text-inkMuted"} font-bold block`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}