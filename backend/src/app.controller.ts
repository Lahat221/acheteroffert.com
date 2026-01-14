/**
 * Contrôleur principal de l'application
 * 
 * Ce contrôleur gère les routes de base de l'API
 */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * Route de test pour vérifier que l'API fonctionne
   * 
   * GET /
   * Retourne un message de bienvenue et le statut de l'API
   */
  @Get()
  getHello() {
    return {
      message: 'Bienvenue sur l\'API AcheterOffert.com',
      status: 'OK',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Route de santé pour vérifier que l'API est accessible
   * 
   * GET /health
   * Utilisé pour les vérifications de santé de l'application
   */
  @Get('health')
  getHealth() {
    return {
      status: 'healthy',
      service: 'acheteroffert-api',
      timestamp: new Date().toISOString(),
    };
  }
}






