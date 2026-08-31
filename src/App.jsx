import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { GradualBlur } from '@/components/GradualBlur';
import Home from '@/pages/Home';

// Route-level code splitting: the home page ships in the main bundle,
// everything else loads on navigation.
const Collection = lazy(() => import('@/pages/Collection'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const About = lazy(() => import('@/pages/About'));
const Showroom = lazy(() => import('@/pages/Showroom'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Every navigation starts at the top of the new page. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'instant' });
  }, [pathname]);

  return null;
}

/** Minimal hold while a route chunk loads — no spinner, no flash. */
function RouteFallback() {
  return <div className="min-h-[70vh]" aria-busy="true" />;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-6 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Progressive blur at the foot of the viewport, so vertical
          scrolling dissolves into the edge instead of cutting off. */}
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={1.6}
        divCount={5}
        curve="bezier"
        exponential
        opacity={0.85}
        zIndex={30}
      />
    </div>
  );
}
