/**
 * Composant Header
 * 
 * En-tête de navigation du site avec :
 * - Logo cliquable (retour à l'accueil)
 * - Menu de navigation avec effets hover
 * - Barre supérieure avec message promotionnel
 * - Design sticky (reste en haut lors du scroll)
 * - Menu hamburger responsive sur mobile
 */
'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useState, useEffect } from 'react';

export default function Header() {
  // État pour suivre quel lien est actuellement survolé (pour l'effet visuel)
  const [activeLink, setActiveLink] = useState('');
  // État pour le menu mobile (ouvert/fermé)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ferme le menu mobile quand on clique sur un lien
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Ferme le menu mobile si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Empêche le scroll du body quand le menu est ouvert
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: '🏠 Accueil', key: 'home' },
    { href: '/offres', label: '🛍️ Offres', key: 'offers' },
    { href: '/categories', label: '📂 Catégories', key: 'categories' },
  ];

  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        borderBottom: '1px solid rgba(255, 102, 0, 0.15)',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(44, 62, 80, 0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Barre supérieure avec infos */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
          color: 'white',
          padding: '4px 16px',
          fontSize: '10px',
          textAlign: 'center',
          fontWeight: '600',
          letterSpacing: '0.3px',
          boxShadow: '0 2px 8px rgba(255, 107, 53, 0.2)',
        }}
        className="hide-mobile"
      >
        🎉 Nouveau : Découvrez nos offres anti-gaspillage à Saint-Denis !
      </div>

      {/* Barre supérieure mobile */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
          color: 'white',
          padding: '3px 12px',
          fontSize: '9px',
          textAlign: 'center',
          fontWeight: '600',
          letterSpacing: '0.2px',
          boxShadow: '0 2px 8px rgba(255, 107, 53, 0.2)',
        }}
        className="hide-desktop"
      >
        🎉 Offres anti-gaspillage
      </div>

      {/* Menu principal */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 20px',
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
            zIndex: 101,
          }}
          onClick={handleLinkClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Logo size={60} />
        </Link>

        {/* Menu Navigation Desktop */}
        <nav className="hide-mobile">
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
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="nav-link"
                  style={{
                    textDecoration: 'none',
                    color: activeLink === link.key ? '#FF6600' : '#000000',
                    fontWeight: '600',
                    fontSize: '15px',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    setActiveLink(link.key);
                    e.currentTarget.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
                    e.currentTarget.style.color = '#FF6600';
                  }}
                  onMouseLeave={(e) => {
                    setActiveLink('');
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
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
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 50%, #FFAA66 100%)',
                  boxShadow: '0 4px 12px rgba(255, 102, 0, 0.35)',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  letterSpacing: '0.3px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 102, 0, 0.45)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF8533 0%, #FFAA66 50%, #FF6600 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.35)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF6600 0%, #FF8533 50%, #FFAA66 100%)';
                }}
              >
                👤 Espace Vendeur
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bouton Menu Hamburger Mobile */}
        <button
          className="hide-desktop"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 101,
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Menu"
        >
          <span
            style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? '#FF6600' : '#000000',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(8px, 8px)' : 'none',
            }}
          />
          <span
            style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? 'transparent' : '#000000',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? '#FF6600' : '#000000',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Menu Mobile */}
      <nav
        className="hide-desktop"
        style={{
          position: 'fixed',
          top: 0,
          right: isMobileMenuOpen ? 0 : '-100%',
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
          zIndex: 100,
          transition: 'right 0.3s ease',
          padding: '80px 0 20px 0',
          overflowY: 'auto',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {navLinks.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: '#000000',
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '16px 24px',
                  transition: 'all 0.3s ease',
                  borderLeft: '4px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
                  e.currentTarget.style.borderLeftColor = '#FF6600';
                  e.currentTarget.style.color = '#FF6600';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: '16px', padding: '0 24px' }}>
            <Link
              href="/vendeur/login"
              onClick={handleLinkClick}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: '#fff',
                fontWeight: '600',
                fontSize: '16px',
                padding: '14px 24px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 50%, #FFAA66 100%)',
                boxShadow: '0 4px 12px rgba(255, 102, 0, 0.35)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 102, 0, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.35)';
              }}
            >
              👤 Espace Vendeur
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
