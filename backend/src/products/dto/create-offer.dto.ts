/**
 * DTO (Data Transfer Object) pour créer une nouvelle offre
 * 
 * Ce DTO définit la structure des données attendues
 * lors de la création d'une offre via l'API
 */
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString, Min, Max } from 'class-validator';

export class CreateOfferDto {
  /**
   * ID du vendeur propriétaire de l'offre
   * Obligatoire
   */
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  /**
   * Titre de l'offre
   * Exemple : "1 tacos acheté = 1 tacos offert"
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Description détaillée de l'offre (optionnel)
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * URL de l'image principale de l'offre (optionnel)
   */
  @IsString()
  @IsOptional()
  imageUrl?: string;

  /**
   * Ville où l'offre est disponible
   * Exemple : "Saint-Denis"
   */
  @IsString()
  @IsNotEmpty()
  city: string;

  /**
   * Prix de l'offre (optionnel)
   */
  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;

  /**
   * Prix original (optionnel)
   * Utilisé pour afficher la réduction
   */
  @IsNumber()
  @IsOptional()
  @Min(0)
  originalPrice?: number;

  /**
   * Statut actif/inactif de l'offre
   * Par défaut : true
   */
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  /**
   * Date de début de validité (optionnel)
   * Format ISO : "2025-01-01"
   */
  @IsDateString()
  @IsOptional()
  validFrom?: string;

  /**
   * Date de fin de validité (optionnel)
   * Format ISO : "2025-12-31"
   */
  @IsDateString()
  @IsOptional()
  validUntil?: string;

  /**
   * Nombre maximum de réservations (optionnel)
   * Si null, pas de limite
   */
  @IsNumber()
  @IsOptional()
  @Min(1)
  maxReservations?: number;

  /**
   * Catégorie de l'offre
   * Exemples : 'restauration', 'boulangerie', 'hotel', 'spa', etc.
   */
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * Jours de validité (tableau de nombres)
   * 0 = dimanche, 1 = lundi, ..., 6 = samedi
   * Exemple : [1, 2, 3, 4] pour lundi à jeudi
   */
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  validDays?: number[];

  /**
   * Heure de début de validité (0-23, optionnel)
   * Exemple : 23 pour 23h
   */
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(23)
  validFromHour?: number;

  /**
   * Heure de fin de validité (0-23, optionnel)
   * Exemple : 23 pour 23h59
   */
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(23)
  validUntilHour?: number;

  /**
   * Indique si l'offre est mise en avant (Bons Plans)
   * Par défaut : false
   */
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}




