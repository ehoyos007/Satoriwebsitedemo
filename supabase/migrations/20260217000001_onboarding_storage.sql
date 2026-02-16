-- ============================================
-- ONBOARDING ASSETS STORAGE BUCKET
-- Migration: 20260217000001_onboarding_storage
-- ============================================

-- Create the storage bucket for onboarding file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'onboarding-assets',
  'onboarding-assets',
  false,
  52428800, -- 50MB limit
  ARRAY[
    'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp',
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip', 'text/plain'
  ]
);

-- RLS: Authenticated users can upload to their own folder ({user_id}/...)
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'onboarding-assets'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS: Authenticated users can read their own files
CREATE POLICY "Users can read own files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'onboarding-assets'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS: Admins can read all files in onboarding-assets bucket
CREATE POLICY "Admins can read all onboarding files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'onboarding-assets'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
