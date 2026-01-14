/**
 * DTO pour l'authentification d'un administrateur
 * 
 * Utilisé lors de la connexion (login)
 */
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  /**
   * Email de l'administrateur
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Mot de passe de l'administrateur
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}






