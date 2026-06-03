"use client";

import { useState, useEffect } from "react";
import "./advocaat.css";

const practiceAreas = [
  { nr: "01", title: "Corporate advisory", text: "Shareholder matters, acquisitions, governance en management structuren voor groeiende ondernemingen.", tags: ["M&A", "Governance", "Shareholder agreements"] },
  { nr: "02", title: "Real estate law", text: "Transacties, ontwikkelingsprojecten en huurgeschillen voor investeerders en projectontwikkelaars.", tags: ["Acquisitions", "Lease law", "Development"] },
  { nr: "03", title: "Strategic disputes", text: "Onderhandeling, bemiddeling en procedure voor complexe geschillen met hoge inzet.", tags: ["Litigation", "Arbitration", "Settlement"] },
  { nr: "04", title: "Private clients", text: "Vermogensbeheer, successieplanning en familiaal vermogensrecht met absolute discretie.", tags: ["Wealth structuring", "Succession", "Family office"] },
];

const methods = [
  { nr: "01", title: "Position", text: "We brengen uw volledige juridische positie in kaart voor we iets adviseren of aanbevelen." },
  { nr: "02", title: "Strategy", text: "We ontwerpen een aanpak die past bij uw doelen, risicotolerantie en tijdshorizon." },
  { nr: "03", title: "Execution", text: "We voeren uit met precisie en houden u op de hoogte zonder overbodige ruis of verrassingen." },
];

const cases = [
  { title: "Founder exit", type: "Private transaction", result: "€18M", text: "Begeleiding van een volledige aandeelhoudersexit inclusief due diligence en closing." },
  { title: "Real estate dispute", type: "Settled pre-court", result: "11 weeks", text: "Strategische onderhandeling die een langlopende rechtszaak vooraf vervangt." },
  { title: "Family office", type: "Confidential structuring", result: "Cross-border", text: "Internationale vermogensstructurering voor een discrete private cliënt." },
  { title: "Corporate acquisition", type: "M&A advisory", result: "€34M", text: "Volledige begeleiding van identificatie tot closing in een grensoverschrijdende deal." },
];

