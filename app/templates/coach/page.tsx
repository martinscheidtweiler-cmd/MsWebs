import "./coach.css";

const services = [
  {
    nr: "01",
    title: "Business Strategy",
    text: "We help founders and leadership teams cut through noise, identify their most valuable opportunities and create executable roadmaps.",
    list: ["Growth strategy", "Market positioning", "Roadmap design", "Competitive analysis"],
  },
  {
    nr: "02",
    title: "Executive Coaching",
    text: "Private one-on-one coaching for CEOs, founders and senior leaders navigating high-stakes decisions and personal growth.",
    list: ["Leadership development", "Decision frameworks", "Team dynamics", "Performance systems"],
  },
  {
    nr: "03",
    title: "Organisational Design",
    text: "We help growing companies build the structures, processes and culture that scale with ambition rather than against it.",
    list: ["Structure design", "Process clarity", "Culture work", "Change management"],
  },
  {
    nr: "04",
    title: "Advisory Retainer",
    text: "Ongoing strategic access for companies that want a senior thinking partner available when decisions can't wait.",
    list: ["Monthly strategic sessions", "On-demand access", "Board preparation", "Key hire guidance"],
  },
  {
    nr: "05",
    title: "Team Workshops",
    text: "Focused full-day or half-day workshops for leadership teams that need to align, decide or accelerate.",
    list: ["Alignment sessions", "Strategy sprints", "Vision workshops", "Offsite design"],
  },
  {
    nr: "06",
    title: "Transformation Programs",
    text: "12-week structured engagements for organisations at a turning point — growth, transition, or reinvention.",
    list: ["12-week program", "Weekly sessions", "Implementation support", "Progress tracking"],
  },
];

const process = [
  {
    nr: "01",
    title: "Discovery",
    text: "A focused 90-minute conversation to understand your situation, goals and what's genuinely in the way. No generic intake forms.",
  },
  {
    nr: "02",
    title: "Diagnosis",
    text: "We map the real problem — not just the symptom. This clarity is often the most valuable part of the entire engagement.",
  },
  {
    nr: "03",
    title: "Design",
    text: "Together we build the plan, the structure and the decision-making framework specific to your context.",
  },
  {
    nr: "04",
    title: "Execution",
    text: "We work alongside you through implementation. Not at a distance. Not with templates. With you.",
  },
];

const testimonials = [
  {
    quote: "Clarity didn't give us answers — they gave us the right questions. Our strategy became 10x sharper in three sessions.",
    name: "Pieter V.",
    role: "CEO, Series B SaaS",
    initial: "P",
  },
  {
    quote: "I came in thinking I had a growth problem. I left knowing I had a clarity problem. That distinction changed everything.",
    name: "Sarah L.",
    role: "Founder, Consumer Brand",
    initial: "S",
  },
  {
    quote: "The organisational design work we did together was the most impactful investment we made in 2024. Period.",
    name: "Matthias D.",
    role: "COO, Scale-up",
    initial: "M",
  },
];

const marqueeItems = [
  "Strategic clarity",
  "Executive coaching",
  "Organisational design",
  "Growth roadmaps",
  "Leadership development",
  "Decision frameworks",
  "Strategic clarity",
  "Executive coaching",
  "Organisational design",
  "Growth roadmaps",
  "Leadership development",
  "Decision frameworks",
];

