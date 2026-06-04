"use client";

import { useState } from "react";
import "../haarhuys.css";
import { HaarhyusFooter } from "../page";

export default function ContactPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="hh-root">
      <nav className="hh-nav">
        <div className="hh-nav-inner">
          <a href="/templates/haarhuys" className="hh-nav-logo">'t <span>Haarhuys</span></a>
          <ul className="hh-nav-links">
            <li><a href="/templates/haarhuys/over">Over ons</a></li>
            <li><a href="/templates/haarhuys/diensten">Diensten</a></li>
            <li><a href="/templates/haarhuys/webshop">Webshop</a></li>
            <li><a href="/templates/haarhuys/headspa">Headspa</a></li>
            <li><a href="/templates/haarhuys/contact" className="hh-active">Contact</a></li>
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
        <a href="/templates/haarhuys/headspa" onClick={() => setMobileOpen(false)}>Headspa</a>
        <a href="/templates/haarhuys/contact" className="hh-active" onClick={() => setMobileOpen(false)}>Contact & Afspraak</a>
      </nav>

      <header className="hh-page-header">
        <div className="hh-page-header-grid" />
        <div className="hh-page-header-line" />
        <div className="hh-container hh-page-header-content">
          <div className="hh-breadcrumb">
            <a href="/templates/haarhuys">Home</a>
            <span>›</span>
            <span>Contact</span>
          </div>
          <h1>Contact &amp; <em>Afspraak</em></h1>
          <p className="hh-page-header-sub">
            Maak online een afspraak of stuur ons een bericht. We antwoorden zo snel mogelijk.
          </p>
        </div>
      </header>

      {/* Main contact section */}
      <section className="hh-contact-main">
        <div className="hh-container">
          <div className="hh-contact-grid">

            {/* Info */}
            <div className="hh-contact-info">
              <h2>Bereikbaarheid</h2>
              <div className="hh-contact-blocks">

                <div className="hh-contact-block">
                  <div className="hh-contact-block-label">Telefoon</div>
                  <div className="hh-contact-block-content">
                    <a href="tel:034112884">03 411 28 84</a>
                  </div>
                </div>

                <div className="hh-contact-block">
                  <div className="hh-contact-block-label">E-mail</div>
                  <div className="hh-contact-block-content">
                    <a href="mailto:info@hethaarhuys.be">info@hethaarhuys.be</a>
                  </div>
                </div>

                <div className="hh-contact-block">
                  <div className="hh-contact-block-label">Openingsuren</div>
                  <div className="hh-hours-table">
                    <div>
                      <div className="hh-hours-col-title">Nijlen</div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Ma &amp; Di</span><span className="hh-hr-time hh-hr-closed">Gesloten</span></div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Wo – Vr</span><span className="hh-hr-time">Op afspraak</span></div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Za</span><span className="hh-hr-time">Op afspraak</span></div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Zo</span><span className="hh-hr-time hh-hr-closed">Gesloten</span></div>
                    </div>
                    <div>
                      <div className="hh-hours-col-title">Olen</div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Ma</span><span className="hh-hr-time hh-hr-closed">Gesloten</span></div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Di – Vr</span><span className="hh-hr-time">Op afspraak</span></div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Za</span><span className="hh-hr-time">Op afspraak</span></div>
                      <div className="hh-hr-row"><span className="hh-hr-day">Zo</span><span className="hh-hr-time hh-hr-closed">Gesloten</span></div>
                    </div>
                  </div>
                </div>

                <div className="hh-contact-block">
                  <div className="hh-contact-block-label">Annuleringsbeleid</div>
                  <div className="hh-cancel-policy">
                    <div className="hh-cancel-policy-title">Annuleren</div>
                    <div className="hh-cancel-row"><span>Meer dan 24u op voorhand</span><span>Gratis</span></div>
                    <div className="hh-cancel-row"><span>Minder dan 12u op voorhand</span><span>50% van de dienst</span></div>
                    <div className="hh-cancel-row"><span>Niet opdagen</span><span>100% van de dienst</span></div>
                  </div>
                </div>

                <div className="hh-contact-block">
                  <div className="hh-contact-block-label">Sociale media</div>
                  <div className="hh-contact-block-content">
                    <a href="https://www.facebook.com/HetHaarhuys" target="_blank" rel="noreferrer">Facebook</a>
                    {" · "}
                    <a href="https://www.instagram.com/hethaarhuysnijlen/" target="_blank" rel="noreferrer">Instagram</a>
                    {" · "}
                    <a href="https://www.tiktok.com/@hethaarhuyskrullenkapper" target="_blank" rel="noreferrer">TikTok</a>
                  </div>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="hh-form-wrap">
              <div className="hh-booking-box">
                <div className="hh-booking-box-text">
                  <h4>Direct online boeken</h4>
                  <p>Directe bevestiging per e-mail na boeking.</p>
                </div>
                <a
                  href="https://www.hethaarhuys.be/afspraak-maken"
                  target="_blank"
                  rel="noreferrer"
                  className="hh-booking-box-btn"
                >
                  Online reserveren →
                </a>
              </div>

              <h3>Stuur een bericht</h3>
              <p className="hh-form-sub">
                Voor vragen over diensten, producten of informatie over een behandeling.
                We antwoorden binnen 1 werkdag.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="hh-form-row">
                  <div className="hh-form-group">
                    <label className="hh-form-label">Voornaam</label>
                    <input className="hh-form-input" type="text" placeholder="Voornaam" required />
                  </div>
                  <div className="hh-form-group">
                    <label className="hh-form-label">Achternaam</label>
                    <input className="hh-form-input" type="text" placeholder="Achternaam" required />
                  </div>
                </div>
                <div className="hh-form-group">
                  <label className="hh-form-label">E-mailadres</label>
                  <input className="hh-form-input" type="email" placeholder="uw@email.be" required />
                </div>
                <div className="hh-form-group">
                  <label className="hh-form-label">Telefoonnummer</label>
                  <input className="hh-form-input" type="tel" placeholder="04XX XX XX XX" />
                </div>
                <div className="hh-form-group">
                  <label className="hh-form-label">Onderwerp</label>
                  <select className="hh-form-select">
                    <option value="">Selecteer een onderwerp</option>
                    <option>Afspraak informatie</option>
                    <option>Krullenadvies</option>
                    <option>Headspa</option>
                    <option>Workshop</option>
                    <option>Webshop / bestelling</option>
                    <option>Andere vraag</option>
                  </select>
                </div>
                <div className="hh-form-group">
                  <label className="hh-form-label">Uw bericht</label>
                  <textarea className="hh-form-textarea" placeholder="Schrijf hier uw vraag of bericht…" required />
                </div>
                <button type="submit" className="hh-form-submit">
                  {submitted ? "Bericht verzonden ✓" : "Bericht verzonden"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="hh-locations-section">
        <div className="hh-container">
          <div className="hh-locations-header">
            <p className="hh-eyebrow">Waar u ons vindt</p>
            <h2>Twee locaties</h2>
          </div>
          <div className="hh-locations-cards">
            <div className="hh-loc-card">
              <div className="hh-loc-map hh-img-placeholder">Google Maps — Nijlen</div>
              <div className="hh-loc-details">
                <div>
                  <div className="hh-loc-address-label">Locatie 01</div>
                  <div className="hh-loc-address-name">Nijlen</div>
                  <div className="hh-loc-address-text">
                    Woeringenstraat 11A<br />
                    2560 Nijlen<br /><br />
                    <a
                      href="https://maps.google.com/?q=Woeringenstraat+11A+2560+Nijlen"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--hh-gold)", textDecoration: "underline", textUnderlineOffset: "3px", fontSize: 12 }}
                    >
                      Route plannen →
                    </a>
                  </div>
                </div>
                <div>
                  <div className="hh-loc-address-label">Openingsuren</div>
                  <div className="hh-hr-row"><span className="hh-hr-day">Wo – Vr</span><span className="hh-hr-time">Op afspraak</span></div>
                  <div className="hh-hr-row"><span className="hh-hr-day">Za</span><span className="hh-hr-time">Op afspraak</span></div>
                  <div className="hh-hr-row"><span className="hh-hr-day">Ma, Di, Zo</span><span className="hh-hr-time hh-hr-closed">Gesloten</span></div>
                </div>
              </div>
            </div>
            <div className="hh-loc-card">
              <div className="hh-loc-map hh-img-placeholder">Google Maps — Olen</div>
              <div className="hh-loc-details">
                <div>
                  <div className="hh-loc-address-label">Locatie 02</div>
                  <div className="hh-loc-address-name">Olen</div>
                  <div className="hh-loc-address-text">
                    Gerheiden 50<br />
                    2250 Olen<br /><br />
                    <a
                      href="https://maps.google.com/?q=Gerheiden+50+2250+Olen"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--hh-gold)", textDecoration: "underline", textUnderlineOffset: "3px", fontSize: 12 }}
                    >
                      Route plannen →
                    </a>
                  </div>
                </div>
                <div>
                  <div className="hh-loc-address-label">Openingsuren</div>
                  <div className="hh-hr-row"><span className="hh-hr-day">Di – Vr</span><span className="hh-hr-time">Op afspraak</span></div>
                  <div className="hh-hr-row"><span className="hh-hr-day">Za</span><span className="hh-hr-time">Op afspraak</span></div>
                  <div className="hh-hr-row"><span className="hh-hr-day">Ma, Zo</span><span className="hh-hr-time hh-hr-closed">Gesloten</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HaarhyusFooter activePage="contact" />
    </div>
  );
}
