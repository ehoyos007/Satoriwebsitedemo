-- Supabase Schema for Satori Internal Tools
-- Run this in the Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- ============================================
-- PROJECT TRACKER TABLES
-- ============================================

-- Stores task completion status for the project tracker
CREATE TABLE IF NOT EXISTS project_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'admin',
  task_key TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, task_key)
);

-- Enable Row Level Security
ALTER TABLE project_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for now (single user)
-- Update this when adding authentication
CREATE POLICY "Allow all for project_progress" ON project_progress
  FOR ALL USING (true) WITH CHECK (true);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_project_progress_user_task
  ON project_progress(user_id, task_key);

-- ============================================
-- SERVICES GUIDE TABLES
-- ============================================

-- Stores notes for each service
CREATE TABLE IF NOT EXISTS service_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'admin',
  service_id TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, service_id)
);

-- Enable Row Level Security
ALTER TABLE service_notes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for now (single user)
CREATE POLICY "Allow all for service_notes" ON service_notes
  FOR ALL USING (true) WITH CHECK (true);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_service_notes_user_service
  ON service_notes(user_id, service_id);

-- Stores favorite services
CREATE TABLE IF NOT EXISTS service_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'admin',
  service_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, service_id)
);

-- Enable Row Level Security
ALTER TABLE service_favorites ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for now (single user)
CREATE POLICY "Allow all for service_favorites" ON service_favorites
  FOR ALL USING (true) WITH CHECK (true);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_service_favorites_user
  ON service_favorites(user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for project_progress
DROP TRIGGER IF EXISTS project_progress_updated_at ON project_progress;
CREATE TRIGGER project_progress_updated_at
  BEFORE UPDATE ON project_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Trigger for service_notes
DROP TRIGGER IF EXISTS service_notes_updated_at ON service_notes;
CREATE TRIGGER service_notes_updated_at
  BEFORE UPDATE ON service_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
