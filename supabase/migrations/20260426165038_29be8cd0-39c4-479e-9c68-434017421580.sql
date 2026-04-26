DROP POLICY IF EXISTS "Blog cover images are public" ON storage.objects;
DROP POLICY IF EXISTS "Admins and editors can upload blog covers" ON storage.objects;
DROP POLICY IF EXISTS "Admins and editors can update blog covers" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete blog covers" ON storage.objects;

UPDATE storage.buckets
SET public = false
WHERE id = 'blog-covers';