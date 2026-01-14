/**
 * Statuts possibles d'une réservation
 */
export enum ReservationStatus {
  PENDING = 'pending',      // En attente de confirmation
  CONFIRMED = 'confirmed',  // Confirmée
  USED = 'used',            // Utilisée (QR code scanné)
  CANCELLED = 'cancelled',  // Annulée
}







