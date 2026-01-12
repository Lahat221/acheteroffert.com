/**
 * Entité Reservation (Réservation)
 * 
 * Représente une réservation effectuée par un client.
 * Les clients n'ont pas de compte, leurs informations sont stockées directement ici.
 * Chaque réservation génère un QR code unique.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Offer } from '../../products/entities/offer.entity';
import { QRCode } from '../../qrcodes/entities/qrcode.entity';
import { ReservationStatus } from '../../common/enums/reservation-status.enum';

@Entity('reservations')
@Index(['email'])
@Index(['offerId'])
@Index(['status'])
export class Reservation {
  /**
   * Identifiant unique de la réservation (UUID)
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Référence à l'offre réservée
   * Relation Many-to-One avec Offer
   */
  @ManyToOne(() => Offer, (offer) => offer.reservations, { nullable: false })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;

  @Column({ name: 'offer_id' })
  offerId: string;

  /**
   * Prénom du client
   * Stocké directement (pas de table client)
   */
  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName: string;

  /**
   * Nom du client
   */
  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  /**
   * Email du client
   * Utilisé pour identifier le client et lui envoyer la confirmation
   */
  @Column({ type: 'varchar', length: 255 })
  email: string;

  /**
   * Statut de la réservation
   * Valeurs possibles : pending, confirmed, used, cancelled
   */
  @Column({
    type: 'varchar',
    length: 20,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  /**
   * Date de réservation
   * Générée automatiquement à la création
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'reserved_at' })
  reservedAt: Date;

  /**
   * Date d'utilisation (quand le QR code est scanné)
   * Null tant que la réservation n'a pas été utilisée
   */
  @Column({ type: 'timestamp', nullable: true, name: 'used_at' })
  usedAt: Date | null;

  /**
   * Code de réservation unique
   * Généré automatiquement, utilisé pour identifier la réservation
   * Exemple : "RES-ABC123XYZ"
   */
  @Column({ type: 'varchar', length: 50, unique: true, name: 'reservation_code' })
  reservationCode: string;

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
   * Relation : Une réservation a un QR code unique
   * Relation One-to-One avec QRCode
   */
  @OneToOne(() => QRCode, (qrCode) => qrCode.reservation)
  qrCode: QRCode;
}



