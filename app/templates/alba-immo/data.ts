export interface Property {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  location: string;
  municipality: string;
  province: string;
  country: string;
  price: number | null;
  priceOnRequest: boolean;
  groundSurface: number; // m²
  livingSurface: number; // m²
  stalls: number;
  indoorArena: boolean;
  outdoorArena: boolean;
  paddocks: number;
  pastures: number; // ha
  boxes: number;
  residence: boolean;
  permits: string[];
  description: string;
  features: string[];
  tag: string;
  featured: boolean;
  year: number;
  gradient: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  gradient: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "stoeterij-molenhoek",
    title: "Stoeterij Molenhoek",
    subtitle: "Exclusieve stoeterij met internationale uitstraling",
    type: "Stoeterij",
    location: "Molenhoek, Maasgouw",
    municipality: "Maasgouw",
    province: "Limburg",
    country: "Nederland",
    price: 3850000,
    priceOnRequest: false,
    groundSurface: 180000,
    livingSurface: 680,
    stalls: 42,
    indoorArena: true,
    outdoorArena: true,
    paddocks: 8,
    pastures: 14.2,
    boxes: 42,
    residence: true,
    permits: ["Agrarische bestemming", "Woonvergunning", "Milieuvergunning klasse 2"],
    description: "Unieke stoeterij op 18 hectare met uitzonderlijke infrastructuur. De eigendom omvat een hoofdwoning van 680 m², een professionele overdekte rijhal van 60×20m, een buitenpiste van 80×40m met drainage en verlichting, 42 stallen in twee staldelen, een longeercirkel en een knechtenwoning. Ideaal voor professionele fokkers en sport.",
    features: ["Longeercirkel 20m", "Knechtenwoning 120m²", "Washbox × 4", "Hooiberg 800m²", "Onderhoudsloods", "Drainagepiste met verlichting", "Videobewaking"],
    tag: "Nieuw",
    featured: true,
    year: 2024,
    gradient: "linear-gradient(135deg, #1a160f 0%, #2d2115 50%, #1e1a10 100%)",
  },
  {
    id: "manege-le-chateau",
    title: "Manège Le Château",
    subtitle: "Gerenommeerde manège in hartje Haspengouw",
    type: "Manège",
    location: "Tongeren, Haspengouw",
    municipality: "Tongeren",
    province: "Limburg",
    country: "België",
    price: null,
    priceOnRequest: true,
    groundSurface: 92000,
    livingSurface: 420,
    stalls: 28,
    indoorArena: true,
    outdoorArena: true,
    paddocks: 5,
    pastures: 7.8,
    boxes: 28,
    residence: true,
    permits: ["Agrarische zone", "Vergund paardenbedrijf", "Milieuvergunning"],
    description: "Volledig vergunde manège in het fraaie Haspengouws landschap. De accommodatie biedt een overdekte rijhal, buitenpiste, 28 stallen en een comfortabele woning. Uitstekende bereikbaarheid via E313 en gevestigde cliëntèle.",
    features: ["Rijhal 50×20m", "Buitenpiste 60×30m", "Tribunetribune 80 plaatsen", "Club & sanitair", "Stalmeester appartement"],
    tag: "Exclusief",
    featured: true,
    year: 2024,
    gradient: "linear-gradient(135deg, #1a1510 0%, #2a1e0c 50%, #1e1810 100%)",
  },
  {
    id: "domein-van-den-berg",
    title: "Domein Van den Berg",
    subtitle: "Landelijk domein met volledig hippische uitrusting",
    type: "Landgoed",
    location: "Sint-Lievens-Esse, Herzele",
    municipality: "Herzele",
    province: "Oost-Vlaanderen",
    country: "België",
    price: 1950000,
    priceOnRequest: false,
    groundSurface: 64000,
    livingSurface: 520,
    stalls: 18,
    indoorArena: false,
    outdoorArena: true,
    paddocks: 4,
    pastures: 5.5,
    boxes: 18,
    residence: true,
    permits: ["Landelijk gebied", "Woonvergunning", "Vergund hippisch bedrijf"],
    description: "Prachtig landgoed op 6,4 hectare in het groene Vlaamse Ardennen. Herrenhoeve uit 1887 volledig gerenoveerd met respect voor historisch karakter. Stalblok voor 18 paarden, buitenpiste en ruime weiden.",
    features: ["Herrenhoeve 1887", "Wijnkelder", "Poolhouse", "Buitenpiste 50×25m", "Irrigatiesysteem"],
    tag: "Historisch",
    featured: false,
    year: 2023,
    gradient: "linear-gradient(135deg, #18100a 0%, #241808 50%, #1c1206 100%)",
  },
  {
    id: "pensionstallen-de-klokke",
    title: "Pensionstallen De Klokke",
    subtitle: "Professionele pensionstallen met uitstekende reputatie",
    type: "Pensionstallen",
    location: "Grobbendonk, Antwerpen",
    municipality: "Grobbendonk",
    province: "Antwerpen",
    country: "België",
    price: 1280000,
    priceOnRequest: false,
    groundSurface: 38000,
    livingSurface: 280,
    stalls: 34,
    indoorArena: true,
    outdoorArena: true,
    paddocks: 6,
    pastures: 3.2,
    boxes: 34,
    residence: true,
    permits: ["Agrarische zone", "Vergund hippisch bedrijf"],
    description: "Gevestigd pensionbedrijf met 34 stallen, rijhal en twee buitenpistes. Ideale ligging nabij Antwerpen met goede klantenkring. Stalmeesterwoning inbegrepen.",
    features: ["Rijhal 45×20m", "2 buitenpistes", "Douches × 6", "Voederopslag 400m²"],
    tag: "Rendement",
    featured: false,
    year: 2024,
    gradient: "linear-gradient(135deg, #180c0a 0%, #281408 50%, #1a1008 100%)",
  },
  {
    id: "haras-du-bois-noble",
    title: "Haras du Bois Noble",
    subtitle: "Uitzonderlijk Frans stoeterijdomein nabij Deauville",
    type: "Stoeterij",
    location: "Lisieux, Normandië",
    municipality: "Lisieux",
    province: "Calvados",
    country: "Frankrijk",
    price: 6200000,
    priceOnRequest: false,
    groundSurface: 450000,
    livingSurface: 1200,
    stalls: 68,
    indoorArena: true,
    outdoorArena: true,
    paddocks: 16,
    pastures: 38.5,
    boxes: 68,
    residence: true,
    permits: ["Zone agricole", "Permis de construire", "Enregistrement haras"],
    description: "Exceptionneel Normandisch stoeterijdomein op 45 hectare in de befaamde hippische regio rondom Deauville. Herenhuis uit de 18e eeuw, twee professionele staldelen, overdekte rijhal, buitengalopppade en draf-piste.",
    features: ["Herenhuis 18e eeuw", "Galoppade 1200m", "Drafpiste 800m", "Directieset appartementen", "Veterinaire ruimte"],
    tag: "International",
    featured: true,
    year: 2024,
    gradient: "linear-gradient(135deg, #181410 0%, #261a0c 50%, #1c1410 100%)",
  },
  {
    id: "hoeve-de-waterput",
    title: "Hoeve De Waterput",
    subtitle: "Authentieke Kempense hoeve met uitbreidingsmogelijkheden",
    type: "Hoeve",
    location: "Retie, Kempen",
    municipality: "Retie",
    province: "Antwerpen",
    country: "België",
    price: 895000,
    priceOnRequest: false,
    groundSurface: 28000,
    livingSurface: 340,
    stalls: 12,
    indoorArena: false,
    outdoorArena: false,
    paddocks: 3,
    pastures: 2.4,
    boxes: 12,
    residence: true,
    permits: ["Agrarische zone", "Woonvergunning"],
    description: "Karaktervolle Kempense hoeve op 2,8 hectare, volledig gerenoveerd in 2019. Stalblok voor 12 paarden met groeimogelijkheid. Grote woning, landschappelijk gelegen.",
    features: ["Renovatie 2019", "Zonnepanelen 24 kWp", "Warmtepomp", "Regenwaterput 20.000L"],
    tag: "Te koop",
    featured: false,
    year: 2023,
    gradient: "linear-gradient(135deg, #100e08 0%, #1c1a0e 50%, #141208 100%)",
  },
  {
    id: "kasteel-d-arenberg",
    title: "Kasteel d'Arenberg",
    subtitle: "Monumentaal kasteeldomein met hippische infrastructuur",
    type: "Kasteeldomein",
    location: "Edegem, Antwerpen",
    municipality: "Edegem",
    province: "Antwerpen",
    country: "België",
    price: null,
    priceOnRequest: true,
    groundSurface: 220000,
    livingSurface: 1800,
    stalls: 24,
    indoorArena: false,
    outdoorArena: true,
    paddocks: 6,
    pastures: 16.0,
    boxes: 24,
    residence: true,
    permits: ["Beschermd erfgoed", "Parkzone", "Woonvergunning"],
    description: "Uitzonderlijk kasteeldomein van 22 hectare met 19e-eeuws kasteel, koetshuis, orangerie en historische stallingen voor 24 paarden. Zeldzame opportuniteit op de vastgoedmarkt.",
    features: ["Kasteel 19e eeuw", "Koetshuis", "Orangerie", "Historische stallingen", "Kerkelijk beschermd"],
    tag: "Uniek",
    featured: true,
    year: 2024,
    gradient: "linear-gradient(135deg, #10080a 0%, #1e1010 50%, #160a0c 100%)",
  },
  {
    id: "centre-equestre-namur",
    title: "Centre Équestre de Namur",
    subtitle: "Volledig operationeel equitatiebedrijf",
    type: "Manège",
    location: "Gembloux, Namen",
    municipality: "Gembloux",
    province: "Namen",
    country: "België",
    price: 2100000,
    priceOnRequest: false,
    groundSurface: 78000,
    livingSurface: 360,
    stalls: 45,
    indoorArena: true,
    outdoorArena: true,
    paddocks: 9,
    pastures: 6.8,
    boxes: 45,
    residence: false,
    permits: ["Zone d'activité agricole", "Autorisation environnementale"],
    description: "Volledig operationeel équitatiecentrum met 45 stallen, twee overdekte rijhallen, tribunes en een uitgebreide buiteninfrastructuur. Goede omzet en groeiende cliëntèle.",
    features: ["2 rijhallen", "Springparcours buiten", "Dressuurpiste verlicht", "Horeca ruimte", "Parkeerfaciliteiten 80 wagens"],
    tag: "Bedrijf",
    featured: false,
    year: 2024,
    gradient: "linear-gradient(135deg, #161410 0%, #241c0c 50%, #1a1610 100%)",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "ruimtelijke-ordening-hippisch",
    title: "Ruimtelijke ordening bij hippische eigendommen: wat u moet weten",
    excerpt: "De regelgeving rond agrarisch gebied en hippisch gebruik wordt steeds complexer. Een overzicht van de belangrijkste aandachtspunten bij aankoop of verkoop.",
    category: "Regelgeving",
    date: "12 mei 2025",
    readTime: 7,
    gradient: "linear-gradient(135deg, #1a160a 0%, #2a2010 100%)",
  },
  {
    id: "waardebepaling-stoeterij",
    title: "Hoe bepaalt u de correcte waarde van een stoeterij?",
    excerpt: "Hippisch vastgoed kent een unieke waarderingsmethode. Voorbij de klassieke vierkante meterprijs spelen reputatie, infrastructuur en locatie een cruciale rol.",
    category: "Expertise",
    date: "28 april 2025",
    readTime: 9,
    gradient: "linear-gradient(135deg, #181410 0%, #2a1e0c 100%)",
  },
  {
    id: "hippisch-vastgoed-2025",
    title: "De hippische vastgoedmarkt in 2025: trends en vooruitzichten",
    excerpt: "Na recordjaren trekt de markt voor hippisch vastgoed verder aan. Internationale kopers en een beperkt aanbod drijven de vraag naar exclusieve eigendommen.",
    category: "Markt",
    date: "3 maart 2025",
    readTime: 6,
    gradient: "linear-gradient(135deg, #160a0c 0%, #220e12 100%)",
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatSurface(m2: number): string {
  if (m2 >= 10000) return `${(m2 / 10000).toFixed(1)} ha`;
  return `${m2.toLocaleString("nl-BE")} m²`;
}
