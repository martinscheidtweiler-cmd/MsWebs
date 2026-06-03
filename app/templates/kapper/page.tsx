"use client";

import { useState, useEffect } from "react";
import "./kapper.css";

const services = [
  {
    nr: "01",
    title: "Cut & Styling",
    price: "vanaf €58",
    text: "Persoonlijke coupe, brushing en afwerking op maat van je gezicht, haartype en dagelijkse routine.",
  },
  {
    nr: "02",
    title: "Balayage & Color",
    price: "vanaf €145",
    text: "Zachte kleurovergangen, glossing en kleurcorrecties met premium Kérastase producten.",
  },
  {
    nr: "03",
    title: "Bridal & Event",
    price: "op aanvraag",
    text: "Elegante styling voor huwelijken, shoots, events en speciale momenten. Inclusief oefenafspraak.",
  },
  {
    nr: "04",
    title: "Keratine Treatment",
    price: "vanaf €185",
    text: "Intensieve smoothing behandeling voor glanzend, pluisvrij haar met langdurig resultaat.",
  },
  {
    nr: "05",
    title: "Kleuradvies",
    price: "gratis intake",
    text: "Een uitgebreide 30 min intake voor kleur- en kapseladvies op maat. Geen verplichtingen.",
  },
  {
    nr: "06",
    title: "Highlights",
    price: "vanaf €118",
    text: "Klassieke of moderne highlights met folie of vrije hand. Altijd op maat van jouw huidskleur.",
  },
];

const reviews = [
  {
    name: "Sophie D.",
    stars: 5,
    text: "Mijn balayage is exact zoals ik wou: natuurlijk, zacht en luxueus. Ik kom nergens anders meer naartoe.",
  },
  {
    name: "Laura M.",
    stars: 5,
    text: "Prachtig salon, rustige sfeer en echt advies op maat. Ze heeft mijn haar volledig getransformeerd.",
  },
  {
    name: "Elise V.",
    stars: 5,
    text: "Eindelijk een kapsalon waar alles klopt: ontvangst, kleur, styling en afwerking. Absoluut de beste.",
  },
  {
    name: "Nathalie B.",
    stars: 5,
    text: "Mijn bridal styling was perfect. Iedereen op het feest vroeg naar mijn kapper. Dankjewel Maison Élise.",
  },
];

const team = [
  {
    name: "Elise Vandenberghe",
    role: "Oprichtster & Senior Stylist",
    focus: "Kleur, balayage, bridal",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Charlotte Maes",
    role: "Colorist & Stylist",
    focus: "Highlights, glossing, cut",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Yasmine El Idrissi",
    role: "Specialist Behandelingen",
    focus: "Keratine, verzorging, event",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
  },
];

const process = [
  ["01", "Intake & analyse", "We starten met een persoonlijk gesprek over je haar, je wensen en je dagelijkse routine."],
  ["02", "Kleur & behandeling", "Vakkundig aangebracht met premium producten en oog voor elk detail."],
  ["03", "Styling & finishing", "Je haar wordt gestyled zoals jij het thuis wil dragen — realistisch en mooi."],
  ["04", "Thuiszorgadvies", "Je vertrekt met de juiste producten en tips om je look thuis te onderhouden."],
];

const prices = [
  ["Cut & brushing", "€58"],
  ["Glossing treatment", "€72"],
  ["Highlights", "vanaf €118"],
  ["Balayage", "vanaf €145"],
  ["Keratine treatment", "vanaf €185"],
  ["Bridal & event", "op aanvraag"],
  ["Kleuradvies intake", "gratis"],
  ["Kleurcorrectie", "op aanvraag"],
];

