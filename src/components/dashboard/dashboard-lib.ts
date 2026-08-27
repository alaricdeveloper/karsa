// Pure helpers & types untuk halaman dashboard member.
import { createClient } from "@/lib/supabase/client";
import { authFetch } from "@/lib/api-client";

export const PROFILE_STORAGE_KEY = "karsa_user_profile";

export type Profile = {
  fullName: string;
  displayName: string;
  roleBio: string;
  email: string;
  phone: string;
  defaultBrand: string;
  defaultCategory: string;
  defaultCompetitor: string;
  avatarUrl: string;
};

export type Order = {
  orderId: string;
  brand: string;
  category: string;
  competitor: string;
  description: string;
  email: string;
  phone: string;
  timestamp: string;
  status: string;
  notionUrl: string;
  notes: string;
};

export const DEFAULT_PROFILE: Profile = {
  fullName: "Alaric Diaz",
  displayName: "Alaric",
  roleBio: "Founder & Lead Strategist",
  email: "hello.usekarsa@gmail.com",
  phone: "081288009920",
  defaultBrand: "",
  defaultCategory: "Kuliner / F&B",
  defaultCompetitor: "",
  avatarUrl: "",
};

export type MainTab = "workspace" | "tools" | "demo" | "resources" | "profile";
export type DemoTab = "script" | "caption" | "seo";
export type DemoDay = "01" | "04" | "09" | "21" | "26";

export const PANELS: MainTab[] = ["workspace", "tools", "demo", "resources", "profile"];
export const PANEL_ACCENTS: Record<MainTab, string> = {
  workspace: "bg-terracotta",
  tools: "bg-wasabi",
  demo: "bg-sunflower",
  resources: "bg-terracottaLight",
  profile: "bg-wasabi",
};

export const DEMO_DAYS: DemoDay[] = ["01", "04", "09", "21", "26"];

export function loadProfileFromStorage(): Profile {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
    } catch {}
  }
  return DEFAULT_PROFILE;
}

export async function fetchOrdersFromSupabase(email: string): Promise<Order[]> {
  // Try API first (bypasses any client-side Supabase issues)
  try {
    const res = await authFetch("/api/my-orders");
    if (res.ok) {
      const allOrders: Record<string, unknown>[] = await res.json();
      const filtered = allOrders.filter((o) => o.email === email);
      return filtered.map((o) => ({
        orderId: o.order_id as string,
        brand: o.brand as string,
        category: o.category as string,
        competitor: (o.competitor as string) || "",
        description: (o.description as string) || "",
        email: o.email as string,
        phone: (o.phone as string) || "",
        timestamp: (o.created_at as string) || "",
        status: o.status as string,
        notionUrl: (o.notion_url as string) || "",
        notes: (o.notes as string) || "",
      }));
    }
  } catch {}

  // Fallback: Supabase client
  const supabase = createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((o: Record<string, unknown>) => ({
    orderId: o.order_id as string,
    brand: o.brand as string,
    category: o.category as string,
    competitor: (o.competitor as string) || "",
    description: (o.description as string) || "",
    email: o.email as string,
    phone: (o.phone as string) || "",
    timestamp: (o.created_at as string) || "",
    status: o.status as string,
    notionUrl: (o.notion_url as string) || "",
    notes: (o.notes as string) || "",
  }));
}

export const NOTION_PILLAR_CLASSES = [
  "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower",
  "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white",
  "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40",
  "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi",
];

export function getOrderStatusLabel(status: string) {
  switch (status) {
    case "IN_PROGRESS": return "Sedang Disusun (AI + QC)";
    case "QC_REVIEW": return "Tahap Kurasi Akhir";
    case "COMPLETED": return "Selesai & Siap Akses";
    default: return "Menunggu Bayar";
  }
}

export function getOrderStatusClass(status: string) {
  switch (status) {
    case "IN_PROGRESS": return "bg-sunflower text-ink border-ink";
    case "QC_REVIEW": return "bg-terracottaLight text-terracotta border-ink";
    case "COMPLETED": return "bg-wasabi text-ink border-ink";
    default: return "bg-white text-stone-600 border-ink";
  }
}

export function orderStageIndex(status: string) {
  if (status === "IN_PROGRESS") return 2;
  if (status === "QC_REVIEW") return 3;
  if (status === "COMPLETED") return 4;
  return 1;
}
