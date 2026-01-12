import { Testimonial } from '@/types/testimonial';

export function getTestimonials(): Testimonial[] {
  return [
    {
      id: '1',
      vendorName: 'Tacos King',
      vendorCategory: 'Restauration',
      customerName: 'Marie D.',
      rating: 5,
      comment: 'Super offre ! J\'ai eu 2 tacos pour le prix d\'un en fin de soirée. Le personnel est sympa et les tacos délicieux. Je recommande !',
      date: '2024-01-15',
      verified: true,
    },
    {
      id: '2',
      vendorName: 'Boulangerie Le Pain Doré',
      vendorCategory: 'Boulangerie',
      customerName: 'Thomas L.',
      rating: 5,
      comment: 'Parfait pour éviter le gaspillage ! J\'ai eu 3 gâteaux pour le prix d\'un. Qualité excellente et prix imbattable.',
      date: '2024-01-18',
      verified: true,
    },
    {
      id: '3',
      vendorName: 'Salon Beauté Élégance',
      vendorCategory: 'Beauté',
      customerName: 'Sophie M.',
      rating: 5,
      comment: 'Coupe + barber offert, c\'est génial ! Le salon est propre, le coiffeur professionnel. Je reviendrai certainement.',
      date: '2024-01-20',
      verified: true,
    },
    {
      id: '4',
      vendorName: 'Coach Sportif Pro',
      vendorCategory: 'Fitness',
      customerName: 'Julien R.',
      rating: 5,
      comment: 'Séance personnalisée de qualité. Le coach est à l\'écoute et motivant. L\'offre heures creuses est parfaite pour mon emploi du temps.',
      date: '2024-01-22',
      verified: true,
    },
    {
      id: '5',
      vendorName: 'Pizza Express',
      vendorCategory: 'Restauration',
      customerName: 'Amélie B.',
      rating: 4,
      comment: 'Bonne pizza, bonne affaire ! 2 pizzas pour le prix d\'une en fin de journée. Service rapide et efficace.',
      date: '2024-01-19',
      verified: true,
    },
    {
      id: '6',
      vendorName: 'Boulangerie Artisanale',
      vendorCategory: 'Boulangerie',
      customerName: 'Pierre F.',
      rating: 5,
      comment: 'Les baguettes sont excellentes et l\'offre anti-gaspillage est top ! On fait des économies tout en évitant le gaspillage.',
      date: '2024-01-17',
      verified: true,
    },
  ];
}







