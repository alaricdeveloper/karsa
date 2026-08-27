import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { requireUser } from "@/lib/api-auth";

// Siapa saya + role — dipakai login page untuk redirect admin/customer.
// Baca via service role (server-only) sehingga konsisten sebelum & sesudah
// migrasi RLS, dan tidak bocorkan data ke anon.
export async function GET(request: NextRequest) {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return NextResponse.json({
    id: user.id,
    email: user.email ?? "",
    role: profile?.role ?? "customer",
  });
}
