"use client";
import { useState, useEffect } from "react";
import "./ember.css";

const cuts = [
  { name:"Dry-Aged Ribeye", desc:"28 dagen gerijpt · peper jus · pommes Anna", price:"€48", img:"https://images.unsplash.com/photo-1558030006-76e7b1147d4b?auto=format&fit=crop&w=600&q=80" },
  { name:"Tomahawk", desc:"Bone-in ribeye · 1,2 kg · chimichurri", price:"€72", img:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80" },
  { name:"Filet de Boeuf", desc:"Limousin · béarnaise · truffelchips", price:"€54", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80" },
];

export default function EmberGrill() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name:"", date:"", guests:"2" });
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", s, {passive:true});
    return () => window.removeEventListener("scroll", s);
  }, []);

  return (
    <main>
      <nav className="eNav">
        <div className="eLogo">Ember</div>
        <div className="eNavLinks">
          <a href="#cuts">Prime Cuts</a>
          <a href="#atmo">De Bar</a>
          <a href="#reservation">Reserveren</a>
        </div>
        <a href="#reservation" className="eNavBtn">Reserveer</a>
      </nav>

      {/* HERO */}
      <section className="eHero">
        <div className="eHeroBg">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80" alt="Ember Grill"/>
        </div>
        <div className="eHeroContent">
          <span className="eHeroEye">Prime Steakhouse · Craft Cocktails · Antwerpen</span>
          <h1 className="eHeroTitle">
            Fire.
            <em>Flavour.</em>
          </h1>
          <div className="eHeroRow">
            <p className="eHeroSub">Dry-aged cuts, open fire cooking en handcrafted cocktails. Geen restaurant — een ervaring.</p>
            <div className="eHeroCta">
              <a href="#cuts" className="eBtnFire">Bekijk de cuts</a>
              <a href="#reservation" className="eBtnGhost">Reserveer nu</a>
            </div>
          </div>
        </div>
      </section>

      {/* PRIME CUTS */}
      <section id="cuts" className="eCuts">
        <div className="eCutsInner">
          <div className="eSection">
            <span className="eLabel">Prime Selection</span>
            <h2>The<br/>cuts.</h2>
          </div>
          <div className="eCutGrid">
            {cuts.map(c => (
              <div key={c.name} className="eCutCard">
                <img src={c.img} alt={c.name} loading="lazy"/>
                <div className="eCutInfo">
                  <div className="eCutName">{c.name}</div>
                  <div className="eCutDesc">{c.desc}</div>
                  <div className="eCutPrice">{c.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATMOSPHERE */}
      <section id="atmo" className="eAtmo">
        <div className="eAtmoInner">
          <div className="eAtmoImgs">
            <div className="eAtmoImg">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" alt="Bar sfeer"/>
            </div>
            <div className="eAtmoImg">
              <img src="https://images.unsplash.com/photo-1470338745628-171cf53de3a8?auto=format&fit=crop&w=400&q=80" alt="Whisky"/>
            </div>
            <div className="eAtmoImg">
              <img src="https://images.unsplash.com/photo-1551218372-8f30c43b9ebb?auto=format&fit=crop&w=400&q=80" alt="Cocktails"/>
            </div>
          </div>
          <div className="eAtmoText">
            <span className="eLabel">The Bar</span>
            <h2>Craft<br/>cocktails.<br/>Rare whisky.</h2>
            <p>Onze barmannen zijn net zo gepassioneerd als onze chefs. Van klassieke Negroni's tot huisgemaakte bitters — elk glas is een statement.</p>
            <p>Met meer dan 80 whisky's, een diepgaande wijnkaart en seizoensgebonden cocktails, is Ember een bestemming op zich.</p>
            <div className="eStatRow">
              <div className="eStat"><div className="eStatNum">80+</div><div className="eStatLabel">Whisky's</div></div>
              <div className="eStat"><div className="eStatNum">28</div><div className="eStatLabel">Dagen rijping</div></div>
              <div className="eStat"><div className="eStatNum">3</div><div className="eStatLabel">Michelin tips</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservation" className="eRes">
        <div className="eResInner">
          <div className="eResLeft">
            <h2>Book<br/>your table.</h2>
            <p>Private dining beschikbaar. Bel ons voor events of groepen van 8+.</p>
          </div>
          <form className="eResForm" onSubmit={e=>e.preventDefault()}>
            <input placeholder="Naam" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
            <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}>
              {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?"gast":"gasten"}</option>)}
            </select>
            <button type="submit">Reserveer → EMBER</button>
          </form>
        </div>
      </section>

      <footer className="eFooter">
        <div className="eFooterInner">
          <div className="eFooterLogo">Ember</div>
          <nav className="eFooterLinks">
            <a href="#cuts">Menu</a><a href="#atmo">Bar</a><a href="#reservation">Reserveer</a>
          </nav>
          <div className="eFooterCopy">© {new Date().getFullYear()} EMBER GRILL</div>
        </div>
      </footer>
    </main>
  );
}
