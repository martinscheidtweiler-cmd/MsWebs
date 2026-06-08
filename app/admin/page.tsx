"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
const ADDON_PRICES: Record<string, number> = { "google-boost": 9.99, "webshop": 19.99, "appointment": 19.99, "extra-lang": 9.99 };

type Profile = { id: string; business_name: string; contact_person: string; email?: string; website_url?: string; website_status: string; active_addons: string[]; subscription_price: number; since: string; last_update: string; };
type Req     = { id: string; client_id: string; title: string; status: string; priority: string; created_at: string; profiles?: { business_name: string } };

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  new:          { label: "Nieuw",   cls: "sd-badge-orange" },
  "in-progress":{ label: "Bezig",  cls: "sd-badge-blue"   },
  waiting:      { label: "Wacht",  cls: "sd-badge-gray"   },
  done:         { label: "Klaar",  cls: "sd-badge-green"  },
};
const WS_LABELS: Record<string, string> = { online:"Online", "in-design":"In opmaak", feedback:"Feedback", adjustments:"Aanpassingen", ready:"Klaar", intake:"Intake" };

function calcMrr(p: Profile) { return p.subscription_price + (p.active_addons ?? []).reduce((s, k) => s + (ADDON_PRICES[k] ?? 0), 0); }

export default function AdminDashboard() {
  const [clients,  setClients]  = useState<Profile[]>([]);
  const [requests, setRequests] = useState<Req[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function load() {
      const headers = { "x-admin-secret": ADMIN_SECRET };
      const [cr, rr] = await Promise.all([
        fetch("/api/admin/clients",  { headers }),
        fetch("/api/admin/requests", { headers }),
      ]);
      if (cr.ok) setClients(await cr.json());
      if (rr.ok) setRequests(await rr.json());
      setLoading(false);
    }
    load();
  }, []);

  const totalMrr   = clients.reduce((s, c) => s + calcMrr(c), 0);
  const onlineCount = clients.filter(c => c.website_status === "online").length;
  const openReqs   = requests.filter(r => r.status !== "done");

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Admin Dashboard</div>
        <div className="sd-page-sub">Overzicht van alle klanten en aanvragen.</div>
      </div>

      {loading ? <div className="sd-loading">Laden…</div> : <>
        <div className="sd-grid-4" style={{ marginBottom: 24 }}>
          {[
            { icon: "💰", label: "Maandelijkse omzet", value: `€${totalMrr.toFixed(2)}`, sub: `${clients.length} actieve klanten` },
            { icon: "🌐", label: "Websites online",    value: onlineCount,                sub: `van ${clients.length} klanten` },
            { icon: "📋", label: "Open aanvragen",     value: openReqs.length,            sub: `${requests.length} totaal` },
            { icon: "📈", label: "Jaar projectie",     value: `€${(totalMrr * 12).toFixed(0)}`, sub: "op basis van huidig MRR" },
          ].map(s => (
            <div className="sd-stat" key={s.label}>
              <div className="sd-stat-icon">{s.icon}</div>
              <div className="sd-stat-label">{s.label}</div>
              <div className="sd-stat-value">{s.value}</div>
              <div className="sd-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="sd-grid-2">
          <div className="sd-card">
            <div className="sd-card-title">
              Klanten
              <Link href="/admin/clients" style={{ fontSize: 12, color: "var(--s-purple)", textDecoration: "none" }}>Alles →</Link>
            </div>
            <div className="sd-table-wrap">
              <table className="sd-table">
                <thead><tr><th>Bedrijf</th><th>Status</th><th>MRR</th></tr></thead>
                <tbody>
                  {clients.slice(0, 5).map(c => (
                    <tr key={c.id}>
                      <td><Link href={`/admin/clients/${c.id}`} style={{ color: "var(--s-purple)", textDecoration: "none", fontWeight: 500 }}>{c.business_name}</Link></td>
                      <td><span className={`sd-badge ${c.website_status === "online" ? "sd-badge-green" : "sd-badge-blue"}`}>{WS_LABELS[c.website_status] ?? c.website_status}</span></td>
                      <td style={{ fontWeight: 600 }}>€{calcMrr(c).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="sd-card">
            <div className="sd-card-title">
              Recente aanvragen
              <Link href="/admin/requests" style={{ fontSize: 12, color: "var(--s-purple)", textDecoration: "none" }}>Alles →</Link>
            </div>
            {requests.slice(0, 5).map(r => (
              <div key={r.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--s-border)" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 2 }}>{r.profiles?.business_name ?? "—"}</div>
                </div>
                <span className={`sd-badge ${STATUS_LABELS[r.status]?.cls ?? "sd-badge-gray"}`}>{STATUS_LABELS[r.status]?.label ?? r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </>}
    </div>
  );
}
