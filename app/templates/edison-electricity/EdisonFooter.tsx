import Link from "next/link";
import "./edison.css";

const BASE = "/templates/edison-electricity";

export default function EdisonFooter() {
  return (
    <footer className="edFooter">
      <div className="edFooterInner">
        <div>
          <div className="edFooterBrand">
            <img src="/portfolio/edison-logo.svg" alt="Edison Electricity" className="edFooterLogoImg" />
          </div>
          <p className="edFooterText">
            Uw betrouwbare elektricien in Nijlen en omgeving.<br />
            Meer dan 32 jaar vakmanschap — familiebedrijf.
          </p>
        </div>

        <div>
          <div className="edFooterColTitle">Navigatie</div>
          <div className="edFooterLinks">
            <Link href={BASE}>Home</Link>
            <Link href={`${BASE}/projecten`}>Afgewerkte projecten</Link>
            <Link href={`${BASE}/contact`}>Contact & offerte</Link>
          </div>
        </div>

        <div>
          <div className="edFooterColTitle">Contact</div>
          <div className="edFooterLinks">
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>Nijlen en omgeving</span>
            <a href="tel:+32000000000">+32 (0)00 00 00 00</a>
            <a href="mailto:info@edisonelectricity.be">info@edisonelectricity.be</a>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>Ma–Vr: 08:00–18:00</span>
            <span style={{ color: "#f5c518", fontSize: 13, fontWeight: 700 }}>24/7 noodservice</span>
          </div>
        </div>
      </div>

      <div className="edFooterBottom">
        <span className="edFooterCopy">
          © {new Date().getFullYear()} Edison Electricity — Erkend elektricien · Nijlen
        </span>
        <span className="edFooterCopy">⭐ 5,0/5 · Google Reviews</span>
      </div>
    </footer>
  );
}
