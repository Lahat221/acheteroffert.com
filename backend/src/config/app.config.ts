/**
 * Configuration globale de l'application
 * 
 * Ce fichier exporte la configuration de l'application
 * incluant les variables d'environnement nécessaires
 */
import { registerAs } from '@nestjs/config';

/**
 * Configuration de l'application
 * 
 * Utilise registerAs pour créer un namespace de configuration
 * accessible via ConfigService.get('app')
 */
export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
}));









