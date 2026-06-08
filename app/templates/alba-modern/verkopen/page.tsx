import Link from "next/link";
import MHiNav from "../MHiNav";
import MHiFooter from "../MHiFooter";
import "../mhi.css";

const BASE = "/templates/alba-modern";

const STEPS = [
  {
    num: "01",
    title: "Gratis schatting",
    text: "Onze experten bepalen de correcte marktwaarde van uw eigendom op basis van vergelijkbare verkopen, ligging en staat van het pand.",
  },
  {
    num: "02",
    title: "Verkoopdossier",
    text: "Wij regelen alle juridische documenten, het EPC-attest, de bodemattesten en het volledige fotodossier — u hoeft niets te doen.",
  },
  {
    num: "03",
    title: "Promotie & bezichtigingen",
    text: "Uw pand wordt gepubliceerd op alle grote portalen en ons eigen netwerk. Wij plannen en begeleiden alle bezichtigingen.",
  },
  {
    num: "04",
    title: "Onderhandeling & compromis",
    text: "Wij onderhandelen in uw naam en begeleiden u tot aan de notariële akte. U bent in goede handen, van A tot Z.",
  },
];

const VOORDELEN = [
  "Lokale marktkennis en jarenlange ervaring",
  "Groot netwerk van kopers en investeerders",
  "Discreet voor eigendom zonder publieke promotie",
  "Volledige administratieve begeleiding",
  "Eerlijk en transparant commissiemodel",
  "Resultaatgericht — geen verkoop, geen kosten",
];

export default function VerkopenPage() {
  return (
    <>
      <MHiNav />

      <div className="mWrap">
        <div className="mBreadcrumb">
          <Link href={BASE}>Home</Link>
          <span>/</span>
          <span>Verkopen</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 6 }}>
          Uw woning verkopen
        </h1>
        <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 32, maxWidth: 620 }}>
          Alba Immo begeleidt u van de eerste schatting tot de notariële akte.
          Ontdek hoe wij uw verkoop aanpakken en waarom verkopers ons vertrouwen.
        </p>

        {/* Steps */}
        <div className="mVerkopenSteps">
          {STEPS.map((s, i) => (
            <div className="mStepCard" key={i}>
              <div className="mStepNum">{s.num}</div>
              <div className="mStepTitle">{s.title}</div>
              <p className="mStepText">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Waarom section */}
        <div style={{
          background: "var(--dark)", borderRadius: "var(--r-lg)",
          padding: "40px 36px", margin: "36px 0",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
        }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--surface)", marginBottom: 12 }}>
              Waarom kiezen voor Alba Immo?
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.8 }}>
              Meer dan 20 jaar ervaring, honderden succesvolle verkopen en een reputatie
              die op vertrouwen is gebouwd — dat is de belofte van Alba Immo.
            </p>
          </div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            {VOORDELEN.map((v, i) => (
              <li key={i} style={{
                fontSize: 13, color: "rgba(255,255,255,.65)",
                paddingLeft: 20, position: "relative",
              }}>
                <span style={{
                  position: "absolute", left: 0, top: 5,
                  width: 8, height: 8, background: "var(--orange)",
                  borderRadius: "50%", display: "inline-block",
                }} />
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", paddingBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Klaar om te starten?</h2>
          <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 20 }}>
            Vraag vandaag nog een gratis en vrijblijvende schatting aan.
          </p>
          <Link href={`${BASE}/contact`} className="mBtn mBtn-primary">Gratis schatting aanvragen</Link>
        </div>
      </div>

      <MHiFooter />
    </>
  );
}
