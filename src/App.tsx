import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedBanner } from './components/FeaturedBanner';
import { SignatureBuckets } from './components/SignatureBuckets';
import { SpecialPacksShowcase } from './components/SpecialPacksShowcase';
import { CompleteMenu } from './components/CompleteMenu';
import { WhyRedBucket } from './components/WhyRedBucket';
import { FoodGallery } from './components/FoodGallery';
import { GoogleReviews } from './components/GoogleReviews';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RestaurantDataProvider } from './context/RestaurantDataContext';
import { AdminPortal } from './admin/AdminPortal';
import type { BucketCategoryKey } from './data/menuData';

function WebsiteContent({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<BucketCategoryKey>('solo');

  const handleSelectBucketCategory = (category: BucketCategoryKey) => {
    setSelectedCategory(category);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#151111] text-[#FFF0DA] flex flex-col selection:bg-brand-red selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Hero Section with Official Campaign Photography */}
      <main className="flex-grow">
        <Hero />

        {/* Featured Official Brand Campaign Poster */}
        <FeaturedBanner />

        {/* 5 Distinct Bucket Experiences Collection */}
        <SignatureBuckets onSelectCategory={handleSelectBucketCategory} />

        {/* Special All Mix & Mighty Sixty Experiences */}
        <SpecialPacksShowcase />

        {/* Complete Menu with Live Availability & Accurate Prices */}
        <CompleteMenu selectedCategory={selectedCategory} />

        {/* Brand Storytelling: Why Red Bucket Biryani */}
        <WhyRedBucket />

        {/* Immersive Food Photography Gallery */}
        <FoodGallery />

        {/* Genuine Google Reviews Invitation Section */}
        <GoogleReviews />

        {/* Location - Jodimetla Branch Map & Timings */}
        <LocationSection />
      </main>

      {/* Premium Footer with Discreet Kitchen Console Link */}
      <Footer onOpenAdmin={onOpenAdmin} />

      {/* Sticky Floating WhatsApp & Call CTA */}
      <FloatingWhatsApp />
    </div>
  );
}

export function App() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return (
      window.location.hash === '#admin' ||
      window.location.hash.startsWith('#admin/') ||
      window.location.pathname === '/admin' ||
      window.location.pathname.startsWith('/admin/')
    );
  });

  useEffect(() => {
    const checkRoute = () => {
      const isNowAdmin = (
        window.location.hash === '#admin' ||
        window.location.hash.startsWith('#admin/') ||
        window.location.pathname === '/admin' ||
        window.location.pathname.startsWith('/admin/')
      );
      setIsAdminView(isNowAdmin);
    };

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const handleOpenAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToSite = () => {
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    if (window.location.hash.startsWith('#admin')) {
      window.location.hash = '';
    }
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <RestaurantDataProvider>
      {isAdminView ? (
        <AdminPortal onBackToSite={handleBackToSite} />
      ) : (
        <WebsiteContent onOpenAdmin={handleOpenAdmin} />
      )}
    </RestaurantDataProvider>
  );
}

export default App;
