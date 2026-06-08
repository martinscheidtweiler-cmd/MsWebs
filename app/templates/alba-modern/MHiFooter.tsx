import Link from "next/link";
import "./mhi.css";

const BASE = "/templates/alba-modern";

export default function MHiFooter() {
  return (
    <>
      <footer className="mFooter">
        <div className="mFooterInner">
          <div>
            <div className="mFooterBrand">Alba<span>.</span>immo</div>
            <p className="mFooterText">
              Uw vertrouwde partner voor vastgoed in de regio.<br />
              Discretie, expertise en persoonlijk advies.
            </p>
          </div>

          <div>
            <div className="mFooterColTitle">Navigatie</div>
            <div className="mFooterLinks">
              <Link href={`${BASE}/aanbod`}>Aanbod</Link>
              <Link href={`${BASE}/referenties`}>Referenties</Link>
              <Link href={`${BASE}/verkopen`}>Verkopen</Link>
              <Link href={`${BASE}/blog`}>Blog</Link>
              <Link href={`${BASE}/contact`}>Contact</Link>
            </div>
          </div>

          <div>
            <div className="mFooterColTitle">Contact</div>
            <div className="mFooterLinks">
              <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>Kerkstraat 42</span>
              <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>3000 Leuven</span>
              <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>+32 16 00 11 22</span>
              <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>info@alba-immo.be</span>
            </div>
          </div>
        </div>

        <div className="mFooterBottom">
          <span className="mFooterCopy">© {new Date().getFullYear()} Alba Immo — Alle rechten voorbehouden</span>
          <div className="mFooterBottomLinks">
            <Link href="#">Privacybeleid</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </footer>

      {/* Sticky CTA buttons */}
      <div className="mStickyBtns">
        <button className="mStickyBtn ms-green" style={{ flex: 1 }}>
          📞 Bel ons: +32 16 00 11 22
        </button>
        <button className="mStickyBtn ms-teal" style={{ flex: 1 }}>
          ✉ Gratis schatting aanvragen
        </button>
      </div>
    </>
  );
}
