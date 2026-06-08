"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./mhi.css";

const BASE = "/templates/alba-modern";

const LINKS = [
  { label: "Home",        href: BASE },
  { label: "Aanbod",      href: `${BASE}/aanbod` },
  { label: "Referenties", href: `${BASE}/referenties` },
  { label: "Verkopen",    href: `${BASE}/verkopen` },
  { label: "Blog",        href: `${BASE}/blog` },
];

export default function MHiNav() {
  const path = usePathname();

  return (
    <nav className="mNav">
      <div className="mNavInner">
        <Link href={BASE} className="mNavLogo">
          Alba<span>.</span>immo
        </Link>

        <div className="mNavLinks">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={path === l.href || (l.href !== BASE && path.startsWith(l.href)) ? "on" : ""}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link href={`${BASE}/contact`} className="mNavLinks">
          <span className="mNavCta">Contact</span>
        </Link>
      </div>
    </nav>
  );
}
