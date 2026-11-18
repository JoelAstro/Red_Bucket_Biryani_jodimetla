import React from 'react';
import { Flame, Users, Sparkles, Phone, MessageCircle, Crown, Award, Check } from 'lucide-react';
import { RESTAURANT_INFO, getOrderItemWhatsAppLink } from '../data/restaurantInfo';

export const SpecialPacksShowcase: React.FC = () => {
  return (
    <section id="special-packs" className="py-20 md:py-28 bg-[#100b0b] relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[550px] h-[550px] bg-gold/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-gold text-xs font-black tracking-widest uppercase">
            <Crown className="w-4 h-4 text-gold" />
            <span>SIGNATURE CHEF SPECIALS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            LEGENDARY PACKS FOR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-cream">
              EXTRAORDINARY MOMENTS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream/70 font-normal">
            Experience our two most celebrated offerings: the all-in-one quad-meat feast and the monumental 60-person celebration biryani.
          </p>
        </div>

        {/* 1. RBB ALL MIX PARTY PACK - Quad Meat Masterpiece */}
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-[#22070a] border-2 border-brand-red/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          {/* Saffron and red accent gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Graphic Representation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden bg-neutral-900/80 border border-gold/30 shadow-2xl flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                  alt="RBB All Mix Party Pack Biryani"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                {/* Quad Badge Floating */}
                <div className="absolute top-4 left-4 bg-brand-red/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-white text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-gold" />
                  <span>QUAD-MEAT FEAST</span>
                </div>

                {/* 4 Ingedients Floating Pill */}
                <div className="absolute bottom-4 inset-x-4 bg-neutral-950/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-[11px] font-bold text-gold uppercase tracking-wider">All In One Bucket</div>
                  <div className="text-xs sm:text-sm font-extrabold text-white">
                    Chicken + Mutton + Fish + Prawns
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-black tracking-wider uppercase border border-gold/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Only ₹900 • Ultimate Value</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white font-['Montserrat',sans-serif]">
                  RBB ALL MIX PARTY PACK
                </h3>

                <p className="text-cream/80 text-base leading-relaxed">
                  Why choose one when you can experience them all? Our signature quad-meat celebration combines tender spiced Chicken, slow-cooked royal Mutton, succulent coastal Prawns, and delicate marinated Fish fillets in a single aromatic basmati bucket.
                </p>
              </div>

              {/* Meat Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-brand-red/30 text-center">
                  <div className="text-base font-black text-white">Chicken</div>
                  <div className="text-[10px] text-cream/60">Tender Dum Cut</div>
                </div>
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-gold/30 text-center">
                  <div className="text-base font-black text-gold">Mutton</div>
                  <div className="text-[10px] text-cream/60">Royal Spiced</div>
                </div>
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-blue-400/30 text-center">
                  <div className="text-base font-black text-blue-300">Prawns</div>
                  <div className="text-[10px] text-cream/60">Coastal Flavor</div>
                </div>
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-emerald-400/30 text-center">
                  <div className="text-base font-black text-emerald-300">Fish</div>
                  <div className="text-[10px] text-cream/60">Herb Infused</div>
                </div>
              </div>

              {/* Price & Serving */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <div className="text-xs uppercase tracking-wider text-cream/60">Serves</div>
                  <div className="text-lg font-black text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold" />
                    <span>4–6 Persons</span>
                  </div>
                </div>

                <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

                <div>
                  <div className="text-xs uppercase tracking-wider text-cream/60">Actual Price</div>
                  <div className="text-3xl font-black text-gold">₹900</div>
                </div>

                <div className="flex-grow flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={getOrderItemWhatsAppLink('RBB All Mix Party Pack (Chicken+Mutton+Fish+Prawns)', 'Party Pack', 900)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-brand-red/30 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order All Mix Now</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.telLink}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gold border border-gold/40 text-sm font-bold transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. RBB MIGHTY SIXTY - Catering Grand Feast */}
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-950 via-[#1c1206] to-neutral-950 border-2 border-gold/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          {/* Gold ambient backlight */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Content & Details */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-black tracking-wider uppercase border border-gold/40">
                  <Award className="w-4 h-4 text-gold" />
                  <span>Grand Catering Feast • Serves 60 Persons</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white font-['Montserrat',sans-serif]">
                  RBB MIGHTY SIXTY
                </h3>

                <p className="text-cream/80 text-base leading-relaxed">
                  The ultimate feast designed for monumental celebrations. Cooked in grand traditional handis by our master ustads, the Mighty Sixty feeds 60 guests with authentic Hyderabadi Dum Biryani, complete with generous gravy, salan, and raita. Ideal for marriages, corporate events, housewarmings, and festive gatherings.
                </p>
              </div>

              {/* Two Flavors Available */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Chicken Dum 60 Pax */}
                <div className="bg-neutral-900/90 p-5 rounded-2xl border border-brand-red/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cream/70">Chicken Option</span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/30">
                      60 Pax
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white">RBB Chicken Dum Biryani</h4>
                  <div className="text-2xl font-black text-gold">₹9,000</div>
                  <a
                    href={getOrderItemWhatsAppLink('RBB Mighty Sixty - Chicken Dum Biryani', 'Mighty Sixty (60 Pax)', 9000)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 rounded-lg bg-brand-red hover:bg-red-600 text-white text-xs font-bold transition-all shadow-md"
                  >
                    Enquire / Order Chicken
                  </a>
                </div>

                {/* Mutton Dum 60 Pax */}
                <div className="bg-neutral-900/90 p-5 rounded-2xl border border-gold/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cream/70">Mutton Option</span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-gold/20 text-gold border border-gold/40">
                      60 Pax
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white">RBB Mutton Dum Biryani</h4>
                  <div className="text-2xl font-black text-gold">₹13,000</div>
                  <a
                    href={getOrderItemWhatsAppLink('RBB Mighty Sixty - Mutton Dum Biryani', 'Mighty Sixty (60 Pax)', 13000)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 rounded-lg bg-gradient-to-r from-amber-500 to-gold text-neutral-950 text-xs font-black hover:brightness-110 transition-all shadow-md"
                  >
                    Enquire / Order Mutton
                  </a>
                </div>
              </div>

              {/* Catering Perks */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-cream/70 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Advance Booking Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Insulated Mega Packaging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Complimentary Salan & Raita</span>
                </div>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden bg-neutral-900/80 border border-gold/40 shadow-2xl flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                  alt="RBB Mighty Sixty Catering Biryani Feast"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                {/* Mighty Sixty Badge */}
                <div className="absolute top-4 right-4 bg-gold text-neutral-950 px-3 py-1 rounded-full font-black text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                  <Crown className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
                  <span>SERVES 60 GUESTS</span>
                </div>

                <div className="absolute bottom-4 inset-x-4 bg-neutral-950/90 backdrop-blur-md p-3 rounded-xl border border-gold/30 text-center">
                  <div className="text-[11px] font-bold text-gold uppercase tracking-wider">Monumental Catering</div>
                  <div className="text-xs sm:text-sm font-extrabold text-white">
                    Direct Kitchen Delivery in Jodimetla
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
