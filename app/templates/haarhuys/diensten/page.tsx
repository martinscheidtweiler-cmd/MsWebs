"use client";

import { useState } from "react";
import "../haarhuys.css";
import { HaarhyusFooter } from "../page";

const services = [
  {
    id: "knippen",
    num: "Dienst 01",
    title: "Knippen & Stylen",
    desc: "Professioneel knippen, föhnen en stylen voor dames, heren en kinderen. We analyseren uw haartype en begeleiden u naar een coupe die bij u past. Stijl, golfje of textuur — wij brengen het tot leven.",
    tags: ["Dames", "Heren", "Kinderen"],
    prices: [
      { label: "Dames", value: "v.a. €35" },
      { label: "Heren", value: "v.a. €25" },
      { label: "Kinderen", value: "v.a. €18" },
    ],
    reversed: false,
  },
  {
    id: "krullen",
    num: "Dienst 02",
    title: "Curly Girl Method",
    desc: "Als erkend curly hair specialist knippen en behandelen we krullend haar droog, zodat elke krul in zijn natuurlijke vorm valt. We stellen samen de ideale producten- en haarroutine samen voor uw specifiek haartype.",
    tags: ["Krullend haar", "Golvend haar", "Droog knippen"],
    prices: [
      { label: "Consult + knip", value: "v.a. €55" },
      { label: "Behandeling", value: "v.a. €80" },
    ],
    reversed: true,
  },
  {
    id: "kleuring",
    num: "Dienst 03",
    title: "Kleuring & Highlights",
    desc: "Volledige kleuring, highlights, balayage, glossing of babylights. We werken met haarvriendelije kleurproducten die uw haar beschermen en een langdurig, stralend resultaat geven.",
    tags: ["Balayage", "Highlights", "Glossing", "Babylights"],
    prices: [
      { label: "Volledig", value: "v.a. €55" },
      { label: "Highlights", value: "v.a. €65" },
    ],
    reversed: false,
  },
  {
    id: "keratine",
    num: "Dienst 04",
    title: "Keratine & Herstel",
    desc: "Een keratinebehandeling maakt uw haar gladder, beter beheersbaar en stralend zonder het te beschadigen. Voor beschadigd of poreus haar bieden we ook een intensieve Olaplex-behandeling aan die het haar van binnenuit herstelt.",
    tags: ["Keratine", "Olaplex", "Herstelbehandeling"],
    prices: [
      { label: "Keratine", value: "v.a. €120" },
      { label: "Olaplex", value: "v.a. €45" },
    ],
    reversed: true,
  },
  {
    id: "workshop",
    num: "Dienst 05",
    title: "Krullen Workshop",
    desc: "Leer alles over het onderhouden van uw krullen. In een persoonlijke sessie leert u de juiste wascyclus, producten en aanbrengtechnieken voor uw specifiek haartype. U gaat naar huis met een volledig op maat gemaakt routineplan.",
    tags: ["Persoonlijk advies", "Productselectie", "Technieken"],
    prices: [
      { label: "Workshop (90 min)", value: "v.a. €95" },
    ],
    reversed: false,
  },
];

const pricingKnippen = [
  { name: "Dames — knippen", price: "€35" },
  { name: "Dames — knippen + föhnen", price: "€52" },
  { name: "Heren — knippen", price: "€25" },
  { name: "Heren — knippen + wassen", price: "€32" },
  { name: "Kinderen (<12 jaar)", price: "€18" },
  { name: "Fringe bijknippen", price: "€10" },
];
const pricingKrullen = [
  { name: "Eerste consult + knip", price: "€65" },
  { name: "Opvolgingsbeurt", price: "€55" },
  { name: "Devacurl behandeling", price: "€85" },
  { name: "Workshop (90 min)", price: "€95" },
  { name: "Persoonlijk routineadvies", price: "€45" },
];
const pricingKleuring = [
  { name: "Volledig kleuren", price: "v.a. €55" },
  { name: "Highlights / balayage", price: "v.a. €65" },
  { name: "Glossing", price: "v.a. €35" },
  { name: "Keratine behandeling", price: "v.a. €120" },
  { name: "Olaplex behandeling", price: "v.a. €45" },
  { name: "Headspa (60 min)", price: "v.a. €65" },
];

