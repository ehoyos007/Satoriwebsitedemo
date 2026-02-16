-- ============================================
-- Link pending client to profile on signup
-- When a new user creates an account, find any pending client
-- record (user_id IS NULL) with matching business_email
-- and set user_id to the new profile's id.
-- This completes the "buy first, create account later" flow.
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. Create profile
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    'client'
  );

  -- 2. Link any pending client record (bought before signing up)
  UPDATE public.clients
  SET user_id = NEW.id
  WHERE business_email = NEW.email
    AND user_id IS NULL;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'handle_new_user error for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
