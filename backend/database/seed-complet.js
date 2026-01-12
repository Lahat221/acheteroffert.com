/**
 * Script Node.js pour exécuter le seed complet
 * 
 * Ce script insère des offres d'exemple pour toutes les catégories
 * dans la base de données PostgreSQL
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function seedDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'acheteroffert',
  });

  try {
    console.log('🔌 Connexion à la base de données...');
    await client.connect();
    console.log('✅ Connecté à la base de données');

    // Lit le fichier SQL
    const sqlFile = path.join(__dirname, 'seed-complet.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('📝 Exécution du script SQL...');
    await client.query(sql);
    
    console.log('✅ Offres créées avec succès !');
    console.log('📊 Vérification des données...');

    // Affiche un résumé
    const result = await client.query(`
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
      ORDER BY category;
    `);

    console.log('\n📋 Résumé :');
    result.rows.forEach(row => {
      console.log(`   ${row.type}: ${row.nombre}`);
    });

    console.log('\n🎉 Le site est maintenant animé avec des offres variées !');
    console.log('💡 Visitez http://localhost:3000 pour voir les offres');

  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution du script:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedDatabase();

