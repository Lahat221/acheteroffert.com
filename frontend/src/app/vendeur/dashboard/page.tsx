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

        {/* En-tête du dashboard avec gradient élégant */}
        <div style={{ 
          background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 50%, #FFAA66 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '40px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(255, 102, 0, 0.3)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                👋 Bienvenue, {vendor.firstName} !
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', margin: 0 }}>
                {vendor.companyName} {vendor.city && `• ${vendor.city}`}
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#ff6600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Actions rapides - En haut */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link
              href="/vendeur/offres/nouvelle"
              style={{
                padding: '18px 36px',
                background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                color: 'white',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 102, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.3)';
              }}
            >
              <span style={{ fontSize: '20px' }}>➕</span>
              Créer une nouvelle offre
            </Link>
            
            <Link
              href="/vendeur/offres"
              style={{
                padding: '18px 36px',
                backgroundColor: 'white',
                color: '#ff6600',
                border: '2px solid #ff6600',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6600';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#ff6600';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '20px' }}>📋</span>
              Gérer mes offres
            </Link>
          </div>
        </div>

        {/* Liste des offres - EN HAUT */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#333', margin: 0 }}>
              📦 Mes Offres ({offers.length})
            </h2>
            {offers.length > 0 && (
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
                📊 Voir toutes
              </Link>
            )}
          </div>
          
          {offers.length === 0 ? (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '80px 40px', 
              borderRadius: '16px', 
              textAlign: 'center', 
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: '2px dashed #e0e0e0',
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
              <p style={{ fontSize: '20px', color: '#666', marginBottom: '10px', fontWeight: '600' }}>
                Aucune offre pour le moment
              </p>
              <p style={{ fontSize: '16px', color: '#999', marginBottom: '30px' }}>
                Créez votre première offre pour commencer à attirer des clients
              </p>
              <Link
                href="/vendeur/offres/nouvelle"
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  display: 'inline-block',
                  boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 102, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.3)';
                }}
              >
                ➕ Créer ma première offre
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {offers.map((offer) => (
                <div 
                  key={offer.id} 
                  style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '16px', 
                    boxShadow: offer.isActive 
                      ? '0 4px 16px rgba(0,0,0,0.1)' 
                      : '0 2px 8px rgba(0,0,0,0.05)', 
                    border: offer.isActive 
                      ? (offer.isFeatured ? '2px solid #ff6600' : '2px solid transparent') 
                      : '2px solid #e0e0e0', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (offer.isActive) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = offer.isActive 
                      ? '0 4px 16px rgba(0,0,0,0.1)' 
                      : '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* Badge Bon Plan */}
                  {offer.isFeatured && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      left: '12px', 
                      zIndex: 10,
                      padding: '6px 14px', 
                      background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                      color: 'white', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '700',
                      boxShadow: '0 2px 8px rgba(255, 102, 0, 0.4)',
                    }}>
                      ⭐ BON PLAN
                    </div>
                  )}
                  
                  {/* Badge Inactive */}
                  {!offer.isActive && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      zIndex: 10,
                      padding: '6px 12px', 
                      backgroundColor: 'rgba(0,0,0,0.7)', 
                      color: 'white', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: '600',
                    }}>
                      Inactive
                    </div>
                  )}

                  {/* Image de l'offre */}
                  {offer.imageUrl ? (
                    <div style={{ width: '100%', height: '220px', overflow: 'hidden', backgroundColor: '#f0f0f0', position: 'relative' }}>
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
                          e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Offre';
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '220px', 
                      backgroundColor: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      fontSize: '48px',
                    }}>
                      📦
                    </div>
                  )}

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#333', margin: '0 0 12px 0', lineHeight: '1.3' }}>
                      {offer.title}
                    </h3>
                    
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#f0f0f0', 
                        color: '#666', 
                        borderRadius: '6px', 
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        {offer.category || 'Sans catégorie'}
                      </span>
                      <span style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#e3f2fd', 
                        color: '#1976d2', 
                        borderRadius: '6px', 
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        📍 {offer.city}
                      </span>
                    </div>

                    {offer.description && (
                      <p style={{ 
                        color: '#666', 
                        fontSize: '14px', 
                        marginBottom: '16px', 
                        lineHeight: '1.5', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        flex: 1,
                      }}>
                        {offer.description}
                      </p>
                    )}

                    {offer.maxReservations && (
                      <div style={{ 
                        marginBottom: '16px',
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#666',
                      }}>
                        📊 Maximum : {offer.maxReservations} réservations
                      </div>
                    )}

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginTop: 'auto', 
                      paddingTop: '16px', 
                      borderTop: '1px solid #f0f0f0', 
                      gap: '12px',
                    }}>
                      <Link
                        href={`/vendeur/offres/${offer.id}`}
                        style={{
                          color: '#ff6600',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '14px',
                          padding: '10px 20px',
                          backgroundColor: '#fff5f0',
                          borderRadius: '8px',
                          transition: 'all 0.3s',
                          display: 'inline-block',
                          flex: 1,
                          textAlign: 'center',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ff6600';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fff5f0';
                          e.currentTarget.style.color = '#ff6600';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        📋 Gérer
                      </Link>
                      <span style={{ color: '#999', fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {new Date(offer.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistiques et Graphiques - EN BAS */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          marginBottom: '40px',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>📊</span>
            Statistiques & Analyses
          </h2>

          {/* Cartes de statistiques */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ 
              backgroundColor: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%)',
              background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%)',
              padding: '28px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 12px rgba(255, 102, 0, 0.15)',
              border: '2px solid #ff6600',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff6600', marginBottom: '8px' }}>
                {offers.length}
              </div>
              <div style={{ color: '#666', fontSize: '15px', fontWeight: '600' }}>Total offres</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              padding: '28px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
              border: '2px solid #10B981',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10B981', marginBottom: '8px' }}>
                {offers.filter(o => o.isActive).length}
              </div>
              <div style={{ color: '#666', fontSize: '15px', fontWeight: '600' }}>Offres actives</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%)',
              background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%)',
              padding: '28px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 12px rgba(255, 102, 0, 0.15)',
              border: '2px solid #ff6600',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff6600', marginBottom: '8px' }}>
                {offers.filter(o => o.isFeatured).length}
              </div>
              <div style={{ color: '#666', fontSize: '15px', fontWeight: '600' }}>Bons plans</div>
            </div>
            
            <div style={{ 
              backgroundColor: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '28px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
              border: '2px solid #3B82F6',
            }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '8px' }}>
                {new Set(offers.map(o => o.category)).size}
              </div>
              <div style={{ color: '#666', fontSize: '15px', fontWeight: '600' }}>Catégories</div>
            </div>
          </div>

          {/* Graphique en barres - Répartition par catégorie */}
          {offers.length > 0 && (
            <>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
                  📈 Répartition par catégorie
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Array.from(new Set(offers.map(o => o.category).filter(Boolean))).map(category => {
                    const categoryOffers = offers.filter(o => o.category === category);
                    const percentage = offers.length > 0 ? (categoryOffers.length / offers.length) * 100 : 0;
                    return (
                      <div key={category}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>
                            {category || 'Sans catégorie'}
                          </span>
                          <span style={{ fontSize: '15px', color: '#666', fontWeight: '600' }}>
                            {categoryOffers.length} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div style={{ width: '100%', height: '28px', backgroundColor: '#f0f0f0', borderRadius: '14px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${percentage}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #ff6600 0%, #ff8533 100%)',
                              borderRadius: '14px',
                              transition: 'width 0.5s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              paddingRight: '12px',
                            }}
                          >
                            {percentage > 10 && (
                              <span style={{ color: 'white', fontSize: '13px', fontWeight: '700' }}>
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
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
                  🎯 Statut des offres
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '140px', 
                      height: '140px', 
                      borderRadius: '50%', 
                      background: `conic-gradient(#10B981 0% ${offers.length > 0 ? (offers.filter(o => o.isActive).length / offers.length) * 100 : 0}%, #f0f0f0 ${offers.length > 0 ? (offers.filter(o => o.isActive).length / offers.length) * 100 : 0}% 100%)`,
                      margin: '0 auto 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                    }}>
                      <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#10B981',
                      }}>
                        {offers.length > 0 ? Math.round((offers.filter(o => o.isActive).length / offers.length) * 100) : 0}%
                      </div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '5px' }}>Actives</div>
                    <div style={{ fontSize: '15px', color: '#666' }}>{offers.filter(o => o.isActive).length} offres</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '140px', 
                      height: '140px', 
                      borderRadius: '50%', 
                      background: `conic-gradient(#F59E0B 0% ${offers.length > 0 ? (offers.filter(o => !o.isActive).length / offers.length) * 100 : 0}%, #f0f0f0 ${offers.length > 0 ? (offers.filter(o => !o.isActive).length / offers.length) * 100 : 0}% 100%)`,
                      margin: '0 auto 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
                    }}>
                      <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#F59E0B',
                      }}>
                        {offers.length > 0 ? Math.round((offers.filter(o => !o.isActive).length / offers.length) * 100) : 0}%
                      </div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '5px' }}>Inactives</div>
                    <div style={{ fontSize: '15px', color: '#666' }}>{offers.filter(o => !o.isActive).length} offres</div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '140px', 
                      height: '140px', 
                      borderRadius: '50%', 
                      background: `conic-gradient(#ff6600 0% ${offers.length > 0 ? (offers.filter(o => o.isFeatured).length / offers.length) * 100 : 0}%, #f0f0f0 ${offers.length > 0 ? (offers.filter(o => o.isFeatured).length / offers.length) * 100 : 0}% 100%)`,
                      margin: '0 auto 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(255, 102, 0, 0.2)',
                    }}>
                      <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#ff6600',
                      }}>
                        {offers.length > 0 ? Math.round((offers.filter(o => o.isFeatured).length / offers.length) * 100) : 0}%
                      </div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '5px' }}>Bons plans</div>
                    <div style={{ fontSize: '15px', color: '#666' }}>{offers.filter(o => o.isFeatured).length} offres</div>
                  </div>
                </div>
              </div>

              {/* Graphique temporel - Offres créées par jour */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
                  📅 Évolution (7 derniers jours)
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '220px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
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
                            minHeight: dayOffers.length > 0 ? '30px' : '0',
                            background: dayOffers.length > 0 
                              ? 'linear-gradient(180deg, #ff6600 0%, #ff8533 100%)' 
                              : '#e0e0e0',
                            borderRadius: '8px 8px 0 0',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '14px',
                            transition: 'all 0.3s ease',
                            boxShadow: dayOffers.length > 0 ? '0 2px 8px rgba(255, 102, 0, 0.3)' : 'none',
                          }}
                          title={`${dayOffers.length} offre(s) le ${date.toLocaleDateString('fr-FR')}`}
                        >
                          {dayOffers.length > 0 && dayOffers.length}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', fontWeight: '600' }}>
                          {date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}





