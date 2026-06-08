import Link from "next/link";
import MHiNav from "../MHiNav";
import MHiFooter from "../MHiFooter";
import "../mhi.css";

const BASE = "/templates/alba-modern";

function Foto({ label }: { label?: string }) {
  return <div className="mFoto">{label ?? "foto"}</div>;
}

const REFS = [
  { type: "Villa",       city: "Tervuren",    price: "€ 1.100.000", year: 2024 },
  { type: "Appartement", city: "Leuven",       price: "€ 420.000",   year: 2024 },
  { type: "Woning",      city: "Heverlee",     price: "€ 375.000",   year: 2023 },
  { type: "Villa",       city: "Overijse",     price: "€ 980.000",   year: 2023 },
  { type: "Woning",      city: "Kessel-Lo",    price: "€ 298.000",   year: 2023 },
  { type: "Appartement", city: "Leuven",       price: "€ 295.000",   year: 2022 },
  { type: "Bungalow",    city: "Bierbeek",     price: "€ 460.000",   year: 2022 },
  { type: "Woning",      city: "Oud-Heverlee", price: "€ 510.000",   year: 2022 },
  { type: "Studio",      city: "Leuven",       price: "€ 165.000",   year: 2021 },
];

export default function ReferentiesPage() {
  return (
    <>
      <MHiNav />

      <div className="mWrap">
        <div className="mBreadcrumb">
          <Link href={BASE}>Home</Link>
          <span>/</span>
          <span>Referenties</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 6 }}>Referenties</h1>
        <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 32, maxWidth: 600 }}>
          Een selectie van panden die wij succesvol hebben verkocht of verhuurd. Elk dossier werd
          begeleid met persoonlijk advies, discretie en marktconforme prijszetting.
        </p>

        <div className="mRefGrid">
          {REFS.map((r, i) => (
            <div className="mRefCard" key={i}>
              <div className="mRefCardImg">
                <Foto />
                <div className="mRefSoldBadge">Verkocht {r.year}</div>
              </div>
              <div className="mRefCardBody">
                <div className="mRefCardType">{r.type}</div>
                <div className="mRefCardCity">{r.city}</div>
                <div className="mRefCardPrestatie">{r.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div style={{
          background: "var(--dark)", borderRadius: "var(--r-lg)",
          padding: "40px 32px", textAlign: "center", marginTop: 48,
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--surface)", marginBottom: 10 }}>
            Wilt u uw woning ook verkopen?
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
            Vraag een gratis en vrijblijvende schatting aan — wij geven u een eerlijk marktadvies.
          </p>
          <Link href={`${BASE}/contact`} className="mBtn mBtn-primary">
            Gratis schatting aanvragen
          </Link>
        </div>
      </div>

      <MHiFooter />
    </>
  );
}
