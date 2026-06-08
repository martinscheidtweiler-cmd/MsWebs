"use client";
import { useEffect, useState } from "react";
import { supabase, Profile } from "../../lib/supabase";
import { ADDONS } from "../../lib/mock-data";

export default function AddonsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [active, setActive]   = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) { setProfile(data); setActive(data.active_addons ?? []); }
      setLoading(false);
    }
    load();
  }, []);

  function toggle(key: string) {
    setActive(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  async function saveChanges() {
    if (!profile) return;
    setSaving(true);
    await supabase.from("profiles").update({ active_addons: active }).eq("id", profile.id);
    setSaved(true); setTimeout(() => setSaved(false), 3000);
    setSaving(false);
  }

  if (loading) return <div className="sd-loading">Laden…</div>;
  if (!profile) return <div className="sd-loading">Geen profiel gevonden.</div>;

  const total = 29.99 + ADDONS.filter(a => active.includes(a.key)).reduce((s, a) => s + a.price, 0);

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Add-ons beheren</div>
        <div className="sd-page-sub">Voeg modules toe aan je abonnement of beheer bestaande add-ons.</div>
      </div>
      <div className="sd-alert sd-alert-info" style={{ marginBottom: 20 }}>
        💡 Wijzigingen worden van kracht vanaf de volgende factuurdatum. Neem contact op voor onmiddellijke activatie.
      </div>
      {saved && <div className="sd-alert sd-alert-success" style={{ marginBottom: 20 }}>✓ Wijzigingen opgeslagen!</div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {ADDONS.map(a => {
          const isActive = active.includes(a.key);
          return (
            <div key={a.key} className="sd-card" style={{ border: isActive ? "2px solid var(--s-purple)" : "1px solid var(--s-border)", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{a.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, background: "var(--s-grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    +€{a.price.toFixed(2)}<span style={{ fontSize: 13, fontWeight: 500, WebkitTextFillColor: "var(--s-muted)" }}>/maand</span>
                  </div>
                </div>
                <label className="sd-toggle">
                  <input type="checkbox" checked={isActive} onChange={() => toggle(a.key)} />
                  <span className="sd-toggle-slider" />
                </label>
              </div>
              <p style={{ fontSize: 13, color: "var(--s-muted)", lineHeight: 1.6, marginBottom: 14 }}>{a.description}</p>
              <div style={{ borderTop: "1px solid var(--s-border)", paddingTop: 14 }}>
                {a.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: "#10B981", fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sd-card" style={{ background: "linear-gradient(135deg,rgba(124,58,237,.05) 0%,rgba(236,72,153,.05) 100%)" }}>
        <div className="sd-card-title">Overzicht</div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--s-border)", fontSize: 14 }}>
          <span>Website Essential</span><span style={{ fontWeight: 600 }}>€29,99</span>
        </div>
        {ADDONS.filter(a => active.includes(a.key)).map(a => (
          <div key={a.key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--s-border)", fontSize: 14 }}>
            <span>{a.name}</span><span style={{ fontWeight: 600 }}>+€{a.price.toFixed(2)}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontWeight: 800, fontSize: 18 }}>
          <span>Totaal per maand</span>
          <span style={{ background: "var(--s-grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>€{total.toFixed(2)}</span>
        </div>
        <button className="sd-btn sd-btn-primary" onClick={saveChanges} disabled={saving}
          style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
          {saving ? "Opslaan…" : "Wijzigingen opslaan"}
        </button>
      </div>
    </div>
  );
}
