"use client";

import { useEffect, useState } from "react";

export function StickyCta() {
  const [stickyHidden, setStickyHidden] = useState(false);

  // Sembunyi saat section order terlihat
  useEffect(() => {
    const order = document.getElementById("order");
    if (!order) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setStickyHidden(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(order);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="stickyCta"
      className={`fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t-2 border-ink xl:hidden z-30 flex items-center justify-between shadow-brutal transition-transform duration-300 ${stickyHidden ? "translate-y-full" : ""}`}
    >
      <div>
        <div className="text-[10px] font-mono uppercase text-stone-500 font-bold">30 Naskah + 4 SEO Docs</div>
        <div className="text-sm font-bold font-mono text-terracotta">Rp299.000</div>
      </div>
      <div className="flex items-center gap-2">
        <a href="https://wa.me/6281288009920?text=Halo%20Karsa%20Studio%2C%20saya%20mau%20tanya%20paket%20konten" target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp Karsa Studio" className="w-10 h-10 rounded-xl bg-wasabi text-ink font-mono font-bold text-lg shadow-brutal-sm flex items-center justify-center">&#128172;</a>
        <a href="#order" className="px-4 sm:px-5 py-2.5 bg-ink text-canvas text-sm font-mono font-bold rounded-xl shadow-brutal flex items-center gap-1">
          Isi Brief &rarr;
        </a>
      </div>
    </div>
  );
}