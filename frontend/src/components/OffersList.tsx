/**
 * Composant OffersList
 * 
 * Gère l'affichage de la liste des offres avec :
 * - Filtres par catégorie et ville
 * - Séparation entre "Bons Plans" (mis en avant) et autres offres
 * - Grille responsive pour l'affichage
 */
'use client';

import { useState, useMemo } from 'react';
import { Offer, OfferCategory } from '@/types/offer';
import OfferCard from './OfferCard';
import OfferFilters from './OfferFilters';

/**
 * Props du composant OffersList
 */
interface OffersListProps {
  initialOffers: Offer[]; // Liste initiale des offres à afficher
}

export default function OffersList({ initialOffers }: OffersListProps) {
  // État pour le filtre de catégorie sélectionné
  const [selectedCategory, setSelectedCategory] = useState<OfferCategory | 'all'>('all');
  
  // État pour le filtre de ville sélectionné
  const [selectedCity, setSelectedCity] = useState<string>('all');

  /**
   * Extrait la liste des villes uniques depuis les offres
   * Utilise useMemo pour éviter de recalculer à chaque rendu
   * Utilise Set pour éliminer les doublons, puis trie par ordre alphabétique
   */
  const cities = useMemo(() => {
    const uniqueCities = new Set(initialOffers.map(offer => offer.city));
    return Array.from(uniqueCities).sort();
  }, [initialOffers]);

  /**
   * Filtre les offres selon les critères sélectionnés
   * Utilise useMemo pour ne recalculer que si les filtres ou les offres changent
   */
  const filteredOffers = useMemo(() => {
    // Crée une copie de la liste initiale pour ne pas modifier l'original
    let filtered = [...initialOffers];

    // Filtre par catégorie si une catégorie spécifique est sélectionnée
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(offer => offer.category === selectedCategory);
    }

    // Filtre par ville si une ville spécifique est sélectionnée
    if (selectedCity !== 'all') {
      filtered = filtered.filter(offer => offer.city === selectedCity);
    }

    /**
     * Trie les offres : les "Bons Plans" (isFeatured) en premier
     * - Si a est featured et b ne l'est pas : a vient avant (-1)
     * - Si b est featured et a ne l'est pas : b vient avant (1)
     * - Sinon : ordre inchangé (0)
     */
    return filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [initialOffers, selectedCategory, selectedCity]);

  /**
   * Sépare les offres en deux groupes :
   * - Les "Bons Plans" (mises en avant)
   * - Les autres offres
   */
  const featuredOffers = filteredOffers.filter(offer => offer.isFeatured);
  const regularOffers = filteredOffers.filter(offer => !offer.isFeatured);

  return (
    <>
      {/* Filtres */}
      <OfferFilters
        selectedCategory={selectedCategory}
        selectedCity={selectedCity}
        onCategoryChange={setSelectedCategory}
        onCityChange={setSelectedCity}
        cities={cities}
      />

      {/* Section Bons Plans */}
      {featuredOffers.length > 0 && (
        <section style={{ marginBottom: '60px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
              paddingBottom: '20px',
              borderBottom: '3px solid #ff6600',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)',
              }}
            >
              ⭐
            </div>
            <div>
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '800',
                color: '#000000',
                margin: 0,
                background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Bons Plans
            </h2>
            <p style={{ margin: '4px 0 0 0', color: '#4A4A4A', fontSize: 'clamp(12px, 2vw, 14px)' }}>
                Les meilleures offres sélectionnées pour vous
              </p>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                backgroundColor: 'rgba(255, 102, 0, 0.1)',
                color: '#ff6600',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '700',
                border: '2px solid rgba(255, 102, 0, 0.2)',
              }}
            >
              {featuredOffers.length} {featuredOffers.length === 1 ? 'offre' : 'offres'}
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {featuredOffers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Section Toutes les offres */}
      {regularOffers.length > 0 && (
        <section>
          {featuredOffers.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h2
                style={{
                  fontSize: 'clamp(22px, 3.5vw, 28px)',
                  fontWeight: '700',
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                📋 Toutes les offres
              </h2>
              <p style={{ color: '#4A4A4A', fontSize: 'clamp(12px, 2vw, 14px)', margin: 0 }}>
                Explorez toutes nos offres disponibles
              </p>
            </div>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {regularOffers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Message si aucune offre */}
      {filteredOffers.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666',
          }}
        >
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>
            Aucune offre ne correspond à vos critères
          </p>
          <p style={{ fontSize: '14px' }}>
            Essayez de modifier vos filtres
          </p>
        </div>
      )}
    </>
  );
}

