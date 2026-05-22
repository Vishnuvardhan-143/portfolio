import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const containerRef = useRef(null);

  return (
    <section 
      id="achievements" 
      className="relative py-24 bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[-5%] w-[450px] h-[450px] bg-emerald-accent/5 dark:bg-emerald-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-accent/10 border border-emerald-accent/20 dark:bg-emerald-accent/15 dark:border-emerald-accent/30 text-emerald-accent dark:text-[#52c49a] text-[9px] font-black uppercase tracking-[0.25em] w-fit">
              <Award size={10} />
              Key Milestones
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] text-zinc-900 dark:text-white">
              Proven <span className="text-emerald-accent dark:text-[#52c49a] italic font-heading underline decoration-[3px] underline-offset-8">Track Record</span> & Impact.
            </h2>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-md pt-2">
              A highly analytical track record demonstrating systems engineering excellence, competitive national accomplishments, secure banking microservice architectures, and robust cloud data transformations.
            </p>
          </div>

          {/* Right Column: Sticky Stacking Cards */}
          <div ref={containerRef} className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {portfolioData.achievements.map((ach, idx) => (
                <AchievementCard key={ach.number} ach={ach} idx={idx} total={portfolioData.achievements.length} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function AchievementCard({ ach, idx, total }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  // Animate from slightly below & transparent to fully visible
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        position: 'sticky',
        top: `calc(100px + ${idx * 32}px)`,
        zIndex: idx + 1,
      }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="milestone-card p-6 md:p-8 flex justify-between items-center border border-zinc-900/5 dark:border-white/5 hover:border-emerald-accent/20 dark:hover:border-[#52c49a]/20 hover:shadow-lg dark:hover:shadow-black/30 group transition-shadow duration-300 rounded-3xl"
    >
      <div className="flex-1 pr-6">
        <h4 className="font-heading text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
          {ach.title}
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mt-2">
          {ach.description}
        </p>
      </div>

      {/* Number Badge */}
      <div className="text-[36px] md:text-[42px] font-heading font-bold italic text-emerald-accent/20 dark:text-[#52c49a]/20 group-hover:text-emerald-accent dark:group-hover:text-[#52c49a] transition-colors duration-300 select-none shrink-0 leading-none">
        {ach.number}
      </div>
    </motion.div>
  );
}
