/**
 * Entité Subscription (Abonnement)
 * 
 * Représente un abonnement d'un vendeur.
 * Un vendeur ne peut avoir qu'un seul abonnement actif à la fois.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Vendor } from '../../vendors/entities/vendor.entity';
import { SubscriptionStatus } from '../../common/enums/subscription-status.enum';
import { PaymentStatus } from '../../common/enums/payment-status.enum';

@Entity('subscriptions')
@Index(['vendorId'])
@Index(['status'])
@Index(['vendorId', 'status'], { where: 'status = \'active\'' })
export class Subscription {
  /**
   * Identifiant unique de l'abonnement (UUID)
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Référence au vendeur propriétaire de l'abonnement
   * Relation Many-to-One avec Vendor
   */
  @ManyToOne(() => Vendor, (vendor) => vendor.subscriptions, { nullable: false })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column({ name: 'vendor_id' })
  vendorId: string;

  /**
   * Type d'abonnement
   * Dans le MVP, un seul type d'abonnement existe
   * Valeur par défaut : 'standard'
   */
  @Column({ type: 'varchar', length: 50, default: 'standard', name: 'plan_type' })
  planType: string;

  /**
   * Statut de l'abonnement
   * Valeurs possibles : active, cancelled, expired
   */
  @Column({
    type: 'varchar',
    length: 20,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  /**
   * Date de début de l'abonnement
   */
  @Column({ type: 'date', name: 'starts_at' })
  startsAt: Date;

  /**
   * Date de fin de l'abonnement
   * Doit être supérieure à startsAt
   */
  @Column({ type: 'date', name: 'ends_at' })
  endsAt: Date;

  /**
   * Prix de l'abonnement
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * Statut du paiement
   * Valeurs possibles : pending, paid, failed
   */
  @Column({
    type: 'varchar',
    length: 20,
    default: PaymentStatus.PENDING,
    name: 'payment_status',
  })
  paymentStatus: PaymentStatus;

  /**
   * Date de paiement
   * Null tant que le paiement n'a pas été effectué
   */
  @Column({ type: 'timestamp', nullable: true, name: 'payment_date' })
  paymentDate: Date | null;

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



