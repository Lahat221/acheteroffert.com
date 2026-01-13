/**
 * Script pour enregistrer toutes les offres de la page d'accueil
 * dans la base de données avec le compte vendeur "lahat221"
 * 
 * Usage: node backend/database/seed-offres-accueil.js
 */

const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Toutes les offres de la page d'accueil (extrait de frontend/src/lib/api.ts)
const offresAccueil = [
  // RESTAURATION - Saint-Denis
  {
    title: 'Tacos King - 1 acheté = 1 offert',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    city: 'Saint-Denis',
    category: 'restauration',
    description: '1 tacos acheté = 1 tacos offert. Parfait pour vider le stock en fin de journée !',
    address: '15 Rue de la République, 93200 Saint-Denis',
    validDays: [1, 2, 3, 4], // Lundi à Jeudi
    validFromHour: 23, // À partir de 23h
    isFeatured: true,
    maxReservations: 20,
  },
  {
    title: 'Pizza Express - 1 pizza achetée = 1 offerte',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    city: 'Saint-Denis',
    category: 'restauration',
    description: 'Profitez de nos pizzas en fin de journée. 1 achetée = 1 offerte',
    address: '42 Avenue du Président Wilson, 93200 Saint-Denis',
    validDays: [1, 2, 3, 4], // Lundi à Jeudi
    validFromHour: 22, // À partir de 22h
    isFeatured: true,
    maxReservations: 15,
  },
  {
    title: 'Burger House - Menu anti-gaspillage',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    city: 'Saint-Denis',
    category: 'restauration',
    description: 'Menu spécial fin de journée. 1 burger acheté = 1 burger offert',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4], // Lundi à Jeudi
    validFromHour: 23,
    isFeatured: false,
    maxReservations: 25,
  },
  // HÔTEL - Saint-Denis
  {
    title: 'Hôtel Central - 2 nuits = 1 nuit offerte',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    city: 'Saint-Denis',
    category: 'hotel',
    description: '2 nuits achetées = 1 nuit offerte. Parfait pour un week-end prolongé !',
    address: 'Saint-Denis',
    validDays: [1, 2], // Lundi et Mardi
    isFeatured: true,
    maxReservations: 10,
  },
  {
    title: 'Hôtel Plaza - Offre spéciale début de semaine',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    city: 'Saint-Denis',
    category: 'hotel',
    description: 'Réservez 2 nuits et obtenez 1 nuit gratuite. Valable lundi et mardi',
    address: 'Saint-Denis',
    validDays: [1, 2], // Lundi et Mardi
    isFeatured: false,
    maxReservations: 8,
  },
  // SPA & BIEN-ÊTRE
  {
    title: 'Spa Relaxation - Soin complet',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    city: 'Saint-Denis',
    category: 'spa',
    description: 'Soin complet à prix réduit en fin de journée',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
    validFromHour: 18,
    isFeatured: false,
  },
  // BOULANGERIE - Saint-Denis (Anti-gaspillage)
  {
    title: 'Boulangerie Le Pain Doré - Gâteaux fin de journée',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    city: 'Saint-Denis',
    category: 'boulangerie',
    description: 'Tous nos gâteaux préparés : 1 acheté = 2 offert. Parfait pour éviter le gaspillage !',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
    validFromHour: 18, // À partir de 18h
    isFeatured: true,
    maxReservations: 30,
  },
  {
    title: 'Boulangerie Artisanale - Baguettes du jour',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    city: 'Saint-Denis',
    category: 'boulangerie',
    description: 'Baguettes du jour : 2 achetées = 2 offertes. Valable en fin de journée',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5, 6], // Lundi à Samedi
    validFromHour: 19, // À partir de 19h
    isFeatured: true,
    maxReservations: 40,
  },
  {
    title: 'Pâtisserie Douceur - Pizzas boulangères',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    city: 'Saint-Denis',
    category: 'boulangerie',
    description: 'Pizzas boulangères : 1 achetée = 3 offerte. Évitez le gaspillage !',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
    validFromHour: 19, // À partir de 19h
    isFeatured: false,
    maxReservations: 20,
  },
  {
    title: 'Boulangerie du Centre - Viennoiseries',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    city: 'Saint-Denis',
    category: 'boulangerie',
    description: 'Croissants, pains au chocolat, chaussons : 3 achetés = 3 offert',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
    validFromHour: 17, // À partir de 17h
    isFeatured: false,
    maxReservations: 35,
  },
  {
    title: 'Boulangerie Tradition - Sandwichs et quiches',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    city: 'Saint-Denis',
    category: 'boulangerie',
    description: 'Sandwichs et quiches du jour : 1 acheté = 1 offert en fin de journée',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
    validFromHour: 18, // À partir de 18h
    isFeatured: false,
    maxReservations: 25,
  },
  {
    title: 'Pâtisserie Fine - Pâtisseries du jour',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    city: 'Saint-Denis',
    category: 'boulangerie',
    description: 'Éclairs, tartes, millefeuilles : 2 achetés = 2 offert. Anti-gaspillage !',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
    validFromHour: 17, // À partir de 17h
    isFeatured: true,
    maxReservations: 28,
  },
  // LINGERIE - Saint-Denis (Heures creuses)
  {
    title: 'Boutique Lingerie - Séance d\'essayage',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    city: 'Saint-Denis',
    category: 'lingerie',
    description: '1h de conseil achetée = 30min offerte. Parfait pour les heures creuses !',
    address: 'Saint-Denis',
    validDays: [2], // Mardi
    validFromHour: 15, // À partir de 15h
    validUntilHour: 17, // Jusqu'à 17h
    isFeatured: true,
    maxReservations: 8,
  },
  {
    title: 'Lingerie Fine - Consultation personnalisée',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    city: 'Saint-Denis',
    category: 'lingerie',
    description: '1h de consultation = 30min offerte. Mardi et jeudi après-midi',
    address: 'Saint-Denis',
    validDays: [2, 4], // Mardi et Jeudi
    validFromHour: 14,
    validUntilHour: 17,
    isFeatured: false,
    maxReservations: 10,
  },
  {
    title: 'Boutique Intimité - Essayage privé',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    city: 'Saint-Denis',
    category: 'lingerie',
    description: '1h achetée = 30min offerte. Lundi après-midi heures creuses',
    address: 'Saint-Denis',
    validDays: [1], // Lundi
    validFromHour: 14,
    validUntilHour: 17,
    isFeatured: false,
    maxReservations: 6,
  },
  // SALON DE BEAUTÉ - Saint-Denis (Heures creuses)
  {
    title: 'Salon Beauté Élégance - Soin visage',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    city: 'Saint-Denis',
    category: 'beaute',
    description: '1h de soin achetée = 30min offerte. Mardi entre 15h et 17h',
    address: 'Saint-Denis',
    validDays: [2], // Mardi
    validFromHour: 15,
    validUntilHour: 17,
    isFeatured: true,
    maxReservations: 12,
  },
  {
    title: 'Coiffure & Beauté - Coupe + Brushing',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    city: 'Saint-Denis',
    category: 'beaute',
    description: '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
    address: 'Saint-Denis',
    validDays: [3], // Mercredi
    validFromHour: 14,
    validUntilHour: 17,
    isFeatured: false,
    maxReservations: 10,
  },
  {
    title: 'Institut Beauté - Soin complet',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    city: 'Saint-Denis',
    category: 'beaute',
    description: '1h30 de soin = 30min offerte. Jeudi après-midi',
    address: 'Saint-Denis',
    validDays: [4], // Jeudi
    validFromHour: 15,
    validUntilHour: 17,
    isFeatured: true,
    maxReservations: 8,
  },
  {
    title: 'Salon Coiffure Moderne - Coupe + Soin',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    city: 'Saint-Denis',
    category: 'beaute',
    description: '1h achetée = 30min offerte. Mardi et jeudi après-midi',
    address: 'Saint-Denis',
    validDays: [2, 4], // Mardi et Jeudi
    validFromHour: 14,
    validUntilHour: 17,
    isFeatured: false,
    maxReservations: 15,
  },
  {
    title: 'Salon Coiffure Élégance - Coupe + Barber offert',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    city: 'Saint-Denis',
    category: 'beaute',
    description: '1 coupe achetée = 1 barber offert. Mercredi à partir de 15h - Heure creuse',
    address: 'Saint-Denis',
    validDays: [3], // Mercredi
    validFromHour: 15,
    validUntilHour: 17, // De 15h à 17h
    isFeatured: true,
    maxReservations: 12,
  },
  // COACH SPORTIF - Saint-Denis (Heures creuses)
  {
    title: 'Coach Sportif Pro - Séance personnalisée',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    city: 'Saint-Denis',
    category: 'coach',
    description: '1h de coaching achetée = 30min offerte. Mardi entre 15h et 17h',
    address: 'Saint-Denis',
    validDays: [2], // Mardi
    validFromHour: 15,
    validUntilHour: 17,
    isFeatured: true,
    maxReservations: 10,
  },
  {
    title: 'Fitness Coach - Entraînement individuel',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    city: 'Saint-Denis',
    category: 'coach',
    description: '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
    address: 'Saint-Denis',
    validDays: [3], // Mercredi
    validFromHour: 14,
    validUntilHour: 17,
    isFeatured: false,
    maxReservations: 8,
  },
  {
    title: 'Personal Trainer - Séance à domicile',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    city: 'Saint-Denis',
    category: 'coach',
    description: '1h de coaching = 30min offerte. Jeudi après-midi',
    address: 'Saint-Denis',
    validDays: [4], // Jeudi
    validFromHour: 15,
    validUntilHour: 17,
    isFeatured: false,
    maxReservations: 12,
  },
  {
    title: 'Coach Fitness - Programme personnalisé',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    city: 'Saint-Denis',
    category: 'coach',
    description: '1h achetée = 30min offerte. Mardi et jeudi après-midi',
    address: 'Saint-Denis',
    validDays: [2, 4], // Mardi et Jeudi
    validFromHour: 14,
    validUntilHour: 17,
    isFeatured: true,
    maxReservations: 15,
  },
  // LOISIR
  {
    title: 'Cinéma Multiplex - 2 places',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    city: 'Saint-Denis',
    category: 'loisir',
    description: '2 places achetées = 1 place offerte pour les séances de fin de soirée',
    address: 'Saint-Denis',
    validDays: [1, 2, 3, 4], // Lundi à Jeudi
    validFromHour: 21,
    isFeatured: false,
  },
];

