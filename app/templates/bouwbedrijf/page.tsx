"use client";

import { useState, useEffect, useRef } from "react";
import "./brixon.css";

const projects = [
  {
    ref: "P-001",
    name: "Monolith House",
    location: "Brasschaat · 840 m²",
    tag: "Private villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    large: true,
  },
  {
    ref: "P-002",
    name: "West Tower",
    location: "Antwerp · 4.200 m²",
    tag: "Commercial",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=85",
    large: false,
  },
  {
    ref: "P-003",
    name: "The Slate",
    location: "Ghent · 320 m²",
    tag: "Renovation",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85",
    large: false,
  },
];

const services = [
  {
    nr: "01",
    title: "Luxury Homes",
    desc: "Architectural new-builds with integrated technical coordination, premium materials and precision finishing. From structural shell to final detail.",
    tags: ["New build", "Structural execution", "Integrated planning", "Premium finish"],
  },
  {
    nr: "02",
    title: "Total Renovation",
    desc: "Complete transformations: demolition, rebuild, technical upgrades and luxury interiors. Every element replaced with purpose.",
    tags: ["Strip & rebuild", "Structural adaptation", "Technical upgrade", "Custom finish"],
  },
  {
    nr: "03",
    title: "Commercial Build",
    desc: "Retail, hospitality and corporate environments built to strict deadlines with full coordination and detailed execution control.",
    tags: ["Retail", "Hospitality", "Office", "Corporate"],
  },
];

const processSteps = [
  { nr: "01", title: "Technical intake", desc: "Full site analysis, scope definition and feasibility study. We know the project before we price it." },
  { nr: "02", title: "Project planning", desc: "Phased planning with fixed milestones, subcontractor coordination and delivery schedule." },
  { nr: "03", title: "Site execution", desc: "Dedicated site manager on every project. Daily control, weekly reporting, zero surprises." },
  { nr: "04", title: "Quality delivery", desc: "Final inspection protocol, snag list close-out and full handover documentation." },
];

const tickerItems = ["Precision", "Execution", "18 Years", "240 Projects", "Brixon Construct", "On Time", "On Budget", "Quality Control"];

const stats = [
  { value: "18Y", label: "Industry experience" },
  { value: "240+", label: "Completed projects" },
  { value: "€84M", label: "Construction volume" },
  { value: "98%", label: "Delivery on schedule" },
];

