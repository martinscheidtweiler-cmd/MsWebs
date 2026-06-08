"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../LangContext";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface Property {
  id: string; title: string; subtitle: string; type: string;
  location: string; municipality: string; province: string; country: string;
  price: number | null; priceOnRequest: boolean;
  groundSurface: number; livingSurface: number;
  stalls: number; indoorArena: boolean; outdoorArena: boolean;
  paddocks: number; pastures: number; boxes: number; residence: boolean;
  permits: string[]; description: string; features: string[];
  tag: string; featured: boolean; year: number; gradient: string;
}
interface BlogPost {
  id: string; title: string; excerpt: string; category: string;
  date: string; readTime: number; gradient: string; content: string;
}
interface Partner {
  id: string; name: string; file: string; dark: boolean;
}
interface SiteContent {
  hero: { tagline: string; title: string; titleAccent: string; subtitle: string; cta1Label: string; cta2Label: string; };
  stats: { value: string; label: string; }[];
  contact: { phone: string; email: string; address: string; kvk: string; };
  footer: { tagline: string; instagramUrl: string; linkedinUrl: string; youtubeUrl: string; };
  aboutPage: { title: string; intro: string; story: string; };
  verkopenPage: { heroTitle: string; heroSubtitle: string; step1Title: string; step1Text: string; step2Title: string; step2Text: string; step3Title: string; step3Text: string; step4Title: string; step4Text: string; };
  contactPage: { title: string; subtitle: string; formTitle: string; };
}

type Section = "dashboard" | "panden" | "blog" | "partners" | "tekst" | "fotos";

// ═══════════════════════════════════════════════════════════════════
// STYLE CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const C = {
  bg: "#0d0d0d", card: "#161616", border: "#242424",
  text: "#e5e5e5", muted: "#666", orange: "#ed6e21",
  danger: "#dc2626", success: "#16a34a", info: "#0ea5e9",
  sidebar: "#111111",
};

