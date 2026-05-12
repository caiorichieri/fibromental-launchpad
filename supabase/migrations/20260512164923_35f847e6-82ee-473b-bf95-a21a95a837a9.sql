UPDATE storage.buckets SET public = true WHERE id = 'blog-covers';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read blog covers'
  ) THEN
    CREATE POLICY "Public read blog covers" ON storage.objects FOR SELECT USING (bucket_id = 'blog-covers');
  END IF;
END $$;