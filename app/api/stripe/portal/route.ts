import { NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/supabase-admin";
import { createPortalSession } from "../../../lib/stripe";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  const db = createAdminClient();
  const { data: userData, error: userError } = await db.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { data: profile } = await db
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userData.user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: "Geen Stripe-koppeling gevonden voor dit account." }, { status: 400 });
  }

  try {
    const origin = new URL(req.url).origin;
    const session = await createPortalSession({
      customer: profile.stripe_customer_id,
      returnUrl: `${origin}/dashboard/billing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Onbekende Stripe-fout";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
