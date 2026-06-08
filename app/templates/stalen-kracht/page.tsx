"use client";
import { useState } from "react";
import "./stalen.css";
const services = [
  { num:"01", name:"Constructie", desc:"Nieuwbouw, ruwbouw en volledige constructie van industriële en commerciële gebouwen." },
  { num:"02", name:"Staalwerk", desc:"Fabricage en plaatsing van staalstructuren, hallen en loopbruggen." },
  { num:"03", name:"Renovatie", desc:"Grondige renovaties van bestaande structuren met focus op veiligheid en duurzaamheid." },
  { num:"04", name:"Projectbeheer", desc:"Van vergunning tot oplevering — wij coördineren elk aspect van uw bouwproject." },
];
const projects = [
  { cat:"Industrieel", name:"Staalhal Gent-Noord", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=70" },
  { cat:"Commercieel", name:"Logistiek Centrum A12", img:"https://images.unsplash.com/photo-1545324418-cc1a3fa994c8?auto=format&fit=crop&w=500&q=70" },
  { cat:"Renovatie", name:"Fabriek Van Dyck", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=500&q=70" },
];
export default function StatenKracht() {
  return (
    <main>
      <nav className="skNav">
        <div className="skLogo">Stalen <span>Kracht</span></div>
        <div className="skNavLinks">
          <a href="#services">Diensten</a><a href="#projects">Projecten</a><a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="skNavBtn">Offerte aanvragen</a>
      </nav>
      <section className="skHero">
        <div className="skHeroBg"><img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80" alt="Stalen Kracht"/></div>
        <div className="skHeroContent">
          <span className="skHeroLabel">Industrieel bouwbedrijf · België</span>
          <h1 className="skHeroTitle">Wij bouwen<br/><em>het fundament</em><br/>van jouw succes.</h1>
          <div className="skHeroRow">
            <p className="skHeroSub">30 jaar ervaring in industriële constructie, staalwerk en grootschalige renovaties. Betrouwbaar. Precies. Op tijd.</p>
            <a href="#services" className="skBtn">Onze diensten →</a>
          </div>
        </div>
      </section>
      <section id="services" className="skServices">
        <div className="skServInner">
          <div className="skServTop">
            <span className="skLabel">Wat wij doen</span>
            <h2>Industrial<br/>Grade.</h2>
          </div>
          <div className="skServGrid">
            {services.map(s => (
              <div key={s.name} className="skServCard">
                <div className="skServNum">{s.num}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="projects" className="skProjects">
        <div className="skProjInner">
          <span className="skLabel">Gerealiseerde projecten</span>
          <h2 style={{fontFamily:"var(--fb)",fontSize:"clamp(44px,6vw,72px)",fontWeight:800,textTransform:"uppercase",lineHeight:.85,letterSpacing:"-.01em",marginTop:12}}>Recent werk.</h2>
          <div className="skProjGrid">
            {projects.map(p => (
              <div key={p.name} className="skProjCard">
                <img src={p.img} alt={p.name} loading="lazy"/>
                <div className="skProjInfo">
                  <div className="skProjCat">{p.cat}</div>
                  <div className="skProjName">{p.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="skCerts">
        <div className="skCertsInner">
          {[["30+","Jaar ervaring"],["150+","Projecten"],["98%","Op tijd"],["0","Onveilige sites"]].map(([n,l]) => (
            <div key={l} className="skCert"><div className="skCertNum">{n}</div><div className="skCertLabel">{l}</div></div>
          ))}
        </div>
      </div>
      <footer className="skFooter">
        <div className="skFooterInner">
          <div className="skLogo">Stalen <span>Kracht</span></div>
          <div className="skFooterCopy">© {new Date().getFullYear()} Stalen Kracht NV</div>
        </div>
      </footer>
    </main>
  );
}