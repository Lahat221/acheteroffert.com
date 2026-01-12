import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AcheterOffert - Marketplace d\'offres',
  description: 'Découvrez les meilleures offres près de chez vous',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}

