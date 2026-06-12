"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "./portfolio.css";

/* ─────────────────────────────────────────────
   DATA MODEL
───────────────────────────────────────────── */

interface Project {
  id: string;
  title: string;
  client?: string;
  sector: string;
  type: string;
  addons: string[];
  pakket: string;
  languages: string[];
  accent: string;
  url: string;
  external: boolean;
  featured?: boolean;
  year: number;
  desc: string;
  tags?: string[];
  image?: string;
}

/* ─────────────────────────────────────────────
   PROJECT DATA
   Voeg hier nieuwe projecten toe.
   Filters worden automatisch afgeleid.
───────────────────────────────────────────── */

const PROJECTS: Project[] = [
  {
    id: "haarhuys",
    title: "'t Haarhuys",
    client: "Nathalie V.",
    sector: "Kapsalon",
    type: "Multi-pagina",
    addons: ["Webshop Module", "Afspraakmodule"],
    pakket: "Website Essential",
    languages: ["NL"],
    accent: "#c97d4e",
    url: "/templates/haarhuys",
    external: false,
    featured: true,
    year: 2025,
    desc: "Curly hair specialist in Nijlen. Donker luxury design met webshop en workshopmodule.",
    tags: ["Dark", "Webshop", "Workshops"],
    image: "/portfolio/haarhuyspic.png",
  },
  {
    id: "bomaco",
    title: "Bomaco Winter Jumping",
    client: "Bomaco vzw",
    sector: "Events",
    type: "Multi-pagina",
    addons: ["Extra taal", "Afspraakmodule"],
    pakket: "Website Essential",
    languages: ["NL", "FR", "EN"],
    accent: "#3b82f6",
    url: "https://bomaco-website.vercel.app/",
    external: true,
    featured: true,
    year: 2025,
    desc: "Jaarlijks springconcours. Meertalige site met agenda, inschrijvingen en ticketverkoop.",
    tags: ["Paarden", "Events", "Meertalig", "Live"],
    image: "/portfolio/bomacopic.png",
  },
  {
    id: "hippique",
    title: "Hippique.immo",
    client: "Demo",
    sector: "Vastgoed",
    type: "Multi-pagina",
    addons: ["Blog Module"],
    pakket: "Website Essential",
    languages: ["NL"],
    accent: "#ed6e21",
    url: "/templates/alba-immo",
    external: false,
    featured: false,
    year: 2025,
    desc: "Cinematic luxury vastgoedsite voor hippisch & landelijk. Property cards, gallerij en blog.",
    tags: ["Vastgoed", "Luxury", "Cinematic"],
    image: "/portfolio/hippiquepic.png",
  },
  {
    id: "vls",
    title: "VLS Verwarming",
    client: "VLS bvba",
    sector: "Verwarming & Sanitair",
    type: "Multi-pagina",
    addons: ["Google Boost"],
    pakket: "Website Essential",
    languages: ["NL"],
    accent: "#2563eb",
    url: "/templates/vls-verwarming",
    external: false,
    featured: false,
    year: 2025,
    desc: "Premium template met scroll-driven animatie, depannage-CTA en klantreviews.",
    tags: ["Dark", "Animatie", "Lokaal"],
    image: "/portfolio/vlspic.png",
  },
  {
    id: "kapper-nijlen",
    title: "Kapsalon Nijlen",
    client: "IMAD & Mahmoud",
    sector: "Barbershop",
    type: "One-pager",
    addons: ["Afspraakmodule", "Google Boost"],
    pakket: "Website Essential",
    languages: ["NL"],
    image: "/portfolio/kapsalonnijlenpic.png",
    accent: "#e53e3e",
    url: "/templates/kapper-nijlen",
    external: false,
    featured: false,
    year: 2025,
    desc: "Energieke barbershop website met online reservaties en teamoverzicht.",
    tags: ["Rood", "Modern", "Reservaties"],
  },
  {
    id: "edison",
    title: "Edison Electricity",
    client: "Edison bvba",
    sector: "Elektricien",
    type: "Multi-pagina",
    addons: ["Google Boost"],
    pakket: "Website Essential",
    languages: ["NL"],
    accent: "#18b4c8",
    url: "/templates/edison-electricity",
    external: false,
    featured: false,
    year: 2024,
    desc: "32+ jaar ervaring. Teal design met 24/7 noodservice-CTA en projectengalerij.",
    tags: ["Teal", "Noodservice", "Projecten"],
  },
];

/* ─────────────────────────────────────────────
   FILTER OPTIONS (dynamisch afgeleid)
───────────────────────────────────────────── */

