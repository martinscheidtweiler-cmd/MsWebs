"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "../LangContext";
import { LANGS } from "../i18n";

const BASE = "/templates/alba-immo";

export default function HipNav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  const NAV_LINKS = [
    { label: t.nav_aanbod,   href: `${BASE}/aanbod` },
    { label: t.nav_verkopen, href: `${BASE}/verkopen` },
    { label: t.nav_overOns,  href: `${BASE}/over-ons` },
    { label: t.nav_blog,     href: "#blog" },
    { label: t.nav_contact,  href: `${BASE}/contact` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`hi-nav${scrolled ? " scrolled" : ""}`}>
        <div className="hi-nav-inner">
          {/* Logo */}
          <Link href={BASE} className="hi-logo">
            <img
              src="/hippique/logo.png"
              alt="Hippique.immo"
              style={{ height: 40, width: "auto", borderRadius: 6 }}
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const next = img.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = "inline";
              }}
            />
            <span className="hi-logo-text" style={{ display: "none" }}>
              Hippique<span className="hi-logo-dot">.</span>immo
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hi-nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Language switcher + CTA + burger */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Language switcher */}
            <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: 3 }}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  style={{
                    padding: "4px 9px",
                    borderRadius: 3,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    background: lang === l.code ? "var(--orange)" : "transparent",
                    color: lang === l.code ? "#fff" : "var(--stone)",
                    transition: "all 0.2s",
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <Link href={`${BASE}/contact`} className="hi-nav-cta" style={{ marginLeft: 8 }}>
              {t.nav_cta}
            </Link>
            <button
              className="hi-burger"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span style={open ? { transform: "rotate(45deg) translate(4px, 5px)" } : {}} />
              <span style={open ? { opacity: 0 } : {}} />
              <span style={open ? { transform: "rotate(-45deg) translate(4px, -5px)" } : {}} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 800,
            background: "rgba(8,7,5,0.97)",
            backdropFilter: "blur(24px)",
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            gap: 36,
            animation: "fadeIn 0.3s ease both",
          }}
        >
          {/* Mobile language switcher */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 4,
                  border: `1px solid ${lang === l.code ? "var(--orange)" : "rgba(255,255,255,0.15)"}`,
                  background: lang === l.code ? "var(--orange)" : "transparent",
                  color: lang === l.code ? "#fff" : "var(--stone)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                }}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>

          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 6vw, 48px)",
                fontWeight: 400,
                color: "var(--warm-white)",
                letterSpacing: "-0.02em",
                transition: "color 0.25s",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`${BASE}/contact`}
            onClick={() => setOpen(false)}
            className="hi-btn hi-btn-orange"
            style={{ marginTop: 12 }}
          >
            {t.nav_cta}
          </Link>
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: 24, right: 24, color: "var(--stone)", fontSize: 28 }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
