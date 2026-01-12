/**
 * Composant HeroCarousel
 * 
 * Affiche un carrousel animé avec des publicités de vendeurs.
 * Chaque slide contient une image de fond, des textes variés et des informations sur le vendeur.
 * Le carrousel défile automatiquement toutes les 5 secondes.
 */
'use client';

import { useState, useEffect } from 'react';

/**
 * Interface définissant la structure d'un slide du carrousel
 */
interface CarouselSlide {
  id: string; // Identifiant unique du slide
  image: string; // URL de l'image de fond
  badge: string; // Badge en haut (ex: "🍔 Restauration • Anti-gaspillage")
  mainTitle: string; // Titre principal du slide
  subtitle: string; // Sous-titre
  description: string; // Description de l'offre
  features: string; // Caractéristiques (jours, horaires, etc.)
  vendorTitle: string; // Nom du vendeur
  vendorSubtitle: string; // Sous-titre du vendeur
  vendorOffer: string; // Détails de l'offre du vendeur
}

const slides: CarouselSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200',
    badge: '🍔 Restauration • Anti-gaspillage',
    mainTitle: 'Économisez sur vos repas',
    subtitle: '1 acheté = 1 offert',
    description: 'Profitez de nos offres en fin de journée et évitez le gaspillage',
    features: '✨ Tacos King • Lundi à Jeudi • À partir de 23h',
    vendorTitle: 'Tacos King',
    vendorSubtitle: '1 acheté = 1 offert',
    vendorOffer: 'Anti-gaspillage en fin de journée',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200',
    badge: '🥖 Boulangerie • Fin de journée',
    mainTitle: 'Gâteaux & Viennoiseries',
    subtitle: '1 acheté = 2 offerts',
    description: 'Découvrez nos produits frais avant la fermeture',
    features: '✨ Boulangerie Le Pain Doré • Lundi à Vendredi • À partir de 18h',
    vendorTitle: 'Boulangerie Le Pain Doré',
    vendorSubtitle: 'Gâteaux & Viennoiseries',
    vendorOffer: '1 acheté = 2 offerts',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
    badge: '💄 Beauté & Coiffure • Heures creuses',
    mainTitle: 'Prenez soin de vous',
    subtitle: 'Coupe + Barber offert',
    description: 'Profitez de nos offres spéciales heures creuses',
    features: '✨ Salon Beauté Élégance • Mercredi • À 15h',
    vendorTitle: 'Salon Beauté Élégance',
    vendorSubtitle: 'Coupe + Barber offert',
    vendorOffer: 'Mercredi à 15h',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
    badge: '💪 Coach Sportif • Séance personnalisée',
    mainTitle: 'Atteignez vos objectifs',
    subtitle: '1h achetée = 30min offerte',
    description: 'Entraînez-vous avec un coach professionnel',
    features: '✨ Coach Sportif Pro • Mardi • 15h-17h',
    vendorTitle: 'Coach Sportif Pro',
    vendorSubtitle: 'Séance personnalisée',
    vendorOffer: '1h achetée = 30min offerte',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    badge: '🍕 Restaurant • Offre du soir',
    mainTitle: 'Pizzas en fin de journée',
    subtitle: '1 achetée = 1 offerte',
    description: 'Savourez nos pizzas fraîches avant la fermeture',
    features: '✨ Pizza Express • Lundi à Jeudi • À partir de 22h',
    vendorTitle: 'Pizza Express',
    vendorSubtitle: '1 pizza achetée = 1 offerte',
    vendorOffer: 'Fin de journée',
  },
];

/**
 * Composant principal du carrousel
 * Gère l'affichage automatique et la navigation manuelle entre les slides
 */
export default function HeroCarousel() {
  // État pour suivre le slide actuellement affiché (index dans le tableau slides)
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Effet pour le défilement automatique
   * Change de slide toutes les 5 secondes
   * Utilise le modulo (%) pour revenir au premier slide après le dernier
   */
  useEffect(() => {
    const interval = setInterval(() => {
      // Incrémente l'index et revient à 0 après le dernier slide
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5000ms = 5 secondes

    // Nettoyage : arrête l'intervalle quand le composant est démonté
    return () => clearInterval(interval);
  }, []);

  /**
   * Fonction pour aller directement à un slide spécifique
   * Utilisée par les indicateurs (dots) en bas du carrousel
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  /**
   * Fonction pour aller au slide précédent
   * Utilise le modulo pour gérer le retour au dernier slide depuis le premier
   */
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /**
   * Fonction pour aller au slide suivant
   * Utilise le modulo pour revenir au premier slide après le dernier
   */
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        overflow: 'hidden',
      }}
    >
      {/* Slides */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* 
          Parcourt tous les slides et les affiche en superposition
          Seul le slide actuel (currentSlide) est visible (opacity: 1)
          Les autres sont invisibles (opacity: 0) mais restent dans le DOM pour l'animation
        */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute', // Position absolue pour superposer les slides
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              // Opacité : 1 pour le slide actuel, 0 pour les autres
              opacity: index === currentSlide ? 1 : 0,
              // Translation horizontale pour l'effet de slide
              // Si index > currentSlide : décalé vers la droite
              // Si index < currentSlide : décalé vers la gauche
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              // Transition fluide pour l'animation
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              // Image de fond du slide
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover', // Couvre tout l'espace
              backgroundPosition: 'center', // Centrée
            }}
          >
            {/* Overlay gradient orange - très léger pour images nettes */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(135deg, rgba(255,102,0,0.15) 0%, rgba(255,133,51,0.12) 50%, rgba(255,170,102,0.1) 100%)',
              }}
            />

            {/* Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 40px',
                textAlign: 'center',
                color: 'white',
              }}
            >
              {/* Badge */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 16px',
                  borderRadius: '30px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {slide.badge}
              </div>

              {/* Titre principal */}
              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  marginBottom: '8px',
                  fontWeight: '800',
                  color: 'white',
                  lineHeight: '1.2',
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}
              >
                {slide.mainTitle}
                <br />
                <span style={{ color: '#fff9e6' }}>{slide.subtitle}</span>
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 20px)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '10px',
                  fontWeight: '500',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                {slide.description}
              </p>

              {/* Features */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '20px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                {slide.features}
              </p>

              {/* Info vendeur en bas */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  marginTop: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: '800',
                    marginBottom: '4px',
                    textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                  }}
                >
                  {slide.vendorTitle}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    fontWeight: '600',
                    marginBottom: '4px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  {slide.vendorSubtitle}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  ⭐ {slide.vendorOffer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '24px',
          color: 'white',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '24px',
          color: 'white',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ›
      </button>

      {/* Dots indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '12px',
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentSlide ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              backgroundColor:
                index === currentSlide
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
          if (index !== currentSlide) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
          }
        }}
            onMouseLeave={(e) => {
          if (index !== currentSlide) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
          }
        }}
          />
        ))}
      </div>
    </div>
  );
}

