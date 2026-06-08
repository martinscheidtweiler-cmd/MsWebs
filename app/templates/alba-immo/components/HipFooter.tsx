"use client";
import Link from "next/link";
import { useLang } from "../LangContext";

const BASE = "/templates/alba-immo";

const PROP_TYPES = {
  nl: ["Stoeterijen", "Maneges", "Pensionstallen", "Landgoederen", "Kasteeldomeinen", "Hoeves"],
  fr: ["Haras",      "Manèges", "Pensions équestres", "Domaines", "Châteaux", "Fermes"],
  en: ["Stud farms", "Riding schools", "Livery stables", "Estates", "Château domains", "Farms"],
};
const PROP_TYPES_KEYS = ["Stoeterij", "Manège", "Pensionstallen", "Landgoed", "Kasteeldomein", "Hoeve"];

const PROP_COL_TITLE = { nl: "Eigendommen", fr: "Biens", en: "Properties" };

export default function HipFooter() {
  const { lang, t } = useLang();

  return (
    <footer className="hi-footer">
      <div className="hi-footer-top">
        {/* Brand */}
        <div className="hi-footer-brand">
          <div className="hi-footer-logo">
            Hippique<span style={{ color: "var(--orange)" }}>.</span>immo
          </div>
          <p className="hi-footer-tagline">
            {t.footer_tagline.split("\n").map((line, i) => (
              <span key={i}>{line}{i < 2 && <br />}</span>
            ))}
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <a href="https://www.facebook.com/hippique.immo" target="_blank" rel="noreferrer"
              style={{ color: "var(--stone)", fontSize: 18, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>f</a>
            <a href="https://www.instagram.com/hippiqueimmo/" target="_blank" rel="noreferrer"
              style={{ color: "var(--stone)", fontSize: 18, transition: "color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>◻</a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <p className="hi-footer-col-title">{t.footer_nav}</p>
          <ul className="hi-footer-links">
            <li><Link href={BASE}>{t.footer_home}</Link></li>
            <li><Link href={`${BASE}/aanbod`}>{t.nav_aanbod}</Link></li>
            <li><Link href={`${BASE}/verkopen`}>{t.nav_verkopen}</Link></li>
            <li><Link href={`${BASE}/over-ons`}>{t.nav_overOns}</Link></li>
            <li><Link href={`${BASE}/contact`}>{t.nav_contact}</Link></li>
          </ul>
        </div>

        {/* Types */}
        <div>
          <p className="hi-footer-col-title">{PROP_COL_TITLE[lang]}</p>
          <ul className="hi-footer-links">
            {PROP_TYPES[lang].map((label, i) => (
              <li key={label}>
                <Link href={`${BASE}/aanbod?type=${PROP_TYPES_KEYS[i]}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="hi-footer-col-title">{t.footer_contact}</p>
          <ul className="hi-footer-links" style={{ gap: "14px" }}>
            <li style={{ color: "var(--stone)", fontSize: 14, lineHeight: 1.6 }}>
              Sint-Laurentiusstraat 50D<br />
              9130 Verrebroek (Beveren-Waas)
            </li>
            <li><a href="tel:+32495915020" style={{ color: "var(--stone)" }}>+32 (0)495 91 50 20</a></li>
            <li><a href="mailto:info@hippique.immo" style={{ color: "var(--stone)" }}>info@hippique.immo</a></li>
            <li style={{ color: "var(--grey)", fontSize: 13, marginTop: 8 }}>
              IPI 504.064 — {t.footer_certified}<br />
              BTW BE 0843.058.969
            </li>
          </ul>
        </div>
      </div>

      <div className="hi-footer-bottom">
        <p className="hi-footer-copy">
          © {new Date().getFullYear()} Hippique.immo — {t.footer_certified}
        </p>
        <div className="hi-footer-legal">
          <a href="#">Privacy Statement</a>
          <a href="#">Disclaimer</a>
                    <a href="#">{lang === "nl" ? "Deontologische code BIV" : lang === "fr" ? "Code déontologique IPI" : "IPI Code of Ethics"}</a>
        </div>
      </div>
    </footer>
  );
}
