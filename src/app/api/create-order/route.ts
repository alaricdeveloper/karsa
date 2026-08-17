import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await request.json();
    const { brand, category, competitor, description, email, phone } = body;

    // Validate required fields
    if (!brand || !category || !description || !email) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Generate order ID
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    const order_id = `OC-${yy}${mm}${dd}-${rand}`;

    // Insert order (public — no auth required)
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_id,
        brand,
        category,
        competitor: competitor || "",
        description,
        email,
        phone: phone || "",
        status: "PENDING_PAYMENT",
      })
      .select()
      .single();

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json(
        { error: "Gagal membuat pesanan" },
        { status: 500 }
      );
    }

    return NextResponse.json({ order_id: order.order_id });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
