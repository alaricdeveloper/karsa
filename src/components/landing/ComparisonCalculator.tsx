"use client";

import { useState } from "react";

export function ComparisonCalculator() {
  const [hours, setHours] = useState(6);
  const [agencyCost, setAgencyCost] = useState(3_500_000);

  const monthlySaved = hours * 4;
  const karsaFee = 299_000;
  const totalSaved = agencyCost - karsaFee;

  const formatRupiah = (n: number) =>
    "Rp " + n.toLocaleString("id-ID");

  return (
    <section id="calculator" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="badge-tag bg-wasabi text-ink px-3 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
            Kalkulator Penghematan
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-ink mt-3">
            Berapa Banyak Waktu &amp; Uang yang Kamu Hemat?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* LEFT — Sliders */}
          <div className="bento-pop rounded-3xl p-6 sm:p-8 bg-canvas">
            <div className="space-y-8">
              {/* Hours slider */}
              <div>
                <label className="text-xs font-mono text-ink/70 block mb-2">
                  Jam Mikir Konten / Minggu:
                </label>
                <input
                  type="range"
                  min={2}
                  max={15}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-ink/50 mt-1">
                  <span>2 jam</span>
                  <span className="font-bold text-terracotta text-sm">{hours} jam</span>
                  <span>15 jam</span>
                </div>
              </div>

              {/* Agency cost slider */}
              <div>
                <label className="text-xs font-mono text-ink/70 block mb-2">
                  Biaya Hire Agensi Bulanan:
                </label>
                <input
                  type="range"
                  min={1_500_000}
                  max={8_000_000}
                  step={250_000}
                  value={agencyCost}
                  onChange={(e) => setAgencyCost(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-ink/50 mt-1">
                  <span>Rp 1,5M</span>
                  <span className="font-bold text-terracotta text-sm">
                    {formatRupiah(agencyCost)}
                  </span>
                  <span>Rp 8M</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div className="bento-pop rounded-3xl p-6 sm:p-8 bg-wasabi/20">
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-mono uppercase text-ink/60">
                  Waktu yang Dihemat:
                </span>
                <p className="text-xl sm:text-2xl font-bold font-serif text-ink mt-0.5">
                  {monthlySaved} Jam / Bulan
                </p>
              </div>

              <div className="border-t-2 border-ink/10 pt-4">
                <span className="text-[11px] font-mono uppercase text-ink/60">
                  Biaya Karsa Studio:
                </span>
                <p className="text-xl sm:text-2xl font-bold font-serif text-ink mt-0.5">
                  {formatRupiah(karsaFee)}
                </p>
              </div>

              <div className="border-t-2 border-ink/10 pt-4">
                <span className="text-[11px] font-mono uppercase text-ink/60">
                  Total Penghematan:
                </span>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-terracotta mt-0.5">
                  {formatRupiah(totalSaved)}
                </p>
              </div>

              <button className="bento-pop bg-ink text-canvas font-bold text-sm px-6 py-3 rounded-2xl w-full hover:bg-terracotta transition-colors mt-2">
                Klaim Penghematan — Buat Brief →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
