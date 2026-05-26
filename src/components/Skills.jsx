import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Cpu, Terminal, Database, ShieldAlert, Award, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Orbiting Badge Component with scroll-driven expansion hooks
function OrbitBadge({ item, idx, totalItems, radius, progress }) {
  const angle = (idx * 360) / totalItems;
  const targetX = Math.cos((angle * Math.PI) / 180) * radius;
  const targetY = Math.sin((angle * Math.PI) / 180) * radius;

  // Scroll-linked transforms for expanding from center to orbit
  const itemX = useTransform(progress, [0, 1], [0, targetX]);
  const itemY = useTransform(progress, [0, 1], [0, targetY]);
  const itemScale = useTransform(progress, [0, 0.65], [0, 1]);
  const itemOpacity = useTransform(progress, [0, 0.45], [0, 1]);

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
      {/* Badge with Counter-rotation to remain upright */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
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
  const [activeCategory, setActiveCategory] = useState('languages');
  const [radius, setRadius] = useState(220);
  const containerRef = useRef(null);

  // Scroll tracking for Orbit expansion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Smooth progress mapped to expansion
  const progress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

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

  const categories = [
    { id: 'languages', name: 'Languages', icon: <Terminal size={12} /> },
    { id: 'frameworks', name: 'Frameworks', icon: <Cpu size={12} /> },
    { id: 'databases', name: 'Databases', icon: <Database size={12} /> },
    { id: 'devops', name: 'DevOps', icon: <ShieldAlert size={12} /> },
    { id: 'fundamentals', name: 'Fundamentals', icon: <Award size={12} /> }
  ];

  const marqueeSkills = [
    "Spring Boot", "Docker Compose", "PySpark", "ReactJS", "C++", 
    "Java", "Databricks", "Saga Pattern", "Data Structures", "Algorithms", 
    "SQL", "MongoDB", "DevOps", "OOPs", "Machine Learning"
  ];

  // Tech Orbit Items
  const orbitItems = [
    { name: 'Spring Boot', icon: '🍃', color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' },
    { name: 'Python', icon: '🐍', color: 'border-blue-500/30 text-blue-500 bg-blue-500/10' },
    { name: 'Java', icon: '☕', color: 'border-red-500/30 text-red-500 bg-red-500/10' },
    { name: 'PySpark', icon: '⚡', color: 'border-orange-500/30 text-orange-500 bg-orange-500/10' },
    { name: 'React', icon: '⚛️', color: 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10' },
    { name: 'Docker', icon: '🐳', color: 'border-sky-400/30 text-sky-400 bg-sky-400/10' },
    { name: 'PostgreSQL', icon: '🐘', color: 'border-indigo-400/30 text-indigo-400 bg-indigo-400/10' },
    { name: 'MongoDB', icon: '🍃', color: 'border-emerald-600/30 text-emerald-600 bg-emerald-600/10' },
    { name: 'Git', icon: '⚙️', color: 'border-orange-600/30 text-orange-600 bg-orange-600/10' },
    { name: 'TypeScript', icon: 'TS', color: 'border-blue-600/30 text-blue-400 bg-blue-600/10 font-bold text-xs' }
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
              <span className="text-terracotta dark:text-orange-500 opacity-60">•</span>
            </React.Fragment>
          ))}
          {/* Second loop for seamless wrapping */}
          {marqueeSkills.map((skill, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <span className="marquee-text font-heading">
                {skill}
              </span>
              <span className="text-terracotta dark:text-orange-500 opacity-60">•</span>
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
          
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-terracotta dark:text-orange-400 mb-2">
            Skill Core
          </span>
          
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none text-zinc-900 dark:text-white">
            Empowering <span className="text-terracotta dark:text-orange-500 italic block font-heading">Every User</span>
          </h3>
          
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mt-4 max-w-[240px]">
            From robust Spring Boot backends and containerized deployments to distributed big data pipelines, I construct secure tools that drive global results.
          </p>
        </div>

        {/* Orbiting Elements Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          {orbitItems.map((item, idx) => (
            <OrbitBadge
              key={idx}
              item={item}
              idx={idx}
              totalItems={orbitItems.length}
              radius={radius}
              progress={progress}
            />
          ))}
        </motion.div>
      </div>

      {/* Extended Toolkit Grid Selector */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full mt-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
        </div>
      </div>

      {/* EXTENDED TOOLKIT GRID (Matching Reference Screenshot) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full flex flex-col items-center justify-center mt-32 mb-24">
        
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <div className="w-10 h-1 bg-terracotta dark:bg-orange-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500">
            Extended Toolkit
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto w-full">
          {[
            { name: "JavaScript", icon: "JS", bg: "bg-yellow-400 text-black", border: "border-yellow-400/20" },
            { name: "TypeScript", icon: "TS", bg: "bg-blue-500 text-white", border: "border-blue-500/20" },
            { name: "Express.js", icon: "ex", bg: "bg-zinc-800 text-white", border: "border-zinc-500/20" },
            { name: "Strapi", icon: "S", bg: "bg-indigo-500 text-white", border: "border-indigo-500/20" },
            { name: "Supabase", icon: "S", bg: "bg-emerald-500 text-white", border: "border-emerald-500/20" },
            { name: "OpenAI", icon: "O", bg: "bg-white text-black", border: "border-white/20" },
            { name: "Git", icon: "Git", bg: "bg-orange-600 text-white", border: "border-orange-600/20" },
            { name: "Linux", icon: "L", bg: "bg-yellow-500 text-black", border: "border-yellow-500/20" },
            { name: "GCP", icon: "GCP", bg: "bg-blue-400 text-white", border: "border-blue-400/20" },
            { name: "Postman", icon: "PM", bg: "bg-orange-500 text-white", border: "border-orange-500/20" }
          ].map((tool, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-zinc-900/5 dark:bg-[#0c0c0c] border border-zinc-900/10 dark:border-white/5 hover:border-zinc-900/20 dark:hover:border-white/10 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover glow matching the tool color */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${tool.bg.split(' ')[0]}`} />
              
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-6 shadow-lg ${tool.bg}`}>
                {tool.icon}
              </div>

              {/* Dotted separator */}
              <div className="w-6 border-t border-dashed border-zinc-400/50 mb-3" />
              
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
