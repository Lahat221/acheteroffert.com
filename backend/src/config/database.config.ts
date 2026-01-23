/**
 * Configuration TypeORM pour la connexion a PostgreSQL
 * 
 * Ce fichier configure TypeORM avec les parametres de connexion
 * a la base de donnees PostgreSQL. Il est utilise pour :
 * - Les migrations
 * - La connexion a la base de donnees dans l'application
 */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Charge les variables d'environnement depuis le fichier .env
config();

/**
 * Configuration de la source de donnees TypeORM
 * 
 * Cette configuration definit :
 * - Le type de base de donnees (postgres)
 * - Les parametres de connexion (host, port, username, password, database)
 * - Les entites a charger (toutes les entites .entity.ts)
 * - Les migrations a executer (dans database/migrations/)
 * - Les options de synchronisation (desactivee en production)
 */
function getDatabaseConfig(): DataSourceOptions {
  // Utilise DATABASE_URL si disponible (Railway, Heroku, etc.)
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    // TypeORM peut utiliser directement l'URL de connexion
    // Cela gère automatiquement IPv4, IPv6, et tous les formats
    return {
      type: 'postgres',
      url: databaseUrl, // Utilise directement l'URL (gère IPv4 et IPv6)
      // Chemins vers les entites (modeles de donnees)
      entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
      // Chemins vers les migrations
      migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
      // Synchronisation automatique (desactivee en production pour utiliser les migrations)
      synchronize: process.env.NODE_ENV === 'development',
      // Logging des requetes SQL (utile en developpement)
      logging: process.env.NODE_ENV === 'development',
      // Nom de la connexion
      name: 'default',
    };
  }
  
  // Fallback sur les variables individuelles
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'acheteroffert',
    // Chemins vers les entites (modeles de donnees)
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    // Chemins vers les migrations
    migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
    // Synchronisation automatique (desactivee en production pour utiliser les migrations)
    synchronize: process.env.NODE_ENV === 'development',
    // Logging des requetes SQL (utile en developpement)
    logging: process.env.NODE_ENV === 'development',
    // Nom de la connexion
    name: 'default',
  };
}

export const databaseConfig: DataSourceOptions = getDatabaseConfig();

/**
 * Instance DataSource pour les migrations
 * 
 * Cette instance est utilisee par les commandes CLI TypeORM
 * pour executer les migrations (migration:run, migration:revert, etc.)
 */
const dataSource = new DataSource(databaseConfig);

export default dataSource;