export default function KapperTemplatePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* ── Nav ── */}
      <header className={`kNav${scrolled ? " kNavScrolled" : ""}`}>
        <a href="#home" className="kNavLogo">Maison Élise</a>
        <nav className="kNavLinks">
          <a href="#services">Diensten</a>
          <a href="#team">Team</a>
          <a href="#prices">Prijzen</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact" className="kNavCta">Afspraak</a>
        </nav>
        <button
          className={`kHamburger${mobileOpen ? " open" : ""}`}
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile nav */}
      <nav className={`kMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#services" onClick={() => setMobileOpen(false)}>Diensten</a>
        <a href="#team" onClick={() => setMobileOpen(false)}>Team</a>
        <a href="#prices" onClick={() => setMobileOpen(false)}>Prijzen</a>
        <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
        <a href="#contact" className="kMobileNavCta" onClick={() => setMobileOpen(false)}>Afspraak maken</a>
      </nav>

      {/* ── Hero ── */}
      <section className="kHero" id="home">
        <div className="kHeroLeft">
          <p className="kHeroEyebrow">Luxury hair studio · Antwerpen</p>
          <h1 className="kHeroTitle">
            Haar dat <em>rust,<br />klasse</em> en<br />karakter ademt.
          </h1>
          <p className="kHeroText">
            Maison Élise is een high-end kapsalon voor vrouwen die houden van
            natuurlijke kleuren, zachte luxe en een verzorgde afwerking —
            van intake tot afwerking.
          </p>
          <div className="kHeroActions">
            <a href="#contact" className="kHeroPrimary">Maak afspraak</a>
            <a href="#services" className="kHeroSecondary">Bekijk diensten</a>
          </div>
        </div>
        <div className="kHeroRight">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
            alt="Maison Élise hair studio"
          />
          <div className="kHeroCard">
            <strong>4.9 / 5</strong>
            <span>Gebaseerd op 120+ klanten</span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="kStats">
        <div className="kStatItem">
          <span className="kStatValue">120+</span>
          <span className="kStatLabel">Tevreden klanten</span>
        </div>
        <div className="kStatItem">
          <span className="kStatValue">4.9★</span>
          <span className="kStatLabel">Gemiddelde score</span>
        </div>
        <div className="kStatItem">
          <span className="kStatValue">8 jr</span>
          <span className="kStatLabel">Ervaring</span>
        </div>
        <div className="kStatItem">
          <span className="kStatValue">100%</span>
          <span className="kStatLabel">Biologische kleuren</span>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="kSection" id="services">
        <div className="kSectionHead">
          <p className="kEyebrow">Onze specialisaties</p>
          <h2>Subtiele luxe voor<br /><em>elk kapsel.</em></h2>
        </div>
        <div className="kServiceList">
          {services.map((s) => (
            <div className="kServiceRow" key={s.nr}>
              <span className="kServiceNr">{s.nr}</span>
              <div className="kServiceBody">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <span className="kServicePrice">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <div className="kProcessWrap">
        <div className="kProcessInner">
          <div className="kSectionHead">
            <p className="kEyebrow">Hoe we werken</p>
            <h2>Van intake<br /><em>tot afwerking.</em></h2>
          </div>
          <div className="kProcessGrid">
            {process.map(([nr, title, text]) => (
              <div className="kProcessStep" key={nr}>
                <span className="kProcessNr">{nr}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Split about ── */}
      <div className="kSplit" id="about">
        <div className="kSplitText">
          <p className="kEyebrow">Het salon</p>
          <h2>Een rustige plek waar elk<br /><em>detail telt.</em></h2>
          <p>
            Van intake tot afwerking nemen we de tijd voor jouw haar.
            We bekijken haartype, gezichtsvorm, kleurgeschiedenis en dagelijkse
            routine. Zo krijg je geen trend, maar een stijl die echt bij jou past.
          </p>
          <div className="kChecks">
            <span>Persoonlijk kleuradvies</span>
            <span>Premium Kérastase producten</span>
            <span>Rustige privé-sfeer</span>
            <span>Één klant per moment</span>
          </div>
        </div>
        <div className="kSplitImg">
          <img
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=80"
            alt="Interieur Maison Élise"
          />
        </div>
      </div>

      {/* ── Team ── */}
      <section className="kSection" id="team" style={{ paddingBottom: 0 }}>
        <div className="kSectionHead center">
          <p className="kEyebrow">Het team</p>
          <h2>Vakvrouwen met<br /><em>passie voor haar.</em></h2>
        </div>
      </section>
      <div className="kTeamGrid">
        {team.map(({ name, role, focus, image }) => (
          <div className="kTeamCard" key={name}>
            <img src={image} alt={name} loading="lazy" />
            <div className="kTeamOverlay">
              <h3>{name}</h3>
              <strong>{role}</strong>
              <p>{focus}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Gallery ── */}
      <div className="kGalleryWrap">
        <div className="kGalleryHead">
          <span>Lookbook</span>
          <h2>Onze stijl in beeld.</h2>
        </div>
        <div className="kGallery">
          <img
            src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80"
            alt="Balayage resultaat"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80"
            alt="Salon interieur"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80"
            alt="Kleurbehandeling detail"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Prices ── */}
      <div className="kPricesWrap" id="prices">
        <div className="kPricesInner">
          <div className="kSectionHead center">
            <p className="kEyebrow">Prijzen</p>
            <h2>Transparant<br /><em>en duidelijk.</em></h2>
          </div>
          <div className="kPriceList">
            {prices.map(([label, price]) => (
              <div className="kPriceRow" key={label}>
                <span>{label}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <div className="kReviewsWrap" id="reviews">
        <div className="kSectionHead center">
          <p className="kEyebrow">Reviews</p>
          <h2>Klanten komen terug voor het<br /><em>gevoel én het resultaat.</em></h2>
        </div>
        <div className="kReviewGrid">
          {reviews.map((r) => (
            <div className="kReviewCard" key={r.name}>
              <div className="kQuote">&ldquo;</div>
              <div className="kReviewStars">{"★".repeat(r.stars)}</div>
              <p className="kReviewText">{r.text}</p>
              <p className="kReviewName">{r.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact ── */}
      <section className="kContact" id="contact">
        <div className="kContactLeft">
          <p className="kEyebrow">Afspraak maken</p>
          <h2>Klaar voor haar dat echt<br /><em>bij jou past?</em></h2>
          <p>
            Boek je afspraak online of neem contact op voor kleuradvies,
            bridal styling of een eerste intake. Het eerste kleuradvies is gratis.
          </p>
        </div>
        <div className="kContactRight">
          <div className="kContactLinks">
            <a href="tel:+3230000000" className="kContactLink">
              Bel ons <span>→</span>
            </a>
            <a href="mailto:hello@maisonelise.be" className="kContactLink">
              Mail het salon <span>→</span>
            </a>
            <a href="https://wa.me/32470000000" target="_blank" rel="noreferrer" className="kContactLink">
              WhatsApp <span>→</span>
            </a>
          </div>
          <div className="kContactInfo">
            <strong>Maison Élise Hair Studio</strong>
            <span>Komedieplaats 8, 2000 Antwerpen</span>
            <span>Dinsdag – Zaterdag: 09:00 – 18:00</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="kFooter">
        <span className="kFooterLogo">Maison Élise</span>
        <span className="kFooterSub">Luxury hair studio · Antwerpen</span>
      </footer>
    </main>
  );
}
