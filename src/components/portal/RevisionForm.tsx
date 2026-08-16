"use client";

import { useState } from "react";

interface RevisionFormProps {
  orderId: string;
  brand: string;
}

export function RevisionForm({ orderId, brand }: RevisionFormProps) {
  const [revDays, setRevDays] = useState("");
  const [revNotes, setRevNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revDays.trim() || !revNotes.trim()) return;

    const phone = "6281288009920";
    const msg = `Halo Tim Karsa, saya ingin mengajukan kalibrasi untuk Order ${orderId} (${brand}):\n\nHari: ${revDays}\nCatatan: ${revNotes}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="space-y-4">
      <div className="bg-white border border-[#E5E5E0] p-5 sm:p-8 rounded-2xl font-mono text-xs space-y-4 max-w-2xl mx-auto">
        <div>
          <h3 className="font-serif font-bold text-lg text-sand-900">Ajukan Penyesuaian Sudut Pesan (Revisi)</h3>
          <p className="text-stone-600 text-xs font-sans mt-1">
            Garansi kalibrasi gratis 48 jam jika ada istilah teknis atau tone brand yang perlu diselaraskan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-stone-700 mb-1">Pilih Nomor Hari yang Ingin Diubah:</label>
            <input
              type="text"
              value={revDays}
              onChange={(e) => setRevDays(e.target.value)}
              required
              placeholder="Contoh: Day 03, Day 12"
              className="w-full bg-sand-50 border border-sand-300 rounded-lg p-2.5 text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-stone-700 mb-1">Catatan Detail Perubahan:</label>
            <textarea
              value={revNotes}
              onChange={(e) => setRevNotes(e.target.value)}
              rows={4}
              required
              placeholder="Jelaskan penyesuaian yang diinginkan..."
              className="w-full bg-sand-50 border border-sand-300 rounded-lg p-2.5 text-sand-900 focus:outline-none focus:border-sand-900 text-xs sm:text-sm font-sans"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl font-medium transition min-h-[44px]"
          >
            Kirim Catatan Revisi ke Tim
          </button>
        </form>
      </div>
    </section>
  );
}
