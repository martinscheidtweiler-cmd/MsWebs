"use client";
import { useState, useEffect } from "react";
import "./aura.css";

export default function AuraFloatTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`afNav${scrolled ? " afNavScrolled" : ""}`}>
        <div className="afLogo">AURA<span> FLOAT</span></div>
        <div className="afNavLinks">
          <a href="#">Floaten</a>
          <a href="#">Voordelen</a>
          <a href="#">Pakketten</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>
        <button className="afNavBtn">Sessie boeken</button>
      </nav>

      <section className="afHero">
        <div className="afHeroBg">
          <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1800&q=85" alt="Float" />
        </div>
        <div className="afHeroGlow" />
        <div className="afHeroContent">
          <span className="afHeroEye">◎</span>
          <h1 className="afHeroTitle">Transcend the<br /><em>ordinary</em></h1>
          <p className="afHeroSub">Drijf gewichtloos in zoutwater, bevrijd van zintuigelijke prikkels. Ontdek een toestand van diepe rust die meditatie en slaap overstijgt.</p>
          <div className="afHeroBtns">
            <button className="afBtn">Eerste sessie boeken</button>
            <button className="afBtnGhost">Meer ontdekken</button>
          </div>
        </div>
        <div className="afWave" />
      </section>

      <section className="afBenefits">
        <div className="afBenefitsInner">
          <div className="afBenText">
            <span>Wetenschappelijk bewezen</span>
            <h2>Wat floaten voor u doet</h2>
            <p>Floatation REST (Restricted Environmental Stimulation Therapy) is uitgebreid bestudeerd en levert meetbare voordelen op voor lichaam én geest.</p>
            <button className="afBtn">Wetenschappelijk onderzoek</button>
          </div>
          <div>
            <div className="afFloatImg">
              <img src="https://images.unsplash.com/photo-1548695607-9c73e311e8c5?w=800&q=80" alt="Float pod" />
            </div>
          </div>
        </div>
        <div style={{maxWidth:'1200px',margin:'64px auto 0',padding:'0 56px'}}>
          <div className="afBenGrid">
            {[
              { icon: "🧠", title: "Mentale helderheid", desc: "Het brein komt in een theta-toestand — dezelfde golf als net voor het inslapen. Creativiteit en focus worden vergroot." },
              { icon: "💆", title: "Stressreductie", desc: "Cortisol daalt significant tijdens een float. Ideaal voor burn-out preventie en herstel." },
              { icon: "🦴", title: "Pijnverlichting", desc: "Dankzij gewichtloosheid worden gewrichten volledig ontlast. Chronische pijn en spierspanning nemen af." },
              { icon: "😴", title: "Slaapkwaliteit", desc: "Regelmatig floaten verbetert de slaapkwaliteit meetbaar. U slaapt dieper en voelt zich uitgeruster." },
            ].map((b) => (
              <div key={b.title} className="afBenCard">
                <div className="afBenIcon">{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="afPods">
        <div className="afPodsInner">
          <div className="afPodsHead">
            <span>Onze formules</span>
            <h2>Kies uw sessie</h2>
          </div>
          <div className="afPodGrid">
            {[
              { icon: "🌙", title: "Intro Float", desc: "Uw eerste kennismaking met floaten. Inclusief uitleg, begeleiding en een 60-minuten sessie.", dur: "60 min — € 65" },
              { icon: "✦", title: "Deep Float", desc: "De meest populaire sessie voor ervaren floaters. Diep in de theta-staat voor maximale herstelvoordelen.", dur: "90 min — € 89" },
              { icon: "◎", title: "Transcendence", desc: "Onze langste sessie voor wie echt wil loslaten. Gecombineerd met sound healing en aromatherapie.", dur: "120 min — € 119" },
            ].map((p) => (
              <div key={p.title} className="afPodCard">
                <span className="afPodIcon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="afPodDur">{p.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="afCta">
        <div className="afCtaBg" />
        <div className="afCtaInner">
          <span>Begin vandaag</span>
          <h2>Klaar om los te laten?</h2>
          <p>Boek uw eerste floatsessie en ervaar zelf waarom duizenden mensen er na één keer verslaafd aan zijn.</p>
          <button className="afBtn">Sessie reserveren</button>
        </div>
      </section>

      <footer className="afFooter">
        <div className="afFooterInner">
          <div className="afFooterLogo">AURA<span> FLOAT</span></div>
          <div className="afFooterCopy">© 2025 Aura Float — Floatation Center</div>
        </div>
      </footer>
    </>
  );
}
