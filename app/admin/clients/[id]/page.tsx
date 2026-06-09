"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ADDONS, PROJECT_STEPS } from "../../../lib/mock-data";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
const STATUS_OPTIONS = ["intake","in-design","feedback","adjustments","ready","online"];
const STATUS_LABELS: Record<string,string> = {
  intake:"Intake","in-design":"In opmaak",feedback:"Wacht op feedback",
  adjustments:"Aanpassingen",ready:"Klaar",online:"Online"
};
const MINUTE_OPTIONS = [10,15,20,30,45,60,90,120];
const ADDON_PRICES: Record<string,number> = {"google-boost":9.99,"webshop":19.99,"appointment":19.99,"extra-lang":9.99};

type Profile  = { id:string; business_name:string; contact_person:string; phone?:string; website_url?:string; domain?:string; website_status:string; project_step:string; subscription_price:number; active_addons:string[]; minutes_included:number; since:string; last_update:string; };
type TimeLog  = { id:string; date:string; description:string; minutes:number; billable:boolean; };
type Req      = { id:string; title:string; status:string; priority:string; created_at:string; };
type Upload   = { id:string; name:string; type?:string; size?:string; created_at:string; };

const STATUS_BADGE: Record<string,string> = { new:"sd-badge-orange","in-progress":"sd-badge-blue",waiting:"sd-badge-gray",done:"sd-badge-green" };
const STATUS_LBL:   Record<string,string> = { new:"Nieuw","in-progress":"Bezig",waiting:"Wacht",done:"Klaar" };

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [profile,   setProfile]   = useState<Profile | null>(null);
  const [timeLogs,  setTimeLogs]  = useState<TimeLog[]>([]);
  const [requests,  setRequests]  = useState<Req[]>([]);
  const [uploads,   setUploads]   = useState<Upload[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [logForm,   setLogForm]   = useState({ description:"", date: new Date().toISOString().slice(0,10), minutes:30, billable:false });
  const [addingLog, setAddingLog] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/clients/${id}`, { headers: { "x-admin-secret": ADMIN_SECRET } })
      .then(r => r.json()).then(d => {
        if (d.profile)  setProfile(d.profile);
        if (d.timeLogs) setTimeLogs(d.timeLogs);
        if (d.requests) setRequests(d.requests);
        if (d.uploads)  setUploads(d.uploads);
        setLoading(false);
      });
  }, [id]);

  async function saveProfile() {
    if (!profile) return;
    setSaving(true);
    await fetch(`/api/admin/clients/${id}`, {
      method:"PUT", headers:{"x-admin-secret":ADMIN_SECRET,"Content-Type":"application/json"},
      body: JSON.stringify({ business_name:profile.business_name, contact_person:profile.contact_person,
        phone:profile.phone, website_url:profile.website_url, domain:profile.domain,
        website_status:profile.website_status, project_step:profile.project_step,
        active_addons:profile.active_addons }),
    });
    setSaved(true); setTimeout(() => setSaved(false), 3000); setSaving(false);
  }

  async function addLog() {
    if (!profile || !logForm.description) return;
    setAddingLog(true);
    const res = await fetch("/api/admin/timelogs", {
      method:"POST", headers:{"x-admin-secret":ADMIN_SECRET,"Content-Type":"application/json"},
      body: JSON.stringify({ client_id:id, ...logForm }),
    });
    if (res.ok) {
      const data = await res.json();
      setTimeLogs(prev => [data, ...prev]);
      setLogForm({ description:"", date: new Date().toISOString().slice(0,10), minutes:30, billable:false });
    }
    setAddingLog(false);
  }

  function toggleAddon(key: string) {
    if (!profile) return;
    const addons = profile.active_addons.includes(key)
      ? profile.active_addons.filter(k => k !== key)
      : [...profile.active_addons, key];
    setProfile({ ...profile, active_addons: addons });
  }

  if (loading) return <div className="sd-loading">Laden…</div>;
  if (!profile) return <div className="sd-card"><p style={{color:"var(--s-muted)"}}>Klant niet gevonden.</p></div>;

  const thisMonth    = new Date().toISOString().slice(0,7);
  const monthMinutes = timeLogs.filter(l => l.date.startsWith(thisMonth) && !l.billable).reduce((s,l) => s+l.minutes, 0);
  const extraMin     = timeLogs.filter(l => l.billable).reduce((s,l) => s+l.minutes, 0);
  const extraCost    = Math.ceil(extraMin / 30) * 20;
  const mrr          = profile.subscription_price + profile.active_addons.reduce((s,k) => s+(ADDON_PRICES[k]??0), 0);
  const stepIdx      = PROJECT_STEPS.findIndex(s => s.key === profile.project_step);

  return (
    <div>
      <div className="sd-page-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div>
          <div className="sd-page-title">{profile.business_name}</div>
          <div className="sd-page-sub">{profile.contact_person} · Klant sinds {profile.since}</div>
        </div>
        <Link href="/admin/clients" style={{fontSize:12,color:"var(--s-muted)",textDecoration:"none"}}>← Terug</Link>
      </div>

      {saved && <div className="sd-alert sd-alert-success" style={{marginBottom:16}}>✓ Opgeslagen!</div>}

      <div className="sd-grid-2" style={{marginBottom:20}}>
        {/* Edit profile */}
        <div className="sd-card">
          <div className="sd-card-title">Klantgegevens</div>
          {[
            {label:"Bedrijfsnaam",   key:"business_name"},
            {label:"Contactpersoon", key:"contact_person"},
            {label:"Telefoon",       key:"phone"},
            {label:"Website URL",    key:"website_url"},
            {label:"Domein",         key:"domain"},
          ].map(({label,key}) => (
            <div key={key} style={{marginBottom:12}}>
              <label style={{fontSize:11,fontWeight:600,color:"var(--s-muted)",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</label>
              <input className="sd-input" value={(profile as unknown as Record<string,string>)[key] ?? ""}
                onChange={e => setProfile({...profile,[key]:e.target.value})} />
            </div>
          ))}
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,fontWeight:600,color:"var(--s-muted)",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Website status</label>
            <select className="sd-input" value={profile.website_status} onChange={e => setProfile({...profile,website_status:e.target.value})}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:600,color:"var(--s-muted)",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Projectstap</label>
            <select className="sd-input" value={profile.project_step} onChange={e => setProfile({...profile,project_step:e.target.value})}>
              {PROJECT_STEPS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
            <div style={{marginTop:8,height:6,borderRadius:3,background:"var(--s-border)",overflow:"hidden"}}>
              <div style={{width:`${((stepIdx+1)/PROJECT_STEPS.length)*100}%`,height:"100%",background:"var(--s-grad)",transition:"width .3s"}} />
            </div>
          </div>
          <button className="sd-btn sd-btn-primary" onClick={saveProfile} disabled={saving}>{saving?"Opslaan…":"Opslaan"}</button>
        </div>

        {/* Time tracking */}
        <div className="sd-card">
          <div className="sd-card-title">Tijdregistratie</div>
          <div style={{display:"flex",gap:12,marginBottom:16}}>
            {[
              {label:"Inbegrepen",  val:profile.minutes_included,color:"var(--s-text)"},
              {label:"Gebruikt",    val:monthMinutes,            color:"var(--s-purple)"},
              {label:"Resterend",   val:Math.max(0,profile.minutes_included-monthMinutes),color:"#10B981"},
              {label:"Extra (€)",   val:`€${extraCost}`,         color:"var(--s-error)"},
            ].map(s => (
              <div key={s.label} style={{flex:1,textAlign:"center",padding:10,background:"var(--s-off)",borderRadius:8}}>
                <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.val}</div>
                <div style={{fontSize:10,color:"var(--s-muted)",marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Add log */}
          <div style={{marginBottom:12,padding:12,border:"1px solid var(--s-border)",borderRadius:8}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--s-muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Tijd toevoegen</div>
            <input className="sd-input" placeholder="Omschrijving…" value={logForm.description}
              onChange={e => setLogForm({...logForm,description:e.target.value})} style={{marginBottom:8}} />
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <input className="sd-input" type="date" value={logForm.date}
                onChange={e => setLogForm({...logForm,date:e.target.value})} style={{flex:1}} />
              <select className="sd-input" value={logForm.minutes}
                onChange={e => setLogForm({...logForm,minutes:Number(e.target.value)})} style={{width:"auto"}}>
                {MINUTE_OPTIONS.map(m => <option key={m} value={m}>{m} min</option>)}
              </select>
            </div>
            <label style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"var(--s-muted)",marginBottom:8,cursor:"pointer"}}>
              <input type="checkbox" checked={logForm.billable} onChange={e => setLogForm({...logForm,billable:e.target.checked})} />
              Factureerbaar (extra kost)
            </label>
            <button className="sd-btn sd-btn-primary" onClick={addLog} disabled={addingLog||!logForm.description} style={{width:"100%",justifyContent:"center"}}>
              {addingLog?"Opslaan…":"+ Tijd toevoegen"}
            </button>
          </div>
          {/* Log history */}
          <div style={{maxHeight:200,overflowY:"auto"}}>
            {timeLogs.slice(0,8).map(t => (
              <div key={t.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--s-border)",fontSize:12}}>
                <div>
                  <span style={{fontWeight:500,color:"var(--s-text)"}}>{t.description}</span>
                  <span style={{color:"var(--s-muted)",marginLeft:8}}>{t.date}</span>
                </div>
                <span style={{fontWeight:600,color:t.billable?"var(--s-error)":"var(--s-muted)"}}>{t.minutes}m{t.billable?" *":""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sd-grid-2" style={{marginBottom:20}}>
        {/* Add-ons */}
        <div className="sd-card">
          <div className="sd-card-title">Add-ons · MRR: €{mrr.toFixed(2)}/mnd</div>
          {ADDONS.map(a => {
            const on = profile.active_addons.includes(a.key);
            return (
              <div key={a.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--s-border)"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:500}}>{a.name}</div>
                  <div style={{fontSize:11,color:"var(--s-muted)"}}>+€{a.price.toFixed(2)}/mnd</div>
                </div>
                <label className="sd-toggle">
                  <input type="checkbox" checked={on} onChange={() => toggleAddon(a.key)} />
                  <span className="sd-toggle-slider" />
                </label>
              </div>
            );
          })}
        </div>

        {/* Requests */}
        <div className="sd-card">
          <div className="sd-card-title">Aanvragen</div>
          {requests.length===0 && <p style={{color:"var(--s-muted)",fontSize:13}}>Geen aanvragen.</p>}
          {requests.map(r => (
            <div key={r.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--s-border)"}}>
              <div style={{fontSize:13,fontWeight:500}}>{r.title}</div>
              <span className={`sd-badge ${STATUS_BADGE[r.status]??"sd-badge-gray"}`}>{STATUS_LBL[r.status]??r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Uploads */}
      {uploads.length > 0 && (
        <div className="sd-card">
          <div className="sd-card-title">Bestanden ({uploads.length})</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
            {uploads.map(u => (
              <div key={u.id} style={{background:"var(--s-off)",border:"1px solid var(--s-border)",borderRadius:8,padding:12,fontSize:12}}>
                <div style={{fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.name}</div>
                <div style={{color:"var(--s-muted)",marginTop:4}}>{u.type??""}{u.size?` · ${u.size}`:""}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
