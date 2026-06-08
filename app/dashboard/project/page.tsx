"use client";
import { useEffect, useState } from "react";
import { supabase, Profile } from "../../lib/supabase";

const STEP_ORDER = ["intake","design","feedback","adjustments","ready","online"];
const STEP_LABELS: Record<string, string> = {
  intake: "Intake ontvangen", design: "Eerste ontwerp",
  feedback: "Feedbackronde", adjustments: "Aanpassingen",
  ready: "Website klaar", online: "Website online",
};

export default function ProjectPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) setProfile(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="sd-loading">Laden…</div>;
  if (!profile) return <div className="sd-loading">Geen profiel gevonden.</div>;

  const currentIdx = STEP_ORDER.indexOf(profile.project_step);

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Projectstatus</div>
        <div className="sd-page-sub">Volg de voortgang van je website op.</div>
      </div>
      <div className="sd-grid-2" style={{ marginBottom: 20 }}>
        <div className="sd-stat">
          <div className="sd-stat-label">Huidige status</div>
          <span className="sd-badge sd-badge-green" style={{ marginTop: 6, display: "inline-flex" }}>
            {STEP_LABELS[profile.project_step] ?? profile.project_step}
          </span>
          <div className="sd-stat-sub">Laatste update: {profile.last_update}</div>
        </div>
        <div className="sd-stat">
          <div className="sd-stat-label">Website</div>
          <div className="sd-stat-value" style={{ fontSize: 18 }}>{profile.domain}</div>
          <div className="sd-stat-sub">
            {profile.website_url && (
              <a href={profile.website_url} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--s-purple)", textDecoration: "none", fontSize: 12 }}>
                Bezoek website →
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="sd-card">
        <div className="sd-card-title">Timeline</div>
        <div className="sd-timeline" style={{ paddingTop: 8 }}>
          {STEP_ORDER.map((key, i) => {
            const done   = i <= currentIdx;
            const active = i === currentIdx;
            return (
              <div className="sd-timeline-item" key={key}>
                <div className={`sd-timeline-dot ${done ? (active ? "active" : "done") : ""}`}>
                  {done && !active ? "✓" : ""}
                </div>
                <div>
                  <div className="sd-timeline-label" style={{ color: done ? "var(--s-text)" : "var(--s-muted)" }}>
                    {STEP_LABELS[key]}
                    {active && <span className="sd-badge sd-badge-purple" style={{ marginLeft: 10, fontSize: 10 }}>Huidig</span>}
                  </div>
                  <div className="sd-timeline-date" style={{ color: done ? undefined : "var(--s-border)" }}>
                    {done ? profile.since : "Nog niet gestart"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sd-card" style={{ marginTop: 20 }}>
        <div className="sd-card-title">Website details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Bedrijfsnaam",  val: profile.business_name },
            { label: "Domeinnaam",    val: profile.domain        },
            { label: "Website URL",   val: profile.website_url   },
            { label: "Status",        val: STEP_LABELS[profile.project_step] },
            { label: "Klant sinds",   val: profile.since         },
            { label: "Laatste update",val: profile.last_update   },
          ].map(row => (
            <div key={row.label} style={{ padding: "12px 0", borderBottom: "1px solid var(--s-border)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--s-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{row.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--s-text)" }}>{row.val ?? "—"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
