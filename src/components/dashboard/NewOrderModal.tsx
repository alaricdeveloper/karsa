"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";

type Props = {
  onClose: () => void;
  defaults: {
    brand: string;
    category: string;
    competitor: string;
    email: string;
    phone: string;
  };
};

export function NewOrderModal({ onClose, defaults }: Props) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [inBrand, setInBrand] = useState(defaults.brand);
  const [inCategory, setInCategory] = useState(defaults.category);
  const [inCompetitor, setInCompetitor] = useState(defaults.competitor);
  const [inDesc, setInDesc] = useState("");
  const [inEmail, setInEmail] = useState(defaults.email);
  const [inPhone, setInPhone] = useState(defaults.phone);

  // Kunci scroll body saat terbuka + fokus pertama
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    document.getElementById("inBrand")?.focus();
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  // Escape & focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      if (e.key === "Escape") {
        onClose();
        document.body.classList.remove("overflow-hidden");
        return;
      }
      if (e.key === "Tab") {
        const focusables = modalRef.current.querySelectorAll("input, select, textarea, button, a[href]");
        const list = Array.from(focusables).filter((el) => (el as HTMLElement).offsetParent !== null);
        if (list.length === 0) return;
        const first = list[0] as HTMLElement;
        const last = list[list.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "INV-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      brand: inBrand.trim(),
      category: inCategory,
      competitor: inCompetitor.trim(),
      description: inDesc.trim(),
      email: inEmail.trim(),
      phone: inPhone.trim(),
      timestamp: new Date().toISOString(),
      status: "PENDING",
    };
    localStorage.setItem("karsa_checkout_" + orderId, JSON.stringify(orderData));
    onClose();
    router.push("/checkout?id=" + orderId);
  };

  return (
<div ref={modalRef} id="modalNewBatch" role="dialog" aria-modal="true" aria-labelledby="modalNewBatchTitle" className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-white border-t-2 sm:border-2 border-ink rounded-t-3xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-brutal-lg font-sans text-xs max-h-[90vh] overflow-y-auto">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-3 sm:hidden" aria-hidden="true"></div>

          <div className="flex justify-between items-center pb-3 border-b-2 border-ink mb-4">
            <div>
              <span className="badge-tag px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sunflower text-ink">SLA 24 Jam</span>
              <h3 id="modalNewBatchTitle" className="text-base sm:text-xl font-bold font-serif text-ink mt-1">Formulir Brief Kalender 30 Hari</h3>
            </div>
            <button onClick={onClose} className="text-stone-600 hover:text-ink p-1.5 min-w-[40px] min-h-[40px] flex items-center justify-center font-bold border-2 border-ink rounded-xl bg-canvas" aria-label="Tutup formulir"><X className="w-4 h-4" /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            <div>
              <label htmlFor="inBrand" className="block text-ink text-xs mb-1 font-bold">Nama Brand / Bisnis *</label>
              <input type="text" id="inBrand" required placeholder="Contoh: Kopi Teras Senja" value={inBrand} onChange={(e) => setInBrand(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inCategory" className="block text-ink text-xs mb-1 font-bold">Kategori Industri *</label>
                <select id="inCategory" value={inCategory} onChange={(e) => setInCategory(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px] font-bold">
                  <option value="Kuliner / F&B">Kuliner / F&B</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Skincare & Beauty">Skincare & Beauty</option>
                  <option value="Jasa Profesional">Jasa Profesional</option>
                  <option value="Gadget / Elektronik">Gadget / Elektronik</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="inCompetitor" className="block text-ink text-xs mb-1 font-bold">1 Akun Kompetitor</label>
                <input type="text" id="inCompetitor" placeholder="@namakompetitor" value={inCompetitor} onChange={(e) => setInCompetitor(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
            </div>

            <div>
              <label htmlFor="inDesc" className="block text-ink text-xs mb-1 font-bold">Deskripsi Produk & Target Pembeli *</label>
              <textarea id="inDesc" rows={3} required placeholder="Jelaskan produk unggulan, rentang harga, dan siapa pembeli utama Anda..." value={inDesc} onChange={(e) => setInDesc(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inEmail" className="block text-ink text-xs mb-1 font-bold">Email Penerima File *</label>
                <input type="email" id="inEmail" required placeholder="nama@email.com" value={inEmail} onChange={(e) => setInEmail(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
              <div>
                <label htmlFor="inPhone" className="block text-ink text-xs mb-1 font-bold">Nomor WhatsApp Aktif *</label>
                <input type="tel" id="inPhone" required placeholder="081234567890" value={inPhone} onChange={(e) => setInPhone(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
            </div>

            <div className="pt-3 border-t-2 border-ink">
              <button type="submit" className="w-full py-4 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 text-xs sm:text-sm min-h-[48px] shadow-brutal font-mono">
                <span>Kirim Brief & Buat Tagihan (Rp299.000)</span>
                <ArrowRight className="w-4 h-4 text-wasabi" />
              </button>
              <p className="text-center text-[10px] text-stone-600 mt-2 font-mono font-bold">Garansi kalibrasi penyesuaian sudut pesan 48 jam gratis.</p>
            </div>
          </form>
        </div>
      </div>
  );
}
