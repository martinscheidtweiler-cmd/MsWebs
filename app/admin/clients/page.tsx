"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
const ADDON_PRICES: Record<string, number> = { "google-boost": 9.99, "webshop": 19.99, "appointment": 19.99, "extra-lang": 9.99 };
type Profile = { id: string; business_name: string; contact_person: string; website_url?: string; website_status: string; active_addons: string[]; subscription_price: number; since: string; last_update: string; };
const WS_LABELS: Record<string, { label: string; cls: string }> = {
  online: { label: "Online", cls: "sd-badge-green" }, "in-design": { label: "In opmaak", cls: "sd-badge-blue" },
  feedback: { label: "Feedback", cls: "sd-badge-orange" }, adjustments: { label: "Aanpassingen", cls: "sd-badge-orange" },
  ready: { label: "Klaar", cls: "sd-badge-purple" }, intake: { label: "Intake", cls: "sd-badge-gray" },
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [search,  setSearch]  = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/clients", { headers: { "x-admin-secret": ADMIN_SECRET } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setClients(d); setLoading(false); });
  }, []);

  const filtered = clients.filter(c =>
    c.business_name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_person?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Klanten</div>
        <div className="sd-page-sub">{clients.length} klanten in het systeem.</div>
      </div>
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
