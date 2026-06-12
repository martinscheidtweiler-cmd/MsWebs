"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "./globals.css";

type Lang = "nl" | "fr" | "en";

const times = [
  "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "18:00", "18:30",
];

const translations = {
  nl: {
    heroLine1: "Websites die",
    heroAccentWord: "prestige uitstralen.",
    heroText: "Een moderne website met premium uitstraling, duidelijke structuur en een professionele mobiele ervaring.",
    portfolioBtn: "Bekijk portfolio",
    planningBtn: "Afspraak inplannen",
    process1Title: "Kennismaking",
    process1Text: "We starten met een call van 30 minuten waarin we bespreken wat je bedrijf doet en welke stijl je mooi vindt.",
    process2Title: "Eerste versie",
    process2Text: "Binnen ongeveer 2 dagen ontvang je de eerste versie van je website.",
    process3Title: "Afwerking",
    process3Text: "Daarna werken we alles verder af tot je volledig tevreden bent.",
    plannerLabel: "Afspraak inplannen",
    plannerTitle: "Kies direct een moment.",
    plannerText: "De eerstvolgende vrije afspraak wordt automatisch geselecteerd.",
    chooseDate: "Kies datum",
    chooseTime: "Kies uur",
    selectedMoment: "Gekozen moment",
    occupied: "Bezet",
    continue: "Verder",
    at: "om",
    modalTitle: "Afspraak aanvragen",
    modalText: "Vul kort je gegevens in. De rest bespreken we tijdens de call.",
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
    perMonth: "/maand",
    clientAreaLink: "Klantengedeelte",
    portfolio: "Portfolio",
    packageLabel: "Pakketten",
  },
  fr: {
    heroLine1: "Des sites qui",
    heroAccentWord: "inspirent confiance.",
    heroText: "Un site moderne avec une image premium, une structure claire et une expérience mobile professionnelle.",
    portfolioBtn: "Voir le portfolio",
    planningBtn: "Prendre rendez-vous",
    process1Title: "Premier appel",
    process1Text: "Nous commençons par un appel de 30 minutes pour comprendre votre activité et le style souhaité.",
    process2Title: "Première version",
    process2Text: "Environ 2 jours plus tard, vous recevez la première version de votre site.",
    process3Title: "Finalisation",
    process3Text: "Nous ajustons ensuite le site jusqu'à ce que vous soyez entièrement satisfait.",
    plannerLabel: "Prendre rendez-vous",
    plannerTitle: "Choisissez directement un moment.",
    plannerText: "Le premier créneau disponible est automatiquement sélectionné.",
    chooseDate: "Choisir une date",
    chooseTime: "Choisir une heure",
    selectedMoment: "Moment choisi",
    occupied: "Occupé",
    continue: "Continuer",
    at: "à",
    modalTitle: "Demande de rendez-vous",
    modalText: "Remplissez brièvement vos coordonnées. Le reste sera discuté pendant l'appel.",
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
    inspiration: "Sites d'inspiration",
    addLink: "+ Ajouter un lien",
    discussCall: "Je préfère en discuter pendant l'appel",
    submit: "Demander le rendez-vous",
    sending: "Envoi...",
    requiredError: "Remplissez au moins votre nom et e-mail.",
    bookedError: "Ce créneau est déjà réservé.",
    generalError: "Une erreur est survenue. Ce créneau vient peut-être d'être réservé.",
    perMonth: "/mois",
    clientAreaLink: "Espace client",
    portfolio: "Portfolio",
    packageLabel: "Formules",
  },
  en: {
    heroLine1: "Websites that",
    heroAccentWord: "command presence.",
    heroText: "A modern website with a premium look, clear structure and a professional mobile experience.",
    portfolioBtn: "View portfolio",
    planningBtn: "Book a call",
    process1Title: "Intro call",
    process1Text: "We start with a 30-minute call to understand your business and preferred style.",
    process2Title: "First version",
    process2Text: "Around 2 days later, you receive the first version of your website.",
    process3Title: "Finishing",
    process3Text: "Then we refine everything until you are completely satisfied.",
    plannerLabel: "Book a call",
    plannerTitle: "Choose a moment directly.",
    plannerText: "The first available appointment is automatically selected.",
    chooseDate: "Choose date",
    chooseTime: "Choose time",
    selectedMoment: "Selected moment",
    occupied: "Booked",
    continue: "Continue",
    at: "at",
    modalTitle: "Request appointment",
    modalText: "Fill in your details briefly. We can discuss the rest during the call.",
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
    perMonth: "/month",
    clientAreaLink: "Client area",
    portfolio: "Portfolio",
    packageLabel: "Packages",
  },
};

