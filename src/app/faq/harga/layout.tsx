import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ harga — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ harga Karsa Studio — harga.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
