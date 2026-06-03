"use client";

import { useState } from "react";
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
    heroText:
      "Van high-end kapsalons tot marketing agencies — elk project hieronder is gebouwd als een echte, moderne website.",
    stat1Value: "13",
    stat1Label: "Templates",
    stat2Value: "10+",
    stat2Label: "Sectoren",
    stat3Value: "100%",
    stat3Label: "Op maat",
    ctaLabel: "Jouw website",
    ctaTitle: "Ook een website die direct vertrouwen uitstraalt?",
    ctaBtn: "Afspraak inplannen →",
    viewLive: "Live bekijken →",
    viewSite: "Website bekijken →",
  },
  fr: {
    portfolio: "Portfolio",
    packages: "Abonnements",
    booking: "Prendre rendez-vous",
    language: "Langue",
    heroLabel: "Portfolio",
    heroTitle: "Des sites qui inspirent\nconfiance immédiatement.",
    heroText:
      "Des salons haut de gamme aux agences marketing — chaque projet est conçu comme un vrai site moderne et professionnel.",
    stat1Value: "13",
    stat1Label: "Templates",
    stat2Value: "10+",
    stat2Label: "Secteurs",
    stat3Value: "100%",
    stat3Label: "Sur mesure",
    ctaLabel: "Votre site",
    ctaTitle: "Vous aussi, un site qui inspire confiance dès le premier regard ?",
    ctaBtn: "Prendre rendez-vous →",
    viewLive: "Voir en ligne →",
    viewSite: "Voir le site →",
  },
  en: {
    portfolio: "Portfolio",
    packages: "Subscriptions",
    booking: "Book a call",
    language: "Language",
    heroLabel: "Portfolio",
    heroTitle: "Websites that instantly\ncommand trust.",
    heroText:
      "From high-end hair studios to marketing agencies — every project here is built as a real, modern website.",
    stat1Value: "13",
    stat1Label: "Templates",
    stat2Value: "10+",
    stat2Label: "Sectors",
    stat3Value: "100%",
    stat3Label: "Custom",
    ctaLabel: "Your website",
    ctaTitle: "Want a website that instantly commands trust and quality?",
    ctaBtn: "Book a call →",
    viewLive: "View live →",
    viewSite: "View site →",
  },
};

const projects = [
  {
    title: "Maison Élise Hair Studio",
    type: "Kapsalon website",
    url: "/templates/kapper",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80",
    tags: ["Beauty", "Afspraken", "Team"],
  },
  {
    title: "'t Haarhuys",
    type: "Krullenkapper website",
    url: "/templates/haarhuys",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=80",
    tags: ["Curly Hair", "Webshop", "Workshop"],
  },
  {
    title: "Fade Club Barbershop",
    type: "Barbershop website",
    url: "/templates/kapper3",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80",
    tags: ["Urban", "Barbers", "Prijslijst"],
  },
  {
    title: "Noir Dining",
    type: "Restaurant website",
    url: "/templates/restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    tags: ["Horeca", "Menu", "Events"],
  },
  {
    title: "Vandor Luxury Real Estate",
    type: "Immo website",
    url: "/templates/immo",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    tags: ["Vastgoed", "Luxe", "Premium"],
  },
  {
    title: "Belle Âme Beauty",
    type: "Beauty website",
    url: "/templates/beauty",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    tags: ["Beauty", "Wellness", "Afspraken"],
  },
  {
    title: "Forge Fitness Coaching",
    type: "Fitness website",
    url: "/templates/fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
    tags: ["Fitness", "Coaching", "Premium"],
  },
  {
    title: "Aureus Law",
    type: "Advocatenkantoor website",
    url: "/templates/advocaat",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
    tags: ["Juridisch", "Premium", "Team"],
  },
  {
    title: "Brixon Construct",
    type: "Bouwbedrijf website",
    url: "/templates/bouwbedrijf",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    tags: ["Bouw", "Projecten", "Multi-page"],
  },
  {
    title: "Lumi Dental Care",
    type: "Tandarts website",
    url: "/templates/tandarts",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=80",
    tags: ["Medisch", "Team", "Afspraken"],
  },
  {
    title: "Haras Noir",
    type: "Springstal website",
    url: "/templates/haras-noir",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=80",
    tags: ["Luxe", "Multi-page", "Premium"],
  },
  {
    title: "Clarity Consulting",
    type: "Consultant website",
    url: "/templates/coach",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    tags: ["Consulting", "B2B", "Premium"],
  },
  {
    title: "Lens & Light",
    type: "Fotograaf website",
    url: "/templates/fotograaf",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    tags: ["Fotografie", "Galerij", "Pakketten"],
  },
  {
    title: "Bloc Agency",
    type: "Marketing agency website",
    url: "/templates/agency",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    tags: ["Marketing", "Agency", "Cases"],
  },
  {
    title: "Bomaco Winter Jumping",
    type: "Event website",
    url: "https://bomaco-website.vercel.app/",
    image: "/portfolio/bomaco.png",
    tags: ["Events", "Sport", "Live"],
  },
];

export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("nl");
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[lang];

  return (
    <main>
      {/* Ambient orbs */}
      <div className="heroOrbs" aria-hidden="true">
        <div className="heroOrb heroOrb1" />
        <div className="heroOrb heroOrb2" />
      </div>

      {/* ── Nav (identical to homepage) ── */}
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
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              aria-label={t.language}
            >
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
        <a href="/#planning" className="mobileNavCta" onClick={() => setMobileOpen(false)}>
          {t.booking}
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="pfHero">
        <div className="pfHeroInner">
          <span className="sectionLabel">{t.heroLabel}</span>
          <h1 className="pfHeroTitle">
            {t.heroTitle.split("\n").map((line, i) => (
              <span key={i} className={i === 0 ? "lineLight" : "lineAccent"}>
                {line}
              </span>
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

      {/* ── Project grid ── */}
      <section className="pfGrid">
        <div className="pfGridInner">
          {projects.map((project, i) => (
            <a
              key={project.title}
              className="pfCard"
              href={project.url}
              target={project.url.startsWith("http") ? "_blank" : undefined}
              rel={project.url.startsWith("http") ? "noreferrer" : undefined}
              style={{ animationDelay: `${(i % 4) * 0.07}s` }}
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
                  {project.tags.map((tag) => (
                    <span key={tag} className="pfCardTag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
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
          <div className="footerCopy">
            {new Date().getFullYear()} MS Webdesign
          </div>
        </div>
      </footer>
    </main>
  );
}
