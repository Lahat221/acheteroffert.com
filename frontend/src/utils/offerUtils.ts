/**
 * Utilitaires pour les offres
 * 
 * Contient des fonctions helper pour :
 * - Vérifier la validité d'une offre (jours, horaires, stock)
 * - Formater les jours et horaires de validité
 * - Obtenir les labels des catégories
 */
import { Offer } from '@/types/offer';

/**
 * Vérifie si une offre est actuellement valide selon les jours et horaires
 * 
 * @param offer - L'offre à vérifier
 * @returns true si l'offre est valide maintenant, false sinon
 * 
 * Logique de validation :
 * 1. Vérifie si le jour actuel est dans validDays
 * 2. Vérifie si l'heure actuelle est >= validFromHour (si défini)
 * 3. Vérifie si l'heure actuelle est < validUntilHour (si défini)
 * 4. Vérifie si le stock n'est pas épuisé (si maxReservations est défini)
 */
export function isOfferCurrentlyValid(offer: Offer): boolean {
  const now = new Date();
  // getDay() retourne 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
  const currentDay = now.getDay();
  // getHours() retourne l'heure actuelle (0-23)
  const currentHour = now.getHours();

  // Étape 1 : Vérifier si le jour actuel est dans la liste des jours valides
  if (!offer.validDays.includes(currentDay)) {
    return false; // L'offre n'est pas valide aujourd'hui
  }

  // Étape 2 : Vérifier l'heure de début (si définie)
  // L'offre n'est valide qu'à partir de cette heure
  if (offer.validFromHour !== undefined && currentHour < offer.validFromHour) {
    return false; // On n'a pas encore atteint l'heure de début
  }

  // Étape 3 : Vérifier l'heure de fin (si définie)
  // L'offre n'est plus valide après cette heure
  if (offer.validUntilHour !== undefined && currentHour >= offer.validUntilHour) {
    return false; // On a dépassé l'heure de fin
  }

  // Étape 4 : Vérifier le stock restant (si une limite est définie)
  if (offer.maxReservations && offer.currentReservations) {
    if (offer.currentReservations >= offer.maxReservations) {
      return false; // Plus de places disponibles
    }
  }

  // Si toutes les vérifications passent, l'offre est valide
  return true;
}

/**
 * Retourne un texte descriptif des jours de validité
 * 
 * @param validDays - Tableau des jours valides (0=dimanche, 1=lundi, ..., 6=samedi)
 * @returns Texte formaté (ex: "Lundi et Mardi", "Lundi, Mardi, Mercredi")
 * 
 * Exemples :
 * - [1, 2] → "Lundi et Mardi"
 * - [1, 2, 3, 4] → "Lundi, Mardi, Mercredi, Jeudi"
 * - [1] → "Le Lundi"
 * - [] ou [0,1,2,3,4,5,6] → "Tous les jours"
 */
export function getValidDaysText(validDays: number[]): string {
  // Noms des jours en français
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  
  // Trie les jours pour un affichage cohérent
  const sortedDays = [...validDays].sort();
  
  // Cas spéciaux : aucun jour ou tous les jours
  if (sortedDays.length === 0) return 'Tous les jours';
  if (sortedDays.length === 7) return 'Tous les jours';
  
  // Convertit les numéros de jours en noms
  const dayTexts = sortedDays.map(day => dayNames[day]);
  
  // Formatage selon le nombre de jours
  if (sortedDays.length === 1) {
    return `Le ${dayTexts[0]}`; // "Le Lundi"
  }
  
  if (sortedDays.length === 2) {
    return `${dayTexts[0]} et ${dayTexts[1]}`; // "Lundi et Mardi"
  }
  
  // Plus de 2 jours : séparés par des virgules
  return dayTexts.join(', '); // "Lundi, Mardi, Mercredi"
}

/**
 * Retourne un texte descriptif des horaires de validité
 * 
 * @param offer - L'offre avec ses horaires de validité
 * @returns Texte formaté selon les horaires définis
 * 
 * Exemples :
 * - Aucun horaire → "Toute la journée"
 * - Seulement heure de début → "À partir de 23h"
 * - Seulement heure de fin → "Jusqu'à 17h"
 * - Les deux → "De 15h à 17h"
 */
export function getValidHoursText(offer: Offer): string {
  // Cas 1 : Aucun horaire défini → valide toute la journée
  if (offer.validFromHour === undefined && offer.validUntilHour === undefined) {
    return 'Toute la journée';
  }
  
  // Cas 2 : Seulement heure de début définie
  if (offer.validFromHour !== undefined && offer.validUntilHour === undefined) {
    return `À partir de ${offer.validFromHour}h`;
  }
  
  // Cas 3 : Seulement heure de fin définie
  if (offer.validFromHour === undefined && offer.validUntilHour !== undefined) {
    return `Jusqu'à ${offer.validUntilHour}h`;
  }
  
  // Cas 4 : Les deux horaires sont définis → plage horaire
  return `De ${offer.validFromHour}h à ${offer.validUntilHour}h`;
}

/**
 * Retourne le label formaté d'une catégorie avec son emoji
 * 
 * @param category - La catégorie de l'offre
 * @returns Le label formaté (ex: "🍔 Restauration")
 * 
 * Utilisé pour afficher les catégories de manière visuelle et cohérente
 * dans toute l'application.
 */
export function getCategoryLabel(category: Offer['category']): string {
  // Mapping des catégories vers leurs labels avec emojis
  const labels: Record<Offer['category'], string> = {
    restauration: '🍔 Restauration',
    boulangerie: '🥖 Boulangerie',
    hotel: '🏨 Hôtel',
    spa: '💆 Spa & Bien-être',
    loisir: '🎮 Loisir',
    lingerie: '👙 Lingerie',
    beaute: '💄 Beauté & Coiffure',
    coach: '💪 Coach Sportif',
    autre: '📦 Autre',
  };
  
  // Retourne le label si trouvé, sinon retourne la catégorie telle quelle
  return labels[category] || category;
}

