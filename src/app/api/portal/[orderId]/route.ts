import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch order
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", orderId)
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ error: "Order tidak ditemukan." }, { status: 404 });
  }

  // Fetch content items
  const { data: contentItems } = await supabase
    .from("content_items")
    .select("*")
    .eq("order_id", order.id)
    .order("day_number");

  // Fetch SEO articles
  const { data: seoArticles } = await supabase
    .from("seo_articles")
    .select("*")
    .eq("order_id", order.id)
    .order("article_number");

  return NextResponse.json({
    order,
    contentItems: contentItems || [],
    seoArticles: seoArticles || [],
  });
}
