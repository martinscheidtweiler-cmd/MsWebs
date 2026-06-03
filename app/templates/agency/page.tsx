import "./agency.css";

const services = [
  {
    nr: "01",
    title: "Brand Strategy",
    text: "Positionering, identiteit en merkstrategie voor bedrijven die willen opvallen in hun markt.",
    items: ["Brand positioning", "Visual identity", "Tone of voice", "Brand guidelines"],
  },
  {
    nr: "02",
    title: "Web & Digital",
    text: "Premium websites, campagnepagina's en digitale ervaringen die converteren en imponeren.",
    items: ["Website design", "CRO & UX", "Landing pages", "Design systems"],
  },
  {
    nr: "03",
    title: "Content & Creative",
    text: "Van campagneconcept tot copywriting, video en social content die jouw merk laat leven.",
    items: ["Campagneconcepten", "Copywriting", "Video productie", "Social media"],
  },
  {
    nr: "04",
    title: "Performance Marketing",
    text: "Gerichte campagnes op Meta, Google en LinkedIn die leads genereren en omzet verhogen.",
    items: ["Meta & Google Ads", "LinkedIn campaigns", "Retargeting", "Analytics & reporting"],
  },
  {
    nr: "05",
    title: "SEO & Groei",
    text: "Organische groei door technische SEO, content strategie en autoriteitsopbouw.",
    items: ["Technische SEO", "Content strategie", "Linkbuilding", "Lokale SEO"],
  },
  {
    nr: "06",
    title: "Email & Automation",
    text: "Geautomatiseerde e-mailflows en nurture sequences die verkopen terwijl jij slaapt.",
    items: ["Email flows", "Segmentatie", "A/B testing", "CRM integratie"],
  },
];

const cases = [
  {
    nr: "01",
    title: "Renovate Group",
    desc: "Volledige rebrand + website voor een Belgische bouwgroep. +340% organisch verkeer.",
    tag: "Brand + Web",
  },
  {
    nr: "02",
    title: "Bloom Cosmetics",
    desc: "Launch campagne voor een D2C beauty merk. €120K omzet in eerste 30 dagen.",
    tag: "Performance",
  },
  {
    nr: "03",
    title: "Atlas Capital",
    desc: "Premium website en LinkedIn strategie voor een private equity firma in Brussel.",
    tag: "Brand + Content",
  },
  {
    nr: "04",
    title: "Velox Logistics",
    desc: "Brand identity, website en Google Ads setup voor B2B logistiek. 3x meer leads.",
    tag: "Volledig traject",
  },
];

