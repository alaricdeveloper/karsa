import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaminan Layanan, SLA 24 Jam & Kebijakan Kompensasi",
  description:
    "Jaminan SLA 24 jam Karsa Studio — kompensasi gratis 5 naskah tambahan bila terlambat, kalibrasi bebas 48 jam, dan kebijakan kompensasi untuk klien.",
  robots: { index: true, follow: true },
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
