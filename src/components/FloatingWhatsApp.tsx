import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { RESTAURANT_INFO, getWhatsAppLink } from '../data/restaurantInfo';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Quick Contact Actions"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-3 sm:right-5 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto"
    >
      {/* Desktop-Only Discrete Tooltip (Dismissible, Never on Mobile) */}
      {showTooltip && (
        <div className="relative bg-neutral-900/95 backdrop-blur-md text-cream text-xs p-3 rounded-2xl border border-brand-red/40 shadow-2xl max-w-[220px] hidden md:block animate-in fade-in slide-in-from-bottom-2">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 p-1 bg-neutral-950 text-white rounded-full border border-white/20 hover:bg-brand-red transition-colors"
            aria-label="Dismiss tooltip"
          >
            <X className="w-2.5 h-2.5" />
          </button>
          <div className="font-bold text-gold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Craving Biryani?</span>
          </div>
          <p className="mt-1 text-cream/75 text-[11px] leading-tight">
            Order directly via WhatsApp for Jodimetla takeaway!
          </p>
        </div>
      )}

      {/* Floating Action Buttons Cluster */}
      <div className="flex items-center gap-2">
        {/* Floating Call Button */}
        <a
          href={RESTAURANT_INFO.telLink}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-900/95 border border-gold/50 text-gold hover:bg-gold hover:text-neutral-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
          title={`Call ${RESTAURANT_INFO.displayPhone}`}
          aria-label="Call Restaurant"
        >
          <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20BA56] text-white flex items-center justify-center shadow-xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all"
          title="Order on WhatsApp: +91 80089 06029"
          aria-label="WhatsApp Us"
        >
          {/* Subtle pulse aura */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          {/* Official WhatsApp SVG Icon */}
          <svg className="w-6 h-6 fill-white relative z-10" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.1 8.1 0 01-1.24-4.29c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.78 2.39s2.4 3.59 2.4 5.78c-.01 4.51-3.68 8.16-8.13 8.16zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};
