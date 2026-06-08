"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROPERTIES, BLOG_POSTS, formatPrice, formatSurface } from "../../data";

const BASE = "/templates/hippique-v2";

// Animated counter
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const dur = 1600;
      const start = performance.now();
      const animate = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(ease * target));
        if (p < 1) requestAnimationFrame(animate); else setVal(target);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = PROPERTIES.find((p) => p.id === params.id) ?? PROPERTIES[0];

  // Reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".hi-r, .hi-r-left, .hi-r-right, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Gallery state
  const GALLERY_COUNT = 6;
  const [galleryIdx, setGalleryIdx] = useState(0);

  // Gradients for gallery slides
  const slideGradients = [
    property.gradient,
    "linear-gradient(135deg, #0c0810 0%, #1a1020 100%)",
    "linear-gradient(135deg, #100a0c 0%, #1e1014 100%)",
    "linear-gradient(135deg, #10080a 0%, #201018 100%)",
    "linear-gradient(135deg, #080c18 0%, #101828 100%)",
    "linear-gradient(135deg, #100c06 0%, #201808 100%)",
  ];

  const related = PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  return (
    <div className="hi-page hi-detail-wrap">
      {/* ══════════════════════════════════════════
          FULLSCREEN GALLERY
      ══════════════════════════════════════════ */}
      <section className="hi-gallery-hero">
        {/* Main image */}
        <div
          className="hi-gallery-main"
          style={{
            position: "absolute", inset: 0,
            background: slideGradients[galleryIdx],
            transition: "background 0.7s ease",
          }}
        >
          {/* Decorative overlay pattern */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle at 60% 40%, rgba(237,110,33,0.06) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="hi-gallery-overlay" />

        {/* Arrows */}
        <button
          className="hi-gallery-prev"
          onClick={() => setGalleryIdx((i) => (i - 1 + GALLERY_COUNT) % GALLERY_COUNT)}
          aria-label="Vorige"
        >
          ‹
        </button>
        <button
          className="hi-gallery-next"
          onClick={() => setGalleryIdx((i) => (i + 1) % GALLERY_COUNT)}
          aria-label="Volgende"
        >
          ›
        </button>

        {/* Dots */}
        <div className="hi-gallery-nav">
          {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
            <button
              key={i}
              className={`hi-gallery-dot${galleryIdx === i ? " active" : ""}`}
              onClick={() => setGalleryIdx(i)}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>

        {/* Count */}
        <div className="hi-gallery-count">
          {galleryIdx + 1} / {GALLERY_COUNT}
        </div>

        {/* Tag + back breadcrumb */}
        <div
          style={{
            position: "absolute",
            top: 90, left: 48,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            zIndex: 5,
          }}
        >
          <Link
            href={`${BASE}/aanbod`}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, color: "var(--stone)",
              letterSpacing: "0.06em",
              transition: "color 0.25s",
            }}
          >
            ← Terug naar aanbod
          </Link>
          {property.tag && (
            <span
              style={{
                display: "inline-block",
                padding: "5px 14px",
                background: "var(--orange)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                borderRadius: 2,
                alignSelf: "flex-start",
              }}
            >
              {property.tag}
            </span>
          )}
        </div>

        {/* Hero title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 48, left: 48,
            zIndex: 5,
            maxWidth: 600,
          }}
        >
          <p style={{ fontSize: 12, color: "var(--orange)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
            {property.type} · {property.location}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px,4vw,56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--warm-white)",
            }}
          >
            {property.title}
          </h1>
        </div>

        {/* Thumbnail strip */}
        <div
          style={{
            position: "absolute",
            bottom: 48, right: 48,
            display: "flex",
            gap: 8,
            zIndex: 5,
          }}
        >
          {slideGradients.slice(0, 4).map((g, i) => (
            <button
              key={i}
              onClick={() => setGalleryIdx(i)}
              style={{
                width: 64, height: 44,
                background: g,
                border: galleryIdx === i ? "2px solid var(--orange)" : "2px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                cursor: "pointer",
                transition: "border-color 0.25s",
                overflow: "hidden",
                flexShrink: 0,
              }}
            />
          ))}
          <button
            style={{
              width: 64, height: 44,
              background: "rgba(8,7,5,0.7)",
              border: "2px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              cursor: "pointer",
              color: "var(--warm-white)",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +{GALLERY_COUNT - 4}
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DETAIL BODY
      ══════════════════════════════════════════ */}
      <div className="hi-detail-body">

        {/* LEFT — Main content */}
        <div className="hi-detail-main">
          {/* Title + location */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="hi-detail-title hi-r">{property.title}</h2>
            <p className="hi-r hi-r-d1" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "var(--stone)", marginBottom: 16 }}>
              {property.subtitle}
            </p>
            <div className="hi-detail-location hi-r hi-r-d2">
              <span>◎</span>
              <span>{property.location}, {property.country}</span>
              <span style={{ marginLeft: 12, padding: "3px 10px", background: "var(--orange-subtle)", border: "1px solid var(--border)", borderRadius: 40, fontSize: 12, color: "var(--orange)" }}>
                {property.type}
              </span>
            </div>
          </div>

          {/* Key stats animated */}
          <div
            className="hi-r"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--border-dark)",
              border: "1px solid var(--border-dark)",
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 48,
            }}
          >
            {[
              { label: "Grondopp.", val: property.groundSurface >= 10000 ? property.groundSurface / 10000 : property.groundSurface, suffix: property.groundSurface >= 10000 ? " ha" : " m²" },
              { label: "Woonopp.", val: property.livingSurface, suffix: " m²" },
              { label: "Stallen", val: property.stalls, suffix: "" },
              { label: "Paddocks", val: property.paddocks, suffix: "" },
            ].map((s) => (
              <div key={s.label} className="hi-stat-item" style={{ padding: "28px 20px" }}>
                <div className="hi-stat-num" style={{ fontSize: 36 }}>
                  <Counter target={Math.round(s.val)} suffix={s.suffix} />
                </div>
                <div className="hi-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="hi-r hi-r-d1">
            <span className="hi-accent-line" />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, marginBottom: 16 }}>
              Beschrijving
            </h3>
            <p className="hi-detail-desc">{property.description}</p>
          </div>

          {/* Hippique facilities */}
          <div>
            <h3 className="hi-detail-section-title hi-r">Hippische infrastructuur</h3>
            <div className="hi-facilities-grid hi-r hi-r-d1">
              {[
                { name: "Stallen", val: `${property.stalls} stallen` },
                { name: "Paardenboxen", val: `${property.boxes} boxen` },
                { name: "Weides", val: `${property.pastures} ha` },
                { name: "Paddocks", val: `${property.paddocks} st.` },
                { name: "Overdekte rijhal", val: property.indoorArena ? "Aanwezig" : "Niet aanwezig" },
                { name: "Buitenpiste", val: property.outdoorArena ? "Aanwezig" : "Niet aanwezig" },
              ].map((f) => (
                <div key={f.name} className="hi-facility-item">
                  <span className="hi-facility-name">{f.name}</span>
                  <span
                    className="hi-facility-val"
                    style={{
                      color: f.val === "Aanwezig" ? "var(--orange)" : f.val === "Niet aanwezig" ? "var(--grey)" : "var(--warm-white)",
                      fontSize: f.val === "Aanwezig" || f.val === "Niet aanwezig" ? 14 : undefined,
                    }}
                  >
                    {f.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features list */}
          {property.features.length > 0 && (
            <div>
              <h3 className="hi-detail-section-title hi-r">Kenmerken & troeven</h3>
              <div
                className="hi-r hi-r-d1"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {property.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 14px",
                      background: "var(--dark)",
                      borderRadius: 2,
                      fontSize: 14,
                      color: "var(--stone)",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Permits */}
          <div>
            <h3 className="hi-detail-section-title hi-r">Vergunningen & bestemming</h3>
            <div
              className="hi-r hi-r-d1"
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {property.permits.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--border-dark)",
                    fontSize: 14,
                    color: "var(--stone)",
                  }}
                >
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--orange-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, color: "var(--orange)" }}>
                    ✓
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="hi-r hi-r-d2" style={{ marginTop: 40 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400, marginBottom: 16 }}>Ligging</h3>
            <div className="hi-map-placeholder">
              <span>◎ {property.location} — Kaart beschikbaar op aanvraag</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Sticky sidebar */}
        <div className="hi-detail-sidebar">
          <div className="hi-detail-sidebar-card hi-r">
            {/* Price */}
            <div className="hi-detail-price">
              {property.priceOnRequest ? "Prijs op aanvraag" : formatPrice(property.price!)}
            </div>
            <p className="hi-detail-price-sub">
              {property.priceOnRequest
                ? "Neem contact op voor prijs & voorwaarden"
                : `${property.type} · ${property.province}, ${property.country}`}
            </p>

            {/* Quick stats */}
            <div className="hi-detail-key-stats">
              {[
                { label: "Oppervlakte", val: formatSurface(property.groundSurface) },
                { label: "Woning",      val: `${property.livingSurface} m²` },
                { label: "Stallen",     val: `${property.stalls}` },
                { label: "Paddocks",    val: `${property.paddocks}` },
              ].map((s) => (
                <div key={s.label} className="hi-detail-kstat">
                  <span className="hi-detail-kstat-val">{s.val}</span>
                  <span className="hi-detail-kstat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Infra badges */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {property.indoorArena && (
                <span style={{ padding: "5px 12px", background: "var(--orange-subtle)", border: "1px solid var(--border)", borderRadius: 40, fontSize: 12, color: "var(--orange)" }}>
                  ✓ Rijhal
                </span>
              )}
              {property.outdoorArena && (
                <span style={{ padding: "5px 12px", background: "var(--orange-subtle)", border: "1px solid var(--border)", borderRadius: 40, fontSize: 12, color: "var(--orange)" }}>
                  ✓ Buitenpiste
                </span>
              )}
              {property.residence && (
                <span style={{ padding: "5px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 12, color: "var(--stone)" }}>
                  Woning
                </span>
              )}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange" style={{ width: "100%", justifyContent: "center" }}>
                Bezoek aanvragen
              </Link>
              <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                Informatie opvragen
              </Link>
              <a
                href="tel:+32495915020"
                className="hi-btn hi-btn-dark"
                style={{ width: "100%", justifyContent: "center", fontSize: 14 }}
              >
                📞 +32 (0)495 91 50 20
              </a>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--border-dark)", margin: "24px 0" }} />

            {/* Agent */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  flexShrink: 0,
                }}
              >
                HI
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--warm-white)" }}>
                  Hippique.immo
                </div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>
                  info@hippique.immo
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{ fontSize: 11, color: "var(--grey)", marginTop: 20, lineHeight: 1.6 }}>
              Alle informatie werd met de grootste zorg opgesteld maar kan steeds onderhevig zijn aan wijzigingen. IPI 504.064 — BIV erkend.
            </p>
          </div>

          {/* Share */}
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button className="hi-btn hi-btn-dark" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
              ↑ Delen
            </button>
            <button className="hi-btn hi-btn-dark" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
              ♡ Opslaan
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RELATED PROPERTIES
      ══════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="hi-section" style={{ background: "var(--anthracite)" }}>
          <div className="hi-container">
            <div style={{ marginBottom: 40 }}>
              <span className="hi-label hi-r">Gelijkaardige eigendommen</span>
              <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 10 }}>
                Meer {property.type.toLowerCase()}s
              </h2>
            </div>
            <div className="hi-prop-grid">
              {related.map((p, i) => (
                <Link key={p.id} href={`${BASE}/aanbod/${p.id}`} className={`hi-prop-card hi-r hi-r-d${i + 1}`}>
                  <div className="hi-prop-img-wrap hi-img-reveal">
                    <div className="hi-prop-img-placeholder" style={{ background: p.gradient }} />
                  </div>
                  {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                  <div className="hi-prop-body">
                    <p className="hi-prop-loc">{p.location}</p>
                    <h3 className="hi-prop-title">{p.title}</h3>
                    <div className="hi-prop-stats">
                      <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                      <span className="hi-prop-stat">{p.stalls} stallen</span>
                    </div>
                    <div className="hi-prop-divider" />
                    <div className="hi-prop-footer">
                      <span className="hi-prop-price">
                        {p.priceOnRequest ? "Op aanvraag" : formatPrice(p.price!)}
                      </span>
                      <span className="hi-prop-link">Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <h2 className="hi-cta-band-title">
            Interesse in dit eigendom?
          </h2>
          <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline">
            Neem contact op →
          </Link>
        </div>
      </div>
    </div>
  );
}
