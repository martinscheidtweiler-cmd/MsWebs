-- ============================================================
-- MS Webdesign — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- PROFILES (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email               TEXT,
  business_name       TEXT        NOT NULL DEFAULT '',
  contact_person      TEXT        NOT NULL DEFAULT '',
  phone               TEXT,
  website_url         TEXT,
  domain              TEXT,
  subscription        TEXT        NOT NULL DEFAULT 'essential',
  subscription_price  NUMERIC(10,2) NOT NULL DEFAULT 29.99,
  active_addons       TEXT[]      NOT NULL DEFAULT '{}',
  website_status      TEXT        NOT NULL DEFAULT 'intake',
  project_step        TEXT        NOT NULL DEFAULT 'intake',
  minutes_included    INTEGER     NOT NULL DEFAULT 30,
  since               DATE        NOT NULL DEFAULT CURRENT_DATE,
  last_update         DATE        NOT NULL DEFAULT CURRENT_DATE,
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TIME LOGS
CREATE TABLE IF NOT EXISTS public.time_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date        DATE        NOT NULL,
  description TEXT        NOT NULL,
  minutes     INTEGER     NOT NULL CHECK (minutes > 0),
  billable    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- REQUESTS
CREATE TABLE IF NOT EXISTS public.requests (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  description TEXT,
  type        TEXT,
  priority    TEXT        NOT NULL DEFAULT 'Normaal',
  status      TEXT        NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INVOICES
CREATE TABLE IF NOT EXISTS public.invoices (
  id          TEXT        PRIMARY KEY,
  client_id   UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date        DATE        NOT NULL,
  amount      NUMERIC(10,2) NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'open',
  pdf_url     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- UPLOADS / FILES
CREATE TABLE IF NOT EXISTS public.uploads (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL,
  type          TEXT,
  size          TEXT,
  storage_path  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Row Level Security ──────────────────────────────────
ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploads   ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "own_profile_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own_profile_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- time_logs
CREATE POLICY "own_timelogs_select" ON public.time_logs FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "own_timelogs_insert" ON public.time_logs FOR INSERT WITH CHECK (auth.uid() = client_id);

-- requests
CREATE POLICY "own_requests_select" ON public.requests FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "own_requests_insert" ON public.requests FOR INSERT WITH CHECK (auth.uid() = client_id);

-- invoices
CREATE POLICY "own_invoices_select" ON public.invoices FOR SELECT USING (auth.uid() = client_id);

-- uploads
CREATE POLICY "own_uploads_select" ON public.uploads FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "own_uploads_insert" ON public.uploads FOR INSERT WITH CHECK (auth.uid() = client_id);

-- ── Auto-create profile on sign-up ─────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, contact_person)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'contact_person', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
