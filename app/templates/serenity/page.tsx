"use client";
import { useState, useEffect } from "react";
import "./serenity.css";

export default function SerenityTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`srNav${scrolled ? " srNavScrolled" : ""}`}>
        <div className="srLogo">Seren<em>ity</em></div>
        <div className="srNavLinks">
          <a href="#">Retraites</a>
          <a href="#">Meditatie</a>
          <a href="#">Yoga</a>
          <a href="#">Therapie</a>
          <a href="#">Contact</a>
        </div>
        <button className="srNavBtn">Aanmelden</button>
      </nav>

      <section className="srHero">
        <div className="srHeroBg">
          <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1800&q=85" alt="Serenity" />
        </div>
        <div className="srHeroContent">
          <span className="srHeroSymbol">☽</span>
          <h1 className="srHeroTitle">
            Stilte als<br /><em>geneesmiddel</em>
          </h1>
          <p className="srHeroSub">
            Serenity biedt een veilige haven voor wie rust, helderheid en diepere verbinding zoekt. Via meditatie, mindfulness en lichaamsgerichte therapieën.
          </p>
          <div className="srHeroBtns">
            <button className="srBtn">Retraites ontdekken</button>
            <button className="srBtnLine">Meer lezen</button>
          </div>
        </div>
      </section>

      <section className="srPillars">
        <div className="srPillarsInner">
          <div className="srPillarsText">
            <span>Onze kernwaarden</span>
            <h2>Drie pijlers van <em>innerlijke rust</em></h2>
            <p>Serenity combineert eeuwenoude wijsheid met hedendaagse inzichten uit de neurowetenschappen en psychologie om duurzame rust te creëren.</p>
            <button className="srBtn">Onze aanpak</button>
          </div>
          <div className="srPillarsList">
            {[
              { icon: "🧘", title: "Mindfulness & Meditatie", desc: "Gebaseerde mindfulness-technieken (MBSR) om de geest te kalmeren en aanwezig te zijn in het moment." },
              { icon: "🌿", title: "Lichaamsgerichte therapie", desc: "Somatische werkvormen die spanning in het lichaam losmaken en het zenuwstelsel reguleren." },
              { icon: "🌙", title: "Stilteretraites", desc: "Meerdaagse retraites in volledige stilte, in kleine groepen, begeleidt door ervaren facilitators." },
            ].map((p) => (
              <div key={p.title} className="srPillar">
                <div className="srPillarIcon">{p.icon}</div>
                <div className="srPillarBody">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="srRetreats">
        <div className="srRetrInner">
          <div className="srRetrHead">
            <span>Komende retraites</span>
            <h2>Momenten van <em>transformatie</em></h2>
          </div>
          <div className="srRetrGrid">
            {[
              { type: "Stilteretraite", title: "Vipassana-retraite", desc: "7 dagen meditatie in volledige stilte. Een diepgaande ervaring voor wie zijn geest wil kalmeren.", dur: "7 dagen", price: "€ 850" },
              { type: "Yoga & Meditatie", title: "Yogaretraite Ardennen", desc: "Weekend vol Hatha yoga, ademwerk en meditatie in de natuur van de Belgische Ardennen.", dur: "3 dagen", price: "€ 390" },
              { type: "Online programma", title: "8-weekse MBSR-training", desc: "Het klassieke Mindfulness Based Stress Reduction programma, online begeleid door een MBSR-trainer.", dur: "8 weken", price: "€ 295" },
            ].map((r) => (
              <div key={r.title} className="srRetrCard">
                <div className="srRetrImg">
                  <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80" alt={r.title} />
                </div>
                <div className="srRetrBody">
                  <div className="srRetrType">{r.type}</div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <div className="srRetrMeta">
                    <span className="srRetrDur">{r.dur}</span>
                    <span className="srRetrPrice">{r.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="srCta">
        <div className="srCtaInner">
          <span>Begin uw reis</span>
          <h2>Klaar om <em>los te laten</em>?</h2>
          <p>Meld u aan voor onze nieuwsbrief en ontvang als eerste informatie over nieuwe retraites en programma's.</p>
          <button className="srBtnWhite">Aanmelden voor nieuwsbrief</button>
        </div>
      </section>

      <footer className="srFooter">
        <div className="srFooterInner">
          <div className="srFooterLogo">Seren<em>ity</em></div>
          <div className="srFooterCopy">© 2025 Serenity — Mindfulness & Retraitecentrum</div>
        </div>
      </footer>
    </>
  );
}
