/**
 * Composant Header
 * 
 * En-tête de navigation du site avec :
 * - Logo cliquable (retour à l'accueil)
 * - Menu de navigation avec effets hover
 * - Barre supérieure avec message promotionnel
 * - Design sticky (reste en haut lors du scroll)
 */
'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useState } from 'react';

export default function Header() {
  // État pour suivre quel lien est actuellement survolé (pour l'effet visuel)
  const [activeLink, setActiveLink] = useState('');

  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderBottom: '1px solid rgba(255, 102, 0, 0.1)',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Barre supérieure avec infos */}
      <div
        style={{
          backgroundColor: '#ff6600',
          color: 'white',
          padding: '8px 20px',
          fontSize: '13px',
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        🎉 Nouveau : Découvrez nos offres anti-gaspillage à Saint-Denis !
      </div>

      {/* Menu principal */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          style={{ 
            textDecoration: 'none',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Logo size={80} />
        </Link>

        {/* Menu Navigation */}
        <nav>
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <li>
              <Link
                href="/"
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  color: activeLink === 'home' ? '#ff6600' : '#333',
                  fontWeight: '600',
                  fontSize: '15px',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  setActiveLink('home');
                  e.currentTarget.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
                  e.currentTarget.style.color = '#ff6600';
                }}
                onMouseLeave={(e) => {
                  setActiveLink('');
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#333';
                }}
              >
                🏠 Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/offres"
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  color: activeLink === 'offers' ? '#ff6600' : '#333',
                  fontWeight: '600',
                  fontSize: '15px',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  setActiveLink('offers');
                  e.currentTarget.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
                  e.currentTarget.style.color = '#ff6600';
                }}
                onMouseLeave={(e) => {
                  setActiveLink('');
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#333';
                }}
              >
                🛍️ Offres
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  color: activeLink === 'categories' ? '#ff6600' : '#333',
                  fontWeight: '600',
                  fontSize: '15px',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  setActiveLink('categories');
                  e.currentTarget.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
                  e.currentTarget.style.color = '#ff6600';
                }}
                onMouseLeave={(e) => {
                  setActiveLink('');
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#333';
                }}
              >
                📂 Catégories
              </Link>
            </li>
            <li>
              <Link
                href="/vendeur/login"
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '15px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                  boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'block',
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
                👤 Espace Vendeur
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

