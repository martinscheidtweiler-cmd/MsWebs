"use client";

import { useState } from "react";
import "./kapper-nijlen.css";

export default function KapperNijlenPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="kn-root">

      {/* ── Navigation ── */}
      <nav className="kn-nav">
        <div className="kn-nav-inner">
          <div className="kn-logo">
            <div className="kn-logo-main">
              KAPSALON <span>NIJLEN</span>
            </div>
            <div className="kn-logo-sub">Imad &amp; Mahmoud</div>
          </div>
          <ul className="kn-nav-links">
            <li><a href="#diensten">Diensten</a></li>
            <li><a href="#over">Over ons</a></li>
            <li><a href="#tarieven">Tarieven</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="kn-nav-right">
            <a className="kn-nav-book" href="#contact">
              Geen Afspraak Nodig
            </a>
            <button
              className="kn-hamburger"
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`kn-mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#diensten" onClick={() => setMenuOpen(false)}>Diensten</a>
          <a href="#over" onClick={() => setMenuOpen(false)}>Over ons</a>
          <a href="#tarieven" onClick={() => setMenuOpen(false)}>Tarieven</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ color: "var(--kn-red)", marginTop: 8 }}
          >
            ✓ Geen afspraak nodig — loop gewoon binnen!
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="kn-hero">
        <div className="kn-hero-bg" />
        <div className="kn-hero-stripes" />
        <div className="kn-hero-inner">

          {/* Left: copy */}
          <div>
            <div className="kn-hero-eyebrow">
              <div className="kn-hero-eyebrow-bar" />
              <span className="kn-hero-eyebrow-text">Gemeentestraat 16/b · 2560 Nijlen</span>
            </div>
            <h1 className="kn-hero-h1">
              KAPSALON
              <br />
              <span className="red">NIJLEN</span>
            </h1>
            <div className="kn-hero-names">
              <span>Imad</span>
              <span className="kn-hero-names-amp">&amp;</span>
              <span>Mahmoud</span>
            </div>
            <div className="kn-hero-divider" />
            <p className="kn-hero-body">
              Al meer dan 6 jaar de vaste kapper van Nijlen voor scherpe fades,
              strakke baarden en coole kinderkapsels.
            </p>
            <div className="kn-hero-walkin">
              <span className="kn-hero-walkin-icon">✓</span>
              <span><strong>Geen afspraak nodig</strong> — gewoon binnenlopen!</span>
            </div>
            <div className="kn-hero-actions">
              <a className="kn-btn kn-btn-red" href="#contact">
                Bekijk openingsuren
              </a>
              <a className="kn-btn kn-btn-white" href="#diensten">
                Onze diensten
              </a>
            </div>
            <div className="kn-hero-score">
              <span className="kn-stars">★★★★★</span>
              <span className="kn-star-text">
                <strong>4,5 / 5</strong> &nbsp;·&nbsp; 311 Google reviews
              </span>
            </div>
          </div>

          {/* Right: visual */}
          <div className="kn-hero-visual">
            <div className="kn-hero-img-main">Foto kapsalon</div>
            <div className="kn-hero-badge-wrap">
              <div className="kn-hero-badge">
                <div className="kn-hero-badge-num">6+</div>
                <div className="kn-hero-badge-label">Jaar</div>
              </div>
              <div className="kn-hero-badge blue">
                <div className="kn-hero-badge-num">311</div>
                <div className="kn-hero-badge-label">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="kn-diensten" id="diensten">
        <div className="kn-container">
          <div className="kn-diensten-header">
            <div className="kn-label">Diensten</div>
            <h2 className="kn-diensten-title">WAT WE DOEN</h2>
            <p className="kn-diensten-sub">
              Bij Kapsalon Nijlen ben je aan het juiste adres voor alles wat met haar en baard te maken heeft.
              Geen afspraak nodig — gewoon binnenlopen.
            </p>
          </div>
          <div className="kn-diensten-grid">

            {/* Knippen */}
            <div className="kn-dienst-card">
              <div className="kn-dienst-num">01</div>
              <div className="kn-dienst-icon">✂</div>
              <h3 className="kn-dienst-title">Knippen</h3>
              <p className="kn-dienst-desc">
                Van klassieke taper en skin fade tot moderne textuurkapsels. We knippen heren, dames en kinderen.
                Elk kapsel wordt nauwkeurig afgewerkt met tondeuse en schaar.
              </p>
              <ul className="kn-dienst-list">
                <li>Skin fade &amp; taper fade</li>
                <li>Klassiek herenkапsel</li>
                <li>Damesknippen</li>
                <li>Wassen &amp; föhnen</li>
              </ul>
              <div className="kn-dienst-price">Vanaf €12</div>
            </div>

            {/* Baard */}
            <div className="kn-dienst-card">
              <div className="kn-dienst-num">02</div>
              <div className="kn-dienst-icon">⚔</div>
              <h3 className="kn-dienst-title">Baard</h3>
              <p className="kn-dienst-desc">
                Een strakke baard maakt het verschil. We trimmen, scheren en contouren elke baardstijl —
                van stoppelbaard tot volle baard. Inclusief warme handdoek bij scheren.
              </p>
              <ul className="kn-dienst-list">
                <li>Baard trimmen &amp; scheren</li>
                <li>Contour &amp; lijnen bijwerken</li>
                <li>Hot towel shave</li>
                <li>Knippen + baard combo</li>
              </ul>
              <div className="kn-dienst-price">Vanaf €12</div>
            </div>

            {/* Kinderen */}
            <div className="kn-dienst-card">
              <div className="kn-dienst-num">03</div>
              <div className="kn-dienst-icon">★</div>
              <h3 className="kn-dienst-title">Kinderen</h3>
              <p className="kn-dienst-desc">
                Voor de kleine klanten nemen we alle tijd. Geduldig, rustig en vriendelijk — ook voor
                kinderen die voor het eerst naar de kapper komen. Speciaal kindertarief onder 12 jaar.
              </p>
              <ul className="kn-dienst-list">
                <li>Kinderkapsels (alle leeftijden)</li>
                <li>Eerste kapselbeurt</li>
                <li>Speels &amp; modern</li>
                <li>Snel &amp; kindvriendelijk</li>
              </ul>
              <div className="kn-dienst-price">Vanaf €12</div>
            </div>

            {/* Behandelingen */}
            <div className="kn-dienst-card">
              <div className="kn-dienst-num">04</div>
              <div className="kn-dienst-icon">◈</div>
              <h3 className="kn-dienst-title">Behandelingen</h3>
              <p className="kn-dienst-desc">
                Naast knippen bieden we ook haarbehandelingen aan voor kleur, glans en verzorging.
                Vraag gerust naar de mogelijkheden bij je bezoek.
              </p>
              <ul className="kn-dienst-list">
                <li>Highlights &amp; balayage</li>
                <li>Haar kleuren (volledig)</li>
                <li>Scalp behandeling</li>
                <li>Keratine behandeling</li>
              </ul>
              <div className="kn-dienst-price">Vanaf €35</div>
            </div>

          </div>

          {/* Walk-in banner */}
          <div className="kn-diensten-walkin">
            <span className="kn-diensten-walkin-check">✓</span>
            <div>
              <strong>Geen afspraak nodig</strong>
              <span> — kom gewoon binnen tijdens de openingsuren. Ma–Vr 09:00–18:30 · Za 09:00–17:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="kn-about" id="over">
        <div className="kn-container">
          <div className="kn-about-grid">
            <div className="kn-about-img-wrap">
              <div className="kn-about-img">Foto broers</div>
              <div className="kn-about-accent" />
              <div className="kn-about-yrs">
                <div className="kn-about-yrs-num">6+</div>
                <div className="kn-about-yrs-label">Jaar in Nijlen</div>
              </div>
            </div>
            <div className="kn-about-content">
              <div className="kn-label">Over ons</div>
              <h2>TWEE BROERS. ÉÉN MISSIE.</h2>
              <p>
                Kapsalon Nijlen staat voor vakmanschap, stijl en een warm
                welkom. Imad en Mahmoud runden dit kapsalon al meer dan 6 jaar
                als twee broers die dag in dag uit hetzelfde doel nastreven:
                elke klant het kapsel geven dat hij verdient.
              </p>
              <p>
                Na een volledige renovatie presenteren ze een vernieuwd modern
                concept — strak interieur, topproducten en de persoonlijke
                aanpak waarvoor ze al jaren bekend staan in Nijlen.
              </p>
              <div className="kn-about-names">
                <div className="kn-about-name">
                  <div className="kn-about-name-role">Kapper &amp; oprichter</div>
                  <div className="kn-about-name-name">IMAD</div>
                </div>
                <div className="kn-about-name">
                  <div className="kn-about-name-role">Kapper &amp; partner</div>
                  <div className="kn-about-name-name">MAHMOUD</div>
                </div>
              </div>
              <a className="kn-btn kn-btn-outline-dark" href="#contact">
                Bekijk openingsuren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="kn-pricing" id="tarieven">
        <div className="kn-container">
          <div className="kn-pricing-header">
            <div className="kn-label" style={{ justifyContent: "center" }}>Tarieven</div>
            <h2>EERLIJKE PRIJZEN</h2>
            <p>Alle prijzen inclusief BTW. Exacte prijs afhankelijk van complexiteit.</p>
          </div>
          <div className="kn-pricing-grid">
            <div className="kn-pricing-col">
              <div className="kn-pricing-col-title">KNIPPEN</div>
              {[
                ["Heren — knippen", "€18"],
                ["Heren — knippen + wassen", "€22"],
                ["Dames — knippen", "€28"],
                ["Kinderen (&lt;12 jaar)", "€12"],
                ["Fringe bijknippen", "€8"],
              ].map(([name, price]) => (
                <div className="kn-price-row" key={name}>
                  <span className="kn-price-row-name" dangerouslySetInnerHTML={{ __html: name }} />
                  <span className="kn-price-row-price">{price}</span>
                </div>
              ))}
            </div>
            <div className="kn-pricing-col">
              <div className="kn-pricing-col-title">BAARD &amp; STYLING</div>
              {[
                ["Baard trimmen", "€12"],
                ["Baard scheren + contour", "€18"],
                ["Knippen + baard", "€28"],
                ["Hot towel shave", "€20"],
                ["Complete look", "€35"],
              ].map(([name, price]) => (
                <div className="kn-price-row" key={name}>
                  <span className="kn-price-row-name">{name}</span>
                  <span className="kn-price-row-price">{price}</span>
                </div>
              ))}
            </div>
            <div className="kn-pricing-col">
              <div className="kn-pricing-col-title">BEHANDELINGEN</div>
              {[
                ["Highlights (partieel)", "v.a. €35"],
                ["Volledig kleuren", "v.a. €45"],
                ["Haar wassen + föhnen", "€15"],
                ["Scalp behandeling", "€25"],
                ["Keratine behandeling", "v.a. €80"],
              ].map(([name, price]) => (
                <div className="kn-price-row" key={name}>
                  <span className="kn-price-row-name">{name}</span>
                  <span className="kn-price-row-price">{price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="kn-pricing-note">
            Prijzen zijn indicatief. Afspraken via Fresha — annuleren graag 24u op voorhand.
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="kn-reviews" id="reviews">
        <div className="kn-container">
          <div className="kn-reviews-header">
            <div className="kn-label" style={{ justifyContent: "center" }}>Reviews</div>
            <h2>WAT KLANTEN ZEGGEN</h2>
            <div className="kn-reviews-score">
              <span className="kn-reviews-score-num">4,5</span>
              <span className="kn-reviews-score-stars">★★★★★</span>
              <span className="kn-reviews-score-total">311 Google-reviews</span>
            </div>
          </div>
          <div className="kn-reviews-grid">
            {[
              {
                initials: "BC",
                name: "Ben Cuypers",
                date: "3 maanden geleden",
                text: "Super tevreden! Imad en Mahmoud zijn echte professionals. Altijd een fijn gesprek en het resultaat is telkens top. Ik kom al jaren hier en blijf terugkomen.",
              },
              {
                initials: "SS",
                name: "Sophietje S.",
                date: "5 maanden geleden",
                text: "Geweldige kapper voor mijn zoontje. Geduldig, vriendelijk en snel klaar. Zeker een aanrader voor kinderen die niet graag naar de kapper gaan!",
              },
              {
                initials: "MV",
                name: "Michael V.",
                date: "1 maand geleden",
                text: "Beste kapper van Nijlen, twijfel er niet aan. Strak resultaat, eerlijke prijs en altijd een warm welkom. Boek via Fresha en je zit meteen goed.",
              },
            ].map((r) => (
              <div className="kn-review-card" key={r.name}>
                <div className="kn-review-stars">★★★★★</div>
                <p className="kn-review-text">&ldquo;{r.text}&rdquo;</p>
                <div className="kn-review-author">
                  <div className="kn-review-avatar">{r.initials}</div>
                  <div>
                    <div className="kn-review-name">{r.name}</div>
                    <div className="kn-review-date">{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section className="kn-cta">
        <div className="kn-container">
          <div className="kn-cta-inner">
            <div>
              <h2>KLAAR VOOR EEN NIEUWE LOOK?</h2>
              <p>Geen afspraak nodig — gewoon binnenlopen tijdens de openingsuren.</p>
            </div>
            <a className="kn-cta-btn" href="#contact">
              Openingsuren bekijken →
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="kn-contact" id="contact">
        <div className="kn-container">
          <div className="kn-contact-grid">
            <div>
              <h2>BEZOEK ONS</h2>
              <div className="kn-contact-info">
                <div>
                  <div className="kn-contact-block-label">Adres</div>
                  <div className="kn-contact-block-val">
                    Gemeentestraat 16/b<br />2560 Nijlen
                  </div>
                </div>
              <div>
                  <div className="kn-contact-block-label">Telefoon</div>
                  <div className="kn-contact-block-val">
                    <a href="tel:0488761110">0488 76 11 10</a>
                  </div>
                </div>
                <div>
                  <div className="kn-contact-block-label">Website</div>
                  <div className="kn-contact-block-val">
                    <a href="https://kapsalon-nijlen.be" target="_blank" rel="noopener noreferrer">
                      kapsalon-nijlen.be
                    </a>
                  </div>
                </div>
                <div>
                  <div className="kn-contact-block-label">Openingsuren</div>
                  <div className="kn-hours-grid">
                    <span className="kn-hours-day">Ma</span>
                    <span className="kn-hours-time">09:00 – 18:30</span>
                    <span className="kn-hours-day">Di</span>
                    <span className="kn-hours-time">09:00 – 18:30</span>
                    <span className="kn-hours-day">Wo</span>
                    <span className="kn-hours-time">09:00 – 18:30</span>
                    <span className="kn-hours-day">Do</span>
                    <span className="kn-hours-time">09:00 – 18:30</span>
                    <span className="kn-hours-day">Vr</span>
                    <span className="kn-hours-time">09:00 – 18:30</span>
                    <span className="kn-hours-day">Za</span>
                    <span className="kn-hours-time">09:00 – 17:00</span>
                    <span className="kn-hours-day">Zo</span>
                    <span className="kn-hours-closed">Gesloten</span>
                  </div>
                </div>
                <div>
                  <div className="kn-contact-block-label">Volg ons</div>
                  <div className="kn-contact-block-val">
                    <a href="https://www.facebook.com/KapsalonNijlen" target="_blank" rel="noopener noreferrer">
                      Facebook: KapsalonNijlen
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="kn-contact-map">
              Gemeentestraat 16/b · Nijlen
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="kn-footer">
        <div className="kn-container">
          <div className="kn-footer-inner">
            <div>
              <div className="kn-footer-logo-main">KAPSALON <span>NIJLEN</span></div>
              <div className="kn-footer-logo-sub">Imad &amp; Mahmoud</div>
            </div>
            <nav className="kn-footer-links">
              <a href="#diensten">Diensten</a>
              <a href="#tarieven">Tarieven</a>
              <a href="#reviews">Reviews</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="kn-footer-copy">
              © {new Date().getFullYear()} Kapsalon Nijlen — BTW BE0666.838.079
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
