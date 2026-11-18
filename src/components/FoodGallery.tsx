import React, { useState } from 'react';
import { Camera, X, MessageCircle, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/galleryData';
import type { GalleryItem } from '../data/galleryData';
import { getWhatsAppLink } from '../data/restaurantInfo';

export const FoodGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.categoryKey === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#120b0b] relative">
      {/* Ambient background light */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>AUTHENTIC HYDERABADI CUISINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            FEAST YOUR EYES.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-cream">
              CRAVE THE BUCKET.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream/70 font-normal">
            Grains of aged basmati infused with saffron, caramelized onions, hand-picked spices, and succulent meats served in our signature red buckets.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-gold text-neutral-950 font-black shadow-lg shadow-gold/30 scale-105'
                  : 'bg-neutral-900/80 text-cream/70 hover:text-white hover:bg-neutral-800 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-brand-red/50 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Aspect ratio container */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag pill */}
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 text-gold text-[10px] font-black uppercase tracking-wider">
                  {item.tag}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Title & Description under photo */}
              <div className="p-4 bg-neutral-900/90">
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-red">
                  {item.category}
                </div>
                <h3 className="text-base font-black text-white font-['Montserrat',sans-serif] mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-cream/70 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-brand-red/40 shadow-2xl animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-950/80 text-white hover:bg-brand-red transition-colors border border-white/10"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Enlarged Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details & WhatsApp Action */}
              <div className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-neutral-900 to-neutral-950">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-red/20 text-brand-red border border-brand-red/40 uppercase tracking-wider">
                    {selectedPhoto.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gold border border-white/10">
                    {selectedPhoto.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif]">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm text-cream/80 leading-relaxed">
                  {selectedPhoto.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getWhatsAppLink(`Hi Red Bucket Biryani (Jodimetla), I would like to order ${selectedPhoto.title}. Please share available bucket sizes and prices.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-cream text-sm font-bold transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
