"use client";

import { useState } from "react";
import type { RevisionEntry } from "./hub-lib";

export function RevisionForm({
  orderId,
  brand,
  revisions,
  onAddRevision,
}: {
  orderId: string;
  brand: string;
  revisions: RevisionEntry[];
  onAddRevision: (entry: RevisionEntry) => void;
}) {
  const [days, setDays] = useState("");
  const [notes, setNotes] = useState("");
  const [coverageOpen, setCoverageOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: RevisionEntry = {
      id: `rev-${Date.now()}`,
      days,
      notes,
      ts: new Date().toISOString(),
      status: "menunggu",
    };
    onAddRevision(entry);
    setDays("");
    setNotes("");

    const phone = "6281288009920";
    const msg = `Halo Tim Karsa, saya ingin mengajukan kalibrasi untuk Order ${orderId} (${brand}):\n\nHari: ${entry.days}\nCatatan: ${entry.notes}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-ink text-canvas border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono font-bold text-sm shrink-0">
          05
        </span>
        <div>
          <h2 className="font-serif font-normal text-xl sm:text-2xl text-ink leading-tight">Portal Kalibrasi 48 Jam</h2>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Garansi penyesuaian sudut pesan gratis dalam 48 jam.</p>
        </div>
      </div>

      <div className="bento-pop p-6 sm:p-8 rounded-3xl font-mono text-xs space-y-4 max-w-2xl bg-white">
        <div>
          <span className="badge-tag px-3 py-1 rounded-full text-[10px] font-bold bg-wasabi text-ink">Garansi Resmi</span>
          <h3 className="font-serif font-normal text-xl text-ink mt-2">Ajukan Penyesuaian Sudut Pesan (Revisi)</h3>
          <p className="text-inkMuted text-xs font-sans mt-1">Garansi kalibrasi gratis 48 jam jika ada istilah teknis atau tone brand yang perlu diselaraskan.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="revDays" className="block text-ink font-bold mb-1">Pilih Nomor Hari yang Ingin Diubah:</label>
            <input
              id="revDays"
              type="text"
              required
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Contoh: Day 03, Day 12"
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-sm sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
            />
          </div>
          <div>
            <label htmlFor="revNotes" className="block text-ink font-bold mb-1">Catatan Detail Perubahan:</label>
            <textarea
              id="revNotes"
              rows={4}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan penyesuaian yang diinginkan..."
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-sm sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-2xl font-bold transition min-h-[48px] shadow-brutal text-xs font-mono"
          >
            Kirim Catatan Revisi ke Tim &rarr;
          </button>
        </form>

        <button
          onClick={() => setCoverageOpen(!coverageOpen)}
          className="text-terracotta hover:underline font-bold text-xs font-mono min-h-[44px]"
        >
          Cakupan garansi 48 jam <span>{coverageOpen ? "−" : "+"}</span>
        </button>
        {coverageOpen && (
          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl space-y-2 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
            <div>
              <span className="font-bold text-wasabiDark font-mono text-xs block mb-1">DICAKUP GRATIS</span>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>Istilah teknis yang salah atau kurang pas untuk industri Anda</li>
                <li>Tone &amp; gaya bahasa yang perlu diselaraskan ke brand voice</li>
                <li>Sudut pesan (angle) yang terasa kurang kuat di hari tertentu</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-terracotta font-mono text-xs block mb-1">TIDAK DICAKUP</span>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>Permintaan topik baru di luar 30 hari yang sudah disusun</li>
                <li>Penulisan ulang penuh (rewrite) seluruh batch</li>
                <li>Permintaan yang masuk setelah 48 jam sejak delivery</li>
              </ul>
            </div>
          </div>
        )}

        <div className="pt-4 border-t-2 border-ink space-y-2.5">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="font-serif font-normal text-base text-ink">Riwayat Pengajuan</span>
            <span className="text-[10px] text-inkMuted font-mono font-bold">{revisions.length} pengajuan</span>
          </div>
          <div className="space-y-2">
            {revisions.length === 0 ? (
              <p className="text-[11px] text-inkMuted font-sans">Belum ada pengajuan revisi. Gunakan form di atas — gratis dalam 48 jam setelah delivery.</p>
            ) : (
              revisions.map((r) => (
                <div key={r.id} className="p-3 bg-canvas border-2 border-ink rounded-xl flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-mono font-bold text-[10px] text-ink block">{fmt(r.ts)} — {r.days}</span>
                    <p className="font-sans text-xs text-stone-700 mt-0.5">{r.notes}</p>
                  </div>
                  <span
                    className={`${
                      r.status === "direspon" ? "bg-wasabi text-ink" : "bg-sunflower text-ink"
                    } px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 border-2 border-ink`}
                  >
                    {r.status === "direspon" ? "Sudah Direspon" : "Menunggu Respon"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}