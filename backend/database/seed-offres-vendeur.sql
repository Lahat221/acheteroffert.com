-- Script SQL pour créer des offres d'exemple avec votre compte vendeur existant
-- 
-- INSTRUCTIONS :
-- 1. Remplacez 'VOTRE_EMAIL_VENDEUR' ci-dessous par l'email de votre compte vendeur
-- 2. Ou laissez tel quel et le script utilisera le premier vendeur trouvé dans la base
--
-- Ce script crée 21 offres pour toutes les catégories en utilisant VOTRE compte vendeur

-- Option 1 : Utiliser un email spécifique (recommandé)
-- Remplacez 'VOTRE_EMAIL_VENDEUR' par votre email de vendeur
-- DO $$
-- DECLARE
--   mon_vendor_id UUID;
-- BEGIN
--   SELECT id INTO mon_vendor_id FROM vendors WHERE email = 'VOTRE_EMAIL_VENDEUR';
--   
--   IF mon_vendor_id IS NULL THEN
--     RAISE EXCEPTION 'Vendeur avec email VOTRE_EMAIL_VENDEUR non trouvé';
--   END IF;
--   
--   -- Les offres seront créées avec mon_vendor_id
-- END $$;

-- Option 2 : Utiliser le premier vendeur trouvé (plus simple)
DO $$
DECLARE
  mon_vendor_id UUID;
  mon_vendor_email TEXT;
  mon_vendor_city TEXT;
