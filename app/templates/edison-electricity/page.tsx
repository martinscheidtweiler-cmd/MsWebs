import Link from "next/link";
import EdisonNav from "./EdisonNav";
import EdisonFooter from "./EdisonFooter";
import "./edison.css";

const BASE = "/templates/edison-electricity";

const SERVICES = [
  { icon: "🔌", title: "Elektriciteitskast herstellen / vernieuwen", text: "Verouderde zekeringkast vervangen of herstellen — veilig en conform de normen." },
  { icon: "🔍", title: "Storingen opsporen", text: "Snel en precies de oorzaak van uw elektrisch probleem vinden en oplossen." },
  { icon: "🏠", title: "Renovatie elektriciteit", text: "Volledige herbekabeling bij verbouwing — nette uitvoering, weinig hinder." },
  { icon: "🏗️", title: "Nieuwbouw elektriciteit", text: "Elektrische installatie van A tot Z bij nieuwbouwprojecten en appartementen." },
  { icon: "💡", title: "Verlichting plaatsen", text: "Binnen- en buitenverlichting, LED-installaties, dimbare systemen en sfeerverlichting." },
  { icon: "🚨", title: "24/7 noodinterventies", text: "Dag en nacht bereikbaar voor dringende elektrische problemen. Snelle interventie gegarandeerd." },
];

const REVIEWS = [
  { text: "Snel ter plaatse, probleem meteen gevonden en opgelost. Vriendelijk en nette uitvoering. Zeker aanbevolen!", author: "Tom V." },
  { text: "Uitstekende service. Correcte prijzen, duidelijke uitleg en netjes afgewerkt. Familiebedrijf met ervaring.", author: "Lies D." },
  { text: "Storing snel opgelost, ook laat op de avond. Professioneel en betrouwbaar. Ik kom zeker terug.", author: "Pieter M." },
  { text: "Heel tevreden! Vriendelijke aanpak, vakkundig werk en een eerlijke prijs. Meer dan 30 jaar ervaring, dat merk je.", author: "An S." },
];

const PROJECTS_PREVIEW = [
  { icon: "⚡", cat: "Kast", title: "Vernieuwing elektriciteitskast", desc: "Verouderde zekeringkast vervangen door moderne groepenkast in gezinswoning te Nijlen." },
  { icon: "🔍", cat: "Storing", title: "Herstelling storing woning", desc: "Kortsluiting opgespoord en hersteld — woning terug volledig operationeel binnen het uur." },
  { icon: "💡", cat: "Verlichting", title: "LED-verlichting renovatieproject", desc: "Volledige LED-installatie met dimfunctie geplaatst bij renovatie van een open living." },
];

