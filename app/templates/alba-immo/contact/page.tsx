"use client";
import { useEffect, useState } from "react";
import { useLang } from "../LangContext";

export default function ContactPage() {
  const { t } = useLang();
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("hi-vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".hi-r, .hi-r-left, .hi-r-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const [type,    setType]    = useState<"info" | "schatting" | "bezoek">("info"); // internal key stays Dutch
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement actual form submission
    setSent(true);
  };

  return (
    <div className="hi-page">
      {/* HERO */}
      <section
        style={{
          paddingTop: "var(--nav-h)",
          background: "var(--anthracite)",
          position: "relative",
          overflow: "hidden",
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 60% 40%, rgba(237,110,33,0.07) 0%, transparent 55%)",
          }}
        />
        <div className="hi-container hi-contact-hero-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hi-contact-hero-grid">
            <div>
              <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>{t.nav_contact}</span>
              <h1
                className="hi-r hi-r-d1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px,6vw,80px)",
                  fontWeight: 400,
                  lineHeight: 1.04,
                  letterSpacing: "-0.03em",
                }}
              >
                {t.contact_title1}<br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>{t.contact_title2}</em>
              </h1>
              <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 17, lineHeight: 1.75, marginTop: 24, maxWidth: 420 }}>
                {t.contact_desc}
              </p>
            </div>

            {/* Quick contact info */}
            <div className="hi-r hi-r-d2" style={{ paddingBottom: 8 }}>
              {[
                { label: t.contact_office, val: "Sint-Laurentiusstraat 50D, 9130 Verrebroek" },
                { label: t.contact_phone, val: "+32 (0)495 91 50 20" },
                { label: t.contact_email, val: "info@hippique.immo" },
                { label: t.contact_hours, val: t.contact_hoursVal },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", gap: 20, padding: "14px 0", borderBottom: "1px solid var(--border-dark)" }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", minWidth: 80, paddingTop: 2 }}>
                    {c.label}
                  </span>
                  <span style={{ fontSize: 15, color: "var(--warm-white)" }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div className="hi-contact-form-grid">

            {/* FORM */}
            <div>
              {sent ? (
                <div
                  className="hi-r"
                  style={{
                    padding: 48,
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    background: "var(--anthracite)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--orange)", marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 12 }}>{t.contact_sentTitle}</h3>
                  <p style={{ color: "var(--stone)" }}>{t.contact_sentDesc}</p>
                  <button
                    onClick={() => { setSent(false); setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage(""); }}
                    className="hi-btn hi-btn-orange"
                    style={{ margin: "24px auto 0", display: "inline-flex" }}
                  >
                    {t.contact_newMsg}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Request type tabs */}
                  <div className="hi-contact-tabs">
                    {([
                      { key: "info",      label: t.contact_tabInfo },
                      { key: "schatting", label: t.contact_tabEst },
                      { key: "bezoek",    label: t.contact_tabVisit },
                    ] as const).map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setType(t.key)}
                        style={{
                          padding: "10px 20px",
                          border: `1px solid ${type === t.key ? "var(--orange)" : "var(--border-dark)"}`,
                          borderRadius: 2,
                          background: type === t.key ? "var(--orange)" : "transparent",
                          color: type === t.key ? "#fff" : "var(--stone)",
                          fontSize: 13,
                          letterSpacing: "0.04em",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="hi-form-grid">
                    <div className="hi-form-field">
                      <label className="hi-form-label">{t.contact_name}</label>
                      <input
                        className="hi-form-input"
                        required
                        placeholder={t.contact_namePH}
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="hi-form-field">
                      <label className="hi-form-label">{t.contact_emailLabel}</label>
                      <input
                        className="hi-form-input"
                        type="email"
                        required
                        placeholder="uw@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="hi-form-field">
                      <label className="hi-form-label">{t.contact_phoneLabel}</label>
                      <input
                        className="hi-form-input"
                        placeholder={t.contact_phonePH}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="hi-form-field">
                      <label className="hi-form-label">{t.contact_subject}</label>
                      <input
                        className="hi-form-input"
                        placeholder={
                          type === "schatting" ? t.contact_subjPH_est :
                          type === "bezoek" ? t.contact_subjPH_visit :
                          t.contact_subjPH_info
                        }
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="hi-form-field full">
                      <label className="hi-form-label">{t.contact_message}</label>
                      <textarea
                        className="hi-form-textarea"
                        required
                        placeholder={
                          type === "schatting"
                            ? t.contact_msgPH_est
                            : type === "bezoek"
                            ? t.contact_msgPH_visit
                            : t.contact_msgPH_info
                        }
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                      />
                    </div>

                    {/* GDPR */}
                    <div className="hi-form-field full">
                      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                        <input type="checkbox" required style={{ marginTop: 3, accentColor: "var(--orange)" }} />
                        <span style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.6 }}>
                          {t.contact_gdpr}{" "}
                          <a href="#" style={{ color: "var(--orange)" }}>{t.contact_gdprLink}</a>{" "}
                          {t.contact_gdprOf}
                        </span>
                      </label>
                    </div>

                    <div className="hi-form-field full">
                      <button type="submit" className="hi-btn hi-btn-orange hi-btn-arrow" style={{ alignSelf: "flex-start", padding: "16px 40px" }}>
                        {t.contact_send}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT INFO PANEL */}
            <div className="hi-r hi-r-d2">
              {/* Map placeholder */}
              <div
                style={{
                  height: 240,
                  background: "var(--anthracite)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--stone)",
                  fontSize: 14,
                  marginBottom: 24,
                }}
              >
                ◎ Verrebroek, Beveren-Waas
              </div>

              {/* Info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border-dark)", border: "1px solid var(--border-dark)", borderRadius: 4, overflow: "hidden" }}>
                {[
                  {
                    title: t.contact_office,
                    lines: ["Sint-Laurentiusstraat 50D", "9130 Verrebroek (Beveren-Waas)"],
                  },
                  {
                    title: t.contact_phone,
                    lines: ["+32 (0)495 91 50 20"],
                  },
                  {
                    title: t.contact_email,
                    lines: ["info@hippique.immo"],
                  },
                  {
                    title: t.contact_openHours,
                    lines: [t.contact_openVal, t.contact_openSun],
                  },
                  {
                    title: t.contact_recognition,
                    lines: ["IPI 504.064 – BIV erkend", "BTW BE 0843.058.969"],
                  },
                ].map((item) => (
                  <div key={item.title} style={{ padding: "20px 22px", background: "var(--anthracite)" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 6 }}>
                      {item.title}
                    </div>
                    {item.lines.map((l) => (
                      <div key={l} style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.6 }}>{l}</div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Direct call CTA */}
              <a
                href="tel:+32495915020"
                className="hi-btn hi-btn-orange"
                style={{ width: "100%", justifyContent: "center", marginTop: 16, display: "flex" }}
              >
                {t.contact_callBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section
        className="hi-contact-bottom"
        style={{
          background: "var(--anthracite)",
          borderTop: "1px solid var(--border-dark)",
        }}
      >
        <div className="hi-container">
          <div className="hi-contact-info-row">
            <div className="hi-contact-info-item hi-r">
              <div className="hi-contact-info-title">{t.contact_reactTime}</div>
              <div className="hi-contact-info-val" style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--warm-white)" }}>
                {t.contact_reactVal}
              </div>
            </div>
            <div className="hi-contact-info-item hi-r hi-r-d1">
              <div className="hi-contact-info-title">{t.contact_freeEst}</div>
              <div className="hi-contact-info-val" style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--warm-white)" }}>
                {t.contact_freeEstVal}
              </div>
            </div>
            <div className="hi-contact-info-item hi-r hi-r-d2">
              <div className="hi-contact-info-title">{t.contact_ipiNum}</div>
              <div className="hi-contact-info-val" style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--warm-white)" }}>
                504.064
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
