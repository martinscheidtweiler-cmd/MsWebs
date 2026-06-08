"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MHiNav from "../../MHiNav";
import MHiFooter from "../../MHiFooter";
import "../../mhi.css";

const BASE = "/templates/alba-modern";

function Foto({ label }: { label?: string }) {
  return <div className="mFoto">{label ?? "foto"}</div>;
}

const DB: Record<string, {
  type: string; city: string; zip: string; price: string; horses: number;
  status: string; ref: string; opp: string; slaap: string; bad: string; garage: string;
  epc: string; beschikbaar: string; grond: string; bewoning: string;
  desc: string[];
}> = {
  "4450": {
    type: "Villa", city: "Tervuren", zip: "3080", price: "€ 895.000", horses: 5,
    status: "Te koop", ref: "ALB-4450", opp: "520 m²", slaap: "4", bad: "3",
    garage: "2 autostaanplaatsen", epc: "C – 210 kWh/m²/jaar",
    beschikbaar: "In overleg", grond: "1.200 m²", bewoning: "Vrijstaande villa",
    desc: [
      "Deze uitzonderlijke villa is gelegen in een rustige villawijk in het groene Tervuren, op wandelafstand van het Koninklijk Domein.",
      "De woning beschikt over een ruime leefruimte met open haard, een volledig uitgeruste keuken, een aparte eetkamer en een zonnige veranda.",
      "Op de bovenverdieping bevinden zich vier ruime slaapkamers, twee badkamers en een apart toilet. De masterkamer heeft een eigen dressing en ensuite badkamer.",
      "De tuin is prachtig aangelegd met een verwarmd buitenzwembad, een poolhouse en een grote terras. Er is een dubbele garage en voldoende parkeerruimte op eigen terrein.",
    ],
  },
  "4567": {
    type: "Appartement", city: "Leuven", zip: "3000", price: "€ 545.000", horses: 4,
    status: "Te koop", ref: "ALB-4567", opp: "185 m²", slaap: "3", bad: "2",
    garage: "1 ondergrondse autostaanplaats", epc: "B – 145 kWh/m²/jaar",
    beschikbaar: "Per direct", grond: "/", bewoning: "Penthouse",
    desc: [
      "Exclusief penthouse op de bovenste verdieping van een recent gebouw in het hart van Leuven, op loopafstand van alle voorzieningen.",
      "Het appartement geniet van een panoramisch zicht over de historische binnenstad en beschikt over twee ruime terrassen (samen 80 m²).",
      "De leefruimte is licht en open, met een strakke designkeuken en hoogwaardige afwerking. Er zijn drie ruime slaapkamers en twee badkamers.",
      "Inclusief privatieve autostaanplaats in de ondergrondse garage en een bergruimte.",
    ],
  },
  "4545": {
    type: "Woning", city: "Heverlee", zip: "3001", price: "€ 395.000", horses: 3,
    status: "Te koop", ref: "ALB-4545", opp: "210 m²", slaap: "3", bad: "2",
    garage: "Garage + oprit", epc: "D – 295 kWh/m²/jaar",
    beschikbaar: "3 maanden", grond: "650 m²", bewoning: "Halfopen bebouwing",
    desc: [
      "Charmante halfopen woning gelegen in een rustige, groene straat in Heverlee, op enkele minuten van het centrum van Leuven.",
      "De woning beschikt over een gezellige woonkamer, een ruime keuken, een berging en een veranda met zicht op de tuin.",
      "Op de eerste verdieping bevinden zich drie slaapkamers, een badkamer en een apart toilet. Er is ook een zolder die geschikt is voor uitbreiding.",
      "De tuin is zuidgericht en volledig omheind — ideaal voor gezinnen met kinderen. Garage en ruime oprit aanwezig.",
    ],
  },
};

