import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  // Simple token check to prevent abuse
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== "karsa-setup-2024") {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // Use service role key — bypasses RLS
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const email = searchParams.get("email") || "admin@karsa.my.id";
  const password = searchParams.get("password") || "Admin123!@#";

  try {
    // 1. Create auth user
    const { data: userData, error: userError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // skip email verification
      });

    if (userError) {
      // If user already exists, try to find them
      if (userError.message.includes("already")) {
        const {
          data: { users },
        } = await supabase.auth.admin.listUsers();
        const existing = users.find((u) => u.email === email);
        if (existing) {
          // Set role to admin
          const { error: roleError } = await supabase
            .from("profiles")
            .upsert(
              { id: existing.id, email, role: "admin" },
              { onConflict: "id" }
            );

          if (roleError) {
            return NextResponse.json(
              { error: `Role update failed: ${roleError.message}` },
              { status: 500 }
            );
          }

          return NextResponse.json({
            success: true,
            message: `User ${email} already exists. Role set to admin.`,
            user_id: existing.id,
          });
        }
      }
      return NextResponse.json(
        { error: `Create user failed: ${userError.message}` },
        { status: 500 }
      );
    }

    // 2. Set role to admin in profiles
    const { error: profileError } = await supabase.from("profiles").upsert(
      { id: userData.user.id, email, role: "admin" },
      { onConflict: "id" }
    );

    if (profileError) {
      return NextResponse.json(
        { error: `Profile update failed: ${profileError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin user created: ${email}`,
      user_id: userData.user.id,
      login: `/login`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Unexpected: ${err}` },
      { status: 500 }
    );
  }
}
