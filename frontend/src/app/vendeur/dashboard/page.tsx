/**
 * Dashboard vendeur
 * 
 * Page principale de l'espace vendeur avec :
 * - Statistiques (nombre d'offres, réservations, etc.)
 * - Liste des offres du vendeur
 * - Actions rapides
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
  city?: string;
}

export default function VendorDashboardPage() {
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [offers, setOffers] = useState<Array<{
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
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifie si le vendeur est connecté
    const vendorData = localStorage.getItem('vendor');
    if (!vendorData) {
      router.push('/vendeur/login');
      return;
    }

    const vendorObj = JSON.parse(vendorData);
    setVendor(vendorObj);

    // Charge les offres du vendeur
    loadVendorOffers(vendorObj.id);
  }, [router]);

  /**
   * Charge les offres du vendeur depuis l'API
   * Récupère TOUTES les offres du vendeur (sans limite de pagination)
   */
  const loadVendorOffers = async (vendorId: string) => {
    try {
      // Récupère toutes les offres du vendeur (limit=0 = pas de limite)
      const response = await fetch(`${API_URL}/offers?vendorId=${vendorId}&limit=0&active=true`);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOffers(data.offers || []);
      console.log(`✅ ${data.offers?.length || 0} offres chargées pour le vendeur`);
    } catch (error: any) {
      console.error('Erreur lors du chargement des offres:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('⚠️ Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur le port 3001.');
      }
      setOffers([]); // Affiche une liste vide en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion du vendeur
   */
  const handleLogout = () => {
    localStorage.removeItem('vendor');
    localStorage.removeItem('vendorToken');
    router.push('/vendeur/login');
  };

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
          href="/"
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
          ← Retour à l'accueil
        </Link>

        {/* En-tête du dashboard */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              👋 Bienvenue, {vendor.firstName} !
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              {vendor.companyName} {vendor.city && `• ${vendor.city}`}
            </p>
          </div>
          <div>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#fff',
                color: '#ff6600',
                border: '2px solid #ff6600',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6600';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#ff6600';
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              {offers.length}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Total offres</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981', marginBottom: '10px' }}>
              {offers.filter(o => o.isActive).length}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Offres actives</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              {offers.filter(o => o.isFeatured).length}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Bons plans</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '10px' }}>
              {new Set(offers.map(o => o.category)).size}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Catégories</div>
          </div>
        </div>

        {/* Diagramme de suivi des offres */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '25px' }}>
            📊 Suivi de mes offres
          </h2>
          
          {/* Graphique en barres - Répartition par catégorie */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              Répartition par catégorie
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {Array.from(new Set(offers.map(o => o.category).filter(Boolean))).map(category => {
                const categoryOffers = offers.filter(o => o.category === category);
                const percentage = offers.length > 0 ? (categoryOffers.length / offers.length) * 100 : 0;
                return (
                  <div key={category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                        {category || 'Sans catégorie'}
                      </span>
                      <span style={{ fontSize: '14px', color: '#666' }}>
                        {categoryOffers.length} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '24px', backgroundColor: '#f0f0f0', borderRadius: '12px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #ff6600 0%, #ff8533 100%)',
                          borderRadius: '12px',
                          transition: 'width 0.5s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '8px',
                        }}
                      >
                        {percentage > 10 && (
                          <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>
                            {categoryOffers.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Graphique circulaire - Statut des offres */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              Statut des offres
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: `conic-gradient(#10B981 0% ${(offers.filter(o => o.isActive).length / offers.length) * 100}%, #f0f0f0 ${(offers.filter(o => o.isActive).length / offers.length) * 100}% 100%)`,
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#10B981',
                  }}>
                    {offers.length > 0 ? Math.round((offers.filter(o => o.isActive).length / offers.length) * 100) : 0}%
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>Actives</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{offers.filter(o => o.isActive).length} offres</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: `conic-gradient(#F59E0B 0% ${(offers.filter(o => !o.isActive).length / offers.length) * 100}%, #f0f0f0 ${(offers.filter(o => !o.isActive).length / offers.length) * 100}% 100%)`,
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#F59E0B',
                  }}>
                    {offers.length > 0 ? Math.round((offers.filter(o => !o.isActive).length / offers.length) * 100) : 0}%
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>Inactives</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{offers.filter(o => !o.isActive).length} offres</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: `conic-gradient(#ff6600 0% ${(offers.filter(o => o.isFeatured).length / offers.length) * 100}%, #f0f0f0 ${(offers.filter(o => o.isFeatured).length / offers.length) * 100}% 100%)`,
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#ff6600',
                  }}>
                    {offers.length > 0 ? Math.round((offers.filter(o => o.isFeatured).length / offers.length) * 100) : 0}%
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>Bons plans</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{offers.filter(o => o.isFeatured).length} offres</div>
              </div>
            </div>
          </div>

          {/* Graphique temporel - Offres créées par mois */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              Évolution des offres (7 derniers jours)
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', padding: '20px 0' }}>
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                const dayOffers = offers.filter(o => {
                  const offerDate = new Date(o.createdAt);
                  return offerDate.toDateString() === date.toDateString();
                });
                const maxOffers = Math.max(...Array.from({ length: 7 }, (_, j) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (6 - j));
                  return offers.filter(o => {
                    const offerDate = new Date(o.createdAt);
                    return offerDate.toDateString() === d.toDateString();
                  }).length;
                }), 1);
                const height = (dayOffers.length / maxOffers) * 100;
                
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${height}%`,
                        minHeight: dayOffers.length > 0 ? '20px' : '0',
                        backgroundColor: dayOffers.length > 0 ? '#ff6600' : '#f0f0f0',
                        borderRadius: '8px 8px 0 0',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '12px',
                        transition: 'all 0.3s ease',
                      }}
                      title={`${dayOffers.length} offre(s) le ${date.toLocaleDateString('fr-FR')}`}
                    >
                      {dayOffers.length > 0 && dayOffers.length}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', textAlign: 'center', transform: 'rotate(-45deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
                      {date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Actions rapides
          </h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link
              href="/vendeur/offres/nouvelle"
              style={{
                padding: '16px 32px',
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
              ➕ Créer une nouvelle offre
            </Link>
            
            <Link
              href="/vendeur/offres"
              style={{
                padding: '16px 32px',
                backgroundColor: 'white',
                color: '#ff6600',
                border: '2px solid #ff6600',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6600';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#ff6600';
              }}
            >
              📋 Gérer mes offres
            </Link>
          </div>
        </div>

        {/* Liste de toutes les offres */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333' }}>
              Toutes mes offres ({offers.length})
            </h2>
            <Link
              href="/vendeur/offres"
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#ff6600',
                border: '2px solid #ff6600',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6600';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#ff6600';
              }}
            >
              📊 Voir toutes les offres
            </Link>
          </div>
          
          {offers.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                Vous n'avez pas encore créé d'offres
              </p>
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
                  display: 'inline-block',
                }}
              >
                Créer ma première offre
              </Link>
            </div>
          ) : (
            <>
              {/* Statistiques détaillées */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981', marginBottom: '5px' }}>
                    {offers.filter(o => o.isActive).length}
                  </div>
                  <div style={{ color: '#666', fontSize: '13px' }}>Actives</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '5px' }}>
                    {offers.filter(o => !o.isActive).length}
                  </div>
                  <div style={{ color: '#666', fontSize: '13px' }}>Inactives</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6600', marginBottom: '5px' }}>
                    {offers.filter(o => o.isFeatured).length}
                  </div>
                  <div style={{ color: '#666', fontSize: '13px' }}>Bons plans</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '5px' }}>
                    {new Set(offers.map(o => o.category)).size}
                  </div>
                  <div style={{ color: '#666', fontSize: '13px' }}>Catégories</div>
                </div>
              </div>

              {/* Liste de toutes les offres */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {offers.map((offer) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}





