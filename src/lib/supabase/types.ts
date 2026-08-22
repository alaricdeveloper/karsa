export type OrderStatus =
  | "PENDING_PAYMENT"
  | "IN_PROGRESS"
  | "QC_REVIEW"
  | "COMPLETED";

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          order_id: string;
          brand: string;
          category: string;
          competitor: string | null;
          description: string;
          content_goal: string | null;
          content_tone: string | null;
          priority_channel: string | null;
          email: string;
          phone: string;
          status: OrderStatus;
          notion_url: string | null;
          notes: string | null;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          brand: string;
          category: string;
          competitor?: string | null;
          description: string;
          content_goal?: string | null;
          content_tone?: string | null;
          priority_channel?: string | null;
          email: string;
          phone: string;
          status?: OrderStatus;
          notion_url?: string | null;
          notes?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          brand?: string;
          category?: string;
          competitor?: string | null;
          description?: string;
          content_goal?: string | null;
          content_tone?: string | null;
          priority_channel?: string | null;
          email?: string;
          phone?: string;
          status?: OrderStatus;
          notion_url?: string | null;
          notes?: string | null;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          role?: string;
          created_at?: string;
        };
      };
      content_items: {
        Row: {
          id: string;
          order_id: string;
          day_number: number;
          pillar: string;
          hook: string | null;
          body: string | null;
          cta: string | null;
          caption: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          day_number: number;
          pillar: string;
          hook?: string | null;
          body?: string | null;
          cta?: string | null;
          caption?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          day_number?: number;
          pillar?: string;
          hook?: string | null;
          body?: string | null;
          cta?: string | null;
          caption?: string | null;
          created_at?: string;
        };
      };
      seo_articles: {
        Row: {
          id: string;
          order_id: string;
          article_number: number;
          article_type: string;
          title: string;
          description: string | null;
          outline: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          article_number: number;
          article_type: string;
          title: string;
          description?: string | null;
          outline?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          article_number?: number;
          article_type?: string;
          title?: string;
          description?: string | null;
          outline?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
