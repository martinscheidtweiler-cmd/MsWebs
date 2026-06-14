// ─────────────────────────────────────────────────────────────
// MS Webdesign — Stripe helper (REST API via fetch, geen SDK nodig)
// ─────────────────────────────────────────────────────────────
import crypto from "crypto";

const STRIPE_API = "https://api.stripe.com/v1";

function secretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY ontbreekt in .env.local");
  return key;
}

// Stripe's REST API verwacht application/x-www-form-urlencoded met
// PHP-achtige bracket-notatie voor geneste objecten/arrays.
function flatten(obj: unknown, prefix = "", out: [string, string][] = []): [string, string][] {
  if (obj === undefined || obj === null) return out;
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flatten(v, prefix ? `${prefix}[${i}]` : `${i}`, out));
  } else if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      flatten(v, prefix ? `${prefix}[${k}]` : k, out);
    }
  } else {
    out.push([prefix, String(obj)]);
  }
  return out;
}

async function stripeRequest<T = any>(
  path: string,
  method: "GET" | "POST" | "DELETE" = "POST",
  params?: Record<string, unknown>
): Promise<T> {
  const url = `${STRIPE_API}${path}`;
  const init: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  if (params && method !== "GET") {
    const body = new URLSearchParams();
    for (const [k, v] of flatten(params)) body.append(k, v);
    init.body = body;
  }
  let finalUrl = url;
  if (params && method === "GET") {
    const qs = new URLSearchParams();
    for (const [k, v] of flatten(params)) qs.append(k, v);
    finalUrl = `${url}?${qs.toString()}`;
  }
  const res = await fetch(finalUrl, init);
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || `Stripe API fout (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

export type StripeCustomer = { id: string; email: string };
export type StripeSubscription = { id: string; status: string; current_period_end?: number };
export type StripePortalSession = { url: string };

// ── Customer ────────────────────────────────────────────────
export async function createCustomer(opts: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}): Promise<StripeCustomer> {
  return stripeRequest<StripeCustomer>("/customers", "POST", opts);
}

// ── Subscription met inline price_data (geen vooraf aangemaakte Stripe Producten nodig) ──
export type SubscriptionItem = { name: string; unitAmountCents: number };

export async function createSubscription(opts: {
  customer: string;
  items: SubscriptionItem[];
  metadata?: Record<string, string>;
}): Promise<StripeSubscription> {
  const items = opts.items.map((it) => ({
    price_data: {
      currency: "eur",
      unit_amount: it.unitAmountCents,
      recurring: { interval: "month" },
      product_data: { name: it.name },
    },
  }));
  return stripeRequest<StripeSubscription>("/subscriptions", "POST", {
    customer: opts.customer,
    items,
    metadata: opts.metadata,
  });
}

export async function updateSubscriptionItems(opts: {
  subscriptionId: string;
  items: SubscriptionItem[];
}): Promise<StripeSubscription> {
  // Haal bestaande subscription op om oude items te verwijderen
  const sub = await stripeRequest<any>(`/subscriptions/${opts.subscriptionId}`, "GET");
  const existingItems = (sub.items?.data ?? []) as { id: string }[];

  const items: Record<string, unknown>[] = existingItems.map((ei) => ({ id: ei.id, deleted: true }));
  opts.items.forEach((it) => {
    items.push({
      price_data: {
        currency: "eur",
        unit_amount: it.unitAmountCents,
        recurring: { interval: "month" },
        product_data: { name: it.name },
      },
    });
  });

  return stripeRequest<StripeSubscription>(`/subscriptions/${opts.subscriptionId}`, "POST", {
    items,
    proration_behavior: "create_prorations",
  });
}

// ── Billing portal ──────────────────────────────────────────
export async function createPortalSession(opts: {
  customer: string;
  returnUrl: string;
}): Promise<StripePortalSession> {
  return stripeRequest<StripePortalSession>("/billing_portal/sessions", "POST", {
    customer: opts.customer,
    return_url: opts.returnUrl,
  });
}

// ── Webhook signature verificatie (vervangt stripe.webhooks.constructEvent) ──
export function verifyWebhookSignature(payload: string, sigHeader: string, secret: string): boolean {
  const parts = sigHeader.split(",").reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split("=");
    acc[k] = v;
    return acc;
  }, {});
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");

  // Tolerantie van 5 minuten
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}
