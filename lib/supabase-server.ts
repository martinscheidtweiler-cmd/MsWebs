import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client — uses the SERVICE ROLE key.
 * Only use in API routes / server components, never expose to the browser.
 */
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
