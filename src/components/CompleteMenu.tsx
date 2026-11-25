import React, { useState } from 'react';
import { Search, Users, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { MENU_ITEMS, type BucketCategoryKey } from '../data/menuData';
import { RESTAURANT_INFO, getOrderItemWhatsAppLink as defaultGetOrderItemWhatsAppLink } from '../data/restaurantInfo';
import { useRestaurantData } from '../context/RestaurantDataContext';

interface CompleteMenuProps {
  selectedCategory?: BucketCategoryKey;
}

export const CompleteMenu: React.FC<CompleteMenuProps> = ({ selectedCategory: propCategory }) => {
  const restaurantContext = useRestaurantData();
  const allItems = restaurantContext?.menuItems || MENU_ITEMS;
  const contactInfo = restaurantContext?.contactInfo || RESTAURANT_INFO;
  const getOrderItemWhatsApp = restaurantContext?.getOrderItemWhatsAppLink || defaultGetOrderItemWhatsAppLink;

  const [activeCategory, setActiveCategory] = useState<BucketCategoryKey | 'all'>(
    propCategory || 'solo'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState<'all' | 'chicken' | 'mutton' | 'seafood' | 'veg' | 'egg'>('all');

  const categories = [
    { key: 'solo', label: 'Solo Bucket', serves: '1–2' },
    { key: 'duo', label: 'Duo Bucket', serves: '2–3' },
    { key: 'party', label: 'Party Pack', serves: '4–6' },
    { key: 'allmix', label: 'All Mix Party', serves: '4–6' },
    { key: 'celebration', label: 'Celebration Pack', serves: '10–12' },
    { key: 'mighty-sixty', label: 'Mighty Sixty', serves: '60' },
    { key: 'all', label: 'View All Items', serves: 'All' },
  ] as const;

  // Filter items
  const filteredItems = allItems.filter((item) => {
    // Category match
    const matchesCategory = activeCategory === 'all' || item.bucketCategory === activeCategory;

    // Search query match
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.foodCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bucketLabel.toLowerCase().includes(searchQuery.toLowerCase());

    // Food type filter match
    const matchesFoodType =
      foodTypeFilter === 'all' ||
      (foodTypeFilter === 'seafood' ? item.foodType === 'seafood' : item.foodType === foodTypeFilter);

    return matchesCategory && matchesSearch && matchesFoodType;
  });

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#140d0d] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>OFFICIAL JODIMETLA MENU & PRICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            SAVOUR THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-cream">
              AUTHENTIC FLAVOURS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream/70 font-normal">
            Every bucket is prepared with premium aged basmati rice, authentic Hyderabadi spices, and accompanied by mirchi ka salan and raita.
          </p>
        </div>

        {/* Category Navigation Pills (Solo, Duo, Party, Celebration, Mighty Sixty, All Mix) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as any)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-red to-deep-red text-white shadow-lg shadow-brand-red/40 scale-105'
                    : 'bg-neutral-900/90 text-cream/80 hover:text-white hover:bg-neutral-800 border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-gold'
                  }`}
                >
                  {cat.serves}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Food Type Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-neutral-900/80 p-3 sm:p-4 rounded-2xl border border-white/10">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken, mutton, prawns..."
              className="w-full bg-neutral-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>

          {/* Food Type Dietary Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {[
              { key: 'all', label: 'All Varieties' },
              { key: 'chicken', label: 'Chicken' },
              { key: 'mutton', label: 'Mutton' },
              { key: 'seafood', label: 'Seafood (Prawns/Fish)' },
              { key: 'egg', label: 'Egg' },
              { key: 'veg', label: 'Vegetarian' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFoodTypeFilter(f.key as any)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  foodTypeFilter === f.key
                    ? 'bg-amber-400/20 text-gold border border-gold/40'
                    : 'text-cream/60 hover:text-cream hover:bg-neutral-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Category Summary Banner */}
        {activeCategory !== 'all' && (
          <div className="mt-6 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent p-4 rounded-xl border-l-4 border-brand-red flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gold" />
              <div>
                <span className="text-xs uppercase tracking-wider text-cream/60">Selected Bucket:</span>
                <h4 className="text-sm sm:text-base font-black text-white uppercase">
                  {categories.find((c) => c.key === activeCategory)?.label}
                </h4>
              </div>
            </div>
            <div className="text-xs text-cream/75">
              Serves <span className="text-gold font-bold">{categories.find((c) => c.key === activeCategory)?.serves} persons</span>
            </div>
          </div>
        )}

        {/* Menu Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isAvail = (item as any).isAvailable !== false;
            return (
              <div
                key={item.id}
                className={`group relative bg-neutral-900/70 hover:bg-neutral-900 rounded-2xl p-5 border transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-between ${
                  isAvail
                    ? 'border-white/5 hover:border-brand-red/40 hover:shadow-brand-red/10'
                    : 'border-amber-500/20 opacity-80 bg-neutral-950/60'
                }`}
              >
                <div>
                  {/* Header: Dietary Dot + Serving Badge + Availability / Bestseller */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {/* Food Dot Indicator (Green for Veg, Red for Non-Veg) */}
                      <div
                        className={`w-4 h-4 rounded-sm border p-0.5 flex items-center justify-center ${
                          item.isVeg ? 'border-emerald-500' : 'border-red-600'
                        }`}
                        title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-emerald-500' : 'bg-red-600'
                          }`}
                        />
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-cream/60">
                        {item.foodCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {!isAvail ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                          Currently Sold Out
                        </span>
                      ) : item.isBestseller ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-red/20 text-brand-red border border-brand-red/30">
                          Popular
                        </span>
                      ) : null}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-gold border border-white/10">
                        Serves {item.serves}
                      </span>
                    </div>
                  </div>

                  {/* Item Name */}
                  <h3 className="text-base sm:text-lg font-black text-white font-['Montserrat',sans-serif] group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>

                  {/* Bucket Category Label */}
                  <div className="text-xs font-semibold text-brand-red mt-0.5">
                    {item.bucketLabel}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-cream/70 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Price & Action CTA */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-cream/50 uppercase tracking-wider">Price</div>
                    <div className="text-xl sm:text-2xl font-black text-gold">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* WhatsApp Order Button or Sold Out indicator */}
                    {isAvail ? (
                      <a
                        href={getOrderItemWhatsApp(item.name, item.bucketLabel, item.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white text-xs font-extrabold shadow-md shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
                        title={`Order ${item.name} via WhatsApp`}
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Order</span>
                      </a>
                    ) : (
                      <span
                        className="px-3 py-2 rounded-xl bg-neutral-800 text-cream/40 text-xs font-bold border border-white/5 cursor-not-allowed"
                        title="This dish is currently sold out for today"
                      >
                        Sold Out
                      </span>
                    )}

                    {/* Call Direct */}
                    <a
                      href={contactInfo.telLink}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-gold border border-gold/30"
                      title="Call Branch to Inquire"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search yields no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-white/10 space-y-3">
            <p className="text-lg font-bold text-cream">No biryani items matched your filter "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setFoodTypeFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Ordering Guarantee */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-900/60 border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white">Ordering for a party or celebration in Jodimetla?</h4>
            <p className="text-xs text-cream/70">
              Pre-book celebration buckets and Mighty Sixty catering by calling {contactInfo.phone}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={contactInfo.telLink}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-neutral-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {contactInfo.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
