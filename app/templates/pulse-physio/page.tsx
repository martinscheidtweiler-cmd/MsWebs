"use client";
import "./pulse.css";

export default function PulsePhysioTemplate() {
  return (
    <>
      <nav className="ppNav">
        <div className="ppLogo">Pulse<span>.</span>Physio</div>
        <div className="ppNavLinks">
          <a href="#">Behandelingen</a>
          <a href="#">Team</a>
          <a href="#">Tarieven</a>
          <a href="#">Praktische info</a>
          <a href="#">Contact</a>
        </div>
        <button className="ppNavBtn">Afspraak boeken</button>
      </nav>

      <section className="ppHero">
        <div className="ppHeroLeft">
          <div className="ppHeroDeco" />
          <div className="ppHeroTag"><span>Erkende kinesitherapie</span></div>
          <h1 className="ppHeroTitle">MOVE<em>BETTER.</em></h1>
          <p className="ppHeroSub">Pulse Physio biedt gespecialiseerde kinesitherapie voor sporters, revalidatiepatiënten en iedereen die pijnvrij wil bewegen.</p>
          <div className="ppHeroBtns">
            <button className="ppBtn">Afspraak boeken</button>
            <button className="ppBtnGhost">Meer info</button>
          </div>
        </div>
        <div className="ppHeroRight">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85" alt="Physiotherapy" />
          <div className="ppHeroStats">
            {[
              { num: "2.400+", label: "Patiënten" },
              { num: "12jr", label: "Ervaring" },
            ].map((s) => (
              <div key={s.label} className="ppHeroStat">
                <div className="ppHeroStatNum">{s.num}</div>
                <div className="ppHeroStatLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ppServices">
        <div className="ppServInner">
          <div className="ppServHead">
            <div>
              <span className="ppServTag">Ons aanbod</span>
              <h2>Wat wij behandelen</h2>
            </div>
            <button className="ppBtnGhost" style={{color:'var(--text)',background:'transparent',border:'1.5px solid rgba(26,10,0,.15)',borderRadius:'10px',padding:'12px 24px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Alle behandelingen</button>
          </div>
          <div className="ppServGrid">
            {[
              { icon: "🦴", title: "Musculoskeletaal", desc: "Rug-, nek- en gewrichtsklachten, spit, hernia — acute en chronische pijnaanpak." },
              { icon: "⚽", title: "Sportrevalidatie", desc: "Optimale terugkeer naar sport na blessure of operatie. Voor recreatieve en topsporters." },
              { icon: "🧠", title: "Neurologische revalidatie", desc: "Begeleiding na CVA, hersenchirurgie of andere neurologische aandoeningen." },
              { icon: "💆", title: "Dry needling", desc: "Triggerpuntbehandeling voor hardnekkige spierpijn en myofasciale klachten." },
            ].map((s) => (
              <div key={s.title} className="ppServCard">
                <div className="ppServIcon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ppTeam">
        <div className="ppTeamInner">
          <div className="ppTeamHead">
            <span className="ppServTag">Ons team</span>
            <h2>Onze kinesitherapeuten</h2>
          </div>
          <div className="ppTeamGrid">
            {[
              { name: "Arne Desmet", spec: "Sportrevalidatie & Dry needling", bio: "Master KFR, gespecialiseerd in sportletsels en postoperatieve revalidatie. Werkt met diverse professionele sportclubs.", img: "photo-1612349317150-e413f6a5b16d" },
              { name: "Lien Mertens", spec: "Neurologische revalidatie", bio: "Bijzondere expertise in neuro-revalidatie na CVA en hersenletsels. Gecertificeerd Bobath therapeut.", img: "photo-1594824476967-48c8b964273f" },
              { name: "Tom Claes", spec: "Musculoskeletaal & Manuele therapie", bio: "Gespecialiseerd in manuele therapie en manipulatieve behandelingen van de wervelkolom.", img: "photo-1582750433449-648ed127bb54" },
            ].map((t) => (
              <div key={t.name} className="ppTeamCard">
                <div className="ppTeamImg">
                  <img src={`https://images.unsplash.com/${t.img}?w=500&q=80`} alt={t.name} />
                </div>
                <div className="ppTeamBody">
                  <div className="ppTeamName">{t.name}</div>
                  <div className="ppTeamSpec">{t.spec}</div>
                  <p className="ppTeamBio">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ppCta">
        <div className="ppCtaInner">
          <h2>Klaar om pijnvrij te bewegen?</h2>
          <p>Plan uw afspraak online of bel ons. Eerste consultatie ook mogelijk via videoconsult.</p>
          <button className="ppBtnWhite">Online afspraak boeken</button>
        </div>
      </section>

      <footer className="ppFooter">
        <div className="ppFooterInner">
          <div className="ppFooterLogo">Pulse<span>.</span>Physio</div>
          <div className="ppFooterCopy">© 2025 Pulse Physio — Erkende kinesitherapie</div>
        </div>
      </footer>
    </>
  );
}
