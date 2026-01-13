/**
 * Composant OfferFilters
 * 
 * Affiche les filtres pour filtrer les offres par :
 * - Catégorie (restauration, boulangerie, hôtel, etc.)
 * - Ville (Saint-Denis, etc.)
 * 
 * Les filtres sont contrôlés par le composant parent (OffersList)
 * qui reçoit les changements via les callbacks onCategoryChange et onCityChange
 */
'use client';

import { OfferCategory } from '@/types/offer';
import { getCategoryLabel } from '@/utils/offerUtils';

/**
 * Props du composant OfferFilters
 */
interface OfferFiltersProps {
  selectedCategory: OfferCategory | 'all'; // Catégorie actuellement sélectionnée
  selectedCity: string; // Ville actuellement sélectionnée
  onCategoryChange: (category: OfferCategory | 'all') => void; // Callback quand la catégorie change
  onCityChange: (city: string) => void; // Callback quand la ville change
  cities: string[]; // Liste des villes disponibles
}

export default function OfferFilters({
  selectedCategory,
  selectedCity,
  onCategoryChange,
  onCityChange,
  cities,
}: OfferFiltersProps) {
  // Liste de toutes les catégories disponibles (y compris "Toutes")
  const categories: (OfferCategory | 'all')[] = ['all', 'restauration', 'boulangerie', 'hotel', 'spa', 'loisir', 'lingerie', 'beaute', 'coach', 'autre'];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        padding: '20px',
        borderRadius: '16px',
        marginBottom: '40px',
        boxShadow: '0 4px 20px rgba(44, 62, 80, 0.08)',
        border: '1px solid rgba(255, 102, 0, 0.15)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        >
          🔍
        </div>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#000000',
            margin: 0,
          }}
        >
          Filtrer les offres
        </h3>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'flex-end',
        }}
      >
        {/* Filtre par catégorie */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1 1 250px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
            📂 Catégorie
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as OfferCategory | 'all')}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              border: '2px solid #E0E0E0',
              fontSize: '15px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 102, 0, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E0E0E0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Toutes les catégories' : getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par ville */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1 1 250px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
            📍 Ville
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              border: '2px solid #E0E0E0',
              fontSize: '15px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 102, 0, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E0E0E0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <option value="all">Toutes les villes</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

