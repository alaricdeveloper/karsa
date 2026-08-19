import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Accumulate all cookies from setAll calls, apply once at the end
  const allCookies: { name: string; value: string; options?: Record<string, unknown> }[] = [];
  const allHeaders: Record<string, string> = {};

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // Update request cookies (for downstream handlers)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Accumulate — don't create response yet
          allCookies.push(...cookiesToSet);
          Object.assign(allHeaders, headers);
        },
      },
    }
  );

  // Refresh session — triggers setAll with session cookies
  const { data: { user } } = await supabase.auth.getUser();

  // Create ONE response with ALL accumulated cookies
  const supabaseResponse = NextResponse.next({ request });
  allCookies.forEach(({ name, value, options }) =>
    supabaseResponse.cookies.set(name, value, options as any)
  );
  Object.entries(allHeaders).forEach(([key, value]) =>
    supabaseResponse.headers.set(key, value)
  );

  const pathname = request.nextUrl.pathname;

  // Protect /console — must be logged in + admin role
  if (pathname.startsWith("/console")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", "/console");
      return NextResponse.redirect(url);
    }

    // Check admin role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // Protect /dashboard — must be logged in
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", "/dashboard");
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from /login
  if (pathname === "/login" && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const url = request.nextUrl.clone();

    if (redirectParam && redirectParam.startsWith("/")) {
      url.pathname = redirectParam;
      url.searchParams.delete("redirect");
    } else if (profile?.role === "admin") {
      url.pathname = "/console";
    } else {
      url.pathname = "/dashboard";
    }
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
