import { Wallet, ShieldCheck, Cpu, CheckCheck } from "lucide-react";
import { formatCurrency, calculateRevenue } from "@/lib/utils";
import type { Order } from "@/lib/types";

interface StatsOverviewProps {
  orders: Order[];
}

export function StatsOverview({ orders }: StatsOverviewProps) {
  const revenue = calculateRevenue(orders);
  const activeQueue = orders.filter(
    (o) => o.status === "IN_PROGRESS" || o.status === "QC_REVIEW"
  ).length;
  const completed = orders.filter((o) => o.status === "COMPLETED").length;
  const total = orders.length;
  const slaRate = total > 0 ? ((completed / total) * 100).toFixed(1) : "0";

  const stats = [
    {
      label: "Gross Revenue",
      value: formatCurrency(revenue),
      icon: <Wallet className="w-3.5 h-3.5 text-stone-400" />,
      subtitle: "Modal Rp1 Juta",
      subtitleClass: "text-emerald-700 font-semibold",
      valueClass: "text-sand-900",
    },
    {
      label: "SLA Rate",
      value: `${slaRate}%`,
      icon: <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />,
      subtitle: "< 24 Jam Kerja",
      subtitleClass: "text-stone-500",
      valueClass: "text-emerald-700",
    },
    {
      label: "Antrean Aktif",
      value: String(activeQueue),
      icon: <Cpu className="w-3.5 h-3.5 text-stone-400" />,
      subtitle: "Produksi & QC",
      subtitleClass: "text-stone-500",
      valueClass: "text-indigo-700",
    },
    {
      label: "Batch Selesai",
      value: String(completed),
      icon: <CheckCheck className="w-3.5 h-3.5 text-stone-400" />,
      subtitle: "Terkirim ke Klien",
      subtitleClass: "text-stone-500",
      valueClass: "text-sand-900",
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E5E5E0] p-3.5 sm:p-4 rounded-2xl"
        >
          <div className="flex justify-between items-center text-stone-500 text-[10px] sm:text-[11px] font-mono">
            <span>{s.label}</span>
            {s.icon}
          </div>
          <p className={`text-lg sm:text-2xl font-bold font-mono mt-1 ${s.valueClass}`}>
            {s.value}
          </p>
          <span className={`text-[9px] sm:text-[10px] font-mono mt-0.5 block ${s.subtitleClass}`}>
            {s.subtitle}
          </span>
        </div>
      ))}
    </section>
  );
}
