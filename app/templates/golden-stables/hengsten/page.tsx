import "../golden.css";
import GsNav from "../GsNav";
import GsFooter from "../GsFooter";

const HENGSTEN = [
  {
    name: "Pegase van 't Ruytershof",
    bred: "Comme il faut × Cartani 4",
    studbook: "BWP",
    born: "2015",
    height: "168 cm",
    desc: "Pegase is een indrukwekkende hengst met een fenomenale techniek en een sterke moederstam. Goedgekeurd voor BWP, AES, KWPN en Zangersheide. Zijn nakomelingen onderscheiden zich door een superieure techniek en een sterke bloedlijn.",
    img: "photo-1553284965-83fd3e82fa5a",
    results: ["1e CSI2* Grand Prix Bonheiden 2024", "3e CSI3* Lier 2023", "Kampioen hengstenkeuring BWP 2022"],
  },
  {
    name: "Leandro VG",
    bred: "Gitano V Berkenbroeck × Chellano Z",
    studbook: "BWP / KWPN",
    born: "2016",
    height: "170 cm",
    desc: "Leandro VG is een veelzijdige hengst met een uitstekend karakter. Hij combineert een uitstekende mechaniek met een groot vermogen. Zijn moeder is een volle zus van meerdere 1m60-paarden.",
    img: "photo-1534438327276-14e5300c3a48",
    results: ["Winnaar Nations Cup Sentowerpark 2023", "2e CSI2* GP Lier 2024", "Goedgekeurd 5 studbooks"],
  },
  {
    name: "Sunday JM",
    bred: "Ermitage Kalone × Chicago Z",
    studbook: "Zangersheide",
    born: "2017",
    height: "167 cm",
    desc: "Sunday JM is een zoon van de succesvolle Ermitage Kalone, de kampioen van de Zangersheide. Hij vertoont hetzelfde talent als zijn vader: een explosieve techniek gecombineerd met een ijzersterk karakter.",
    img: "photo-1566231779484-92f3d3b3b0e0",
    results: ["Finalist WK jonge paarden Le Lion 2023", "Goedgekeurd Zangersheide met 9/10", "1e klasse 7-jarigen Lier 2024"],
  },
  {
    name: "Vinnie van het Guldenhof",
    bred: "Pegase van't Ruytershof × Aktion Pur Z",
    studbook: "BWP",
    born: "2022",
    height: "165 cm",
    desc: "Vinnie is onze jongste goedgekeurde hengst en draagt de genen van onze eigen Pegase. Al op jonge leeftijd toont hij uitzonderlijk talent en een fenomenale sprong. Zijn toekomst belooft veel.",
    img: "photo-1558618666-fcd25c85cd64",
    results: ["Goedgekeurd BWP 10 Maart 2025", "Beste 3-jarige hengst keuring Mechelen 2025"],
  },
  {
    name: "Vitalis JS van het Hagenbroek",
    bred: "Ermitage Kalone × Vannan",
    studbook: "BWP / AES",
    born: "2015",
    height: "169 cm",
    desc: "Vitalis JS is een zoon van de bekende Ermitage Kalone en beschikt over een superieure techniek. Zijn moeder Vannan is een volle zus van meerdere internationale toppaarden. Sterk aanbevolen voor merries met diepte.",
    img: "photo-1574023279800-c9b7ef70a652",
    results: ["Grand Prix sport", "Goedgekeurd 4 studbooks", "Nakomelingen actief op 1m45+"],
  },
  {
    name: "Wellington van het Guldenhof",
    bred: "Cashpaid J&F × Chacoon Blue",
    studbook: "BWP",
    born: "2014",
    height: "171 cm",
    desc: "Wellington is een indrukwekkend groot en opvallend paard met een fenomenale sprong. Als zoon van de beroemde Chacoon Blue heeft hij het potentieel voor de allerhoogste niveaus doorgegeven aan zijn nakomelingen.",
    img: "photo-1591168879019-e70c2bddaed8",
    results: ["CSI3* actief", "6 goedgekeurde nakomelingen 2024", "Moederstam Chacoon Blue"],
  },
];

export default function HengstenPage() {
  return (
    <>
      <GsNav alwaysDark />

      {/* Page hero */}
      <div className="gsPageHero">
        <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1600&q=85" alt="Hengsten" />
        <div className="gsPageHeroOverlay" />
        <div className="gsPageHeroContent">
          <div className="gsPageHeroCrumb">Golden Stables — Hengsten</div>
          <h1 className="gsPageHeroTitle">Onze <em>hengsten</em></h1>
          <p className="gsPageHeroSub">Stuk voor stuk uit de beste moederstammen van België</p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "60px 0", background: "#fff", borderBottom: "1px solid #e8e4de" }}>
        <div className="gsContainer">
          <div style={{ maxWidth: 760 }}>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.9, marginBottom: 16 }}>
              We zijn ervan overtuigd dat je de kansen op het fokken van een topspringpaard verhoogt als je gebruik maakt van een hengst die een bewezen moederstam achter zich heeft. De hengsten die we U aanbieden zijn geen &ldquo;toevalsproducten&rdquo;.
            </p>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.9 }}>
              Hun moederstammen hebben bewezen dat ze springpaarden voor het allerhoogste niveau leveren. Ontdek ze hier!
            </p>
          </div>
        </div>
      </section>

      {/* Hengsten detail */}
      <section style={{ padding: "72px 0", background: "#f9f7f4" }}>
        <div className="gsContainer">
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {HENGSTEN.map((h, i) => (
              <div
                key={h.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "420px 1fr" : "1fr 420px",
                  gap: 56,
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid #e8e4de",
                  boxShadow: "0 2px 20px rgba(0,0,0,.05)",
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                      <img src={`https://images.unsplash.com/${h.img}?w=800&q=85`} alt={h.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.9) saturate(.85)" }} />
                    </div>
                    <div style={{ padding: "40px 48px 40px 0" }}>
                      <HengstBody h={h} />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ padding: "40px 0 40px 48px" }}>
                      <HengstBody h={h} />
                    </div>
                    <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                      <img src={`https://images.unsplash.com/${h.img}?w=800&q=85`} alt={h.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.9) saturate(.85)" }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Sperma CTA */}
          <div style={{ textAlign: "center", marginTop: 64, padding: "48px", background: "#fff", borderRadius: 4, border: "1px solid #e8e4de" }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#1a1a1a", marginBottom: 12 }}>
              Sperma bestellen
            </h3>
            <p style={{ fontSize: 15, color: "#666", marginBottom: 28, maxWidth: 500, margin: "0 auto 28px" }}>
              Heeft u interesse in sperma van één van onze hengsten? Neem contact op voor beschikbaarheid en prijzen.
            </p>
            <a href="/templates/golden-stables/contact" className="gsWelkomBtn">
              <strong>Contacteer</strong>&nbsp;ons →
            </a>
          </div>
        </div>
      </section>

      <GsFooter />
    </>
  );
}

function HengstBody({ h }: { h: typeof HENGSTEN[0] }) {
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#2d5a27", marginBottom: 10 }}>
        {h.studbook} — {h.born} — {h.height}
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 8, lineHeight: 1.2 }}>
        {h.name}
      </h2>
      <div style={{ fontSize: 14, color: "#888", fontStyle: "italic", marginBottom: 20 }}>
        {h.bred}
      </div>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.85, marginBottom: 24 }}>{h.desc}</p>
      {h.results && (
        <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {h.results.map((r) => (
            <li key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#444", fontWeight: 500 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2d5a27", flexShrink: 0, display: "inline-block" }} />
              {r}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