export default function EdisonHome() {
  return (
    <>
      <EdisonNav />

      {/* ── HERO ── */}
      <section className="edHero">
        <div className="edHeroGlow" />
        <div className="edHeroGlow2" />
        <div className="edHeroInner">
          <div>
            <div className="edHeroBadge">⚡ Erkend elektricien · Nijlen</div>
            <h1 className="edHeroTitle">
              Betrouwbare elektricien<br />
              in <em>Nijlen en omgeving</em>
            </h1>
            <p className="edHeroSub">
              Familiebedrijf met meer dan 32 jaar ervaring. Snel, netjes en aan eerlijke prijzen —
              voor kleine herstelwerken tot volledige installaties.
            </p>
            <div className="edHeroBtns">
              <a href="tel:+32000000000" className="edBtnPrimary">
                📞 Bel voor noodservice
              </a>
              <Link href={`${BASE}/contact`} className="edBtnOutline">
                Vraag een offerte
              </Link>
            </div>

            <div className="edHeroStats">
              <div className="edHeroStat">
                <div className="edHeroStatVal">32+</div>
                <div className="edHeroStatLabel">Jaar<br />ervaring</div>
              </div>
              <div className="edHeroStat">
                <div className="edHeroStatVal">5,0</div>
                <div className="edHeroStatLabel">Google<br />score</div>
              </div>
              <div className="edHeroStat">
                <div className="edHeroStatVal">24/7</div>
                <div className="edHeroStatLabel">Nood&shy;service<br />beschikbaar</div>
              </div>
            </div>
          </div>

          {/* Trust card */}
          <div className="edHeroCard">
            <div className="edHeroCardRow">
              <div className="edHeroCardIcon">⚡</div>
              <div>
                <div className="edHeroCardName">Edison Electricity</div>
                <div className="edHeroCardSub">Erkend elektricien · Nijlen</div>
              </div>
            </div>
            <div className="edScoreRow">
              <span className="edScoreVal">5,0</span>
              <span className="edScoreSub">/ 5 · Google</span>
            </div>
            <div className="edStars">★★★★★</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 6 }}>9 beoordelingen</p>

            <hr className="edHeroCardDivider" />

            <div className="edHeroCardFeats">
              {[
                ["🕐", "Snelle interventie gegarandeerd"],
                ["✅", "Netjes afgewerkt, geen rommel"],
                ["💬", "Duidelijke uitleg, eerlijke prijs"],
                ["👨‍👩‍👦", "Familiebedrijf — persoonlijke aanpak"],
              ].map(([icon, text]) => (
                <div key={text} className="edHeroCardFeat">
                  <div className="edHeroCardFeatIcon">{icon}</div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="edSection">
        <div className="edSectionInner">
          <div className="edSectionHead">
            <div className="edTag">Diensten</div>
            <h2 className="edSectionTitle">Wat kan Edison Electricity voor u doen?</h2>
            <p className="edSectionSub">Van kleine herstellingen tot volledige installaties — wij doen het vakkundig en op tijd.</p>
          </div>
          <div className="edServGrid">
            {SERVICES.map((s) => (
              <div className="edServCard" key={s.title}>
                <div className="edServIcon">{s.icon}</div>
                <div className="edServTitle">{s.title}</div>
                <p className="edServText">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="edSectionDark">
        <div className="edSectionInner">
          <div className="edSectionHead">
            <div className="edTag">Klanten aan het woord</div>
            <h2 className="edSectionTitle">5,0 op Google — wat klanten zeggen</h2>
          </div>
          <div className="edTrustGrid">
            <div className="edTrustScore">
              <div className="edTrustScoreVal">5,0<span className="edTrustScoreMax">/5</span></div>
              <div className="edTrustScoreStars">★★★★★</div>
              <div className="edTrustScoreSub">9 Google Reviews</div>
            </div>
            <div className="edReviewsGrid">
              {REVIEWS.map((r) => (
                <div className="edReviewCard" key={r.author}>
                  <div className="edReviewStars">★★★★★</div>
                  <p className="edReviewText">"{r.text}"</p>
                  <div className="edReviewAuthor">— {r.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS PREVIEW ── */}
      <section className="edSection">
        <div className="edSectionInner">
          <div className="edSectionHead">
            <div className="edTag">Realisaties</div>
            <h2 className="edSectionTitle">Afgewerkte projecten</h2>
            <p className="edSectionSub">Een kleine greep uit de klussen die wij de afgelopen jaren met zorg hebben afgewerkt.</p>
          </div>
          <div className="edProjGrid">
            {PROJECTS_PREVIEW.map((p) => (
              <div className="edProjCard" key={p.title}>
                <div className="edProjImg">
                  {p.icon}
                  <div className="edProjCat">{p.cat}</div>
                </div>
                <div className="edProjBody">
                  <div className="edProjTitle">{p.title}</div>
                  <p className="edProjDesc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href={`${BASE}/projecten`} className="edBtnOutline">
              Alle projecten bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="edCtaBanner">
        <div className="edCtaBannerInner">
          <h2>Elektrisch probleem of offerte nodig?</h2>
          <p>Wij zijn snel ter plaatse en werken netjes af. Bel ons of vraag online een offerte aan.</p>
          <div className="edCtaBtns">
            <a href="tel:+32000000000" className="edBtnDark">📞 Bel nu: +32 (0)00 00 00 00</a>
            <Link href={`${BASE}/contact`} className="edBtnDarkOutline">Offerte aanvragen</Link>
          </div>
        </div>
      </div>

      <EdisonFooter />
    </>
  );
}
