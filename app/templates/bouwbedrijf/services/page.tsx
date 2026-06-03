import "../brixon.css";

const services = [
  ["01", "Nieuwbouw", "Van fundering tot oplevering met technische voorbereiding, planning en vaste werfcontrole.", ["Ruwbouw", "Dak & gevel", "Technieken", "Afwerking"]],
  ["02", "Totaalrenovatie", "Wij coördineren afbraak, structuur, technieken, maatwerk en eindafwerking zonder chaos.", ["Afbraak", "Stabiliteit", "Nieuwe technieken", "Interieurafwerking"]],
  ["03", "Projectcoördinatie", "Eén aanspreekpunt voor architect, ingenieur, vakmannen, timing en budgetbewaking.", ["Planning", "Werfvergadering", "Budgetcontrole", "Opleverpunten"]],
  ["04", "Commercial fit-out", "Kantoren, retail en horeca waarbij uitstraling, timing en uitvoering perfect moeten kloppen.", ["Retail", "Kantoren", "Hospitality", "Showrooms"]],
  ["05", "Beton & structuur", "Structurele werken, funderingen, staal, beton en technische voorbereiding van complexe projecten.", ["Funderingen", "Staal", "Beton", "Openingen"]],
  ["06", "Premium afwerking", "Materialen, maatwerk, details, lichtlijnen en afwerking met oog voor luxe.", ["Vloeren", "Wanden", "Maatwerk", "Detailcontrole"]],
];

export default function ServicesPage() {
  return (
    <main className="brixonPage">
      <header className="bxHeader"><div className="bxHeaderInner"><a className="bxLogo" href="/templates/bouwbedrijf">BRIXON<span>.</span></a><nav className="bxNav"><a href="/templates/bouwbedrijf">Home</a><a href="/templates/bouwbedrijf/projects">Projects</a><a href="/templates/bouwbedrijf/services">Services</a><a href="/templates/bouwbedrijf/process">Process</a><a href="/templates/bouwbedrijf/contact">Contact</a></nav><a className="bxBtn" href="/templates/bouwbedrijf/contact">Offerte</a></div></header>

      <section className="bxSection" style={{ paddingTop: 170 }}>
        <span className="bxLabel">Services</span>
        <h1 className="bxTitle">One team. Full control.</h1>
        <p className="bxText">Brixon werkt voor klanten die geen losse aannemers willen aansturen, maar één sterke bouwpartner zoeken.</p>

        <div className="bxGrid">
          {services.map(([nr,title,text,list])=>(
            <article className="bxCard" key={title as string}>
              <small>{nr}</small><h3>{title}</h3><p>{text}</p>
              <ul>{(list as string[]).map((item)=><li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="bxDetail">
          <div className="bxDetailBox"><h3>Voor particulieren</h3><p>Van villa tot totaalrenovatie: we zorgen dat het project overzichtelijk blijft, ook wanneer de technische keuzes complex worden.</p></div>
          <div className="bxDetailBox"><h3>Voor bedrijven</h3><p>Voor commerciële ruimtes werken we met strakke fases, duidelijke oplevermomenten en minimale verstoring van de werking.</p></div>
        </div>
      </section>

      <footer className="bxFooter"><strong>BRIXON</strong><span>Services</span></footer>
    </main>
  );
}