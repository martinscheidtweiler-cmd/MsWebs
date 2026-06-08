"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import "../saas.css";

const NAV = [
  { href: "/admin", icon: "📊", label: "Dashboard" },
  { href: "/admin/clients", icon: "👥", label: "Klanten" },
  { href: "/admin/requests", icon: "📋", label: "Aanvragen" },
  { href: "/admin/files", icon: "📁", label: "Bestanden" },
  { href: "/admin/billing", icon: "💰", label: "Facturatie" },
];

const ADMIN_PASSWORD = "Denita1234!";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("ms_admin_auth") === "true") setAuthed(true);
    }
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem("ms_admin_auth", "true");
      setAuthed(true);
    } else {
      setError("Ongeldig wachtwoord.");
    }
  }

  function logout() {
    localStorage.removeItem("ms_admin_auth");
    setAuthed(false);
    router.push("/");
  }

  if (!authed) {
    return (
      <div className="saas-root">
        <div className="sl-page">
          <div className="sl-left">
            <div className="sl-brand">
              <div className="sl-brand-logo">MS <span>Webdesign</span></div>
            </div>
            <div className="sl-left-content">
              <h2>Admin Platform</h2>
              <p>Intern beheersplatform voor MS Webdesign. Beheer klanten, aanvragen, tijdsregistratie en facturatie vanuit één centrale omgeving.</p>
              <div className="sl-features">
                {["Klantenbeheer (CRM)", "Tijdsregistratie", "Aanvragenbeheer", "Facturatie & MRR"].map(f => (
                  <div className="sl-feature" key={f}><div className="sl-feature-dot" />{f}</div>
                ))}
              </div>
            </div>
            <div className="sl-left-footer">Intern gebruik — MS Webdesign</div>
          </div>
          <div className="sl-right">
            <div className="sl-form-wrap">
              <div className="sl-form-title">Admin toegang</div>
              <p className="sl-form-sub">Voer het beheerderswachtwoord in om toegang te krijgen.</p>
              {error && <div className="sl-error">{error}</div>}
              <form onSubmit={login}>
                <div className="sl-field">
                  <label>Wachtwoord</label>
                  <input type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} required autoFocus />
                </div>
                <button className="sl-btn-primary" type="submit">Toegang →</button>
              </form>
              <p style={{ fontSize: 11, color: "var(--s-muted)", marginTop: 16, opacity: 0 }}>·</p>
              <a href="/" className="sl-back">← Terug naar website</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pageTitle = NAV.find(n => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label ?? "Admin";

  return (
    <div className="saas-root">
      <div className="sd-layout">
        <aside className={`sd-sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="sd-sidebar-brand">
            <div className="sd-sidebar-logo">MS <span>Admin</span></div>
            <div className="sd-sidebar-client">Intern platform</div>
          </div>
          <nav className="sd-sidebar-nav">
            <div className="sd-nav-section">Beheer</div>
            {NAV.map(item => (
              <Link key={item.href} href={item.href}
                className={`sd-nav-link${pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)) ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}>
                <span className="sd-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="sd-sidebar-footer">
            <Link href="/dashboard" className="sd-nav-link" style={{ color: "rgba(255,255,255,0.35)" }}>
              <span className="sd-nav-icon">👤</span> Klantportaal
            </Link>
            <button onClick={logout}>
              <span className="sd-nav-icon">🚪</span> Uitloggen
            </button>
          </div>
        </aside>
        <div className="sd-main">
          <header className="sd-topbar">
            <div className="sd-topbar-left">
              <button className="sd-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span /><span /><span />
              </button>
              <span className="sd-topbar-title">{pageTitle}</span>
              <span className="sd-topbar-badge">Admin</span>
            </div>
            <div className="sd-topbar-right">
              <Link href="/" style={{ fontSize: 12, color: "var(--s-muted)", textDecoration: "none" }}>← Website</Link>
              <div className="sd-topbar-avatar">MS</div>
            </div>
          </header>
          <main className="sd-content">{children}</main>
        </div>
      </div>
    </div>
  );
}
