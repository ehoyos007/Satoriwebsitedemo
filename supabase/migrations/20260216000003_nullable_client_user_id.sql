-- ============================================
-- Allow clients to exist without a user profile
-- Supports the "buy first, create account later" flow
-- ============================================

-- Drop the existing unique constraint on user_id (it prevents NULLs from matching)
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_user_id_key;

-- Make user_id nullable
ALTER TABLE clients ALTER COLUMN user_id DROP NOT NULL;

-- Re-add unique constraint but only for non-null values (partial unique index)
CREATE UNIQUE INDEX clients_user_id_unique ON clients (user_id) WHERE user_id IS NOT NULL;

-- Add an index on business_email to find pending clients by email
CREATE INDEX idx_clients_business_email ON clients (business_email) WHERE business_email IS NOT NULL;
