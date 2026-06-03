import "./fotograaf.css";

const services = [
  {
    nr: "01",
    title: "Portret",
    desc: "Studio & outdoor portretten voor professionals, families en persoonlijke projecten.",
    duration: "2 — 3 uur",
  },
  {
    nr: "02",
    title: "Bruiloft",
    desc: "Volledige bruidsreportage van voorbereiding tot receptie. Tijdloze beelden van je grote dag.",
    duration: "Volledige dag",
  },
  {
    nr: "03",
    title: "Branding",
    desc: "Professionele brand photography voor ondernemers, bedrijven en social media.",
    duration: "Half dag",
  },
  {
    nr: "04",
    title: "Architectuur",
    desc: "Interieur- en architectuurfotografie voor vastgoed, hotels en designbureaus.",
    duration: "Op maat",
  },
  {
    nr: "05",
    title: "Events",
    desc: "Rapportage van bedrijfsevenementen, galas, productlanceringen en privéfeesten.",
    duration: "Op maat",
  },
  {
    nr: "06",
    title: "Product",
    desc: "E-commerce en lifestyle productfotografie met stijlvolle belichting en retouche.",
    duration: "Half dag",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=90",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=90",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=90",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=90",
];

const packages = [
  {
    name: "Essential",
    price: "€395",
    note: "Portret & branding",
    desc: "Perfect voor een professionele portret- of brandingsessie.",
    items: ["2 uur shoot", "30 bewerkte foto's", "Online galerij", "Digitale download"],
    featured: false,
  },
  {
    name: "Studio",
    price: "€795",
    note: "Meest gekozen",
    desc: "Uitgebreide sessie voor ondernemers en creatieve projecten.",
    items: ["Halve dag shoot", "80+ bewerkte foto's", "Online galerij", "Licentie commercieel gebruik", "2 locaties"],
    featured: true,
  },
  {
    name: "Wedding",
    price: "€1.895",
    note: "Bruidsreportage",
    desc: "Volledige bruidsreportage van voorbereiding tot avond.",
    items: ["Volledige dag", "300+ bewerkte foto's", "Online galerij + USB", "Fotoboek optioneel", "2de fotograaf optioneel"],
    featured: false,
  },
];

const testimonials = [
  {
    quote: "Onze trouwfoto's zijn absoluut prachtig. Elke herinnering leeft opnieuw als we de galerij bekijken. Dankjewel voor alles.",
    name: "Sarah & Luca",
    role: "Bruidsreportage",
  },
  {
    quote: "Mijn brandsessie heeft mijn hele online aanwezigheid getransformeerd. Professioneel, creatief en een fijne werksfeer.",
    name: "Noor V.",
    role: "Brand photography",
  },
  {
    quote: "De architectuurfoto's zijn meesterlijk. Elk hoekje van het pand staat nu in zijn beste licht. Exact wat ik zocht.",
    name: "Studio Blanco",
    role: "Architectuurfotografie",
  },
];

const marqueeItems = [
  "Portret", "Bruiloft", "Branding", "Architectuur", "Events", "Product",
  "Portret", "Bruiloft", "Branding", "Architectuur", "Events", "Product",
];

export default function FotograafPage() {
  return (
    <main className="lensPage">
      <nav className="lensNav">
        <a href="#home" className="lensLogo">Lens & Light</a>
        <nav>
          <a href="#services">Diensten</a>
          <a href="#gallery">Werk</a>
          <a href="#about">Over</a>
          <a href="#packages">Pakketten</a>
          <a href="#contact" className="lensNavBtn">Boek sessie</a>
        </nav>
      </nav>

      <section className="lensHero" id="home">
        <div className="lensHeroLeft">
          <div className="lensHeroEye">
            <span>Fotograaf · Antwerpen · Beschikbaar in België</span>
          </div>
          <h1>Moments<br /><em>worth</em><br />keeping.</h1>
          <p className="lensHeroDesc">
            Lens & Light is een premium fotostudio voor portret, bruiloft,
            branding en architectuur. Stijlvol, eerlijk en tijdloos.
          </p>
          <div className="lensHeroActions">
            <a href="#contact" className="lensBtnPrimary">Sessie boeken</a>
            <a href="#gallery" className="lensBtnSecondary">Bekijk werk</a>
          </div>
        </div>
        <div className="lensHeroRight">
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=90"
            alt="Lens & Light fotografie"
          />
          <div className="lensHeroStats">
            <div>
              <strong>340+</strong>
              <span>Sessies afgerond</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Gemiddelde beoordeling</span>
            </div>
          </div>
        </div>
      </section>

      <div className="lensMarquee">
        <div className="lensMarqueeTrack">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={i % 3 === 0 ? "accent" : ""}>{item} {i % 3 === 0 ? "★" : "·"}</span>
          ))}
        </div>
      </div>

      <section className="lensStatement">
        <p>
          Een foto is niet een moment vastgelegd —<br />
          het is <em>een gevoel bewaard</em> voor altijd.
        </p>
      </section>

      <section className="lensServices" id="services">
        <div className="lensSectionHead">
          <div>
            <span>Wat ik doe</span>
            <h2>Zes<br />disciplines.</h2>
          </div>
          <a href="#contact" className="lensBtnSecondary">Alle info →</a>
        </div>
        <div className="lensServiceList">
          {services.map((s) => (
            <div key={s.nr} className="lensServiceItem">
              <span>{s.nr}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <em>{s.duration}</em>
              <a href="#contact">Boeken →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="lensGallery" id="gallery">
        <div className="lensSectionHead">
          <div>
            <span>Selectie werk</span>
            <h2>Beelden<br />die blijven.</h2>
          </div>
        </div>
        <div className="lensGalleryGrid">
          {gallery.map((src, i) => (
            <img key={i} src={src} alt={`Lens & Light fotografie ${i + 1}`} />
          ))}
        </div>
      </section>

      <section className="lensAbout" id="about">
        <div className="lensAboutImage">
          <img
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=90"
            alt="Fotograaf Lens & Light"
          />
        </div>
        <div className="lensAboutContent">
          <span>Over de fotograaf</span>
          <h2>Oog voor het echte moment.</h2>
          <p>
            Ik ben Sam Declercq, fotograaf gevestigd in Antwerpen. Al meer dan
            8 jaar maak ik beelden voor mensen die kwaliteit, eerlijkheid en
            stijl waarderen boven perfecte poses en generieke stockbeelden.
          </p>
          <p>
            Mijn aanpak is rustig en persoonlijk. Van de eerste call tot de
            finale galerij — alles gaat door mij, zonder tussenpersonen.
          </p>
          <div className="lensAboutStats">
            <div>
              <strong>340+</strong>
              <span>Sessies</span>
            </div>
            <div>
              <strong>8jr</strong>
              <span>Ervaring</span>
            </div>
            <div>
              <strong>12+</strong>
              <span>Landen</span>
            </div>
          </div>
        </div>
      </section>

      <section className="lensTestimonials">
        <div className="lensSectionHead">
          <div>
            <span>Klanten</span>
            <h2>Wat ze<br />zeggen.</h2>
          </div>
        </div>
        <div className="lensTestGrid">
          {testimonials.map((t) => (
            <div key={t.name} className="lensTestCard">
              <div className="lensTestStars">★★★★★</div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="lensTestAuthor">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lensPackages" id="packages">
        <div className="lensSectionHead">
          <div>
            <span>Pakketten</span>
            <h2>Kies jouw<br />sessie.</h2>
          </div>
        </div>
        <div className="lensPackageGrid">
          {packages.map((p) => (
            <div key={p.name} className={`lensPackCard ${p.featured ? "featured" : ""}`}>
              <small>{p.note}</small>
              <h3>{p.name}</h3>
              <strong>{p.price}</strong>
              <p>{p.desc}</p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#contact">Sessie boeken →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="lensContact" id="contact">
        <div className="lensContactLeft">
          <span>Sessie boeken</span>
          <h2>Laten we iets<br />moois maken.</h2>
          <p>
            Stuur een bericht met je ideeën, de datum en het type sessie.
            Ik neem contact op binnen 24 uur voor een persoonlijk gesprek.
          </p>
          <div className="lensContactLinks">
            <a href="mailto:hello@lensandlight.be">hello@lensandlight.be</a>
            <a href="tel:+32470000000">+32 470 000 000</a>
            <a href="#">@lensandlight.be</a>
          </div>
        </div>
        <form className="lensForm">
          <h3>Start het gesprek</h3>
          <input placeholder="Naam" />
          <input placeholder="E-mail" type="email" />
          <select defaultValue="">
            <option value="" disabled>Type sessie</option>
            <option>Portret</option>
            <option>Bruiloft</option>
            <option>Branding</option>
            <option>Architectuur</option>
            <option>Events</option>
            <option>Product</option>
          </select>
          <input placeholder="Gewenste datum (indien bekend)" />
          <textarea placeholder="Vertel me over je project, ideeën en sfeer..." rows={5} />
          <button type="button">Sessie aanvragen →</button>
        </form>
      </section>

      <footer className="lensFooter">
        <strong>Lens & Light</strong>
        <p>Fotografie · Antwerpen · België</p>
      </footer>
    </main>
  );
}
