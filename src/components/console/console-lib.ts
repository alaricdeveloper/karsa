import type { Order } from "@/lib/types";

export const ORDER_VALUE = 299000;
export const DB_VERSION = "v8_konso_orkestrasi";
export const DB_VERSION_KEY = "omni_db_version";
export const WA_TEMPLATE_KEY = "omni_wa_template";
export const DEFAULT_TONE_KEY = "omni_default_tone";
export const PROMPT_HISTORY_KEY = "omni_prompt_history";
export const LAST_SYNC_KEY = "omni_last_sync";

export const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Menunggu Bayar",
  IN_PROGRESS: "Penyusunan",
  QC_REVIEW: "Kurasi QC",
  COMPLETED: "Selesai",
};

export const STATUS_FULL_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Pending Invoice",
  IN_PROGRESS: "Penyusunan Konten",
  QC_REVIEW: "Kurasi & QC Review",
  COMPLETED: "Selesai Terkirim",
};

export interface SLAInfo {
  text: string;
  className: string;
  level: "done" | "pending" | "overdue" | "warning" | "ok";
}

export function calculateSLA(timestamp: string, status: string, now: number): SLAInfo {
  if (status === "COMPLETED") {
    return { text: "Selesai Terkirim", className: "text-ink bg-wasabi border-2 border-ink font-bold", level: "done" };
  }
  if (status === "PENDING_PAYMENT") {
    return { text: "Menunggu Bayar", className: "text-stone-600 bg-canvas border border-ink", level: "pending" };
  }

  const deadline = new Date(new Date(timestamp).getTime() + 24 * 60 * 60 * 1000).getTime();
  const remainingMs = deadline - now;

  if (remainingMs <= 0) {
    return { text: "SLA Terlewati", className: "text-white bg-terracotta border-2 border-ink font-bold", level: "overdue" };
  }

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours < 6) {
    return { text: `Sisa ${hours}j ${mins}m`, className: "text-ink bg-sunflower border-2 border-ink font-bold", level: "warning" };
  }
  return { text: `Sisa ${hours}j ${mins}m`, className: "text-ink bg-terracottaLight border border-ink font-bold", level: "ok" };
}

export function isSlaCritical(order: Order, now: number): boolean {
  if (order.status === "COMPLETED" || order.status === "PENDING_PAYMENT") return false;
  const deadline = new Date(new Date(order.created_at).getTime() + 24 * 60 * 60 * 1000).getTime();
  const rem = deadline - now;
  return rem > 0 && rem < 6 * 60 * 60 * 1000;
}

export function isSlaOverdue(order: Order, now: number): boolean {
  if (order.status === "COMPLETED" || order.status === "PENDING_PAYMENT") return false;
  const deadline = new Date(new Date(order.created_at).getTime() + 24 * 60 * 60 * 1000).getTime();
  return deadline - now <= 0;
}

export function slaRemainingSafe(order: Order, now: number): boolean {
  if (order.status === "COMPLETED" || order.status === "PENDING_PAYMENT") return false;
  const deadline = new Date(new Date(order.created_at).getTime() + 24 * 60 * 60 * 1000).getTime();
  return deadline - now >= 6 * 60 * 60 * 1000;
}

export type DateFilter = "all" | "today" | "7d" | "30d";

export function getFilteredOrders(
  orders: Order[],
  search: string,
  statusFilter: string,
  dateFilter: DateFilter,
  now: number
): Order[] {
  const query = search.toLowerCase();
  return orders.filter((order) => {
    const matchSearch =
      order.brand.toLowerCase().includes(query) ||
      order.order_id.toLowerCase().includes(query);
    const matchStatus = statusFilter === "ALL" || order.status === statusFilter;
    let matchDate = true;
    const t = new Date(order.created_at).getTime();
    if (dateFilter === "today") {
      matchDate = new Date(order.created_at).toDateString() === new Date(now).toDateString();
    }
    if (dateFilter === "7d") matchDate = now - t <= 7 * 24 * 3600 * 1000;
    if (dateFilter === "30d") matchDate = now - t <= 30 * 24 * 3600 * 1000;
    return matchSearch && matchStatus && matchDate;
  });
}

export const DEFAULT_WA_TEMPLATE = `Halo {brand}, tim Karsa Studio telah menyelesaikan penyusunan Kalender Konten 30 Hari Anda (Order ID: {orderId}).

Akses ruang kerja Notion Anda di sini:
{notionUrl}

Jika ada pertanyaan atau penyesuaian sudut pesan dalam 48 jam, silakan balas pesan ini. Terima kasih!`;

export function applyWaTemplate(template: string, data: { brand: string; orderId: string; notionUrl: string }) {
  return template
    .replace(/\{brand\}/g, data.brand)
    .replace(/\{orderId\}/g, data.orderId)
    .replace(/\{notionUrl\}/g, data.notionUrl || "(belum ada link Notion)");
}

export function readAudit(orderId: string): { ts: string; action: string }[] {
  try {
    return JSON.parse(localStorage.getItem(`omni_audit_${orderId}`) || "[]");
  } catch {
    return [];
  }
}

export function appendAudit(orderId: string, action: string) {
  const audit = readAudit(orderId);
  audit.push({ ts: new Date().toISOString(), action });
  localStorage.setItem(`omni_audit_${orderId}`, JSON.stringify(audit.slice(-30)));
}

export function formatRp(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

export function formatIdShort(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}