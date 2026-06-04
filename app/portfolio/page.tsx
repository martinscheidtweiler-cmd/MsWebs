"use client";

import { useState, useMemo } from "react";
import "../globals.css";

type Lang = "nl" | "fr" | "en";

const translations = {
  nl: {
    portfolio: "Portfolio",
    packages: "Abonnementen",
    booking: "Afspraak inplannen",
    language: "Taal",
    heroLabel: "Portfolio",
    heroTitle: "Websites die meteen\nvertrouwen uitstralen.",
    heroText: "Van high-end kapsalons tot marketing agencies — elk project hieronder is gebouwd als een echte, moderne website.",
    stat1Value: "15+",
    stat1Label: "Templates",
    stat2Value: "12+",
    stat2Label: "Sectoren",
    stat3Value: "100%",
    stat3Label: "Op maat",
    ctaLabel: "Jouw website",
    ctaTitle: "Ook een website die direct vertrouwen uitstraalt?",
    ctaBtn: "Afspraak inplannen →",
    viewLive: "Live bekijken →",
    viewSite: "Website bekijken →",
    searchPlaceholder: "Zoek op sector, stijl of functie…",
    allCategories: "Alle",
    results: "resultaten",
    noResults: "Geen resultaten gevonden",
    noResultsSub: "Probeer een andere zoekterm of filter.",
    clearSearch: "Zoekopdracht wissen",
  },
  fr: {
    portfolio: "Portfolio",
    packages: "Abonnements",
    booking: "Prendre rendez-vous",
    language: "Langue",
    heroLabel: "Portfolio",
    heroTitle: "Des sites qui inspirent\nconfiance immédiatement.",
    heroText: "Des salons haut de gamme aux agences marketing — chaque projet est conçu comme un vrai site moderne et professionnel.",
    stat1Value: "15+",
    stat1Label: "Templates",
    stat2Value: "12+",
    stat2Label: "Secteurs",
    stat3Value: "100%",
    stat3Label: "Sur mesure",
    ctaLabel: "Votre site",
    ctaTitle: "Vous aussi, un site qui inspire confiance dès le premier regard ?",
    ctaBtn: "Prendre rendez-vous →",
    viewLive: "Voir en ligne →",
    viewSite: "Voir le site →",
    searchPlaceholder: "Rechercher par secteur, style ou fonction…",
    allCategories: "Tous",
    results: "résultats",
    noResults: "Aucun résultat",
    noResultsSub: "Essayez un autre terme ou filtre.",
    clearSearch: "Effacer la recherche",
  },
  en: {
    portfolio: "Portfolio",
    packages: "Subscriptions",
    booking: "Book a call",
    language: "Language",
    heroLabel: "Portfolio",
    heroTitle: "Websites that instantly\ncommand trust.",
    heroText: "From high-end hair studios to marketing agencies — every project here is built as a real, modern website.",
    stat1Value: "15+",
    stat1Label: "Templates",
    stat2Value: "12+",
    stat2Label: "Sectors",
    stat3Value: "100%",
    stat3Label: "Custom",
    ctaLabel: "Your website",
    ctaTitle: "Want a website that instantly commands trust and quality?",
    ctaBtn: "Book a call →",
    viewLive: "View live →",
    viewSite: "View site →",
    searchPlaceholder: "Search by sector, style or feature…",
    allCategories: "All",
    results: "results",
    noResults: "No results found",
    noResultsSub: "Try a different search term or filter.",
    clearSearch: "Clear search",
  },
};

// ── CATEGORY FILTERS ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "alle", nl: "Alle", fr: "Tous", en: "All" },
  { key: "beauty", nl: "Beauty & Kapsalon", fr: "Beauté & Coiffure", en: "Beauty & Hair" },
  { key: "horeca", nl: "Horeca", fr: "Restauration", en: "Hospitality" },
  { key: "immo", nl: "Immo & Bouw", fr: "Immo & Construction", en: "Real Estate" },
  { key: "medisch", nl: "Medisch & Zorg", fr: "Médical & Santé", en: "Medical" },
  { key: "fitness", nl: "Fitness & Sport", fr: "Fitness & Sport", en: "Fitness & Sport" },
  { key: "business", nl: "Business & B2B", fr: "Business & B2B", en: "Business & B2B" },
  { key: "events", nl: "Events", fr: "Événements", en: "Events" },
  { key: "creatief", nl: "Creatief", fr: "Créatif", en: "Creative" },
];

