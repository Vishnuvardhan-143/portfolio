import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Database, Box, Lock, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const explorations = [
  { id: 1, title: 'Generative AI', speed: 0.8, icon: <Sparkles className="w-12 h-12 mb-4 text-[#89AACC]" /> },
  { id: 2, title: 'Spring Boot Auth', speed: 1.2, icon: <ShieldCheck className="w-12 h-12 mb-4 text-[#4E85BF]" /> },
  { id: 3, title: 'PySpark Scripts', speed: 0.9, icon: <Database className="w-12 h-12 mb-4 text-emerald-400" /> },
  { id: 4, title: 'Docker Orchestration', speed: 1.4, icon: <Box className="w-12 h-12 mb-4 text-blue-400" /> },
  { id: 5, title: 'JWT Security', speed: 0.7, icon: <Lock className="w-12 h-12 mb-4 text-purple-400" /> },
  { id: 6, title: 'Distributed Cache', speed: 1.1, icon: <Server className="w-12 h-12 mb-4 text-orange-400" /> },
];

export default function Explorations() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedRef.current,
        pinSpacing: false,
      });

      // Parallax for left column
      gsap.to(leftColRef.current, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Parallax for right column (moves faster)
      gsap.to(rightColRef.current, {
        yPercent: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden perspective-[1200px]">
      
      {/* Pinned Center Content */}
      <div 
        ref={pinnedRef}
        className="h-screen w-full flex flex-col items-center justify-center pointer-events-none z-10"
      >
        <div className="flex flex-col items-center text-center px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-text-primary mb-6">
            Visual <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#89AACC]">playground</span>
          </h2>
          
          <p className="text-muted md:text-lg max-w-md mb-8 drop-shadow-md">
            Experimental system designs, architecture diagrams, and conceptual models.
          </p>

          <div className="pointer-events-auto">
            <a href="#" className="relative group inline-flex rounded-full">
              <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button className="relative rounded-full px-7 py-3 text-sm bg-surface text-text-primary group-hover:bg-bg transition-colors duration-300 border border-stroke group-hover:border-transparent shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                View on GitHub
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Parallax Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none flex justify-center pt-[50vh]">
        <div className="w-full max-w-[1400px] px-4 md:px-10 flex justify-between">
          
          {/* Left Column */}
          <div ref={leftColRef} className="flex flex-col gap-24 md:gap-40 w-1/3 max-w-[320px]">
            {explorations.filter((_, i) => i % 2 === 0).map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="pointer-events-auto godmode-glass aspect-square rounded-[32px] flex flex-col items-center justify-center p-6 transform -rotate-6 cursor-pointer shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
              >
                {item.icon}
                <span className="font-display italic text-2xl text-text-primary text-center leading-tight">
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="flex flex-col gap-32 md:gap-48 w-1/3 max-w-[320px] pt-40">
            {explorations.filter((_, i) => i % 2 !== 0).map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ rotateX: -10, rotateY: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="pointer-events-auto godmode-glass aspect-square rounded-[32px] flex flex-col items-center justify-center p-6 transform rotate-3 cursor-pointer shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
              >
                {item.icon}
                <span className="font-display italic text-2xl text-text-primary text-center leading-tight">
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
