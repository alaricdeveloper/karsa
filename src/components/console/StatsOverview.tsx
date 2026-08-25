import { Wallet, ShieldCheck, Cpu, CheckCheck } from "lucide-react";
import type { Order } from "@/lib/types";
import { ORDER_VALUE, formatRp } from "./console-lib";

export function StatsOverview({ orders }: { orders: Order[] }) {
  let revenue = 0;
  let activeQueue = 0;
  let completed = 0;

  orders.forEach((o) => {
    if (o.status === "COMPLETED" || o.status === "IN_PROGRESS" || o.status === "QC_REVIEW") {
      revenue += ORDER_VALUE;
    }
    if (o.status === "IN_PROGRESS" || o.status === "QC_REVIEW") activeQueue++;
    if (o.status === "COMPLETED") completed++;
  });

  return (
    <section aria-label="Ringkasan operasional" className="plate-pop rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-2 divide-ink">
        <div className="p-3.5 sm:p-4">
          <div className="flex justify-between items-center text-stone-600 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wide">
            <span>Pendapatan Kotor</span>
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg sm:text-2xl font-serif text-ink mt-1">{formatRp(revenue)}</div>
          <span className="text-[10px] font-mono text-terracotta font-bold mt-0.5 block">Modal Rp1.000.000 (demo)</span>
        </div>

        <div className="p-3.5 sm:p-4 bg-wasabi/30">
          <div className="flex justify-between items-center text-stone-600 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wide">
            <span>Tingkat SLA</span>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg sm:text-2xl font-serif text-ink mt-1">96.8%</div>
          <span className="text-[10px] font-mono text-wasabiDark font-bold mt-0.5 block">&lt; 24 Jam Kerja (demo)</span>
        </div>

        <div className="p-3.5 sm:p-4 border-t-2 border-ink lg:border-t-0">
          <div className="flex justify-between items-center text-stone-600 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wide">
            <span>Antrean Aktif</span>
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg sm:text-2xl font-serif text-terracotta mt-1">{activeQueue}</div>
          <span className="text-[10px] font-mono text-stone-600 font-bold mt-0.5 block">Tahap Produksi &amp; QC</span>
        </div>

        <div className="p-3.5 sm:p-4 bg-sunflower/20 border-t-2 border-ink lg:border-t-0">
          <div className="flex justify-between items-center text-stone-600 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wide">
            <span>Batch Selesai</span>
            <CheckCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-lg sm:text-2xl font-serif text-ink mt-1">{completed}</div>
          <span className="text-[10px] font-mono text-stone-600 font-bold mt-0.5 block">Terkirim ke Customer Hub</span>
        </div>
      </div>
    </section>
  );
}