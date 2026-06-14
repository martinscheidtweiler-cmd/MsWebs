"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "./globals.css";
import { ADDONS } from "./lib/addons-data";

type Lang = "nl" | "fr" | "en";

const times = [
  "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "18:00", "18:30",
];

const translations = {
  nl: {
    heroLine1: "Een website die",
    heroAccentWord: "nieuwe klanten oplevert.",
    heroText: "Professioneel, snel en goed vindbaar in Google. Wij bouwen een website die écht werkt voor jouw zaak — online binnen 2 werkdagen, vanaf €29,99/maand.",
    portfolioBtn: "Bekijk portfolio",
    planningBtn: "Afspraak inplannen",
    heroStat1Num: "2 dgn",
    heroStat1Label: "Eerste versie",
    heroStat2Num: "€29",
    heroStat2Label: "Vanaf per maand",
    heroStat3Num: "156",
    heroStat3Label: "Projecten opgeleverd",
    heroStat4Num: "100%",
    heroStat4Label: "Op maat gebouwd",
    marqueeItems: "Kapsalon · Elektricien · Verwarming · Vastgoed · Events · Barbershop · Wellness · Bouwbedrijf · Paardensport · Webshop · Zelfstandige · Tandarts",
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
    websiteLinkLabel: "Website link",
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
    pakketLink: "Pakket & add-ons",
    storyEye: "Reviews",
    storyHeadingL1: "Wat klanten",
    storyHeadingL2: "over ons zeggen",
    portfolioHeadingL1: "Geselecteerde",
    portfolioHeadingL2: "projecten",
    portfolioViewAll: "Volledig portfolio bekijken →",
    pricingHeadingL1: "Eén pakket.",
    pricingHeadingL2: "Alles wat je nodig hebt.",
    pricingSub: "Geen verborgen kosten, geen ingewikkelde keuzes. Eén heldere prijs voor een website die voor jou werkt — vul aan met de add-ons die jouw zaak nodig heeft.",
    packageName: "Website Essential",
    packagePrice: "€29,99",
    packageNote: "Geen setup kosten · Premium service voor iedereen",
    packageDesc: "Eén vast bedrag per maand. Jouw website altijd online, veilig en up-to-date — zonder dat je er zelf naar moet omkijken.",
    packageFeatures: [
      "Volledig op maat ontwerp",
      "Mobielvriendelijk & snel geladen",
      "Hosting, SSL & domein inbegrepen",
      "30 min/mnd aanpassingen",
      "Basis SEO-optimalisatie",
      "Online binnen 2 werkdagen",
      "Premium onderhoud & voorrang bij support",
    ],
    addonsEye: "Add-ons",
    addonsSub: "Combineer de opties die jij nodig hebt. Geen verborgen kosten.",
    addonPerMonth: "/mnd",
    viewAllAddons: "Bekijk alle add-ons →",
    howEye: "Hoe werkt het",
    howHeadingL1: "Van call tot",
    howHeadingL2: "live website.",
    howSub: "Een transparant proces zonder verrassingen. Jij vertelt wat je wil — wij bouwen het.",
    bookingFeature1: "Gratis kennismakingsgesprek",
    bookingFeature2: "30 minuten via Google Meet",
    bookingFeature3: "Geen verplichtingen",
    successTitle: "Afspraak aangevraagd! ✨",
    successConfirm: "Een bevestiging wordt verstuurd naar",
    newBooking: "+ Nieuwe afspraak maken",
    footerTagline: "Professionele websites die nieuwe klanten opleveren voor zelfstandigen en KMO's.",
    footerAppointment: "Afspraak",
  },
  fr: {
    heroLine1: "Un site qui",
    heroAccentWord: "attire de nouveaux clients.",
    heroText: "Professionnel, rapide et bien visible sur Google. Nous créons un site qui fonctionne vraiment pour votre activité — en ligne en 2 jours ouvrables, à partir de 29,99€/mois.",
    portfolioBtn: "Voir le portfolio",
    planningBtn: "Prendre rendez-vous",
    heroStat1Num: "2 j",
    heroStat1Label: "Première version",
    heroStat2Num: "29€",
    heroStat2Label: "À partir de par mois",
    heroStat3Num: "156",
    heroStat3Label: "Projets livrés",
    heroStat4Num: "100%",
    heroStat4Label: "Sur mesure",
    marqueeItems: "Salon de coiffure · Électricien · Chauffage · Immobilier · Événements · Barbershop · Bien-être · Construction · Sport équestre · Boutique en ligne · Indépendant · Dentiste",
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
    websiteLinkLabel: "Lien du site",
    discussCall: "Je préfère en discuter pendant l'appel",
    submit: "Demander le rendez-vous",
    sending: "Envoi...",
    requiredError: "Remplissez au moins votre nom et e-mail.",
    bookedError: "Ce créneau est déjà réservé.",
    generalError: "Une erreur est survenue. Ce créneau vient peut-être d'être réservé.",
    perMonth: "/mois",
    clientAreaLink: "Espace client",
    portfolio: "Portfolio",
    pakketLink: "Formule & add-ons",
    packageLabel: "Formules",
    storyEye: "Avis",
    storyHeadingL1: "Ce que disent",
    storyHeadingL2: "nos clients",
    portfolioHeadingL1: "Projets",
    portfolioHeadingL2: "sélectionnés",
    portfolioViewAll: "Voir tout le portfolio →",
    pricingHeadingL1: "Une formule.",
    pricingHeadingL2: "Tout ce dont vous avez besoin.",
    pricingSub: "Pas de frais cachés, pas de choix compliqués. Un prix clair pour un site qui fonctionne pour vous — complétez avec les add-ons dont votre activité a besoin.",
    packageName: "Website Essential",
    packagePrice: "29,99€",
    packageNote: "Pas de frais de mise en service · Service premium pour tous",
    packageDesc: "Un montant fixe par mois. Votre site toujours en ligne, sécurisé et à jour — sans que vous ayez à vous en soucier.",
    packageFeatures: [
      "Design entièrement sur mesure",
      "Compatible mobile & chargement rapide",
      "Hébergement, SSL & domaine inclus",
      "30 min/mois de modifications",
      "Optimisation SEO de base",
      "En ligne en 2 jours ouvrables",
      "Maintenance premium & support prioritaire",
    ],
    addonsEye: "Add-ons",
    addonsSub: "Combinez les options dont vous avez besoin. Pas de frais cachés.",
    addonPerMonth: "/mois",
    viewAllAddons: "Voir tous les add-ons →",
    howEye: "Comment ça fonctionne",
    howHeadingL1: "De l'appel au",
    howHeadingL2: "site en ligne.",
    howSub: "Un processus transparent, sans surprises. Vous nous dites ce que vous voulez — nous le construisons.",
    bookingFeature1: "Premier appel gratuit",
    bookingFeature2: "30 minutes via Google Meet",
    bookingFeature3: "Sans engagement",
    successTitle: "Rendez-vous demandé ! ✨",
    successConfirm: "Une confirmation sera envoyée à",
    newBooking: "+ Prendre un nouveau rendez-vous",
    footerTagline: "Des sites web professionnels qui génèrent de nouveaux clients pour indépendants et PME.",
    footerAppointment: "Rendez-vous",
  },
  en: {
    heroLine1: "A website that",
    heroAccentWord: "brings in new customers.",
    heroText: "Professional, fast and easy to find on Google. We build a website that actually works for your business — live within 2 business days, starting at €29.99/month.",
    portfolioBtn: "View portfolio",
    planningBtn: "Book a call",
    heroStat1Num: "2 days",
    heroStat1Label: "First version",
    heroStat2Num: "€29",
    heroStat2Label: "Starting per month",
    heroStat3Num: "156",
    heroStat3Label: "Projects delivered",
    heroStat4Num: "100%",
    heroStat4Label: "Custom built",
    marqueeItems: "Hair Salon · Electrician · Heating · Real Estate · Events · Barbershop · Wellness · Construction · Equestrian · Webshop · Freelancer · Dentist",
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
    websiteLinkLabel: "Website link",
    discussCall: "I prefer to discuss this during the call",
    submit: "Request appointment",
    sending: "Sending...",
    requiredError: "Please fill in at least your name and email.",
    bookedError: "This time slot is already booked.",
    generalError: "Something went wrong. This slot may have just been booked.",
    perMonth: "/month",
    clientAreaLink: "Client area",
    portfolio: "Portfolio",
    pakketLink: "Package & add-ons",
    packageLabel: "Packages",
    storyEye: "Reviews",
    storyHeadingL1: "What clients",
    storyHeadingL2: "say about us",
    portfolioHeadingL1: "Selected",
    portfolioHeadingL2: "projects",
    portfolioViewAll: "View full portfolio →",
    pricingHeadingL1: "One package.",
    pricingHeadingL2: "Everything you need.",
    pricingSub: "No hidden costs, no complicated choices. One clear price for a website that works for you — add the extras your business needs.",
    packageName: "Website Essential",
    packagePrice: "€29.99",
    packageNote: "No setup fees · Premium service for everyone",
    packageDesc: "One fixed amount per month. Your website always online, secure and up to date — without you having to worry about it.",
    packageFeatures: [
      "Fully custom design",
      "Mobile-friendly & fast loading",
      "Hosting, SSL & domain included",
      "30 min/month of edits",
      "Basic SEO optimisation",
      "Live within 2 business days",
      "Premium maintenance & priority support",
    ],
    addonsEye: "Add-ons",
    addonsSub: "Combine the options your business needs. No hidden costs.",
    addonPerMonth: "/mo",
    viewAllAddons: "View all add-ons →",
    howEye: "How it works",
    howHeadingL1: "From call to",
    howHeadingL2: "live website.",
    howSub: "A transparent process with no surprises. You tell us what you want — we build it.",
    bookingFeature1: "Free intro call",
    bookingFeature2: "30 minutes via Google Meet",
    bookingFeature3: "No commitment",
    successTitle: "Appointment requested! ✨",
    successConfirm: "A confirmation will be sent to",
    newBooking: "+ Book a new appointment",
    footerTagline: "Professional websites that bring new customers to freelancers and SMEs.",
    footerAppointment: "Appointment",
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

const STORY_TESTIMONIALS: Record<Lang, { quote: string; author: string }[]> = {
  nl: [
    {
      quote: "Binnen 2 dagen al een eerste versie, en het eindresultaat overtrof onze verwachtingen volledig. Eindelijk een website waar we trots op zijn!",
      author: "Kapsalon, Antwerpen",
    },
    {
      quote: "Sinds onze nieuwe website krijgen we wekelijks nieuwe aanvragen via Google. Top communicatie en alles werd perfect afgehandeld.",
      author: "Vastgoedkantoor, Limburg",
    },
    {
      quote: "Snel, professioneel en altijd bereikbaar voor aanpassingen. Onze klanten vinden de nieuwe site prachtig — aanrader voor elke zelfstandige!",
      author: "Verwarmingsbedrijf, Mechelen",
    },
  ],
  fr: [
    {
      quote: "Dès le 2e jour, une première version était prête, et le résultat final a totalement dépassé nos attentes. Enfin un site dont nous sommes fiers !",
      author: "Salon de coiffure, Anvers",
    },
    {
      quote: "Depuis notre nouveau site, nous recevons chaque semaine de nouvelles demandes via Google. Communication impeccable et tout a été parfaitement géré.",
      author: "Agence immobilière, Limbourg",
    },
    {
      quote: "Rapide, professionnel et toujours disponible pour les ajustements. Nos clients adorent le nouveau site — à recommander à tout indépendant !",
      author: "Entreprise de chauffage, Malines",
    },
  ],
  en: [
    {
      quote: "Within 2 days we already had a first version, and the end result completely exceeded our expectations. Finally a website we're proud of!",
      author: "Hair salon, Antwerp",
    },
    {
      quote: "Since our new website went live, we get new inquiries through Google every week. Great communication and everything was handled perfectly.",
      author: "Real estate agency, Limburg",
    },
    {
      quote: "Fast, professional and always available for adjustments. Our customers love the new site — highly recommended for any business owner!",
      author: "Heating company, Mechelen",
    },
  ],
};

const STORY_SLIDE_COUNT = 3;

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
  const storyTestimonials = STORY_TESTIMONIALS[lang];
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

  // Story carousel — auto-rotate, paused while user hovers
  const [storyPaused, setStoryPaused] = useState(false);
  useEffect(() => {
    if (storyPaused) return;
    const timer = setInterval(() => {
      setStoryIdx((i) => (i + 1) % STORY_SLIDE_COUNT);
    }, 6000);
    return () => clearInterval(timer);
  }, [storyPaused]);

  const storyPrev = () => setStoryIdx((i) => (i - 1 + STORY_SLIDE_COUNT) % STORY_SLIDE_COUNT);
  const storyNext = () => setStoryIdx((i) => (i + 1) % STORY_SLIDE_COUNT);

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
          <Link href="/portfolio">{t.portfolio}</Link>
          <Link href="/pakket">{t.pakketLink}</Link>
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
          <a href="#planning" className="lxNavCta"><span>{t.planningBtn}</span></a>
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
        <Link href="/portfolio" onClick={() => setMobileOpen(false)}>{t.portfolio}</Link>
        <Link href="/pakket" onClick={() => setMobileOpen(false)}>{t.pakketLink}</Link>
        <Link href="/login" onClick={() => setMobileOpen(false)}>{t.clientAreaLink}</Link>
        <a href="#planning" onClick={() => setMobileOpen(false)}>{t.planningBtn}</a>
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
            MS Webdesign · Webdesign voor zelfstandigen &amp; KMO&apos;s
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
            <div className="heroStatNum">{t.heroStat1Num}</div>
            <span className="heroStatLabel">{t.heroStat1Label}</span>
          </div>
          <div className="heroStat">
            <div className="heroStatNum">{t.heroStat2Num}</div>
            <span className="heroStatLabel">{t.heroStat2Label}</span>
          </div>
          <div className="heroStat">
            <div className="heroStatNum">{t.heroStat3Num}</div>
            <span className="heroStatLabel">{t.heroStat3Label}</span>
          </div>
          <div className="heroStat">
            <div className="heroStatNum">{t.heroStat4Num}</div>
            <span className="heroStatLabel">{t.heroStat4Label}</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marqueeStrip" aria-hidden="true">
        <div className="marqueeTrack">
          {[1, 2, 3].map((i) => (
            <span key={i} className="marqueeItem">
              {t.marqueeItems.split(" · ").map((item, idx) => (
                <Fragment key={idx}>
                  {item} <em>·</em>{" "}
                </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── REVIEWS — COMPACT CAROUSEL ── */}
      <section className="storyWrap">
        <div className="storyInner">
          <div className="storyHead reveal">
            <div className="sectionEye">{t.storyEye}</div>
            <h2>{t.storyHeadingL1}<br />{t.storyHeadingL2}</h2>
          </div>
          <div
            className="storyCarousel reveal"
            onMouseEnter={() => setStoryPaused(true)}
            onMouseLeave={() => setStoryPaused(false)}
          >
            <button className="storyArrow storyArrowPrev" onClick={storyPrev} aria-label="Previous">‹</button>
            <div className="storyCard">
              <div className="storyCardMedia">
                {storyTestimonials.map((_, i) => (
                  <video
                    key={i}
                    className={`storyCardVideo${storyIdx === i ? " active" : ""}`}
                    src={`/story/file${i + 1}.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ))}
              </div>
              <div className="storyCardContent">
                {storyTestimonials.map((item, i) => (
                  <div key={i} className={`storyCardText${storyIdx === i ? " active" : ""}`}>
                    <p className="storyCardQuote">&ldquo;{item.quote}&rdquo;</p>
                    <p className="storyCardAuthor">— {item.author}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="storyArrow storyArrowNext" onClick={storyNext} aria-label="Next">›</button>
          </div>
          <div className="storyDots">
            {storyTestimonials.map((_, i) => (
              <button
                key={i}
                className={`storyDot${storyIdx === i ? " active" : ""}`}
                onClick={() => setStoryIdx(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO — HORIZONTAL SCROLL ── */}
      <section ref={portfolioRef as React.RefObject<HTMLElement>} className="portfolioWrap">
        <div className="portfolioSticky">
          <div className="portfolioHead">
            <div>
              <div className="sectionEye">{t.portfolio}</div>
              <h2>{t.portfolioHeadingL1}<br />{t.portfolioHeadingL2}</h2>
            </div>
            <Link href="/portfolio">{t.portfolioViewAll}</Link>
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
            <div className="sectionEye">{t.packageLabel}</div>
            <h2>{t.pricingHeadingL1}<br />{t.pricingHeadingL2}</h2>
            <p>{t.pricingSub}</p>
          </div>

          <div className="packComboGrid">
            {/* ── Main package card ── */}
            <article className="priceCard featured packMain reveal d1">
              <div className="priceName">{t.packageName}</div>
              <div className="priceNum">
                <strong>{t.packagePrice}</strong>
                <span>{t.perMonth}</span>
              </div>
              <p className="priceDesc">{t.packageNote}</p>
              <ul className="priceFeatures">
                {t.packageFeatures.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a
                href="#planning"
                className="priceCta"
                onClick={() => setSelectedPackage(t.packageName)}
              >
                {t.planningBtn}
              </a>
            </article>

            {/* ── Add-ons ── */}
            <div className="packAddonsCol reveal d2">
              <div className="packAddonsLabel">
                <div className="sectionEye" style={{ marginBottom: 8 }}>{t.addonsEye}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
                  {t.addonsSub}
                </p>
              </div>
              <div className="addonsGrid2col">
                {ADDONS[lang].slice(0, 3).map((addon, i) => (
                  <div key={i} className="addonTile">
                    <div className="addonTileIcon">{addon.icon}</div>
                    <h4>{addon.title}</h4>
                    <p>{addon.tagline}</p>
                    <div className="addonTilePrice">{addon.price}{t.addonPerMonth}</div>
                  </div>
                ))}
              </div>
              <Link href="/pakket" className="addonsViewAll">
                {t.viewAllAddons}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="pricingSection" style={{ background: "var(--bg)" }}>
        <div className="pricingInner">
          <div className="pricingHead reveal">
            <div className="sectionEye">{t.howEye}</div>
            <h2>{t.howHeadingL1}<br />{t.howHeadingL2}</h2>
            <p>{t.howSub}</p>
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
                {t.bookingFeature1}
              </div>
              <div className="bookingFeature">
                <div className="bookingFeatureDot">✓</div>
                {t.bookingFeature2}
              </div>
              <div className="bookingFeature">
                <div className="bookingFeatureDot">✓</div>
                {t.bookingFeature3}
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
                <h3>{t.successTitle}</h3>
                <div className="successSlot">
                  📅 <strong>{bookingSuccess.date}</strong>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <strong>{bookingSuccess.time}</strong>
                </div>
                <p>
                  {t.successConfirm}<br />
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
                  {t.newBooking}
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
            <p>{t.footerTagline}</p>
          </div>
          <nav className="lxFooterNav">
            <Link href="/portfolio">{t.portfolio}</Link>
            <a href="#packages">{t.packageLabel}</a>
            <a href="#planning">{t.footerAppointment}</a>
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
                    onClick={() => setSelectedPackage(t.packageName)}
                    className={`modalPack${selectedPackage === t.packageName ? " selected" : ""}`}
                  >
                    <small>{t.packageNote}</small>
                    <h3>{t.packageName}</h3>
                    <div className="modalPriceWrap">
                      <strong>{t.packagePrice}<em>{t.perMonth}</em></strong>
                    </div>
                    <p>{t.packageDesc}</p>
                    <ul>
                      {t.packageFeatures.slice(0, 3).map((f) => <li key={f}>{f}</li>)}
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
                    placeholder={`${t.websiteLinkLabel} ${index + 1}`}
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