BEGIN
  -- Récupère le premier vendeur actif
  SELECT id, email, city INTO mon_vendor_id, mon_vendor_email, mon_vendor_city 
  FROM vendors 
  WHERE is_active = true 
  ORDER BY created_at 
  LIMIT 1;
  
  IF mon_vendor_id IS NULL THEN
    RAISE EXCEPTION 'Aucun vendeur actif trouvé dans la base de données';
  END IF;
  
  RAISE NOTICE 'Utilisation du vendeur: % (ID: %)', mon_vendor_email, mon_vendor_id;
  RAISE NOTICE 'Ville du vendeur: %', mon_vendor_city;

  -- ============================================
  -- RESTAURATION
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      '1 tacos acheté = 1 tacos offert',
      'Offre anti-gaspillage valable du lundi au jeudi après 23h. Parfait pour vider le stock du jour !',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      8.50,
      17.00,
      true,
      'restauration',
      '[1,2,3,4]'::jsonb,
      23,
      NULL,
      true,
      30,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Pizza Express - 1 pizza achetée = 1 offerte',
      'Profitez de nos pizzas en fin de journée. 1 achetée = 1 offerte après 22h',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      12.00,
      24.00,
      true,
      'restauration',
      '[1,2,3,4]'::jsonb,
      22,
      NULL,
      true,
      20,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Burger House - Menu anti-gaspillage',
      'Menu spécial fin de journée. 1 burger acheté = 1 burger offert après 23h',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      10.00,
      20.00,
      true,
      'restauration',
      '[1,2,3,4]'::jsonb,
      23,
      NULL,
      false,
      25,
      NOW(),
      NOW()
    );

  -- ============================================
  -- HÔTEL
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      '2 nuits achetées = 1 nuit offerte',
      'Offre valable le lundi et mardi. Parfait pour un séjour en semaine !',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      80.00,
      120.00,
      true,
      'hotel',
      '[1,2]'::jsonb,
      14,
      18,
      true,
      15,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Hôtel Plaza - Offre spéciale début de semaine',
      'Réservez 2 nuits et obtenez 1 nuit gratuite. Valable lundi et mardi',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      75.00,
      110.00,
      true,
      'hotel',
      '[1,2]'::jsonb,
      12,
      17,
      false,
      10,
      NOW(),
      NOW()
    );

  -- ============================================
  -- BOULANGERIE
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Gâteaux et viennoiseries à -50%',
      'Tous les jours après 18h, profitez de nos gâteaux et viennoiseries du jour à moitié prix',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      2.50,
      5.00,
      true,
      'boulangerie',
      '[1,2,3,4,5,6,0]'::jsonb,
      18,
      20,
      true,
      50,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Baguettes du jour à 1€',
      'Les baguettes du jour non vendues sont proposées à 1€ après 19h',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      1.00,
      1.20,
      true,
      'boulangerie',
      '[1,2,3,4,5,6,0]'::jsonb,
      19,
      20,
      true,
      40,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Sandwichs et quiches du jour - 1 acheté = 1 offert',
      'Sandwichs et quiches du jour : 1 acheté = 1 offert en fin de journée après 18h',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      4.50,
      9.00,
      true,
      'boulangerie',
      '[1,2,3,4,5]'::jsonb,
      18,
      NULL,
      false,
      30,
      NOW(),
      NOW()
    );

  -- ============================================
  -- SPA & BIEN-ÊTRE
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Soin complet à prix réduit',
      'Soin complet du visage et du corps à prix réduit en fin de journée',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      45.00,
      75.00,
      true,
      'spa',
      '[1,2,3,4,5]'::jsonb,
      18,
      NULL,
      false,
      12,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Massage relaxant - 1h achetée = 30min offerte',
      'Massage relaxant : 1h achetée = 30min offerte. Valable du lundi au vendredi',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      50.00,
      75.00,
      true,
      'spa',
      '[1,2,3,4,5]'::jsonb,
      17,
      NULL,
      true,
      8,
      NOW(),
      NOW()
    );

  -- ============================================
  -- LINGERIE
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Séance d''essayage - 1h achetée = 30min offerte',
      '1h de conseil achetée = 30min offerte. Parfait pour les heures creuses du mardi !',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      30.00,
      45.00,
      true,
      'lingerie',
      '[2]'::jsonb,
      15,
      17,
      true,
      10,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Consultation personnalisée - Mardi et jeudi',
      '1h de consultation = 30min offerte. Mardi et jeudi après-midi',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      35.00,
      50.00,
      true,
      'lingerie',
      '[2,4]'::jsonb,
      14,
      17,
      false,
      8,
      NOW(),
      NOW()
    );

  -- ============================================
  -- BEAUTÉ
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Soin visage - 1h achetée = 30min offerte',
      '1h de soin achetée = 30min offerte. Mardi entre 15h et 17h',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      40.00,
      60.00,
      true,
      'beaute',
      '[2]'::jsonb,
      15,
      17,
      true,
      12,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Coupe + Brushing - Mercredi après-midi',
      '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      35.00,
      50.00,
      true,
      'beaute',
      '[3]'::jsonb,
      14,
      17,
      false,
      10,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Soin complet - Jeudi après-midi',
      '1h30 de soin = 30min offerte. Jeudi après-midi',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      55.00,
      80.00,
      true,
      'beaute',
      '[4]'::jsonb,
      15,
      17,
      true,
      8,
      NOW(),
      NOW()
    );

  -- ============================================
  -- COACH SPORTIF
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Séance personnalisée - Mardi',
      '1h de coaching achetée = 30min offerte. Mardi entre 15h et 17h',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      45.00,
      60.00,
      true,
      'coach',
      '[2]'::jsonb,
      15,
      17,
      true,
      10,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Entraînement individuel - Mercredi',
      '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      50.00,
      70.00,
      true,
      'coach',
      '[3]'::jsonb,
      14,
      17,
      false,
      8,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Programme personnalisé - Mardi et jeudi',
      '1h achetée = 30min offerte. Mardi et jeudi après-midi',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      48.00,
      65.00,
      true,
      'coach',
      '[2,4]'::jsonb,
      14,
      17,
      true,
      15,
      NOW(),
      NOW()
    );

  -- ============================================
  -- LOISIR
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Cinéma - 2 places achetées = 1 offerte',
      '2 places achetées = 1 place offerte pour les séances de fin de soirée',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      10.00,
      15.00,
      true,
      'loisir',
      '[1,2,3,4]'::jsonb,
      21,
      NULL,
      false,
      50,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Bowling - Partie du soir',
      'Partie de bowling à prix réduit pour les créneaux moins fréquentés',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      8.00,
      12.00,
      true,
      'loisir',
      '[1,2,3]'::jsonb,
      20,
      NULL,
      false,
      30,
      NOW(),
      NOW()
    );

  -- ============================================
  -- AUTRE
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      mon_vendor_id,
      'Service divers - Consultation',
      'Consultation personnalisée pour services variés',
      'https://via.placeholder.com/800x400?text=Service',
      COALESCE(mon_vendor_city, 'Saint-Denis'),
      25.00,
      35.00,
      true,
      'autre',
      '[1,2,3,4,5]'::jsonb,
      14,
      17,
      false,
      20,
      NOW(),
      NOW()
    );

  RAISE NOTICE '✅ 21 offres créées avec succès pour le vendeur: %', mon_vendor_email;

END $$;

-- Afficher un résumé
SELECT 
  'Offres créées' as type,
  COUNT(*)::text as nombre
FROM offers
UNION ALL
SELECT 
  'Offres par catégorie: ' || category as type,
  COUNT(*)::text as nombre
FROM offers
GROUP BY category
ORDER BY type;

