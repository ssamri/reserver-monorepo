import { ClientI18nProvider } from '@reserver/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'reserver.ma – Trouvez votre hôtel idéal',
  description:
    'Plateforme de réservation hôtelière moderne pour rechercher, comparer et réserver en toute simplicité.',
  metadataBase: new URL('https://reserver.ma'),
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-light text-body">
        <main className="min-vh-100 d-flex flex-column">
          <ClientI18nProvider>{children}</ClientI18nProvider>
        </main>
      </body>
    </html>
  );
}
