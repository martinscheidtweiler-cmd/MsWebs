"use client";
import { useState, useEffect, useCallback } from "react";
import "./golden.css";
import GsNav from "./GsNav";
import GsFooter from "./GsFooter";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1800&q=85", name: "Leandro van het Guldenhof", caption: "BWP Goedgekeurd hengst — Grand Prix niveau" },
  { img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85", name: "Mystic du Guldenhof", caption: "Kampioen Zangersheide 6-jarigen 2023" },
  { img: "https://images.unsplash.com/photo-1566231779484-92f3d3b3b0e0?w=1800&q=85", name: "Nixon & Jeroen", caption: "Winnaars Nations Cup Sentowerpark 2023" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85", name: "Gretel du Guldenhof", caption: "Het onafscheidelijke duo" },
];

const NIEUWS = [
  { date: "10 Maart 2025", title: "Vinnie goedgekeurd voor BWP studboek", text: "Ons 3-jarige talent Vinnie van het Guldenhof werd goedgekeurd voor het BWP studboek. Een geweldige prestatie voor deze veelbelovende hengst.", img: "photo-1553284965-83fd3e82fa5a" },
  { date: "16 Juli 2024", title: "Leandro wint Grand Prix 2* te Bonheiden", text: "Jeroen De Winter reed een schitterende ronde met Leandro en won de Grand Prix CSI2* na een spannende barrage.", img: "photo-1534438327276-14e5300c3a48" },
  { date: "20 Mei 2024", title: "Mystic wint finale 7-jarigen", text: "Op de CSI2* te Lier won Mystic de finale voor 7-jarige paarden na een perfecte ronde in de barrage.", img: "photo-1566231779484-92f3d3b3b0e0" },
];

const HENGSTEN = [
  { name: "Pegase van 't Ruytershof", bred: "Comme il faut × Cartani 4", img: "photo-1553284965-83fd3e82fa5a" },
  { name: "Leandro VG", bred: "Gitano V Berkenbroeck × Chellano Z", img: "photo-1534438327276-14e5300c3a48" },
  { name: "Sunday JM", bred: "Ermitage Kalone × Chicago Z", img: "photo-1566231779484-92f3d3b3b0e0" },
  { name: "Vinnie van het Guldenhof", bred: "Pegase van't Ruytershof × Aktion Pur Z", img: "photo-1558618666-fcd25c85cd64" },
  { name: "Vitalis JS", bred: "Ermitage Kalone × Vannan", img: "photo-1574023279800-c9b7ef70a652" },
  { name: "Wellington", bred: "Cashpaid J&F × Chacoon Blue", img: "photo-1591168879019-e70c2bddaed8" },
  { name: "Excelsior Optimus", bred: "Ermitage Kalone × Bamako de Muze", img: "photo-1580739826297-9338e6c80943" },
  { name: "Querly Chin", bred: "Chin Chin × For Pleasure", img: "photo-1593160853789-e20c4b89e88b" },
];

export default function GoldenStablesHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = useCallback(() => setActiveSlide((s) => (s + 1) % SLIDES.length), []);
  useEffect(() => { const t = setInterval(nextSlide, 5000); return () => clearInterval(t); }, [nextSlide]);

  return (
    <>
      <GsNav />

      {/* HERO */}
      <section className="gsHero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`gsSlide${i === activeSlide ? " active" : ""}`}>
            <img src={s.img} alt={s.name} />
          </div>
        ))}
        <div className="gsHeroOverlay" />
        <div className="gsHeroBrand">
          <h1>Het<span>Guldenhof</span></h1>
        </div>
        <div className="gsSlideCaption">
          <span className="gsSlideName">{SLIDES[activeSlide].name}</span>
          {SLIDES[activeSlide].caption}
        </div>
        <div className="gsHeroArrows">
          {SLIDES.map((_, i) => (
            <button key={i} className={`gsHeroDot${i === activeSlide ? " active" : ""}`} onClick={() => setActiveSlide(i)} />
          ))}
        </div>
        <div className="gsHeroActions">
          <button className="gsHeroBtn gsHeroBtnPrimary" onClick={() => document.getElementById("hengsten")?.scrollIntoView({ behavior: "smooth" })}>
            Ontdek onze hengsten
          </button>
          <button className="gsHeroBtn gsHeroBtnOutline" onClick={() => document.getElementById("welkom")?.scrollIntoView({ behavior: "smooth" })}>
            Over ons
          </button>
        </div>
      </section>

      {/* NIEUWS */}
      <section className="gsNieuws">
        <div className="gsContainer">
          <h2 className="gsSectionTitle">Laatste <em>nieuws</em></h2>
          <p className="gsSectionSub">Volg onze paarden, resultaten en updates</p>
          <div className="gsNieuwsGrid">
            {NIEUWS.map((n) => (
              <article key={n.title} className="gsNieuwsCard">
                <div className="gsNieuwsImg">
                  <img src={`https://images.unsplash.com/${n.img}?w=600&q=80`} alt={n.title} />
                </div>
                <div className="gsNieuwsBody">
                  <div className="gsNieuwsDate">{n.date}</div>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="gsNieuwsMoreRow">
            <a href="/templates/golden-stables/nieuws" className="gsNieuwsMore">Alle nieuwsberichten →</a>
          </div>
        </div>
      </section>

      {/* WELKOM */}
      <section className="gsWelkom" id="welkom">
        <div className="gsContainer">
          <div className="gsWelkomInner">
            <div className="gsWelkomImg">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85" alt="Het Guldenhof" />
            </div>
            <div className="gsWelkomText">
              <h2>Welkom bij<br /><em>het Guldenhof</em></h2>
              <p>Een familiebedrijf waar drie generaties samenwerken aan hun gezamenlijke passie: de paarden. Grootvader Roger leeft voor de hengstenhouderij en de fokkerij. Deze microbe heeft hij ook doorgegeven aan kleinzoon Jeroen, die naast de sport ook bezeten is van fokkerij.</p>
              <p>Door de jaren heen hebben we gemerkt dat we de nadruk moeten leggen op topspringpaarden die ook nog eens uit een bewezen moederstam komen. Onze merries komen uit de stammen van Emerald, Dollar Girl, Usha van 't Roosakker en Querly Chin.</p>
              <p>Ook onze hengsten hebben we zorgvuldig uitgekozen. Stuk voor stuk komen ze uit de beste moederstammen van België. We hopen dat onze passie U ook kan boeien!</p>
              <a href="/templates/golden-stables/contact" className="gsWelkomBtn"><strong>Contacteer</strong>&nbsp;ons →</a>
            </div>
          </div>
        </div>
      </section>

      {/* HENGSTEN */}
      <section className="gsHengsten" id="hengsten">
        <div className="gsContainer">
          <div className="gsHengstenTop">
            <div>
              <h2 className="gsSectionTitle">Ontdek onze <em>hengsten</em></h2>
              <p className="gsSectionSub" style={{ marginBottom: 0 }}>Stuk voor stuk uit de beste moederstammen van België</p>
            </div>
            <a href="/templates/golden-stables/hengsten" className="gsHengstenLink">Bekijk alle hengsten →</a>
          </div>
          <div className="gsHengstenGrid">
            {HENGSTEN.map((h) => (
              <a key={h.name} href="/templates/golden-stables/hengsten" className="gsHengstenCard">
                <div className="gsHengstenImg">
                  <img src={`https://images.unsplash.com/${h.img}?w=500&q=80`} alt={h.name} />
                </div>
                <div className="gsHengstenBody">
                  <div className="gsHengstenName">{h.name}</div>
                  <div className="gsHengstenBred">{h.bred}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="gsHengstenSperma">
            <button className="gsHengstenSpermaBtn">Sperma bestellen</button>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="gsSponsors">
        <div className="gsContainer">
          <p className="gsSponsorsLabel">Met dank aan onze sponsors</p>
          <div className="gsSponsorsRow">
            {["Cavalor", "CWD Sellier", "Greenfield", "Van Eynde"].map((s) => (
              <div key={s} style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "#aaa", letterSpacing: ".04em", fontStyle: "italic" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GsFooter />
    </>
  );
}
