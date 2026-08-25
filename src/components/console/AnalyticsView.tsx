"use client";

import { useMemo } from "react";
import type { Order } from "@/lib/types";
import { formatRp, isSlaCritical, ORDER_VALUE, slaRemainingSafe } from "./console-lib";

function Bar({ pct, barClass }: { pct: number; barClass: string }) {
  return (
    <div className="w-full bg-white border-2 border-ink h-3.5 rounded-full overflow-hidden p-0.5">
      <div className={`${barClass} h-full rounded-full`} style={{ width: `${pct}%` }}></div>
    </div>
  );
}

function MetricCard({
  badge,
  badgeClass,
  title,
  rows,
}: {
  badge: string;
  badgeClass: string;
  title: string;
  rows: [string, string, string?][]; // [label, value, valueClass?]
}) {
  return (
    <div className="plate-pop p-6 rounded-3xl">
      <span className={`badge-tag px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${badgeClass}`}>
        {badge}
      </span>
      <h3 className="text-lg font-serif text-ink mt-2">
        {title} <span className="text-[10px] font-mono text-stone-600 font-bold align-middle">— data demo</span>
      </h3>
      <div className="mt-4 space-y-2 font-mono text-xs">
        {rows.map(([label, value, valueClass]) => (
          <div key={label} className="flex justify-between py-1.5 border-b border-stone-300">
            <span className="text-stone-600">{label}</span>
            <span className={`font-bold ${valueClass || "text-ink"}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsView({ orders, now }: { orders: Order[]; now: number }) {
  const nicheCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      counts[o.category] = (counts[o.category] || 0) + 1;
    });
    return counts;
  }, [orders]);

  const revenueNiche = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      if (o.status === "PENDING_PAYMENT") return;
      counts[o.category] = (counts[o.category] || 0) + ORDER_VALUE;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  const intakeDays = useMemo(() => {
    const days: { date: Date; count: number }[] = [];
    const base = new Date(now);
    for (let i = 29; i >= 0; i--) {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() - i);
      days.push({ date: d, count: 0 });
    }
    orders.forEach((o) => {
      const t = new Date(o.created_at);
      const idx = days.findIndex((d) => d.date.toDateString() === t.toDateString());
      if (idx >= 0) days[idx].count++;
    });
    return days;
  }, [orders, now]);

  const intakeMax = Math.max(1, ...intakeDays.map((d) => d.count));

  const weekly = useMemo(() => {
    const weekMs = 7 * 24 * 3600 * 1000;
    const weeks = [0, 0, 0, 0];
    orders.forEach((o) => {
      if (o.status === "PENDING_PAYMENT") return;
      const age = now - new Date(o.created_at).getTime();
      weeks[Math.min(3, Math.floor(age / weekMs))] += ORDER_VALUE;
    });
    return weeks;
  }, [orders, now]);
  const weeklyMax = Math.max(1, ...weekly);

  const done = orders.filter((o) => o.status === "COMPLETED").length;
  const total = orders.length || 1;
  const critical = orders.filter((o) => isSlaCritical(o, now)).length;
  const safe = orders.filter((o) => slaRemainingSafe(o, now)).length;
  const pending = orders.filter((o) => o.status === "PENDING_PAYMENT").length;

  const stages: [string, string, string, string][] = [
    ["Pending Invoice", "PENDING_PAYMENT", "#FCD34D", "text-ink"],
    ["Penyusunan", "IN_PROGRESS", "#FDF0ED", "text-ink"],
    ["Kurasi QC", "QC_REVIEW", "#181511", "text-canvas"],
    ["Terkirim", "COMPLETED", "#D4E882", "text-ink"],
  ];

  const fmtDay = (d: Date) =>
    d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          badge="Modal vs Return"
          badgeClass="bg-sunflower text-ink"
          title="Return on Ad Spend (ROAS)"
          rows={[
            ["Modal Awal:", "Rp1.000.000"],
            ["Total Omset:", formatRp(10166000), "text-terracotta font-serif text-sm"],
            ["Gross Margin:", "90.1%"],
            ["ROI:", "10.1x (1.016%)", "text-wasabiDark"],
          ]}
        />
        <MetricCard
          badge="Akuisisi Klien"
          badgeClass="bg-wasabi text-ink"
          title="Metrik Akuisisi"
          rows={[
            ["Total Klien:", "34 Brand"],
            ["Rata-rata CAC:", "~Rp29.400", "text-terracotta"],
            ["AOV:", "Rp299.000"],
            ["Repeat Batch:", "23.5%", "text-terracotta"],
          ]}
        />
        <MetricCard
          badge="Kinerja Operasional"
          badgeClass="bg-terracottaLight text-terracotta"
          title="Efisiensi Deliverables"
          rows={[
            ["Target SLA:", "Maks. 24 Jam"],
            ["Turnaround Rata-rata:", "3 Jam 42 Menit", "text-wasabiDark"],
            ["Script Dibuat:", "1.020 Naskah"],
            ["Artikel SEO:", "136 Artikel"],
          ]}
        />
      </div>

      <div className="plate-pop p-6 rounded-3xl bg-canvas">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
              Distribusi Sektor Industri
            </span>
            <h2 className="text-lg font-serif text-ink mt-2">Kategori Niche Paling Banyak Memesan</h2>
          </div>
          <span className="text-[10px] font-mono text-stone-600 font-bold">Angka demo</span>
        </div>
        <div className="mt-6 space-y-4 font-mono text-xs">
          {Object.entries(nicheCounts).map(([niche, count]) => {
            const pct = Math.round((count / total) * 100);
            return (
              <div key={niche}>
                <div className="flex justify-between mb-1.5 text-stone-700 font-bold">
                  <span>{niche}</span>
                  <span className="text-ink">
                    {count} Pesanan ({pct}%)
                  </span>
                </div>
                <Bar pct={pct} barClass="bg-terracotta" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="plate-pop p-6 rounded-3xl">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracottaLight text-terracotta">
              Intake Harian
            </span>
            <h2 className="text-lg font-serif text-ink mt-2">Pesanan Masuk — 30 Hari Terakhir</h2>
          </div>
          <span className="text-[10px] font-mono text-stone-600 font-bold">Dihitung real dari timestamp data</span>
        </div>
        <div className="mt-6 flex items-end gap-1 sm:gap-1.5 h-40 sm:h-48" aria-label="Grafik pesanan masuk 30 hari">
          {intakeDays.map((d, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end gap-1 h-full group"
              title={`${fmtDay(d.date)}: ${d.count} pesanan`}
            >
              <span className={`text-[10px] font-mono font-bold ${d.count > 0 ? "text-ink" : "text-stone-400"} opacity-0 group-hover:opacity-100 transition`}>
                {d.count || ""}
              </span>
              <div
                className={`w-full ${i % 5 === 0 ? "bg-terracotta" : "bg-terracotta/60"} hover:bg-ink transition rounded-t-md border border-ink`}
                style={{ height: `${Math.max(2, Math.round((d.count / intakeMax) * 100))}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] font-bold text-stone-600">
          <span>{fmtDay(intakeDays[0].date)}</span>
          <span>{fmtDay(intakeDays[7].date)}</span>
          <span>{fmtDay(intakeDays[14].date)}</span>
          <span>{fmtDay(intakeDays[21].date)}</span>
          <span>{fmtDay(intakeDays[29].date)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="plate-pop p-6 rounded-3xl">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">
            Distribusi Nilai
          </span>
          <h2 className="text-lg font-serif text-ink mt-2">Pendapatan per Niche</h2>
          <div className="mt-6 space-y-4 font-mono text-xs">
            {revenueNiche.map(([niche, rev]) => {
              const totalRev = revenueNiche.reduce((a, [, v]) => a + v, 0) || 1;
              const pct = Math.round((rev / totalRev) * 100);
              return (
                <div key={niche}>
                  <div className="flex justify-between mb-1.5 text-stone-700 font-bold">
                    <span>{niche}</span>
                    <span className="text-ink">
                      {formatRp(rev)} ({pct}%)
                    </span>
                  </div>
                  <Bar pct={pct} barClass="bg-wasabi" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="plate-pop p-6 rounded-3xl">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Mingguan
          </span>
          <h2 className="text-lg font-serif text-ink mt-2">Pendapatan per Minggu (30 Hari)</h2>
          <div className="mt-6 space-y-3 font-mono text-xs">
            {["Minggu 1 (0-7 hr)", "Minggu 2 (7-14 hr)", "Minggu 3 (14-21 hr)", "Minggu 4 (21-30 hr)"].map((label, i) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5 text-stone-700 font-bold">
                  <span>{label}</span>
                  <span className="text-ink">{formatRp(weekly[i])}</span>
                </div>
                <Bar pct={Math.round((weekly[i] / weeklyMax) * 100)} barClass={i === 0 ? "bg-wasabi" : "bg-terracotta"} />
              </div>
            ))}
          </div>
        </div>

        <div className="plate-pop p-6 rounded-3xl">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracottaLight text-terracotta">
            Throughput
          </span>
          <h2 className="text-lg font-serif text-ink mt-2">Volume Deliverable Terkirim</h2>
          <p className="text-[10px] font-mono text-stone-600 font-bold mt-1">
            Dihitung dari batch berstatus selesai (30 naskah + 30 takarir + 4 artikel per batch)
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border-2 border-ink rounded-2xl p-4 bg-canvas shadow-brutal-sm">
              <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">Naskah Video</span>
              <span className="font-serif text-xl text-ink block mt-1">{(done * 30).toLocaleString("id-ID")}</span>
            </div>
            <div className="border-2 border-ink rounded-2xl p-4 bg-canvas shadow-brutal-sm">
              <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">Takarir AIDA</span>
              <span className="font-serif text-xl text-ink block mt-1">{(done * 30).toLocaleString("id-ID")}</span>
            </div>
            <div className="border-2 border-ink rounded-2xl p-4 bg-canvas shadow-brutal-sm">
              <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">Artikel SEO</span>
              <span className="font-serif text-xl text-ink block mt-1">{(done * 4).toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="plate-pop p-6 rounded-3xl">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-ink text-canvas">
            Distribusi
          </span>
          <h2 className="text-lg font-serif text-ink mt-2">Pipeline per Tahap</h2>
          <div className="mt-6 space-y-3 font-mono text-xs">
            {stages.map(([label, key, color, textClass]) => {
              const count = orders.filter((o) => o.status === key).length;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={key}>
                  <div className="flex justify-between mb-1.5 text-stone-700 font-bold">
                    <span>{label}</span>
                    <span className={textClass}>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-white border-2 border-ink h-3.5 rounded-full overflow-hidden p-0.5">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="plate-pop p-6 rounded-3xl">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            SLA Live
          </span>
          <h2 className="text-lg font-serif text-ink mt-2">Kesehatan Pipeline Saat Ini</h2>
          <div className="mt-6 space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-stone-300">
              <span className="text-stone-600">Antrean Kritis (&lt; 6 jam):</span>
              <span className="font-bold text-terracotta">{critical}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-300">
              <span className="text-stone-600">Antrean Aman (&gt; 6 jam):</span>
              <span className="font-bold text-wasabiDark">{safe}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-300">
              <span className="text-stone-600">Menunggu Pembayaran:</span>
              <span className="font-bold text-ink">{pending}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-300">
              <span className="text-stone-600">Batch Terkirim:</span>
              <span className="font-bold text-ink">{done}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}