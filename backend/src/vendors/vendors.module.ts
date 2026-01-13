/**
 * Module Vendors (Vendeurs)
 * 
 * Ce module regroupe tout ce qui concerne la gestion des vendeurs :
 * - Entité Vendor
 * - Service VendorsService (logique métier)
 * - Contrôleur VendorsController (routes API)
 * - DTOs (validation des données)
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { Vendor } from './entities/vendor.entity';

@Module({
  /**
   * Importe TypeOrmModule avec l'entité Vendor
   * Cela permet d'injecter le repository Vendor dans le service
   */
  imports: [TypeOrmModule.forFeature([Vendor])],
  
  /**
   * Contrôleur qui expose les routes API
   */
  controllers: [VendorsController],
  
  /**
   * Service qui contient la logique métier
   * Exporté pour pouvoir être utilisé dans d'autres modules
   */
  providers: [VendorsService],
  exports: [VendorsService], // Exporté pour être utilisé dans d'autres modules (ex: AuthModule)
})
export class VendorsModule {}





