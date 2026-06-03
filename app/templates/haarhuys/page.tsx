"use client";
import { useEffect, useRef, useState } from "react";
import "./haarhuys.css";

const services = [
  { icon: "✂️", name: "Kapsalon", desc: "Knip, styling en behandelingen voor dames, heren en kinderen. Altijd op maat van jouw haartype en wensen.", link: "Meer info →" },
  { icon: "🌀", name: "Krullenkapper", desc: "Erkend krullenkapper in België. Wij zijn gespecialiseerd in alle types krullend en golvend haar met de CurlyGirl-methode.", link: "Meer info →" },
  { icon: "💆", name: "Headspa", desc: "Een rustgevende hoofdhuidbehandeling die je haar en scalp diep reinigt, voedt en ontspant. Pure verwennerij.", link: "Meer info →" },
  { icon: "🧴", name: "Persoonlijk advies", desc: "Geen one-size-fits-all. Wij analyseren jouw haar en geven eerlijk en deskundig advies over de beste routine voor thuis.", link: "Meer info →" },
  { icon: "🛍️", name: "Webshop", desc: "Shop onze curated selectie van professionele haarproducten online. Gratis verzending vanaf €60 in België.", link: "Naar de shop →" },
  { icon: "📚", name: "Workshop", desc: "Leer omgaan met je krullen! Onze workshops geven je de kennis en tools om zelf thuis prachtige krullen te stylen.", link: "Bekijk workshops →" },
];

const brands = [
  "Joico", "CurlSys", "Oright", "Jean Paul Myné", "Great Lengths", "Kérastase",
];

const reviews = [
  {
    text: "Eindelijk een kapper die echt snapt wat mijn krullen nodig hebben! Na jaren strijd met mijn haar ben ik bij 't Haarhuys terecht gekomen en ik ben zo blij. Mijn krullen zijn nog nooit zo mooi geweest.",
    author: "Laura D.",
    date: "April 2026",
    service: "Krullenkapper",
  },
  {
    text: "De headspa was absoluut heerlijk. Totale ontspanning en daarna voelde mijn haar zo zacht en schoon. Zeker voor herhaling vatbaar! Het team is ook superlief en professioneel.",
    author: "Nathalie V.",
    date: "Maart 2026",
    service: "Headspa",
  },
  {
    text: "De krullenworkshop heeft mijn leven veranderd. Ik wist niet hoe ik met mijn krullen moest omgaan, en nu doe ik het elke ochtend perfect zelf. Zo'n waardevolle investering!",
    author: "Hanne B.",
    date: "Februari 2026",
    service: "Workshop",
  },
];

const workshopFeatures = [
  "Leer je krulpatroon kennen en omarmen",
  "Juiste producten kiezen voor jouw haartype",
  "Stap-voor-stap styling techniek",
  "Praktische oefening tijdens de sessie",
  "Persoonlijk advies om mee naar huis te nemen",
];

const locaties = [
  {
    name: "Nijlen",
    addr: ["Woeringenstraat 11A", "2560 Nijlen"],
    tel: "034112884",
    email: "info@hethaarhuys.be",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    hours: [
      { day: "Maandag", time: "Op afspraak" },
      { day: "Dinsdag", time: "Gesloten", closed: true },
      { day: "Woensdag", time: "Op afspraak" },
      { day: "Donderdag", time: "Op afspraak" },
      { day: "Vrijdag", time: "Op afspraak" },
      { day: "Zaterdag", time: "Op afspraak" },
      { day: "Zondag", time: "Gesloten", closed: true },
    ],
  },
  {
    name: "Olen",
    addr: ["Gerheiden 50", "2250 Olen"],
    tel: "034112884",
    email: "info@hethaarhuys.be",
    img: "https://images.unsplash.com/photo-1633681122939-f8ec1f62c42a?auto=format&fit=crop&w=800&q=80",
    hours: [
      { day: "Maandag", time: "Gesloten", closed: true },
      { day: "Dinsdag", time: "Op afspraak" },
      { day: "Woensdag", time: "Op afspraak" },
      { day: "Donderdag", time: "Op afspraak" },
      { day: "Vrijdag", time: "Op afspraak" },
      { day: "Zaterdag", time: "Op afspraak" },
      { day: "Zondag", time: "Gesloten", closed: true },
    ],
  },
];

