"use client";

import { useEffect, useMemo, useState } from "react";
import "./globals.css";

type Lang = "nl" | "fr" | "en";

const times = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "18:00",
  "18:30",
];

const translations = {
  nl: {
    home: "Home",
    portfolio: "Portfolio",
    packages: "Pakketten",
    planning: "Planning",
    booking: "Afspraak inplannen",
    language: "Taal",

    heroLine1: "Websites die",
    heroAccentWord: "prestige uitstralen.",
    heroLabel: "Premium websites per maand",
    heroTitle: "Websites die je bedrijf meteen groter doen voelen.",
    heroText:
      "Een moderne website met premium uitstraling, duidelijke structuur en een professionele mobiele ervaring.",
    portfolioBtn: "Bekijk portfolio",
    planningBtn: "Afspraak inplannen",

    showcaseLabel: "Premium uitstraling",
    showcaseTitle: "Professioneel online zonder ingewikkeld traject.",
    showcaseText: "Ideaal voor zelfstandigen, lokale bedrijven en webshops.",

    process1Title: "Kennismaking",
    process1Text:
      "We starten met een call van 30 minuten waarin we bespreken wat je bedrijf doet en welke stijl je mooi vindt.",
    process2Title: "Eerste versie",
    process2Text:
      "Binnen ongeveer 2 dagen ontvang je de eerste versie van je website.",
    process3Title: "Afwerking",
    process3Text:
      "Daarna werken we alles verder af tot je volledig tevreden bent.",
    process4Title: "Start abonnement",
    process4Text:
      "Pas wanneer alles goed staat en de website online gaat, start je abonnement.",

    splitLabel: "Sterke eerste indruk",
    splitTitle: "Je website moet direct vertrouwen geven.",

    step1Title: "Professionele uitstraling",
    step1Text:
      "Je website moet meteen verzorgd, modern en betrouwbaar overkomen.",
    step2Title: "Duidelijke structuur",
    step2Text:
      "Bezoekers moeten snel begrijpen wat je doet en hoe ze contact opnemen.",
    step3Title: "Snel online",
    step3Text:
      "Geen traject van maanden. Gewoon een sterke website die werkt.",

    workLabel: "Portfolio",
    workTitle: "Websites met présence.",
    viewLive: "Live website bekijken →",
    viewPortfolio: "Bekijk portfolio →",
    fullPortfolio: "Volledig portfolio bekijken",

    packageLabel: "Abonnementen",
    packageTitle: "Simpel kiezen. Snel online.",
    included: "Inbegrepen",
    perMonth: "/maand",

    plannerLabel: "Afspraak inplannen",
    plannerTitle: "Kies direct een moment.",
    plannerText:
      "De eerstvolgende vrije afspraak wordt automatisch geselecteerd.",
    chooseDate: "Kies datum",
    chooseTime: "Kies uur",
    selectedMoment: "Gekozen moment",
    occupied: "Bezet",
    continue: "Verder",
    at: "om",

    modalTitle: "Afspraak aanvragen",
    modalText:
      "Vul kort je gegevens in. De rest bespreken we tijdens de call.",
    choosePackage: "Kies je pakket",
    noPackage: "Ik weet het nog niet",
    name: "Naam *",
    email: "E-mail *",
    phone: "Telefoon",
    company: "Bedrijf",
    description: "Omschrijf kort wat je zoekt...",
    primaryColor: "Hoofdkleur",
    secondaryColor: "Tweede kleur",
    accentColor: "Accentkleur",
    inspiration: "Inspiratie websites",
    addLink: "+ Link toevoegen",
    discussCall: "Ik bespreek dit liever gewoon tijdens de call",
    submit: "Afspraak aanvragen",
    sending: "Aanvragen...",
    requiredError: "Vul minstens je naam en e-mail in.",
    bookedError: "Dit tijdslot is al bezet.",
    generalError: "Er ging iets mis. Mogelijk is dit slot net geboekt.",
    success: "Afspraak aangevraagd. Ik neem contact met je op.",

    packagesData: [
      {
        name: "Start",
        oldPrice: "€39,99",
        price: "€29,99",
        note: "Voor starters",
        desc: "Een professionele basiswebsite om snel betrouwbaar online te staan.",
        included: [
          "1 tot 3 pagina’s",
          "Mobielvriendelijk",
          "Contactknop",
          "Basis SEO",
          "Snelle oplevering",
        ],
      },
      {
        name: "Studio",
        oldPrice: "€69,99",
        price: "€49,99",
        note: "Meest gekozen",
        desc: "Voor bedrijven die sterker willen overkomen.",
        included: [
          "Tot 6 pagina’s",
          "Premium uitstraling",
          "Reviews of portfolio",
          "Afspraakmodule",
          "Sterke mobiele versie",
        ],
      },
      {
        name: "Commerce",
        oldPrice: "€159,99",
        price: "€129,99",
        note: "Webshop",
        desc: "Voor bedrijven die online producten willen verkopen.",
        included: [
          "Webshop structuur",
          "Productpagina’s",
          "Checkout flow",
          "Mobielvriendelijk",
        ],
      },
    ],

    workData: [
      "Bomaco Winter Jumping",
      "Website lokale onderneming",
      "Webshop concept",
      "Premium one-pager",
    ],
  },

  fr: {
    home: "Accueil",
    portfolio: "Portfolio",
    packages: "Formules",
    planning: "Planning",
    booking: "Prendre rendez-vous",
    language: "Langue",

    heroLine1: "Des sites qui",
    heroAccentWord: "inspirent confiance.",
    heroLabel: "Sites premium par abonnement",
    heroTitle:
      "Des sites qui donnent immédiatement plus de valeur à votre entreprise.",
    heroText:
      "Un site moderne avec une image premium, une structure claire et une expérience mobile professionnelle.",
    portfolioBtn: "Voir le portfolio",
    planningBtn: "Prendre rendez-vous",

    showcaseLabel: "Image premium",
    showcaseTitle: "Une présence professionnelle sans processus compliqué.",
    showcaseText:
      "Idéal pour les indépendants, les entreprises locales et les boutiques en ligne.",

    process1Title: "Premier appel",
    process1Text:
      "Nous commençons par un appel de 30 minutes pour comprendre votre activité et le style souhaité.",
    process2Title: "Première version",
    process2Text:
      "Environ 2 jours plus tard, vous recevez la première version de votre site.",
    process3Title: "Finalisation",
    process3Text:
      "Nous ajustons ensuite le site jusqu’à ce que vous soyez entièrement satisfait.",
    process4Title: "Début de l’abonnement",
    process4Text:
      "L’abonnement commence seulement lorsque le site est terminé et mis en ligne.",

    splitLabel: "Première impression forte",
    splitTitle: "Votre site doit inspirer confiance immédiatement.",

    step1Title: "Image professionnelle",
    step1Text:
      "Votre site doit immédiatement paraître soigné, moderne et fiable.",
    step2Title: "Structure claire",
    step2Text:
      "Les visiteurs doivent comprendre rapidement ce que vous faites et comment vous contacter.",
    step3Title: "Rapidement en ligne",
    step3Text:
      "Pas de processus de plusieurs mois. Juste un site solide qui fonctionne.",

    workLabel: "Portfolio",
    workTitle: "Des sites avec présence.",
    viewLive: "Voir le site en ligne →",
    viewPortfolio: "Voir le portfolio →",
    fullPortfolio: "Voir tout le portfolio",

    packageLabel: "Abonnements",
    packageTitle: "Choix simple. Site rapidement en ligne.",
    included: "Inclus",
    perMonth: "/mois",

    plannerLabel: "Prendre rendez-vous",
    plannerTitle: "Choisissez directement un moment.",
    plannerText:
      "Le premier créneau disponible est automatiquement sélectionné.",
    chooseDate: "Choisir une date",
    chooseTime: "Choisir une heure",
    selectedMoment: "Moment choisi",
    occupied: "Occupé",
    continue: "Continuer",
    at: "à",

    modalTitle: "Demande de rendez-vous",
    modalText:
      "Remplissez brièvement vos coordonnées. Le reste sera discuté pendant l’appel.",
    choosePackage: "Choisissez votre formule",
    noPackage: "Je ne sais pas encore",
    name: "Nom *",
    email: "E-mail *",
    phone: "Téléphone",
    company: "Entreprise",
    description: "Décrivez brièvement ce que vous cherchez...",
    primaryColor: "Couleur principale",
    secondaryColor: "Deuxième couleur",
    accentColor: "Couleur accent",
    inspiration: "Sites d’inspiration",
    addLink: "+ Ajouter un lien",
    discussCall: "Je préfère en discuter pendant l’appel",
    submit: "Demander le rendez-vous",
    sending: "Envoi...",
    requiredError: "Remplissez au moins votre nom et e-mail.",
    bookedError: "Ce créneau est déjà réservé.",
    generalError:
      "Une erreur est survenue. Ce créneau vient peut-être d’être réservé.",
    success: "Rendez-vous demandé. Je vous contacte bientôt.",

    packagesData: [
      {
        name: "Start",
        oldPrice: "€39,99",
        price: "€29,99",
        note: "Pour débuter",
        desc: "Un site professionnel simple pour être rapidement crédible en ligne.",
        included: [
          "1 à 3 pages",
          "Compatible mobile",
          "Bouton de contact",
          "SEO de base",
          "Livraison rapide",
        ],
      },
      {
        name: "Studio",
        oldPrice: "€69,99",
        price: "€49,99",
        note: "Le plus choisi",
        desc: "Pour les entreprises qui veulent une image plus forte.",
        included: [
          "Jusqu’à 6 pages",
          "Image premium",
          "Avis ou portfolio",
          "Module de rendez-vous",
          "Version mobile solide",
        ],
      },
      {
        name: "Commerce",
        oldPrice: "€159,99",
        price: "€129,99",
        note: "Boutique en ligne",
        desc: "Pour les entreprises qui souhaitent vendre des produits en ligne.",
        included: [
          "Structure webshop",
          "Pages produits",
          "Parcours de paiement",
          "Compatible mobile",
        ],
      },
    ],

    workData: [
      "Bomaco Winter Jumping",
      "Site entreprise locale",
      "Concept webshop",
      "One-pager premium",
    ],
  },

  en: {
    home: "Home",
    portfolio: "Portfolio",
    packages: "Packages",
    planning: "Planning",
    booking: "Book a call",
    language: "Language",

    heroLine1: "Websites that",
    heroAccentWord: "command presence.",
    heroLabel: "Premium websites per month",
    heroTitle: "Websites that instantly make your business feel bigger.",
    heroText:
      "A modern website with a premium look, clear structure and a professional mobile experience.",
    portfolioBtn: "View portfolio",
    planningBtn: "Book a call",

    showcaseLabel: "Premium presence",
    showcaseTitle:
      "Professional online presence without a complicated process.",
    showcaseText: "Ideal for freelancers, local businesses and webshops.",

    process1Title: "Intro call",
    process1Text:
      "We start with a 30-minute call to understand your business and preferred style.",
    process2Title: "First version",
    process2Text:
      "Around 2 days later, you receive the first version of your website.",
    process3Title: "Finishing",
    process3Text:
      "Then we refine everything until you are completely satisfied.",
    process4Title: "Subscription starts",
    process4Text:
      "Your subscription only starts when the website is finished and live.",

    splitLabel: "Strong first impression",
    splitTitle: "Your website should instantly create trust.",

    step1Title: "Professional appearance",
    step1Text:
      "Your website should immediately feel polished, modern and trustworthy.",
    step2Title: "Clear structure",
    step2Text:
      "Visitors should quickly understand what you do and how to contact you.",
    step3Title: "Online quickly",
    step3Text:
      "No months-long process. Just a strong website that works.",

    workLabel: "Portfolio",
    workTitle: "Websites with presence.",
    viewLive: "View live website →",
    viewPortfolio: "View portfolio →",
    fullPortfolio: "View full portfolio",

    packageLabel: "Subscriptions",
    packageTitle: "Choose easily. Go online fast.",
    included: "Included",
    perMonth: "/month",

    plannerLabel: "Book a call",
    plannerTitle: "Choose a moment directly.",
    plannerText:
      "The first available appointment is automatically selected.",
    chooseDate: "Choose date",
    chooseTime: "Choose time",
    selectedMoment: "Selected moment",
    occupied: "Booked",
    continue: "Continue",
    at: "at",

    modalTitle: "Request appointment",
    modalText:
      "Fill in your details briefly. We can discuss the rest during the call.",
    choosePackage: "Choose your package",
    noPackage: "I am not sure yet",
    name: "Name *",
    email: "Email *",
    phone: "Phone",
    company: "Company",
    description: "Briefly describe what you are looking for...",
    primaryColor: "Primary color",
    secondaryColor: "Second color",
    accentColor: "Accent color",
    inspiration: "Inspiration websites",
    addLink: "+ Add link",
    discussCall: "I prefer to discuss this during the call",
    submit: "Request appointment",
    sending: "Sending...",
    requiredError: "Please fill in at least your name and email.",
    bookedError: "This time slot is already booked.",
    generalError: "Something went wrong. This slot may have just been booked.",
    success: "Appointment requested. I will contact you.",

    packagesData: [
      {
        name: "Start",
        oldPrice: "€39.99",
        price: "€29.99",
        note: "For starters",
        desc: "A professional basic website to quickly build trust online.",
        included: [
          "1 to 3 pages",
          "Mobile friendly",
          "Contact button",
          "Basic SEO",
          "Fast delivery",
        ],
      },
      {
        name: "Studio",
        oldPrice: "€69.99",
        price: "€49.99",
        note: "Most popular",
        desc: "For businesses that want to look stronger and more professional.",
        included: [
          "Up to 6 pages",
          "Premium look",
          "Reviews or portfolio",
          "Booking module",
          "Strong mobile version",
        ],
      },
      {
        name: "Commerce",
        oldPrice: "€159.99",
        price: "€129.99",
        note: "Webshop",
        desc: "For businesses that want to sell products online.",
        included: [
          "Webshop structure",
          "Product pages",
          "Checkout flow",
          "Mobile friendly",
        ],
      },
    ],

    workData: [
      "Bomaco Winter Jumping",
      "Local business website",
      "Webshop concept",
      "Premium one-pager",
    ],
  },
};

