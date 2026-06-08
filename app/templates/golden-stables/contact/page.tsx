"use client";

import { useState } from "react";
import GsNav from "../GsNav";
import GsFooter from "../GsFooter";
import "../golden.css";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    onderwerp: "",
    bericht: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <GsNav alwaysDark />

      {/* Page Hero */}
      <div className="gsPageHero">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
          alt="Contact hero"
          className="gsPageHeroBg"
        />
        <div className="gsPageHeroOverlay" />
        <div className="gsPageHeroContent">
          <p className="gsPageHeroBreadcrumb">
            <span>Home</span> / Contact
          </p>
          <h1 className="gsPageHeroTitle">Contact</h1>
        </div>
      </div>

      {/* Contact Section */}
      <section className="gsSection">
        <div className="gsContainer">
          <div className="gsContactGrid">

            {/* Left: info */}
            <div className="gsContactInfo">
              <span className="gsSectionTag">Kom langs</span>
              <h2 className="gsSectionTitle" style={{ textAlign: "left", marginTop: "0.5rem" }}>
                Laat van u horen
              </h2>
              <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
                Heeft u vragen over onze hengsten, fokmerries of beschikbare paarden?
                Wij staan voor u klaar. U kunt ons bereiken via telefoon, e-mail of
                door onderstaand formulier in te vullen. Wij reageren binnen 24 uur.
              </p>

              <div className="gsContactBlock">
                <div className="gsContactIcon">📍</div>
                <div>
                  <strong>Adres</strong>
                  <p>Stalweg 12, 3001 Leuven, België</p>
                </div>
              </div>

              <div className="gsContactBlock">
                <div className="gsContactIcon">📞</div>
                <div>
                  <strong>Telefoon</strong>
                  <p>+32 (0)16 23 45 67</p>
                </div>
              </div>

              <div className="gsContactBlock">
                <div className="gsContactIcon">✉️</div>
                <div>
                  <strong>E-mail</strong>
                  <p>info@goldenstables.be</p>
                </div>
              </div>

              <div className="gsContactBlock">
                <div className="gsContactIcon">🕐</div>
                <div>
                  <strong>Openingsuren</strong>
                  <p>Ma – Za: 08:00 – 18:00<br />Zo: op afspraak</p>
                </div>
              </div>

              {/* Fake map embed */}
              <div className="gsMapEmbed">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80"
                  alt="Kaart Golden Stables"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="gsMapPin">📍 Golden Stables</div>
              </div>
            </div>

            {/* Right: form */}
            <div className="gsContactFormWrap">
              {sent ? (
                <div className="gsFormSuccess">
                  <div className="gsFormSuccessIcon">✓</div>
                  <h3>Bericht ontvangen!</h3>
                  <p>
                    Bedankt voor uw bericht. Wij nemen zo spoedig mogelijk contact met u op,
                    uiterlijk binnen 24 uur.
                  </p>
                  <button
                    className="gsBtn"
                    onClick={() => { setSent(false); setForm({ naam: "", email: "", telefoon: "", onderwerp: "", bericht: "" }); }}
                  >
                    Nieuw bericht
                  </button>
                </div>
              ) : (
                <form className="gsContactForm" onSubmit={handleSubmit}>
                  <h3 className="gsFormTitle">Stuur ons een bericht</h3>

                  <div className="gsFormRow">
                    <div className="gsFormGroup">
                      <label htmlFor="naam">Naam *</label>
                      <input
                        id="naam"
                        name="naam"
                        type="text"
                        required
                        placeholder="Uw volledige naam"
                        value={form.naam}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="gsFormGroup">
                      <label htmlFor="email">E-mail *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="uw@email.be"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="gsFormRow">
                    <div className="gsFormGroup">
                      <label htmlFor="telefoon">Telefoon</label>
                      <input
                        id="telefoon"
                        name="telefoon"
                        type="tel"
                        placeholder="+32 ..."
                        value={form.telefoon}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="gsFormGroup">
                      <label htmlFor="onderwerp">Onderwerp *</label>
                      <select
                        id="onderwerp"
                        name="onderwerp"
                        required
                        value={form.onderwerp}
                        onChange={handleChange}
                      >
                        <option value="">Kies een onderwerp</option>
                        <option value="hengsten">Hengsten / sperma</option>
                        <option value="fokkerij">Fokkerij</option>
                        <option value="wedstrijdstal">Wedstrijdstal</option>
                        <option value="verkoop">Aankoop / verkoop</option>
                        <option value="bezoek">Stalbezoek plannen</option>
                        <option value="andere">Andere</option>
                      </select>
                    </div>
                  </div>

                  <div className="gsFormGroup">
                    <label htmlFor="bericht">Bericht *</label>
                    <textarea
                      id="bericht"
                      name="bericht"
                      required
                      rows={6}
                      placeholder="Schrijf hier uw bericht..."
                      value={form.bericht}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="gsBtn gsFormBtn">
                    Bericht versturen
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <GsFooter />
    </>
  );
}
