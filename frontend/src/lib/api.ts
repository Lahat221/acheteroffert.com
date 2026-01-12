/**
 * API Client - Fonctions pour récupérer les données
 * 
 * Pour l'instant, ces fonctions utilisent des données mockées.
 * Plus tard, elles feront des appels HTTP vers le backend NestJS.
 */
import { Offer } from '@/types/offer';
import { ReservationRequest, ReservationResponse } from '@/types/reservation';

/**
 * Récupère la liste de toutes les offres disponibles
 * 
 * @returns Promise<Offer[]> - Liste des offres
 */
export async function getOffers(): Promise<Offer[]> {
  try {
    // Récupère les offres depuis l'API backend
    const response = await fetch('http://localhost:3001/offers?active=true', {
      cache: 'no-store', // Force le rechargement à chaque fois pour les tests
    });

    if (!response.ok) {
      console.error('Erreur lors de la récupération des offres:', response.statusText);
      return []; // Retourne un tableau vide en cas d'erreur
    }

    const data = await response.json();
    
    // Transforme les données de l'API pour correspondre au type Offer
    const offers: Offer[] = (data.offers || []).map((offer: any) => ({
      id: offer.id,
      title: offer.title,
      image: offer.imageUrl || 'https://via.placeholder.com/400x200?text=Offre',
      city: offer.city,
      category: offer.category || 'autre',
      description: offer.description || '',
      address: offer.address,
      validDays: offer.validDays || [],
      validFromHour: offer.validFromHour,
      validUntilHour: offer.validUntilHour,
      isFeatured: offer.isFeatured || false,
      maxReservations: offer.maxReservations,
      currentReservations: 0, // TODO: Récupérer depuis l'API quand les réservations seront implémentées
    }));

    return offers;
  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error);
    // En cas d'erreur, retourne des données mockées pour le développement
    return [
    // RESTAURATION - Saint-Denis
    {
      id: '1',
      title: 'Tacos King - 1 acheté = 1 offert',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      city: 'Saint-Denis',
      category: 'restauration',
      description: '1 tacos acheté = 1 tacos offert. Parfait pour vider le stock en fin de journée !',
      address: '15 Rue de la République, 93200 Saint-Denis',
      validDays: [1, 2, 3, 4], // Lundi à Jeudi
      validFromHour: 23, // À partir de 23h
      isFeatured: true,
      maxReservations: 20,
      currentReservations: 8,
    },
    {
      id: '2',
      title: 'Pizza Express - 1 pizza achetée = 1 offerte',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      city: 'Saint-Denis',
      category: 'restauration',
      description: 'Profitez de nos pizzas en fin de journée. 1 achetée = 1 offerte',
      address: '42 Avenue du Président Wilson, 93200 Saint-Denis',
      validDays: [1, 2, 3, 4], // Lundi à Jeudi
      validFromHour: 22, // À partir de 22h
      isFeatured: true,
      maxReservations: 15,
      currentReservations: 5,
    },
    {
      id: '3',
      title: 'Burger House - Menu anti-gaspillage',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      city: 'Saint-Denis',
      category: 'restauration',
      description: 'Menu spécial fin de journée. 1 burger acheté = 1 burger offert',
      validDays: [1, 2, 3, 4], // Lundi à Jeudi
      validFromHour: 23,
      isFeatured: false,
      maxReservations: 25,
      currentReservations: 12,
    },
    // HÔTEL - Saint-Denis
    {
      id: '4',
      title: 'Hôtel Central - 2 nuits = 1 nuit offerte',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      city: 'Saint-Denis',
      category: 'hotel',
      description: '2 nuits achetées = 1 nuit offerte. Parfait pour un week-end prolongé !',
      validDays: [1, 2], // Lundi et Mardi
      isFeatured: true,
      maxReservations: 10,
      currentReservations: 3,
    },
    {
      id: '5',
      title: 'Hôtel Plaza - Offre spéciale début de semaine',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
      city: 'Saint-Denis',
      category: 'hotel',
      description: 'Réservez 2 nuits et obtenez 1 nuit gratuite. Valable lundi et mardi',
      validDays: [1, 2], // Lundi et Mardi
      isFeatured: false,
      maxReservations: 8,
      currentReservations: 2,
    },
    // SPA & BIEN-ÊTRE
    {
      id: '6',
      title: 'Spa Relaxation - Soin complet',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      city: 'Saint-Denis',
      category: 'spa',
      description: 'Soin complet à prix réduit en fin de journée',
      validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      validFromHour: 18,
      isFeatured: false,
    },
    // BOULANGERIE - Saint-Denis (Anti-gaspillage)
    {
      id: '7',
      title: 'Boulangerie Le Pain Doré - Gâteaux fin de journée',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      city: 'Saint-Denis',
      category: 'boulangerie',
      description: 'Tous nos gâteaux préparés : 1 acheté = 2 offert. Parfait pour éviter le gaspillage !',
      validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      validFromHour: 18, // À partir de 18h
      isFeatured: true,
      maxReservations: 30,
      currentReservations: 15,
    },
    {
      id: '8',
      title: 'Boulangerie Artisanale - Baguettes du jour',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      city: 'Saint-Denis',
      category: 'boulangerie',
      description: 'Baguettes du jour : 2 achetées = 2 offertes. Valable en fin de journée',
      validDays: [1, 2, 3, 4, 5, 6], // Lundi à Samedi
      validFromHour: 19, // À partir de 19h
      isFeatured: true,
      maxReservations: 40,
      currentReservations: 22,
    },
    {
      id: '9',
      title: 'Pâtisserie Douceur - Pizzas boulangères',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      city: 'Saint-Denis',
      category: 'boulangerie',
      description: 'Pizzas boulangères : 1 achetée = 3 offerte. Évitez le gaspillage !',
      validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      validFromHour: 19, // À partir de 19h
      isFeatured: false,
      maxReservations: 20,
      currentReservations: 8,
    },
    {
      id: '10',
      title: 'Boulangerie du Centre - Viennoiseries',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      city: 'Saint-Denis',
      category: 'boulangerie',
      description: 'Croissants, pains au chocolat, chaussons : 3 achetés = 3 offert',
      validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      validFromHour: 17, // À partir de 17h
      isFeatured: false,
      maxReservations: 35,
      currentReservations: 18,
    },
    {
      id: '11',
      title: 'Boulangerie Tradition - Sandwichs et quiches',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      city: 'Saint-Denis',
      category: 'boulangerie',
      description: 'Sandwichs et quiches du jour : 1 acheté = 1 offert en fin de journée',
      validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      validFromHour: 18, // À partir de 18h
      isFeatured: false,
      maxReservations: 25,
      currentReservations: 12,
    },
    {
      id: '12',
      title: 'Pâtisserie Fine - Pâtisseries du jour',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      city: 'Saint-Denis',
      category: 'boulangerie',
      description: 'Éclairs, tartes, millefeuilles : 2 achetés = 2 offert. Anti-gaspillage !',
      validDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      validFromHour: 17, // À partir de 17h
      isFeatured: true,
      maxReservations: 28,
      currentReservations: 14,
    },
    // LINGERIE - Saint-Denis (Heures creuses)
    {
      id: '13',
      title: 'Boutique Lingerie - Séance d\'essayage',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      city: 'Saint-Denis',
      category: 'lingerie',
      description: '1h de conseil achetée = 30min offerte. Parfait pour les heures creuses !',
      validDays: [2], // Mardi
      validFromHour: 15, // À partir de 15h
      validUntilHour: 17, // Jusqu'à 17h
      isFeatured: true,
      maxReservations: 8,
      currentReservations: 2,
    },
    {
      id: '14',
      title: 'Lingerie Fine - Consultation personnalisée',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      city: 'Saint-Denis',
      category: 'lingerie',
      description: '1h de consultation = 30min offerte. Mardi et jeudi après-midi',
      validDays: [2, 4], // Mardi et Jeudi
      validFromHour: 14,
      validUntilHour: 17,
      isFeatured: false,
      maxReservations: 10,
      currentReservations: 3,
    },
    {
      id: '15',
      title: 'Boutique Intimité - Essayage privé',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      city: 'Saint-Denis',
      category: 'lingerie',
      description: '1h achetée = 30min offerte. Lundi après-midi heures creuses',
      validDays: [1], // Lundi
      validFromHour: 14,
      validUntilHour: 17,
      isFeatured: false,
      maxReservations: 6,
      currentReservations: 1,
    },
    // SALON DE BEAUTÉ - Saint-Denis (Heures creuses)
    {
      id: '16',
      title: 'Salon Beauté Élégance - Soin visage',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      city: 'Saint-Denis',
      category: 'beaute',
      description: '1h de soin achetée = 30min offerte. Mardi entre 15h et 17h',
      validDays: [2], // Mardi
      validFromHour: 15,
      validUntilHour: 17,
      isFeatured: true,
      maxReservations: 12,
      currentReservations: 4,
    },
    {
      id: '17',
      title: 'Coiffure & Beauté - Coupe + Brushing',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      city: 'Saint-Denis',
      category: 'beaute',
      description: '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
      validDays: [3], // Mercredi
      validFromHour: 14,
      validUntilHour: 17,
      isFeatured: false,
      maxReservations: 10,
      currentReservations: 3,
    },
    {
      id: '18',
      title: 'Institut Beauté - Soin complet',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      city: 'Saint-Denis',
      category: 'beaute',
      description: '1h30 de soin = 30min offerte. Jeudi après-midi',
      validDays: [4], // Jeudi
      validFromHour: 15,
      validUntilHour: 17,
      isFeatured: true,
      maxReservations: 8,
      currentReservations: 2,
    },
    {
      id: '19',
      title: 'Salon Coiffure Moderne - Coupe + Soin',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      city: 'Saint-Denis',
      category: 'beaute',
      description: '1h achetée = 30min offerte. Mardi et jeudi après-midi',
      validDays: [2, 4], // Mardi et Jeudi
      validFromHour: 14,
      validUntilHour: 17,
      isFeatured: false,
      maxReservations: 15,
      currentReservations: 6,
    },
    {
      id: '19b',
      title: 'Salon Coiffure Élégance - Coupe + Barber offert',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      city: 'Saint-Denis',
      category: 'beaute',
      description: '1 coupe achetée = 1 barber offert. Mercredi à partir de 15h - Heure creuse',
      validDays: [3], // Mercredi
      validFromHour: 15,
      validUntilHour: 17, // De 15h à 17h
      isFeatured: true,
      maxReservations: 12,
      currentReservations: 4,
    },
    // COACH SPORTIF - Saint-Denis (Heures creuses)
    {
      id: '20',
      title: 'Coach Sportif Pro - Séance personnalisée',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      city: 'Saint-Denis',
      category: 'coach',
      description: '1h de coaching achetée = 30min offerte. Mardi entre 15h et 17h',
      validDays: [2], // Mardi
      validFromHour: 15,
      validUntilHour: 17,
      isFeatured: true,
      maxReservations: 10,
      currentReservations: 3,
    },
    {
      id: '21',
      title: 'Fitness Coach - Entraînement individuel',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      city: 'Saint-Denis',
      category: 'coach',
      description: '1h achetée = 30min offerte. Mercredi après-midi heures creuses',
      validDays: [3], // Mercredi
      validFromHour: 14,
      validUntilHour: 17,
      isFeatured: false,
      maxReservations: 8,
      currentReservations: 2,
    },
    {
      id: '22',
      title: 'Personal Trainer - Séance à domicile',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      city: 'Saint-Denis',
      category: 'coach',
      description: '1h de coaching = 30min offerte. Jeudi après-midi',
      validDays: [4], // Jeudi
      validFromHour: 15,
      validUntilHour: 17,
      isFeatured: false,
      maxReservations: 12,
      currentReservations: 4,
    },
    {
      id: '23',
      title: 'Coach Fitness - Programme personnalisé',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      city: 'Saint-Denis',
      category: 'coach',
      description: '1h achetée = 30min offerte. Mardi et jeudi après-midi',
      validDays: [2, 4], // Mardi et Jeudi
      validFromHour: 14,
      validUntilHour: 17,
      isFeatured: true,
      maxReservations: 15,
      currentReservations: 5,
    },
    // LOISIR
    {
      id: '24',
      title: 'Cinéma Multiplex - 2 places',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
      city: 'Saint-Denis',
      category: 'loisir',
      description: '2 places achetées = 1 place offerte pour les séances de fin de soirée',
      validDays: [1, 2, 3, 4], // Lundi à Jeudi
      validFromHour: 21,
      isFeatured: false,
    },
    ];
  }
}

