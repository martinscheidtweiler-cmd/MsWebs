"use client";
import "./citadel.css";

export default function CitadelTemplate() {
  const ticker = ["Residentieel", "Commercieel", "Nieuwbouw", "Renovatie", "Projectontwikkeling", "Luxevastgoed"];

  return (
    <>
      <nav className="ctNav">
        <div className="ctLogo">CITADEL<span>.</span></div>
        <div className="ctNavLinks">
          <a href="#">Projecten</a>
          <a href="#">Diensten</a>
          <a href="#">Portfolio</a>
          <a href="#">Team</a>
          <a href="#">Contact</a>
        </div>
        <button className="ctNavBtn">Project bespreken</button>
      </nav>

      <section className="ctHero">
        <div className="ctHeroBg">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85" alt="Citadel" />
        </div>
        <div className="ctHeroContent">
          <div className="ctHeroKicker"><span>Vastgoedontwikkelaar</span></div>
          <h1 className="ctHeroTitle">WE BUILD<em>LANDMARKS</em></h1>
          <div className="ctHeroRow">
            <p className="ctHeroSub">Citadel ontwikkelt uitzonderlijke vastgoedprojecten die de omgeving definiëren. Van conceptvisie tot oplevering — met oog voor detail en duurzaamheid.</p>
            <div className="ctHeroBtns">
              <button className="ctBtn">Onze projecten</button>
              <button className="ctBtnLine">Contact opnemen</button>
            </div>
          </div>
        </div>
      </section>

      <div className="ctTicker">
        <div className="ctTickerTrack">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="ctTickerItem">{t}</span>
          ))}
        </div>
      </div>

      <section className="ctPortfolio">
        <div className="ctPortInner">
          <div className="ctSectionHead">
            <div>
              <span>Realisaties</span>
              <h2>ONS<br />PORTFOLIO</h2>
            </div>
            <button className="ctBtnLine">Alle projecten</button>
          </div>
          <div className="ctPortGrid">
            {[
              { cat: "Luxe Residentieel", title: "TOWER ONE ANTWERPEN", year: "2024", img: "photo-1486325212027-8081e485255e" },
              { cat: "Commercieel", title: "ATLAS BUSINESS PARK", year: "2023", img: "photo-1497366216548-37526070297c" },
              { cat: "Gemengd Gebruik", title: "CANARY WHARF GENT", year: "2023", img: "photo-1481026469463-66327c86e544" },
              { cat: "Residentieel", title: "LE PARC WOLUWE", year: "2022", img: "photo-1560449752-3fd4bdaa2c8a" },
            ].map((p) => (
              <div key={p.title} className="ctPortItem">
                <img className="ctPortImg" src={`https://images.unsplash.com/${p.img}?w=900&q=80`} alt={p.title} />
                <div className="ctPortOverlay" />
                <div className="ctPortInfo">
                  <div className="ctPortCat">{p.cat}</div>
                  <div className="ctPortTitle">{p.title}</div>
                  <div className="ctPortYear">{p.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ctServices">
        <div className="ctServInner">
          <div className="ctServText">
            <span>Wat wij doen</span>
            <h2>ONZE EXPERTISE</h2>
            <p>Van grondbeheer tot clé-op-de-deur levering — Citadel beheerst elke fase van de vastgoedontwikkeling.</p>
            <button className="ctBtn">Kennismaken</button>
          </div>
          <div className="ctServList">
            {[
              "Projectontwikkeling",
              "Architectuurcoördinatie",
              "Vergunningenbeheer",
              "Bouwheer-begeleiding",
              "Investeerdersrelaties",
              "Facility Management",
            ].map((s) => (
              <div key={s} className="ctServItem">
                <h4>{s}</h4>
                <span className="ctServArrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ctCta">
        <div className="ctCtaBg">C</div>
        <div className="ctCtaInner">
          <h2>LET'S BUILD TOGETHER</h2>
          <p>Heeft u een site, een idee of een investering? Laten we samen ontdekken wat er mogelijk is.</p>
          <button className="ctBtnDark">Gesprek aanvragen</button>
        </div>
      </section>

      <footer className="ctFooter">
        <div className="ctFooterInner">
          <div className="ctFooterLogo">CITADEL<span>.</span></div>
          <div className="ctFooterCopy">© 2025 Citadel NV — Vastgoedontwikkelaar</div>
        </div>
      </footer>
    </>
  );
}
