import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string }>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const labels: Record<string, string> = {
    umum: "Umum & Deliverable",
    harga: "Harga & Pembayaran",
    sla: "SLA & Pengiriman",
    revisi: "Revisi & Garansi",
    tiktok: "Jasa Script Video TikTok",
    video: "Jasa Konten Video UMKM",
    creator: "Jasa Content Creator",
    seo: "Jasa Artikel SEO",
    ig: "Paket Konten Instagram",
  };
  const label = labels[kategori] ?? "FAQ";
  return {
    title: `${label} — FAQ`,
    description: `FAQ ${label} Karsa Studio. Jawaban lengkap dari tim Karsa Studio.`,
    alternates: { canonical: `/faq/${kategori}` },
  };
}

export default function FaqCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}