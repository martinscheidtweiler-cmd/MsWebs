-- ═══════════════════════════════════════════════════════════════
-- HIPPIQUE.IMMO — MIGRATIE: EPC, kadaster, technische info, status,
-- foto's en documenten per pand
-- Voer dit uit in de Supabase SQL editor (dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE hippique_properties
  ADD COLUMN IF NOT EXISTS status            TEXT DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS epc_score         INTEGER,
  ADD COLUMN IF NOT EXISTS epc_label         TEXT,
  ADD COLUMN IF NOT EXISTS cadastral_ref     TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS cadastral_surface NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS heating_type      TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS water_connection  TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS electrical_power  TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS images            TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS documents         JSONB DEFAULT '[]'::jsonb;

-- Optioneel: status beperken tot geldige waarden
ALTER TABLE hippique_properties
  DROP CONSTRAINT IF EXISTS hippique_properties_status_check;
ALTER TABLE hippique_properties
  ADD CONSTRAINT hippique_properties_status_check
  CHECK (status IN ('active', 'sold', 'reserved', 'option'));
