"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "../LangContext";

const BASE = "/templates/alba-immo";

export default function OverOnsPage() {
  const { t } = useLang();

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
          <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>{t.over_label}</span>
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
            {t.over_title1}<br />
            <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.over_title2}</em>
          </h1>
          <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 18, maxWidth: 560, marginTop: 24, lineHeight: 1.7 }}>
            {t.over_desc}
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="hi-section" style={{ background: "var(--anthracite)" }}>
        <div className="hi-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <span className="hi-label hi-r">{t.over_mission}</span>
              <p
                className="hi-r hi-r-d1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2.5vw, 32px)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: "-0.02em",
                  marginTop: 16,
                  color: "var(--warm-white)",
                }}
              >
                {t.over_missionText}
              </p>
            </div>
            <div
              style={{
                background: "var(--dark)",
                borderRadius: 2,
                border: "1px solid var(--border-dark)",
                padding: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 96, color: "var(--orange)", fontWeight: 400, opacity: 0.5 }}>HI</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <span className="hi-label hi-r">{t.over_values}</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, marginBottom: 56 }}>
            Hippique<em>.immo</em>
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
            {[t.over_val1, t.over_val2, t.over_val3, t.over_val4].map((val, i) => (
              <div key={val} className={`hi-stat-item hi-r hi-r-d${i + 1}`} style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 36, color: "var(--orange)", marginBottom: 12, fontWeight: 300 }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="hi-section" style={{ background: "var(--anthracite)" }}>
        <div className="hi-container">
          <span className="hi-label hi-r">{t.over_teamLabel}</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, marginBottom: 48 }}>
            {t.over_teamTitle}
          </h2>
          <div className="hi-team-grid">
            {[
              { name: "Hoofdkantoor",  role: "Verrebroek (Beveren-Waas)", init: "HI" },
              { name: "Specialisatie", role: "Hippisch & landelijk vastgoed", init: "H" },
              { name: "Bereik",        role: "Binnen- en buitenland", init: "B" },
              { name: "IPI 504.064",   role: "BIV erkend makelaar", init: "BIV" },
            ].map((member, i) => (
              <div key={member.name} className={`hi-team-card hi-r hi-r-d${i + 1}`}>
                <div className="hi-team-img" style={{ background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--orange)", fontWeight: 400, opacity: 0.5 }}>
                    {member.init}
                  </span>
                </div>
                <div className="hi-team-body">
                  <div className="hi-team-name">{member.name}</div>
                  <div className="hi-team-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container" style={{ maxWidth: 800 }}>
          {[
            { year: "2009", event: { nl: "Oprichting van Hippique.immo als eerste gespecialiseerd hippisch vastgoedkantoor in België.", fr: "Fondation de Hippique.immo, premier bureau spécialisé en immobilier équestre en Belgique.", en: "Foundation of Hippique.immo as the first specialised equestrian real estate agency in Belgium." } },
            { year: "2012", event: { nl: "Uitbreiding naar Nederland. Eerste internationale transacties succesvol afgerond.", fr: "Expansion aux Pays-Bas. Premières transactions internationales réussies.", en: "Expansion to the Netherlands. First international transactions successfully completed." } },
            { year: "2016", event: { nl: "Opening van kantoor in Noord-Frankrijk. Focus op Normandisch stoeterij-vastgoed.", fr: "Ouverture d'un bureau en Normandie, France. Focus sur l'immobilier de haras normands.", en: "Opening of office in Northern France. Focus on Norman stud farm real estate." } },
            { year: "2019", event: { nl: "Bereiken van de 200e succesvolle transactie. Erkenning als marktleider in de sector.", fr: "Atteinte de la 200e transaction réussie. Reconnaissance comme leader du marché.", en: "Reaching the 200th successful transaction. Recognition as market leader in the sector." } },
            { year: "2022", event: { nl: "Lancering van uitgebreid online platform met premium zoekmodule voor hippisch vastgoed.", fr: "Lancement d'une plateforme en ligne complète avec module de recherche premium.", en: "Launch of comprehensive online platform with premium search module for equestrian properties." } },
            { year: "2025", event: { nl: "Meer dan 340 transacties — en elke dag groeien wij verder in expertise en netwerk.", fr: "Plus de 340 transactions — nous continuons à grandir en expertise et en réseau.", en: "More than 340 transactions — and every day we continue to grow in expertise and network." } },
          ].map(({ year, event }, i) => (
            <_TimelineRow key={year} year={year} event={event} delay={i % 3} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <div>
            <h2 className="hi-cta-band-title hi-r">{t.over_ctaTitle}</h2>
            <p style={{ color: "var(--stone)", marginTop: 8 }}>{t.over_ctaDesc}</p>
          </div>
          <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange hi-r hi-r-d1">{t.over_ctaBtn}</Link>
        </div>
      </div>
    </div>
  );
}

function _TimelineRow({ year, event, delay }: { year: string; event: Record<string, string>; delay: number }) {
  const { lang } = useLang();
  return (
    <div
      className={`hi-r hi-r-d${delay + 1}`}
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
        {year}
      </div>
      <p style={{ fontSize: 16, color: "var(--stone)", lineHeight: 1.7 }}>{event[lang]}</p>
    </div>
  );
}
