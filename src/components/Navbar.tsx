import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { RESTAURANT_INFO, getWhatsAppLink as defaultGetWhatsAppLink, isRestaurantOpenNow } from '../data/restaurantInfo';
import { useRestaurantData } from '../context/RestaurantDataContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const openStatus = isRestaurantOpenNow();

  const data = useRestaurantData();
  const contact = data?.contactInfo || RESTAURANT_INFO;
  const getWaLink = data?.getWhatsAppLink || defaultGetWhatsAppLink;

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Our Buckets', href: '#buckets', id: 'buckets' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Special Packs', href: '#special-packs', id: 'special-packs' },
    { name: 'Why RBB', href: '#why-us', id: 'why-us' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Location', href: '#location', id: 'location' },
  ];

  // Handle scroll for sticky header styling & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const scrollPosition = window.scrollY + 140;
      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key press or screen enlargement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-950/95 backdrop-blur-md shadow-xl border-b border-brand-red/20 py-2 sm:py-2.5'
            : 'bg-gradient-to-b from-neutral-950/95 via-neutral-950/80 to-transparent py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            {/* ========================================================= */}
            {/* LEFT: Restaurant Logo + Brand Name + Jodimetla Branch     */}
            {/* ========================================================= */}
            <a
              href="#home"
              className="group shrink-0 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-lg"
              aria-label="Red Bucket Biryani Home"
            >
              <Logo />
            </a>

            {/* ========================================================= */}
            {/* CENTER: Desktop Navigation Links                          */}
            {/* ========================================================= */}
            <nav
              className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-2 py-1 rounded-full bg-neutral-900/60 border border-white/5 backdrop-blur-sm"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-gold bg-white/10 shadow-sm'
                        : 'text-cream/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gold" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ========================================================= */}
            {/* RIGHT: Desktop Action Buttons (Equal Heights & Padding)   */}
            {/* ========================================================= */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
              {/* Call Button */}
              <a
                href={contact.telLink}
                className="h-10 inline-flex items-center justify-center gap-2 px-3.5 xl:px-4 rounded-xl bg-neutral-900 border border-gold/50 text-gold hover:bg-gold hover:text-neutral-950 font-bold text-xs xl:text-sm transition-all shadow-md active:scale-95"
                title={`Call ${contact.displayPhone}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {contact.phone}</span>
              </a>

              {/* Order Now Button */}
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 inline-flex items-center justify-center gap-2 px-4 xl:px-5 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white font-black text-xs xl:text-sm uppercase tracking-wider transition-all shadow-lg shadow-brand-red/30 hover:scale-[1.03] active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order Now</span>
              </a>
            </div>

            {/* ========================================================= */}
            {/* MOBILE HEADER: Clean Touch-Friendly Controls (RIGHT)      */}
            {/* ========================================================= */}
            <div className="flex items-center gap-1.5 lg:hidden">
              {/* Quick Mobile Call Pill */}
              <a
                href={RESTAURANT_INFO.telLink}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900 border border-gold/40 text-gold active:scale-95"
                aria-label="Call Restaurant"
                title={`Call ${RESTAURANT_INFO.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-white/10 text-cream hover:text-gold active:scale-95 focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE NAVIGATION DRAWER / SIDEBAR                         */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end overflow-hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div 
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="relative z-10 w-[88vw] max-w-[340px] sm:max-w-sm h-full h-[100dvh] max-h-[100dvh] bg-[#120808] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain animate-in slide-in-from-right duration-300"
          >
            
            {/* Drawer Header (Sticky at top, always visible & accessible) */}
            <div className="sticky top-0 z-20 p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/95 backdrop-blur-md shrink-0">
              <Logo showBranch={false} />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-white/15 text-cream hover:text-gold active:scale-95 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body - Navigation Links (Scrollable area) */}
            <div className="px-4 py-5 space-y-1.5 flex-1 min-h-0">
              
              {/* Store Status Pill */}
              <div className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-semibold w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{openStatus.statusText}</span>
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleNavLinkClick}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-red/20 to-transparent text-gold border-l-4 border-gold'
                        : 'text-cream/90 hover:text-white hover:bg-neutral-900/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-cream/30 text-sm">→</span>
                  </a>
                );
              })}
            </div>

            {/* Drawer Footer - Contact CTAs (Sticky at bottom, safe-area aware) */}
            <div className="sticky bottom-0 z-20 p-4 sm:p-5 border-t border-white/10 bg-neutral-950/95 backdrop-blur-md space-y-2.5 sm:space-y-3 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {/* Call Button */}
              <a
                href={contact.telLink}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 border border-gold/50 text-gold font-bold text-sm shadow-md active:scale-98"
              >
                <Phone className="w-4 h-4" />
                <span>Call to Order: {contact.phone}</span>
              </a>

              {/* Order via WhatsApp */}
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-deep-red text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>

              <div className="pt-2 text-center text-xs text-cream/50 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <span>{contact.branchName}, Hyderabad</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
