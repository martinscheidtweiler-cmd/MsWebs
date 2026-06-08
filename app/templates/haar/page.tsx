"use client";

import { useState } from "react";
import "./haar.css";

export default function HaarPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const WA_LINK = "https://wa.me/32000000000";

  return (
    <div className="hr-root">

      {/* ── Navigation ── */}
      <nav className="hr-nav">
        <div className="hr-nav-inner">
          <div className="hr-logo">HAAR</div>
          <ul className="hr-nav-links">
            <li><a href="#diensten">Diensten</a></li>
            <li><a href="#boeken">Boeken</a></li>
            <li><a href="#over">Over</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a className="hr-nav-wa" href={WA_LINK} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <button
              className="hr-hamburger"
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`hr-mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#diensten" onClick={() => setMenuOpen(false)}>Diensten</a>
          <a href="#boeken" onClick={() => setMenuOpen(false)}>Boeken</a>
          <a href="#over" onClick={() => setMenuOpen(false)}>Over</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            → WhatsApp
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hr-hero">
        <div className="hr-hero-inner">
          {/* Left: copy */}
          <div className="hr-hero-left">
            <div className="hr-hero-eyebrow">Shana Verberck</div>
            <h1 className="hr-hero-h1">HAAR</h1>
            <span className="hr-hero-rule" />
            <p className="hr-hero-tagline">Kleurspecialist &nbsp;·&nbsp; Dames snitten &nbsp;·&nbsp; Antwerpen</p>
            <div className="hr-hero-actions">
              <a className="hr-btn hr-btn-white" href={WA_LINK} target="_blank" rel="noopener noreferrer">
                Stuur een bericht
              </a>
              <a className="hr-btn hr-btn-outline" href="#diensten">
                Diensten
              </a>
            </div>
          </div>

          {/* Right: image placeholder */}
          <div className="hr-hero-right">
            <div className="hr-hero-right-img">Foto salon</div>
            <div className="hr-hero-name">Quality over quantity</div>
            <div className="hr-scroll-indicator">
              <div className="hr-scroll-indicator-line" />
              <div className="hr-scroll-indicator-text">Scroll</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statement ── */}
      <div className="hr-statement">
        <div className="hr-statement-inner">
          <p className="hr-statement-text">
            Passion for <em>craftmanship.</em>
            <br />
            Quality over quantity.
          </p>
          <div className="hr-statement-divider" />
          <div className="hr-statement-sub">
            HAAR<br />
            Shana Verberck
          </div>
        </div>
      </div>

      {/* ── Diensten ── */}
      <section className="hr-diensten" id="diensten">
        <div className="hr-container">
          <div className="hr-diensten-header">
            <div>
              <div className="hr-label">Tarieven</div>
              <h2>
                Alles voor
                <br />
                <em>jouw haar</em>
              </h2>
            </div>
            <p>
              Elk kapsel en elke kleur is maatwerk. Onderstaande prijzen zijn
              richtprijzen — de exacte prijs bespreken we via WhatsApp op basis
              van haarlengte, haartype en gewenst resultaat.
            </p>
          </div>

          <div className="hr-diensten-grid">
            {/* Kleurbehandelingen */}
            <div className="hr-dienst-cat">
              <div className="hr-dienst-cat-title">Kleurbehandelingen</div>
              {[
                { name: "Highlights partieel", sub: "Gedeeltelijke highlights voor glans en diepte", price: "v.a. €55" },
                { name: "Balayage", sub: "Handgeschilderde kleurovergang — ultiem natuurlijk", price: "v.a. €90" },
                { name: "Volledig kleuren", sub: "Wortels tot punten, één egale kleur", price: "v.a. €65" },
                { name: "Toning & glossing", sub: "Kleurcorrectie en intensieve glansbehandeling", price: "v.a. €40" },
                { name: "Kleurbehandeling op maat", sub: "Volledig persoonlijk advies en uitvoering", price: "op aanvraag" },
              ].map((d) => (
                <div className="hr-dienst-row" key={d.name}>
                  <div>
                    <div className="hr-dienst-name">{d.name}</div>
                    <div className="hr-dienst-sub">{d.sub}</div>
                  </div>
                  <div className="hr-dienst-price">{d.price}</div>
                </div>
              ))}
              <p className="hr-dienst-note">
                Prijzen zijn richtprijzen. Exacte prijs na overleg via WhatsApp.
              </p>
            </div>

            {/* Dames snitten */}
            <div className="hr-dienst-cat">
              <div className="hr-dienst-cat-title">Dames Snitten</div>
              {[
                { name: "Wassen & knippen", sub: "Inclusief föhnen en afwerking", price: "v.a. €38" },
                { name: "Knippen & föhnen", sub: "Knippen op maat + stijlen naar wens", price: "v.a. €52" },
                { name: "Olaplex behandeling", sub: "Herstel van beschadigd haar van binnenuit", price: "v.a. €45" },
                { name: "Keratine behandeling", sub: "Anti-kroesbehandeling voor glad, glanzend haar", price: "v.a. €120" },
                { name: "Opsteken / bruid", sub: "Opsteekkapsels voor bruiloften en speciale gelegenheden", price: "op aanvraag" },
              ].map((d) => (
                <div className="hr-dienst-row" key={d.name}>
                  <div>
                    <div className="hr-dienst-name">{d.name}</div>
                    <div className="hr-dienst-sub">{d.sub}</div>
                  </div>
                  <div className="hr-dienst-price">{d.price}</div>
                </div>
              ))}
              <p className="hr-dienst-note">
                Afspraken uitsluitend via WhatsApp. Geen online booking beschikbaar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking notice / Stappenplan ── */}
      <section className="hr-booking-notice" id="boeken">
        <div className="hr-booking-notice-inner">
          <div className="hr-booking-notice-left">
            <div className="hr-label" style={{ color: "rgba(0,0,0,0.35)" }}>Nieuwe boekingsprocedure</div>
            <h2>
              Online boeken is
              <br />
              <em>niet meer beschikbaar</em>
            </h2>
            <p>
              Vanaf nu verloopt alles via WhatsApp. Zo kan ik je persoonlijk
              begeleiden en de juiste verwachtingen scheppen — zeker voor
              kleurbehandelingen waarbij een goede voorbereiding alles maakt.
            </p>
            <div className="hr-booking-notice-cta">
              <a
                className="hr-btn hr-btn-dark"
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Stuur een bericht
              </a>
            </div>
          </div>

          <div className="hr-booking-notice-right">
            <div className="hr-stappenplan-title">Stappenplan nieuwe kleurklanten</div>
            {[
              {
                title: "Foto eigen haar",
                desc: "Maak een foto van je haar in indirect daglicht — eerlijk en zonder filter.",
              },
              {
                title: "Inspiratiefoto",
                desc: "Zoek een inspiratiefoto op die aansluit bij wat je voor ogen hebt.",
              },
              {
                title: "Kleurgeschiedenis",
                desc: "Geef een overzicht van je kleurgeschiedenis van de afgelopen 2 jaar.",
              },
              {
                title: "Stuur via WhatsApp",
                desc: "Stuur alles samen op via WhatsApp — foto's, inspiratie en kleurhistoriek.",
              },
              {
                title: "Telefonisch contact",
                desc: "Ik neem telefonisch contact op om alles te bespreken voor we een afspraak inplannen.",
              },
            ].map((stap, i) => (
              <div className="hr-stap" key={stap.title}>
                <div className="hr-stap-num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="hr-stap-content-title">{stap.title}</div>
                  <div className="hr-stap-content-desc">{stap.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature kleurtechnieken ── */}
      <section className="hr-kleur">
        <div className="hr-container">
          <div className="hr-kleur-header">
            <div className="hr-label" style={{ justifyContent: "center" }}>Signature kleurtechnieken</div>
            <h2>
              Haar dat <em>meegroeit</em>
              <br />
              met jou.
            </h2>
            <p>
              Geen zichtbare uitgroeilijn, geen maandelijks bijwerken.
              Kleuren die duurzaam zijn — voor jou én je haar.
            </p>
          </div>

          <div className="hr-kleur-grid">
            {[
              {
                num: "01",
                title: "Geen zichtbare uitgroei",
                desc: "Door de seamless blend-techniek vloeit de kleur zo natuurlijk over dat er geen harde uitgroeilijn ontstaat.",
              },
              {
                num: "02",
                title: "5 tot 8 maanden onderhoud",
                desc: "Dankzij de duurzame aanpak hoef je minder vaak terug. Minder behandelingen, minder belasting voor je haar.",
              },
              {
                num: "03",
                title: "Persoonlijk productadvies",
                desc: "Na elke behandeling krijg je concrete tips voor thuis, afgestemd op jouw haartype en kleur.",
              },
            ].map((k) => (
              <div className="hr-kleur-card" key={k.num}>
                <div className="hr-kleur-card-num">{k.num}</div>
                <div className="hr-kleur-card-title">{k.title}</div>
                <p className="hr-kleur-card-desc">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="hr-about" id="over">
        <div className="hr-container">
          <div className="hr-about-grid">
            <div className="hr-about-img-wrap">
              <div className="hr-about-img">Foto Shana</div>
            </div>
            <div className="hr-about-content">
              <div className="hr-label">Over Shana Verberck</div>
              <h2>
                Meer dan
                <br />
                een <em>kapsalon</em>
              </h2>
              <p>
                HAAR is geen doorsnee salon. Hier krijg jij de volledige aandacht —
                geen overvolle agenda, geen gehaast. Ik luister naar wat je wil
                en werk van daaruit, met oog voor kwaliteit en duurzaamheid.
              </p>
              <p>
                Met jarenlange expertise in kleurtechnieken richt ik me op resultaten
                die meegroeien met jou. Van een subtiele balayage tot een gedurfde
                kleurbehandeling — altijd met passie voor het vak.
              </p>
              <div className="hr-about-quote">
                &ldquo;Passion for craftmanship. Quality over quantity.&rdquo;
              </div>
              <a
                className="hr-btn hr-btn-outline"
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hr-cta">
        <div className="hr-container">
          <div className="hr-cta-inner">
            <div>
              <h2>
                Klaar voor een
                <br />
                <em>nieuwe look?</em>
              </h2>
              <p>Stuur een bericht via WhatsApp — ik begeleid je stap voor stap.</p>
            </div>
            <a
              className="hr-btn hr-btn-dark"
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="hr-contact" id="contact">
        <div className="hr-container">
          <div className="hr-contact-grid">
            <div>
              <h2>Kom <em>langs</em></h2>
              <div className="hr-contact-info">
                <div>
                  <div className="hr-contact-block-label">Adres</div>
                  <div className="hr-contact-block-val">
                    Antwerpen
                  </div>
                </div>
                <div>
                  <div className="hr-contact-block-label">Boeken</div>
                  <div className="hr-contact-block-val">
                    Uitsluitend via WhatsApp.<br />
                    Geen online booking beschikbaar.
                  </div>
                </div>
                <div>
                  <div className="hr-contact-block-label">Openingsuren</div>
                  <div className="hr-hours-grid">
                    <span className="hr-hours-day">Maandag</span>
                    <span className="hr-hours-closed">Gesloten</span>
                    <span className="hr-hours-day">Dinsdag</span>
                    <span className="hr-hours-time">09:00 - 18:00</span>
                    <span className="hr-hours-day">Woensdag</span>
                    <span className="hr-hours-time">09:00 - 18:00</span>
                    <span className="hr-hours-day">Donderdag</span>
                    <span className="hr-hours-time">09:00 - 20:00</span>
                    <span className="hr-hours-day">Vrijdag</span>
                    <span className="hr-hours-time">09:00 - 18:00</span>
                    <span className="hr-hours-day">Zaterdag</span>
                    <span className="hr-hours-time">09:00 - 16:00</span>
                    <span className="hr-hours-day">Zondag</span>
                    <span className="hr-hours-closed">Gesloten</span>
                  </div>
                </div>
                <div>
                  <div className="hr-contact-block-label">Social</div>
                  <div className="hr-contact-block-val">
                    <a href="https://www.facebook.com/p/HAAR-100028140203724/" target="_blank" rel="noopener noreferrer">
                      Facebook: HAAR
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp box */}
            <div className="hr-contact-wa-box">
              <div className="hr-contact-wa-label">Afspraak maken</div>
              <h3>
                Boeken via
                <br />
                <em>WhatsApp</em>
              </h3>
              <p>
                Stuur je foto&apos;s, kleurgeschiedenis en inspiratie via WhatsApp.
                Ik neem daarna telefonisch contact op om alles te bespreken
                en een afspraak in te plannen.
              </p>
              <a
                className="hr-wa-btn"
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hr-footer">
        <div className="hr-container">
          <div className="hr-footer-inner">
            <div className="hr-footer-logo">HAAR</div>
            <nav className="hr-footer-links">
              <a href="#diensten">Diensten</a>
              <a href="#over">Over</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="hr-footer-copy">
              &copy; {new Date().getFullYear()} HAAR &mdash; Shana Verberck
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
