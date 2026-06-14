"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ADDONS } from "../../lib/mock-data";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
const ADDON_PRICES: Record<string, number> = { "google-boost": 9.99, "webshop": 19.99, "appointment": 19.99, "extra-lang": 9.99 };
type Profile = { id: string; business_name: string; contact_person: string; website_url?: string; website_status: string; active_addons: string[]; subscription_price: number; since: string; last_update: string; };
const WS_LABELS: Record<string, { label: string; cls: string }> = {
  online: { label: "Online", cls: "sd-badge-green" }, "in-design": { label: "In opmaak", cls: "sd-badge-blue" },
  feedback: { label: "Feedback", cls: "sd-badge-orange" }, adjustments: { label: "Aanpassingen", cls: "sd-badge-orange" },
  ready: { label: "Klaar", cls: "sd-badge-purple" }, intake: { label: "Intake", cls: "sd-badge-gray" },
};

const EMPTY_FORM = {
  email: "",
  business_name: "",
  contact_person: "",
  phone: "",
  website_url: "",
  domain: "",
  subscription_price: 29.99,
  minutes_included: 30,
  active_addons: [] as string[],
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [search,  setSearch]  = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function load() {
    fetch("/api/admin/clients", { headers: { "x-admin-secret": ADMIN_SECRET } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setClients(d); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  const filtered = clients.filter(c =>
    c.business_name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_person?.toLowerCase().includes(search.toLowerCase())
  );

  function toggleAddon(key: string) {
    setForm(f => ({
      ...f,
      active_addons: f.active_addons.includes(key)
        ? f.active_addons.filter(k => k !== key)
        : [...f.active_addons, key],
    }));
  }

  async function createClient() {
    setFormError("");
    if (!form.email || !form.business_name || !form.contact_person) {
      setFormError("E-mailadres, bedrijfsnaam en contactpersoon zijn verplicht.");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "x-admin-secret": ADMIN_SECRET, "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Er ging iets mis bij het aanmaken van de klant.");
        setCreating(false);
        return;
      }
      let msg = "✓ Klant aangemaakt.";
      msg += data.emailSent ? " Uitnodigingsmail verstuurd." : " ⚠ Uitnodigingsmail kon niet verstuurd worden — controleer de Resend-instellingen.";
      if (data.stripeError) msg += ` ⚠ Stripe: ${data.stripeError}`;
      setSuccessMsg(msg);
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
      setTimeout(() => setSuccessMsg(""), 8000);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Onbekende fout.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <div className="sd-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="sd-page-title">Klanten</div>
          <div className="sd-page-sub">{clients.length} klanten in het systeem.</div>
        </div>
        <button className="sd-btn sd-btn-primary" onClick={() => { setShowForm(v => !v); setFormError(""); }}>
          {showForm ? "Annuleren" : "+ Nieuwe klant"}
        </button>
      </div>

      {successMsg && <div className="sd-alert sd-alert-success" style={{ marginBottom: 16 }}>{successMsg}</div>}

      {showForm && (
        <div className="sd-card" style={{ marginBottom: 20 }}>
          <div className="sd-card-title">Nieuwe klant aanmaken</div>
          {formError && <div className="sd-alert sd-alert-error" style={{ marginBottom: 12 }}>{formError}</div>}
          <div className="sd-grid-2" style={{ gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>E-mailadres *</label>
              <input className="sd-input" type="email" placeholder="klant@bedrijf.be" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Bedrijfsnaam *</label>
              <input className="sd-input" value={form.business_name} onChange={e => setForm({ ...form, business_name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Contactpersoon *</label>
              <input className="sd-input" value={form.contact_person} onChange={e => setForm({ ...form, contact_person: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Telefoon</label>
              <input className="sd-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Website URL</label>
              <input className="sd-input" value={form.website_url} onChange={e => setForm({ ...form, website_url: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Domein</label>
              <input className="sd-input" value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Abonnementsprijs (€/mnd)</label>
              <input className="sd-input" type="number" step="0.01" value={form.subscription_price} onChange={e => setForm({ ...form, subscription_price: Number(e.target.value) })} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Inbegrepen minuten/maand</label>
              <input className="sd-input" type="number" value={form.minutes_included} onChange={e => setForm({ ...form, minutes_included: Number(e.target.value) })} />
            </div>
          </div>

          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Add-ons</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ADDONS.map(a => (
                <label key={a.key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "8px 12px", border: "1px solid var(--s-border)", borderRadius: 8, cursor: "pointer", background: form.active_addons.includes(a.key) ? "rgba(124,58,237,0.06)" : "transparent" }}>
                  <input type="checkbox" checked={form.active_addons.includes(a.key)} onChange={() => toggleAddon(a.key)} />
                  {a.name} <span style={{ color: "var(--s-muted)" }}>+€{a.price.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 12, color: "var(--s-muted)", marginBottom: 16, lineHeight: 1.5 }}>
            De klant ontvangt automatisch een e-mail om zijn/haar wachtwoord te kiezen en het account te activeren.
          </p>

          <button className="sd-btn sd-btn-primary" onClick={createClient} disabled={creating}>
            {creating ? "Aanmaken…" : "Klant aanmaken & uitnodigen"}
          </button>
        </div>
      )}

      <div className="sd-card">
        <input className="sd-input" placeholder="Zoek op bedrijf of naam…" value={search}
          onChange={e => setSearch(e.target.value)} style={{ marginBottom: 16, maxWidth: 360 }} />
        {loading ? <div className="sd-loading">Laden…</div> : (
          <div className="sd-table-wrap">
            <table className="sd-table">
              <thead><tr><th>Bedrijf</th><th>Contactpersoon</th><th>Status</th><th>MRR</th><th>Klant sinds</th><th></th></tr></thead>
              <tbody>
                {filtered.map(c => {
                  const mrr = c.subscription_price + (c.active_addons ?? []).reduce((s, k) => s + (ADDON_PRICES[k] ?? 0), 0);
                  const ws  = WS_LABELS[c.website_status] ?? { label: c.website_status, cls: "sd-badge-gray" };
                  return (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.business_name}</td>
                      <td style={{ color: "var(--s-muted)", fontSize: 13 }}>{c.contact_person}</td>
                      <td><span className={`sd-badge ${ws.cls}`}>{ws.label}</span></td>
                      <td style={{ fontWeight: 600 }}>€{mrr.toFixed(2)}</td>
                      <td style={{ color: "var(--s-muted)", fontSize: 12 }}>{c.since}</td>
                      <td><Link href={`/admin/clients/${c.id}`} style={{ color: "var(--s-purple)", fontSize: 12, textDecoration: "none" }}>Bekijken →</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
