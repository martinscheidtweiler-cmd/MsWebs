// ─────────────────────────────────────────────
// MS Webdesign — Mock Data
// Replace with Supabase queries later
// ─────────────────────────────────────────────

export type AddonKey = "google-boost" | "webshop" | "appointment" | "extra-lang";
export type ProjectStep = "intake" | "design" | "feedback" | "adjustments" | "ready" | "online";
export type RequestStatus = "new" | "in-progress" | "waiting" | "done";
export type WebsiteStatus = "intake" | "in-design" | "feedback" | "adjustments" | "ready" | "online";

export const ADDONS = [
  {
    key: "google-boost" as AddonKey,
    name: "Google Boost",
    price: 9.99,
    description: "Google Business Profile optimalisatie, Maps integratie en Reviews op je website.",
    features: ["Google Business Profile", "Google Maps integratie", "Reviews op website", "Foto's beheren", "Periodieke controle"],
  },
  {
    key: "webshop" as AddonKey,
    name: "Webshop Module",
    price: 19.99,
    description: "Volledige webshop met productbeheer, winkelwagen en checkout.",
    features: ["Volledige webshop", "Productbeheer", "Categorieën", "Winkelwagen + checkout", "Admin omgeving"],
  },
  {
    key: "appointment" as AddonKey,
    name: "Afspraakmodule",
    price: 19.99,
    description: "Online afspraken boeken met beschikbaarheidsbeheer en e-mailbevestigingen.",
    features: ["Online afspraken", "Beschikbaarheid beheren", "E-mailbevestigingen", "Admin omgeving"],
  },
  {
    key: "extra-lang" as AddonKey,
    name: "Extra taal",
    price: 9.99,
    description: "Extra taalversie van je website met een taalwisselaar.",
    features: ["Extra taalversie", "Taalwisselaar", "Eigen content per taal"],
  },
];

export const PROJECT_STEPS = [
  { key: "intake" as ProjectStep, label: "Intake ontvangen" },
  { key: "design" as ProjectStep, label: "Eerste ontwerp" },
  { key: "feedback" as ProjectStep, label: "Feedbackronde" },
  { key: "adjustments" as ProjectStep, label: "Aanpassingen" },
  { key: "ready" as ProjectStep, label: "Website klaar" },
  { key: "online" as ProjectStep, label: "Website online" },
];

// ── Mock logged-in client ──
export const mockClient = {
  id: "c001",
  businessName: "Kapsalon HAAR",
  contactPerson: "Shana Verberck",
  email: "shana@haar.be",
  phone: "+32 476 12 34 56",
  subscription: "essential",
  subscriptionPrice: 29.99,
  activeAddons: ["google-boost", "appointment"] as AddonKey[],
  websiteUrl: "https://haar.be",
  domain: "haar.be",
  websiteStatus: "online" as WebsiteStatus,
  projectStep: "online" as ProjectStep,
  lastUpdate: "2 juni 2026",
  since: "15 januari 2024",
  mrr: 59.97,
  minutesIncluded: 30,
  minutesUsed: 15,
};

// ── Mock time log ──
export const mockTimeLogs = [
  { id: "t1", date: "2026-06-02", description: "Homepage hero bijgewerkt", minutes: 15, billable: false },
  { id: "t2", date: "2026-05-28", description: "Contactpagina aangepast", minutes: 10, billable: false },
  { id: "t3", date: "2026-05-10", description: "Foto's sectie toegevoegd", minutes: 20, billable: false },
  { id: "t4", date: "2026-04-22", description: "Extra pagina gemaakt", minutes: 45, billable: true },
];

// ── Mock invoices ──
export const mockInvoices = [
  { id: "INV-2026-006", date: "1 juni 2026", amount: 59.97, status: "betaald", pdf: "#" },
  { id: "INV-2026-005", date: "1 mei 2026", amount: 59.97, status: "betaald", pdf: "#" },
  { id: "INV-2026-004", date: "1 april 2026", amount: 59.97, status: "betaald", pdf: "#" },
  { id: "INV-2026-003", date: "1 maart 2026", amount: 59.97, status: "betaald", pdf: "#" },
  { id: "INV-2026-002", date: "1 februari 2026", amount: 39.98, status: "betaald", pdf: "#" },
  { id: "INV-2026-001", date: "1 januari 2026", amount: 39.98, status: "betaald", pdf: "#" },
];

// ── Mock requests ──
export const mockRequests = [
  {
    id: "r001",
    title: "Nieuwe foto's toevoegen",
    description: "Kan je de 5 nieuwe foto's toevoegen aan de galerij op de homepage?",
    type: "Inhoud aanpassen",
    priority: "Normaal",
    status: "done" as RequestStatus,
    date: "28 mei 2026",
    minutes: 20,
  },
  {
    id: "r002",
    title: "Openingsuren aanpassen",
    description: "Zomeruren instellen van 1 juli tot 31 augustus.",
    type: "Inhoud aanpassen",
    priority: "Normaal",
    status: "in-progress" as RequestStatus,
    date: "2 juni 2026",
    minutes: 10,
  },
];