const PROJECTS = [
  { id: "haarhuys", title: "'t Haarhuys", type: "Kapsalon · Curly Hair Specialist", tags: ["Kapsalon", "Webshop", "Dark", "Workshops"], accent: "#c97d4e", url: "/templates/haarhuys", external: false, image: "/portfolio/haarhuyspic.png" },
  { id: "bomaco", title: "Bomaco Winter Jumping", type: "Springconcours · Events", tags: ["Paarden", "Events", "Meertalig", "Live"], accent: "#3b82f6", url: "https://bomaco-website.vercel.app/", external: true, image: "/portfolio/bomacopic.png" },
  { id: "hippique", title: "Hippique.immo", type: "Vastgoed · Hippisch & Landelijk", tags: ["Vastgoed", "Luxury", "Paarden", "Cinematic"], accent: "#ed6e21", url: "/templates/alba-immo", external: false, image: "/portfolio/hippiquepic.png" },
  { id: "vls", title: "VLS Verwarming", type: "Verwarming · Sanitair · Airco", tags: ["Verwarming", "Dark", "Animatie", "Lokaal"], accent: "#2563eb", url: "/templates/vls-verwarming", external: false, image: "/portfolio/vlspic.png" },
  { id: "kapper", title: "Kapsalon Nijlen", type: "Barbershop · IMAD & Mahmoud", tags: ["Barbershop", "Rood", "Modern", "Reservaties"], accent: "#e53e3e", url: "/templates/kapper-nijlen", external: false, image: "/portfolio/kapsalonnijlenpic.png" },
  { id: "edison", title: "Edison Electricity", type: "Elektricien · Nijlen & omgeving", tags: ["Elektricien", "Teal", "Noodservice"], accent: "#18b4c8", url: "/templates/edison-electricity", external: false },
];

const PACKAGE = {
  name: "Website Essential",
  price: "€29,99",
  note: "Alles inbegrepen · Geen setup kosten",
  desc: "Eén abonnement. Jouw professionele website, volledig beheerd en up-to-date.",
  features: [
    "Volledig op maat ontwerp",
    "Mobielvriendelijk & snel geladen",
    "Hosting, SSL & domein inbegrepen",
    "30 min/mnd aanpassingen",
    "Basis SEO-optimalisatie",
    "Online binnen 2 werkdagen",
  ],
};

const ADDONS = [
  { icon: "🔍", title: "Google Boost", desc: "Google Business Profile, Maps-integratie en reviews.", price: "+€9,99/mnd" },
  { icon: "🛍️", title: "Webshop Module", desc: "Volledige webshop met productbeheer en checkout.", price: "+€19,99/mnd" },
  { icon: "📅", title: "Afspraakmodule", desc: "Online afspraken boeken met e-mailbevestigingen.", price: "+€19,99/mnd" },
  { icon: "🌍", title: "Extra taal", desc: "Extra taalversie met taalwisselaar en eigen content.", price: "+€9,99/mnd" },
  { icon: "⚡", title: "Onderhoud Premium", desc: "90 min/mnd aanpassingen met priority support.", price: "+€14,99/mnd" },
  { icon: "✍️", title: "Blog Module", desc: "Volledig blogplatform met categoriepagina's en SEO.", price: "+€9,99/mnd" },
];

