"use client";

import { useState, useEffect } from "react";
import "./dental.css";

const treatments = [
  {
    nr: "01",
    title: "Preventie",
    text: "Professionele reiniging, digitale röntgenfoto's, cariësdetectie en persoonlijk poetadvies.",
    items: ["Cleaning & scaling", "Digitale scan", "Fluoridebehandeling"],
    price: "Vanaf €65",
  },
  {
    nr: "02",
    title: "Esthetiek",
    text: "Whitening, bonding, veneers en smile makeovers voor een natuurlijk, stralend resultaat.",
    items: ["Teeth whitening", "Composite bonding", "Porselein veneers"],
    price: "Op aanvraag",
  },
  {
    nr: "03",
    title: "Implants",
    text: "Digitale 3D-planning voor vaste, comfortabele implantaten — van consult tot plaatsing.",
    items: ["3D cone beam scan", "Chirurgische plaatsing", "Kroonrestauratie"],
    price: "Op aanvraag",
  },
  {
    nr: "04",
    title: "Orthodontie",
    text: "Transparante aligners en klassieke beugels voor kinderen, jongeren en volwassenen.",
    items: ["Invisalign", "Klassieke beugel", "Retainer"],
    price: "Vanaf €1.800",
  },
  {
    nr: "05",
    title: "Parodontologie",
    text: "Behandeling van tandvleesontstekingen met milde, gerichte aanpak en lange termijn opvolging.",
    items: ["Deep cleaning", "Tandvleesevaluatie", "Onderhoudsprogramma"],
    price: "Vanaf €95",
  },
  {
    nr: "06",
    title: "Spoed",
    text: "Snelle hulp bij pijn, breuk of ontsteking. Dezelfde of volgende dag behandeld.",
    items: ["Acute pijn", "Gebroken tand", "Abces behandeling"],
    price: "Dringende tarieven",
  },
];

const team = [
  {
    name: "Dr. Thomas Leclercq",
    role: "Algemeen tandarts",
    focus: "Preventie · restauraties · implantologie",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Sara Nijs",
    role: "Esthetisch tandarts",
    focus: "Smile design · veneers · whitening",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Kevin Martens",
    role: "Orthodontist",
    focus: "Invisalign · beugels · retainers",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },
];

const reviews = [
  {
    name: "Elisa V.",
    text: "Eindelijk een tandarts waar ik me op mijn gemak voel. Alles wordt rustig uitgelegd en ik voel geen druk.",
  },
  {
    name: "Jonas D.",
    text: "Mijn smile makeover is prachtig geworden. Dr. Nijs heeft echt geluisterd naar wat ik wou.",
  },
  {
    name: "Sofie M.",
    text: "Snel geholpen bij een spoedgeval. Professioneel, vriendelijk en pijnloos. Meer dan tevreden.",
  },
];

const faq = [
  ["Hoe snel kan ik een afspraak krijgen?", "Voor nieuwe patiënten streven we naar een afspraak binnen de week. Bij spoedgevallen proberen we u dezelfde dag te helpen."],
  ["Werkt Lumi met alle ziekenfondsen?", "Ja, Lumi Dental Care werkt met alle Belgische ziekenfondsen. U krijgt altijd een duidelijk kostenoverzicht voor de behandeling."],
  ["Is de behandeling pijnloos?", "We gebruiken moderne verdovingstechnieken en een rustige aanpak. Pijn vermijden is onze prioriteit bij elke behandeling."],
  ["Kan ik een gratis smile consult boeken?", "Ja, een eerste esthetisch consult is gratis en vrijblijvend. We bespreken uw wensen en tonen wat mogelijk is."],
];

const hours = [
  ["Ma", "08:00 — 18:00"],
  ["Di", "08:00 — 20:00"],
  ["Wo", "08:00 — 18:00"],
  ["Do", "08:00 — 18:00"],
  ["Vr", "08:00 — 16:00"],
];

const techFeatures = [
  { title: "3D Cone Beam CT", desc: "Millimeterprecieze 3D-scan" },
  { title: "Digitale röntgen", desc: "90% minder straling" },
  { title: "Intra-orale camera", desc: "Live beeld van uw gebit" },
  { title: "CAD/CAM kronen", desc: "Dag-klare keramiek kronen" },
];

