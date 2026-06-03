import { createClient } from "@supabase/supabase-js";

// Fallback URLs prevent crashes during Next.js build when env vars are not set.
// Real values come from Vercel environment variables at runtime.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
);
