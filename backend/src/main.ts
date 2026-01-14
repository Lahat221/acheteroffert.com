/**
 * Point d'entrée de l'application NestJS
 * 
 * Ce fichier démarre le serveur HTTP et configure l'application.
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

/**
 * Fonction principale qui démarre l'application
 */
async function bootstrap() {
  /**
   * Crée l'instance de l'application NestJS
   * Utilise AppModule comme module racine
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Configure le serveur pour servir les fichiers statiques depuis le dossier uploads
   * Les images uploadées seront accessibles via http://localhost:3001/uploads/filename.jpg
   */
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  /**
   * Récupère le service de configuration
   * Pour accéder aux variables d'environnement
   */
  const configService = app.get(ConfigService);

  /**
   * Active la validation globale des DTOs
   * Utilise class-validator pour valider automatiquement
   * les données entrantes dans les controllers
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non autorisées
      transform: true, // Transforme automatiquement les types (string → number, etc.)
    }),
  );

  /**
   * Active CORS (Cross-Origin Resource Sharing)
   * Permet au frontend Next.js de communiquer avec l'API
   */
  app.enableCors({
    origin: (origin, callback) => {
      // En développement, accepter localhost
      if (!origin || origin.includes('localhost:3000')) {
        return callback(null, true);
      }
      
      // Si FRONTEND_URL est défini, utiliser cette valeur
      if (process.env.FRONTEND_URL) {
        const allowedUrls = process.env.FRONTEND_URL.split(',').map(url => url.trim());
        if (allowedUrls.some(url => origin.includes(url.replace('https://', '').replace('http://', '')))) {
          return callback(null, true);
        }
      }
      
      // Accepter tous les domaines Vercel
      if (origin.includes('.vercel.app')) {
        return callback(null, true);
      }
      
      // Par défaut, refuser
      callback(null, true); // Pour le moment, on accepte tout en production
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /**
   * Récupère le port depuis la configuration
   * Par défaut : 3001
   */
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');


  /**
   * Démarre le serveur HTTP
   */
  await app.listen(port);

  console.log(`Application demarree sur le port ${port}`);
  console.log(`Environnement : ${configService.get<string>('app.nodeEnv', 'development')}`);
}

/**
 * Lance l'application
 */
bootstrap();




