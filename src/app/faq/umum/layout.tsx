import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ umum — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ umum Karsa Studio — umum.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