async function seedOffresAccueil() {
    // Configuration de la connexion
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'acheteroffert',
    };

    console.log('📋 Configuration:', {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
    });

    const client = new Client(dbConfig);

  try {
    console.log('🔌 Connexion à la base de données...');
    await client.connect();
    console.log('✅ Connecté à la base de données');

    // Trouve le vendeur avec l'email "lahat221" ou similaire
    console.log('🔍 Recherche du compte vendeur "lahat221"...');
    const vendorResult = await client.query(
      `SELECT id, email, company_name FROM vendors WHERE email LIKE '%lahat221%' OR email = 'lahat221@example.com' OR company_name LIKE '%lahat%' LIMIT 1`
    );

    if (vendorResult.rows.length === 0) {
      // Essaie de trouver n'importe quel vendeur
      const anyVendor = await client.query(`SELECT id, email, company_name FROM vendors LIMIT 1`);
      if (anyVendor.rows.length === 0) {
        throw new Error('❌ Aucun vendeur trouvé dans la base de données. Veuillez d\'abord créer un compte vendeur.');
      }
      console.log(`⚠️  Vendeur "lahat221" non trouvé. Utilisation du vendeur: ${anyVendor.rows[0].email}`);
      var vendorId = anyVendor.rows[0].id;
      var vendorEmail = anyVendor.rows[0].email;
    } else {
      var vendorId = vendorResult.rows[0].id;
      var vendorEmail = vendorResult.rows[0].email;
      console.log(`✅ Vendeur trouvé: ${vendorEmail} (ID: ${vendorId})`);
    }

    // Compte les offres existantes pour ce vendeur
    const existingOffers = await client.query(
      `SELECT COUNT(*) as count FROM offers WHERE vendor_id = $1`,
      [vendorId]
    );
    console.log(`📊 Offres existantes pour ce vendeur: ${existingOffers.rows[0].count}`);

    // Insère toutes les offres
    console.log(`\n📝 Insertion de ${offresAccueil.length} offres...`);
    let successCount = 0;
    let errorCount = 0;

    for (const offre of offresAccueil) {
      try {
        const insertQuery = `
          INSERT INTO offers (
            vendor_id,
            title,
            description,
            image_url,
            city,
            category,
            valid_days,
            valid_from_hour,
            valid_until_hour,
            max_reservations,
            is_featured,
            is_active,
            created_at,
            updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
          RETURNING id, title
        `;

        const result = await client.query(insertQuery, [
          vendorId,
          offre.title,
          offre.description || null,
          offre.imageUrl || null,
          offre.city,
          offre.category || null,
          offre.validDays ? JSON.stringify(offre.validDays) : null,
          offre.validFromHour || null,
          offre.validUntilHour || null,
          offre.maxReservations || null,
          offre.isFeatured || false,
          true, // isActive
        ]);

        console.log(`  ✅ ${offre.title}`);
        successCount++;
      } catch (error) {
        // Si l'offre existe déjà (titre unique ou autre), on continue
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
          console.log(`  ⚠️  ${offre.title} (déjà existante, ignorée)`);
        } else {
          console.error(`  ❌ ${offre.title}: ${error.message}`);
          errorCount++;
        }
      }
    }

    console.log(`\n✅ Terminé !`);
    console.log(`   - ${successCount} offres créées avec succès`);
    if (errorCount > 0) {
      console.log(`   - ${errorCount} erreurs`);
    }

    // Affiche un résumé
    const finalCount = await client.query(
      `SELECT COUNT(*) as count FROM offers WHERE vendor_id = $1`,
      [vendorId]
    );
    console.log(`\n📊 Total d'offres pour ${vendorEmail}: ${finalCount.rows[0].count}`);

    // Affiche les offres par catégorie
    const byCategory = await client.query(
      `SELECT category, COUNT(*) as count 
       FROM offers 
       WHERE vendor_id = $1 
       GROUP BY category 
       ORDER BY count DESC`,
      [vendorId]
    );
    console.log(`\n📂 Répartition par catégorie:`);
    byCategory.rows.forEach(row => {
      console.log(`   - ${row.category || 'Sans catégorie'}: ${row.count} offre(s)`);
    });

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Déconnexion de la base de données');
  }
}

// Exécute le script
seedOffresAccueil()
  .then(() => {
    console.log('\n✨ Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  });

