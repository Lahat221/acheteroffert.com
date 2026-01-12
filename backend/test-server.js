/**
 * Script de test pour diagnostiquer le démarrage du serveur
 */
require('dotenv').config();

async function testServer() {
  try {
    console.log('🔧 Test du démarrage du serveur NestJS...');
    console.log('📋 Variables d\'environnement:');
    console.log(`   DB_HOST: ${process.env.DB_HOST}`);
    console.log(`   DB_PORT: ${process.env.DB_PORT}`);
    console.log(`   DB_DATABASE: ${process.env.DB_DATABASE}`);
    console.log(`   DB_USERNAME: ${process.env.DB_USERNAME}`);
    console.log(`   DB_PASSWORD: ${process.env.DB_PASSWORD ? '***' : 'NON DÉFINI'}`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    console.log('');
    
    console.log('📦 Import des modules NestJS...');
    const { NestFactory } = require('@nestjs/core');
    const { AppModule } = require('./dist/app.module');
    
    console.log('🚀 Création de l\'application...');
    const app = await NestFactory.create(AppModule);
    
    console.log('🌐 Configuration CORS...');
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
    
    console.log('🔌 Démarrage du serveur sur le port 3001...');
    await app.listen(3001);
    
    console.log('✅ Serveur démarré avec succès sur http://localhost:3001');
    console.log('🛑 Appuyez sur Ctrl+C pour arrêter le serveur');
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:');
    console.error('   Type:', error.constructor.name);
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    process.exit(1);
  }
}

testServer();

