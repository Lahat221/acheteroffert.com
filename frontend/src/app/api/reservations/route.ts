/**
 * API Route : /api/reservations
 * 
 * Endpoint POST pour créer une nouvelle réservation
 * 
 * Processus :
 * 1. Reçoit les données du formulaire (nom, prénom, email, offerId)
 * 2. Valide les données (champs requis, format email)
 * 3. Crée la réservation avec génération du QR code et du code de réservation
 * 4. Retourne la réservation créée avec toutes les informations
 */
import { NextRequest, NextResponse } from 'next/server';
import { createReservation } from '@/lib/api';
import { ReservationRequest } from '@/types/reservation';

/**
 * Handler POST pour créer une réservation
 * 
 * @param request - La requête HTTP avec les données du formulaire
 * @returns Réponse JSON avec la réservation créée ou un message d'erreur
 */
export async function POST(request: NextRequest) {
  try {
    // Récupère les données JSON du body de la requête
    const body: ReservationRequest = await request.json();

    /**
     * Étape 1 : Validation des champs requis
     * Vérifie que tous les champs obligatoires sont présents
     */
    if (!body.offerId || !body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 } // Code HTTP 400 = Bad Request
      );
    }

    /**
     * Étape 2 : Validation du format email
     * Utilise une expression régulière pour vérifier le format
     * Format attendu : texte@texte.texte
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    /**
     * Étape 3 : Création de la réservation
     * Appelle la fonction createReservation qui :
     * - Génère un ID et un code unique
     * - Récupère l'adresse de l'offre
     * - Calcule la date d'expiration
     * - Génère le QR code
     */
    const reservation = await createReservation(body);

    /**
     * Étape 4 : Retourne la réservation créée
     * Code HTTP 201 = Created (ressource créée avec succès)
     */
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    /**
     * Gestion des erreurs
     * Si une erreur survient (offre introuvable, erreur serveur, etc.)
     * Retourne un message d'erreur générique
     */
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réservation' },
      { status: 500 } // Code HTTP 500 = Internal Server Error
    );
  }
}

