/**
 * Entité Admin (Administrateur)
 * 
 * Représente un compte administrateur de la plateforme.
 * Les admins peuvent gérer les vendeurs, les offres, et la plateforme en général.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { AdminRole } from '../../common/enums/admin-role.enum';

@Entity('admins')
@Index(['email'], { unique: true })
export class Admin {
  /**
   * Identifiant unique de l'admin (UUID)
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Email de l'admin (utilisé pour l'authentification)
   * Unique et obligatoire
   */
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  /**
   * Hash du mot de passe (bcrypt)
   * Stocké de manière sécurisée, jamais en clair
   */
  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash: string;

  /**
   * Prénom de l'admin
   */
  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName: string;

  /**
   * Nom de l'admin
   */
  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  /**
   * Rôle de l'admin
   * Valeurs possibles : admin, super_admin
   * Par défaut : admin
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  /**
   * Statut actif/inactif de l'admin
   * Si false, l'admin ne peut pas se connecter
   */
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  /**
   * Date de dernière connexion
   * Null si l'admin ne s'est jamais connecté
   */
  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
  lastLoginAt: Date | null;

  /**
   * Date de création (générée automatiquement)
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * Date de mise à jour (mise à jour automatiquement)
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}



