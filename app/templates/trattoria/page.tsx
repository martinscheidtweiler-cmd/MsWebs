"use client";
import { useState, useEffect } from "react";
import "./trattoria.css";

const menuSections = [
  { title:"Antipasti", items:[
    { name:"Bruschetta al Pomodoro", desc:"San Marzano, basilico, olio extra vergine", price:"€9" },
    { name:"Burrata & Prosciutto", desc:"Bufala burrata, crudo di Parma 24 maanden", price:"€16" },
    { name:"Calamari Fritti", desc:"Citroen, aioli van knoflook en peterselie", price:"€14" },
  ]},
  { title:"Primi", items:[
    { name:"Tagliatelle al Ragù", desc:"Langzaam gegaard, kerstomaatjes, parmigiano", price:"€19" },
    { name:"Risotto al Tartufo", desc:"Zwarte truffel, fontina, witte wijn", price:"€26" },
    { name:"Gnocchi alla Sorrentina", desc:"Pomodoro, bufala mozzarella, basilico", price:"€17" },
  ]},
  { title:"Secondi", items:[
    { name:"Branzino al Forno", desc:"Zeebrasem, kappertjes, olijven, citroen", price:"€28" },
    { name:"Bistecca Fiorentina", desc:"Dry-aged T-bone, rosmarino, zeezout, 400g", price:"€48" },
    { name:"Saltimbocca alla Romana", desc:"Kalfsvlees, salie, prosciutto, witte wijn", price:"€32" },
  ]},
  { title:"Dolci", items:[
    { name:"Tiramisu della Casa", desc:"Mascarpone, espresso, savoiardi, cacao", price:"€9" },
    { name:"Panna Cotta", desc:"Vanille, coulis van wilde bessen", price:"€8" },
    { name:"Cannolo Siciliano", desc:"Ricotta, pistacchio, candied orange peel", price:"€7" },
  ]},
];

export default function Trattoria() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", guests:"2", date:"", time:"" });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* NAV */}
      <nav className={`tNav${scrolled?" tNavScrolled":""}`}>
        <div className="tNavLeft"><a href="#menu">Menu</a><a href="#story">Storia</a></div>
        <div className="tNavLogo">La Trattoria</div>
        <div className="tNavRight">
          <a href="#reservation">Reservatie</a>
          <a href="#reservation" className="tNavBtn">Reserveer</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="tHero">
        <div className="tHeroBg">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80" alt="La Trattoria"/>
        </div>
        <div className="tHeroContent">
          <div className="tHeroEye">Authentiek Italiaans · Antwerpen</div>
          <h1 className="tHeroTitle">
            La Trattoria
            <em>Dal 1987</em>
          </h1>
          <p className="tHeroSub">Waar ingrediënten spreken en eenvoud wordt kunst. Elke maaltijd een reis naar Italië.</p>
          <div className="tHeroCta">
            <a href="#menu" className="tBtnGold">Bekijk de kaart</a>
            <a href="#reservation" className="tBtnOutline">Reserveer een tafel</a>
          </div>
        </div>
        <div className="tHeroScroll"><span>Scroll</span><div className="tScrollLine"/></div>
      </section>

      {/* MENU */}
      <section id="menu" className="tMenu">
        <div className="tMenuInner">
          <div className="tSection">
            <div className="tLabel">La Cucina</div>
            <h2>Onze kaart</h2>
          </div>
          <div className="tMenuCats">
            {menuSections.map(sec => (
              <div key={sec.title}>
                <h3>{sec.title}</h3>
                {sec.items.map(item => (
                  <div key={item.name} className="tMenuItem">
                    <div className="tItemLeft">
                      <div className="tItemName">{item.name}</div>
                      <div className="tItemDesc">{item.desc}</div>
                    </div>
                    <div className="tItemPrice">{item.price}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="tStory">
        <div className="tStoryInner">
          <div className="tStoryImg">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" alt="La Trattoria verhaal"/>
          </div>
          <div className="tStoryText">
            <div className="tLabel">La nostra storia</div>
            <h2>Drie generaties<br/>Italiaanse passie</h2>
            <p>Wat in 1987 begon als een kleine osteria van nonna Maria, groeide uit tot een vaste waarde in de Antwerpse restaurantscene. Elke dag rijden de verse groenten en pasta vanuit Puglia binnen — een gewoonte die we nooit hebben losgelaten.</p>
            <p>Onze keuken draait om seizoensproducten, respect voor het product en recepten die al decennialang worden doorgegeven. Geen fratsen, geen moleculaire kitchen — alleen eerlijk, hartelijk Italiaans eten zoals het hoort.</p>
            <a href="#reservation" className="tBtnCream">Reserveer je tafel →</a>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservation" className="tRes">
        <div className="tResInner">
          <div className="tLabel">Prenotazione</div>
          <h2>Reserveer een tafel</h2>
          <p>Kies je moment — wij zorgen voor de rest. Voor grote groepen of events, bel ons rechtstreeks.</p>
          <form className="tResForm" onSubmit={e => e.preventDefault()}>
            <input placeholder="Naam" value={form.name} onChange={e => setForm({...form,name:e.target.value})}/>
            <input placeholder="E-mailadres" type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})}/>
            <select value={form.guests} onChange={e => setForm({...form,guests:e.target.value})}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"persoon":"personen"}</option>)}
            </select>
            <input type="date" value={form.date} onChange={e => setForm({...form,date:e.target.value})}/>
            <button type="submit">Reserveer → Buon Appetito!</button>
          </form>
        </div>
      </section>

      <footer className="tFooter">
        <div className="tFooterInner">
          <div className="tNavLogo" style={{color:"#fff",fontSize:22}}>La Trattoria</div>
          <div className="tFooterInfo">Via della Cucina 14, Antwerpen<br/>+32 3 222 33 44 · info@latrattoria.be</div>
        </div>
      </footer>
    </main>
  );
}
