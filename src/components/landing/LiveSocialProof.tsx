"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ProofItem {
  brand: string;
  location: string;
  time: string;
}

const PROOFS: ProofItem[] = [
  { brand: "Brand Skincare Lokal", location: "Surabaya", time: "3 menit lalu" },
  { brand: "Kedai Kopi Artisan", location: "Jakarta Selatan", time: "11 menit lalu" },
  { brand: "Studio Interior", location: "Bandung", time: "24 menit lalu" },
  { brand: "Apparel Streetwear", location: "Yogyakarta", time: "42 menit lalu" },
];

export function LiveSocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let hideTimer: number | undefined;
    const showProof = () => {
      setCurrent((index) => (index + 1) % PROOFS.length);
      setVisible(true);
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setVisible(false), 4500);
    };
    const firstTimer = window.setTimeout(() => {
      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), 4500);
    }, 2000);
    const interval = window.setInterval(showProof, 12000);
    return () => {
      window.clearTimeout(firstTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      window.clearInterval(interval);
    };
  }, []);

  if (dismissed) return null;
  const proof = PROOFS[current];

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className={`fixed bottom-20 sm:bottom-24 xl:bottom-6 left-4 z-30 bg-white border-2 border-ink p-2.5 sm:p-3 rounded-2xl shadow-brutal flex items-center gap-2.5 sm:gap-3 max-w-[280px] sm:max-w-xs transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-wasabi text-ink border-2 border-ink flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm" aria-hidden="true">✓</div>
      <div className="font-mono text-[9px] sm:text-[10px] leading-tight"><span className="font-bold text-ink block truncate">{proof.brand} ({proof.location})</span><span className="text-stone-500">Baru memesan batch 30 hari &bull; {proof.time}</span></div>
      <button type="button" onClick={() => setDismissed(true)} aria-label="Tutup notifikasi order" className="p-1 text-stone-400 hover:text-ink transition shrink-0"><X className="w-3.5 h-3.5" aria-hidden="true" /></button>
    </div>
  );
}
