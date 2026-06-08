"use client";
import { useEffect } from "react";
import Link from "next/link";

const BASE = "/templates/hippique-v2";

export default function OverOnsPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".hi-r, .hi-r-left, .hi-r-right, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hi-page">
      {/* HERO */}
      <section
        style={{
          paddingTop: "var(--nav-h)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          overflow: "hidden",
          background: "var(--black)",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 70% 40%, rgba(237,110,33,0.07) 0%, transparent 55%)",
          }}
        />
        <div className="hi-container" style={{ padding: "0 80px 90px", position: "relative", zIndex: 2 }}>
          <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>Ons verhaal</span>
          <h1
            className="hi-r hi-r-d1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px,6.5vw,88px)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 760,
            }}
          >
            Passie voor<br />
            <em style={{ fontStyle: "italic", color: "var(--orange)" }}>hippisch vastgoed</em><br />
            al 15 jaar.
          </h1>
        </div>
      </section>

      {/* INTRO SPLIT */}
      <section className="hi-split">
        <div className="hi-split-img hi-img-reveal hi-r-scale">
          <div
            className="hi-split-img-placeholder"
            style={{
              background: "linear-gradient(135deg, #0c0e10 0%, #1a1e22 50%, #0a0e12 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 160, height: 160,
                borderRadius: "50%",
                border: "1px solid rgba(237,110,33,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 56, color: "var(--orange)", fontWeight: 400, opacity: 0.7 }}>HI</span>
            </div>
          </div>
        </div>
        <div className="hi-split-content" style={{ background: "var(--anthracite)" }}>
          <span className="hi-accent-line" />
          <span className="hi-label hi-r">Wie zijn wij</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
            Het meest gespecialiseerde<br /><em>hippisch vastgoedkantoor</em>
          </h2>
          <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 16, lineHeight: 1.85, marginTop: 20 }}>
            Hippique.immo werd opgericht vanuit een diepgaande passie voor zowel paarden als vastgoed. Wij begrijpen de behoeften van kopers en verkopers in de hippische sector — omdat wij er zelf deel van uitmaken.
          </p>
          <p className="hi-r hi-r-d3" style={{ color: "var(--stone)", fontSize: 16, lineHeight: 1.85, marginTop: 16 }}>
            Onze expertise bestrijkt de volledige Benelux en Noord-Frankrijk. Van een pensionstalling in de Kempen tot een stoeterij in Normandië — wij kennen elke nuance van de markt.
          </p>
          <div style={{ marginTop: 32 }} className="hi-r hi-r-d4">
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange hi-btn-arrow">Maak kennis met ons team</Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <span className="hi-label hi-r">Onze waarden</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, marginBottom: 56 }}>
            Wat ons <em>onderscheidt</em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--border-dark)",
              border: "1px solid var(--border-dark)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {[
              { word: "Expertise", desc: "15 jaar exclusieve specialisatie in hippisch en landelijk vastgoed." },
              { word: "Eerlijkheid", desc: "Geen holle beloften. Wij geven u een eerlijk, onderbouwd advies." },
              { word: "Discretie", desc: "Uw privacy en die van uw transactie worden te allen tijde beschermd." },
              { word: "Netwerk", desc: "Een uniek internationaal netwerk van hippische professionals en kopers." },
            ].map((v, i) => (
              <div key={v.word} className={`hi-stat-item hi-r hi-r-d${i + 1}`} style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 36, color: "var(--orange)", marginBottom: 12, fontWeight: 300 }}>
                  {v.word}
                </div>
                <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="hi-section" style={{ background: "var(--anthracite)" }}>
        <div className="hi-container">
          <span className="hi-label hi-r">Het team</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, marginBottom: 48 }}>
            Uw <em>vertrouwde adviseurs</em>
          </h2>
          <div className="hi-team-grid">
            {[
              { name: "Hoofdkantoor",  role: "Verrebroek (Beveren-Waas)", init: "HI" },
              { name: "Specialisatie", role: "Hippisch & landelijk vastgoed", init: "H" },
              { name: "Bereik",        role: "Benelux & Noord-Frankrijk", init: "B" },
              { name: "IPI 504.064",   role: "BIV erkend makelaar", init: "BIV" },
            ].map((t, i) => (
              <div key={t.name} className={`hi-team-card hi-r hi-r-d${i + 1}`}>
                <div className="hi-team-img" style={{ background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--orange)", fontWeight: 400, opacity: 0.5 }}>
                    {t.init}
                  </span>
                </div>
                <div className="hi-team-body">
                  <div className="hi-team-name">{t.name}</div>
                  <div className="hi-team-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container" style={{ maxWidth: 800 }}>
          <span className="hi-label hi-r">Onze geschiedenis</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, marginBottom: 56 }}>
            Een parcours<br /><em>van 15 jaar</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { year: "2009", event: "Oprichting van Hippique.immo als eerste gespecialiseerd hippisch vastgoedkantoor in België." },
              { year: "2012", event: "Uitbreiding naar Nederland. Eerste internationale transacties succesvol afgerond." },
              { year: "2016", event: "Opening van kantoor in Noord-Frankrijk. Focus op Normandisch stoeterij-vastgoed." },
              { year: "2019", event: "Bereiken van de 200e succesvolle transactie. Erkenning als marktleider in de sector." },
              { year: "2022", event: "Lancering van uitgebreid online platform met premium zoekmodule voor hippisch vastgoed." },
              { year: "2025", event: "Meer dan 340 transacties — en elke dag groeien wij verder in expertise en netwerk." },
            ].map((item, i) => (
              <div
                key={item.year}
                className={`hi-r hi-r-d${(i % 3) + 1}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 32,
                  padding: "28px 0",
                  borderBottom: "1px solid var(--border-dark)",
                  alignItems: "start",
                }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--orange)", fontWeight: 400 }}>
                  {item.year}
                </div>
                <p style={{ fontSize: 16, color: "var(--stone)", lineHeight: 1.7 }}>{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="hi-section-sm" style={{ background: "var(--anthracite)", borderTop: "1px solid var(--border-dark)" }}>
        <div className="hi-container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="hi-label-stone hi-r">Onze partners</span>
          </div>
          <div className="hi-partners-strip hi-r">
            {["De Brabander Sport", "Strohandel Roose", "Krismar Horse Trucks", "DM.Equine", "De Bosdreef", "Feral Group"].map((name) => (
              <div key={name} className="hi-partner-item" style={{ padding: "8px 20px", border: "1px solid var(--border-dark)", borderRadius: 2, fontFamily: "var(--font-display)", fontSize: 16, color: "var(--stone)", whiteSpace: "nowrap" }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <h2 className="hi-cta-band-title hi-r">Werken we samen?</h2>
          <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline hi-r hi-r-d1">Neem contact op →</Link>
        </div>
      </div>
    </div>
  );
}
