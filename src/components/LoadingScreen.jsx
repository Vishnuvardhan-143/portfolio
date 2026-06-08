import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2700;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 overflow-hidden"
    >
      {/* Top Left Label */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      {/* Center Rotating Words */}
      <div className="flex-1 flex items-center justify-center">
        <div className="overflow-hidden h-24 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        {/* Counter */}
        <div className="flex justify-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div 
            className="h-full accent-gradient rounded-full origin-left shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
