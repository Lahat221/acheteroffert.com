/**
 * Page d'accueil (HomePage)
 * 
 * Page principale du site acheteroffert.com
 * Structure :
 * 1. Header avec menu de navigation
 * 2. Section Hero avec carrousel animé et statistiques
 * 3. Liste des offres avec filtres
 * 4. Section témoignages clients
 */
import { getOffers } from '@/lib/api';
import { getTestimonials } from '@/lib/testimonials';
import OffersList from '@/components/OffersList';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import Testimonials from '@/components/Testimonials';

/**
 * Composant de la page d'accueil
 * C'est un Server Component (pas de 'use client')
 * Les données sont récupérées côté serveur pour de meilleures performances
 * 
 * revalidate: 0 désactive le cache pour que les nouvelles offres apparaissent immédiatement
 */
export const revalidate = 0; // Désactive le cache pour afficher les nouvelles offres immédiatement

export default async function HomePage() {
  // Récupère les offres depuis l'API
  // Utilise revalidate: 0 pour forcer le rechargement à chaque requête
  const offers = await getOffers();
  
  // Récupère les témoignages (données statiques pour l'instant)
  const testimonials = getTestimonials();

  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Hero Section avec gradient */}
        <section
          style={{
            background: 'linear-gradient(135deg, #FF6600 0%, #FF8533 40%, #FFAA66 80%, #FFD93D 100%)',
            padding: 'clamp(12px, 2vh, 20px) 0',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Éléments décoratifs */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              animation: 'float 8s ease-in-out infinite',
            }}
          />

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            {/* Carrousel avec tout le contenu intégré (stats incluses) */}
            <HeroCarousel />
          </div>
        </section>

        {/* Contenu principal */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 16px' }}>
          {/* Liste des offres avec filtres */}
          <OffersList initialOffers={offers} />
        </div>

        {/* Section Témoignages */}
        <Testimonials testimonials={testimonials} />
      </main>
    </>
  );
}
