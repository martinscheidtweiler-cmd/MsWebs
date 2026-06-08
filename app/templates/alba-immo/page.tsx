"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROPERTIES, BLOG_POSTS, formatPrice, formatSurface } from "./data";
import { useLang } from "./LangContext";

const BASE = "/templates/alba-immo";

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
  const { t } = useLang();

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
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="hi-hero">
        {/* Video background */}
        <div
          ref={heroBg}
          className="hi-hero-bg"
          style={{ position: "absolute", inset: "-8%", transformOrigin: "center center", overflow: "hidden" }}
        >
          <video
            autoPlay muted loop playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
            src="https://rqcjcikemgcqcgxltjfe.supabase.co/storage/v1/object/public/mswebs/Ontwerp%20zonder%20titel%20(6).mp4"
          />
          {/* Dark gradient overlay on top of video */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: `
              linear-gradient(160deg, rgba(8,7,5,0.35) 0%, rgba(8,7,5,0.72) 55%, rgba(8,7,5,0.97) 100%),
              radial-gradient(ellipse at 65% 35%, rgba(237,110,33,0.08) 0%, transparent 55%)
            `,
          }} />
        </div>
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
            <span className="hi-label">{t.hero_eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="hi-hero-h1">
            {t.hero_h1_1}<br />
            {t.hero_h1_2}<br />
            <em>{t.hero_h1_3}</em>
          </h1>

          <p className="hi-hero-sub">
            {t.hero_sub}
          </p>

          <div className="hi-hero-ctas">
            <Link href={`${BASE}/aanbod`} className="hi-btn hi-btn-orange hi-btn-arrow">
              {t.hero_cta1}
            </Link>
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline">
              {t.hero_cta2}
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
            { label: t.hero_stat1_label, val: t.hero_stat1_val },
            { label: t.hero_stat2_label, val: t.hero_stat2_val },
            { label: t.hero_stat3_label, val: t.hero_stat3_val },
            { label: t.hero_stat4_label, val: t.hero_stat4_val },
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
              <span className="hi-label">{t.feat_label}</span>
            </div>
            <h2 className="hi-section-title hi-r hi-r-d1">
              {t.feat_title1}<br /><em>{t.feat_title2}</em>
            </h2>
            <p className="hi-section-desc hi-r hi-r-d2">
              {t.feat_desc}
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
                      { label: t.feat_surface, val: formatSurface(featured[0].groundSurface) },
                      { label: t.feat_stalls, val: `${featured[0].stalls}${t.feat_stallsSuffix}` },
                      { label: t.feat_location, val: featured[0].location },
                    ].map((s) => (
                      <div key={s.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-dark)", paddingBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "var(--grey)" }}>{s.label}</span>
                        <span style={{ fontSize: 13, color: "var(--warm-white)" }}>{s.val}</span>
                      </div>
                    ))}
                  </div>
                  {featured[0].indoorArena && (
                    <span className="hi-label-stone" style={{ display: "block", marginBottom: 4 }}>{t.feat_indoorArena}</span>
                  )}
                  {featured[0].outdoorArena && (
                    <span className="hi-label-stone" style={{ display: "block", marginBottom: 16 }}>{t.feat_outdoorArena}</span>
                  )}
                </div>
                <div>
                  <div className="hi-prop-price" style={{ marginBottom: 8 }}>
                    {featured[0].priceOnRequest ? t.feat_priceOnRequest : formatPrice(featured[0].price!)}
                  </div>
                  <span className="hi-btn hi-btn-orange hi-btn-arrow" style={{ display: "inline-flex" }}>
                    {t.feat_viewProp}
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
                {p.featured && <span className="hi-prop-featured-badge">{t.feat_featured}</span>}
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
                      {p.stalls}{t.feat_stallsSuffix}
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
                      {p.priceOnRequest ? t.feat_onRequest : formatPrice(p.price!)}
                    </span>
                    <span className="hi-prop-link">{t.feat_view}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href={`${BASE}/aanbod`} className="hi-btn hi-btn-outline hi-btn-arrow hi-r">
              {t.feat_viewBtn}
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
              { label: t.stat1_label, num: 340, suffix: "+" },
              { label: t.stat2_label, num: 15, suffix: "" },
              { label: t.stat3_label, num: 58, suffix: "" },
              { label: t.stat4_label, num: 3, suffix: "" },
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
              {t.exp_quote}
            </blockquote>
          </div>
        </div>

        {/* Content side */}
        <div className="hi-split-content" style={{ background: "var(--anthracite)" }}>
          <span className="hi-accent-line" />
          <span className="hi-label hi-r">{t.exp_label}</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
            {t.exp_title1}<br />in <em>{t.exp_title2}</em>
          </h2>
          <p className="hi-section-desc hi-r hi-r-d2" style={{ marginTop: 20, maxWidth: "100%" }}>
            {t.exp_desc}
          </p>
          <div
            style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              t.exp_item1,
              t.exp_item2,
              t.exp_item3,
              t.exp_item4,
              t.exp_item5,
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
              {t.exp_btn}
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
              <span className="hi-label hi-r">{t.sell_label}</span>
              <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
                {t.sell_title1}<br /><em>{t.sell_title2}</em>
              </h2>
            </div>
            <div>
              <p className="hi-section-desc hi-r" style={{ maxWidth: "100%", fontSize: 17 }}>
                {t.sell_desc}
              </p>
              <div style={{ marginTop: 28 }} className="hi-r hi-r-d2">
                <Link href={`${BASE}/verkopen`} className="hi-btn hi-btn-orange hi-btn-arrow">
                  {t.sell_btn}
                </Link>
              </div>
            </div>
          </div>

          <div className="hi-sell-steps">
            {[
              { num: t.sell_step1_num, title: t.sell_step1_title, desc: t.sell_step1_desc },
              { num: t.sell_step2_num, title: t.sell_step2_title, desc: t.sell_step2_desc },
              { num: t.sell_step3_num, title: t.sell_step3_title, desc: t.sell_step3_desc },
              { num: t.sell_step4_num, title: t.sell_step4_title, desc: t.sell_step4_desc },
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
            <span className="hi-label hi-r">{t.recent_label}</span>
            <h2 className="hi-section-title hi-r hi-r-d1">{t.recent_title}</h2>
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
                    <span className="hi-prop-stat">{p.stalls}{t.feat_stallsSuffix}</span>
                    <span className="hi-prop-stat">{p.type}</span>
                  </div>
                  <div className="hi-prop-divider" />
                  <div className="hi-prop-footer">
                    <span className="hi-prop-price">
                      {p.priceOnRequest ? t.feat_onRequest : formatPrice(p.price!)}
                    </span>
                    <span className="hi-prop-link">{t.feat_details}</span>
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
              {t.quote_text}
            </p>
            <p className="hi-quote-author">{t.quote_author}</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════════ */}
      <section className="hi-section-sm" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="hi-label-stone hi-r">{t.partners_label}</span>
          </div>
          <div className="hi-partners-strip hi-r">
            {[
              { name: "De Brabander · Stal De Muze", file: "de-brabander.png", dark: false },
              { name: "Strohandel Roose",            file: "roose.png",        dark: true  },
              { name: "Krismar Horse Trucks",        file: "krismar.png",      dark: false },
              { name: "DM Equine",                   file: "dm-equine.png",    dark: true  },
              { name: "Bosdreef Veterinary",         file: "bosdreef.png",     dark: false },
              { name: "Feral Group",                 file: "feral-group.png",  dark: false },
            ].map((p) => (
              <div key={p.name} className="hi-partner-item"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 8px" }}>
                <img
                  src={`/hippique/partners/${p.file}`}
                  alt={p.name}
                  style={{
                    maxHeight: 52, maxWidth: 140, width: "auto", objectFit: "contain",
                    filter: p.dark ? "grayscale(1) brightness(2)" : "grayscale(1) brightness(0) invert(1)",
                    opacity: 0.55,
                    transition: "opacity 0.3s, filter 0.3s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "1";
                    el.style.filter = p.dark ? "grayscale(0) brightness(1.1)" : "grayscale(0) brightness(1)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "0.55";
                    el.style.filter = p.dark ? "grayscale(1) brightness(2)" : "grayscale(1) brightness(0) invert(1)";
                  }}
                />
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
              <span className="hi-label hi-r">{t.blog_label}</span>
              <h2 className="hi-section-title hi-r hi-r-d1">{t.blog_title}</h2>
            </div>
            <Link href="#" className="hi-btn hi-btn-outline hi-r" style={{ marginBottom: 4 }}>
              {t.blog_allBtn}
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
                  <p className="hi-blog-meta">{post.date} · {post.readTime} {t.blog_readTime}</p>
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
            {t.cta_title}
          </h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="hi-r hi-r-d2">
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline">
              {t.cta_btn}
            </Link>
            <Link href="tel:+32495915020" className="hi-btn" style={{ color: "#fff", gap: 8, padding: "14px 24px" }}>
              +32 (0)495 91 50 20
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}