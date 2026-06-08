"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./alba.css";

const BASE = "/templates/alba-immo";

const LINKS = [
  { label: "Aanbod",      href: `${BASE}/aanbod` },
  { label: "Verkopen",    href: `${BASE}/verkopen` },
  { label: "Blog",        href: `${BASE}/blog` },
  { label: "Referenties", href: `${BASE}/referenties` },
];

export default function HiNav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`hiNav${scrolled ? " scrolled" : ""}`}>
      <Link href={BASE} className="hiNavLogo">
        <span>Hippique</span>
        <span className="hiNavLogoMark">.immo</span>
      </Link>

      <div className="hiNavLinks">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={path.startsWith(l.href) ? "on" : ""}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link href={`${BASE}/contact`} className="hiNavCta">
        Gratis schatting
      </Link>
    </nav>
  );
}
