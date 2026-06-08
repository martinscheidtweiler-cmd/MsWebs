import { createClient } from "@supabase/supabase-js";

// Fallback URLs prevent crashes during Next.js build when env vars are not set.
// Real values come from Vercel environment variables at runtime.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
);

/**
 * Get a public URL for a file in the "hippique" Supabase Storage bucket.
 * path examples: "partners/roose.png"  "properties/stoeterij-molenhoek/foto1.jpg"
 */
export function storageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base =
    (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co") +
    "/storage/v1/object/public/hippique";
  return `${base}/${path.replace(/^\/+/, "")}`;
}
