import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import { ToastProvider } from '@/components/ui/ToastMessage';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

const meta = {
  title: 'Traders Rescue',
  description: 'Brought to you by Vercel, Stripe, and Supabase.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://app.tradersrescue.com',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vercel',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <ToastProvider>
      <Navbar />
      <main
        id="skip"
        className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
      >
        {children}
      </main>
      <Footer />
    </ToastProvider>
  );
}
