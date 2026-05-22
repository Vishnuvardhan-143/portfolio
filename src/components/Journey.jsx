import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Journey() {
  return (
    <section 
      id="journey" 
      className="relative py-24 bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[50%] right-[-10%] w-[350px] h-[350px] bg-emerald-accent/5 dark:bg-emerald-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-20 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-terracotta dark:text-orange-500">
            Professional Evolution
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
            My Journey Timeline
          </h2>
          <div className="w-12 h-1 bg-terracotta dark:bg-orange-500 mt-2 rounded-full" />
        </div>

        {/* Timeline Line */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line - grows on scroll */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-zinc-900/10 dark:bg-white/10 md:-translate-x-1/2 origin-top" 
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {portfolioData.journey.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Circle Indicator on the line - staggered fade-in */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-beige dark:bg-charcoal border-4 border-terracotta dark:border-orange-500 md:-translate-x-1/2 z-20 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-[#f5f1e8] animate-pulse" />
                  </motion.div>

                  {/* Card wrapper with alternating slide-in directions */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -45 : 45 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 15 }}
                    className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.015, y: -4 }}
                      className="glass-card p-6 border border-zinc-900/5 dark:border-white/5 relative hover:shadow-lg dark:hover:shadow-black/35 transition-all duration-300"
                    >
                      
                      {/* Sub-Header Metadata */}
                      <div className={`flex flex-wrap gap-2 items-center text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {item.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {item.location}
                        </span>
                      </div>

                      {/* Header */}
                      <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                        {item.role}
                      </h3>
                      
                      <h4 className="text-sm font-bold text-terracotta dark:text-orange-400 mb-4">
                        {item.company}
                      </h4>

                      {/* Highlights */}
                      <ul className={`space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed ${
                        isEven ? 'md:text-right' : 'text-left'
                      }`}>
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className={`flex gap-2 items-start ${
                            isEven ? 'md:flex-row-reverse' : ''
                          }`}>
                            <CheckCircle2 size={13} className="text-emerald-accent dark:text-[#52c49a] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Timeline Card Badges */}
                      <div className={`flex flex-wrap gap-1.5 mt-5 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}>
                        {item.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
