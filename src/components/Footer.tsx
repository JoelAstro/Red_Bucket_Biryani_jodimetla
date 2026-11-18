import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ExternalLink, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { RESTAURANT_INFO, getWhatsAppLink } from '../data/restaurantInfo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 border-t border-brand-red/20 pt-16 pb-12 text-cream/70 text-sm relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo className="scale-105 origin-left" />
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed pt-2">
              Authentic Hyderabadi bucket biryani served in signature insulated red containers. Perfect for daily cravings, duo dinners, family gatherings, and grand catering celebrations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-cream/60">Follow us:</span>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-cream/60 hover:text-gold cursor-pointer transition-colors" title="Instagram (Official handle coming soon)">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-cream/60 hover:text-gold cursor-pointer transition-colors" title="Facebook (Official page coming soon)">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </span>
                <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-cream/60 hover:text-gold cursor-pointer transition-colors" title="YouTube (Official channel coming soon)">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-black text-sm uppercase tracking-wider font-['Montserrat',sans-serif]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-gold transition-colors">Home</a>
              </li>
              <li>
                <a href="#buckets" className="hover:text-gold transition-colors">Bucket Sizes</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold transition-colors">Complete Menu</a>
              </li>
              <li>
                <a href="#special-packs" className="hover:text-gold transition-colors">Special Packs</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-gold transition-colors">Why Red Bucket</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold transition-colors">Food Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-gold transition-colors">Google Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold transition-colors">Location Map</a>
              </li>
            </ul>
          </div>

          {/* Bucket Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-black text-sm uppercase tracking-wider font-['Montserrat',sans-serif]">
              Bucket Portions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>Solo Bucket (1–2 Pax)</span>
                  <span className="text-gold font-bold">from ₹170</span>
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>Duo Bucket (2–3 Pax)</span>
                  <span className="text-gold font-bold">from ₹310</span>
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>Party Pack (4–6 Pax)</span>
                  <span className="text-gold font-bold">from ₹700</span>
                </a>
              </li>
              <li>
                <a href="#special-packs" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>All Mix Pack (4–6 Pax)</span>
                  <span className="text-gold font-bold">₹900</span>
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>Celebration Pack (10–12 Pax)</span>
                  <span className="text-gold font-bold">from ₹1,550</span>
                </a>
              </li>
              <li>
                <a href="#special-packs" className="hover:text-gold transition-colors flex items-center justify-between">
                  <span>Mighty Sixty (60 Pax)</span>
                  <span className="text-gold font-bold">from ₹9,000</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Branch Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-black text-sm uppercase tracking-wider font-['Montserrat',sans-serif]">
              Jodimetla Branch
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Red Bucket Biryani, Jodimetla, Hyderabad, Telangana</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{RESTAURANT_INFO.openingHours.days}: {RESTAURANT_INFO.openingHours.timings}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={RESTAURANT_INFO.telLink} className="hover:text-gold font-bold">
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-bold"
                >
                  WhatsApp Ordering Available
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-bold"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50 text-center sm:text-left">
          <div>
            © {currentYear} {RESTAURANT_INFO.brandName} – {RESTAURANT_INFO.branchName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red" />
            <span>for Biryani Lovers in Hyderabad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
