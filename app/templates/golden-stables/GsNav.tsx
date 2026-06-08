"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/templates/golden-stables" },
  { label: "Nieuws", href: "/templates/golden-stables/nieuws" },
  { label: "Hengsten", href: "/templates/golden-stables/hengsten" },
  { label: "Wedstrijdstal", href: "/templates/golden-stables/wedstrijdstal" },
  { label: "Fokkerij", href: "/templates/golden-stables/fokkerij" },
  { label: "Referenties", href: "/templates/golden-stables/referenties" },
  { label: "Contact", href: "/templates/golden-stables/contact" },
];

interface GsNavProps {
  alwaysDark?: boolean;
}

export default function GsNav({ alwaysDark = false }: GsNavProps) {
  const [scrolled, setScrolled] = useState(alwaysDark);
  const pathname = usePathname();

  useEffect(() => {
    if (alwaysDark) return;
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [alwaysDark]);

  const dark = scrolled || alwaysDark;

  return (
    <nav className={`gsNav${dark ? " gsNavScrolled" : ""}`}>
      <div className="gsNavLogo">
        <Link href="/templates/golden-stables">
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 700, letterSpacing: ".06em",
            color: dark ? "#2d5a27" : "#fff",
            fontStyle: "italic", cursor: "pointer",
          }}>
            Golden Stables
          </span>
        </Link>
      </div>
      <div className="gsNavRight">
        <ul className="gsNavLinks">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                style={{ fontWeight: pathname === l.href ? 700 : undefined }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="gsNavLang">
          <a href="#" className="active">NL</a>
          <span>|</span>
          <a href="#">EN</a>
        </div>
      </div>
    </nav>
  );
}
