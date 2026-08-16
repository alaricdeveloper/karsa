import type { Order } from "@/lib/types";

interface CompetitorRadarProps {
  order: Order;
}

export function CompetitorRadar({ order }: CompetitorRadarProps) {
  const competitor = order.competitor || "kompetitor utama";

  const analysis = `Berdasarkan audit terhadap ${competitor}, pasar saat ini jenuh dengan konten hard-selling statis. Kelemahan terbesar kompetitor adalah kurangnya video edukasi personal.

Rekomendasi positioning ${order.brand}:
1. Angkat transparansi bahan & proses pembuatan pada 10 hari pertama.
2. Terapkan visual hook perbandingan langsung (before-after) pada naskah video pendek.
3. Gunakan CTA langsung ke WhatsApp/DM untuk melayani konsultasi ramah.`;

  return (
    <section className="space-y-4">
      <div className="bg-white border border-[#E5E5E0] p-6 rounded-2xl font-mono text-xs space-y-4">
        <div>
          <span className="text-xs font-mono uppercase text-stone-500">Positioning &amp; Gap Analysis</span>
          <h3 className="font-serif font-bold text-lg text-sand-900 mt-1">Audit Celah Pasar &amp; Sudut Diferensiasi</h3>
        </div>
        <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line">
          {analysis}
        </p>
      </div>
    </section>
  );
}
