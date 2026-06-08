import GsNav from "../GsNav";
import GsFooter from "../GsFooter";
import "../golden.css";

const REFERENTIES = [
  {
    naam: "Diamant van de Hoeve",
    ras: "KWPN",
    geboortejaar: 2018,
    prestatie: "1.40m International – CSI Wellington",
    huidigEigenaar: "Ecurie De Bruyne, FR",
    img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80",
  },
  {
    naam: "Kingston S",
    ras: "BWP",
    geboortejaar: 2017,
    prestatie: "1.35m Nationaal – Tops International Arena",
    huidigEigenaar: "Stal Van Damme, BE",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
  },
  {
    naam: "Florida Belle",
    ras: "OS",
    geboortejaar: 2019,
    prestatie: "Grand Prix Dressuur – 72.4% CDI***",
    huidigEigenaar: "Dressuurcentrum Leuven, BE",
    img: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&q=80",
  },
  {
    naam: "Quentin D'Or",
    ras: "SBS",
    geboortejaar: 2016,
    prestatie: "1.50m – CSIO Lummen – Top 5 finish",
    huidigEigenaar: "Privéeigenaar, NL",
    img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80",
  },
  {
    naam: "Arabella van het Woud",
    ras: "KWPN",
    geboortejaar: 2020,
    prestatie: "Jonge Paard Champion – Lanaken 2023",
    huidigEigenaar: "Stal Hermans, BE",
    img: "https://images.unsplash.com/photo-1553284966-19b8815c7817?w=600&q=80",
  },
  {
    naam: "Nobel Son Z",
    ras: "Zangersheide",
    geboortejaar: 2015,
    prestatie: "1.60m Grand Prix – CSI5* Genève",
    huidigEigenaar: "Ecurie Internationale, CH",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
  },
  {
    naam: "Toscana van de Beek",
    ras: "KWPN",
    geboortejaar: 2018,
    prestatie: "Prix St. Georges – 68.8% CDI**",
    huidigEigenaar: "Dressuurmanège Brugge, BE",
    img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80",
  },
  {
    naam: "Cornet's Legacy",
    ras: "Hannoveraner",
    geboortejaar: 2017,
    prestatie: "1.45m – CSI Weinheim, Winner",
    huidigEigenaar: "Gestüt Hoffmann, DE",
    img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80",
  },
  {
    naam: "Lisette van de Hoeve",
    ras: "BWP",
    geboortejaar: 2019,
    prestatie: "Intermédiaire I – Nationaal Kampioen U25",
    huidigEigenaar: "Privéeigenaar, BE",
    img: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&q=80",
  },
];

export default function ReferentiesPage() {
  return (
    <>
      <GsNav alwaysDark />

      {/* Page Hero */}
      <div className="gsPageHero">
        <img
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1600&q=80"
          alt="Referenties hero"
          className="gsPageHeroBg"
        />
        <div className="gsPageHeroOverlay" />
        <div className="gsPageHeroContent">
          <p className="gsPageHeroBreadcrumb">
            <span>Home</span> / Referenties
          </p>
          <h1 className="gsPageHeroTitle">Referenties</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="gsSection" style={{ paddingBottom: "2rem" }}>
        <div className="gsContainer">
          <div className="gsSectionHeader">
            <span className="gsSectionTag">Onze track record</span>
            <h2 className="gsSectionTitle">Succesvol geplaatste paarden</h2>
            <p className="gsSectionSub">
              Elk paard dat Golden Stables verlaat, is zorgvuldig gematcht met de juiste ruiter en stal.
              Hieronder vindt u een selectie van onze succesvolle plaatsingen — paarden die nationaal
              en internationaal excelleren.
            </p>
          </div>
        </div>
      </section>

      {/* Referenties Grid */}
      <section className="gsSection" style={{ paddingTop: "1rem" }}>
        <div className="gsContainer">
          <div className="gsRefGrid">
            {REFERENTIES.map((r, i) => (
              <div className="gsRefCard" key={i}>
                <div className="gsRefImg">
                  <img src={r.img} alt={r.naam} />
                  <div className="gsRefRas">{r.ras} · {r.geboortejaar}</div>
                </div>
                <div className="gsRefBody">
                  <h3 className="gsRefNaam">{r.naam}</h3>
                  <p className="gsRefPrestatie">
                    <span className="gsRefLabel">Prestatie</span>
                    {r.prestatie}
                  </p>
                  <p className="gsRefEigenaar">
                    <span className="gsRefLabel">Huidige eigenaar</span>
                    {r.huidigEigenaar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gsCtaBanner">
        <div className="gsCtaBannerInner">
          <h2>Op zoek naar een toppaard?</h2>
          <p>Neem contact met ons op voor een persoonlijk gesprek over uw wensen en mogelijkheden.</p>
          <a href="/templates/golden-stables/contact" className="gsBtn gsHeroBtn">
            Contacteer ons
          </a>
        </div>
      </section>

      <GsFooter />
    </>
  );
}
