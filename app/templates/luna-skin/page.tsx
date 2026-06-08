"use client";
import { useState, useEffect } from "react";
import "./luna.css";

export default function LunaSkinTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`lnNav${scrolled ? " lnNavScrolled" : ""}`}>
        <div className="lnLogo"><em>Luna</em><span> Skin</span></div>
        <div className="lnNavLinks">
          <a href="#">Behandelingen</a>
          <a href="#">Huidadvies</a>
          <a href="#">Producten</a>
          <a href="#">Resultaten</a>
          <a href="#">Contact</a>
        </div>
        <button className="lnNavBtn">Afspraak boeken</button>
      </nav>

      <section className="lnHero">
        <div className="lnHeroBg">
          <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1800&q=85" alt="Luna Skin" />
        </div>
        <div className="lnHeroOverlay" />
        <div className="lnHeroContent">
          <div className="lnHeroChip"><span>✦</span> Gecertificeerde huidtherapeuten</div>
          <h1 className="lnHeroTitle">Jouw huid,<br />onze <em>passie</em></h1>
          <p className="lnHeroSub">Wetenschappelijk onderbouwde huidverzorging, toegepast met precisie en zorg. Voor zichtbare resultaten die blijven.</p>
          <div className="lnHeroBtns">
            <button className="lnBtn">Boek een consult</button>
            <button className="lnBtnOutline">Onze behandelingen</button>
          </div>
        </div>
      </section>

      <section className="lnTreatments">
        <div className="lnTreatInner">
          <div className="lnSectionHead">
            <span>Ons aanbod</span>
            <h2>Behandelingen op <em>maat</em></h2>
          </div>
          <div className="lnTreatGrid">
            {[
              { tag: "Anti-aging", title: "Hydrafacial", desc: "Dieptereiniging, peeling en hydratatie in één behandeling voor een stralende huid.", price: "€ 129" },
              { tag: "Acne", title: "Blue Light Therapie", desc: "Lichttherapie die acnebacteriën elimineert en ontsteking vermindert.", price: "€ 85" },
              { tag: "Pigmentatie", title: "Chemical Peel", desc: "Gecontroleerde peeling voor het aanpakken van pigmentvlekken en fijne lijntjes.", price: "€ 98" },
              { tag: "Relaxatie", title: "Signature Facial", desc: "Onze kenmerkende gezichtsbehandeling, volledig afgestemd op uw huidtype.", price: "€ 95" },
            ].map((t) => (
              <div key={t.title} className="lnTreatCard">
                <div className="lnTreatImg">
                  <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80" alt={t.title} />
                </div>
                <div className="lnTreatBody">
                  <div className="lnTreatTag">{t.tag}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div className="lnTreatPrice">Vanaf {t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lnBefore">
        <div className="lnBeforeInner">
          <div className="lnBeforeHead">
            <span>Resultaten</span>
            <h2>Voor & na — echte resultaten</h2>
          </div>
          <div className="lnBeforeGrid">
            {[
              { before: "Acne", after: "Na 6 sessies" },
              { before: "Pigmentatie", after: "Na 4 behandelingen" },
              { before: "Droge huid", after: "Na 3 Hydrafacials" },
            ].map((r) => (
              <div key={r.before} className="lnBeforeCard">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&q=80" alt="Resultaat" />
                <div className="lnBeforeInfo">
                  <span>Klacht: {r.before}</span>
                  <strong>{r.after}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lnCta">
        <div className="lnCtaInner">
          <span>Gratis consult</span>
          <h2>Start jouw huidreis vandaag</h2>
          <p>Boek een vrijblijvend huidconsult en ontdek welke behandelingen het beste bij jouw huid passen.</p>
          <button className="lnBtnWhite">Gratis consult boeken</button>
        </div>
      </section>

      <footer className="lnFooter">
        <div className="lnFooterInner">
          <div className="lnFooterLogo"><em>Luna</em><span> Skin</span></div>
          <div className="lnFooterCopy">© 2025 Luna Skin — Huidkliniek</div>
        </div>
      </footer>
    </>
  );
}
