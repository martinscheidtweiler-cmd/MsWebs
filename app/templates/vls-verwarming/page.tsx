"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import VlsNav from "./VlsNav";
import VlsFooter from "./VlsFooter";
import "./vls.css";

const BASE = "/templates/vls-verwarming";

const CHAPTERS = [
  {
    num: "01 / 03",
    title: "Uw woning\nwarm houden.",
    sub: "Installatie, onderhoud en depannage van uw verwarmingsketel. Alle grote merken.",
  },
  {
    num: "02 / 03",
    title: "Sanitair van\nhoge kwaliteit.",
    sub: "Van een lekkende kraan tot een volledige badkamerrenovatie. Vakkundig en netjes.",
  },
  {
    num: "03 / 03",
    title: "Airco en\nventilatie.",
    sub: "Energiezuinige airconditioningsystemen en ventilatiesystemen type C & D.",
  },
];

const SERVICES = [
  { num: "01", title: "Verwarming", desc: "Condensatieketels plaatsen, jaarlijks onderhoud, keuring en depannage. Vaillant, Buderus, Viessmann, Junkers." },
  { num: "02", title: "Sanitair", desc: "Leidingwerk, kranen, douches, toiletten. Kleine herstellingen of volledige badkamerrenovatie." },
  { num: "03", title: "Airco", desc: "Energiezuinige split-units voor woning en bedrijf. Plaatsing en jaarlijks onderhoud." },
  { num: "04", title: "Waterbehandeling", desc: "Waterontharders en anti-kalk systemen. Bescherm uw ketel en leidingen tegen kalkaanslag." },
  { num: "05", title: "Ventilatie", desc: "Systemen type C en D — balansventilatie met warmterecuperatie voor gezonde binnenlucht." },
  { num: "06", title: "Depannage & onderhoud", desc: "Panne? Sven is snel ter plaatse. Jaarlijkse onderhoudscontracten voor zorgeloos comfort." },
];

type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };

