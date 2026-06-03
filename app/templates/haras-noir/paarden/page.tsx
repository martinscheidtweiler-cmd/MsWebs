import Link from "next/link";
import "../haras-noir.css";

const horses = [
  {
    name: "Noir Diamant",
    age: "8 jaar",
    level: "1.45m",
    type: "Ruin",
    text: "Modern springpaard met vermogen, bloed en uitstraling.",
  },
  {
    name: "Velvet Eclipse",
    age: "7 jaar",
    level: "1.35m",
    type: "Merrie",
    text: "Voorzichtige merrie met commerciële looks en snelle reflexen.",
  },
  {
    name: "Royal Obsidian",
    age: "9 jaar",
    level: "1.50m",
    type: "Hengst",
    text: "Ervaren sportpaard met kracht, overzicht en wedstrijdmentaliteit.",
  },
];

export default function PaardenPage() {
  return (
    <main className="hn">
      <Nav />

      <section className="hnPageHero horses">
        <p className="hnKicker">Collection</p>
        <h1>Selected sport horses.</h1>
      </section>

      <section className="hnHorseEditorial">
        {horses.map((horse, i) => (
          <article className="hnHorseFeature" key={horse.name}>
            <div className="hnHorseFeatureImage" />
            <div className="hnHorseFeatureText">
              <span>0{i + 1}</span>
              <h2>{horse.name}</h2>

              <div className="hnTags">
                <b>{horse.age}</b>
                <b>{horse.level}</b>
                <b>{horse.type}</b>
              </div>

              <p>{horse.text}</p>

              <Link href="/templates/haras-noir/contact" className="hnButton primary">
                Request information
              </Link>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="hnNav">
      <Link href="/templates/haras-noir" className="hnLogo">
        <span>HN</span>
        <strong>Haras Noir</strong>
      </Link>
      <nav>
        <Link href="/templates/haras-noir">Home</Link>
        <Link href="/templates/haras-noir/stal">Stable</Link>
        <Link href="/templates/haras-noir/paarden">Horses</Link>
        <Link href="/templates/haras-noir/sport">Sport</Link>
        <Link href="/templates/haras-noir/contact">Contact</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="hnFooter">
      <strong>Haras Noir</strong>
      <p>Premium showjumping stable · Belgium</p>
    </footer>
  );
}