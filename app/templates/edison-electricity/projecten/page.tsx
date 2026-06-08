import Link from "next/link";
import EdisonNav from "../EdisonNav";
import EdisonFooter from "../EdisonFooter";
import "../edison.css";

const BASE = "/templates/edison-electricity";

const PROJECTS = [
  {
    icon: "⚡",
    cat: "Elektriciteitskast",
    title: "Vernieuwing groepenkast — gezinswoning",
    desc: "Verouderde zekeringkast volledig vervangen door een moderne groepenkast met aardlekschakelaars. Veilig, conform en netjes afgewerkt in een gezinswoning te Nijlen.",
  },
  {
    icon: "🔍",
    cat: "Storing",
    title: "Herstelling elektrische storing",
    desc: "Kortsluiting in de verdeelkast snel opgespoord en hersteld. Woning terug volledig operationeel binnen het uur. Klant opgeroepen via noodservice.",
  },
  {
    icon: "💡",
    cat: "Verlichting",
    title: "LED-verlichting bij renovatieproject",
    desc: "Volledige LED-installatie met dimfunctie geplaatst tijdens renovatie van een open living. Sfeerverlichting, downlights en buitenspot volledig geïntegreerd.",
  },
  {
    icon: "🏗️",
    cat: "Nieuwbouw",
    title: "Volledige elektrische installatie nieuwbouw",
    desc: "Elektrische installatie van A tot Z voor een nieuwbouwwoning: bekabeling, groepenkast, verlichting, stopcontacten, domotica-voorbereiding en keuring.",
  },
  {
    icon: "🏠",
    cat: "Renovatie",
    title: "Renovatie elektriciteit appartement",
    desc: "Volledige herbekabeling van een ouder appartement bij renovatie. Nieuwe verdeelkast, extra groepen voor keuken en badkamer, conforme keuring.",
  },
  {
    icon: "🔦",
    cat: "Buiten",
    title: "Buitenverlichting villa",
    desc: "Plaatsing van bewegingssensoren, buitenspots en sfeervollicht langs oprit en tuin. Waterdichte installatie, tijdschakelaars en afstandsbediening.",
  },
  {
    icon: "🚨",
    cat: "Noodinterventie",
    title: "Noodinterventie na storm",
    desc: "Spoedoproep na stormschade. Afgebroken leiding hersteld, grondkabel gerepareerd en veiligheid gewaarborgd — alles opgelost binnen de 2 uur.",
  },
  {
    icon: "🔌",
    cat: "Elektriciteitskast",
    title: "Upgrade kast voor laadpaal EV",
    desc: "Elektriciteitskast uitgebreid met extra groep voor de plaatsing van een laadpaal voor elektrisch voertuig. Conform AREI, klaar voor inspectie.",
  },
  {
    icon: "💡",
    cat: "Verlichting",
    title: "Industriële verlichting werkplaats",
    desc: "Volledige LED-renovatie van een werkplaats: TL-verlichting vervangen door efficiënte LED-panelen, aparte noodverlichting geplaatst.",
  },
];

export default function ProjectenPage() {
  return (
    <>
      <EdisonNav />

      {/* Page hero */}
      <div className="edPageHero">
        <div className="edPageHeroInner">
          <div className="edBreadcrumb">
            <Link href={BASE}>Home</Link>
            <span>/</span>
            <span>Afgewerkte projecten</span>
          </div>
          <h1 className="edPageHeroTitle">Afgewerkte projecten</h1>
          <p className="edPageHeroSub">
            Een overzicht van klussen die wij de afgelopen jaren vakkundig en netjes hebben afgerond —
            in Nijlen en de ruime omgeving.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="edSection">
        <div className="edSectionInner">
          <div className="edProjGrid">
            {PROJECTS.map((p) => (
              <div className="edProjCard" key={p.title}>
                <div className="edProjImg">
                  {p.icon}
                  <div className="edProjCat">{p.cat}</div>
                </div>
                <div className="edProjBody">
                  <div className="edProjTitle">{p.title}</div>
                  <p className="edProjDesc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="edCtaBanner">
        <div className="edCtaBannerInner">
          <h2>Uw project laten uitvoeren?</h2>
          <p>Vraag vrijblijvend een offerte aan of neem telefonisch contact op.</p>
          <div className="edCtaBtns">
            <a href="tel:+32000000000" className="edBtnDark">📞 Bel ons</a>
            <Link href={`${BASE}/contact`} className="edBtnDarkOutline">Offerte aanvragen</Link>
          </div>
        </div>
      </div>

      <EdisonFooter />
    </>
  );
}