// ═══════════════════════════════════════════════════════════════════
// ADMIN TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════
const ADMIN_T = {
  nl: {
    login_title: "Hippique Admin",
    login_sub: "Geef uw wachtwoord in om verder te gaan",
    login_pw: "Wachtwoord",
    login_err: "Onjuist wachtwoord",
    login_btn: "Inloggen",
    nav_dashboard: "Dashboard",
    nav_panden: "Panden",
    nav_blog: "Blog",
    nav_partners: "Partners",
    nav_tekst: "Site Tekst",
    nav_fotos: "Foto's",
    nav_logout: "Uitloggen",
    dash_stats: ["Actieve panden", "Blog berichten", "Partners", "Featured panden"],
    dash_quick: ["Nieuw pand toevoegen", "Blog post schrijven", "Partner toevoegen", "Site tekst bewerken", "Foto's beheren"],
    pand_title: "Panden",
    pand_new: "+ Nieuw pand",
    pand_search: "Zoeken op naam, type, locatie…",
    pand_headers: ["Pand", "Type", "Locatie", "Prijs", "Tag", "Featured", "Acties"],
    pand_added: "Pand toegevoegd!",
    pand_saved: "Pand opgeslagen!",
    pand_err: "Fout bij opslaan",
    pand_deleted: "Pand verwijderd",
    pand_del_err: "Fout bij verwijderen",
    pand_del_confirm: "Pand verwijderen?",
    blog_title: "Blog",
    blog_new: "+ Nieuw artikel",
    blog_added: "Blog post aangemaakt!",
    blog_saved: "Blog post opgeslagen!",
    blog_err: "Fout bij opslaan",
    blog_deleted: "Blog post verwijderd",
    blog_del_confirm: "Blog post verwijderen?",
    partner_title: "Partners",
    partner_new: "+ Partner toevoegen",
    partner_name_req: "Naam is verplicht",
    partner_saved: "Partner opgeslagen!",
    partner_added: "Partner toegevoegd!",
    partner_err: "Fout bij opslaan",
    partner_deleted: "Partner verwijderd",
    partner_del_confirm: "Partner verwijderen?",
    tekst_saved: "Tekst opgeslagen!",
    tekst_err: "Fout bij opslaan",
    tekst_save_btn: "✓ Wijzigingen opslaan",
    tekst_saving: "Opslaan…",
    foto_deleted: "Foto verwijderd",
    foto_del_confirm: "Foto verwijderen?",
    foto_empty: aT.foto_empty,
    foto_select: aT.foto_select,
    btn_save: "✓ Opslaan",
    btn_add: "+ Toevoegen",
    btn_uploading: "Uploaden…",
    btn_cancel: "Annuleren",
    btn_edit: "✎",
    btn_delete: "✕",
    prop_types: ["Stoeterij", "Manège", "Landgoed", "Pensionstallen", "Hoeve", "Kasteeldomein", "Appartement", "Andere"],
    countries: ["België", "Nederland", "Frankrijk", "Duitsland", "Luxemburg", "Andere"],
    blog_cats: ["Markt", "Regelgeving", "Expertise", "Techniek", "Investering", "Andere"],
    field_indoor: "Overdekte rijhal",
    field_outdoor: "Buitenpiste",
    field_residence: "Woning aanwezig",
    count_pand: (n: number) => `${n} pand${n !== 1 ? "en" : ""} in de database`,
    count_blog: (n: number) => `${n} artikel${n !== 1 ? "en" : ""}`,
    count_partner: (n: number) => `${n} partner${n !== 1 ? "s" : ""}`,
  },
  fr: {
    login_title: "Hippique Admin",
    login_sub: "Entrez votre mot de passe pour continuer",
    login_pw: "Mot de passe",
    login_err: "Mot de passe incorrect",
    login_btn: "Se connecter",
    nav_dashboard: "Tableau de bord",
    nav_panden: "Biens",
    nav_blog: "Blog",
    nav_partners: "Partenaires",
    nav_tekst: "Texte du site",
    nav_fotos: "Photos",
    nav_logout: "Se déconnecter",
    dash_stats: ["Biens actifs", "Articles de blog", "Partenaires", "Biens en vedette"],
    dash_quick: ["Ajouter un bien", "Écrire un article", "Ajouter un partenaire", "Modifier le texte", "Gérer les photos"],
    pand_title: "Biens",
    pand_new: "+ Nouveau bien",
    pand_search: "Rechercher par nom, type, lieu…",
    pand_headers: ["Bien", "Type", "Lieu", "Prix", "Tag", "Vedette", "Actions"],
    pand_added: "Bien ajouté !",
    pand_saved: "Bien enregistré !",
    pand_err: "Erreur lors de l'enregistrement",
    pand_deleted: "Bien supprimé",
    pand_del_err: "Erreur lors de la suppression",
    pand_del_confirm: "Supprimer ce bien ?",
    blog_title: "Blog",
    blog_new: "+ Nouvel article",
    blog_added: "Article créé !",
    blog_saved: "Article enregistré !",
    blog_err: "Erreur lors de l'enregistrement",
    blog_deleted: "Article supprimé",
    blog_del_confirm: "Supprimer cet article ?",
    partner_title: "Partenaires",
    partner_new: "+ Ajouter un partenaire",
    partner_name_req: "Le nom est requis",
    partner_saved: "Partenaire enregistré !",
    partner_added: "Partenaire ajouté !",
    partner_err: "Erreur lors de l'enregistrement",
    partner_deleted: "Partenaire supprimé",
    partner_del_confirm: "Supprimer ce partenaire ?",
    tekst_saved: "Texte enregistré !",
    tekst_err: "Erreur lors de l'enregistrement",
    tekst_save_btn: "✓ Enregistrer les modifications",
    tekst_saving: "Enregistrement…",
    foto_deleted: "Photo supprimée",
    foto_del_confirm: "Supprimer cette photo ?",
    foto_empty: "Aucune photo pour ce bien",
    foto_select: "Sélectionnez d'abord un bien",
    btn_save: "✓ Enregistrer",
    btn_add: "+ Ajouter",
    btn_uploading: "Téléchargement…",
    btn_cancel: "Annuler",
    btn_edit: "✎",
    btn_delete: "✕",
    prop_types: ["Haras", "Manège", "Domaine", "Pension équestre", "Ferme", "Château", "Appartement", "Autre"],
    countries: ["Belgique", "Pays-Bas", "France", "Allemagne", "Luxembourg", "Autre"],
    blog_cats: ["Marché", "Réglementation", "Expertise", "Technique", "Investissement", "Autre"],
    field_indoor: "Manège couvert",
    field_outdoor: "Piste extérieure",
    field_residence: "Habitation présente",
    count_pand: (n: number) => `${n} bien${n !== 1 ? "s" : ""} dans la base`,
    count_blog: (n: number) => `${n} article${n !== 1 ? "s" : ""}`,
    count_partner: (n: number) => `${n} partenaire${n !== 1 ? "s" : ""}`,
  },
  en: {
    login_title: "Hippique Admin",
    login_sub: "Enter your password to continue",
    login_pw: "Password",
    login_err: "Incorrect password",
    login_btn: "Log in",
    nav_dashboard: "Dashboard",
    nav_panden: "Properties",
    nav_blog: "Blog",
    nav_partners: "Partners",
    nav_tekst: "Site Text",
    nav_fotos: "Photos",
    nav_logout: "Log out",
    dash_stats: ["Active properties", "Blog posts", "Partners", "Featured properties"],
    dash_quick: ["Add new property", "Write blog post", "Add partner", "Edit site text", "Manage photos"],
    pand_title: "Properties",
    pand_new: "+ New property",
    pand_search: "Search by name, type, location…",
    pand_headers: ["Property", "Type", "Location", "Price", "Tag", "Featured", "Actions"],
    pand_added: "Property added!",
    pand_saved: "Property saved!",
    pand_err: "Error saving",
    pand_deleted: "Property deleted",
    pand_del_err: "Error deleting",
    pand_del_confirm: "Delete this property?",
    blog_title: "Blog",
    blog_new: "+ New article",
    blog_added: "Blog post created!",
    blog_saved: "Blog post saved!",
    blog_err: "Error saving",
    blog_deleted: "Blog post deleted",
    blog_del_confirm: "Delete this blog post?",
    partner_title: "Partners",
    partner_new: "+ Add partner",
    partner_name_req: "Name is required",
    partner_saved: "Partner saved!",
    partner_added: "Partner added!",
    partner_err: "Error saving",
    partner_deleted: "Partner deleted",
    partner_del_confirm: "Delete this partner?",
    tekst_saved: "Text saved!",
    tekst_err: "Error saving",
    tekst_save_btn: "✓ Save changes",
    tekst_saving: "Saving…",
    foto_deleted: "Photo deleted",
    foto_del_confirm: "Delete this photo?",
    foto_empty: "No photos for this property",
    foto_select: "Select a property first",
    btn_save: "✓ Save",
    btn_add: "+ Add",
    btn_uploading: "Uploading…",
    btn_cancel: "Cancel",
    btn_edit: "✎",
    btn_delete: "✕",
    prop_types: ["Stud farm", "Riding school", "Estate", "Livery stable", "Farm", "Château", "Apartment", "Other"],
    countries: ["Belgium", "Netherlands", "France", "Germany", "Luxembourg", "Other"],
    blog_cats: ["Market", "Regulations", "Expertise", "Technical", "Investment", "Other"],
    field_indoor: "Indoor arena",
    field_outdoor: "Outdoor arena",
    field_residence: "Residence present",
    count_pand: (n: number) => `${n} propert${n !== 1 ? "ies" : "y"} in database`,
    count_blog: (n: number) => `${n} article${n !== 1 ? "s" : ""}`,
    count_partner: (n: number) => `${n} partner${n !== 1 ? "s" : ""}`,
  },
} as const;
type AdminLang = keyof typeof ADMIN_T;


const s = {
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 } as React.CSSProperties,
  input: { background: "#0a0a0a", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, width: "100%", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const, outline: "none" },
  textarea: { background: "#0a0a0a", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, width: "100%", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const, outline: "none", resize: "vertical" as const },
  select: { background: "#0a0a0a", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, width: "100%", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" as const, outline: "none" },
  label: { display: "block", fontSize: 11, color: C.muted, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.08em", fontWeight: 600 },
  btn: { background: C.orange, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 } as React.CSSProperties,
  btnSm: { background: C.orange, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 } as React.CSSProperties,
  btnDanger: { background: C.danger, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13 } as React.CSSProperties,
  btnGhost: { background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13 } as React.CSSProperties,
  btnSecondary: { background: "#222", color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 } as React.CSSProperties,
  row: { display: "flex", gap: 16 } as React.CSSProperties,
  col: { flex: 1, minWidth: 0 } as React.CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════
// API HELPERS
// ═══════════════════════════════════════════════════════════════════

const API = {
  get: (p: string) => fetch(`/api/alba-immo/${p}`).then(r => r.json()),
  post: (p: string, b: unknown) => fetch(`/api/alba-immo/${p}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }).then(r => r.json()),
  put: (p: string, b: unknown) => fetch(`/api/alba-immo/${p}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }).then(r => r.json()),
  del: (p: string) => fetch(`/api/alba-immo/${p}`, { method: "DELETE" }).then(r => r.json()),
  upload: (file: File, dest: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("dest", dest);
    return fetch("/api/alba-immo/upload", { method: "POST", body: fd }).then(r => r.json());
  },
};

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════

const EMPTY_PROP: Property = {
  id: "", title: "", subtitle: "", type: "Stoeterij",
  location: "", municipality: "", province: "", country: "België",
  price: null, priceOnRequest: false,
  groundSurface: 0, livingSurface: 0, stalls: 0,
  indoorArena: false, outdoorArena: false,
  paddocks: 0, pastures: 0, boxes: 0, residence: false,
  permits: [], description: "", features: [],
  tag: "Nieuw", featured: false, year: new Date().getFullYear(),
  gradient: "linear-gradient(135deg, #1a160f 0%, #2d2115 50%, #1e1a10 100%)",
};

const EMPTY_BLOG: BlogPost = {
  id: "", title: "", excerpt: "", category: "Markt",
  date: new Date().toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" }),
  readTime: 5, gradient: "linear-gradient(135deg, #1a160a 0%, #2a2010 100%)", content: "",
};

function fmt(n: number | null) {
  if (n === null) return "Op aanvraag";
  return "€ " + n.toLocaleString("nl-BE");
}

// ═══════════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════════

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 9999, background: ok ? C.success : C.danger, color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 600, fontSize: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "fadeInUp 0.3s ease" }}>
      {ok ? "✓" : "✕"} {msg}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOGIN GATE
