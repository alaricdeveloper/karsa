"use client";

import { useState, useEffect } from "react";

interface ProofItem {
  brand: string;
  location: string;
  minutesAgo: number;
}

const PROOFS: ProofItem[] = [
  { brand: "Brand Skincare Lokal", location: "Surabaya", minutesAgo: 3 },
  { brand: "Kedai Kopi Artisan", location: "Jakarta Selatan", minutesAgo: 11 },
  { brand: "Studio Interior", location: "Bandung", minutesAgo: 24 },
  { brand: "Apparel Streetwear", location: "Yogyakarta", minutesAgo: 42 },
];

export function LiveSocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % PROOFS.length);
        setVisible(true);
      }, 300);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const proof = PROOFS[current];

  return (
    <div
      className={`fixed bottom-16 sm:bottom-6 left-4 z-30 bg-white border-2 border-ink p-2.5 sm:p-3 rounded-2xl shadow-brutal flex items-center gap-2.5 sm:gap-3 max-w-[280px] sm:max-w-xs transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-wasabi text-ink border-2 border-ink flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm">
        &#10003;
      </div>
      <div className="font-mono text-[9px] sm:text-[10px] leading-tight">
        <span className="font-bold text-ink block truncate">{proof.brand} ({proof.location})</span>
        <span className="text-stone-500">Baru memesan batch 30 hari &bull; {proof.minutesAgo}m lalu</span>
      </div>
    </div>
  );
}
