"use client";
import { useEffect, useState } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
type Req = { id: string; title: string; status: string; priority: string; created_at: string; profiles?: { business_name: string }; };
const STATUSES = ["new","in-progress","waiting","done"] as const;
const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  new: { label: "Nieuw", cls: "sd-badge-orange" }, "in-progress": { label: "Bezig", cls: "sd-badge-blue" },
  waiting: { label: "Wacht", cls: "sd-badge-gray" }, done: { label: "Klaar", cls: "sd-badge-green" },
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<Req[]>([]);
  const [filter,   setFilter]   = useState("all");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("/api/admin/requests", { headers: { "x-admin-secret": ADMIN_SECRET } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setRequests(d); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    await fetch("/api/admin/requests", {
      method: "PUT", headers: { "x-admin-secret": ADMIN_SECRET, "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Aanvragen</div>
        <div className="sd-page-sub">{requests.filter(r => r.status !== "done").length} open aanvragen.</div>
      </div>
      <div className="sd-card">
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {["all", ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`sd-btn ${filter === s ? "sd-btn-primary" : "sd-btn-ghost"}`} style={{ fontSize: 12 }}>
              {s === "all" ? "Alle" : STATUS_LABELS[s]?.label ?? s}
            </button>
          ))}
        </div>
        {loading ? <div className="sd-loading">Laden…</div> : (
          <div className="sd-table-wrap">
            <table className="sd-table">
              <thead><tr><th>Klant</th><th>Aanvraag</th><th>Prioriteit</th><th>Status</th><th>Datum</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td style={{ fontSize: 13, color: "var(--s-muted)" }}>{r.profiles?.business_name ?? "—"}</td>
                    <td style={{ fontWeight: 500 }}>{r.title}</td>
                    <td><span className={`sd-badge ${r.priority === "Hoog" ? "sd-badge-red" : r.priority === "Laag" ? "sd-badge-gray" : "sd-badge-blue"}`}>{r.priority}</span></td>
                    <td>
                      <select className="sd-input" style={{ fontSize: 12, padding: "4px 8px", width: "auto" }}
                        value={r.status} onChange={e => updateStatus(r.id, e.target.value)}>
                        {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]?.label}</option>)}
                      </select>
                    </td>
                    <td style={{ fontSize: 12, color: "var(--s-muted)" }}>{r.created_at.slice(0,10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
