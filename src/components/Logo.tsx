import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'icon' | 'stacked';
  className?: string;
  showBranch?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  className = '',
  showBranch = true,
}) => {
  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Circular red badge */}
          <circle cx="32" cy="32" r="30" fill="#F20B12" />
          <circle cx="32" cy="32" r="28" stroke="#FFD21C" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />

          {/* Steam */}
          <path d="M26 15 C25 12, 27 10, 26 7" stroke="#FFF0DA" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M32 14 C31 11, 33 9, 32 6" stroke="#FFF0DA" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.95" />
          <path d="M38 15 C37 12, 39 10, 38 7" stroke="#FFF0DA" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.85" />

          {/* Biryani top */}
          <ellipse cx="32" cy="20.5" rx="14" ry="4.5" fill="#FFD21C" />
          <ellipse cx="32" cy="20.5" rx="12" ry="3.5" fill="#E6A110" />

          {/* Bucket */}
          <path d="M16 21 L20.5 49 C20.8 51 23 52.5 25.5 52.5 L38.5 52.5 C41 52.5 43.2 51 43.5 49 L48 21 Z" fill="#C90016" stroke="#720015" strokeWidth="1" />
          <path d="M15 21 C15 18.5, 49 18.5, 49 21 C49 23.5, 15 23.5, 15 21 Z" fill="#FFD21C" stroke="#B8860B" strokeWidth="0.8" />
          <ellipse cx="32" cy="21" rx="15.5" ry="2.2" fill="#FFE57F" />

          {/* White Shield */}
          <rect x="22.5" y="27" width="19" height="15" rx="2.5" fill="#FFFFFF" />
          <rect x="23.5" y="28" width="17" height="13" rx="1.5" stroke="#F20B12" strokeWidth="0.8" fill="none" />
          <text x="32" y="37" fontFamily="'Impact', sans-serif" fontWeight="900" fontSize="7.5" fill="#C90016" textAnchor="middle">
            RBB
          </text>
          <text x="32" y="40.2" fontFamily="'Arial', sans-serif" fontWeight="bold" fontSize="2.6" fill="#720015" textAnchor="middle">
            BIRYANI
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 shrink-0">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <circle cx="32" cy="32" r="30" fill="#F20B12" />
          <circle cx="32" cy="32" r="28" stroke="#FFD21C" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
          
          <path d="M26 15 C25 12, 27 10, 26 7" stroke="#FFF0DA" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M32 14 C31 11, 33 9, 32 6" stroke="#FFF0DA" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.95" />
          <path d="M38 15 C37 12, 39 10, 38 7" stroke="#FFF0DA" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.85" />

          <ellipse cx="32" cy="20.5" rx="14" ry="4.5" fill="#FFD21C" />
          <ellipse cx="32" cy="20.5" rx="12" ry="3.5" fill="#E6A110" />

          <path d="M16 21 L20.5 49 C20.8 51 23 52.5 25.5 52.5 L38.5 52.5 C41 52.5 43.2 51 43.5 49 L48 21 Z" fill="#C90016" stroke="#720015" strokeWidth="1" />
          <path d="M15 21 C15 18.5, 49 18.5, 49 21 C49 23.5, 15 23.5, 15 21 Z" fill="#FFD21C" stroke="#B8860B" strokeWidth="0.8" />
          <ellipse cx="32" cy="21" rx="15.5" ry="2.2" fill="#FFE57F" />

          <rect x="22.5" y="27" width="19" height="15" rx="2.5" fill="#FFFFFF" />
          <rect x="23.5" y="28" width="17" height="13" rx="1.5" stroke="#F20B12" strokeWidth="0.8" fill="none" />
          <text x="32" y="37" fontFamily="'Impact', sans-serif" fontWeight="900" fontSize="7.5" fill="#C90016" textAnchor="middle">
            RBB
          </text>
          <text x="32" y="40.2" fontFamily="'Arial', sans-serif" fontWeight="bold" fontSize="2.6" fill="#720015" textAnchor="middle">
            BIRYANI
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1 font-black tracking-tight text-white font-['Montserrat',sans-serif]">
          <span className="text-xs xs:text-sm sm:text-base md:text-lg font-black tracking-wider text-white">RED</span>
          <span className="text-xs xs:text-sm sm:text-base md:text-lg font-black tracking-wider text-gold">BUCKET</span>
          <span className="text-[10px] xs:text-xs sm:text-sm md:text-base font-extrabold tracking-wider text-cream/90 ml-0.5">BIRYANI</span>
        </div>

        {showBranch && (
          <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse" />
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-widest uppercase text-brand-red bg-amber-300/10 px-1.5 py-0.5 rounded border border-brand-red/30 whitespace-nowrap">
              Jodimetla Branch
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
