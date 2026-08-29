import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/api-auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function buildClient() {
  return createClient(supabaseUrl, serviceRoleKey);
}

type ContentItemInput = {
  day_number: number;
  pillar: string;
  hook: string | null;
  body: string | null;
  cta: string | null;
  caption: string | null;
};

type SeoArticleInput = {
  article_number: number;
  article_type: string;
  title: string;
  description: string | null;
  outline: string | null;
};

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "orderId wajib diisi." }, { status: 400 });
  }

  const supabase = buildClient();

  const idQuery = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)
    ? { id: orderId }
    : { order_id: orderId };

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("id, order_id, brand, status, notion_url")
    .match(idQuery)
    .maybeSingle();

  if (orderErr || !order) {
    return NextResponse.json({ error: "Order tidak ditemukan." }, { status: 404 });
  }

  const [itemsRes, articlesRes] = await Promise.all([
    supabase.from("content_items").select("*").eq("order_id", order.id).order("day_number"),
    supabase.from("seo_articles").select("*").eq("order_id", order.id).order("article_number"),
  ]);

  return NextResponse.json({
    order,
    items: itemsRes.data || [],
    articles: articlesRes.data || [],
  });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  let body: {
    orderId?: string;
    items?: ContentItemInput[];
    articles?: SeoArticleInput[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid." }, { status: 400 });
  }

  const orderId = body.orderId;
  if (!orderId) {
    return NextResponse.json({ error: "orderId wajib diisi." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  const articles = Array.isArray(body.articles) ? body.articles : [];

  const dayNumbers = items.map((i) => i.day_number);
  if (dayNumbers.length !== new Set(dayNumbers).size) {
    return NextResponse.json({ error: "day_number tidak boleh duplikat." }, { status: 400 });
  }
  for (const item of items) {
    if (!item.day_number || item.day_number < 1 || item.day_number > 30) {
      return NextResponse.json(
        { error: `day_number harus 1-30 (ditemukan: ${item.day_number}).` },
        { status: 400 }
      );
    }
    if (!item.pillar || !item.pillar.trim()) {
      return NextResponse.json(
        { error: `Pillar kosong untuk hari ${item.day_number}.` },
        { status: 400 }
      );
    }
  }

  const supabase = buildClient();

  const idQuery = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)
    ? { id: orderId }
    : { order_id: orderId };

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("id")
    .match(idQuery)
    .maybeSingle();

  if (orderErr || !order) {
    return NextResponse.json({ error: "Order tidak ditemukan." }, { status: 404 });
  }

  const { error: delItemsErr } = await supabase
    .from("content_items")
    .delete()
    .eq("order_id", order.id);
  if (delItemsErr) {
    return NextResponse.json({ error: `Gagal hapus konten lama: ${delItemsErr.message}` }, { status: 500 });
  }

  const { error: delArticlesErr } = await supabase
    .from("seo_articles")
    .delete()
    .eq("order_id", order.id);
  if (delArticlesErr) {
    return NextResponse.json({ error: `Gagal hapus artikel lama: ${delArticlesErr.message}` }, { status: 500 });
  }

  let inserted = 0;
  if (items.length > 0) {
    const { error: itemsErr } = await supabase.from("content_items").insert(
      items.map((i) => ({
        order_id: order.id,
        day_number: i.day_number,
        pillar: i.pillar.trim(),
        hook: i.hook ?? null,
        body: i.body ?? null,
        cta: i.cta ?? null,
        caption: i.caption ?? null,
      }))
    );
    if (itemsErr) {
      return NextResponse.json({ error: `Gagal simpan konten: ${itemsErr.message}` }, { status: 500 });
    }
    inserted += items.length;
  }

  let insertedArticles = 0;
  if (articles.length > 0) {
    const { error: articlesErr } = await supabase.from("seo_articles").insert(
      articles.map((a) => ({
        order_id: order.id,
        article_number: a.article_number,
        article_type: a.article_type,
        title: a.title,
        description: a.description ?? null,
        outline: a.outline ?? null,
      }))
    );
    if (articlesErr) {
      return NextResponse.json({ error: `Gagal simpan artikel: ${articlesErr.message}` }, { status: 500 });
    }
    insertedArticles += articles.length;
  }

  return NextResponse.json({
    success: true,
    insertedItems: inserted,
    insertedArticles,
  });
}