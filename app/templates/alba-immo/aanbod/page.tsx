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

const TYPES     = ["Stoeterij", "Manège", "Pensionstallen", "Landgoed", "Kasteeldomein", "Hoeve"];
const PROVINCES = ["Antwerpen", "Oost-Vlaanderen", "Limburg", "Namen", "Calvados"];
const COUNTRIES = ["België", "Nederland", "Frankrijk"];
const PRICE_RANGES = [
  { label: "< €1.000.000", min: 0,       max: 999999 },
  { label: "€1M – €2M",    min: 1000000, max: 2000000 },
  { label: "€2M – €4M",    min: 2000000, max: 4000000 },
  { label: "> €4M",        min: 4000001, max: Infinity },
  { label: "Op aanvraag",  min: -1,      max: -1 },
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
  const [provFilter,  setProvFilter]  = useState<string | null>(null);
  const [countFilter, setCountFilter] = useState<string | null>(null);
  const [priceIdx,    setPriceIdx]    = useState<number | null>(null);
  const [indoorOnly,  setIndoorOnly]  = useState(false);
  const [outdoorOnly, setOutdoorOnly] = useState(false);
  const [sortBy,      setSortBy]      = useState<"default" | "price_asc" | "price_desc" | "surface">("default");

  const filtered = useMemo(() => {
    let list = allProps.filter((p) => {
      if (search && !`${p.title} ${p.location} ${p.type}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter  && p.type     !== typeFilter)  return false;
      if (provFilter  && p.province !== provFilter)  return false;
      if (countFilter && p.country  !== countFilter) return false;
      if (indoorOnly  && !p.indoorArena)  return false;
      if (outdoorOnly && !p.outdoorArena) return false;
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
  }, [allProps, search, typeFilter, provFilter, countFilter, priceIdx, indoorOnly, outdoorOnly, sortBy]);

  const hasFilters = !!(search || typeFilter || provFilter || countFilter || priceIdx !== null || indoorOnly || outdoorOnly);
  const resetFilters = () => {
    setSearch(""); setTypeFilter(null); setProvFilter(null);
    setCountFilter(null); setPriceIdx(null);
    setIndoorOnly(false); setOutdoorOnly(false); setSortBy("default");
  };

  /* ── Sidebar helpers ── */
  const SLabel = ({ children }: { children: React.ReactNode }) => (
    <p style={{
      fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase" as const,
      color: "var(--orange)", fontWeight: 700, marginBottom: 8, marginTop: 28,
      paddingBottom: 6, borderBottom: "1px solid rgba(237,110,33,0.15)",
    }}>{children}</p>
  );

  const SBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 8,
      width: "100%", textAlign: "left" as const,
      padding: "7px 10px", borderRadius: 2,
      border: "none",
      background: active ? "rgba(237,110,33,0.12)" : "transparent",
      color: active ? "var(--warm-white)" : "var(--grey)",
      fontSize: 13, cursor: "pointer",
      transition: "all 0.15s",
      marginBottom: 1,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
        background: active ? "var(--orange)" : "rgba(255,255,255,0.15)",
        transition: "background 0.15s",
      }} />
      {label}
    </button>
  );

  return (
    <div className="hi-page" style={{ background: "var(--black)" }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{
        paddingTop: "var(--nav-h)",
        background: "linear-gradient(150deg, #2c1400 0%, #3d1c00 45%, #1c0a00 100%)",
        borderBottom: "1px solid rgba(237,110,33,0.2)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Orange glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 70% 50%, rgba(237,110,33,0.25) 0%, transparent 65%)",
        }} />
        {/* Top line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(237,110,33,0.5) 50%, transparent 100%)",
        }} />

        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "72px 60px 60px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
            <div>
              <span className="hi-label hi-r" style={{
                display: "block", marginBottom: 16,
                color: "var(--orange)", letterSpacing: "0.14em",
              }}>
                {t.aanbod_label}
              </span>
              <h1 className="hi-r hi-r-d1" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.03em",
                color: "var(--warm-white)",
              }}>
                {t.aanbod_title1}<br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.aanbod_title2}</em>
              </h1>
            </div>
            <div className="hi-r hi-r-d2" style={{ textAlign: "right" as const, paddingBottom: 8 }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 64,
                color: "var(--orange)", lineHeight: 1, opacity: 0.9,
              }}>
                {filtered.length}
              </div>
              <div style={{
                fontSize: 11, letterSpacing: "0.14em",
                textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginTop: 6,
              }}>
                {t.aanbod_results ?? "eigendommen"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAYOUT: sidebar + grid ────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        maxWidth: 1600,
        margin: "0 auto",
        minHeight: "calc(100vh - var(--nav-h))",
      }}>

        {/* ─── SIDEBAR ──────────────────────────────── */}
        <aside style={{
          borderRight: "1px solid var(--border-dark)",
          background: "linear-gradient(180deg, rgba(26,14,4,0.6) 0%, var(--black) 100%)",
          padding: "32px 22px 60px",
          position: "sticky" as const,
          top: "var(--nav-h)",
          alignSelf: "start",
          maxHeight: "calc(100vh - var(--nav-h))",
          overflowY: "auto" as const,
        }}>

          {/* Search */}
          <div className="hi-search-wrap" style={{ marginBottom: 4 }}>
            <span className="hi-search-icon">⌕</span>
            <input
              className="hi-search-input"
              placeholder={t.aanbod_search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <SLabel>Type eigendom</SLabel>
          {TYPES.map((v) => (
            <SBtn key={v} label={v} active={typeFilter === v}
              onClick={() => setTypeFilter(typeFilter === v ? null : v)} />
          ))}

          <SLabel>Land</SLabel>
          {COUNTRIES.map((v) => (
            <SBtn key={v} label={v} active={countFilter === v}
              onClick={() => setCountFilter(countFilter === v ? null : v)} />
          ))}

          <SLabel>Provincie</SLabel>
          {PROVINCES.map((v) => (
            <SBtn key={v} label={v} active={provFilter === v}
              onClick={() => setProvFilter(provFilter === v ? null : v)} />
          ))}

          <SLabel>Prijsklasse</SLabel>
          {PRICE_RANGES.map((pr, i) => (
            <SBtn key={pr.label} label={pr.label} active={priceIdx === i}
              onClick={() => setPriceIdx(priceIdx === i ? null : i)} />
          ))}

          <SLabel>Infrastructuur</SLabel>
          <SBtn label="Overdekte rijhal" active={indoorOnly} onClick={() => setIndoorOnly(!indoorOnly)} />
          <SBtn label="Buitenpiste" active={outdoorOnly} onClick={() => setOutdoorOnly(!outdoorOnly)} />

          <SLabel>Sorteren</SLabel>
          {([
            { key: "default",    label: "Standaard" },
            { key: "price_asc",  label: "Prijs laag → hoog" },
            { key: "price_desc", label: "Prijs hoog → laag" },
            { key: "surface",    label: "Grootste oppervlakte" },
          ] as const).map((s) => (
            <SBtn key={s.key} label={s.label} active={sortBy === s.key}
              onClick={() => setSortBy(s.key)} />
          ))}

          {hasFilters && (
            <button onClick={resetFilters} style={{
              marginTop: 28, width: "100%", padding: "10px 0",
              border: "1px solid rgba(237,110,33,0.35)", borderRadius: 2,
              background: "transparent", color: "var(--orange)",
              fontSize: 11, letterSpacing: "0.1em",
              textTransform: "uppercase" as const, cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}>
              ✕ Filters wissen
            </button>
          )}
        </aside>

        {/* ─── PROPERTY CARDS ──────────────────────── */}
        <div style={{ padding: "40px 48px 80px" }}>

          {/* Result count + sort hint */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 32, paddingBottom: 20,
            borderBottom: "1px solid var(--border-dark)",
          }}>
            <span style={{ fontSize: 13, color: "var(--stone)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--warm-white)", marginRight: 8 }}>
                {filtered.length}
              </span>
              {t.aanbod_results ?? "eigendommen gevonden"}
            </span>
            {hasFilters && (
              <button onClick={resetFilters} style={{
                background: "none", border: "none", color: "var(--orange)",
                fontSize: 12, cursor: "pointer", letterSpacing: "0.06em",
                textDecoration: "underline", textUnderlineOffset: 3,
              }}>
                Filters wissen
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "100px 24px",
              border: "1px solid var(--border-dark)", borderRadius: 4,
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 36,
                color: "var(--warm-white)", marginBottom: 12,
              }}>
                {t.aanbod_noResults}
              </div>
              <button onClick={resetFilters} className="hi-btn hi-btn-orange"
                style={{ margin: "0 auto", display: "inline-flex" }}>
                {t.aanbod_noResultsBtn ?? "Filters wissen"}
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}>
              {filtered.map((p, i) => (
                <Link key={p.id} href={`${BASE}/aanbod/${p.id}`}
                  className={`hi-prop-card hi-r hi-r-d${(i % 3) + 1}`}>

                  {/* Image */}
                  <div className="hi-prop-img-wrap hi-img-reveal">
                    <div className="hi-prop-img-placeholder" style={{ background: warmGrad(i) }}>
                      {/* Horse icon overlay */}
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.15 }}>
                        <path d="M12 2C9 2 7 4 7 7c0 1.5.5 3 1.5 4L6 14v6h2v-5l2-2.5c.6.3 1.3.5 2 .5s1.4-.2 2-.5L16 15v5h2v-6l-2.5-3C16.5 10 17 8.5 17 7c0-3-2-5-5-5z" fill="white"/>
                      </svg>
                    </div>
                  </div>

                  {/* Badges */}
                  {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                  {p.featured && <span className="hi-prop-featured-badge">{t.feat_featured}</span>}

                  {/* Body */}
                  <div className="hi-prop-body">
                    <p className="hi-prop-loc">{p.province}, {p.country}</p>
                    <h3 className="hi-prop-title">{p.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--grey)", marginBottom: 14, lineHeight: 1.6 }}>
                      {p.subtitle}
                    </p>

                    <div className="hi-prop-stats">
                      <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                      <span className="hi-prop-stat">{p.stalls} {t.aanbod_stalls}</span>
                      <span className="hi-prop-stat">{p.type}</span>
                    </div>

                    {/* Infra pills */}
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginBottom: 14 }}>
                      {p.indoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid rgba(237,110,33,0.3)", borderRadius: 40, fontSize: 10, color: "var(--orange)", letterSpacing: "0.04em" }}>
                          Rijhal
                        </span>
                      )}
                      {p.outdoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 10, color: "var(--stone)", letterSpacing: "0.04em" }}>
                          Buitenpiste
                        </span>
                      )}
                      {p.residence && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 10, color: "var(--stone)", letterSpacing: "0.04em" }}>
                          Woning
                        </span>
                      )}
                    </div>

                    <div className="hi-prop-divider" />
                    <div className="hi-prop-footer">
                      <span className="hi-prop-price">
                        {p.priceOnRequest ? t.aanbod_onRequest : formatPrice(p.price!)}
                      </span>
                      <span className="hi-prop-link">
                        {t.aanbod_details} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
