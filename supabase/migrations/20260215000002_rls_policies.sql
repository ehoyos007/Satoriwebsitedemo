-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================
-- Two roles: admin (full access) and client (own data only)
-- Admin check: profiles.role = 'admin' WHERE profiles.id = auth.uid()

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function to get current user's client_id
CREATE OR REPLACE FUNCTION get_client_id()
RETURNS UUID AS $$
  SELECT id FROM clients
  WHERE user_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================
-- PROFILES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid() OR is_admin());

-- Users can update their own profile (but not role)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Admin can manage all profiles
CREATE POLICY "Admin full access to profiles"
  ON profiles FOR ALL
  USING (is_admin());

-- ============================================
-- SERVICES (public read, admin write)
-- ============================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Anyone can read active services (including unauthenticated for marketing pages)
CREATE POLICY "Public read active services"
  ON services FOR SELECT
  USING (is_active = true);

-- Admin can manage all services
CREATE POLICY "Admin full access to services"
  ON services FOR ALL
  USING (is_admin());

-- ============================================
-- CLIENTS
-- ============================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Clients can read their own record
CREATE POLICY "Clients can read own record"
  ON clients FOR SELECT
  USING (user_id = auth.uid() OR is_admin());

-- Clients can update their own record
CREATE POLICY "Clients can update own record"
  ON clients FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin can manage all clients
CREATE POLICY "Admin full access to clients"
  ON clients FOR ALL
  USING (is_admin());

-- System can insert (for auto-creation on purchase)
CREATE POLICY "Service role can insert clients"
  ON clients FOR INSERT
  WITH CHECK (true);

-- ============================================
-- ORDERS
-- ============================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Clients can read their own orders
CREATE POLICY "Clients can read own orders"
  ON orders FOR SELECT
  USING (client_id = get_client_id() OR is_admin());

-- Admin can manage all orders
CREATE POLICY "Admin full access to orders"
  ON orders FOR ALL
  USING (is_admin());

-- Service role can insert/update orders (webhooks)
CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Clients can read their own subscriptions
CREATE POLICY "Clients can read own subscriptions"
  ON subscriptions FOR SELECT
  USING (client_id = get_client_id() OR is_admin());

-- Admin can manage all subscriptions
CREATE POLICY "Admin full access to subscriptions"
  ON subscriptions FOR ALL
  USING (is_admin());

-- ============================================
-- PROJECTS
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Clients can read their own projects
CREATE POLICY "Clients can read own projects"
  ON projects FOR SELECT
  USING (client_id = get_client_id() OR is_admin());

-- Admin can manage all projects
CREATE POLICY "Admin full access to projects"
  ON projects FOR ALL
  USING (is_admin());

-- ============================================
-- PROJECT MILESTONES
-- ============================================
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;

-- Clients can read milestones for their projects
CREATE POLICY "Clients can read own milestones"
  ON project_milestones FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM projects WHERE client_id = get_client_id()
    )
    OR is_admin()
  );

-- Admin can manage all milestones
CREATE POLICY "Admin full access to milestones"
  ON project_milestones FOR ALL
  USING (is_admin());

-- ============================================
-- ACTIVITY LOG
-- ============================================
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Clients can read their own activity
CREATE POLICY "Clients can read own activity"
  ON activity_log FOR SELECT
  USING (client_id = get_client_id() OR is_admin());

-- Admin can manage all activity
CREATE POLICY "Admin full access to activity_log"
  ON activity_log FOR ALL
  USING (is_admin());

-- ============================================
-- AVAILABILITY SLOTS (public read for booking page)
-- ============================================
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;

-- Anyone can read available slots (for booking page)
CREATE POLICY "Public read available slots"
  ON availability_slots FOR SELECT
  USING (is_booked = false AND start_time > now());

-- Admin can manage all slots
CREATE POLICY "Admin full access to availability_slots"
  ON availability_slots FOR ALL
  USING (is_admin());

-- ============================================
-- BOOKINGS
-- ============================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Clients can read their own bookings
CREATE POLICY "Clients can read own bookings"
  ON bookings FOR SELECT
  USING (client_id = get_client_id() OR is_admin());

-- Anyone can create a booking (pre-signup visitors)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Admin can manage all bookings
CREATE POLICY "Admin full access to bookings"
  ON bookings FOR ALL
  USING (is_admin());

-- ============================================
-- CASE STUDIES (public read published, admin write)
-- ============================================
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Anyone can read published case studies
CREATE POLICY "Public read published case studies"
  ON case_studies FOR SELECT
  USING (is_published = true);

-- Admin can manage all case studies
CREATE POLICY "Admin full access to case_studies"
  ON case_studies FOR ALL
  USING (is_admin());

-- ============================================
-- ANALYTICS SNAPSHOTS
-- ============================================
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;

-- Clients can read their own analytics
CREATE POLICY "Clients can read own analytics"
  ON analytics_snapshots FOR SELECT
  USING (client_id = get_client_id() OR is_admin());

-- Admin can manage all analytics
CREATE POLICY "Admin full access to analytics_snapshots"
  ON analytics_snapshots FOR ALL
  USING (is_admin());
