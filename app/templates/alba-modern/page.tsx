"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MHiNav from "./MHiNav";
import MHiFooter from "./MHiFooter";
import "./mhi.css";

const BASE = "/templates/alba-modern";

const SLIDES = [
  {
    eyebrow: "Nieuw in ons aanbod",
    title: "Villa met zwembad\nin Tervuren",
    sub: "4 slaapkamers · 520 m² · Uitzonderlijke locatie",
    id: "4450",
  },
  {
    eyebrow: "Unieke opportuniteit",
    title: "Moderne loft\nin Leuven centrum",
    sub: "Penthouse · 185 m² · Panoramisch zicht",
    id: "4567",
  },
  {
    eyebrow: "Rustige ligging",
    title: "Charmante woning\nin Heverlee",
    sub: "3 slaapkamers · 210 m² · Grote tuin",
    id: "4545",
  },
];

const PANDEN = [
  { id: "4450", type: "Villa", price: "€ 895.000", city: "Tervuren", horses: 5 },
  { id: "4567", type: "Appartement", price: "€ 545.000", city: "Leuven", horses: 4 },
  { id: "4545", type: "Woning", price: "€ 395.000", city: "Heverlee", horses: 3 },
];

const PARTNERS = [
  { icon: "🏛", name: "BNP Paribas Fortis", sub: "Financiering" },
  { icon: "⚖️", name: "Notaris De Paepe", sub: "Juridisch advies" },
  { icon: "🏠", name: "REMAX Belgium", sub: "Verkoopnetwerk" },
  { icon: "🔨", name: "Renovio", sub: "Renovatieadvies" },
  { icon: "🌿", name: "EcoScan", sub: "Energieaudit" },
  { icon: "📐", name: "Atelier Bouw", sub: "Architectuur" },
];

const BLOGS = [
  {
    date: "12 mei 2025",
    title: "Waarom Leuven een van de sterkste vastgoedmarkten blijft",
    excerpt: "De universiteitsstad biedt stabiele huurrendementen en een constante vraag van jonge kopers.",
  },
  {
    date: "3 april 2025",
    title: "EPC-etiket en verkoopprijs: wat is de impact in 2025?",
    excerpt: "Een slecht energielabel drukt de verkoopprijs gemiddeld 8 tot 14% — maar er zijn oplossingen.",
  },
  {
    date: "18 maart 2025",
    title: "Gratis schatting of schatter inhuren: wat is het verschil?",
    excerpt: "We leggen uit wanneer een professionele schatter meerwaarde biedt versus een online tool.",
  },
];

function Foto({ label }: { label?: string }) {
  return <div className="mFoto">{label ?? "foto"}</div>;
}

export default function AlbaModernHome() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[slide];

  return (
    <>
      <MHiNav />

      {/* HERO */}
      <div className="mHero">
        <div className="mHeroFoto"><Foto /></div>
        <div className="mHeroOverlay" />
        <div className="mHeroContent">
          <div className="mHeroEyebrow">{s.eyebrow}</div>
          <h1 className="mHeroTitle" style={{ whiteSpace: "pre-line" }}>{s.title}</h1>
          <p className="mHeroSub">{s.sub}</p>
          <div className="mHeroBtns">
            <Link href={`${BASE}/aanbod/${s.id}`} className="mBtn mBtn-primary">Meer info</Link>
            <Link href={`${BASE}/aanbod`} className="mBtn mBtn-ghost">Volledig aanbod</Link>
          </div>
        </div>
        <div className="mHeroDots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`mDot${i === slide ? " on" : ""}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      {/* NIEUWSTE PANDEN */}
      <section className="mSection">
        <div className="mSectionInner">
          <div className="mSecHead">
            <h2 className="mSecTitle">Nieuwste panden</h2>
            <Link href={`${BASE}/aanbod`} className="mSecLink">Volledig aanbod →</Link>
          </div>
          <div className="mHomeGrid">
            {PANDEN.map((p) => (
              <div className="mCard" key={p.id}>
                <div className="mCardImg">
                  <Foto />
                  <div className="mCardBadge mb-new">Nieuw</div>
                </div>
                <div className="mCardBody">
                  <div className="mCardType">{p.type}</div>
                  <div className="mCardRow">
                    <span className="mCardPrice">{p.price}</span>
                    <span className="mCardCity">{p.city}</span>
                  </div>
                  <div className="mCardFoot">
                    <Link href={`${BASE}/aanbod/${p.id}`} className="mMeerInfo">Meer info</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVER ONS */}
      <section className="mSectionGray">
        <div className="mSectionInner">
          <div className="mAboutGrid">
            <div className="mAboutText">
              <h2 className="mSecTitle" style={{ marginBottom: 16 }}>Meer dan 20 jaar<br />vastgoedervaring</h2>
              <p>
                Alba Immo is een onafhankelijk vastgoedkantoor met diepgewortelde kennis van de
                regio Leuven en omstreken. We begeleiden kopers, verkopers en investeerders met
                eerlijk en persoonlijk advies.
              </p>
              <p>
                Of het nu gaat om uw eerste woning, een investeringspand of een discrete verkoop —
                ons team staat u bij van A tot Z.
              </p>
              <h3>Onze troeven</h3>
              <ul className="mAboutList">
                <li>Lokale marktkennis en ervaren makelaars</li>
                <li>Uitgebreid netwerk van kopers en investeerders</li>
                <li>Transparante communicatie en eerlijke adviezen</li>
                <li>Discreet en professioneel voor luxevastgoed</li>
              </ul>
              <Link href={`${BASE}/verkopen`} className="mBtn mBtn-outline" style={{ marginTop: 20, display: "inline-block" }}>
                Uw woning verkopen
              </Link>
            </div>
            <div className="mAboutFoto"><Foto /></div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mSection">
        <div className="mSectionInner">
          <div className="mSecHead">
            <h2 className="mSecTitle">Onze partners</h2>
          </div>
          <div className="mPartnerGrid">
            {PARTNERS.map((p, i) => (
              <div className="mPartnerCard" key={i}>
                <div className="mPartnerIcon">{p.icon}</div>
                <div className="mPartnerName">{p.name}</div>
                <div className="mPartnerSub">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="mSectionGray">
        <div className="mSectionInner">
          <div className="mSecHead">
            <h2 className="mSecTitle">Vastgoednieuws</h2>
            <Link href={`${BASE}/blog`} className="mSecLink">Alle artikels →</Link>
          </div>
          <div className="mBlogGrid">
            {BLOGS.map((b, i) => (
              <div className="mBlogCard" key={i}>
                <div className="mBlogCardImg"><Foto /></div>
                <div className="mBlogCardBody">
                  <div className="mBlogCardDate">{b.date}</div>
                  <div className="mBlogCardTitle">{b.title}</div>
                  <div className="mBlogCardExcerpt">{b.excerpt}</div>
                  <span className="mBlogCardMore">Lees meer →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MHiFooter />
    </>
  );
}
