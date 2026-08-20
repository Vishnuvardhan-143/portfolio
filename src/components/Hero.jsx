import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Cpu, Database, GitBranch, Play, ShieldCheck, Sparkles } from 'lucide-react';
import FadingVideo from './FadingVideo';
import Galaxy from './Galaxy';
import TextType from './TextType';
import RotatingText from './RotatingText';
import { portfolioData } from '../data/portfolioData';
import vizzImage from '../assets/vizz.jpg';
import Lanyard from './Lanyard';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';

const words = ['Distributed', 'Systems', 'Big', 'Data', 'Spring', 'Boot', 'AI'];

function BlurText({ text }) {
  return (
    <span className="blur-text">
      {text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 48 }}
          animate={{ filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], opacity: [0, 0.55, 1], y: [48, -5, 0] }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.7, ease: 'easeOut', times: [0, 0.5, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ onViewResume }) {
  const [time, setTime] = useState('');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      className="relative min-h-screen overflow-hidden bg-[#010207] text-white"
    >
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 z-0 h-[120%] w-[120%] -translate-x-1/2 object-cover object-top opacity-50"
      />
      {/* Interactive Galaxy Background with Mouse Repulsion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <Galaxy
          starSpeed={0.3}
          density={2}
          hueShift={180}
          speed={1.3}
          glowIntensity={0.4}
          saturation={0.1}
          mouseRepulsion={true}
          repulsionStrength={2}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          transparent={true}
        />
      </div>
      <div className="hero-vignette" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-5 pb-8 pt-28 md:px-12 lg:px-20">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl relative z-30">
            <motion.div
              initial={{ filter: 'blur(10px)', opacity: 0, y: 22 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: 'easeOut' }}
              className="liquid-glass mb-6 inline-flex max-w-full items-center gap-2 rounded-full px-2 py-1.5 text-xs text-white/90"
            >
              <span className="rounded-full bg-white px-3 py-1 font-bold text-black">Open</span>
              <span className="pr-3">Available for backend, data, and AI product engineering</span>
            </motion.div>

            <h1 className="font-heading text-[clamp(2.8rem,6.8vw,6.2rem)] font-black italic leading-[0.88] tracking-tight text-white pr-2">
              <RotatingText
                texts={[
                  'Engineering beyond the ordinary',
                  'Engineering beyond the expected',
                  'Engineering beyond the boundaries'
                ]}
                auto={true}
                rotationInterval={4500}
                animatePresenceInitial={true}
                staggerDuration={0.03}
                staggerFrom="first"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.2 }}
                splitLevelClassName="overflow-hidden pb-1 pr-4"
              />
            </h1>

            <motion.div
              initial={{ filter: 'blur(8px)', opacity: 0, y: 20 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: 'easeOut' }}
              className="mt-7 max-w-2xl text-sm font-light leading-relaxed text-white/82 md:text-base"
            >
              <TextType
                text={`I am ${portfolioData.personalInfo.fullName}, a systems-focused software engineer building secure microservices, PySpark data engines, and AI-assisted product experiences with precision at scale.`}
                as="p"
                typingSpeed={30}
                initialDelay={1000}
                loop={true}
                pauseDuration={10000}
                showCursor={true}
                cursorCharacter="|"
                className=""
              />
            </motion.div>

            <motion.div
              initial={{ filter: 'blur(8px)', opacity: 0, y: 18 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.65, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button onClick={onViewResume} className="liquid-glass-strong group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white cursor-pointer">
                View Resume
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="#projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.22)]">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                Explore Systems
              </a>
            </motion.div>

            <motion.div
              initial={{ filter: 'blur(8px)', opacity: 0, y: 18 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.65, ease: 'easeOut' }}
              className="mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                { icon: ShieldCheck, value: 'AIR 5005', label: 'GATE CSE 2025' },
                { icon: Database, value: '9.19', label: 'SASTRA CSE CGPA' },
                { icon: GitBranch, value: '4+', label: 'Production Systems' },
              ].map((stat) => (
                <div key={stat.label} className="liquid-glass stat-card rounded-[1.25rem] p-4">
                  <stat.icon className="h-6 w-6 text-cyan-200" />
                  <strong className="mt-5 block font-heading text-3xl italic leading-none text-white">{stat.value}</strong>
                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/62">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Orbit Stage & Visual Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[540px] h-[580px] lg:h-[640px] lg:ml-auto flex items-center justify-center pointer-events-none z-30"
          >
            <div className="orbit-stage w-full h-full relative flex items-center justify-center">
              <div className="orbit-ring orbit-ring-one pointer-events-none" />
              <div className="orbit-ring orbit-ring-two pointer-events-none" />
              <div className="orbit-ring orbit-ring-three pointer-events-none" />

              {/* Floating Tech Skill Chips */}
              <motion.div
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5], rotate: [-1.5, 2, -1.5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="floating-chip chip-a pointer-events-auto z-30"
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Spring Boot</span>
              </motion.div>

              <motion.div
                animate={{ y: [12, -12, 12], x: [6, -6, 6], rotate: [2, -2, 2] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="floating-chip chip-b pointer-events-auto z-30"
              >
                <Database className="h-4 w-4 text-amber-400" />
                <span>PySpark</span>
              </motion.div>

              <motion.div
                animate={{ y: [-14, 12, -14], x: [-7, 7, -7], rotate: [-2, 1.5, -2] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="floating-chip chip-c pointer-events-auto z-30"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>Microservices</span>
              </motion.div>

              {/* Interactive Drag Hint */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white/80 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Drag & Toss ID Badge</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Physics Lanyard Hanging from the topmost point of the browser */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex items-center justify-center">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent={true}
            frontImage={vizzImage}
            backImage={vizzImage}
            imageFit="cover"
            lanyardWidth={1.2}
            anchorY={4.6}
            anchorX={isMobile ? 0 : 2.5}
            className="w-full h-full pointer-events-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center gap-5 pt-8 relative z-30 pointer-events-auto"
        >
          {/* Core Systems Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-1.5 text-xs text-white/80 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Core Systems Architecture</span>
          </div>

          {/* Interactive Tech Stack Capsules */}
          <div className="flex w-full flex-wrap justify-center gap-2.5 md:gap-3.5 max-w-4xl px-4">
            {[
              { label: 'Distributed Systems', color: 'hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]' },
              { label: 'Big Data Pipelines', color: 'hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]' },
              { label: 'Spring Boot Microservices', color: 'hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]' },
              { label: 'PySpark Databricks', color: 'hover:border-orange-400/60 hover:shadow-[0_0_20px_rgba(251,146,60,0.35)]' },
              { label: 'AI Product Engineering', color: 'hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.35)]' }
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.06, y: -2 }}
                className={`liquid-glass rounded-2xl px-4 py-2 text-xs md:text-sm font-semibold tracking-wide text-white/90 border border-white/10 transition-all duration-300 cursor-pointer ${item.color}`}
              >
                {item.label}
              </motion.div>
            ))}
          </div>

          {/* Scroll Prompt Button */}
          <a
            href="#about"
            className="group mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 shadow-xl"
            aria-label="Scroll to About section"
          >
            <span>Explore Systems Engine</span>
            <ArrowDown className="h-4 w-4 text-cyan-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
