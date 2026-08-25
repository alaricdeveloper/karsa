import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await request.json();
    const { id, status, notion_url, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing order id" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (status !== undefined) updates.status = status;
    if (notion_url !== undefined) updates.notion_url = notion_url;
    if (notes !== undefined) updates.notes = notes;

    const { error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await request.json();
    const list: Record<string, unknown>[] = Array.isArray(body.orders)
      ? body.orders
      : [body];

    if (list.length === 0) {
      return NextResponse.json({ error: "Empty order list" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const rows = list.map((o) => ({
      order_id: o.order_id,
      brand: o.brand,
      category: o.category,
      competitor: o.competitor || null,
      description: o.description,
      email: o.email,
      phone: o.phone,
      status: o.status || "IN_PROGRESS",
      notion_url: o.notion_url || null,
      notes: o.notes || null,
      created_at: o.created_at || now,
      updated_at: now,
    }));

    const { data, error } = await supabase
      .from("orders")
      .upsert(rows, { onConflict: "order_id" })
      .select("id");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data?.length ?? 0 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
