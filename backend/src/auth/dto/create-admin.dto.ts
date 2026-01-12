/**
 * DTO pour créer un nouvel administrateur
 * 
 * Utilisé lors de la création d'un compte admin
 */
import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { AdminRole } from '../../common/enums/admin-role.enum';

export class CreateAdminDto {
  /**
   * Email de l'administrateur (utilisé pour l'authentification)
   * Doit être unique et valide
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Mot de passe de l'administrateur
   * Minimum 8 caractères pour la sécurité
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;

  /**
   * Prénom de l'administrateur
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * Nom de l'administrateur
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * Rôle de l'administrateur
   * Par défaut : ADMIN
   */
  @IsEnum(AdminRole)
  @IsOptional()
  role?: AdminRole;
}

