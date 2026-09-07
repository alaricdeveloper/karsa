import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ seo — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ seo Karsa Studio — seo.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
