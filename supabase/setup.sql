-- ═══════════════════════════════════════════════════════════════
-- HIPPIQUE.IMMO — SUPABASE SETUP
-- Voer dit uit in de Supabase SQL editor (dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════════

-- ── 1. PROPERTIES ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS hippique_properties (
  id                TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  subtitle          TEXT DEFAULT '',
  type              TEXT DEFAULT 'Stoeterij',
  location          TEXT DEFAULT '',
  municipality      TEXT DEFAULT '',
  province          TEXT DEFAULT '',
  country           TEXT DEFAULT 'België',
  price             BIGINT,
  price_on_request  BOOLEAN DEFAULT false,
  ground_surface    INTEGER DEFAULT 0,
  living_surface    INTEGER DEFAULT 0,
  stalls            INTEGER DEFAULT 0,
  indoor_arena      BOOLEAN DEFAULT false,
  outdoor_arena     BOOLEAN DEFAULT false,
  paddocks          INTEGER DEFAULT 0,
  pastures          NUMERIC(8,2) DEFAULT 0,
  boxes             INTEGER DEFAULT 0,
  residence         BOOLEAN DEFAULT false,
  permits           TEXT[] DEFAULT '{}',
  description       TEXT DEFAULT '',
  features          TEXT[] DEFAULT '{}',
  tag               TEXT DEFAULT '',
  featured          BOOLEAN DEFAULT false,
  year              INTEGER DEFAULT 2024,
  gradient          TEXT DEFAULT 'linear-gradient(135deg, #1a160f 0%, #2d2115 50%, #1e1a10 100%)',
  sort_order        INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. BLOG ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS hippique_blog (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  excerpt     TEXT DEFAULT '',
  content     TEXT DEFAULT '',
  category    TEXT DEFAULT 'Markt',
  date        TEXT DEFAULT '',
  read_time   INTEGER DEFAULT 5,
  gradient    TEXT DEFAULT 'linear-gradient(135deg, #1a160a 0%, #2a2010 100%)',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. PARTNERS ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS hippique_partners (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  file        TEXT DEFAULT '',
  dark        BOOLEAN DEFAULT false,
  sort_order  INTEGER DEFAULT 0
);

-- ── 4. SITE CONTENT (één rij) ──────────────────────────────────

CREATE TABLE IF NOT EXISTS hippique_content (
  id    INTEGER PRIMARY KEY DEFAULT 1,
  data  JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ── 5. RLS (Row Level Security) ────────────────────────────────
-- Alles public leesbaar, schrijven vereist service role key.

ALTER TABLE hippique_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE hippique_blog       ENABLE ROW LEVEL SECURITY;
ALTER TABLE hippique_partners   ENABLE ROW LEVEL SECURITY;
ALTER TABLE hippique_content    ENABLE ROW LEVEL SECURITY;

-- Iedereen mag lezen
CREATE POLICY "public_read_properties" ON hippique_properties FOR SELECT USING (true);
CREATE POLICY "public_read_blog"       ON hippique_blog       FOR SELECT USING (true);
CREATE POLICY "public_read_partners"   ON hippique_partners   FOR SELECT USING (true);
CREATE POLICY "public_read_content"    ON hippique_content    FOR SELECT USING (true);

-- ── 6. SEED DATA — PROPERTIES ──────────────────────────────────

INSERT INTO hippique_properties (id, title, subtitle, type, location, municipality, province, country, price, price_on_request, ground_surface, living_surface, stalls, indoor_arena, outdoor_arena, paddocks, pastures, boxes, residence, permits, description, features, tag, featured, year, gradient, sort_order) VALUES
('stoeterij-molenhoek', 'Stoeterij Molenhoek', 'Exclusieve stoeterij met internationale uitstraling', 'Stoeterij', 'Molenhoek, Maasgouw', 'Maasgouw', 'Limburg', 'Nederland', 3850000, false, 180000, 680, 42, true, true, 8, 14.2, 42, true,
  ARRAY['Agrarische bestemming','Woonvergunning','Milieuvergunning klasse 2'],
  'Unieke stoeterij op 18 hectare met uitzonderlijke infrastructuur. De eigendom omvat een hoofdwoning van 680 m², een professionele overdekte rijhal van 60×20m, een buitenpiste van 80×40m met drainage en verlichting, 42 stallen in twee staldelen, een longeercirkel en een knechtenwoning.',
  ARRAY['Longeercirkel 20m','Knechtenwoning 120m²','Washbox × 4','Hooiberg 800m²','Onderhoudsloods','Drainagepiste met verlichting','Videobewaking'],
  'Nieuw', true, 2024, 'linear-gradient(135deg, #1a160f 0%, #2d2115 50%, #1e1a10 100%)', 1),

('manege-le-chateau', 'Manège Le Château', 'Gerenommeerde manège in hartje Haspengouw', 'Manège', 'Tongeren, Haspengouw', 'Tongeren', 'Limburg', 'België', null, true, 92000, 420, 28, true, true, 5, 7.8, 28, true,
  ARRAY['Agrarische zone','Vergund paardenbedrijf','Milieuvergunning'],
  'Volledig vergunde manège in het fraaie Haspengouws landschap. De accommodatie biedt een overdekte rijhal, buitenpiste, 28 stallen en een comfortabele woning. Uitstekende bereikbaarheid via E313 en gevestigde cliëntèle.',
  ARRAY['Rijhal 50×20m','Buitenpiste 60×30m','Tribune 80 plaatsen','Club & sanitair','Stalmeester appartement'],
  'Exclusief', true, 2024, 'linear-gradient(135deg, #0f1420 0%, #1a2030 50%, #141820 100%)', 2),

('domein-van-den-berg', 'Domein Van den Berg', 'Landelijk domein met volledig hippische uitrusting', 'Landgoed', 'Sint-Lievens-Esse, Herzele', 'Herzele', 'Oost-Vlaanderen', 'België', 1950000, false, 64000, 520, 18, false, true, 4, 5.5, 18, true,
  ARRAY['Landelijk gebied','Woonvergunning','Vergund hippisch bedrijf'],
  'Prachtig landgoed op 6,4 hectare in het groene Vlaamse Ardennen. Herrenhoeve uit 1887 volledig gerenoveerd met respect voor historisch karakter.',
  ARRAY['Herrenhoeve 1887','Wijnkelder','Poolhouse','Buitenpiste 50×25m','Irrigatiesysteem'],
  'Historisch', false, 2023, 'linear-gradient(135deg, #18100a 0%, #241808 50%, #1c1206 100%)', 3),

('pensionstallen-de-klokke', 'Pensionstallen De Klokke', 'Professionele pensionstallen met uitstekende reputatie', 'Pensionstallen', 'Grobbendonk, Antwerpen', 'Grobbendonk', 'Antwerpen', 'België', 1280000, false, 38000, 280, 34, true, true, 6, 3.2, 34, true,
  ARRAY['Agrarische zone','Vergund hippisch bedrijf'],
  'Gevestigd pensionbedrijf met 34 stallen, rijhal en twee buitenpistes. Ideale ligging nabij Antwerpen met goede klantenkring.',
  ARRAY['Rijhal 45×20m','2 buitenpistes','Douches × 6','Voederopslag 400m²'],
  'Rendement', false, 2024, 'linear-gradient(135deg, #180c0a 0%, #281408 50%, #1a1008 100%)', 4),

('haras-du-bois-noble', 'Haras du Bois Noble', 'Uitzonderlijk Frans stoeterijdomein nabij Deauville', 'Stoeterij', 'Lisieux, Normandië', 'Lisieux', 'Calvados', 'Frankrijk', 6200000, false, 450000, 1200, 68, true, true, 16, 38.5, 68, true,
  ARRAY['Zone agricole','Permis de construire','Enregistrement haras'],
  'Exceptionneel Normandisch stoeterijdomein op 45 hectare. Herenhuis uit de 18e eeuw, twee professionele staldelen, overdekte rijhal, buitengalopppade en draf-piste.',
  ARRAY['Herenhuis 18e eeuw','Galoppade 1200m','Drafpiste 800m','Directieset appartementen','Veterinaire ruimte'],
  'International', true, 2024, 'linear-gradient(135deg, #0c0c18 0%, #141425 50%, #0e0e1c 100%)', 5),

('hoeve-de-waterput', 'Hoeve De Waterput', 'Authentieke Kempense hoeve met uitbreidingsmogelijkheden', 'Hoeve', 'Retie, Kempen', 'Retie', 'Antwerpen', 'België', 895000, false, 28000, 340, 12, false, false, 3, 2.4, 12, true,
  ARRAY['Agrarische zone','Woonvergunning'],
  'Karaktervolle Kempense hoeve op 2,8 hectare, volledig gerenoveerd in 2019. Stalblok voor 12 paarden met groeimogelijkheid.',
  ARRAY['Renovatie 2019','Zonnepanelen 24 kWp','Warmtepomp','Regenwaterput 20.000L'],
  'Te koop', false, 2023, 'linear-gradient(135deg, #100e08 0%, #1c1a0e 50%, #141208 100%)', 6),

('kasteel-d-arenberg', 'Kasteel d''Arenberg', 'Monumentaal kasteeldomein met hippische infrastructuur', 'Kasteeldomein', 'Edegem, Antwerpen', 'Edegem', 'Antwerpen', 'België', null, true, 220000, 1800, 24, false, true, 6, 16.0, 24, true,
  ARRAY['Beschermd erfgoed','Parkzone','Woonvergunning'],
  'Uitzonderlijk kasteeldomein van 22 hectare met 19e-eeuws kasteel, koetshuis, orangerie en historische stallingen voor 24 paarden.',
  ARRAY['Kasteel 19e eeuw','Koetshuis','Orangerie','Historische stallingen','Kerkelijk beschermd'],
  'Uniek', true, 2024, 'linear-gradient(135deg, #10080a 0%, #1e1010 50%, #160a0c 100%)', 7),

('centre-equestre-namur', 'Centre Équestre de Namur', 'Volledig operationeel equitatiebedrijf', 'Manège', 'Gembloux, Namen', 'Gembloux', 'Namen', 'België', 2100000, false, 78000, 360, 45, true, true, 9, 6.8, 45, false,
  ARRAY['Zone d''activité agricole','Autorisation environnementale'],
  'Volledig operationeel équitatiecentrum met 45 stallen, twee overdekte rijhallen, tribunes en uitgebreide buiteninfrastructuur.',
  ARRAY['2 rijhallen','Springparcours buiten','Dressuurpiste verlicht','Horeca ruimte','Parkeren 80 wagens'],
  'Bedrijf', false, 2024, 'linear-gradient(135deg, #080c10 0%, #101822 50%, #0a1018 100%)', 8)

ON CONFLICT (id) DO NOTHING;

-- ── 7. SEED DATA — BLOG ────────────────────────────────────────

INSERT INTO hippique_blog (id, title, excerpt, content, category, date, read_time, gradient, sort_order) VALUES
('ruimtelijke-ordening-hippisch',
  'Ruimtelijke ordening bij hippische eigendommen: wat u moet weten',
  'De regelgeving rond agrarisch gebied en hippisch gebruik wordt steeds complexer. Een overzicht van de belangrijkste aandachtspunten bij aankoop of verkoop.',
  '', 'Regelgeving', '12 mei 2025', 7,
  'linear-gradient(135deg, #1a160a 0%, #2a2010 100%)', 1),

('waardebepaling-stoeterij',
  'Hoe bepaalt u de correcte waarde van een stoeterij?',
  'Hippisch vastgoed kent een unieke waarderingsmethode. Voorbij de klassieke vierkante meterprijs spelen reputatie, infrastructuur en locatie een cruciale rol.',
  '', 'Expertise', '28 april 2025', 9,
  'linear-gradient(135deg, #0c1218 0%, #141e2a 100%)', 2),

('hippisch-vastgoed-2025',
  'De hippische vastgoedmarkt in 2025: trends en vooruitzichten',
  'Na recordjaren trekt de markt voor hippisch vastgoed verder aan. Internationale kopers en een beperkt aanbod drijven de vraag naar exclusieve eigendommen.',
  '', 'Markt', '3 maart 2025', 6,
  'linear-gradient(135deg, #160a0c 0%, #220e12 100%)', 3)

ON CONFLICT (id) DO NOTHING;

-- ── 8. SEED DATA — PARTNERS ────────────────────────────────────

INSERT INTO hippique_partners (id, name, file, dark, sort_order) VALUES
('de-brabander', 'De Brabander · Stal De Muze', 'partners/de-brabander.png', false, 1),
('roose',        'Strohandel Roose',             'partners/roose.png',        true,  2),
('krismar',      'Krismar Horse Trucks',         'partners/krismar.png',      false, 3),
('dm-equine',    'DM Equine',                    'partners/dm-equine.png',    true,  4),
('bosdreef',     'Bosdreef Veterinary',          'partners/bosdreef.png',     false, 5),
('feral-group',  'Feral Group',                  'partners/feral-group.png',  false, 6)
ON CONFLICT (id) DO NOTHING;

-- ── 9. SEED DATA — CONTENT ─────────────────────────────────────

INSERT INTO hippique_content (id, data) VALUES (1, '{
  "hero": {
    "tagline": "Specialist in hippisch vastgoed",
    "title": "Het vaakst geraden.",
    "titleAccent": "Nooit overtroffen.",
    "subtitle": "Stoeterijen · Maneges · Landgoederen · Hippische eigendommen in België, Nederland en Noord-Frankrijk",
    "cta1Label": "Ontdek ons aanbod",
    "cta2Label": "Gratis schatting"
  },
  "stats": [
    { "value": "14",   "label": "Jaar expertise" },
    { "value": "200+", "label": "Panden verkocht" },
    { "value": "3",    "label": "Landen actief" },
    { "value": "98%",  "label": "Klanttevredenheid" }
  ],
  "contact": {
    "phone": "+32 494 00 00 00",
    "email": "info@hippique.immo",
    "address": "Brusselsesteenweg 100, 3090 Overijse",
    "kvk": "BE 0123.456.789"
  },
  "footer": {
    "tagline": "Het meest gespecialiseerde kantoor voor hippisch vastgoed in de Benelux en Noord-Frankrijk.",
    "instagramUrl": "#",
    "linkedinUrl": "#",
    "youtubeUrl": "#"
  },
  "aboutPage": {
    "title": "Over Hippique.immo",
    "intro": "Wij zijn het meest gespecialiseerde vastgoedkantoor voor hippisch vastgoed in de Benelux en Noord-Frankrijk.",
    "story": "Hippique.immo werd opgericht vanuit een echte passie voor paarden en vastgoed."
  },
  "verkopenPage": {
    "heroTitle": "Verkoop uw hippisch vastgoed",
    "heroSubtitle": "Met onze gespecialiseerde kennis en internationaal netwerk bereiken we de juiste koper.",
    "step1Title": "Gratis schatting",    "step1Text": "Wij komen ter plaatse en maken een gedetailleerde waardebepaling.",
    "step2Title": "Professionele presentatie", "step2Text": "Professionele fotografie, drone-opnames en publicatie op onze exclusieve kanalen.",
    "step3Title": "Gericht netwerk",    "step3Text": "Wij bereiken actief geïnteresseerden via ons internationaal netwerk.",
    "step4Title": "Begeleiding tot akte", "step4Text": "Van kandidaat-koper tot notariële akte — wij begeleiden u door het volledige verkoopproces."
  },
  "contactPage": {
    "title": "Neem contact op",
    "subtitle": "Heeft u een vraag over ons aanbod of wenst u een gratis schatting?",
    "formTitle": "Stuur ons een bericht"
  }
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

-- ── 10. STORAGE BUCKET ─────────────────────────────────────────
-- Maak dit aan via het Supabase dashboard → Storage → New bucket
-- Naam: hippique   |   Public: JA
--
-- Of via SQL (alleen als de storage extensie actief is):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('hippique', 'hippique', true)
-- ON CONFLICT (id) DO NOTHING;
