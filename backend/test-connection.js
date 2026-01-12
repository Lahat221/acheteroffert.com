/**
 * Script de test de connexion à la base de données
 * Pour diagnostiquer les problèmes de connexion
 */
require('dotenv').config();
const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'acheteroffert',
  });

  try {
    console.log('🔌 Tentative de connexion à PostgreSQL...');
    console.log(`   Host: ${client.host}`);
    console.log(`   Port: ${client.port}`);
    console.log(`   Database: ${client.database}`);
    console.log(`   User: ${client.user}`);
    
    await client.connect();
    console.log('✅ Connexion réussie !');
    
    const result = await client.query('SELECT version()');
    console.log('📊 Version PostgreSQL:', result.rows[0].version.split('\n')[0]);
    
    await client.end();
    console.log('✅ Test terminé avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion:');
    console.error('   Code:', error.code);
    console.error('   Message:', error.message);
    if (error.code === '28P01') {
      console.error('\n💡 Le mot de passe est incorrect. Vérifiez votre fichier .env');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 PostgreSQL n\'est pas démarré ou n\'écoute pas sur ce port');
    } else if (error.code === '3D000') {
      console.error('\n💡 La base de données n\'existe pas. Créez-la dans pgAdmin');
    }
    process.exit(1);
  }
}

testConnection();