export default function HaarhuyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).dataset.visible = "1"; }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-anim]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`hhNav${scrolled ? " hhNavScrolled" : ""}`}>
        <div className="hhNavLogo">
          <strong>'t Haarhuys</strong>
          <span>Erkend Krullenkapper</span>
        </div>
        <div className="hhNavLinks">
          <a href="#diensten">Diensten</a>
          <a href="#krullen">Krullenkapper</a>
          <a href="#workshop">Workshop</a>
          <a href="#locaties">Locaties</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="hhNavRight">
          <a href="#contact" className="hhNavBook">Afspraak maken</a>
        </div>
        <button
          className={`hhHamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE NAV */}
      <div className={`hhMobileNav${menuOpen ? " open" : ""}`}>
        {[["#diensten","Diensten"],["#krullen","Krullenkapper"],["#workshop","Workshop"],["#locaties","Locaties"],["#reviews","Reviews"],["#contact","Contact"]].map(([href,label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Afspraak maken</a>
      </div>

      {/* HERO */}
      <section className="hhHero">
        <div className="hhHeroLeft">
          <span className="hhHeroEyebrow">Nijlen &amp; Olen · Erkend Krullenkapper</span>
          <h1 className="hhHeroTitle">
            Jouw haar,<br />
            <em>vol leven</em><br />
            &amp; karakter.
          </h1>
          <p className="hhHeroSub">
            Kapsalon 't Haarhuys is de referentie voor haarverzorging in de regio. Gespecialiseerd in krullend en golvend haar — voor dames, heren en kinderen.
          </p>
          <div className="hhHeroActions">
            <a href="#contact" className="hhHeroPrimary">Afspraak maken</a>
            <a href="#krullen" className="hhHeroSecondary">Krullenkapper</a>
          </div>
          <div className="hhHeroBadge">
            <span>🏅 Erkend krullenkapper Belgium</span>
            <small>CurlSys · CurlyGirl gecertificeerd</small>
          </div>
        </div>
        <div className="hhHeroRight">
          <img
            src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80"
            alt="Curly hair styling"
          />
        </div>
      </section>

      {/* DIENSTEN */}
      <section className="hhServices" id="diensten">
        <div className="hhServicesHead" data-anim="">
          <span className="hhServicesEyebrow">Wat wij doen</span>
          <h2 className="hhServicesTitle">Onze diensten</h2>
        </div>
        <div className="hhServicesGrid">
          {services.map((s, i) => (
            <div key={s.name} className="hhServiceCard" data-anim="" data-delay={String((i % 3) + 1)}>
              <div className="hhServiceIcon">{s.icon}</div>
              <h3 className="hhServiceName">{s.name}</h3>
              <p className="hhServiceDesc">{s.desc}</p>
              <span className="hhServiceLink">{s.link}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CURLY SPECIALIST */}
      <section className="hhCurly" id="krullen">
        <div className="hhCurlyLeft" data-anim="">
          <span className="hhCurlyEyebrow">Onze specialiteit</span>
          <h2 className="hhCurlyTitle">
            Experts in<br />
            <em>krullend</em><br />
            haar
          </h2>
          <p className="hhCurlyText">
            Als erkend krullenkapper in België begrijpen wij als geen ander hoe uniek en prachtig krullend haar is. Wij werken met de CurlyGirl-methode en uitsluitend haarvriendelijke, natuurlijke producten die jouw krullen doen stralen.
          </p>
          <div className="hhCurlyBadges">
            {["CurlyGirl Methode","CurlSys Partner","Biologische producten","Joico Professional","Silicone-free"].map((b) => (
              <span key={b} className="hhCurlyBadge">{b}</span>
            ))}
          </div>
        </div>
        <div className="hhCurlyRight" data-anim="" data-delay="2">
          <div className="hhCurlyImg">
            <img
              src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80"
              alt="Krullenkapper behandeling"
            />
          </div>
          <div className="hhCurlyFloat">
            <span className="hhCurlyFloatNum">12+</span>
            <span className="hhCurlyFloatLabel">Jaar ervaring met krullen</span>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <div className="hhBrands">
        <p className="hhBrandsLabel">Onze partner-merken</p>
        <div className="hhBrandsRow">
          {brands.map((b) => (
            <span key={b} className="hhBrandItem">{b}</span>
          ))}
        </div>
      </div>

      {/* LOCATIES */}
      <section className="hhLocaties" id="locaties">
        <div className="hhLocatiesHead" data-anim="">
          <span className="hhLocatiesEyebrow">Twee vestigingen</span>
          <h2 className="hhLocatiesTitle">Kom ons bezoeken</h2>
        </div>
        <div className="hhLocatiesGrid">
          {locaties.map((l, i) => (
            <div key={l.name} className="hhLocatieCard" data-anim="" data-delay={String(i + 1)}>
              <div className="hhLocatieImg">
                <img src={l.img} alt={`Kapsalon ${l.name}`} loading="lazy" />
              </div>
              <div className="hhLocatieBody">
                <h3 className="hhLocatieName">'t Haarhuys {l.name}</h3>
                <p className="hhLocatieAddr">{l.addr.map((line: string, j: number) => <span key={j}>{line}<br /></span>)}</p>
                <div className="hhLocatieHours">
                  <span className="hhLocatieHoursTitle">Openingsuren</span>
                  {l.hours.map((h) => (
                    <div key={h.day} className={`hhLocatieHoursRow${h.closed ? " closed" : ""}`}>
                      <span className="hhLocatieHoursDay">{h.day}</span>
                      <span className="hhLocatieHoursTime">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="hhLocatieContact">
                  <a href={`tel:${l.tel}`}>📞 {l.tel}</a>
                  <a href={`mailto:${l.email}`}>✉️ {l.email}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP */}
      <section className="hhWorkshop" id="workshop">
        <div className="hhWorkshopImg" data-anim="">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
            alt="Krullenworkshop"
            loading="lazy"
          />
        </div>
        <div className="hhWorkshopContent" data-anim="" data-delay="2">
          <span className="hhWorkshopEyebrow">Leer je krullen kennen</span>
          <h2 className="hhWorkshopTitle">Krullenworkshop</h2>
          <p className="hhWorkshopText">
            Weet je niet hoe je met je krullen moet omgaan? In onze interactieve workshop leer je alles wat je nodig hebt om zelf prachtige, gedefinieerde krullen te stylen. Kleine groepen, persoonlijke begeleiding.
          </p>
          <ul className="hhWorkshopFeatures">
            {workshopFeatures.map((f) => (
              <li key={f} className="hhWorkshopFeature">{f}</li>
            ))}
          </ul>
          <a href="#contact" className="hhWorkshopBtn">Inschrijven voor workshop</a>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="hhReviews" id="reviews">
        <div className="hhReviewsHead" data-anim="">
          <span className="hhReviewsEyebrow">Wat onze klanten zeggen</span>
          <h2 className="hhReviewsTitle">Tevreden krullenkoppen</h2>
        </div>
        <div className="hhReviewsGrid">
          {reviews.map((r, i) => (
            <div key={r.author} className="hhReviewCard" data-anim="" data-delay={String(i + 1)}>
              <div className="hhReviewStars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="hhReviewStar">★</span>
                ))}
              </div>
              <p className="hhReviewText">"{r.text}"</p>
              <div>
                <div className="hhReviewAuthor">{r.author}</div>
                <div className="hhReviewDate">{r.date}</div>
              </div>
              <span className="hhReviewService">{r.service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="hhBooking">
        <div className="hhBookingText" data-anim="">
          <span className="hhBookingEyebrow">Klaar voor de stap?</span>
          <h2 className="hhBookingTitle">
            Boek jouw<br />
            <em>afspraak</em><br />
            online
          </h2>
        </div>
        <div className="hhBookingRight" data-anim="" data-delay="2">
          <a href="#contact" className="hhBookingBtn">Afspraak maken</a>
          <span className="hhBookingMeta">24u/7d online beschikbaar · Bevestiging per e-mail</span>
        </div>
      </section>

      {/* CONTACT */}
      <section className="hhContact" id="contact">
        <div className="hhContactLeft" data-anim="">
          <span className="hhContactEyebrow">Neem contact op</span>
          <h2 className="hhContactTitle">Stuur ons een bericht</h2>
          <p className="hhContactText">
            Heb je een vraag over onze diensten, de workshop of wil je gewoon meer info? We antwoorden zo snel mogelijk!
          </p>
          <div className="hhContactInfo">
            <div className="hhContactInfoItem">
              <span className="hhContactInfoIcon">📞</span>
              <a href="tel:034112884">034 11 28 84</a>
            </div>
            <div className="hhContactInfoItem">
              <span className="hhContactInfoIcon">✉️</span>
              <a href="mailto:info@hethaarhuys.be">info@hethaarhuys.be</a>
            </div>
            <div className="hhContactInfoItem">
              <span className="hhContactInfoIcon">📍</span>
              <span>Woeringenstraat 11A, 2560 Nijlen<br />Gerheiden 50, 2250 Olen</span>
            </div>
            <div className="hhContactInfoItem">
              <span className="hhContactInfoIcon">📸</span>
              <a href="https://www.instagram.com/hethaarhuysnijlen/" target="_blank" rel="noopener">@hethaarhuysnijlen</a>
            </div>
          </div>
        </div>
        <form className="hhForm" onSubmit={(e) => e.preventDefault()} data-anim="" data-delay="2">
          <div className="hhFormRow">
            <div className="hhFormGroup">
              <label className="hhFormLabel">Voornaam</label>
              <input type="text" placeholder="Jouw voornaam" />
            </div>
            <div className="hhFormGroup">
              <label className="hhFormLabel">Achternaam</label>
              <input type="text" placeholder="Jouw achternaam" />
            </div>
          </div>
          <div className="hhFormGroup">
            <label className="hhFormLabel">E-mail</label>
            <input type="email" placeholder="jouw@email.be" />
          </div>
          <div className="hhFormGroup">
            <label className="hhFormLabel">Dienst</label>
            <select defaultValue="">
              <option value="" disabled>Kies een dienst</option>
              <option>Kapsalon (knip & styling)</option>
              <option>Krullenkapper</option>
              <option>Headspa</option>
              <option>Persoonlijk advies</option>
              <option>Krullenworkshop</option>
              <option>Andere vraag</option>
            </select>
          </div>
          <div className="hhFormGroup">
            <label className="hhFormLabel">Vestiging</label>
            <select defaultValue="">
              <option value="" disabled>Kies een vestiging</option>
              <option>Nijlen – Woeringenstraat 11A</option>
              <option>Olen – Gerheiden 50</option>
            </select>
          </div>
          <div className="hhFormGroup">
            <label className="hhFormLabel">Bericht</label>
            <textarea placeholder="Stel gerust je vraag..." />
          </div>
          <button type="submit">Verstuur bericht</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="hhFooter">
        <div className="hhFooterTop">
          <div className="hhFooterBrand">
            <strong>'t Haarhuys</strong>
            <p>Erkend krullenkapper in België. Kapsalon voor alle haartypes, met specialisatie in krullend haar en natuurlijke verzorging. Nijlen &amp; Olen.</p>
          </div>
          <div className="hhFooterCol">
            <h4>Diensten</h4>
            <a href="#diensten">Kapsalon</a>
            <a href="#krullen">Krullenkapper</a>
            <a href="#diensten">Headspa</a>
            <a href="#workshop">Workshop</a>
            <a href="#diensten">Webshop</a>
          </div>
          <div className="hhFooterCol">
            <h4>Info</h4>
            <a href="#locaties">Locaties</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
            <a href="#">Blog</a>
            <a href="#">Loyaliteitsprogramma</a>
          </div>
          <div className="hhFooterCol">
            <h4>Contact</h4>
            <a href="tel:034112884">034 11 28 84</a>
            <a href="mailto:info@hethaarhuys.be">info@hethaarhuys.be</a>
            <a href="#">Woeringenstraat 11A, Nijlen</a>
            <a href="#">Gerheiden 50, Olen</a>
          </div>
        </div>
        <div className="hhFooterBottom">
          <span className="hhFooterCopy">&copy; 2026 't Haarhuys / Renka Styling BV · BE0474396019</span>
          <div className="hhFooterSocial">
            <a href="https://www.facebook.com/HetHaarhuys" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.instagram.com/hethaarhuysnijlen/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.tiktok.com/@hethaarhuyskrullenkapper" target="_blank" rel="noopener">TikTok</a>
          </div>
        </div>
      </footer>
    </>
  );
}
