import Link from "next/link";
import "./vls.css";

const BASE = "/templates/vls-verwarming";

export default function VlsFooter() {
  return (
    <footer className="vlsFooter">
      <div className="vlsFooterInner">
        <div>
          <img src="/portfolio/vls-logo.svg" alt="VLS Verwarming" className="vlsFooterLogoImg" />
          <p className="vlsFooterText">
            Uw specialist voor verwarming, sanitair,<br />
            airco en ventilatie in Nijlen en omgeving.<br />
            Sven Van Leuffelen — persoonlijke service.
          </p>
        </div>

        <div>
          <div className="vlsFooterColTitle">Navigatie</div>
          <div className="vlsFooterLinks">
            <Link href={BASE}>Home</Link>
            <Link href={`${BASE}/diensten`}>Diensten</Link>
            <Link href={`${BASE}/contact`}>Contact & offerte</Link>
          </div>
        </div>

        <div>
          <div className="vlsFooterColTitle">Contact</div>
          <div className="vlsFooterLinks">
            <span>Zwaluwenlaan 7, 2560 Nijlen</span>
            <a href="tel:+32498232625">+32 498 23 26 25</a>
            <a href="mailto:vls-verwarming@outlook.be">vls-verwarming@outlook.be</a>
            <span>Ma–Vr: 08:00–17:00</span>
          </div>
        </div>
      </div>

      <div className="vlsFooterBottom">
        <span className="vlsFooterCopy">
          {"(c) "}{new Date().getFullYear()}{" VLS Verwarming — Sven Van Leuffelen · Nijlen"}
        </span>
        <span className="vlsFooterCopy">Verwarming · Sanitair · Airco · Ventilatie</span>
      </div>
    </footer>
  );
}
