import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — 90 Pertanyaan Terjawab",
  description:
    "Pusat bantuan Karsa Studio — 90 pertanyaan dalam 9 kategori: harga, SLA, revisi, TikTok, video, creator, SEO, dan Instagram.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
