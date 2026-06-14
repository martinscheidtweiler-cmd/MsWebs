import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────
export type Profile = {
  id: string;
  email: string | null;
  business_name: string;
  contact_person: string;
  phone: string | null;
  website_url: string | null;
  domain: string | null;
  subscription: string;
  subscription_price: number;
  active_addons: string[];
  website_status: string;
  project_step: string;
  minutes_included: number;
  since: string;
  last_update: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
};

export type TimeLog = {
  id: string;
  client_id: string;
  date: string;
  description: string;
  minutes: number;
  billable: boolean;
  created_at: string;
};

export type Request = {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  type: string | null;
  priority: string;
  status: string;
  created_at: string;
};

export type Invoice = {
  id: string;
  client_id: string;
  date: string;
  amount: number;
  status: string;
  pdf_url: string | null;
  created_at: string;
};

export type Upload = {
  id: string;
  client_id: string;
  name: string;
  type: string | null;
  size: string | null;
  storage_path: string | null;
  created_at: string;
};

// Addon prices (matches ADDONS in mock-data)
export const ADDON_PRICES: Record<string, number> = {
  "google-boost": 9.99,
  "webshop": 19.99,
  "appointment": 19.99,
  "extra-lang": 9.99,
};

export function calcMrr(subscriptionPrice: number, activeAddons: string[]): number {
  const addonTotal = activeAddons.reduce((sum, key) => sum + (ADDON_PRICES[key] ?? 0), 0);
  return parseFloat((subscriptionPrice + addonTotal).toFixed(2));
}