export default function DienstenPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="hh-root">
      <nav className="hh-nav">
        <div className="hh-nav-inner">
          <a href="/templates/haarhuys" className="hh-nav-logo">'t <span>Haarhuys</span></a>
          <ul className="hh-nav-links">
            <li><a href="/templates/haarhuys/over">Over ons</a></li>
            <li><a href="/templates/haarhuys/diensten" className="hh-active">Diensten</a></li>
            <li><a href="/templates/haarhuys/webshop">Webshop</a></li>
            <li><a href="/templates/haarhuys/headspa">Headspa</a></li>
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
        <a href="/templates/haarhuys/diensten" className="hh-active" onClick={() => setMobileOpen(false)}>Diensten</a>
        <a href="/templates/haarhuys/webshop" onClick={() => setMobileOpen(false)}>Webshop</a>
        <a href="/templates/haarhuys/headspa" onClick={() => setMobileOpen(false)}>Headspa</a>
        <a href="/templates/haarhuys/contact" onClick={() => setMobileOpen(false)}>Contact & Afspraak</a>
      </nav>

      <header className="hh-page-header">
        <div className="hh-page-header-grid" />
        <div className="hh-page-header-line" />
        <div className="hh-container hh-page-header-content">
          <div className="hh-breadcrumb">
            <a href="/templates/haarhuys">Home</a>
            <span>›</span>
            <span>Diensten</span>
          </div>
          <h1>Onze <em>diensten</em></h1>
          <p className="hh-page-header-sub">
            Van een klassieke knipbeurt tot een intensieve krullenbehandeling.
            Altijd persoonlijk, altijd op maat.
          </p>
        </div>
      </header>

      {/* Services list */}
      <section className="hh-services-list">
        <div className="hh-container">
          {services.map((svc) => (
            <div
              key={svc.id}
              id={svc.id}
              className="hh-service-block"
              style={svc.reversed ? { direction: "rtl" } : {}}
            >
              <div className="hh-service-img hh-img-placeholder" style={{ direction: "ltr" }}>
                Foto {svc.title.toLowerCase()}
              </div>
              <div className="hh-service-info" style={{ direction: "ltr" }}>
                <div className="hh-service-number">{svc.num}</div>
                <h2>{svc.title}</h2>
                <p>{svc.desc}</p>
                <div className="hh-service-tags">
                  {svc.tags.map(t => (
                    <span key={t} className="hh-service-tag">{t}</span>
                  ))}
                </div>
                <div className="hh-service-price-row">
                  {svc.prices.map(p => (
                    <div key={p.label} className="hh-price-item">
                      <div className="hh-price-label">{p.label}</div>
                      <div className="hh-price-value">{p.value}</div>
                    </div>
                  ))}
                </div>
                <a href="/templates/haarhuys/contact" className="hh-btn hh-btn-primary">
                  Afspraak maken
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="hh-pricing">
        <div className="hh-container">
          <div className="hh-pricing-header">
            <p className="hh-eyebrow" style={{ justifyContent: "center" }}>Prijsoverzicht</p>
            <h2>Tarieven</h2>
            <p>Indicatieve prijzen. De exacte prijs wordt besproken bij de consultatie.</p>
          </div>
          <div className="hh-pricing-cols">
            <div className="hh-pricing-col">
              <div className="hh-pricing-col-title">Knippen &amp; Föhnen</div>
              {pricingKnippen.map(r => (
                <div key={r.name} className="hh-price-row">
                  <span className="hh-price-row-name">{r.name}</span>
                  <span className="hh-price-row-price">{r.price}</span>
                </div>
              ))}
            </div>
            <div className="hh-pricing-col">
              <div className="hh-pricing-col-title">Krullenkapper</div>
              {pricingKrullen.map(r => (
                <div key={r.name} className="hh-price-row">
                  <span className="hh-price-row-name">{r.name}</span>
                  <span className="hh-price-row-price">{r.price}</span>
                </div>
              ))}
            </div>
            <div className="hh-pricing-col">
              <div className="hh-pricing-col-title">Kleuring &amp; Behandeling</div>
              {pricingKleuring.map(r => (
                <div key={r.name} className="hh-price-row">
                  <span className="hh-price-row-name">{r.name}</span>
                  <span className="hh-price-row-price">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hh-pricing-note">
            <strong>Let op:</strong> Prijzen zijn richtprijzen en kunnen afwijken afhankelijk van haarlengte,
            dikte en gewenst resultaat. Exacte prijs wordt altijd vooraf besproken. Afspraken annuleren meer
            dan 24u op voorhand is gratis. Minder dan 12u: 50% van de dienst. Niet opdagen: 100%.
          </div>
        </div>
      </section>

      {/* Booking strip */}
      <div className="hh-booking-strip">
        <div className="hh-container">
          <div className="hh-booking-strip-inner">
            <div>
              <h3>Klaar om te boeken?</h3>
              <p>Online reserveren, direct bevestiging per e-mail.</p>
            </div>
            <a href="/templates/haarhuys/contact" className="hh-booking-strip-btn">
              Afspraak maken →
            </a>
          </div>
        </div>
      </div>

      <HaarhyusFooter activePage="diensten" />
    </div>
  );
}
