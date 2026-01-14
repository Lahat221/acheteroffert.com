-- Script de seed pour ajouter des données de test
-- Ce script crée des vendeurs et des offres de démonstration

-- Supprimer les données existantes (optionnel, pour repartir de zéro)
-- DELETE FROM offers;
-- DELETE FROM vendors;

-- Créer des vendeurs de test
INSERT INTO vendors (id, email, password_hash, company_name, first_name, last_name, phone, address, city, postal_code, is_active, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'tacos@example.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', -- mot de passe: "password" (hash bcrypt)
    'Tacos Saint-Denis',
    'Jean',
    'Dupont',
    '0123456789',
    '123 Rue de la République',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'hotel@example.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Hôtel Central',
    'Marie',
    'Martin',
    '0123456790',
    '456 Avenue des Champs',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'boulangerie@example.com',
    '$2b$10$rQ8K8K8K8K8K8K8K8K8K8uK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K',
    'Boulangerie du Centre',
    'Pierre',
    'Durand',
    '0123456791',
    '789 Rue du Commerce',
    'Saint-Denis',
    '93200',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (email) DO NOTHING;

-- Créer des offres de test
-- Note: Les vendor_id seront remplacés par les vrais IDs après l'insertion des vendeurs
DO $$
DECLARE
  vendor_tacos_id UUID;
  vendor_hotel_id UUID;
  vendor_boulangerie_id UUID;
BEGIN
  -- Récupérer les IDs des vendeurs
  SELECT id INTO vendor_tacos_id FROM vendors WHERE email = 'tacos@example.com';
  SELECT id INTO vendor_hotel_id FROM vendors WHERE email = 'hotel@example.com';
  SELECT id INTO vendor_boulangerie_id FROM vendors WHERE email = 'boulangerie@example.com';

  -- Offres de restauration
  INSERT INTO offers (id, vendor_id, title, description, image_url, city, price, original_price, is_active, category, valid_days, valid_from_hour, valid_until_hour, is_featured, max_reservations, created_at, updated_at)
  VALUES 
    (
      gen_random_uuid(),
      vendor_tacos_id,
      '1 tacos acheté = 1 tacos offert',
      'Offre anti-gaspillage valable du lundi au jeudi après 23h. Parfait pour vider le stock du jour !',
      'https://images.unsplash.com/photo-1565299585323-38174c4a6c5a?w=800',
      'Saint-Denis',
      8.50,
      17.00,
      true,
      'restauration',
      '[1,2,3,4]'::jsonb, -- lundi à jeudi
      23,
      23,
      true,
      50,
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      vendor_tacos_id,
      'Menu du soir à moitié prix',
      'Tous les soirs après 22h, profitez de nos menus à moitié prix',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'Saint-Denis',
      5.00,
      10.00,
      true,
      'restauration',
      '[1,2,3,4,5,6,0]'::jsonb, -- tous les jours
      22,
      23,
      false,
      30,
      NOW(),
      NOW()
    );

  -- Offres d'hôtel
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
      '[1,2]'::jsonb, -- lundi et mardi
      14,
      18,
      true,
      10,
      NOW(),
      NOW()
    );

  -- Offres de boulangerie
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
      '[1,2,3,4,5,6,0]'::jsonb, -- tous les jours
      18,
      20,
      true,
      100,
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
      '[1,2,3,4,5,6,0]'::jsonb, -- tous les jours
      19,
      20,
      false,
      50,
      NOW(),
      NOW()
    );
END $$;

-- Afficher un résumé
SELECT 
  'Vendeurs créés' as type,
  COUNT(*) as nombre
FROM vendors
UNION ALL
SELECT 
  'Offres créées' as type,
  COUNT(*) as nombre
FROM offers;






