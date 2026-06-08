"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PROPERTIES as STATIC_PROPS, formatPrice, formatSurface } from "../data";
import type { Property } from "../data";
import { useLang } from "../LangContext";

const BASE = "/templates/alba-immo";

const WARM_GRADS = [
  "linear-gradient(135deg, #1a160f 0%, #2d2115 50%, #1e1a10 100%)",
  "linear-gradient(135deg, #1a1208 0%, #2a1e0c 50%, #1c1408 100%)",
  "linear-gradient(135deg, #18100a 0%, #241808 50%, #1c1206 100%)",
  "linear-gradient(135deg, #1c1408 0%, #2c1e0a 50%, #1e1608 100%)",
  "linear-gradient(135deg, #160e08 0%, #221606 50%, #181008 100%)",
  "linear-gradient(135deg, #201408 0%, #301e0c 50%, #22160a 100%)",
  "linear-gradient(135deg, #1e1a0c 0%, #2c2410 50%, #201c0e 100%)",
  "linear-gradient(135deg, #1a140a 0%, #28200e 50%, #1c1608 100%)",
];
const warmGrad = (i: number) => WARM_GRADS[i % WARM_GRADS.length];

const TYPES = ["Stoeterij", "Manège", "Pensionstallen", "Landgoed", "Kasteeldomein", "Hoeve"];
const COUNTRIES = ["België", "Nederland", "Frankrijk"];
const PRICE_RANGES = [
  { label: "< €1M",       min: 0,       max: 999999 },
  { label: "€1M – €2M",   min: 1000000, max: 2000000 },
  { label: "€2M – €4M",   min: 2000000, max: 4000000 },
  { label: "> €4M",       min: 4000001, max: Infinity },
  { label: "Op aanvraag", min: -1,      max: -1 },
];

