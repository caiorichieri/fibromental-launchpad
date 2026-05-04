UPDATE blog_articles
SET cover_image_url = NULL
WHERE cover_image_url IS NOT NULL
  AND cover_image_url NOT LIKE 'http%';
