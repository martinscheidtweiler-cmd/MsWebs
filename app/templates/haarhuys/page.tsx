"use client";

import { useState } from "react";
import "./haarhuys.css";

export default function HaarhuysDemoPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="hh-root">

      {/* ── Navigation ── */}
      <nav className="hh-nav">
        <div className="hh-nav-inner">
          <a href="/templates/haarhuys" className="hh-nav-logo">'t <span>Haarhuys</span></a>
          <ul className="hh-nav-links">
            <li><a href="/templates/haarhuys/over">Over ons</a></li>
            <li><a href="/templates/haarhuys/diensten">Diensten</a></li>
            <li><a href="/templates/haarhuys/webshop">Webshop</a></li>
            <li><a href="/templates/haarhuys/headspa">Headspa</a></li>
            <li><a href="/templates/haarhuys/contact">Contact</a></li>
          </ul>
          <div className="hh-nav-right">
            <a href="/templates/haarhuys/contact" className="hh-nav-cta">Afspraak</a>
            <button
              className="hh-hamburger"
              aria-label="Menu"
              onClick={() => setMobileOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <nav className={`hh-mobile-menu${mobileOpen ? " open" : ""}`}>
        <a href="/templates/haarhuys/over" onClick={() => setMobileOpen(false)}>Over ons</a>
        <a href="/templates/haarhuys/diensten" onClick={() => setMobileOpen(false)}>Diensten</a>
        <a href="/templates/haarhuys/webshop" onClick={() => setMobileOpen(false)}>Webshop</a>
        <a href="/templates/haarhuys/headspa" onClick={() => setMobileOpen(false)}>Headspa</a>
        <a href="/templates/haarhuys/contact" onClick={() => setMobileOpen(false)}>Contact & Afspraak</a>
      </nav>

      {/* ── Hero ── */}
      <section className="hh-hero">
        <div className="hh-hero-grid" />
        <div className="hh-hero-vline" />
        <div className="hh-hero-fade" />
        <div className="hh-hero-content">
          <p className="hh-hero-tag">
            <span className="hh-hero-tag-line" />
            Erkend Krullenkapper — Nijlen &amp; Olen
          </p>
          <h1 className="hh-hero-title">
            't Haar<em>huys</em>
          </h1>
          <p className="hh-hero-body">
            Kapsalon voor alle haartypes met specialisatie in krullend haar en
            natuurlijke verzorging. Twee locaties in de regio Antwerpen.
          </p>
          <div className="hh-hero-actions">
            <a href="/templates/haarhuys/contact" className="hh-btn hh-btn-primary">
              Afspraak maken
            </a>
            <a href="/templates/haarhuys/diensten" className="hh-btn hh-btn-outline-white">
              Onze diensten
            </a>
          </div>
        </div>
        <div className="hh-scroll-indicator">
          <div className="hh-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Service strip ── */}
      <section>
        <div className="hh-svc-strip">
          <a href="/templates/haarhuys/diensten" className="hh-svc-tile">
            <div className="hh-svc-tile-num">01</div>
            <div className="hh-svc-tile-title">Kapsalon</div>
            <div className="hh-svc-tile-desc">Knippen, kleuren en stylen voor dames, heren en kinderen.</div>
            <span className="hh-svc-tile-arrow">↗</span>
          </a>
          <a href="/templates/haarhuys/diensten" className="hh-svc-tile">
            <div className="hh-svc-tile-num">02</div>
            <div className="hh-svc-tile-title">Krullenkapper</div>
            <div className="hh-svc-tile-desc">Erkend specialist in krullend haar via de Curly Girl Method.</div>
            <span className="hh-svc-tile-arrow">↗</span>
          </a>
          <a href="/templates/haarhuys/headspa" className="hh-svc-tile">
            <div className="hh-svc-tile-num">03</div>
            <div className="hh-svc-tile-title">Headspa</div>
            <div className="hh-svc-tile-desc">Ontspannende hoofdhuidmassage en intensieve haarverzorging.</div>
            <span className="hh-svc-tile-arrow">↗</span>
          </a>
          <a href="/templates/haarhuys/webshop" className="hh-svc-tile">
            <div className="hh-svc-tile-num">04</div>
            <div className="hh-svc-tile-title">Webshop</div>
            <div className="hh-svc-tile-desc">Professionele producten online. Gratis verzending vanaf €60.</div>
            <span className="hh-svc-tile-arrow">↗</span>
          </a>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="hh-about-teaser">
        <div className="hh-container">
          <div className="hh-about-teaser-grid">
            <div className="hh-about-teaser-img">
              <div className="hh-about-teaser-main hh-img-placeholder">Foto salon</div>
              <div className="hh-about-teaser-accent" />
              <div className="hh-about-teaser-stat">
                <div className="hh-stat-big">10+</div>
                <div className="hh-stat-small">Jaar<br />ervaring</div>
              </div>
            </div>
            <div className="hh-about-teaser-content">
              <p className="hh-eyebrow">Over 't Haarhuys</p>
              <h2>Meer dan een kapsalon</h2>
              <p>
                't Haarhuys is de referentie voor haarverzorging in Nijlen en omstreken.
                Erkend krullenkapper in België, gespecialiseerd in alle haartypes met
                bijzondere aandacht voor krullend haar.
              </p>
              <p>
                Wij werken uitsluitend met haarvriendelije, professionele producten van
                toonaangevende merken. Kwaliteit en duurzaamheid staan centraal in
                alles wat we doen.
              </p>
              <div className="hh-about-teaser-locs">
                <div className="hh-about-loc">
                  <div className="hh-about-loc-name">Nijlen</div>
                  <div className="hh-about-loc-addr">
                    Woeringenstraat 11A<br />2560 Nijlen
                  </div>
                </div>
                <div className="hh-about-loc">
                  <div className="hh-about-loc-name">Olen</div>
                  <div className="hh-about-loc-addr">
                    Gerheiden 50<br />2250 Olen
                  </div>
                </div>
              </div>
              <a href="/templates/haarhuys/over" className="hh-btn hh-btn-outline">
                Meer over ons
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured services ── */}
      <section className="hh-featured">
        <div className="hh-container">
          <div className="hh-featured-header">
            <div>
              <p className="hh-eyebrow">Wat we doen</p>
              <h2>Onze <em style={{ fontStyle: "italic", color: "var(--hh-gold)" }}>diensten</em></h2>
            </div>
            <p>
              Van een klassieke knipbeurt tot een volledige krullenbehandeling.
              Altijd persoonlijk, altijd op maat.
            </p>
          </div>
          <div className="hh-featured-grid">
            <a href="/templates/haarhuys/diensten" className="hh-feat-card">
              <div className="hh-feat-card-num">01</div>
              <div className="hh-feat-card-title">Knippen &amp; Stylen</div>
              <div className="hh-feat-card-desc">
                Professioneel knippen en stylen voor alle haartypes. Dames, heren
                en kinderen welkom.
              </div>
              <div className="hh-feat-card-price">Vanaf €25</div>
              <span className="hh-feat-card-link">↗</span>
            </a>
            <a href="/templates/haarhuys/diensten" className="hh-feat-card">
              <div className="hh-feat-card-num">02</div>
              <div className="hh-feat-card-title">Curly Method</div>
              <div className="hh-feat-card-desc">
                Erkend curly hair specialist. Droog knippen en behandelen voor
                maximale krul-definitie.
              </div>
              <div className="hh-feat-card-price">Vanaf €55</div>
              <span className="hh-feat-card-link">↗</span>
            </a>
            <a href="/templates/haarhuys/headspa" className="hh-feat-card">
              <div className="hh-feat-card-num">03</div>
              <div className="hh-feat-card-title">Headspa</div>
              <div className="hh-feat-card-desc">
                Diepgaande hoofdhuidbehandeling met hydromassage en biologische
                serums voor herstel en ontspanning.
              </div>
              <div className="hh-feat-card-price">Vanaf €65</div>
              <span className="hh-feat-card-link">↗</span>
            </a>
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <a
              href="/templates/haarhuys/diensten"
              className="hh-btn hh-btn-outline-white"
              style={{ marginTop: 16 }}
            >
              Alle diensten bekijken
            </a>
          </div>
        </div>
      </section>

      {/* ── Booking strip ── */}
      <div className="hh-booking-strip">
        <div className="hh-container">
          <div className="hh-booking-strip-inner">
            <div>
              <h3>Klaar voor uw volgende afspraak?</h3>
              <p>Boek eenvoudig online. Bevestiging per e-mail direct na boeking.</p>
            </div>
            <a href="/templates/haarhuys/contact" className="hh-booking-strip-btn">
              Afspraak maken →
            </a>
          </div>
        </div>
      </div>

      {/* ── Brands bar ── */}
      <div className="hh-brands-bar">
        <div className="hh-container">
          <p className="hh-brands-label">Officieel verdeler van</p>
          <div className="hh-brands-row">
            {["Joico", "CurlSys", "Oright", "Jean Paul Myné", "Great Lengths"].map(b => (
              <span key={b} className="hh-brand-item">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <HaarhyusFooter activePage="" />
    </div>
  );
}

export function HaarhyusFooter({ activePage }: { activePage: string }) {
  return (
    <footer className="hh-footer">
      <div className="hh-container">
        <div className="hh-footer-top">
          <div>
            <a href="/templates/haarhuys" className="hh-footer-logo">'t <span>Haarhuys</span></a>
            <p className="hh-footer-tagline">
              Erkend krullenkapper in België.<br />
              Kapsalon voor alle haartypes in Nijlen &amp; Olen.<br />
              Renka styling bv · BE0474396019
            </p>
            <div className="hh-footer-social">
              <a href="https://www.facebook.com/HetHaarhuys" target="_blank" rel="noreferrer">Fb</a>
              <a href="https://www.instagram.com/hethaarhuysnijlen/" target="_blank" rel="noreferrer">Ig</a>
              <a href="https://www.tiktok.com/@hethaarhuyskrullenkapper" target="_blank" rel="noreferrer">Tk</a>
            </div>
          </div>
          <div className="hh-footer-col">
            <div className="hh-footer-col-title">Diensten</div>
            <ul>
              <li><a href="/templates/haarhuys/diensten">Kapsalon</a></li>
              <li><a href="/templates/haarhuys/diensten">Krullenkapper</a></li>
              <li><a href="/templates/haarhuys/headspa">Headspa</a></li>
              <li><a href="/templates/haarhuys/diensten">Workshop</a></li>
            </ul>
          </div>
          <div className="hh-footer-col">
            <div className="hh-footer-col-title">Navigatie</div>
            <ul>
              <li><a href="/templates/haarhuys/over">Over ons</a></li>
              <li><a href="/templates/haarhuys/webshop">Webshop</a></li>
              <li><a href="/templates/haarhuys/contact">Contact</a></li>
            </ul>
          </div>
          <div className="hh-footer-col">
            <div className="hh-footer-col-title">Contact</div>
            <ul>
              <li><a href="tel:034112884">03 411 28 84</a></li>
              <li><a href="mailto:info@hethaarhuys.be">info@hethaarhuys.be</a></li>
              <li><a href="/templates/haarhuys/contact" style={{ color: "var(--hh-gold)" }}>Afspraak maken →</a></li>
            </ul>
          </div>
        </div>
        <div className="hh-footer-bottom">
          <span>© {new Date().getFullYear()} 't Haarhuys · Renka styling bv</span>
          <span>
            <a href="#">Privacybeleid</a> ·{" "}
            <a href="#">Annuleringsbeleid</a> ·{" "}
            <a href="#">Algemene voorwaarden</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
