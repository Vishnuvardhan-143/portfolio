import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Database, GitBranch, MapPin, Play, ShieldCheck, Sparkles } from 'lucide-react';
import FadingVideo from './FadingVideo';
import SpaceCanvas from './SpaceCanvas';
import { portfolioData } from '../data/portfolioData';
import vizzImage from '../assets/vizz.jpg';

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
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
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
        className="absolute left-1/2 top-0 z-0 h-[120%] w-[120%] -translate-x-1/2 object-cover object-top opacity-60"
      />
      <SpaceCanvas />
      <div className="hero-vignette" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-5 pb-8 pt-28 md:px-12 lg:px-20">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl">
            <motion.div
              initial={{ filter: 'blur(10px)', opacity: 0, y: 22 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: 'easeOut' }}
              className="liquid-glass mb-6 inline-flex max-w-full items-center gap-2 rounded-full px-2 py-1.5 text-xs text-white/90"
            >
              <span className="rounded-full bg-white px-3 py-1 font-bold text-black">Open</span>
              <span className="pr-3">Available for backend, data, and AI product engineering</span>
            </motion.div>

            <h1 className="font-heading text-[clamp(4rem,9.8vw,8.9rem)] font-black italic leading-[0.78] tracking-tight text-white">
              <BlurText text="Engineering beyond the ordinary" />
            </h1>

            <motion.p
              initial={{ filter: 'blur(8px)', opacity: 0, y: 20 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: 'easeOut' }}
              className="mt-7 max-w-2xl text-sm font-light leading-relaxed text-white/82 md:text-base"
            >
              I am {portfolioData.personalInfo.fullName}, a systems-focused software engineer building secure microservices, PySpark data engines, and AI-assisted product experiences with precision at scale.
            </motion.p>

            <motion.div
              initial={{ filter: 'blur(8px)', opacity: 0, y: 18 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.65, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button onClick={onViewResume} className="liquid-glass-strong group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white">
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

          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.92, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
          >
            <div className="orbit-stage">
              <div className="orbit-ring orbit-ring-one" />
              <div className="orbit-ring orbit-ring-two" />
              <div className="orbit-ring orbit-ring-three" />
              <div className="profile-capsule liquid-glass">
                <img src={vizzImage} alt="Annareddy Venkata Vishnuvardhan Reddy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/12 bg-black/45 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    <span>A. V. Vishnu</span>
                    <span>{time} IST</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/65">
                    <MapPin className="h-3.5 w-3.5 text-amber-200" />
                    Proddatur, Andhra Pradesh
                  </div>
                </div>
              </div>
              <div className="floating-chip chip-a liquid-glass"><Sparkles className="h-4 w-4" /> Spring Boot</div>
              <div className="floating-chip chip-b liquid-glass">PySpark</div>
              <div className="floating-chip chip-c liquid-glass">Microservices</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.65, ease: 'easeOut' }}
          className="flex flex-col items-center gap-5 pt-8"
        >
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/78">
            Systems stack in orbit
          </div>
          <div className="flex w-full flex-wrap justify-center gap-7 font-heading text-2xl italic text-white/88 md:gap-12 md:text-3xl">
            {words.map((word) => <span key={word}>{word}</span>)}
          </div>
          <a href="#about" className="grid h-10 w-10 place-items-center rounded-full text-white/70">
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
