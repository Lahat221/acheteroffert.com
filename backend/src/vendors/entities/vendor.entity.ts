/**
 * Entité Vendor (Vendeur)
 * 
 * Représente un vendeur sur la plateforme.
 * Un vendeur peut avoir plusieurs offres et un abonnement actif.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Offer } from '../../products/entities/offer.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('vendors')
@Index(['email'], { unique: true })
export class Vendor {
  /**
   * Identifiant unique du vendeur (UUID)
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Email du vendeur (utilisé pour l'authentification)
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
   * Nom de l'entreprise/commerce
   */
  @Column({ type: 'varchar', length: 255, name: 'company_name' })
  companyName: string;

  /**
   * Prénom du responsable
   */
  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName: string;

  /**
   * Nom du responsable
   */
  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  /**
   * Téléphone de contact (optionnel)
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  /**
   * Adresse complète (optionnel)
   */
  @Column({ type: 'text', nullable: true })
  address: string | null;

  /**
   * Ville (optionnel)
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  /**
   * Code postal (optionnel)
   */
  @Column({ type: 'varchar', length: 10, nullable: true, name: 'postal_code' })
  postalCode: string | null;

  /**
   * Statut actif/inactif du vendeur
   * Si false, le vendeur ne peut pas se connecter ni créer d'offres
   */
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

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

  /**
   * Relation : Un vendeur peut avoir plusieurs offres
   * Relation One-to-Many avec Offer
   */
  @OneToMany(() => Offer, (offer) => offer.vendor)
  offers: Offer[];

  /**
   * Relation : Un vendeur peut avoir plusieurs abonnements
   * Relation One-to-Many avec Subscription
   * Note : Un seul abonnement actif à la fois (géré en logique applicative)
   */
  @OneToMany(() => Subscription, (subscription) => subscription.vendor)
  subscriptions: Subscription[];
}







