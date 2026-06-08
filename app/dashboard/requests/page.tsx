"use client";
import { useEffect, useState } from "react";
import { supabase, Request } from "../../lib/supabase";

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  new:         { label: "Nieuw",   cls: "sd-badge-orange" },
  "in-progress":{ label: "Bezig", cls: "sd-badge-blue"   },
  waiting:     { label: "Wacht",  cls: "sd-badge-gray"   },
  done:        { label: "Klaar",  cls: "sd-badge-green"  },
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading]   = useState(true);
  const [sending, setSending]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [userId, setUserId]     = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", type: "Inhoud aanpassen", priority: "Normaal" });

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from("requests").select("*")
        .eq("client_id", session.user.id).order("created_at", { ascending: false });
      if (data) setRequests(data);
      setLoading(false);
    }
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !form.title) return;
    setSending(true);
    const { data, error } = await supabase.from("requests").insert({
      client_id: userId, ...form, status: "new",
    }).select().single();
    if (!error && data) {
      setRequests(prev => [data, ...prev]);
      setForm({ title: "", description: "", type: "Inhoud aanpassen", priority: "Normaal" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSending(false);
  }

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Wijzigingen aanvragen</div>
        <div className="sd-page-sub">Stuur een aanvraag voor aanpassingen aan je website.</div>
      </div>

      <div className="sd-grid-2" style={{ marginBottom: 24 }}>
        <div className="sd-card">
          <div className="sd-card-title">Nieuwe aanvraag</div>
          {success && <div className="sd-alert sd-alert-success" style={{ marginBottom: 12 }}>✓ Aanvraag ingediend!</div>}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 6 }}>Titel *</label>
              <input className="sd-input" placeholder="Wat wil je aanpassen?" value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 6 }}>Type</label>
              <select className="sd-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {["Inhoud aanpassen","Design aanpassen","Technisch probleem","Nieuwe pagina","Andere"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 6 }}>Prioriteit</label>
              <select className="sd-input" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                {["Laag","Normaal","Hoog"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--s-muted)", display: "block", marginBottom: 6 }}>Omschrijving</label>
              <textarea className="sd-input" rows={4} placeholder="Beschrijf zo duidelijk mogelijk wat je wil..." value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: "vertical" }} />
            </div>
            <button className="sd-btn sd-btn-primary" type="submit" disabled={sending}>
              {sending ? "Verzenden…" : "Aanvraag indienen →"}
            </button>
          </form>
        </div>

        <div className="sd-card">
          <div className="sd-card-title">Aanvraaghistoriek</div>
          {loading && <div style={{ color: "var(--s-muted)", fontSize: 13 }}>Laden…</div>}
          {!loading && requests.length === 0 && <p style={{ color: "var(--s-muted)", fontSize: 13 }}>Nog geen aanvragen.</p>}
          {requests.map(r => (
            <div key={r.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--s-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--s-text)" }}>{r.title}</div>
                <span className={`sd-badge ${STATUS_LABELS[r.status]?.cls ?? "sd-badge-gray"}`}>
                  {STATUS_LABELS[r.status]?.label ?? r.status}
                </span>
              </div>
              {r.description && <div style={{ fontSize: 12, color: "var(--s-muted)", marginBottom: 4, lineHeight: 1.5 }}>{r.description}</div>}
              <div style={{ fontSize: 11, color: "var(--s-border)", marginTop: 4 }}>{r.type} · {r.priority} · {r.created_at.slice(0,10)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
