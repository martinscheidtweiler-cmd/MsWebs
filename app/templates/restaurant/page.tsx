"use client";

import { useState, useEffect } from "react";
import "./restaurant.css";

const menu = [
  {
    title: "Raw",
    items: [
      ["Gillardeau Oyster", "Champagne vinegar · cucumber · dill", "€7"],
      ["Bluefin Tuna", "Ponzu · avocado · crispy rice", "€22"],
      ["Beef Tartare", "Truffle · parmesan · brioche", "€24"],
    ],
  },
  {
    title: "Fire",
    items: [
      ["Black Cod", "Miso · pak choi · beurre blanc", "€36"],
      ["Dry Aged Ribeye", "Pepper jus · pommes Anna", "€44"],
      ["Lobster Linguine", "Bisque · basil · tomato", "€39"],
    ],
  },
  {
    title: "Sweet",
    items: [
      ["Noir Chocolate", "Coffee · sea salt · vanilla", "€14"],
      ["Crème Brûlée", "Tonka · orange zest", "€13"],
    ],
  },
];

const wines = [
  {
    region: "Burgundy",
    name: "Gevrey-Chambertin",
    desc: "Domaine Rossignol-Trapet. Earthy, structured, long.",
    price: "€148",
  },
  {
    region: "Champagne",
    name: "Blanc de Blancs",
    desc: "Jacques Selosse Initial. Oxidative, rich, complex.",
    price: "€220",
  },
  {
    region: "Rhône",
    name: "Château Rayas",
    desc: "Châteauneuf-du-Pape. Ethereal, wild, unforgettable.",
    price: "€310",
  },
];

const cocktails = [
  {
    nr: "01",
    name: "Noir Negroni",
    desc: "Monkey 47 · Campari · Mancino Vermouth",
    note: "The house signature. Served at 4°.",
  },
  {
    nr: "02",
    name: "Velvet Espresso",
    desc: "Grey Goose · double espresso · tonka syrup",
    note: "Dark, smooth, effortless.",
  },
  {
    nr: "03",
    name: "Amber Sour",
    desc: "Elijah Craig · wildflower honey · lemon · smoke",
    note: "A slow drink for long evenings.",
  },
];

const events = [
  ["14 JUN", "Oyster & Champagne Night", "Oysters, champagne pairing and late bar service."],
  ["22 JUN", "Chef's Table Experience", "A private fire-led tasting for only eight guests."],
  ["30 JUN", "Sunday Noir Lunch", "Slow lunch, seasonal sharing menu and selected wines."],
];

const privateFeatures = [
  "Up to 18 guests",
  "Custom menus",
  "Private sommelier",
  "AV & decor on request",
  "Full evening hire",
  "Dedicated team",
];

const hours = [
  ["Wednesday", "18:00 — 23:00"],
  ["Thursday", "18:00 — 23:00"],
  ["Friday", "18:00 — 00:00"],
  ["Saturday", "18:00 — 00:00"],
  ["Sunday", "17:00 — 22:00"],
];

