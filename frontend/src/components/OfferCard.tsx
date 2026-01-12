/**
 * Composant OfferCard
 * 
 * Affiche une carte d'offre avec toutes ses informations :
 * - Image, titre, description
 * - Catégorie, ville
 * - Jours et horaires de validité
 * - Stock restant
 * - Badge "BON PLAN" si l'offre est mise en avant
 * - Badge "Bientôt disponible" si l'offre n'est pas encore valide
 */
'use client';

import { Offer } from '@/types/offer';
import Link from 'next/link';
import { useState } from 'react';
import { isOfferCurrentlyValid, getValidDaysText, getValidHoursText, getCategoryLabel } from '@/utils/offerUtils';

/**
 * Props du composant OfferCard
 */
interface OfferCardProps {
  offer: Offer; // L'offre à afficher
  index?: number; // Index pour l'animation d'apparition progressive
}

export default function OfferCard({ offer, index = 0 }: OfferCardProps) {
  // État pour gérer l'effet hover (survol de la souris)
  const [isHovered, setIsHovered] = useState(false);
  
  // Vérifie si l'offre est actuellement valide (jour et heure)
  const isValid = isOfferCurrentlyValid(offer);
  
  // Calcule le stock restant si l'offre a une limite de réservations
  const stockLeft = offer.maxReservations && offer.currentReservations 
    ? offer.maxReservations - offer.currentReservations 
    : null;

  return (
    <div
      style={{
        border: offer.isFeatured ? '2px solid #ff6600' : '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 8px 16px rgba(0,0,0,0.15)'
          : offer.isFeatured
          ? '0 4px 12px rgba(255,102,0,0.2)'
          : '0 2px 8px rgba(0,0,0,0.1)',
        animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Bons Plans */}
      {offer.isFeatured && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#ff6600',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          ⭐ BON PLAN
        </div>
      )}

      {/* Badge Validité */}
      {!isValid && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 10,
          }}
        >
          ⏰ Bientôt disponible
        </div>
      )}

      <div
        style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f0f0f0',
        }}
      >
        <img
          src={offer.image || 'https://via.placeholder.com/400x200?text=Offre'}
          alt={offer.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            opacity: isValid ? 1 : 0.7,
          }}
          onError={(e) => {
            // Si l'image ne charge pas, affiche une image placeholder
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Offre';
          }}
        />
      </div>
      <div style={{ padding: '20px' }}>
        {/* Catégorie */}
        <div
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#ff6600',
          }}
        >
          {getCategoryLabel(offer.category)}
        </div>

        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          {offer.title}
        </h3>

        {offer.description && (
          <p
            style={{
              margin: '0 0 12px 0',
              color: '#666',
              fontSize: '13px',
              lineHeight: '1.4',
            }}
          >
            {offer.description}
          </p>
        )}

        {/* Informations de validité */}
        <div
          style={{
            marginBottom: '12px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#555',
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <strong>📍</strong> {offer.city}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>📅</strong> {getValidDaysText(offer.validDays)}
          </div>
          {(offer.validFromHour !== undefined || offer.validUntilHour !== undefined) && (
            <div>
              <strong>🕐</strong> {getValidHoursText(offer)}
            </div>
          )}
        </div>

        {/* Stock restant */}
        {stockLeft !== null && (
          <div
            style={{
              marginBottom: '12px',
              fontSize: '13px',
              color: stockLeft < 5 ? '#d32f2f' : '#666',
              fontWeight: '500',
            }}
          >
            {stockLeft > 0 ? (
              <>📦 {stockLeft} {stockLeft === 1 ? 'place restante' : 'places restantes'}</>
            ) : (
              <>❌ Plus de places disponibles</>
            )}
          </div>
        )}

        <Link
          href={`/offres/${offer.id}/reservation`}
          style={{
            display: 'inline-block',
            width: '100%',
            padding: '12px 24px',
            backgroundColor: isValid && stockLeft !== 0
              ? (isHovered ? '#ff6600' : '#0070f3')
              : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isValid && stockLeft !== 0 ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            transform: isHovered && isValid && stockLeft !== 0 ? 'scale(1.05)' : 'scale(1)',
            pointerEvents: isValid && stockLeft !== 0 ? 'auto' : 'none',
          }}
        >
          {!isValid ? 'Bientôt disponible' : stockLeft === 0 ? 'Complet' : "Voir l'offre"}
        </Link>
      </div>
    </div>
  );
}

