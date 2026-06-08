"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./vls.css";

const BASE = "/templates/vls-verwarming";

const LINKS = [
  { label: "Home",     href: BASE },
  { label: "Diensten", href: `${BASE}/diensten` },
  { label: "Contact",  href: `${BASE}/contact` },
];

export default function VlsNav() {
  const path = usePathname();

  return (
    <>
      <div className="vlsStrip">
        🔥 Depannage & onderhoud &nbsp;·&nbsp;
        <a href="tel:+32498232625">Bel Sven: +32 498 23 26 25</a>
      </div>

      <nav className="vlsNav">
        <div className="vlsNavInner">
          <Link href={BASE} className="vlsNavLogo">
            <img src="/portfolio/vls-logo.svg" alt="VLS Verwarming" className="vlsNavLogoImg" />
          </Link>

          <div className="vlsNavLinks">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  path === l.href ||
                  (l.href !== BASE && path.startsWith(l.href))
                    ? "on"
                    : ""
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link href={`${BASE}/contact`} className="vlsNavCta">
            Offerte aanvragen
          </Link>
        </div>
      </nav>
    </>
  );
}
