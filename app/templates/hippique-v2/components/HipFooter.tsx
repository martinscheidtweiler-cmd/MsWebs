"use client";
import Link from "next/link";

const BASE = "/templates/hippique-v2";

export default function HipFooter() {
  return (
    <footer className="hi-footer">
      <div className="hi-footer-top">
        {/* Brand */}
        <div className="hi-footer-brand">
          <div className="hi-footer-logo">
            Hippique<span style={{ color: "var(--orange)" }}>.</span>immo
          </div>
          <p className="hi-footer-tagline">
            Het meest gespecialiseerde kantoor voor hippisch en landelijk vastgoed in de Benelux en Noord-Frankrijk.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <a
              href="https://www.facebook.com/hippique.immo"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--stone)", fontSize: 18, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}
            >
              f
            </a>
            <a
              href="https://www.instagram.com/hippiqueimmo/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--stone)", fontSize: 18, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}
            >
              ◻
            </a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <p className="hi-footer-col-title">Navigatie</p>
          <ul className="hi-footer-links">
            <li><Link href={BASE}>Home</Link></li>
            <li><Link href={`${BASE}/aanbod`}>Aanbod</Link></li>
            <li><Link href={`${BASE}/verkopen`}>Verkopen</Link></li>
            <li><Link href={`${BASE}/over-ons`}>Over Ons</Link></li>
            <li><Link href={`${BASE}/contact`}>Contact</Link></li>
          </ul>
        </div>

        {/* Types */}
        <div>
          <p className="hi-footer-col-title">Eigendommen</p>
          <ul className="hi-footer-links">
            <li><Link href={`${BASE}/aanbod?type=Stoeterij`}>Stoeterijen</Link></li>
            <li><Link href={`${BASE}/aanbod?type=Manège`}>Maneges</Link></li>
            <li><Link href={`${BASE}/aanbod?type=Pensionstallen`}>Pensionstallen</Link></li>
            <li><Link href={`${BASE}/aanbod?type=Landgoed`}>Landgoederen</Link></li>
            <li><Link href={`${BASE}/aanbod?type=Kasteeldomein`}>Kasteeldomeinen</Link></li>
            <li><Link href={`${BASE}/aanbod?type=Hoeve`}>Hoeves</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="hi-footer-col-title">Contact</p>
          <ul className="hi-footer-links" style={{ gap: "14px" }}>
            <li style={{ color: "var(--stone)", fontSize: 14, lineHeight: 1.6 }}>
              Sint-Laurentiusstraat 50D<br />
              9130 Verrebroek (Beveren-Waas)
            </li>
            <li>
              <a href="tel:+32495915020" style={{ color: "var(--stone)" }}>
                +32 (0)495 91 50 20
              </a>
            </li>
            <li>
              <a href="mailto:info@hippique.immo" style={{ color: "var(--stone)" }}>
                info@hippique.immo
              </a>
            </li>
            <li style={{ color: "var(--grey)", fontSize: 13, marginTop: 8 }}>
              IPI 504.064 — BIV erkend<br />
              BTW BE 0843.058.969
            </li>
          </ul>
        </div>
      </div>

      <div className="hi-footer-bottom">
        <p className="hi-footer-copy">
          © {new Date().getFullYear()} Hippique.immo — Alle rechten voorbehouden
        </p>
        <div className="hi-footer-legal">
          <a href="#">Privacy Statement</a>
          <a href="#">Disclaimer</a>
          <a href="#">Deontologische code BIV</a>
        </div>
      </div>
    </footer>
  );
}
