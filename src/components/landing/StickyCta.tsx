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
      <a href="#order" className="px-4 sm:px-5 py-2.5 bg-ink text-canvas text-xs font-mono font-bold rounded-xl shadow-brutal flex items-center gap-1">
        Isi Brief &rarr;
      </a>
    </div>
  );
}