// ── PROJECTS ──────────────────────────────────────────────────────────────────
// tags = zoekbare trefwoorden (titel, sector, stijl, functies, doelgroep)
const projects = [
  {
    title: "Maison Élise Hair Studio",
    type: "Kapsalon website",
    url: "/templates/kapper",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    tags: ["Kapsalon", "Beauty", "Dames", "Afspraken", "Team", "Luxe", "Haar", "Styling"],
  },
  {
    title: "'t Haarhuys",
    type: "Krullenkapper website",
    url: "/templates/haarhuys",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    tags: ["Kapsalon", "Krullen", "Curly Hair", "Webshop", "Workshop", "Afspraken", "Multi-page", "Haar"],
  },
  {
    title: "Fade Club Barbershop",
    type: "Barbershop website",
    url: "/templates/kapper3",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    tags: ["Barbershop", "Kapper", "Heren", "Urban", "Prijslijst", "Barbers", "Haar", "Afspraken"],
  },
  {
    title: "Noir Dining",
    type: "Restaurant website",
    url: "/templates/restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    category: "horeca",
    tags: ["Restaurant", "Horeca", "Menu", "Events", "Reservatie", "Fine Dining", "Luxe"],
  },
  {
    title: "Vandor Luxury Real Estate",
    type: "Immo website",
    url: "/templates/immo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    category: "immo",
    tags: ["Immo", "Vastgoed", "Luxe", "Premium", "Appartementen", "Huizen", "Real Estate"],
  },
  {
    title: "Belle Âme Beauty",
    type: "Beauty website",
    url: "/templates/beauty",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    tags: ["Beauty", "Wellness", "Nagels", "Schoonheid", "Afspraken", "Dames", "Spa"],
  },
  {
    title: "Forge Fitness Coaching",
    type: "Fitness website",
    url: "/templates/fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    category: "fitness",
    tags: ["Fitness", "Sport", "Coaching", "Personal Training", "Abonnementen", "Gym", "Premium"],
  },
  {
    title: "Aureus Law",
    type: "Advocatenkantoor website",
    url: "/templates/advocaat",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    category: "business",
    tags: ["Advocaat", "Juridisch", "B2B", "Premium", "Team", "Consulting", "Kantoor"],
  },
  {
    title: "Brixon Construct",
    type: "Bouwbedrijf website",
    url: "/templates/bouwbedrijf",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    category: "immo",
    tags: ["Bouw", "Constructie", "Projecten", "Multi-page", "Portfolio", "Renovatie", "Aannemer"],
  },
  {
    title: "Lumi Dental Care",
    type: "Tandarts website",
    url: "/templates/tandarts",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    category: "medisch",
    tags: ["Tandarts", "Medisch", "Zorg", "Team", "Afspraken", "Gezondheid", "Kliniek"],
  },
  {
    title: "Haras Noir",
    type: "Springstal website",
    url: "/templates/haras-noir",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80",
    category: "fitness",
    tags: ["Paarden", "Stal", "Sport", "Equestrian", "Luxe", "Multi-page", "Premium", "Springconcours"],
  },
  {
    title: "Clarity Consulting",
    type: "Consultant website",
    url: "/templates/coach",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    category: "business",
    tags: ["Consulting", "B2B", "Coach", "Advies", "Premium", "Strategie", "Management"],
  },
  {
    title: "Lens & Light",
    type: "Fotograaf website",
    url: "/templates/fotograaf",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    category: "creatief",
    tags: ["Fotografie", "Portfolio", "Galerij", "Bruiloft", "Events", "Creatief", "Pakketten"],
  },
  {
    title: "Bloc Agency",
    type: "Marketing agency website",
    url: "/templates/agency",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    category: "business",
    tags: ["Marketing", "Agency", "Digital", "Cases", "B2B", "Reclame", "Social Media"],
  },
  {
    title: "Bomaco Winter Jumping",
    type: "Event website",
    url: "https://bomaco-website.vercel.app/",
    image: "/portfolio/bomaco.png",
    category: "events",
    tags: ["Events", "Sport", "Paarden", "Springconcours", "Tickets", "Live", "Agenda"],
  },
  {
    title: "HAAR — Dameskapsalon",
    type: "Dameskapsalon website",
    url: "/templates/haar",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    tags: ["Kapsalon", "Dames", "Kleuren", "Balayage", "Minimalistisch", "Elegant", "Behandelingen", "Bruid", "Highlights"],
  },
  {
    title: "Kapsalon Nijlen — Imad & Mahmoud",
    type: "Barbershop website",
    url: "/templates/kapper-nijlen",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    tags: ["Kapsalon", "Barbershop", "Heren", "Nijlen", "Baard", "Afspraken", "Fresha", "Broers", "Modern", "Reviews"],
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("nl");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("alle");
  const t = translations[lang];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter((p) => {
      // Category filter
      if (activeCategory !== "alle" && p.category !== activeCategory) return false;
      // Search filter — matches title, type, or any tag
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategory]);

  function clearSearch() {
    setSearch("");
    setActiveCategory("alle");
  }

  const hasFilter = search !== "" || activeCategory !== "alle";

  return (
    <main>
      {/* Ambient orbs */}
      <div className="heroOrbs" aria-hidden="true">
        <div className="heroOrb heroOrb1" />
        <div className="heroOrb heroOrb2" />
      </div>

      {/* ── Nav ── */}
      <header className="siteNav scrolled">
        <nav className="navLinks">
          <a href="/portfolio">{t.portfolio}</a>
          <a href="/#packages">{t.packages}</a>
        </nav>
        <a className="brand" href="/">
          <img src="/portfolio/logo.png" alt="MS Webdesign" />
        </a>
        <div className="navRight">
          <div className="langSwitch">
            <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label={t.language}>
              <option value="nl">NL</option>
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>
          <a className="navBtn" href="/#planning">{t.booking}</a>
          <button
            className={`hamburger${mobileOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className={`mobileNav${mobileOpen ? " open" : ""}`}>
        <a href="/portfolio" data-idx="01" onClick={() => setMobileOpen(false)}>{t.portfolio}</a>
        <a href="/#packages" data-idx="02" onClick={() => setMobileOpen(false)}>{t.packages}</a>
        <div className="mobileNavDivider" />
        <a href="/#planning" className="mobileNavCta" onClick={() => setMobileOpen(false)}>{t.booking}</a>
      </nav>

      {/* ── Hero ── */}
      <section className="pfHero">
        <div className="pfHeroInner">
          <span className="sectionLabel">{t.heroLabel}</span>
          <h1 className="pfHeroTitle">
            {t.heroTitle.split("\n").map((line, i) => (
              <span key={i} className={i === 0 ? "lineLight" : "lineAccent"}>{line}</span>
            ))}
          </h1>
          <p className="pfHeroText">{t.heroText}</p>
          <div className="pfHeroStats">
            <div className="pfStat">
              <span className="pfStatValue">{t.stat1Value}</span>
              <span className="pfStatLabel">{t.stat1Label}</span>
            </div>
            <div className="pfStatDiv" />
            <div className="pfStat">
              <span className="pfStatValue">{t.stat2Value}</span>
              <span className="pfStatLabel">{t.stat2Label}</span>
            </div>
            <div className="pfStatDiv" />
            <div className="pfStat">
              <span className="pfStatValue">{t.stat3Value}</span>
              <span className="pfStatLabel">{t.stat3Label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search & Filter toolbar ── */}
      <div className="pfToolbar">
        <div className="pfToolbarInner">
          {/* Search input */}
          <div className="pfSearchWrap">
            <svg className="pfSearchIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="pfSearchInput"
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
            {search && (
              <button className="pfSearchClear" onClick={() => setSearch("")} aria-label="Wissen">
                ×
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="pfCategoryRow">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`pfCatChip${activeCategory === cat.key ? " active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat[lang]}
              </button>
            ))}
          </div>

          {/* Result count + clear */}
          <div className="pfResultBar">
            <span className="pfResultCount">
              <strong>{filtered.length}</strong> {t.results}
            </span>
            {hasFilter && (
              <button className="pfClearAll" onClick={clearSearch}>
                {t.clearSearch} ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Project grid ── */}
      <section className="pfGrid">
        <div className="pfGridInner">
          {filtered.length === 0 ? (
            <div className="pfNoResults">
              <div className="pfNoResultsIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3>{t.noResults}</h3>
              <p>{t.noResultsSub}</p>
              <button className="pfClearAll pfClearAllLarge" onClick={clearSearch}>
                {t.clearSearch}
              </button>
            </div>
          ) : (
            filtered.map((project, i) => (
              <a
                key={project.title}
                className="pfCard"
                href={project.url}
                target={project.url.startsWith("http") ? "_blank" : undefined}
                rel={project.url.startsWith("http") ? "noreferrer" : undefined}
                style={{ animationDelay: `${(i % 4) * 0.06}s` }}
              >
                <div className="pfCardImage">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="pfCardOverlay">
                    <span className="pfCardCta">
                      {project.url.startsWith("http") ? t.viewLive : t.viewSite}
                    </span>
                  </div>
                </div>
                <div className="pfCardBody">
                  <span className="pfCardType">{project.type}</span>
                  <h2 className="pfCardTitle">{project.title}</h2>
                  <div className="pfCardTags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <button
                        key={tag}
                        className="pfCardTag pfCardTagBtn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSearch(tag);
                          setActiveCategory("alle");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="pfCardTag pfCardTagMore">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pfCta">
        <div className="pfCtaInner">
          <span className="sectionLabel">{t.ctaLabel}</span>
          <h2 className="pfCtaTitle">{t.ctaTitle}</h2>
          <a className="btn" href="/#planning">{t.ctaBtn}</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">
            <img src="/portfolio/logo.png" alt="MS Webdesign" />
                        <p>Premium webdesign voor ambitieuze bedrijven.</p>
          </div>
          <nav className="footerNav">
            <a href="/portfolio">{t.portfolio}</a>
            <a href="/#packages">{t.packages}</a>
            <a href="/#planning">{t.booking}</a>
          </nav>
          <div className="footerCopy">{new Date().getFullYear()} MS Webdesign</div>
        </div>
      </footer>
    </main>
  );
}
