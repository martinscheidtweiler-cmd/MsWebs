"use client";
import Link from "next/link";
import { useLang } from "../LangContext";
import { BLOG_POSTS } from "../data";

const BASE = "/templates/alba-immo";

const ARTICLES_EXTRA = [
  {
    img: "https://images.unsplash.com/photo-1553284966-19b8815c7817?w=1000&q=80",
    date: "12 mrt 2025",
    cat: { nl: "Wetgeving", fr: "Législation", en: "Legislation" },
    title: { nl: "Paarden op weide in de winter: vergunning voor schuilhok?", fr: "Chevaux au pré en hiver : permis pour abri?", en: "Horses in winter pasture: permit for a shelter?" },
    excerpt: { nl: "De winter staat voor de deur. Je paard op weide laten staan heeft voordelen, maar ook juridische aandachtspunten.", fr: "L'hiver approche. Laisser son cheval au pré a des avantages mais aussi des implications juridiques.", en: "Winter is coming. Keeping your horse in pasture has benefits but also legal considerations." },
  },
  {
    img: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80",
    date: "28 feb 2025",
    cat: { nl: "Huurrecht", fr: "Droit locatif", en: "Rental law" },
    title: { nl: "Formaliteiten bij verhuur van paardenboxen", fr: "Formalités pour la location de boxes", en: "Formalities for renting horse boxes" },
    excerpt: { nl: "Ondernemingen die paardenboxen verhuren moeten rekening houden met specifieke verplichtingen.", fr: "Les entreprises louant des boxes doivent respecter des obligations spécifiques.", en: "Businesses renting horse boxes must comply with specific legal obligations." },
  },
  {
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    date: "15 jan 2025",
    cat: { nl: "Markt", fr: "Marché", en: "Market" },
    title: { nl: "Woonwijk voor paardenliefhebbers: een nieuw concept", fr: "Quartier résidentiel pour amateurs de chevaux: un nouveau concept", en: "Residential area for horse lovers: a new concept" },
    excerpt: { nl: "Aan de Hulsterseweg bij Axel komt een uniek woonproject speciaal voor paardenliefhebbers.", fr: "Près d'Axel, un projet résidentiel unique pour les amateurs de chevaux avec plus de cent candidats.", en: "Near Axel, a unique residential project for horse lovers with more than a hundred candidates on the waiting list." },
  },
  {
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    date: "3 jan 2025",
    cat: { nl: "Fiscaliteit", fr: "Fiscalité", en: "Tax" },
    title: { nl: "Belastingvoordelen bij aankoop van agrarische grond", fr: "Avantages fiscaux lors de l'achat de terres agricoles", en: "Tax benefits when purchasing agricultural land" },
    excerpt: { nl: "Wie investeert in agrarische grond geniet in bepaalde gevallen van gunstige registratierechten.", fr: "Ceux qui investissent dans les terres agricoles peuvent bénéficier de droits d'enregistrement favorables.", en: "Those investing in agricultural land may benefit from favourable registration duties." },
  },
  {
    img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    date: "18 dec 2024",
    cat: { nl: "Markt", fr: "Marché", en: "Market" },
    title: { nl: "Hippisch vastgoed: prijzen stijgen ondanks marktdruk", fr: "Immobilier équestre : les prix augmentent malgré la pression du marché", en: "Equestrian real estate: prices rise despite market pressure" },
    excerpt: { nl: "Hippische eigendommen bewaren hun waarde of stijgen zelfs door schaarsheid.", fr: "Les propriétés équestres maintiennent leur valeur ou augmentent même en raison de la rareté.", en: "Equestrian properties maintain or even increase their value due to scarcity." },
  },
  {
    img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    date: "2 dec 2024",
    cat: { nl: "Tips", fr: "Conseils", en: "Tips" },
    title: { nl: "Wat te controleren voor u een manege koopt?", fr: "Que vérifier avant d'acheter un manège?", en: "What to check before buying a riding school?" },
    excerpt: { nl: "Een manege kopen is geen gewone vastgoedtransactie. Van vergunningen tot milieuaspecten.", fr: "Acheter un manège n'est pas une transaction immobilière ordinaire. Des permis aux aspects environnementaux.", en: "Buying a riding school is no ordinary real estate transaction. From permits to environmental aspects." },
  },
];

export default function BlogPage() {
  const { lang, t } = useLang();

  return (
    <div className="hi-page">
      {/* HERO */}
      <section
        style={{
          paddingTop: "var(--nav-h)",
          minHeight: "50vh",
          display: "flex",
          alignItems: "flex-end",
          background: "var(--black)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(237,110,33,0.07) 0%, transparent 55%)" }} />
        <div className="hi-container" style={{ padding: "0 80px 80px", position: "relative", zIndex: 2 }}>
          <span className="hi-label hi-r" style={{ display: "block", marginBottom: 16 }}>{t.blogpage_label}</span>
          <h1
            className="hi-r hi-r-d1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px,6.5vw,88px)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            <em style={{ color: "var(--orange)" }}>{t.blogpage_title}</em>
          </h1>
          <p className="hi-r hi-r-d2" style={{ color: "var(--stone)", fontSize: 18, maxWidth: 520, marginTop: 20, lineHeight: 1.7 }}>
            {t.blogpage_desc}
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="hi-section" style={{ background: "var(--black)" }}>
        <div className="hi-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {ARTICLES_EXTRA.map((a, i) => (
              <div
                key={i}
                className={`hi-r hi-r-d${(i % 3) + 1}`}
                style={{
                  background: "var(--anthracite)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: 2,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-dark)")}
              >
                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  <img
                    src={a.img}
                    alt={a.title[lang]}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)", fontWeight: 600 }}>
                      {a.cat[lang]}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--stone)" }}>{a.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, lineHeight: 1.3, marginBottom: 12, color: "var(--warm-white)" }}>
                    {a.title[lang]}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--stone)", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                    {a.excerpt[lang]}
                  </p>
                  <Link
                    href={`${BASE}/blog`}
                    style={{
                      fontSize: 13,
                      color: "var(--orange)",
                      textDecoration: "none",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.blogpage_readBtn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="hi-cta-band">
        <div className="hi-cta-band-inner">
          <h2 className="hi-cta-band-title hi-r">{t.verkopen_ctaTitle}</h2>
          <Link href={`${BASE}/contact`} className="hi-btn hi-btn-orange">{t.verkopen_btn}</Link>
        </div>
      </div>
    </div>
  );
}