export default function VlsHome() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    const addGlow = (cx: number, cy: number, radius: number, r: number, g: number, b: number, alpha: number) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const p = progressRef.current;
      t += 0.008;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, w, h);

      // Scene 1 — Heat/fire (0 → 0.4)
      const heat = Math.max(0, 1 - p / 0.4);
      if (heat > 0) {
        addGlow(w * 0.5 + Math.sin(t * 0.6) * 60, h * 0.75, h * 0.8, 180, 55, 12, 0.45 * heat);
        addGlow(w * 0.3 + Math.cos(t * 0.4) * 40, h * 0.6, h * 0.5, 220, 90, 20, 0.25 * heat);
        addGlow(w * 0.7 + Math.sin(t * 0.5) * 30, h * 0.8, h * 0.4, 150, 35, 5, 0.3 * heat);
      }

      // Scene 2 — Water/blue (0.25 → 0.75)
      const waterRaw = p < 0.25 ? 0 : p > 0.75 ? 0 : p < 0.5 ? (p - 0.25) / 0.25 : (0.75 - p) / 0.25;
      if (waterRaw > 0) {
        addGlow(w * 0.35 + Math.sin(t * 0.4) * 50, h * 0.45, h * 0.75, 37, 99, 235, 0.4 * waterRaw);
        addGlow(w * 0.75 + Math.cos(t * 0.3) * 40, h * 0.3, h * 0.5, 96, 165, 250, 0.25 * waterRaw);
      }

      // Scene 3 — Air/cool (0.6 → 1)
      const air = Math.max(0, (p - 0.6) / 0.4);
      if (air > 0) {
        addGlow(w * 0.6 + Math.cos(t * 0.35) * 60, h * 0.35, h * 0.7, 147, 210, 255, 0.32 * air);
        addGlow(w * 0.25 + Math.sin(t * 0.28) * 40, h * 0.2, h * 0.45, 37, 99, 235, 0.18 * air);
      }

      // Particles — color shifts with scene
      const pr = heat > 0.3 ? 200 : waterRaw > 0.3 ? 96 : 147;
      const pg = heat > 0.3 ? 80 : waterRaw > 0.3 ? 165 : 210;
      const pb = heat > 0.3 ? 20 : 250;

      particles.forEach((pt) => {
        pt.x += pt.vx + Math.sin(t * 0.5 + pt.y * 8) * 0.00008;
        pt.y += pt.vy - (heat > 0.3 ? 0.0003 : 0); // particles rise with heat
        if (pt.x < 0) pt.x = 1;
        if (pt.x > 1) pt.x = 0;
        if (pt.y < 0) pt.y = 1;
        if (pt.y > 1) pt.y = 0;

        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${pt.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    let ticking = false;
    const handleScroll = () => {
      const section = scrollSectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        const raw = Math.min(1, Math.max(0, -rect.top / total));
        progressRef.current = raw;
        if (!ticking) {
          requestAnimationFrame(() => {
            setScrollProgress(raw);
            ticking = false;
          });
          ticking = true;
        }
      }
      setNavScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const chapterIndex =
    scrollProgress < 0.33 ? 0 : scrollProgress < 0.66 ? 1 : 2;

  return (
    <>
      {/* NAV */}
      <nav className={`vlsNav${navScrolled ? " scrolled" : ""}`}>
        <Link href={BASE} className="vlsNavLogo">
          <img src="/portfolio/vls-logo.svg" alt="VLS Verwarming" className="vlsNavLogoImg" />
        </Link>
        <div className="vlsNavLinks">
          <Link href={BASE}>Home</Link>
          <Link href={`${BASE}/diensten`}>Diensten</Link>
          <Link href={`${BASE}/contact`}>Contact</Link>
        </div>
        <Link href={`${BASE}/contact`} className="vlsNavCta">Offerte aanvragen</Link>
      </nav>

      {/* ── HERO ── */}
      <section className="vlsHero">
        <div className="vlsHeroBg" />
        <div className="vlsHeroGrain" />
        <div className="vlsHeroContent">
          <div>
            <div className="vlsHeroEyebrow">Erkend installateur · Nijlen</div>
            <h1 className="vlsHeroTitle">
              VLS<br />
              <span className="vlsHeroTitleBlue">Verwarming</span>
            </h1>
            <p className="vlsHeroDesc">
              Sven Van Leuffelen — specialist voor verwarming, sanitair,
              airco en ventilatie. Persoonlijk contact, vakkundig werk,
              eerlijke prijs.
            </p>
            <div className="vlsHeroBtns">
              <a href="tel:+32498232625" className="vlsBtnPrimary">📞 Bel Sven</a>
              <Link href={`${BASE}/contact`} className="vlsBtnGhost">Offerte aanvragen →</Link>
            </div>
          </div>

          <div className="vlsHeroRight">
            <div className="vlsHeroCard">
              <div className="vlsHeroCardHead">
                <div className="vlsHeroCardIcon">🔥</div>
                <div>
                  <div className="vlsHeroCardName">VLS Verwarming</div>
                  <div className="vlsHeroCardSub">Sven Van Leuffelen · Nijlen</div>
                </div>
              </div>
              <div className="vlsHeroCardStars">★★★★★</div>
              <div className="vlsHeroCardScoreSub">Tevreden vaste klanten</div>
              <hr className="vlsHeroDivider" />
              <div className="vlsHeroCardFeats">
                {["Snel ter plaatse bij depannage", "Alle merken — Vaillant, Buderus...", "Transparante prijs, eerlijk advies", "Netjes afgewerkt, geen rommel"].map((f) => (
                  <div key={f} className="vlsHeroCardFeat">
                    <div className="vlsHeroCardFeatDot" />
                    <span className="vlsHeroCardFeatText">{f}</span>
                  </div>
                ))}
              </div>
              <a href="tel:+32498232625" className="vlsHeroPhone">
                <span>📞</span>
                <span className="vlsHeroPhoneNum">+32 498 23 26 25</span>
              </a>
            </div>
          </div>
        </div>

        <div className="vlsScrollHint">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ── SCROLL CANVAS VIDEO ── */}
      <div ref={scrollSectionRef} className="vlsScrollOuter">
        <div className="vlsScrollSticky">
          <canvas ref={canvasRef} className="vlsScrollCanvas" />

          <div className="vlsScrollOverlay">
            <div className="vlsScrollChapters">
              {CHAPTERS.map((ch, i) => (
                <div
                  key={i}
                  className={`vlsChapter${chapterIndex === i ? " visible" : " hidden"}`}
                >
                  <div className="vlsChapterNum">{ch.num}</div>
                  <h2 className="vlsChapterTitle">
                    {ch.title.split("\n").map((line, j) => (
                      <span key={j} style={{ display: "block" }}>{line}</span>
                    ))}
                  </h2>
                  <p className="vlsChapterSub">{ch.sub}</p>
                </div>
              ))}

              {/* Dots */}
              <div className="vlsScrollDots">
                {CHAPTERS.map((_, i) => (
                  <div key={i} className={`vlsScrollDot${chapterIndex === i ? " active" : ""}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="vlsScrollProgress">
            <div className="vlsScrollProgressBar" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </div>
      </div>
      {/* SERVICES */}
      <section className="vlsServSection">
        <div className="vlsServInner">
          <div className="vlsServHeader">
            <h2 className="vlsServHeaderTitle">Wat wij doen</h2>
            <p className="vlsServHeaderSub">Alles wat uw thuis comfortabel en warm houdt.</p>
          </div>
          <div className="vlsServList">
            {SERVICES.map((s) => (
              <div key={s.num} className="vlsServItem">
                <div className="vlsServItemNum">{s.num}</div>
                <div className="vlsServItemMain">
                  <div className="vlsServItemTitle">{s.title}</div>
                  <div className="vlsServItemDesc">{s.desc}</div>
                </div>
                <div className="vlsServItemArrow">{"→"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="vlsStatsSection">
        <div className="vlsStatsGrid">
          {[
            { num: "10+", label: "Trouwe klanten", sub: "vertrouwen Sven al jaren", blue: true },
            { num: "5", label: "Diensten", sub: "verwarming tot ventilatie", blue: false },
            { num: "5/5", label: "Reviews", sub: "tevreden klanten op Google", blue: false },
            { num: "Nijlen", label: "Werkgebied", sub: "& ruime omgeving", blue: false },
          ].map((s, i) => (
            <div key={i} className="vlsStatItem">
              <div className={`vlsStatNum${s.blue ? " blue" : ""}`}>{s.num}</div>
              <div className="vlsStatLabel"><strong>{s.label}</strong>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW */}
      <section className="vlsReviewSection">
        <div className="vlsReviewInner">
          <div className="vlsReviewQuote">{"“"}</div>
          <p className="vlsReviewText">
            Wij zijn al 10 jaar klant en nog steeds zeer tevreden van VLS.
            Hier krijg je steevast een goede en duidelijke uitleg.
            Heb je een probleem, maakt hij zo snel mogelijk tijd.
          </p>
          <div className="vlsReviewAuthor">
            <div className="vlsReviewAuthorDot" />
            <div className="vlsReviewAuthorName">Els V. {"—"} vaste klant</div>
            <div className="vlsReviewStars">{"★★★★★"}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vlsCtaSection">
        <div className="vlsCtaBg" />
        <div className="vlsCtaInner">
          <div>
            <div className="vlsCtaLabel">Klaar om te starten?</div>
            <h2 className="vlsCtaTitle">{"Eén telefoontje is genoeg."}</h2>
            <p className="vlsCtaSub">
              Vertel Sven wat er aan de hand is. Snel ter plaatse,
              netjes afgewerkt, eerlijke prijs.
            </p>
          </div>
          <div className="vlsCtaRight">
            <a href="tel:+32498232625" className="vlsCtaPhoneCard">
              <div className="vlsCtaPhoneIcon">{"📞"}</div>
              <div>
                <div className="vlsCtaPhoneLabel">Bel Sven rechtstreeks</div>
                <div className="vlsCtaPhoneNum">+32 498 23 26 25</div>
              </div>
            </a>
            <div className="vlsCtaOr">
              <div className="vlsCtaOrLine" />
              <div className="vlsCtaOrTxt">of</div>
              <div className="vlsCtaOrLine" />
            </div>
            <Link href={`${BASE}/contact`} className="vlsCtaFormLink">
              Stuur een bericht of vraag een offerte aan
            </Link>
          </div>
        </div>
      </section>

      <VlsFooter />
    </>
  );
}
