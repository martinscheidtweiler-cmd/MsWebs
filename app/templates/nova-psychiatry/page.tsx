"use client";
import "./nova.css";

export default function NovaPsychiatryTemplate() {
  return (
    <>
      <nav className="npNav">
        <div className="npLogo"><span>Nova</span> Psychiatrie</div>
        <div className="npNavLinks">
          <a href="#">Aanpak</a>
          <a href="#">Diensten</a>
          <a href="#">Team</a>
          <a href="#">Praktische info</a>
          <a href="#">Contact</a>
        </div>
        <button className="npNavBtn">Afspraak maken</button>
      </nav>

      <section className="npHero">
        <div className="npHeroLeft">
          <div className="npHeroPill">🏥 Erkende psychiatrische praktijk</div>
          <h1 className="npHeroTitle">
            Mentale gezondheid<br />verdient <em>aandacht</em>
          </h1>
          <p className="npHeroSub">
            Nova Psychiatrie biedt gespecialiseerde zorg voor volwassenen met psychische klachten. Diagnostiek, therapie en medicatiebeheer — in een veilige, warme omgeving.
          </p>
          <div className="npHeroBtns">
            <button className="npBtn">Afspraak maken</button>
            <button className="npBtnOutline">Onze aanpak</button>
          </div>
        </div>
        <div className="npHeroRight">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85" alt="Psychiatrie" />
          <div className="npHeroCard">
            <div className="npHeroCardIcon">📅</div>
            <div className="npHeroCardText">
              <strong>Eerste afspraak binnen 2 weken</strong>
              <span>Bel of boek online — snel, discreet en persoonlijk</span>
            </div>
          </div>
        </div>
      </section>

      <section className="npAbout">
        <div className="npAboutInner">
          <div className="npAboutImg">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" alt="Dr. Sarah Willems" />
          </div>
          <div className="npAboutText">
            <span>Over de praktijk</span>
            <h2>Psychiatrie met een <em>menselijk gezicht</em></h2>
            <p>Nova Psychiatrie werd opgericht met één doel: toegankelijke, hoogwaardige psychiatrische zorg bieden voor mensen die worstelen met psychische klachten. Wij combineren wetenschappelijk bewezen behandelingen met een warme, niet-oordelende benadering.</p>
            <p>Onze praktijk werkt multidisciplinair: psychiaters, klinisch psychologen en verpleegkundigen werken nauw samen voor de best mogelijke zorg.</p>
            <div className="npCreds">
              {["RIZIV erkend", "BVPPP lid", "Conventioneel", "GDPR-conform"].map((c) => (
                <span key={c} className="npCred">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="npServices">
        <div className="npServInner">
          <div className="npServHead">
            <span>Ons aanbod</span>
            <h2>Onze specialisaties</h2>
          </div>
          <div className="npServGrid">
            {[
              { icon: "🧠", title: "Psychiatrisch consult", desc: "Diagnostisch gesprek, evaluatie en opmaak van een persoonlijk behandelplan met of zonder medicatie." },
              { icon: "💬", title: "Psychotherapie", desc: "Cognitieve gedragstherapie (CGT), EMDR en schematherapie voor diverse klachten." },
              { icon: "😴", title: "Slaap & burn-out", desc: "Gespecialiseerde aanpak voor slaapstoornissen, overspannenheid en arbeidsgerelateerde uitputting." },
              { icon: "🌀", title: "Angst & depressie", desc: "Bewezen behandelingen voor angststoornissen, paniekstoornis en depressieve episodes." },
              { icon: "🧬", title: "ADHD & autisme", desc: "Diagnostiek en begeleiding voor volwassenen met ADHD, ASS en aanverwante ontwikkelingsstoornissen." },
              { icon: "👥", title: "Groepstherapie", desc: "Wekelijkse therapiegroepen voor specifieke doelgroepen in een veilige, vertrouwelijke setting." },
            ].map((s) => (
              <div key={s.title} className="npServCard">
                <div className="npServIcon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="npCta">
        <div className="npCtaInner">
          <h2>Een eerste stap zetten is het moeilijkste</h2>
          <p>Wij maken het zo eenvoudig mogelijk. Plan uw afspraak online of bel ons. Geen wachtlijst, geen drempel.</p>
          <button className="npBtnWhite">Afspraak plannen</button>
        </div>
      </section>

      <footer className="npFooter">
        <div className="npFooterInner">
          <div className="npFooterLogo"><span>Nova</span> Psychiatrie</div>
          <div className="npFooterCopy">© 2025 Nova Psychiatrie — RIZIV erkende praktijk</div>
        </div>
      </footer>
    </>
  );
}
