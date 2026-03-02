-- Fix overly permissive orders RLS policy
-- The "Service role can manage orders" policy used USING(true) WITH CHECK(true)
-- which allowed ANY authenticated user to insert/update/delete any order.
-- Service role key already bypasses RLS, so this policy is unnecessary and dangerous.

DROP POLICY IF EXISTS "Service role can manage orders" ON orders;

-- Clients should only be able to read their own orders (existing policy handles this).
-- Only admin and service role (which bypasses RLS) can insert/update/delete orders.
