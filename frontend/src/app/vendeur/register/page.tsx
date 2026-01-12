/**
 * Page d'inscription pour les vendeurs
 * 
 * Permet aux nouveaux vendeurs de créer un compte
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Gère les changements dans les champs du formulaire
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Gère la soumission du formulaire d'inscription
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Appel à l'API backend pour créer le compte
      const response = await fetch('http://localhost:3001/vendors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      // Sauvegarde les informations du vendeur
      localStorage.setItem('vendor', JSON.stringify(data));
      localStorage.setItem('vendorToken', data.id);

      // Redirige vers le dashboard
      router.push('/vendeur/dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      
      <div
        style={{
          maxWidth: '600px',
          margin: '40px auto',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          🏪 Inscription Vendeur
        </h1>
        
        <p
          style={{
            color: '#666',
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '15px',
          }}
        >
          Créez votre compte vendeur pour commencer à proposer vos offres
        </p>

        {error && (
          <div
            style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Informations de connexion */}
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            Informations de connexion
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              placeholder="votre@email.com"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
              Mot de passe * (min. 6 caractères)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
              placeholder="••••••••"
            />
          </div>

          {/* Informations de l'entreprise */}
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333', marginTop: '30px' }}>
            Informations de l'entreprise
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
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
              placeholder="Ex: Restaurant Le Bon Goût"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Prénom *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
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
                placeholder="Jean"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Nom *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
                placeholder="Dupont"
              />
            </div>
          </div>

          {/* Informations de contact */}
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333', marginTop: '30px' }}>
            Informations de contact (optionnel)
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
              placeholder="0123456789"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
              Adresse
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
              placeholder="123 Rue de la République"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Ville
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
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
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Code postal
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                placeholder="93200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#ccc' : '#ff6600',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginBottom: '20px',
            }}
          >
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Déjà un compte ?{' '}
            <Link
              href="/vendeur/login"
              style={{
                color: '#ff6600',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}




