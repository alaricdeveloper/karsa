"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface ProofItem {
  brand: string;
  location: string;
}

const PROOFS: ProofItem[] = [
  { brand: "Brand Skincare Lokal", location: "Surabaya" },
  { brand: "Kedai Kopi Artisan", location: "Jakarta Selatan" },
  { brand: "Studio Interior", location: "Bandung" },
  { brand: "Apparel Streetwear", location: "Yogyakarta" },
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
  const minutesAgo = 2 + current * 3;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-4 z-30">
      <div
        className={`bg-white border-2 border-ink p-2.5 sm:p-3 rounded-2xl shadow-brutal flex items-center gap-3 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-wasabi text-ink border-2 border-ink flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="text-xs">
          <span className="font-bold text-ink">{proof.brand}</span>{" "}
          <span className="text-stone-500">baru pesan {minutesAgo} menit lalu</span>
        </div>
      </div>
    </div>
  );
}
