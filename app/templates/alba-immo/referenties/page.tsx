"use client";
import Link from "next/link";
import { useLang } from "../LangContext";

const BASE = "/templates/alba-immo";

const REFS = [
  { img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", type: { nl: "Huis", fr: "Maison", en: "House" }, city: "Beerse", year: "2024" },
  { img: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80", type: { nl: "Hoeve", fr: "Ferme", en: "Farm" }, city: "Tessenderlo", year: "2024" },
  { img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", type: { nl: "Villa", fr: "Villa", en: "Villa" }, city: "Boechout", year: "2023" },
  { img: "https://images.unsplash.com/photo-1553284966-19b8815c7817?w=800&q=80", type: { nl: "Manege", fr: "Manège", en: "Riding school" }, city: "Herentals", year: "2023" },
  { img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80", type: { nl: "Landbouwgrond", fr: "Terrain agricole", en: "Agricultural land" }, city: "Oud-Turnhout", year: "2023" },
  { img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80", type: { nl: "Huis", fr: "Maison", en: "House" }, city: "Mol", year: "2022" },
  { img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", type: { nl: "Villa", fr: "Villa", en: "Villa" }, city: "Wijnegem", year: "2022" },
  { img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80", type: { nl: "Hoeve", fr: "Ferme", en: "Farm" }, city: "Nijlen", year: "2022" },
  { img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80", type: { nl: "Stoeterij", fr: "Haras", en: "Stud farm" }, city: "Lier", year: "2021" },
];

export default function ReferentiesPage() {
  const { lang, t } = useLang();

  const STATS = [
    { num: "350+", label: { nl: "Panden verkocht", fr: "Biens vendus", en: "Properties sold" } },
    { num: "98%",  label: { nl: "Vraagprijs gerealiseerd", fr: "Prix demandé réalisé", en: "Asking price achieved" } },
    { num: "42",   label: { nl: "Gem. verkooptijd (dgn)", fr: "Jours de vente moyens", en: "Avg. selling days" } },
    { num: "15+",  label: { nl: "Jaar sectorervaring", fr: "Ans d'expérience", en: "Years of experience" } },
  ];

  const soldIn = { nl: "Verkocht in", fr: "Vendu en", en: "Sold in" };

  return (
    <div className="hi-page">
      {/* HERO */}
      <section
        style={{
          paddingTop: "var(--nav-h)",
          minHeight: "50vh",
          display: "flex",
          alignItems: "flex-end",
          background: "var(--black)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(237,110,33,0.07) 0%, transparent 55%)" }} />
        <div className="hi-container" style={{ padding: "0 80px 80px", position: "relative", zIndex: 2 }}>
          <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>{t.ref_label}</span>
          <h1
            className="hi-r hi-r-d1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px,6.5vw,88px)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            <em style={{ color: "var(--orange)" }}>{t.ref_title}</em>
          </h1>
          <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 18, maxWidth: 520, marginTop: 20, lineHeight: 1.7 }}>
            {t.ref_desc}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "var(--anthracite)", borderBottom: "1px solid var(--border-dark)" }}>
        <div className="hi-container">
          <div className="hi-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
            {STATS.map((s, i) => (
              <div key={i} className={`hi-stat-item hi-r hi-r-d${i + 1}`}>
                <div className="hi-stat-num">{s.num}</div>
                <div className="hi-stat-label">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {REFS.map((r, i) => (
              <div
                key={i}
                className={`hi-r hi-r-d${(i % 3) + 1}`}
                style={{
                  background: "var(--anthracite)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                  <img
                    src={r.img}
                    alt={r.city}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute", top: 12, right: 12,
                      background: "var(--orange)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: 2,
                    }}
                  >
                    {t.ref_sold}
                  </div>
                </div>
                <div style={{ padding: "20px 20px 22px" }}>
                  <div style={{ fontSize: 11, color: "var(--orange)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    {r.type[lang]}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--warm-white)" }}>{r.city}</div>
                  <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 4 }}>{soldIn[lang]} {r.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <h2 className="hi-cta-band-title hi-r">{t.ref_ctaTitle}</h2>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange">{t.ref_ctaBtn}</Link>
            <Link href={`${BASE}/aanbod`} className="hi-btn hi-btn-outline">{t.nav_aanbod}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
