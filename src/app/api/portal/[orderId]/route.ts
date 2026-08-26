import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { requireUser } from "@/lib/api-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

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

  // Server-side ownership check: only the order's email owner can access
  if (order.email !== user.email) {
    return NextResponse.json({ error: "Anda tidak memiliki akses ke portal ini." }, { status: 403 });
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