// ═══════════════════════════════════════════════════════════════════

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const { lang } = useLang();
  const aT = ADMIN_T[lang as AdminLang] ?? ADMIN_T.nl;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "hippique2025") { onAuth(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: C.bg }}>
      <div style={{ width: 360, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 48 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, background: C.orange, borderRadius: 14, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🐴</div>
          <h1 style={{ margin: 0, fontSize: 22, color: C.text, fontWeight: 700 }}>{aT.login_title}</h1>
          <p style={{ margin: "8px 0 0", color: C.muted, fontSize: 14 }}>{aT.login_sub}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder={aT.login_pw} autoFocus
            style={{ ...s.input, textAlign: "center", marginBottom: 16, borderColor: err ? C.danger : C.border }} />
          {err && <p style={{ color: C.danger, textAlign: "center", fontSize: 13, margin: "0 0 12px" }}>{aT.login_err}</p>}
          <button type="submit" style={{ ...s.btn, width: "100%", justifyContent: "center" }}>{aT.login_btn}</button>
        </form>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════

const NAV = [
  { id: "dashboard", icon: "◈" },
  { id: "panden", icon: "🏠" },
  { id: "blog", icon: "✍" },
  { id: "partners", icon: "🤝" },
  { id: "tekst", icon: "Aa" },
  { id: "fotos", icon: "🖼" },
];

function Sidebar({ section, onSection, onLogout, counts }: { section: Section; onSection: (s: Section) => void; onLogout: () => void; counts: Record<string, number> }) {
  const { lang } = useLang();
  const aT = ADMIN_T[lang as AdminLang] ?? ADMIN_T.nl;
  const NAV_LABELS: Record<string, string> = { dashboard: aT.nav_dashboard, panden: aT.nav_panden, blog: aT.nav_blog, partners: aT.nav_partners, tekst: aT.nav_tekst, fotos: aT.nav_fotos };
  return (
    <aside style={{ width: 220, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "28px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, background: C.orange, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐴</div>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Hippique</div>
            <div style={{ color: C.muted, fontSize: 11 }}>Admin paneel</div>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: C.border, margin: "0 20px" }} />
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => onSection(n.id as Section)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left", transition: "all 0.15s", background: section === n.id ? "rgba(237,110,33,0.12)" : "transparent", color: section === n.id ? C.orange : C.muted, fontWeight: section === n.id ? 600 : 400, fontSize: 14 }}>
            <span style={{ fontSize: 16, width: 20 }}>{n.icon}</span>
            <span style={{ flex: 1 }}>{n.label}</span>
            {counts[n.id] !== undefined && <span style={{ fontSize: 11, background: section === n.id ? C.orange : C.border, color: section === n.id ? "#fff" : C.muted, borderRadius: 20, padding: "1px 7px", minWidth: 22, textAlign: "center" }}>{counts[n.id]}</span>}
          </button>
        ))}
      </nav>
      <div style={{ padding: "16px 12px" }}>
        <a href="/templates/alba-immo" target="_blank" style={{ display: "block", textAlign: "center", padding: "8px", borderRadius: 8, color: C.muted, fontSize: 12, marginBottom: 8, textDecoration: "none" }}>↗ Bekijk website</a>
        <button onClick={onLogout} style={{ ...s.btnGhost, width: "100%", textAlign: "center", justifyContent: "center" }}>{aT.nav_logout}</button>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════

function Dashboard({ properties, blog, partners, onSection }: { properties: Property[]; blog: BlogPost[]; partners: Partner[]; onSection: (s: Section) => void; }) {
  const stats = [
    { label: "Actieve panden", value: properties.length, color: C.orange, section: "panden" as Section },
    { label: "Blog berichten", value: blog.length, color: C.info, section: "blog" as Section },
    { label: "Partners", value: partners.length, color: C.success, section: "partners" as Section },
    { label: "Featured panden", value: properties.filter(p => p.featured).length, color: "#a855f7", section: "panden" as Section },
  ];
  return (
    <div>
      <h1 style={{ margin: "0 0 8px", fontSize: 26, color: C.text, fontWeight: 700 }}>Dashboard</h1>
      <p style={{ margin: "0 0 32px", color: C.muted, fontSize: 14 }}>Welkom terug. Hier is een overzicht van uw content.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map(st => (
          <button key={st.label} onClick={() => onSection(st.section)}
            style={{ ...s.card, cursor: "pointer", textAlign: "left", border: `1px solid ${C.border}`, transition: "border-color 0.2s" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: st.color, marginBottom: 4 }}>{st.value}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{st.label}</div>
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={s.card}>
          <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 15, fontWeight: 600 }}>Recente panden</h3>
          {properties.slice(0, 5).map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{p.type} · {p.location}</div>
              </div>
              <span style={{ fontSize: 11, background: "rgba(237,110,33,0.15)", color: C.orange, borderRadius: 20, padding: "2px 10px" }}>{p.tag}</span>
            </div>
          ))}
        </div>
        <div style={s.card}>
          <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 15, fontWeight: 600 }}>Snelle acties</h3>
          {[
            { label: aT.dash_quick[0], icon: "🏠", section: "panden" as Section },
            { label: aT.dash_quick[1], icon: "✍", section: "blog" as Section },
            { label: aT.dash_quick[2], icon: "🤝", section: "partners" as Section },
            { label: aT.dash_quick[3], icon: "Aa", section: "tekst" as Section },
            { label: aT.dash_quick[4], icon: "🖼", section: "fotos" as Section },
          ].map(a => (
            <button key={a.label} onClick={() => onSection(a.section)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 0", background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${C.border}`, textAlign: "left" }}>
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <span style={{ color: C.text, fontSize: 14 }}>{NAV_LABELS[a.id] ?? a.id}</span>
              <span style={{ marginLeft: "auto", color: C.muted }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROPERTY FORM MODAL
// ═══════════════════════════════════════════════════════════════════

function PropertyModal({ prop, onClose, onSave }: { prop: Property | null; onClose: () => void; onSave: (p: Property) => Promise<void>; }) {
  const { lang } = useLang();
  const aT = ADMIN_T[lang as AdminLang] ?? ADMIN_T.nl;
  const isNew = !prop?.id;
  const [form, setForm] = useState<Property>(prop ?? EMPTY_PROP);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState((prop?.features ?? []).join("\n"));
  const [permitsText, setPermitsText] = useState((prop?.permits ?? []).join("\n"));

  const set = (key: keyof Property, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      ...form,
      features: featuresText.split("\n").map(s => s.trim()).filter(Boolean),
      permits: permitsText.split("\n").map(s => s.trim()).filter(Boolean),
    });
    setSaving(false);
  };

  const TABS = ["Basis", "Locatie", "Prijs", "Infrastructuur", "Beschrijving", "Weergave"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 760, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ margin: 0, color: C.text, fontSize: 18, fontWeight: 700 }}>{isNew ? "Nieuw pand toevoegen" : `Bewerken: ${form.title}`}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 28px" }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              style={{ padding: "14px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 600 : 400, color: tab === i ? C.orange : C.muted, borderBottom: `2px solid ${tab === i ? C.orange : "transparent"}`, marginBottom: -1 }}>
              {t}
            </button>
          ))}
        </div>
        {/* Body */}
        <div style={{ padding: 28 }}>
          {tab === 0 && (
            <div style={{ display: "grid", gap: 16 }}>
              <div style={s.row}>
                <div style={{ flex: 2 }}><label style={s.label}>Titel *</label><input style={s.input} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Stoeterij Molenhoek" /></div>
                <div style={s.col}><label style={s.label}>Type</label>
                  <select style={s.select} value={form.type} onChange={e => set("type", e.target.value)}>
                    {aT.prop_types.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div><label style={s.label}>Ondertitel</label><input style={s.input} value={form.subtitle} onChange={e => set("subtitle", e.target.value)} placeholder="Korte beschrijving voor de kaart" /></div>
              <div style={s.row}>
                <div style={s.col}><label style={s.label}>Tag (badge)</label><input style={s.input} value={form.tag} onChange={e => set("tag", e.target.value)} placeholder="Nieuw / Exclusief / Historisch…" /></div>
                <div style={s.col}><label style={s.label}>Jaar</label><input type="number" style={s.input} value={form.year} onChange={e => set("year", Number(e.target.value))} /></div>
              </div>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: C.text, fontSize: 14 }}>
                  <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} style={{ width: 16, height: 16, accentColor: C.orange }} />
                  Uitgelicht op homepage
                </label>
              </div>
            </div>
          )}
          {tab === 1 && (
            <div style={{ display: "grid", gap: 16 }}>
              <div><label style={s.label}>Locatie (weergave)</label><input style={s.input} value={form.location} onChange={e => set("location", e.target.value)} placeholder="Molenhoek, Maasgouw" /></div>
              <div style={s.row}>
                <div style={s.col}><label style={s.label}>Gemeente</label><input style={s.input} value={form.municipality} onChange={e => set("municipality", e.target.value)} /></div>
                <div style={s.col}><label style={s.label}>Provincie</label><input style={s.input} value={form.province} onChange={e => set("province", e.target.value)} /></div>
              </div>
              <div><label style={s.label}>Land</label>
                <select style={s.select} value={form.country} onChange={e => set("country", e.target.value)}>
                  {aT.countries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}
          {tab === 2 && (
            <div style={{ display: "grid", gap: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: C.text, fontSize: 14 }}>
                <input type="checkbox" checked={form.priceOnRequest} onChange={e => set("priceOnRequest", e.target.checked)} style={{ width: 16, height: 16, accentColor: C.orange }} />
                Prijs op aanvraag
              </label>
              {!form.priceOnRequest && <div><label style={s.label}>Prijs (€)</label><input type="number" style={s.input} value={form.price ?? ""} onChange={e => set("price", e.target.value ? Number(e.target.value) : null)} placeholder="1850000" /></div>}
              <div style={s.row}>
                <div style={s.col}><label style={s.label}>Grondoppervlakte (m²)</label><input type="number" style={s.input} value={form.groundSurface} onChange={e => set("groundSurface", Number(e.target.value))} /></div>
                <div style={s.col}><label style={s.label}>Bewoonbare opp. (m²)</label><input type="number" style={s.input} value={form.livingSurface} onChange={e => set("livingSurface", Number(e.target.value))} /></div>
              </div>
              <div style={s.col}><label style={s.label}>Weiden (ha)</label><input type="number" step="0.1" style={s.input} value={form.pastures} onChange={e => set("pastures", Number(e.target.value))} /></div>
            </div>
          )}
          {tab === 3 && (
            <div style={{ display: "grid", gap: 16 }}>
              <div style={s.row}>
                <div style={s.col}><label style={s.label}>Stallen (totaal)</label><input type="number" style={s.input} value={form.stalls} onChange={e => set("stalls", Number(e.target.value))} /></div>
                <div style={s.col}><label style={s.label}>Boxen</label><input type="number" style={s.input} value={form.boxes} onChange={e => set("boxes", Number(e.target.value))} /></div>
                <div style={s.col}><label style={s.label}>Paddocks</label><input type="number" style={s.input} value={form.paddocks} onChange={e => set("paddocks", Number(e.target.value))} /></div>
              </div>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {[
                  { key: "indoorArena" as keyof Property, label: aT.field_indoor },
                  { key: "outdoorArena" as keyof Property, label: aT.field_outdoor },
                  { key: "residence" as keyof Property, label: aT.field_residence },
                ].map(({ key, label }) => (
                  <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: C.text, fontSize: 14 }}>
                    <input type="checkbox" checked={form[key] as boolean} onChange={e => set(key, e.target.checked)} style={{ width: 16, height: 16, accentColor: C.orange }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          )}
          {tab === 4 && (
            <div style={{ display: "grid", gap: 16 }}>
              <div><label style={s.label}>Beschrijving</label><textarea rows={5} style={s.textarea} value={form.description} onChange={e => set("description", e.target.value)} /></div>
              <div><label style={s.label}>Kenmerken (één per regel)</label><textarea rows={6} style={s.textarea} value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder={"Longeercirkel 20m\nKnechtenwoning 120m²\nWashbox × 4"} /></div>
              <div><label style={s.label}>Vergunningen (één per regel)</label><textarea rows={4} style={s.textarea} value={permitsText} onChange={e => setPermitsText(e.target.value)} placeholder={"Agrarische bestemming\nWoonvergunning"} /></div>
            </div>
          )}
          {tab === 5 && (
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={s.label}>Gradient CSS</label>
                <input style={s.input} value={form.gradient} onChange={e => set("gradient", e.target.value)} />
                <div style={{ marginTop: 12, height: 80, borderRadius: 10, background: form.gradient, border: `1px solid ${C.border}` }} />
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    "linear-gradient(135deg, #1a160f 0%, #2d2115 50%, #1e1a10 100%)",
                    "linear-gradient(135deg, #18100a 0%, #241808 50%, #1c1206 100%)",
                    "linear-gradient(135deg, #100e08 0%, #1c1a0e 50%, #141208 100%)",
                    "linear-gradient(135deg, #10080a 0%, #1e1010 50%, #160a0c 100%)",
                    "linear-gradient(135deg, #0f1420 0%, #1a2030 50%, #141820 100%)",
                    "linear-gradient(135deg, #080c10 0%, #101822 50%, #0a1018 100%)",
                  ].map(g => (
                    <button key={g} onClick={() => set("gradient", g)}
                      style={{ width: 48, height: 48, borderRadius: 8, background: g, border: form.gradient === g ? `2px solid ${C.orange}` : `1px solid ${C.border}`, cursor: "pointer" }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", padding: "20px 28px", borderTop: `1px solid ${C.border}` }}>
          <button onClick={onClose} style={s.btnSecondary}>Annuleren</button>
          <button onClick={() => tab > 0 && setTab(t => t - 1)} style={s.btnGhost} disabled={tab === 0}>← Vorige</button>
          {tab < 5
            ? <button onClick={() => setTab(t => t + 1)} style={s.btn}>Volgende →</button>
            : <button onClick={handleSave} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.6 : 1 }}>{saving ? "Opslaan…" : "✓ Opslaan"}</button>
          }
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PANDEN SECTION
// ═══════════════════════════════════════════════════════════════════

function PandenSection({ properties, onRefresh, onToast }: { properties: Property[]; onRefresh: () => Promise<void>; onToast: (msg: string, ok?: boolean) => void; }) {
  const [modal, setModal] = useState<Property | "new" | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (p: Property) => {
    try {
      if (!p.id || modal === "new") {
        await API.post("properties", p);
        onToast(aT.pand_added);
      } else {
        await API.put(`properties/${p.id}`, p);
        onToast(aT.pand_saved);
      }
      await onRefresh();
      setModal(null);
    } catch {
      onToast(aT.pand_err, false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.del(`properties/${id}`);
      onToast(aT.pand_deleted);
      await onRefresh();
    } catch {
      onToast(aT.pand_del_err, false);
    }
    setConfirm(null);
  };

  const toggleFeatured = async (p: Property) => {
    await API.put(`properties/${p.id}`, { ...p, featured: !p.featured });
    await onRefresh();
  };

  return (
    <div>
      {modal && (
        <PropertyModal
          prop={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, width: 380, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", color: C.text }}>Pand verwijderen?</h3>
            <p style={{ color: C.muted, margin: "0 0 24px", fontSize: 14 }}>Dit kan niet ongedaan worden gemaakt.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setConfirm(null)} style={s.btnSecondary}>Annuleren</button>
              <button onClick={() => handleDelete(confirm)} style={{ ...s.btn, background: C.danger }}>Verwijderen</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: C.text, fontWeight: 700 }}>{aT.pand_title}</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>{aT.count_pand(properties.length)}</p>
        </div>
        <button onClick={() => setModal("new")} style={s.btn}>{aT.pand_new}</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <input style={{ ...s.input, maxWidth: 340 }} placeholder={aT.pand_search} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={{ ...s.card, padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {aT.pand_headers.map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.subtitle?.slice(0, 40)}</div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.muted }}>{p.type}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.muted }}>{p.location}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.text, whiteSpace: "nowrap" }}>{fmt(p.price)}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: 11, background: "rgba(237,110,33,0.15)", color: C.orange, borderRadius: 20, padding: "3px 10px" }}>{p.tag}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => toggleFeatured(p)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
                    {p.featured ? "⭐" : "☆"}
                  </button>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setModal(p)} style={s.btnSm}>✏ Bewerken</button>
                    <button onClick={() => setConfirm(p.id)} style={s.btnDanger}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: C.muted, fontSize: 14 }}>Geen panden gevonden</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BLOG SECTION
