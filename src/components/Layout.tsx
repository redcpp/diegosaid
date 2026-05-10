import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import SkipLink from './SkipLink';
import { LenisProvider } from '@/lib/lenis-context';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <ScrollToTop />
      <div className="relative">
        <SkipLink />
        <Navbar />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
