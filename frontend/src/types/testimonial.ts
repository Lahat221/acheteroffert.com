export interface Testimonial {
  id: string;
  vendorName: string;
  vendorCategory: string;
  customerName: string;
  rating: number; // 1 à 5
  comment: string;
  date: string;
  verified?: boolean; // Avis vérifié
}









