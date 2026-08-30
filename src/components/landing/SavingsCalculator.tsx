"use client";

import { useState } from "react";

export function SavingsCalculator() {
  const [hours, setHours] = useState(6);
  const [agencyPrice, setAgencyPrice] = useState(3500000);
  const savedHours = hours * 4;
  const netSavings = agencyPrice - 299000;

  return (
    <section id="calculator" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Kalkulator Penghematan</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Hitung waktu dan biaya yang bisa kamu pangkas.</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Bandingkan biaya satu batch Karsa dengan biaya perencanaan konten yang biasanya kamu keluarkan.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
          <div className="bento-pop p-5 sm:p-6 rounded-3xl bg-surface space-y-4 sm:space-y-5">
            <div>
              <div className="flex justify-between font-bold text-ink mb-2">
                <span>Jam Merencanakan Konten / Minggu:</span>
                <span className="text-terracotta text-sm font-bold">{hours} Jam</span>
              </div>
              <input type="range" id="sliderHours" aria-label="Jam merencanakan konten per minggu" min={2} max={15} step={1} value={hours} onChange={(event) => setHours(parseInt(event.target.value))} className="w-full accent-terracotta cursor-pointer py-1.5" />
            </div>
            <div>
              <div className="flex justify-between font-bold text-ink mb-2">
                <span>Biaya Tim / Agensi per Bulan:</span>
                <span className="text-terracotta text-sm font-bold">Rp{agencyPrice.toLocaleString("id-ID")}</span>
              </div>
              <input type="range" id="sliderAgency" aria-label="Biaya tim atau agensi per bulan" min={1500000} max={8000000} step={250000} value={agencyPrice} onChange={(event) => setAgencyPrice(parseInt(event.target.value))} className="w-full accent-terracotta cursor-pointer py-1.5" />
            </div>
          </div>
          <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between space-y-4 bg-wasabi/20">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                <span className="text-stone-700 font-bold">Waktu Perencanaan / Bulan:</span>
                <span className="text-sm sm:text-base font-bold text-ink font-serif">{savedHours} Jam / Bulan</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                <span className="text-stone-700 font-bold">Biaya Karsa Studio:</span>
                <span className="text-sm sm:text-base font-bold text-ink font-serif">Rp299.000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                <span className="text-stone-700 font-bold">Selisih Biaya:</span>
                <span className="text-lg sm:text-2xl font-bold text-terracotta font-serif">Rp{netSavings.toLocaleString("id-ID")} / Bulan</span>
              </div>
            </div>
            <a href="#order" className="bento-pop bg-ink text-canvas hover:bg-terracotta hover:text-ink py-3.5 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-center min-h-[46px] sm:min-h-[48px]">
              <span>Lihat paket &amp; isi brief &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}