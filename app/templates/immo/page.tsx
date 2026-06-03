"use client";

import { useState, useEffect, useRef } from "react";
import "./immo.css";

const estates = [
  {
    ref: "V-001",
    title: "The Glass Residence",
    location: "Sint-Martens-Latem",
    price: "€3.850.000",
    sqm: "620 m²",
    rooms: "5 suites",
    extras: "Wellness · Private lake",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    ref: "V-002",
    title: "Penthouse Zuid",
    location: "Antwerp",
    price: "€2.180.000",
    sqm: "260 m²",
    rooms: "3 suites",
    extras: "Skyline terrace · Concierge",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85",
  },
  {
    ref: "V-003",
    title: "Villa Monolith",
    location: "Brasschaat",
    price: "Price on request",
    sqm: "1.080 m²",
    rooms: "7 suites",
    extras: "Private estate · Poolhouse",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
  },
];

const offMarketSteps = [
  {
    nr: "01",
    title: "Silent positioning",
    text: "The property is never publicly listed. We build a curated dossier and share it only with qualified buyers.",
  },
  {
    nr: "02",
    title: "Controlled access",
    text: "Buyers are vetted. Viewings are private. The circle remains small and intentional.",
  },
  {
    nr: "03",
    title: "Discrete negotiation",
    text: "Terms are handled confidentially between advisor and party. No noise. No spectacle.",
  },
];

const stats = [
  { value: "€84M+", label: "Private volume" },
  { value: "12 yr", label: "In the market" },
  { value: "100%", label: "Off-market only" },
  { value: "3", label: "Countries active" },
];

