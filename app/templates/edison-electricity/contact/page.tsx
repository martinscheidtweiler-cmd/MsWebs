"use client";

import { useState } from "react";
import Link from "next/link";
import EdisonNav from "../EdisonNav";
import EdisonFooter from "../EdisonFooter";
import "../edison.css";

const BASE = "/templates/edison-electricity";

const WERK_TYPES = [
  "Elektriciteitskast herstellen / vernieuwen",
  "Storing opsporen en herstellen",
  "Renovatie elektriciteit",
  "Nieuwbouw elektrische installatie",
  "Verlichting plaatsen",
  "Noodinterventie",
  "Laadpaal / EV",
  "Andere",
];

const WHY_ITEMS = [
  "32+ jaar vakmanschap en ervaring",
  "Familiebedrijf — persoonlijke aanpak",
  "24/7 beschikbaar voor noodgevallen",
  "5,0/5 op Google Reviews",
  "Correcte en transparante prijzen",
  "Nette uitvoering, geen rommel achter",
  "Snel ter plaatse in Nijlen en omgeving",
  "Erkend en verzekerd elektricien",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ naam: "", telefoon: "", email: "", typeWerk: "", bericht: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <EdisonNav />

      {/* Page hero */}
      <div className="edPageHero">
        <div className="edPageHeroInner">
          <div className="edBreadcrumb">
            <Link href={BASE}>Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <h1 className="edPageHeroTitle">Contact & offerte aanvragen</h1>
          <p className="edPageHeroSub">
            Stel uw vraag, vraag een offerte aan of plan een bezoek ter plaatse.
            Wij reageren zo snel mogelijk — bij nood 24/7 bereikbaar.
          </p>
        </div>
      </div>

      <section className="edSection">
        <div className="edSectionInner">
          <div className="edContactGrid">

            {/* Form */}
            <div>
              {sent ? (
                <div className="edSuccessBox">
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <h3>Bericht ontvangen!</h3>
                  <p>Bedankt voor uw aanvraag. Wij nemen zo snel mogelijk contact met u op — normaal gezien binnen de 24 uur op werkdagen.</p>
                  <button
                    className="edBtnPrimary"
                    style={{ marginTop: 20, border: "none", cursor: "pointer" }}
                    onClick={() => { setSent(false); setForm({ naam: "", telefoon: "", email: "", typeWerk: "", bericht: "" }); }}
                  >
                    Nieuw bericht sturen
                  </button>
                </div>
              ) : (
                <div className="edFormBox">
                  <div className="edFormTitle">Stuur ons een bericht</div>
                  <form onSubmit={handleSubmit}>
                    <div className="edFormRow">
                      <div className="edFormGroup">
                        <label htmlFor="naam">Naam *</label>
                        <input id="naam" name="naam" type="text" required placeholder="Uw naam" value={form.naam} onChange={handleChange} />
                      </div>
                      <div className="edFormGroup">
                        <label htmlFor="telefoon">Telefoon *</label>
                        <input id="telefoon" name="telefoon" type="tel" required placeholder="+32 ..." value={form.telefoon} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="edFormGroup">
                      <label htmlFor="email">E-mailadres</label>
                      <input id="email" name="email" type="email" placeholder="uw@email.be" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="edFormGroup">
                      <label htmlFor="typeWerk">Type werk *</label>
                      <select id="typeWerk" name="typeWerk" required value={form.typeWerk} onChange={handleChange}>
                        <option value="">Kies een categorie...</option>
                        {WERK_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                    <div className="edFormGroup">
                      <label htmlFor="bericht">Beschrijf uw situatie *</label>
                      <textarea id="bericht" name="bericht" required rows={5} placeholder="Beschrijf zo duidelijk mogelijk wat er aan de hand is of wat u nodig heeft..." value={form.bericht} onChange={handleChange} />
                    </div>
                    <button type="submit" className="edFormSubmit">
                      ⚡ Bericht versturen
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="edContactSide">
              {/* Emergency */}
              <div className="edEmergencyBox">
                <h3>🚨 Noodservice 24/7</h3>
                <p>Bij dringende elektrische problemen zijn wij dag en nacht bereikbaar.</p>
                <a href="tel:+32000000000" className="edEmergencyNum">+32 (0)00 00 00 00</a>
                <a href="tel:+32000000000" className="edEmergencyBtn">Bel nu voor noodservice</a>
              </div>

              {/* Contact info */}
              <div className="edContactBox">
                <div className="edContactBoxTitle">Contactgegevens</div>
                <div className="edContactRow">
                  <div className="edContactIcon">📍</div>
                  <div className="edContactText">
                    <strong>Werkgebied</strong>
                    Nijlen en ruime omgeving<br />(Antwerpen, Lier, Heist-op-den-Berg, ...)
                  </div>
                </div>
                <div className="edContactRow">
                  <div className="edContactIcon">📞</div>
                  <div className="edContactText">
                    <strong>Telefoon</strong>
                    <a href="tel:+32000000000" style={{ color: "#f5c518" }}>+32 (0)00 00 00 00</a>
                  </div>
                </div>
                <div className="edContactRow">
                  <div className="edContactIcon">✉</div>
                  <div className="edContactText">
                    <strong>E-mail</strong>
                    info@edisonelectricity.be
                  </div>
                </div>
                <div className="edContactRow">
                  <div className="edContactIcon">🕐</div>
                  <div className="edContactText">
                    <strong>Openingsuren</strong>
                    Ma – Vr: 08:00 – 18:00<br />
                    Za: op afspraak<br />
                    <span style={{ color: "#f5c518", fontWeight: 700 }}>24/7 noodservice</span>
                  </div>
                </div>
              </div>

              {/* Why Edison */}
              <div className="edContactBox">
                <div className="edContactBoxTitle">Waarom Edison Electricity?</div>
                <div className="edWhyGrid">
                  {WHY_ITEMS.map((w) => (
                    <div key={w} className="edWhyItem">{w}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EdisonFooter />
    </>
  );
}
