/**
 * Module Products (Offres)
 * 
 * Ce module regroupe tout ce qui concerne la gestion des offres :
 * - Entité Offer
 * - Service ProductsService (logique métier)
 * - Contrôleur ProductsController (routes API)
 * - DTOs (validation des données)
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Offer } from './entities/offer.entity';

@Module({
  /**
   * Importe TypeOrmModule avec l'entité Offer
   * Cela permet d'injecter le repository Offer dans le service
   */
  imports: [TypeOrmModule.forFeature([Offer])],
  
  /**
   * Contrôleur qui expose les routes API
   */
  controllers: [ProductsController],
  
  /**
   * Service qui contient la logique métier
   * Exporté pour pouvoir être utilisé dans d'autres modules
   */
  providers: [ProductsService],
  exports: [ProductsService], // Exporté pour être utilisé dans d'autres modules (ex: ReservationsModule)
})
export class ProductsModule {}