export default function ImmoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-anim]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Nav + parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // parallax hero
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* ── Nav ── */}
      <header className={`iNav${scrolled ? " iNavScrolled" : ""}`}>
        <div className="iNavBrand">
          <strong>VANDOR</strong>
          <span>Private Real Estate</span>
        </div>
        <nav className="iNavLinks">
          <a href="#collection">Collection</a>
          <a href="#offmarket">Off-market</a>
          <a href="#method">Method</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="iNavAccess">Request access</a>
        </nav>
        <button
          className={`iHamburger${mobileOpen ? " open" : ""}`}
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile nav */}
      <nav className={`iMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#collection" onClick={() => setMobileOpen(false)}>Collection</a>
        <a href="#offmarket" onClick={() => setMobileOpen(false)}>Off-market</a>
        <a href="#method" onClick={() => setMobileOpen(false)}>Method</a>
        <a href="#contact" className="iMobileNavCta" onClick={() => setMobileOpen(false)}>Request access</a>
      </nav>

      {/* ── Hero ── */}
      <section className="iHero" id="top">
        <div className="iHeroBg" ref={heroBgRef} />
        <div className="iHeroGrad" />
        <div className="iHeroContent">
          <div className="iHeroLeft">
            <p className="iHeroLabel" data-anim="fade" data-delay="1">
              Private brokerage · Belgium
            </p>
            <h1 className="iHeroTitle" data-anim="up" data-delay="2">
              Homes for people<br />
              <em>who do not browse listings.</em>
            </h1>
            <div className="iHeroActions" data-anim="up" data-delay="3">
              <a href="#collection" className="iHeroCta">View collection</a>
              <a href="#contact" className="iHeroAlt">Request access</a>
            </div>
          </div>
          <div className="iHeroPanel" data-anim="fade" data-delay="4">
            <strong>€84M+</strong>
            <span>Private volume represented</span>
            <p>Belgium · Netherlands · France</p>
          </div>
        </div>
      </section>

      {/* ── Tagline ── */}
      <div className="iTagline">
        <blockquote data-anim="up">
          &ldquo;We do not publish everything. We do not chase everyone.
          We create a controlled, elegant and confidential path between
          property and buyer.&rdquo;
        </blockquote>
        <cite data-anim="fade" data-delay="2">Vandor Private Real Estate</cite>
      </div>

      {/* ── Stats ── */}
      <div className="iStats">
        {stats.map((s, i) => (
          <div
            className="iStat"
            key={s.label}
            data-anim="up"
            data-delay={String(i + 1) as "1" | "2" | "3" | "4"}
          >
            <span className="iStatValue">{s.value}</span>
            <span className="iStatLabel">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Collection ── */}
      <section id="collection">
        <div className="iCollectionHead">
          <div>
            <p className="iCollectionEyebrow" data-anim="fade">Selected collection</p>
            <h2 data-anim="up" data-delay="1">
              Exceptional<br /><em>properties.</em>
            </h2>
          </div>
          <a href="#contact" className="iCollectionLink" data-anim="fade" data-delay="2">
            Request private access →
          </a>
        </div>

        <div className="iEstateList">
          {estates.map((e, i) => (
            <div
              className={`iEstateRow${i % 2 === 1 ? " reverse" : ""}`}
              key={e.ref}
            >
              <div
                className="iEstatePhoto"
                data-anim={i % 2 === 0 ? "left" : "right"}
              >
                <img src={e.image} alt={e.title} loading="lazy" />
                <div className="iEstatePhotoOverlay">{e.ref}</div>
              </div>
              <div
                className="iEstateDetails"
                data-anim={i % 2 === 0 ? "right" : "left"}
                data-delay="1"
              >
                <p className="iEstateRef">{e.ref} · {e.location}</p>
                <h2 className="iEstateTitle">{e.title}</h2>
                <p className="iEstateLocation">{e.location}</p>
                <div className="iEstateSpecs">
                  <div className="iEstateSpec">
                    <strong>{e.sqm}</strong>
                    <span>Living area</span>
                  </div>
                  <div className="iEstateSpec">
                    <strong>{e.rooms}</strong>
                    <span>Rooms</span>
                  </div>
                  <div className="iEstateSpec">
                    <strong>Private</strong>
                    <span>Viewing</span>
                  </div>
                </div>
                <p className="iEstateExtras">{e.extras}</p>
                <p className="iEstatePrice">{e.price}</p>
                <a href="#contact" className="iEstateBtn">Request viewing</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Off-market ── */}
      <section className="iOffMarket" id="offmarket">
        <div className="iOffMarketInner">
          <p className="iOffEyebrow" data-anim="fade">Off-market</p>
          <h2 data-anim="up" data-delay="1">
            Some homes should<br /><em>never feel public.</em>
          </h2>
          <div className="iOffSteps">
            {offMarketSteps.map((s, i) => (
              <div
                className="iOffStep"
                key={s.nr}
                data-anim="up"
                data-delay={String(i + 1) as "1" | "2" | "3"}
              >
                <span className="iOffStepNr">{s.nr}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Method ── */}
      <section className="iMethod" id="method">
        <div className="iMethodImg" data-anim="scale">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85"
            alt="Vandor method"
            loading="lazy"
          />
        </div>
        <div className="iMethodText">
          <p className="iMethodEyebrow" data-anim="fade">The method</p>
          <h2 data-anim="up" data-delay="1">
            Architecture first.<br /><em>Sales second.</em>
          </h2>
          <p data-anim="up" data-delay="2">
            Every property is treated like a magazine feature: light, rhythm,
            materials, silence and story. Only then do we introduce it to
            the right audience.
          </p>
          <p data-anim="up" data-delay="3">
            Our process is slow by design. We would rather wait for the
            right buyer than accept the first one.
          </p>
          <a href="#contact" className="iMethodCta" data-anim="up" data-delay="4">
            Start a conversation
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="iContact" id="contact">
        <div className="iContactLeft">
          <p className="iContactEyebrow" data-anim="fade">Request access</p>
          <h2 data-anim="up" data-delay="1">
            Start with a<br /><em>private conversation.</em>
          </h2>
          <p data-anim="up" data-delay="2">
            Whether you are selling quietly or searching for a rare
            property, we begin with a confidential introduction.
          </p>
          <p data-anim="up" data-delay="3">
            Geen openbare intake. Geen massalijsten. Enkel een rustig
            gesprek om te begrijpen wat u zoekt of wenst te verkopen.
          </p>
          <div className="iContactMeta" data-anim="up" data-delay="4">
            <span>Offices</span>
            <a href="#">Antwerp · Knokke · Brussels</a>
            <a href="mailto:contact@vandor.be">contact@vandor.be</a>
            <a href="tel:+3230000000">+32 3 000 00 00</a>
          </div>
        </div>
        <div className="iContactRight">
          <form className="iContactForm" data-anim="up" data-delay="1">
            <p className="iFormLabel">Private inquiry</p>
            <div className="iFormRow">
              <input placeholder="Full name" />
              <input placeholder="Email address" type="email" />
            </div>
            <div className="iFormRow">
              <input placeholder="Phone number" type="tel" />
              <select defaultValue="">
                <option value="" disabled>I am interested in</option>
                <option>Buying — curated selection</option>
                <option>Selling — private mandate</option>
                <option>Off-market access</option>
                <option>Private valuation</option>
              </select>
            </div>
            <textarea
              placeholder="Tell us what you are looking for, or what you would like to discuss."
              rows={5}
            />
            <button type="button">Request private conversation →</button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="iFooter">
        <div className="iFooterLeft">
          <span>Antwerp · Knokke · Brussels</span>
          <span>contact@vandor.be</span>
        </div>
        <div className="iFooterCenter">
          <strong>VANDOR</strong>
          <small>Private Real Estate</small>
        </div>
        <div className="iFooterRight">
          <span>Private Brokerage</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