export default function BrixonPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      }
    };
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
      <header className={`bxNav${scrolled ? " scrolled" : ""}`}>
        <div className="bxNavBrand">
          <strong>BRIXON</strong>
          <span>Construct · Belgium</span>
        </div>
        <div className="bxNavLinks">
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="bxNavRight">
          <a href="#contact" className="bxNavCta">Request quote</a>
          <button
            className={`bxHamburger${mobileOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`bxMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a>
        <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
        <a href="#process" onClick={() => setMobileOpen(false)}>Process</a>
        <a href="#contact" className="bxMobileNavCta" onClick={() => setMobileOpen(false)}>Request quote</a>
      </nav>

      {/* Hero */}
      <section className="bxHero">
        <div className="bxHeroBg" ref={heroBgRef} />
        <div className="bxHeroGrad" />
        <div className="bxHeroContent">
          <div>
            <p className="bxHeroLabel" data-anim="fade">Construction · Belgium</p>
            <h1 className="bxHeroTitle" data-anim="up" data-delay="1">
              Built with<br />
              <em>precision.</em>
            </h1>
            <p className="bxHeroSub" data-anim="up" data-delay="2">
              Brixon develops high-end residential and commercial projects
              with strict coordination, technical preparation and premium execution.
            </p>
            <div className="bxHeroActions" data-anim="up" data-delay="3">
              <a href="#projects" className="bxHeroPrimary">View projects</a>
              <a href="#process" className="bxHeroSecondary">Our process</a>
            </div>
          </div>
          <div className="bxHeroPanel" data-anim="fade" data-delay="4">
            <div className="bxHeroPanelTop">
              <span>Live sites</span>
              <strong>24 active</strong>
            </div>
            <div className="bxHeroPanelRows">
              <div className="bxHeroPanelRow">
                <span>Site managers</span>
                <strong>06</strong>
              </div>
              <div className="bxHeroPanelRow">
                <span>Delivery score</span>
                <strong>98%</strong>
              </div>
              <div className="bxHeroPanelRow">
                <span>Active volume</span>
                <strong>€14M</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bxTicker">
        <div className="bxTickerInner">
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {tickerItems.map((item, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center" }}>
                  <span className="bxTickerItem">{item}</span>
                  <span className="bxTickerSep"> · </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bxStats">
        {stats.map((s, i) => (
          <div className="bxStat" key={s.label} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"|"4"}>
            <span className="bxStatValue">{s.value}</span>
            <span className="bxStatLabel">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Projects */}
      <section id="projects" className="bxProjects">
        <div className="bxProjectsHead">
          <div>
            <p className="bxProjectsEyebrow" data-anim="fade">Selected work</p>
            <h2 data-anim="up" data-delay="1">Projects built<br /><em>to last.</em></h2>
          </div>
          <a href="#contact" className="bxProjectsLink" data-anim="fade" data-delay="2">All projects →</a>
        </div>
        <div className="bxProjectGrid">
          {projects.map((p, i) => (
            <div className={`bxProject${p.large ? " large" : ""}`} key={p.ref} data-anim={i === 0 ? "left" : "right"} data-delay={String(i + 1) as "1"|"2"|"3"}>
              <img src={p.image} alt={p.name} loading="lazy" />
              <div className="bxProjectOverlay">
                <p className="bxProjectRef">{p.ref}</p>
                <p className="bxProjectName">{p.name}</p>
                <p className="bxProjectMeta">{p.location}</p>
              </div>
              <span className="bxProjectTag">{p.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bxServices">
        <div className="bxServicesHead">
          <p className="bxServicesEyebrow" data-anim="fade">What we build</p>
          <h2 data-anim="up" data-delay="1">Three divisions.<br /><em>One standard.</em></h2>
        </div>
        <div className="bxServiceList">
          {services.map((s, i) => (
            <div className="bxServiceRow" key={s.nr} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"}>
              <span className="bxServiceNr">{s.nr}</span>
              <div className="bxServiceBody">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="bxServiceTags">
                  {s.tags.map((t) => <span className="bxServiceTag" key={t}>{t}</span>)}
                </div>
              </div>
              <span className="bxServiceArrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bxProcess">
        <div className="bxProcessHead">
          <p className="bxProcessEyebrow" data-anim="fade">How we work</p>
          <h2 data-anim="up" data-delay="1">Structure before<br /><em>concrete.</em></h2>
        </div>
        <div className="bxProcessGrid">
          {processSteps.map((step, i) => (
            <div className="bxProcessCard" key={step.nr} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"|"4"}>
              <span className="bxProcessNr">{step.nr}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <span className="bxProcessAccent" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured project */}
      <section className="bxFeature">
        <div className="bxFeatureImg" data-anim="scale">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85"
            alt="Brixon featured project"
            loading="lazy"
          />
        </div>
        <div className="bxFeatureText">
          <p className="bxFeatureEyebrow" data-anim="fade">Featured project</p>
          <h2 data-anim="up" data-delay="1">Monolith<br /><em>House.</em></h2>
          <p data-anim="up" data-delay="2">
            A private villa in Brasschaat focused on architectural geometry,
            hidden technical integrations and extreme execution precision.
            Custom poured concrete, floor-to-ceiling glass and embedded climate control.
          </p>
          <div className="bxFeatureMeta" data-anim="up" data-delay="3">
            <div className="bxFeatureMetaItem">
              <span>Project type</span>
              <strong>Private villa</strong>
            </div>
            <div className="bxFeatureMetaItem">
              <span>Surface</span>
              <strong>840 m²</strong>
            </div>
            <div className="bxFeatureMetaItem">
              <span>Timeline</span>
              <strong>14 months</strong>
            </div>
            <div className="bxFeatureMetaItem">
              <span>Location</span>
              <strong>Brasschaat</strong>
            </div>
          </div>
          <a href="#contact" className="bxFeatureCta" data-anim="up" data-delay="4">Start your project</a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bxContact">
        <div className="bxContactLeft">
          <p className="bxContactEyebrow" data-anim="fade">Start a project</p>
          <h2 data-anim="up" data-delay="1">Build with<br />control.</h2>
          <p data-anim="up" data-delay="2">
            Describe your project, planning and expected finish level.
            We schedule a technical intake to analyse scope and structure.
          </p>
          <div className="bxContactMeta" data-anim="up" data-delay="3">
            <span>Offices</span>
            <a href="#">Antwerp · Ghent · Brasschaat</a>
            <a href="mailto:info@brixon.be">info@brixon.be</a>
            <a href="tel:+3230000000">+32 3 000 00 00</a>
          </div>
        </div>
        <div className="bxContactRight">
          <form className="bxForm" data-anim="up" data-delay="1">
            <p className="bxFormLabel">Project intake</p>
            <div className="bxFormRow">
              <input placeholder="Full name" />
              <input placeholder="Email address" type="email" />
            </div>
            <input placeholder="Phone number" type="tel" />
            <select defaultValue="">
              <option value="" disabled>Project type</option>
              <option>Luxury home — new build</option>
              <option>Total renovation</option>
              <option>Commercial build</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Describe your project, location and timeline." rows={5} />
            <button type="button">Request intake →</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bxFooter">
        <div className="bxFooterLogo">
          <strong>BRIXON</strong>
          <span>Construct · Belgium</span>
        </div>
        <span className="bxFooterCenter">Precision-led construction · Est. 2006</span>
        <div className="bxFooterRight">
          <span>Antwerp · Ghent · Brasschaat</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
