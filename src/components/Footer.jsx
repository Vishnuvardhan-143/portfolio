import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="relative bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 overflow-hidden transition-colors duration-500 flex flex-col justify-between py-16 min-h-[50vh]">
      
      {/* Decorative Grid Overlay for premium feel */}
      <div className="absolute inset-0 bg-gridlines opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      {/* Centered Watermark Name Section with Dynamic Glow Aura */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full select-none py-12 z-10">
        
        {/* Multilayered Brand Accent Glow Aura */}
        <div 
          className={`absolute w-[60vw] h-[30vh] max-w-[550px] rounded-full filter blur-[100px] md:blur-[140px] transition-all duration-[1000ms] pointer-events-none z-0 ${
            isHovered 
              ? 'bg-gradient-to-r from-terracotta/25 via-orange-500/15 to-emerald-accent/25 dark:from-orange-500/25 dark:via-orange-600/15 dark:to-emerald-500/25 scale-125 opacity-100' 
              : 'bg-terracotta/5 dark:bg-orange-500/5 scale-90 opacity-40'
          }`}
        />

        {/* Premium Watermark Text */}
        <h2 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`font-heading text-[clamp(4.5rem,16vw,13rem)] font-black uppercase transition-all duration-700 ease-out relative z-10 cursor-pointer text-center select-none ${
            isHovered 
              ? 'scale-[1.03] tracking-[0.16em]' 
              : 'scale-100 tracking-[0.06em]'
          }`}
          style={{ 
            WebkitTextStroke: isHovered 
              ? '2px var(--accent-color)' 
              : '1px var(--border-color)',
            color: 'transparent',
            textShadow: isHovered 
              ? '0 0 30px rgba(194,65,12,0.45), 0 0 60px rgba(194,65,12,0.2)' 
              : 'none',
          }}
        >
          {portfolioData.personalInfo.nickname.toUpperCase()}
        </h2>
      </div>

      {/* Bottom Segment - Completely separated to prevent horizontal line overlap */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 z-10 mt-auto">
        <div className="w-full border-t border-zinc-200/50 dark:border-zinc-900/50 my-6" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <div className="text-center sm:text-left leading-relaxed">
            © {currentYear} {portfolioData.personalInfo.fullName}. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="text-terracotta dark:text-orange-500 animate-pulse">*</span> CRAFTED WITH PASSION & PRECISION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

