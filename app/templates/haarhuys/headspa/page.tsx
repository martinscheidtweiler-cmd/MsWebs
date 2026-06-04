"use client";

import { useState } from "react";
import "../haarhuys.css";
import { HaarhyusFooter } from "../page";

const processSteps = [
  { num: "01", title: "Haaranalyse", desc: "We analyseren uw haartype en hoofdhuidconditie om de behandeling volledig op maat in te stellen." },
  { num: "02", title: "Hydromassage", desc: "Zachte waterstralen masseren de hoofdhuid voor betere doorbloeding en diepgaande reiniging." },
  { num: "03", title: "Serum & Masker", desc: "Biologische actieve serums worden ingewerkt in de hoofdhuid, gevolgd door een intensief voedend masker." },
  { num: "04", title: "Afsluiting", desc: "De behandeling wordt afgesloten met een ontspannende massage en styling advies voor thuis." },
];

const benefits = [
  {
    num: "01",
    title: "Betere hoofdhuidgezondheid",
    desc: "De massagetechnieken stimuleren de doorbloeding en zorgen voor een gezondere, beter gevoed hoofdhuid die de haargroei ondersteunt.",
  },
  {
    num: "02",
    title: "Vermindering van stress",
    desc: "De combinatie van warmte, massage en aromatherapie heeft een bewezen ontspannend effect op het zenuwstelsel.",
  },
  {
    num: "03",
    title: "Intensieve hydratatie",
    desc: "Biologische serums dringen diep in de haarschacht en voeden het haar van binnenuit voor meer glans en elasticiteit.",
  },
  {
    num: "04",
    title: "Aanpak van haaruitval",
    desc: "Door de activatie van haarzakjes en verbetering van de doorbloeding kan de behandeling bijdragen aan het remmen van haaruitval.",
  },
];

const packages = [
  {
    name: "Essentials",
    duration: "60 minuten",
    price: "€65",
    note: "Inclusief BTW",
    featured: false,
    includes: ["Haaranalyse en consult", "Hydromassage (20 min)", "Voedend masker", "Droogblazen en afwerking"],
  },
  {
    name: "Signature",
    duration: "75 minuten",
    price: "€90",
    note: "Inclusief BTW",
    featured: true,
    includes: ["Uitgebreide haaranalyse", "Hydromassage (30 min)", "Gepersonaliseerd serum", "Intensief voedend masker", "Hoofdhuid- en nektmassage", "Droogblazen en styling"],
  },
  {
    name: "Premium",
    duration: "90 minuten",
    price: "€120",
    note: "Inclusief BTW",
    featured: false,
    includes: ["Volledige diagnose", "Hydromassage (40 min)", "Luxe serum behandeling", "Intensief herstelmasker", "Volledige hoofdmassage", "Schouder- en nekmassage", "Professionele styling"],
  },
];

