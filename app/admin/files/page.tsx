"use client";
import { useEffect, useState } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
const TYPE_ICONS: Record<string,string> = {"Logo":"🎨","Foto's":"🖼️","Document":"📄","PDF":"📋"};
type UploadRow = { id:string; name:string; type?:string; size?:string; created_at:string; profiles?: { business_name:string }; };

export default function AdminFilesPage() {
  const [files,   setFiles]   = useState<UploadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/files", { headers: {"x-admin-secret": ADMIN_SECRET} })
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setFiles(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Bestanden</div>
        <div className="sd-page-sub">Alle geüploade bestanden van klanten.</div>
      </div>
      <div className="sd-card">
        {loading ? <div className="sd-loading">Laden…</div> : files.length === 0
          ? <p style={{color:"var(--s-muted)",fontSize:13}}>Nog geen bestanden.</p>
          : (
            <div className="sd-table-wrap">
              <table className="sd-table">
                <thead><tr><th>Bestand</th><th>Klant</th><th>Type</th><th>Grootte</th><th>Datum</th></tr></thead>
                <tbody>
                  {files.map(f => (
                    <tr key={f.id}>
                      <td style={{fontWeight:500,fontSize:13}}>
                        <span style={{marginRight:8}}>{TYPE_ICONS[f.type ?? ""] ?? "📄"}</span>{f.name}
                      </td>
                      <td style={{color:"var(--s-muted)",fontSize:13}}>{f.profiles?.business_name ?? "—"}</td>
                      <td><span className="sd-badge sd-badge-gray">{f.type ?? "—"}</span></td>
                      <td style={{color:"var(--s-muted)",fontSize:12}}>{f.size ?? "—"}</td>
                      <td style={{color:"var(--s-muted)",fontSize:12}}>{f.created_at.slice(0,10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}
