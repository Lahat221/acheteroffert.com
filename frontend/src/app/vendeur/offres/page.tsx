/**
 * Page de gestion complète des offres du vendeur
 * 
 * Affiche toutes les offres avec :
 * - Filtres (catégorie, statut, bons plans)
 * - Recherche
 * - Statistiques détaillées
 * - Actions (modifier, activer/désactiver)
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { API_URL } from '@/config/api';

interface Vendor {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
}

interface Offer {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  city: string;
  isActive: boolean;
  isFeatured: boolean;
  maxReservations: number | null;
  createdAt: string;
  imageUrl: string | null;
}

export default function VendorOffersPage() {
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');

  useEffect(() => {
    const vendorData = localStorage.getItem('vendor');
    if (!vendorData) {
      router.push('/vendeur/login');
      return;
    }

    const vendorObj = JSON.parse(vendorData);
    setVendor(vendorObj);
    loadVendorOffers(vendorObj.id);
  }, [router]);

  useEffect(() => {
    // Applique les filtres
    let filtered = [...offers];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(offer =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(offer => offer.category === categoryFilter);
    }

    // Filtre par statut
    if (statusFilter === 'active') {
      filtered = filtered.filter(offer => offer.isActive);
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(offer => !offer.isActive);
    }

    // Filtre par bons plans
    if (featuredFilter === 'featured') {
      filtered = filtered.filter(offer => offer.isFeatured);
    } else if (featuredFilter === 'not-featured') {
      filtered = filtered.filter(offer => !offer.isFeatured);
    }

    setFilteredOffers(filtered);
  }, [offers, searchTerm, categoryFilter, statusFilter, featuredFilter]);

  const loadVendorOffers = async (vendorId: string) => {
    try {
      const response = await fetch(`${API_URL}/offers?vendorId=${vendorId}&limit=0&active=`);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOffers(data.offers || []);
    } catch (error: any) {
      console.error('Erreur lors du chargement des offres:', error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(offers.map(o => o.category).filter(Boolean)));

  if (loading || !vendor) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Bouton retour */}
        <Link
          href="/vendeur/dashboard"
          style={{
            display: 'inline-block',
            color: '#ff6600',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px',
            padding: '8px 16px',
            backgroundColor: '#fff5f0',
            borderRadius: '6px',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff6600';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff5f0';
            e.currentTarget.style.color = '#ff6600';
          }}
        >
          ← Retour au dashboard
        </Link>

        {/* En-tête */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              📋 Gestion de mes offres
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              {offers.length} offre{offers.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <Link
            href="/vendeur/offres/nouvelle"
            style={{
              padding: '14px 28px',
              backgroundColor: '#ff6600',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff8533';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6600';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ➕ Nouvelle offre
          </Link>
        </div>

        {/* Statistiques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10B981', marginBottom: '5px' }}>
              {offers.filter(o => o.isActive).length}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>Actives</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '5px' }}>
              {offers.filter(o => !o.isActive).length}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>Inactives</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#FF6600', marginBottom: '5px' }}>
              {offers.filter(o => o.isFeatured).length}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>Bons plans</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '5px' }}>
              {categories.length}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>Catégories</div>
          </div>
        </div>

        {/* Diagramme de suivi */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '25px' }}>
            📊 Diagramme de suivi
          </h2>
          
          {/* Graphique en barres - Répartition par catégorie */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
              Répartition par catégorie
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categories.map(category => {
                const categoryOffers = offers.filter(o => o.category === category);
                const percentage = offers.length > 0 ? (categoryOffers.length / offers.length) * 100 : 0;
                return (
                  <div key={category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                        {category || 'Sans catégorie'}
                      </span>
                      <span style={{ fontSize: '13px', color: '#666' }}>
                        {categoryOffers.length} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #ff6600 0%, #ff8533 100%)',
                          borderRadius: '10px',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Graphique circulaire - Statut */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
              Statut des offres
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: `conic-gradient(#10B981 0% ${offers.length > 0 ? (offers.filter(o => o.isActive).length / offers.length) * 100 : 0}%, #f0f0f0 ${offers.length > 0 ? (offers.filter(o => o.isActive).length / offers.length) * 100 : 0}% 100%)`,
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#10B981',
                  }}>
                    {offers.length > 0 ? Math.round((offers.filter(o => o.isActive).length / offers.length) * 100) : 0}%
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Actives</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: `conic-gradient(#F59E0B 0% ${offers.length > 0 ? (offers.filter(o => !o.isActive).length / offers.length) * 100 : 0}%, #f0f0f0 ${offers.length > 0 ? (offers.filter(o => !o.isActive).length / offers.length) * 100 : 0}% 100%)`,
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#F59E0B',
                  }}>
                    {offers.length > 0 ? Math.round((offers.filter(o => !o.isActive).length / offers.length) * 100) : 0}%
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Inactives</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: `conic-gradient(#ff6600 0% ${offers.length > 0 ? (offers.filter(o => o.isFeatured).length / offers.length) * 100 : 0}%, #f0f0f0 ${offers.length > 0 ? (offers.filter(o => o.isFeatured).length / offers.length) * 100 : 0}% 100%)`,
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#ff6600',
                  }}>
                    {offers.length > 0 ? Math.round((offers.filter(o => o.isFeatured).length / offers.length) * 100) : 0}%
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Bons plans</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {/* Recherche */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                🔍 Recherche
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Titre, description, ville..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Catégorie */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                📂 Catégorie
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="all">Toutes</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Statut */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                📊 Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="all">Toutes</option>
                <option value="active">Actives</option>
                <option value="inactive">Inactives</option>
              </select>
            </div>

            {/* Bons plans */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                ⭐ Bons plans
              </label>
              <select
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="all">Toutes</option>
                <option value="featured">Bons plans uniquement</option>
                <option value="not-featured">Hors bons plans</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des offres */}
        <div>
          <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
            {filteredOffers.length} offre{filteredOffers.length > 1 ? 's' : ''} trouvée{filteredOffers.length > 1 ? 's' : ''}
          </div>

          {filteredOffers.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '18px', color: '#666' }}>
                Aucune offre ne correspond à vos critères
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredOffers.map((offer) => (
                <div key={offer.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: offer.isActive ? '2px solid transparent' : '2px solid #e0e0e0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* Image de l'offre */}
                  {offer.imageUrl && (
                    <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0', position: 'relative' }}>
                      <img
                        src={offer.imageUrl}
                        alt={offer.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                        onError={(e) => {
                          // Si l'image ne charge pas, affiche un placeholder
                          e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Offre';
                        }}
                      />
                      {!offer.isActive && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', padding: '4px 8px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                          Inactive
                        </div>
                      )}
                      {offer.isFeatured && (
                        <div style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 12px', backgroundColor: '#ff6600', color: 'white', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                          ⭐ Bon plan
                        </div>
                      )}
                    </div>
                  )}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0, flex: 1 }}>
                        {offer.title}
                      </h3>
                      {!offer.imageUrl && !offer.isActive && (
                        <span style={{ padding: '4px 8px', backgroundColor: '#e0e0e0', color: '#666', borderRadius: '4px', fontSize: '11px', fontWeight: '600', marginLeft: '10px' }}>
                          Inactive
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                      {offer.category || 'Sans catégorie'} • {offer.city}
                    </p>
                    {offer.description && (
                      <p style={{ color: '#888', fontSize: '13px', marginBottom: '10px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                        {offer.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                      {!offer.imageUrl && offer.isFeatured && (
                        <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#ff6600', color: 'white', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                          ⭐ Bon plan
                        </span>
                      )}
                      {offer.maxReservations && (
                        <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#f0f0f0', color: '#666', borderRadius: '4px', fontSize: '12px' }}>
                          Max: {offer.maxReservations}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #f0f0f0', gap: '10px', flexWrap: 'wrap' }}>
                      <Link
                        href={`/vendeur/offres/${offer.id}`}
                        style={{
                          color: '#ff6600',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '14px',
                          padding: '8px 16px',
                          backgroundColor: '#fff5f0',
                          borderRadius: '6px',
                          transition: 'all 0.3s',
                          display: 'inline-block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ff6600';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fff5f0';
                          e.currentTarget.style.color = '#ff6600';
                        }}
                      >
                        📋 Gérer
                      </Link>
                      <span style={{ color: '#999', fontSize: '12px' }}>
                        {new Date(offer.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