const STORY_CLAIMS = [
  { before: "Websites die niet alleen", accent: "mooi zijn —", after: "ze converteren." },
  { before: "Van idee tot", accent: "live website", after: "in 2 werkdagen." },
  { before: "Professioneel online", accent: "vanaf €29,99", after: "per maand." },
];

function getDays(lang: Lang) {
  const formatter = new Intl.DateTimeFormat(
    lang === "fr" ? "fr-BE" : lang === "en" ? "en-GB" : "nl-BE",
    { weekday: "short", day: "2-digit", month: "2-digit" }
  );
  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return { label: formatter.format(date), value: date.toISOString().split("T")[0] };
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
  const [bookingSuccess, setBookingSuccess] = useState<{ name: string; email: string; date: string; time: string } | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", description: "",
    primary_color: "#7c3cff", secondary_color: "#ff48d4", accent_color: "#ffffff",
    inspiration_links: ["", "", ""], discuss_in_call: false,
  });

  // Nav state
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Story state
  const [storyIdx, setStoryIdx] = useState(0);

  // Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const portfolioTrackRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!dot || !glow) return;
    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal — uses .in class
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Story sticky scroll
  useEffect(() => {
    const onScroll = () => {
      const el = storyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      // Last slide gets a smaller scroll budget (last 25%) so it's visible
      // for a moment, then the sticky section releases naturally and
      // slide 3 scrolls up out of view as the next section appears.
      const lastShare = 0.25;
      let idx = 0;
      if (progress >= 1 - lastShare) idx = STORY_CLAIMS.length - 1;
      else idx = Math.min(STORY_CLAIMS.length - 2, Math.floor((progress / (1 - lastShare)) * (STORY_CLAIMS.length - 1)));
      setStoryIdx(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Portfolio horizontal scroll
  useEffect(() => {
    const onScroll = () => {
      const wrap = portfolioRef.current;
      const track = portfolioTrackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect();
      const totalScroll = wrap.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 120);
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load booked slots
  useEffect(() => {
    async function loadBookedSlots() {
      setLoadingSlots(true);
      const res = await fetch("/api/booked-slots");
      const json = await res.json();
      if (json.slots) setBookedSlots(json.slots);
      setLoadingSlots(false);
    }
    loadBookedSlots();
  }, []);

  // Auto-select first available slot
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
    setForm((prev) => ({ ...prev, inspiration_links: [...prev.inspiration_links, ""] }));
  };

  const submitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.email) { setError(t.requiredError); return; }
    if (!selectedDay || !selectedTime || selectedSlotBooked) { setError(t.bookedError); return; }
    setSending(true);
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_date: selectedDay, appointment_time: selectedTime,
          package: selectedPackage || null, name: form.name, email: form.email,
          phone: form.phone || null, company: form.company || null,
          description: form.description || null, primary_color: form.primary_color,
          secondary_color: form.secondary_color, accent_color: form.accent_color,
          inspiration_links: form.inspiration_links.filter(Boolean),
          discuss_in_call: form.discuss_in_call,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === "slot_taken" ? t.bookedError : t.generalError);
        return;
      }
      setBookedSlots((prev) => [...prev, selectedSlotKey]);
      setModalOpen(false);
      setBookingSuccess({ name: form.name, email: form.email, date: selectedDay, time: selectedTime });
    } catch {
      setError(t.generalError);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── CURSOR ── */}
      <div ref={cursorDotRef} className="cursorDot" aria-hidden="true" />
      <div ref={cursorGlowRef} className="cursorGlow" aria-hidden="true" />

      {/* ── NAV ── */}
      <header className={`lxNav${navScrolled ? " scrolled" : ""}`}>
        <nav className="lxNavLinks">
          <Link href="/portfolio">Portfolio</Link>
          <a href="#packages">{t.packageLabel}</a>
          <Link href="/login">{t.clientAreaLink}</Link>
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
          <a href="#planning" className="lxNavCta"><span>Afspraak inplannen</span></a>
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
        <Link href="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
        <a href="#packages" onClick={() => setMobileOpen(false)}>{t.packageLabel}</a>
        <Link href="/login" onClick={() => setMobileOpen(false)}>{t.clientAreaLink}</Link>
        <a href="#planning" onClick={() => setMobileOpen(false)}>Afspraak inplannen</a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="heroOrbs" aria-hidden="true">
          <div className="heroOrb1" />
          <div className="heroOrb2" />
          <div className="heroOrb3" />
        </div>

        <div className="heroContent">
          <div className="heroTag">
            MS Webdesign · Belgische webdesign agency
          </div>
          <h1 className="heroHeadline">
            {t.heroLine1}<br />
            <span className="gradWord">{t.heroAccentWord}</span>
          </h1>
          <p className="heroSub">{t.heroText}</p>
          <div className="heroCtas">
            <Link href="/portfolio" className="btnGrad">
              {t.portfolioBtn} <span>→</span>
            </Link>
            <a href="#planning" className="btnOutline">{t.planningBtn}</a>
          </div>
        </div>

        <div className="heroStats">
          <div className="heroStat">
            <div className="heroStatNum">2 dgn</div>
            <span className="heroStatLabel">Eerste versie</span>
          </div>
          <div className="heroStat">
            <div className="heroStatNum">€29</div>
            <span className="heroStatLabel">Vanaf per maand</span>
          </div>
          <div className="heroStat">
            <div className="heroStatNum">6+</div>
            <span className="heroStatLabel">Projecten opgeleverd</span>
          </div>
          <div className="heroStat">
            <div className="heroStatNum">100%</div>
            <span className="heroStatLabel">Op maat gebouwd</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marqueeStrip" aria-hidden="true">
        <div className="marqueeTrack">
          {[1, 2, 3].map((i) => (
            <span key={i} className="marqueeItem">
              Kapsalon <em>·</em> Elektricien <em>·</em> Verwarming <em>·</em> Vastgoed{" "}
              <em>·</em> Events <em>·</em> Barbershop <em>·</em> Wellness <em>·</em>{" "}
              Bouwbedrijf <em>·</em> Paardensport <em>·</em> Webshop <em>·</em>{" "}
              Zelfstandige <em>·</em> Tandarts <em>·</em>
            </span>
          ))}
        </div>
      </div>

      {/* ── STORY — STICKY SCROLL ── */}
      <section ref={storyRef as React.RefObject<HTMLElement>} className="storyWrap">
        <div className="storySticky">
          <div className="storyBgWrap">
            {STORY_CLAIMS.map((_, i) => (
              <video
                key={i}
                className={`storyBg${storyIdx === i ? " active" : ""}`}
                src={`/story/file${i + 1}.mp4`}
                autoPlay
                muted
                loop
                playsInline
              />
            ))}
          </div>
          {STORY_CLAIMS.map((claim, i) => (
            <div key={i} className={`storyClaim${storyIdx === i ? " active" : ""}`}>
              <p className="storyClaimText">
                <span>{claim.before} </span>
                <em>{claim.accent}</em>
                {claim.after && <><br /><span>{claim.after}</span></>}
              </p>
            </div>
          ))}
          <div className="storyDots">
            {STORY_CLAIMS.map((_, i) => (
              <div key={i} className={`storyDot${storyIdx === i ? " active" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO — HORIZONTAL SCROLL ── */}
      <section ref={portfolioRef as React.RefObject<HTMLElement>} className="portfolioWrap">
        <div className="portfolioSticky">
          <div className="portfolioHead">
            <div>
              <div className="sectionEye">Portfolio</div>
              <h2>Geselecteerde<br />projecten</h2>
            </div>
            <Link href="/portfolio">Volledig portfolio bekijken →</Link>
          </div>
          <div ref={portfolioTrackRef} className="portfolioTrack">
            {PROJECTS.map((p, i) => (
              <a
                key={p.id}
                href={p.url}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                className="pfCard"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  card.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.03)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                }}
              >
                {p.image ? (
                  <div className="pfCardImgWrap">
                    <img src={p.image} alt={p.title} className="pfCardImg" loading="lazy" />
                  </div>
                ) : (
                  <div
                    className="pfCardBg"
                    style={{ background: `radial-gradient(ellipse 120% 120% at 50% 50%, ${p.accent}55, ${p.accent}11 50%, transparent)` }}
                  />
                )}
                <div className="pfCardContent">
                  <div className="pfCardType">{p.type}</div>
                  <div className="pfCardTitle">{p.title}</div>
                  <div className="pfCardTags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="pfCardTag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="pfCardNum">0{i + 1}</div>
                <div className="pfCardLink">↗</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAKKETTEN + ADD-ONS ── */}
      <section id="packages" className="pricingSection">
        <div className="pricingInner">
          <div className="pricingHead reveal">
            <div className="sectionEye">Pakketten</div>
            <h2>Simpel kiezen.<br />Snel online.</h2>
            <p>Één formule, alles inbegrepen. Breid uit met de add-ons die jij nodig hebt.</p>
          </div>

          <div className="packComboGrid">
            {/* ── Main package card ── */}
            <article className="priceCard featured packMain reveal d1">
              <div className="priceFeaturedBadge">Alles inbegrepen</div>
              <div className="priceName">{PACKAGE.name}</div>
              <div className="priceNum">
                <strong>{PACKAGE.price}</strong>
                <span>/maand</span>
              </div>
              <p className="priceDesc">{PACKAGE.note}</p>
              <ul className="priceFeatures">
                {PACKAGE.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a
                href="#planning"
                className="priceCta"
                onClick={() => setSelectedPackage(PACKAGE.name)}
              >
                Afspraak inplannen
              </a>
            </article>

            {/* ── Add-ons ── */}
            <div className="packAddonsCol reveal d2">
              <div className="packAddonsLabel">
                <div className="sectionEye" style={{ marginBottom: 8 }}>Add-ons</div>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
                  Combineer de opties die jij nodig hebt. Geen verborgen kosten.
                </p>
              </div>
              <div className="addonsGrid2col">
                {ADDONS.map((addon) => (
                  <div key={addon.title} className="addonTile">
                    <div className="addonTileIcon">{addon.icon}</div>
                    <h4>{addon.title}</h4>
                    <p>{addon.desc}</p>
                    <div className="addonTilePrice">{addon.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="pricingSection" style={{ background: "var(--bg)" }}>
        <div className="pricingInner">
          <div className="pricingHead reveal">
            <div className="sectionEye">Hoe werkt het</div>
            <h2>Van call tot<br />live website.</h2>
            <p>Een transparant proces zonder verrassingen. Jij vertelt wat je wil — wij bouwen het.</p>
          </div>
          <div className="pricingGrid">
            {[
              { num: "01", title: t.process1Title, text: t.process1Text },
              { num: "02", title: t.process2Title, text: t.process2Text },
              { num: "03", title: t.process3Title, text: t.process3Text },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`priceCard reveal d${i + 1}`}
                style={{ display: "flex", flexDirection: "column", gap: 0 }}
              >
                <div className="priceName">{step.num}</div>
                <h3 style={{ fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 800, letterSpacing: "-.05em", color: "#fff", marginBottom: 14 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, flex: 1 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING / PLANNER ── */}
      <section id="planning" className="bookingSection">
        <div className="bookingInner">
          <div className="bookingLeft reveal-left">
            <div className="sectionEye">{t.plannerLabel}</div>
            <h2>{t.plannerTitle}</h2>
            <p>{t.plannerText}</p>
            <div className="bookingFeatures">
              <div className="bookingFeature">
                <div className="bookingFeatureDot">✓</div>
                Gratis kennismakingsgesprek
              </div>
              <div className="bookingFeature">
                <div className="bookingFeatureDot">✓</div>
                30 minuten via Google Meet
              </div>
              <div className="bookingFeature">
                <div className="bookingFeatureDot">✓</div>
                Geen verplichtingen
              </div>
            </div>
          </div>

          <div className="bookingRight reveal-right">
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
                  <span style={{ opacity: 0.4 }}>·</span>
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
                        className={`${selectedTime === time ? "selected" : ""} ${disabled ? "disabled" : ""}`}
                      >
                        {disabled ? t.occupied : time}
                      </button>
                    );
                  })}
                </div>

                <div className="selectedSlot">
                  <span>{t.selectedMoment}</span>
                  <strong>{selectedDay} {t.at} {selectedTime}</strong>
                </div>

                <button
                  type="button"
                  className="confirmBtn"
                  disabled={loadingSlots || selectedSlotBooked || !selectedDay || !selectedTime}
                  onClick={() => setModalOpen(true)}
                >
                  {t.continue}
                </button>
              </div>
            )}
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
            <Link href="/portfolio">Portfolio</Link>
            <a href="#packages">{t.packageLabel}</a>
            <a href="#planning">Afspraak</a>
            <Link href="/login">{t.clientAreaLink}</Link>
          </nav>
          <div className="lxFooterCopy">© {new Date().getFullYear()} MS Webdesign</div>
        </div>
      </footer>

      {/* ── BOOKING MODAL ── */}
      {modalOpen && (
        <div className="bookingOverlay" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="bookingModal">
            <button className="modalClose" type="button" onClick={() => setModalOpen(false)}>×</button>

            <div className="modalHead">
              <span className="sectionEyeModal">{t.modalTitle}</span>
              <h2>{selectedDay} {t.at} {selectedTime}</h2>
              <p>{t.modalText}</p>
            </div>

            <form onSubmit={submitAppointment}>
              <div className="formGrid">
                <input placeholder={t.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder={t.email} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input placeholder={t.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input placeholder={t.company} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>

              <div className="packageSelectBox">
                <b>{t.choosePackage}</b>
                <div className="modalPackageGrid">
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(PACKAGE.name)}
                    className={`modalPack${selectedPackage === PACKAGE.name ? " selected" : ""}`}
                  >
                    <small>{PACKAGE.note}</small>
                    <h3>{PACKAGE.name}</h3>
                    <div className="modalPriceWrap">
                      <strong>{PACKAGE.price}<em>{t.perMonth}</em></strong>
                    </div>
                    <p>{PACKAGE.desc}</p>
                    <ul>
                      {PACKAGE.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage("")}
                    className={`modalPack unsure${selectedPackage === "" ? " selected" : ""}`}
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
                  <input type="color" value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} />
                  <span>{form.primary_color}</span>
                </label>
                <label>
                  {t.secondaryColor}
                  <input type="color" value={form.secondary_color} onChange={(e) => setForm({ ...form, secondary_color: e.target.value })} />
                  <span>{form.secondary_color}</span>
                </label>
                <label>
                  {t.accentColor}
                  <input type="color" value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} />
                  <span>{form.accent_color}</span>
                </label>
              </div>

              <textarea
                placeholder={t.description}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                <button type="button" onClick={addLink}>{t.addLink}</button>
              </div>

              <label className="checkLine">
                <input
                  type="checkbox"
                  checked={form.discuss_in_call}
                  onChange={(e) => setForm({ ...form, discuss_in_call: e.target.checked })}
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
    </>
  );
}
