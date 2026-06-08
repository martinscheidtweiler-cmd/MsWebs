"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Profile, Request, TimeLog, calcMrr } from "../lib/supabase";

const statusLabel: Record<string, { label: string; cls: string }> = {
  online:      { label: "Online",              cls: "sd-badge-green"  },
  "in-design": { label: "In opmaak",           cls: "sd-badge-blue"   },
  feedback:    { label: "Wacht op feedback",   cls: "sd-badge-orange" },
  adjustments: { label: "Aanpassingen",        cls: "sd-badge-orange" },
  ready:       { label: "Klaar",               cls: "sd-badge-purple" },
  intake:      { label: "Intake",              cls: "sd-badge-gray"   },
};

const QUICK_ACTIONS = [
  { href: "/dashboard/requests", icon: "✏️", label: "Wijziging aanvragen",  desc: "Stuur een aanvraag voor aanpassingen" },
  { href: "/dashboard/uploads",  icon: "📁", label: "Bestanden uploaden",   desc: "Logo's, foto's en documenten" },
  { href: "/dashboard/billing",  icon: "💳", label: "Facturen bekijken",    desc: "Betalingen en abonnement" },
  { href: "/dashboard/addons",   icon: "⚡", label: "Add-ons beheren",      desc: "Modules toevoegen of beheren" },
];

export default function DashboardPage() {
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [logs, setLogs]         = useState<TimeLog[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;

      const [{ data: p }, { data: r }, { data: t }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).single(),
        supabase.from("requests").select("*").eq("client_id", uid).order("created_at", { ascending: false }).limit(5),
        supabase.from("time_logs").select("*").eq("client_id", uid).order("date", { ascending: false }),
      ]);
      if (p) setProfile(p);
      if (r) setRequests(r);
      if (t) setLogs(t);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="sd-loading">Laden…</div>;
  if (!profile) return <div className="sd-loading">Geen profiel gevonden.</div>;

  const mrr       = calcMrr(profile.subscription_price, profile.active_addons);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthLogs = logs.filter(l => l.date.startsWith(thisMonth) && !l.billable);
  const minutesUsed = monthLogs.reduce((s, l) => s + l.minutes, 0);
  const usedPct   = Math.min(100, Math.round((minutesUsed / profile.minutes_included) * 100));
  const s         = statusLabel[profile.website_status] ?? { label: profile.website_status, cls: "sd-badge-gray" };
  const openCount = requests.filter(r => r.status !== "done").length;

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Welkom terug, {profile.contact_person.split(" ")[0]} 👋</div>
        <div className="sd-page-sub">{profile.business_name} · Laatste update: {profile.last_update}</div>
      </div>

      <div className="sd-grid-4" style={{ marginBottom: 20 }}>
        <div className="sd-stat">
          <div className="sd-stat-icon">🌐</div>
          <div className="sd-stat-label">Website status</div>
          <div style={{ marginTop: 6 }}><span className={`sd-badge ${s.cls}`}>{s.label}</span></div>
          <div className="sd-stat-sub">{profile.website_url}</div>
        </div>
        <div className="sd-stat">
          <div className="sd-stat-icon">💳</div>
          <div className="sd-stat-label">Actief abonnement</div>
          <div className="sd-stat-value" style={{ fontSize: 20 }}>€{mrr.toFixed(2)}</div>
          <div className="sd-stat-sub">per maand · {profile.active_addons.length} add-ons actief</div>
        </div>
        <div className="sd-stat">
          <div className="sd-stat-icon">⏱️</div>
          <div className="sd-stat-label">Wijzigingstijd</div>
          <div className="sd-stat-value" style={{ fontSize: 20 }}>{minutesUsed} / {profile.minutes_included} min</div>
          <div className="sd-progress-bar"><div className="sd-progress-fill" style={{ width: `${usedPct}%` }} /></div>
          <div className="sd-stat-sub">{profile.minutes_included - minutesUsed} min nog beschikbaar</div>
        </div>
        <div className="sd-stat">
          <div className="sd-stat-icon">📋</div>
          <div className="sd-stat-label">Open aanvragen</div>
          <div className="sd-stat-value" style={{ fontSize: 20 }}>{openCount}</div>
          <div className="sd-stat-sub">Klant sinds {profile.since}</div>
        </div>
      </div>

      <div className="sd-card" style={{ marginBottom: 20 }}>
        <div className="sd-card-title">Snelle acties</div>
        <div className="sd-grid-4">
          {QUICK_ACTIONS.map(a => (
            <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--s-off)", border: "1px solid var(--s-border)", borderRadius: 10, padding: 16, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--s-purple)"; (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--s-border)"; (e.currentTarget as HTMLElement).style.background = "var(--s-off)"; }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--s-text)", marginBottom: 4 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: "var(--s-muted)" }}>{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sd-grid-2">
        <div className="sd-card">
          <div className="sd-card-title">
            Recente aanvragen
            <Link href="/dashboard/requests" style={{ fontSize: 12, color: "var(--s-purple)", textDecoration: "none", fontWeight: 500 }}>Alles bekijken →</Link>
          </div>
          {requests.length === 0 && <p style={{ color: "var(--s-muted)", fontSize: 13 }}>Geen aanvragen gevonden.</p>}
          {requests.map(r => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid var(--s-border)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--s-text)" }}>{r.title}</div>
                <div style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 2 }}>{r.created_at.slice(0, 10)}</div>
              </div>
              <span className={`sd-badge ${r.status === "done" ? "sd-badge-green" : r.status === "in-progress" ? "sd-badge-blue" : "sd-badge-orange"}`}>
                {r.status === "done" ? "Afgerond" : r.status === "in-progress" ? "Bezig" : "Nieuw"}
              </span>
            </div>
          ))}
        </div>

        <div className="sd-card">
          <div className="sd-card-title">Tijdregistratie deze maand</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, padding: 12, background: "var(--s-off)", borderRadius: 8 }}>
            {[
              { val: profile.minutes_included, label: "Inbegrepen", color: "var(--s-text)" },
              { val: minutesUsed,              label: "Gebruikt",   color: "var(--s-purple)" },
              { val: Math.max(0, profile.minutes_included - minutesUsed), label: "Beschikbaar", color: "#10B981" },
            ].map(({ val, label, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color }}>{val}</div>
                <div style={{ fontSize: 11, color: "var(--s-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
          {logs.slice(0, 3).map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--s-border)", fontSize: 13 }}>
              <div>
                <div style={{ fontWeight: 500, color: "var(--s-text)" }}>{t.description}</div>
                <div style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 2 }}>{t.date}</div>
              </div>
              <div style={{ fontWeight: 600, color: t.billable ? "var(--s-error)" : "var(--s-muted)" }}>
                {t.minutes} min{t.billable ? " *" : ""}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 12 }}>* Extra factureerbaar — €20 per begonnen 30 min</div>
        </div>
      </div>
    </div>
  );
}