// ── Mock uploads ──
export const mockUploads = [
  { id: "u1", name: "haar-logo-2024.svg", type: "Logo", size: "24 KB", date: "15 jan 2024" },
  { id: "u2", name: "salon-fotos-jan.zip", type: "Foto's", size: "12.4 MB", date: "20 jan 2024" },
  { id: "u3", name: "teksten-website.docx", type: "Document", size: "48 KB", date: "22 jan 2024" },
  { id: "u4", name: "nieuwe-fotos-mei.zip", type: "Foto's", size: "8.1 MB", date: "28 mei 2026" },
];

// ── Mock admin: all clients ──
export const mockClients = [
  {
    id: "c001",
    businessName: "Kapsalon HAAR",
    contactPerson: "Shana Verberck",
    email: "shana@haar.be",
    phone: "+32 476 12 34 56",
    activeAddons: ["google-boost", "appointment"] as AddonKey[],
    websiteUrl: "haar.be",
    domain: "haar.be",
    websiteStatus: "online" as WebsiteStatus,
    mrr: 59.97,
    since: "15 jan 2024",
    lastActivity: "2 jun 2026",
    minutesUsed: 15,
  },
  {
    id: "c002",
    businessName: "Loodgieter Verheyen",
    contactPerson: "Tom Verheyen",
    email: "tom@loodgieter-verheyen.be",
    phone: "+32 495 55 66 77",
    activeAddons: ["google-boost"] as AddonKey[],
    websiteUrl: "loodgieter-verheyen.be",
    domain: "loodgieter-verheyen.be",
    websiteStatus: "online" as WebsiteStatus,
    mrr: 39.98,
    since: "3 mrt 2024",
    lastActivity: "28 mei 2026",
    minutesUsed: 30,
  },
  {
    id: "c003",
    businessName: "Bakkerij De Korenaar",
    contactPerson: "Lies Maes",
    email: "info@korenaar.be",
    phone: "+32 489 33 44 55",
    activeAddons: ["google-boost", "webshop"] as AddonKey[],
    websiteUrl: "korenaar.be",
    domain: "korenaar.be",
    websiteStatus: "in-design" as WebsiteStatus,
    mrr: 59.97,
    since: "12 mei 2026",
    lastActivity: "1 jun 2026",
    minutesUsed: 0,
  },
  {
    id: "c004",
    businessName: "Fysiotherapie Claes",
    contactPerson: "Peter Claes",
    email: "peter@fysioclaes.be",
    phone: "+32 473 88 99 00",
    activeAddons: ["appointment"] as AddonKey[],
    websiteUrl: "fysioclaes.be",
    domain: "fysioclaes.be",
    websiteStatus: "online" as WebsiteStatus,
    mrr: 49.98,
    since: "8 sep 2024",
    lastActivity: "30 mei 2026",
    minutesUsed: 20,
  },
];

// ── Mock admin: all requests ──
export const mockAdminRequests = [
  { id: "r001", client: "Kapsalon HAAR", date: "2 jun 2026", title: "Openingsuren aanpassen", status: "in-progress" as RequestStatus, priority: "Normaal" },
  { id: "r002", client: "Loodgieter Verheyen", date: "1 jun 2026", title: "Nieuwe diensten toevoegen", status: "new" as RequestStatus, priority: "Hoog" },
  { id: "r003", client: "Fysiotherapie Claes", date: "30 mei 2026", title: "Logo updaten", status: "waiting" as RequestStatus, priority: "Laag" },
  { id: "r004", client: "Kapsalon HAAR", date: "28 mei 2026", title: "Foto's toevoegen", status: "done" as RequestStatus, priority: "Normaal" },
  { id: "r005", client: "Bakkerij De Korenaar", date: "25 mei 2026", title: "Productcatalogus opzetten", status: "in-progress" as RequestStatus, priority: "Hoog" },
];

// ── Mock admin: all files ──
export const mockAdminFiles = [
  { id: "f1", client: "Kapsalon HAAR", date: "28 mei 2026", name: "nieuwe-fotos-mei.zip", type: "Foto's", size: "8.1 MB" },
  { id: "f2", client: "Loodgieter Verheyen", date: "25 mei 2026", name: "logo-nieuw.png", type: "Logo", size: "156 KB" },
  { id: "f3", client: "Fysiotherapie Claes", date: "20 mei 2026", name: "teksten-update.docx", type: "Document", size: "52 KB" },
  { id: "f4", client: "Bakkerij De Korenaar", date: "15 mei 2026", name: "productfotos.zip", type: "Foto's", size: "34.2 MB" },
];
