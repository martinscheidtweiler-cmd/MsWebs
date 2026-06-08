"use client";
import { useEffect, useState } from "react";
import { supabase, Upload } from "../../lib/supabase";

const FILE_ICONS: Record<string, string> = { "Logo": "🎨", "Foto's": "🖼️", "Document": "📄" };

export default function UploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId]   = useState<string | null>(null);
  const [form, setForm]       = useState({ name: "", type: "Foto's", size: "" });
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from("uploads").select("*")
        .eq("client_id", session.user.id).order("created_at", { ascending: false });
      if (data) setUploads(data);
      setLoading(false);
    }
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !form.name) return;
    setSaving(true);
    const { data, error } = await supabase.from("uploads").insert({
      client_id: userId, name: form.name, type: form.type, size: form.size || null,
    }).select().single();
    if (!error && data) {
      setUploads(prev => [data, ...prev]);
      setForm({ name: "", type: "Foto's", size: "" });
      setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Bestanden</div>
        <div className="sd-page-sub">Upload logo's, foto's en documenten voor je website.</div>
      </div>

      <div className="sd-grid-2" style={{ marginBottom: 24 }}>
        <div className="sd-card">
          <div className="sd-card-title">Bestand registreren</div>
          {success && <div className="sd-alert sd-alert-success" style={{ marginBottom: 12 }}>✓ Bestand geregistreerd!</div>}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 6 }}>Bestandsnaam *</label>
              <input className="sd-input" placeholder="mijn-logo.svg" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 6 }}>Type</label>
              <select className="sd-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {["Logo","Foto's","Document","Andere"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <button className="sd-btn sd-btn-primary" type="submit" disabled={saving}>
              {saving ? "Opslaan…" : "Registreren →"}
            </button>
          </form>
          <div className="sd-alert sd-alert-info" style={{ marginTop: 16, fontSize: 12 }}>
            💡 Stuur bestanden via WhatsApp of e-mail. Registreer ze hier voor overzicht.
          </div>
        </div>

        <div className="sd-card">
          <div className="sd-card-title">Geüploade bestanden</div>
          {loading && <div style={{ color: "var(--s-muted)", fontSize: 13 }}>Laden…</div>}
          {!loading && uploads.length === 0 && <p style={{ color: "var(--s-muted)", fontSize: 13 }}>Nog geen bestanden.</p>}
          {uploads.map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--s-border)" }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{FILE_ICONS[u.type ?? ""] ?? "📄"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--s-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                <div style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 2 }}>
                  {u.type ?? "Bestand"}{u.size ? ` · ${u.size}` : ""} · {u.created_at.slice(0, 10)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
