import { createClient as createSupabaseClient } from "@supabase/supabase-js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabaseClient = any;

let client: AnySupabaseClient | null = null;

export function createClient(): AnySupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // During static build, env vars are unavailable — return a placeholder
    // that won't be used (components guard against this at runtime).
    return null as unknown as AnySupabaseClient;
  }

  client = createSupabaseClient(url, key);
  return client;
}
