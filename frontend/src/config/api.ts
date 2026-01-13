/**
 * Configuration de l'API
 * 
 * Utilise la variable d'environnement NEXT_PUBLIC_API_URL en production
 * ou localhost:3001 en développement
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Fonction helper pour construire les URLs de l'API
 */
export function getApiUrl(path: string): string {
  // Enlève le slash initial si présent
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_URL}/${cleanPath}`;
}

