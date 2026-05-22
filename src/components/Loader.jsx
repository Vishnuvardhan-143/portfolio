import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const loadingTexts = ["INITIALIZING", "SYNCING...", "FETCHING DATA.."];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Switch text sequence every 800ms
    const interval = setInterval(() => {
      setTextIndex(prev => (prev < 2 ? prev + 1 : prev));
    }, 800);

    // Fade out preloader after 2.5 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] bg-[#0c0c0c] flex flex-col items-center justify-center select-none"
    >
      <div className="flex flex-col items-center gap-10">
        
        {/* Concentric Rotating Rings Graphic */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          
          {/* Ring 1 (Outer Ring) with the Orange Glowing Dot */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute w-32 h-32 rounded-full border border-zinc-800/80"
          >
            {/* Glowing Orange Dot rotating on the outer path */}
            <div className="absolute w-3 h-3 rounded-full bg-terracotta dark:bg-orange-500 -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_12px_#ea580c] dark:shadow-[0_0_15px_#f97316]" />
          </motion.div>

          {/* Ring 2 (Middle Ring - Counter Rotational) */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute w-24 h-24 rounded-full border border-zinc-800/50 border-t-terracotta/40 dark:border-t-orange-500/40 border-b-terracotta/40 dark:border-b-orange-500/40"
          />

          {/* Ring 3 (Inner Ring - Dashed) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute w-16 h-16 rounded-full border border-dashed border-zinc-700/40"
          />

          {/* Center Core Glowing Dot */}
          <div className="relative w-4 h-4 rounded-full bg-zinc-400 dark:bg-zinc-300 shadow-[0_0_15px_rgba(251,146,60,0.4)] z-10" />

        </div>

        {/* Text Loader Indicators */}
        <div className="text-center space-y-2">
          <span className="block text-[8px] font-black tracking-[0.4em] uppercase text-zinc-500 dark:text-zinc-600 animate-pulse">
            System Ready
          </span>
          <h3 className="font-heading text-lg font-bold tracking-[0.2em] uppercase text-terracotta dark:text-orange-400 min-h-[1.75rem]">
            {loadingTexts[textIndex]}
          </h3>
        </div>

      </div>
    </motion.div>
  );
}
