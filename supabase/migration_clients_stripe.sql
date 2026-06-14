-- ============================================================
-- MS Webdesign — Migratie: klant aanmaken + Stripe koppeling
-- Voer dit eenmalig uit in de Supabase SQL Editor
-- (veilig om opnieuw te draaien — gebruikt IF NOT EXISTS / OR REPLACE)
-- ============================================================

-- Nieuwe kolommen op profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Bestaande profielen: e-mailadres overnemen vanuit auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- handle_new_user bijwerken zodat nieuwe profielen ook hun e-mailadres krijgen
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, contact_person)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'contact_person', ''))
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN new;
END;
$$;
