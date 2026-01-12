-- Script pour vérifier que les offres sont bien dans la base de données

-- 1. Compter toutes les offres
SELECT 
  'Total d''offres' as type,
  COUNT(*)::text as nombre
FROM offers;

-- 2. Compter les offres actives
SELECT 
  'Offres actives' as type,
  COUNT(*)::text as nombre
FROM offers
WHERE is_active = true;

-- 3. Voir les 5 dernières offres créées
SELECT 
  id,
  title,
  category,
  city,
  is_active,
  is_featured,
  created_at
FROM offers
ORDER BY created_at DESC
LIMIT 5;

-- 4. Voir les offres par catégorie
SELECT 
  category,
  COUNT(*) as nombre,
  COUNT(CASE WHEN is_active = true THEN 1 END) as actives
FROM offers
GROUP BY category
ORDER BY category;

-- 5. Vérifier les offres d'un vendeur spécifique (remplacez l'email)
SELECT 
  v.email as vendeur_email,
  v.company_name,
  COUNT(o.id) as nombre_offres,
  COUNT(CASE WHEN o.is_active = true THEN 1 END) as offres_actives
FROM vendors v
LEFT JOIN offers o ON o.vendor_id = v.id
WHERE v.email = 'tacos@example.com'
GROUP BY v.id, v.email, v.company_name;