const THUMBS = 4;

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const p = DB[id];
  const [mainThumb, setMainThumb] = useState(0);

  if (!p) {
    return (
      <>
        <MHiNav />
        <div className="mWrap" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Pand niet gevonden</h2>
            <p style={{ color: "var(--sub)", marginBottom: 20 }}>Het pand met referentie {id} bestaat niet in onze databank.</p>
            <Link href={`${BASE}/aanbod`} className="mBtn mBtn-primary">Terug naar aanbod</Link>
          </div>
        </div>
        <MHiFooter />
      </>
    );
  }

  return (
    <>
      <MHiNav />

      <div className="mWrap">
        <div className="mBreadcrumb">
          <Link href={BASE}>Home</Link>
          <span>/</span>
          <Link href={`${BASE}/aanbod`}>Aanbod</Link>
          <span>/</span>
          <span>{p.type} {p.city} – {p.ref}</span>
        </div>

        {/* Header row */}
        <div className="mDetailHeader">
          <div>
            <h1 className="mDetailTitle">{p.type} te {p.status === "Te koop" ? "koop" : "huur"} – {p.city}</h1>
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
              Ref. {p.ref} · {p.zip} {p.city} · {p.opp}
            </p>
          </div>
          <div className="mDetailPrice">{p.price}</div>
        </div>

        <div className="mDetailLayout">
          {/* Left: gallery + details */}
          <div>
            {/* Gallery */}
            <div className="mGalleryMain">
              <Foto label={`foto ${mainThumb + 1}`} />
            </div>
            <div className="mGalleryThumbs">
              {Array.from({ length: THUMBS }, (_, i) => (
                <div
                  key={i}
                  className={`mGalleryThumb${mainThumb === i ? " on" : ""}`}
                  onClick={() => setMainThumb(i)}
                >
                  <Foto label={`${i + 1}`} />
                </div>
              ))}
            </div>
            <div className="mGalleryMeta">{THUMBS} foto's beschikbaar</div>

            {/* Omschrijving */}
            <div className="mDetailSection">Omschrijving</div>
            {p.desc.map((d, i) => (
              <p key={i} style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.8, marginBottom: 12 }}>{d}</p>
            ))}

            {/* Algemeen */}
            <div className="mDetailSection">Algemeen</div>
            <table className="mDataTable">
              <tbody>
                <tr><td>Referentie</td><td>{p.ref}</td></tr>
                <tr><td>Type</td><td>{p.type}</td></tr>
                <tr><td>Status</td><td>{p.status}</td></tr>
                <tr><td>Bewoning</td><td>{p.bewoning}</td></tr>
                <tr><td>Beschikbaar</td><td>{p.beschikbaar}</td></tr>
                <tr><td>Prijs</td><td>{p.price}</td></tr>
              </tbody>
            </table>

            {/* Stedenbouwkundige info */}
            <div className="mDetailSection">Kenmerken</div>
            <table className="mDataTable">
              <tbody>
                <tr><td>Bewoonbare opp.</td><td>{p.opp}</td></tr>
                <tr><td>Grondoppervlakte</td><td>{p.grond}</td></tr>
                <tr><td>Slaapkamers</td><td>{p.slaap}</td></tr>
                <tr><td>Badkamers</td><td>{p.bad}</td></tr>
                <tr><td>Garage / parking</td><td>{p.garage}</td></tr>
                <tr><td>EPC</td><td>{p.epc}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Right: sidebar */}
          <div>
            <div className="mContactBox">
              <div className="mContactBoxTitle">Contacteer ons</div>
              <button className="mContactBoxBtn">📞 Bel +32 16 00 11 22</button>
              <button className="mContactBoxBtnOutline">✉ Stuur een bericht</button>
            </div>

            <div className="mContactBox">
              <div className="mContactBoxTitle">Bezoek aanvragen</div>
              <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 14, lineHeight: 1.6 }}>
                Wij plannen graag een bezichtiging op maat voor u in.
              </p>
              <button className="mContactBoxBtn">📅 Bezoek inplannen</button>
            </div>

            <div className="mContactBox">
              <div className="mContactBoxTitle">Discrete portefeuille</div>
              <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6 }}>
                Op zoek naar meer gelijkaardige panden? Schrijf u in voor onze discrete portefeuille.
              </p>
            </div>

            {/* Price breakdown */}
            <div className="mContactBox" style={{ marginTop: 0 }}>
              <div className="mContactBoxTitle">Prijssimulatie</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--muted)" }}>Aankoopprijs</span>
                <span>{p.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--muted)" }}>Registratierecht (3%)</span>
                <span>indicatief</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderTop: "1px solid var(--border)", paddingTop: 8, fontWeight: 700 }}>
                <span>Totaal (±)</span>
                <span>op aanvraag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MHiFooter />
    </>
  );
}
