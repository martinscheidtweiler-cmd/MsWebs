"use client";
import "./equi.css";

export default function EquiProTemplate() {
  return (
    <>
      <nav className="epNav">
        <div className="epLogo">EQUI<span>PRO</span></div>
        <div className="epNavLinks">
          <a href="#">Disciplines</a>
          <a href="#">Coaching</a>
          <a href="#">Competitie</a>
          <a href="#">Staf</a>
          <a href="#">Contact</a>
        </div>
        <button className="epNavBtn">Proefles boeken</button>
      </nav>

      <section className="epHero">
        <div className="epHeroBg">
          <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1800&q=85" alt="EquiPro" />
        </div>
        <div className="epHeroGlow" />
        <div className="epHeroContent">
          <div className="epHeroChip">🏆 Officieel wedstrijdcentrum</div>
          <h1 className="epHeroTitle">
            RIDE TO<em>EXCELLENCE.</em>
          </h1>
          <p className="epHeroSub">
            EquiPro is het toonaangevende trainingscentrum voor competitieruiters. Professionele coaching, topinfrastructuur en een netwerk van kampioensbreeders.
          </p>
          <div className="epHeroBtns">
            <button className="epBtn">Proefles boeken</button>
            <button className="epBtnGhost">Ons programma</button>
          </div>
        </div>
      </section>

      <div className="epStats">
        <div className="epStatsInner">
          {[
            { num: "140+", label: "Competitiepaard" },
            { num: "28", label: "Titels gewonnen" },
            { num: "15", label: "Profcoaches" },
            { num: "22jr", label: "Trackrecord" },
          ].map((s) => (
            <div key={s.label} className="epStat">
              <div className="epStatNum">{s.num}</div>
              <div className="epStatLabel">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="epDisciplines">
        <div className="epDiscInner">
          <span className="epSectionTag">Onze disciplines</span>
          <h2>Training op topniveau</h2>
          <div className="epDiscGrid">
            {[
              { tag: "Olympische discipline", title: "Dressuur", desc: "Van basis tot Grand Prix. Systematische opbouw met internationale coaches voor precisiebewegingen en harmonie.", img: "photo-1566231779484-92f3d3b3b0e0" },
              { tag: "Spectaculaire sport", title: "Jumping", desc: "Technische springtraining op professionele parcoursen. Met hoogte- en snelheidsopbouw voor competitiedeelname.", img: "photo-1578662996442-48f60103fc96" },
              { tag: "Klassieke horsemanship", title: "Eventing", desc: "De complete combinatie: dressuur, cross-country en jumping. Intensieve voorbereiding voor CCI-wedstrijden.", img: "photo-1534438327276-14e5300c3a48" },
            ].map((d) => (
              <div key={d.title} className="epDiscCard">
                <div className="epDiscImg">
                  <img src={`https://images.unsplash.com/${d.img}?w=700&q=80`} alt={d.title} />
                </div>
                <div className="epDiscOverlay" />
                <div className="epDiscInfo">
                  <span className="epDiscTag">{d.tag}</span>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="epCta">
        <div className="epCtaGlow" />
        <div className="epCtaInner">
          <h2>Klaar voor het podium?</h2>
          <p>Plan een proefles met een van onze coaches en ontdek hoe EquiPro uw ambities kan waarmaken.</p>
          <button className="epBtn">Proefles aanvragen</button>
        </div>
      </section>

      <footer className="epFooter">
        <div className="epFooterInner">
          <div className="epFooterLogo">EQUI<span>PRO</span></div>
          <div className="epFooterCopy">© 2025 EquiPro — Officieel Erkend Trainingscentrum</div>
        </div>
      </footer>
    </>
  );
}
