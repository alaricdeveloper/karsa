export type OrderStatus =
  | "PENDING_PAYMENT"
  | "IN_PROGRESS"
  | "QC_REVIEW"
  | "COMPLETED";

export interface Order {
  id: string;
  order_id: string;
  brand: string;
  category: string;
  competitor: string | null;
  description: string;
  email: string;
  phone: string;
  status: OrderStatus;
  notion_url: string | null;
  notes: string | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  order_id: string;
  day_number: number;
  pillar: string;
  hook: string | null;
  body: string | null;
  cta: string | null;
  caption: string | null;
  created_at: string;
}

export interface SeoArticle {
  id: string;
  order_id: string;
  article_number: number;
  article_type: string;
  title: string;
  description: string | null;
  outline: string | null;
  created_at: string;
}

export interface SLAInfo {
  text: string;
  className: string;
  level: "done" | "pending" | "overdue" | "warning" | "ok";
}

export interface SampleData {
  title: string;
  badge: string;
  body: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PillarConfig {
  key: string;
  label: string;
  color: string;
  bgColor: string;
}
