import { NextResponse } from "next/server";

// GoDaddy domain availability check — geen SDK nodig, gewoon hun REST API.
// Docs: https://developer.godaddy.com/doc/endpoint/domains#/v1/available

const GODADDY_API = "https://api.godaddy.com/v1/domains/available";

// Eenvoudige validatie: letters, cijfers, koppeltekens, minstens één punt,
// extensie van 2-24 letters.
const DOMAIN_RE = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.[a-zA-Z0-9-]{1,63})*\.[a-zA-Z]{2,24}$/;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = (searchParams.get("domain") ?? "").trim().toLowerCase();

  if (!domain) {
    return NextResponse.json({ error: "Geen domeinnaam opgegeven." }, { status: 400 });
  }
  if (!DOMAIN_RE.test(domain)) {
    return NextResponse.json({ error: "Ongeldige domeinnaam." }, { status: 400 });
  }

  const apiKey = process.env.GODADDY_API_KEY;
  const apiSecret = process.env.GODADDY_API_SECRET;
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Domeincheck is momenteel niet beschikbaar (GoDaddy niet geconfigureerd)." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${GODADDY_API}?domain=${encodeURIComponent(domain)}&checkType=FAST`, {
      headers: {
        Authorization: `sso-key ${apiKey}:${apiSecret}`,
        Accept: "application/json",
      },
      // GoDaddy-resultaten hoeven niet gecached te worden
      cache: "no-store",
    });

    const raw = await res.text();
    let data: any = null;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        // GoDaddy gaf geen geldige JSON terug
      }
    }

    if (!res.ok) {
      const msg = data?.message || `GoDaddy API fout (${res.status}${raw ? `): ${raw.slice(0, 200)}` : ", lege response)"}`;
      return NextResponse.json({ error: msg }, { status: res.status === 429 ? 429 : 502 });
    }

    if (!data) {
      return NextResponse.json(
        { error: `GoDaddy gaf een lege/onverwachte response terug (status ${res.status}).` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      domain: data.domain ?? domain,
      available: !!data.available,
      price: typeof data.price === "number" ? data.price / 1_000_000 : null, // micro-units -> euro/dollar
      currency: data.currency ?? null,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Onbekende fout bij domeincheck.";
    return NextResponse.json({ error: `Domeincheck mislukt: ${msg}` }, { status: 500 });
  }
}
