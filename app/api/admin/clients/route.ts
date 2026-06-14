import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient, verifyAdminToken } from "../../../lib/supabase-admin";
import { ADDONS } from "../../../lib/mock-data";
import { createCustomer, createSubscription } from "../../../lib/stripe";
import { sendEmail, welcomeEmailHtml } from "../../../lib/email";

export async function GET(req: Request) {
  if (!verifyAdminToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createAdminClient();
  const { data, error } = await db.from("profiles").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!verifyAdminToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    email,
    business_name,
    contact_person,
    phone,
    website_url,
    domain,
    subscription_price,
    active_addons,
    minutes_included,
  } = body as {
    email?: string;
    business_name?: string;
    contact_person?: string;
    phone?: string;
    website_url?: string;
    domain?: string;
    subscription_price?: number;
    active_addons?: string[];
    minutes_included?: number;
  };

  if (!email || !business_name) {
    return NextResponse.json({ error: "E-mailadres en bedrijfsnaam zijn verplicht" }, { status: 400 });
  }

  const db = createAdminClient();

  // 1. Supabase Auth gebruiker aanmaken (tijdelijk, willekeurig wachtwoord —
  //    de klant kiest zelf een wachtwoord via de uitnodigingsmail).
  const tempPassword = crypto.randomBytes(24).toString("hex");
  const { data: created, error: createError } = await db.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { contact_person: contact_person ?? "" },
  });

  if (createError || !created?.user) {
    const msg = createError?.message ?? "Kon gebruiker niet aanmaken";
    const status = /already.*registered|already.*exists/i.test(msg) ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }

  const userId = created.user.id;

  // 2. Het automatisch aangemaakte profiel aanvullen met de klantgegevens
  const { error: profileError } = await db
    .from("profiles")
    .update({
      business_name,
      contact_person: contact_person ?? "",
      phone: phone ?? null,
      website_url: website_url ?? null,
      domain: domain ?? null,
      subscription_price: subscription_price ?? 29.99,
      active_addons: active_addons ?? [],
      minutes_included: minutes_included ?? 30,
    })
    .eq("id", userId);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // 3. Stripe klant + abonnement aanmaken (best effort — blokkeert klant-aanmaak niet)
  let stripeCustomerId: string | null = null;
  let stripeSubscriptionId: string | null = null;
  let stripeError: string | null = null;

  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const customer = await createCustomer({
        email,
        name: business_name,
        metadata: { supabase_id: userId },
      });

      const items = [
        { name: "Website Essential", unitAmountCents: Math.round((subscription_price ?? 29.99) * 100) },
      ];
      for (const key of active_addons ?? []) {
        const addon = ADDONS.find((a) => a.key === key);
        if (addon) items.push({ name: addon.name, unitAmountCents: Math.round(addon.price * 100) });
      }

      const subscription = await createSubscription({
        customer: customer.id,
        items,
        metadata: { supabase_id: userId },
      });

      stripeCustomerId = customer.id;
      stripeSubscriptionId = subscription.id;

      await db
        .from("profiles")
        .update({ stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId })
        .eq("id", userId);
    } catch (e) {
      stripeError = e instanceof Error ? e.message : "Onbekende Stripe-fout";
      console.error("Stripe error bij klant aanmaken:", stripeError);
    }
  }

  // 4. Uitnodigingsmail versturen met link om wachtwoord te kiezen
  let emailSent = false;
  let emailError: string | null = null;
  try {
    const origin = new URL(req.url).origin;
    const { data: linkData, error: linkError } = await db.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo: `${origin}/set-password` },
    });

    if (linkError) {
      emailError = linkError.message;
    } else {
      const actionLink = linkData?.properties?.action_link;
      if (actionLink) {
        const result = await sendEmail({
          to: email,
          subject: "Welkom bij MS Webdesign — stel je wachtwoord in",
          html: welcomeEmailHtml({
            businessName: business_name,
            contactPerson: contact_person || business_name,
            setPasswordUrl: actionLink,
          }),
        });
        emailSent = result.ok;
        if (!result.ok) emailError = result.error ?? "Onbekende e-mailfout";
      }
    }
  } catch (e) {
    emailError = e instanceof Error ? e.message : "Onbekende fout bij uitnodigingsmail";
    console.error("Invite e-mail fout:", emailError);
  }

  const { data: profile } = await db.from("profiles").select("*").eq("id", userId).single();

  return NextResponse.json({
    profile,
    emailSent,
    emailError,
    stripeCustomerId,
    stripeSubscriptionId,
    stripeError,
  });
}
