import { PropsWithChildren } from 'react';
import 'app/public/style.css';
import StayingTrue from '@/app/public/home/components/StayingTrue';
import Footer from '@/app/public/home/components/Footer';
import HeadLayout from '@/app/public/home/components/HeadLayout';
import AutoScrollToTop from '@/components/ui/AutoScrollToTop/AutoScrollToTop';
import BackToTop from '@/app/public/BackToTop';
import StickyMenu from '@/app/public/home/components/StickyMenu';

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <>
      <main className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] ">
        <StickyMenu />
        <div id="main-page" className="relative bg-white">
          <HeadLayout />
          {children}
          {/*<StayingTrue />*/}
          <Footer />
          <BackToTop />
        </div>
      </main>
      <AutoScrollToTop />
    </>
  );
}
