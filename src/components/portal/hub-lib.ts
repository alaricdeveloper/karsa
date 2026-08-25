import type { Order, ContentItem, SeoArticle } from "@/lib/types";

export const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Menunggu Bayar",
  IN_PROGRESS: "Penyusunan Konten",
  QC_REVIEW: "Tahap Kurasi QC",
  COMPLETED: "Selesai Terkirim",
};

export const PILLAR_NAMES = ["Edukasi Nilai", "Storytelling Nyata", "Hard Sell & Promo", "Mitos vs Fakta"];
export const PILLAR_DOTS = ["bg-sunflower", "bg-terracotta", "bg-wasabi", "bg-ink"];
export const PILLAR_BADGES = ["bg-sunflower text-ink", "bg-terracotta text-ink", "bg-wasabi text-ink", "bg-ink text-canvas"];

export function pillarIndex(day: number): number {
  return (day - 1) % 4;
}

export function statusBadgeClass(status: string): string {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-sunflower text-ink";
    case "QC_REVIEW":
      return "bg-terracottaLight text-terracotta";
    case "COMPLETED":
      return "bg-wasabi text-ink";
    default:
      return "bg-white text-inkMuted";
  }
}

export function formatDateId(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export interface SlaChip {
  text: string;
  className: string;
}

export function slaChip(order: Order, now: number): SlaChip {
  if (order.status === "COMPLETED") {
    return { text: "Terkirim Sesuai SLA", className: "bg-wasabi text-ink" };
  }
  const deadline = new Date(order.created_at).getTime() + 24 * 3600 * 1000;
  const remaining = deadline - now;
  if (remaining <= 0) {
    return { text: "SLA Terlewati — Hubungi Tim", className: "bg-terracotta text-white" };
  }
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const text = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} tersisa`;
  const cls = remaining < 6 * 3600 * 1000 ? "bg-sunflower text-ink" : "bg-terracottaLight text-ink";
  return { text, className: cls };
}

export function doneStepsFor(status: string): number {
  if (status === "PENDING_PAYMENT") return 1;
  if (status === "IN_PROGRESS") return 2;
  if (status === "QC_REVIEW") return 3;
  return 4;
}

export function dayStr(day: number): string {
  return day < 10 ? `0${day}` : `${day}`;
}

export function readRevisions(orderId: string): RevisionEntry[] {
  try {
    const raw = localStorage.getItem(`omni_revision_${orderId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function readChecklist(orderId: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(`omni_deliv_${orderId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export interface RevisionEntry {
  id: string;
  days: string;
  notes: string;
  ts: string;
  status: "menunggu" | "direspon";
}

export function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function buildDayExport(order: Order, item: ContentItem | undefined, day: number): string {
  const dayStrPad = dayStr(day);
  const pillar = item?.pillar || "Konten";
  return [
    `KARSA STUDIO — DAY ${dayStrPad} (${order.brand})`,
    `Order ID: ${order.order_id} | Pilar: ${pillar}`,
    `==========================================================`,
    ``,
    `[NASKAH]`,
    `[Hook 00:00-00:03] ${item?.hook || ""}`,
    `[Body 00:03-00:18] ${item?.body || ""}`,
    `[CTA 00:18-00:25] ${item?.cta || ""}`,
    ``,
    `[CAPTION]`,
    item?.caption || "",
    ``,
  ].join("\n");
}

export function buildMasterExport(order: Order, items: ContentItem[], articles: SeoArticle[]): string {
  let content = `MASTER KALENDER KONTEN 30 HARI - ${order.brand}\n`;
  content += `Order ID: ${order.order_id} | Kategori: ${order.category}\n`;
  content += `Target: ${order.competitor || "General"}\n`;
  content += `==========================================================\n\n`;

  for (let d = 1; d <= 30; d++) {
    content += buildDayExport(order, items.find((i) => i.day_number === d), d);
  }

  content += `\n===== 4 ARTIKEL SEO =====\n\n`;
  articles.forEach((a, i) => {
    content += `--- ARTIKEL ${i + 1} ---\n`;
    content += `Judul: ${a.title}\n`;
    content += `Keyword: ${a.article_type}\n`;
    const lines = (a.outline || "").split("\n");
    lines.forEach((l) => {
      content += `${l.trim()}\n`;
    });
    content += `\n`;
  });

  content += `===== AUDIT KOMPETITOR =====\n`;
  content += `Target: ${order.competitor || "kompetitor utama"}\n`;
  content += `Catatan: estimasi demo dari audit akun publik — validasi ulang disarankan.\n`;

  return content;
}

export function checklistTotal(items: ContentItem[], articles: SeoArticle[]): number {
  return items.length * 2 + articles.length + 3;
}

export function checklistProgress(checklist: Record<string, boolean>): number {
  return Object.values(checklist).filter(Boolean).length;
}

export function outlineLines(article: SeoArticle): string[] {
  return (article.outline || "").split("\n").map((l) => l.trim()).filter(Boolean);
}