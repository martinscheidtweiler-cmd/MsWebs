"use client";
import { useState, useEffect } from "react";
import "./prestige.css";

export default function PrestigeEstateTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`prNav${scrolled ? " prNavScrolled" : ""}`}>
        <div className="prLogo">PRESTIGE<span> ESTATE</span></div>
        <div className="prNavLinks">
          <a href="#">Portfolio</a>
          <a href="#">Kopen</a>
          <a href="#">Verkopen</a>
          <a href="#">Diensten</a>
          <a href="#">Contact</a>
        </div>
        <span className="prNavPhone">+32 3 456 78 90</span>
      </nav>

      <section className="prHero">
        <div className="prHeroBg">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=90" alt="Prestige Estate" />
        </div>
        <div className="prHeroOverlay" />
        <div className="prHeroContent">
          <div className="prHeroBar" />
          <h1 className="prHeroTitle">
            L'art du<br /><em>placement parfait</em>
          </h1>
          <div className="prHeroRow">
            <p className="prHeroSub">
              Prestige Estate is het referentieadres voor uitzonderlijk vastgoed in België. Wij verbinden kopers en verkopers van de meest exclusieve woningen met absolute discretie.
            </p>
            <div className="prHeroBtns">
              <button className="prBtn">Ons portfolio</button>
              <button className="prBtnLine">Privé afspraak</button>
            </div>
          </div>
        </div>
      </section>

      <section className="prFeatured">
        <div className="prFeatInner">
          <div className="prSectionMeta"><span>Exclusief aanbod</span></div>
          <h2>Onze <em>pareltjes</em></h2>
          <div className="prFeatGrid">
            <div className="prFeatMain">
              <img className="prFeatMainImg" src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85" alt="Villa" />
              <div className="prFeatOverlay" />
              <div className="prFeatInfo">
                <div className="prFeatTag">Villa — Privédomein — 6 slk.</div>
                <div className="prFeatTitle">Château de la Forêt, Rhode-Saint-Genèse</div>
                <div className="prFeatPrice">€ 4.800.000</div>
              </div>
            </div>
            <div className="prFeatSide">
              {[
                { tag: "Penthouse — Antwerpen", title: "Penthouse MAS View", price: "€ 2.100.000", img: "photo-1560449752-3fd4bdaa2c8a" },
                { tag: "Villa — Knokke", title: "Villa Dunes Royale", price: "€ 3.450.000", img: "photo-1512917774080-9991f1c4c750" },
              ].map((p) => (
                <div key={p.title} className="prFeatSmall">
                  <img className="prFeatSmallImg" src={`https://images.unsplash.com/${p.img}?w=700&q=80`} alt={p.title} />
                  <div className="prFeatOverlay" />
                  <div className="prFeatInfo">
                    <div className="prFeatTag">{p.tag}</div>
                    <div className="prFeatTitle">{p.title}</div>
                    <div className="prFeatPrice">{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="prServices">
        <div className="prServInner">
          <div className="prServText">
            <span>White glove service</span>
            <h2>Meer dan<br />een <em>makelaar</em></h2>
            <p>Prestige Estate biedt een volledig ontzorgend pakket voor de meest veeleisende cliënten. Van discrete marktbevraging tot de sleuteloverdracht — wij zorgen voor alles.</p>
            <button className="prBtn">Onze aanpak</button>
          </div>
          <div className="prServGrid">
            {[
              { title: "Discreet & Off-market", desc: "Toegang tot een exclusief netwerk van woningen die nooit publiek te koop staan." },
              { title: "Internationale netwerk", desc: "Samenwerking met top-makelaars in London, Paris, Monaco en Genève." },
              { title: "Juridische & fiscale regie", desc: "Samenwerking met gespecialiseerde notarissen, fiscalisten en estate planners." },
              { title: "Interieur & Staging", desc: "Professionele homestaging en fotografie voor een optimale presentatie." },
            ].map((s) => (
              <div key={s.title} className="prServCard">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="prContact">
        <div className="prContactInner">
          <div className="prSectionMeta" style={{justifyContent:'center'}}><span>Persoonlijk contact</span></div>
          <h2>Een gesprek<br /><em>onder vier ogen</em></h2>
          <p>Vertel ons over uw zoekprofiel of uw pand. Wij nemen discreet en persoonlijk contact op voor een eerste vrijblijvend gesprek.</p>
          <button className="prBtn">Neem contact op</button>
        </div>
      </section>

      <footer className="prFooter">
        <div className="prFooterInner">
          <div className="prFooterLogo">PRESTIGE<span> ESTATE</span></div>
          <div className="prFooterCopy">© 2025 Prestige Estate — BIV 702.145 — Discretie gegarandeerd</div>
        </div>
      </footer>
    </>
  );
}
