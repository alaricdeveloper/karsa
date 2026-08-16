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
      className={`fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-sand-300 md:hidden z-30 flex items-center justify-between shadow-lg transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div>
        <div className="text-[10px] font-mono uppercase text-stone-500">Paket 30 Hari + 5 Bonus</div>
        <div className="text-sm font-bold font-mono text-sand-900">Rp299.000</div>
      </div>
      <a href="#order" className="px-5 py-2.5 bg-sand-900 text-sand-50 text-xs font-medium rounded-lg shadow-sm min-h-[40px] flex items-center">
        Pesan Sekarang &rarr;
      </a>
    </div>
  );
}
