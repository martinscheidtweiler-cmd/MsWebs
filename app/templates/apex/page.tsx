"use client";
import { useState, useEffect } from "react";
import "./apex.css";

export default function ApexTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className="apNav">
        <div className="apLogo">APEX<span>.</span>BUILD</div>
        <div className="apNavLinks">
          <a href="#">Diensten</a>
          <a href="#">Projecten</a>
          <a href="#">Over ons</a>
          <a href="#">Contact</a>
        </div>
        <button className="apNavBtn">Offerte Aanvragen</button>
      </nav>

      <section className="apHero">
        <div className="apHeroBg">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Construction" />
        </div>
        <div className="apHeroStripe" />
        <div className="apHeroContent">
          <div className="apHeroKicker">
            <span>Renovatie & Afbouw Expert</span>
          </div>
          <h1 className="apHeroTitle">
            WE BOUWEN<em>WAT BLIJFT</em>
          </h1>
          <div className="apHeroBottom">
            <p className="apHeroSub">
              Van grondige renovaties tot complete nieuwbouw — APEX levert precisiewerk dat decennia standhoudt.
            </p>
            <div className="apBtnRow">
              <button className="apBtn">Offerte Aanvragen</button>
              <button className="apBtnOutline">Onze Projecten</button>
            </div>
          </div>
        </div>
      </section>

      <section className="apStats">
        <div className="apStatsInner">
          {[
            { num: "320+", label: "Projecten Voltooid" },
            { num: "18jr", label: "Vakmanschap" },
            { num: "98%", label: "Klanttevredenheid" },
            { num: "45+", label: "Gecertificeerde Vaklui" },
          ].map((s) => (
            <div key={s.label} className="apStat">
              <div className="apStatNum">{s.num}</div>
              <div className="apStatLabel">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="apServices">
        <div className="apServInner">
          <div className="apServHeader">
            <div className="apLabel">Wat we doen</div>
            <h2>ONZE<br />DIENSTEN</h2>
          </div>
          <div className="apServGrid">
            {[
              { num: "01", icon: "🏗️", title: "RENOVATIE", desc: "Volledige renovaties van woningen en bedrijfspanden. Van kelder tot dak, wij zorgen voor een kwalitatieve en duurzame aanpak." },
              { num: "02", icon: "🪟", title: "AFBOUW", desc: "Pleisterwerk, vloerwerken, schrijnwerk en schilderwerk. Onze vaklui leveren een perfect afgewerkt resultaat." },
              { num: "03", icon: "🏠", title: "NIEUWBOUW", desc: "Volledig nieuwbouwprojecten op sleutel-op-de-deur basis. Wij begeleiden u van vergunning tot oplevering." },
              { num: "04", icon: "🔧", title: "TECHNIEKEN", desc: "Elektriciteit, sanitair, HVAC en domotica. Moderne technieken naadloos geïntegreerd in uw project." },
              { num: "05", icon: "🏢", title: "COMMERCIEEL", desc: "Kantoorinrichting, winkels en horecazaken. Wij transformeren commerciële ruimtes naar werkbare omgevingen." },
              { num: "06", icon: "♻️", title: "ENERGIERENOVATIE", desc: "Isolatie, zonnepanelen en warmtepompen. Maak uw woning klaar voor de toekomst met onze energieoplossingen." },
            ].map((s) => (
              <div key={s.title} className="apServCard">
                <div className="apServNum">{s.num}</div>
                <div className="apServIcon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="apWork">
        <div className="apWorkInner">
          <div className="apWorkTop">
            <h2>ONZE<br />REALISATIES</h2>
            <a href="#" className="apWorkLink">Alle projecten bekijken</a>
          </div>
          <div className="apWorkGrid">
            {[
              { cat: "Woningrenovatie", title: "Villa Residence Gent", img: "photo-1585129777188-94600bc7b4b3" },
              { cat: "Commercieel", title: "Apex Office Park", img: "photo-1497366216548-37526070297c" },
              { cat: "Nieuwbouw", title: "Parkwoning Brasschaat", img: "photo-1564013799919-ab600027ffc6" },
              { cat: "Energierenovatie", title: "Loft Antwerpen", img: "photo-1502672260266-1c1ef2d93688" },
              { cat: "Afbouw", title: "Penthouse Brussel", img: "photo-1560448204-e02f11c3d0e2" },
            ].map((w) => (
              <div key={w.title} className="apWorkItem">
                <img className="apWorkImg" src={`https://images.unsplash.com/${w.img}?w=800&q=80`} alt={w.title} />
                <div className="apWorkOverlay" />
                <div className="apWorkMeta">
                  <div className="apWorkCat">{w.cat}</div>
                  <div className="apWorkTitle">{w.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="apCta">
        <div className="apCtaBg">APEX</div>
        <div className="apCtaInner">
          <h2>KLAAR OM TE STARTEN?</h2>
          <p>Vertel ons over uw project en ontvang binnen 48 uur een gedetailleerde, vrijblijvende offerte.</p>
          <button className="apBtnDark">Gratis Offerte Aanvragen</button>
        </div>
      </section>

      <footer className="apFooter">
        <div className="apFooterInner">
          <div className="apFooterLogo">APEX<span>.</span>BUILD</div>
          <div className="apFooterCopy">© 2025 Apex Build BV — Alle rechten voorbehouden</div>
        </div>
      </footer>
    </>
  );
}