function getDays(lang: Lang) {
  const formatter = new Intl.DateTimeFormat(
    lang === "fr" ? "fr-BE" : lang === "en" ? "en-GB" : "nl-BE",
    {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }
  );

  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      label: formatter.format(date),
      value: date.toISOString().split("T")[0],
    };
  });
}

function isSlotTooSoon(date: string, time: string) {
  const slotDate = new Date(`${date}T${time}:00`);
  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 24);
  return slotDate < minDate;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("nl");
  const t = translations[lang];

  const days = useMemo(() => getDays(lang), [lang]);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Nav scroll + mobile menu
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    name: string; email: string; date: string; time: string;
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
    primary_color: "#7c3cff",
    secondary_color: "#ff48d4",
    accent_color: "#ffffff",
    inspiration_links: ["", "", ""],
    discuss_in_call: false,
  });

  // Scroll listener → nav scrolled state
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 980) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll reveal — IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function loadBookedSlots() {
      setLoadingSlots(true);

      const res = await fetch("/api/booked-slots");
      const json = await res.json();
      if (json.slots) {
        setBookedSlots(json.slots);
      }

      setLoadingSlots(false);
    }

    loadBookedSlots();
  }, []);

  useEffect(() => {
    if (loadingSlots) return;

    for (const day of days) {
      for (const time of times) {
        const slotKey = `${day.value}_${time}`;
        const booked = bookedSlots.includes(slotKey);
        const tooSoon = isSlotTooSoon(day.value, time);

        if (!booked && !tooSoon) {
          setSelectedDay(day.value);
          setSelectedTime(time);
          return;
        }
      }
    }
  }, [loadingSlots, bookedSlots, days]);

  const selectedSlotKey = `${selectedDay}_${selectedTime}`;
  const selectedSlotBooked = bookedSlots.includes(selectedSlotKey);

  const updateLink = (index: number, value: string) => {
    setForm((prev) => {
      const links = [...prev.inspiration_links];
      links[index] = value;
      return { ...prev, inspiration_links: links };
    });
  };

  const addLink = () => {
    setForm((prev) => ({
      ...prev,
      inspiration_links: [...prev.inspiration_links, ""],
    }));
  };

  const submitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email) {
      setError(t.requiredError);
      return;
    }

    if (!selectedDay || !selectedTime || selectedSlotBooked) {
      setError(t.bookedError);
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_date: selectedDay,
          appointment_time: selectedTime,
          package: selectedPackage || null,
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          company: form.company || null,
          description: form.description || null,
          primary_color: form.primary_color,
          secondary_color: form.secondary_color,
          accent_color: form.accent_color,
          inspiration_links: form.inspiration_links.filter(Boolean),
          discuss_in_call: form.discuss_in_call,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "slot_taken") {
          setError(t.bookedError);
        } else {
          setError(t.generalError);
        }
        return;
      }

      setBookedSlots((prev) => [...prev, selectedSlotKey]);
      setModalOpen(false);
      setBookingSuccess({
        name: form.name,
        email: form.email,
        date: selectedDay,
        time: selectedTime,
      });
    } catch {
      setError(t.generalError);
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      {/* ── Header ── */}
      <header className={`siteNav${navScrolled ? " scrolled" : ""}`}>
        <nav className="navLinks">
          <a href="/portfolio">{t.portfolio}</a>
          <a href="#packages">{t.packageLabel}</a>
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
          <a className="navBtn" href="#planning">{t.booking}</a>
          <button
            className={`hamburger${mobileOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile nav ── */}
      <nav className={`mobileNav${mobileOpen ? " open" : ""}`}>
        <a href="/portfolio" data-idx="01" onClick={() => setMobileOpen(false)}>{t.portfolio}</a>
        <a href="#packages" data-idx="02" onClick={() => setMobileOpen(false)}>{t.packageLabel}</a>
        <div className="mobileNavDivider" />
        <a href="#planning" className="mobileNavCta" onClick={() => setMobileOpen(false)}>
          {t.booking}
        </a>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO — EDITORIAL AGENCY
      ══════════════════════════════════════════════ */}
      <section className="hero">
        {/* Ambient orbs */}
        <div className="heroOrbs" aria-hidden="true">
          <div className="heroOrb heroOrb1" />
          <div className="heroOrb heroOrb2" />
        </div>

        {/* Main content */}
        <div className="heroInner">
          <p className="heroEyebrow">Digitale webdesign agency · Belgium</p>

          <h1 className="heroHeadline">
            <span className="lineLight">{t.heroLine1}</span>
            <span className="lineAccent">{t.heroAccentWord}</span>
          </h1>

          <p className="heroSub">{t.heroText}</p>

          <div className="heroCta">
            <a className="btn" href="/portfolio">{t.portfolioBtn}</a>
            <a className="btnGhost" href="#planning">{t.planningBtn}</a>
          </div>

          <hr className="heroRule" />

          <div className="heroMetrics">
            <div className="heroMetric">
              <span className="heroMetricValue">2</span>
              <span className="heroMetricLabel">Dagen · Eerste versie</span>
            </div>
            <div className="heroMetric">
              <span className="heroMetricValue">€29</span>
              <span className="heroMetricLabel">Per maand · Vanaf</span>
            </div>
            <div className="heroMetric">
              <span className="heroMetricValue">4+</span>
              <span className="heroMetricLabel">Projecten · Opgeleverd</span>
            </div>
            <div className="heroMetric">
              <span className="heroMetricValue">100%</span>
              <span className="heroMetricLabel">Op maat · Altijd</span>
            </div>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="ticker" aria-hidden="true">
          <div className="tickerInner">
            {([0, 1] as const).map((i) => (
              <span key={i} className="tickerGroup">
                <span className="tickerItem">Premium Webdesign</span>
                <span className="tickerDot">·</span>
                <span className="tickerItem">Snel Online</span>
                <span className="tickerDot">·</span>
                <span className="tickerItem">€29 / Maand</span>
                <span className="tickerDot">·</span>
                <span className="tickerItem">Volledig Op Maat</span>
                <span className="tickerDot">·</span>
                <span className="tickerItem">Belgium</span>
                <span className="tickerDot">·</span>
                <span className="tickerItem">Live in 2 Dagen</span>
                <span className="tickerDot">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS — PREMIUM UITSTRALING
      ══════════════════════════════════════════════ */}
      <section className="process">
        <div className="processWrap">
          <div className="processTop reveal-left">
            <div>
              <span className="sectionLabel">{t.showcaseLabel}</span>
              <h2>{t.showcaseTitle}</h2>
            </div>
            <p>{t.showcaseText}</p>
          </div>

          <div className="processSteps">
            <div className="processStep reveal d1">
              <span className="stepNum">01</span>
              <h4>{t.process1Title}</h4>
              <p>{t.process1Text}</p>
            </div>
            <div className="processStep reveal d2">
              <span className="stepNum">02</span>
              <h4>{t.process2Title}</h4>
              <p>{t.process2Text}</p>
            </div>
            <div className="processStep reveal d3">
              <span className="stepNum">03</span>
              <h4>{t.process3Title}</h4>
              <p>{t.process3Text}</p>
            </div>
            <div className="processStep reveal d4">
              <span className="stepNum">04</span>
              <h4>{t.process4Title}</h4>
              <p>{t.process4Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABONNEMENTEN
      ══════════════════════════════════════════════ */}
      <section id="packages" className="packages">
        <div className="packInner">
          <div className="packTop reveal">
            <span className="sectionLabel">{t.packageLabel}</span>
            <h2>{t.packageTitle}</h2>
          </div>

          <div className="packGrid">
            {t.packagesData.map((pack, i) => (
              <article
                className={`pack ${i === 1 ? "active" : ""} reveal d${i + 1}`}
                key={pack.name}
              >
                <small>{pack.note}</small>
                <h3>{pack.name}</h3>

                <div className="priceWrap">
                  <span className="oldPrice">{pack.oldPrice}{t.perMonth}</span>
                  <strong>
                    {pack.price}
                    <span>{t.perMonth}</span>
                  </strong>
                </div>

                <p>{pack.desc}</p>

                <div className="packageList">
                  <b>{t.included}</b>
                  <ul>
                    {pack.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#planning"
                  onClick={() => setSelectedPackage(pack.name)}
                >
                  {t.booking}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AFSPRAAK INPLANNEN
      ══════════════════════════════════════════════ */}
      <section className="planner" id="planning">
        <div className="plannerInner">
          <div className="plannerLeft reveal-left">
            <span className="sectionLabel">{t.plannerLabel}</span>
            <h2>{t.plannerTitle}</h2>
            <p>{t.plannerText}</p>

            <div className="plannerFeatures">
              <div className="plannerFeature">
                <span>✓</span>
                <span>Gratis kennismakingsgesprek</span>
              </div>
              <div className="plannerFeature">
                <span>✓</span>
                <span>30 minuten via Google Meet</span>
              </div>
              <div className="plannerFeature">
                <span>✓</span>
                <span>Geen verplichtingen</span>
              </div>
            </div>
          </div>

          <div className="plannerRight reveal-right">
            {bookingSuccess ? (
              <div className="bookingSuccess">
                <div className="successIcon">
                  <svg viewBox="0 0 52 52" className="successCheckSvg">
                    <circle className="successCircle" cx="26" cy="26" r="25" fill="none" />
                    <path className="successCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <h3>Afspraak aangevraagd! ✨</h3>
                <div className="successSlot">
                  📅 <strong>{bookingSuccess.date}</strong>
                  <span style={{ opacity: 0.45 }}>·</span>
                  <strong>{bookingSuccess.time}</strong>
                </div>
                <p>
                  Een bevestiging wordt verstuurd naar<br />
                  <strong>{bookingSuccess.email}</strong>
                </p>
                <button
                  type="button"
                  className="successReset"
                  onClick={() => {
                    setBookingSuccess(null);
                    setSelectedDay("");
                    setSelectedTime("");
                    setSelectedPackage("");
                  }}
                >
                  + Nieuwe afspraak maken
                </button>
              </div>
            ) : (
              <div className="plannerBox">
                <h3>{t.chooseDate}</h3>

                <div className="dayGrid">
                  {days.map((day) => (
                    <button
                      type="button"
                      key={day.value}
                      onClick={() => setSelectedDay(day.value)}
                      className={selectedDay === day.value ? "selected" : ""}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>

                <h3>{t.chooseTime}</h3>

                <div className="timeGrid">
                  {times.map((time) => {
                    const slotKey = `${selectedDay}_${time}`;
                    const booked = bookedSlots.includes(slotKey);
                    const tooSoon = selectedDay && isSlotTooSoon(selectedDay, time);
                    const disabled = booked || tooSoon;

                    return (
                      <button
                        type="button"
                        key={time}
                        disabled={!!disabled}
                        onClick={() => setSelectedTime(time)}
                        className={`${selectedTime === time ? "selected" : ""} ${
                          disabled ? "disabled" : ""
                        }`}
                      >
                        {disabled ? t.occupied : time}
                      </button>
                    );
                  })}
                </div>

                <div className="selectedSlot">
                  <span>{t.selectedMoment}</span>
                  <strong>
                    {selectedDay} {t.at} {selectedTime}
                  </strong>
                </div>

                <button
                  type="button"
                  className="confirmBtn"
                  disabled={
                    loadingSlots ||
                    selectedSlotBooked ||
                    !selectedDay ||
                    !selectedTime
                  }
                  onClick={() => setModalOpen(true)}
                >
                  {t.continue}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">
            <img src="/portfolio/logo.png" alt="MS Webdesign" />
            <p>Premium webdesign voor ambitieuze bedrijven.</p>
          </div>

          <nav className="footerNav">
            <a href="/portfolio">{t.portfolio}</a>
            <a href="#packages">{t.packageLabel}</a>
            <a href="#planning">{t.planning}</a>
          </nav>

          <div className="footerCopy">
            © {new Date().getFullYear()} MS Webdesign
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          BOOKING MODAL
      ══════════════════════════════════════════════ */}
      {modalOpen && (
        <div className="bookingOverlay">
          <div className="bookingModal">
            <button
              className="modalClose"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            <div className="modalHead">
              <span className="sectionLabel">{t.modalTitle}</span>
              <h2>
                {selectedDay} {t.at} {selectedTime}
              </h2>
              <p>{t.modalText}</p>
            </div>

            <form onSubmit={submitAppointment}>
              <div className="formGrid">
                <input
                  placeholder={t.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder={t.email}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  placeholder={t.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  placeholder={t.company}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <div className="packageSelectBox">
                <b>{t.choosePackage}</b>
                <div className="modalPackageGrid">
                  {t.packagesData.map((pack, i) => (
                    <button
                      type="button"
                      key={pack.name}
                      onClick={() => setSelectedPackage(pack.name)}
                      className={`modalPack ${
                        selectedPackage === pack.name ? "selected" : ""
                      } ${i === 1 ? "popular" : ""}`}
                    >
                      <small>{pack.note}</small>
                      <h3>{pack.name}</h3>
                      <div className="modalPriceWrap">
                        <span>{pack.oldPrice}{t.perMonth}</span>
                        <strong>
                          {pack.price}
                          <em>{t.perMonth}</em>
                        </strong>
                      </div>
                      <p>{pack.desc}</p>
                      <ul>
                        {pack.included.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setSelectedPackage("")}
                    className={`modalPack unsure ${
                      selectedPackage === "" ? "selected" : ""
                    }`}
                  >
                    <small>{t.choosePackage}</small>
                    <h3>{t.noPackage}</h3>
                    <p>—</p>
                  </button>
                </div>
              </div>

              <div className="colorPickerGrid">
                <label>
                  {t.primaryColor}
                  <input
                    type="color"
                    value={form.primary_color}
                    onChange={(e) =>
                      setForm({ ...form, primary_color: e.target.value })
                    }
                  />
                  <span>{form.primary_color}</span>
                </label>
                <label>
                  {t.secondaryColor}
                  <input
                    type="color"
                    value={form.secondary_color}
                    onChange={(e) =>
                      setForm({ ...form, secondary_color: e.target.value })
                    }
                  />
                  <span>{form.secondary_color}</span>
                </label>
                <label>
                  {t.accentColor}
                  <input
                    type="color"
                    value={form.accent_color}
                    onChange={(e) =>
                      setForm({ ...form, accent_color: e.target.value })
                    }
                  />
                  <span>{form.accent_color}</span>
                </label>
              </div>

              <textarea
                placeholder={t.description}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="linksBox">
                <b>{t.inspiration}</b>
                {form.inspiration_links.map((link, index) => (
                  <input
                    key={index}
                    type="url"
                    placeholder={`Website link ${index + 1}`}
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                  />
                ))}
                <button type="button" onClick={addLink}>
                  {t.addLink}
                </button>
              </div>

              <label className="checkLine">
                <input
                  type="checkbox"
                  checked={form.discuss_in_call}
                  onChange={(e) =>
                    setForm({ ...form, discuss_in_call: e.target.checked })
                  }
                />
                {t.discussCall}
              </label>

              {error && <p className="formError">{error}</p>}
              {success && <p className="formSuccess">{success}</p>}

              <button className="confirmBtn" disabled={sending}>
                {sending ? t.sending : t.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
