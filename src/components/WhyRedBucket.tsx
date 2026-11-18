import React from 'react';
import { Package, Users, Sparkles, Heart, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const WhyRedBucket: React.FC = () => {
  const pillars = [
    {
      icon: Package,
      title: 'Bucket-Sized Happiness',
      description:
        'Our signature cylindrical red buckets are engineered for takeaway perfection. They keep your biryani piping hot, maintain aromatic moisture, and make sharing effortless.',
      accent: 'border-brand-red/40 bg-brand-red/10 text-brand-red',
    },
    {
      icon: Users,
      title: 'Choices for Individuals & Groups',
      description:
        'From a solo craving after a long workday to a duo date night, a weekend family gathering, or a 60-person celebration, there is an exact bucket portion crafted for you.',
      accent: 'border-gold/40 bg-gold/10 text-gold',
    },
    {
      icon: Sparkles,
      title: 'Special Party & Celebration Packs',
      description:
        'Experience our unique All Mix Party Pack combining chicken, mutton, fish, and prawns, as well as our monumental Mighty Sixty catering handi for memorable occasions.',
      accent: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
    {
      icon: Heart,
      title: 'A Destination for Biryani Lovers',
      description:
        'Located conveniently at Jodimetla, Hyderabad, we are committed to being your reliable local destination for authentic Hyderabadi bucket biryani, open daily from noon until 1 AM.',
      accent: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#0f0909] relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            <span>THE RED BUCKET PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            NOT JUST BIRYANI.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-gold">
              IT'S A BUCKET EXPERIENCE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream/70 font-normal">
            We reimagined how Hyderabad enjoys its most beloved dish. Generous portions, signature vibrant red containers, and unforgettable moments shared with family and friends.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative bg-neutral-900/60 hover:bg-neutral-900/90 rounded-2xl p-6 sm:p-7 border border-white/5 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${pillar.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white font-['Montserrat',sans-serif] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-cream/50 font-bold uppercase tracking-wider">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jodimetla Branch Identity Card */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-neutral-950 via-burgundy/30 to-neutral-950 border border-brand-red/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-black text-gold uppercase tracking-widest">
              HYDERABAD'S SIGNATURE BUCKET BIRYANI
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white font-['Montserrat',sans-serif]">
              Serving Jodimetla with Pride Every Day
            </h4>
            <p className="text-xs sm:text-sm text-cream/75 max-w-2xl">
              Authentic Dum cooking, warm takeaway hospitality, and generous portions from 12:00 PM until 1:00 AM midnight.
            </p>
          </div>

          <a
            href={RESTAURANT_INFO.telLink}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 hover:scale-105 transition-all"
          >
            Call {RESTAURANT_INFO.phone}
          </a>
        </div>

      </div>
    </section>
  );
};
