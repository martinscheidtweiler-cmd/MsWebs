"use client";
import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import { PROPERTIES, BLOG_POSTS, formatPrice, formatSurface } from "../../data";
import type { Property } from "../../data";
import { useLang } from "../../LangContext";
import { useIsMobile } from "../../useIsMobile";

const BASE = "/templates/alba-immo";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: "Te koop",      color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  sold:     { label: "Verkocht",     color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  reserved: { label: "Gereserveerd", color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  option:   { label: "Onder optie",  color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

const EPC_COLORS: Record<string, { bar: string; text: string }> = {
  "A+": { bar: "#00a651", text: "#00c862" },
  "A":  { bar: "#00a651", text: "#00c862" },
  "B":  { bar: "#4caf50", text: "#6fcf74" },
  "C":  { bar: "#8bc34a", text: "#a3d45e" },
  "D":  { bar: "#ffeb3b", text: "#ffe033" },
  "E":  { bar: "#ff9800", text: "#ffb347" },
  "F":  { bar: "#ff5722", text: "#ff7043" },
  "G":  { bar: "#f44336", text: "#ef5350" },
};

function EpcWidget({ label, score }: { label: string; score: number | null }) {
  const cfg = EPC_COLORS[label] ?? EPC_COLORS["G"];
  const allLabels = ["A+", "A", "B", "C", "D", "E", "F", "G"];
  const maxWidths = [30, 38, 50, 62, 74, 86, 92, 100];
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--stone)", marginBottom: 4 }}>EPC Score</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, color: cfg.text, lineHeight: 1 }}>{label}</span>
            {score !== null && <span style={{ fontSize: 14, color: "var(--stone)" }}>{score} kWh/m²</span>}
          </div>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: cfg.bar, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff" }}>
          {label}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 3 }}>
        {allLabels.map((l, i) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, width: 22, color: l === label ? cfg.text : "var(--grey)", textAlign: "right" as const }}>{l}</span>
            <div style={{
              height: 14, borderRadius: 2,
              width: `${maxWidths[i]}%`,
              background: l === label ? cfg.bar : "rgba(255,255,255,0.06)",
              position: "relative",
              transition: "width 0.5s ease",
            }}>
              {l === label && (
                <span style={{ position: "absolute", right: -24, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: cfg.text, fontWeight: 700 }}>◄</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const dur = 1600; const start = performance.now();
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

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [property, setProperty] = useState<Property>(PROPERTIES.find((p) => p.id === id) ?? PROPERTIES[0]);

  // Load from API
  useEffect(() => {
    fetch(`/api/alba-immo/properties/${id}`)
      .then(r => r.json())
      .then(data => { if (data && data.id) setProperty(data); })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".hi-r, .hi-r-left, .hi-r-right, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const GALLERY_COUNT = Math.max(property.images?.length || 0, 6);
  const [galleryIdx, setGalleryIdx] = useState(0);

  const slideGradients = [
    property.gradient,
    "linear-gradient(135deg, #1a1208 0%, #2a1e0c 100%)",
    "linear-gradient(135deg, #140e0a 0%, #201408 100%)",
    "linear-gradient(135deg, #16100a 0%, #241808 100%)",
    "linear-gradient(135deg, #181410 0%, #2a200e 100%)",
    "linear-gradient(135deg, #1c1408 0%, #2c1e08 100%)",
  ];

  const status = STATUS_CONFIG[property.status ?? "active"] ?? STATUS_CONFIG.active;
  const related = PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ fontSize: 13, color: "var(--stone)" }}>{label}</span>
      <span style={{ fontSize: 13, color: "var(--warm-white)", fontWeight: 500, textAlign: "right" as const, maxWidth: "55%" }}>{value}</span>
    </div>
  );

  return (
    <div className="hi-page hi-detail-wrap">

      {/* ════ GALLERY ════ */}
      <section className="hi-gallery-hero">
        <div className="hi-gallery-main" style={{ position: "absolute", inset: 0, transition: "background 0.7s ease" }}>
          {property.images && property.images.length > 0 && property.images[galleryIdx] ? (
            <img src={property.images[galleryIdx]} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: slideGradients[galleryIdx % slideGradients.length] }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(237,110,33,0.06) 0%, transparent 50%)" }} />
            </div>
          )}
        </div>
        <div className="hi-gallery-overlay" />

        <button className="hi-gallery-prev" onClick={() => setGalleryIdx((i) => (i - 1 + GALLERY_COUNT) % GALLERY_COUNT)} aria-label="Vorige">‹</button>
        <button className="hi-gallery-next" onClick={() => setGalleryIdx((i) => (i + 1) % GALLERY_COUNT)} aria-label="Volgende">›</button>

        <div className="hi-gallery-nav">
          {Array.from({ length: Math.min(GALLERY_COUNT, 8) }).map((_, i) => (
            <button key={i} className={`hi-gallery-dot${galleryIdx === i ? " active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`Foto ${i + 1}`} />
          ))}
        </div>
        <div className="hi-gallery-count">{galleryIdx + 1} / {GALLERY_COUNT}</div>

        {/* Top left: breadcrumb + badges */}
        <div className="hi-gallery-badges">
          <Link href={`${BASE}/aanbod`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--stone)", letterSpacing: "0.06em", transition: "color 0.25s" }}>
            {t.detail_back}
          </Link>
          <div className="hi-gallery-badges-row">
            {property.tag && (
              <span style={{ padding: "4px 12px", background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, borderRadius: 2 }}>
                {property.tag}
              </span>
            )}
            <span style={{ padding: "4px 12px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, background: status.bg, color: status.color, border: `1px solid ${status.color}`, backdropFilter: "blur(8px)" }}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Bottom left: title */}
        <div className="hi-gallery-title-block">
          <p className="hi-gallery-eyebrow">
            {property.type} · {property.location}
          </p>
          <h1 className="hi-gallery-title">
            {property.title}
          </h1>
        </div>

        {/* Thumbnail strip */}
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 48, right: 48, display: "flex", gap: 8, zIndex: 5 }}>
            {Array.from({ length: Math.min(GALLERY_COUNT, 5) }).map((_, i) => (
              <button key={i} onClick={() => setGalleryIdx(i)} style={{
                width: 64, height: 44, borderRadius: 2, cursor: "pointer", overflow: "hidden",
                border: galleryIdx === i ? "2px solid var(--orange)" : "2px solid rgba(255,255,255,0.1)",
                transition: "border-color 0.25s", padding: 0, flexShrink: 0,
              }}>
                {property.images && property.images[i] ? (
                  <img src={property.images[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: slideGradients[i % slideGradients.length] }} />
                )}
              </button>
            ))}
            {GALLERY_COUNT > 5 && (
              <button style={{ width: 64, height: 44, background: "rgba(8,7,5,0.7)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 2, cursor: "pointer", color: "var(--warm-white)", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                +{GALLERY_COUNT - 5}
              </button>
            )}
          </div>
        )}
      </section>

      {/* ════ DETAIL BODY ════ */}
      <div className="hi-detail-body">

        {/* LEFT — main content */}
        <div className="hi-detail-main">

          {/* Title */}
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

          {/* Key stats */}
          <div className="hi-r" style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 1, background: "var(--border-dark)", border: "1px solid var(--border-dark)", borderRadius: 4, overflow: "hidden", marginBottom: 48 }}>
            {[
              { label: t.detail_groundSurface, val: property.groundSurface >= 10000 ? property.groundSurface / 10000 : property.groundSurface, suffix: property.groundSurface >= 10000 ? " ha" : " m²" },
              { label: t.detail_livingSurface, val: property.livingSurface, suffix: " m²" },
              { label: t.detail_stalls, val: property.stalls, suffix: "" },
              { label: t.detail_paddocks, val: property.paddocks, suffix: "" },
            ].map((s) => (
              <div key={s.label} className="hi-stat-item" style={{ padding: "28px 20px" }}>
                <div className="hi-stat-num" style={{ fontSize: 36 }}><Counter target={Math.round(s.val)} suffix={s.suffix} /></div>
                <div className="hi-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="hi-r hi-r-d1" style={{ marginBottom: 48 }}>
            <span className="hi-accent-line" />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, marginBottom: 16 }}>{t.detail_description}</h3>
            <p className="hi-detail-desc">{property.description}</p>
          </div>

          {/* ── EPC Certificate ── */}
          {property.epcLabel && (
            <div style={{ marginBottom: 48 }}>
              <h3 className="hi-detail-section-title hi-r">Energieprestatie (EPC)</h3>
              <div className="hi-r hi-r-d1">
                <EpcWidget label={property.epcLabel} score={property.epcScore} />
              </div>
            </div>
          )}

          {/* ── Technische info ── */}
          {(property.heatingType || property.waterConnection || property.electricalPower) && (
            <div style={{ marginBottom: 48 }}>
              <h3 className="hi-detail-section-title hi-r">Technische informatie</h3>
              <div className="hi-r hi-r-d1" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 16px" }}>
                {property.heatingType && <InfoRow label="Type verwarming" value={property.heatingType} />}
                {property.waterConnection && <InfoRow label="Wateraansluiting" value={property.waterConnection} />}
                {property.electricalPower && <InfoRow label="Elektrisch vermogen" value={property.electricalPower} />}
              </div>
            </div>
          )}

          {/* ── Kadastrale info ── */}
          {(property.cadastralRef || property.cadastralSurface > 0) && (
            <div style={{ marginBottom: 48 }}>
              <h3 className="hi-detail-section-title hi-r">Kadastrale gegevens</h3>
              <div className="hi-r hi-r-d1" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 16px" }}>
                {property.cadastralRef && <InfoRow label="Kadastraal referentienummer" value={property.cadastralRef} />}
                {property.cadastralSurface > 0 && <InfoRow label="Perceeloppervlakte" value={`${property.cadastralSurface.toLocaleString("nl-BE")} m²`} />}
              </div>
            </div>
          )}

          {/* ── Faciliteiten ── */}
          <div style={{ marginBottom: 48 }}>
            <h3 className="hi-detail-section-title hi-r">{t.detail_features}</h3>
            <div className="hi-facilities-grid hi-r hi-r-d1">
              {[
                { name: t.detail_stalls,       val: `${property.stalls}` },
                { name: t.detail_boxes,        val: `${property.boxes}` },
                { name: t.detail_pastures,     val: `${property.pastures} ha` },
                { name: t.detail_paddocks,     val: `${property.paddocks}` },
                { name: t.detail_indoorArena,  val: property.indoorArena  ? t.detail_yes : t.detail_no },
                { name: t.detail_outdoorArena, val: property.outdoorArena ? t.detail_yes : t.detail_no },
              ].map((f) => (
                <div key={f.name} className="hi-facility-item">
                  <span className="hi-facility-name">{f.name}</span>
                  <span className="hi-facility-val" style={{ color: f.val === t.detail_yes ? "var(--orange)" : f.val === t.detail_no ? "var(--grey)" : "var(--warm-white)" }}>
                    {f.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Troeven ── */}
          {property.features.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <h3 className="hi-detail-section-title hi-r">Troeven & bijzonderheden</h3>
              <div className="hi-r hi-r-d1" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                {property.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "var(--dark)", borderRadius: 2, fontSize: 14, color: "var(--stone)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Vergunningen ── */}
          {property.permits.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <h3 className="hi-detail-section-title hi-r">Vergunningen & bestemming</h3>
              <div className="hi-r hi-r-d1" style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
                {property.permits.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: "1px solid var(--border-dark)", fontSize: 14, color: "var(--stone)" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--orange-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, color: "var(--orange)" }}>✓</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Documenten ── */}
          {property.documents && property.documents.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <h3 className="hi-detail-section-title hi-r">Documenten</h3>
              <div className="hi-r hi-r-d1" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                {property.documents.map((doc) => {
                  const icons: Record<string, string> = { plan: "📐", fiche: "📋", notary: "⚖️", other: "📄" };
                  return (
                    <a key={doc.url} href={doc.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 6, textDecoration: "none", transition: "border-color 0.2s",
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{icons[doc.type] ?? icons.other}</span>
                      <div>
                        <div style={{ fontSize: 13, color: "var(--warm-white)", fontWeight: 500 }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: "var(--stone)", textTransform: "capitalize" as const }}>{doc.type}</div>
                      </div>
                      <span style={{ marginLeft: "auto", color: "var(--orange)", fontSize: 14 }}>↓</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map placeholder */}
          <div className="hi-r hi-r-d2" style={{ marginBottom: 48 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400, marginBottom: 16 }}>Ligging</h3>
            <div className="hi-map-placeholder">
              <span>◎ {property.location} — Kaart beschikbaar op aanvraag</span>
            </div>
          </div>
        </div>

        {/* RIGHT — sticky sidebar */}
        <div className="hi-detail-sidebar">
          <div className="hi-detail-sidebar-card hi-r">

            {/* Price */}
            <div className="hi-detail-price">
              {property.priceOnRequest ? t.detail_onRequest : formatPrice(property.price!)}
            </div>
            <p className="hi-detail-price-sub">
              {property.priceOnRequest ? t.detail_contactDesc : `${property.type} · ${property.province}, ${property.country}`}
            </p>

            {/* Status */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 40, marginBottom: 20, background: status.bg, border: `1px solid ${status.color}40` }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: status.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: status.color }}>{status.label}</span>
            </div>

            {/* Quick stats */}
            <div className="hi-detail-key-stats">
              {[
                { label: t.detail_groundSurface, val: formatSurface(property.groundSurface) },
                { label: t.detail_residence,      val: `${property.livingSurface} m²` },
                { label: t.detail_stalls,         val: `${property.stalls}` },
                { label: t.detail_paddocks,       val: `${property.paddocks}` },
              ].map((s) => (
                <div key={s.label} className="hi-detail-kstat">
                  <span className="hi-detail-kstat-val">{s.val}</span>
                  <span className="hi-detail-kstat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* EPC chip in sidebar */}
            {property.epcLabel && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 11, color: "var(--stone)" }}>EPC</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: EPC_COLORS[property.epcLabel]?.text ?? "var(--stone)" }}>{property.epcLabel}</span>
                {property.epcScore !== null && <span style={{ fontSize: 11, color: "var(--stone)", marginLeft: "auto" }}>{property.epcScore} kWh/m²</span>}
              </div>
            )}

            {/* Infra badges */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 24 }}>
              {property.indoorArena && <span style={{ padding: "5px 12px", background: "var(--orange-subtle)", border: "1px solid var(--border)", borderRadius: 40, fontSize: 12, color: "var(--orange)" }}>✓ Rijhal</span>}
              {property.outdoorArena && <span style={{ padding: "5px 12px", background: "var(--orange-subtle)", border: "1px solid var(--border)", borderRadius: 40, fontSize: 12, color: "var(--orange)" }}>✓ Buitenpiste</span>}
              {property.residence && <span style={{ padding: "5px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 12, color: "var(--stone)" }}>Woning</span>}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange" style={{ width: "100%", justifyContent: "center" }}>Bezoek aanvragen</Link>
              <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline" style={{ width: "100%", justifyContent: "center" }}>Informatie opvragen</Link>
              <a href="tel:+32495915020" className="hi-btn hi-btn-dark" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}>📞 +32 (0)495 91 50 20</a>
            </div>

            <div style={{ height: 1, background: "var(--border-dark)", margin: "20px 0" }} />

            {/* Agent */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff", fontFamily: "var(--font-display)", flexShrink: 0 }}>HI</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--warm-white)" }}>Hippique.immo</div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>info@hippique.immo</div>
              </div>
            </div>

            <p style={{ fontSize: 11, color: "var(--grey)", marginTop: 20, lineHeight: 1.6 }}>
              Alle informatie werd met de grootste zorg opgesteld maar kan steeds onderhevig zijn aan wijzigingen. IPI 504.064 — BIV erkend.
            </p>
          </div>

          {/* Share */}
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="hi-btn hi-btn-dark" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>↑ Delen</button>
            <button className="hi-btn hi-btn-dark" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>♡ Opslaan</button>
          </div>
        </div>
      </div>

      {/* ════ RELATED ════ */}
      {related.length > 0 && (
        <section className="hi-section" style={{ background: "var(--anthracite)" }}>
          <div className="hi-container">
            <div style={{ marginBottom: 40 }}>
              <span className="hi-label hi-r">Gelijkaardige eigendommen</span>
              <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 10 }}>Meer {property.type.toLowerCase()}s</h2>
            </div>
            <div className="hi-prop-grid">
              {related.map((p, i) => (
                <Link key={p.id} href={`${BASE}/aanbod/${p.id}`} className={`hi-prop-card hi-r hi-r-d${i + 1}`}>
                  <div className="hi-prop-img-wrap hi-img-reveal">
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div className="hi-prop-img-placeholder" style={{ background: p.gradient }} />
                    )}
                  </div>
                  {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                  <div className="hi-prop-body">
                    <p className="hi-prop-loc">{p.location}</p>
                    <h3 className="hi-prop-title">{p.title}</h3>
                    <div className="hi-prop-stats">
                      <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                      <span className="hi-prop-stat">{p.stalls} {t.aanbod_stalls}</span>
                    </div>
                    <div className="hi-prop-divider" />
                    <div className="hi-prop-footer">
                      <span className="hi-prop-price">{p.priceOnRequest ? t.feat_onRequest : formatPrice(p.price!)}</span>
                      <span className="hi-prop-link">{t.feat_details}</span>
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
          <h2 className="hi-cta-band-title">{t.detail_contactTitle}</h2>
          <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline">{t.detail_contactBtn}</Link>
        </div>
      </div>
    </div>
  );
}
