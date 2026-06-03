import { createClient } from "@supabase/supabase-js";

// Fallback to placeholder during build so Next.js doesn't crash.
// Real values are set via Vercel environment variables at runtime.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key"
);