export default function AanbodPage() {
  const { t } = useLang();
  const [allProps, setAllProps] = useState<Property[]>(STATIC_PROPS);

  useEffect(() => {
    fetch("/api/alba-immo/properties")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setAllProps(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".hi-r, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const [search,      setSearch]      = useState("");
  const [typeFilter,  setTypeFilter]  = useState<string | null>(null);
  const [countFilter, setCountFilter] = useState<string | null>(null);
  const [priceIdx,    setPriceIdx]    = useState<number | null>(null);
  const [sortBy,      setSortBy]      = useState<"default" | "price_asc" | "price_desc" | "surface">("default");

  const filtered = useMemo(() => {
    let list = allProps.filter((p) => {
      if (search && !`${p.title} ${p.location} ${p.type}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter  && p.type    !== typeFilter)  return false;
      if (countFilter && p.country !== countFilter) return false;
      if (priceIdx !== null) {
        const pr = PRICE_RANGES[priceIdx];
        if (pr.min === -1) { if (!p.priceOnRequest) return false; }
        else if (!p.priceOnRequest) {
          if (p.price === null || p.price < pr.min || p.price > pr.max) return false;
        }
      }
      return true;
    });
    if (sortBy === "price_asc")  list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortBy === "price_desc") list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sortBy === "surface")    list = [...list].sort((a, b) => b.groundSurface - a.groundSurface);
    return list;
  }, [allProps, search, typeFilter, countFilter, priceIdx, sortBy]);

  const hasFilters = !!(search || typeFilter || countFilter || priceIdx !== null);
  const resetFilters = () => {
    setSearch(""); setTypeFilter(null); setCountFilter(null);
    setPriceIdx(null); setSortBy("default");
  };

  const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        border: `1px solid ${active ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 40,
        background: active ? "var(--orange)" : "transparent",
        color: active ? "#fff" : "var(--stone)",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="hi-page" style={{ background: "var(--black)" }}>

      {/* HERO */}
      <section style={{
        paddingTop: "var(--nav-h)",
        background: "linear-gradient(160deg, #2a1200 0%, #3d1c00 35%, #1e0c00 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 55% 60%, rgba(237,110,33,0.28) 0%, rgba(237,110,33,0.06) 50%, transparent 75%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(237,110,33,0.5), transparent)",
        }} />

        <div className="hi-container" style={{ padding: "80px 80px 48px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 32 }}>
            <div>
              <span className="hi-label hi-r" style={{ display: "block", marginBottom: 14, color: "rgba(237,110,33,0.8)" }}>
                {t.aanbod_label}
              </span>
              <h1 className="hi-r hi-r-d1" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 5.5vw, 74px)",
                fontWeight: 400,
                lineHeight: 1.03,
                letterSpacing: "-0.03em",
                color: "var(--warm-white)",
              }}>
                {t.aanbod_title1}<br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.aanbod_title2}</em>
              </h1>
            </div>
            <div className="hi-r hi-r-d2" style={{ textAlign: "right" as const, paddingBottom: 4 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 52, color: "var(--orange)", lineHeight: 1 }}>
                {filtered.length}
              </div>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                {t.aanbod_results ?? "eigendommen"}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40, maxWidth: 480 }}>
            <div className="hi-search-wrap">
              <span className="hi-search-icon">⌕</span>
              <input
                className="hi-search-input"
                placeholder={t.aanbod_search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div style={{ borderTop: "1px solid rgba(237,110,33,0.15)" }}>
          <div className="hi-container" style={{ padding: "20px 80px" }}>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(237,110,33,0.6)", marginRight: 2 }}>Type</span>
              {TYPES.map((type) => (
                <Pill key={type} label={type} active={typeFilter === type}
                  onClick={() => setTypeFilter(typeFilter === type ? null : type)} />
              ))}
              <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(237,110,33,0.6)", marginRight: 2 }}>Land</span>
              {COUNTRIES.map((c) => (
                <Pill key={c} label={c} active={countFilter === c}
                  onClick={() => setCountFilter(countFilter === c ? null : c)} />
              ))}
              <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(237,110,33,0.6)", marginRight: 2 }}>Prijs</span>
              {PRICE_RANGES.map((pr, i) => (
                <Pill key={pr.label} label={pr.label} active={priceIdx === i}
                  onClick={() => setPriceIdx(priceIdx === i ? null : i)} />
              ))}
              {hasFilters && (
                <>
                  <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 6px" }} />
                  <button onClick={resetFilters} style={{
                    background: "transparent", border: "none",
                    color: "var(--orange)", fontSize: 12,
                    cursor: "pointer", letterSpacing: "0.04em",
                    textDecoration: "underline", textUnderlineOffset: 3,
                  }}>Wissen</button>
                </>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(237,110,33,0.6)", marginRight: 2 }}>Sorteren</span>
              {([
                { key: "default",    label: "Standaard" },
                { key: "price_asc",  label: "Prijs ↑" },
                { key: "price_desc", label: "Prijs ↓" },
                { key: "surface",    label: "Oppervlakte" },
              ] as const).map((s) => (
                <Pill key={s.key} label={s.label} active={sortBy === s.key}
                  onClick={() => setSortBy(s.key)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: "var(--black)", padding: "64px 0 100px" }}>
        <div className="hi-container" style={{ padding: "0 80px" }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "100px 24px",
              border: "1px solid var(--border-dark)", borderRadius: 4, color: "var(--stone)",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 12, color: "var(--warm-white)" }}>
                {t.aanbod_noResults}
              </div>
              <button onClick={resetFilters} className="hi-btn hi-btn-orange"
                style={{ margin: "24px auto 0", display: "inline-flex" }}>
                {t.aanbod_noResultsBtn ?? "Filters wissen"}
              </button>
            </div>
          ) : (
            <div className="hi-prop-grid">
              {filtered.map((p, i) => (
                <Link key={p.id} href={`${BASE}/aanbod/${p.id}`}
                  className={`hi-prop-card hi-r hi-r-d${(i % 3) + 1}`}>
                  <div className="hi-prop-img-wrap hi-img-reveal">
                    <div className="hi-prop-img-placeholder" style={{ background: warmGrad(i) }} />
                  </div>
                  {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                  {p.featured && <span className="hi-prop-featured-badge">{t.feat_featured}</span>}
                  <div className="hi-prop-body">
                    <p className="hi-prop-loc">{p.province}, {p.country}</p>
                    <h3 className="hi-prop-title">{p.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--grey)", marginBottom: 14, lineHeight: 1.5 }}>{p.subtitle}</p>
                    <div className="hi-prop-stats">
                      <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                      <span className="hi-prop-stat">{p.stalls} {t.aanbod_stalls}</span>
                      <span className="hi-prop-stat">{p.type}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 14 }}>
                      {p.indoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border)", borderRadius: 40, fontSize: 11, color: "var(--orange)" }}>Rijhal</span>
                      )}
                      {p.outdoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 11, color: "var(--stone)" }}>Buitenpiste</span>
                      )}
                      {p.residence && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 11, color: "var(--stone)" }}>Woning</span>
                      )}
                    </div>
                    <div className="hi-prop-divider" />
                    <div className="hi-prop-footer">
                      <span className="hi-prop-price">
                        {p.priceOnRequest ? t.aanbod_onRequest : formatPrice(p.price!)}
                      </span>
                      <span className="hi-prop-link">{t.aanbod_details}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
