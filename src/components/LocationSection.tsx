import React from 'react';
import { MapPin, Navigation, Clock, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO, getWhatsAppLink, isRestaurantOpenNow } from '../data/restaurantInfo';

export const LocationSection: React.FC = () => {
  const openStatus = isRestaurantOpenNow();

  // Embedded Google Map pointing to exact coordinates: 17.4248694, 78.6443877
  const mapEmbedUrl = `https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&hl=en&z=17&output=embed`;

  return (
    <section id="location" className="py-20 md:py-28 bg-[#140d0d] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>VISIT OR TAKEAWAY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            LOCATION &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-cream">
              BRANCH DETAILS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-cream/70 font-normal">
            Conveniently located at Jodimetla, Hyderabad. Stop by for hot takeaway buckets or order ahead for zero wait time.
          </p>
        </div>

        {/* Location Grid: Map + Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Branch & Timings Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Restaurant Branch Details Card */}
            <div className="rounded-3xl bg-neutral-900/90 border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-xs font-black tracking-wider uppercase border border-brand-red/30">
                  Sole Official Branch
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif]">
                  {RESTAURANT_INFO.fullName}
                </h3>
                <p className="text-sm text-cream/80 flex items-start gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <span>Jodimetla, Hyderabad, Telangana</span>
                </p>
              </div>

              {/* Coordinates Pill */}
              <div className="text-xs text-cream/50 bg-neutral-950/60 p-3 rounded-xl border border-white/5 font-mono">
                Coordinates: {RESTAURANT_INFO.coordinates.lat}° N, {RESTAURANT_INFO.coordinates.lng}° E
              </div>

              {/* Opening Hours Card */}
              <div className="rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 p-5 border border-gold/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    <span>Opening Hours</span>
                  </div>
                  {/* Live Status Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{openStatus.statusText}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-extrabold text-white">{RESTAURANT_INFO.openingHours.days}</span>
                  <span className="text-base font-black text-gold">{RESTAURANT_INFO.openingHours.timings}</span>
                </div>

                <div className="text-[11px] text-cream/60 border-t border-white/5 pt-2">
                  Serving hot bucket biryani all afternoon through midnight until 1:00 AM.
                </div>
              </div>

              {/* Quick Contact Numbers */}
              <div className="space-y-3">
                <div className="text-xs uppercase font-bold tracking-wider text-cream/60">
                  Direct Line & Takeaway Orders
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={RESTAURANT_INFO.telLink}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-neutral-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {RESTAURANT_INFO.phone}</span>
                  </a>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-red/30 transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-white/10 bg-neutral-900 shadow-2xl relative min-h-[420px] flex flex-col">
            {/* Top Bar on Map */}
            <div className="bg-neutral-950 px-4 py-3 border-b border-white/10 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-cream">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>Google Maps View: {RESTAURANT_INFO.fullName}</span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gold hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open in App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Iframe */}
            <div className="relative w-full flex-grow min-h-[380px]">
              <iframe
                title="Red Bucket Biryani Jodimetla Google Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
