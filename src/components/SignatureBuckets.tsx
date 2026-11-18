import React from 'react';
import { Users, Utensils, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import type { BucketCategoryKey } from '../data/menuData';

interface SignatureBucketsProps {
  onSelectCategory?: (category: BucketCategoryKey) => void;
}

interface BucketProductCard {
  key: BucketCategoryKey;
  name: string;
  serves: string;
  startingPrice: number;
  description: string;
  image: string;
  alt: string;
  badge?: string;
  scaleClass?: string;
}

export const SignatureBuckets: React.FC<SignatureBucketsProps> = ({ onSelectCategory }) => {
  // Official four bucket product images with background removed (Transparent PNGs)
  const bucketProducts: BucketProductCard[] = [
    {
      key: 'solo',
      name: 'SOLO BUCKET',
      serves: '1–2 persons',
      startingPrice: 170,
      description: 'Compact signature red bucket packed with authentic Hyderabadi biryani. Perfect for solo cravings or a treat for two.',
      image: '/images/buckets/solo-bucket-nobg.png',
      alt: 'Red Bucket Biryani Solo Bucket',
      badge: 'Popular for Cravings',
      scaleClass: 'scale-95 group-hover:scale-100',
    },
    {
      key: 'duo',
      name: 'DUO BUCKET',
      serves: '2–3 persons',
      startingPrice: 310,
      description: 'Generous medium bucket filled with aromatic long-grain basmati, succulent spiced meat, and rich traditional flavors.',
      image: '/images/buckets/duo-bucket-nobg.png',
      alt: 'Red Bucket Biryani Duo Bucket',
      badge: 'Most Ordered',
      scaleClass: 'scale-95 group-hover:scale-100',
    },
    {
      key: 'party',
      name: 'PARTY PACK',
      serves: '4–6 persons',
      startingPrice: 700,
      description: 'Large party-sized bucket loaded with slow-cooked dum biryani, egg flower garnishes, and tender cuts for the whole group.',
      image: '/images/buckets/party-pack-nobg.png',
      alt: 'Red Bucket Biryani Party Pack',
      badge: 'Family Favorite',
      scaleClass: 'scale-95 group-hover:scale-100',
    },
    {
      key: 'mighty-sixty',
      name: 'MIGHTY SIXTY',
      serves: '60 persons',
      startingPrice: 9000,
      description: 'Monumental catering-scale biryani presentation crafted for weddings, corporate celebrations, and grand gatherings.',
      image: '/images/buckets/mighty-sixty-nobg.png',
      alt: 'Red Bucket Biryani Mighty Sixty Grand Catering Pack',
      badge: 'Grand Mega Feast',
      scaleClass: 'scale-100 group-hover:scale-105',
    },
  ];

  const getWhatsAppOrderUrl = (bucketName: string) => {
    const message = `Hi Red Bucket Biryani, I am interested in ordering the ${bucketName}. Please share the details.`;
    return `https://wa.me/918008906029?text=${encodeURIComponent(message)}`;
  };

  const handleViewMenu = (categoryKey: BucketCategoryKey) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="buckets"
      className="py-20 md:py-28 bg-gradient-to-b from-[#140b0b] via-[#0f0707] to-[#120808] relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-brand-red/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-burgundy/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-black tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>ORIGINAL RESTAURANT PACKAGING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight leading-tight">
            CHOOSE YOUR BUCKET.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-cream drop-shadow-sm">
              SHARE THE HAPPINESS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream/80 font-normal max-w-2xl mx-auto leading-relaxed">
            Every celebration has a bucket size. Crafted for solo foodies, dynamic duos, bustling house parties, and 60-person grand events.
          </p>
        </div>

        {/* 4 Branded Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
          {bucketProducts.map((product) => (
            <div
              key={product.key}
              className="group relative rounded-3xl bg-neutral-900/80 hover:bg-neutral-900/95 border border-white/10 hover:border-brand-red/60 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_45px_rgba(242,11,18,0.25)] flex flex-col justify-between overflow-hidden p-5 sm:p-6"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Top Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 border border-gold/30 text-gold text-[11px] font-extrabold uppercase tracking-wider">
                  <Users className="w-3 h-3 text-gold" />
                  <span>{product.serves}</span>
                </span>

                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-red/20 text-brand-red border border-brand-red/40">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Unified Dark Image Showcase Container with Equal Dimensions */}
              <div className="relative w-full h-64 sm:h-72 my-2 flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#180f0f] via-neutral-950 to-[#120808] border border-white/5 p-4 overflow-hidden">
                {/* Subtle Ambient Red/Gold Radial Glow Behind the Bucket */}
                <div className="absolute w-40 h-40 rounded-full bg-brand-red/20 blur-2xl pointer-events-none group-hover:bg-brand-red/35 group-hover:scale-125 transition-all duration-500" />
                <div className="absolute w-28 h-28 rounded-full bg-gold/15 blur-xl pointer-events-none" />

                {/* Ground Contact Shadow */}
                <div className="absolute bottom-3 w-3/4 h-4 bg-black/70 rounded-full blur-md pointer-events-none transform scale-y-50" />

                {/* Background-Removed Transparent Bucket Image */}
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className={`relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 drop-shadow-[0_16px_28px_rgba(0,0,0,0.9)] ${product.scaleClass || 'scale-95 group-hover:scale-100'}`}
                />
              </div>

              {/* Card Details */}
              <div className="space-y-2.5 mt-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Montserrat',sans-serif] tracking-tight group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-cream/75 leading-relaxed mt-1.5 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Starting Price Pill */}
                <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cream/60">
                    Starts From
                  </span>
                  <div className="text-2xl font-black text-gold font-['Montserrat',sans-serif]">
                    ₹{product.startingPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Menu & WhatsApp Order */}
              <div className="pt-4 mt-2 space-y-2 border-t border-white/5">
                {/* View Menu Button */}
                <button
                  type="button"
                  onClick={() => handleViewMenu(product.key)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-cream hover:text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5 text-gold" />
                  <span>View Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-cream/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </button>

                {/* WhatsApp Order Button */}
                <a
                  href={getWhatsAppOrderUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  title={`Order ${product.name} via WhatsApp`}
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note pointing to Celebration Pack and other specials in menu */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Looking for our Celebration Pack (10–12 Persons) or Quad-Meat All Mix?
              </h4>
              <p className="text-xs text-cream/70">
                Celebration Pack starts from ₹1,550 and All Mix Party Pack is ₹900 with Chicken + Mutton + Fish + Prawns.
              </p>
            </div>
          </div>

          <a
            href="#menu"
            onClick={() => onSelectCategory && onSelectCategory('celebration')}
            className="shrink-0 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-gold hover:text-neutral-950 text-gold text-xs font-extrabold uppercase tracking-wider border border-gold/30 transition-all"
          >
            Explore in Menu →
          </a>
        </div>

      </div>
    </section>
  );
};
