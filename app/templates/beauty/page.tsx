"use client";

import { useState, useEffect } from "react";
import "./beauty.css";

const rituals = [
  { nr: "01", title: "Skin Analysis", text: "Elke behandeling begint met een rustige huidanalyse. Geen aannames, geen haast.", price: "Complimentary" },
  { nr: "02", title: "Signature Facial", text: "Deep cleanse, glow mask en een sculpting massage op maat van jouw huid.", price: "€95" },
  { nr: "03", title: "Skin Reset", text: "Milde peeling, intensieve hydratatietherapie en LED-afsluiting voor stralende huid.", price: "€135" },
  { nr: "04", title: "Body Ritual", text: "Zachte exfoliatie, warme olie en een ontspannend lymfedrainage-massage protocol.", price: "€120" },
];

const treatments = [
  { nr: "01", title: "Signature Facial", desc: "Deep cleanse · glow mask · sculpt massage · LED finish", price: "€95" },
  { nr: "02", title: "Skin Reset", desc: "Peeling · hydration therapy · brightening mask · LED", price: "€135" },
  { nr: "03", title: "Brow & Lash Lift", desc: "Soft shaping · tinting · natural lift · keratin boost", price: "€75" },
  { nr: "04", title: "Body Ritual", desc: "Exfoliation · warm oil · lymphatic flow · pressure points", price: "€120" },
  { nr: "05", title: "Glow Package", desc: "Signature facial + brow shaping + skin consultation", price: "€155" },
  { nr: "06", title: "Bride Prep", desc: "3-session skin plan · trial facial · event-day glow", price: "€310" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85", alt: "Facial treatment", tall: true },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=85", alt: "Skincare products" },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=700&q=85", alt: "Beauty ritual" },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=85", alt: "Glow skin" },
  { src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=85", alt: "Beauty atelier" },
];

const tickerItems = ["Skin · Beauty", "Ritual · Glow", "Atelier · Calm", "Pure Radiance", "Soft Luxury", "By Appointment"];

