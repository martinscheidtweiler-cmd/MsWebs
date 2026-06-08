"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Lang = "nl" | "fr" | "en";

interface MSNavProps {
  lang?: Lang;
  setLang?: (l: Lang) => void;
  planningHref?: string;
}

export default function MSNav({ lang, setLang, planningHref = "#planning" }: MSNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`siteNav${scrolled ? " scrolled" : ""}`}>
        <nav className="navLinks">
          <Link href="/portfolio">Portfolio</Link>
          <a href="/#packages">Pakketten</a>
          <a href="/login">Klantengedeelte</a>
        </nav>

        <Link className="brand" href="/">
          <img src="/portfolio/logo.png" alt="MS Webdesign" />
        </Link>

        <div className="navRight">
          {lang && setLang && (
            <div className="langSwitch">
              <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Taal">
                <option value="nl">NL</option>
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </div>
          )}
          <a className="navBtn" href={planningHref}>Afspraak inplannen</a>
          <button
            className={`hamburger${mobileOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`mobileNav${mobileOpen ? " open" : ""}`}>
        <Link href="/portfolio" data-idx="01" onClick={() => setMobileOpen(false)}>Portfolio</Link>
        <a href="/#packages" data-idx="02" onClick={() => setMobileOpen(false)}>Pakketten</a>
        <a href="/login" data-idx="03" onClick={() => setMobileOpen(false)}>Klantengedeelte</a>
        <div className="mobileNavDivider" />
        <a href={planningHref} className="mobileNavCta" onClick={() => setMobileOpen(false)}>
          Afspraak inplannen
        </a>
      </nav>
    </>
  );
}
