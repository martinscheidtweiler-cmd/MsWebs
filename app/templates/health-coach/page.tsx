"use client";
import "./health.css";

export default function HealthCoachTemplate() {
  return (
    <>
      <nav className="hcNav">
        <div className="hcLogo">Health<span>Coach</span></div>
        <div className="hcNavLinks">
          <a href="#">Aanpak</a>
          <a href="#">Trajecten</a>
          <a href="#">Voeding</a>
          <a href="#">Beweging</a>
          <a href="#">Contact</a>
        </div>
        <button className="hcNavBtn">Gratis intake</button>
      </nav>

      <section className="hcHero">
        <div className="hcHeroLeft">
          <div className="hcHeroTag">🌿 Gecertificeerd gezondheidcoach</div>
          <h1 className="hcHeroTitle">Jouw gezondheid,<br /><em>mijn missie</em></h1>
          <p className="hcHeroSub">
            Een holistische aanpak die voeding, beweging en mindset combineert tot een duurzame levensstijlverandering. Wetenschappelijk, menselijk en op maat.
          </p>
          <div className="hcHeroBtns">
            <button className="hcBtn">Start jouw traject</button>
            <button className="hcBtnOutline">Meer ontdekken</button>
          </div>
        </div>
        <div className="hcHeroRight">
          <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85" alt="Health Coach" />
          <div className="hcHeroQuote">
            <p>"Na 3 maanden coaching ben ik 14 kg lichter en heb ik eindelijk de energie die ik altijd al wou."</p>
            <span>— Laura V., traject van 12 weken</span>
          </div>
        </div>
      </section>

      <section className="hcOffers">
        <div className="hcOffInner">
          <div className="hcSectionHead">
            <span>Mijn aanbod</span>
            <h2>Trajecten op maat</h2>
          </div>
          <div className="hcOffGrid">
            {[
              { icon: "🥗", title: "Voedingscoaching", desc: "Eet beter zonder te diëten. Een gepersonaliseerd voedingsplan dat past bij jouw smaak, ritme en doelen.", dur: "6 of 12 weken" },
              { icon: "🏃", title: "Bewegingscoaching", desc: "Van couch naar actief. We bouwen een sportgewoonte die vol te houden is — ook bij drukke schema's.", dur: "8 weken" },
              { icon: "🧘", title: "360° Leefstijltraject", desc: "Het complete pakket: voeding, beweging, slaap en stressmanagement gecombineerd in één intensief traject.", dur: "12 weken" },
            ].map((o) => (
              <div key={o.title} className="hcOffCard">
                <div className="hcOffIcon">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <span className="hcOffDur">⏱ {o.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hcProcess">
        <div className="hcProcessBg" />
        <div className="hcProcInner">
          <div className="hcProcText">
            <span>Mijn werkwijze</span>
            <h2>Zo werk ik</h2>
            <p>Geen one-size-fits-all oplossingen. Elk traject begint bij jou — jouw situatie, jouw doelen, jouw tempo.</p>
            <button className="hcBtnOutline" style={{color:'#fff',borderColor:'rgba(255,255,255,.3)'}}>Meer over mij</button>
          </div>
          <div className="hcProcSteps">
            {[
              { num: "1", title: "Gratis kennismakingsgesprek", desc: "We bespreken jouw situatie, doelen en verwachtingen. Geen verplichtingen." },
              { num: "2", title: "Intake & analyse", desc: "Uitgebreide screening van voeding, beweging, slaap en stressniveau." },
              { num: "3", title: "Gepersonaliseerd plan", desc: "Op basis van de intake maak ik een plan dat echt bij jou past." },
              { num: "4", title: "Begeleiding & bijsturing", desc: "Wekelijkse check-ins, aanpassingen waar nodig en constante motivatie." },
            ].map((s) => (
              <div key={s.num} className="hcProcStep">
                <div className="hcProcStepNum">{s.num}</div>
                <div className="hcProcStepBody">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hcCta">
        <div className="hcCtaInner">
          <span>Klaar om te starten?</span>
          <h2>Plan jouw gratis intake</h2>
          <p>Een gesprek van 30 minuten, vrijblijvend en gratis. Ontdek of mijn aanpak bij jou past.</p>
          <button className="hcBtn">Intake plannen</button>
        </div>
      </section>

      <footer className="hcFooter">
        <div className="hcFooterInner">
          <div className="hcFooterLogo">Health<span>Coach</span></div>
          <div className="hcFooterCopy">© 2025 HealthCoach — Gecertificeerd Gezondheidcoach</div>
        </div>
      </footer>
    </>
  );
}
