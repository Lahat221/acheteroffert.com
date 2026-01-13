/**
 * Composant Testimonials
 * 
 * Affiche une section de témoignages clients sur les commerces partenaires.
 * Chaque témoignage affiche :
 * - Le nom du commerce et sa catégorie
 * - Une note en étoiles (1 à 5)
 * - Le commentaire du client
 * - Le nom du client et la date
 * - Un badge "Vérifié" si l'avis est vérifié
 */
'use client';

import { Testimonial } from '@/types/testimonial';

/**
 * Props du composant Testimonials
 */
interface TestimonialsProps {
  testimonials: Testimonial[]; // Liste des témoignages à afficher
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  /**
   * Fonction pour afficher les étoiles de notation
   * @param rating - Note de 1 à 5
   * @returns Un tableau de 5 étoiles, les premières sont dorées selon la note
   */
  const renderStars = (rating: number) => {
    // Crée un tableau de 5 éléments (pour 5 étoiles)
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          // Si l'index est inférieur à la note, l'étoile est dorée, sinon grise
          color: i < rating ? '#FFD93D' : '#E1E8ED',
          fontSize: '18px',
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <section
      style={{
        padding: 'clamp(40px, 6vh, 60px) clamp(16px, 4vw, 20px)',
        backgroundColor: '#FAFAFA',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Titre de la section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: '800',
              color: '#000000',
              marginBottom: '12px',
            }}
          >
            💬 Témoignages clients
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#4A4A4A' }}>
            Découvrez ce que nos clients disent de nos partenaires
          </p>
        </div>

        {/* Grille de témoignages */}
        <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                border: '1px solid #E0E0E0',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* En-tête avec nom du commerce */}
              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#000000',
                      margin: 0,
                    }}
                  >
                    {testimonial.vendorName}
                  </h3>
                  {testimonial.verified && (
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}
                    >
                      ✓ Vérifié
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#7F8C9A',
                    margin: 0,
                  }}
                >
                  {testimonial.vendorCategory}
                </p>
              </div>

              {/* Étoiles */}
              <div style={{ marginBottom: '12px' }}>{renderStars(testimonial.rating)}</div>

              {/* Commentaire */}
              <p
                style={{
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  color: '#4A4A4A',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                  flex: 1,
                  fontStyle: 'italic',
                }}
              >
                "{testimonial.comment}"
              </p>

              {/* Footer avec nom client et date */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000',
                      margin: 0,
                    }}
                  >
                    {testimonial.customerName}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#7F8C9A',
                    margin: 0,
                  }}
                >
                  {new Date(testimonial.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