/**
 * Récupère une offre spécifique par son ID
 * 
 * @param id - L'identifiant unique de l'offre
 * @returns Promise<Offer | null> - L'offre trouvée ou null si non trouvée
 */
export async function getOfferById(id: string): Promise<Offer | null> {
  const offers = await getOffers();
  // Recherche l'offre avec l'ID correspondant
  return offers.find(offer => offer.id === id) || null;
}

/**
 * Crée une nouvelle réservation
 * 
 * @param data - Les données de la réservation (nom, prénom, email, offerId)
 * @returns Promise<ReservationResponse> - La réservation créée avec QR code, code, adresse, etc.
 * 
 * Processus :
 * 1. Récupère l'offre pour obtenir l'adresse
 * 2. Génère un ID et un code de réservation uniques
 * 3. Calcule la date d'expiration selon les horaires de l'offre
 * 4. Génère le QR code avec les données de réservation
 * 5. Retourne toutes les informations nécessaires
 */
export async function createReservation(
  data: ReservationRequest
): Promise<ReservationResponse> {
  // Simule un délai de réseau (sera remplacé par un vrai appel API)
  await new Promise(resolve => setTimeout(resolve, 800));

  // Étape 1 : Récupère l'offre pour obtenir l'adresse et les horaires
  const offer = await getOfferById(data.offerId);
  if (!offer) {
    throw new Error('Offre introuvable');
  }

  // Étape 2 : Génère un ID de réservation unique basé sur le timestamp
  const reservationId = `RES-${Date.now()}`;
  
  // Étape 3 : Génère un code de réservation alphanumérique (6 caractères)
  // Utilisé pour validation rapide sans scanner le QR code
  const reservationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  // Étape 4 : Calcule la date d'expiration de la réservation
  const now = new Date();
  const validUntil = new Date(now);
  
  /**
   * Logique de calcul de la date d'expiration :
   * - Si l'offre a une heure de fin (validUntilHour), la réservation expire à cette heure
   * - Sinon, la réservation est valide jusqu'à la fin de la journée (23h59)
   * - Si l'heure d'expiration est déjà passée aujourd'hui, on la reporte à demain
   */
  if (offer.validUntilHour !== undefined) {
    // L'offre a une heure de fin définie
    validUntil.setHours(offer.validUntilHour, 0, 0, 0);
    // Si l'heure est déjà passée, on reporte à demain
    if (validUntil <= now) {
      validUntil.setDate(validUntil.getDate() + 1);
    }
  } else {
    // Pas d'heure de fin → valide jusqu'à la fin de la journée
    validUntil.setHours(23, 59, 59, 999);
    // Si on est après minuit, on reporte à demain
    if (validUntil <= now) {
      validUntil.setDate(validUntil.getDate() + 1);
    }
  }
  
  /**
   * Étape 5 : Calcule la durée de validité en texte lisible
   * Convertit la différence de temps en heures/jours/minutes
   */
  const hoursUntil = Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60));
  let validityDuration: string;
  
  if (hoursUntil < 1) {
    // Moins d'une heure → affiche en minutes
    const minutesUntil = Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60));
    validityDuration = `${minutesUntil} minutes`;
  } else if (hoursUntil < 24) {
    // Moins de 24h → affiche en heures
    validityDuration = `${hoursUntil} heure${hoursUntil > 1 ? 's' : ''}`;
  } else {
    // Plus de 24h → affiche en jours
    const daysUntil = Math.floor(hoursUntil / 24);
    validityDuration = `${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
  }
  
  /**
   * Étape 6 : Génère les données du QR code
   * Le QR code contient les informations essentielles de la réservation
   * En production, ce sera généré côté serveur avec une bibliothèque dédiée
   */
  const qrCodeData = JSON.stringify({
    reservationId,
    reservationCode,
    offerId: data.offerId,
    email: data.email,
  });

  // Retourne toutes les informations de la réservation
  return {
    id: reservationId,
    offerId: data.offerId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    qrCode: qrCodeData,
    reservationCode,
    address: offer.address || `${offer.city}`, // Adresse exacte ou au moins la ville
    validityDuration,
    validUntil: validUntil.toISOString(),
    createdAt: new Date().toISOString(),
  };
}
