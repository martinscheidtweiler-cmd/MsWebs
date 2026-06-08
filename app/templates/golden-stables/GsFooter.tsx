import Link from "next/link";

export default function GsFooter() {
  return (
    <footer className="gsFooter">
      <div className="gsFooterInner">
        <div className="gsFooterLogo">
          <Link href="/templates/golden-stables">
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26, fontWeight: 700,
              color: "rgba(255,255,255,.9)", fontStyle: "italic", letterSpacing: ".06em",
            }}>
              Golden Stables
            </span>
          </Link>
        </div>
        <div className="gsFooterCenter">
          <ul className="gsFooterLinks">
            {[
              { label: "Home", href: "/templates/golden-stables" },
              { label: "Nieuws", href: "/templates/golden-stables/nieuws" },
              { label: "Hengsten", href: "/templates/golden-stables/hengsten" },
              { label: "Wedstrijdstal", href: "/templates/golden-stables/wedstrijdstal" },
              { label: "Fokkerij", href: "/templates/golden-stables/fokkerij" },
              { label: "Contact", href: "/templates/golden-stables/contact" },
            ].map((l) => (
              <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
          <div style={{ color: "rgba(255,255,255,.4)", textAlign: "center", fontSize: 11, marginTop: 8 }}>
            © 2025 Golden Stables — <Link href="#" style={{ color: "rgba(255,255,255,.4)" }}>Privacy</Link>
          </div>
        </div>
        <div className="gsFooterRight">
          <div className="gsFooterAddress">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <strong>Bergstraat 140</strong><br />
              2860 Sint-Katelijne-Waver
            </a>
            <br /><br />
            Erik: <strong>+32 (0)474 89 87 35</strong><br />
            <a href="mailto:info@goldenstables.be" style={{ color: "rgba(255,255,255,.6)" }}>
              info@goldenstables.be
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
