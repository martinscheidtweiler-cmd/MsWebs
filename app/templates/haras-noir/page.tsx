"use client";
import { useEffect, useRef, useState } from "react";
import "./haras-noir.css";

const news = [
  {
    id: 1,
    date: "18 MEI 2026",
    title: "Haras Noir wint team-gold op CSI3* Antwerpen",
    excerpt: "Een onvergetelijk weekend in Antwerpen: vier ruiters, vier foutloze rondes in de finale. De ploeg pakte het goud met indrukwekkend parcours.",
    img: "https://images.unsplash.com/photo-1510585516808-6fbf2578b3d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    date: "4 MEI 2026",
    title: "Nieuwe aanwinst: Carino Z vervoegt de stal",
    excerpt: "We zijn trots de komst van Carino Z aan te kondigen, een veelbelovende BWP-hengst van 7 jaar met een stamboom vol kampioensgenen.",
    img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    date: "22 APR 2026",
    title: "Training met Olympisch kampioen Kevin Staut",
    excerpt: "Onze ruiters kregen deze week een exclusieve masterclass van de Franse Olympiër. Een intense en leerrijke sessie voor heel het team.",
    img: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?auto=format&fit=crop&w=800&q=80",
  },
];

const riders = [
  { id: 1, name: "Thomas Leclercq", role: "International Springruiter", nation: "🇧🇪 België", img: "https://images.unsplash.com/photo-1547841243-eacb14453cd9?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Sophie Vandenberghe", role: "U25 Topsporter", nation: "🇧🇪 België", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Lars Müller", role: "International Springruiter", nation: "🇩🇪 Duitsland", img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Emma Claes", role: "Young Rider", nation: "🇧🇪 België", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" },
];

const horses = [
  { id: 1, name: "Carino Z", breed: "Zangersheide", age: "7", gender: "H", height: "1.70", level: "1.40m", status: "ACTIEF", img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Quentin de la Tour", breed: "KWPN", age: "11", gender: "R", height: "1.72", level: "1.60m", status: "TOP", img: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Fantasia v/d Berg", breed: "BWP", age: "9", gender: "M", height: "1.68", level: "1.50m", status: "ACTIEF", img: "https://images.unsplash.com/photo-1510585516808-6fbf2578b3d3?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Indigo Blue", breed: "Selle Français", age: "6", gender: "R", height: "1.71", level: "1.35m", status: "JONG", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Bellissimo M", breed: "Oldenburg", age: "13", gender: "H", height: "1.74", level: "1.60m", status: "TOP", img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Grace Kelly Z", breed: "Zangersheide", age: "8", gender: "M", height: "1.69", level: "1.50m", status: "ACTIEF", img: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Cador des Forets", breed: "SF", age: "10", gender: "H", height: "1.70", level: "1.55m", status: "ACTIEF", img: "https://images.unsplash.com/photo-1510585516808-6fbf2578b3d3?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Viva la Vida", breed: "KWPN", age: "5", gender: "M", height: "1.67", level: "1.20m", status: "VEELBELOVEND", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" },
];

const agenda = [
  { date: "7-9 JUN", event: "CSI3* Brussel Grand Prix", location: "Brussel, BEL", riders: ["Leclercq", "Müller"], horses: ["Quentin", "Carino Z"] },
  { date: "18-21 JUN", event: "CSI5* Knokke Hippique", location: "Knokke, BEL", riders: ["Leclercq", "Vandenberghe"], horses: ["Bellissimo M", "Fantasia"] },
  { date: "3-6 JUL", event: "CSIO3* La Baule", location: "La Baule, FRA", riders: ["Leclercq"], horses: ["Quentin", "Bellissimo M"] },
  { date: "17-20 JUL", event: "CSI2* Lummen", location: "Lummen, BEL", riders: ["Claes", "Vandenberghe"], horses: ["Indigo Blue", "Grace Kelly Z"] },
  { date: "28 AUG-1 SEP", event: "CSI5* Mechelen", location: "Mechelen, BEL", riders: ["Leclercq", "Müller", "Vandenberghe"], horses: ["Quentin", "Carino Z", "Fantasia"] },
];

const results = [
  { place: 1, event: "CSI3* Antwerpen – GP 1.50m", rider: "T. Leclercq", horse: "Quentin de la Tour", level: "1.50m", date: "18 MEI 2026" },
  { place: 2, event: "CSI3* Antwerpen – Team", rider: "T. Leclercq / L. Müller", horse: "Haras Noir Team", level: "1.50m", date: "18 MEI 2026" },
  { place: 1, event: "CSI2* Lummen – 1.45m Speed", rider: "S. Vandenberghe", horse: "Fantasia v/d Berg", level: "1.45m", date: "3 MEI 2026" },
  { place: 3, event: "CSI4* Mechelen – GP 1.55m", rider: "T. Leclercq", horse: "Bellissimo M", level: "1.55m", date: "24 APR 2026" },
  { place: 4, event: "CSIO3* Hasselt – Nations Cup", rider: "Haras Noir Team", horse: "Diverse", level: "1.50m", date: "12 APR 2026" },
  { place: 1, event: "CSI2* Hasselt – U25 1.40m", rider: "E. Claes", horse: "Indigo Blue", level: "1.40m", date: "12 APR 2026" },
];

const partners = [
  "Agrena Feeds", "Equi-Pharma", "Cavalleria Toscana", "BNP Paribas Fortis",
  "Devos Transport", "Flanders Horse", "Haras de Reux", "VDL Stud",
];

function placeClass(p: number) {
  if (p === 1) return "gold";
  if (p === 2) return "silver";
  if (p === 3) return "bronze";
  return "other";
}

export default function HarasNoirPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.visible = "1"; } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-anim]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`hnNav${scrolled ? " hnNavScrolled" : ""}`}>
        <div className="hnNavInner">
          <div className="hnNavLogo">
            <strong>Haras Noir</strong>
            <span>Jumping Stable</span>
          </div>
          <div className="hnNavLinks">
            <a href="#nieuws">Nieuws</a>
            <a href="#ruiters">Ruiters</a>
            <a href="#paarden">Paarden</a>
            <a href="#agenda">Agenda</a>
            <a href="#resultaten">Resultaten</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="hnNavRight">
            <div className="hnNavLang">
              <span className="active">NL</span>
              <span>FR</span>
              <span>EN</span>
            </div>
            <a href="#contact" className="hnNavCta">INSCHRIJVEN</a>
          </div>
          <button
            className={`hnHamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`hnMobileNav${menuOpen ? " open" : ""}`}>
        {["#nieuws", "#ruiters", "#paarden", "#agenda", "#resultaten", "#contact"].map((href) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
        <a href="#contact" className="hnNavCta" style={{ textAlign: "center", marginTop: 8 }} onClick={() => setMenuOpen(false)}>
          INSCHRIJVEN
        </a>
      </div>

      {/* HERO */}
      <section className="hnHero">
        <div className="hnHeroBg" ref={heroBgRef} />
        <div className="hnHeroOverlay" />
        <div className="hnHeroContent">
          <h1 className="hnHeroTagline">
            We <em>live</em><br />horses.
          </h1>
          <p className="hnHeroSub">
            Haras Noir is een toonaangevende Belgische jumping stable. Wij vormen topsporters en uitzonderlijke paarden voor het internationaal circuit.
          </p>
          <div className="hnHeroActions">
            <a href="#paarden" className="hnHeroPrimary">ONZE PAARDEN</a>
            <a href="#resultaten" className="hnHeroSecondary">RESULTATEN</a>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="hnSection hnNews" id="nieuws">
        <div className="hnSectionHead">
          <h2>Nieuws</h2>
          <a href="#nieuws" className="hnSectionMore">Alle nieuwsberichten →</a>
        </div>
        <div className="hnNewsGrid">
          {news.map((n, i) => (
            <article key={n.id} className="hnNewsCard" data-anim="" data-delay={String(i + 1)}>
              <div className="hnNewsImg">
                <img src={n.img} alt={n.title} loading="lazy" />
              </div>
              <div className="hnNewsBody">
                <span className="hnNewsDate">{n.date}</span>
                <h3 className="hnNewsTitle">{n.title}</h3>
                <p className="hnNewsExcerpt">{n.excerpt}</p>
                <span className="hnNewsReadMore">LEES MEER →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RIDERS */}
      <section className="hnSection hnRiders" id="ruiters">
        <div className="hnSectionHead">
          <h2>Ruiters</h2>
          <a href="#ruiters" className="hnSectionMore">Alle ruiters →</a>
        </div>
        <div className="hnRidersGrid">
          {riders.map((r, i) => (
            <div key={r.id} className="hnRiderCard" data-anim="" data-delay={String(i + 1)}>
              <div className="hnRiderImg">
                <img src={r.img} alt={r.name} loading="lazy" />
              </div>
              <div className="hnRiderInfo">
                <span className="hnRiderName">{r.name}</span>
                <span className="hnRiderRole">{r.role}</span>
                <span className="hnRiderNation">{r.nation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HORSES */}
      <section className="hnSection hnHorses" id="paarden">
        <div className="hnSectionHead">
          <h2>Paarden</h2>
          <a href="#paarden" className="hnSectionMore">Alle paarden →</a>
        </div>
        <div className="hnHorsesGrid">
          {horses.map((h, i) => (
            <div key={h.id} className="hnHorseCard" data-anim="" data-delay={String((i % 4) + 1)}>
              <div className="hnHorseCardImg">
                <img src={h.img} alt={h.name} loading="lazy" />
                <span className="hnHorseStatus">{h.status}</span>
              </div>
              <div className="hnHorseCardBody">
                <span className="hnHorseCardName">{h.name}</span>
                <span className="hnHorseCardBreed">{h.breed}</span>
                <div className="hnHorseCardSpecs">
                  <div className="hnHorseCardSpec">
                    <span>Leeftijd</span>
                    <strong>{h.age} jr</strong>
                  </div>
                  <div className="hnHorseCardSpec">
                    <span>Geslacht</span>
                    <strong>{h.gender}</strong>
                  </div>
                  <div className="hnHorseCardSpec">
                    <span>Stokmaat</span>
                    <strong>{h.height}m</strong>
                  </div>
                  <div className="hnHorseCardSpec">
                    <span>Niveau</span>
                    <strong>{h.level}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AGENDA + RESULTS */}
      <div className="hnAgendaResults" id="agenda">
        <div className="hnAgendaCol">
          <span className="hnEyebrow">Kalender</span>
          <div className="hnSectionHead" style={{ marginBottom: 24 }}>
            <h2>Agenda</h2>
          </div>
          <div className="hnAgendaList">
            {agenda.map((a, i) => (
              <div key={i} className="hnAgendaItem">
                <span className="hnAgendaDate">{a.date}</span>
                <div className="hnAgendaEvent">
                  <strong>{a.event}</strong>
                  <div className="hnAgendaRiders">
                    {a.riders.map((r) => (
                      <span key={r} className="hnAgendaRider">{r}</span>
                    ))}
                    {a.horses.map((h) => (
                      <span key={h} className="hnAgendaRider" style={{ background: "var(--bg2)" }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hnResultsCol" id="resultaten">
          <span className="hnEyebrow">Uitslagen</span>
          <div className="hnSectionHead" style={{ marginBottom: 24 }}>
            <h2>Resultaten</h2>
          </div>
          <div className="hnResultsList">
            {results.map((r, i) => (
              <div key={i} className="hnResultItem">
                <div className={`hnResultPlace ${placeClass(r.place)}`}>{r.place}</div>
                <div className="hnResultBody">
                  <strong>{r.event}</strong>
                  <span>{r.rider} &middot; {r.horse}</span>
                </div>
                <span className="hnResultLevel">{r.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="hnPartners">
        <p className="hnPartnersLabel">Onze partners &amp; sponsors</p>
        <div className="hnPartnersRow">
          {partners.map((p) => (
            <span key={p} className="hnPartnerLogo">{p}</span>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <section className="hnContact" id="contact">
        <div className="hnContactLeft">
          <h2>Contact<br />opnemen</h2>
          <p>
            Wil je meer informatie over onze paarden, trainingsmogelijkheden of partnerships? Neem gerust contact op met ons team.
          </p>
          <div className="hnContactInfo">
            <a href="tel:+3211223344">+32 11 22 33 44</a>
            <a href="mailto:info@harasnoir.be">info@harasnoir.be</a>
            <a href="#">Stalstraat 12, 3500 Hasselt</a>
          </div>
          <div className="hnNewsletter">
            <label>Nieuwsbrief — blijf op de hoogte</label>
            <div className="hnNewsletterRow">
              <input type="email" placeholder="Uw e-mailadres" />
              <button type="button">ABONNEREN</button>
            </div>
          </div>
        </div>
        <form
          className="hnForm"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="hnFormLabel">Stuur ons een bericht</p>
          <input type="text" placeholder="Naam" />
          <input type="email" placeholder="E-mail" />
          <select defaultValue="">
            <option value="" disabled>Onderwerp</option>
            <option>Informatie over paarden</option>
            <option>Trainingsplaats</option>
            <option>Partnership / sponsoring</option>
            <option>Andere vraag</option>
          </select>
          <textarea placeholder="Uw bericht..." />
          <button type="submit">VERZENDEN</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="hnFooter">
        <div className="hnFooterBrand">
          <strong>Haras Noir</strong>
          <div className="hnFooterLinks">
            <a href="#nieuws">Nieuws</a>
            <a href="#ruiters">Ruiters</a>
            <a href="#paarden">Paarden</a>
            <a href="#agenda">Agenda</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <span className="hnFooterCopy">&copy; 2026 Haras Noir Jumping Stable. Alle rechten voorbehouden.</span>
      </footer>
    </>
  );
}
