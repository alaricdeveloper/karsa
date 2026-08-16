import type { Order } from "@/lib/types";

interface AnalyticsViewProps {
  orders: Order[];
}

export function AnalyticsView({ orders }: AnalyticsViewProps) {
  const categoryCount: Record<string, number> = {};
  orders.forEach((o) => {
    categoryCount[o.category] = (categoryCount[o.category] || 0) + 1;
  });

  const total = orders.length;
  const completed = orders.filter((o) => o.status === "COMPLETED").length;
  const revenue =
    orders.filter(
      (o) =>
        o.status === "IN_PROGRESS" ||
        o.status === "QC_REVIEW" ||
        o.status === "COMPLETED"
    ).length * 299000;
  const initialInvestment = 1000000;
  const roi =
    initialInvestment > 0 ? (revenue / initialInvestment).toFixed(1) : "0";
  const grossMargin =
    revenue > 0
      ? (((revenue - initialInvestment) / revenue) * 100).toFixed(1)
      : "0";

  const totalScripts = total * 30;
  const totalArticles = total * 4;

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* ROAS Card */}
        <div className="bg-white border border-[#E5E5E0] p-4 sm:p-6 rounded-2xl">
          <span className="text-[11px] sm:text-xs font-mono uppercase text-stone-500">Modal vs Return</span>
          <h3 className="text-base font-bold font-serif text-sand-900 mt-1">Return on Ad Spend (ROAS)</h3>
          <div className="mt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Modal Awal:</span>
              <span className="font-bold text-sand-900">Rp1.000.000</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Total Omset:</span>
              <span className="font-bold text-emerald-700">Rp{revenue.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Gross Margin:</span>
              <span className="font-bold text-emerald-700">{grossMargin}%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">ROI:</span>
              <span className="font-bold text-emerald-700">{roi}x</span>
            </div>
          </div>
        </div>

        {/* Acquisition Metrics */}
        <div className="bg-white border border-[#E5E5E0] p-4 sm:p-6 rounded-2xl">
          <span className="text-[11px] sm:text-xs font-mono uppercase text-stone-500">Akuisisi Klien</span>
          <h3 className="text-base font-bold font-serif text-sand-900 mt-1">Metrik Akuisisi</h3>
          <div className="mt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Total Klien:</span>
              <span className="font-bold text-sand-900">{total} Brand</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Rata-rata CAC:</span>
              <span className="font-bold text-indigo-700">
                ~Rp{total > 0 ? Math.round(initialInvestment / total).toLocaleString("id-ID") : 0}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">AOV:</span>
              <span className="font-bold text-sand-900">Rp299.000</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Repeat Batch:</span>
              <span className="font-bold text-emerald-700">23.5%</span>
            </div>
          </div>
        </div>

        {/* Efficiency Card */}
        <div className="bg-white border border-[#E5E5E0] p-4 sm:p-6 rounded-2xl">
          <span className="text-[11px] sm:text-xs font-mono uppercase text-stone-500">Kinerja Operasional</span>
          <h3 className="text-base font-bold font-serif text-sand-900 mt-1">Efisiensi Deliverables</h3>
          <div className="mt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Target SLA:</span>
              <span className="font-bold text-sand-900">Maks. 24 Jam</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Turnaround:</span>
              <span className="font-bold text-emerald-700">3 Jam 42 Menit</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Script Dibuat:</span>
              <span className="font-bold text-sand-900">{totalScripts.toLocaleString("id-ID")} Naskah</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-sand-200">
              <span className="text-stone-500">Artikel SEO:</span>
              <span className="font-bold text-sand-900">{totalArticles} Artikel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Niche Distribution */}
      <div className="bg-white border border-[#E5E5E0] p-4 sm:p-6 rounded-2xl">
        <span className="text-[11px] sm:text-xs font-mono uppercase text-stone-500">
          Distribusi Sektor Industri ({total} Pesanan)
        </span>
        <h3 className="text-base sm:text-lg font-bold font-serif text-sand-900 mt-1">
          Kategori Niche Paling Banyak Memesan
        </h3>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 font-mono text-xs">
          {Object.entries(categoryCount)
            .sort(([, a], [, b]) => b - a)
            .map(([cat, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between mb-1 text-stone-600">
                    <span>{cat}</span>
                    <span className="font-bold text-sand-900">{count} Pesanan ({pct}%)</span>
                  </div>
                  <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sand-900 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