// ═══════════════════════════════════════════════════════════════════

function BlogSection({ blog, onRefresh, onToast }: { blog: BlogPost[]; onRefresh: () => Promise<void>; onToast: (msg: string, ok?: boolean) => void; }) {
  const [modal, setModal] = useState<BlogPost | "new" | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPost>(EMPTY_BLOG);

  const openEdit = (post: BlogPost | "new") => {
    setForm(post === "new" ? { ...EMPTY_BLOG } : { ...post });
    setModal(post);
  };

  const set = (key: keyof BlogPost, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    try {
      if (modal === "new" || !form.id) {
        await API.post("blog", form);
        onToast(aT.blog_added);
      } else {
        await API.put(`blog/${form.id}`, form);
        onToast(aT.blog_saved);
      }
      await onRefresh();
      setModal(null);
    } catch {
      onToast(aT.pand_err, false);
    }
  };

  const handleDelete = async (id: string) => {
    await API.del(`blog/${id}`);
    onToast(aT.blog_deleted);
    await onRefresh();
    setConfirm(null);
  };

  return (
    <div>
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "40px 20px" }}>
          <div style={{ width: "100%", maxWidth: 720, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: `1px solid ${C.border}` }}>
              <h2 style={{ margin: 0, color: C.text, fontSize: 18, fontWeight: 700 }}>{modal === "new" ? "Nieuwe blog post" : "Blog post bewerken"}</h2>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 22 }}>×</button>
            </div>
            <div style={{ padding: 28, display: "grid", gap: 16 }}>
              <div><label style={s.label}>Titel *</label><input style={s.input} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Titel van het artikel" /></div>
              <div style={s.row}>
                <div style={s.col}>
                  <label style={s.label}>Categorie</label>
                  <select style={s.select} value={form.category} onChange={e => set("category", e.target.value)}>
                    {aT.blog_cats.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={s.col}><label style={s.label}>Datum</label><input style={s.input} value={form.date} onChange={e => set("date", e.target.value)} placeholder="12 mei 2025" /></div>
                <div style={{ width: 120 }}><label style={s.label}>Leestijd (min)</label><input type="number" style={s.input} value={form.readTime} onChange={e => set("readTime", Number(e.target.value))} /></div>
              </div>
              <div><label style={s.label}>Samenvatting (excerpt)</label><textarea rows={3} style={s.textarea} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Korte beschrijving van het artikel…" /></div>
              <div><label style={s.label}>Volledige inhoud (optioneel)</label><textarea rows={10} style={{ ...s.textarea, minHeight: 200 }} value={form.content} onChange={e => set("content", e.target.value)} placeholder="Schrijf hier de volledige tekst van uw artikel…" /></div>
              <div>
                <label style={s.label}>Gradient CSS</label>
                <input style={s.input} value={form.gradient} onChange={e => set("gradient", e.target.value)} />
                <div style={{ marginTop: 10, height: 60, borderRadius: 8, background: form.gradient, border: `1px solid ${C.border}` }} />
                <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["linear-gradient(135deg, #1a160a 0%, #2a2010 100%)", "linear-gradient(135deg, #0c1218 0%, #141e2a 100%)", "linear-gradient(135deg, #160a0c 0%, #220e12 100%)", "linear-gradient(135deg, #10080a 0%, #1e1010 100%)"]
                    .map(g => <button key={g} onClick={() => set("gradient", g)} style={{ width: 40, height: 40, borderRadius: 6, background: g, border: form.gradient === g ? `2px solid ${C.orange}` : `1px solid ${C.border}`, cursor: "pointer" }} />)}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", padding: "20px 28px", borderTop: `1px solid ${C.border}` }}>
              <button onClick={() => setModal(null)} style={s.btnSecondary}>Annuleren</button>
              <button onClick={handleSave} style={s.btn}>✓ Opslaan</button>
            </div>
          </div>
        </div>
      )}
      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, width: 360, textAlign: "center" }}>
            <p style={{ color: C.text, marginBottom: 20 }}>Blog post verwijderen?</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setConfirm(null)} style={s.btnSecondary}>Annuleren</button>
              <button onClick={() => handleDelete(confirm)} style={{ ...s.btn, background: C.danger }}>Verwijderen</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: C.text, fontWeight: 700 }}>{aT.blog_title}</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>{blog.length} artikel{blog.length !== 1 ? "en" : ""}</p>
        </div>
        <button onClick={() => openEdit("new")} style={s.btn}>{aT.blog_new}</button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {blog.map(post => (
          <div key={post.id} style={{ ...s.card, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: 10, background: post.gradient, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, color: C.text, fontWeight: 600, marginBottom: 4 }}>{post.title}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{post.category} · {post.date} · {post.readTime} min lezen</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.excerpt}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={() => openEdit(post)} style={s.btnSm}>✏ Bewerken</button>
              <button onClick={() => setConfirm(post.id)} style={s.btnDanger}>🗑</button>
            </div>
          </div>
        ))}
        {blog.length === 0 && <div style={{ textAlign: "center", padding: 60, color: C.muted }}>Nog geen artikelen aangemaakt.</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PARTNERS SECTION
// ═══════════════════════════════════════════════════════════════════

function PartnersSection({ partners, onRefresh, onToast }: { partners: Partner[]; onRefresh: () => Promise<void>; onToast: (msg: string, ok?: boolean) => void; }) {
  const [form, setForm] = useState<Partial<Partner>>({ name: "", dark: false });
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = () => { setForm({ name: "", dark: false }); setEditId(null); setFilePreview(null); setPendingFile(null); };

  const handleEdit = (p: Partner) => {
    setForm({ ...p });
    setEditId(p.id);
    setFilePreview(`/hippique/${p.file}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name) { onToast(aT.partner_name_req, false); return; }
    setUploading(true);
    try {
      let filePath = form.file ?? "";
      if (pendingFile) {
        const ext = pendingFile.name.split(".").pop();
        const slug = form.name!.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
        const dest = `partners/${slug}.${ext}`;
        const res = await API.upload(pendingFile, dest);
        filePath = dest;
        form.file = filePath;
      }
      if (editId) {
        await API.put(`partners/${editId}`, { ...form, file: filePath });
        onToast(aT.partner_saved);
      } else {
        await API.post("partners", { ...form, file: filePath });
        onToast(aT.partner_added);
      }
      await onRefresh();
      resetForm();
    } catch {
      onToast(aT.pand_err, false);
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(aT.partner_del_confirm)) return;
    await API.del(`partners/${id}`);
    onToast(aT.partner_deleted);
    await onRefresh();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: C.text, fontWeight: 700 }}>{aT.partner_title}</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>{partners.length} partners</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        {/* Partner list */}
        <div style={{ display: "grid", gap: 12 }}>
          {partners.map(p => (
            <div key={p.id} style={{ ...s.card, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 80, height: 56, background: p.dark ? "#1a1a1a" : "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                <img src={`/hippique/${p.file}`} alt={p.name} style={{ maxWidth: 72, maxHeight: 48, objectFit: "contain", filter: p.dark ? "grayscale(1) brightness(2)" : "grayscale(1) brightness(0) invert(1)" }}
                  onError={e => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{p.file} · logo op {p.dark ? "donkere" : "lichte"} achtergrond</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => handleEdit(p)} style={s.btnSm}>✏</button>
                <button onClick={() => handleDelete(p.id)} style={s.btnDanger}>🗑</button>
              </div>
            </div>
          ))}
          {partners.length === 0 && <div style={{ textAlign: "center", padding: 60, color: C.muted }}>Nog geen partners toegevoegd.</div>}
        </div>
        {/* Add/edit form */}
        <div style={{ ...s.card, alignSelf: "start" }}>
          <h3 style={{ margin: "0 0 20px", color: C.text, fontSize: 15, fontWeight: 600 }}>{editId ? aT.partner_new.replace("+ ", "✎ ") : aT.partner_new}</h3>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={s.label}>Naam</label>
              <input style={s.input} value={form.name ?? ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Naam van de partner" />
            </div>
            <div>
              <label style={s.label}>Logo afbeelding</label>
              <div style={{ border: `2px dashed ${C.border}`, borderRadius: 10, padding: 20, textAlign: "center", cursor: "pointer" }} onClick={() => fileRef.current?.click()}>
                {filePreview
                  ? <img src={filePreview} alt="" style={{ maxHeight: 60, objectFit: "contain" }} />
                  : <div style={{ color: C.muted, fontSize: 13 }}>Klik om een logo te uploaden<br /><span style={{ fontSize: 11 }}>.png, .jpg, .webp</span></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: C.text, fontSize: 14 }}>
                <input type="checkbox" checked={form.dark ?? false} onChange={e => setForm(f => ({ ...f, dark: e.target.checked }))} style={{ width: 16, height: 16, accentColor: C.orange }} />
                Logo op donkere achtergrond (wit maken)
              </label>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {editId && <button onClick={resetForm} style={s.btnGhost}>Annuleren</button>}
              <button onClick={handleSave} disabled={uploading} style={{ ...s.btn, flex: 1, justifyContent: "center", opacity: uploading ? 0.6 : 1 }}>
                {uploading ? aT.btn_uploading : editId ? aT.btn_save : aT.btn_add}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TEKST SECTION
// ═══════════════════════════════════════════════════════════════════

function TekstSection({ content, onRefresh, onToast }: { content: SiteContent | null; onRefresh: () => Promise<void>; onToast: (msg: string, ok?: boolean) => void; }) {
  const [form, setForm] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (content) setForm(JSON.parse(JSON.stringify(content))); }, [content]);

  if (!form) return <div style={{ color: C.muted, padding: 40, textAlign: "center" }}>Laden…</div>;

  const set = (path: string[], val: string | boolean) => {
    setForm(prev => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next as Record<string, unknown>;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
      obj[path[path.length - 1]] = val;
      return next;
    });
  };

  const setStat = (i: number, key: "value" | "label", val: string) => {
    setForm(prev => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      next.stats[i][key] = val;
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put("content", form);
      await onRefresh();
      onToast(aT.tekst_saved);
    } catch {
      onToast(aT.pand_err, false);
    }
    setSaving(false);
  };

  const TABS = ["Homepage", "Contact", "Over Ons", "Verkopen", "Footer"];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: C.text, fontWeight: 700 }}>Site Tekst</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>Bewerk alle teksten op de website</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.6 : 1 }}>
          {saving ? aT.tekst_saving : aT.tekst_save_btn}
        </button>
      </div>
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 28 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            style={{ padding: "12px 20px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 600 : 400, color: tab === i ? C.orange : C.muted, borderBottom: `2px solid ${tab === i ? C.orange : "transparent"}`, marginBottom: -1 }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 720 }}>
        {tab === 0 && (
          <div style={{ display: "grid", gap: 20 }}>
            <div style={s.card}>
              <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 14, fontWeight: 600 }}>Hero sectie</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <div><label style={s.label}>Tagline (klein boven de titel)</label><input style={s.input} value={form.hero.tagline} onChange={e => set(["hero", "tagline"], e.target.value)} /></div>
                <div><label style={s.label}>Titel (regel 1)</label><input style={s.input} value={form.hero.title} onChange={e => set(["hero", "title"], e.target.value)} /></div>
                <div><label style={s.label}>Titel (regel 2, oranje accent)</label><input style={s.input} value={form.hero.titleAccent} onChange={e => set(["hero", "titleAccent"], e.target.value)} /></div>
                <div><label style={s.label}>Ondertitel</label><textarea rows={2} style={s.textarea} value={form.hero.subtitle} onChange={e => set(["hero", "subtitle"], e.target.value)} /></div>
                <div style={s.row}>
                  <div style={s.col}><label style={s.label}>CTA knop 1</label><input style={s.input} value={form.hero.cta1Label} onChange={e => set(["hero", "cta1Label"], e.target.value)} /></div>
                  <div style={s.col}><label style={s.label}>CTA knop 2</label><input style={s.input} value={form.hero.cta2Label} onChange={e => set(["hero", "cta2Label"], e.target.value)} /></div>
                </div>
              </div>
            </div>
            <div style={s.card}>
              <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 14, fontWeight: 600 }}>Statistieken (4 cijfers)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {form.stats.map((st, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <div style={{ width: 80 }}><label style={s.label}>Waarde</label><input style={s.input} value={st.value} onChange={e => setStat(i, "value", e.target.value)} /></div>
                    <div style={{ flex: 1 }}><label style={s.label}>Label</label><input style={s.input} value={st.label} onChange={e => setStat(i, "label", e.target.value)} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 14, fontWeight: 600 }}>Contact informatie</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div><label style={s.label}>Telefoon</label><input style={s.input} value={form.contact.phone} onChange={e => set(["contact", "phone"], e.target.value)} /></div>
              <div><label style={s.label}>E-mailadres</label><input style={s.input} value={form.contact.email} onChange={e => set(["contact", "email"], e.target.value)} /></div>
              <div><label style={s.label}>Adres</label><input style={s.input} value={form.contact.address} onChange={e => set(["contact", "address"], e.target.value)} /></div>
              <div><label style={s.label}>KBO / BTW nummer</label><input style={s.input} value={form.contact.kvk} onChange={e => set(["contact", "kvk"], e.target.value)} /></div>
              <div style={{ marginTop: 8 }}>
                <h3 style={{ margin: "0 0 12px", color: C.text, fontSize: 14, fontWeight: 600 }}>Contact pagina teksten</h3>
                <div style={{ display: "grid", gap: 10 }}>
                  <div><label style={s.label}>Paginatitel</label><input style={s.input} value={form.contactPage.title} onChange={e => set(["contactPage", "title"], e.target.value)} /></div>
                  <div><label style={s.label}>Ondertitel</label><textarea rows={2} style={s.textarea} value={form.contactPage.subtitle} onChange={e => set(["contactPage", "subtitle"], e.target.value)} /></div>
                  <div><label style={s.label}>Formulier koptekst</label><input style={s.input} value={form.contactPage.formTitle} onChange={e => set(["contactPage", "formTitle"], e.target.value)} /></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 2 && (
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 14, fontWeight: 600 }}>Over Ons pagina</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div><label style={s.label}>Paginatitel</label><input style={s.input} value={form.aboutPage.title} onChange={e => set(["aboutPage", "title"], e.target.value)} /></div>
              <div><label style={s.label}>Intro tekst</label><textarea rows={4} style={s.textarea} value={form.aboutPage.intro} onChange={e => set(["aboutPage", "intro"], e.target.value)} /></div>
              <div><label style={s.label}>Verhaal / Aanvullende tekst</label><textarea rows={6} style={s.textarea} value={form.aboutPage.story} onChange={e => set(["aboutPage", "story"], e.target.value)} /></div>
            </div>
          </div>
        )}
        {tab === 3 && (
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 14, fontWeight: 600 }}>Verkopen pagina</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div><label style={s.label}>Hero titel</label><input style={s.input} value={form.verkopenPage.heroTitle} onChange={e => set(["verkopenPage", "heroTitle"], e.target.value)} /></div>
              <div><label style={s.label}>Hero ondertitel</label><textarea rows={2} style={s.textarea} value={form.verkopenPage.heroSubtitle} onChange={e => set(["verkopenPage", "heroSubtitle"], e.target.value)} /></div>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{ display: "grid", gap: 8, background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: 12 }}>
                  <div style={{ color: C.orange, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Stap {n}</div>
                  <div><label style={s.label}>Titel</label><input style={s.input} value={(form.verkopenPage as Record<string, string>)[`step${n}Title`]} onChange={e => set(["verkopenPage", `step${n}Title`], e.target.value)} /></div>
                  <div><label style={s.label}>Beschrijving</label><textarea rows={2} style={s.textarea} value={(form.verkopenPage as Record<string, string>)[`step${n}Text`]} onChange={e => set(["verkopenPage", `step${n}Text`], e.target.value)} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 4 && (
          <div style={s.card}>
            <h3 style={{ margin: "0 0 16px", color: C.text, fontSize: 14, fontWeight: 600 }}>Footer</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div><label style={s.label}>Tagline</label><textarea rows={3} style={s.textarea} value={form.footer.tagline} onChange={e => set(["footer", "tagline"], e.target.value)} /></div>
              <div><label style={s.label}>Instagram URL</label><input style={s.input} value={form.footer.instagramUrl} onChange={e => set(["footer", "instagramUrl"], e.target.value)} /></div>
              <div><label style={s.label}>LinkedIn URL</label><input style={s.input} value={form.footer.linkedinUrl} onChange={e => set(["footer", "linkedinUrl"], e.target.value)} /></div>
              <div><label style={s.label}>YouTube URL</label><input style={s.input} value={form.footer.youtubeUrl} onChange={e => set(["footer", "youtubeUrl"], e.target.value)} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FOTOS SECTION
// ═══════════════════════════════════════════════════════════════════

function FotosSection({ properties, onToast }: { properties: Property[]; onToast: (msg: string, ok?: boolean) => void; }) {
  const [selectedId, setSelectedId] = useState<string>(properties[0]?.id ?? "");
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(async (id: string) => {
    if (!id) return;
    const res = await API.get(`photos/${id}`);
    setPhotos(res);
  }, []);

  useEffect(() => { loadPhotos(selectedId); }, [selectedId, loadPhotos]);

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    let uploaded = 0;
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const name = `foto-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      await API.upload(file, `properties/${selectedId}/${name}`);
      uploaded++;
    }
    onToast(`${uploaded} foto${uploaded !== 1 ? "'s" : ""} geüpload!`);
    await loadPhotos(selectedId);
    setUploading(false);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) await uploadFiles(files);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length) await uploadFiles(files);
  };

  const handleDelete = async (url: string) => {
    if (!confirm(aT.foto_del_confirm)) return;
    const filename = url.split("/").pop()!;
    await fetch(`/api/alba-immo/photos/${selectedId}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename }) });
    onToast(aT.foto_deleted);
    await loadPhotos(selectedId);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: C.text, fontWeight: 700 }}>Foto's</h1>
          <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>Beheer foto's per pand</p>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={s.label}>Selecteer pand</label>
        <select style={{ ...s.select, maxWidth: 400 }} value={selectedId} onChange={e => setSelectedId(e.target.value)}>
          {properties.map(p => <option key={p.id} value={p.id}>{p.title} — {p.location}</option>)}
        </select>
      </div>
      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        style={{ border: `2px dashed ${dragOver ? C.orange : C.border}`, borderRadius: 12, padding: "40px 24px", textAlign: "center", cursor: "pointer", marginBottom: 24, transition: "border-color 0.2s", background: dragOver ? "rgba(237,110,33,0.04)" : "transparent" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>📸</div>
        <div style={{ color: C.text, fontSize: 15, marginBottom: 6 }}>{uploading ? "Uploaden…" : "Sleep foto's hierheen of klik om te uploaden"}</div>
        <div style={{ color: C.muted, fontSize: 12 }}>.jpg, .png, .webp worden ondersteund · meerdere tegelijk mogelijk</div>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleFileInput} />
      </div>
      {/* Photo grid */}
      {photos.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {photos.map(url => (
            <div key={url} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`, aspectRatio: "4/3" }}>
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0")}>
                <button onClick={() => handleDelete(url)} style={{ background: C.danger, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>🗑 Verwijderen</button>
              </div>
              <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, background: "rgba(0,0,0,0.7)", borderRadius: 6, padding: "4px 8px", fontSize: 10, color: "rgba(255,255,255,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {url.split("/").pop()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
          {selectedId ? aT.foto_empty : aT.foto_select}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════

export default function AdminPage() {
  const { lang } = useLang();
  const aT = ADMIN_T[lang as AdminLang] ?? ADMIN_T.nl;
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<Section>("dashboard");
  const [properties, setProperties] = useState<Property[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("hi_admin_auth") === "1") {
      setAuthed(true);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    const [p, b, pt, c] = await Promise.all([
      API.get("properties"),
      API.get("blog"),
      API.get("partners"),
      API.get("content"),
    ]);
    setProperties(p);
    setBlog(b);
    setPartners(pt);
    setContent(c);
  }, []);

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed, fetchAll]);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAuth = () => {
    sessionStorage.setItem("hi_admin_auth", "1");
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hi_admin_auth");
    setAuthed(false);
  };

  if (!authed) return <LoginGate onAuth={handleAuth} />;

  const counts: Record<string, number> = {
    panden: properties.length,
    blog: blog.length,
    partners: partners.length,
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        input:focus, textarea:focus, select:focus { border-color: #ed6e21 !important; box-shadow: 0 0 0 3px rgba(237,110,33,0.12); }
      `}</style>
      {toast && <Toast msg={toast.msg} ok={toast.ok} />}
      <div style={{ display: "flex", height: "100vh", background: C.bg, color: C.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflow: "hidden" }}>
        <Sidebar section={section} onSection={setSection} onLogout={handleLogout} counts={counts} />
        <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
          {section === "dashboard" && <Dashboard properties={properties} blog={blog} partners={partners} onSection={setSection} />}
          {section === "panden" && <PandenSection properties={properties} onRefresh={fetchAll} onToast={showToast} />}
          {section === "blog" && <BlogSection blog={blog} onRefresh={fetchAll} onToast={showToast} />}
          {section === "partners" && <PartnersSection partners={partners} onRefresh={fetchAll} onToast={showToast} />}
          {section === "tekst" && <TekstSection content={content} onRefresh={fetchAll} onToast={showToast} />}
          {section === "fotos" && <FotosSection properties={properties} onToast={showToast} />}
        </main>
      </div>
    </>
  );
}
