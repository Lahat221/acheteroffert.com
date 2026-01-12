/**
 * Contrôleur pour les routes API des offres
 * 
 * Ce contrôleur expose les endpoints REST pour :
 * - GET /offers : Liste des offres (avec filtres)
 * - GET /offers/:id : Détails d'une offre
 * - POST /offers : Créer une nouvelle offre
 * - PATCH /offers/:id : Mettre à jour une offre
 * - DELETE /offers/:id : Supprimer une offre
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { QueryOffersDto } from './dto/query-offers.dto';

@Controller('offers')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * POST /offers
   * Crée une nouvelle offre
   * 
   * @param createOfferDto - Données de l'offre à créer
   * @returns L'offre créée
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.productsService.create(createOfferDto);
  }

  /**
   * GET /offers
   * Récupère toutes les offres avec filtres optionnels
   * 
   * Exemples d'utilisation :
   * - GET /offers?city=Saint-Denis
   * - GET /offers?category=restauration&featured=true
   * - GET /offers?page=1&limit=10
   * 
   * @param queryDto - Paramètres de filtrage et pagination
   * @returns Liste des offres avec le total
   */
  @Get()
  findAll(@Query() queryDto: QueryOffersDto) {
    return this.productsService.findAll(queryDto);
  }

  /**
   * GET /offers/:id
   * Récupère les détails d'une offre spécifique
   * 
   * @param id - ID de l'offre (UUID)
   * @returns Les détails de l'offre
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  /**
   * PATCH /offers/:id
   * Met à jour une offre existante
   * 
   * @param id - ID de l'offre à mettre à jour
   * @param updateOfferDto - Données à mettre à jour (tous les champs sont optionnels)
   * @returns L'offre mise à jour
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.productsService.update(id, updateOfferDto);
  }

  /**
   * DELETE /offers/:id
   * Supprime une offre (soft delete : marque comme inactive)
   * 
   * @param id - ID de l'offre à supprimer
   * @returns Message de confirmation
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}




