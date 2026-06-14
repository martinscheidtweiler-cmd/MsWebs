"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../globals.css";
import "./pakket.css";
import { ADDONS, PACKAGE_FEATURES_DETAILED, type Lang } from "../lib/addons-data";

/* ============================================================
   VERTALINGEN
============================================================ */

const translations: Record<Lang, {
  navHome: string;
  navPortfolio: string;
  navPackages: string;
  navPakket: string;
  navClientArea: string;
  navCta: string;
  heroEye: string;
  heroTitleL1: string;
  heroTitleL2: string;
  heroText: string;
  heroBackLink: string;
  domainEye: string;
  domainTitle: string;
  domainText: string;
  domainPlaceholder: string;
  domainBtn: string;
  domainBtnChecking: string;
  domainAvailable: string;
  domainTaken: string;
  domainInvalid: string;
  domainError: string;
  domainCta: string;
  packageEye: string;
  packageTitle: string;
  packagePrice: string;
  packagePer: string;
  packageNote: string;
  packageIntro: string;
  packageCta: string;
  featuresTitle: string;
  addonsEye: string;
  addonsTitle: string;
  addonsSub: string;
  addonPerMonth: string;
  includedLabel: string;
  idealLabel: string;
  ctaTitle: string;
  ctaText: string;
  ctaBtn: string;
  footerTagline: string;
  footerAppointment: string;
}> = {
  nl: {
    navHome: "Home",
    navPortfolio: "Portfolio",
    navPackages: "Pakketten",
    navPakket: "Pakket & add-ons",
    navClientArea: "Klantengedeelte",
    navCta: "Afspraak inplannen",
    heroEye: "Pakket & Add-ons",
    heroTitleL1: "Eén pakket.",
    heroTitleL2: "Zo veel mogelijkheden.",
    heroText: "Op deze pagina leggen we het Website Essential pakket volledig uit en beschrijven we elke add-on in detail — zodat je precies weet wat je krijgt en wat je eventueel kan toevoegen om jouw website helemaal van jou te maken.",
    heroBackLink: "← Terug naar de homepage",
    domainEye: "Domeincheck",
    domainTitle: "Is jouw domeinnaam nog vrij?",
    domainText: "Check meteen of de domeinnaam voor jouw website nog beschikbaar is. Nog geen idee? Geen probleem, we denken graag mee tijdens het kennismakingsgesprek.",
    domainPlaceholder: "bv. jouwbedrijf.be",
    domainBtn: "Check beschikbaarheid",
    domainBtnChecking: "Even checken…",
    domainAvailable: "is nog vrij! 🎉",
    domainTaken: "is helaas al in gebruik.",
    domainInvalid: "Vul een geldige domeinnaam in (bv. jouwbedrijf.be).",
    domainError: "Domeincheck is even niet beschikbaar. Probeer het later opnieuw.",
    domainCta: "Plan je gratis gesprek →",
    packageEye: "Het pakket",
    packageTitle: "Website Essential",
    packagePrice: "€29,99",
    packagePer: "/maand",
    packageNote: "Geen setup kosten · Premium service voor iedereen",
    packageIntro: "Website Essential is ons basispakket — en die basis is alles behalve magertjes. Voor één vast bedrag per maand krijg je een volledig op maat ontworpen website, inclusief hosting, onderhoud en support. Geen verborgen kosten, geen verrassingen achteraf: gewoon een professionele website die werkt voor jouw zaak.",
    packageCta: "Plan een gratis kennismakingsgesprek",
    featuresTitle: "Wat zit er allemaal in?",
    addonsEye: "Add-ons",
    addonsTitle: "Maak je website helemaal van jou",
    addonsSub: "Het Website Essential pakket is je stevige basis. Met deze add-ons bouw je verder uit naar precies wat jouw zaak nodig heeft — kies er één, een paar, of combineer ze allemaal.",
    addonPerMonth: "/mnd",
    includedLabel: "Wat je krijgt",
    idealLabel: "Ideaal voor",
    ctaTitle: "Klaar om te starten?",
    ctaText: "Plan een gratis en vrijblijvend kennismakingsgesprek van 30 minuten. We bespreken je zaak, je wensen en welke add-ons interessant zijn voor jou.",
    ctaBtn: "Plan je gratis gesprek",
    footerTagline: "Professionele websites die nieuwe klanten opleveren voor zelfstandigen en KMO's.",
    footerAppointment: "Afspraak",
  },
  fr: {
    navHome: "Accueil",
    navPortfolio: "Portfolio",
    navPackages: "Formules",
    navPakket: "Formule & add-ons",
    navClientArea: "Espace client",
    navCta: "Prendre rendez-vous",
    heroEye: "Formule & Add-ons",
    heroTitleL1: "Une formule.",
    heroTitleL2: "Une infinité de possibilités.",
    heroText: "Sur cette page, nous expliquons en détail la formule Website Essential et décrivons chaque add-on — pour que vous sachiez exactement ce que vous obtenez et ce que vous pouvez ajouter pour faire de votre site quelque chose qui vous ressemble entièrement.",
    heroBackLink: "← Retour à l'accueil",
    domainEye: "Vérification de domaine",
    domainTitle: "Votre nom de domaine est-il disponible ?",
    domainText: "Vérifiez immédiatement si le nom de domaine de votre site est encore disponible. Pas encore d'idée ? Aucun souci, nous y réfléchirons ensemble lors de l'appel découverte.",
    domainPlaceholder: "ex. votreentreprise.be",
    domainBtn: "Vérifier la disponibilité",
    domainBtnChecking: "Vérification…",
    domainAvailable: "est disponible ! 🎉",
    domainTaken: "est malheureusement déjà pris.",
    domainInvalid: "Indiquez un nom de domaine valide (ex. votreentreprise.be).",
    domainError: "La vérification de domaine est temporairement indisponible. Réessayez plus tard.",
    domainCta: "Planifier mon appel gratuit →",
    packageEye: "La formule",
    packageTitle: "Website Essential",
    packagePrice: "29,99€",
    packagePer: "/mois",
    packageNote: "Pas de frais de mise en service · Service premium pour tous",
    packageIntro: "Website Essential est notre formule de base — et cette base n'a rien de minimaliste. Pour un montant fixe par mois, vous obtenez un site entièrement sur mesure, hébergement, maintenance et support inclus. Pas de frais cachés, pas de surprises par la suite : juste un site professionnel qui fonctionne pour votre activité.",
    packageCta: "Planifier un appel découverte gratuit",
    featuresTitle: "Qu'est-ce qui est inclus ?",
    addonsEye: "Add-ons",
    addonsTitle: "Faites de votre site quelque chose qui vous ressemble",
    addonsSub: "La formule Website Essential est votre base solide. Avec ces add-ons, vous l'enrichissez exactement selon les besoins de votre activité — choisissez-en un, plusieurs, ou combinez-les tous.",
    addonPerMonth: "/mois",
    includedLabel: "Ce que vous obtenez",
    idealLabel: "Idéal pour",
    ctaTitle: "Prêt à démarrer ?",
    ctaText: "Planifiez un appel découverte gratuit et sans engagement de 30 minutes. Nous discuterons de votre activité, de vos souhaits et des add-ons qui pourraient vous intéresser.",
    ctaBtn: "Planifier mon appel gratuit",
    footerTagline: "Des sites web professionnels qui génèrent de nouveaux clients pour indépendants et PME.",
    footerAppointment: "Rendez-vous",
  },
  en: {
    navHome: "Home",
    navPortfolio: "Portfolio",
    navPackages: "Packages",
    navPakket: "Package & add-ons",
    navClientArea: "Client area",
    navCta: "Book a call",
    heroEye: "Package & Add-ons",
    heroTitleL1: "One package.",
    heroTitleL2: "Endless possibilities.",
    heroText: "On this page we explain the Website Essential package in full detail and describe every add-on — so you know exactly what you get and what you can add on top to make your website completely your own.",
    heroBackLink: "← Back to homepage",
    domainEye: "Domain check",
    domainTitle: "Is your domain name still available?",
    domainText: "Check right away whether the domain name for your website is still available. No idea yet? No problem, we're happy to brainstorm during the intro call.",
    domainPlaceholder: "e.g. yourbusiness.be",
    domainBtn: "Check availability",
    domainBtnChecking: "Checking…",
    domainAvailable: "is still available! 🎉",
    domainTaken: "is unfortunately already taken.",
    domainInvalid: "Enter a valid domain name (e.g. yourbusiness.be).",
    domainError: "Domain check is temporarily unavailable. Please try again later.",
    domainCta: "Book my free call →",
    packageEye: "The package",
    packageTitle: "Website Essential",
    packagePrice: "€29.99",
    packagePer: "/month",
    packageNote: "No setup fees · Premium service for everyone",
    packageIntro: "Website Essential is our base package — and that base is anything but basic. For one fixed amount per month, you get a fully custom-designed website, including hosting, maintenance and support. No hidden costs, no surprises afterwards: just a professional website that works for your business.",
    packageCta: "Book a free intro call",
    featuresTitle: "What's included?",
    addonsEye: "Add-ons",
    addonsTitle: "Make your website completely your own",
    addonsSub: "The Website Essential package is your solid foundation. With these add-ons you expand it into exactly what your business needs — pick one, a few, or combine them all.",
    addonPerMonth: "/mo",
    includedLabel: "What you get",
    idealLabel: "Ideal for",
    ctaTitle: "Ready to get started?",
    ctaText: "Book a free, no-obligation 30-minute intro call. We'll discuss your business, your wishes, and which add-ons might be interesting for you.",
    ctaBtn: "Book my free call",
    footerTagline: "Professional websites that bring new customers to freelancers and SMEs.",
    footerAppointment: "Appointment",
  },
};

