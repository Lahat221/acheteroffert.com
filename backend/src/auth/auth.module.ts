/**
 * Module Auth (Authentification)
 * 
 * Ce module regroupe tout ce qui concerne l'authentification et la gestion des administrateurs :
 * - Entité Admin
 * - Service AuthService (logique métier)
 * - Contrôleur AuthController (routes API)
 * - DTOs (validation des données)
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Admin } from './entities/admin.entity';

@Module({
  /**
   * Importe TypeOrmModule avec l'entité Admin
   * Cela permet d'injecter le repository Admin dans le service
   */
  imports: [TypeOrmModule.forFeature([Admin])],
  
  /**
   * Contrôleur qui expose les routes API
   */
  controllers: [AuthController],
  
  /**
   * Service qui contient la logique métier
   * Exporté pour pouvoir être utilisé dans d'autres modules
   */
  providers: [AuthService],
  exports: [AuthService], // Exporté pour être utilisé dans d'autres modules
})
export class AuthModule {}




