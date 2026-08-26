import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_STATUSES = ["PENDING_PAYMENT", "IN_PROGRESS", "QC_REVIEW", "COMPLETED"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateBody(body: Record<string, unknown>): string | null {
  const { brand, category, description, email, orderId, status } = body;

  if (orderId !== undefined && typeof orderId === "string") {
    if (!/^[A-Za-z0-9-]{4,40}$/.test(orderId)) return "Format order ID tidak valid";
  }
  if (status !== undefined) {
    if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status)) return "Status tidak valid";
  }
  if (brand !== undefined) {
    if (typeof brand !== "string" || brand.trim().length < 2 || brand.trim().length > 120) return "Nama brand tidak valid";
  }
  if (category !== undefined && (typeof category !== "string" || category.trim().length > 120)) return "Kategori tidak valid";
  if (competitorCheck(body)) return "Kompetitor tidak valid";
  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length < 5 || description.trim().length > 5000) return "Deskripsi brief tidak valid";
  }
  if (email !== undefined && (typeof email !== "string" || !EMAIL_RE.test(email.trim()))) return "Format email tidak valid";
  if (phoneCheck(body)) return "Nomor telepon tidak valid";
  return null;
}

function competitorCheck(body: Record<string, unknown>): boolean {
  const c = body.competitor;
  return c !== undefined && (typeof c !== "string" || c.length > 200);
}

function phoneCheck(body: Record<string, unknown>): boolean {
  const p = body.phone;
  return p !== undefined && (typeof p !== "string" || p.length > 30);
}

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await request.json();
    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    const { brand, category, competitor, description, goal, tone, channel, email, phone, status, orderId } = body;

    // If orderId and status provided, update existing order (payment confirmed)
    if (orderId && status) {
      // Check if the order already exists in the database
      const { data: existing } = await supabase
        .from("orders")
        .select("order_id")
        .eq("order_id", orderId)
        .maybeSingle();

      if (existing) {
        // Ownership check: caller must know the order's brand + email to flip status
        const { data: fullOrder } = await supabase
          .from("orders")
          .select("brand, email")
          .eq("order_id", orderId)
          .single();

        const briefMatch =
          fullOrder &&
          fullOrder.brand === brand &&
          String(fullOrder.email).toLowerCase() === String(email || "").toLowerCase();

        if (!briefMatch) {
          return NextResponse.json({ error: "Data brief tidak cocok dengan pesanan." }, { status: 403 });
        }

        const { error } = await supabase
          .from("orders")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("order_id", orderId);
        if (error) {
          return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
        }
        return NextResponse.json({ order_id: orderId });
      }

      // Order not found — create it (checkout handoff: brief lives in localStorage
      // until payment, so the first DB write happens at payment confirmation)
      const { data: newOrder, error: insertErr } = await supabase
        .from("orders")
        .insert({
          order_id: orderId,
          brand,
          category,
          competitor: competitor || "",
          description,
          email,
          phone: phone || "",
          status,
        })
        .select()
        .single();
      if (insertErr) {
        return NextResponse.json({ error: "Gagal membuat pesanan" }, { status: 500 });
      }

      // Generate the 30-day content batch + SEO articles for the new order
      const { generateDeliverables } = await import("@/lib/generate-deliverables");
      await generateDeliverables({
        id: newOrder.id,
        brand: newOrder.brand,
        category: newOrder.category,
        description: newOrder.description,
      });

      return NextResponse.json({ order_id: orderId });
    }

    // Validate required fields for new order
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
