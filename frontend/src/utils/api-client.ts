/**
 * Client API centralisé
 * 
 * Utilise la configuration API_URL pour tous les appels
 */
import { API_URL } from '@/config/api';

/**
 * Fonction helper pour faire des appels API
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${API_URL}/${cleanPath}`;
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}

/**
 * Fonction helper pour les appels POST
 */
export async function apiPost(path: string, data: any): Promise<Response> {
  return apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Fonction helper pour les appels PATCH
 */
export async function apiPatch(path: string, data: any): Promise<Response> {
  return apiFetch(path, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Fonction helper pour les appels DELETE
 */
export async function apiDelete(path: string): Promise<Response> {
  return apiFetch(path, {
    method: 'DELETE',
  });
}

/**
 * Fonction helper pour les appels GET
 */
export async function apiGet(path: string): Promise<Response> {
  return apiFetch(path, {
    method: 'GET',
  });
}

