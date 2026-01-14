/**
 * DTO pour l'authentification d'un vendeur
 * 
 * Utilisé lors de la connexion (login)
 */
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginVendorDto {
  /**
   * Email du vendeur
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Mot de passe du vendeur
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}