export default function RestaurantPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* ── Nav ── */}
      <header className={`rNav${scrolled ? " rNavScrolled" : ""}`}>
        <nav className="rNavLeft">
          <a href="#dinner">Menu</a>
          <a href="#wine">Wine</a>
          <a href="#events">Events</a>
        </nav>
        <div className="rNavLogo">
          <span>NOIR</span>
          <small>Dining · Antwerp</small>
        </div>
        <nav className="rNavRight">
          <a href="#private">Private dining</a>
          <a href="#contact" className="rNavReserve">Reserve →</a>
        </nav>
        <button
          className={`rHamburger${mobileOpen ? " open" : ""}`}
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile nav */}
      <nav className={`rMobileNav${mobileOpen ? " open" : ""}`}>
        <a href="#dinner" onClick={() => setMobileOpen(false)}>Menu</a>
        <a href="#wine" onClick={() => setMobileOpen(false)}>Wine</a>
        <a href="#events" onClick={() => setMobileOpen(false)}>Events</a>
        <a href="#private" onClick={() => setMobileOpen(false)}>Private dining</a>
        <a href="#contact" className="rMobileNavCta" onClick={() => setMobileOpen(false)}>Reserve a table →</a>
      </nav>

      {/* ── Hero ── */}
      <section className="rHero" id="home">
        <div className="rHeroBg" />
        <div className="rHeroGrad" />
        <div className="rHeroContent">
          <p className="rHeroLabel">Restaurant · Cocktail bar · Antwerp</p>
          <h1 className="rHeroTitle">
            Dark dining.<br />
            <em>Warm nights.</em>
          </h1>
          <div className="rHeroMeta">
            <a href="#contact" className="rHeroCta">Reserve a table</a>
            <a href="#dinner" className="rHeroAlt">View the menu</a>
          </div>
        </div>
      </section>

      {/* ── Strip ── */}
      <div className="rStrip">
        <div className="rStripItem">
          <span className="rStripLabel">Location</span>
          <span className="rStripTitle">Antwerp</span>
          <span className="rStripSub">Vlaamse Kaai 18<br />2000 Antwerpen</span>
        </div>
        <div className="rStripItem">
          <span className="rStripLabel">The concept</span>
          <span className="rStripTitle">Fine dining, no stiffness</span>
          <span className="rStripSub">Seasonal dishes, amber light, fire and depth.</span>
        </div>
        <div className="rStripItem">
          <span className="rStripLabel">Opening hours</span>
          <span className="rStripTitle">Wed — Sun</span>
          <span className="rStripSub">Dinner from 18:00<br />Kitchen closes 22:30</span>
        </div>
      </div>

      {/* ── Menu ── */}
      <section className="rMenuWrap" id="dinner">
        <div className="rMenuTop">
          <div>
            <h2>Seasonal dishes.<br /><em>Fire and depth.</em></h2>
          </div>
          <div className="rMenuTopRight">
            <p>
              Een compacte kaart met sterke producten, zuivere smaken
              en moderne combinaties. Alles à la carte of als tasting menu.
            </p>
            <a href="#tasting">View tasting menu →</a>
          </div>
        </div>
        <div className="rMenuColumns">
          {menu.map((group, gi) => (
            <div className="rMenuGroup" key={group.title}>
              <p className="rMenuGroupName">{group.title}</p>
              {group.items.map(([name, desc, price]) => (
                <div className="rMenuItem" key={name}>
                  <div>
                    <p className="rMenuItemName">{name}</p>
                    <p className="rMenuItemSub">{desc}</p>
                  </div>
                  <span className="rMenuItemPrice">{price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Statement ── */}
      <section className="rStatement">
        <div className="rStatementBg" />
        <div className="rStatementOverlay" />
        <div className="rStatementText">
          <blockquote>
            &ldquo;A restaurant that feels like a secret you want to keep.&rdquo;
          </blockquote>
          <cite>The atmosphere at Noir</cite>
        </div>
      </section>

      {/* ── Tasting ── */}
      <section className="rTasting" id="tasting">
        <div className="rTastingImg">
          <img
            src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1000&q=80"
            alt="Tasting menu Noir Dining"
            loading="lazy"
          />
        </div>
        <div className="rTastingText">
          <p className="rTastingEyebrow">Tasting menu</p>
          <h2>Four courses.<br /><em>One rhythm.</em></h2>
          <p>
            Voor wie Noir volledig wil beleven. Vier gangen, optionele wine
            pairing en een rustige opbouw doorheen de avond.
          </p>
          <p>
            The tasting menu changes with the season and reflects what the
            kitchen is most excited about that week.
          </p>
          <div className="rTastingPrice">
            <div>
              <strong>€74</strong>
              <span>per persoon</span>
            </div>
            <div>
              <strong>+€48</strong>
              <span>wine pairing</span>
            </div>
          </div>
          <a
            href="https://www.resengo.com/"
            target="_blank"
            rel="noreferrer"
            className="rTastingCta"
          >
            Reserve tasting
          </a>
        </div>
      </section>

      {/* ── Wine ── */}
      <section className="rWineWrap" id="wine">
        <div className="rWineInner">
          <div className="rWineTop">
            <div>
              <p className="rWineEyebrow">Wine cellar</p>
              <h2>Classic bottles.<br /><em>Modern pairings.</em></h2>
            </div>
            <p>
              Een wijnkaart met elegante klassiekers, karaktervolle
              ontdekkingen en pairings die het menu versterken.
            </p>
          </div>
          <div className="rWineList">
            {wines.map((w) => (
              <div className="rWineRow" key={w.name}>
                <span className="rWineRegion">{w.region}</span>
                <span className="rWineName">{w.name}</span>
                <span className="rWineDesc">{w.desc}</span>
                <span className="rWinePrice">{w.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cocktails ── */}
      <section className="rCocktailsWrap" id="cocktails">
        <div className="rCocktailsTop">
          <span>Cocktail bar</span>
          <h2>Late drinks.<br /><em>Amber light.</em></h2>
        </div>
        <div className="rCocktailGrid">
          {cocktails.map((c) => (
            <div className="rCocktailCard" key={c.nr}>
              <p className="rCocktailNr">{c.nr}</p>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <em>{c.note}</em>
            </div>
          ))}
        </div>
      </section>

      {/* ── Private ── */}
      <section className="rPrivate" id="private">
        <div className="rPrivateText">
          <p className="rPrivateEyebrow">Private dining</p>
          <h2>Your evening.<br /><em>Completely private.</em></h2>
          <p>
            Voor zakelijke diners, verjaardagen of groepen. Warm,
            luxueus en volledig op maat.
          </p>
          <p>
            The private room seats up to 18 guests with a dedicated team,
            custom menu and optional sommelier service.
          </p>
          <div className="rPrivateFeatures">
            {privateFeatures.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <a href="mailto:events@noirdining.be" className="rPrivateBtn">
            Request private dining
          </a>
        </div>
        <div className="rPrivateImg">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
            alt="Private dining Noir"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── Events ── */}
      <section className="rEventsWrap" id="events">
        <div className="rEventsTop">
          <h2>Upcoming<br /><em>nights.</em></h2>
          <span>Events</span>
        </div>
        {events.map(([date, title, text]) => (
          <div className="rEventRow" key={title}>
            <span className="rEventDate">{date}</span>
            <div>
              <p className="rEventName">{title}</p>
              <p className="rEventDesc">{text}</p>
            </div>
            <a href="#contact" className="rEventCta">Reserve →</a>
          </div>
        ))}
      </section>

      {/* ── Contact ── */}
      <section className="rContact" id="contact">
        <div className="rContactInfo">
          <p className="rContactEyebrow">Reservations</p>
          <h2>Make your<br /><em>reservation.</em></h2>
          <div className="rHoursGrid">
            {hours.map(([day, time]) => (
              <div className="rHoursRow" key={day}>
                <span>{day}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>
          <div className="rContactDetails">
            <a href="tel:+3230000000">+32 3 000 00 00</a>
            <a href="mailto:info@noirdining.be">info@noirdining.be</a>
            <a href="#">Vlaamse Kaai 18, 2000 Antwerpen</a>
          </div>
        </div>
        <form className="rReservationForm">
          <p className="rFormTitle">Book a table</p>
          <div className="rFormRow">
            <input placeholder="Your name" />
            <input placeholder="Email address" type="email" />
          </div>
          <div className="rFormRow">
            <input placeholder="Phone number" type="tel" />
            <select defaultValue="">
              <option value="" disabled>Number of guests</option>
              <option>2 guests</option>
              <option>3 – 4 guests</option>
              <option>5 – 6 guests</option>
              <option>7 – 8 guests</option>
              <option>Private dining (8+)</option>
            </select>
          </div>
          <input placeholder="Preferred date" type="date" />
          <textarea placeholder="Special requests or dietary requirements" rows={4} />
          <button type="button">Confirm reservation →</button>
        </form>
      </section>

      {/* ── Footer ── */}
      <footer className="rFooter">
        <div className="rFooterLeft">
          <span>Vlaamse Kaai 18, Antwerpen</span>
          <span>info@noirdining.be</span>
        </div>
        <div className="rFooterCenter">
          <strong>NOIR</strong>
          <small>Dining · Antwerp</small>
        </div>
        <div className="rFooterRight">
          <span>Open Wed — Sun</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
