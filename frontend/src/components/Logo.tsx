/**
 * Composant Logo - AcheterOffert.com
 * 
 * Utilise l'image du logo telle quelle, sans modification
 */
'use client';

import { useState } from 'react';

interface LogoProps {
  size?: number;
  width?: number;
  height?: number;
}

export default function Logo({ size, width, height }: LogoProps) {
  // Dimensions du logo rectangulaire
  // Par défaut : hauteur max de 80px pour préserver les proportions du logo rectangulaire
  const maxHeight = height || size || 1000;
  
  // Liste des chemins possibles pour le logo
  const possiblePaths = [
    '/logo.jpeg',
    '/logo.jpg',
    '/logo.png',
    '/logo.JPEG',
    '/logo.JPG',
    '/logo.PNG',
  ];
  
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  const handleError = () => {
    // Essaie le chemin suivant
    if (currentPathIndex < possiblePaths.length - 1) {
      setCurrentPathIndex(currentPathIndex + 1);
    } else {
      // Tous les chemins ont échoué
      setImageError(true);
    }
  };
  
  // Si toutes les tentatives ont échoué, affiche un message de débogage
  if (imageError) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          minHeight: `${maxHeight}px`,
          padding: '0 10px',
          color: '#ff6600',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        [Logo manquant]
      </div>
    );
  }
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center',
        maxHeight: `${maxHeight}px`,
        lineHeight: 0,
      }}
    >
      <img
        src={possiblePaths[currentPathIndex]}
        alt="AcheterOffert.com - Logo"
        style={{
          maxHeight: `${maxHeight}px`,
          height: 'auto',
          width: 'auto',
          maxWidth: '400px', // Largeur max pour les logos rectangulaires horizontaux
          objectFit: 'contain',
          display: 'block',
          verticalAlign: 'middle',
        }}
        loading="eager"
        onError={handleError}
      />
    </div>
  );
}







