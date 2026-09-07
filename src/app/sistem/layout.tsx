import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistem Konten 30 Hari & Strategi Video UMKM",
  description:
    "Cara kerja di balik Karsa Studio — sistem produksi konten 30 hari, strategi video pendek untuk UMKM, pipeline SEO, dan Notion Content OS.",
  robots: { index: true, follow: true },
};

export default function SistemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
