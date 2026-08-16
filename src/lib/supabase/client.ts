import { createClient as createSupabaseClient } from "@supabase/supabase-js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabaseClient = any;

let client: AnySupabaseClient | null = null;

export function createClient(): AnySupabaseClient {
  if (client) return client;

  client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return client;
}
