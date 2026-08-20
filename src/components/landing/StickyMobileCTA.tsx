"use client";

import { useEffect, useRef, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(true);
  const orderRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    orderRef.current = document.getElementById("order");
    if (!orderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(orderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t-2 border-ink lg:hidden z-30 flex items-center justify-between shadow-brutal transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div>
        <div className="text-[10px] font-mono uppercase text-stone-500 font-bold">30 Naskah + 4 SEO Docs</div>
        <div className="text-sm font-bold font-mono text-terracotta">Rp299.000</div>
      </div>
      <a href="#order" className="px-4 sm:px-5 py-2.5 bg-ink text-canvas text-xs font-mono font-bold rounded-xl shadow-brutal flex items-center gap-1">
        Pesan Batch &rarr;
      </a>
    </div>
  );
}
