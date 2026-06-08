"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import "../saas.css";

const NAV = [
  { href: "/dashboard",          icon: "🏠", label: "Overzicht" },
  { href: "/dashboard/project",  icon: "📋", label: "Projectstatus" },
  { href: "/dashboard/requests", icon: "✏️", label: "Wijzigingen" },
  { href: "/dashboard/billing",  icon: "💳", label: "Facturen" },
  { href: "/dashboard/uploads",  icon: "📁", label: "Bestanden" },
  { href: "/dashboard/addons",   icon: "⚡", label: "Add-ons" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [business, setBusiness] = useState("Klantenportaal");
  const [initials, setInitials] = useState("K");

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }

      // Try from cache first, then from DB
      const cachedBiz  = localStorage.getItem("ms_user_business");
      const cachedName = localStorage.getItem("ms_user_name");
      if (cachedBiz)  setBusiness(cachedBiz);
      if (cachedName) setInitials(
        cachedName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
      );

      if (!cachedBiz) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("business_name, contact_person")
          .eq("id", session.user.id)
          .single();
        if (profile) {
          setBusiness(profile.business_name);
          setInitials(
            profile.contact_person.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
          );
          localStorage.setItem("ms_user_business", profile.business_name);
          localStorage.setItem("ms_user_name", profile.contact_person);
        }
      }
    }
    checkSession();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("ms_user_business");
    localStorage.removeItem("ms_user_name");
    router.push("/login");
  }

  const pageTitle = NAV.find(n => n.href === pathname)?.label ?? "Dashboard";

  return (
    <div className="saas-root">
      <div className="sd-layout">
        <aside className={`sd-sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="sd-sidebar-brand">
            <div className="sd-sidebar-logo">MS <span>Webdesign</span></div>
            <div className="sd-sidebar-client">{business}</div>
          </div>
          <nav className="sd-sidebar-nav">
            <div className="sd-nav-section">Menu</div>
            {NAV.map(item => (
              <Link key={item.href} href={item.href}
                className={`sd-nav-link${pathname === item.href ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}>
                <span className="sd-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="sd-sidebar-footer">
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
            </div>
            <div className="sd-topbar-right">
              <Link href="/" style={{ fontSize: 12, color: "var(--s-muted)", textDecoration: "none" }}>← Website</Link>
              <div className="sd-topbar-avatar">{initials}</div>
            </div>
          </header>
          <main className="sd-content">{children}</main>
        </div>
      </div>
    </div>
  );
}
