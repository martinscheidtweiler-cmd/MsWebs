import Link from "next/link";
import "./alba.css";

const BASE = "/templates/alba-immo";

export default function HiFooter() {
  return (
    <footer className="hiFooter">
      <div className="hiFooterInner">
        <div>
          <div className="hiFooterLogo">
            Hippique<span className="hiFooterLogoMark">.immo</span>
          </div>
          <p className="hiFooterTagline">
            Specialist in hippisch en landelijk vastgoed.<br />
            Maneges, stoeterijen, landhuizen en kasteeldomeinen<br />
            — minimaal 2&nbsp;500m² grond.
          </p>
        </div>

        <div>
          <div className="hiFooterColTitle">Navigatie</div>
          <div className="hiFooterLinks">
            <Link href={BASE}>Home</Link>
            <Link href={`${BASE}/aanbod`}>Aanbod</Link>
            <Link href={`${BASE}/verkopen`}>Verkopen</Link>
            <Link href={`${BASE}/blog`}>Blog</Link>
            <Link href={`${BASE}/referenties`}>Referenties</Link>
            <Link href={`${BASE}/contact`}>Contact</Link>
          </div>
        </div>

        <div>
          <div className="hiFooterColTitle">Contact</div>
          <div className="hiFooterLinks">
            <span>Antwerpen, België</span>
            <a href="tel:+320000000000">+32 (0)00 00 00 00</a>
            <a href="mailto:info@hippique.immo">info@hippique.immo</a>
            <span style={{ marginTop: 8, color: "rgba(240,235,227,.3)", fontSize: 12 }}>Ma – Vr: 09:00 – 18:00</span>
          </div>
        </div>
      </div>

      <div className="hiFooterBottom">
        <span className="hiFooterCopy">
          © {new Date().getFullYear()} Hippique<span className="hiFooterOrange">.immo</span> — Erkend vastgoedmakelaar
        </span>
        <span className="hiFooterCopy">
          Gebouwd door <span className="hiFooterOrange">MS Webdesign</span>
        </span>
      </div>
    </footer>
  );
}
