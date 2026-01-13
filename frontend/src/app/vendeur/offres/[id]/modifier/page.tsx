/**
 * Page de modification d'une offre
 * 
 * Permet de modifier toutes les informations d'une offre existante
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
  vendorId: string;
}

export default function EditOfferPage() {
  const router = useRouter();
  const params = useParams();
  const offerId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    city: '',
    imageUrl: '',
    isActive: true,
    isFeatured: false,
    maxReservations: '',
    validDays: [] as number[],
    validFromHour: '',
    validUntilHour: '',
    validFrom: '',
    validUntil: '',
  });

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
        throw new Error('Erreur lors du chargement de l\'offre');
      }
      
      const offer: Offer = await response.json();
      
      setFormData({
        title: offer.title || '',
        description: offer.description || '',
        category: offer.category || '',
        city: offer.city || '',
        imageUrl: offer.imageUrl || '',
        isActive: offer.isActive,
        isFeatured: offer.isFeatured,
        maxReservations: offer.maxReservations?.toString() || '',
        validDays: offer.validDays || [],
        validFromHour: offer.validFromHour?.toString() || '',
        validUntilHour: offer.validUntilHour?.toString() || '',
        validFrom: offer.validFrom ? offer.validFrom.split('T')[0] : '',
        validUntil: offer.validUntil ? offer.validUntil.split('T')[0] : '',
      });

      if (offer.imageUrl) {
        setImagePreview(offer.imageUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
      setError('Veuillez sélectionner un fichier image (JPG, PNG, GIF ou WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image est trop volumineuse (max 5MB)');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'upload de l\'image');
      }

      setFormData(prev => ({ ...prev, imageUrl: data.url }));
      setImagePreview(data.url);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDayToggle = (day: number) => {
    setFormData(prev => ({
      ...prev,
      validDays: prev.validDays.includes(day)
        ? prev.validDays.filter(d => d !== day)
        : [...prev.validDays, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const updateData: any = {
        title: formData.title,
        description: formData.description || undefined,
        category: formData.category || undefined,
        city: formData.city,
        imageUrl: formData.imageUrl || undefined,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        maxReservations: formData.maxReservations ? parseInt(formData.maxReservations) : undefined,
        validDays: formData.validDays.length > 0 ? formData.validDays : undefined,
        validFromHour: formData.validFromHour ? parseInt(formData.validFromHour) : undefined,
        validUntilHour: formData.validUntilHour ? parseInt(formData.validUntilHour) : undefined,
        validFrom: formData.validFrom || undefined,
        validUntil: formData.validUntil || undefined,
      };

      const response = await fetch(`${API_URL}/offers/${offerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de la mise à jour');
      }

      alert('✅ Offre modifiée avec succès !');
      router.push(`/vendeur/offres/${offerId}`);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const categories = ['restauration', 'boulangerie', 'hotel', 'spa', 'beaute', 'lingerie', 'coach', 'loisir', 'autre'];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <Link
          href={`/vendeur/offres/${offerId}`}
          style={{
            color: '#ff6600',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px',
            display: 'inline-block',
          }}
        >
          ← Retour aux détails
        </Link>

        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>
          ✏️ Modifier l'offre
        </h1>

        {error && (
          <div style={{ backgroundColor: '#fee', color: '#c33', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {/* Titre */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Titre de l'offre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
              placeholder="Ex: 1 pizza achetée = 1 offerte"
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              placeholder="Décrivez votre offre..."
            />
          </div>

          {/* Catégorie et Ville */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                Ville *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="Ex: Saint-Denis"
              />
            </div>
          </div>

          {/* Image */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Image de l'offre
            </label>
            {imagePreview && (
              <div style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={imagePreview} alt="Aperçu" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                cursor: uploadingImage ? 'wait' : 'pointer',
                opacity: uploadingImage ? 0.6 : 1,
              }}
            />
            {uploadingImage && <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Upload en cours...</p>}
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, imageUrl: e.target.value }));
                setImagePreview(e.target.value);
              }}
              placeholder="Ou entrer une URL d'image"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                marginTop: '10px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Jours de validité */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Jours de validité
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {dayNames.map((name, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDayToggle(index)}
                  style={{
                    padding: '10px 20px',
                    border: `2px solid ${formData.validDays.includes(index) ? '#ff6600' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    backgroundColor: formData.validDays.includes(index) ? '#fff5f0' : 'white',
                    color: formData.validDays.includes(index) ? '#ff6600' : '#666',
                    fontWeight: formData.validDays.includes(index) ? '600' : '400',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Horaires */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                Heure de début (0-23)
              </label>
              <input
                type="number"
                min="0"
                max="23"
                value={formData.validFromHour}
                onChange={(e) => setFormData(prev => ({ ...prev, validFromHour: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="Ex: 18"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                Heure de fin (0-23)
              </label>
              <input
                type="number"
                min="0"
                max="23"
                value={formData.validUntilHour}
                onChange={(e) => setFormData(prev => ({ ...prev, validUntilHour: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="Ex: 23"
              />
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                Date de début
              </label>
              <input
                type="date"
                value={formData.validFrom}
                onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
                Date de fin
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Options */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Réservations maximum
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxReservations}
              onChange={(e) => setFormData(prev => ({ ...prev, maxReservations: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
              placeholder="Laisser vide pour illimité"
            />
          </div>

          {/* Checkboxes */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '15px' }}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>Offre active</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>Mettre en bons plans (⭐)</span>
            </label>
          </div>

          {/* Boutons */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <Link
              href={`/vendeur/offres/${offerId}`}
              style={{
                padding: '14px 28px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
                display: 'inline-block',
              }}
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '14px 28px',
                backgroundColor: saving ? '#ccc' : '#ff6600',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: saving ? 'wait' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {saving ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

