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
              Kapsalon <span>Nijlen</span>
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
            <a
              className="kn-nav-book"
              href="https://www.fresha.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Afspraak Maken
            </a>
            <button
              className="kn-hamburger"
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className={`kn-mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#diensten" onClick={() => setMenuOpen(false)}>Diensten</a>
          <a href="#over" onClick={() => setMenuOpen(false)}>Over ons</a>
          <a href="#tarieven" onClick={() => setMenuOpen(false)}>Tarieven</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            href="https://www.fresha.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{ color: "var(--kn-gold)", marginTop: 8 }}
          >
            → Afspraak Maken
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="kn-hero">
        <div className="kn-hero-bg" />
        <div className="kn-hero-lines" />
        <div className="kn-hero-inner">
          {/* Left: copy */}
          <div>
            <div className="kn-hero-tag">Kapsalon Nijlen</div>
            <h1 className="kn-hero-h1">
              Imad
              <em>&amp; Mahmoud</em>
            </h1>
            <p className="kn-hero-body">
              Twee broers, één passie. Al meer dan 6 jaar dé kapper van Nijlen
              voor een perfect kapsel, strakke baard of kinderkapper. Modern
              concept, persoonlijke aanpak.
            </p>
            <div className="kn-hero-actions">
              <a
                className="kn-btn kn-btn-dark"
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boek via Fresha
              </a>
              <a className="kn-btn kn-btn-outline" href="#diensten">
                Onze diensten
              </a>
            </div>
            <div className="kn-hero-stars">
              <span className="kn-stars">★★★★★</span>
              <span className="kn-star-text">
                <strong>4,5 / 5</strong> — 311 Google reviews
              </span>
            </div>
          </div>

          {/* Right: visual placeholder */}
          <div className="kn-hero-visual">
            <div className="kn-hero-img-main">Foto kapsalon</div>
            <div className="kn-hero-badges">
              <div className="kn-hero-badge">
                <div className="kn-hero-badge-num">6+</div>
                <div className="kn-hero-badge-label">Jaar ervaring</div>
              </div>
              <div className="kn-hero-badge">
                <div className="kn-hero-badge-num">311</div>
                <div className="kn-hero-badge-label">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services strip ── */}
      <section className="kn-services-strip" id="diensten">
        <div className="kn-services-grid">
          {[
            {
              num: "01",
              title: "Knippen",
              desc: "Heren-, dames- en kinderkapsels. Nauwkeurig afgewerkt met klassieke of moderne stijl.",
            },
            {
              num: "02",
              title: "Baard",
              desc: "Strakke baard, contour shave of volledig baardonderhoud. Inclusief warme handdoek.",
            },
            {
              num: "03",
              title: "Kinderen",
              desc: "Speciaal voor de kleine klanten. Geduldig, snel en op een kindvriendelijke manier.",
            },
            {
              num: "04",
              title: "Behandelingen",
              desc: "Haarbehandelingen, highlights en speciale stylingservices op aanvraag.",
            },
          ].map((s) => (
            <div className="kn-svc-item" key={s.num}>
              <div className="kn-svc-num">{s.num}</div>
              <div className="kn-svc-title">{s.title}</div>
              <p className="kn-svc-desc">{s.desc}</p>
            </div>
          ))}
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
              <h2>
                Twee broers,
                <br />
                één kapsalon.
              </h2>
              <p>
                Kapsalon Nijlen werd meer dan zes jaar geleden opgericht door
                de broers Imad en Mahmoud. Wat begon als een droom groeide uit
                tot de vaste kapper van heel Nijlen en omgeving.
              </p>
              <p>
                Na een grondige renovatie presenteren we ons vernieuwd modern
                concept: strak interieur, topproducten en de persoonlijke
                service waarvoor we altijd bekend stonden. Elk bezoek voelt als
                thuis.
              </p>
              <div className="kn-about-names">
                <div className="kn-about-name">
                  <div className="kn-about-name-role">Kapper &amp; oprichter</div>
                  <div className="kn-about-name-name">Imad</div>
                </div>
                <div className="kn-about-name">
                  <div className="kn-about-name-role">Kapper &amp; partner</div>
                  <div className="kn-about-name-name">Mahmoud</div>
                </div>
              </div>
              <a
                className="kn-btn kn-btn-outline-dark"
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Maak een afspraak
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="kn-pricing" id="tarieven">
        <div className="kn-container">
          <div className="kn-pricing-header">
            <div className="kn-label" style={{ justifyContent: "center" }}>
              Tarieven
            </div>
            <h2>Eerlijke prijzen</h2>
            <p>Alle prijzen zijn inclusief BTW. Exacte prijs kan variëren naargelang de complexiteit.</p>
          </div>
          <div className="kn-pricing-grid">
            {/* Knippen */}
            <div className="kn-pricing-col">
              <div className="kn-pricing-col-title">Knippen</div>
              {[
                ["Heren — knippen", "€18"],
                ["Heren — knippen + wassen", "€22"],
                ["Dames — knippen", "€28"],
                ["Kinderen (&lt;12 jaar)", "€12"],
                ["Fringe bijknippen", "€8"],
              ].map(([name, price]) => (
                <div className="kn-price-row" key={name}>
                  <span
                    className="kn-price-row-name"
                    dangerouslySetInnerHTML={{ __html: name }}
                  />
                  <span className="kn-price-row-price">{price}</span>
                </div>
              ))}
            </div>

            {/* Baard & Styling */}
            <div className="kn-pricing-col">
              <div className="kn-pricing-col-title">Baard &amp; Styling</div>
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

            {/* Behandelingen */}
            <div className="kn-pricing-col">
              <div className="kn-pricing-col-title">Behandelingen</div>
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
            Prijzen zijn indicatief. Neem contact op voor een exacte prijsopgave bij speciale diensten.
            Afspraken via Fresha — annuleren graag 24 uur op voorhand.
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="kn-reviews" id="reviews">
        <div className="kn-container">
          <div className="kn-reviews-header">
            <div className="kn-label" style={{ justifyContent: "center" }}>
              Reviews
            </div>
            <h2>Wat klanten zeggen</h2>
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
              <h2>Klaar voor een nieuwe look?</h2>
              <p>Boek eenvoudig online via Fresha — in minder dan 2 minuten geregeld.</p>
            </div>
            <a
              className="kn-cta-btn"
              href="https://www.fresha.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Afspraak Maken via Fresha →
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="kn-contact" id="contact">
        <div className="kn-container">
          <div className="kn-contact-grid">
            <div>
              <h2>Bezoek ons</h2>
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
                    <a
                      href="https://kapsalon-nijlen.be"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                    <a
                      href="https://www.facebook.com/KapsalonNijlen"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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

      {/* ── Footer ── */}
      <footer className="kn-footer">
        <div className="kn-container">
          <div className="kn-footer-inner">
            <div>
              <div className="kn-footer-logo-main">
                Kapsalon <span>Nijlen</span>
              </div>
              <div className="kn-footer-logo-sub">Imad &amp; Mahmoud</div>
            </div>
            <nav className="kn-footer-links">
              <a href="#diensten">Diensten</a>
              <a href="#tarieven">Tarieven</a>
              <a href="#reviews">Reviews</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="kn-footer-copy">
              © {new Date().getFullYear()} Kapsalon Nijlen — Gemeentestraat 16/b, 2560 Nijlen
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