export default function DentalPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-anim]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.setAttribute("data-visible", ""); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      {/* Nav */}
      <header className={`dNav${scrolled ? " scrolled" : ""}`}>
        <div className="dNavBrand">
          <strong>LUMI</strong>
          <span>Dental Care · Antwerpen</span>
        </div>
        <div className="dNavLinks">
          <a href="#treatments">Treatments</a>
          <a href="#technology">Technology</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="dNavRight">
          <a href="#contact" className="dNavBook">Afspraak →</a>
          <button
            className={`dHamburger${mobileOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`dMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#treatments" onClick={() => setMobileOpen(false)}>Treatments</a>
        <a href="#technology" onClick={() => setMobileOpen(false)}>Technology</a>
        <a href="#team" onClick={() => setMobileOpen(false)}>Team</a>
        <a href="#contact" className="dMobileBook" onClick={() => setMobileOpen(false)}>Afspraak boeken</a>
      </nav>

      {/* Hero */}
      <section className="dHero" id="home">
        <div className="dHeroLeft">
          <p className="dHeroEyebrow" data-anim="fade">Modern dental care · Antwerpen</p>
          <h1 className="dHeroTitle" data-anim="up" data-delay="1">
            The future of<br />your <em>smile.</em>
          </h1>
          <p className="dHeroSub" data-anim="up" data-delay="2">
            Lumi Dental Care combineert digitale precisietechnologie met
            een rustige, persoonlijke aanpak. Heldere uitleg, pijnloze technieken
            en zichtbare resultaten.
          </p>
          <div className="dHeroActions" data-anim="up" data-delay="3">
            <a href="#contact" className="dHeroPrimary">Afspraak boeken</a>
            <a href="#treatments" className="dHeroSecondary">Bekijk behandelingen</a>
          </div>
        </div>
        <div className="dHeroRight">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=85"
            alt="Lumi Dental Care clinic"
          />
          <div className="dHeroBadge" data-anim="fade" data-delay="4">
            <strong>Nieuwe patiënten welkom</strong>
            <span>Controle · Esthetiek · Spoed</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="dStats">
        {[
          ["3.200+", "", "Patiënten"],
          ["4.9", "★", "Google beoordeling"],
          ["3", "", "Gespecialiseerde artsen"],
          ["100%", "", "Digitale technologie"],
        ].map(([val, suffix, label], i) => (
          <div className="dStat" key={label} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"|"4"}>
            <span className="dStatValue">{val}<span>{suffix}</span></span>
            <span className="dStatLabel">{label}</span>
          </div>
        ))}
      </div>

      {/* Approach */}
      <section className="dApproach">
        <div className="dApproachHead">
          <p className="dApproachEyebrow" data-anim="fade">Onze aanpak</p>
          <h2 data-anim="up" data-delay="1">Eerst begrijpen,<br /><em>dan behandelen.</em></h2>
        </div>
        <div className="dApproachGrid">
          {[
            { nr: "01", title: "We luisteren eerst.", text: "Je klachten, vragen en doelen worden rustig besproken voor we beginnen. Geen haast, geen druk." },
            { nr: "02", title: "We tonen alles.", text: "Foto's, scans en 3D-beelden maken zichtbaar wat er precies gebeurt. Je ziet mee, in real time." },
            { nr: "03", title: "Jij kiest bewust.", text: "Je krijgt opties, timing en kosten — altijd volledig helder, nooit onder druk. Jij beslist." },
          ].map((step, i) => (
            <div className="dApproachCard" key={step.nr} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
              <div className="dApproachNr">{step.nr}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="dTreatments">
        <div className="dTreatHead">
          <p className="dTreatEyebrow" data-anim="fade">Behandelingen</p>
          <h2 data-anim="up" data-delay="1">Zorg voor elke fase<br />van uw gebit.</h2>
        </div>
        <div className="dTreatGrid">
          {treatments.map((t, i) => (
            <div className="dTreatCard" key={t.nr} data-anim="up" data-delay={String((i % 3) + 1) as "1"|"2"|"3"}>
              <span className="dTreatNr">{t.nr}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <ul className="dTreatItems">
                {t.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="dTreatFooter">
                <span className="dTreatPrice">{t.price}</span>
                <a href="#contact" className="dTreatCta">Boek consult →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="dTech">
        <div className="dTechLeft">
          <p className="dTechEyebrow" data-anim="fade">Technologie</p>
          <h2 data-anim="up" data-delay="1">Digitale precisie.<br /><em>Betere uitkomsten.</em></h2>
          <p data-anim="up" data-delay="2">
            Lumi investeert continu in de nieuwste tandheelkundige technologie.
            Elke diagnose is datagedreven, elke behandeling millimeterprecies gepland.
          </p>
          <div className="dTechFeatures" data-anim="up" data-delay="3">
            {techFeatures.map((f) => (
              <div className="dTechFeature" key={f.title}>
                <strong>{f.title}</strong>
                <span>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dTechRight" data-anim="scale">
          <img
            src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=85"
            alt="Dental technology Lumi"
            loading="lazy"
          />
        </div>
      </section>

      {/* Team */}
      <section id="team" className="dTeam">
        <div className="dTeamHead">
          <p className="dTeamEyebrow" data-anim="fade">Het team</p>
          <h2 data-anim="up" data-delay="1">Specialisten met een<br />menselijke aanpak.</h2>
        </div>
        <div className="dTeamGrid">
          {team.map((member, i) => (
            <div className="dTeamCard" key={member.name} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
              <div className="dTeamImg">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <div className="dTeamInfo">
                <h3>{member.name}</h3>
                <span className="dTeamRole">{member.role}</span>
                <span className="dTeamFocus">{member.focus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="dReviews">
        <div className="dReviewHead">
          <p className="dReviewEyebrow" data-anim="fade">Patiënten</p>
          <h2 data-anim="up" data-delay="1">Vertrouwen opgebouwd,<br />behandeling na behandeling.</h2>
        </div>
        <div className="dReviewGrid">
          {reviews.map((r, i) => (
            <div className="dReviewCard" key={r.name} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
              <div className="dReviewStars">★★★★★</div>
              <p className="dReviewText">&ldquo;{r.text}&rdquo;</p>
              <span className="dReviewAuthor">{r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="dFaq">
        <div className="dFaqHead">
          <p className="dFaqEyebrow" data-anim="fade">FAQ</p>
          <h2 data-anim="up" data-delay="1">Veelgestelde vragen.</h2>
        </div>
        <div className="dFaqList">
          {faq.map(([q, a], i) => (
            <div className="dFaqItem" key={q} data-anim="up" data-delay={String((i % 2) + 1) as "1"|"2"}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="dContact">
        <div className="dContactLeft">
          <p className="dContactEyebrow" data-anim="fade">Afspraak</p>
          <h2 data-anim="up" data-delay="1">Plan je bezoek<br />bij <em>Lumi.</em></h2>
          <p data-anim="up" data-delay="2">
            Nieuwe patiënten zijn welkom. Bij pijnklachten zoeken we zo snel mogelijk
            een plek — vaak dezelfde dag.
          </p>
          <div className="dContactHours" data-anim="up" data-delay="3">
            <span className="dContactHoursLabel">Openingsuren</span>
            {hours.map(([day, time]) => (
              <div className="dContactHoursRow" key={day}>
                <span>{day}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>
          <div className="dContactMeta" data-anim="up" data-delay="4">
            <a href="#">Meir 82, 2000 Antwerpen</a>
            <a href="tel:+3230000000">+32 3 000 00 00</a>
            <a href="mailto:info@lumidental.be">info@lumidental.be</a>
          </div>
        </div>
        <div className="dContactRight">
          <form className="dForm" data-anim="up" data-delay="1">
            <p className="dFormLabel">Afspraak aanvragen</p>
            <div className="dFormRow">
              <input placeholder="Naam" />
              <input placeholder="E-mailadres" type="email" />
            </div>
            <input placeholder="Telefoonnummer" type="tel" />
            <select defaultValue="">
              <option value="" disabled>Type afspraak</option>
              <option>Controle & reiniging</option>
              <option>Pijnklacht (spoed)</option>
              <option>Esthetisch consult (gratis)</option>
              <option>Implant consult</option>
              <option>Orthodontie intake</option>
            </select>
            <textarea placeholder="Korte toelichting (optioneel)" rows={4} />
            <button type="button">Afspraak aanvragen →</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="dFooter">
        <div className="dFooterBrand">
          <strong>LUMI</strong>
          <span>Dental Care</span>
        </div>
        <div className="dFooterMeta">
          <span>Meir 82, 2000 Antwerpen</span>
          <span>info@lumidental.be</span>
        </div>
        <span className="dFooterCopy">© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
