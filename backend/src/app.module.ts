/**
 * Module principal de l'application NestJS
 * 
 * Ce module importe tous les modules de l'application :
 * - ConfigModule : Configuration (variables d'environnement)
 * - DatabaseModule : Configuration de la base de données
 * - Modules métier : Vendors, Products, Reservations, QR Codes, Subscriptions, Auth
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { VendorsModule } from './vendors/vendors.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    /**
     * Module de configuration
     * Charge les variables d'environnement depuis le fichier .env
     * et rend la configuration accessible via ConfigService
     */
    ConfigModule.forRoot({
      isGlobal: true, // Rend ConfigService disponible dans tous les modules
      load: [appConfig], // Charge la configuration de l'application
      envFilePath: '.env', // Chemin vers le fichier .env
    }),

    /**
     * Module de base de données
     * Configure TypeORM et la connexion à PostgreSQL
     */
    DatabaseModule,

    /**
     * Modules métier
     */
    ProductsModule, // Module pour la gestion des offres
    VendorsModule, // Module pour la gestion des vendeurs
    AuthModule, // Module pour l'authentification et la gestion des administrateurs
    UploadModule, // Module pour l'upload de fichiers/images

    /**
     * TODO: Ajouter les autres modules métier ici
     * - ReservationsModule
     * - QRCodesModule
     * - SubscriptionsModule
     */
  ],
  controllers: [AppController], // Contrôleur principal avec les routes de base
  providers: [],
})
export class AppModule {}




