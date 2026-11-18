import React from 'react';
import { Star, ExternalLink, CheckCircle2, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const GoogleReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#100909] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Review Card */}
        <div className="rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border-2 border-white/10 p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Google themed accent bar at the top */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

          {/* Google Icon & Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-cream mb-6">
            {/* Google SVG G-Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google Reviews • Jodimetla Branch</span>
          </div>

          {/* Section Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            YOUR EXPERIENCE MATTERS TO US.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Enjoyed your Red Bucket Biryani experience? Share your feedback and help other biryani lovers discover us.
          </p>

          {/* Google-Style Star Rating Visual */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10"
              >
                <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 text-amber-400" />
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs uppercase tracking-widest text-gold font-bold">
            Verified Reviews on Google Maps
          </div>

          {/* Both Action Buttons (Opening supplied Google link in new tab) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            {/* Write a Review Button */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-red via-deep-red to-burgundy hover:from-red-600 hover:to-brand-red text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Write a Review</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Read Google Reviews Button */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm uppercase tracking-wider border border-white/20 hover:border-gold transition-all shadow-md"
            >
              <span>Read Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>
          </div>

          {/* Transparency Disclaimer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-cream/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All customer reviews and ratings are hosted and verified directly on official Google Maps.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
