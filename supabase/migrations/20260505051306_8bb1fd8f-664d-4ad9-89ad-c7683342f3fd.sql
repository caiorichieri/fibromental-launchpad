
CREATE POLICY "Admins and editors can read blog covers"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'blog-covers'
  AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
);

CREATE POLICY "Admins and editors can upload blog covers"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'blog-covers'
  AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
);

CREATE POLICY "Admins and editors can update blog covers"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'blog-covers'
  AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
)
WITH CHECK (
  bucket_id = 'blog-covers'
  AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
);

CREATE POLICY "Admins can delete blog covers"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'blog-covers'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
