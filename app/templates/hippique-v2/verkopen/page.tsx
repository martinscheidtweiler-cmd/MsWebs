"use client";
import { useEffect } from "react";
import Link from "next/link";

const BASE = "/templates/hippique-v2";

export default function VerkopenPage() {
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
        {/* Grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }} preserveAspectRatio="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={`${(i / 7) * 100}%`} y1="0" x2={`${(i / 7) * 100}%`} y2="100%" stroke="white" strokeWidth="1" />
          ))}
        </svg>
        <div className="hi-container" style={{ padding: "0 80px 100px", position: "relative", zIndex: 2 }}>
          <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>Voor eigenaars</span>
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
            Verkoop uw eigendom.<br />
            <em style={{ fontStyle: "italic", color: "var(--orange)" }}>Wij doen de rest.</em>
          </h1>
          <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 18, maxWidth: 480, marginTop: 24, lineHeight: 1.7 }}>
            Met 15 jaar specialisatie in hippisch vastgoed brengen wij uw eigendom bij de juiste koper — discreet, professioneel en boven verwachting.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }} className="hi-r hi-r-d3">
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange hi-btn-arrow">Gratis schatting aanvragen</Link>
            <a href="tel:+32495915020" className="hi-btn hi-btn-outline">+32 (0)495 91 50 20</a>
          </div>
        </div>
      </section>

      {/* WHY HIPPIQUE */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="hi-label hi-r">Waarom Hippique.immo</span>
              <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12 }}>
                Expertise die<br /><em>het verschil maakt</em>
              </h2>
            </div>
            <div style={{ paddingTop: 16 }}>
              <p className="hi-r" style={{ color: "var(--stone)", fontSize: 16, lineHeight: 1.85, marginBottom: 28 }}>
                Hippisch vastgoed is een nichemarkt met eigen wetmatigheden. Een stoeterij, manège of kasteeldomein verkopen vereist diepgaande kennis van het sector, de juiste koperscirkel en de nodige discretie.
              </p>
              <p className="hi-r hi-r-d1" style={{ color: "var(--stone)", fontSize: 16, lineHeight: 1.85 }}>
                Wij zijn het enige kantoor in de Benelux dat uitsluitend actief is in hippisch en landelijk vastgoed. Dat unicum geeft ons een ongeëvenaard netwerk en expertise.
              </p>
            </div>
          </div>

          {/* Benefits grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "var(--border-dark)",
              border: "1px solid var(--border-dark)",
              borderRadius: 4,
              overflow: "hidden",
              marginTop: 64,
            }}
          >
            {[
              { icon: "◎", title: "Diepgaande expertise", desc: "15 jaar uitsluitend actief in hippisch vastgoed. Wij kennen de sector door en door — van LGCT tot regionaal clubniveau." },
              { icon: "◉", title: "Groot internationaal netwerk", desc: "Directe toegang tot een internationaal netwerk van gekwalificeerde kopers: fokkers, investeerders en professionals uit de paardensport." },
              { icon: "◈", title: "Absolute discretie", desc: "Uw verkoop verloopt volgens uw tempo en uw voorwaarden. Discretie is voor ons geen optie, maar een fundamentele waarde." },
              { icon: "◇", title: "Professionele marketing", desc: "Professionele fotografie, drone-beelden, uitgebreide online exposure en gerichte campagnes naar onze selecte koperscirkel." },
              { icon: "◆", title: "Correcte waardebepaling", desc: "Een eerlijke en onderbouwde marktwaarde op basis van recente transacties en diepgaande kennis van de niche." },
              { icon: "◐", title: "Begeleiding tot de akte", desc: "Van het eerste gesprek tot de notariële akte — wij begeleiden elke stap persoonlijk en professioneel." },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`hi-stat-item hi-r hi-r-d${i % 3 + 1}`}
                style={{ textAlign: "left", padding: "36px 32px" }}
              >
                <div style={{ fontSize: 24, color: "var(--orange)", marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, marginBottom: 10, color: "var(--warm-white)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="hi-sell-section hi-section">
        <div className="hi-sell-bg-gradient" />
        <div className="hi-container">
          <span className="hi-label hi-r">Het verkoopproces</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, maxWidth: 480 }}>
            Van kennismaking<br /><em>tot akte</em>
          </h2>
          <div className="hi-sell-steps" style={{ marginTop: 64 }}>
            {[
              {
                num: "01",
                title: "Vrijblijvend gesprek",
                desc: "Wij komen ter plaatse voor een eerste kennismaking en een rondleiding. Geen verplichtingen, geen kosten. Enkel oprechte interesse en deskundig advies.",
              },
              {
                num: "02",
                title: "Waardebepaling",
                desc: "Op basis van recente transacties, de staat van de infrastructuur, de locatie en de marktomstandigheden stellen wij een onderbouwde marktwaarde op.",
              },
              {
                num: "03",
                title: "Marketingplan",
                desc: "Professionele opmaak van uw dossier: fotografie, beschrijvingen, 3D-plannen indien beschikbaar, en een gerichte marketing via online en offline kanalen.",
              },
              {
                num: "04",
                title: "Kopersbegeleiding",
                desc: "Wij presenteren uw eigendom enkel aan ernstige en gekwalificeerde kandidaten. Elk bezoek begeleiden wij persoonlijk. Privacy is gegarandeerd.",
              },
              {
                num: "05",
                title: "Onderhandeling",
                desc: "Wij staan u bij in de onderhandeling en streven naar de beste prijs en voorwaarden, met volledig respect voor uw wensen en timing.",
              },
              {
                num: "06",
                title: "Compromis & akte",
                desc: "Van het compromis tot de notariële akte begeleiden wij u door elke stap van het juridisch-administratieve proces.",
              },
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

      {/* TYPES WE SELL */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <span className="hi-label hi-r">Wat we verkopen</span>
          <h2 className="hi-section-title hi-r hi-r-d1" style={{ marginTop: 12, marginBottom: 48 }}>
            Elk type hippisch vastgoed
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              { type: "Stoeterijen",      desc: "Professionele fokkerijen en stoeterijen van elke omvang" },
              { type: "Maneges",          desc: "Volledig operationele rijscholen en equitatiecentra" },
              { type: "Pensionstallen",   desc: "Rendabele pensionbedrijven met een gevestigde cliëntèle" },
              { type: "Landgoederen",     desc: "Ruime landelijke eigendommen met privépaardenfaciliteiten" },
              { type: "Kasteeldomeinen",  desc: "Exclusieve historische domeinen met hippische infrastructuur" },
              { type: "Hoeves",           desc: "Authentieke boerderijen met hippische uitbreidingsmogelijkheden" },
            ].map((item, i) => (
              <div
                key={item.type}
                className={`hi-r hi-r-d${(i % 3) + 1}`}
                style={{
                  padding: "28px 24px",
                  border: "1px solid var(--border-dark)",
                  borderRadius: 2,
                  background: "var(--anthracite)",
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-dark)")}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{item.type}</h3>
                <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="hi-section" style={{ background: "var(--anthracite)", borderTop: "1px solid var(--border-dark)" }}>
        <div className="hi-container">
          <div className="hi-quote-wrap hi-r">
            <div className="hi-quote-mark">&ldquo;</div>
            <p className="hi-quote-text">
              Dankzij het netwerk van Hippique Immo vonden wij binnen drie maanden een serieuze koper voor onze manège — boven de vraagprijs en zonder publieke bekendmaking.
            </p>
            <p className="hi-quote-author">— Familie Claes, Manège De Groene Wei, Limburg</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <h2 className="hi-cta-band-title hi-r">
            Klaar om uw eigendom te verkopen?
          </h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="hi-r hi-r-d1">
            <Link href={`${BASE}/contact`} className="hi-btn hi-btn-outline">Gratis schatting</Link>
            <a href="tel:+32495915020" className="hi-btn" style={{ color: "#fff" }}>Bel ons direct</a>
          </div>
        </div>
      </div>
    </div>
  );
}
