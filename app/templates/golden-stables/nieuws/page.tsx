import "../golden.css";
import GsNav from "../GsNav";
import GsFooter from "../GsFooter";

const ARTIKELS = [
  { date: "10 Maart 2025", title: "Vinnie van het Guldenhof goedgekeurd voor BWP studboek", text: "Ons 3-jarig talent Vinnie van het Guldenhof werd goedgekeurd voor het BWP studboek. De jury beoordeelde hem uitstekend op zijn stap, draf, galop en sprong. Een geweldige prestatie voor deze veelbelovende hengst die de lijn van zijn vader Pegase verderzet.", img: "photo-1553284965-83fd3e82fa5a" },
  { date: "16 Juli 2024", title: "Leandro wint Grand Prix 2* te Bonheiden", text: "Jeroen De Winter reed een schitterende ronde met Leandro VG en won de Grand Prix CSI2* in Bonheiden na een spannende barrage. Het duo was foutloos en snelste in de doorrit. Een bevestiging van de topvorm van dit duo.", img: "photo-1534438327276-14e5300c3a48" },
  { date: "20 Mei 2024", title: "Mystic wint finale 7-jarigen te Lier", text: "Op de CSI2* te Lier won Mystic du Guldenhof de finale voor 7-jarige paarden. Ze was foutloos in de barrage en bewees opnieuw dat ze tot de top behoort van haar generatie. Jeroen De Winter was uiteraard in zijn nopjes.", img: "photo-1566231779484-92f3d3b3b0e0" },
  { date: "3 April 2024", title: "Nixon op de hengstencompetitie 2024", text: "Nixon van het Guldenhof deed het uitstekend op de jaarlijkse hengstencompetitie te Sentowerpark. Hij eindigde als tweede in zijn categorie met een schitterende score van 8,6/10 voor zijn sprong.", img: "photo-1558618666-fcd25c85cd64" },
  { date: "18 Februari 2024", title: "Nieuwe aanwinst: Sunday JM", text: "We zijn verheugd om de aankomst van Sunday JM aan te kondigen. Deze 7-jarige hengst is een indrukwekkende zoon van Ermitage Kalone en zal dit seizoen zijn eerste sperma-campagne rijden vanuit het Guldenhof.", img: "photo-1574023279800-c9b7ef70a652" },
  { date: "12 December 2023", title: "Jeroen wint Nations Cup te Sentowerpark", text: "Een historische dag voor het Guldenhof! Jeroen De Winter was lid van het Belgische nationaal team dat de Nations Cup won te Sentowerpark. Gretel du Guldenhof reed een foutloze ronde in beide rondes.", img: "photo-1580739826297-9338e6c80943" },
];

export default function NieuwsPage() {
  return (
    <>
      <GsNav alwaysDark />

      <div className="gsPageHero">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=85" alt="Nieuws" />
        <div className="gsPageHeroOverlay" />
        <div className="gsPageHeroContent">
          <div className="gsPageHeroCrumb">Golden Stables — Nieuws</div>
          <h1 className="gsPageHeroTitle">Laatste <em>nieuws</em></h1>
          <p className="gsPageHeroSub">Resultaten, updates en aankondigingen van het Guldenhof</p>
        </div>
      </div>

      <section style={{ padding: "72px 0 96px", background: "#f9f7f4" }}>
        <div className="gsContainer">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {ARTIKELS.map((a) => (
              <article key={a.title} className="gsNieuwsCard" style={{ cursor: "pointer" }}>
                <div className="gsNieuwsImg">
                  <img src={`https://images.unsplash.com/${a.img}?w=600&q=80`} alt={a.title} />
                </div>
                <div className="gsNieuwsBody">
                  <div className="gsNieuwsDate">{a.date}</div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GsFooter />
    </>
  );
}
