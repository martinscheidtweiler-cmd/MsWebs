"use client";
import { useEffect, useState } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "Denita1234!";
const ADDON_PRICES: Record<string,number> = {"google-boost":9.99,"webshop":19.99,"appointment":19.99,"extra-lang":9.99};
const ADDON_NAMES:  Record<string,string> = {"google-boost":"Google Boost","webshop":"Webshop","appointment":"Afspraakmodule","extra-lang":"Extra taal"};
type Profile = { id:string; business_name:string; subscription_price:number; active_addons:string[]; since:string; };

export default function AdminBillingPage() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/clients", { headers: {"x-admin-secret": ADMIN_SECRET} })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setClients(d); setLoading(false); });
  }, []);

  const rows = clients.map(c => {
    const addonTotal = (c.active_addons??[]).reduce((s,k) => s+(ADDON_PRICES[k]??0),0);
    return { ...c, addonTotal, mrr: c.subscription_price + addonTotal };
  });
  const totalMrr = rows.reduce((s,r) => s+r.mrr, 0);

  return (
    <div>
      <div className="sd-page-header">
        <div className="sd-page-title">Facturatie & MRR</div>
        <div className="sd-page-sub">Overzicht van maandelijkse inkomsten per klant.</div>
      </div>

      {loading ? <div className="sd-loading">Laden…</div> : <>
        <div className="sd-grid-3" style={{marginBottom:20}}>
          {[
            {icon:"💰",label:"Totaal MRR",        val:`€${totalMrr.toFixed(2)}`, sub:`${clients.length} klanten`},
            {icon:"📈",label:"Jaar projectie",    val:`€${(totalMrr*12).toFixed(0)}`, sub:"op basis van huidig MRR"},
            {icon:"💳",label:"Gem. per klant",    val:clients.length?`€${(totalMrr/clients.length).toFixed(2)}`:"—", sub:"gemiddeld MRR"},
          ].map(s => (
            <div className="sd-stat" key={s.label}>
              <div className="sd-stat-icon">{s.icon}</div>
              <div className="sd-stat-label">{s.label}</div>
              <div className="sd-stat-value">{s.val}</div>
              <div className="sd-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="sd-card">
          <div className="sd-card-title">MRR per klant</div>
          <div className="sd-table-wrap">
            <table className="sd-table">
              <thead><tr><th>Klant</th><th>Essential</th><th>Add-ons</th><th>Totaal MRR</th><th>Klant sinds</th></tr></thead>
              <tbody>
                {rows.sort((a,b) => b.mrr - a.mrr).map(r => (
                  <tr key={r.id}>
                    <td style={{fontWeight:600}}>{r.business_name}</td>
                    <td>€{r.subscription_price.toFixed(2)}</td>
                    <td style={{fontSize:12,color:"var(--s-muted)"}}>
                      {(r.active_addons??[]).map(k => ADDON_NAMES[k]??k).join(", ") || "—"}
                    </td>
                    <td style={{fontWeight:700,color:"var(--s-purple)"}}>€{r.mrr.toFixed(2)}</td>
                    <td style={{color:"var(--s-muted)",fontSize:12}}>{r.since}</td>
                  </tr>
                ))}
                <tr style={{borderTop:"2px solid var(--s-border)"}}>
                  <td colSpan={3} style={{fontWeight:700,paddingTop:12}}>Totaal MRR</td>
                  <td style={{fontWeight:800,fontSize:16,color:"var(--s-purple)",paddingTop:12}}>€{totalMrr.toFixed(2)}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>}
    </div>
  );
}
