"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "../LangContext";

const BASE = "/templates/alba-immo";

export default function VerkopenPage() {
  const { t } = useLang();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".hi-r, .hi-r-left, .hi-r-right, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hi-page">
      {/* HERO */}
      <section
        style={{
          paddingTop: "var(--nav-h)",
          minHeight: "70vh",
          background: "var(--anthracite)",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 30%, rgba(237,110,33,0.09) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(237,110,33,0.04) 0%, transparent 50%)",
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }} preserveAspectRatio="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={`${(i / 7) * 100}%`} y1="0" x2={`${(i / 7) * 100}%`} y2="100%" stroke="white" strokeWidth="1" />
          ))}
        </svg>
        <div className="hi-container" style={{ padding: "0 80px 100px", position: "relative", zIndex: 2 }}>
          <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>{t.verkopen_label}</span>
          <h1
            className="hi-r hi-r-d1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px,7vw,100px)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 800,
            }}
          >
            {t.verkopen_title1}<br />
            <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.verkopen_title2}</em>
          </h1>
          <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 18, maxWidth: 480, marginTop: 24, lineHeight: 1.7 }}>
            {t.verkopen_desc}
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }} className="hi-r hi-r-d3">
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange hi-btn-arrow">{t.verkopen_btn}</Link>
            <a href="tel:+32495915020" className="hi-btn hi-btn-outline">+32 (0)495 91 50 20</a>
          </div>
        </div>
      </section>

      {/* WHY HIPPIQUE */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="hi-label hi-r">{t.verkopen_whyLabel}</span>
              <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
                {t.verkopen_whyTitle}
              </h2>
            </div>
            <div style={{ paddingTop: 16 }}>
              {[t.verkopen_why1, t.verkopen_why2, t.verkopen_why3, t.verkopen_why4, t.verkopen_why5].map((why, i) => (
                <div
                  key={i}
                  className={`hi-r hi-r-d${i + 1}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border-dark)",
                  }}
                >
                  <span style={{ color: "var(--orange)", fontSize: 18, flexShrink: 0 }}>◎</span>
                  <span style={{ color: "var(--stone)", fontSize: 16 }}>{why}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="hi-sell-section hi-section">
        <div className="hi-sell-bg-gradient" />
        <div className="hi-container">
          <span className="hi-label hi-r">{t.verkopen_label}</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, maxWidth: 480 }}>
            {t.verkopen_title1}<br /><em>{t.verkopen_title2}</em>
          </h2>
          <div className="hi-sell-steps" style={{ marginTop: 64 }}>
            {[
              { num: "01", title: t.verkopen_step1, desc: t.verkopen_step1d },
              { num: "02", title: t.verkopen_step2, desc: t.verkopen_step2d },
              { num: "03", title: t.verkopen_step3, desc: t.verkopen_step3d },
              { num: "04", title: t.verkopen_step4, desc: t.verkopen_step4d },
            ].map((s, i) => (
              <div key={s.num} className={`hi-sell-step hi-r hi-r-d${(i % 4) + 1}`}>
                <div className="hi-sell-step-num">{s.num}</div>
                <div className="hi-sell-step-title">{s.title}</div>
                <p className="hi-sell-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <div>
            <h2 className="hi-cta-band-title hi-r">{t.verkopen_ctaTitle}</h2>
            <p style={{ color: "var(--stone)", marginTop: 8 }}>{t.verkopen_ctaDesc}</p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="hi-r hi-r-d1">
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange">{t.verkopen_btn}</Link>
            <a href="tel:+32495915020" className="hi-btn hi-btn-outline">+32 (0)495 91 50 20</a>
          </div>
        </div>
      </div>
    </div>
  );
}
