/**
 * Module de configuration de la base de données
 * 
 * Ce module configure TypeORM pour NestJS avec :
 * - La connexion à PostgreSQL
 * - Le chargement des entités
 * - La configuration des migrations
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
// Import explicite de toutes les entités pour qu'elles soient compilées
import { Vendor } from '../vendors/entities/vendor.entity';
import { Offer } from '../products/entities/offer.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { QRCode } from '../qrcodes/entities/qrcode.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { Admin } from '../auth/entities/admin.entity';

@Module({
  imports: [
    /**
     * Configuration TypeORM pour NestJS
     * 
     * Utilise ConfigService pour récupérer les variables d'environnement
     * et configure dynamiquement la connexion à la base de données
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Utilise DATABASE_URL si disponible (Railway, Heroku, etc.)
        // TypeORM supporte directement l'URL de connexion, ce qui évite les problèmes avec IPv6
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          // TypeORM peut utiliser directement l'URL de connexion
          // Cela gère automatiquement IPv4, IPv6, et tous les formats
          return {
            type: 'postgres',
            url: databaseUrl, // Utilise directement l'URL (gère IPv4 et IPv6)
            // Import explicite de toutes les entités (elles seront compilées par webpack)
            entities: [Vendor, Offer, Reservation, QRCode, Subscription, Admin],
            migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
            // Désactive synchronize en production, utilise les migrations
            synchronize: false, // Toujours false pour utiliser les migrations
            logging: configService.get<string>('NODE_ENV') === 'development',
            // Options supplémentaires pour améliorer la connexion
            retryAttempts: 3,
            retryDelay: 3000,
            // Force IPv4 si nécessaire (optionnel, TypeORM devrait gérer automatiquement)
            extra: {
              // Options de connexion supplémentaires pour pg (driver PostgreSQL)
            },
          };
        }
        
        // Fallback sur les variables individuelles
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_DATABASE', 'acheteroffert'),
          // Import explicite de toutes les entités (elles seront compilées par webpack)
          entities: [Vendor, Offer, Reservation, QRCode, Subscription, Admin],
          migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
          // Désactive synchronize en production, utilise les migrations
          synchronize: false, // Toujours false pour utiliser les migrations
          logging: configService.get<string>('NODE_ENV') === 'development',
          // Options supplémentaires pour améliorer la connexion
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),
  ],
})
export class DatabaseModule {}




