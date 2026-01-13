/**
 * DTO pour créer un nouveau vendeur
 * 
 * Utilisé lors de l'inscription d'un nouveau vendeur
 */
import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateVendorDto {
  /**
   * Email du vendeur (utilisé pour l'authentification)
   * Doit être unique et valide
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Mot de passe du vendeur
   * Minimum 6 caractères pour la sécurité
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  /**
   * Nom de l'entreprise/commerce
   */
  @IsString()
  @IsNotEmpty()
  companyName: string;

  /**
   * Prénom du responsable
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * Nom du responsable
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * Téléphone de contact (optionnel)
   */
  @IsString()
  @IsOptional()
  phone?: string;

  /**
   * Adresse complète (optionnel)
   */
  @IsString()
  @IsOptional()
  address?: string;

  /**
   * Ville (optionnel)
   */
  @IsString()
  @IsOptional()
  city?: string;

  /**
   * Code postal (optionnel)
   */
  @IsString()
  @IsOptional()
  postalCode?: string;
}





