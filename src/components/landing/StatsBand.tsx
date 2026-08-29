"use client";

import { useEffect } from "react";

export function StatsBand() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-count]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      els.forEach((el) => {
        const target = parseFloat((el as HTMLElement).dataset.count || "0");
        (el as HTMLElement).textContent = target.toLocaleString("id-ID") + ((el as HTMLElement).dataset.suffix || "");
      });
      return;
    }
    els.forEach((el) => {
      const target = parseFloat((el as HTMLElement).dataset.count || "0");
      const suffix = (el as HTMLElement).dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        (el as HTMLElement).textContent = val.toLocaleString("id-ID") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, []);

  return (
    <section id="stats" className="py-10 sm:py-14 border-b-2 border-ink bg-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="sr-only">Angka Karsa Studio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-white text-center">
            <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="30">30</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">Naskah video kata-per-kata</span>
          </div>
          <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-sunflower/60 text-center">
            <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="24" data-suffix=" Jam">24 Jam</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">SLA pengiriman maksimal</span>
          </div>
          <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-white text-center">
            <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="40" data-suffix="+">40+</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">Brand UMKM terlayani</span>
          </div>
          <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-wasabi/40 text-center">
            <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="92" data-suffix="%">92%</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">Customer kembali pesan batch</span>
          </div>
        </div>
      </div>
    </section>
  );
}