const team = [
  {
    name: "Axel Martens",
    role: "Creative Director",
    focus: "Brand strategy, design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lena De Wolf",
    role: "Head of Digital",
    focus: "Performance, SEO, web",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jonas Claes",
    role: "Content Strategist",
    focus: "Copy, video, social",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ines Verhoeven",
    role: "UX Lead",
    focus: "Website design, CRO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
];

const testimonials = [
  {
    quote: "Bloc heeft onze brand volledig getransformeerd. Van positionering tot website — alles klopt nu en dat voelt onmiddellijk in onze sales.",
    name: "Thomas R.",
    role: "CEO, Renovate Group",
  },
  {
    quote: "Onze productlancering was een succes dankzij hun campagne aanpak. Scherp, snel en resultaatgericht. Niet de goedkoopste, wel de beste keuze.",
    name: "Elisa V.",
    role: "Founder, Bloom Cosmetics",
  },
  {
    quote: "Ze begrijpen onze sector, ons publiek en onze tone of voice beter dan wij dat soms zelf deden. Dat maakt een enorm verschil.",
    name: "Marc D.",
    role: "Partner, Atlas Capital",
  },
];

const clients = ["Renovate Group", "Bloom Cosmetics", "Atlas Capital", "Velox Logistics", "Studio Nora", "BelPharma", "Nomad Hotels"];

export default function AgencyPage() {
  return (
    <main className="agencyPage">
      <nav className="agencyNav">
        <a href="#home" className="agencyBrand">BL<span>O</span>C</a>
        <nav>
          <a href="#services">Services</a>
          <a href="#cases">Cases</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="agencyNavBtn">Start project</a>
        </nav>
      </nav>

      <section className="agencyHero" id="home">
        <div className="agencyHeroBg" />
        <div className="agencyHeroEye">
          <span /> Marketing agency · Antwerpen · Est. 2018
        </div>
        <h1>
          We build<br />
          <em>brands that</em><br />
          convert.
        </h1>
        <div className="agencyHeroBottom">
          <p>
            Bloc is een full-service marketing agency voor bedrijven die willen
            groeien met strategie, creativiteit en meetbare resultaten.
          </p>
          <div>
            <div className="agencyHeroActions">
              <a href="#contact" className="agencyBtnPrimary">Start een project</a>
              <a href="#cases" className="agencyBtnSecondary">Bekijk cases</a>
            </div>
          </div>
        </div>
      </section>

      <div className="agencyClients">
        <span>Klanten</span>
        <div className="agencyClientList">
          {[...clients, ...clients, ...clients].map((c, i) => (
            <strong key={i}>{c}</strong>
          ))}
        </div>
      </div>

      <section className="agencyServices" id="services">
        <div className="agencySectionLabel">Wat we doen</div>
        <div className="agencyServicesGrid">
          {services.map((s) => (
            <div key={s.nr} className="agencyServiceCard">
              <span>{s.nr}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="agencyCases" id="cases">
        <div className="agencySectionLabel">Selected work</div>
        <div className="agencySectionHead">
          <h2>Cases die<br />spreken.</h2>
        </div>
        <div className="agencyCaseList">
          {cases.map(({ nr, title, desc, tag }) => (
            <div key={nr} className="agencyCaseItem">
              <span className="agencyCaseNr">{nr}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="agencyCaseTag">{tag}</span>
              <span className="agencyCaseArrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      <div className="agencyNumbers">
        <div className="agencyNumberItem"><strong>80+</strong><span>Projecten afgerond</span></div>
        <div className="agencyNumberItem"><strong>€4M+</strong><span>Ad spend beheerd</span></div>
        <div className="agencyNumberItem"><strong>94%</strong><span>Client retentie</span></div>
        <div className="agencyNumberItem"><strong>6jr</strong><span>In de markt</span></div>
      </div>

      <section className="agencyTeam" id="team">
        <div className="agencySectionLabel">Het team</div>
        <div className="agencyTeamGrid">
          {team.map(({ name, role, focus, image }) => (
            <div key={name} className="agencyTeamCard">
              <div className="agencyTeamImg">
                <img src={image} alt={name} />
              </div>
              <div className="agencyTeamInfo">
                <h3>{name}</h3>
                <strong>{role}</strong>
                <p>{focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="agencyTestimonials">
        <div className="agencySectionLabel">Wat klanten zeggen</div>
        <div className="agencyTestGrid">
          {testimonials.map((t) => (
            <div key={t.name} className="agencyTestCard">
              <div className="agencyTestStars">★★★★★</div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="agencyTestAuthor">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="agencyContact" id="contact">
        <div className="agencyContactLeft">
          <span>Start project</span>
          <h2>Laten we<br />bouwen.</h2>
          <p>
            Vertel ons over je project, je doelen en je budget. We sturen
            binnen 24 uur een voorstel voor een eerste gesprek.
          </p>
          <div className="agencyContactLinks">
            <a href="mailto:hello@bloc.agency">hello@bloc.agency</a>
            <a href="tel:+32470000000">+32 470 000 000</a>
            <a href="#">Antwerpen · Brussel · Remote</a>
          </div>
        </div>
        <form className="agencyForm">
          <h3>Start het gesprek</h3>
          <input placeholder="Naam & bedrijf" />
          <input placeholder="E-mail" type="email" />
          <select defaultValue="">
            <option value="" disabled>Type project</option>
            <option>Brand strategy</option>
            <option>Website design</option>
            <option>Performance marketing</option>
            <option>Content & creative</option>
            <option>Volledig traject</option>
          </select>
          <input placeholder="Budget indicatie (optioneel)" />
          <textarea placeholder="Beschrijf je project, doelen en timeline..." rows={5} />
          <button type="button">Project aanvragen ↗</button>
        </form>
      </section>

      <footer className="agencyFooter">
        <strong>BL<span>O</span>C</strong>
        <p>Marketing agency · Antwerpen · Est. 2018</p>
      </footer>
    </main>
  );
}
