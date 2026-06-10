"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PROPERTIES as STATIC_PROPS, formatPrice, formatSurface } from "../data";
import type { Property } from "../data";
import { useLang } from "../LangContext";

function useIsMobile(bp = 1024) {
  const [v, set] = useState(false);
  useEffect(() => {
    const fn = () => set(window.innerWidth <= bp);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return v;
}

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
const PROVINCES = ["Antwerpen", "Oost-Vlaanderen", "Limburg", "Namen", "Calvados"];
const COUNTRIES = ["België", "Nederland", "Frankrijk", "Spanje"];
const PRICE_RANGES = [
  { label: "< €1.000.000",  min: 0,       max: 999999 },
  { label: "€1M – €2M",     min: 1000000, max: 2000000 },
  { label: "€2M – €4M",     min: 2000000, max: 4000000 },
  { label: "> €4M",         min: 4000001, max: Infinity },
  { label: "Op aanvraag",   min: -1,      max: -1 },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: "Te koop",    color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  sold:     { label: "Verkocht",   color: "#f87171", bg: "rgba(248,113,113,0.1)" },
  reserved: { label: "Gereserveerd", color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
  option:   { label: "Onder optie", color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
};

function AccordionSection({
  title, count, children, defaultOpen = false,
}: {
  title: string; count?: number; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 0", background: "none", border: "none",
          cursor: "pointer", color: "var(--warm-white)",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--stone)" }}>
          {title}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {count !== undefined && count > 0 && (
            <span style={{ fontSize: 10, background: "var(--orange)", color: "#fff", borderRadius: 40, padding: "1px 7px", fontWeight: 700 }}>
              {count}
            </span>
          )}
          <span style={{ fontSize: 14, color: "var(--stone)", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>
            ↓
          </span>
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 12 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "5px 12px", margin: "3px 4px 3px 0",
        borderRadius: 4,
        border: active ? "1px solid var(--orange)" : "1px solid rgba(255,255,255,0.1)",
        background: active ? "rgba(237,110,33,0.12)" : "transparent",
        color: active ? "var(--warm-white)" : "rgba(255,255,255,0.45)",
        fontSize: 12, cursor: "pointer", transition: "all 0.15s",
        fontFamily: "inherit",
      }}
    >
      {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />}
      {label}
    </button>
  );
}

export default function AanbodPage() {
  const { t } = useLang();
  const isMobile = useIsMobile();
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

  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState<string | null>(null);
  const [provFilter,   setProvFilter]   = useState<string | null>(null);
  const [countFilter,  setCountFilter]  = useState<string | null>(null);
  const [priceIdx,     setPriceIdx]     = useState<number | null>(null);
  const [indoorOnly,   setIndoorOnly]   = useState(false);
  const [outdoorOnly,  setOutdoorOnly]  = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy,       setSortBy]       = useState<"default" | "price_asc" | "price_desc" | "surface">("default");
  const [filtersOpen,  setFiltersOpen]  = useState(false);

  const filtered = useMemo(() => {
    let list = allProps.filter((p) => {
      if (search && !`${p.title} ${p.location} ${p.type}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter   && p.type     !== typeFilter)   return false;
      if (provFilter   && p.province !== provFilter)   return false;
      if (countFilter  && p.country  !== countFilter)  return false;
      if (statusFilter && (p.status ?? "active") !== statusFilter) return false;
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
  }, [allProps, search, typeFilter, provFilter, countFilter, priceIdx, indoorOnly, outdoorOnly, statusFilter, sortBy]);

  const activeFilterCount = [typeFilter, provFilter, countFilter, priceIdx !== null ? "x" : null, indoorOnly ? "x" : null, outdoorOnly ? "x" : null, statusFilter].filter(Boolean).length;
  const hasFilters = !!(search || activeFilterCount);

  const resetFilters = () => {
    setSearch(""); setTypeFilter(null); setProvFilter(null);
    setCountFilter(null); setPriceIdx(null);
    setIndoorOnly(false); setOutdoorOnly(false);
    setStatusFilter(null); setSortBy("default");
  };

  return (
    <div className="hi-page" style={{ background: "var(--black)" }}>

      {/* ── HEADER ── */}
      <section style={{
        paddingTop: "var(--nav-h)",
        background: "var(--anthracite)",
        borderBottom: "1px solid var(--border-dark)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 60% 40%, rgba(237,110,33,0.07) 0%, transparent 60%)" }} />
        <div className="hi-container" style={{ padding: isMobile ? "56px 20px 32px" : "80px 80px 64px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", alignItems: "flex-end", gap: isMobile ? 24 : 48 }}>
            <div>
              <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>{t.aanbod_label}</span>
              <h1 className="hi-r hi-r-d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
                {t.aanbod_title1}<br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.aanbod_title2}</em>
              </h1>
              <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 16, marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>{t.aanbod_desc}</p>
            </div>
            <div className="hi-r hi-r-d2" style={{ textAlign: isMobile ? "left" : "right" as const, paddingBottom: 6 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? 52 : 72, color: "var(--orange)", lineHeight: 1 }}>{filtered.length}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--stone)", marginTop: 6 }}>{t.aanbod_results ?? "eigendommen"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", minHeight: "80vh" }}>

        {/* ── SIDEBAR ── */}
        <aside className="hi-aanbod-filter-aside" style={{
          background: "#0e0d0b",
          borderRight: isMobile ? "none" : "1px solid var(--border-dark)",
          borderBottom: isMobile ? "1px solid var(--border-dark)" : "none",
          position: isMobile ? "relative" : "sticky" as const,
          top: isMobile ? "auto" : "var(--nav-h)",
          alignSelf: "start",
          maxHeight: isMobile ? "none" : "calc(100vh - var(--nav-h))",
          overflowY: isMobile ? "visible" : "auto" as const,
        }}>

          {/* Mobile toggle */}
          {isMobile && (
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px", background: "transparent", border: "none",
                borderBottom: filtersOpen ? "1px solid var(--border-dark)" : "none",
                color: "var(--warm-white)", cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                Filters
                {activeFilterCount > 0 && (
                  <span style={{ background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 40 }}>
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <span style={{ fontSize: 12, color: "var(--stone)", transform: filtersOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s", display: "inline-block" }}>↓</span>
            </button>
          )}

          {/* Filter content */}
          {(!isMobile || filtersOpen) && (
            <div style={{ padding: isMobile ? "16px 20px 24px" : "20px 20px 40px" }}>

              {/* Search */}
              <div style={{ position: "relative", marginBottom: 20 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--stone)", fontSize: 14, pointerEvents: "none" }}>⌕</span>
                <input
                  placeholder={t.aanbod_search}
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6, padding: "9px 12px 9px 32px", color: "var(--warm-white)",
                    fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" as const, outline: "none",
                  }}
                />
              </div>

              {/* Type */}
              <AccordionSection title="Type eigendom" count={typeFilter ? 1 : 0} defaultOpen={true}>
                <div style={{ display: "flex", flexWrap: "wrap" as const }}>
                  {TYPES.map(v => (
                    <FilterChip key={v} label={v} active={typeFilter === v} onClick={() => setTypeFilter(typeFilter === v ? null : v)} />
                  ))}
                </div>
              </AccordionSection>

              {/* Land */}
              <AccordionSection title="Land" count={countFilter ? 1 : 0} defaultOpen={true}>
                <div style={{ display: "flex", flexWrap: "wrap" as const }}>
                  {COUNTRIES.map(v => (
                    <FilterChip key={v} label={v} active={countFilter === v} onClick={() => setCountFilter(countFilter === v ? null : v)} />
                  ))}
                </div>
              </AccordionSection>

              {/* Provincie */}
              <AccordionSection title="Provincie" count={provFilter ? 1 : 0}>
                <div style={{ display: "flex", flexWrap: "wrap" as const }}>
                  {PROVINCES.map(v => (
                    <FilterChip key={v} label={v} active={provFilter === v} onClick={() => setProvFilter(provFilter === v ? null : v)} />
                  ))}
                </div>
              </AccordionSection>

              {/* Prijsklasse */}
              <AccordionSection title="Prijsklasse" count={priceIdx !== null ? 1 : 0} defaultOpen={true}>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
                  {PRICE_RANGES.map((pr, i) => (
                    <button
                      key={pr.label}
                      onClick={() => setPriceIdx(priceIdx === i ? null : i)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "8px 10px", borderRadius: 4, border: "none",
                        background: priceIdx === i ? "rgba(237,110,33,0.1)" : "transparent",
                        color: priceIdx === i ? "var(--warm-white)" : "rgba(255,255,255,0.45)",
                        fontSize: 13, cursor: "pointer", textAlign: "left" as const, fontFamily: "inherit",
                      }}
                    >
                      <span>{pr.label}</span>
                      {priceIdx === i && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />}
                    </button>
                  ))}
                </div>
              </AccordionSection>

              {/* Status */}
              <AccordionSection title="Status" count={statusFilter ? 1 : 0} defaultOpen={true}>
                <div style={{ display: "flex", flexWrap: "wrap" as const }}>
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <button
                      key={key}
                      onClick={() => setStatusFilter(statusFilter === key ? null : key)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 10px", margin: "3px 4px 3px 0", borderRadius: 4,
                        border: statusFilter === key ? `1px solid ${cfg.color}` : "1px solid rgba(255,255,255,0.08)",
                        background: statusFilter === key ? cfg.bg : "transparent",
                        color: statusFilter === key ? cfg.color : "rgba(255,255,255,0.45)",
                        fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </AccordionSection>

              {/* Infrastructuur */}
              <AccordionSection title="Infrastructuur" count={(indoorOnly ? 1 : 0) + (outdoorOnly ? 1 : 0)}>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, paddingTop: 4 }}>
                  {[
                    { label: "Overdekte rijhal", state: indoorOnly, set: setIndoorOnly },
                    { label: "Buitenpiste", state: outdoorOnly, set: setOutdoorOnly },
                  ].map(item => (
                    <label key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <span style={{
                        width: 16, height: 16, borderRadius: 3, flexShrink: 0,
                        border: item.state ? "none" : "1px solid rgba(255,255,255,0.2)",
                        background: item.state ? "var(--orange)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                        onClick={() => item.set(!item.state)}
                      >
                        {item.state && <span style={{ fontSize: 10, color: "#fff" }}>✓</span>}
                      </span>
                      <span style={{ fontSize: 13, color: item.state ? "var(--warm-white)" : "rgba(255,255,255,0.45)" }}
                        onClick={() => item.set(!item.state)}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </AccordionSection>

              {/* Sorteren */}
              <AccordionSection title="Sorteren">
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
                  {([
                    { key: "default",    label: "Standaard" },
                    { key: "price_asc",  label: "Prijs laag → hoog" },
                    { key: "price_desc", label: "Prijs hoog → laag" },
                    { key: "surface",    label: "Grootste oppervlakte" },
                  ] as const).map(s => (
                    <button key={s.key} onClick={() => setSortBy(s.key)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "8px 10px", borderRadius: 4, border: "none",
                        background: sortBy === s.key ? "rgba(237,110,33,0.1)" : "transparent",
                        color: sortBy === s.key ? "var(--warm-white)" : "rgba(255,255,255,0.45)",
                        fontSize: 13, cursor: "pointer", textAlign: "left" as const, fontFamily: "inherit",
                      }}
                    >
                      {s.label}
                      {sortBy === s.key && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />}
                    </button>
                  ))}
                </div>
              </AccordionSection>

              {/* Reset */}
              {hasFilters && (
                <button onClick={resetFilters} style={{
                  marginTop: 20, width: "100%", padding: "9px 0",
                  border: "1px solid rgba(237,110,33,0.25)", borderRadius: 4,
                  background: "transparent", color: "var(--orange)",
                  fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                  ✕ Filters wissen
                </button>
              )}
            </div>
          )}
        </aside>

        {/* ── CARDS ── */}
        <div style={{ padding: isMobile ? "24px 16px 60px" : "36px 40px 80px", background: "var(--black)" }}>

          {/* Toolbar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 28, paddingBottom: 18, borderBottom: "1px solid var(--border-dark)",
            flexWrap: "wrap" as const, gap: 12,
          }}>
            <span style={{ fontSize: 13, color: "var(--stone)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--warm-white)", marginRight: 8 }}>{filtered.length}</span>
              {t.aanbod_results ?? "eigendommen gevonden"}
            </span>
            {/* Active filter pills */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {typeFilter && (
                <span onClick={() => setTypeFilter(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 40, background: "rgba(237,110,33,0.1)", border: "1px solid rgba(237,110,33,0.3)", fontSize: 11, color: "var(--orange)", cursor: "pointer" }}>
                  {typeFilter} ×
                </span>
              )}
              {countFilter && (
                <span onClick={() => setCountFilter(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 40, background: "rgba(237,110,33,0.1)", border: "1px solid rgba(237,110,33,0.3)", fontSize: 11, color: "var(--orange)", cursor: "pointer" }}>
                  {countFilter} ×
                </span>
              )}
              {priceIdx !== null && (
                <span onClick={() => setPriceIdx(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 40, background: "rgba(237,110,33,0.1)", border: "1px solid rgba(237,110,33,0.3)", fontSize: 11, color: "var(--orange)", cursor: "pointer" }}>
                  {PRICE_RANGES[priceIdx].label} ×
                </span>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 24px", border: "1px solid var(--border-dark)", borderRadius: 4 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--warm-white)", marginBottom: 12 }}>{t.aanbod_noResults}</div>
              <button onClick={resetFilters} className="hi-btn hi-btn-orange" style={{ margin: "0 auto", display: "inline-flex" }}>
                {t.aanbod_noResultsBtn ?? "Filters wissen"}
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: isMobile ? 16 : 24 }}>
              {filtered.map((p, i) => {
                const status = STATUS_CONFIG[p.status ?? "active"] ?? STATUS_CONFIG.active;
                return (
                  <Link key={p.id} href={`${BASE}/aanbod/${p.id}`}
                    className={`hi-prop-card hi-r hi-r-d${(i % 3) + 1}`}
                    style={{ position: "relative" }}
                  >
                    <div className="hi-prop-img-wrap hi-img-reveal">
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div className="hi-prop-img-placeholder" style={{ background: warmGrad(i) }} />
                      )}
                    </div>
                    {/* Top-right badges (status + featured), stacked to avoid overlap */}
                    <div style={{ position: "absolute", top: 12, right: 12, zIndex: 4, display: "flex", flexDirection: "column" as const, alignItems: "flex-end" as const, gap: 6 }}>
                      {p.status && p.status !== "active" && (
                        <span style={{
                          padding: "3px 10px", borderRadius: 40, fontSize: 10, fontWeight: 700,
                          letterSpacing: "0.06em", textTransform: "uppercase" as const,
                          background: status.bg, color: status.color,
                          border: `1px solid ${status.color}`,
                          backdropFilter: "blur(8px)",
                        }}>
                          {status.label}
                        </span>
                      )}
                      {p.featured && <span className="hi-prop-featured-badge" style={{ position: "static" as const }}>{t.feat_featured}</span>}
                    </div>
                    {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
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
                        {p.indoorArena && <span style={{ padding: "2px 8px", border: "1px solid rgba(237,110,33,0.3)", borderRadius: 40, fontSize: 10, color: "var(--orange)" }}>Rijhal</span>}
                        {p.outdoorArena && <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 10, color: "var(--stone)" }}>Buitenpiste</span>}
                        {p.residence && <span style={{ padding: "2px 8px", border: "1px solid var(--border-dark)", borderRadius: 40, fontSize: 10, color: "var(--stone)" }}>Woning</span>}
                        {p.epcLabel && <span style={{ padding: "2px 8px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 40, fontSize: 10, color: "var(--stone)" }}>EPC {p.epcLabel}</span>}
                      </div>
                      <div className="hi-prop-divider" />
                      <div className="hi-prop-footer">
                        <span className="hi-prop-price">{p.priceOnRequest ? t.aanbod_onRequest : formatPrice(p.price!)}</span>
                        <span className="hi-prop-link">{t.aanbod_details} →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
