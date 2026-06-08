"use client";
import { useState, useEffect } from "react";
import "./terrazo.css";
export default function Terrazo() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s, {passive:true});
    return () => window.removeEventListener("scroll", s);
  }, []);
  return (
    <main>
      <nav className={`tzNav${scrolled?" tzNavScrolled":""}`}>
        <div className="tzLogo">Terrazo<span>.</span></div>
        <div className="tzNavLinks"><a href="#projects">Projecten</a><a href="#about">Over ons</a><a href="#contact">Contact</a></div>
        <a href="#contact" className="tzNavBtn">Contact opnemen</a>
      </nav>
      <section className="tzHero">
        <div className="tzHeroLeft">
          <div className="tzHeroTag">★ Architectuur & Bouw</div>
          <h1 className="tzHeroTitle">Ruimtes die<br/><em>mensen inspireren</em><br/>om te leven.</h1>
          <p className="tzHeroSub">Wij ontwerpen en bouwen gebouwen die tijdloos zijn, duurzaam en vol karakter. Van concept tot sleuteloverdracht.</p>
          <a href="#projects" className="tzBtn">Bekijk onze projecten →</a>
        </div>
        <div className="tzHeroRight"><img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80" alt="Terrazo Build"/></div>
      </section>
      <section id="projects" className="tzProjects">
        <div className="tzProjInner">
          <div className="tzProjTop">
            <div><span className="tzLabel">Portfolio</span><h2>Recent afgewerkte<br/>projecten.</h2></div>
            <a href="#contact" className="tzBtn" style={{marginBottom:4}}>Alle projecten →</a>
          </div>
          <div className="tzProjGrid">
            <div className="tzProjFeatured">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" alt="Featured"/>
              <div className="tzProjInfo"><div className="tzProjCat">Residentieel</div><div className="tzProjName">Villa Lichtenberghe</div></div>
            </div>
            <div className="tzProjSide">
              {[["Commercieel","Park Office Tower","https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=70"],["Renovatie","Stadskantoor Leuven","https://images.unsplash.com/photo-1545324418-cc1a3fa994c8?auto=format&fit=crop&w=600&q=70"]].map(([cat,name,img]) => (
                <div key={name} className="tzProjSmall">
                  <img src={img} alt={name} loading="lazy"/>
                  <div className="tzProjInfo"><div className="tzProjCat">{cat}</div><div className="tzProjName">{name}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="tzAbout">
        <div className="tzAboutInner">
          <div className="tzAboutText">
            <span className="tzLabel">Over Terrazo</span>
            <h2>Bouwen met<br/><em>visie en vakmanschap.</em></h2>
            <p>Terrazo werd opgericht in 2005 met één doel: architectuur die mensen raakt. We geloven dat elk gebouw een kans is om iets moois en duurzaams te realiseren.</p>
            <p>Ons team combineert architecturale expertise met bouwkundige precisie. We begeleiden onze klanten van het eerste potloodschets tot de laatste finishing touch.</p>
            <div className="tzFactGrid">
              {[["18+","Jaar ervaring"],["200+","Projecten"],["12","Architecten"],["A+","Energielabel"]].map(([n,l]) => (
                <div key={l} className="tzFact"><div className="tzFactNum">{n}</div><div className="tzFactLabel">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="tzAboutImg"><img src="https://images.unsplash.com/photo-1416453072034-c8dbfa2856b7?auto=format&fit=crop&w=600&q=80" alt="Team"/></div>
        </div>
      </section>
      <section id="contact" className="tzContact">
        <div className="tzContactInner">
          <span className="tzLabel" style={{color:"rgba(255,255,255,.65)"}}>Uw project</span>
          <h2>Klaar om te<br/><em>bouwen?</em></h2>
          <p>Vertel ons over uw project. Wij plannen een gratis kennismakingsgesprek in — geen verplichtingen.</p>
          <a href="mailto:info@terrazo.be" className="tzBtnWhite">Start een gesprek →</a>
        </div>
      </section>
      <footer className="tzFooter">
        <div className="tzFooterInner">
          <div className="tzFooterLogo">Terrazo<span>.</span></div>
          <div className="tzFooterCopy">© {new Date().getFullYear()} Terrazo Build · Architectuur & Constructie</div>
        </div>
      </footer>
    </main>
  );
}