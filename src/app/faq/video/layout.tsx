import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ video — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ video Karsa Studio — video.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
