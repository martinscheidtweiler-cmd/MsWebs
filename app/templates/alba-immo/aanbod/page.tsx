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

  const hasFilters = search || typeFilter || provFilter || countFilter || priceIdx !== null || indoorOnly || outdoorOnly;
  const resetFilters = () => {
    setSearch(""); setTypeFilter(null); setProvFilter(null);
    setCountFilter(null); setPriceIdx(null); setIndoorOnly(false);
    setOutdoorOnly(false); setSortBy("default");
  };

  /* Sidebar pill toggle */
  const FilterPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "9px 14px",
        borderRadius: 3,
        border: `1px solid ${active ? "var(--orange)" : "transparent"}`,
        background: active ? "rgba(237,110,33,0.12)" : "transparent",
        color: active ? "var(--orange)" : "var(--stone)",
        fontSize: 13,
        letterSpacing: "0.02em",
        cursor: "pointer",
        transition: "all 0.18s ease",
      }}
    >
      {active && <span style={{ marginRight: 8, fontSize: 10 }}>●</span>}
      {label}
    </button>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p style={{
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      color: "var(--orange)",
      fontWeight: 600,
      marginBottom: 10,
      paddingBottom: 8,
      borderBottom: "1px solid rgba(237,110,33,0.2)",
    }}>
      {children}
    </p>
  );

  return (
    <div className="hi-page" style={{ background: "var(--black)", minHeight: "100vh" }}>

      {/* ── HERO ───────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "var(--nav-h)",
          background: "linear-gradient(135deg, #1a0e04 0%, #2d1a08 40%, #1a0e04 100%)",
          borderBottom: "1px solid rgba(237,110,33,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 60% 50%, rgba(237,110,33,0.18) 0%, rgba(237,110,33,0.04) 45%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(237,110,33,0.4), transparent)",
        }} />

        <div className="hi-container" style={{ padding: "80px 60px 64px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: 40 }}>
            <div>
              <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16, color: "var(--orange)" }}>
                {t.aanbod_label}
              </span>
              <h1
                className="hi-r hi-r-d1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(38px, 5.5vw, 72px)",
                  fontWeight: 400,
                  lineHeight: 1.04,
                  letterSpacing: "-0.03em",
                  color: "var(--warm-white)",
                }}
              >
                {t.aanbod_title1}<br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.aanbod_title2}</em>
              </h1>
            </div>
            <div className="hi-r hi-r-d2" style={{ paddingBottom: 6, textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--orange)", lineHeight: 1 }}>
                {filtered.length}
              </div>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--stone)", marginTop: 4 }}>
                {t.aanbod_results ?? "eigendommen"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY: sidebar + grid ───────────────────────── */}
      <div
        className="hi-container"
        style={{
          padding: "0 60px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 48,
          alignItems: "start",
        }}
      >

        {/* ── SIDEBAR ──────────────────────────────────── */}
        <aside style={{ paddingTop: 48, paddingBottom: 80, position: "sticky", top: "var(--nav-h)" }}>

          {/* Search */}
          <div style={{ marginBottom: 32 }}>
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

          {/* Type */}
          <div style={{ marginBottom: 28 }}>
            <SectionTitle>Type eigendom</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              {TYPES.map((type) => (
                <FilterPill
                  key={type}
                  label={type}
                  active={typeFilter === type}
                  onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                />
              ))}
            </div>
          </div>

          {/* Country */}
          <div style={{ marginBottom: 28 }}>
            <SectionTitle>Land</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              {COUNTRIES.map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  active={countFilter === c}
                  onClick={() => setCountFilter(countFilter === c ? null : c)}
                />
              ))}
            </div>
          </div>

          {/* Province */}
          <div style={{ marginBottom: 28 }}>
            <SectionTitle>Provincie</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              {PROVINCES.map((p) => (
                <FilterPill
                  key={p}
                  label={p}
                  active={provFilter === p}
                  onClick={() => setProvFilter(provFilter === p ? null : p)}
                />
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 28 }}>
            <SectionTitle>Prijsklasse</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              {PRICE_RANGES.map((pr, i) => (
                <FilterPill
                  key={pr.label}
                  label={pr.label}
                  active={priceIdx === i}
                  onClick={() => setPriceIdx(priceIdx === i ? null : i)}
                />
              ))}
            </div>
          </div>

          {/* Infra */}
          <div style={{ marginBottom: 28 }}>
            <SectionTitle>Infrastructuur</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              <FilterPill
                label="Overdekte rijhal"
                active={indoorOnly}
                onClick={() => setIndoorOnly(!indoorOnly)}
              />
              <FilterPill
                label="Buitenpiste"
                active={outdoorOnly}
                onClick={() => setOutdoorOnly(!outdoorOnly)}
              />
            </div>
          </div>

          {/* Sort */}
          <div style={{ marginBottom: 28 }}>
            <SectionTitle>Sorteren</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              {([
                { key: "default",    label: "Standaard" },
                { key: "price_asc",  label: "Prijs laag → hoog" },
                { key: "price_desc", label: "Prijs hoog → laag" },
                { key: "surface",    label: "Grootste oppervlakte" },
              ] as const).map((s) => (
                <FilterPill
                  key={s.key}
                  label={s.label}
                  active={sortBy === s.key}
                  onClick={() => setSortBy(s.key)}
                />
              ))}
            </div>
          </div>

          {/* Reset */}
          {hasFilters && (
            <button
              onClick={resetFilters}
              style={{
                width: "100%",
                padding: "11px",
                border: "1px solid var(--orange)",
                borderRadius: 3,
                background: "transparent",
                color: "var(--orange)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Filters wissen
            </button>
          )}
        </aside>

        {/* ── MAIN GRID ────────────────────────────────── */}
        <div style={{ paddingTop: 48, paddingBottom: 80 }}>

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "100px 24px",
                border: "1px solid var(--border-dark)",
                borderRadius: 4,
                color: "var(--stone)",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 12, color: "var(--warm-white)" }}>
                {t.aanbod_noResults}
              </div>
              <button onClick={resetFilters} className="hi-btn hi-btn-orange" style={{ margin: "24px auto 0", display: "inline-flex" }}>
                {t.aanbod_noResultsBtn ?? "Filters wissen"}
              </button>
            </div>
          ) : (
            <div className="hi-prop-grid">
              {filtered.map((p, i) => (
                <Link
                  key={p.id}
                  href={`${BASE}/aanbod/${p.id}`}
                  className={`hi-prop-card hi-r hi-r-d${(i % 3) + 