export default function BeautyPage() {
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
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      {/* Nav */}
      <header className={`bNav${scrolled ? " bNavScrolled" : ""}`}>
        <a href="#home" className="bNavLogo">
          <strong>Belle Âme</strong>
          <span>Beauty Atelier · Antwerp</span>
        </a>
        <nav className="bNavLinks">
          <a href="#rituals">Rituals</a>
          <a href="#treatments">Treatments</a>
          <a href="#studio">Studio</a>
          <a href="#contact" className="bNavBook">Book now</a>
        </nav>
        <button className={`bHamburger${mobileOpen ? " open" : ""}`} aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </header>
      <nav className={`bMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#rituals" onClick={() => setMobileOpen(false)}>Rituals</a>
        <a href="#treatments" onClick={() => setMobileOpen(false)}>Treatments</a>
        <a href="#studio" onClick={() => setMobileOpen(false)}>Studio</a>
        <a href="#contact" className="bMobileBook" onClick={() => setMobileOpen(false)}>Book now</a>
      </nav>

      {/* Hero */}
      <section className="bHero" id="home">
        <div className="bHeroLeft">
          <p className="bHeroEyebrow" data-anim="fade">Skin · Brows · Body rituals · Antwerp</p>
          <h1 className="bHeroTitle" data-anim="up" data-delay="1">
            Soft beauty,<br /><em>quietly elevated.</em>
          </h1>
          <p className="bHeroSub" data-anim="up" data-delay="2">
            Belle Âme is een rustig beauty atelier waar huidverbetering,
            natuurlijke schoonheid en zachte luxe samenkomen.
          </p>
          <div className="bHeroActions" data-anim="up" data-delay="3">
            <a href="#contact" className="bHeroPrimary">Book appointment</a>
            <a href="#treatments" className="bHeroSecondary">View treatments</a>
          </div>
        </div>
        <div className="bHeroRight">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85"
            alt="Belle Âme Beauty Atelier"
          />
          <div className="bHeroFloatCard">
            <strong>4.9 / 5</strong>
            <span>800+ behandelingen</span>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bTicker">
        <div className="bTickerInner">
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {tickerItems.map((item, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center" }}>
                  <span className="bTickerItem">{item}</span>
                  <span className="bTickerDot">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <section className="bPhilosophy">
        <p className="bPhilosophyLabel" data-anim="fade">Our philosophy</p>
        <p className="bPhilosophyQuote" data-anim="up" data-delay="1">
          &ldquo;No rush. No hard selling. Just calm treatments,
          honest advice and skin that feels like yours — only better.&rdquo;
        </p>
      </section>

      {/* Stats */}
      <div className="bStats">
        {[
          ["800+", "Behandelingen"],
          ["4.9★", "Gemiddelde score"],
          ["100%", "Persoonlijk"],
          ["1", "Klant per moment"],
        ].map(([v, l], i) => (
          <div className="bStat" key={l} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"|"4"}>
            <span className="bStatValue">{v}</span>
            <span className="bStatLabel">{l}</span>
          </div>
        ))}
      </div>

      {/* Rituals */}
      <section id="rituals">
        <div className="bRitualsWrap">
          <div className="bSectionTop">
            <div>
              <p className="bSectionEyebrow" data-anim="fade">How we work</p>
              <h2 data-anim="up" data-delay="1">Every visit follows<br /><em>a slower rhythm.</em></h2>
            </div>
          </div>
          <div className="bRitualList">
            {rituals.map((r, i) => (
              <div className="bRitualRow" key={r.nr} data-anim="up" data-delay={String(i + 1) as "1"|"2"|"3"|"4"}>
                <span className="bRitualNr">{r.nr}</span>
                <div className="bRitualBody">
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
                <span className="bRitualPrice">{r.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="bTreatWrap">
        <div className="bTreatInner">
          <div className="bSectionTop">
            <div>
              <p className="bSectionEyebrow" data-anim="fade">Treatment menu</p>
              <h2 data-anim="up" data-delay="1">Designed for<br /><em>natural results.</em></h2>
            </div>
          </div>
          <div className="bTreatList">
            {treatments.map((t, i) => (
              <div className="bTreatRow" key={t.nr} data-anim="up" data-delay={String((i % 4) + 1) as "1"|"2"|"3"|"4"}>
                <span className="bTreatNr">{t.nr}</span>
                <span className="bTreatName">{t.title}</span>
                <span className="bTreatDesc">{t.desc}</span>
                <span className="bTreatPrice">{t.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="bStudio" id="studio">
        <div className="bStudioImgWrap" data-anim="scale">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85"
            alt="Belle Âme studio"
            loading="lazy"
          />
        </div>
        <div className="bStudioText">
          <p className="bStudioEyebrow" data-anim="fade">The studio</p>
          <h2 data-anim="up" data-delay="1">A quiet room for<br /><em>skin, rest and confidence.</em></h2>
          <p data-anim="up" data-delay="2">
            Het atelier is bewust klein gehouden. Eén klant per moment,
            zachte geuren en warme materialen die rust uitstralen.
          </p>
          <p data-anim="up" data-delay="3">
            800+ behandelingen. Eén ding blijft gelijk: persoonlijke
            aandacht zonder ruis, haast of druk.
          </p>
          <a href="#contact" className="bStudioCta" data-anim="up" data-delay="4">Book your session</a>
        </div>
      </section>

      {/* Gallery */}
      <div className="bGallery">
        {gallery.map((img, i) => (
          <div className={`bGalleryItem${img.tall ? " tall" : ""}`} key={i}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Contact */}
      <section className="bContact" id="contact">
        <div className="bContactLeft">
          <p className="bContactEyebrow" data-anim="fade">Book your moment</p>
          <h2 data-anim="up" data-delay="1">Start with a<br /><em>calm consultation.</em></h2>
          <p data-anim="up" data-delay="2">
            Kies je behandeling of boek eerst een korte skin intake.
            We bekijken samen wat je huid echt nodig heeft.
          </p>
          <p data-anim="up" data-delay="3">
            Elke afspraak is individueel. Geen wachtzaal. Geen haast.
          </p>
          <div className="bContactMeta" data-anim="up" data-delay="4">
            <span>Contact</span>
            <a href="#">Antwerp · Appointments only</a>
            <a href="mailto:hello@belleame.be">hello@belleame.be</a>
            <a href="tel:+3230000000">+32 3 000 00 00</a>
          </div>
        </div>
        <div className="bContactRight">
          <form className="bForm" data-anim="up" data-delay="1">
            <p className="bFormLabel">Request appointment</p>
            <div className="bFormRow">
              <input placeholder="Your name" />
              <input placeholder="Email address" type="email" />
            </div>
            <input placeholder="Phone number" type="tel" />
            <select defaultValue="">
              <option value="" disabled>Choose treatment</option>
              <option>Signature Facial — €95</option>
              <option>Skin Reset — €135</option>
              <option>Brow & Lash Lift — €75</option>
              <option>Body Ritual — €120</option>
              <option>Glow Package — €155</option>
              <option>Bride Prep — €310</option>
              <option>Skin intake (free)</option>
            </select>
            <input placeholder="Preferred date" type="date" />
            <textarea placeholder="Any skin concerns or questions?" rows={4} />
            <button type="button">Request appointment →</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bFooter">
        <span className="bFooterLogo">Belle Âme</span>
        <span className="bFooterSub">Beauty Atelier · Antwerp · By appointment only</span>
      </footer>
    </main>
  );
}
