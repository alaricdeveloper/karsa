import { createClient } from "@/lib/supabase/client";

async function getSessionToken(): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

export async function authFetch(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getSessionToken();
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, { ...init, headers });
}