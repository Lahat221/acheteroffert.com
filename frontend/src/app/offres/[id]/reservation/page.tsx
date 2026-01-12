/**
 * Page de réservation
 * 
 * Route dynamique : /offres/[id]/reservation
 * 
 * Fonctionnalités :
 * 1. Formulaire de réservation (nom, prénom, email)
 * 2. Soumission vers l'API pour créer la réservation
 * 3. Affichage de la confirmation avec :
 *    - QR code scannable
 *    - Code de réservation
 *    - Adresse du commerce
 *    - Durée de validité
 * 
 * Note : Pas d'authentification client requise
 */
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReservationRequest, ReservationResponse } from '@/types/reservation';
import QRCode from 'qrcode.react';

export default function ReservationPage() {
  // Récupère l'ID de l'offre depuis l'URL (route dynamique)
  const params = useParams();
  const router = useRouter();
  const offerId = params.id as string;

  // État du formulaire avec les données du client
  const [formData, setFormData] = useState<ReservationRequest>({
    offerId,
    firstName: '',
    lastName: '',
    email: '',
  });

  // États pour gérer le processus de réservation
  const [isSubmitting, setIsSubmitting] = useState(false); // Indique si la soumission est en cours
  const [reservation, setReservation] = useState<ReservationResponse | null>(null); // Réservation créée
  const [error, setError] = useState<string | null>(null); // Message d'erreur éventuel

  /**
   * Gère la soumission du formulaire de réservation
   * 
   * Processus :
   * 1. Empêche le rechargement de la page (preventDefault)
   * 2. Envoie les données à l'API /api/reservations
   * 3. Si succès : affiche la confirmation avec QR code
   * 4. Si erreur : affiche le message d'erreur
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setIsSubmitting(true); // Active l'état de chargement
    setError(null); // Réinitialise les erreurs précédentes

    try {
      // Appel à l'API pour créer la réservation
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envoie les données du formulaire
      });

      // Vérifie si la réponse est OK (status 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la réservation');
      }

      // Récupère les données de la réservation créée
      const data = await response.json();
      setReservation(data); // Affiche la page de confirmation
    } catch (err) {
      // Affiche l'erreur à l'utilisateur
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      // Désactive l'état de chargement dans tous les cas
      setIsSubmitting(false);
    }
  };

  /**
   * Gère les changements dans les champs du formulaire
   * Met à jour l'état formData avec la nouvelle valeur
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Met à jour le champ modifié
    });
  };

  /**
   * Affichage de la page de confirmation après réservation réussie
   * 
   * Affiche :
   * - QR code scannable
   * - Code de réservation (pour validation alternative)
   * - Adresse exacte du commerce
   * - Durée de validité et date d'expiration
   * - Instructions d'utilisation
   */
  if (reservation) {
    // Formate la date d'expiration en français pour l'affichage
    const validUntilDate = new Date(reservation.validUntil);
    const formattedDate = validUntilDate.toLocaleDateString('fr-FR', {
      weekday: 'long', // Jour de la semaine (ex: "mardi")
      year: 'numeric',
      month: 'long', // Mois en toutes lettres (ex: "décembre")
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px',
            }}
          >
            ✓
          </div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#333' }}>
            Réservation confirmée !
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Votre réservation est prête
          </p>
        </div>

        {/* QR Code */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '2px solid #e0e0e0',
          }}
        >
          <QRCode
            value={reservation.qrCode}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Code de réservation */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '2px dashed #ff6600',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#666', fontWeight: '500' }}>
              Code de réservation
            </p>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#ff6600',
                letterSpacing: '4px',
                fontFamily: 'monospace',
              }}
            >
              {reservation.reservationCode}
            </p>
          </div>
        </div>

        {/* Informations de réservation */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '12px',
            }}
          >
            📋 Informations de réservation
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', fontWeight: '500' }}>
                Nom complet
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#333', fontWeight: '600' }}>
                {reservation.firstName} {reservation.lastName}
              </p>
            </div>

            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', fontWeight: '500' }}>
                Email
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#333' }}>
                {reservation.email}
              </p>
            </div>

            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', fontWeight: '500' }}>
                📍 Adresse
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#333', fontWeight: '500' }}>
                {reservation.address}
              </p>
            </div>

            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', fontWeight: '500' }}>
                ⏰ Durée de validité
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#333', fontWeight: '500' }}>
                {reservation.validityDuration}
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
                Valable jusqu'au {formattedDate}
              </p>
            </div>

            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', fontWeight: '500' }}>
                ID de réservation
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#999', fontFamily: 'monospace' }}>
                {reservation.id}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            backgroundColor: '#fff9e6',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #ffd700',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
            <strong>💡 Important :</strong> Présentez votre QR code ou votre code de réservation{' '}
            <strong>{reservation.reservationCode}</strong> au commerce. Votre réservation est valable{' '}
            <strong>{reservation.validityDuration}</strong>.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#ff6600',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff8533';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ff6600';
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>
        Réserver une offre
      </h1>

      {error && (
        <div
          style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="firstName"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Prénom *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="lastName"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Nom *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isSubmitting ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          {isSubmitting ? 'Traitement...' : 'Réserver'}
        </button>
      </form>
    </div>
  );
}

