import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Layanan (Terms of Service)",
  description:
    "Master Service Agreement (MSA) Karsa Studio — ketentuan pengerjaan, hak kekayaan intelektual, jadwal pengiriman, dan jaminan SLA.",
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
