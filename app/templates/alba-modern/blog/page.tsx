import Link from "next/link";
import MHiNav from "../MHiNav";
import MHiFooter from "../MHiFooter";
import "../mhi.css";

const BASE = "/templates/alba-modern";

function Foto({ label }: { label?: string }) {
  return <div className="mFoto">{label ?? "foto"}</div>;
}

const POSTS = [
  {
    date: "12 mei 2025",
    cat: "Markt",
    title: "Waarom Leuven een van de sterkste vastgoedmarkten blijft",
    excerpt:
      "De universiteitsstad combineert stabiele huurrendementen, een constante instroom van studenten en jonge kopers, en een stijgende vraag naar kwalitatief wonen. Wat maakt Leuven zo aantrekkelijk voor investeerders?",
  },
  {
    date: "3 april 2025",
    cat: "Tips & advies",
    title: "EPC-etiket en verkoopprijs: wat is de impact in 2025?",
    excerpt:
      "Een slecht energielabel drukt de verkoopprijs gemiddeld 8 tot 14%. Maar met de juiste renovaties kunt u de waarde van uw woning snel opkrikken. Wij bespreken de slimste ingrepen.",
  },
  {
    date: "18 maart 2025",
    cat: "Verkopen",
    title: "Gratis schatting of schatter inhuren: wat is het verschil?",
    excerpt:
      "Online schattingstools geven een globale indicatie, maar een gecertificeerde schatter kijkt verder. We leggen uit wanneer een professionele schatting meerwaarde biedt.",
  },
  {
    date: "5 februari 2025",
    cat: "Markt",
    title: "Registratierecht in Vlaanderen 2025: alles wat u moet weten",
    excerpt:
      "Sinds 1 januari 2025 gelden nieuwe tarieven voor de registratierechten. Voor gezinnen die hun enige en eigen woning kopen, daalt het tarief naar 3%. Wij zetten alles op een rij.",
  },
  {
    date: "14 januari 2025",
    cat: "Huren",
    title: "Wat te doen als uw huurder niet betaalt?",
    excerpt:
      "Wanbetaling is voor verhuurders een nachtmerrie. Welke stappen zet u eerst, en wanneer schakelt u een advocaat of deurwaarder in? Een praktisch overzicht.",
  },
];

const RECENT = POSTS.slice(0, 3);

export default function BlogPage() {
  return (
    <>
      <MHiNav />

      <div className="mWrap">
        <div className="mBreadcrumb">
          <Link href={BASE}>Home</Link>
          <span>/</span>
          <span>Blog</span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 6 }}>
          Vastgoednieuws & tips
        </h1>
        <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 32 }}>
          Actuele informatie over de vastgoedmarkt, handige tips voor kopers en verkopers, en alles
          over wet- en regelgeving.
        </p>

        <div className="mBlogPageGrid">
          {/* Posts */}
          <div className="mBlogPageList">
            {POSTS.map((p, i) => (
              <div className="mBlogPostCard" key={i}>
                <div className="mBlogPostImg"><Foto /></div>
                <div className="mBlogPostBody">
                  <div className="mBlogPostDate">
                    {p.date} &nbsp;·&nbsp;
                    <span style={{ color: "var(--orange)", fontWeight: 600 }}>{p.cat}</span>
                  </div>
                  <div className="mBlogPostTitle">{p.title}</div>
                  <div className="mBlogPostExcerpt">{p.excerpt}</div>
                  <span className="mBlogPostMore">Lees meer →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Recent */}
            <div className="mSidebarBox">
              <div className="mSidebarTitle">Recente artikels</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {RECENT.map((r, i) => (
                  <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 3 }}>{r.date}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{r.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schatting widget */}
            <div style={{ background: "var(--orange)", borderRadius: "var(--r-lg)", padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--surface)", marginBottom: 8 }}>
                Gratis schatting
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.75)", lineHeight: 1.6, marginBottom: 14 }}>
                Wat is uw eigendom waard? Vraag een vrijblijvende schatting aan bij onze experten.
              </p>
              <Link
                href={`${BASE}/contact`}
                style={{
                  display: "block", textAlign: "center", padding: "9px 0",
                  background: "var(--surface)", color: "var(--orange)",
                  borderRadius: "var(--r)", fontWeight: 700, fontSize: 13,
                }}
              >
                Schatting aanvragen
              </Link>
            </div>

            {/* Categories */}
            <div className="mSidebarBox">
              <div className="mSidebarTitle">Categorieën</div>
              <div className="mSidebarLinks">
                <a href="#">→ Markt & trends</a>
                <a href="#">→ Tips voor verkopers</a>
                <a href="#">→ Tips voor kopers</a>
                <a href="#">→ Huren & verhuren</a>
                <a href="#">→ Wetgeving</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MHiFooter />
    </>
  );
}