const ALL_SECTORS  = [...new Set(PROJECTS.map((p) => p.sector))].sort();
const ALL_TYPES    = [...new Set(PROJECTS.map((p) => p.type))].sort();
const ALL_ADDONS   = [...new Set(PROJECTS.flatMap((p) => p.addons))].sort();
const ALL_LANGS    = [...new Set(PROJECTS.flatMap((p) => p.languages))].sort();

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function PortfolioGallery() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Filters
  const [search,    setSearch]    = useState("");
  const [sectors,   setSectors]   = useState<string[]>([]);
  const [types,     setTypes]     = useState<string[]>([]);
  const [addonSel,  setAddonSel]  = useState<string[]>([]);
  const [langSel,   setLangSel]   = useState<string[]>([]);
  const [sortBy,    setSortBy]    = useState<"featured" | "newest" | "az">("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Cursor
  useEffect(() => {
    const dot  = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!dot || !glow) return;
    const mv = (e: MouseEvent) => {
      dot.style.left  = glow.style.left  = e.clientX + "px";
      dot.style.top   = glow.style.top   = e.clientY + "px";
    };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  // Nav scroll
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Filtered + sorted projects
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = PROJECTS.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) &&
               !p.sector.toLowerCase().includes(q) &&
               !p.desc.toLowerCase().includes(q) &&
               !(p.tags || []).some((t) => t.toLowerCase().includes(q))) return false;
      if (sectors.length   && !sectors.includes(p.sector))                      return false;
      if (types.length     && !types.includes(p.type))                          return false;
      if (addonSel.length  && !addonSel.some((a) => p.addons.includes(a)))      return false;
      if (langSel.length   && !langSel.some((l) => p.languages.includes(l)))    return false;
      return true;
    });

    if (sortBy === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sortBy === "newest")   list = [...list].sort((a, b) => b.year - a.year);
    if (sortBy === "az")       list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [search, sectors, types, addonSel, langSel, sortBy]);

  const activeCount = sectors.length + types.length + addonSel.length + langSel.length;

  const clearAll = () => {
    setSearch(""); setSectors([]); setTypes([]); setAddonSel([]); setLangSel([]);
  };

  /* ── SLIDER ── */
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const scrollToSlide = (idx: number) => {
    const track = sliderTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(":scope > .pfSlide"));
    const target = cards[idx];
    const base = cards[0];
    if (!target || !base) return;
    track.scrollTo({ left: target.offsetLeft - base.offsetLeft, behavior: "smooth" });
  };

  const goToSlide = (dir: number) => {
    const next = Math.max(0, Math.min(filtered.length - 1, slideIndex + dir));
    setSlideIndex(next);
    scrollToSlide(next);
  };

  // Reset slider naar het begin zodra de filters/zoekopdracht veranderen
  useEffect(() => {
    setSlideIndex(0);
    const track = sliderTrackRef.current;
    if (track) track.scrollTo({ left: 0, behavior: "auto" });
  }, [filtered.length]);

  // Houd bij welke kaart actief is tijdens handmatig scrollen/swipen
  useEffect(() => {
    const track = sliderTrackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(":scope > .pfSlide"));
      if (!cards.length) return;
      const base = cards[0].offsetLeft;
      let closest = 0;
      let min = Infinity;
      cards.forEach((c, idx) => {
        const diff = Math.abs((c.offsetLeft - base) - track.scrollLeft);
        if (diff < min) { min = diff; closest = idx; }
      });
      setSlideIndex(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  return (
    <>
      {/* Cursor */}
      <div ref={cursorDotRef}  className="cursorDot"  aria-hidden="true" />
      <div ref={cursorGlowRef} className="cursorGlow" aria-hidden="true" />

      {/* Nav */}
      <header className={`lxNav${navScrolled ? " scrolled" : ""}`}>
        <nav className="lxNavLinks">
          <Link href="/">Home</Link>
          <a href="/#packages">Pakketten</a>
          <Link href="/login">Klantengedeelte</Link>
        </nav>
        <Link href="/" className="lxNavBrand">
          <img src="/portfolio/logo.png" alt="MS Webdesign" />
        </Link>
        <div className="lxNavRight">
          <a href="/#planning" className="lxNavCta"><span>Afspraak inplannen</span></a>
          <button
            className={`hamburger${mobileOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`mobileNav${mobileOpen ? " open" : ""}`}>
        <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <a href="/#packages" onClick={() => setMobileOpen(false)}>Pakketten</a>
        <Link href="/login" onClick={() => setMobileOpen(false)}>Klantengedeelte</Link>
        <a href="/#planning" onClick={() => setMobileOpen(false)}>Afspraak inplannen</a>
      </nav>

      <div className="pfRoot">

        {/* ── HERO ── */}
        <section className="pfHero">
          <div className="pfHeroOrb1" aria-hidden="true" />
          <div className="pfHeroOrb2" aria-hidden="true" />
          <div className="pfHeroInner">
            <div className="pfHeroText">
              <div className="pfEye">Portfolio · MS Webdesign</div>
              <h1 className="pfHeroTitle">
                Websites die<br />
                <span className="pfHeroGrad">resultaat leveren.</span>
              </h1>
              <p className="pfHeroSub">
                {PROJECTS.length} projecten — van kapsalon tot vastgoed, van barbershop tot elektricien.
                Elk volledig op maat gebouwd.
              </p>
            </div>
            {/* Stats */}
            <div className="pfHeroStats">
              <div className="pfHeroStat">
                <span className="pfHeroStatNum">{PROJECTS.length}+</span>
                <span className="pfHeroStatLabel">Projecten</span>
              </div>
              <div className="pfHeroStat">
                <span className="pfHeroStatNum">{ALL_SECTORS.length}</span>
                <span className="pfHeroStatLabel">Sectoren</span>
              </div>
              <div className="pfHeroStat">
                <span className="pfHeroStatNum">2 dgn</span>
                <span className="pfHeroStatLabel">Gemiddelde oplevering</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── STICKY FILTER BAR ── */}
        <div className="pfFiltersWrap">
          <div className="pfFiltersInner">
            {/* Row 1: Search + sort + toggle */}
            <div className="pfFiltersTop">
              <div className="pfSearchWrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pfSearchIcon">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  className="pfSearch"
                  type="text"
                  placeholder="Zoek op naam, sector, beschrijving…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="pfSearchClear" onClick={() => setSearch("")} aria-label="Wis zoekterm">×</button>
                )}
              </div>

              <div className="pfFiltersTopRight">
                <button
                  className={`pfFilterToggleBtn${filtersOpen ? " open" : ""}${activeCount > 0 ? " hasFilters" : ""}`}
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Filters{activeCount > 0 && <span className="pfFilterBadge">{activeCount}</span>}
                </button>

                <select
                  className="pfSort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "featured" | "newest" | "az")}
                >
                  <option value="featured">Uitgelicht eerst</option>
                  <option value="newest">Nieuwste eerst</option>
                  <option value="az">A → Z</option>
                </select>

                <span className="pfCount">
                  {filtered.length} / {PROJECTS.length}
                </span>
              </div>
            </div>

            {/* Row 2: Filter panels (collapsible) */}
            {filtersOpen && (
              <div className="pfFilterPanel">
                <div className="pfFilterGroup">
                  <span className="pfFilterGroupLabel">Sector</span>
                  <div className="pfPills">
                    {ALL_SECTORS.map((s) => (
                      <button
                        key={s}
                        className={`pfPill${sectors.includes(s) ? " active" : ""}`}
                        onClick={() => setSectors((v) => toggle(v, s))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pfFilterGroup">
                  <span className="pfFilterGroupLabel">Type website</span>
                  <div className="pfPills">
                    {ALL_TYPES.map((t) => (
                      <button
                        key={t}
                        className={`pfPill${types.includes(t) ? " active" : ""}`}
                        onClick={() => setTypes((v) => toggle(v, t))}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pfFilterGroup">
                  <span className="pfFilterGroupLabel">Add-ons</span>
                  <div className="pfPills">
                    {ALL_ADDONS.map((a) => (
                      <button
                        key={a}
                        className={`pfPill${addonSel.includes(a) ? " active" : ""}`}
                        onClick={() => setAddonSel((v) => toggle(v, a))}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pfFilterGroup">
                  <span className="pfFilterGroupLabel">Taal</span>
                  <div className="pfPills">
                    {ALL_LANGS.map((l) => (
                      <button
                        key={l}
                        className={`pfPill${langSel.includes(l) ? " active" : ""}`}
                        onClick={() => setLangSel((v) => toggle(v, l))}
                      >
                        {l}
                      </button>
                    ))}
                    <button
                      className={`pfPill${langSel.length > 1 ? " active" : ""}`}
                      onClick={() => setLangSel(langSel.length > 1 ? [] : ALL_LANGS)}
                    >
                      Meertalig
                    </button>
                  </div>
                </div>

                {activeCount > 0 && (
                  <button className="pfClearAll" onClick={clearAll}>
                    Wis alle filters
                  </button>
                )}
              </div>
            )}

            {/* Active filter chips */}
            {activeCount > 0 && (
              <div className="pfActiveChips">
                {sectors.map((s) => (
                  <button key={s} className="pfChip" onClick={() => setSectors((v) => toggle(v, s))}>
                    {s} <span>×</span>
                  </button>
                ))}
                {types.map((t) => (
                  <button key={t} className="pfChip" onClick={() => setTypes((v) => toggle(v, t))}>
                    {t} <span>×</span>
                  </button>
                ))}
                {addonSel.map((a) => (
                  <button key={a} className="pfChip addon" onClick={() => setAddonSel((v) => toggle(v, a))}>
                    {a} <span>×</span>
                  </button>
                ))}
                {langSel.map((l) => (
                  <button key={l} className="pfChip lang" onClick={() => setLangSel((v) => toggle(v, l))}>
                    {l} <span>×</span>
                  </button>
                ))}
                <button className="pfChipClear" onClick={clearAll}>Wis alles</button>
              </div>
            )}
          </div>
        </div>

        {/* ── PROJECT SLIDER ── */}
        {filtered.length === 0 ? (
          <main className="pfMain">
            <div className="pfEmpty">
              <div className="pfEmptyIcon">🔍</div>
              <h3>Geen projecten gevonden</h3>
              <p>Pas je zoekopdracht of filters aan.</p>
              <button className="pfEmptyReset" onClick={clearAll}>Wis alle filters</button>
            </div>
          </main>
        ) : (
            <div className="pfSliderSection">
              <div className="pfSliderNav">
                <span className="pfSliderCount">
                  <span className="pfSliderCountActive">{String(slideIndex + 1).padStart(2, "0")}</span>
                  <span className="pfSliderCountSep">/</span>
                  <span>{String(filtered.length).padStart(2, "0")}</span>
                </span>
                <div className="pfSliderBtns">
                  <button
                    className="pfSliderBtn"
                    onClick={() => goToSlide(-1)}
                    disabled={slideIndex === 0}
                    aria-label="Vorig project"
                  >
                    ←
                  </button>
                  <button
                    className="pfSliderBtn"
                    onClick={() => goToSlide(1)}
                    disabled={slideIndex === filtered.length - 1}
                    aria-label="Volgend project"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="pfSliderTrack" ref={sliderTrackRef}>
                {filtered.map((p, i) => (
                  <a
                    key={p.id}
                    href={p.url}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className={`pfSlide${p.featured ? " pfSlideFeatured" : ""}`}
                    style={{ "--accent": p.accent } as React.CSSProperties}
                  >
                    {/* Background */}
                    {p.image ? (
                      <div className="pfSlideImgFrame">
                        <img src={p.image} alt={p.title} className="pfSlideImg" loading="lazy" />
                      </div>
                    ) : (
                      <div className="pfSlideBg">
                        <div className="pfSlideMesh" />
                      </div>
                    )}
                    <div className="pfSlideScrim" />

                    {/* Top row */}
                    <div className="pfSlideTop">
                      <span className="pfSlideNum">{String(i + 1).padStart(2, "0")}</span>
                      {p.featured && <span className="pfSlideFeatBadge">Featured</span>}
                    </div>

                    {/* Bottom content */}
                    <div className="pfSlideContent">
                      <div className="pfSlideMeta">
                        <span style={{ color: p.accent }}>{p.sector}</span>
                        <span className="pfSlideDot">·</span>
                        <span>{p.type}</span>
                        <span className="pfSlideDot">·</span>
                        <span>{p.year}</span>
                      </div>
                      <h2 className="pfSlideTitle">{p.title}</h2>
                      <p className="pfSlideDesc">{p.desc}</p>
                      <div className="pfSlideTags">
                        {p.languages.map((l) => (
                          <span key={l} className="pfSlideLang">{l}</span>
                        ))}
                        {p.addons.map((a) => (
                          <span key={a} className="pfSlideAddon">{a}</span>
                        ))}
                      </div>
                      <span className="pfSlideCta">
                        {p.external ? "Bekijk live website" : "Bekijk project"}
                        <span className="pfSlideCtaArrow">{p.external ? "↗" : "→"}</span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
        )}

        {/* ── CTA ── */}
        <section className="pfCta">
          <div className="pfCtaInner reveal">
            <div className="pfEye" style={{ justifyContent: "center" }}>Uw project</div>
            <h2 className="pfCtaTitle">Klaar om te starten?</h2>
            <p className="pfCtaSub">
              Vertel me over uw bedrijf. De eerste versie staat er binnen 2 dagen.
            </p>
            <div className="pfCtaBtns">
              <Link href="/#planning" className="btnGrad">Afspraak inplannen →</Link>
              <Link href="/" className="btnOutline">Bekijk pakketten</Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="lxFooter">
          <div className="lxFooterInner">
            <div className="lxFooterBrand">
              <img src="/portfolio/logo.png" alt="MS Webdesign" />
              <p>Premium webdesign voor ambitieuze bedrijven.</p>
            </div>
            <nav className="lxFooterNav">
              <Link href="/">Home</Link>
              <a href="/#packages">Pakketten</a>
              <a href="/#planning">Afspraak</a>
            </nav>
            <div className="lxFooterCopy">© {new Date().getFullYear()} MS Webdesign</div>
          </div>
        </footer>
      </div>
    </>
  );
}
