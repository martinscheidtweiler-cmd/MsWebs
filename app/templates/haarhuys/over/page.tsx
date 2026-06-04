"use client";

import { useState } from "react";
import "../haarhuys.css";
import { HaarhyusFooter } from "../page";

const values = [
  {
    num: "01",
    title: "Vakmanschap",
    desc: "Meer dan 10 jaar ervaring in haarverzorging. Elk detail telt — van de analyse tot de afwerking.",
  },
  {
    num: "02",
    title: "Duurzaamheid",
    desc: "We werken uitsluitend met haarvriendelije, professionele producten van gecertificeerde merken die haar respecteren.",
  },
  {
    num: "03",
    title: "Persoonlijk advies",
    desc: "Geen standaard behandeling. We luisteren, analyseren en stemmen alles af op uw specifiek haartype.",
  },
];

const stats = [
  { num: "10+", label: "Jaar ervaring" },
  { num: "2", label: "Locaties" },
  { num: "5", label: "Topmerken" },
  { num: "100%", label: "Op maat" },
];

export default function OverPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="hh-root">
      <nav className="hh-nav">
        <div className="hh-nav-inner">
          <a href="/templates/haarhuys" className="hh-nav-logo">'t <span>Haarhuys</span></a>
          <ul className="hh-nav-links">
            <li><a href="/templates/haarhuys/over" className="hh-active">Over ons</a></li>
            <li><a href="/templates/haarhuys/diensten">Diensten</a></li>
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
        <a href="/templates/haarhuys/over" className="hh-active" onClick={() => setMobileOpen(false)}>Over ons</a>
        <a href="/templates/haarhuys/diensten" onClick={() => setMobileOpen(false)}>Diensten</a>
        <a href="/templates/haarhuys/webshop" onClick={() => setMobileOpen(false)}>Webshop</a>
        <a href="/templates/haarhuys/headspa" onClick={() => setMobileOpen(false)}>Headspa</a>
        <a href="/templates/haarhuys/contact" onClick={() => setMobileOpen(false)}>Contact &amp; Afspraak</a>
      </nav>

      <header className="hh-page-header">
        <div className="hh-page-header-grid" />
        <div className="hh-page-header-line" />
        <div className="hh-container hh-page-header-content">
          <div className="hh-breadcrumb">
            <a href="/templates/haarhuys">Home</a>
            <span>›</span>
            <span>Over ons</span>
          </div>
          <h1>Over <em>'t Haarhuys</em></h1>
          <p className="hh-page-header-sub">
            Meer dan een kapsalon. Een passie voor haar, kwaliteit en persoonlijke verzorging.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="hh-story">
        <div className="hh-container">
          <div className="hh-story-grid">
            <div className="hh-story-content">
              <p className="hh-eyebrow">Ons verhaal</p>
              <h2>Ontstaan uit passie voor haar</h2>
              <p>
                't Haarhuys begon als een kleine kapsalon in Nijlen met één duidelijk doel:
                elke klant op een authentieke manier helpen met hun haar. Niet met
                standaard behandelingen, maar met een diepgaande kennis van haartypes,
                producten en technieken.
              </p>
              <p>
                Als erkend krullenkapper in België zijn we gespecialiseerd in de Curly Girl
                Method — een aanpak die krullend en golvend haar behandelt met de aandacht
                het verdient. Maar ook voor iedereen met steil, beschadigd of geverfde haar
                bent u bij ons aan het juiste adres.
              </p>
              <p>
                Ondertussen zijn we gegroeid naar twee locaties: Nijlen en Olen. Dezelfde
                filosofie, dezelfde kwaliteit — dichter bij u in de buurt.
              </p>
              <a href="/templates/haarhuys/contact" className="hh-btn hh-btn-outline" style={{ marginTop: 8 }}>
                Maak een afspraak
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <div className="hh-story-img hh-img-placeholder">Foto salon</div>
              <div
                className="hh-story-img-secondary hh-img-placeholder"
                style={{ position: "absolute", bottom: -32, left: -32, width: "55%", aspectRatio: "1" }}
              >
                Foto team
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="hh-values">
        <div className="hh-container">
          <div className="hh-values-header">
            <p className="hh-eyebrow" style={{ justifyContent: "center" }}>Wat ons drijft</p>
            <h2>Onze waarden</h2>
            <p>
              Drie principes liggen aan de basis van alles wat we doen bij 't Haarhuys.
              Ze sturen elke beslissing, elke behandeling en elk advies.
            </p>
          </div>
          <div className="hh-values-grid">
            {values.map(v => (
              <div key={v.num} className="hh-value-card">
                <div className="hh-value-num">{v.num}</div>
                <div className="hh-value-title">{v.title}</div>
                <div className="hh-value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="hh-stats-section">
        <div className="hh-container">
          <div className="hh-stats-grid">
            {stats.map(s => (
              <div key={s.label} className="hh-stat-item">
                <div className="hh-stat-item-num">{s.num}</div>
                <div className="hh-stat-item-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section style={{ padding: "120px 0", background: "var(--hh-white)" }}>
        <div className="hh-container">
          <div style={{ marginBottom: 64 }}>
            <p className="hh-eyebrow">Waar u ons vindt</p>
            <h2 style={{ fontSize: "clamp(36px,4vw,52px)", marginBottom: 12 }}>Twee locaties</h2>
            <p style={{ fontSize: 14, color: "var(--hh-gray)" }}>
              Beide vestigingen werken op afspraak. Online boeken of telefonisch contact opnemen.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              {
                label: "Locatie 01", name: "Nijlen",
                addr: "Woeringenstraat 11A\n2560 Nijlen",
                hours: "Wo – Vr & Za: op afspraak",
                map: "https://maps.google.com/?q=Woeringenstraat+11A+2560+Nijlen",
              },
              {
                label: "Locatie 02", name: "Olen",
                addr: "Gerheiden 50\n2250 Olen",
                hours: "Di – Vr & Za: op afspraak",
                map: "https://maps.google.com/?q=Gerheiden+50+2250+Olen",
              },
            ].map(loc => (
              <div key={loc.name} style={{ border: "1px solid var(--hh-gray-lt)", padding: "40px 36px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--hh-gold)", marginBottom: 8 }}>
                  {loc.label}
                </div>
                <div style={{ fontFamily: "var(--hh-serif)", fontSize: 28, fontWeight: 300, marginBottom: 16 }}>
                  {loc.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--hh-gray)", lineHeight: 1.7, marginBottom: 8 }}>
                  {loc.addr.split("\n").map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "var(--hh-gray)", marginBottom: 24 }}>{loc.hours}</div>
                <a
                  href={loc.map}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--hh-gold)", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  Route plannen →
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
              <h3>Klaar om kennis te maken?</h3>
              <p>Maak een afspraak in Nijlen of Olen.</p>
            </div>
            <a href="/templates/haarhuys/contact" className="hh-booking-strip-btn">
              Afspraak maken →
            </a>
          </div>
        </div>
      </div>

      <HaarhyusFooter activePage="over" />
    </div>
  );
}
