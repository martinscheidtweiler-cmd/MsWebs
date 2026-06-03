"use client";
import { useEffect, useRef, useState } from "react";
import "./fade-club.css";

const services = [
  { nr: "01", name: "Fade & Cut", price: "vanaf €22", desc: "De klassieke fade op maat — skin, low, mid of high. Strak afgewerkt met scheermes." },
  { nr: "02", name: "Baard & Trim", price: "vanaf €16", desc: "Volledige baardverzorging: scheerbeurt, contouring en hot towel finish. Old school barbershop gevoel." },
  { nr: "03", name: "Cut & Beard Combo", price: "vanaf €35", desc: "De complete behandeling: knip + baard in één sessie. Onze populairste service." },
  { nr: "04", name: "Kids Cut", price: "vanaf €14", desc: "Relaxte sfeer voor de kleintjes. Snel, vriendelijk en zonder stress." },
  { nr: "05", name: "Hot Towel Shave", price: "vanaf €28", desc: "Traditionele natte scheerbeurt met warm handdoek, scheercreme en scheermesfinish." },
  { nr: "06", name: "Styling & Design", price: "op aanvraag", desc: "Lijnen, designs of custom patronen. Laat ons weten wat je in je hoofd hebt." },
];

const barbers = [
  { name: "Jason V.", role: "Senior Barber", spec: "Fades · Skin fades · Designs", img: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=600&q=80" },
  { name: "Dre M.", role: "Head Barber", spec: "Klassieke cuts · Scheerbeurt · Baard", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Kobe L.", role: "Junior Barber", spec: "Fade · Kids · Styling", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80" },
];

const priceGroups = [
  {
    group: "Heren",
    items: [
      { name: "Classic Cut", price: "€22" },
      { name: "Fade Cut", price: "€26" },
      { name: "Skin Fade", price: "€28" },
      { name: "Cut + Styling", price: "€30", note: "incl. wax" },
    ],
  },
  {
    group: "Baard",
    items: [
      { name: "Baard trim", price: "€16" },
      { name: "Baard shaping", price: "€20" },
      { name: "Hot towel shave", price: "€28" },
    ],
  },
  {
    group: "Combo",
    items: [
      { name: "Cut + Baard", price: "€35" },
      { name: "Fade + Baard", price: "€40" },
      { name: "Fade + Hot towel", price: "€48" },
    ],
  },
  {
    group: "Overige",
    items: [
      { name: "Kids (t/m 12 jaar)", price: "€14" },
      { name: "Design / Lijnen", price: "op aanvraag" },
    ],
  },
];

const galleryImgs = [
  { cls: "fcGi1", src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80", alt: "Fade" },
  { cls: "fcGi2", src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80", alt: "Barber" },
  { cls: "fcGi3", src: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=800&q=80", alt: "Cut" },
  { cls: "fcGi4", src: "https://images.unsplash.com/photo-1634301986110-e1b2e51f5ca9?auto=format&fit=crop&w=800&q=80", alt: "Styling" },
  { cls: "fcGi5", src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a176?auto=format&fit=crop&w=900&q=80", alt: "Barbershop" },
  { cls: "fcGi6", src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80", alt: "Beard" },
];

const reviews = [
  { text: "Beste barbershop van de regio. Jason geeft elke keer weer een strakke fade zonder dat ik veel moet uitleggen. Ga nergens anders meer naartoe.", author: "Kevin B.", meta: "Vaste klant · Fade + Baard" },
  { text: "Eindelijk een zaak waar ze weten wat ze doen. Professionele sfeer, goede muziek en ze nemen de tijd. Hot towel shave was een openbaring.", author: "Sander D.", meta: "Klant · Hot Towel Shave" },
  { text: "Mijn zoontje was doodsbang voor de kapper. Kobe was zo geduldig en maakte er een feestje van. Hij gaat nu vrijwillig!", author: "Fatima A.", meta: "Mama van Amine (8) · Kids Cut" },
];

const hours = [
  { day: "Maandag", time: "10:00 – 18:00" },
  { day: "Dinsdag", time: "10:00 – 18:00" },
  { day: "Woensdag", time: "10:00 – 19:00" },
  { day: "Donderdag", time: "10:00 – 19:00" },
  { day: "Vrijdag", time: "10:00 – 19:00" },
  { day: "Zaterdag", time: "09:00 – 17:00" },
  { day: "Zondag", time: "Gesloten", closed: true },
];

const tickerItems = ["HAIRCUT", "FADE", "BAARD", "HOT TOWEL", "SKIN FADE", "KIDS CUT", "STYLING", "DESIGN"];

export default function FadeClubPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.16}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).dataset.visible = "1"; }),
      { threshold: 0.07 }
    );
    document.querySelectorAll("[data-anim]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    ["#diensten", "Diensten"],
    ["#barbers", "Barbers"],
    ["#prijzen", "Prijzen"],
    ["#gallerij", "Gallerij"],
    ["#contact", "Contact"],
  ];

  return (
    <>
      {/* NAV */}
      <nav className={`fcNav${scrolled ? " fcNavScrolled" : ""}`}>
        <span className="fcNavLogo">FADE <em>CLUB</em></span>
        <div className="fcNavLinks">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="fcNavRight">
          <span className="fcNavTel">+32 3 123 45 67</span>
          <a href="#contact" className="fcNavCta">BOEK NU</a>
        </div>
        <button
          className={`fcHamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fcMobileNav${menuOpen ? " open" : ""}`}>
        {navLinks.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)} style={{ color: "var(--yellow)" }}>BOEK NU</a>
      </div>

      {/* HERO */}
      <section className="fcHero">
        <div className="fcHeroBg" ref={heroBgRef} />
        <div className="fcHeroContent">
          <span className="fcHeroEyebrow">Antwerpen · Barbershop &amp; Grooming</span>
          <h1 className="fcHeroTitle">
            FADE<br />
            <span>CLUB</span>
          </h1>
          <div className="fcHeroRow">
            <p className="fcHeroSub">
              Precisie fades, klassieke scheerbeurt en strakke afwerking. Geen fratsen — gewoon het beste ambacht.
            </p>
            <div className="fcHeroActions">
              <a href="#contact" className="fcHeroPrimary">BOEK AFSPRAAK</a>
              <a href="#prijzen" className="fcHeroSecondary">PRIJZEN</a>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="fcTicker">
        <div className="fcTickerTrack">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="fcTickerItem">
              {item} <span className="fcTickerDot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="fcSection fcServices" id="diensten">
        <div className="fcServicesHead" data-anim="">
          <div>
            <span className="fcSectionEyebrow">Wat wij doen</span>
            <h2 className="fcSectionTitle">Diensten</h2>
          </div>
        </div>
        <div className="fcServicesGrid">
          {services.map((s, i) => (
            <div key={s.nr} className="fcServiceCard" data-anim="" data-delay={String((i % 3) + 1)}>
              <span className="fcServiceNr">{s.nr}</span>
              <h3 className="fcServiceName">{s.name}</h3>
              <p className="fcServiceDesc">{s.desc}</p>
              <span className="fcServicePrice">{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BARBERS */}
      <section className="fcSection fcBarbers" id="barbers">
        <div data-anim="">
          <span className="fcSectionEyebrow">Ons team</span>
          <h2 className="fcSectionTitle">De Barbers</h2>
        </div>
        <div className="fcBarbersGrid">
          {barbers.map((b, i) => (
            <div key={b.name} className="fcBarberCard" data-anim="" data-delay={String(i + 1)}>
              <div className="fcBarberImg">
                <img src={b.img} alt={b.name} loading="lazy" />
              </div>
              <div className="fcBarberGrad" />
              <div className="fcBarberInfo">
                <div className="fcBarberName">{b.name}</div>
                <div className="fcBarberRole">{b.role}</div>
                <div className="fcBarberSpec">{b.spec}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICES */}
      <section className="fcSection fcPrices" id="prijzen">
        <div data-anim="">
          <span className="fcSectionEyebrow fcSectionEyebrow--dark" style={{ color: "#3D6B4F" }}>Transparante prijzen</span>
          <h2 className="fcSectionTitle onLight">Tarieven</h2>
        </div>
        <div className="fcPricesGrid">
          {priceGroups.map((g, gi) => (
            <div key={g.group} className="fcPriceGroup" data-anim="" data-delay={String((gi % 2) + 1)}>
              <div className="fcPriceGroupName">{g.group}</div>
              {g.items.map((item) => (
                <div key={item.name} className="fcPriceItem">
                  <span className="fcPriceName">
                    {item.name}
                    {"note" in item && <span className="fcPriceNote">({(item as {name:string;price:string;note:string}).note})</span>}
                  </span>
                  <span className="fcPriceVal">{item.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="fcGallery" id="gallerij">
        <div className="fcGalleryHead" data-anim="">
          <span className="fcSectionEyebrow">Onze work</span>
          <h2 className="fcSectionTitle">Gallerij</h2>
        </div>
        <div className="fcGalleryGrid">
          {galleryImgs.map((g) => (
            <div key={g.cls} className={`fcGalleryItem ${g.cls}`}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="fcBooking">
        <h2 className="fcBookingTitle" data-anim="">
          KLAAR<br />VOOR EEN<br />STRAKKE<br />FADE?
        </h2>
        <div data-anim="" data-delay="2">
          <a href="#contact" className="fcBookingBtn">BOEK JE AFSPRAAK</a>
          <p className="fcBookingMeta">ONLINE · SNEL · EENVOUDIG</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="fcSection fcReviews">
        <div data-anim="">
          <span className="fcSectionEyebrow">Wat klanten zeggen</span>
          <h2 className="fcSectionTitle">Reviews</h2>
        </div>
        <div className="fcReviewsGrid">
          {reviews.map((r, i) => (
            <div key={r.author} className="fcReviewCard" data-anim="" data-delay={String(i + 1)}>
              <div className="fcStars">{Array.from({ length: 5 }).map((_, j) => <span key={j} className="fcStar">&#9733;</span>)}</div>
              <p className="fcReviewText">&ldquo;{r.text}&rdquo;</p>
              <div className="fcReviewAuthor">{r.author}</div>
              <div className="fcReviewMeta">{r.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="fcContact" id="contact">
        <div className="fcContactLeft">
          <h2>BOEK<br /><em>JOUW</em><br />AFSPRAAK</h2>
          <div className="fcContactBlocks">
            <div className="fcContactBlock">
              <span className="fcContactBlockLabel">Adres</span>
              <p>Lange Lozanastraat 44<br />2018 Antwerpen</p>
            </div>
            <div className="fcContactBlock">
              <span className="fcContactBlockLabel">Telefoon</span>
              <a href="tel:+3231234567">+32 3 123 45 67</a>
            </div>
            <div className="fcContactBlock">
              <span className="fcContactBlockLabel">E-mail</span>
              <a href="mailto:info@fadeclub.be">info@fadeclub.be</a>
            </div>
            <div className="fcContactBlock">
              <span className="fcContactBlockLabel">Openingsuren</span>
              <div className="fcHours">
                {hours.map((h) => (
                  <div key={h.day} className={`fcHoursRow${h.closed ? " closed" : ""}`}>
                    <span className="fcHoursDay">{h.day}</span>
                    <span className="fcHoursTime">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fcContactRight">
          <h3>STUUR EEN BERICHT</h3>
          <form className="fcForm" onSubmit={(e) => e.preventDefault()}>
            <div className="fcFormRow">
              <div className="fcFormGroup">
                <label className="fcFormLabel">Voornaam</label>
                <input type="text" placeholder="Jason" />
              </div>
              <div className="fcFormGroup">
                <label className="fcFormLabel">Achternaam</label>
                <input type="text" placeholder="Martens" />
              </div>
            </div>
            <div className="fcFormGroup">
              <label className="fcFormLabel">E-mail</label>
              <input type="email" placeholder="jij@email.be" />
            </div>
            <div className="fcFormGroup">
              <label className="fcFormLabel">Dienst</label>
              <select defaultValue="">
                <option value="" disabled>Kies een dienst</option>
                <option>Fade &amp; Cut</option>
                <option>Baard &amp; Trim</option>
                <option>Cut &amp; Beard Combo</option>
                <option>Hot Towel Shave</option>
                <option>Kids Cut</option>
                <option>Styling &amp; Design</option>
              </select>
            </div>
            <div className="fcFormGroup">
              <label className="fcFormLabel">Barber</label>
              <select defaultValue="">
                <option value="" disabled>Geen voorkeur</option>
                <option>Jason V.</option>
                <option>Dre M.</option>
                <option>Kobe L.</option>
              </select>
            </div>
            <div className="fcFormGroup">
              <label className="fcFormLabel">Bericht (optioneel)</label>
              <textarea placeholder="Extra info of wensen..." />
            </div>
            <button type="submit" className="fcFormBtn">VERSTUUR</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fcFooter">
        <span className="fcFooterLogo">FADE <em>CLUB</em></span>
        <div className="fcFooterLinks">
          <a href="#diensten">Diensten</a>
          <a href="#barbers">Barbers</a>
          <a href="#prijzen">Prijzen</a>
          <a href="#gallerij">Gallerij</a>
          <a href="#contact">Contact</a>
        </div>
        <span className="fcFooterCopy">&copy; 2026 Fade Club Barbershop</span>
      </footer>
    </>
  );
}
