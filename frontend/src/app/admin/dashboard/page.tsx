/**
 * Dashboard administrateur
 * 
 * Page principale de l'espace admin avec :
 * - Statistiques globales (vendeurs, offres, réservations)
 * - Gestion des vendeurs
 * - Gestion des offres
 * - Gestion des administrateurs
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [stats, setStats] = useState({
    vendors: 0,
    offers: 0,
    reservations: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifie si l'admin est connecté
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }

    const adminObj = JSON.parse(adminData);
    setAdmin(adminObj);

    // Charge les statistiques
    loadStats();
  }, [router]);

  /**
   * Charge les statistiques globales
   */
  const loadStats = async () => {
    try {
      // Charge les statistiques depuis les différentes APIs
      const [vendorsRes, offersRes, adminsRes] = await Promise.all([
        fetch('http://localhost:3001/vendors').catch(() => null),
        fetch('http://localhost:3001/offers').catch(() => null),
        fetch('http://localhost:3001/auth/admin').catch(() => null),
      ]);

      const vendors = vendorsRes ? await vendorsRes.json().catch(() => []) : [];
      const offers = offersRes ? await offersRes.json().catch(() => ({ offers: [] })) : { offers: [] };
      const admins = adminsRes ? await adminsRes.json().catch(() => []) : [];

      setStats({
        vendors: Array.isArray(vendors) ? vendors.length : 0,
        offers: offers.offers?.length || 0,
        reservations: 0, // À implémenter avec le module Reservations
        admins: Array.isArray(admins) ? admins.length : 0,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion de l'administrateur
   */
  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading || !admin) {
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
              🔐 Tableau de bord Administrateur
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              {admin.firstName} {admin.lastName} • {admin.role === 'super_admin' ? 'Super Administrateur' : 'Administrateur'}
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
              {stats.vendors}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Vendeurs inscrits</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              {stats.offers}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Offres actives</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              {stats.reservations}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Réservations</div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6600', marginBottom: '10px' }}>
              {stats.admins}
            </div>
            <div style={{ color: '#666', fontSize: '15px' }}>Administrateurs</div>
          </div>
        </div>

        {/* Actions rapides */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
            Gestion de la plateforme
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <Link
              href="/admin/vendeurs"
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>🏪</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Gérer les vendeurs
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Voir, activer ou désactiver les comptes vendeurs
              </p>
            </Link>

            <Link
              href="/admin/offres"
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>🛍️</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Gérer les offres
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Modérer et valider les offres publiées
              </p>
            </Link>

            <Link
              href="/admin/admins"
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>👥</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                Gérer les administrateurs
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {admin.role === 'super_admin' ? 'Créer et gérer les comptes administrateurs' : 'Voir les administrateurs'}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}




