import "../golden.css";
import GsNav from "../GsNav";
import GsFooter from "../GsFooter";

const FOKMERRIES = [
  { name: "Emerald's Pride", bred: "Emerald van 't Ruytershof × Carthago Z", born: 2014, desc: "Moeder van 3 goedgekeurde hengsten. Haar nakomelingen zijn actief tot 1m50.", img: "photo-1558618666-fcd25c85cd64", offspring: "8 veulens — 3 hengsten goedgekeurd" },
  { name: "Dollar Girl Z", bred: "Dollar Boy × Calvaro Z", born: 2013, desc: "Volle zus van internationale toppaarden. Onze trots in de fokkerij.", img: "photo-1566231779484-92f3d3b3b0e0", offspring: "6 veulens — 2 actief op 1m45+" },
  { name: "Usha van 't Roosakker", bred: "Urano de Cartigny × Voltaire", born: 2011, desc: "Bewezen moederstam met international Grand Prix paarden in de nakomelingschap.", img: "photo-1553284965-83fd3e82fa5a", offspring: "10 veulens — 1 WK deelnemer" },
  { name: "Querly Chin Z", bred: "Chin Chin × Quick Star", born: 2015, desc: "Dochter van de beroemde Chin Chin. Een ware fokmerrie met een ongelooflijke afstamming.", img: "photo-1574023279800-c9b7ef70a652", offspring: "4 veulens — allemaal goedgekeurd" },
];

const YOUNGSTERS = [
  { name: "Xcelerate du Guldenhof", sire: "Pegase van 't Ruytershof", dam: "Emerald's Pride", born: 2023, gender: "Hengst", img: "photo-1580739826297-9338e6c80943" },
  { name: "Xylia van het Guldenhof", sire: "Leandro VG", dam: "Dollar Girl Z", born: 2023, gender: "Merrie", img: "photo-1593160853789-e20c4b89e88b" },
  { name: "Xander du Guldenhof", sire: "Sunday JM", dam: "Querly Chin Z", born: 2022, gender: "Hengst", img: "photo-1591168879019-e70c2bddaed8" },
  { name: "Xena van het Guldenhof", sire: "Vinnie van het Guldenhof", dam: "Usha van 't Roosakker", born: 2022, gender: "Merrie", img: "photo-1534438327276-14e5300c3a48" },
];

export default function FokkerijPage() {
  return (
    <>
      <GsNav alwaysDark />

      <div className="gsPageHero">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85" alt="Fokkerij" />
        <div className="gsPageHeroOverlay" />
        <div className="gsPageHeroContent">
          <div className="gsPageHeroCrumb">Golden Stables — Fokkerij</div>
          <h1 className="gsPageHeroTitle">Onze <em>fokkerij</em></h1>
          <p className="gsPageHeroSub">Bewezen moederstammen voor de springpaardenwereld van morgen</p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "60px 0", background: "#fff", borderBottom: "1px solid #e8e4de" }}>
        <div className="gsContainer">
          <div style={{ maxWidth: 820, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 className="gsSectionTitle" style={{ marginBottom: 16 }}>Fokfilosofie</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9 }}>
                Bij het Guldenhof geloven we dat de moederstam de basis is van elke succesvolle fokkerij. We selecteren onze merries uiterst zorgvuldig — alleen diegenen met bewezen moederstammen komen in aanmerking voor onze fokprogramma's.
              </p>
            </div>
            <div>
              <h2 className="gsSectionTitle" style={{ marginBottom: 16 }}>Onze doelstelling</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9 }}>
                We fokken uitsluitend voor het allerhoogste niveau: Grand Prix springpaarden die actief zijn in de internationale circuit. Kwaliteit primeert altijd op kwantiteit in onze fokkerij.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fokmerries */}
      <section style={{ padding: "72px 0", background: "#f9f7f4" }}>
        <div className="gsContainer">
          <h2 className="gsSectionTitle" style={{ marginBottom: 8 }}>Onze <em style={{ fontStyle: "italic", color: "#2d5a27" }}>fokmerries</em></h2>
          <p className="gsSectionSub">Geselecteerde merries met bewezen moederstammen</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28, marginTop: 36 }}>
            {FOKMERRIES.map((m) => (
              <div key={m.name} style={{ display: "grid", gridTemplateColumns: "200px 1fr", border: "1px solid #e8e4de", borderRadius: 4, overflow: "hidden", background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
                <div style={{ overflow: "hidden" }}>
                  <img src={`https://images.unsplash.com/${m.img}?w=400&q=80`} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.9) saturate(.8)" }} />
                </div>
                <div style={{ padding: "24px 24px 24px 22px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#2d5a27", marginBottom: 6 }}>Fokmerrie — {m.born}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: "#888", fontStyle: "italic", marginBottom: 12 }}>{m.bred}</div>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>{m.desc}</p>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2d5a27", background: "#e8f0e6", padding: "4px 12px", borderRadius: 2, display: "inline-block" }}>{m.offspring}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Youngsters */}
      <section style={{ padding: "72px 0 96px", background: "#fff", borderTop: "1px solid #e8e4de" }}>
        <div className="gsContainer">
          <h2 className="gsSectionTitle" style={{ marginBottom: 8 }}>Onze <em style={{ fontStyle: "italic", color: "#2d5a27" }}>youngsters</em></h2>
          <p className="gsSectionSub">De veulens en jonge paarden van het Guldenhof</p>
          <div className="gsHengstenGrid" style={{ marginTop: 36 }}>
            {YOUNGSTERS.map((y) => (
              <div key={y.name} className="gsHengstenCard">
                <div className="gsHengstenImg">
                  <img src={`https://images.unsplash.com/${y.img}?w=500&q=80`} alt={y.name} />
                </div>
                <div className="gsHengstenBody">
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#2d5a27", marginBottom: 4 }}>{y.gender} — {y.born}</div>
                  <div className="gsHengstenName">{y.name}</div>
                  <div className="gsHengstenBred">v. {y.sire} × {y.dam}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GsFooter />
    </>
  );
}
