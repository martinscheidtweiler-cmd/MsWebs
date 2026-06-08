"use client";
import { useState, useEffect } from "react";
import "./nomad.css";

const items = [
  { num:"01", name:"Bao Bun Crispy Duck", desc:"Hoisin · augurk · lente-ui · sesam", price:"€11", img:"https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=200&q=60" },
  { num:"02", name:"Smash Burger Nomad", desc:"Dry-aged patty · pickles · speciale saus · brioche", price:"€14", img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=60" },
  { num:"03", name:"Pad Thai Bowl", desc:"Rijstnoedels · garnalen · pinda · limoen · tamarind", price:"€13", img:"https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=200&q=60" },
  { num:"04", name:"Taco Trio", desc:"Kip · pulled pork · black bean · salsa verde", price:"€15", img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=200&q=60" },
  { num:"05", name:"Ramen Bowl", desc:"Tonkotsu · chashu · ajitsuke tamago · menma", price:"€16", img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=200&q=60" },
  { num:"06", name:"Doner Wrap", desc:"Kip kebab · yoghurt · kool · harissa · flatbread", price:"€10", img:"https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=200&q=60" },
];

export default function Nomad() {
  return (
    <main>
      <nav className="nNav">
        <div className="nLogo">NOMAD</div>
        <div className="nNavLinks">
          <a href="#menu">Menu</a>
          <a href="#catering">Catering</a>
        </div>
        <a href="#menu" className="nNavBtn">Bestel nu</a>
      </nav>

      {/* HERO */}
      <section className="nHero">
        <div className="nHeroStripes">
          {["#ea580c","#1a0a00","#fbbf24","#1a0a00","#ea580c"].map((c,i) => (
            <div key={i} className="nStripe" style={{background:c,opacity:.15+i*.04}}/>
          ))}
        </div>
        <div className="nHeroContent">
          <div className="nHeroEye">🌍 Street Food · Fusion Kitchen</div>
          <h1 className="nHeroTitle">
            <span>Eat</span>
            <span className="accent">Bold.</span>
            <span>Everywhere.</span>
          </h1>
          <div className="nHeroBottom">
            <p className="nHeroSub">De wereld op je bord. Elke dag nieuwe smaken, echte ingrediënten, onvergetelijke bites.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a href="#menu" className="nBtnOrange">Bekijk het menu</a>
              <a href="#catering" className="nBtnYellow">Catering aanvragen</a>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="nMenu">
        <div className="nMenuInner">
          <div className="nMenuTop">
            <h2>Street<br/><span>Hits.</span></h2>
            <p style={{maxWidth:280,color:"rgba(255,247,237,.45)",fontSize:14,lineHeight:1.7}}>Elke dag vers bereid. Takeaway, delivery en ter plaatse.</p>
          </div>
          <div className="nMenuList">
            {items.map(item => (
              <div key={item.name} className="nMenuItem">
                <div className="nMenuNum">{item.num}</div>
                <div className="nMenuImg"><img src={item.img} alt={item.name} loading="lazy"/></div>
                <div className="nMenuInfo">
                  <div className="nMenuName">{item.name}</div>
                  <div className="nMenuDesc">{item.desc}</div>
                </div>
                <div className="nMenuPrice">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATERING */}
      <section id="catering" className="nCater">
        <div className="nCaterInner">
          <div className="nCaterImg">
            <img src="https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=700&q=80" alt="Nomad catering"/>
          </div>
          <div className="nCaterText">
            <h2>We come<br/>to you.</h2>
            <p>Van bedrijfsfeesten tot bruiloften — wij brengen onze street food kitchen naar jouw locatie. Eigen food truck, eigen team, eigen vibes.</p>
            <a href="mailto:catering@nomad.be" className="nBtnDark">Vraag een offerte aan →</a>
          </div>
        </div>
      </section>

      <footer className="nFooter">
        <div className="nFooterInner">
          <div className="nFooterLogo">NOMAD</div>
          <div className="nFooterCopy">© {new Date().getFullYear()} Nomad Street Food · Made with 🌍</div>
        </div>
      </footer>
    </main>
  );
}
