"use client";
import { useState, useEffect } from "react";
import "./horizon.css";

export default function HorizonHomesTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`hhNav${scrolled ? " hhNavScrolled" : ""}`}>
        <div className="hhLogo">Horizon<span>.</span>Homes</div>
        <div className="hhNavLinks">
          <a href="#">Kopen</a>
          <a href="#">Huren</a>
          <a href="#">Nieuwbouw</a>
          <a href="#">Schattingen</a>
          <a href="#">Over ons</a>
        </div>
        <button className="hhNavBtn">Contact opnemen</button>
      </nav>

      <section className="hhHero">
        <div className="hhHeroBg">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85" alt="Dream home" />
        </div>
        <div className="hhHeroOverlay" />
        <div className="hhHeroContent">
          <div className="hhHeroPill">357 woningen beschikbaar</div>
          <h1 className="hhHeroTitle">
            Vind jouw<br /><em>droomwoning</em>
          </h1>
          <p className="hhHeroSub">
            Van sfeervolle stadsappartementen tot landelijke villa's — Horizon Homes begeleidt u in elke stap van uw vastgoedzoektocht.
          </p>
          <div className="hhHeroBtns">
            <button className="hhBtn">Woningen bekijken</button>
            <button className="hhBtnGhost">Gratis schatting</button>
          </div>
        </div>
      </section>

      <div className="hhSearch">
        <div className="hhSearchBox">
          <div className="hhSearchField">
            <label>Type woning</label>
            <select><option>Appartement</option><option>Huis</option><option>Villa</option><option>Grond</option></select>
          </div>
          <div className="hhSearchDivider" />
          <div className="hhSearchField">
            <label>Gemeente</label>
            <input type="text" placeholder="Antwerpen, Gent..." />
          </div>
          <div className="hhSearchDivider" />
          <div className="hhSearchField">
            <label>Max. prijs</label>
            <select><option>€ 300.000</option><option>€ 450.000</option><option>€ 600.000</option><option>€ 1.000.000+</option></select>
          </div>
          <div className="hhSearchDivider" />
          <div className="hhSearchField">
            <label>Min. slaapkamers</label>
            <select><option>1</option><option>2</option><option>3</option><option>4+</option></select>
          </div>
          <button className="hhSearchBtn">🔍 Zoeken</button>
        </div>
      </div>

      <section className="hhFeatured">
        <div className="hhFeatInner">
          <div className="hhSectionTag">Uitgelicht vastgoed</div>
          <h2>Recent toegevoegd</h2>
          <div className="hhFeatGrid">
            <div className="hhFeatMain">
              <img className="hhFeatMainImg" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" alt="Featured" />
              <div className="hhFeatMainInfo">
                <span className="hhFeatTag">Nieuwbouw</span>
                <div className="hhFeatMainTitle">Villa Brasschaat — 5 slk. 3 bdk.</div>
                <div className="hhFeatPrice">€ 895.000</div>
              </div>
            </div>
            <div className="hhFeatSide">
              {[
                { type: "Appartement", title: "Duplex Centrum Gent", price: "€ 349.000", img: "photo-1502672260266-1c1ef2d93688" },
                { type: "Huis", title: "Rijwoning Mechelen", price: "€ 287.000", img: "photo-1560448204-e02f11c3d0e2" },
                { type: "Villa", title: "Moderne Villa Knokke", price: "€ 1.250.000", img: "photo-1512917774080-9991f1c4c750" },
              ].map((p) => (
                <div key={p.title} className="hhFeatSmall">
                  <img className="hhFeatSmallImg" src={`https://images.unsplash.com/${p.img}?w=400&q=80`} alt={p.title} />
                  <div className="hhFeatSmallBody">
                    <div className="hhFeatSmallType">{p.type}</div>
                    <div className="hhFeatSmallTitle">{p.title}</div>
                    <div className="hhFeatSmallPrice">{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hhServices">
        <div className="hhServInner">
          <div className="hhServText">
            <div className="hhSectionTag">Onze expertise</div>
            <h2>Meer dan enkel<br />een makelaar</h2>
            <p>Horizon Homes biedt een volledig ontzorgend pakket — van de eerste bezichtiging tot de sleuteloverdracht. Uw vertrouwen is onze grootste troef.</p>
            <button className="hhBtn">Kennismaken</button>
          </div>
          <div className="hhServGrid">
            {[
              { icon: "🏠", title: "Aan- & verkoop", desc: "Persoonlijke begeleiding bij elke transactie, van waardebepaling tot notariaat." },
              { icon: "📋", title: "Verhuur", desc: "Professioneel beheer van uw verhuurpand, inclusief huurdersselectie en administratie." },
              { icon: "📐", title: "Nieuwbouw", desc: "Exclusieve projecten rechtstreeks van de promotor, met garanties en fiscaal voordeel." },
              { icon: "💶", title: "Gratis schatting", desc: "Weet wat uw woning waard is met onze accurate, marktconforme waardebepaling." },
            ].map((s) => (
              <div key={s.title} className="hhServCard">
                <div className="hhServCardIcon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hhCta">
        <div className="hhCtaCircle" />
        <div className="hhCtaCircle" />
        <div className="hhCtaInner">
          <h2>Klaar om uw droomwoning te vinden?</h2>
          <p>Maak een afspraak met een van onze makelaars en laat u gratis en vrijblijvend adviseren.</p>
          <button className="hhBtnWhite">Afspraak maken</button>
        </div>
      </section>

      <footer className="hhFooter">
        <div className="hhFooterInner">
          <div className="hhFooterLogo">Horizon<span>.</span>Homes</div>
          <div className="hhFooterLinks">
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Algemene voorwaarden</a>
          </div>
          <div className="hhFooterCopy">© 2025 Horizon Homes — BIV 123456</div>
        </div>
      </footer>
    </>
  );
}
