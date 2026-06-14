"use client";
import { useEffect, useState } from "react";
import { supabase, Profile, Invoice, ADDON_PRICES, calcMrr } from "../../lib/supabase";
import { ADDONS } from "../../lib/mock-data";

const INVOICE_STATUS_CLS: Record<string, string> = {
  betaald: "sd-badge-green",
  open: "sd-badge-blue",
  mislukt: "sd-badge-orange",
  geannuleerd: "sd-badge-gray",
  concept: "sd-badge-gray",
};

export default function BillingPage() {
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading]   = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState("");

  async function openBillingPortal() {
    setPortalError("");
    setPortalLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Niet ingelogd.");
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Kon klantportaal niet openen.");
      window.location.href = data.url;
    } catch (e) {
      setPortalError(e instanceof Error ? e.message : "Onbekende fout.");
      setPortalLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;
      const [{ data: p }, { data: inv }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).single(),
        supabase.from("invoices").select("*").eq("client_id", uid).order("date", { ascending: false }),
      ]);
      if (p)   setProfile(p);
      if (inv) setInvoices(inv);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="sd-loading">Laden…</div>;
  if (!profile) return <div className="sd-loading">Geen profiel gevonden.</div>;

  const mrr         = calcMrr(profile.subscription_price, profile.active_addons);
  const activeAddons = ADDONS.filter(a => profile.active_addons.includes(a.key));
  const nextDate    = new Date(); nextDate.setMonth(nextDate.getMonth() + 1); nextDate.setDate(1);
  const nextLabel   = nextDate.toLocaleDateString("nl-BE", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Facturen & Betalingen</div>
        <div className="sd-page-sub">Beheer je abonnement, add-ons en betalingen.</div>
      </div>
      <div className="sd-grid-3" style={{ marginBottom: 20 }}>
        <div className="sd-stat">
          <div className="sd-stat-label">Maandelijks bedrag</div>
          <div className="sd-stat-value">€{mrr.toFixed(2)}</div>
          <div className="sd-stat-sub">Website Essential + {activeAddons.length} add-ons</div>
        </div>
        <div className="sd-stat">
          <div className="sd-stat-label">Betaalmethode</div>
          {profile.stripe_customer_id ? (
            <>
              <button className="sd-btn sd-btn-primary" onClick={openBillingPortal} disabled={portalLoading} style={{ marginTop: 6 }}>
                {portalLoading ? "Even laden…" : "Beheer betaalmethode"}
              </button>
              <div className="sd-stat-sub" style={{ marginTop: 6 }}>Via het Stripe klantportaal</div>
            </>
          ) : (
            <>
              <div className="sd-stat-value" style={{ fontSize: 15 }}>Nog niet gekoppeld</div>
              <div className="sd-stat-sub">Neem contact op via WhatsApp voor je betaalgegevens.</div>
            </>
          )}
        </div>
        <div className="sd-stat">
          <div className="sd-stat-label">Volgende betaling</div>
          <div className="sd-stat-value" style={{ fontSize: 18 }}>{nextLabel}</div>
          <div className="sd-stat-sub">Automatisch via Stripe</div>
        </div>
      </div>
      <div className="sd-grid-2" style={{ marginBottom: 20 }}>
        <div className="sd-card">
          <div className="sd-card-title">Actief abonnement</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "var(--s-off)", borderRadius: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Website Essential</div>
              <div style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 3 }}>Hosting, SSL, {profile.minutes_included} min/maand</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--s-purple)" }}>€{profile.subscription_price.toFixed(2)}</div>
          </div>
          {activeAddons.map(a => (
            <div key={a.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--s-border)" }}>
              <div style={{ fontSize: 13 }}>{a.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--s-muted)" }}>+€{a.price.toFixed(2)}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontWeight: 700, fontSize: 15, borderTop: "2px solid var(--s-border)", marginTop: 12 }}>
            <span>Totaal per maand</span><span>€{mrr.toFixed(2)}</span>
          </div>
        </div>
        <div className="sd-card">
          <div className="sd-card-title">Factuurhistoriek</div>
          {invoices.length === 0
            ? <p style={{ color: "var(--s-muted)", fontSize: 13 }}>Nog geen facturen.</p>
            : (
              <div className="sd-table-wrap">
                <table className="sd-table">
                  <thead><tr><th>Factuur</th><th>Datum</th><th>Bedrag</th><th>Status</th></tr></thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.id}>
                        <td style={{ fontWeight: 500, fontSize: 12 }}>
                          {inv.pdf_url ? <a href={inv.pdf_url} target="_blank" rel="noreferrer" style={{ color: "var(--s-purple)" }}>{inv.id}</a> : inv.id}
                        </td>
                        <td style={{ color: "var(--s-muted)", fontSize: 12 }}>{inv.date}</td>
                        <td style={{ fontWeight: 600 }}>€{Number(inv.amount).toFixed(2)}</td>
                        <td><span className={`sd-badge ${INVOICE_STATUS_CLS[inv.status] ?? "sd-badge-gray"}`}>{inv.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
      {portalError && <div className="sd-alert sd-alert-error" style={{ marginBottom: 12 }}>{portalError}</div>}
      {!profile.stripe_customer_id && (
        <div className="sd-alert sd-alert-info">
          💡 <span>Betalingsbeheer via het Stripe klantportaal wordt binnenkort geactiveerd. Neem contact op via WhatsApp voor vragen over je facturen.</span>
        </div>
      )}
    </div>
  );
}
