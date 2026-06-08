"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BASE = "/templates/hippique-v2";

const NAV_LINKS = [
  { label: "Aanbod",    href: `${BASE}/aanbod` },
  { label: "Verkopen", href: `${BASE}/verkopen` },
  { label: "Over Ons", href: `${BASE}/over-ons` },
  { label: "Blog",     href: "#blog" },
  { label: "Contact",  href: `${BASE}/contact` },
];

export default function HipNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

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
            {/* Replace with <img src="/hippique-logo.png" className="hi-logo-img" alt="Hippique Immo" /> */}
            <span className="hi-logo-text">
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

          {/* CTA + burger */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link href={`${BASE}/contact`} className="hi-nav-cta">
              Gratis schatting
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
            Gratis schatting
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
