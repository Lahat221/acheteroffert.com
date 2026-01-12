-- Script de seed complet avec des offres pour toutes les catégories
-- Ce script crée des vendeurs et des offres variées pour animer le site

-- Activer l'extension UUID si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Supprimer les offres existantes (optionnel, pour repartir de zéro)
-- DELETE FROM offers;
-- DELETE FROM vendors;

-- Créer des vendeurs de test pour chaque catégorie
INSERT INTO vendors (id, email, password_hash, company_name, first_name, last_name, phone, address, city, postal_code, is_active, created_at, updated_at)
VALUES 
  -- Restauration
  (
    gen_random_uuid(),
    'tacos@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', -- mot de passe: "password"
    'Tacos King',
    'Jean',
    'Dupont',
    '0123456789',
    '15 Rue de la République',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Hôtel
  (
    gen_random_uuid(),
    'hotel@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Hôtel Central',
    'Marie',
    'Martin',
    '0123456790',
    '42 Avenue du Président Wilson',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Boulangerie
  (
    gen_random_uuid(),
    'boulangerie@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Boulangerie du Centre',
    'Pierre',
    'Durand',
    '0123456791',
    '78 Rue du Commerce',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Spa
  (
    gen_random_uuid(),
    'spa@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Spa Relaxation',
    'Sophie',
    'Bernard',
    '0123456792',
    '25 Boulevard de la Liberté',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Lingerie
  (
    gen_random_uuid(),
    'lingerie@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Boutique Lingerie Fine',
    'Claire',
    'Lemaire',
    '0123456793',
    '10 Rue de Paris',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Beauté
  (
    gen_random_uuid(),
    'beaute@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Salon Beauté Élégance',
    'Isabelle',
    'Petit',
    '0123456794',
    '33 Avenue Jean Jaurès',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Coach Sportif
  (
    gen_random_uuid(),
    'coach@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Coach Fitness Pro',
    'Marc',
    'Moreau',
    '0123456795',
    '55 Rue Gabriel Péri',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Loisir
  (
    gen_random_uuid(),
    'loisir@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Cinéma Multiplex',
    'Thomas',
    'Garcia',
    '0123456796',
    '100 Avenue de Stalingrad',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  -- Autre
  (
    gen_random_uuid(),
    'autre@acheteroffert.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Boutique Divers',
    'Nathalie',
    'Rousseau',
    '0123456797',
    '12 Place de la République',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (email) DO NOTHING;

-- Créer des offres pour toutes les catégories
DO $$
DECLARE
  vendor_tacos_id UUID;
  vendor_hotel_id UUID;
  vendor_boulangerie_id UUID;
  vendor_spa_id UUID;
  vendor_lingerie_id UUID;
  vendor_beaute_id UUID;
  vendor_coach_id UUID;
  vendor_loisir_id UUID;
  vendor_autre_id UUID;
BEGIN
  -- Récupérer les IDs des vendeurs
  SELECT id INTO vendor_tacos_id FROM vendors WHERE email = 'tacos@acheteroffert.com';
  SELECT id INTO vendor_hotel_id FROM vendors WHERE email = 'hotel@acheteroffert.com';
  SELECT id INTO vendor_boulangerie_id FROM vendors WHERE email = 'boulangerie@acheteroffert.com';
  SELECT id INTO vendor_spa_id FROM vendors WHERE email = 'spa@acheteroffert.com';
  SELECT id INTO vendor_lingerie_id FROM vendors WHERE email = 'lingerie@acheteroffert.com';
  SELECT id INTO vendor_beaute_id FROM vendors WHERE email = 'beaute@acheteroffert.com';
  SELECT id INTO vendor_coach_id FROM vendors WHERE email = 'coach@acheteroffert.com';
  SELECT id INTO vendor_loisir_id FROM vendors WHERE email = 'loisir@acheteroffert.com';
  SELECT id INTO vendor_autre_id FROM vendors WHERE email = 'autre@acheteroffert.com';

  -- ============================================
  -- RESTAURATION
  -- ============================================
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      vendor_tacos_id,
      '1 tacos acheté = 1 tacos offert',
      'Offre anti-gaspillage valable du lundi au jeudi après 23h. Parfait pour vider le stock du jour !',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      'Saint-Denis',
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
      vendor_tacos_id,
      'Pizza Express - 1 pizza achetée = 1 offerte',
      'Profitez de nos pizzas en fin de journée. 1 achetée = 1 offerte après 22h',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'Saint-Denis',
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
      vendor_tacos_id,
      'Burger House - Menu anti-gaspillage',
      'Menu spécial fin de journée. 1 burger acheté = 1 burger offert après 23h',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      'Saint-Denis',
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
      vendor_hotel_id,
      '2 nuits achetées = 1 nuit offerte',
      'Offre valable le lundi et mardi. Parfait pour un séjour en semaine !',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'Saint-Denis',
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
      vendor_hotel_id,
      'Hôtel Plaza - Offre spéciale début de semaine',
      'Réservez 2 nuits et obtenez 1 nuit gratuite. Valable lundi et mardi',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'Saint-Denis',
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
      vendor_boulangerie_id,
      'Gâteaux et viennoiseries à -50%',
      'Tous les jours après 18h, profitez de nos gâteaux et viennoiseries du jour à moitié prix',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      'Saint-Denis',
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
      vendor_boulangerie_id,
      'Baguettes du jour à 1€',
      'Les baguettes du jour non vendues sont proposées à 1€ après 19h',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      'Saint-Denis',
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
      vendor_boulangerie_id,
      'Sandwichs et quiches du jour - 1 acheté = 1 offert',
      'Sandwichs et quiches du jour : 1 acheté = 1 offert en fin de journée après 18h',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      'Saint-Denis',
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
      vendor_spa_id,
      'Soin complet à prix réduit',
      'Soin complet du visage et du corps à prix réduit en fin de journée',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      'Saint-Denis',
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
      vendor_spa_id,
      'Massage relaxant - 1h achetée = 30min offerte',
      'Massage relaxant : 1h achetée = 30min offerte. Valable du lundi au vendredi',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      'Saint-Denis',
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
      vendor_lingerie_id,
      'Séance d''essayage - 1h achetée = 30min offerte',
      '1h de conseil achetée = 30min offerte. Parfait pour les heures creuses du mardi !',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'Saint-Denis',
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
      vendor_lingerie_id,
      'Consultation personnalisée - Mardi et jeudi',
      '1h de consultation = 30min offerte. Mardi et jeudi après-midi',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'Saint-Denis',
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
      vendor_beaute_id,
      'Soin visage - 1h achetée = 30min offerte',
      '1h de soin achetée = 30min offerte. Mardi entre 15h et 17h',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      'Saint-Denis',
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
      vendor_beaute_id,
      'Coupe + Brushing - Mercredi après-midi',
      '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      'Saint-Denis',
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
      vendor_beaute_id,
      'Soin complet - Jeudi après-midi',
      '1h30 de soin = 30min offerte. Jeudi après-midi',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      'Saint-Denis',
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
      vendor_coach_id,
      'Séance personnalisée - Mardi',
      '1h de coaching achetée = 30min offerte. Mardi entre 15h et 17h',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'Saint-Denis',
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
      vendor_coach_id,
      'Entraînement individuel - Mercredi',
      '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'Saint-Denis',
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
      vendor_coach_id,
      'Programme personnalisé - Mardi et jeudi',
      '1h achetée = 30min offerte. Mardi et jeudi après-midi',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'Saint-Denis',
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
      vendor_loisir_id,
      'Cinéma - 2 places achetées = 1 offerte',
      '2 places achetées = 1 place offerte pour les séances de fin de soirée',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      'Saint-Denis',
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
      vendor_loisir_id,
      'Bowling - Partie du soir',
      'Partie de bowling à prix réduit pour les créneaux moins fréquentés',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      'Saint-Denis',
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
      vendor_autre_id,
      'Service divers - Consultation',
      'Consultation personnalisée pour services variés',
      'https://via.placeholder.com/800x400?text=Service',
      'Saint-Denis',
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

END $$;

-- Afficher un résumé
SELECT 
  'Vendeurs créés' as type,
  COUNT(*)::text as nombre
FROM vendors
UNION ALL
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

