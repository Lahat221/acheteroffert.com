/**
 * DTO pour les paramètres de requête lors de la récupération des offres
 * 
 * Utilisé pour filtrer et paginer les offres
 */
import { IsOptional, IsString, IsNumber, IsBoolean, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryOffersDto {
  /**
   * Filtrer par ville
   * Exemple : ?city=Saint-Denis
   */
  @IsString()
  @IsOptional()
  city?: string;

  /**
   * Filtrer par catégorie
   * Exemple : ?category=restauration
   */
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * Filtrer uniquement les offres mises en avant (Bons Plans)
   * Exemple : ?featured=true
   */
  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;

  /**
   * Filtrer uniquement les offres actives
   * Par défaut : true
   */
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;

  /**
   * Numéro de page pour la pagination
   * Par défaut : 1
   */
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;

  /**
   * Nombre d'éléments par page
   * Par défaut : 20
   */
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number;
}




