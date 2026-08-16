import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { OrderStatus, SLAInfo } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOrderId(): string {
  return "INV-" + Math.floor(100000 + Math.random() * 900000);
}

export function formatCurrency(amount: number): string {
  return "Rp" + amount.toLocaleString("id-ID");
}

export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function calculateSLA(timestamp: string, status: OrderStatus): SLAInfo {
  if (status === "COMPLETED")
    return {
      text: "Selesai Terkirim",
      className: "text-emerald-700 bg-emerald-100/60",
      level: "done",
    };
  if (status === "PENDING_PAYMENT")
    return {
      text: "Menunggu Bayar",
      className: "text-stone-500 bg-stone-100",
      level: "pending",
    };

  const deadline = new Date(
    new Date(timestamp).getTime() + 24 * 60 * 60 * 1000
  );
  const remainingMs = deadline.getTime() - Date.now();

  if (remainingMs <= 0)
    return {
      text: "SLA Terlewati",
      className: "text-rose-700 bg-rose-100 font-bold",
      level: "overdue",
    };

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours < 6)
    return {
      text: `Sisa ${hours}j ${mins}m`,
      className: "text-amber-800 bg-amber-100 font-bold",
      level: "warning",
    };
  return {
    text: `Sisa ${hours}j ${mins}m`,
    className: "text-indigo-800 bg-indigo-100",
    level: "ok",
  };
}

export function calculateDaysLeft(timestamp: string): number {
  const deadline = new Date(
    new Date(timestamp).getTime() + 30 * 24 * 60 * 60 * 1000
  );
  const remainingMs = deadline.getTime() - Date.now();
  return Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
}

export function calculateRevenue(
  orders: { status: OrderStatus }[]
): number {
  return orders.filter(
    (o) =>
      o.status === "IN_PROGRESS" ||
      o.status === "QC_REVIEW" ||
      o.status === "COMPLETED"
  ).length * 299000;
}

export function generateScript(
  day: number,
  brand: string,
  description: string,
  category: string
) {
  const hook = `[Hook 3s] Kenapa banyak orang masih salah pakai produk di industri ${category}? Ini perbandingan nyatanya...`;
  const body = `Di ${brand}, kami merancang: "${description}". Hasilnya jauh lebih praktis dan hemat waktu tanpa drama.`;
  const cta = `"Ketik 'MAU' di DM ${brand} untuk klaim penawaran batch ini sekarang juga!"`;
  return { hook, body, cta };
}

export function generateCaption(
  brand: string,
  description: string,
  category: string
): string {
  return `${description}\n\nSimpan postingan ini dan bagikan ke teman yang butuh solusi serupa di ${category}!\n\n#${brand.replace(/\s+/g, "")} #umkmindonesia #kontenviral`;
}
