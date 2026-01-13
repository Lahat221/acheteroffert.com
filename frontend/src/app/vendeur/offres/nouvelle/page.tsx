/**
 * Page de création d'une nouvelle offre
 * 
 * Permet au vendeur de créer une nouvelle offre avec toutes les options :
 * - Informations de base (titre, description, image)
 * - Localisation (ville, adresse)
 * - Catégorie
 * - Jours et heures de validité
 * - Dates de validité
 * - Limites de réservations
 * - Mise en avant
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { API_URL } from '@/config/api';

const CATEGORIES = [
  { value: 'restauration', label: '🍽️ Restauration' },
  { value: 'boulangerie', label: '🥖 Boulangerie' },
  { value: 'hotel', label: '🏨 Hôtel' },
  { value: 'spa', label: '💆 Spa & Bien-être' },
  { value: 'loisir', label: '🎬 Loisirs' },
  { value: 'lingerie', label: '👙 Lingerie' },
  { value: 'beaute', label: '💅 Beauté' },
  { value: 'coach', label: '💪 Coach Sportif' },
  { value: 'autre', label: '📦 Autre' },
];

const JOURS_SEMAINE = [
  { value: 0, label: 'Dimanche' },
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
];

export default function CreateOfferPage() {
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    city: '',
    address: '',
    category: '',
    price: '',
    originalPrice: '',
    
    // Jours de validité
    validDays: [] as number[],
    
    // Heures de validité
    validFromHour: '',
    validUntilHour: '',
    
    // Dates de validité
    validFrom: '',
    validUntil: '',
    
    // Options
    maxReservations: '',
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    // Vérifie si le vendeur est connecté
    const vendorData = localStorage.getItem('vendor');
    if (!vendorData) {
      router.push('/vendeur/login');
      return;
    }

    const vendorObj = JSON.parse(vendorData);
    setVendor(vendorObj);
    
    // Pré-remplit la ville si disponible
    if (vendorObj.city) {
      setFormData(prev => ({ ...prev, city: vendorObj.city }));
    }
  }, [router]);

  // Initialise l'aperçu si une imageUrl existe déjà
  useEffect(() => {
    if (formData.imageUrl) {
      setImagePreview(formData.imageUrl);
    }
  }, [formData.imageUrl]);

  /**
   * Gère les changements dans les champs du formulaire
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'validDays') {
        // Gestion des jours de validité
        const dayValue = parseInt(value);
        setFormData(prev => ({
          ...prev,
          validDays: checked
            ? [...prev.validDays, dayValue]
            : prev.validDays.filter(d => d !== dayValue),
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Gère l'upload d'image
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifie que c'est une image
    if (!file.type.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
      setError('Veuillez sélectionner un fichier image (JPG, PNG, GIF ou WebP)');
      return;
    }

    // Vérifie la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image est trop volumineuse (max 5MB)');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      // Crée un FormData pour l'upload
      const formData = new FormData();
      formData.append('image', file);

      // Upload l'image
      const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'upload de l\'image');
      }

      // Met à jour l'URL de l'image et l'aperçu
      setFormData(prev => ({ ...prev, imageUrl: data.url }));
      setImagePreview(data.url);
      
      console.log('✅ Image uploadée avec succès:', data.url);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  /**
   * Gère la soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Préparation des données pour l'API
      const offerData: any = {
        vendorId: vendor.id,
        title: formData.title,
        description: formData.description || undefined,
        imageUrl: formData.imageUrl || undefined,
        city: formData.city,
        category: formData.category || undefined,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      // Note: Le champ address n'est pas envoyé car il n'existe pas encore dans la base de données
      // Il sera ajouté plus tard si nécessaire

      // Ajout des prix si fournis
      if (formData.price) {
        offerData.price = parseFloat(formData.price);
      }
      if (formData.originalPrice) {
        offerData.originalPrice = parseFloat(formData.originalPrice);
      }

      // Ajout des jours de validité
      if (formData.validDays.length > 0) {
        offerData.validDays = formData.validDays;
      }

      // Ajout des heures de validité
      if (formData.validFromHour) {
        offerData.validFromHour = parseInt(formData.validFromHour);
      }
      if (formData.validUntilHour) {
        offerData.validUntilHour = parseInt(formData.validUntilHour);
      }

      // Ajout des dates de validité
      if (formData.validFrom) {
        offerData.validFrom = formData.validFrom;
      }
      if (formData.validUntil) {
        offerData.validUntil = formData.validUntil;
      }

      // Ajout du nombre max de réservations
      if (formData.maxReservations) {
        offerData.maxReservations = parseInt(formData.maxReservations);
      }

      // Appel à l'API backend
      console.log('📤 Envoi des données de l\'offre:', offerData);
      
      const response = await fetch(`${API_URL}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offerData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Erreur API:', data);
        throw new Error(data.message || `Erreur lors de la création de l'offre (${response.status})`);
      }

      console.log('✅ Offre créée avec succès:', data);

      // Redirection vers le dashboard après succès
      router.push('/vendeur/dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!vendor) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* En-tête */}
        <div style={{ marginBottom: '30px' }}>
          <Link
            href="/vendeur/dashboard"
            style={{
              color: '#ff6600',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'inline-block',
            }}
          >
            ← Retour au dashboard
          </Link>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginTop: '10px' }}>
            ➕ Créer une nouvelle offre
          </h1>
          <p style={{ color: '#666', fontSize: '16px', marginTop: '10px' }}>
            Remplissez le formulaire ci-dessous pour créer votre offre
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div
            style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '30px',
              fontSize: '14px',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {/* Informations de base */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
              📝 Informations de base
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Titre de l'offre *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="Ex: 1 tacos acheté = 1 tacos offert"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Description (optionnel)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
                placeholder="Décrivez votre offre en détail..."
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Image de l'offre (optionnel)
              </label>
              
              {/* Aperçu de l'image */}
              {imagePreview && (
                <div style={{ marginBottom: '15px' }}>
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              )}

              {/* Champ de sélection de fichier */}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  cursor: uploadingImage ? 'wait' : 'pointer',
                  opacity: uploadingImage ? 0.6 : 1,
                }}
              />
              
              {uploadingImage && (
                <p style={{ marginTop: '8px', color: '#ff6600', fontSize: '14px' }}>
                  ⏳ Upload en cours...
                </p>
              )}
              
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
                Formats acceptés : JPG, PNG, GIF, WebP (max 5MB)
              </p>
              
              {/* Option alternative : URL manuelle */}
              <details style={{ marginTop: '15px' }}>
                <summary style={{ cursor: 'pointer', color: '#666', fontSize: '14px', fontWeight: '500' }}>
                  Ou entrer une URL d'image
                </summary>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    marginTop: '10px',
                  }}
                  placeholder="https://example.com/image.jpg"
                  onBlur={(e) => {
                    if (e.target.value) {
                      setImagePreview(e.target.value);
                    }
                  }}
                />
              </details>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                  Prix (€) (optionnel)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                  Prix original (€) (optionnel)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="0.00"
                />
              </div>
            </div>
          </section>

          {/* Localisation */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
              📍 Localisation
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Ville *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="Saint-Denis"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Adresse complète (optionnel)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="123 Rue de la République, 93200 Saint-Denis"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Catégorie (optionnel)
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: 'white',
                }}
              >
                <option value="">Sélectionner une catégorie</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Validité */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
              📅 Jours et heures de validité
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Jours de la semaine (optionnel)
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {JOURS_SEMAINE.map(jour => (
                  <label
                    key={jour.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      border: `2px solid ${formData.validDays.includes(jour.value) ? '#ff6600' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      backgroundColor: formData.validDays.includes(jour.value) ? '#fff5f0' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '14px',
                      fontWeight: formData.validDays.includes(jour.value) ? '600' : '400',
                      color: formData.validDays.includes(jour.value) ? '#ff6600' : '#666',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="validDays"
                      value={jour.value}
                      checked={formData.validDays.includes(jour.value)}
                      onChange={handleChange}
                      style={{ marginRight: '8px', cursor: 'pointer' }}
                    />
                    {jour.label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                  Heure de début (0-23) (optionnel)
                </label>
                <input
                  type="number"
                  name="validFromHour"
                  value={formData.validFromHour}
                  onChange={handleChange}
                  min="0"
                  max="23"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Ex: 18"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                  Heure de fin (0-23) (optionnel)
                </label>
                <input
                  type="number"
                  name="validUntilHour"
                  value={formData.validUntilHour}
                  onChange={handleChange}
                  min="0"
                  max="23"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Ex: 23"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                  Date de début (optionnel)
                </label>
                <input
                  type="date"
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                  Date de fin (optionnel)
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </section>

          {/* Options */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
              ⚙️ Options
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Nombre maximum de réservations (optionnel)
              </label>
              <input
                type="number"
                name="maxReservations"
                value={formData.maxReservations}
                onChange={handleChange}
                min="1"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="Ex: 20 (laisser vide pour illimité)"
              />
              <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                Laisser vide si vous n'avez pas de limite de réservations
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>
                    ⭐ Mettre en avant (Bon plan)
                  </span>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    Les offres mises en avant apparaissent en priorité sur la page d'accueil
                  </p>
                </div>
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>
                    ✓ Offre active
                  </span>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    Si désactivé, l'offre ne sera pas visible publiquement
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Boutons d'action */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '2px solid #f0f0f0' }}>
            <Link
              href="/vendeur/dashboard"
              style={{
                padding: '14px 28px',
                backgroundColor: 'white',
                color: '#666',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#999';
                e.currentTarget.style.color = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }}
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 28px',
                backgroundColor: loading ? '#ccc' : '#ff6600',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#ff8533';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#ff6600';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? 'Création en cours...' : '✅ Créer l\'offre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

