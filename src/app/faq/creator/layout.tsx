import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ creator — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ creator Karsa Studio — creator.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
