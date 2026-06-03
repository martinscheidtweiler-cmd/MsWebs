"use client";

import { useState, useEffect, useRef } from "react";
import "./fitness.css";

const methods = [
  { nr: "01", title: "Strength Architecture", text: "Trainingsblokken gebouwd rond meetbare progressie — geen generiek programma." },
  { nr: "02", title: "Nutrition Protocol", text: "Doelstellingen, structuur en wekelijkse correcties op basis van data, niet gevoel." },
  { nr: "03", title: "Performance Review", text: "Check-ins, foto's, meting en aanpassingen. Je weet altijd waar je staat." },
];

const plans = [
  {
    tag: "Foundation",
    name: "Strength System",
    price: "€149/m",
    desc: "Voor wie sterk wil starten met structuur, progressie en wekelijkse opvolging. Ideaal als startpunt.",
    featured: false,
  },
  {
    tag: "Most complete",
    name: "Hybrid Protocol",
    price: "€189/m",
    desc: "Kracht, conditie, voeding en wekelijkse check-ins in één systeem. Maximale omkadering.",
    featured: true,
  },
  {
    tag: "Recomp",
    name: "Body Recomposition",
    price: "€169/m",
    desc: "Gericht op vetverlies, spieropbouw en zichtbare progressie zonder extremen.",
    featured: false,
  },
];

const tickerItems = ["Strength", "Performance", "Discipline", "Structure", "Results", "No Excuses", "Private Coaching", "Forge"];

export default function FitnessPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-anim]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.setAttribute("data-visible", ""); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      {/* Nav */}
      <header className={`fNav${scrolled ? " fNavScrolled" : ""}`}>
        <a href="#home" className="fNavLogo">FORGE<span>.</span></a>
        <nav className="fNavLinks">
          <a href="#method">Method</a>
          <a href="#plans">Plans</a>
          <a href="#apply">Apply</a>
          <a href="#apply" className="fNavApply">Apply now</a>
        </nav>
        <button className={`fHamburger${mobileOpen ? " open" : ""}`} aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </header>
      <nav className={`fMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#method" onClick={() => setMobileOpen(false)}>Method</a>
        <a href="#plans" onClick={() => setMobileOpen(false)}>Plans</a>
        <a href="#apply" className="fMobileApply" onClick={() => setMobileOpen(false)}>Apply now</a>
      </nav>

      {/* Hero */}
      <section className="fHero" id="home">
        <div className="fHeroBg" ref={heroBgRef} />
        <div className="fHeroGrad" />
        <div className="fHeroContent">
          <div>
            <p className="fHeroLabel" data-anim="fade">Private performance coaching</p>
            <h1 className="fHeroTitle" data-anim="up" data-delay="1">
              Build the body<br />
              <em>that performs.</em>
            </h1>
            <p className="fHeroSub" data-anim="up" data-delay="2">
              Forge is niet een gym plan. Het is een privé coaching systeem
              voor kracht, structuur, conditie en zichtbare verandering.
            </p>
            <div className="fHeroActions" data-anim="up" data-delay="3">
              <a href="#apply" className="fHeroPrimary">Apply for coaching</a>
              <a href="#plans" className="fHeroSecondary">View plans</a>
            </div>
          </div>
          <div className="fHeroStats" data-anim="fade" data-delay="3">
            <div className="fHeroStat">
              <strong>94%</strong>
              <span>Client retention</span>
            </div>
            <div className="fHeroStat">
              <strong>12 wk</strong>
              <span>Avg visible change</span>
            </div>
            <div className="fHeroStat">
              <strong>1:1</strong>
              <span>Private coaching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="fTicker">
        <div className="fTickerInner">
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {tickerItems.map((item, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center" }}>
                  <span className="fTickerItem">{item}</span>
                  <span className="fTickerSep">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Method */}
      <section id="method" className="fMethodWrap">
        <div className="fMethodTop">
          <div>
            <p className="fMethodEyebrow" data-anim="fade">The method</p>
            <h2 data-anim="up" data-delay="1">Every decision<br /><em>has a reason.</em></h2>
          </div>
          <p data-anim="up" data-delay="2">
            Geen generieke programma''s. Geen standaard voedingsschema''s.
            Elk element van je training is gebaseerd op jouw lichaam, jouw doel en jouw data.
          </p>
        </div>
        <div className="fMethodGrid">
          {methods.map((m, i) => (
            <div className="fMethodCard" key={m.nr} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
              <span className="fMethodNr">{m.nr}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <span className="fMethodAccent" />
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="fPlansWrap">
        <div className="fPlansInner">
          <div className="fPlansTop">
            <span data-anim="fade">Coaching plans</span>
            <h2 data-anim="up" data-delay="1">Choose your<br /><em>level.</em></h2>
          </div>
          <div className="fPlansGrid">
            {plans.map((p, i) => (
              <div className={`fPlanCard${p.featured ? " featured" : ""}`} key={p.name} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
                <span className="fPlanTag">{p.tag}</span>
                <p className="fPlanName">{p.name}</p>
                <p className="fPlanPrice">{p.price}</p>
                <p className="fPlanDesc">{p.desc}</p>
                <a href="#apply" className="fPlanCta">Apply now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private */}
      <section className="fPrivate">
        <div className="fPrivateImg" data-anim="scale">
          <img
            src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1000&q=85"
            alt="Private coaching Forge"
            loading="lazy"
          />
        </div>
        <div className="fPrivateText">
          <p className="fPrivateEyebrow" data-anim="fade">Private coaching</p>
          <h2 data-anim="up" data-delay="1">Less motivation.<br /><em>More pressure.</em></h2>
          <p data-anim="up" data-delay="2">
            Wekelijkse check-ins, exacte targets, gestructureerde training
            en directe correcties. Je raadet niet wat je moet doen.
          </p>
          <p data-anim="up" data-delay="3">
            Forge werkt het best met klanten die structuur en accountability
            willen. Geen motivatie-praatjes. Wel resultaten.
          </p>
          <a href="#apply" className="fPrivateCta" data-anim="up" data-delay="4">Apply for coaching</a>
        </div>
      </section>

      {/* Apply */}
      <section className="fApply" id="apply">
        <div className="fApplyLeft">
          <p className="fApplyEyebrow" data-anim="fade">Application</p>
          <h2 data-anim="up" data-delay="1">Request a private<br /><em>intake.</em></h2>
          <p data-anim="up" data-delay="2">
            Forge werkt best met klanten die structuur en verantwoording willen.
            Apply eerst — dan kiezen we samen het juiste protocol.
          </p>
          <p data-anim="up" data-delay="3">
            Beperkt aantal plaatsen per maand. Geen wachtlijstgarantie.
          </p>
        </div>
        <div className="fApplyRight">
          <form className="fForm" data-anim="up" data-delay="1">
            <p className="fFormLabel">Private coaching intake</p>
            <input placeholder="Full name" />
            <input placeholder="Email address" type="email" />
            <input placeholder="Phone number" type="tel" />
            <select defaultValue="">
              <option value="" disabled>Primary goal</option>
              <option>Strength & muscle</option>
              <option>Fat loss</option>
              <option>Hybrid performance</option>
              <option>Body recomposition</option>
            </select>
            <textarea placeholder="Describe your current situation, training history and what you want to achieve." rows={5} />
            <button type="button">Submit application →</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="fFooter">
        <span className="fFooterLogo">FORGE<span>.</span></span>
        <span className="fFooterSub">Private Performance Coaching · Belgium</span>
      </footer>
    </main>
  );
}
