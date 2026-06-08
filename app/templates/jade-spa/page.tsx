"use client";
import { useState, useEffect } from "react";
import "./jade.css";

export default function JadeSpaTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`jdNav${scrolled ? " jdNavScrolled" : ""}`}>
        <div className="jdLogo">Jade<span> Spa</span></div>
        <div className="jdNavLinks">
          <a href="#">Behandelingen</a>
          <a href="#">Rituelen</a>
          <a href="#">Cadeaubon</a>
          <a href="#">Over ons</a>
          <a href="#">Contact</a>
        </div>
        <button className="jdNavBtn">Reserveren</button>
      </nav>

      <section className="jdHero">
        <div className="jdHeroLeft">
          <div className="jdHeroTag"><span>Luxe Wellness & Spa</span></div>
          <h1 className="jdHeroTitle">Een moment<br />voor <em>uzelf</em></h1>
          <p className="jdHeroSub">Ontsnap aan de dagelijkse drukte in onze exclusieve spa. Laat onze experts u verwennen met bewezen rituelen en premium producten.</p>
          <button className="jdBtnGold">Behandeling boeken</button>
        </div>
        <div className="jdHeroRight">
          <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=85" alt="Jade Spa" />
          <div className="jdHeroScent">
            <div className="jdHeroScentNum">14+</div>
            <div className="jdHeroScentLabel">Exclusieve behandelingen</div>
          </div>
        </div>
      </section>

      <section className="jdTreatments">
        <div className="jdTreatInner">
          <div className="jdSectionHead">
            <span>Onze Expertise</span>
            <h2>Handpicked <em>rituelen</em></h2>
          </div>
          <div className="jdTreatGrid">
            {[
              { cat: "Lichaamsverzorging", title: "Jade Stone Massage", desc: "Warme jade stenen ontspannen uw spieren diepgaand terwijl aromatische oliën de huid voeden.", dur: "90 min", price: "€ 145" },
              { cat: "Gezichtsbehandeling", title: "Gouden Gezichtsmasker", desc: "Anti-aging behandeling met 24-karaats goud en hyaluronzuur voor een stralende, gladde huid.", dur: "60 min", price: "€ 115" },
              { cat: "Totaalconcept", title: "Jade Full Day Ritual", desc: "Een volledige dag van absolute verwennerij: massage, gezichtsbehandeling, lichaamsscrub en meer.", dur: "Dag", price: "€ 395" },
              { cat: "Ayurveda", title: "Abhyanga Massage", desc: "Traditionele Ayurvedische massage met warme kruidenoliën, aangepast aan uw dosha-type.", dur: "75 min", price: "€ 128" },
              { cat: "Koppelritueel", title: "Duo Signature Ritual", desc: "Een romantisch duo-ritueel in onze privé spa-suite. Inclusief champagne en amuses.", dur: "2 uur", price: "€ 290" },
              { cat: "Wellness", title: "Hammam & Gommage", desc: "Traditionele Marokkaanse hammam-ervaring met zwarte zeep, savon beldi en intensieve lichaamsscrub.", dur: "60 min", price: "€ 98" },
            ].map((t) => (
              <div key={t.title} className="jdTreatCard">
                <div className="jdTreatImg">
                  <img src={`https://images.unsplash.com/photo-${t.title === "Jade Stone Massage" ? "1540555700478-4be290a3dd57" : t.title === "Gouden Gezichtsmasker" ? "1616394584738-fc6e612e71b9" : t.title === "Jade Full Day Ritual" ? "1571019613454-1cb2f99b2d8b" : t.title === "Abhyanga Massage" ? "1544161515-4ab6ce6db874" : t.title === "Duo Signature Ritual" ? "1559757148-5c350d0d3c56" : "1531859863-6c4ef88a7f42"}?w=600&q=80`} alt={t.title} />
                </div>
                <div className="jdTreatBody">
                  <div className="jdTreatCat">{t.cat}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div className="jdTreatMeta">
                    <span className="jdTreatDuration">⏱ {t.dur}</span>
                    <span className="jdTreatPrice">{t.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="jdRitual">
        <div className="jdRitualBg" />
        <div className="jdRitualInner">
          <div className="jdRitualText">
            <span>Onze filosofie</span>
            <h2>De weg naar <em>innerlijke rust</em></h2>
            <p>Jade Spa is gebaseerd op de holistische visie dat lichaam, geest en ziel in harmonie moeten zijn. Elk ritueel is zorgvuldig samengesteld om u in die balans te brengen.</p>
            <button className="jdBtnLight">Meer over ons</button>
          </div>
          <div className="jdRitualSteps">
            {[
              { num: "I", title: "Intake & advies", desc: "Uw therapeut neemt de tijd om uw noden en verwachtingen te begrijpen voor de perfecte behandeling." },
              { num: "II", title: "Welkomstritueel", desc: "Verwelkoming met kruidenthee en een voetenbad om u volledig te laten loslaten." },
              { num: "III", title: "Uw behandeling", desc: "De kern van uw spa-ervaring — volledig gepersonaliseerd en uitgevoerd door gecertificeerde therapeuten." },
              { num: "IV", title: "Nabehandeling", desc: "Rustig napraten in onze salon met een afsluiting van de rituelen en huidverzorgingsadvies." },
            ].map((s) => (
              <div key={s.num} className="jdStep">
                <div className="jdStepNum">{s.num}</div>
                <div className="jdStepBody">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="jdBook">
        <div className="jdBookInner">
          <span>Reservaties</span>
          <h2>Plan uw moment van rust</h2>
          <p>Kies uw behandeling, gewenste datum en tijdstip. Wij bevestigen uw reservatie binnen 24 uur.</p>
          <button className="jdBtnJade">Online reserveren</button>
        </div>
      </section>

      <footer className="jdFooter">
        <div className="jdFooterInner">
          <div className="jdFooterLogo">Jade<span> Spa</span></div>
          <div className="jdFooterCopy">© 2025 Jade Spa — Wellnesscentrum</div>
        </div>
      </footer>
    </>
  );
}
