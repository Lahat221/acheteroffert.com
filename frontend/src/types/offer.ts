export type OfferCategory = 'restauration' | 'boulangerie' | 'hotel' | 'spa' | 'loisir' | 'lingerie' | 'beaute' | 'coach' | 'autre';

export interface Offer {
  id: string;
  title: string;
  image: string;
  city: string;
  category: OfferCategory;
  description?: string;
  address?: string; // Adresse exacte du commerce
  // Règles de validité
  validDays: number[]; // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  validFromHour?: number; // Heure de début (0-23), optionnel
  validUntilHour?: number; // Heure de fin (0-23), optionnel
  // Mise en avant
  isFeatured: boolean; // Bons plans mis en avant
  // Stock/limite
  maxReservations?: number; // Nombre maximum de réservations
  currentReservations?: number; // Nombre actuel de réservations
}

