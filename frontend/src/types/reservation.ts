export interface ReservationRequest {
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ReservationResponse {
  id: string;
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
  qrCode: string;
  reservationCode: string; // Code unique de réservation
  address: string; // Adresse exacte du commerce
  validityDuration: string; // Durée de validité (ex: "2 heures", "Jusqu'à 23h59")
  validUntil: string; // Date/heure d'expiration ISO
  createdAt: string;
}

