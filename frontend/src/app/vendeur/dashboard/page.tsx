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
  const [offers, setOffers] = useState<any[]>([]);
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
   */
  const loadVendorOffers = async (vendorId: string) => {
    try {
      // Pour l'instant, on récupère toutes les offres
      // Plus tard, on filtrera par vendorId dans le backend
      const response = await fetch('http://localhost:3001/offers');
      const data = await response.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error('Erreur lors du chargement des offres:', error);
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
            <div style={{ color: '#666', fontSize: '15px' }}>Offres actives</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              {offers.filter(o => o.isFeatured).length}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Bons plans</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              0
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Réservations</div>
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

        {/* Liste des offres récentes */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Mes offres récentes
          </h2>
          
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {offers.slice(0, 6).map((offer) => (
                <div key={offer.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    {offer.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                    {offer.category} • {offer.city}
                  </p>
                  {offer.isFeatured && (
                    <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#ff6600', color: 'white', borderRadius: '4px', fontSize: '12px', fontWeight: '600', marginBottom: '10px' }}>
                      ⭐ Bon plan
                    </span>
                  )}
                  <div style={{ marginTop: '15px' }}>
                    <Link
                      href={`/vendeur/offres/${offer.id}`}
                      style={{
                        color: '#ff6600',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                      }}
                    >
                      Voir les détails →
                    </Link>
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




