"use client";
import { useState, useEffect } from "react";
import "./vitalite.css";

export default function VitaliteTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className="vtNav">
        <div className="vtLogo">Vitalité<span>.</span></div>
        <div className="vtNavLinks">
          <a href="#">Programma's</a>
          <a href="#">Coaching</a>
          <a href="#">Voeding</a>
          <a href="#">Resultaten</a>
          <a href="#">Blog</a>
        </div>
        <button className="vtNavBtn">Gratis intake</button>
      </nav>

      <section className="vtHero">
        <div className="vtHeroLeft">
          <div className="vtHeroBadge">Holistisch welzijn</div>
          <h1 className="vtHeroTitle">
            Voel je elke dag<br /><em>vitaler</em> leven
          </h1>
          <p className="vtHeroSub">
            Persoonlijke begeleiding op het vlak van voeding, beweging en mentale veerkracht. Wetenschappelijk onderbouwd, menselijk begeleid.
          </p>
          <div className="vtHeroBtns">
            <button className="vtBtn">Start jouw traject</button>
            <button className="vtBtnOutline">Meer ontdekken</button>
          </div>
        </div>
        <div className="vtHeroRight">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85" alt="Vitalite coaching" />
          <div className="vtHeroStats">
            {[
              { num: "840+", label: "Cliënten" },
              { num: "94%", label: "Slagen" },
              { num: "8jr", label: "Ervaring" },
            ].map((s) => (
              <div key={s.label} className="vtHeroStat">
                <div className="vtHeroStatNum">{s.num}</div>
                <div className="vtHeroStatLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vtPrograms">
        <div className="vtProgInner">
          <div className="vtSectionHead">
            <div>
              <span className="vtSectionTag">Onze programma's</span>
              <h2>Traject op <em>maat</em></h2>
            </div>
            <button className="vtBtnOutline">Alle programma's</button>
          </div>
          <div className="vtProgGrid">
            {[
              { dur: "12 weken", title: "Body Reset", desc: "Een intensief programma voor wie echt wil veranderen. Voeding, sport en mindset gecombineerd tot één krachtig geheel.", img: "photo-1538805060514-97d9cc172144" },
              { dur: "6 weken", title: "Stress & Balans", desc: "Herstel je energieniveau en leer je grenzen kennen. Voor professionals die zichzelf terug willen vinden.", img: "photo-1506126613408-eca07ce68773" },
              { dur: "Doorlopend", title: "Lifestyle Coaching", desc: "Maandelijkse ondersteuning om je gewoontes duurzaam te verankeren. Flexibel, persoonlijk en resultaatgericht.", img: "photo-1571019614242-c5c5dee9f50b" },
            ].map((p) => (
              <div key={p.title} className="vtProgCard">
                <div className="vtProgImg">
                  <img src={`https://images.unsplash.com/${p.img}?w=600&q=80`} alt={p.title} />
                </div>
                <div className="vtProgBody">
                  <span className="vtProgDuration">{p.dur}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="vtProgLink">Meer info →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vtTestimonials">
        <div className="vtTestBg" />
        <div className="vtTestInner">
          <div className="vtTestHead">
            <span>Getuigenissen</span>
            <h2>Wat onze cliënten zeggen</h2>
          </div>
          <div className="vtTestGrid">
            {[
              { text: "Na 12 weken Body Reset ben ik 11 kg kwijt én heb ik eindelijk de energie die ik al jaren miste. Vitalité heeft mijn leven veranderd.", name: "Sarah D.", role: "Body Reset — 12 weken", emoji: "🌟" },
              { text: "De aanpak is zo menselijk en realistisch. Geen crashdieet, maar echte verandering. Ik ben nu al 2 jaar trouw aan mijn nieuwe leefstijl.", name: "Thomas V.", role: "Lifestyle Coaching", emoji: "💪" },
              { text: "Het Stress & Balans programma heeft me geleerd wat écht prioriteit verdient. Ik presteer beter op het werk én ben gelukkiger thuis.", name: "Elise M.", role: "Stress & Balans — 6 weken", emoji: "✨" },
            ].map((t) => (
              <div key={t.name} className="vtTestCard">
                <div className="vtStars">★★★★★</div>
                <p>"{t.text}"</p>
                <div className="vtTestAuthor">
                  <div className="vtTestAvatar">{t.emoji}</div>
                  <div>
                    <div className="vtTestName">{t.name}</div>
                    <div className="vtTestRole">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vtCta">
        <div className="vtCtaInner">
          <span>Vrijblijvend kennismaken</span>
          <h2>Begin vandaag met jouw traject</h2>
          <p>Plan een gratis intake van 30 minuten en ontdek welk programma het beste bij jou past.</p>
          <button className="vtBtn">Gratis intake plannen</button>
        </div>
      </section>

      <footer className="vtFooter">
        <div className="vtFooterInner">
          <div className="vtFooterLogo">Vitalité<span>.</span></div>
          <div className="vtFooterCopy">© 2025 Vitalité — Holistische Gezondheidscoaching</div>
        </div>
      </footer>
    </>
  );
}
