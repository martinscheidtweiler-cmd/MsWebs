"use client";
import { useState, useEffect } from "react";
import "./zest.css";

const menu = [
  { cat:"🥗 Starters", name:"Burrata & Heirloom", desc:"Verse burrata, erfstukken tomaat, basilicum olie, fleur de sel", price:"€14", img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" },
  { cat:"🌿 Mains", name:"Groene Curry Bowl", desc:"Kokosmelk, wilde rijst, geroosterde groenten, koriander, limoen", price:"€18", img:"https://images.unsplash.com/photo-1455619452474-d2be8b1d18f0?auto=format&fit=crop&w=600&q=80" },
  { cat:"🐟 Catch of Day", name:"Gegrilde Zalm", desc:"Citroengras, pak choi, sesamdressing, edamame, soba noodles", price:"€22", img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80" },
  { cat:"🥑 Bowls", name:"Avocado Power Bowl", desc:"Quinoa, kale, avocado, kikkererwten, tahindressing, granaatappel", price:"€16", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" },
  { cat:"🍳 Brunch", name:"Eggs Benedict Zest", desc:"Gepocheerde eieren, zuurdesem, gerookte zalm, hollandaisesaus", price:"€17", img:"https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80" },
  { cat:"🌱 Vegan", name:"Buddha Bowl Deluxe", desc:"Geroosterde zoete aardappel, hummus, taboule, granaatappelmelasse", price:"€15", img:"https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80" },
];

const strip = ["Verse ingrediënten · Elke dag", "Lokale leveranciers", "100% Duurzaam", "Open 7 dagen/week", "Brunch & Lunch & Diner", "Takeaway beschikbaar"];

export default function ZestKitchen() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <nav className={`zNav${scrolled ? " zNavScrolled" : ""}`}>
        <div className="zLogo">Zest Kitchen</div>
        <div className="zNavLinks">
          <a href="#menu">Menu</a>
          <a href="#about">Over ons</a>
          <a href="#hours">Uren</a>
        </div>
        <a href="#hours" className="zNavCta">Reserveer →</a>
      </nav>

      {/* HERO */}
      <section className="zHero">
        <div className="zHeroLeft">
          <div className="zHeroEye"><span/>Dagverse ingrediënten · Lokaal · Duurzaam</div>
          <h1 className="zHeroTitle">Eet <em>goed.</em><br/>Voel je goed.</h1>
          <p className="zHeroSub">Verse, kleurrijke gerechten die je dag een boost geven. Van brunch tot diner — elk bord is een klein feestje.</p>
          <div className="zHeroCta">
            <a href="#menu" className="zBtn">Bekijk het menu</a>
            <a href="#hours" className="zBtnGhost">Reserveer een tafel</a>
          </div>
        </div>
        <div className="zHeroRight">
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" alt="Vers eten bij Zest Kitchen"/>
        </div>
      </section>

      {/* STRIP */}
      <div className="zStrip">
        <div className="zStripInner" aria-hidden="true">
          {[...strip,...strip,...strip].map((item,i) => (
            <span key={i} className="zStripItem">{item} <span className="zStripDot">✦</span> </span>
          ))}
        </div>
      </div>

      {/* MENU */}
      <section id="menu" className="zMenu">
        <div className="zMenuInner">
          <div className="zMenuTop">
            <div className="zEye">Ons aanbod</div>
            <h2>Vers. <em>Kleurrijk.</em><br/>Verrassend lekker.</h2>
          </div>
          <div className="zMenuGrid">
            {menu.map(item => (
              <div key={item.name} className="zMenuCard">
                <div className="zMenuImg"><img src={item.img} alt={item.name} loading="lazy"/></div>
                <div className="zMenuInfo">
                  <div className="zMenuCat">{item.cat}</div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="zMenuPrice">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="zAbout">
        <div className="zAboutInner">
          <div className="zAboutImg">
            <img src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=700&q=80" alt="De keuken van Zest"/>
          </div>
          <div className="zAboutText">
            <div className="zEye">Ons verhaal</div>
            <h2>Gemaakt met <em>passie</em><br/>voor puur eten.</h2>
            <p>Zest Kitchen ontstond vanuit een simpele overtuiging: eten dat goed is voor jou hoeft niet saai te zijn. We werken met lokale boeren, seizoensproducten en eerlijke recepten die al jarenlang onze gasten terugbrengen.</p>
            <p>Elke ochtend leveren onze leveranciers verse groenten, kruiden en vis. Geen pakjessoep, geen goedkope shortcuts — alleen eerlijk, smaakvol eten dat je energie geeft.</p>
            <div className="zFactRow">
              <div className="zFact"><div className="zFactNum">5+</div><div className="zFactLabel">Jaar open</div></div>
              <div className="zFact"><div className="zFactNum">12</div><div className="zFactLabel">Lokale leveranciers</div></div>
              <div className="zFact"><div className="zFactNum">40+</div><div className="zFactLabel">Gerechten op de kaart</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOURS */}
      <section id="hours" className="zHours">
        <div className="zHoursInner">
          <div><h2 className="zHoursTitle">Wij zijn<br/>er voor je.</h2></div>
          <div className="zHoursRow">
            {[["Ma – Vr","08:00 – 21:00"],["Zaterdag","09:00 – 22:00"],["Zondag","10:00 – 20:00"]].map(([d,t]) => (
              <div key={d} className="zHoursItem">
                <span className="zHoursDay">{d}</span>
                <span className="zHoursTime">{t}</span>
              </div>
            ))}
          </div>
          <div className="zHoursCtaBox">
            <p>Reserveer online of bel ons.<br/>Takeaway altijd welkom.</p>
            <a href="tel:+3234567890" className="zBtnWhite">📞 +32 3 456 78 90</a>
          </div>
        </div>
      </section>

      <footer className="zFooter">
        <div className="zFooterInner">
          <div className="zFooterLogo">Zest Kitchen</div>
          <nav className="zFooterNav">
            <a href="#menu">Menu</a><a href="#about">Over ons</a><a href="#hours">Uren</a>
          </nav>
          <div className="zFooterCopy">© {new Date().getFullYear()} Zest Kitchen · Alle rechten voorbehouden</div>
        </div>
      </footer>
    </main>
  );
}
