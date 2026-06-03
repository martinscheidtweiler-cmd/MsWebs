import "../brixon.css";

const steps = [
  ["01", "Scan", "We bekijken budget, timing, technische risico’s, vergunningen, stabiliteit en gewenste afwerking."],
  ["02", "Plan", "We maken een fasering met duidelijke verantwoordelijkheden, materiaalkeuzes en controlepunten."],
  ["03", "Build", "Tijdens de uitvoering volgen we planning, werfkwaliteit, leveranciers en onderaannemers strak op."],
  ["04", "Control", "Elke fase krijgt controle op details, techniek, maatvoering, veiligheid en afwerking."],
  ["05", "Finish", "Opleverpunten worden afgewerkt tot het project niet alleen klaar is, maar ook klopt."],
  ["06", "Aftercare", "Na oplevering blijft er opvolging voor nazorg, garanties en technische vragen."],
];

export default function ProcessPage() {
  return (
    <main className="brixonPage">
      <header className="bxHeader"><div className="bxHeaderInner"><a className="bxLogo" href="/templates/bouwbedrijf">BRIXON<span>.</span></a><nav className="bxNav"><a href="/templates/bouwbedrijf">Home</a><a href="/templates/bouwbedrijf/projects">Projects</a><a href="/templates/bouwbedrijf/services">Services</a><a href="/templates/bouwbedrijf/process">Process</a><a href="/templates/bouwbedrijf/contact">Contact</a></nav><a className="bxBtn" href="/templates/bouwbedrijf/contact">Offerte</a></div></header>

      <section className="bxIntro" style={{ paddingTop: 170 }}>
        <span className="bxLabel">Process</span>
        <div>
          <p>Een bouwproject faalt niet door beton. Het faalt door slechte communicatie.</p>
          <small>Daarom werkt Brixon met een zichtbaar proces, vaste overlegmomenten en controlepunten die problemen vroeg onderscheppen.</small>
        </div>
      </section>

      <section className="bxSection">
        <div className="bxGrid">
          {steps.map(([nr,title,text])=>(
            <article className="bxCard" key={title}>
              <small>{nr}</small><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bxFooter"><strong>BRIXON</strong><span>Method</span></footer>
    </main>
  );
}