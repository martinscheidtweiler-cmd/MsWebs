"use client";

import { useState } from "react";
import Link from "next/link";
import VlsNav from "../VlsNav";
import VlsFooter from "../VlsFooter";
import "../vls.css";

const BASE = "/templates/vls-verwarming";

const WERK_TYPES = [
  "Ketelonderhoud / keuring",
  "Verwarmingspanne / depannage",
  "Nieuwe ketel plaatsen",
  "Sanitaire herstelling",
  "Badkamerrenovatie",
  "Airco plaatsen",
  "Waterbehandelingssysteem",
  "Ventilatie",
  "Andere",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    naam: "", telefoon: "", email: "", typeWerk: "", bericht: "",
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
      <VlsNav />

      <div className="vlsPageHero">
        <div className="vlsPageHeroInner">
          <div className="vlsBreadcrumb">
            <Link href={BASE}>Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <h1 className="vlsPageHeroTitle">Contact &<br />offerte aanvragen</h1>
          <p className="vlsPageHeroSub">
            Stel uw vraag of vraag een vrijblijvende offerte aan.
            Sven neemt zo snel mogelijk contact met u op.
          </p>
        </div>
      </div>

      <section className="vlsContactSection">
        <div className="vlsContactInner">

          {/* ── FORM ── */}
          <div>
            {sent ? (
              <div className="vlsSuccessBox">
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3>Bericht ontvangen!</h3>
                <p>
                  Bedankt voor uw aanvraag. Sven neemt zo snel mogelijk
                  contact met u op.
                </p>
                <button
                  className="vlsBtnPrimary"
                  style={{ marginTop: 24, border: "none", cursor: "pointer" }}
                  onClick={() => {
                    setSent(false);
                    setForm({ naam: "", telefoon: "", email: "", typeWerk: "", bericht: "" });
                  }}
                >
                  Nieuw bericht sturen
                </button>
              </div>
            ) : (
              <div className="vlsFormBox">
                <div className="vlsFormTitle">Stuur een bericht</div>
                <form onSubmit={handleSubmit}>
                  <div className="vlsFormRow">
                    <div className="vlsFormGroup">
                      <label htmlFor="naam">Naam *</label>
                      <input
                        id="naam" name="naam" type="text" required
                        placeholder="Uw naam"
                        value={form.naam} onChange={handleChange}
                      />
                    </div>
                    <div className="vlsFormGroup">
                      <label htmlFor="telefoon">Telefoon *</label>
                      <input
                        id="telefoon" name="telefoon" type="tel" required
                        placeholder="+32 ..."
                        value={form.telefoon} onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="vlsFormGroup">
                    <label htmlFor="email">E-mailadres</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="uw@email.be"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                  <div className="vlsFormGroup">
                    <label htmlFor="typeWerk">Type werk *</label>
                    <select
                      id="typeWerk" name="typeWerk" required
                      value={form.typeWerk} onChange={handleChange}
                    >
                      <option value="">Kies een categorie...</option>
                      {WERK_TYPES.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                  <div className="vlsFormGroup">
                    <label htmlFor="bericht">Beschrijf uw situatie *</label>
                    <textarea
                      id="bericht" name="bericht" required rows={5}
                      placeholder="Beschrijf zo duidelijk mogelijk wat er aan de hand is of wat u nodig heeft..."
                      value={form.bericht} onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="vlsFormSubmit">
                    Bericht versturen →
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="vlsContactSide">

            <div className="vlsEmergBox">
              <h3>🔥 Depannage nodig?</h3>
              <p>
                Verwarmingspanne of sanitair probleem?
                Bel Sven rechtstreeks op zijn gsm.
              </p>
              <a href="tel:+32498232625" className="vlsEmergNum">
                +32 498 23 26 25
              </a>
              <a href="tel:+32498232625" className="vlsEmergBtn">
                Bel nu voor depannage
              </a>
            </div>

            <div className="vlsInfoBox">
              <div className="vlsInfoBoxTitle">Contactgegevens</div>
              <div className="vlsInfoRow">
                <div className="vlsInfoIcon">📍</div>
                <div className="vlsInfoText">
                  <strong>Adres</strong>
                  Zwaluwenlaan 7, 2560 Nijlen
                </div>
              </div>
              <div className="vlsInfoRow">
                <div className="vlsInfoIcon">📞</div>
                <div className="vlsInfoText">
                  <strong>Telefoon</strong>
                  <a href="tel:+32498232625">+32 498 23 26 25</a>
                </div>
              </div>
              <div className="vlsInfoRow">
                <div className="vlsInfoIcon">✉</div>
                <div className="vlsInfoText">
                  <strong>E-mail</strong>
                  <a href="mailto:vls-verwarming@outlook.be">vls-verwarming@outlook.be</a>
                </div>
              </div>
              <div className="vlsInfoRow">
                <div className="vlsInfoIcon">🕐</div>
                <div className="vlsInfoText">
                  <strong>Openingsuren</strong>
                  Ma – Vr: 08:00 – 17:00<br />
                  Za: op afspraak
                </div>
              </div>
            </div>

            <div className="vlsInfoBox">
              <div className="vlsInfoBoxTitle">Werkgebied</div>
              <div className="vlsInfoText" style={{ lineHeight: 1.9 }}>
                Nijlen · Lier · Heist-op-den-Berg<br />
                Duffel · Berlaar · Bonheiden<br />
                Mechelen · Antwerpen en ruime omgeving
              </div>
            </div>

          </div>
        </div>
      </section>

      <VlsFooter />
    </>
  );
}
