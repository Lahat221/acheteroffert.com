/**
 * Page de détails et gestion d'une offre
 * 
 * Permet de :
 * - Voir tous les détails de l'offre
 * - Modifier l'offre
 * - Activer/Désactiver l'offre
 * - Supprimer l'offre
 * - Voir les statistiques
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { API_URL } from '@/config/api';

interface Offer {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  city: string;
  imageUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
  maxReservations: number | null;
  validDays: number[] | null;
  validFromHour: number | null;
  validUntilHour: number | null;
  validFrom: string | null;
  validUntil: string | null;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
}

export default function OfferDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const offerId = params.id as string;

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const vendorData = localStorage.getItem('vendor');
    if (!vendorData) {
      router.push('/vendeur/login');
      return;
    }

    loadOffer();
  }, [offerId, router]);

  const loadOffer = async () => {
    try {
      const response = await fetch(`${API_URL}/offers/${offerId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Offre introuvable');
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOffer(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement de l\'offre');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async () => {
    if (!offer) return;
    
    setActionLoading('toggle');
    try {
      const response = await fetch(`${API_URL}/offers/${offerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !offer.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      const updatedOffer = await response.json();
      setOffer(updatedOffer);
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleFeatured = async () => {
    if (!offer) return;
    
    setActionLoading('featured');
    try {
      const response = await fetch(`${API_URL}/offers/${offerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isFeatured: !offer.isFeatured,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      const updatedOffer = await response.json();
      setOffer(updatedOffer);
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteOffer = async () => {
    if (!offer) return;
    
    setActionLoading('delete');
    try {
      const response = await fetch(`${API_URL}/offers/${offerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      alert('Offre supprimée avec succès');
      router.push('/vendeur/offres');
    } catch (err: any) {
      alert('Erreur: ' + err.message);
      setActionLoading(null);
    }
  };

  const getDaysText = (days: number[] | null) => {
    if (!days || days.length === 0) return 'Tous les jours';
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days.map(d => dayNames[d]).join(', ');
  };

  const getHoursText = () => {
    if (!offer) return '';
    if (offer.validFromHour !== null && offer.validUntilHour !== null) {
      return `De ${offer.validFromHour}h à ${offer.validUntilHour}h`;
    }
    if (offer.validFromHour !== null) {
      return `À partir de ${offer.validFromHour}h`;
    }
    return 'Toute la journée';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Chargement...</p>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Header />
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>❌ Erreur</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>{error || 'Offre introuvable'}</p>
            <Link
              href="/vendeur/offres"
              style={{
                padding: '12px 24px',
                backgroundColor: '#ff6600',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                display: 'inline-block',
              }}
            >
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* En-tête avec actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <Link
              href="/vendeur/offres"
              style={{
                color: '#ff6600',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '10px',
                display: 'inline-block',
              }}
            >
              ← Retour à la liste
            </Link>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              {offer.title}
            </h1>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ padding: '6px 12px', backgroundColor: offer.isActive ? '#10B981' : '#F59E0B', color: 'white', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
                {offer.isActive ? '✅ Active' : '⏸️ Inactive'}
              </span>
              {offer.isFeatured && (
                <span style={{ padding: '6px 12px', backgroundColor: '#ff6600', color: 'white', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
                  ⭐ Bon plan
                </span>
              )}
              <span style={{ padding: '6px 12px', backgroundColor: '#f0f0f0', color: '#666', borderRadius: '6px', fontSize: '13px' }}>
                {offer.category || 'Sans catégorie'} • {offer.city}
              </span>
            </div>
          </div>
          
          {/* Actions rapides */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              href={`/vendeur/offres/${offerId}/modifier`}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3B82F6',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3B82F6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ✏️ Modifier
            </Link>
            <button
              onClick={toggleActive}
              disabled={actionLoading === 'toggle'}
              style={{
                padding: '12px 24px',
                backgroundColor: offer.isActive ? '#F59E0B' : '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: actionLoading === 'toggle' ? 'wait' : 'pointer',
                transition: 'all 0.3s',
                opacity: actionLoading === 'toggle' ? 0.6 : 1,
              }}
            >
              {actionLoading === 'toggle' ? '...' : offer.isActive ? '⏸️ Désactiver' : '▶️ Activer'}
            </button>
            <button
              onClick={toggleFeatured}
              disabled={actionLoading === 'featured'}
              style={{
                padding: '12px 24px',
                backgroundColor: offer.isFeatured ? '#6B7280' : '#ff6600',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: actionLoading === 'featured' ? 'wait' : 'pointer',
                transition: 'all 0.3s',
                opacity: actionLoading === 'featured' ? 0.6 : 1,
              }}
            >
              {actionLoading === 'featured' ? '...' : offer.isFeatured ? '⭐ Retirer des bons plans' : '⭐ Mettre en bons plans'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={actionLoading === 'delete'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: actionLoading === 'delete' ? 'wait' : 'pointer',
                transition: 'all 0.3s',
                opacity: actionLoading === 'delete' ? 0.6 : 1,
              }}
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>

        {/* Image principale */}
        {offer.imageUrl && (
          <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <img
              src={offer.imageUrl}
              alt={offer.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Offre';
              }}
            />
          </div>
        )}

        {/* Contenu principal */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Informations principales */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              📋 Informations
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Description</div>
              <div style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
                {offer.description || <span style={{ color: '#999', fontStyle: 'italic' }}>Aucune description</span>}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Catégorie</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                {offer.category || 'Non définie'}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Ville</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                {offer.city}
              </div>
            </div>

            {offer.maxReservations && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Réservations maximum</div>
                <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                  {offer.maxReservations}
                </div>
              </div>
            )}
          </div>

          {/* Validité et horaires */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              ⏰ Validité
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Jours de validité</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                {getDaysText(offer.validDays)}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Horaires</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                {getHoursText()}
              </div>
            </div>

            {offer.validFrom && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Date de début</div>
                <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                  {new Date(offer.validFrom).toLocaleDateString('fr-FR')}
                </div>
              </div>
            )}

            {offer.validUntil && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Date de fin</div>
                <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                  {new Date(offer.validUntil).toLocaleDateString('fr-FR')}
                </div>
              </div>
            )}
          </div>

          {/* Statistiques */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              📊 Statistiques
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Date de création</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                {new Date(offer.createdAt).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Dernière modification</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                {new Date(offer.updatedAt).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Réservations</div>
              <div style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
                0 {/* TODO: Récupérer depuis l'API */}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de confirmation de suppression */}
        {showDeleteConfirm && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                ⚠️ Confirmer la suppression
              </h3>
              <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>
                Êtes-vous sûr de vouloir supprimer l'offre <strong>"{offer.title}"</strong> ? 
                Cette action est irréversible.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={deleteOffer}
                  disabled={actionLoading === 'delete'}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: actionLoading === 'delete' ? 'wait' : 'pointer',
                    opacity: actionLoading === 'delete' ? 0.6 : 1,
                  }}
                >
                  {actionLoading === 'delete' ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