export default function HeadspaPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="hh-root">
      <nav className="hh-nav">
        <div className="hh-nav-inner">
          <a href="/templates/haarhuys" className="hh-nav-logo">'t <span>Haarhuys</span></a>
          <ul className="hh-nav-links">
            <li><a href="/templates/haarhuys/over">Over ons</a></li>
            <li><a href="/templates/haarhuys/diensten">Diensten</a></li>
            <li><a href="/templates/haarhuys/webshop">Webshop</a></li>
            <li><a href="/templates/haarhuys/headspa" className="hh-active">Headspa</a></li>
            <li><a href="/templates/haarhuys/contact">Contact</a></li>
          </ul>
          <div className="hh-nav-right">
            <a href="/templates/haarhuys/contact" className="hh-nav-cta">Afspraak</a>
            <button className="hh-hamburger" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <nav className={`hh-mobile-menu${mobileOpen ? " open" : ""}`}>
        <a href="/templates/haarhuys/over" onClick={() => setMobileOpen(false)}>Over ons</a>
        <a href="/templates/haarhuys/diensten" onClick={() => setMobileOpen(false)}>Diensten</a>
        <a href="/templates/haarhuys/webshop" onClick={() => setMobileOpen(false)}>Webshop</a>
        <a href="/templates/haarhuys/headspa" className="hh-active" onClick={() => setMobileOpen(false)}>Headspa</a>
        <a href="/templates/haarhuys/contact" onClick={() => setMobileOpen(false)}>Contact & Afspraak</a>
      </nav>

      <header className="hh-page-header">
        <div className="hh-page-header-grid" />
        <div className="hh-page-header-line" />
        <div className="hh-container hh-page-header-content">
          <div className="hh-breadcrumb">
            <a href="/templates/haarhuys">Home</a>
            <span>›</span>
            <span>Headspa</span>
          </div>
          <h1>Head<em>spa</em></h1>
          <p className="hh-page-header-sub">
            Een diepgaande hoofdhuidbehandeling voor ontspanning, herstel en gezonder haar.
          </p>
        </div>
      </header>

      {/* Intro */}
      <section className="hh-intro">
        <div className="hh-container">
          <div className="hh-intro-grid">
            <div className="hh-intro-content">
              <p className="hh-eyebrow">Wat is een headspa?</p>
              <h2>Ontspanning en verzorging in één behandeling</h2>
              <p>
                De headspa combineert een diepgaande hoofdhuidmassage met een intensieve
                haarverzorging op maat. Via zachte waterstralen, serum-injectie in de
                hoofdhuid en gerichte massagetechnieken worden spieren ontspannen en de
                doorbloeding van de hoofdhuid gestimuleerd.
              </p>
              <p>
                Ideaal voor wie last heeft van een droge, vette of gevoelige hoofdhuid,
                haaruitval, stress-gerelateerde hoofdhuidproblemen — of gewoon toe is aan
                een moment van totale verwennerij.
              </p>
              <p>
                De behandeling vindt plaats in een rustige, private omgeving en duurt 60 tot
                90 minuten. U vertrekt met gezonder, glanzender haar en een heldere geest.
              </p>
              <a href="/templates/haarhuys/contact" className="hh-btn hh-btn-primary" style={{ marginTop: 8 }}>
                Headspa boeken
              </a>
            </div>
            <div className="hh-intro-img">
              <div className="hh-intro-img-main hh-img-placeholder">Foto headspa behandeling</div>
              <div className="hh-intro-tag">
                <div className="hh-intro-tag-num">60'</div>
                <div className="hh-intro-tag-label">tot 90 min.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="hh-process">
        <div className="hh-container">
          <div className="hh-process-header">
            <p className="hh-eyebrow" style={{ justifyContent: "center" }}>Het ritueel</p>
            <h2>Hoe verloopt de behandeling?</h2>
            <p>Elke headspa volgt een zorgvuldig opgebouwde volgorde van stappen voor maximaal resultaat.</p>
          </div>
          <div className="hh-process-steps">
            {processSteps.map(s => (
              <div key={s.num} className="hh-process-step">
                <div className="hh-process-step-num">{s.num}</div>
                <div className="hh-process-step-line" />
                <div className="hh-process-step-title">{s.title}</div>
                <div className="hh-process-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="hh-benefits">
        <div className="hh-container">
          <div className="hh-benefits-grid">
            <div className="hh-benefits-list">
              <p className="hh-eyebrow">Waarom een headspa?</p>
              <h2 style={{ fontSize: "clamp(36px,4vw,52px)", marginBottom: 36 }}>Voordelen</h2>
              {benefits.map(b => (
                <div key={b.num} className="hh-benefit-item">
                  <div className="hh-benefit-num">{b.num}</div>
                  <div>
                    <div className="hh-benefit-title">{b.title}</div>
                    <div className="hh-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hh-benefits-img hh-img-placeholder">Foto headspa sfeer</div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="hh-packages">
        <div className="hh-container">
          <div className="hh-packages-header">
            <p className="hh-eyebrow" style={{ justifyContent: "center" }}>Formules</p>
            <h2>Kies uw headspa</h2>
            <p>Drie formules, elk op maat van uw noden en beschikbare tijd.</p>
          </div>
          <div className="hh-packages-grid">
            {packages.map(pkg => (
              <div key={pkg.name} className={`hh-package-card${pkg.featured ? " hh-featured" : ""}`}>
                {pkg.featured && (
                  <div className="hh-package-featured-label">Meest gekozen</div>
                )}
                <div className="hh-package-name">{pkg.name}</div>
                <div className="hh-package-duration">{pkg.duration}</div>
                <div className="hh-package-price">{pkg.price}</div>
                <div className="hh-package-price-note">{pkg.note}</div>
                <hr className="hh-package-divider" />
                <div className="hh-package-includes">
                  {pkg.includes.map(item => (
                    <div key={item} className="hh-package-includes-item">{item}</div>
                  ))}
                </div>
                <a
                  href="/templates/haarhuys/contact"
                  className={`hh-btn ${pkg.featured ? "hh-btn-primary" : "hh-btn-outline"}`}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Boeken
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking strip */}
      <div className="hh-booking-strip">
        <div className="hh-container">
          <div className="hh-booking-strip-inner">
            <div>
              <h3>Boek uw headspa ritueel</h3>
              <p>Neem contact op of maak direct een afspraak online.</p>
            </div>
            <a href="/templates/haarhuys/contact" className="hh-booking-strip-btn">
              Afspraak maken →
            </a>
          </div>
        </div>
      </div>

      <HaarhyusFooter activePage="headspa" />
    </div>
  );
}
