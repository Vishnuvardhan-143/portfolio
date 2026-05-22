import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown } from 'lucide-react';
import Reveal from './Reveal';
import { portfolioData } from '../data/portfolioData';
import vizzImage from '../assets/vizz.jpg';

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const marqueeWords = ["Design", "Develop", "Discover", "Deploy", "Ship"];

export default function Hero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 bg-beige dark:bg-charcoal transition-colors duration-500 overflow-hidden"
    >
      {/* Ambient Radial Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] md:h-[600px] ambient-glow-light dark:ambient-glow-dark opacity-100 transition-opacity duration-700" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 flex-1 flex flex-col justify-center">
        
        {/* Top Info Bar */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent pulse-badge shrink-0" />
              Available for collaborations · {currentYear}
            </div>
            <span className="hidden sm:inline opacity-30">/</span>
            <a 
              href="https://maps.google.com/?q=Proddatur,Kadapa,Andhra+Pradesh,India"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-terracotta dark:hover:text-orange-500 transition-colors cursor-pointer"
            >
              <MapPin size={10} className="text-terracotta dark:text-orange-500" />
              Proddatur, AP, India
            </a>
            <span className="hidden sm:inline opacity-30">/</span>
            <div className="text-zinc-900 dark:text-white bg-zinc-900/5 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-900/10 dark:border-white/10">
              {time} IST
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="flex flex-col gap-6 text-left items-start">
            
            {/* Display Headline */}
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
              }}
              className="font-heading text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-tight uppercase text-zinc-900 dark:text-[#f5f1e8] select-none"
            >
              <div className="flex flex-wrap overflow-hidden">
                {"VISHNU".split('').map((char, index) => (
                  <motion.span key={index} variants={letterAnimation}>{char}</motion.span>
                ))}
              </div>
              <div className="flex flex-wrap overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-orange-500 italic pr-4">
                {"ANNAREDDY.".split('').map((char, index) => (
                  <motion.span key={index} variants={letterAnimation}>{char}</motion.span>
                ))}
              </div>
            </motion.h1>

            {/* Role Subtitle with Line */}
            <Reveal delay={0.6}>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-10 h-[2px] bg-terracotta dark:bg-orange-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
                  Distributed Systems Engineer & Spring Boot Dev
                </span>
              </div>
            </Reveal>

            {/* Pill Tags */}
            <Reveal delay={0.7}>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {['DISTRIBUTED SYSTEMS', 'SPRING BOOT DEV', 'BIG DATA PYSPARK'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Tagline */}
            <Reveal delay={0.8}>
              <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm md:text-base font-medium leading-relaxed max-w-lg mt-2">
                Building <span className="text-zinc-900 dark:text-[#f5f1e8] font-bold italic font-heading underline decoration-[1.5px] decoration-terracotta underline-offset-4">high-performance systems</span> and big data engines — engineered with precision, designed for scale, shipped with care.
              </p>
            </Reveal>

            {/* Statistics Row */}
            <Reveal delay={0.9}>
              <div className="grid grid-cols-3 gap-8 w-full max-w-lg text-left mt-4 pb-8">
                <div>
                  <span className="block text-2xl md:text-3xl font-bold font-heading text-terracotta dark:text-orange-500">10+</span>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-1 block">Technologies Mastered</span>
                </div>
                <div>
                  <span className="block text-2xl md:text-3xl font-bold font-heading text-terracotta dark:text-orange-500">9.19</span>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-1 block">SASTRA University CSE</span>
                </div>
                <div>
                  <span className="block text-2xl md:text-3xl font-bold font-heading text-terracotta dark:text-orange-500">AIR 5005</span>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-1 block">GATE 2025 CSE Triumph</span>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right Column: Profile Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end w-full pb-8"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] p-4 border border-zinc-900/10 dark:border-white/5 bg-zinc-900/[0.03] dark:bg-white/[0.03] backdrop-blur-sm shadow-2xl group flex flex-col justify-end overflow-hidden">
              
              <div className="absolute inset-4 rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                <img 
                  src={vizzImage} 
                  alt="Annareddy Venkata Vishnuvardhan Reddy" 
                  className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-[1.03] transition-transform duration-700 ease-[0.22,1,0.36,1]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="absolute bottom-8 left-8 right-8 backdrop-blur-md bg-zinc-950/65 border border-white/10 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-[9px] font-black tracking-wider text-white uppercase select-none">
                <span>A. V. VISHNU</span>
                <span className="text-zinc-400">·</span>
                <span className="text-zinc-300">SOFTWARE ENG</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Marquee & Scroll Indicator */}
      <div className="relative z-10 w-full mt-auto flex flex-col items-center">
        
        {/* Scroll Indicator */}
        <Reveal delay={1.2} className="mb-6">
          <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={14} />
            </motion.div>
          </div>
        </Reveal>

        {/* Endless Marquee Strip */}
        <div className="w-full border-t border-zinc-900/5 dark:border-white/5 bg-zinc-900/[0.02] dark:bg-white/[0.02] py-4 overflow-hidden flex select-none">
          <div className="animate-marquee flex gap-12 whitespace-nowrap items-center font-heading text-3xl font-black uppercase tracking-tight opacity-80">
            {marqueeWords.map((word, i) => (
              <React.Fragment key={`m1-${i}`}>
                <span className="marquee-text">{word}</span>
                <span className="text-terracotta dark:text-orange-500 opacity-60">*</span>
              </React.Fragment>
            ))}
            {marqueeWords.map((word, i) => (
              <React.Fragment key={`m2-${i}`}>
                <span className="marquee-text">{word}</span>
                <span className="text-terracotta dark:text-orange-500 opacity-60">*</span>
              </React.Fragment>
            ))}
            {marqueeWords.map((word, i) => (
              <React.Fragment key={`m3-${i}`}>
                <span className="marquee-text">{word}</span>
                <span className="text-terracotta dark:text-orange-500 opacity-60">*</span>
              </React.Fragment>
            ))}
            {marqueeWords.map((word, i) => (
              <React.Fragment key={`m4-${i}`}>
                <span className="marquee-text">{word}</span>
                <span className="text-terracotta dark:text-orange-500 opacity-60">*</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
