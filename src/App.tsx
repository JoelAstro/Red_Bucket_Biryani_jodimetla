import { useState } from 'react';
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
import type { BucketCategoryKey } from './data/menuData';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<BucketCategoryKey>('solo');

  const handleSelectBucketCategory = (category: BucketCategoryKey) => {
    setSelectedCategory(category);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#151111] text-[#FFF0DA] flex flex-col selection:bg-brand-red selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Hero Section with Interactive 3D Biryani Bucket */}
      <main className="flex-grow">
        <Hero />

        {/* Featured Official Brand Campaign Poster */}
        <FeaturedBanner />

        {/* 5 Distinct Bucket Experiences Collection */}
        <SignatureBuckets onSelectCategory={handleSelectBucketCategory} />

        {/* Special All Mix & Mighty Sixty Experiences */}
        <SpecialPacksShowcase />

        {/* Complete Menu with Accurate Prices and Filters */}
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

      {/* Premium Footer */}
      <Footer />

      {/* Sticky Floating WhatsApp & Call CTA */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
