import "../golden.css";
import GsNav from "../GsNav";
import GsFooter from "../GsFooter";

const PAARDEN = [
  { name: "Leandro VG", level: "CSI3* / 1m50", rider: "Jeroen De Winter", results: "1e GP Bonheiden 2024 · Nations Cup Sentowerpark 2023", img: "photo-1534438327276-14e5300c3a48", desc: "Leandro is Jeroen's topper van het moment. Hij springt met ongelooflijk gemak en heeft een enorm hart voor de sport." },
  { name: "Gretel du Guldenhof", level: "CSI2* / 1m45", rider: "Jeroen De Winter", results: "Nations Cup teamlid 2023 · 2e GP Lier 2024", img: "photo-1558618666-fcd25c85cd64", desc: "Gretel is het onafscheidelijke duo met Jeroen. Een merrie met een uitzonderlijke techniek en een ijzersterk karakter." },
  { name: "Mystic du Guldenhof", level: "CSI2* / 1m45", rider: "Jeroen De Winter", results: "Winnaar finale 7-jarigen Lier 2024 · Kampioen Zangersheide 6-jarigen 2023", img: "photo-1566231779484-92f3d3b3b0e0", desc: "Mystic is een van de meest belovende jonge paarden van het Guldenhof. Ze combineert techniek met snelheid." },
  { name: "Nixon", level: "CSI* / 1m35", rider: "Lisa De Winter", results: "2e hengstencompetitie Sentowerpark 2024 · Score 8.6/10", img: "photo-1553284965-83fd3e82fa5a", desc: "Nixon is de ster van Lisa. Hij is een uitzonderlijk getalenteerde jongeman met een grote toekomst voor zich." },
  { name: "Excelsior Optimus", level: "CSI* / 1m30", rider: "Tom Claes (gastruiter)", results: "Beste youngster Mechelen 2024 · BWP studboek goedgekeurd", img: "photo-1580739826297-9338e6c80943", desc: "Excelsior is een van onze jonge talenten die momenteel zijn opleiding voltooit richting het internationale circuit." },
  { name: "Sunday JM", level: "CSI2* / 1m45", rider: "Jeroen De Winter", results: "Finalist WK jonge paarden Le Lion 2023 · 9/10 Zangersheide", img: "photo-1591168879019-e70c2bddaed8", desc: "Sunday JM is het nieuwe wapen van Jeroen voor het komende seizoen. Een paard met buitengewone kwaliteiten." },
];

const RESULTATEN = [
  { datum: "Juni 2024", comp: "CSI2* Bonheiden", paard: "Leandro VG", plaats: "1e Grand Prix", ruiter: "Jeroen De Winter" },
  { datum: "Mei 2024", comp: "CSI2* Lier", paard: "Mystic du Guldenhof", plaats: "1e finale 7-jarigen", ruiter: "Jeroen De Winter" },
  { datum: "April 2024", comp: "Hengstencompetitie Sentowerpark", paard: "Nixon", plaats: "2e categorie", ruiter: "Lisa De Winter" },
  { datum: "Sept 2023", comp: "Nations Cup Sentowerpark", paard: "Gretel du Guldenhof", plaats: "Teamlid winnend team", ruiter: "Jeroen De Winter" },
  { datum: "Aug 2023", comp: "WK jonge paarden Le Lion", paard: "Sunday JM", plaats: "Finalist", ruiter: "Jeroen De Winter" },
  { datum: "Juli 2023", comp: "CSI2* Lier", paard: "Leandro VG", plaats: "2e Grand Prix", ruiter: "Jeroen De Winter" },
];

export default function WedstrijdstalPage() {
  return (
    <>
      <GsNav alwaysDark />

      <div className="gsPageHero">
        <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=85" alt="Wedstrijdstal" />
        <div className="gsPageHeroOverlay" />
        <div className="gsPageHeroContent">
          <div className="gsPageHeroCrumb">Golden Stables — Wedstrijdstal</div>
          <h1 className="gsPageHeroTitle">Onze <em>wedstrijdstal</em></h1>
          <p className="gsPageHeroSub">Toppaarden in sport — van 1m30 tot Grand Prix</p>
        </div>
      </div>

      {/* Paarden */}
      <section style={{ padding: "72px 0", background: "#f9f7f4" }}>
        <div className="gsContainer">
          <h2 className="gsSectionTitle" style={{ marginBottom: 8 }}>Onze sport<em style={{ fontStyle: "italic", color: "#2d5a27" }}>paarden</em></h2>
          <p className="gsSectionSub">Actief in de nationale en internationale springruitersport</p>
          <div className="gsHengstenGrid" style={{ marginTop: 36, gridTemplateColumns: "repeat(3,1fr)" }}>
            {PAARDEN.map((p) => (
              <div key={p.name} className="gsHengstenCard">
                <div className="gsHengstenImg" style={{ aspectRatio: "4/3" }}>
                  <img src={`https://images.unsplash.com/${p.img}?w=600&q=80`} alt={p.name} />
                </div>
                <div className="gsHengstenBody" style={{ padding: "18px 20px 22px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#2d5a27", marginBottom: 6 }}>
                    {p.level} · {p.rider}
                  </div>
                  <div className="gsHengstenName">{p.name}</div>
                  <div className="gsHengstenBred" style={{ marginBottom: 10 }}>{p.results}</div>
                  <p style={{ fontSize: 12, color: "#777", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultaten tabel */}
      <section style={{ padding: "72px 0 96px", background: "#fff", borderTop: "1px solid #e8e4de" }}>
        <div className="gsContainer">
          <h2 className="gsSectionTitle" style={{ marginBottom: 36 }}>Recente <em style={{ fontStyle: "italic", color: "#2d5a27" }}>resultaten</em></h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e8e4de" }}>
                  {["Datum", "Wedstrijd", "Paard", "Resultaat", "Ruiter"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#888" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESULTATEN.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0ece6", background: i % 2 === 0 ? "#fff" : "#faf8f5" }}>
                    <td style={{ padding: "14px 16px", color: "#888", fontStyle: "italic" }}>{r.datum}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{r.comp}</td>
                    <td style={{ padding: "14px 16px", color: "#2d5a27", fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>{r.paard}</td>
                    <td style={{ padding: "14px 16px" }}><span style={{ background: "#e8f0e6", color: "#2d5a27", padding: "3px 10px", borderRadius: 2, fontSize: 12, fontWeight: 700 }}>{r.plaats}</span></td>
                    <td style={{ padding: "14px 16px", color: "#666" }}>{r.ruiter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <GsFooter />
    </>
  );
}
