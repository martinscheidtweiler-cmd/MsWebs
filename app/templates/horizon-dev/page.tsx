"use client";
import "./horizondev.css";

export default function HorizonDevTemplate() {
  return (
    <>
      <nav className="hdNav">
        <div className="hdLogo">Horizon<span>Dev</span></div>
        <div className="hdNavLinks">
          <a href="#">Projecten</a>
          <a href="#">Nieuwbouw</a>
          <a href="#">Investeren</a>
          <a href="#">Over ons</a>
          <a href="#">Contact</a>
        </div>
        <button className="hdNavBtn">Brochure aanvragen</button>
      </nav>

      <section className="hdHero">
        <div className="hdHeroBg">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1800&q=85" alt="Horizon Dev" />
        </div>
        <div className="hdHeroContent">
          <div className="hdHeroChip">✦ Duurzame nieuwbouw</div>
          <h1 className="hdHeroTitle">
            Bouwen voor<br /><em>morgen</em>
          </h1>
          <p className="hdHeroSub">
            HorizonDev ontwikkelt toekomstgerichte woon- en gemengdgebruikprojecten. Duurzaam, slim en ontworpen voor de manier waarop we morgen leven.
          </p>
          <div className="hdHeroBtns">
            <button className="hdBtn">Onze projecten</button>
            <button className="hdBtnGhost">Investeerderspakket</button>
          </div>
        </div>
      </section>

      <div className="hdMetrics">
        <div className="hdMetricsInner">
          {[
            { num: "68", label: "Projecten opgeleverd" },
            { num: "4.200+", label: "Wooneenheden" },
            { num: "A+", label: "Gemiddeld EPC-label" },
            { num: "15jr", label: "Trackrecord" },
          ].map((m) => (
            <div key={m.label} className="hdMetric">
              <div className="hdMetricNum">{m.num}</div>
              <div className="hdMetricLabel">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="hdProjects">
        <div className="hdProjInner">
          <div className="hdProjHead">
            <span className="hdTag">Huidig aanbod</span>
            <h2>Lopende projecten</h2>
          </div>
          <div className="hdProjGrid">
            {[
              { status: "available", title: "The Green Quarter", loc: "Mechelen", price: "Vanaf € 299.000", units: "24 units beschikbaar", img: "photo-1600596542815-ffad4c1539a9" },
              { status: "soon", title: "Lumière Gent", loc: "Gent Noord", price: "Prijzen volgen", units: "Lancering Q2 2025", img: "photo-1486325212027-8081e485255e" },
              { status: "sold", title: "Park Residences", loc: "Leuven", price: "Volledig verkocht", units: "82 units — opgeleverd", img: "photo-1564013799919-ab600027ffc6" },
            ].map((p) => (
              <div key={p.title} className="hdProjCard">
                <div className="hdProjImg">
                  <img src={`https://images.unsplash.com/${p.img}?w=600&q=80`} alt={p.title} />
                </div>
                <div className="hdProjBody">
                  <span className={`hdProjStatus ${p.status}`}>
                    {p.status === "available" ? "Beschikbaar" : p.status === "soon" ? "Binnenkort" : "Volledig verkocht"}
                  </span>
                  <h3>{p.title}</h3>
                  <div className="hdProjLoc">📍 {p.loc}</div>
                  <div className="hdProjMeta">
                    <span className="hdProjPrice">{p.price}</span>
                    <span className="hdProjUnits">{p.units}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hdCta">
        <div className="hdCtaInner">
          <h2>Geïnteresseerd in investeren?</h2>
          <p>Ontvang ons exclusief investeerderspakket met rendementsanalyses en toekomstige projectpijplijn.</p>
          <button className="hdBtnWhite">Investeerderspakket aanvragen</button>
        </div>
      </section>

      <footer className="hdFooter">
        <div className="hdFooterInner">
          <div className="hdFooterLogo">Horizon<span>Dev</span></div>
          <div className="hdFooterCopy">© 2025 HorizonDev NV — Vastgoedontwikkelaar</div>
        </div>
      </footer>
    </>
  );
}
