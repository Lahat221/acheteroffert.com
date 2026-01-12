/**
 * Entité QRCode
 * 
 * Représente un QR code généré pour une réservation.
 * Un QR code est utilisable une seule fois et est lié à une réservation unique.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('qr_codes')
@Index(['code'], { unique: true })
@Index(['reservationId'], { unique: true })
@Index(['isUsed'])
export class QRCode {
  /**
   * Identifiant unique du QR code (UUID)
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Référence à la réservation associée
   * Relation One-to-One avec Reservation
   * Unique : un QR code = une réservation
   */
  @OneToOne(() => Reservation, (reservation) => reservation.qrCode, {
    nullable: false,
  })
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @Column({ name: 'reservation_id', unique: true })
  reservationId: string;

  /**
   * Code unique du QR code
   * Généré automatiquement (UUID ou hash)
   * Utilisé pour la validation rapide lors du scan
   */
  @Column({ type: 'varchar', length: 255, unique: true })
  code: string;

  /**
   * Données encodées dans le QR code (JSON)
   * Contient les informations de la réservation
   * Exemple : { reservationId, offerId, reservationCode, ... }
   */
  @Column({ type: 'text' })
  data: string;

  /**
   * Indique si le QR code a été utilisé
   * Une fois utilisé (true), le QR code ne peut plus être validé
   */
  @Column({ type: 'boolean', default: false, name: 'is_used' })
  isUsed: boolean;

  /**
   * Date d'utilisation (quand le QR code est scanné)
   * Null tant que le QR code n'a pas été utilisé
   */
  @Column({ type: 'timestamp', nullable: true, name: 'used_at' })
  usedAt: Date | null;

  /**
   * Date d'expiration (optionnel)
   * Si null, le QR code n'expire pas (ou expiration gérée par la réservation)
   */
  @Column({ type: 'timestamp', nullable: true, name: 'expires_at' })
  expiresAt: Date | null;

  /**
   * Date de création (générée automatiquement)
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}



