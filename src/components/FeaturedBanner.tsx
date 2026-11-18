import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Utensils, MessageCircle, ArrowRight, Flame, Users, Clock, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '../data/restaurantInfo';

export const FeaturedBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bannerRef}
      id="featured-campaign"
      className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#0d0203] via-[#1e0609] to-[#130507] overflow-hidden select-none"
    >
      {/* Background Cinematic Glows & Amber Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-red/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffd21c_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Campaign Banner Frame */}
        <div
          className={`relative rounded-3xl bg-gradient-to-br from-neutral-950/95 via-[#1a0609]/95 to-neutral-950/95 border border-gold/30 shadow-[0_20px_50px_rgba(242,11,18,0.2)] p-5 sm:p-8 lg:p-12 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle Ambient Red/Gold Top Border Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ========================================================= */}
            {/* LEFT (Desktop) / TOP (Mobile): Real Customer Photograph    */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-1">
              <div className="relative group w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px]">
                
                {/* Warm Ambient Glow Behind Photograph */}
                <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-brand-red/35 via-gold/20 to-burgundy/40 blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Real Customer Experience Photograph Container */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/40 shadow-2xl bg-neutral-950 aspect-[4/5] flex items-center justify-center">
                  <img
                    src="/images/customer-experience.png"
                    alt="Real customers enjoying Red Bucket Biryani"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Subtle Gradient Overlay at bottom for seamless photo contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Verified Customer Experience Badge */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1.5 rounded-full bg-neutral-950/85 backdrop-blur-md border border-gold/40 text-gold text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Real Customer Love</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT (Desktop) / BOTTOM (Mobile): Content & Features      */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-2">
              
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-red/20 text-brand-red border border-brand-red/40 text-xs font-black tracking-wider uppercase">
                  Signature Takeaway Packaging
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black text-white font-['Montserrat',sans-serif] leading-tight">
                  The Iconic Bucket Biryani Experience
                </h2>

                <p className="text-sm sm:text-base text-cream/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Served in authentic food-grade insulated buckets that lock in the fragrant steam and mouth-watering aroma from our kitchen directly to your family table.
                </p>
              </div>

              {/* Campaign Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-3.5 rounded-2xl bg-neutral-900/75 border border-white/5 hover:border-gold/30 transition-all space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-brand-red" />
                    <span className="text-xs sm:text-sm font-black text-gold">Authentic Dum Flavor</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-cream/70 pl-5.5">Fragrant basmati layered with rich spices</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900/75 border border-white/5 hover:border-gold/30 transition-all space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold" />
                    <span className="text-xs sm:text-sm font-black text-gold">Any Sized Gathering</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-cream/70 pl-5.5">From Solo (1–2) to Mighty Sixty (60 Pax)</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900/75 border border-white/5 hover:border-gold/30 transition-all space-y-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-black text-gold">Piping Hot Delivery</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-cream/70 pl-5.5">Sealed to preserve fresh dum aroma</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900/75 border border-white/5 hover:border-gold/30 transition-all space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs sm:text-sm font-black text-gold">Open Till 1:00 AM</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-cream/70 pl-5.5">Everyday lunch, dinner & late night</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href="#buckets"
                  className="h-12 px-6 sm:px-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-red via-deep-red to-burgundy hover:from-red-600 hover:to-brand-red text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-brand-red/35 active:scale-98 transition-all group"
                >
                  <Utensils className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
                  <span>EXPLORE OUR BUCKETS</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={getWhatsAppLink('Hi Red Bucket Biryani, I would like to order biryani from the Jodimetla Branch.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-6 sm:px-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/40 active:scale-98 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>ORDER ON WHATSAPP</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
