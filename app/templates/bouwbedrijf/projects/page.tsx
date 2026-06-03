import "../brixon.css";

const projects = [
  {
    nr: "01",
    title: "Monolith House",
    type: "Private villa",
    location: "Brasschaat",
    year: "2026",
    surface: "840 m²",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
  },
  {
    nr: "02",
    title: "Warehouse 17",
    type: "Commercial fit-out",
    location: "Antwerp",
    year: "2025",
    surface: "1.420 m²",
    status: "In progress",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90",
  },
  {
    nr: "03",
    title: "Concrete Loft",
    type: "Total renovation",
    location: "Ghent",
    year: "2025",
    surface: "310 m²",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=90",
  },
];

export default function ProjectsPage() {
  return (
    <main className="brixonPage">
      <header className="bxHeader">
        <div className="bxHeaderInner">
          <a className="bxLogo" href="/templates/bouwbedrijf">
            BRIXON<span>.</span>
          </a>

          <nav className="bxNav">
            <a href="/templates/bouwbedrijf">Home</a>
            <a href="/templates/bouwbedrijf/projects">Projects</a>
            <a href="/templates/bouwbedrijf/services">Services</a>
            <a href="/templates/bouwbedrijf/process">Process</a>
            <a href="/templates/bouwbedrijf/contact">Contact</a>
          </nav>

          <a className="bxBtn" href="/templates/bouwbedrijf/contact">
            Request quote
          </a>
        </div>
      </header>

      <section className="bxProjectsHero">
        <span className="bxLabel">Project archive</span>
        <h1>Built proof.</h1>
        <p>
          Een selectie van projecten waar planning, techniek, afwerking en
          werfcontrole zichtbaar samenkomen.
        </p>
      </section>

      <section className="bxProjectArchive">
        {projects.map((project) => (
          <article className="bxArchiveItem" key={project.title}>
            <div className="bxArchiveNr">{project.nr}</div>

            <div className="bxArchiveImage">
              <img src={project.image} alt={project.title} />
            </div>

            <div className="bxArchiveInfo">
              <span>{project.type}</span>
              <h2>{project.title}</h2>

              <div className="bxArchiveSpecs">
                <p>
                  <strong>Location</strong>
                  {project.location}
                </p>
                <p>
                  <strong>Year</strong>
                  {project.year}
                </p>
                <p>
                  <strong>Surface</strong>
                  {project.surface}
                </p>
                <p>
                  <strong>Status</strong>
                  {project.status}
                </p>
              </div>

              <a href="/templates/bouwbedrijf/contact">
                Vraag gelijkaardig project
              </a>
            </div>
          </article>
        ))}
      </section>

      <footer className="bxFooter">
        <strong>BRIXON</strong>
        <span>Project archive</span>
      </footer>
    </main>
  );
}