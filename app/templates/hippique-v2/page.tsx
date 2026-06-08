"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROPERTIES, BLOG_POSTS, formatPrice, formatSurface } from "./data";

const BASE = "/templates/hippique-v2";

// ── Intersection Observer hook ──────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("hi-vis");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    document
      .querySelectorAll(".hi-r, .hi-r-left, .hi-r-right, .hi-r-scale, .hi-img-reveal")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Animated counter ────────────────────────────────
function Counter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1800;
        const start = performance.now();
        const animate = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(animate);
          else setVal(target);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {prefix}{val}{suffix}
    </span>
  );
}

export default function HippiqueHome() {
  useReveal();

  // Cursor
  const cursorDot  = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.left  = e.clientX + "px";
        cursorDot.current.style.top   = e.clientY + "px";
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = e.clientX + "px";
        cursorRing.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Parallax hero
  const heroBg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (heroBg.current) {
        heroBg.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.22}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 4);
  const recent   = PROPERTIES.slice(0, 6);

  return (
    <div className="hi-page">
      {/* ── Cursor ─────────────────────────────── */}
      <div ref={cursorDot}  className="hi-cursor" />
      <div ref={cursorRing} className="hi-cursor-ring" />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="hi-hero">
        {/* Hero video */}
        <video
          className="hi-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://rqcjcikemgcqcgxltjfe.supabase.co/storage/v1/object/public/mswebs/Ontwerp%20zonder%20titel%20(6).mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div
          ref={heroBg}
          className="hi-hero-bg"
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "center center",
            background: `
              linear-gradient(
                160deg,
                rgba(8,7,5,0.25) 0%,
                rgba(8,7,5,0.55) 50%,
                rgba(8,7,5,0.92) 100%
              ),
              radial-gradient(
                ellipse at 65% 35%,
                rgba(237,110,33,0.12) 0%,
                transparent 55%
              )
            `,
          }}
        />
        <div className="hi-hero-grain" />

        {/* Decorative line grid */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.04,
            zIndex: 1,
          }}
          preserveAspectRatio="none"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={`${(i / 11) * 100}%`} y1="0"
              x2={`${(i / 11) * 100}%`} y2="100%"
              stroke="white" strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i + 100}
              x1="0" y1={`${(i / 7) * 100}%`}
              x2="100%" y2={`${(i / 7) * 100}%`}
              stroke="white" strokeWidth="0.5"
            />
          ))}
        </svg>

        <div className="hi-hero-content" style={{ position: "relative", zIndex: 2 }}>
          {/* Eyebrow */}
          <div className="hi-hero-eyebrow">
            <span className="hi-hero-eyebrow-line" />
            <span className="hi-label">Hippisch vastgoed · Benelux & Noord-Frankrijk</span>
          </div>

          {/* Headline */}
          <h1 className="hi-hero-h1">
            Uitzonderlijk<br />
            hippisch<br />
            <em>vastgoed.</em>
          </h1>

          <p className="hi-hero-sub">
            Stoeterijen, maneges, landgoederen en kasteeldomeinen — discreet bemiddeld door specialisten met 15 jaar ervaring in de sector.
          </p>

          <div className="hi-hero-ctas">
            <Link href={`${BASE}/aanbod`} className="hi-btn hi-btn-orange hi-btn-arrow">
              Bekijk ons aanbod
            </Link>
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline">
              Gratis schatting aanvragen
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hi-hero-scroll">
          <div className="hi-scroll-line" />
          <span>Scroll</span>
        </div>

        {/* Bottom info strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 72,
            background: "rgba(8,7,5,0.7)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 80px",
            gap: 48,
            zIndex: 3,
            animation: "fadeIn 1s 1.6s both",
          }}
        >
          {[
            { label: "Actief aanbod", val: "58 panden" },
            { label: "Ervaring",      val: "15 jaar" },
            { label: "Transacties",   val: "340+" },
            { label: "Regio's",       val: "BE · NL · FR" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--grey)" }}>
                {s.label}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--warm-white)", fontWeight: 400 }}>
                {s.val}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROPERTIES
      ══════════════════════════════════════════ */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div className="hi-section-head">
            <div className="hi-r">
              <span className="hi-label">Uitgelicht aanbod</span>
            </div>
            <h2 className="hi-section-title hi-r hi-r-d1">
              Uitzonderlijke<br /><em>eigendommen</em>
            </h2>
            <p className="hi-section-desc hi-r hi-r-d2">
              Een selectie van onze meest exclusieve hippische eigendommen — elk met een verhaal.
            </p>
          </div>

          {/* Hero featured card */}
          {featured[0] && (
            <Link href={`${BASE}/aanbod/${featured[0].id}`} className="hi-featured-card hi-r">
              <div className="hi-featured-img hi-img-reveal">
                <div style={{ background: featured[0].gradient, width: "100%", height: "100%", minHeight: 460 }} />
              </div>
              <div className="hi-featured-body">
                <div>
                  <span className="hi-label" style={{ display: "block", marginBottom: 8 }}>
                    {featured[0].type} · {featured[0].country}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 400, marginBottom: 12, lineHeight: 1.1 }}>
                    {featured[0].title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: 18, color: "var(--stone)", marginBottom: 24 }}>
                    {featured[0].subtitle}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {[
                      { label: "Oppervlakte", val: formatSurface(featured[0].groundSurface) },
                      { label: "Stallen",     val: `${featured[0].stalls} stallen` },
                      { label: "Locatie",     val: featured[0].location },
                    ].map((s) => (
                      <div key={s.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-dark)", paddingBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "var(--grey)" }}>{s.label}</span>
                        <span style={{ fontSize: 13, color: "var(--warm-white)" }}>{s.val}</span>
                      </div>
                    ))}
                  </div>
                  {featured[0].indoorArena && (
                    <span className="hi-label-stone" style={{ display: "block", marginBottom: 4 }}>✓ Overdekte rijhal</span>
                  )}
                  {featured[0].outdoorArena && (
                    <span className="hi-label-stone" style={{ display: "block", marginBottom: 16 }}>✓ Buitenpiste</span>
                  )}
                </div>
                <div>
                  <div className="hi-prop-price" style={{ marginBottom: 8 }}>
                    {featured[0].priceOnRequest ? "Prijs op aanvraag" : formatPrice(featured[0].price!)}
                  </div>
                  <span className="hi-btn hi-btn-orange hi-btn-arrow" style={{ display: "inline-flex" }}>
                    Bekijk eigendom
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* 3-grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginTop: 24,
            }}
          >
            {featured.slice(1, 4).map((p, i) => (
              <Link
                key={p.id}
                href={`${BASE}/aanbod/${p.id}`}
                className={`hi-prop-card hi-r hi-r-d${i + 1}`}
              >
                <div className="hi-prop-img-wrap hi-img-reveal">
                  <div
                    className="hi-prop-img-placeholder"
                    style={{ background: p.gradient }}
                  />
                </div>
                {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                {p.featured && <span className="hi-prop-featured-badge">Uitgelicht</span>}
                <div className="hi-prop-body">
                  <p className="hi-prop-loc">{p.location}</p>
                  <h3 className="hi-prop-title">{p.title}</h3>
                  <div className="hi-prop-stats">
                    <span className="hi-prop-stat">
                      <span className="hi-prop-stat-icon">⬡</span>
                      {formatSurface(p.groundSurface)}
                    </span>
                    <span className="hi-prop-stat">
                      <span className="hi-prop-stat-icon">⬡</span>
                      {p.stalls} stallen
                    </span>
                    {p.indoorArena && (
                      <span className="hi-prop-stat" style={{ color: "var(--orange)", fontSize: 12 }}>
                        Rijhal
                      </span>
                    )}
                  </div>
                  <div className="hi-prop-divider" />
                  <div className="hi-prop-footer">
                    <span className="hi-prop-price">
                      {p.priceOnRequest ? "Op aanvraag" : formatPrice(p.price!)}
                    </span>
                    <span className="hi-prop-link">Bekijk →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href={`${BASE}/aanbod`} className="hi-btn hi-btn-outline hi-btn-arrow hi-r">
              Volledig aanbod bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--anthracite)", padding: "0 80px" }}>
        <div className="hi-container">
          <div className="hi-stats-row">
            {[
              { label: "Hippische transacties",  num: 340, suffix: "+" },
              { label: "Jaar specialisatie",     num: 15,  suffix: "" },
              { label: "Eigendommen in portefeuille", num: 58, suffix: "" },
              { label: "Landen actief",          num: 3,   suffix: "" },
            ].map((s) => (
              <div key={s.label} className="hi-stat-item hi-r">
                <div className="hi-stat-num">
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div className="hi-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERTISE – SPLIT SECTION
      ══════════════════════════════════════════ */}
      <section className="hi-split hi-split-black">
        {/* Image side */}
        <div className="hi-split-img hi-img-reveal hi-r-scale">
          <div
            className="hi-split-img-placeholder"
            style={{
              background: "linear-gradient(135deg, #0c0e18 0%, #1a1020 40%, #0a0c14 100%)",
              display: "flex",
              alignItems: "flex-end",
              padding: 40,
            }}
          >
            {/* Decorative quote */}
            <blockquote style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px,2vw,26px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
              &ldquo;In de hippische wereld draait alles om<br />vertrouwen en diepgaande expertise.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Content side */}
        <div className="hi-split-content" style={{ background: "var(--anthracite)" }}>
          <span className="hi-accent-line" />
          <span className="hi-label hi-r">Onze expertise</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
            15 jaar specialist<br />in <em>hippisch vastgoed</em>
          </h2>
          <p className="hi-section-desc hi-r hi-r-d2" style={{ marginTop: 20, maxWidth: "100%" }}>
            Hippique.immo is het enige kantoor dat uitsluitend gespecialiseerd is in hippisch en landelijk vastgoed. Wij spreken uw taal — die van de ruiter, de fokker, de investeerder.
          </p>
          <div
            style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              "Stoeterijen & fokkerijen",
              "Maneges & pensionstallen",
              "Landgoederen & kasteeldomeinen",
              "Hippische projectontwikkeling",
              "Internationale transacties",
            ].map((item, i) => (
              <div
                key={item}
                className={`hi-r hi-r-d${i + 1}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingBottom: 14,
                  borderBottom: "1px solid var(--border-dark)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: "var(--stone)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36 }} className="hi-r hi-r-d5">
            <Link href={`${BASE}/over-ons`} className="hi-btn hi-btn-orange hi-btn-arrow">
              Ons verhaal
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SELL SECTION
      ══════════════════════════════════════════ */}
      <section className="hi-sell-section hi-section">
        <div className="hi-sell-bg-gradient" />
        <div className="hi-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
              marginBottom: 80,
            }}
          >
            <div>
              <span className="hi-label hi-r">Verkopen</span>
              <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
                Uw eigendom.<br /><em>Onze expertise.</em>
              </h2>
            </div>
            <div>
              <p className="hi-section-desc hi-r" style={{ maxWidth: "100%", fontSize: 17 }}>
                Van waardebepaling tot akte — wij begeleiden de verkoop van uw hippische eigendom met tact, discretie en een uniek netwerk van gekwalificeerde kopers wereldwijd.
              </p>
              <div style={{ marginTop: 28 }} className="hi-r hi-r-d2">
                <Link href={`${BASE}/verkopen`} className="hi-btn hi-btn-orange hi-btn-arrow">
                  Meer over verkopen
                </Link>
              </div>
            </div>
          </div>

          <div className="hi-sell-steps">
            {[
              { num: "01", title: "Kennismaking & analyse", desc: "Wij komen ter plaatse voor een grondige analyse van uw eigendom en een eerlijk waardeadvies." },
              { num: "02", title: "Marketingplan",          desc: "Een op maat gemaakt plan: professionele fotografie, internationale exposure en discreet netwerk." },
              { num: "03", title: "Kopersbegeleiding",      desc: "Wij screenen kandidaat-kopers en begeleiden elk bezoek persoonlijk en professioneel." },
              { num: "04", title: "Tot aan de akte",        desc: "Van onderhandeling tot notariële akte: uw vertrouwde partner in elke fase van de transactie." },
            ].map((s, i) => (
              <div key={s.num} className={`hi-sell-step hi-r hi-r-d${i + 1}`}>
                <div className="hi-sell-step-num">{s.num}</div>
                <div className="hi-sell-step-title">{s.title}</div>
                <p className="hi-sell-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECENT PROPERTIES GRID
      ══════════════════════════════════════════ */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div className="hi-section-head">
            <span className="hi-label hi-r">Nieuwste panden</span>
            <h2 className="hi-section-title hi-r hi-r-d1">Recent toegevoegd</h2>
          </div>
          <div className="hi-prop-grid">
            {recent.map((p, i) => (
              <Link
                key={p.id}
                href={`${BASE}/aanbod/${p.id}`}
                className={`hi-prop-card hi-r hi-r-d${(i % 3) + 1}`}
              >
                <div className="hi-prop-img-wrap hi-img-reveal">
                  <div className="hi-prop-img-placeholder" style={{ background: p.gradient }} />
                </div>
                {p.tag && <span className="hi-prop-tag">{p.tag}</span>}
                <div className="hi-prop-body">
                  <p className="hi-prop-loc">{p.province}, {p.country}</p>
                  <h3 className="hi-prop-title">{p.title}</h3>
                  <div className="hi-prop-stats">
                    <span className="hi-prop-stat">{formatSurface(p.groundSurface)}</span>
                    <span className="hi-prop-stat">{p.stalls} stallen</span>
                    <span className="hi-prop-stat">{p.type}</span>
                  </div>
                  <div className="hi-prop-divider" />
                  <div className="hi-prop-footer">
                    <span className="hi-prop-price">
                      {p.priceOnRequest ? "Op aanvraag" : formatPrice(p.price!)}
                    </span>
                    <span className="hi-prop-link">Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUOTE / TESTIMONIAL
      ══════════════════════════════════════════ */}
      <section
        className="hi-section"
        style={{ background: "var(--anthracite)", borderTop: "1px solid var(--border-dark)", borderBottom: "1px solid var(--border-dark)" }}
      >
        <div className="hi-container">
          <div className="hi-quote-wrap hi-r">
            <div className="hi-quote-mark">&ldquo;</div>
            <p className="hi-quote-text">
              Hippique Immo begrijpt de waarde van een hippische eigendom zoals geen ander. Ze hebben onze stoeterij verkocht aan de ideale koper — discreet, snel en boven de verwachte prijs.
            </p>
            <p className="hi-quote-author">— Familie Verbruggen, Stoeterij De Beukenhof, Oost-Vlaanderen</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════════ */}
      <section className="hi-section-sm" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="hi-label-stone hi-r">Onze partners</span>
          </div>
          <div className="hi-partners-strip hi-r">
            {[
              "De Brabander Sport",
              "Strohandel Roose",
              "Krismar Horse Trucks",
              "DM.Equine",
              "De Bosdreef",
              "Feral Group",
            ].map((name) => (
              <div
                key={name}
                className="hi-partner-item"
                style={{
                  padding: "8px 20px",
                  border: "1px solid var(--border-dark)",
                  borderRadius: 2,
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  color: "var(--stone)",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════ */}
      <section id="blog" className="hi-section" style={{ background: "var(--anthracite)" }}>
        <div className="hi-container">
          <div className="hi-section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span className="hi-label hi-r">Inzichten</span>
              <h2 className="hi-section-title hi-r hi-r-d1">Blog & expertise</h2>
            </div>
            <Link href="#" className="hi-btn hi-btn-outline hi-r" style={{ marginBottom: 4 }}>
              Alle artikels
            </Link>
          </div>
          <div className="hi-blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <Link key={post.id} href="#" className={`hi-blog-card hi-r hi-r-d${i + 1}`}>
                <div className="hi-blog-img-wrap">
                  <div style={{ background: post.gradient, width: "100%", height: "100%" }} />
                </div>
                <div className="hi-blog-body">
                  <p className="hi-blog-cat">{post.category}</p>
                  <h3 className="hi-blog-title">{post.title}</h3>
                  <p className="hi-blog-excerpt">{post.excerpt}</p>
                  <p className="hi-blog-meta">{post.date} · {post.readTime} min leestijd</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════ */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <h2 className="hi-cta-band-title hi-r">
            Wil u uw eigendom laten schatten?
          </h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#contact" className="hi-btn hi-btn-orange">Gratis schatting aanvragen</a>
            <a href="#aanbod" className="hi-btn hi-btn-ghost">Bekijk ons aanbod</a>
          </div>
        </div>
      </div>
    </div>
  );
}
