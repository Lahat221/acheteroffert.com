/**
 * Entité Offer (Offre)
 * 
 * Représente une offre proposée par un vendeur.
 * Une offre peut avoir plusieurs réservations.
 * 
 * Note : Cette entité correspond à "offers" dans le schéma,
 * mais le module s'appelle "products" pour plus de clarté métier.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Vendor } from '../../vendors/entities/vendor.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('offers')
@Index(['vendorId'])
@Index(['city'])
export class Offer {
  /**
   * Identifiant unique de l'offre (UUID)
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Référence au vendeur propriétaire de l'offre
   * Relation Many-to-One avec Vendor
   */
  @ManyToOne(() => Vendor, (vendor) => vendor.offers, { nullable: false })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column({ name: 'vendor_id' })
  vendorId: string;

  /**
   * Titre de l'offre
   * Exemple : "1 tacos acheté = 1 tacos offert"
   */
  @Column({ type: 'varchar', length: 255 })
  title: string;

  /**
   * Description détaillée de l'offre (optionnel)
   */
  @Column({ type: 'text', nullable: true })
  description: string | null;

  /**
   * URL de l'image principale de l'offre (optionnel)
   */
  @Column({ type: 'varchar', length: 500, nullable: true, name: 'image_url' })
  imageUrl: string | null;

  /**
   * Ville où l'offre est disponible
   * Utilisé pour le filtrage géographique
   */
  @Column({ type: 'varchar', length: 100 })
  city: string;

  /**
   * Prix de l'offre (optionnel)
   * Peut être null pour les offres "gratuites" ou sans prix fixe
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null;

  /**
   * Prix original (optionnel)
   * Utilisé pour afficher la réduction ou la valeur de l'offre
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'original_price' })
  originalPrice: number | null;

  /**
   * Statut actif/inactif de l'offre
   * Si false, l'offre n'est pas visible publiquement
   */
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  /**
   * Date de début de validité (optionnel)
   * Si null, l'offre est valable immédiatement
   */
  @Column({ type: 'date', nullable: true, name: 'valid_from' })
  validFrom: Date | null;

  /**
   * Date de fin de validité (optionnel)
   * Si null, l'offre n'a pas de date d'expiration
   */
  @Column({ type: 'date', nullable: true, name: 'valid_until' })
  validUntil: Date | null;

  /**
   * Nombre maximum de réservations (optionnel)
   * Si null, pas de limite (illimité)
   * Utilisé pour gérer le stock/la disponibilité
   */
  @Column({ type: 'integer', nullable: true, name: 'max_reservations' })
  maxReservations: number | null;

  /**
   * Catégorie de l'offre
   * Exemples : 'restauration', 'boulangerie', 'hotel', 'spa', etc.
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string | null;

  /**
   * Jours de validité (tableau JSON)
   * 0 = dimanche, 1 = lundi, ..., 6 = samedi
   * Exemple : [1, 2, 3, 4] pour lundi à jeudi
   */
  @Column({ type: 'json', nullable: true, name: 'valid_days' })
  validDays: number[] | null;

  /**
   * Heure de début de validité (0-23, optionnel)
   * Exemple : 23 pour 23h
   */
  @Column({ type: 'integer', nullable: true, name: 'valid_from_hour' })
  validFromHour: number | null;

  /**
   * Heure de fin de validité (0-23, optionnel)
   * Exemple : 23 pour 23h59
   */
  @Column({ type: 'integer', nullable: true, name: 'valid_until_hour' })
  validUntilHour: number | null;

  /**
   * Indique si l'offre est mise en avant (Bons Plans)
   * Les offres featured sont affichées en priorité sur la page d'accueil
   */
  @Column({ type: 'boolean', default: false, name: 'is_featured' })
  isFeatured: boolean;

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
   * Relation : Une offre peut avoir plusieurs réservations
   * Relation One-to-Many avec Reservation
   */
  @OneToMany(() => Reservation, (reservation) => reservation.offer)
  reservations: Reservation[];
}



