import 'styles/main.css';
import SupabaseProvider from './supabase-provider';
import { Poppins, Vujahday_Script, Nunito_Sans } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SWRConfig } from 'swr';
import { SWRProvider } from './swr-provider';

export const metadata = {
  title: 'Traders Rescue',
  description: 'Traders Rescue'
};

const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
});

const vujahday = Vujahday_Script({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-vujahday'
});

const nunitoSan = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-nunito'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        className={`loading ${poppins.variable} ${vujahday.variable} ${nunitoSan.variable} ${poppins.className}`}
      >
        <SWRProvider>
          <SupabaseProvider>{children}</SupabaseProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
