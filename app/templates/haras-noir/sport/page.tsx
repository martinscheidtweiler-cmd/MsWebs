import Link from "next/link";
import "../haras-noir.css";

const timeline = [
  ["01", "Foundation", "Flatwork, confidence and technique."],
  ["02", "National rhythm", "Show mileage without forcing the horse."],
  ["03", "International goals", "Careful step-up to bigger rings."],
  ["04", "Commercial value", "Performance connected to presentation."],
];

export default function SportPage() {
  return (
    <main className="hn">
      <Nav />

      <section className="hnPageHero sport">
        <p className="hnKicker">Sport Program</p>
        <h1>Built for the arena.</h1>
      </section>

      <section className="hnStatement">
        <span>03 / Competition</span>
        <h2>
          Horses are not pushed into sport. They are prepared until the ring
          becomes logical.
        </h2>
      </section>

      <section className="hnSportTimeline">
        {timeline.map(([nr, title, text]) => (
          <article key={title}>
            <span>{nr}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="hnFullBleed sportBleed">
        <div>
          <p className="hnKicker">Show Calendar</p>
          <h2>From young horse classes to international sport.</h2>
          <Link href="/templates/haras-noir/contact" className="hnButton primary">
            Discuss a horse
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