const team = [
  { name: "Laurent Aureus", role: "Founding Partner", focus: "Corporate law, M&A", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
  { name: "Sophie Vandaele", role: "Senior Associate", focus: "Real estate, disputes", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Marc De Smedt", role: "Of Counsel", focus: "Private clients, family law", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
];

const stats = [
  ["24yr", "Combined experience"],
  ["€200M+", "Transactions advised"],
  ["94%", "Settled without court"],
  ["100%", "Discretion guaranteed"],
];

export default function AdvocaatPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
      <header className={`aNav${scrolled ? " aNavScrolled" : ""}`}>
        <a href="#home" className="aNavBrand">
          <strong>AUREUS LAW</strong>
          <span>Strategic advisory · Brussels · Antwerp</span>
        </a>
        <nav className="aNavLinks">
          <a href="#practice">Practice</a>
          <a href="#method">Method</a>
          <a href="#cases">Cases</a>
          <a href="#team">Team</a>
          <a href="#contact" className="aNavIntake">Confidential intake</a>
        </nav>
        <button className={`aHamburger${mobileOpen ? " open" : ""}`} aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </header>
      <nav className={`aMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#practice" onClick={() => setMobileOpen(false)}>Practice</a>
        <a href="#method" onClick={() => setMobileOpen(false)}>Method</a>
        <a href="#cases" onClick={() => setMobileOpen(false)}>Cases</a>
        <a href="#team" onClick={() => setMobileOpen(false)}>Team</a>
        <a href="#contact" className="aMobileIntake" onClick={() => setMobileOpen(false)}>Confidential intake</a>
      </nav>

      {/* Hero */}
      <section className="aHero" id="home">
        <div className="aHeroLeft">
          <p className="aHeroEyebrow" data-anim="fade">Strategic law office · Brussels · Antwerp</p>
          <h1 className="aHeroTitle" data-anim="up" data-delay="1">
            Quiet legal power<br />for <em>complex decisions.</em>
          </h1>
          <p className="aHeroSub" data-anim="up" data-delay="2">
            Aureus Law is een discreet advocatenkantoor voor ondernemers,
            investeerders en private clients die juridische helderheid nodig
            hebben zonder ruis.
          </p>
          <div className="aHeroActions" data-anim="up" data-delay="3">
            <a href="#contact" className="aHeroPrimary">Confidential intake</a>
            <a href="#practice" className="aHeroSecondary">View practice areas</a>
          </div>
        </div>
        <div className="aHeroRight">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85" alt="Aureus Law" />
          <div className="aHeroRightOverlay" />
          <div className="aHeroFloatStat">
            <strong>€200M+</strong>
            <span>Transactions advised</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="aStats">
        {stats.map(([v, l], i) => (
          <div className="aStat" key={l} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"|"4"}>
            <span className="aStatValue">{v}</span>
            <span className="aStatLabel">{l}</span>
          </div>
        ))}
      </div>

      {/* Practice areas */}
      <section id="practice" className="aPracticeWrap">
        <div className="aPracticeTop">
          <div>
            <p className="aPracticeEyebrow" data-anim="fade">Practice areas</p>
            <h2 data-anim="up" data-delay="1">Focused legal work.<br /><em>No noise.</em></h2>
          </div>
        </div>
        <div className="aPracticeList">
          {practiceAreas.map((p, i) => (
            <div className="aPracticeRow" key={p.nr} data-anim="up" data-delay={String((i % 3) + 1) as "1"|"2"|"3"}>
              <span className="aPracticeNr">{p.nr}</span>
              <p className="aPracticeTitle">{p.title}</p>
              <p className="aPracticeText">{p.text}</p>
              <div className="aPracticeTags">
                {p.tags.map((tag) => <span className="aPracticeTag" key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Method */}
      <section id="method" className="aMethodWrap">
        <div className="aMethodInner">
          <div className="aMethodTop">
            <div>
              <p className="aMethodEyebrow" data-anim="fade">Method</p>
              <h2 data-anim="up" data-delay="1">We reduce pressure<br /><em>before we act.</em></h2>
            </div>
            <p data-anim="up" data-delay="2">
              Elk dossier start met positie, risico, onderhandelingsruimte en timing.
              Pas daarna kiezen we voor advies, onderhandeling of procedure.
            </p>
          </div>
          <div className="aMethodSteps">
            {methods.map((m, i) => (
              <div className="aMethodStep" key={m.nr} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
                <span className="aMethodStepNr">{m.nr}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <span className="aMethodLine" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="aCasesWrap">
        <div className="aCasesTop">
          <div>
            <p className="aPracticeEyebrow" data-anim="fade">Selected matters</p>
            <h2 data-anim="up" data-delay="1">Representative<br /><em>work.</em></h2>
          </div>
        </div>
        <div className="aCasesGrid">
          {cases.map((c, i) => (
            <div className="aCaseCard" key={c.title} data-anim="up" data-delay={String((i % 2) + 1) as "1"|"2"}>
              <div className="aCaseTop">
                <span className="aCaseTitle">{c.title}</span>
                <span className="aCaseResult">{c.result}</span>
              </div>
              <span className="aCaseType">{c.type}</span>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <div className="aQuoteStrip">
        <blockquote data-anim="up">
          &ldquo;Legal power is not about noise. It is about control, timing
          and the confidence that you are never surprised.&rdquo;
        </blockquote>
        <cite data-anim="fade" data-delay="2">Aureus Law · Strategic Advisory</cite>
      </div>

      {/* Team */}
      <section id="team" className="aTeamWrap">
        <div className="aTeamTop">
          <div>
            <p className="aTeamEyebrow" data-anim="fade">The team</p>
            <h2 data-anim="up" data-delay="1">Senior counsel<br /><em>only.</em></h2>
          </div>
        </div>
        <div className="aTeamGrid">
          {team.map((t, i) => (
            <div className="aTeamCard" key={t.name} data-anim="scale" data-delay={String(i + 1) as "1"|"2"|"3"}>
              <img src={t.image} alt={t.name} loading="lazy" />
              <div className="aTeamOverlay">
                <h3>{t.name}</h3>
                <strong>{t.role}</strong>
                <p>{t.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="aContact" id="contact">
        <div className="aContactLeft">
          <p className="aContactEyebrow" data-anim="fade">Confidential intake</p>
          <h2 data-anim="up" data-delay="1">Start<br /><em>privately.</em></h2>
          <p data-anim="up" data-delay="2">
            Beschrijf uw dossier kort. Aureus neemt contact op voor een discrete
            eerste bespreking — altijd vertrouwelijk.
          </p>
          <div className="aContactMeta" data-anim="up" data-delay="3">
            <span>Offices</span>
            <a href="#">Brussels · Antwerp</a>
            <a href="mailto:info@aureuslaw.be">info@aureuslaw.be</a>
            <a href="tel:+3220000000">+32 2 000 00 00</a>
          </div>
        </div>
        <div className="aContactRight">
          <form className="aForm" data-anim="up" data-delay="1">
            <p className="aFormLabel">Private inquiry</p>
            <div className="aFormRow">
              <input placeholder="Full name" />
              <input placeholder="Email address" type="email" />
            </div>
            <input placeholder="Company (optional)" />
            <select defaultValue="">
              <option value="" disabled>Matter type</option>
              <option>Corporate advisory</option>
              <option>Real estate law</option>
              <option>Strategic dispute</option>
              <option>Private client</option>
              <option>M&A advisory</option>
            </select>
            <textarea placeholder="Short confidential description of your matter" rows={5} />
            <button type="button">Request intake →</button>
          </form>
        </div>
      </section>

      <footer className="aFooter">
        <span className="aFooterBrand">AUREUS LAW</span>
        <span className="aFooterSub">Brussels · Antwerp · Private advisory</span>
      </footer>
    </main>
  );
}
