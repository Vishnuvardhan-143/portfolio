import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTime, useTransform } from 'framer-motion';
import InfinityScrollShowcase from './InfinityScrollShowcase';

// Orbiting Badge Component with scroll-driven expansion hooks
function OrbitBadge({ item, idx, totalItems, radius, progress, time }) {
  const timeAngle = useTransform(time, [0, 30000], [0, 360], { clamp: false });
  const baseAngleDeg = (idx * 360) / totalItems;

  // Dynamic radial expansion linked to scroll progress:
  // Starts collapsed near center (0.25 * radius), expands to full radius, and pushes outward (1.55 * radius) as you scroll down!
  const currentRadius = useTransform(progress, [0, 0.5, 1], [radius * 0.25, radius, radius * 1.55]);

  const itemX = useTransform([currentRadius, timeAngle], ([r, tAngle]) => {
    const rad = ((baseAngleDeg + tAngle) * Math.PI) / 180;
    return Math.cos(rad) * r;
  });

  const itemY = useTransform([currentRadius, timeAngle], ([r, tAngle]) => {
    const rad = ((baseAngleDeg + tAngle) * Math.PI) / 180;
    return Math.sin(rad) * r;
  });

  const itemScale = useTransform(progress, [0, 0.35], [0.4, 1]);
  const itemOpacity = useTransform(progress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        x: itemX,
        y: itemY,
        scale: itemScale,
        opacity: itemOpacity,
        marginLeft: '-28px',
        marginTop: '-28px',
      }}
    >
      {/* Badge remains 100% upright at all times during orbit */}
      <motion.div
        className={`w-14 h-14 rounded-full border flex items-center justify-center text-xl shadow-lg pointer-events-auto cursor-help select-none ${item.color}`}
        title={item.name}
        whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
      >
        {item.icon}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [radius, setRadius] = useState(220);
  const containerRef = useRef(null);
  const time = useTime();

  // Scroll tracking for Orbit expansion across full section scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Continuous progress mapping: expands as you scroll down through the section!
  const progress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  // Responsive radius for Tech Orbit
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadius(115);
      } else if (window.innerWidth < 640) {
        setRadius(135);
      } else if (window.innerWidth < 1024) {
        setRadius(170);
      } else {
        setRadius(210);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const marqueeSkills = [
    "Spring Boot", "Docker Compose", "PySpark", "ReactJS", "C++", 
    "Java", "Databricks", "Saga Pattern", "Data Structures", "Algorithms", 
    "SQL", "MongoDB", "DevOps", "OOPs", "Machine Learning"
  ];

  // Tech Orbit Items
  const orbitItems = [
    { name: 'Spring Boot', icon: 'SB', color: 'border-cyan-300/30 text-cyan-100 bg-cyan-300/10 font-bold text-xs' },
    { name: 'Python', icon: 'PY', color: 'border-sky-300/30 text-sky-100 bg-sky-300/10 font-bold text-xs' },
    { name: 'Java', icon: 'JV', color: 'border-amber-300/30 text-amber-100 bg-amber-300/10 font-bold text-xs' },
    { name: 'PySpark', icon: 'PS', color: 'border-orange-300/30 text-orange-100 bg-orange-300/10 font-bold text-xs' },
    { name: 'React', icon: 'RX', color: 'border-cyan-400/30 text-cyan-100 bg-cyan-400/10 font-bold text-xs' },
    { name: 'Docker', icon: 'DK', color: 'border-blue-300/30 text-blue-100 bg-blue-300/10 font-bold text-xs' },
    { name: 'PostgreSQL', icon: 'PG', color: 'border-indigo-300/30 text-indigo-100 bg-indigo-300/10 font-bold text-xs' },
    { name: 'MongoDB', icon: 'MG', color: 'border-emerald-300/30 text-emerald-100 bg-emerald-300/10 font-bold text-xs' },
    { name: 'Git', icon: 'GT', color: 'border-rose-300/30 text-rose-100 bg-rose-300/10 font-bold text-xs' },
    { name: 'TypeScript', icon: 'TS', color: 'border-blue-400/30 text-blue-100 bg-blue-400/10 font-bold text-xs' }
  ];

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative py-24 bg-theme border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500 overflow-hidden"
    >
      {/* Infinite Marquee Section */}
      <div className="w-full border-y border-zinc-900/5 dark:border-white/5 bg-zinc-950/2 dark:bg-white/2 py-6 select-none overflow-hidden relative z-10 mb-16">
        <div className="animate-marquee flex gap-12 whitespace-nowrap items-center font-heading text-[55px] md:text-[65px] font-black uppercase tracking-[-0.04em]">
          {/* First loop */}
          {marqueeSkills.map((skill, idx) => (
            <React.Fragment key={`m1-${idx}`}>
              <span className="marquee-text font-heading">
                {skill}
              </span>
              <span className="text-terracotta dark:text-cyan-400 opacity-60">*</span>
            </React.Fragment>
          ))}
          {/* Second loop for seamless wrapping */}
          {marqueeSkills.map((skill, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <span className="marquee-text font-heading">
                {skill}
              </span>
              <span className="text-terracotta dark:text-cyan-400 opacity-60">*</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Orbit Visualization Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] mb-24">
        
        {/* Orbital Track Rings */}
        <div className="absolute w-[calc(var(--radius)*2)] h-[calc(var(--radius)*2)] rounded-full border border-zinc-200/50 dark:border-zinc-900/40 pointer-events-none z-0" style={{ '--radius': `${radius}px` }} />
        <div className="absolute w-[calc(var(--radius)*2-60px)] h-[calc(var(--radius)*2-60px)] rounded-full border border-dashed border-zinc-300/30 dark:border-zinc-800/20 pointer-events-none z-0" style={{ '--radius': `${radius}px` }} />

        {/* Central Glowing Text Box */}
        <div className="max-w-md text-center z-10 px-4 py-8 rounded-full bg-theme/80 backdrop-blur-md flex flex-col items-center justify-center aspect-square border border-zinc-900/5 dark:border-white/5 shadow-2xl relative">
          
          <div className="absolute inset-0 rounded-full bg-radial-glow ambient-glow-light dark:ambient-glow-dark opacity-40 pointer-events-none" />
          
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-terracotta dark:text-cyan-400 mb-2">
            Skill Core
          </span>
          
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none text-zinc-900 dark:text-white">
            Empowering <span className="text-terracotta dark:text-cyan-400 italic block font-heading">Every User</span>
          </h3>
          
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mt-4 max-w-[240px]">
            From robust Spring Boot backends and containerized deployments to distributed big data pipelines, I construct secure tools that drive global results.
          </p>
        </div>

        {/* Orbiting Elements Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {orbitItems.map((item, idx) => (
            <OrbitBadge
              key={idx}
              item={item}
              idx={idx}
              totalItems={orbitItems.length}
              radius={radius}
              progress={progress}
              time={time}
            />
          ))}
        </div>
      </div>

      {/* Extended Toolkit Grid Selector */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full mt-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
        </div>
      </div>

      {/* EXTENDED TOOLKIT (3D Infinity Scroll Showcase) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full flex flex-col items-center justify-center mt-24 mb-20">
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <div className="w-10 h-1 bg-terracotta dark:bg-cyan-400 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500">
            Extended Toolkit
          </span>
        </div>

        <div className="w-full h-[520px] md:h-[620px] relative overflow-hidden rounded-3xl border border-zinc-900/10 dark:border-white/5 bg-[#07070a]/80 backdrop-blur-xl shadow-2xl">
          <InfinityScrollShowcase speed={0.85} radius={7.5} weight={4} impact={1.2} />
        </div>
      </div>
    </section>
  );
}