export default function CoachPage() {
  return (
    <main className="clarityPage">
      <nav className="clarityNav">
        <a href="/templates/coach" className="clarityBrand">
          <strong>Clarity</strong>
          <span>Consulting</span>
        </a>

        <nav>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#testimonials">Results</a>
          <a href="#contact" className="clarityNavBtn">Start intake</a>
        </nav>
      </nav>

      <section className="clarityHero">
        <div className="clarityHeroTop">
          <div>
            <div className="clarityHeroEyebrow">
              <span>Strategic consulting · Belgium</span>
            </div>
            <h1>Strategy without<br />noise.</h1>
          </div>

          <div className="clarityHeroRight">
            <p>
              Clarity Consulting works with founders, CEOs and leadership
              teams who need sharper thinking, faster decisions and better
              outcomes.
            </p>
            <a href="#contact">Request intake →</a>
          </div>
        </div>

        <div className="clarityHeroImage">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90"
            alt="Clarity Consulting strategy session"
          />
          <div className="clarityHeroStats">
            <div>
              <strong>120+</strong>
              <span>Engagements</span>
            </div>
            <div>
              <strong>8yr</strong>
              <span>Experience</span>
            </div>
            <div>
              <strong>€2.4B+</strong>
              <span>Client revenue impacted</span>
            </div>
          </div>
        </div>
      </section>

      <div className="clarityMarquee">
        <div className="clarityMarqueeTrack">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={i % 4 === 0 ? "accent" : ""}>
              {item} {i % 4 !== 0 ? "·" : "★"}
            </span>
          ))}
        </div>
      </div>

      <section className="clarityStatement">
        <div className="clarityStatementLeft">
          <span>Philosophy</span>
          <p>
            Most strategy fails not because of bad ideas — but because of
            unclear thinking, misaligned teams and decisions made in the wrong
            order. We fix that.
          </p>
        </div>

        <div className="clarityStatementRight">
          <h2>
            Most consultants give you a deck.<br />
            We give you <em>decision clarity.</em>
          </h2>
          <a href="#process" className="clarityStatementCta">
            How we work →
          </a>
        </div>
      </section>

      <section className="clarityServices" id="services">
        <div className="claritySectionHead">
          <span>What we do</span>
          <h2>Six ways we work<br />with you.</h2>
        </div>

        <div className="clarityServiceGrid">
          {services.map((s) => (
            <div className="clarityServiceCard" key={s.nr}>
              <div className="clarityServiceNum">{s.nr}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="clarityNumbers">
        <div className="clarityNumberItem">
          <strong>120+</strong>
          <span>Engagements completed</span>
        </div>
        <div className="clarityNumberItem">
          <strong>94%</strong>
          <span>Client retention rate</span>
        </div>
        <div className="clarityNumberItem">
          <strong>€2.4B+</strong>
          <span>Client revenue impacted</span>
        </div>
        <div className="clarityNumberItem">
          <strong>8yr</strong>
          <span>Senior consulting experience</span>
        </div>
      </div>

      <section className="clarityProcess" id="process">
        <div className="claritySectionHead">
          <span>How we work</span>
          <h2>Four steps.<br />No fluff.</h2>
        </div>

        <div className="clarityProcessList">
          {process.map((step) => (
            <div className="clarityProcessItem" key={step.nr}>
              <div className="clarityProcessNum">{step.nr}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="clarityQuote">
        <div className="clarityQuoteInner">
          <blockquote>
            "The most expensive thing in business is <em>unclear thinking.</em>
            {" "}We make it expensive to stay confused."
          </blockquote>
          <div className="clarityQuoteAuthor">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
              alt="Thomas Claes"
            />
            <div>
              <strong>Thomas Claes</strong>
              <span>Founder, Clarity Consulting</span>
            </div>
          </div>
        </div>
      </section>

      <section className="clarityTestimonials" id="testimonials">
        <div className="claritySectionHead">
          <span>Results</span>
          <h2>What clients say.</h2>
        </div>

        <div className="clarityTestGrid">
          {testimonials.map((t) => (
            <div className="clarityTestCard" key={t.name}>
              <div className="clarityTestStars">★★★★★</div>
              <blockquote>"{t.quote}"</blockquote>
              <div className="clarityTestAuthor">
                <div className="clarityTestAvatar">{t.initial}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="clarityContact" id="contact">
        <div className="clarityContactLeft">
          <span>Start here</span>
          <h2>Request a private intake.</h2>
          <p>
            We begin with a focused 90-minute session. No commitment required.
            You leave with more clarity than when you arrived — guaranteed.
          </p>
          <div className="clarityContactInfo">
            <a href="mailto:hello@clarityconsulting.be">hello@clarityconsulting.be</a>
            <a href="tel:+32000000000">+32 000 00 00 00</a>
            <a href="#">Belgium · Remote available</a>
          </div>
        </div>

        <form className="clarityForm">
          <h3>Start the conversation</h3>
          <input placeholder="Your name" />
          <input placeholder="Email address" type="email" />
          <input placeholder="Company / Organisation" />
          <select defaultValue="">
            <option value="" disabled>Area of interest</option>
            <option>Business Strategy</option>
            <option>Executive Coaching</option>
            <option>Organisational Design</option>
            <option>Advisory Retainer</option>
            <option>Team Workshop</option>
            <option>Transformation Program</option>
          </select>
          <textarea placeholder="What are you working on? What's in the way?" rows={5} />
          <button type="button">Request intake →</button>
        </form>
      </section>

      <footer className="clarityFooter">
        <strong>Clarity Consulting</strong>
        <p>Strategic consulting · Belgium · Est. 2016</p>
      </footer>
    </main>
  );
}
