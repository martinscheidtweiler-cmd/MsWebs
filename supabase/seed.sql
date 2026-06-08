-- ============================================================
-- MS Webdesign — Demo Seed Data
-- 1. Maak demo@mswebs.be aan in Supabase Auth (wachtwoord: demo123)
-- 2. Run dit script in de Supabase SQL Editor
-- ============================================================

DO $$
DECLARE
  demo_id UUID;
BEGIN
  SELECT id INTO demo_id FROM auth.users WHERE email = 'demo@mswebs.be';
  IF demo_id IS NULL THEN
    RAISE EXCEPTION 'Maak eerst demo@mswebs.be aan via Authentication > Users in Supabase dashboard';
  END IF;

  -- Profile
  INSERT INTO public.profiles (
    id, business_name, contact_person, phone,
    website_url, domain, subscription, subscription_price,
    active_addons, website_status, project_step,
    minutes_included, since, last_update
  ) VALUES (
    demo_id, 'Demo Bedrijf', 'TestPersoon', '+32 000 00 00 00',
    'https://demo.be', 'demo.be', 'essential', 29.99,
    ARRAY['google-boost','appointment'], 'online', 'online',
    30, '2024-01-15', CURRENT_DATE
  ) ON CONFLICT (id) DO UPDATE SET
    business_name = EXCLUDED.business_name,
    contact_person = EXCLUDED.contact_person,
    active_addons = EXCLUDED.active_addons,
    website_status = EXCLUDED.website_status;

  -- Time logs
  INSERT INTO public.time_logs (client_id, date, description, minutes, billable) VALUES
    (demo_id, CURRENT_DATE - 3,  'Homepage hero bijgewerkt',     15, false),
    (demo_id, CURRENT_DATE - 8,  'Contactpagina aangepast',      10, false),
    (demo_id, CURRENT_DATE - 25, 'Foto''s sectie toegevoegd',    20, false),
    (demo_id, CURRENT_DATE - 44, 'Extra pagina gemaakt',         45, true);

  -- Requests
  INSERT INTO public.requests (client_id, title, description, type, priority, status, created_at) VALUES
    (demo_id, 'Nieuwe foto''s toevoegen',
     'Kan je de 5 nieuwe foto''s toevoegen aan de galerij op de homepage?',
     'Inhoud aanpassen', 'Normaal', 'done', NOW() - INTERVAL '8 days'),
    (demo_id, 'Openingsuren aanpassen',
     'Zomeruren instellen van 1 juli tot 31 augustus.',
     'Inhoud aanpassen', 'Normaal', 'in-progress', NOW() - INTERVAL '2 days');

  -- Invoices
  INSERT INTO public.invoices (id, client_id, date, amount, status) VALUES
    ('INV-2026-006', demo_id, CURRENT_DATE - 4,  59.97, 'betaald'),
    ('INV-2026-005', demo_id, CURRENT_DATE - 34, 59.97, 'betaald'),
    ('INV-2026-004', demo_id, CURRENT_DATE - 65, 59.97, 'betaald'),
    ('INV-2026-003', demo_id, CURRENT_DATE - 95, 59.97, 'betaald'),
    ('INV-2026-002', demo_id, CURRENT_DATE - 126,39.98, 'betaald'),
    ('INV-2026-001', demo_id, CURRENT_DATE - 157,39.98, 'betaald');

  -- Uploads
  INSERT INTO public.uploads (client_id, name, type, size, created_at) VALUES
    (demo_id, 'haar-logo-2024.svg',      'Logo',      '24 KB',   NOW() - INTERVAL '500 days'),
    (demo_id, 'salon-fotos-jan.zip',     'Foto''s',   '12.4 MB', NOW() - INTERVAL '495 days'),
    (demo_id, 'teksten-website.docx',    'Document',  '48 KB',   NOW() - INTERVAL '493 days'),
    (demo_id, 'nieuwe-fotos-mei.zip',    'Foto''s',   '8.1 MB',  NOW() - INTERVAL '8 days');

  RAISE NOTICE 'Demo data aangemaakt voor %', demo_id;
END $$;
