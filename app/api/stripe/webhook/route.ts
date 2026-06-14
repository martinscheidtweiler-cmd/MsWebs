import { NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/supabase-admin";
import { verifyWebhookSignature } from "../../../lib/stripe";

export const dynamic = "force-dynamic";

const STATUS_MAP: Record<string, string> = {
  paid: "betaald",
  open: "open",
  uncollectible: "mislukt",
  void: "geannuleerd",
  draft: "concept",
};

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET ontbreekt — webhook genegeerd.");
    return NextResponse.json({ error: "Webhook niet geconfigureerd" }, { status: 500 });
  }

  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !verifyWebhookSignature(payload, signature, secret)) {
    return NextResponse.json({ error: "Ongeldige signature" }, { status: 400 });
  }

  const event = JSON.parse(payload);
  const db = createAdminClient();

  try {
    switch (event.type) {
      case "invoice.paid":
      case "invoice.payment_failed":
      case "invoice.finalized":
      case "invoice.updated": {
        const invoice = event.data.object;
        const customerId: string | null = invoice.customer ?? null;
        if (!customerId) break;

        const { data: profile } = await db
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (!profile) {
          console.warn(`Geen profiel gevonden voor Stripe customer ${customerId}`);
          break;
        }

        const dateTs = invoice.status_transitions?.paid_at ?? invoice.created;
        const date = new Date(dateTs * 1000).toISOString().slice(0, 10);
        const amount = (invoice.amount_paid ?? invoice.amount_due ?? 0) / 100;
        const status = STATUS_MAP[invoice.status as string] ?? invoice.status;
        const pdfUrl = invoice.invoice_pdf ?? invoice.hosted_invoice_url ?? null;

        await db.from("invoices").upsert({
          id: invoice.id,
          client_id: profile.id,
          date,
          amount,
          status,
          pdf_url: pdfUrl,
        });
        break;
      }
      default:
        // Andere events negeren we voorlopig
        break;
    }
  } catch (e) {
    console.error("Stripe webhook fout:", e);
    return NextResponse.json({ error: "Verwerking mislukt" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
