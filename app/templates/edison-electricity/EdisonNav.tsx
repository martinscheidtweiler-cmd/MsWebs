"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./edison.css";

const BASE = "/templates/edison-electricity";

const LINKS = [
  { label: "Home",      href: BASE },
  { label: "Projecten", href: `${BASE}/projecten` },
  { label: "Contact",   href: `${BASE}/contact` },
];

export default function EdisonNav() {
  const path = usePathname();

  return (
    <>
      {/* Emergency strip */}
      <div className="edEmergencyStrip">
        ⚡ 24/7 noodservice &nbsp;·&nbsp;
        <a href="tel:+32000000000">Bel nu: +32 (0)00 00 00 00</a>
      </div>

      <nav className="edNav">
        <div className="edNavInner">
          <Link href={BASE} className="edNavLogo">
            <img src="/portfolio/edison-logo.svg" alt="Edison Electricity" className="edNavLogoImg" />
          </Link>

          <div className="edNavLinks">
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

          <Link href={`${BASE}/contact`} className="edNavCta">
            Vraag een offerte
          </Link>
        </div>
      </nav>
    </>
  );
}
