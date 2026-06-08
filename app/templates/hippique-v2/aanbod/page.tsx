"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PROPERTIES, formatPrice, formatSurface } from "../data";

const BASE = "/templates/hippique-v2";

const TYPES      = ["Alle types", "Stoeterij", "Manège", "Pensionstallen", "Landgoed", "Kasteeldomein", "Hoeve"];
const PROVINCES  = ["Alle provincies", "Antwerpen", "Oost-Vlaanderen", "Limburg", "Namen", "Calvados"];
const COUNTRIES  = ["Alle landen", "België", "Nederland", "Frankrijk"];
const PRICE_RANGES = [
  { label: "Alle prijzen", min: 0,       max: Infinity },
  { label: "< €1.000.000", min: 0,       max: 999999 },
  { label: "€1M – €2M",    min: 1000000, max: 2000000 },
  { label: "€2M – €4M",    min: 2000000, max: 4000000 },
  { label: "> €4M",        min: 4000001, max: Infinity },
  { label: "Op aanvraag",  min: -1,      max: -1 },
];

export default function AanbodPage() {
  // Reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".hi-r, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Filters
  const [search,      setSearch]      = useState("");
  const [typeFilter,  setTypeFilter]  = useState("Alle types");
  const [provFilter,  setProvFilter]  = useState("Alle provincies");
  const [countFilter, setCountFilter] = useState("Alle landen");
  const [priceIdx,    setPriceIdx]    = useState(0);
  const [indoorOnly,  setIndoorOnly]  = useState(false);
  const [outdoorOnly, setOutdoorOnly] = useState(false);
  const [minStalls,   setMinStalls]   = useState(0);
  const [sortBy,      setSortBy]      = useState<"default" | "price_asc" | "price_desc" | "surface">("default");
  const [view,        setView]        = useState<"grid" | "masonry">("grid");

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES[priceIdx];
    let list = PROPERTIES.filter((p) => {
      if (search && !`${p.title} ${p.location} ${p.type}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter  !== "Alle types"     && p.type     !== typeFilter)  return false;
      if (provFilter  !== "Alle provincies" && p.province !== provFilter) return false;
      if (countFilter !== "Alle landen"    && p.country  !== countFilter) return false;
      if (indoorOnly  && !p.indoorArena)  return false;
      if (outdoorOnly && !p.outdoorArena) return false;
      if (minStalls > 0 && p.stalls < minStalls) return false;
      if (pr.min === -1) { return p.priceOnRequest; }
      if (!p.priceOnRequest) {
        if (p.price === null) return false;
        if (p.price < pr.min || p.price > pr.max) return false;
      }
      return true;
    });
    if (sortBy === "price_asc")  list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortBy === "price_desc") list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sortBy === "surface")    list = [...list].sort((a, b) => b.groundSurface - a.groundSurface);
    return list;
  }, [search, typeFilter, provFilter, countFilter, priceIdx, indoorOnly, outdoorOnly, minStalls, sortBy]);

  const resetFilters = () => {
    setSearch(""); setTypeFilter("Alle types"); setProvFilter("Alle provincies");
    setCountFilter("Alle landen"); setPriceIdx(0); setIndoorOnly(false);
    setOutdoorOnly(false); setMinStalls(0); setSortBy("default");
  };

  const hasFilters = search || typeFilter !== "Alle types" || provFilter !== "Alle provincies" ||
    countFilter !== "Alle landen" || priceIdx !== 0 || indoorOnly || outdoorOnly || minStalls > 0;

  return (
    <div className="hi-page hi-aanbod-wrap">
      {/* ── Header ─────────────────────────────── */}
      <div className="hi-aanbod-header">
        <span className="hi-label hi-r">Volledig aanbod</span>
        <h1
          className="hi-r hi-r-d1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,5vw,72px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginTop: 12,
          }}
        >
          Hippisch vastgoed<br />
          <em style={{ fontStyle: "italic", color: "var(--orange)" }}>van topniveau</em>
        </h1>
        <p style={{ color: "var(--stone)", marginTop: 16, maxWidth: 560, fontSize: 16 }} className="hi-r hi-r-d2">
          {PROPERTIES.length} zorgvuldig geselecteerde eigendommen — stoeterijen, maneges, landgoederen en kasteeldomeinen in de Benelux en Noord-Frankrijk.
        </p>
      </div>

      {/* ── Body: sidebar + main ─────────────── */}
      <div className="hi-aanbod-body">

        {/* SIDEBAR */}
        <aside className="hi-aanbod-sidebar">
          <div style={{ marginBottom: 24 }}>
            <div className="hi-search-wrap">
              <span className="hi-search-icon">⌕</span>
              <input
                className="hi-search-input"
                placeholder="Zoek eigendom, locatie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Type */}
          <div className="hi-filter-section">
            <p className="hi-filter-section-title">Type eigendom</p>
            <div className="hi-checkbox-group">
              {TYPES.slice(1).map((t) => (
                <label key={t} className="hi-checkbox-item">
                  <input
                    type="checkbox"
                    checked={typeFilter === t}
                    onChange={() => setTypeFilter(typeFilter === t ? "Alle types" : t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Province */}
          <div className="hi-filter-section">
            <p className="hi-filter-section-title">Provincie</p>
            <select
              className="hi-filter-select"
              value={provFilter}
              onChange={(e) => setProvFilter(e.target.value)}
              style={{ width: "100%" }}
            >
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="hi-filter-section">
            <p className="hi-filter-section-title">Land</p>
            <div className="hi-checkbox-group">
              {COUNTRIES.slice(1).map((c) => (
                <label key={c} className="hi-checkbox-item">
                  <input
                    type="checkbox"
                    checked={countFilter === c}
                    onChange={() => setCountFilter(countFilter === c ? "Alle landen" : c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="hi-filter-section">
            <p className="hi-filter-section-title">Prijsklasse</p>
            <div className="hi-checkbox-group">
              {PRICE_RANGES.map((pr, i) => (
                <label key={pr.label} className="hi-checkbox-item">
                  <input
                    type="checkbox"
                    checked={priceIdx === i}
                    onChange={() => setPriceIdx(priceIdx === i ? 0 : i)}
                  />
                  <span>{pr.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Infrastructuur */}
          <div className="hi-filter-section">
            <p className="hi-filter-section-title">Infrastructuur</p>
            <div className="hi-checkbox-group">
              <label className="hi-checkbox-item">
                <input type="checkbox" checked={indoorOnly} onChange={(e) => setIndoorOnly(e.target.checked)} />
                <span>Overdekte rijhal</span>
              </label>
              <label className="hi-checkbox-item">
                <input type="checkbox" checked={outdoorOnly} onChange={(e) => setOutdoorOnly(e.target.checked)} />
                <span>Buitenpiste</span>
              </label>
            </div>
          </div>

          {/* Min stalls */}
          <div className="hi-filter-section">
            <p className="hi-filter-section-title">Minimum stallen: {minStalls === 0 ? "Geen minimum" : `${minStalls}+`}</p>
            <input
              type="range"
              className="hi-range-input"
              min={0} max={50} step={5}
              value={minStalls}
              onChange={(e) => setMinStalls(Number(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--grey)", marginTop: 4 }}>
              <span>0</span><span>25</span><span>50+</span>
            </div>
          </div>

          {/* Reset */}
          {hasFilters && (
            <button
              onClick={resetFilters}
              style={{
                width: "100%", padding: "10px", marginTop: 8,
                border: "1px solid var(--border)",
                borderRadius: 2,
                color: "var(--orange)",
                fontSize: 13,
                letterSpacing: "0.08em",
                cursor: "pointer",
                background: "var(--orange-subtle)",
                transition: "background 0.2s",
              }}
            >
              Filters wissen
            </button>
          )}
        </aside>

        {/* MAIN */}
        <div className="hi-aanbod-main">
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div className="hi-results-count">
              <strong>{filtered.length}</strong> eigendom{filtered.length !== 1 ? "men" : ""} gevonden
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* Sort */}
              <select
                className="hi-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              >
                <option value="default">Sortering: Standaard</option>
                <option value="price_asc">Prijs: Laag → Hoog</option>
                <option value="price_desc">Prijs: Hoog → Laag</option>
                <option value="surface">Oppervlakte</option>
              </select>

              {/* View toggle */}
              <div style={{ display: "flex", border: "1px solid var(--border-dark)", borderRadius: 2, overflow: "hidden" }}>
                {(["grid", "masonry"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      padding: "8px 14px",
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background: view === v ? "var(--orange)" : "transparent",
                      color: view === v ? "#fff" : "var(--stone)",
                      transition: "all 0.2s",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    {v === "grid" ? "⊞ Grid" : "⊡ Masonry"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="hi-active-chips">
              {search       && <span className="hi-chip" onClick={() => setSearch("")}>"{search}" ×</span>}
              {typeFilter  !== "Alle types"      && <span className="hi-chip" onClick={() => setTypeFilter("Alle types")}>{typeFilter} ×</span>}
              {provFilter  !== "Alle provincies" && <span className="hi-chip" onClick={() => setProvFilter("Alle provincies")}>{provFilter} ×</span>}
              {countFilter !== "Alle landen"     && <span className="hi-chip" onClick={() => setCountFilter("Alle landen")}>{countFilter} ×</span>}
              {priceIdx    !== 0                 && <span className="hi-chip" onClick={() => setPriceIdx(0)}>{PRICE_RANGES[priceIdx].label} ×</span>}
              {indoorOnly  && <span className="hi-chip" onClick={() => setIndoorOnly(false)}>Rijhal ×</span>}
              {outdoorOnly && <span className="hi-chip" onClick={() => setOutdoorOnly(false)}>Buitenpiste ×</span>}
              {minStalls > 0 && <span className="hi-chip" onClick={() => setMinStalls(0)}>{minStalls}+ stallen ×</span>}
            </div>
          )}

          {/* Results */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                border: "1px solid var(--border-dark)",
                borderRadius: 4,
                color: "var(--stone)",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, marginBottom: 12, color: "var(--warm-white)" }}>
                Geen resultaten
              </div>
              <p style={{ marginBottom: 20 }}>Pas de filters aan om meer eigendommen te zien.</p>
              <button onClick={resetFilters} className="hi-btn hi-btn-orange" style={{ margin: "0 auto" }}>
                Filters wissen
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="hi-prop-grid">
              {filtered.map((p, i) => (
                <Link key={p.id} href={`${BASE}/aanbod/${p.id}`} className={`hi-prop-card hi-r hi-r-d${(i % 3) + 1}`}>
                  <div className="hi-prop-img-wrap hi-img-reveal">
                    <div className="hi-prop-img-placeholder" style={{ background: p.gradient }} />
                  </div>
                  {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                  {p.featured && <span className="hi-prop-featured-badge">Uitgelicht</span>}
                  <div className="hi-prop-body">
                    <p className="hi-prop-loc">{p.province}, {p.country}</p>
                    <h3 className="hi-prop-title">{p.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--grey)", marginBottom: 12, lineHeight: 1.5 }}>
                      {p.subtitle}
                    </p>
                    <div className="hi-prop-stats">
                      <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                      <span className="hi-prop-stat">{p.stalls} stallen</span>
                      <span className="hi-prop-stat">{p.type}</span>
                    </div>
                    {/* Badges */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                      {p.indoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border)", borderRadius: 40, fontSize: 11, color: "var(--orange)" }}>
                          Rijhal
                        </span>
                      )}
                      {p.outdoorArena && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 11, color: "var(--stone)" }}>
                          Buitenpiste
                        </span>
                      )}
                      {p.residence && (
                        <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 11, color: "var(--stone)" }}>
                          Woning
                        </span>
                      )}
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
          ) : (
            <div className="hi-masonry">
              {filtered.map((p, i) => (
                <Link key={p.id} href={`${BASE}/aanbod/${p.id}`} className={`hi-prop-card hi-r hi-r-d${(i % 3) + 1}`}>
                  <div className="hi-prop-img-wrap hi-img-reveal">
                    <div className="hi-prop-img-placeholder" style={{ background: p.gradient }} />
                  </div>
                  {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                  <div className="hi-prop-body">
                    <p className="hi-prop-loc">{p.province}, {p.country}</p>
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
                      <span className="hi-prop-link">→</span>
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
