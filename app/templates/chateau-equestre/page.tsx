"use client";
import { useState, useEffect } from "react";
import "./chateau.css";

export default function ChateauEquestreTemplate() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`ceNav${scrolled ? " ceNavScrolled" : ""}`}>
        <div className="ceLogo">CHÂTEAU<span> ÉQUESTRE</span></div>
        <div className="ceNavLinks">
          <a href="#">Philosophie</a>
          <a href="#">Pension</a>
          <a href="#">Formation</a>
          <a href="#">Élevage</a>
          <a href="#">Contact</a>
        </div>
        <span className="ceNavPhone">+32 11 234 56 78</span>
      </nav>

      <section className="ceHero">
        <div className="ceHeroBg">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90" alt="Château Équestre" />
        </div>
        <div className="ceHeroOverlay" />
        <div className="ceHeroContent">
          <span className="ceHeroEmblem">⚜</span>
          <h1 className="ceHeroTitle">
            L'Excellence<br /><em>de l'art équestre</em>
          </h1>
          <p className="ceHeroSub">
            Depuis 1972, Château Équestre cultive une passion pour le cheval à travers un domaine d'exception, alliant tradition, élégance et savoir-faire ancestral.
          </p>
          <div className="ceBtns">
            <button className="ceBtnFull">Découvrir le domaine</button>
            <button className="ceBtn">Nous contacter</button>
          </div>
        </div>
      </section>

      <section className="cePhilosophy">
        <div className="cePhilInner">
          <div className="cePhilImg">
            <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=85" alt="Philosophie" />
          </div>
          <div className="cePhilText">
            <div>Notre philosophie</div>
            <h2>L'harmonie entre<br />l'homme <em>et le cheval</em></h2>
            <p>Château Équestre est bien plus qu'un haras — c'est un lieu de vie où le respect du cheval prime sur tout. Notre approche douce et naturelle, inspirée des maîtres de l'équitation classique, guide chaque interaction avec nos pensionnaires.</p>
            <p>Notre domaine de 48 hectares en Brabant flamand offre des prairies verdoyantes, des installations de premier ordre et une atmosphère de sérénité que chevaux et cavaliers apprécient dès le premier instant.</p>
            <button className="ceBtnFull">En savoir plus</button>
          </div>
        </div>
      </section>

      <section className="ceServices">
        <div className="ceServInner">
          <div className="ceServHead">
            <div>Nos prestations</div>
            <h2>Un service d'exception</h2>
          </div>
          <div className="ceServGrid">
            {[
              { num: "I", title: "Pension de luxe", desc: "Des boxes spacieuses avec litière fraîche quotidienne, sorties en paddock individuels et soins vétérinaires réguliers inclus." },
              { num: "II", title: "Formation classique", desc: "Cours particuliers et stages d'équitation classique dispensés par des écuyers certifiés, pour cavaliers amateurs et confirmés." },
              { num: "III", title: "Élevage sélectif", desc: "Sélection rigoureuse de reproducteurs warmblood belges et hollandais pour une descendance de qualité internationale." },
              { num: "IV", title: "Débourrage naturel", desc: "Approche éthologique et douce pour les jeunes chevaux, respectueuse de leur développement physique et mental." },
              { num: "V", title: "Préparation aux concours", desc: "Accompagnement complet pour la compétition en dressage et saut d'obstacles, de la qualification aux championnats." },
              { num: "VI", title: "Soirées & événements", desc: "Location du domaine pour événements privés, mariages ou journées d'entreprise dans un cadre naturel exceptionnel." },
            ].map((s) => (
              <div key={s.num} className="ceServCard">
                <div className="ceServNum">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ceCta">
        <div className="ceCtaInner">
          <div className="ceCtaEmblem">⚜</div>
          <h2>Prenez rendez-vous</h2>
          <p>Nous vous invitons à découvrir notre domaine lors d'une visite privée. Contactez-nous pour convenir d'un moment qui vous convient.</p>
          <button className="ceBtnFull">Demander une visite</button>
        </div>
      </section>

      <footer className="ceFooter">
        <div className="ceFooterInner">
          <div className="ceFooterLogo">CHÂTEAU<span> ÉQUESTRE</span></div>
          <div className="ceFooterCopy">© 2025 Château Équestre — Haras de tradition depuis 1972</div>
        </div>
      </footer>
    </>
  );
}
