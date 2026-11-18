import React from 'react';
import { Phone, Utensils, Flame, Users, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[92vh] pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#240609] via-[#160406] to-[#0d0203]"
    >
      {/* Subtle Cinematic Ambient Lighting & Glows */}
      <div className="absolute top-1/4 right-1/4 -translate-y-1/2 w-[350px] sm:w-[550px] lg:w-[650px] h-[350px] sm:h-[550px] lg:h-[650px] bg-brand-red/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[550px] h-[300px] sm:h-[450px] lg:h-[550px] bg-gold/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-burgundy/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Warm Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffd21c_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN (Desktop) / MAIN CONTENT (Mobile)              */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6">
            
            {/* 1. Branch Identification Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-900/90 border border-gold/40 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] text-gold font-['Montserrat',sans-serif]">
                JODIMETLA BRANCH • HYDERABAD
              </span>
            </div>

            {/* 2. Main Headline - Controlled Mobile & Desktop Typography */}
            <div className="space-y-1 sm:space-y-1.5 w-full">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.25rem] font-black text-white tracking-tight leading-[1.12] font-['Montserrat',sans-serif] uppercase">
                BUCKETS FULL OF BIRYANI.
              </h1>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.25rem] font-black tracking-tight leading-[1.12] font-['Montserrat',sans-serif] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFE57F] via-[#FFD21C] to-[#E6A110] drop-shadow-[0_2px_15px_rgba(255,210,28,0.2)]">
                HEARTS FULL OF HAPPINESS.
              </h2>
            </div>

            {/* 3. Supporting Description */}
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-cream/80 max-w-xl font-normal leading-relaxed">
              Your favourite biryani, served in signature buckets. Perfect for every craving and every celebration.
            </p>

            {/* ========================================================= */}
            {/* 4. MOBILE-ONLY HERO VISUAL (Positioned between text & CTAs) */}
            {/* ========================================================= */}
            <div className="lg:hidden w-full my-3 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[290px] xs:max-w-[330px] sm:max-w-[390px] flex items-center justify-center">
                {/* Soft Ambient Red Backlight */}
                <div className="absolute w-52 h-52 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" />
                <div className="absolute w-40 h-40 rounded-full bg-gold/15 blur-2xl pointer-events-none" />

                {/* Hero Woman Holding Biryani Bucket with Bottom Fade Mask */}
                <div 
                  className="relative z-10 w-full overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)'
                  }}
                >
                  <img
                    src="/images/hero-woman-isolated.png"
                    alt="Red Bucket Biryani Jodimetla - Woman holding signature biryani bucket"
                    loading="eager"
                    className="w-full h-auto max-h-[380px] xs:max-h-[420px] sm:max-h-[470px] object-contain mx-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-0.5 rounded-full bg-neutral-900/80 border border-gold/30 text-[10px] sm:text-xs text-gold/90 font-medium backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Signature Red Bucket • Fresh Dum Biryani</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5 & 6. Primary Action Buttons (Full-Width on Mobile)      */}
            {/* ========================================================= */}
            <div className="w-full sm:w-auto pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Explore Our Buckets */}
              <a
                href="#buckets"
                className="w-full sm:w-auto h-12 px-6 sm:px-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-red via-deep-red to-burgundy hover:from-red-600 hover:to-brand-red text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-brand-red/35 active:scale-98 transition-all group"
              >
                <Utensils className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
                <span>EXPLORE OUR BUCKETS</span>
                <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Call to Order */}
              <a
                href={RESTAURANT_INFO.telLink}
                className="w-full sm:w-auto h-12 px-6 sm:px-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-gold hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-gold/50 hover:border-gold transition-all shadow-md active:scale-98"
              >
                <Phone className="w-4 h-4" />
                <span>CALL TO ORDER</span>
              </a>
            </div>

            {/* Hallmarks Feature Row */}
            <div className="pt-4 sm:pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-xl text-left">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900/40 border border-white/5">
                <Flame className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">Dum Cooked</div>
                  <div className="text-[9px] sm:text-[10px] text-cream/60">Hot & Fresh</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900/40 border border-white/5">
                <Users className="w-3.5 h-3.5 text-gold shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">1 to 60 Pax</div>
                  <div className="text-[9px] sm:text-[10px] text-cream/60">Solo to Event</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900/40 border border-white/5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">12 PM – 1 AM</div>
                  <div className="text-[9px] sm:text-[10px] text-cream/60">Every Day</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900/40 border border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">Sealed Bucket</div>
                  <div className="text-[9px] sm:text-[10px] text-cream/60">Leak-Proof</div>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Desktop-Only Food Photography Visual        */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col items-center justify-center">
            
            {/* Ambient Halo Behind Image */}
            <div className="absolute w-[400px] xl:w-[480px] h-[400px] xl:h-[480px] rounded-full bg-gradient-to-tr from-brand-red/30 via-gold/15 to-burgundy/40 blur-[90px] pointer-events-none" />

            {/* Promotional Image Container with Smooth Bottom Fade Mask */}
            <div className="relative w-full max-w-[440px] xl:max-w-[500px] flex flex-col items-center justify-center select-none py-2">
              
              <div
                className="relative z-10 w-full overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                }}
              >
                <img
                  src="/images/hero-woman-isolated.png"
                  alt="Red Bucket Biryani Jodimetla - Signature Biryani Bucket"
                  loading="eager"
                  className="w-full h-auto max-h-[520px] xl:max-h-[580px] object-contain mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Subtle Verified Caption Badge */}
              <div className="inline-flex items-center gap-2 mt-2 px-3.5 py-1 rounded-full bg-neutral-900/80 border border-gold/30 text-xs text-gold/90 font-medium backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Authentic Dum Biryani • Jodimetla Branch</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
