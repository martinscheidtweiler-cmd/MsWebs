import Link from "next/link";
import "../haras-noir.css";

const facilities = [
  ["Indoor arena", "Professional footing for precise daily work."],
  ["Outdoor arena", "Large open space for courses and young horses."],
  ["Private stables", "Quiet boxes with premium daily care."],
  ["Turnout", "Paddocks and fields for mental freshness."],
  ["Care zones", "Wash bays, grooming spaces and vet-friendly handling."],
  ["Calm system", "Designed for sport horses that need rhythm."],
];

export default function StalPage() {
  return (
    <main className="hn">
      <Nav />

      <section className="hnPageHero stable">
        <p className="hnKicker">Facilities</p>
        <h1>Designed for performance.</h1>
      </section>

      <section className="hnStatement">
        <span>02 / Stable</span>
        <h2>
          A private environment where every detail supports focus, recovery and
          long-term sport.
        </h2>
      </section>

      <section className="hnFacilityGrid">
        {facilities.map(([title, text], i) => (
          <article key={title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="hnSplitShow reverse">
        <div className="hnSplitImage stable" />
        <div className="hnSplitText">
          <p className="hnKicker">Daily management</p>
          <h2>Luxury is not decoration. It is routine.</h2>
          <p>
            Feeding, turnout, work, recovery and competition preparation are
            organised with a clear rhythm so horses stay fresh and confident.
          </p>
          <Link href="/templates/haras-noir/contact" className="hnTextLink">
            Plan a private visit →
          </Link>
        </div>
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