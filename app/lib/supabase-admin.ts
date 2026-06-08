import { createClient } from "@supabase/supabase-js";

// Server-side only — uses service role key (bypasses RLS)
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function verifyAdminToken(req: Request): boolean {
  const token = req.headers.get("x-admin-secret");
  return token === process.env.ADMIN_SECRET;
}
