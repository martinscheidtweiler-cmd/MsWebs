import "../fitness.css";

const protocols = [
  {
    title: "Strength System",
    price: "€149/m",
    text: "Voor klanten die sterker willen worden met duidelijke progressie, techniek en opvolging.",
    includes: ["4 training days", "progression blocks", "weekly video review", "load tracking"],
  },
  {
    title: "Hybrid Protocol",
    price: "€189/m",
    text: "Voor wie kracht, conditie en atletische performance wil combineren.",
    includes: ["strength + conditioning", "zone work", "performance tests", "nutrition targets"],
  },
  {
    title: "Body Recomposition",
    price: "€169/m",
    text: "Voor zichtbare verandering: strakker, sterker en consistenter.",
    includes: ["training plan", "food structure", "photo check-ins", "weekly correction"],
  },
];

export default function ProgramsPage() {
  return (
    <main className="forgePage">
      <header className="forgeHeader">
        <a href="/templates/fitness" className="forgeMark">F</a>

        <nav className="forgeNav">
          <a href="/templates/fitness">Index</a>
          <a href="/templates/fitness/programs">Protocols</a>
          <a href="/templates/fitness#apply">Apply</a>
        </nav>

        <a href="/templates/fitness#apply" className="forgeAccess">
          Request access
        </a>
      </header>

      <section className="forgeProtocolHero">
        <span>Forge protocols</span>
        <h1>Not random plans. Structured systems.</h1>
        <p>
          Elke formule heeft zijn eigen focus, intensiteit en opvolging. Hier zie
          je wat er precies inbegrepen zit.
        </p>
      </section>

      <section className="forgeProtocolList">
        {protocols.map((protocol, index) => (
          <article key={protocol.title}>
            <small>{String(index + 1).padStart(2, "0")}</small>

            <div>
              <h2>{protocol.title}</h2>
              <p>{protocol.text}</p>

              <ul>
                {protocol.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <strong>{protocol.price}</strong>

            <a href="/templates/fitness#apply">Apply</a>
          </article>
        ))}
      </section>
    </main>
  );
}