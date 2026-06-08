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

  const SLabel = ({ children }: { children: React.ReactNode }) => (
    <p style={{
      fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" as const,
      color: "var(--orange)", fontWeight: 700,
      marginBottom: 6, marginTop: 24,
      paddingBottom: 6, borderBottom: "1px solid rgba(237,110,33,0.12)",
    }}>{children}</p>
  );

  const SBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 10,
      width: "100%", textAlign: "left" as const,
      padding: "7px 8px", borderRadius: 2, border: "none",
      background: active ? "rgba(237,110,33,0.1)" : "transparent",
      color: active ? "var(--warm-white)" : "rgba(255,255,255,0.45)",
      fontSize: 13, cursor: "pointer", transition: "all 0.15s",
      marginBottom: 1,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
        background: active ? "var(--orange)" : "rgba(255,255,255,0.18)",
        transition: "background 0.15s",
      }} />
      {label}
    </button>
  );

  return (
    <div className="hi-page" style={{ background: "var(--black)" }}>

      {/* ── HEADER — same dark style as rest of site ── */}
      <section style={{
        paddingTop: "var(--nav-h)",
        background: "var(--anthracite)",
        borderBottom: "1px solid var(--border-dark)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle orange radial — matches contact/verkopen pages */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 60% 40%, rgba(237,110,33,0.07) 0%, transparent 60%)",
        }} />

        <div className="hi-container" style={{ padding: "80px 80px 64px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: 48 }}>
            <div>
              <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>
                {t.aanbod_label}
              </span>
              <h1 className="hi-r hi-r-d1" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.03em",
              }}>
                {t.aanbod_title1}<br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.aanbod_title2}</em>
              </h1>
              <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 16, marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>
                {t.aanbod_desc}
              </p>
            </div>
            <div className="hi-r hi-r-d2" style={{ textAlign: "right" as const, paddingBottom: 6 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 72, color: "var(--orange)", lineHeight: 1 }}>
                {filtered.length}
              </div>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--stone)", marginTop: 6 }}>
                {t.aanbod_results ?? "eigendommen"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY: sidebar + cards ────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "80vh" }}>

        {/* ── SIDEBAR ──────────────────────────────── */}
        <aside style={{
          background: "var(--anthracite)",
          borderRight: "1px solid var(--border-dark)",
          padding: "32px 24px 60px",
          position: "sticky" as const,
          top: "var(--nav-h)",
          alignSelf: "start",
          maxHeight: "calc(100vh - var(--nav-h))",
          overflowY: "auto" as const,
        }}>
          {/* Search */}
          <div className="hi-search-wrap">
            <span className="hi-search-icon">⌕</span>
            <input className="hi-search-input" placeholder={t.aanbod_search}
              value={search} onChange={(e) => setSearch(e.target.value)} />
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
              marginTop: 24, width: "100%", padding: "10px 0",
              border: "1px solid rgba(237,110,33,0.3)", borderRadius: 2,
              background: "transparent", color: "var(--orange)",
              fontSize: 11, letterSpacing: "0.1em",
              textTransform: "uppercase" as const, cursor: "pointer",
            }}>
              ✕ Filters wissen
            </button>
          )}
        </aside>

        {/* ── CARDS ──────────────────────────────────── */}
        <div style={{ padding: "40px 48px 80px", background: "var(--black)" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 32, paddingBottom: 20, borderBottom: "1px solid var(--border-dark)",
          }}>
            <span style={{ fontSize: 13, color: "var(--stone)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--warm-white)", marginRight: 8 }}>
                {filtered.length}
              </span>
              {t.aanbod_results ?? "eigendommen gevonden"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "100px 24px",
              border: "1px solid var(--border-dark)", borderRadius: 4,
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--warm-white)", marginBottom: 12 }}>
                {t.aanbod_noResults}
              </div>
              <button onClick={resetFilters} className="hi-btn hi-btn-orange"
                style={{ margin: "0 auto", display: "inline-flex" }}>
                {t.aanbod_noResultsBtn ?? "Filters wissen"}
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
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
                    <p style={{ fontSize: 12, color: "var(--grey)", marginBottom: 14, lineHeight: 1.6 }}>{p.subtitle}</p>
                    <div className="hi-prop-stats">
                      <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                      <span className="hi-prop-stat">{p.stalls} {t.aanbod_stalls}</span>
                      <span className="hi-prop-stat">{p.type}</span>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginBottom: 14 }}>
                      {p.indoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid rgba(237,110,33,0.3)", borderRadius: 40, fontSize: 10, color: "var(--orange)" }}>Rijhal</span>
                      )}
                      {p.outdoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 10, color: "var(--stone)" }}>Buitenpiste</span>
                      )}
                      {p.residence && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 10, color: "var(--stone)" }}>Woning</span>
                      )}
                    </div>
                    <div className="hi-prop-divider" />
                    <div className="hi-prop-footer">
                      <span className="hi-prop-price">
                        {p.priceOnRequest ? t.aanbod_onRequest : formatPrice(p.price!)}
                      </span>
                      <span className="hi-prop-link">{t.aanbod_details} →</span>
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
