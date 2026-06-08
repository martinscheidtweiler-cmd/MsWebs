import Link from "next/link";
import VlsNav from "../VlsNav";
import VlsFooter from "../VlsFooter";
import "../vls.css";

const BASE = "/templates/vls-verwarming";

const DIENSTEN = [
  {
    num: "01",
    icon: "🔥",
    title: "Verwarming",
    desc: "VLS Verwarming staat in voor de volledige installatie, het onderhoud en de depannage van uw verwarmingssysteem. We werken met alle grote merken: Vaillant, Buderus, Viessmann en Junkers.",
    items: [
      "Plaatsing nieuwe condensatieketel",
      "Vervanging verouderde cv-ketel",
      "Jaarlijks onderhoud en keuring",
      "Depannage bij panne of storing",
      "Radiatoren plaatsen of vervangen",
      "Vloerverwarming installeren",
      "Bijvullen verwarmingsinstallatie",
    ],
  },
  {
    num: "02",
    icon: "🚿",
    title: "Sanitair",
    desc: "Van een lekkende kraan tot een volledige badkamerrenovatie — VLS voert alle sanitaire werken vakkundig uit. Klein of groot, wij lossen het op.",
    items: [
      "Herstelling leidingbreuk",
      "Vervanging kranen en mengkranen",
      "Plaatsing douche of bad",
      "Nieuwe toilet plaatsen",
      "Volledige badkamerrenovatie",
      "Leidingwerk vernieuwen bij renovatie",
      "Aansluiting nieuwe toestellen",
    ],
  },
  {
    num: "03",
    icon: "❄️",
    title: "Airconditioning",
    desc: "Warme zomers zijn aangenamer met een goed systeem. VLS plaatst en onderhoudt energiezuinige airconditioningsystemen voor particulieren en kleine bedrijven.",
    items: [
      "Split-unit airco plaatsen",
      "Multi-split systemen",
      "Jaarlijks onderhoud airco",
      "Warmtepomp-ready installaties",
      "Energiezuinige invertertechnologie",
      "Plaatsing in woning of kantoor",
    ],
  },
  {
    num: "04",
    icon: "💧",
    title: "Waterbehandeling",
    desc: "Hard water veroorzaakt kalkaanslag en beschadigt uw toestellen. Een waterbehandelingssysteem beschermt uw installatie en verlengt de levensduur van uw ketel.",
    items: [
      "Waterontharder plaatsen",
      "Onderhoud en zoutcontrole",
      "Anti-kalk systemen",
      "Waterkwaliteitsanalyse",
      "Koppeling met bestaande installatie",
    ],
  },
  {
    num: "05",
    icon: "💨",
    title: "Ventilatie",
    desc: "Een goed geventileerde woning is gezonder en verplicht in nieuwe woningen. VLS installeert ventilatiesystemen type C en D voor nieuwbouw en renovatie.",
    items: [
      "Ventilatiesysteem type C",
      "Ventilatiesysteem type D (WTW)",
      "Balansventilatie met warmterecuperatie",
      "Plaatsing ventilatiekanalen",
      "Onderhoud en filterwisseling",
      "Keuring en conformiteit",
    ],
  },
  {
    num: "06",
    icon: "🛠️",
    title: "Onderhoud & depannage",
    desc: "Regelmatig onderhoud voorkomt pannes en houdt uw installatie veilig en efficiënt. Bij een panne komt Sven zo snel mogelijk langs.",
    items: [
      "Jaarlijks ketelonderhoud",
      "Reiniging brander en warmtewisselaar",
      "Controle verbrandings- en rookgassen",
      "Depannage bij storing",
      "Noodinterventie",
      "Onderhoudscontract op maat",
    ],
  },
];

export default function DienstenPage() {
  return (
    <>
      <VlsNav />

      <div className="vlsPageHero">
        <div className="vlsPageHeroInner">
          <div className="vlsBreadcrumb">
            <Link href={BASE}>Home</Link>
            <span>/</span>
            <span>Diensten</span>
          </div>
          <h1 className="vlsPageHeroTitle">Onze diensten</h1>
          <p className="vlsPageHeroSub">
            Van verwarmingsketel tot badkamerrenovatie — VLS Verwarming is uw
            alles-in-één vakman voor verwarming, sanitair, airco en ventilatie
            in Nijlen en omgeving.
          </p>
        </div>
      </div>

      <section className="vlsDienstSection">
        <div className="vlsDienstInner">
          {DIENSTEN.map((d) => (
            <div className="vlsDienstItem" key={d.num}>
              <div className="vlsDienstNum">{d.num}</div>
              <div>
                <div className="vlsDienstIcon">{d.icon}</div>
                <div className="vlsDienstTitle">{d.title}</div>
                <p className="vlsDienstDesc">{d.desc}</p>
              </div>
              <ul className="vlsDienstList">
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="vlsCtaSection">
        <div className="vlsCtaBg" />
        <div className="vlsCtaInner">
          <div>
            <p className="vlsCtaLabel">Direct contact</p>
            <h2 className="vlsCtaTitle">Interesse of<br />een vraag?</h2>
            <p className="vlsCtaSub">
              Bel Sven rechtstreeks of vraag vrijblijvend een offerte aan.
              Snel, eerlijk en zonder verrassingen.
            </p>
          </div>
          <div className="vlsCtaRight">
            <a href="tel:+32498232625" className="vlsCtaPhoneCard">
              <div className="vlsCtaPhoneIcon">📞</div>
              <div>
                <div className="vlsCtaPhoneLabel">Bel rechtstreeks</div>
                <div className="vlsCtaPhoneNum">+32 498 23 26 25</div>
              </div>
            </a>
            <div className="vlsCtaOr">
              <div className="vlsCtaOrLine" />
              <span className="vlsCtaOrTxt">of</span>
              <div className="vlsCtaOrLine" />
            </div>
            <Link href={`${BASE}/contact`} className="vlsCtaFormLink">
              Offerte aanvragen →
            </Link>
          </div>
        </div>
      </section>

      <VlsFooter />
    </>
  );
}
