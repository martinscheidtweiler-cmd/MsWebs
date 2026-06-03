import Link from "next/link";
import "../haras-noir.css";

export default function ContactPage() {
  return (
    <main className="hn">
      <Nav />

      <section className="hnPageHero contact">
        <p className="hnKicker">Private Contact</p>
        <h1>Private viewings only.</h1>
      </section>

      <section className="hnContactLayout">
        <div className="hnContactInfo">
          <p className="hnKicker">Haras Noir</p>
          <h2>For serious enquiries, private visits and selected horses.</h2>

          <div>
            <p>Belgium</p>
            <p>info@harasnoir.com</p>
            <p>+32 000 00 00 00</p>
            <p>@harasnoir</p>
          </div>
        </div>

        <form className="hnContactForm">
          <input placeholder="Name" />
          <input placeholder="Email" />
          <input placeholder="Phone" />
          <textarea placeholder="Message" rows={7} />
          <button type="button">Send enquiry</button>
        </form>
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