import "../brixon.css";

export default function ContactPage() {
  return (
    <main className="brixonPage">
      <header className="bxHeader"><div className="bxHeaderInner"><a className="bxLogo" href="/templates/bouwbedrijf">BRIXON<span>.</span></a><nav className="bxNav"><a href="/templates/bouwbedrijf">Home</a><a href="/templates/bouwbedrijf/projects">Projects</a><a href="/templates/bouwbedrijf/services">Services</a><a href="/templates/bouwbedrijf/process">Process</a><a href="/templates/bouwbedrijf/contact">Contact</a></nav><a className="bxBtn" href="/templates/bouwbedrijf/contact">Offerte</a></div></header>

      <section className="bxContact" style={{ paddingTop: 170, display: "grid", gridTemplateColumns: "1fr 520px", gap: 70 }}>
        <div>
          <span className="bxLabel">Contact</span>
          <h1 className="bxTitle">Start with a clear build brief.</h1>
          <p className="bxText">
            Vertel kort wat je wil bouwen of renoveren. Brixon neemt contact op voor
            een technische eerste bespreking rond timing, budget, stijl en haalbaarheid.
          </p>
          <div className="bxDetail" style={{ gridTemplateColumns: "1fr", marginTop: 34 }}>
            <div className="bxDetailBox"><h3>Contactgegevens</h3><p>info@brixonconstruct.be<br/>+32 3 000 00 00<br/>Industrieweg 18, Antwerpen</p></div>
          </div>
        </div>

        <form className="bxForm">
          <input placeholder="Naam" />
          <input placeholder="E-mail" />
          <input placeholder="Telefoon" />
          <select defaultValue="">
            <option value="" disabled>Type project</option>
            <option>Nieuwbouw</option>
            <option>Totaalrenovatie</option>
            <option>Commercial fit-out</option>
            <option>Projectcoördinatie</option>
          </select>
          <textarea placeholder="Beschrijf je project, timing en gewenste afwerking" />
          <button type="button">Verstuur aanvraag</button>
        </form>
      </section>

      <footer className="bxFooter"><strong>BRIXON</strong><span>info@brixonconstruct.be</span></footer>
    </main>
  );
}