/* ============================================================
   PAGINA
============================================================ */

export default function PakketPage() {
  const [lang, setLang] = useState<Lang>("nl");
  const t = translations[lang];
  const addons = ADDONS[lang];
  const features = PACKAGE_FEATURES_DETAILED[lang];

  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Domeincheck
  const [domainQuery, setDomainQuery] = useState("");
  const [domainChecking, setDomainChecking] = useState(false);
  const [domainResult, setDomainResult] = useState<{ domain: string; available: boolean } | null>(null);
  const [domainError, setDomainError] = useState("");

  async function checkDomain() {
    const value = domainQuery.trim().toLowerCase();
    setDomainResult(null);
    setDomainError("");

    if (!value || !/^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})*\.[a-z]{2,24}$/.test(value)) {
      setDomainError(t.domainInvalid);
      return;
    }

    setDomainChecking(true);
    try {
      const res = await fetch(`/api/domain-check?domain=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (!res.ok) {
        setDomainError(data.error || t.domainError);
      } else {
        setDomainResult({ domain: data.domain, available: data.available });
      }
    } catch {
      setDomainError(t.domainError);
    } finally {
      setDomainChecking(false);
    }
  }

  // Cursor
  useEffect(() => {
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!dot || !glow) return;
    const mv = (e: MouseEvent) => {
      dot.style.left = glow.style.left = e.clientX + "px";
      dot.style.top = glow.style.top = e.clientY + "px";
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

  return (
    <>
      {/* ── CURSOR ── */}
      <div ref={cursorDotRef} className="cursorDot" aria-hidden="true" />
      <div ref={cursorGlowRef} className="cursorGlow" aria-hidden="true" />

      {/* ── NAV ── */}
      <header className={`lxNav${navScrolled ? " scrolled" : ""}`}>
        <nav className="lxNavLinks">
          <Link href="/">{t.navHome}</Link>
          <Link href="/portfolio">{t.navPortfolio}</Link>
          <Link href="/pakket" className="active">{t.navPakket}</Link>
          <Link href="/login">{t.navClientArea}</Link>
        </nav>

        <Link href="/" className="lxNavBrand">
          <img src="/portfolio/logo.png" alt="MS Webdesign" />
        </Link>

        <div className="lxNavRight">
          <div className="lxLang">
            <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Taal">
              <option value="nl">NL</option>
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>
          <a href="/#planning" className="lxNavCta"><span>{t.navCta}</span></a>
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
        <Link href="/" onClick={() => setMobileOpen(false)}>{t.navHome}</Link>
        <Link href="/portfolio" onClick={() => setMobileOpen(false)}>{t.navPortfolio}</Link>
        <Link href="/pakket" onClick={() => setMobileOpen(false)}>{t.navPakket}</Link>
        <Link href="/login" onClick={() => setMobileOpen(false)}>{t.navClientArea}</Link>
        <a href="/#planning" onClick={() => setMobileOpen(false)}>{t.navCta}</a>
      </nav>

      <div className="pkRoot">
        {/* ── HERO ── */}
        <section className="pkHero">
          <div className="heroOrbs" aria-hidden="true">
            <div className="heroOrb1" />
            <div className="heroOrb2" />
            <div className="heroOrb3" />
          </div>
          <div className="pkHeroInner">
            <div className="sectionEye">{t.heroEye}</div>
            <h1 className="pkHeroTitle">
              {t.heroTitleL1}<br />{t.heroTitleL2}
            </h1>
            <p className="pkHeroText">{t.heroText}</p>
            <Link href="/" className="pkBackLink">{t.heroBackLink}</Link>
          </div>
        </section>

        {/* ── DOMEINCHECK ── */}
        <section className="pkDomainSection">
          <div className="pkInner">
            <div className="pkDomainCard reveal">
              <div className="pkDomainHead">
                <div className="sectionEye">{t.domainEye}</div>
                <h2>{t.domainTitle}</h2>
                <p>{t.domainText}</p>
              </div>
              <form
                className="pkDomainForm"
                onSubmit={(e) => { e.preventDefault(); checkDomain(); }}
              >
                <input
                  type="text"
                  className="pkDomainInput"
                  placeholder={t.domainPlaceholder}
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <button type="submit" className="priceCta pkDomainBtn" disabled={domainChecking}>
                  {domainChecking ? t.domainBtnChecking : t.domainBtn}
                </button>
              </form>
              {domainError && (
                <div className="pkDomainResult pkDomainResult--error">{domainError}</div>
              )}
              {domainResult && (
                <div className={`pkDomainResult ${domainResult.available ? "pkDomainResult--ok" : "pkDomainResult--taken"}`}>
                  <strong>{domainResult.domain}</strong> {domainResult.available ? t.domainAvailable : t.domainTaken}
                  {domainResult.available && (
                    <a href="/#planning" className="pkDomainCtaLink">{t.domainCta}</a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── PAKKET ── */}
        <section className="pkPackageSection">
          <div className="pkInner">
            <div className="pkPackageHead reveal">
              <div className="sectionEye">{t.packageEye}</div>
              <h2>{t.packageTitle}</h2>
              <p className="pkPackageIntro">{t.packageIntro}</p>
            </div>

            <div className="pkPackageGrid">
              <article className="priceCard featured pkPriceCard reveal d1">
                <div className="priceName">{t.packageTitle}</div>
                <div className="priceNum">
                  <strong>{t.packagePrice}</strong>
                  <span>{t.packagePer}</span>
                </div>
                <p className="priceDesc">{t.packageNote}</p>
                <a href="/#planning" className="priceCta">{t.packageCta}</a>
              </article>

              <div className="pkFeatureList reveal d2">
                <h3>{t.featuresTitle}</h3>
                {features.map((f, i) => (
                  <div key={i} className="pkFeatureItem">
                    <div className="pkFeatureNum">{String(i + 1).padStart(2, "0")}</div>
                    <div className="pkFeatureBody">
                      <h4>{f.title}</h4>
                      <p>{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ADD-ONS ── */}
        <section className="pkAddonsSection">
          <div className="pkInner">
            <div className="pkAddonsHead reveal">
              <div className="sectionEye">{t.addonsEye}</div>
              <h2>{t.addonsTitle}</h2>
              <p>{t.addonsSub}</p>
            </div>

            <div className="pkAddonsGrid">
              {addons.map((addon, i) => (
                <article key={i} className="pkAddonCard reveal">
                  <div className="pkAddonHead">
                    <div className="addonTileIcon">{addon.icon}</div>
                    <div className="pkAddonHeadText">
                      <h3>{addon.title}</h3>
                      <div className="pkAddonPrice">{addon.price}{t.addonPerMonth}</div>
                    </div>
                  </div>
                  <p className="pkAddonDesc">{addon.longDesc}</p>
                  <div className="pkAddonFeaturesLabel">{t.includedLabel}</div>
                  <ul className="priceFeatures pkAddonFeatures">
                    {addon.features.map((f, j) => <li key={j}>{f}</li>)}
                  </ul>
                  <div className="pkAddonIdeal">
                    <strong>{t.idealLabel}:</strong> {addon.idealFor}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkCtaSection">
          <div className="pkInner">
            <div className="pkCtaInner reveal">
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
              <a href="/#planning" className="priceCta pkCtaBtn">{t.ctaBtn}</a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="lxFooter">
          <div className="lxFooterInner">
            <div className="lxFooterBrand">
              <img src="/portfolio/logo.png" alt="MS Webdesign" />
              <p>{t.footerTagline}</p>
            </div>
            <nav className="lxFooterNav">
              <Link href="/">{t.navHome}</Link>
              <a href="/#packages">{t.navPackages}</a>
              <a href="/#planning">{t.footerAppointment}</a>
            </nav>
            <div className="lxFooterCopy">© {new Date().getFullYear()} MS Webdesign</div>
          </div>
        </footer>
      </div>
    </>
  );
}
