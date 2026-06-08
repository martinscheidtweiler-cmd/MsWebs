"use client";

import { useState } from "react";
import Link from "next/link";
import MHiNav from "../MHiNav";
import MHiFooter from "../MHiFooter";
import "../mhi.css";

const BASE = "/templates/alba-modern";

function Foto({ label }: { label?: string }) {
  return <div className="mFoto">{label ?? "foto"}</div>;
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    naam: "", email: "", telefoon: "", onderwerp: "", bericht: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <MHiNav />

      <div className="mWrap">
        <div className="mBreadcrumb">
          <Link href={BASE}>Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 6 }}>Contact</h1>
        <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 32 }}>
          Heeft u vragen of wilt u een bezichtiging aanvragen? Wij reageren binnen 24 uur.
        </p>

        <div className="mContactGrid">
          {/* Form */}
          <div>
            {sent ? (
              <div className="mSuccessBox">
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <h3>Bericht ontvangen!</h3>
                <p>Bedankt voor uw bericht. Wij nemen zo spoedig mogelijk contact met u op.</p>
                <button
                  className="mBtn mBtn-primary"
                  style={{ marginTop: 20 }}
                  onClick={() => { setSent(false); setForm({ naam: "", email: "", telefoon: "", onderwerp: "", bericht: "" }); }}
                >
                  Nieuw bericht
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mFormRow">
                  <div className="mFormGroup">
                    <label htmlFor="naam">Naam *</label>
                    <input id="naam" name="naam" type="text" required placeholder="Uw naam" value={form.naam} onChange={handleChange} />
                  </div>
                  <div className="mFormGroup">
                    <label htmlFor="email">E-mail *</label>
                    <input id="email" name="email" type="email" required placeholder="uw@email.be" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="mFormRow">
                  <div className="mFormGroup">
                    <label htmlFor="telefoon">Telefoon</label>
                    <input id="telefoon" name="telefoon" type="tel" placeholder="+32 ..." value={form.telefoon} onChange={handleChange} />
                  </div>
                  <div className="mFormGroup">
                    <label htmlFor="onderwerp">Onderwerp *</label>
                    <select id="onderwerp" name="onderwerp" required value={form.onderwerp} onChange={handleChange}>
                      <option value="">Kies een onderwerp</option>
                      <option value="aankoop">Aankoop pand</option>
                      <option value="verkoop">Verkoop pand</option>
                      <option value="schatting">Gratis schatting</option>
                      <option value="bezoek">Bezichtiging aanvragen</option>
                      <option value="huur">Verhuur / huurder</option>
                      <option value="andere">Andere</option>
                    </select>
                  </div>
                </div>

                <div className="mFormGroup">
                  <label htmlFor="bericht">Bericht *</label>
                  <textarea id="bericht" name="bericht" required rows={6} placeholder="Schrijf hier uw bericht..." value={form.bericht} onChange={handleChange} />
                </div>

                <button type="submit" className="mFormSubmit">Bericht versturen</button>
              </form>
            )}
          </div>

          {/* Info block */}
          <div className="mContactInfo">
            <h3>Onze gegevens</h3>

            <div className="mContactInfoRow">
              <div className="mContactInfoIcon">📍</div>
              <div className="mContactInfoText">
                <strong>Adres</strong>
                Kerkstraat 42<br />3000 Leuven, België
              </div>
            </div>

            <div className="mContactInfoRow">
              <div className="mContactInfoIcon">📞</div>
              <div className="mContactInfoText">
                <strong>Telefoon</strong>
                +32 (0)16 00 11 22
              </div>
            </div>

            <div className="mContactInfoRow">
              <div className="mContactInfoIcon">✉</div>
              <div className="mContactInfoText">
                <strong>E-mail</strong>
                info@alba-immo.be
              </div>
            </div>

            <div className="mContactInfoRow">
              <div className="mContactInfoIcon">🕐</div>
              <div className="mContactInfoText">
                <strong>Openingsuren</strong>
                Ma – Vr: 09:00 – 18:00<br />
                Za: 10:00 – 14:00<br />
                Zo: Gesloten
              </div>
            </div>

            <div className="mMap">
              <Foto label="kaart" />
              <div className="mMapPin">📍 Alba Immo – Leuven</div>
            </div>
          </div>
        </div>
      </div>

      <MHiFooter />
    </>
  );
}
